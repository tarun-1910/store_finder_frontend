"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export function SearchFilters() {
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
          <SelectItem value="ONLINE">Online </SelectItem>
          <SelectItem value="OFFLINE">Offline </SelectItem>
          <SelectItem value="BOTH">Hybrid</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}
             