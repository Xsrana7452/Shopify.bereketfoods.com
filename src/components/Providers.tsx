"use client";

// This component wraps all client-side providers.
// By being a Client Component itself, it ensures all children that use
// client-side APIs (like Zustand stores) are properly hydrated.
// The Navbar, CartDrawer, and WhatsApp button are rendered here so they
// have access to the Zustand cart store after hydration.

import Navbar from "./Navbar";
import CartSheet from "./CartSheet";
import WhatsAppButton from "./WhatsAppButton";
import Footer from "./Footer";
import PageLoader from "./PageLoader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-cream)]">
      <PageLoader />
      <Navbar />
      <CartSheet />
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

