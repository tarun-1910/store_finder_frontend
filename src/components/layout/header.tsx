"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isSellerPage = pathname.startsWith("/sellers/") && pathname !== "/sellers";

  return (
    <header className="border-b border-brand-accent/25 bg-brand-main sticky top-0 z-50 header-shadow text-brand-cream">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-cream hover:text-brand-highlight transition-colors duration-200">
          <MapPin className="h-6 w-6 text-brand-highlight" />
          StoreSutra
        </Link>
        {isSellerPage && (
          <nav className="hidden md:flex items-center gap-6 text-sm text-brand-cream/90">
            <Link href="/search" className="hover:text-brand-highlight flex items-center gap-1 transition-colors duration-200">
              <Search className="h-4 w-4 text-brand-highlight" /> Search
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
