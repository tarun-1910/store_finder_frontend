"use client";

import React from "react";
import Link from "next/link";
import { BadgeCheck, Star, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryTag } from "@/components/ui/category-tag";
import { StoreTypeBadge } from "./store-type-badge";
import { SellerAvatar } from "./seller-avatar";
import type { SellerCard as SellerCardType } from "@/lib/types";
import { useSellerModal } from "./seller-modal";
import { trackEvent } from "@/lib/api-client";

// Helper to generate a unique gradient based on the seller name hash
function getGradientClass(name: string) {
  const gradients = [
    "from-[#003049] to-[#d62828]/60",
    "from-[#0b4f6c] to-[#fcbf49]/70",
    "from-[#1c2541] to-[#f77f00]/60",
    "from-[#5e548e] to-[#9f86c0]/80",
    "from-[#386641] to-[#a7c957]/70",
    "from-[#d62828] to-[#f77f00]/70",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

export function SellerCard({ seller }: { seller: SellerCardType }) {
  const { openSeller } = useSellerModal();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    e.preventDefault();
    // Fire search_conversion only when the user arrived via a search query
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("q")) {
      trackEvent(seller.slug, "search_conversion");
    }
    openSeller(seller.slug);
  };

  const gradient = getGradientClass(seller.businessName);

  return (
    <Link href={`/sellers/${seller.slug}`} onClick={handleClick} className="block h-full">
      <Card className="card-shadow h-full group border border-neutral-200/80 hover:border-brand-highlight/40 rounded-2xl overflow-hidden transition-all duration-300 bg-white flex flex-col">
        {/* Card Header Gradient / Cover */}
        <div className={`h-28 bg-gradient-to-br ${gradient} relative transition-all duration-300 group-hover:opacity-95 shrink-0`}>
          {/* Subtle mesh background overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
          {/* Overlay badges (featured) */}
          <div className="absolute top-3 right-3">
            {seller.featured && (
              <span className="flex items-center gap-1 text-[10px] font-bold bg-white/95 text-brand-highlight px-2 py-0.5 rounded-full shadow-sm">
                <Star className="h-3 w-3 fill-brand-highlight text-brand-highlight" />
                <span>Featured</span>
              </span>
            )}
          </div>
        </div>

        <CardContent className="p-4 pt-0 flex flex-col flex-1 relative z-10">
          {/* Avatar overlapping cover banner */}
          <div className="flex gap-3 items-end mb-3 -mt-10">
            <div className="bg-white p-1 rounded-xl shadow-md ring-4 ring-white shrink-0">
              <SellerAvatar name={seller.businessName} logoUrl={seller.logoUrl} size="md" />
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-sm xs:text-base text-brand-main group-hover:text-brand-highlight truncate transition-colors duration-250 leading-tight">
                  {seller.businessName}
                </h3>
                {seller.verified && (
                  <BadgeCheck className="h-4 w-4 text-brand-accent shrink-0" />
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-brand-main/70 line-clamp-2 leading-relaxed flex-1">
            {seller.shortDescription}
          </p>

          {/* Category and badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 items-center">
            <CategoryTag name={seller.categoryName} />
            <StoreTypeBadge storeType={seller.storeType} />
          </div>

          {/* Area & Phone footer */}
          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-brand-main/60">
            <span className="flex items-center gap-1 truncate"><MapPin className="h-3.5 w-3.5 text-brand-highlight shrink-0" />{seller.area}</span>
            <span className="flex items-center gap-1 font-semibold shrink-0"><Phone className="h-3.5 w-3.5 text-brand-accent shrink-0" />{seller.phone}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
