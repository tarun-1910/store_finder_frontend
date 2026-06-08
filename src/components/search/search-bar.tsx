"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  { name: "Sarees", emoji: "👗" },
  { name: "Furniture", emoji: "🛋️" },
  { name: "Jewelry", emoji: "💎" },
];

export function SearchBar({
  defaultQuery = "",
  large = false,
}: {
  defaultQuery?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const fieldSize = large ? "h-14 text-lg" : "h-10";

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
          <Search className={`absolute ${large ? "left-4" : "left-3.5"} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10`} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, jewelry, furniture..."
            className={`bg-white border-white/80 rounded-full ${large ? "pl-12" : "pl-11"} ${fieldSize} w-full focus-visible:ring-0`}
          />
        </div>
        <Button
          type="submit"
          className={`shrink-0 bg-brand-highlight text-white hover:text-white hover:bg-brand-accent border border-brand-accent/30 rounded-full ${fieldSize} ${large ? "px-6" : "px-4"} search-button-shadow font-semibold`}
        >
          Search
        </Button>
      </form>

      {large && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {SUGGESTIONS.map(({ name, emoji }) => (
            <button
              key={name}
              type="button"
              onClick={() =>
                router.push(
                  `/search?q=${encodeURIComponent(
                    name
                  )}&page=0`
                )
              }
              className={`text-sm px-3.5 py-1.5 rounded-full border transition-all duration-250 cursor-pointer hover:scale-105 ${large
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40"
                : "bg-card border-border hover:bg-brand-accent/15 hover:border-brand-accent/40 text-foreground"
                }`}
            >
              <span className="mr-1">{emoji}</span> {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}