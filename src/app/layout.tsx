import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "Bereket Foods — Premium Natural Foods Pakistan",
    template: "%s | Bereket Foods",
  },
  description:
    "Discover Bereket Foods' premium range of natural foods including muesli, oatmeal, granola, superfoods, and artisan jams. Halal certified. Delivered across Pakistan.",
  keywords: [
    "natural foods Pakistan",
    "muesli Pakistan",
    "organic oats",
    "halal cereals",
    "healthy breakfast",
    "Bereket Foods",
    "superfoods",
    "granola Pakistan",
  ],
  authors: [{ name: "Bereket Foods" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://www.bereketfoods.com",
    siteName: "Bereket Foods",
    title: "Bereket Foods — Premium Natural Foods Pakistan",
    description:
      "Premium natural foods crafted with nature and science. Muesli, oatmeal, granola, superfoods and more. Halal certified, delivered across Pakistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bereket Foods — Premium Natural Foods Pakistan",
    description:
      "Premium natural foods crafted with nature and science. Halal certified, delivered across Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--color-cream)] text-[#3a3a2e] antialiased font-sans" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
