import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { CartProvider } from "@/context/cart-context";
import { SnowfallProvider } from "@/context/snowfall-context";
import { CartSidebar } from "@/components/cart-sidebar";
import { JsonLd } from "@/components/schema";
import SnowfallEffect from "@/components/ui/snowfall-effect";
import { PageLoader } from "@/components/ui/page-loader";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lapzen.shop"),
  title: "Lapzen - Premium Laptops",
  description: "Your destination for premium laptops. Shop top brands like Apple, Dell, HP, and Asus at competitive prices.",
  openGraph: {
    title: "Lapzen - Premium Laptops",
    description: "Your destination for premium laptops. Shop top brands like Apple, Dell, HP, and Asus at competitive prices.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Lapzen - Premium Laptops" }],
    type: "website",
    siteName: "Lapzen",
  },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/logo.png", type: "image/png", sizes: "32x32" },
        { url: "/logo.png", type: "image/png", sizes: "16x16" },
        { url: "/logo.png", type: "image/png", sizes: "48x48" },
      ],
      shortcut: ["/logo.png"],
      apple: [
        { url: "/logo.png", sizes: "180x180", type: "image/png" },
      ],
      other:[
      {
        rel: "apple-touch-icon-precomposed",
        url: "/logo.png",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lapzen - Premium Laptops",
    description: "Your destination for premium laptops. Shop top brands like Apple, Dell, HP, and Asus at competitive prices.",
    images: ["/logo.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lapzen",
  "url": "https://lapzen.shop",
  "logo": "https://lapzen.shop/logo.png",
  "sameAs": [
    "https://facebook.com/lap.lapzen",
    "https://instagram.com/lapzen.store",
    "https://twitter.com/lapzenstore"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+92-309-0009022",
    "contactType": "customer service"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lapzen",
  "url": "https://lapzen.shop",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lapzen.shop/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="30a3b2a7-1c44-4e92-830e-99deedbc650e"
        />
        <Script
          id="orchids-browser-logs-2"
          src="https://ojvgpgjokyjriesqkncz.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="3703ae26-4d55-4c16-ad94-b7374ad76a02"
        />
        <CartProvider>
          <SnowfallProvider>
            <SnowfallEffect />
            <Script
              src="https://ojvgpgjokyjriesqkncz.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
              strategy="afterInteractive"
              data-target-origin="*"
              data-message-type="ROUTE_CHANGE"
              data-include-search-params="true"
              data-only-in-iframe="true"
              data-debug="true"
              data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
            />
            {children}
            <Analytics />
            <CartSidebar />
          </SnowfallProvider>
        </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
