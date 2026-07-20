"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Truck,
  Smartphone,
  CreditCard,
  CheckCircle,
  Loader2,
  ShoppingBag,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  Package,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

type PaymentMethod = "cod" | "jazzcash" | "easypaisa";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

const CITIES = [
  "Islamabad",
  "Karachi",
  "Lahore",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Bahawalpur",
  "Abbottabad",
  "Other",
];

export default function CheckoutForm() {
  const router = useRouter();

  // ─── Cart State ───────────────────────────────────────────────
  // CRITICAL: Use zustand with a hydration guard.
  // On the server, localStorage doesn't exist, so the store starts empty.
  // We wait for client mount to read the persisted state.
  const [hydrated, setHydrated] = useState(false);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Debug routine: verify cart state on mount
    const rawStorage = localStorage.getItem("bereket-cart-storage");
    console.log("[CheckoutForm] DEBUG: Raw localStorage value:", rawStorage);
    console.log("[CheckoutForm] DEBUG: Zustand items after hydration:", items);
    console.log("[CheckoutForm] DEBUG: Item count:", items.length);

    setHydrated(true);
  }, [items]);

  // ─── Form State ───────────────────────────────────────────────
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // ─── Calculations ─────────────────────────────────────────────
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 190;
  const total = subtotal + shipping;

  // ─── Validation ───────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(\+92|0)[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid Pakistani phone number";
    }
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email || undefined,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode || undefined,
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        subtotal,
        shippingFee: shipping,
        total,
        paymentMethod,
        notes: formData.notes || undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Order failed");
      }

      const data = await res.json();
      console.log("[CheckoutForm] Order created:", data);

      setOrderSuccess(data.orderNumber);
      clearCart();

      // If JazzCash/EasyPaisa: simulate redirect (in production, redirect to payment gateway)
      if (paymentMethod === "jazzcash") {
        console.log("[CheckoutForm] Redirecting to JazzCash payment gateway...");
        // window.location.href = JAZZCASH_GATEWAY_URL;
      }
      if (paymentMethod === "easypaisa") {
        console.log("[CheckoutForm] Redirecting to EasyPaisa payment gateway...");
        // window.location.href = EASYPAISA_GATEWAY_URL;
      }
    } catch (err) {
      console.error("[CheckoutForm] Submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ─── Render: Order Success ────────────────────────────────────
  if (orderSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-12">
          <div className="w-20 h-20 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[var(--color-forest)]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e1c] mb-3">
            Order Placed Successfully!
          </h2>
          <p className="text-[#6b7c6b] mb-2">
            Your order number is:
          </p>
          <p className="text-2xl font-mono font-bold text-[var(--color-forest)] bg-[var(--color-forest)]/10 px-6 py-3 rounded-2xl inline-block mb-6">
            {orderSuccess}
          </p>
          <p className="text-sm text-[#6b7c6b] mb-8 leading-relaxed">
            {paymentMethod === "cod"
              ? "Our team will contact you shortly to confirm your order and delivery details."
              : "Please complete your payment to confirm the order. Our team will reach out if needed."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="bg-[var(--color-forest)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2d5235] transition-colors"
            >
              Continue Shopping
            </Link>
            <a
              href={`https://wa.me/923309879158?text=${encodeURIComponent(
                `Hi! I just placed order ${orderSuccess}. Please confirm my order.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#25D366] text-[#25D366] px-8 py-3 rounded-full font-semibold hover:bg-[#25D366] hover:text-white transition-colors"
            >
              Track via WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Loading Hydration ────────────────────────────────
  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-forest)]" />
      </div>
    );
  }

  // ─── Render: Empty Cart ───────────────────────────────────────
  if (hydrated && items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-12">
          <ShoppingBag className="w-16 h-16 text-[#c8b896] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1a2e1c] mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-[#6b7c6b] mb-8">
            Add some products to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="bg-[var(--color-forest)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2d5235] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // ─── Render: Checkout Form ────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* ── LEFT: Form ─────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <section className="bg-white rounded-3xl p-6 border border-[#f0ece0]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-[var(--color-forest)]" />
                </div>
                <h2 className="text-lg font-bold text-[#1a2e1c]">
                  Contact Information
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-[#3a3a2e] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9080]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={clsx(
                        "w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition-all",
                        errors.name ? "border-red-400" : "border-[#e0d9c8]"
                      )}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3a3a2e] mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9080]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03XX-XXXXXXX"
                      className={clsx(
                        "w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition-all",
                        errors.phone ? "border-red-400" : "border-[#e0d9c8]"
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3a3a2e] mb-1.5">
                    Email Address{" "}
                    <span className="text-[#9a9080] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9080]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e0d9c8] text-sm bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="bg-white rounded-3xl p-6 border border-[#f0ece0]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[var(--color-forest)]" />
                </div>
                <h2 className="text-lg font-bold text-[#1a2e1c]">
                  Delivery Address
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#3a3a2e] mb-1.5">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="House/flat number, street name, area..."
                    className={clsx(
                      "w-full px-4 py-3 rounded-xl border text-sm bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition-all resize-none",
                      errors.address ? "border-red-400" : "border-[#e0d9c8]"
                    )}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3a2e] mb-1.5">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={clsx(
                        "w-full px-4 py-3 rounded-xl border text-sm bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition-all",
                        errors.city ? "border-red-400" : "border-[#e0d9c8]"
                      )}
                    >
                      <option value="">Select City</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#3a3a2e] mb-1.5">
                      Postal Code{" "}
                      <span className="text-[#9a9080] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g. 44000"
                      className="w-full px-4 py-3 rounded-xl border border-[#e0d9c8] text-sm bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#3a3a2e] mb-1.5">
                    Order Notes{" "}
                    <span className="text-[#9a9080] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9a9080]" />
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Any special delivery instructions..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e0d9c8] text-sm bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-3xl p-6 border border-[#f0ece0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-[var(--color-forest)]" />
                </div>
                <h2 className="text-lg font-bold text-[#1a2e1c]">
                  Payment Method
                </h2>
              </div>
              <div className="p-4 rounded-2xl border-2 border-[var(--color-forest)] bg-[var(--color-forest)]/5 flex items-center gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 bg-[var(--color-forest)] rounded-full" />
                </div>
                <Truck className="w-6 h-6 text-[var(--color-forest)] flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#1a2e1c]">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-xs text-[#6b7c6b]">
                    Pay cash when your order arrives at your doorstep
                  </p>
                </div>
              </div>
            </section>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-forest)] text-white py-4 rounded-2xl text-base font-bold hover:bg-[#2d5235] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  <Package className="w-5 h-5" />
                  Place Order — Rs. {total.toLocaleString()}
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── RIGHT: Order Summary ────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="bg-white rounded-3xl border border-[#f0ece0] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#f0ece0]">
                <h2 className="text-lg font-bold text-[#1a2e1c]">
                  Order Summary
                </h2>
                <p className="text-xs text-[#6b7c6b] mt-0.5">
                  {items.length} {items.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <div className="px-6 py-4 space-y-4 max-h-[400px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#f5f0e8]">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-forest)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1a2e1c] line-clamp-1">
                        {item.name}
                      </p>
                      {item.weight && (
                        <p className="text-xs text-[#9a9080]">{item.weight}</p>
                      )}
                      <p className="text-sm font-bold text-[var(--color-forest)] mt-0.5">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-5 border-t border-[#f0ece0] space-y-3">
                <div className="flex justify-between text-sm text-[#6b7c6b]">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6b7c6b]">
                  <span>Standard Shipping</span>
                  <span>Rs. 190</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1a2e1c] pt-2 border-t border-[#f0ece0]">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: "🔒", label: "Secure Checkout" },
                { icon: "✅", label: "Halal Certified" },
                { icon: "🚚", label: "Fast Delivery" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="text-center p-3 bg-white rounded-2xl border border-[#f0ece0]"
                >
                  <span className="text-xl block mb-1">{badge.icon}</span>
                  <p className="text-[10px] text-[#6b7c6b] font-medium leading-tight">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
