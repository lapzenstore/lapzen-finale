import dynamic from "next/dynamic";
import Header from "@/components/sections/header";
import HeroBanner from "@/components/sections/hero-banner";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { JsonLd } from "@/components/schema";

// Dynamic imports for below-the-fold components
const FeaturedProducts = dynamic(() => import("@/components/sections/featured-products").then(mod => mod.ProductsSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-muted rounded-3xl" />
});
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
          <FeaturedProducts 
            title="HP Laptops"
            description="Premium HP laptops for work and play"
            brand="HP"
            limit={4}
            viewAllLink="/brands/hp"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <FeaturedProducts 
            title="Dell Laptops"
            description="High-performance Dell laptops for every professional"
            brand="Dell"
            limit={4}
            viewAllLink="/brands/dell"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <FeaturedProducts 
            title="Apple MacBooks"
            description="Experience the power of M-series chips"
            brand="Apple"
            limit={4}
            viewAllLink="/brands/apple"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <FeaturedProducts 
            title="Lenovo Laptops"
            description="Reliable and versatile laptops for everyone"
            brand="Lenovo"
            limit={4}
            viewAllLink="/brands/lenovo"
          />
        </ScrollReveal>

        <ScrollReveal>
          <FeaturedProducts 
            title="Acer Laptops"
            description="Value-packed Acer laptops for students and home use"
            brand="Acer"
            limit={4}
            viewAllLink="/brands/acer"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <FeaturedProducts 
            title="Toshiba Laptops"
            description="Durable Toshiba laptops for everyday tasks"
            brand="Toshiba"
            limit={4}
            viewAllLink="/brands/toshiba"
          />
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
