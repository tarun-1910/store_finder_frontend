"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Grid, ChevronRight } from "lucide-react";
import { SellerCard } from "./seller-card";
import { getCategoryEmoji } from "@/lib/colors";
import type { Category, SellerCard as SellerCardType } from "@/lib/types";
import { publicApi } from "@/lib/api-client";

interface SellerDirectoryProps {
  initialSellers: SellerCardType[];
  categories: Category[];
}

export function SellerDirectory({
  initialSellers,
  categories,
}: SellerDirectoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  
  // Client state for in-place category filtering
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [displayedSellers, setDisplayedSellers] = useState<SellerCardType[]>(initialSellers);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = async (slug: string | null) => {
    if (slug === null) {
      setSelectedCategorySlug(null);
      setDisplayedSellers(initialSellers);
      return;
    }

    setSelectedCategorySlug(slug);
    setIsLoading(true);
    try {
      const res = await publicApi.sellersByCategory(slug, 0, 50);
      const content = res.data.data.content || [];
      setDisplayedSellers(content);
    } catch (error) {
      console.error("Failed to load category sellers in-place:", error);
      setDisplayedSellers([]);
    } finally {
      setIsLoading(false);
    }
  };

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }

  function scrollRight() {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: 300, behavior: "smooth" });
  }

  // Sort categories popular-first based on initialSellers, but include ALL categories
  const sortedCategories = [...categories].sort((a, b) => {
    const countA = initialSellers.filter(
      (s) => s.categoryName === a.name
    ).length;
    const countB = initialSellers.filter(
      (s) => s.categoryName === b.name
    ).length;
    return countB - countA;
  });

  const activeCategory = categories.find((c) => c.slug === selectedCategorySlug);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories Selector */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 border-b border-neutral-100 pb-3">
          <h3 className="text-xs font-bold text-brand-main/70 uppercase tracking-widest">
            Browse Categories
          </h3>
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="text-xs font-bold text-brand-main bg-brand-main/5 hover:bg-brand-main/10 border border-neutral-200/80 px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-102 active:scale-98"
          >
            {isGridView ? "📋 Pill View" : "📐 Expand Grid"}
          </button>
        </div>

        {isGridView ? (
          /* Grid Drawer View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleCategorySelect(null);
                setIsGridView(false);
              }}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-250 text-center group cursor-pointer ${
                selectedCategorySlug === null
                  ? "border-brand-main bg-brand-main text-white hover:bg-brand-main/95 hover:shadow-lg hover:shadow-brand-main/10"
                  : "border-neutral-200 bg-white hover:bg-neutral-50/50 hover:border-brand-highlight/40 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              <span className="text-3xl mb-2.5 group-hover:scale-110 transition-transform duration-200">🏬</span>
              <span className="font-extrabold text-sm">All Stores</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full mt-2.5 font-bold ${
                selectedCategorySlug === null
                  ? "bg-white/20 text-white/95"
                  : "bg-brand-main/5 text-brand-main/60"
              }`}>
                Explore All
              </span>
            </Link>

            {sortedCategories.map((category) => {
              const isActive = selectedCategorySlug === category.slug;
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategorySelect(category.slug);
                    setIsGridView(false);
                  }}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-250 text-center group cursor-pointer ${
                    isActive
                      ? "border-brand-highlight bg-brand-highlight/5 ring-1 ring-brand-highlight text-brand-main shadow-lg hover:-translate-y-1"
                      : "border-neutral-200 bg-white hover:bg-neutral-50/50 hover:border-brand-highlight/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/50"
                  }`}
                >
                  <span className="text-3xl mb-2.5 group-hover:scale-110 transition-transform duration-200">
                    {getCategoryEmoji(category.name)}
                  </span>
                  <span className="font-bold text-brand-main text-sm line-clamp-1">{category.name}</span>
                  <span className={`text-xs mt-2.5 px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                    isActive
                      ? "bg-brand-highlight text-white"
                      : "bg-brand-main/5 text-brand-main/60 group-hover:bg-brand-main/10"
                  }`}>
                    {isActive ? "Active" : "Explore"}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Horizontal Pill Rail View */
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-neutral-100"
            >
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategorySelect(null);
                }}
                className={`flex flex-col items-center gap-1.5 pb-2.5 min-w-[64px] border-b-2 transition-all duration-200 shrink-0 ${
                  selectedCategorySlug === null
                    ? "border-brand-main text-brand-main font-bold"
                    : "border-transparent text-brand-main/60 hover:text-brand-main hover:border-brand-main/20"
                }`}
              >
                <span className="text-2xl animate-pulse">🏬</span>
                <span className="text-xs font-bold whitespace-nowrap">All Stores</span>
              </Link>

              {sortedCategories.map((category) => {
                const isActive = selectedCategorySlug === category.slug;
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategorySelect(category.slug);
                    }}
                    className={`flex flex-col items-center gap-1.5 pb-2.5 min-w-[64px] border-b-2 transition-all duration-200 shrink-0 group ${
                      isActive
                        ? "border-brand-main text-brand-main font-bold"
                        : "border-transparent text-brand-main/60 hover:text-brand-main hover:border-brand-main/10"
                    }`}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {getCategoryEmoji(category.name)}
                    </span>
                    <span className="text-xs font-semibold whitespace-nowrap group-hover:font-bold">
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right-fade gradient + clickable scroll button */}
            {!atEnd && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-1 pb-4">
                <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-white via-white/80 to-transparent" />
                <button
                  onClick={scrollRight}
                  aria-label="Scroll categories right"
                  className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-neutral-200 hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4 text-brand-main" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-main tracking-tight">
            {activeCategory ? `${activeCategory.name} Sellers` : "Featured Sellers"}
          </h2>
          <p className="text-xs text-brand-main/60 mt-1">
            Found {displayedSellers.length} {displayedSellers.length === 1 ? "store" : "stores"}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-main/70 bg-brand-main/5 px-3 py-1.5 rounded-lg font-bold">
          <Grid className="h-3.5 w-3.5" />
          <span>Grid view</span>
        </div>
      </div>

      {/* Sellers Grid with Loading Skeleton Overlay */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-neutral-50 border border-neutral-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : displayedSellers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedSellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-main/[0.02] rounded-2xl border border-dashed border-neutral-200">
          <p className="text-brand-main/50 text-sm">
            No sellers found in this category yet.
          </p>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Link
          href="/sellers"
          className="inline-flex px-6 py-3.5 bg-brand-main text-white font-bold rounded-xl hover:bg-brand-main/90 shadow-md shadow-brand-main/10 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          View All Sellers →
        </Link>
      </div>
    </div>
  );
}