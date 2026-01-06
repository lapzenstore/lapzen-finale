import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("lapzen_admin_access");

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newPassword } = await request.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Update .env file
    const envPath = path.join(process.cwd(), ".env");
    let envContent = fs.readFileSync(envPath, "utf8");

    if (envContent.includes("ADMIN_PASSWORD=")) {
      envContent = envContent.replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD="${newPassword}"`);
    } else {
      envContent += `\nADMIN_PASSWORD="${newPassword}"`;
    }

    fs.writeFileSync(envPath, envContent);

    return NextResponse.json({ success: true, message: "Password updated successfully. Server will restart." });
  } catch (error) {
    console.error("Change Password API Error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
