import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const ADMIN_PASSWORD = "K@$h!786";

    if (password?.trim() === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      
        // Use standard cookie settings that work well in local dev and production
        cookieStore.set("lapzen_admin_access", "true", {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24, // 24 hours
        });

      console.log("Admin login successful, cookie set.");
      return NextResponse.json({ success: true });
    }

    console.log("Admin login failed: Invalid password");
    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
