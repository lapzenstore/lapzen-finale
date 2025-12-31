"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Calendar, Package, LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user as UserData);
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-5 lg:px-8 max-w-[800px]">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-navy to-navy-light p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user?.user_metadata?.full_name || "User"}</h1>
                  <p className="text-white/70">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <Mail className="w-5 h-5 text-navy" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-navy">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-navy" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium text-navy">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <Link 
                  href="/my-orders"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <Package className="w-5 h-5 text-navy" />
                    <div>
                      <p className="font-medium text-navy">My Orders</p>
                      <p className="text-sm text-muted-foreground">View your order history</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-navy transition-colors" />
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
