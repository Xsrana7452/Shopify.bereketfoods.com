import { NextRequest, NextResponse } from "next/server";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const CART_CREATE = `
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

async function shopifyMutation(query: string, variables: object) {
  const url = `https://${domain}/api/2024-07/graphql.json`;

  // ── DIAGNOSTIC LOG 1: What we're sending ──
  console.log("\n========= [SHOPIFY CART DEBUG] =========");
  console.log("URL:", url);
  console.log("Token present:", !!token);
  console.log("Variables sent:", JSON.stringify(variables, null, 2));
  console.log("========================================\n");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token || "",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // mutations must NEVER be cached
  });

  const text = await res.text();

  // ── DIAGNOSTIC LOG 2: Raw HTTP response ──
  console.log("\n========= [SHOPIFY CART RESPONSE] =========");
  console.log("HTTP Status:", res.status);
  console.log("Raw body:", text);
  console.log("===========================================\n");

  if (!res.ok) {
    console.error("[shopify/cart] ❌ HTTP error:", res.status);
    return null;
  }

  try {
    const parsed = JSON.parse(text);

    // ── DIAGNOSTIC LOG 3: GraphQL / userErrors ──
    if (parsed.errors) {
      console.error("[shopify/cart] ❌ GraphQL Errors:", JSON.stringify(parsed.errors, null, 2));
    }
    if (parsed.data?.cartCreate?.userErrors?.length) {
      console.error(
        "[shopify/cart] ❌ User Errors:",
        JSON.stringify(parsed.data.cartCreate.userErrors, null, 2)
      );
    }
    if (parsed.data?.cartCreate?.cart) {
      console.log(
        "[shopify/cart] ✅ Cart created! checkoutUrl:",
        parsed.data.cartCreate.cart.checkoutUrl
      );
    }

    return parsed;
  } catch {
    console.error("[shopify/cart] ❌ JSON parse error:", text);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, cartId, lines } = body;

    console.log("[shopify/cart] Incoming action:", action);
    console.log("[shopify/cart] Lines from client:", JSON.stringify(lines, null, 2));

    if (action === "create") {
      const data = await shopifyMutation(CART_CREATE, { input: { lines } });

      const cart = data?.data?.cartCreate?.cart;
      const userErrors = data?.data?.cartCreate?.userErrors;

      if (userErrors?.length) {
        const msg = userErrors.map((e: { field: string; message: string }) => `[${e.field}] ${e.message}`).join(", ");
        console.error("[shopify/cart] ❌ userErrors to client:", msg);
        return NextResponse.json({ error: msg }, { status: 422 });
      }

      if (!cart?.checkoutUrl) {
        console.error("[shopify/cart] ❌ No checkoutUrl. Full data:", JSON.stringify(data, null, 2));
        return NextResponse.json(
          { error: "No checkoutUrl returned from Shopify — check terminal logs." },
          { status: 500 }
        );
      }

      return NextResponse.json({ cart });
    }

    if (action === "addLines") {
      const data = await shopifyMutation(CART_LINES_ADD, { cartId, lines });
      const cart = data?.data?.cartLinesAdd?.cart;
      const userErrors = data?.data?.cartLinesAdd?.userErrors;

      if (userErrors?.length) {
        const msg = userErrors.map((e: { field: string; message: string }) => `[${e.field}] ${e.message}`).join(", ");
        return NextResponse.json({ error: msg }, { status: 422 });
      }

      return NextResponse.json({ cart });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("[shopify/cart] ❌ Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
