"use client";

import { useEffect, useState } from "react";
import { Grid, HelpCircle, Store } from "lucide-react";
import { publicApi } from "@/lib/api-client";
import { SellerCard } from "./seller-card";
import type { Category, SellerCard as SellerCardType } from "@/lib/types";

interface SellerDirectoryProps {
  initialSellers: SellerCardType[];
  categories: Category[];
}

export function SellerDirectory({ initialSellers, categories }: SellerDirectoryProps) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [sellers, setSellers] = useState<SellerCardType[]>(initialSellers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // When switching back to "All", reset immediately without API call
    if (activeCategorySlug === null) {
      setSellers(initialSellers);
      setError(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchSellers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await publicApi.sellersByCategory(activeCategorySlug);
        if (isMounted) {
          setSellers(res.data.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Could not load stores for this category. Please try again.");
          console.error("Error loading sellers:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSellers();

    return () => {
      isMounted = false;
    };
  }, [activeCategorySlug, initialSellers]);

  const activeCategoryName = activeCategorySlug
    ? categories.find((c) => c.slug === activeCategorySlug)?.name
    : "All Categories";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Horizontal Scroll Filter Pills */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Filter by Category
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* "All" Pill */}
          <button
            onClick={() => setActiveCategorySlug(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              activeCategorySlug === null
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            All Stores
          </button>

          {/* Category Pills */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategorySlug(category.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategorySlug === category.slug
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Status Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            {activeCategoryName}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {loading ? "Searching..." : `Found ${sellers.length} stores`}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
          <Grid className="h-3.5 w-3.5" />
          <span>Grid view</span>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center max-w-md mx-auto my-8">
          <HelpCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <h4 className="font-semibold text-red-900">Something went wrong</h4>
          <p className="text-sm text-red-700 mt-1">{error}</p>
          <button
            onClick={() => setActiveCategorySlug(null)}
            className="mt-3 px-4 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-medium transition"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-xl p-4 flex gap-4 bg-white animate-pulse"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 shrink-0"></div>
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-full"></div>
                  <div className="h-3 bg-slate-100 rounded w-4/5"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-4 bg-slate-100 rounded w-12"></div>
                  <div className="h-4 bg-slate-100 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sellers Grid */}
      {!loading && !error && sellers.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
          {sellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && sellers.length === 0 && (
        <div className="text-center py-16 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 max-w-lg mx-auto my-6">
          <Store className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No sellers registered</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn't find any stores listed under "{activeCategoryName}" at the moment.
          </p>
          {activeCategorySlug !== null && (
            <button
              onClick={() => setActiveCategorySlug(null)}
              className="mt-4 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition shadow-sm"
            >
              View all stores
            </button>
          )}
        </div>
      )}
    </div>
  );
}
