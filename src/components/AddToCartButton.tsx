"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import clsx from "clsx";

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  weight?: string | null;
  inStock?: boolean;
}

export default function AddToCartButton({
  id,
  name,
  price,
  imageUrl,
  weight,
  inStock = true,
}: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem({
      id,
      name,
      price: parseFloat(price),
      imageUrl,
      weight: weight ?? undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={!inStock}
      className={clsx(
        "w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base font-bold transition-all duration-300",
        inStock
          ? added
            ? "bg-green-500 text-white scale-[0.98]"
            : "bg-[var(--color-gold)] text-white hover:bg-[#A68B4D] hover:scale-[1.02] shadow-lg hover:shadow-xl"
          : "bg-gray-200 text-gray-400 cursor-not-allowed"
      )}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </>
      )}
    </button>
  );
}
