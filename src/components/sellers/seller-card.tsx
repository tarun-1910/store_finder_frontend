"use client";

import React from "react";
import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryTag } from "@/components/ui/category-tag";
import { StoreTypeBadge } from "./store-type-badge";
import { SellerAvatar } from "./seller-avatar";
import type { SellerCard as SellerCardType } from "@/lib/types";
import { useSellerModal } from "./seller-modal";

export function SellerCard({ seller }: { seller: SellerCardType }) {
  const { openSeller } = useSellerModal();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
   
    if (e.metaKey || e.ctrlKey || e.button === 1) return;
    
    e.preventDefault();
    openSeller(seller.slug);
  };

  return (
<Link href={`/sellers/${seller.slug}`} onClick={handleClick}>
  <Card className="card-shadow h-full group border border-brand-gray/35 hover:border-brand-highlight/40 transition-all duration-300">
    <CardContent className="p-3 xs:p-3.5 sm:p-4 flex gap-2.5 xs:gap-3 sm:gap-4">

      {/* Avatar — shrinks on tiny screens */}
      <div className="shrink-0">
        <SellerAvatar name={seller.businessName} logoUrl={seller.logoUrl} />
      </div>

      <div className="flex-1 min-w-0">

        {/* Business name + badges */}
        <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap">
          <h3 className="
            font-semibold truncate
            text-sm xs:text-sm sm:text-base
            text-brand-main group-hover:text-brand-highlight
            transition-colors duration-250
            max-w-[140px] xs:max-w-[180px] sm:max-w-[220px] md:max-w-full
          ">
            {seller.businessName}
          </h3>
          {seller.verified && (
            <BadgeCheck className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-brand-accent shrink-0" />
          )}
          {seller.featured && (
            <Star className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-brand-yellow fill-brand-yellow shrink-0" />
          )}
        </div>

        {/* Short description — hidden on smallest, 1-line on small, 2-line on larger */}
        <p className="
          text-xs xs:text-xs sm:text-sm
          text-muted-foreground
          mt-0.5 xs:mt-1
          line-clamp-1 xs:line-clamp-1 sm:line-clamp-2
          hidden [display:block]
        ">
          {seller.shortDescription}
        </p>

        {/* Category + store type tags */}
        <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 mt-1.5 xs:mt-2 items-center">
          <CategoryTag name={seller.categoryName} />
          <StoreTypeBadge storeType={seller.storeType} />
        </div>

        {/* Area + phone — area only on tiny, both on larger */}
        <p className="text-[10px] xs:text-[11px] sm:text-xs text-muted-foreground mt-1 xs:mt-1.5 sm:mt-2 truncate">
          <span>{seller.area}</span>
          <span className="hidden xs:inline"> · {seller.phone}</span>
        </p>

      </div>
    </CardContent>
  </Card>
</Link>
  );
}
