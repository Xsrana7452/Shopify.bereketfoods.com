import CheckoutForm from "@/components/CheckoutForm";
import { Shield, Truck, Lock } from "lucide-react";

export const metadata = {
  title: "Checkout",
  description: "Securely complete your order from Bereket Foods.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <div className="bg-white border-b border-[#f0ece0] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a2e1c]">
            Secure Checkout
          </h1>
          <div className="flex flex-wrap gap-4 mt-3">
            {[
              { icon: <Lock className="w-3.5 h-3.5" />, label: "SSL Secured" },
              {
                icon: <Shield className="w-3.5 h-3.5" />,
                label: "Halal Certified Products",
              },
              {
                icon: <Truck className="w-3.5 h-3.5" />,
                label: "Fast Nationwide Delivery",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-1.5 text-xs text-[#6b7c6b]"
              >
                <span className="text-[var(--color-forest)]">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Form — Client Component handles cart state */}
      <CheckoutForm />
    </div>
  );
}
