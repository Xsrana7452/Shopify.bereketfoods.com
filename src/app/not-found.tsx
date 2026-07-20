import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[var(--color-forest)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-10 h-10 text-[var(--color-forest)]" />
        </div>
        <h1 className="font-serif text-5xl font-bold text-[#1a2e1c] mb-4">404</h1>
        <h2 className="text-xl font-bold text-[#3a3a2e] mb-3">
          Page Not Found
        </h2>
        <p className="text-[#6b7c6b] mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you were looking for. It may
          have moved or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[var(--color-forest)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2d5235] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-[var(--color-forest)] text-[var(--color-forest)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--color-forest)] hover:text-white transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
