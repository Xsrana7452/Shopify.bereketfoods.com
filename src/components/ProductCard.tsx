"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import clsx from "clsx";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  price: string;
  comparePrice?: string | null;
  imageUrl?: string | null;
  category?: string | null;
  weight?: string | null;
  badge?: string | null;
  inStock?: boolean | null;
  brand?: string | null;
}

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-[var(--color-gold)] text-white",
  "New": "bg-[var(--color-forest)] text-white",
  "Fan Favorite": "bg-[#8B7240] text-white",
  "Organic": "bg-[var(--color-forest)] text-white",
  "Artisan": "bg-[#A68B4D] text-white",
  "Raw & Pure": "bg-[var(--color-gold)] text-white",
  "Complete Protein": "bg-[var(--color-forest)] text-white",
  "Limited Edition": "bg-[#7A5A3D] text-white",
  "Sale": "bg-red-500 text-white",
  "Hot": "bg-orange-500 text-white",
};

export default function ProductCard({
  id,
  slug,
  name,
  shortDescription,
  price,
  comparePrice,
  imageUrl,
  weight,
  badge,
  inStock = true,
  brand,
}: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price: parseFloat(price),
      imageUrl: imageUrl ?? "/logo.png",
      weight: weight ?? undefined,
    });
  };

  const priceNum = parseFloat(price);
  const comparePriceNum = comparePrice ? parseFloat(comparePrice) : null;
  const discount =
    comparePriceNum && comparePriceNum > priceNum
      ? Math.round(((comparePriceNum - priceNum) / comparePriceNum) * 100)
      : null;
  const badgeStyle = badge
    ? (BADGE_STYLES[badge] ?? "bg-[var(--color-gold)] text-white")
    : null;

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-amber-900/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300 relative"
    >
      {/* ── Image: Aspect Square with object-contain to display 100% complete packshots ── */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-[#FAF8F5] via-[#F6F2EB] to-[#EFEBE4] p-2 sm:p-4 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-2 sm:p-3 group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl sm:text-4xl">🌾</span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label="Save to favorites"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all z-10"
        >
          <Heart
            className={clsx("w-3.5 h-3.5 sm:w-4 sm:h-4", isLiked && "fill-red-500 text-red-500")}
          />
        </button>

        {/* Badges — top left */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {badge && badgeStyle && (
            <span
              className={clsx(
                "text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wider uppercase shadow-sm",
                badgeStyle
              )}
            >
              {badge}
            </span>
          )}
          {discount && (
            <span className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-red-600 text-white shadow-sm tracking-wide">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="text-white text-[10px] sm:text-xs font-bold bg-black/70 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Details: flex-1 so all cards align at the bottom ── */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Brand */}
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="text-[9px] sm:text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-widest truncate">
              {brand || "Bereket Foods"}
            </span>
            {weight && (
              <span className="text-[8px] sm:text-[10px] text-gray-500 font-semibold bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-100 whitespace-nowrap">
                {weight}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[var(--color-gold)] transition-colors line-clamp-2 min-h-[32px] sm:min-h-[40px] leading-tight sm:leading-snug">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 my-1.5 sm:my-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={clsx(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3",
                    s <= 4
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">(4.8)</span>
          </div>

          {/* Description */}
          <p className="text-[10px] sm:text-xs text-neutral-500 line-clamp-2 min-h-[26px] sm:min-h-[32px] leading-relaxed mb-1.5 sm:mb-2">
            {shortDescription ||
              "Pure, wholesome natural ingredients crafted for nourishment."}
          </p>
        </div>

        {/* ── Price & CTA ── */}
        <div className="pt-2 sm:pt-3 border-t border-neutral-100 flex items-center justify-between gap-1 sm:gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-base font-extrabold text-neutral-900">
                Rs. {priceNum.toLocaleString()}
              </span>
              {comparePriceNum && comparePriceNum > priceNum && (
                <span className="text-[9px] sm:text-xs text-gray-400 line-through">
                  Rs. {comparePriceNum.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={clsx(
              "flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 shadow-sm",
              inStock
                ? "bg-[var(--color-forest)] text-white hover:bg-[#0d5530] hover:shadow-md hover:scale-105 active:scale-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
