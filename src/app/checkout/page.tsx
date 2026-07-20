import CheckoutForm from "@/components/CheckoutForm";
import { Shield, Truck, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Checkout | Bereket Foods",
  description: "Securely complete your order from Bereket Foods.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Unique Header with Official Bereket Foods Logo */}
      <div className="bg-white border-b border-[#e8e3d5] py-5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Bereket Foods"
              width={160}
              height={50}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {[
              { icon: <Lock className="w-4 h-4 text-emerald-700" />, label: "256-Bit SSL Encrypted" },
              { icon: <Shield className="w-4 h-4 text-amber-600" />, label: "Halal Certified" },
              { icon: <Truck className="w-4 h-4 text-emerald-700" />, label: "Flat Rs. 190 Shipping" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-[#f9f7f2] px-3.5 py-1.5 rounded-full border border-[#e8e3d5]"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Form — Handles cart items, COD, JazzCash, EasyPaisa */}
      <CheckoutForm />
    </div>
  );
}
