"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export function SearchBar({
  defaultQuery = "",
  large = false,
}: {
  defaultQuery?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const fieldSize = large ? "h-12 text-sm sm:h-14 sm:text-base" : "h-10 text-xs sm:text-sm";
  const buttonSize = large ? "px-4 sm:px-6 text-sm sm:text-base" : "px-4 text-xs sm:text-sm";
  const iconPadding = large ? "pl-10 sm:pl-12" : "pl-9 sm:pl-10";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const q = query.trim();

    if (!q) return;

    router.push(
      `/search?q=${encodeURIComponent(q)}&page=0`
    );
  };

  return (
    <div className={large ? "w-full max-w-2xl mx-auto" : "w-full"}>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1 rounded-full search-shadow-wrapper">
          <Search className={`absolute ${large ? "left-3.5 sm:left-4" : "left-3"} top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground z-10`} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, jewelry, furniture..."
            className={`bg-white border-white/80 rounded-full ${iconPadding} ${fieldSize} w-full focus-visible:ring-0 placeholder:text-neutral-400 text-neutral-600`}
          />
        </div>
        <Button
          type="submit"
          className={`shrink-0 bg-brand-highlight text-white hover:text-white hover:bg-brand-accent border border-brand-accent/30 rounded-full ${fieldSize} ${buttonSize} search-button-shadow font-semibold`}
        >
          Search
        </Button>
      </form>
    </div>
  );
}