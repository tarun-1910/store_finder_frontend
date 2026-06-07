"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isSellerPage = pathname.startsWith("/sellers/") && pathname !== "/sellers";

  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <MapPin className="h-6 w-6" />
          StoreSutra
        </Link>
        {isSellerPage && (
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/search" className="hover:text-foreground flex items-center gap-1">
              <Search className="h-4 w-4" /> Search
            </Link>    
          </nav>
        )}
      </div>
    </header>
  );
}
