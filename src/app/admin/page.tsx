"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Package, ShoppingBag, Users as UsersIcon, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
    recentProducts: [] as any[],
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={stats.products} icon={<Package className="w-6 h-6" />} color="bg-blue-50 text-blue-600" />
        <StatCard title="Total Orders" value={stats.orders} icon={<ShoppingBag className="w-6 h-6" />} color="bg-purple-50 text-purple-600" />
        <StatCard title="Total Users" value={stats.users} icon={<UsersIcon className="w-6 h-6" />} color="bg-green-50 text-green-600" />
        <StatCard title="Total Revenue" value={`Rs. ${stats.revenue.toLocaleString()}`} icon={<TrendingUp className="w-6 h-6" />} color="bg-orange-50 text-orange-600" />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-navy mb-4">Inventory Overview</h2>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-navy">Recently Added Products</h3>
            <button 
              onClick={() => window.location.href = '/admin/inventory'}
              className="text-xs font-bold text-navy hover:text-blue-600 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <RecentProductsTable products={stats.recentProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentProductsTable({ products }: { products: any[] }) {
  if (!products || products.length === 0) return <div className="p-12 text-center text-slate-400">No products found.</div>;

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-slate-50/50">
          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                  <img src={product.image_urls?.[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-navy text-sm">{product.title}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">{product.category}</td>
            <td className="px-6 py-4 text-sm font-bold text-navy">Rs. {product.price.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: any; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-navy">{value}</p>
    </div>
  );
}
