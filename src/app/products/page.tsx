import { getShopifyProducts } from "@/lib/shopify";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  let shopifyQuery = "";
  if (params?.category) {
    shopifyQuery += `product_type:"${params.category}" `;
  }
  if (params?.search) {
    shopifyQuery += `"${params.search}"`;
  }
  shopifyQuery = shopifyQuery.trim();

  const shopifyProducts = await getShopifyProducts(shopifyQuery || undefined);


  // Map Shopify data to ProductCard props
  const formattedProducts: ProductCardProps[] = shopifyProducts.map(({ node }: any) => {
    const firstVariant = node.variants.edges[0]?.node;
    const inStock =
      firstVariant?.availableForSale === true ||
      (node.totalInventory !== null && node.totalInventory > 0);

    return {
      id: (firstVariant?.id || node.id) as string,
      slug: node.handle as string,
      name: node.title as string,
      shortDescription: node.description || null,
      price: firstVariant?.price?.amount ?? "0",
      comparePrice: firstVariant?.compareAtPrice?.amount ?? null,
      imageUrl: node.images.edges[0]?.node.url || "/logo.png",
      category: node.productType || null,
      brand: node.vendor || null,
      weight:
        firstVariant?.weight && firstVariant?.weightUnit
          ? `${firstVariant.weight} ${firstVariant.weightUnit}`
          : null,
      inStock,
    };
  });

  // Sort products as requested: 1st Kuvvet, 2nd Major Grains, 3rd Kuvvet Porridge, 4th Jhat Hazam
  formattedProducts.sort((a, b) => {
    const getRank = (item: ProductCardProps) => {
      const name = (item.name || "").toLowerCase();
      const brand = (item.brand || "").toLowerCase();
      const cat = (item.category || "").toLowerCase();

      if (name.includes("jhat hazam") || brand.includes("jhat hazam")) return 4;
      if (name.includes("porridge") || cat.includes("porridge")) return 3;
      if (name.includes("major grains") || brand.includes("major grains")) return 2;
      if (name.includes("kuvvet") || brand.includes("kuvvet")) return 1;
      return 5;
    };

    const rankA = getRank(a);
    const rankB = getRank(b);
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="bg-[var(--color-cream)] min-h-screen pb-20">
      {/* ── Shop Header Banner ── */}
      <section className="bg-gradient-to-b from-emerald-950 via-[#0E2F1B] to-[var(--color-forest)] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-amber-400 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-4 border border-white/15 shadow-sm">
            BEREKET FOODS · NUTRITIONALLY FORTIFIED
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
            Premium Fortified Breakfast Cereals
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Discover the complete range of wholesome, vitamin-fortified breakfast cereals, whole-grain porridges, and natural digestive remedies by Bereket Foods — crafted for optimal family health and energy.
          </p>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {formattedProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-neutral-200/80 shadow-md">
            <span className="text-5xl mb-4 block">🌾</span>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">No products found</h2>
            <p className="text-neutral-500 text-sm">Check back soon or try clearing your search filter!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {formattedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                shortDescription={product.shortDescription}
                price={product.price}
                comparePrice={product.comparePrice}
                imageUrl={product.imageUrl}
                category={product.category}
                brand={product.brand}
                weight={product.weight}
                inStock={product.inStock}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
