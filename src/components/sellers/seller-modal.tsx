"use client";

import React, { createContext, useContext, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Star, MapPin, Phone, X, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryTag } from "@/components/ui/category-tag";
import { StoreTypeBadge } from "./store-type-badge";
import { SellerAvatar } from "./seller-avatar";
import { getExternalLinkClasses } from "@/lib/colors";
import { publicApi, trackEvent } from "@/lib/api-client";
import { cn } from "@/lib/utils";

// Custom simple SVG icons to avoid lucide-react brand icon version issues
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 00-6.98-2.879c-5.443 0-9.866 4.372-9.87 9.802 0 1.714.47 3.387 1.357 4.873l-.997 3.635 3.69-.968zm10.53-4.474c-.298-.148-1.763-.86-2.037-.959-.273-.099-.472-.148-.671.148-.197.297-.768.959-.941 1.157-.174.198-.348.223-.646.074-2.887-1.427-4.576-2.585-5.918-4.887-.354-.608.354-.564.992-1.812.112-.223.056-.417-.028-.565-.084-.148-.671-1.603-.92-2.201-.242-.58-.487-.5-.671-.51l-.571-.01c-.198 0-.52.074-.793.372-.272.297-1.04.297-1.04 2.502 0 2.205 1.61 4.333 1.833 4.63.223.297 3.167 4.793 7.669 6.712 2.659 1.134 3.738 1.215 4.82.99.704-.146 1.763-.711 2.012-1.396.248-.686.248-1.275.174-1.396-.074-.121-.272-.22-.57-.369z"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

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

  if (!activeSellerSlug) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-main/55 backdrop-blur-md p-4 animate-in fade-in duration-300"
      onClick={closeSeller}
    >
      <div
        className="relative w-full max-w-xl bg-card rounded-2xl border border-brand-gray/30 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeSeller}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-brand-accent hover:text-white border border-brand-gray/30 shadow-md backdrop-blur-sm transition-all duration-300 hover:rotate-90 cursor-pointer text-brand-main focus:outline-none focus:ring-2 focus:ring-brand-accent"
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
          <div className="overflow-y-auto flex-1 scrollbar-none md:scrollbar-thin">
            {/* Cover Image or Gradient (placed inside scroll to prevent top clipping) */}
            {seller.coverUrl ? (
              <div className="relative h-44 w-full bg-brand-main/10 shrink-0">
                <Image
                  src={seller.coverUrl}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="relative h-44 w-full bg-gradient-to-tr from-brand-main via-[#0b4f6c] to-brand-highlight/40 shrink-0 overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#eae2b7_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-0 right-0 w-44 h-44 bg-brand-highlight/25 rounded-full blur-2xl transform translate-x-12 -translate-y-12" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-brand-accent/25 rounded-full blur-2xl transform -translate-x-12 translate-y-12" />
              </div>
            )}

            {/* Scrollable Contents padding container */}
            <div className="p-6 pt-0">
              {/* Header section (Avatar overlapping cover banner, with name centered next to it to align fully on the cover background) */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-4 relative z-10 px-2 -mt-16 sm:-mt-20">
                <div className="bg-card p-1.5 rounded-2xl shadow-xl shrink-0 ring-4 ring-card overflow-hidden">
                  <SellerAvatar name={seller.businessName} logoUrl={seller.logoUrl} size="lg" />
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-main sm:text-white tracking-tight leading-none drop-shadow-none sm:drop-shadow-sm">
                      {seller.businessName}
                    </h2>
                    {seller.verified && (
                      <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-brand-accent/10 sm:bg-white/10 sm:backdrop-blur-sm">
                        <BadgeCheck className="h-5 w-5 text-brand-accent sm:text-brand-yellow shrink-0" />
                      </span>
                    )}
                    {seller.featured && (
                      <Star className="h-5 w-5 text-brand-yellow fill-brand-yellow shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              {/* Category & Store Type Badges (rendered on white background for clean spacing & contrast) */}
              <div className="flex flex-wrap gap-2 px-2 mb-5 items-center">
                <CategoryTag name={seller.categoryName} className="text-xs px-3.5 py-1.5 rounded-full font-bold shadow-sm" />
                <StoreTypeBadge storeType={seller.storeType} />
              </div>

              {/* Description */}
              <div className="mt-4 px-2">
                <p className="text-brand-main/80 text-sm sm:text-base whitespace-pre-line leading-relaxed bg-brand-main/5 p-4 sm:p-5 rounded-2xl border border-brand-main/5 shadow-inner">
                  {seller.description}
                </p>

                {/* Tags */}
                {seller.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {seller.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/search?q=${encodeURIComponent(t)}`}
                        onClick={closeSeller}
                        className="text-xs border border-brand-main/15 text-brand-main px-3 py-1 rounded-lg bg-white/70 hover:bg-brand-highlight hover:text-white hover:border-brand-highlight transition-all duration-200 shadow-sm"
                      >
                        #{t}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Location & Metadata Cards */}
              {(seller.address || seller.area || seller.city || seller.phone) && (
                <div className="mt-6 px-2">
                  <div className="p-5 bg-brand-cream/30 border border-brand-gray/35 rounded-2xl space-y-4 shadow-sm">
                    <h3 className="text-xs font-bold text-brand-main/70 uppercase tracking-widest border-b border-brand-gray/30 pb-2">
                      Store Location & Details
                    </h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(seller.address || seller.area || seller.city) && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-brand-main/5 text-brand-accent shrink-0">
                            <MapPin className="h-4.5 w-4.5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-brand-main/60 uppercase font-bold tracking-wider">Address</p>
                            {seller.address && (
                              <p className="text-xs text-brand-main/80 leading-normal">{seller.address}</p>
                            )}
                            {(seller.area || seller.city || seller.pincode) && (
                              <p className="text-xs font-bold text-brand-main">
                                {[seller.area, seller.city, seller.pincode].filter(Boolean).join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {seller.phone && (
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-brand-main/5 text-brand-accent shrink-0">
                            <Phone className="h-4.5 w-4.5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-brand-main/60 uppercase font-bold tracking-wider">Phone</p>
                            <p className="text-sm font-bold text-brand-main">
                              {seller.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Contact/Social Links */}
              {renderExternalLinks(seller)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type Platform = "whatsapp" | "instagram" | "website" | "youtube" | "facebook";

function renderExternalLinks(seller: any) {
  const externalLinks: { label: string; url: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; platform: Platform }[] = [
    { label: "Chat on WhatsApp", url: seller.whatsappUrl, icon: WhatsAppIcon, platform: "whatsapp" },
    { label: "Open Instagram",   url: seller.instagramUrl, icon: InstagramIcon, platform: "instagram" },
    { label: "Visit Website",    url: seller.websiteUrl,  icon: Globe,          platform: "website" },
    { label: "Watch on YouTube", url: seller.youtubeUrl,  icon: YoutubeIcon,    platform: "youtube" },
    { label: "Open Facebook",    url: seller.facebookUrl, icon: FacebookIcon,   platform: "facebook" },
  ].filter((l) => l.url);

  if (externalLinks.length === 0) return null;

  return (
    <div className="mt-6 border-t border-brand-gray/30 pt-6 px-2">
      <h3 className="text-xs font-bold text-brand-main/70 uppercase tracking-widest mb-3">
        Connect Online
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {externalLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(seller.slug, "redirect_click", link.platform)}
              className={cn(
                getExternalLinkClasses(link.label),
                "text-xs px-4 py-2.5 rounded-xl font-bold shadow-sm flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer"
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function SellerSkeleton() {
  return (
    <div className="animate-pulse flex flex-col w-full">
      {/* Cover Skeleton */}
      <div className="h-44 w-full bg-brand-main/5" />

      {/* Content Skeleton */}
      <div className="p-6 space-y-6">
        <div className="flex gap-4 -mt-16 sm:-mt-20 items-end mb-4">
          <div className="h-24 w-24 rounded-2xl bg-brand-main/5 border-4 border-card" />
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
