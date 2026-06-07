"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Grid, ChevronRight } from "lucide-react";
import { SellerCard } from "./seller-card";
import { getCategoryEmoji } from "@/lib/colors";
import type { Category, SellerCard as SellerCardType } from "@/lib/types";

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

  // Calculate dynamic counts and sort categories popular-first
  const categoriesWithCounts = categories
    .map((category) => {
      const count = initialSellers.filter(
        (s) => s.categoryName === category.name
      ).length;
      return { ...category, count };
    })
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories Selector */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-brand-main/70 uppercase tracking-wider">
            Browse Categories
          </h3>
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="text-xs font-bold text-brand-main bg-brand-yellow/15 hover:bg-brand-yellow/30 border border-brand-yellow/30 px-3.5 py-2 rounded-full transition-all duration-200 flex items-center gap-1 cursor-pointer shadow-sm hover:scale-105"
          >
            {isGridView ? "📋 Pill View" : "📐 Expand Grid"}
          </button>
        </div>

        {isGridView ? (
          /* Grid Drawer View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              href="/"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-brand-main/20 bg-brand-main text-brand-cream hover:bg-brand-main/90 hover:-translate-y-1 transition-all duration-250 text-center shadow-md shadow-brand-main/10 group cursor-pointer"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">🏬</span>
              <span className="font-bold text-sm">All Stores</span>
              <span className="text-xs bg-white/20 text-white/95 px-2 py-0.5 rounded-full mt-2 font-semibold">
                {initialSellers.length} stores
              </span>
            </Link>

            {categoriesWithCounts.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-brand-yellow/20 bg-brand-yellow/5 hover:bg-brand-yellow/15 hover:border-brand-highlight/40 hover:-translate-y-1 transition-all duration-250 text-center group cursor-pointer"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {getCategoryEmoji(category.name)}
                </span>
                <span className="font-bold text-brand-main text-sm line-clamp-1">{category.name}</span>
                <span className="text-xs text-brand-main/60 mt-2 bg-brand-main/5 px-2 py-0.5 rounded-full font-semibold">
                  {category.count} {category.count === 1 ? "store" : "stores"}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          /* Horizontal Pill Rail View */
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <Link
                href="/"
                className="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap bg-brand-main text-brand-cream shadow-md shadow-brand-main/10 transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <span>🏬</span>
                <span>All Stores</span>
                <span className="text-xs bg-brand-cream/20 text-brand-cream px-2 py-0.5 rounded-full font-bold">
                  {initialSellers.length}
                </span>
              </Link>

              {categoriesWithCounts.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap bg-brand-yellow/15 text-brand-main border border-brand-yellow/20 hover:bg-brand-yellow/30 transition-all duration-200 flex items-center gap-2 group hover:scale-105"
                >
                  <span>{getCategoryEmoji(category.name)}</span>
                  <span>{category.name}</span>
                  <span className="text-xs bg-brand-main/10 text-brand-main/70 px-2 py-0.5 rounded-full font-bold group-hover:bg-brand-main/20 transition-colors">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right-fade gradient + clickable scroll button */}
            {!atEnd && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-1 pb-2">
                <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-20 bg-gradient-to-l from-brand-cream via-brand-cream/80 to-transparent" />
                <button
                  onClick={scrollRight}
                  aria-label="Scroll categories right"
                  className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-brand-cream shadow-md shadow-brand-accent/20 border border-brand-gray/30 hover:bg-brand-cream/90 transition-all duration-200 animate-bounce hover:animate-none cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4 text-brand-main" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-gray/30">
        <div>
          <h2 className="text-xl font-bold text-brand-main md:text-2xl">
            Featured Sellers
          </h2>

          <p className="text-sm text-brand-main/70 mt-0.5">
            Found {initialSellers.length} stores
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-main/80 bg-brand-accent/10 px-3 py-1.5 rounded-lg font-semibold">
          <Grid className="h-3.5 w-3.5" />
          <span>Grid view</span>
        </div>
      </div>

      {/* Sellers Grid */}
      {initialSellers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initialSellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-brand-accent/5 rounded-2xl border border-dashed border-brand-gray/40">
          <p className="text-brand-main/70">
            No sellers found.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/sellers"
          className="inline-flex px-6 py-3 bg-brand-highlight text-brand-main font-bold rounded-lg hover:bg-brand-highlight/90 shadow-md shadow-brand-highlight/15 transition-all duration-200 cursor-pointer"
        >
          View All Sellers →
        </Link>
      </div>
    </div>
  );
}