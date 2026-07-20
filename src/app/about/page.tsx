import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Globe, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bereket Foods — a science and nature-led consumer healthcare and FMCG company bringing natural goodness to Pakistan since 2022.",
};

export default function AboutPage() {
  const milestones = [
    { year: "2022", event: "Bereket Foods founded in Islamabad" },
    { year: "2022", event: "Launched first range of premium breakfast cereals" },
    { year: "2023", event: "Obtained PSQCA & Halal Certifications" },
    { year: "2023", event: "Expanded to over 10 major cities across Pakistan" },
    { year: "2024", event: "Launched superfoods & artisan condiments range" },
    { year: "2025", event: "Opened state-of-the-art factory in Multan" },
  ];

  const team = [
    {
      initials: "AM",
      name: "Aitisam Mufti",
      role: "Executive Director",
      bio: "Leading strategic initiatives and overseeing day-to-day operations of Bereket Foods Pvt Ltd.",
    },
    {
      initials: "RN",
      name: "Rana Nouman",
      role: "Trade Marketing Manager",
      bio: "Driving brand growth and market expansion strategies across Pakistan.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#1a2e1c] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('/assets/images/story/about-hero.webp')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--color-forest)]/30 border border-[var(--color-forest)] rounded-full px-4 py-2 mb-6">
            <Leaf className="w-4 h-4 text-[var(--color-forest)]" />
            <span className="text-sm text-[var(--color-forest)] font-medium">
              EST. 2022 · Islamabad, Pakistan
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Who We Are
          </h1>
          <p className="text-xl text-[#a8c5ab] max-w-2xl mx-auto leading-relaxed">
            A science and nature led Consumer Healthcare and FMCG company that
            aims to utilize nature and science to help people aim more, do more
            and live more.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--color-forest)] uppercase tracking-[0.2em] mb-4">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2e1c] mb-6 leading-tight">
              Nourishing Lives Since 2022
            </h2>
            <p className="text-[#3a3a2e] leading-relaxed mb-4">
              At Bereket Foods, we believe that good health starts with what
              you put on your plate. We are a pioneer in nature and science,
              bringing purity to your table. From humble roots to a growing
              name, we cultivate prosperity through innovation and deep respect
              for the land.
            </p>
            <p className="text-[#3a3a2e] leading-relaxed mb-6">
              We ensure only the finest, safest ingredients reach your home —
              sourced globally, quality-tested locally, and delivered with love
              to families across Pakistan.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Globe className="w-5 h-5" />, label: "Global Sourcing", value: "20+ Countries" },
                { icon: <Users className="w-5 h-5" />, label: "Team Size", value: "51-200 Employees" },
                { icon: <Award className="w-5 h-5" />, label: "Certifications", value: "4 Active" },
                { icon: <Leaf className="w-5 h-5" />, label: "Natural Products", value: "Zero Additives" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#f5f0e8] rounded-2xl p-4">
                  <div className="text-[var(--color-forest)] mb-2">{stat.icon}</div>
                  <p className="text-lg font-bold text-[#1a2e1c]">{stat.value}</p>
                  <p className="text-xs text-[#6b7c6b]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[450px] rounded-3xl overflow-hidden bg-[#f5f0e8]">
            <Image
              src="/assets/images/story/about-hero.webp"
              alt="Bereket Foods natural foods"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--color-forest)] uppercase tracking-[0.2em] mb-3">
              Core Pillars
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2e1c]">
              What Defines Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Values",
                items: ["Goodness", "Innovation", "Quality", "Perseverance", "Excellence"],
                icon: <Leaf className="w-10 h-10 text-[var(--color-forest)] mb-4" />,
              },
              {
                title: "Culture",
                items: ["Equality", "Integrity", "Diversity", "Ownership", "Openness"],
                icon: <Users className="w-10 h-10 text-[var(--color-forest)] mb-4" />,
              },
              {
                title: "Environment",
                items: ["Sustainability", "Conservation", "Advocacy", "Responsibility", "Impact"],
                icon: <Globe className="w-10 h-10 text-[var(--color-forest)] mb-4" />,
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white border border-[#f0ece0] rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {pillar.icon}
                <h3 className="text-xl font-bold text-[#1a2e1c] mb-4">{pillar.title}</h3>
                <ul className="space-y-3 text-sm text-[#3a3a2e]">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-[#E2A82C] font-bold text-xs">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--color-forest)] uppercase tracking-[0.2em] mb-3">
            Our Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a2e1c]">
            Milestones
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#e0d9c8]" />
          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-6 relative pl-16">
                <div className="absolute left-5 top-1 w-6 h-6 rounded-full bg-[var(--color-forest)] border-4 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-5 border border-[#f0ece0] hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold text-[var(--color-forest)] bg-[var(--color-forest)]/10 px-2 py-0.5 rounded-full">
                    {milestone.year}
                  </span>
                  <p className="text-sm font-semibold text-[#1a2e1c] mt-2">
                    {milestone.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#1a2e1c]">
              Our Offices
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "🏢 Islamabad Office",
                address: "3rd Floor, 13-Plaza, Overseas V Commercial, Bahria Town Phase 8, Islamabad",
              },
              {
                type: "🌍 Overseas Office",
                address: "Suite 205, 40 Hunt Street, Ajax, ON L1S 3M2, Canada",
              },
              {
                type: "🏭 Factory",
                address: "2 Km From Bahawalpur Bypass, Bahawalpur Road, Multan",
              },
            ].map((office) => (
              <div 
                key={office.type} 
                className="bg-[#f9f8f6] rounded-3xl p-6 border border-[#e8e3d5] h-full flex flex-col justify-start"
              >
                <h3 className="font-bold text-[#1a2e1c] mb-3">{office.type}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 bg-[#1a2e1c] text-center px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#c8a24a] rounded-full blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#117744] rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Experience the Bereket Difference
          </h2>
          <p className="text-emerald-100 text-base mb-8 max-w-lg mx-auto">
            Start your natural health journey with our premium product range.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#c8a24a] text-white px-10 py-4 rounded-full font-bold hover:bg-[#b8922a] transition-all group"
          >
            Shop Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
