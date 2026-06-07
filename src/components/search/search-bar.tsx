"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  "Sarees",
  "Furniture",
  "Jewelry",
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
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, jewelry, furniture..."
            className={`pl-10 ${large ? "h-14 text-lg" : ""}`}
          />
        </div>

        <Button
          type="submit"
          size={large ? "lg" : "default"}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Search
        </Button>
      </form>

      {large && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() =>
                router.push(
                  `/search?q=${encodeURIComponent(
                    suggestion
                  )}&page=0`
                )
              }
              className="text-sm px-3 py-1 rounded-full bg-white border hover:bg-emerald-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}