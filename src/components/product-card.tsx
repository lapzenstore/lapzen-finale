"use client";

import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/schema";

import Link from "next/link";
import { slugify } from "@/lib/slugify";

interface Product {
  id: string;
  title?: string;
  description?: string;
  price: number;
  images?: string[];
  image_url?: string;
  image_urls?: string[];
  category?: string;
  brand?: string;
  series?: string;
  ram_size?: string;
  storage_size?: string;
  specs?: any;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const title = product.title || "Untitled Product";
  const image = (product.image_urls && product.image_urls.length > 0)
    ? product.image_urls[0]
    : (product.images && product.images.length > 0) 
      ? product.images[0] 
      : product.image_url || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop";
  
  const displaySpecs = [
    product.ram_size || product.specs?.ram,
    product.storage_size || product.specs?.storage
  ].filter(Boolean).join(" • ");

    const slug = slugify(title);

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": title,
      "image": image,
      "description": product.description || `High-performance ${title} laptop with ${displaySpecs}`,
      "brand": {
        "@type": "Brand",
        "name": product.brand || "Lapzen"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://lapzen.com/products/${slug}`,
        "priceCurrency": "PKR",
        "price": product.price,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    };


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: title,
      price: product.price,
      image: image,
    });
  };

  return (
    <div className="group bg-white border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-navy/20">
      <JsonLd data={productSchema} />
        <Link href={`/products/${slug}`}>
          <div className="relative aspect-[4/3] bg-white overflow-hidden p-4">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
              unoptimized={image.startsWith('http')}
            />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          {product.category && (
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
              {product.category}
            </span>
          )}
          {product.brand && (
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">
              {product.brand}
            </span>
          )}
        </div>
          <Link href={`/products/${slug}`}>
            <h3 className="text-base font-semibold text-navy mt-1 line-clamp-2 hover:text-accent transition-colors">
              {title}
            </h3>
          </Link>

        {displaySpecs && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {displaySpecs}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-navy">
            Rs. {product.price.toLocaleString()}
          </span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="outline"
            className="lg:hidden"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

