import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StoreTypeBadge } from "./store-type-badge";
import { SellerAvatar } from "./seller-avatar";
import type { SellerCard as SellerCardType } from "@/lib/types";

export function SellerCard({ seller }: { seller: SellerCardType }) {
  return (
    <Link href={`/seller/${seller.slug}`}>
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4 flex gap-4">
          <SellerAvatar name={seller.businessName} logoUrl={seller.logoUrl} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold truncate">{seller.businessName}</h3>
              {seller.verified && <BadgeCheck className="h-4 w-4 text-blue-500 shrink-0" />}
              {seller.featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{seller.shortDescription}</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{seller.categoryName}</span>
              <StoreTypeBadge storeType={seller.storeType} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{seller.area} · {seller.phone}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
