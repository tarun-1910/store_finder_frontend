"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Grid, ChevronRight } from "lucide-react";
import { SellerCard } from "./seller-card";
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Browse Categories
        </h3>

        {/* Scroll container with right-fade + clickable arrow */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap bg-slate-900 text-white shadow-md shadow-slate-900/10"
            >
              All Stores
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right-fade gradient + clickable scroll button */}
          {!atEnd && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-1 pb-2">
              <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-20 bg-gradient-to-l from-white via-white/80 to-transparent" />
              <button
                onClick={scrollRight}
                aria-label="Scroll categories right"
                className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md shadow-slate-200 border border-slate-100 hover:bg-slate-50 hover:shadow-lg transition-all duration-200 animate-bounce hover:animate-none cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            Featured Sellers
          </h2>

          <p className="text-sm text-slate-500 mt-0.5">
            Found {initialSellers.length} stores
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
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
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No sellers found.
          </p>
        </div>
      )}

      <Link
        href="/sellers"
        className="inline-flex mt-8 px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
      >
        View All Sellers →
      </Link>


    </div>


  );
}