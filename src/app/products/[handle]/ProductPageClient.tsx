"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { ShoppingCart, Plus, Minus, Zap, Check } from "lucide-react";
import Link from "next/link";

interface ProductPageClientProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  productWeight?: string | null;
  inStock: boolean;
}

export default function ProductPageClient({
  productId,
  productName,
  productPrice,
  productImageUrl,
  productWeight,
  inStock,
}: ProductPageClientProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: productId,
        name: productName,
        price: productPrice,
        imageUrl: productImageUrl,
        weight: productWeight ?? undefined,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!inStock) {
    return (
      <div className="space-y-3">
        <div className="w-full bg-gray-100 text-gray-400 py-4 rounded-2xl text-center font-semibold cursor-not-allowed">
          Out of Stock
        </div>
        <a
          href={`https://wa.me/923309879158?text=${encodeURIComponent(
            `Hi! I'm interested in "${productName}" — can you let me know when it's back in stock?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full border-2 border-[#25D366] text-[#25D366] py-3 rounded-2xl text-sm font-semibold text-center block hover:bg-[#25D366] hover:text-white transition-all"
        >
          Notify me via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-[#3a3a2e]">Quantity:</span>
        <div className="flex items-center gap-3 bg-[#f5f0e8] rounded-2xl p-1">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-xl bg-white border border-[#e0d9c8] flex items-center justify-center hover:bg-[#f0ece0] transition-colors"
          >
            <Minus className="w-4 h-4 text-[#3a3a2e]" />
          </button>
          <span className="w-8 text-center text-base font-bold text-[#1a2e1c]">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            className="w-9 h-9 rounded-xl bg-white border border-[#e0d9c8] flex items-center justify-center hover:bg-[#f0ece0] transition-colors"
          >
            <Plus className="w-4 h-4 text-[#3a3a2e]" />
          </button>
        </div>
        <span className="text-sm text-[#9a9080]">
          Total:{" "}
          <span className="font-bold text-[#1a2e1c]">
            Rs. {(productPrice * quantity).toLocaleString()}
          </span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all ${
            added
              ? "bg-green-600 text-white"
              : "bg-[var(--color-forest)] text-white hover:bg-[#2d5235] hover:shadow-lg"
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>

        <Link
          href="/checkout"
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-[#c8a24a] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#b8922a] hover:shadow-lg transition-all"
        >
          <Zap className="w-5 h-5" />
          Buy Now
        </Link>
      </div>

      {/* WhatsApp Order */}
      <a
        href={`https://wa.me/923309879158?text=${encodeURIComponent(
          `Hi! I'd like to order "${productName}" (${productWeight ?? ""}) — Qty: ${quantity}. Please assist me.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 border-2 border-[#25D366] text-[#25D366] py-3 rounded-2xl text-sm font-semibold hover:bg-[#25D366] hover:text-white transition-all"
      >
        <span>💬</span>
        Order via WhatsApp
      </a>
    </div>
  );
}
