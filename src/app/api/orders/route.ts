import { NextRequest, NextResponse } from "next/server";

// Simple in-memory order counter for generating order numbers
// In production this would be a database; for now we use a timestamp-based ID
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `BRK-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      customerName,
      customerPhone,
      customerEmail,
      address,
      city,
      postalCode,
      items,
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      notes,
    } = body;

    // Basic validation
    if (!customerName || !customerPhone || !address || !city || !items?.length) {
      return NextResponse.json(
        { error: "Missing required order fields." },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    // ── WhatsApp Notification ────────────────────────────────────────────────
    // Build a WhatsApp message with order details and send it to the business
    const itemLines = items
      .map(
        (item: any) =>
          `• ${item.name} x${item.quantity} — Rs. ${(item.price * item.quantity).toLocaleString()}`
      )
      .join("\n");

    const waMessage = encodeURIComponent(
      `🛒 *New Order: ${orderNumber}*\n\n` +
        `👤 *Customer:* ${customerName}\n` +
        `📞 *Phone:* ${customerPhone}\n` +
        (customerEmail ? `📧 *Email:* ${customerEmail}\n` : "") +
        `📍 *City:* ${city}\n` +
        `🏠 *Address:* ${address}\n` +
        (postalCode ? `📮 *Postal Code:* ${postalCode}\n` : "") +
        `\n📦 *Items:*\n${itemLines}\n\n` +
        `💰 *Subtotal:* Rs. ${subtotal.toLocaleString()}\n` +
        `🚚 *Shipping:* Rs. ${shippingFee.toLocaleString()}\n` +
        `✅ *Total:* Rs. ${total.toLocaleString()}\n` +
        `💳 *Payment:* ${paymentMethod.toUpperCase()}\n` +
        (notes ? `📝 *Notes:* ${notes}\n` : "")
    );

    // The WhatsApp notification URL — the business owner should open this
    // In a real deployment you'd use the WhatsApp Business API or Twilio
    const whatsappUrl = `https://wa.me/923309879158?text=${waMessage}`;

    console.log(`[Orders API] New order created: ${orderNumber}`);
    console.log(`[Orders API] WhatsApp notification URL: ${whatsappUrl}`);

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        whatsappUrl,
        message: "Order placed successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Orders API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
