import dynamic from "next/dynamic";
import Header from "@/components/sections/header";
import HeroBanner from "@/components/sections/hero-banner";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { JsonLd } from "@/components/schema";

// Dynamic imports for below-the-fold components
const FeaturedProducts = dynamic(() => import("@/components/sections/featured-products").then(mod => mod.ProductsSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-muted rounded-3xl" />
});
const BrandGrid = dynamic(() => import("@/components/sections/brand-grid"));
const CategoryGrid = dynamic(() => import("@/components/sections/category-grid"));
const PopularSeriesSection = dynamic(() => import("@/components/sections/popular-series-grid"));
const BrandStory = dynamic(() => import("@/components/sections/brand-story"));
const FAQAccordion = dynamic(() => import("@/components/sections/faq-accordion"));
const Footer = dynamic(() => import("@/components/sections/footer"));

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Lapzen - Premium Laptops Store",
    "description": "Premium destination for high-performance laptops, featuring brands like Apple, Dell, and Asus.",
    "publisher": {
      "@type": "Organization",
      "name": "Lapzen"
    }
  };

  return (
    <div className="flex min-h-screen flex-col selection:bg-navy/10">
      <JsonLd data={homeSchema} />
      <Header />
      
      <main className="flex-grow">
        <HeroBanner />
        
        <ScrollReveal delay={0.1}>
          <FeaturedProducts 
            title="Featured Laptops"
            description="Our top picks for power and performance"
            type="featured"
            viewAllLink="/catalog?featured=true"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <FeaturedProducts 
            title="New Arrivals"
            description="Check out our latest high-performance laptops"
            type="new_arrival"
            viewAllLink="/catalog?new_arrival=true"
          />
        </ScrollReveal>

        <ScrollReveal>
          <BrandGrid />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <CategoryGrid />
        </ScrollReveal>

        <ScrollReveal>
          <PopularSeriesSection />
        </ScrollReveal>

        <div className="relative overflow-hidden">
          <div className="grid-overlay absolute inset-0 pointer-events-none opacity-40" />
          <ScrollReveal direction="up">
            <BrandStory />
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <FAQAccordion />
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
