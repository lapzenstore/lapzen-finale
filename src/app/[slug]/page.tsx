import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import AboutHeroBanner from "@/components/sections/about-hero-banner";
import AboutIntro from "@/components/sections/about-intro";
import TeamGrid from "@/components/sections/team-grid";
import WarrantyTabs from "@/components/sections/warranty-tabs";
import FAQsFullContent from "@/components/sections/faqs-full-content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { JsonLd } from "@/components/schema";

export default async function GenericPage(props: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "url": `https://lapzen.com/${slug}`
  };

  if (slug === "about") {
    return (
      <div className="flex min-h-screen flex-col">
        <JsonLd data={pageSchema} />
        <Header />
        <main className="flex-grow">
          <AboutHeroBanner />
          <TeamGrid />
        </main>
        <Footer />
      </div>
    );
  }

    if (slug === "warranty") {
      return (
        <div className="flex min-h-screen flex-col">
          <JsonLd data={pageSchema} />
          <Header />
          <main className="flex-grow">
            <WarrantyTabs />
          </main>
          <Footer />
        </div>
      );
    }

    if (slug === "faqs") {
      return (
        <div className="flex min-h-screen flex-col">
          <JsonLd data={pageSchema} />
          <Header />
          <main className="flex-grow">
            <FAQsFullContent />
          </main>
          <Footer />
        </div>
      );
    }

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={pageSchema} />
      <Header />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-navy/5 mb-8">
            <Clock className="w-10 h-10 text-navy" />
          </div>
          <h1 className="text-5xl font-bold text-navy mb-4 uppercase tracking-tighter">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            This page is currently under development. We are working hard to bring you detailed information about our {title.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="h-12 px-8 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Return to Store
              </Button>
            </Link>
            <Link href="https://wa.me/923090009022" target="_blank">
              <Button variant="outline" className="h-12 px-8">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
