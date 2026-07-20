"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When route change finishes, fade out loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Listen for internal clicks to trigger loader during navigation
    const handleLinkClick = (e: MouseEvent) => {
      // Ignore clicks on buttons (Add to Cart, Wishlist, Cart Drawer, etc.)
      const targetElement = e.target as HTMLElement;
      if (targetElement.closest("button") || targetElement.closest("[role='button']")) {
        return;
      }

      const target = targetElement.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        href !== pathname
      ) {
        setLoading(true);
      }
    };

    document.removeEventListener("click", handleLinkClick);
    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-out">
      <div className="relative flex flex-col items-center">
        {/* Soft Ambient Gold Glow */}
        <div className="absolute w-40 h-40 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />

        {/* Slow-motion Pulsing Logo Container on Pure White */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-5 border border-amber-900/10 shadow-2xl flex items-center justify-center animate-slowmo-logo">
          <Image
            src="/logo.png"
            alt="Bereket Foods"
            width={112}
            height={112}
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Title & Shimmer Text */}
        <div className="mt-6 text-center">
          <span className="text-2xl font-bold font-serif text-[var(--color-charcoal)] tracking-wide block">
            Bereket Foods
          </span>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-ping" />
            <span className="text-xs text-[var(--color-gold-dark)] tracking-[0.25em] uppercase font-bold animate-pulse">
              Loading Goodness...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}
