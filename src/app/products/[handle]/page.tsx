import { getShopifyProductByHandle } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductPageClient from "./ProductPageClient";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const node = await getShopifyProductByHandle(handle);

  if (!node) {
    notFound();
  }

  const firstVariant = node.variants.edges[0]?.node;

  const product = {
    id: (firstVariant?.id || node.id) as string,
    title: node.title as string,
    description: node.description as string,
    price: firstVariant?.price?.amount ?? "0",
    comparePrice: firstVariant?.compareAtPrice?.amount ?? null,
    imageUrl: node.images.edges[0]?.node.url || "/logo.png",
    vendor: node.vendor as string,
    weight:
      firstVariant?.weight && firstVariant?.weightUnit
        ? `${firstVariant.weight} ${firstVariant.weightUnit}`
        : null,
    inStock:
      firstVariant?.availableForSale === true ||
      (node.totalInventory !== null && node.totalInventory > 0),
  };

  const priceNum = parseFloat(product.price);
  const comparePriceNum = product.comparePrice
    ? parseFloat(product.comparePrice)
    : null;
  const discount =
    comparePriceNum && comparePriceNum > priceNum
      ? Math.round(((comparePriceNum - priceNum) / comparePriceNum) * 100)
      : null;

  // Collect all images for the gallery
  const images = node.images.edges.map((e: any) => ({
    url: e.node.url as string,
    altText: (e.node.altText as string) || product.title,
  }));

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* ── LEFT: Image Gallery ── */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <Image
              src={images[0]?.url || "/logo.png"}
              alt={images[0]?.altText || product.title}
              fill
              className="object-contain p-6"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails (if more than one image) */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((img: { url: string; altText: string }, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-100"
                >
                  <Image
                    src={img.url}
                    alt={img.altText}
                    fill
                    className="object-contain p-2"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div className="flex flex-col gap-5">
          {/* Brand */}
          {product.vendor && (
            <span className="text-xs font-bold text-[var(--color-gold)] uppercase tracking-[0.18em]">
              {product.vendor}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-[var(--color-charcoal)] leading-tight">
            {product.title}
          </h1>

          {/* Price row */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-[var(--color-charcoal)]">
              Rs. {priceNum.toLocaleString()}
            </span>
            {comparePriceNum && comparePriceNum > priceNum && (
              <span className="text-base text-gray-400 line-through">
                Rs. {comparePriceNum.toLocaleString()}
              </span>
            )}
          </div>

          {/* Weight */}
          {product.weight && (
            <p className="text-sm text-gray-500 font-medium bg-[#f5f0e8] px-3 py-1.5 rounded-full w-fit">
              {product.weight}
            </p>
          )}

          {/* Stock indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                product.inStock ? "bg-green-500" : "bg-red-400"
              }`}
            />
            <span
              className={`text-sm font-semibold ${
                product.inStock ? "text-green-700" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* ── Client: Qty picker + Add to Cart + WhatsApp ── */}
          <div className="border-t border-gray-100 pt-4">
            <ProductPageClient
              productId={product.id}
              productName={product.title}
              productPrice={priceNum}
              productImageUrl={product.imageUrl}
              productWeight={product.weight}
              inStock={product.inStock}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
