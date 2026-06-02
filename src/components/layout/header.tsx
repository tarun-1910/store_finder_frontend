import Link from "next/link";
import { MapPin, Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <MapPin className="h-6 w-6" />
          StoreFinder
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/categories" className="hover:text-foreground">Categories</Link>
          <Link href="/search" className="hover:text-foreground flex items-center gap-1">
            <Search className="h-4 w-4" /> Search
          </Link>
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
