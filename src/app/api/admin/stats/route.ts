import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
      const { count: productsCount, error: pError } = await supabaseAdmin
        .from("products")
        .select("id", { count: "exact" });

      const { data: orders, error: oError } = await supabaseAdmin
        .from("orders")
        .select("total_amount");

      const { count: usersCount, error: uError } = await supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact" });

      const { data: recentProducts, error: rpError } = await supabaseAdmin
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (pError || oError || uError || rpError) {
        console.error("Stats fetching error:", { pError, oError, uError, rpError });
      }

      const totalRevenue = orders?.reduce((acc, order) => acc + (Number(order.total_amount) || 0), 0) || 0;

      return NextResponse.json({
        products: productsCount || 0,
        orders: orders?.length || 0,
        users: usersCount || 0,
        revenue: totalRevenue,
        recentProducts: recentProducts || [],
      });
  } catch (err) {
    console.error("Internal Stats Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
