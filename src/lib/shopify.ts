const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query, variables = {} }: { query: string; variables?: any }) {
  try {
    // Debugging logs to verify variables during the Vercel build phase
    console.log("Shopify Fetch Configured Domain:", domain);
    console.log("Token Available:", !!storefrontAccessToken);

    // Changed version from 2026-04 to 2024-07 for absolute stability
    const result = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }
    });

    // Extract raw text first to avoid the JSON parsing crash
    const rawText = await result.text();

    if (!result.ok) {
      console.error(`Shopify HTTP Error Status: ${result.status}`);
      console.error(`Shopify Raw Error Response: ${rawText}`);
      return null;
    }

    return JSON.parse(rawText);
  } catch (error) {
    console.error("Shopify data fetch error:", error);
    return null;
  }
}

export async function getShopifyProducts(searchQuery?: string) {
  const query = `
    query getProducts($query: String) {
      products(first: 50, query: $query) {
        edges {
          node {
            id
            handle
            title
            description
            productType
            vendor
            totalInventory
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  availableForSale
                  quantityAvailable
                  weight
                  weightUnit
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await shopifyFetch({ 
    query, 
    variables: searchQuery ? { query: searchQuery } : {} 
  });
  return response?.data?.products?.edges || [];
}

export async function createShopifyCart(lines: Array<{ merchandiseId: string; quantity: number }>) {
  const query = `
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
  const response = await shopifyFetch({
    query,
    variables: { input: { lines } }
  });
  return response?.data?.cartCreate;
}

export async function addLinesToShopifyCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
  const query = `
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
  const response = await shopifyFetch({
    query,
    variables: { cartId, lines }
  });
  return response?.data?.cartLinesAdd;
}

export async function updateLinesInShopifyCart(cartId: string, lines: Array<{ id: string; quantity: number }>) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
  const response = await shopifyFetch({
    query,
    variables: { cartId, lines }
  });
  return response?.data?.cartLinesUpdate;
}

export async function getShopifyProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        productType
        vendor
        totalInventory
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              availableForSale
              quantityAvailable
              weight
              weightUnit
            }
          }
        }
      }
    }
  `;
  const response = await shopifyFetch({
    query,
    variables: { handle }
  });
  return response?.data?.product || null;
}


