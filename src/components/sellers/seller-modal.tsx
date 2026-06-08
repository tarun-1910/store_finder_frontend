"use client";

import React, { createContext, useContext, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Star, MapPin, Phone, X, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryTag } from "@/components/ui/category-tag";
import { StoreTypeBadge } from "./store-type-badge";
import { SellerAvatar } from "./seller-avatar";
import { getExternalLinkClasses } from "@/lib/colors";
import { publicApi } from "@/lib/api-client";
import { cn } from "@/lib/utils";

interface SellerModalContextType {
  activeSellerSlug: string | null;
  openSeller: (slug: string) => void;
  closeSeller: () => void;
}

const SellerModalContext = createContext<SellerModalContextType | undefined>(undefined);

export function SellerModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SellerModalQueryHandler>{children}</SellerModalQueryHandler>
    </Suspense>
  );
}

function SellerModalQueryHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSellerSlug = searchParams.get("seller");

  const openSeller = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("seller", slug);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeSeller = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("seller");
    const queryStr = params.toString();
    router.push(queryStr ? `${pathname}?${queryStr}` : pathname, { scroll: false });
  };

  return (
    <SellerModalContext.Provider value={{ activeSellerSlug, openSeller, closeSeller }}>
      {children}
      <SellerModal />
    </SellerModalContext.Provider>
  );
}

export function useSellerModal() {
  const context = useContext(SellerModalContext);
  if (!context) {
    throw new Error("useSellerModal must be used within a SellerModalProvider");
  }
  return context;
}

