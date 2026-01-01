"use client";

import React, { useState, useEffect } from "react";
import { Upload, X, Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

function LaptopForm({ 
  formData, 
  setFormData, 
  handleSubmit, 
  loading, 
  uploading, 
  editingId, 
  handleImageUpload, 
  removeImage
}: any) {
  const categories = ["Gaming", "ChromeBooks", "Workstations", "Business", "2 in 1", "Ultra Light"];
  const brands = ["Dell", "Lenovo", "HP", "Toshiba", "Asus", "Apple"];
  const series = [
    "HP Omen", "HP Zbook", "HP Elitebook", 
    "Dell Precision", "Dell Latitude", "Dell XPS", 
    "Lenovo Legion", "Lenovo ThinkPad", "Lenovo Thinkbook", 
    "Apple Macbook", "Toshiba", "Asus"
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl mb-12 border border-slate-100 shadow-xl shadow-slate-200/50 animate-in slide-in-from-top-4 duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Information</label>
            <div className="space-y-4">
              <input 
                required
                type="text" 
                placeholder="Product Title"
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/5 transition-all font-medium" 
              />
              <select 
                required
                value={formData.brand} 
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/5 transition-all appearance-none"
              >
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <input 
                required
                type="number" 
                placeholder="Price (Rs.)"
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/5 transition-all font-bold text-navy" 
              />
            </div>
          </div>

          <textarea 
            required
            rows={4}
            placeholder="Product Description"
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/5 transition-all resize-none"
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <select 
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/5 transition-all appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select 
              required
              value={formData.series} 
              onChange={(e) => setFormData({...formData, series: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/5 transition-all appearance-none"
            >
              <option value="">Select Series</option>
              {series.map((s: string) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.new_arrival ? 'bg-navy border-navy' : 'border-slate-300 bg-white group-hover:border-navy/50'}`}>
                {formData.new_arrival && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={formData.new_arrival} 
                onChange={(e) => setFormData({...formData, new_arrival: e.target.checked})}
              />
              <span className="text-sm font-bold text-navy">New Arrival</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.featured ? 'bg-navy border-navy' : 'border-slate-300 bg-white group-hover:border-navy/50'}`}>
                {formData.featured && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={formData.featured} 
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              />
              <span className="text-sm font-bold text-navy">Featured</span>
            </label>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Technical Specifications</label>
            <div className="grid grid-cols-2 gap-4">
              <input 
                required
                type="text" 
                placeholder="RAM"
                value={formData.specs.ram} 
                onChange={(e) => setFormData({...formData, specs: {...formData.specs, ram: e.target.value}})}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none" 
              />
              <input 
                required
                type="text" 
                placeholder="Storage"
                value={formData.specs.storage} 
                onChange={(e) => setFormData({...formData, specs: {...formData.specs, storage: e.target.value}})}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none" 
              />
              <input 
                required
                type="text" 
                placeholder="Processor"
                value={formData.specs.processor} 
                onChange={(e) => setFormData({...formData, specs: {...formData.specs, processor: e.target.value}})}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none" 
              />
              <input 
                required
                type="text" 
                placeholder="Display"
                value={formData.specs.display} 
                onChange={(e) => setFormData({...formData, specs: {...formData.specs, display: e.target.value}})}
                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none" 
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Images ({formData.image_urls.length}/5)</label>
              {uploading && <Loader2 className="w-4 h-4 animate-spin text-navy" />}
            </div>
            <div className="grid grid-cols-5 gap-3">
              {formData.image_urls.map((url: string, i: number) => (
                <div key={i} className="relative aspect-square bg-slate-50 rounded-xl overflow-hidden group border border-slate-100">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-white shadow-md p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {formData.image_urls.length < 5 && (
                <label className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-navy/20 hover:bg-slate-100/50 transition-all">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button 
              disabled={loading || uploading}
              type="submit"
              className="w-full bg-navy text-#00172E px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-navy/90 transition-all disabled:opacity-50 shadow-xl shadow-navy/20"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : editingId ? "Update Laptop Details" : "Publish Laptop to Store"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    series: "",
    type: "laptop",
    new_arrival: false,
    featured: false,
    specs: { ram: "", storage: "", processor: "", display: "" },
    image_urls: [] as string[],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      brand: product.brand || "",
      category: product.category || "",
      series: product.series || "",
      type: product.type || "laptop",
      new_arrival: !!product.new_arrival,
      featured: !!product.featured,
      specs: {
        ram: product.specs?.ram || "",
        storage: product.specs?.storage || "",
        processor: product.specs?.processor || "",
        display: product.specs?.display || "",
      },
      image_urls: Array.isArray(product.image_urls) ? product.image_urls : [],
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (formData.image_urls.length + files.length > 5) {
      alert("Maximum 5 images allowed.");
      return;
    }
    setUploading(true);
    const newUrls = [...formData.image_urls];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Math.random().toString(36).substring(2)}.${file.name.split('.').pop()}`;
        const { data, error } = await supabase.storage.from('product-images').upload(`products/${fileName}`, file);
        if (error) throw error;
        if (data) {
          const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(`products/${fileName}`);
          newUrls.push(publicUrl);
        }
      }
      setFormData(prev => ({ ...prev, image_urls: newUrls }));
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, image_urls: prev.image_urls.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.image_urls.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    setLoading(true);
    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price) || 0 }),
      });
      if (res.ok) {
        setIsAdding(false);
        setEditingId(null);
        setFormData({
          title: "", description: "", price: "", brand: "", category: "", series: "",
          type: "laptop", new_arrival: false, featured: false,
          specs: { ram: "", storage: "", processor: "", display: "" }, image_urls: [],
        });
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) { 
        setDeletingId(null); 
        fetchProducts(); 
      }
    } catch (error) { 
      console.error(error); 
    }
  };

  const seriesOptions = Array.from(new Set(products.map(p => p.series).filter(Boolean))) as string[];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy">Inventory Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your laptop collection and stock</p>
        </div>
        <button 
          onClick={() => {
            if (isAdding) setEditingId(null);
            setIsAdding(!isAdding);
          }}
          className="bg-navy text-#00172E px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-navy/90 transition-all shadow-lg shadow-navy/20"
        >
          {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {isAdding ? "Cancel" : "Add Laptop"}
        </button>
      </div>

      {isAdding && (
        <LaptopForm 
          formData={formData} 
          setFormData={setFormData} 
          handleSubmit={handleSubmit}
          loading={loading} 
          uploading={uploading} 
          editingId={editingId}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
        />
      )}

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Product</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Specifications</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Price</th>
                <th className="px-6 py-5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                        {product.image_urls?.[0] && <img src={product.image_urls[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="font-bold text-navy leading-tight">{product.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{product.brand} • {product.series}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 max-w-xs">
                    <p className="line-clamp-2">{product.specs?.processor} • {product.specs?.ram} • {product.specs?.storage}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      {product.new_arrival && <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold border border-emerald-100 uppercase">New</span>}
                      {product.featured && <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold border border-amber-100 uppercase">Featured</span>}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-navy">Rs. {product.price?.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2.5 text-slate-400 hover:text-navy hover:bg-slate-50 rounded-xl transition-all"><Edit className="w-4 h-4" /></button>
                      {deletingId === product.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => deleteProduct(product.id)} className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">Confirm</button>
                          <button onClick={() => setDeletingId(null)} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeletingId(product.id)} className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
