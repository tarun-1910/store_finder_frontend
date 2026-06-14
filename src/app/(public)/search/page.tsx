import { Suspense } from "react";
import { SearchBar } from "@/components/search/search-bar";
import { SearchFilters } from "@/components/search/search-filters";
import { SellerCard } from "@/components/sellers/seller-card";
import { publicApi } from "@/lib/api-client";
import { parseSearchFilters } from "@/lib/search-params";
import { Search, Info, AlertTriangle } from "lucide-react";

async function SearchResults({ searchParams }: { searchParams: Promise<{ q?: string; storeType?: string; categoryId?: string }> }) {
  const params = await searchParams;
  const q = params.q || "";
  const filters = parseSearchFilters(params);

  if (!q) {
    return (
      <div className="text-center py-16 bg-neutral-50/50 border border-neutral-100 rounded-3xl max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-brand-main/5 flex items-center justify-center mx-auto mb-4 text-brand-main">
          <Search className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-brand-main mb-1">Begin Your Discovery</h3>
        <p className="text-sm text-brand-main/60 px-6">
          Enter a search term above to find boutique brands, home chefs, independent creators and local artisans.
        </p>
      </div>
    );
  }

  let sellers: Awaited<ReturnType<typeof publicApi.search>>["data"]["data"] = [];
  try {
    const res = await publicApi.search(q, filters.storeType, filters.categoryId);
    sellers = res.data.data;
  } catch (err) {
    console.error("Search API failed:", err);
    return (
      <div className="text-center py-16 bg-brand-accent/5 border border-brand-accent/10 rounded-3xl max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4 text-brand-accent">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-brand-main mb-1">Unable to Load Sellers</h3>
        <p className="text-sm text-brand-main/60 px-6">
          There was an issue connecting to the directory service. Please ensure the backend is running.
        </p>
      </div>
    );
  }

  if (sellers.length === 0) {
    return (
      <div className="text-center py-16 bg-neutral-50/50 border border-neutral-100 rounded-3xl max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center mx-auto mb-4 text-brand-highlight">
          <Info className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-brand-main mb-1">No Matches Found</h3>
        <p className="text-sm text-brand-main/60 px-6">
          We couldn't find any sellers matching &quot;<strong>{q}</strong>&quot;. Try checking for typos or searching a broader term like &quot;saree&quot; or &quot;cake&quot;.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
        <h2 className="text-xs font-bold text-brand-main/55 uppercase tracking-wider">
          Results ({sellers.length} {sellers.length === 1 ? "store" : "stores"} found)
        </h2>
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {sellers.map((s) => (
          <SellerCard key={s.id} seller={s} />
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; storeType?: string; categoryId?: string }>;
}) {
  const params = await searchParams;
  const q = params.q || "";

  return (
    <div className="relative min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-main tracking-tight mb-4">
            Search Directory
          </h1>
          <p className="text-brand-main/70 font-medium text-sm sm:text-base mb-8 max-w-md mx-auto">
            Find and connect directly with independent home businesses and Instagram brands.
          </p>
          <SearchBar defaultQuery={q} />
        </div>

        <div className="bg-white/85 backdrop-blur-md border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="mb-8">
            <Suspense fallback={
              <div className="flex gap-2">
                <div className="h-8 w-24 bg-neutral-100 rounded-full animate-pulse" />
                <div className="h-8 w-24 bg-neutral-100 rounded-full animate-pulse" />
              </div>
            }>
              <SearchFilters />
            </Suspense>
          </div>

          <Suspense fallback={
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-neutral-50 border border-neutral-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          }>
            <SearchResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
