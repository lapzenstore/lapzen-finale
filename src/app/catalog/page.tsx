"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ProductCard } from "@/components/product-card";
import { JsonLd } from "@/components/schema";
import { Search, Filter, SlidersHorizontal, Loader2, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const HERO_IMAGES: Record<string, string> = {
  // Brands
  'hp': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/hp-1767119994306.jpeg?width=800&height=800&resize=contain',
  'dell': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/dell-1767119994307.jpeg?width=800&height=800&resize=contain',
  'apple': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/apple-1767119994307.jpeg?width=800&height=800&resize=contain',
  'lenovo': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/lenovo-1767119994306.jpeg?width=800&height=800&resize=contain',
  'acer': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/acer-1767119994307.jpeg?width=800&height=800&resize=contain',
  'toshiba': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/toshiba-1767119994306.jpeg?width=800&height=800&resize=contain',
  // Categories
  'gaming': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/gaming-resized-1767120834252.webp?width=800&height=800&resize=contain',
  'chromebooks': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/chromebooks-1767120833869.webp?width=800&height=800&resize=contain',
  'workstations': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/workstations-1767120833870.webp?width=800&height=800&resize=contain',
  'business': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/business-1767120833871.webp?width=800&height=800&resize=contain',
  '2-in-1': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/2-in-1-1767120833874.webp?width=800&height=800&resize=contain',
  // Series
  'elitebook': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Hp-elitebook-1767121413659.webp?width=800&height=800&resize=contain',
  'macbook': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/apple-macbook-1767121413584.webp?width=800&height=800&resize=contain',
  'latitude': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/dell-latitude-1767121413633.webp?width=800&height=800&resize=contain',
  'thinkpad': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/lenovo-thinkpad-1767121413587.webp?width=800&height=800&resize=contain',
};

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Active filters from URL
  const activeCategory = searchParams.get("category");
  const activeBrand = searchParams.get("brand");
  const activeSeries = searchParams.get("series");
  const activeRam = searchParams.get("ram");
  const activeStorage = searchParams.get("storage");
  const activeFeatured = searchParams.get("featured");
  const activeNewArrival = searchParams.get("new_arrival");
  const activeMinPrice = searchParams.get("min_price");
  const activeMaxPrice = searchParams.get("max_price");
  const activeSearch = searchParams.get("search") || "";

  // Draft states for filters (only applied when "Apply Filters" is clicked)
  const [draftSearch, setDraftSearch] = useState(activeSearch);
  const [draftMinPrice, setDraftMinPrice] = useState(activeMinPrice || "");
  const [draftMaxPrice, setDraftMaxPrice] = useState(activeMaxPrice || "");
  const [draftRam, setDraftRam] = useState(activeRam || "");
  const [draftStorage, setDraftStorage] = useState(activeStorage || "");

  // Sync draft states when URL params change
  useEffect(() => {
    setDraftSearch(activeSearch);
    setDraftMinPrice(activeMinPrice || "");
    setDraftMaxPrice(activeMaxPrice || "");
    setDraftRam(activeRam || "");
    setDraftStorage(activeStorage || "");
  }, [activeSearch, activeMinPrice, activeMaxPrice, activeRam, activeStorage]);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update all filter params from draft states
    if (draftSearch) params.set('search', draftSearch);
    else params.delete('search');

    if (draftMinPrice) params.set('min_price', draftMinPrice);
    else params.delete('min_price');
    
    if (draftMaxPrice) params.set('max_price', draftMaxPrice);
    else params.delete('max_price');
    
    if (draftRam) params.set('ram', draftRam);
    else params.delete('ram');
    
    if (draftStorage) params.set('storage', draftStorage);
    else params.delete('storage');
    
    // Reset to first page if pagination exists (not in current code but good practice)
    params.delete('page');

    router.push(`/catalog?${params.toString()}`);
    // Close mobile filters if open
    if (window.innerWidth < 1024) setShowFilters(false);
  }, [draftSearch, draftMinPrice, draftMaxPrice, draftRam, draftStorage, searchParams, router]);

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('min_price');
    params.delete('max_price');
    params.delete('ram');
    params.delete('storage');
    params.delete('search');
    router.push(`/catalog?${params.toString()}`);
  };

  const getHeroImage = () => {
    if (activeSeries) return HERO_IMAGES[activeSeries.toLowerCase()];
    if (activeCategory) return HERO_IMAGES[activeCategory.toLowerCase()];
    if (activeBrand) return HERO_IMAGES[activeBrand.toLowerCase()];
    return null;
  };

  const heroImage = getHeroImage();
  const heroTitle = activeSeries || activeCategory || activeBrand || "Catalog";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.set("category", activeCategory);
      if (activeBrand) params.set("brand", activeBrand);
      if (activeSeries) params.set("series", activeSeries);
      if (activeFeatured) params.set("featured", activeFeatured);
      if (activeNewArrival) params.set("new_arrival", activeNewArrival);
      if (activeMinPrice) params.set("min_price", activeMinPrice);
      if (activeMaxPrice) params.set("max_price", activeMaxPrice);
      if (activeRam) params.set("ram", activeRam);
      if (activeStorage) params.set("storage", activeStorage);
      if (activeSearch) params.set("search", activeSearch);
      
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, activeBrand, activeSeries, activeFeatured, activeNewArrival, activeMinPrice, activeMaxPrice, activeRam, activeStorage, activeSearch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const clearFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Laptop Catalog - Lapzen",
        "description": "Browse our full collection of premium laptops from HP, Apple, Dell, Lenovo, and more.",
        "url": "https://lapzen.com/catalog"
      }} />
      <Header />

      <main className="flex-grow pb-20 pt-24">
        {heroImage && (
          <div className="relative h-[300px] md:h-[400px] overflow-hidden mb-12">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70" />
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </Link>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">
                  {heroTitle} <span className="text-white/40">COLLECTION</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                  Explore our premium selection of {heroTitle} laptops, curated for performance and reliability.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={cn("container", !heroImage && "pt-24")}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              {!heroImage && (
                <h1 className="text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight">
                  LAPTOP <span className="text-navy/40">CATALOG</span>
                </h1>
              )}
              <div className="flex flex-wrap gap-2">
                {activeCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-navy text-white text-xs font-bold">
                    {activeCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('category')} />
                  </span>
                )}
                {activeBrand && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                    {activeBrand}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('brand')} />
                  </span>
                )}
                {activeSeries && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold">
                    {activeSeries}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('series')} />
                  </span>
                )}
                {activeMinPrice && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold">
                    Min: {activeMinPrice}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('min_price')} />
                  </span>
                )}
                {activeMaxPrice && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold">
                    Max: {activeMaxPrice}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('max_price')} />
                  </span>
                )}
                {activeRam && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold">
                    RAM: {activeRam}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('ram')} />
                  </span>
                )}
                {activeStorage && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-600 text-white text-xs font-bold">
                    SSD: {activeStorage}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('storage')} />
                  </span>
                )}
                {(activeMinPrice || activeMaxPrice || activeRam || activeStorage || activeSearch) && (
                  <button 
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-grow md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search and click apply..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy transition-all"
                  value={draftSearch}
                  onChange={(e) => setDraftSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "p-3 rounded-2xl border transition-all flex items-center gap-2",
                  showFilters ? "bg-navy text-[#00172E] border-navy shadow-lg" : "bg-white text-navy border-gray-100 hover:bg-gray-50 shadow-sm"
                )}
              >
                <SlidersHorizontal className="w-6 h-6" />
                <span className="font-bold text-sm hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {showFilters && (
              <aside className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-left duration-300">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-8 sticky top-24">
                  <div>
                    <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-4 flex items-center justify-between">
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Min</label>
                          <input 
                            type="number" 
                            placeholder="0"
                            className="w-full px-3 py-2 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-navy/5 text-sm"
                            value={draftMinPrice}
                            onChange={(e) => setDraftMinPrice(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase">Max</label>
                          <input 
                            type="number" 
                            placeholder="500000"
                            className="w-full px-3 py-2 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-navy/5 text-sm"
                            value={draftMaxPrice}
                            onChange={(e) => setDraftMaxPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: '< 50k', min: '0', max: '50000' },
                          { label: '50k - 100k', min: '50000', max: '100000' },
                          { label: '100k - 200k', min: '100000', max: '200000' },
                          { label: '200k+', min: '200000', max: '' },
                        ].map((range) => (
                          <button
                            key={range.label}
                            onClick={() => {
                              if (draftMinPrice === range.min && draftMaxPrice === range.max) {
                                setDraftMinPrice("");
                                setDraftMaxPrice("");
                              } else {
                                setDraftMinPrice(range.min);
                                setDraftMaxPrice(range.max);
                              }
                            }}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                              draftMinPrice === range.min && draftMaxPrice === range.max
                                ? "bg-navy text-white border-navy"
                                : "bg-gray-50 text-gray-600 border-gray-100 hover:border-navy/20"
                            )}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-4">RAM Size</h3>
                    <div className="space-y-2">
                      {['8GB', '16GB', '32GB', '64GB'].map((ram) => (
                        <label key={ram} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded-lg border-gray-200 text-navy focus:ring-navy"
                            checked={draftRam === ram}
                            onChange={() => {
                              if (draftRam === ram) setDraftRam("");
                              else setDraftRam(ram);
                            }}
                          />
                          <span className="text-sm font-medium text-gray-600 group-hover:text-navy transition-colors">{ram}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-4">Storage</h3>
                    <div className="space-y-2">
                      {['256GB', '512GB', '1TB', '2TB'].map((storage) => (
                        <label key={storage} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded-lg border-gray-200 text-navy focus:ring-navy"
                            checked={draftStorage === storage}
                            onChange={() => {
                              if (draftStorage === storage) setDraftStorage("");
                              else setDraftStorage(storage);
                            }}
                          />
                          <span className="text-sm font-medium text-gray-600 group-hover:text-navy transition-colors">{storage}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                    <button 
                      onClick={applyFilters}
                      className="w-full py-4 bg-navy text-[#00172E] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-navy/90 transition-all shadow-xl shadow-navy/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Apply Filters
                    </button>
                    <button 
                      onClick={() => {
                        setDraftMinPrice("");
                        setDraftMaxPrice("");
                        setDraftRam("");
                        setDraftStorage("");
                        setDraftSearch("");
                        resetFilters();
                      }}
                      className="w-full py-3 bg-white text-gray-400 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-navy hover:bg-gray-50 transition-all"
                    >
                      Reset Sidebar
                    </button>
                  </div>
                </div>
              </aside>
            )}

            <div className={cn(
              "grid gap-6 transition-all duration-300",
              showFilters ? "lg:col-span-3 grid-cols-1 md:grid-cols-2" : "lg:col-span-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}>
              {loading ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-navy/20" />
                  <p className="font-bold uppercase tracking-widest text-xs">Updating catalog...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                  <Filter className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No results found</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-6 text-navy font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <CatalogContent />
    </Suspense>
  );
}

