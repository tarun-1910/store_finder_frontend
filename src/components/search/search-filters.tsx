"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") || "";
  const storeType = params.get("storeType") || "ALL";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "ALL") next.delete(key);
    else next.set(key, value);
    if (q) next.set("q", q);
    router.push(`/search?${next.toString()}`);
  };

  const filterOptions = [
    { value: "ALL", label: "All Stores", emoji: "🏬" },
    { value: "ONLINE", label: "Online Only", emoji: "🌐" },
    { value: "OFFLINE", label: "Offline Only", emoji: "📍" },
    { value: "BOTH", label: "Hybrid / Both", emoji: "🔀" },
  ];

  return (
    <div className="flex flex-wrap gap-2.5 items-center">
      <span className="text-xs font-bold text-brand-main/55 uppercase tracking-wider mr-1.5">
        Filters:
      </span>
      {filterOptions.map((opt) => {
        const isActive = storeType === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => update("storeType", opt.value)}
            className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer border hover:-translate-y-0.5 ${
              isActive
                ? "bg-brand-highlight text-white border-brand-highlight shadow-sm shadow-brand-highlight/20"
                : "bg-white text-brand-main/70 border-neutral-200 hover:border-brand-main/20 hover:text-brand-main hover:bg-neutral-50/50"
            }`}
          >
            <span>{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}