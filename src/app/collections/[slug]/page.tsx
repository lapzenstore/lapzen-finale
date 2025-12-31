import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ProductsSection } from "@/components/sections/featured-products";
import { JsonLd } from "@/components/schema";
import { redirect } from "next/navigation";

export default async function CollectionPage(props: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const { slug } = params;

  if (slug === "all") {
    redirect("/catalog");
  }

  const brand = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": brand === "All" ? "All Laptops Collection" : `${brand} Laptops`,
    "description": `Browse our premium collection of ${brand} laptops at Lapzen.`,
    "url": `https://lapzen.store/brands/${slug}`
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={collectionSchema} />
      <Header />
      <main className="flex-grow pt-12">
        <div className="container mb-8">
          <h1 className="text-4xl font-bold text-navy uppercase tracking-tighter">
            {brand === "All" ? "All Products" : `${brand} Collection`}
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover our premium selection of {brand === "All" ? "high-performance laptops" : `${brand} devices`}.
          </p>
        </div>
        <ProductsSection brand={brand === "All" ? undefined : brand} />
      </main>
      <Footer />
    </div>
  );
}
