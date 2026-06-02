"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/lib/types";

export function SearchFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") || "";
  const storeType = params.get("storeType") || "ALL";
  const categoryId = params.get("categoryId") || "ALL";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "ALL") next.delete(key);
    else next.set(key, value);
    if (q) next.set("q", q);
    router.push(`/search?${next.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Select value={storeType} onValueChange={(v) => v && update("storeType", v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Store Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Stores</SelectItem>
          <SelectItem value="ONLINE">Online Only</SelectItem>
          <SelectItem value="OFFLINE">Offline Only</SelectItem>
          <SelectItem value="BOTH">Online + Offline</SelectItem>
        </SelectContent>
      </Select>

      <Select value={categoryId} onValueChange={(v) => v && update("categoryId", v)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
             