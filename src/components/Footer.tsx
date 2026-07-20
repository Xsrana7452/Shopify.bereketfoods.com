import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-12 pb-6 px-6 md:px-12">
      {/* 1. CERTIFICATIONS SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h4 className="text-center text-xs tracking-widest text-[#E2A82C] font-semibold uppercase mb-8">
          Certifications & Licenses
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "PSQCA Certified", desc: "Pakistan Standards & Quality Control", icon: "🛡️" },
            { title: "Halal Certified", desc: "Pakistan Halal Authority", icon: "✅" },
            { title: "ISO 22000", desc: "Food Safety Management", icon: "🎖️" },
            { title: "FSMS Compliant", desc: "Food Safety Standards", icon: "🛡️" }
          ].map((cert, index) => (
            <div 
              key={index} 
              className="bg-[#161616] border border-neutral-800 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#E2A82C]/50 transition-colors duration-300"
            >
              <span className="text-2xl mb-3 text-[#E2A82C]">{cert.icon}</span>
              <h5 className="font-semibold text-sm mb-1">{cert.title}</h5>
              <p className="text-xs text-neutral-400">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-neutral-800 max-w-7xl mx-auto mb-12" />

      {/* 2. MAIN FOOTER LINKS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Transparent logo container replacement */}
            <div className="w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden bg-transparent">
              <img 
                src="/logo.png" // Replace with your logo path
                alt="Bereket Foods" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-wide">Bereket Foods</h3>
              <span className="text-[10px] tracking-widest text-[#E2A82C] uppercase font-semibold">
                Premium Natural Foods
              </span>
            </div>
          </div>
          
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            Bringing prosperity to your table through the perfect amalgamation of nature and science. Premium natural foods — Halal certified, delivered across Pakistan.
          </p>

          <div className="flex flex-col gap-2 text-xs text-neutral-400 mt-2">
            <span className="flex items-center gap-2">
              📍 <span className="hover:text-white transition-colors">3rd Floor, 13-Plaza, Overseas V Commercial, Bahria Town Phase 8, Islamabad</span>
            </span>
            <span className="flex items-center gap-2">
              📞 <a href="tel:+923309879158" className="hover:text-white transition-colors">+92 330 9879158</a>
            </span>
            <span className="flex items-center gap-2">
              ✉️ <a href="mailto:info@bereketfoods.com" className="hover:text-white transition-colors">info@bereketfoods.com</a>
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 md:col-start-7">
          <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-neutral-200">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-xs text-neutral-400">
            {['Home', 'Shop', 'About Us', 'Checkout'].map((link) => (
              <li key={link}>
                <Link href={`/${link.toLowerCase().replace(' ', '')}`} className="hover:text-[#E2A82C] transition-colors duration-200">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="md:col-span-3">
          <h4 className="font-semibold text-sm mb-4 tracking-wider uppercase text-neutral-200">Categories</h4>
          <ul className="flex flex-col gap-3 text-xs text-neutral-400">
            {['Breakfast Cereals', 'Granola & Snacks', 'Superfoods', 'Jams & Condiments', 'Natural Sweeteners'].map((cat) => (
              <li key={cat}>
                <Link href={`/shop?category=${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="hover:text-[#E2A82C] transition-colors duration-200">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="border-neutral-900 max-w-7xl mx-auto mb-6" />

      {/* 3. SUB-FOOTER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <p>© 2026 Bereket Foods. All Rights Reserved.</p>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-neutral-600">Payment:</span>
          <span className="bg-[#8b1d40] text-white px-2 py-0.5 rounded text-[10px] font-bold">JazzCash</span>
          <span className="bg-[#10b981] text-white px-2 py-0.5 rounded text-[10px] font-bold">EasyPaisa</span>
          <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded text-[10px] font-bold">COD</span>
        </div>
      </div>
    </footer>
  );
}
