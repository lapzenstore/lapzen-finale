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

    const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
    const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
    const VERCEL_AUTH_TOKEN = process.env.VERCEL_AUTH_TOKEN;

    let vercelStatus = "Skipped (Credentials not found)";

    if (VERCEL_PROJECT_ID && VERCEL_AUTH_TOKEN) {
      try {
        const teamParam = VERCEL_TEAM_ID ? `?teamId=${VERCEL_TEAM_ID}` : "";
        
        // 1. Get all env vars to find the ID for ADMIN_PASSWORD
        const getEnvRes = await fetch(
          `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env${teamParam}`,
          {
            headers: { Authorization: `Bearer ${VERCEL_AUTH_TOKEN}` },
          }
        );

        if (getEnvRes.ok) {
          const envData = await getEnvRes.json();
          const adminPassEnv = envData.envs.find((e: any) => e.key === "ADMIN_PASSWORD");

          if (adminPassEnv) {
            // 2. Update the env var
            const patchRes = await fetch(
              `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env/${adminPassEnv.id}${teamParam}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ value: newPassword }),
              }
            );

            if (patchRes.ok) {
              vercelStatus = "Updated successfully in Vercel.";
            } else {
              const errData = await patchRes.json();
              console.error("Vercel PATCH error:", errData);
              vercelStatus = `Vercel PATCH failed: ${errData.error?.message || "Unknown error"}`;
            }
          } else {
            vercelStatus = "ADMIN_PASSWORD not found in Vercel project.";
          }
        } else {
          const errData = await getEnvRes.json();
          console.error("Vercel GET error:", errData);
          vercelStatus = "Failed to fetch variables from Vercel.";
        }
      } catch (err) {
        console.error("Vercel API error:", err);
        vercelStatus = "Error communicating with Vercel API.";
      }
    }

    // Update .env file locally for persistence in this environment
    try {
      const envPath = path.join(process.cwd(), ".env");
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, "utf8");
        if (envContent.includes("ADMIN_PASSWORD=")) {
          envContent = envContent.replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD="${newPassword}"`);
        } else {
          envContent += `\nADMIN_PASSWORD="${newPassword}"`;
        }
        fs.writeFileSync(envPath, envContent);
      }
    } catch (e) {
      console.error("Local .env update failed:", e);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Password updated successfully. Vercel status: ${vercelStatus}. Please note that Vercel changes require a redeploy or a server restart to take effect.` 
    });
  } catch (error) {
    console.error("Change Password API Error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
