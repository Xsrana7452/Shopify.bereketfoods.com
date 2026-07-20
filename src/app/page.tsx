import { getShopifyProducts } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { ArrowRight, Leaf, Shield, Zap, Truck, Star, CheckCircle, Menu, X, Search, ShoppingCart, ChevronDown } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let featuredProducts: any[] = [];
  try {
    const allProducts = await getShopifyProducts();
    const formatted = allProducts.map(({ node }: any) => ({
      id: node.id,
      slug: node.handle,
      name: node.title,
      description: node.description,
      price: node.variants.edges[0]?.node.price.amount,
      imageUrl: node.images.edges[0]?.node.url || "/logo.png",
      category: node.productType,
      brand: node.vendor,
      variantId: node.variants.edges[0]?.node.id
    }));

    const extractWeight = (item: any): number => {
      const str = `${item.name || ""} ${item.weight || ""}`.toLowerCase();
      const matchGrams = str.match(/(\d+)\s*(g|gram|grams)/i);
      if (matchGrams) return parseInt(matchGrams[1], 10);
      const matchKg = str.match(/([\d.]+)\s*kg/i);
      if (matchKg) return Math.round(parseFloat(matchKg[1]) * 1000);
      const matchNum = str.match(/(\d+)/);
      if (matchNum) return parseInt(matchNum[1], 10);
      return 0;
    };

    formatted.sort((a: any, b: any) => {
      const getRank = (item: any) => {
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

      if (rankA === 3) {
        const nameA = (a.name || "").toLowerCase();
        const nameB = (b.name || "").toLowerCase();
        const grainRankA = nameA.includes("wheat") ? 1 : nameA.includes("barley") ? 2 : 3;
        const grainRankB = nameB.includes("wheat") ? 1 : nameB.includes("barley") ? 2 : 3;

        if (grainRankA !== grainRankB) return grainRankA - grainRankB;

        const weightA = extractWeight(a);
        const weightB = extractWeight(b);
        if (weightA !== weightB) return weightB - weightA;
      }

      return (a.name || "").localeCompare(b.name || "");
    });

    featuredProducts = formatted.slice(0, 8);
  } catch {
    featuredProducts = [];
  }

  const stats = [
    { value: "100%", label: "Natural Ingredients" },
    { value: "Halal", label: "Certified" },
    { value: "2022", label: "Est. in Pakistan" },
    { value: "Global", label: "Sourcing" },
  ];

  const features = [
    { icon: <Leaf className="w-7 h-7" />, title: "Pure & Natural", description: "Every ingredient carefully sourced from nature with zero artificial additives." },
    { icon: <Shield className="w-7 h-7" />, title: "Halal Certified", description: "Certified by Pakistan Halal Authority — safe for every Muslim household." },
    { icon: <Zap className="w-7 h-7" />, title: "Science-Backed", description: "Formulated with nutritional science to deliver optimal health benefits." },
    { icon: <Truck className="w-7 h-7" />, title: "Fast Nationwide Delivery", description: "Standard nationwide shipping across Pakistan at flat Rs. 190." },
  ];

  const brands = ["Kuvvet", "Major Grains", "Kuvvet Porridge", "Jhat Hazam"];
  
  const categories = [
    { 
      name: "KuVvet", 
      description: "Fortified Breakfast Cereals", 
      image: "/assets/images/products/kuvvet/berry-rocks.jpg", 
      search: "Kuvvet",
      color: "from-amber-500/15 via-amber-400/10 to-amber-600/5", 
      border: "border-amber-200/80" 
    },
    { 
      name: "Major Grains", 
      description: "Kids Crunchy Cereals", 
      image: "/assets/images/major_grains_group_new.jpg", 
      search: "Major Grains",
      color: "from-orange-500/15 via-orange-400/10 to-orange-600/5", 
      border: "border-orange-200/80" 
    },
    { 
      name: "KuVvet Porridge", 
      description: "Whole-Grain Instant Porridge", 
      image: "/assets/images/kuvvet_porridge_group_new.webp", 
      search: "Porridge",
      color: "from-emerald-500/15 via-emerald-400/10 to-emerald-600/5", 
      border: "border-emerald-200/80" 
    },
    { 
      name: "Jhat Hazam", 
      description: "Digestive Health Tablets", 
      image: "/assets/images/jhat_hazam_group_new.webp", 
      search: "Jhat Hazam",
      color: "from-purple-500/15 via-purple-400/10 to-purple-600/5", 
      border: "border-purple-200/80" 
    },
  ];

  const testimonials = [
    { name: "Fatima Ahmed", location: "Karachi", text: "The best quality natural products I've found in Pakistan. My family loves the granola!", rating: 5 },
    { name: "Ahmad Khan", location: "Lahore", text: "Amazing quality and fast delivery. The halal certification gives me peace of mind.", rating: 5 },
    { name: "Sarah Malik", location: "Islamabad", text: "Finally, premium natural foods that meet international standards. Highly recommended!", rating: 5 },
  ];

  return (
    <>
      {/* ─── Hero Section ──────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden pt-16 sm:pt-24">
        {/* Dynamic Video Playlist Background with Smooth Transitions */}
        <HeroVideoBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
              <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-6 sm:mb-8">
                <span className="w-2 h-2 bg-[var(--color-gold)] rounded-full animate-pulse" />
                <span className="text-sm text-white/90 font-medium tracking-wide">Premium Fortified Breakfast Cereals · Est. 2022</span>
              </div>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
              Nature&apos;s <span className="text-gradient">Finest</span><br />Goodness
            </h1>
            <p className="hero-paragraph text-lg sm:text-xl text-white/85 leading-relaxed mb-8 sm:mb-10 max-w-lg animate-fade-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              Bringing prosperity to your family&apos;s table through the perfect amalgamation of nature and science. Premium fortified breakfast cereals — Halal certified, delivered across Pakistan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}>
              <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2 text-base group">
                Shop All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white hover:text-black transition-all duration-300">
                Our Story
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 sm:gap-6 animate-fade-in-up opacity-0" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base font-medium"><CheckCircle className="w-4 h-4 text-[var(--color-gold)]" /><span className="drop-shadow-md">Halal Certified</span></div>
              <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base font-medium"><CheckCircle className="w-4 h-4 text-[var(--color-gold)]" /><span className="drop-shadow-md">100% Natural</span></div>
              <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base font-medium"><CheckCircle className="w-4 h-4 text-[var(--color-gold)]" /><span className="drop-shadow-md">Free Shipping</span></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full bg-white/10 backdrop-blur-lg border-t border-white/10 mt-6 sm:mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center px-3 sm:px-4 py-2 sm:py-0 animate-fade-in-up opacity-0 flex flex-col justify-center" style={{ animationDelay: `${650 + i * 100}ms`, animationFillMode: 'forwards' }}>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Brands Bar ─────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-8">Trusted Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {brands.map((brand, i) => (
              <span key={brand} className="text-lg sm:text-xl font-serif font-semibold text-gray-300 hover:text-[var(--color-gold)] transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Product Ranges / Categories Section ─────────────────── */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-[0.2em] mb-3">Our Product Ranges</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)]">Explore By Brand</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link key={cat.name} href={`/products?search=${encodeURIComponent(cat.search)}`}
                className={`group flex flex-col items-center text-center p-6 rounded-2xl border-2 ${cat.border} bg-gradient-to-br ${cat.color} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 animate-fade-in-up opacity-0`}
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                <div className="w-24 h-24 mb-4 rounded-2xl bg-white/80 p-2 shadow-inner border border-white flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image src={cat.image} alt={cat.name} width={88} height={88} className="object-contain w-full h-full" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] leading-snug group-hover:text-[var(--color-gold)] transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Products ──────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-[0.2em] mb-3">Handpicked for You</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)]">Featured Products</h2>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)] hover:text-[#A68B4D] transition-colors group">
              View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {featuredProducts.map((product, i) => (
                <div key={product.id} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                  <ProductCard id={product.id} slug={product.slug} name={product.name} shortDescription={product.shortDescription} price={product.price} comparePrice={product.comparePrice} imageUrl={product.imageUrl} category={product.category} weight={product.weight} badge={product.badge} inStock={product.inStock} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[var(--color-cream)] rounded-3xl">
              <p className="text-gray-500 mb-4">No featured products yet.</p>
              <Link href="/products" className="text-[var(--color-gold)] font-semibold underline">View All Products</Link>
            </div>
          )}
          <div className="mt-10 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)] border-2 border-[var(--color-gold)] px-6 py-3 rounded-full hover:bg-[var(--color-gold)] hover:text-white transition-all">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ──────────────────────────────────── */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-[0.2em] mb-3">Our Promise</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)]">Why Choose Bereket?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:border-[var(--color-gold)]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-gold)] mb-5 group-hover:bg-[var(--color-gold)] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-[0.2em] mb-3">Customer Love</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-charcoal)]">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-[var(--color-cream)] rounded-2xl border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />)}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/20 flex items-center justify-center text-[var(--color-gold)] font-semibold">{t.name[0]}</div>
                  <div><p className="font-semibold text-[var(--color-charcoal)]">{t.name}</p><p className="text-sm text-gray-400">{t.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Banner CTA ─────────────────────────────────────── */}
      <section className="py-20 bg-[var(--color-forest)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--color-gold)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-[var(--color-forest)]/10 rounded-full blur-2xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sm font-semibold text-[var(--color-forest)] uppercase tracking-[0.2em] mb-4">Free Shipping Over Rs. 2,000</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Start Your Natural Journey Today</h2>
          <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto">Discover our premium range of natural foods and experience the difference quality makes.</p>
          <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-[var(--color-gold)] text-white px-10 py-4 rounded-full font-semibold text-base hover:bg-[#A68B4D] transition-all hover:shadow-xl hover:scale-[1.02] group">
            Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ─── Newsletter ─────────────────────────────────────── */}
      <section className="section-padding bg-[var(--color-cream)]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-[0.2em] mb-3">Stay Updated</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-charcoal)] mb-4">Join Our Newsletter</h2>
            <p className="text-gray-500 mb-8">Get exclusive offers, new product updates, and healthy recipes delivered to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="input-field flex-1" required />
              <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
