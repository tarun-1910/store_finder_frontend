"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";


export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm text-brand-main transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:text-brand-highlight transition-colors duration-200">
          <MapPin className="h-6 w-6 text-brand-highlight" />
          <span>StoreSutra</span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-6 text-sm font-semibold">
          <Link href="/about" className={`transition-colors duration-200 hover:text-brand-highlight ${pathname === "/about" ? "text-brand-highlight" : "text-brand-main/70"}`}>
            About
          </Link>
          <Link href="/contact" className={`transition-colors duration-200 hover:text-brand-highlight ${pathname === "/contact" ? "text-brand-highlight" : "text-brand-main/70"}`}>
            Contact
          </Link>
          <Link 
            href="/contact" 
            className="px-4 py-2 bg-brand-highlight text-white font-bold text-xs rounded-full hover:bg-brand-highlight/95 transition-all shadow-md shadow-brand-highlight/10 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            List Your Store
          </Link>
        </nav>
      </div>
    </header>
  );
}