function SellerModal() {
  const { activeSellerSlug, closeSeller } = useSellerModal();

  // Handle body scroll locking
  useEffect(() => {
    if (activeSellerSlug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeSellerSlug]);

  // Handle Escape key closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSeller();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeSeller]);

  // Fetch Seller Details
  const { data: seller, isLoading: isSellerLoading, error: sellerError } = useQuery({
    queryKey: ["seller-detail", activeSellerSlug],
    queryFn: async () => {
      if (!activeSellerSlug) return null;
      const res = await publicApi.seller(activeSellerSlug);
      return res.data.data;
    },
    enabled: !!activeSellerSlug,
  });

  const sellerId = seller?.id;

  // Fetch Seller Products
  const { data: products = [], isLoading: isProductsLoading } = useQuery({
    queryKey: ["seller-products", sellerId],
    queryFn: async () => {
      if (!sellerId) return [];
      const res = await publicApi.sellerProducts(sellerId);
      return res.data.data;
    },
    enabled: !!sellerId,
  });

  if (!activeSellerSlug) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-main/45 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={closeSeller}
    >
      <div
        className="relative w-full max-w-2xl bg-card rounded-2xl border border-brand-gray/30 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeSeller}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-brand-accent hover:text-white border border-brand-gray/30 shadow-md transition-all duration-200 cursor-pointer text-brand-main"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {isSellerLoading ? (
          <SellerSkeleton />
        ) : sellerError || !seller ? (
          <div className="p-8 text-center flex flex-col items-center justify-center gap-4">
            <p className="text-brand-accent font-semibold">Failed to load seller details.</p>
            <button
              onClick={closeSeller}
              className="px-4 py-2 bg-brand-main text-brand-cream rounded-lg hover:bg-brand-main/90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Cover Image */}
            {seller.coverUrl && (
              <div className="relative h-40 w-full bg-brand-main/10 shrink-0">
                <Image
                  src={seller.coverUrl}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Scrollable Contents */}
            <div className="overflow-y-auto p-6 flex-1 scrollbar-none md:scrollbar-thin">
              {/* Header section (Avatar overlapping cover image if present) */}
              <div className={cn(
                "flex flex-col sm:flex-row gap-4 items-start sm:items-end mb-4 relative z-10 px-2",
                seller.coverUrl ? "-mt-12 sm:-mt-14" : "mt-2"
              )}>
                <div className="bg-card p-1 rounded-xl shadow-md shrink-0">
                  <SellerAvatar name={seller.businessName} logoUrl={seller.logoUrl} size="lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold text-brand-main">{seller.businessName}</h2>
                    {seller.verified && <BadgeCheck className="h-5 w-5 text-brand-accent shrink-0" />}
                    {seller.featured && <Star className="h-5 w-5 text-brand-yellow fill-brand-yellow shrink-0" />}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1.5 items-center">
                    <CategoryTag name={seller.categoryName} className="text-xs px-2.5 py-0.5 rounded-full" />
                    <StoreTypeBadge storeType={seller.storeType} />
                  </div>
                </div>
              </div>

              {/* Description & Metadata */}
              <div className="mt-4 px-2">
                <p className="text-brand-main/80 text-sm whitespace-pre-line leading-relaxed">
                  {seller.description}
                </p>

                {/* Tags */}
                {seller.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {seller.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/search?q=${encodeURIComponent(t)}`}
                        onClick={closeSeller}
                        className="text-xs border border-brand-main/20 text-brand-main px-2.5 py-1 rounded-md bg-brand-main/5 hover:bg-brand-accent/10 transition-colors"
                      >
                        #{t}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Location and Phone */}
                <div className="mt-6 space-y-1.5 text-xs text-brand-main/70 border-t border-brand-gray/30 pt-4">
                  {seller.address && (
                    <p className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-accent/70" />
                      <span>{seller.address}</span>
                    </p>
                  )}
                  <p className="pl-6 font-semibold">
                    {[seller.area, seller.city, seller.pincode].filter(Boolean).join(", ")}
                  </p>
                  {seller.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-brand-accent/70" />
                      <span>{seller.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Contact/Social Links */}
              {renderExternalLinks(seller)}

              {/* Products Section */}
              <div className="mt-8 border-t border-brand-gray/30 pt-6 px-2">
                <h3 className="font-bold text-brand-main mb-4 text-base">Products & Services</h3>
                {isProductsLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 text-brand-highlight animate-spin" />
                  </div>
                ) : products.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {products.map((p) => (
                      <Card key={p.id} className="border border-brand-gray/30 bg-white shadow-sm hover:border-brand-highlight/40 transition-colors duration-250">
                        <CardContent className="p-3">
                          {p.imageUrl && (
                            <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2 bg-brand-cream/20">
                              <Image
                                src={p.imageUrl}
                                alt={p.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h4 className="font-semibold text-sm text-brand-main">{p.name}</h4>
                          {p.description && (
                            <p className="text-xs text-brand-main/60 mt-1 line-clamp-2">
                              {p.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-brand-main/50 italic py-2">
                    No products cataloged for this seller yet.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function renderExternalLinks(seller: any) {
  const externalLinks = [
    { label: "Chat on WhatsApp", url: seller.whatsappUrl },
    { label: "Open Instagram", url: seller.instagramUrl },
    { label: "Visit Website", url: seller.websiteUrl },
    { label: "Watch on YouTube", url: seller.youtubeUrl },
    { label: "Open Facebook", url: seller.facebookUrl },
  ].filter((l) => l.url);

  if (externalLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-6 px-2">
      {externalLinks.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${getExternalLinkClasses(link.label)} text-xs px-3.5 py-2 shadow-sm hover:scale-102 hover:shadow active:scale-100 transition-all`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function SellerSkeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full">
      {/* Cover Skeleton */}
      <div className="h-40 w-full bg-brand-main/5" />

      {/* Content Skeleton */}
      <div className="p-6 space-y-6">
        <div className="flex gap-4 -mt-12 items-end mb-4">
          <div className="h-24 w-24 rounded-xl bg-brand-main/5 border-4 border-card" />
          <div className="flex-1 space-y-2 pb-2">
            <div className="h-6 bg-brand-main/5 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-4 bg-brand-main/5 rounded w-20" />
              <div className="h-4 bg-brand-main/5 rounded w-28" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-brand-main/5 rounded w-full" />
          <div className="h-4 bg-brand-main/5 rounded w-5/6" />
          <div className="h-4 bg-brand-main/5 rounded w-3/4" />
        </div>

        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-brand-main/5 rounded w-32" />
          <div className="h-8 bg-brand-main/5 rounded w-32" />
        </div>
      </div>
    </div>
  );
}
