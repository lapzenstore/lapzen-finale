import React from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ProductDetails } from "@/components/product-details";
import { JsonLd } from "@/components/schema";
import { notFound } from "next/navigation";
import { ProductsSection } from "@/components/sections/featured-products";
import { slugify } from "@/lib/slugify";
import type { Metadata } from "next";

import { supabaseAdmin } from "@/lib/supabase-admin";

async function getProductBySlug(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*');
      
    if (error || !data) {
      console.error("Error fetching products:", error);
      return null;
    }

    // Find the product whose slugified title matches the slug
    const product = data.find(p => slugify(p.title) === slug);
    return product || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

async function getRelatedProducts(brand: string, currentId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('brand', brand)
      .neq('id', currentId)
      .limit(4);
      
    if (error) {
      console.error("Error fetching related products:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.brand, product.id);

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.image_urls?.[0] || product.image_url,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Lapzen"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PKR",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={productSchema} />
      <Header />
      
        <main className="flex-grow bg-white">
          <div className="container px-4 pt-44 pb-12 md:pt-60 md:pb-20 mx-auto">
            <ProductDetails product={product} />
          </div>

        {/* Related Products Section */}
        <div className="border-t border-border">
          <ProductsSection 
            title="Related Products" 
            description="You might also be interested in these laptops"
            brand={product.brand}
            initialProducts={relatedProducts}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
