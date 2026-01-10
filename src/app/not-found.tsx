import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      {/* Grid overlay */}
      <div className="grid-overlay absolute inset-0 opacity-10 pointer-events-none" />
      
        <div className="relative z-10 max-w-md w-full">
<div className="flex flex-col items-center">
  <h1 className="text-[120px] sm:text-[180px] font-black text-navy/10 leading-none select-none">
    404
  </h1>

  <h2 className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-bold text-navy">
    Page Not Found
  </h2>
</div>
          </div>
          
          <div className="mt-8 sm:mt-12">
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="h-12 px-8 gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
              <Link href="/catalog">
                <Button variant="outline" className="h-12 px-8 gap-2 w-full sm:w-auto">
                  <Search className="w-4 h-4" />
                  Browse Catalog
                </Button>
              </Link>

          </div>
          
          <div className="mt-12 pt-8 border-t border-navy/5">
            <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
              Premium Tech Store
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

