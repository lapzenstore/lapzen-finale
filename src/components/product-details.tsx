"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingCart, Zap, Shield, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_urls?: string[];
  image_url?: string;
  category?: string;
  brand?: string;
  series?: string;
  ram_size?: string;
  storage_size?: string;
  specs?: any;
}

export function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, setIsOpen } = useCart();
  const router = useRouter();

  const images = product.image_urls && product.image_urls.length > 0 
    ? product.image_urls 
    : [product.image_url || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: images[0],
    });
    // If quantity > 1, we might need to update the cart context to support initial quantity
    // But for now, let's just add it multiple times or update the quantity manually if the context supports it.
    // Looking at cart-context.tsx, addItem only adds 1. Let's fix that or just call it multiple times for now.
    for (let i = 1; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.title,
        price: product.price,
        image: images[0],
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Series", value: product.series },
    { label: "Category", value: product.category },
    { label: "RAM", value: product.ram_size || product.specs?.ram },
    { label: "Storage", value: product.storage_size || product.specs?.storage },
    ...(product.specs ? Object.entries(product.specs)
      .filter(([k]) => k.toLowerCase() !== 'ram' && k.toLowerCase() !== 'storage')
      .map(([k, v]) => ({ label: k.toUpperCase(), value: String(v) })) : [])
  ].filter(s => s.value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-border p-8">
          <Image
            src={images[selectedImage]}
            alt={product.title}
            fill
            className="object-contain"
            priority
            unoptimized={images[selectedImage].startsWith('http')}
          />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? "border-navy shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                  <Image
                    src={img}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    className="object-contain p-2"
                    unoptimized={img.startsWith('http')}
                  />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {product.brand && (
              <Badge variant="outline" className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border-red-100">
                {product.brand}
              </Badge>
            )}
            {product.series && (
              <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {product.series}
              </Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-black text-navy">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
              In Stock
            </span>
          </div>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {specs.map((spec, idx) => (
            <div key={idx} className="bg-muted/50 p-4 rounded-2xl border border-border/50">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                {spec.label}
              </span>
              <span className="text-base font-bold text-navy">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-6 mt-auto pt-6 border-t border-border">
          <div className="flex items-center gap-6">
            <div className="flex items-center bg-muted rounded-full p-1 border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 hover:bg-white hover:text-[#00172E] transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 hover:bg-white hover:text-[#00172E] transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={handleAddToCart}
              size="lg"
              variant="outline"
              className="h-14 rounded-2xl border-2 font-bold text-lg gap-3 hover:bg-navy hover:text-white hover:bg-[#00172E] transition-all group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Add to Cart
            </Button>
            <Button
  onClick={handleBuyNow}
  size="lg"
  className="
    h-14
    rounded-2xl
    font-bold
    text-lg
    gap-3

    /* DEFAULT = hovered look */
    bg-[#00172E]
    text-white
    shadow-lg

    /* HOVER = Add to Cart style */
    hover:bg-white
    hover:text-[#00172E]
    hover:border-2
    hover:border-[#00172E]
    hover:shadow-none

    transition-all
    duration-300
    ease-out
  "
>
  <Zap className="w-5 h-5 fill-current" />
  Buy It Now
</Button>

          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-navy" />
            </div>
            <span className="text-xs font-bold text-navy uppercase tracking-tighter">30 days Warranty</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 text-navy" />
            </div>
            <span className="text-xs font-bold text-navy uppercase tracking-tighter">Fast Delivery</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-navy/5 flex items-center justify-center mb-3">
              <RotateCcw className="w-6 h-6 text-navy" />
            </div>
            <span className="text-xs font-bold text-navy uppercase tracking-tighter">30 Days Return</span>
          </div>
        </div>
      </div>
    </div>
  );
}









