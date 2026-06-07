import { Suspense } from "react";
import { SearchBar } from "@/components/search/search-bar";
import { SearchFilters } from "@/components/search/search-filters";
import { SellerCard } from "@/components/sellers/seller-card";
import { publicApi } from "@/lib/api-client";
import { parseSearchFilters } from "@/lib/search-params";

async function SearchResults({ searchParams }: { searchParams: Promise<{ q?: string; storeType?: string; categoryId?: string }> }) {
  const params = await searchParams;
  const q = params.q || "";
  const filters = parseSearchFilters(params);

  if (!q) {
    return <p className="text-muted-foreground">Enter a search term to find sellers.</p>;
  }

  let sellers: Awaited<ReturnType<typeof publicApi.search>>["data"]["data"] = [];
  try {
    const res = await publicApi.search(q, filters.storeType, filters.categoryId);
    sellers = res.data.data;
  } catch {
    return <p className="text-brown-500">Could not load results. Is the API running?</p>;
  }

  if (sellers.length === 0) {
    return <p className="text-muted-foreground">No sellers found for &quot;{q}&quot;.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sellers.map((s) => (
        <SellerCard key={s.id} seller={s} />
      ))}
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

  let categories: Awaited<ReturnType<typeof publicApi.categories>>["data"]["data"] = [];
  try {
    categories = (await publicApi.categories()).data.data;
  } catch { /* ignore */ }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      <SearchBar defaultQuery={q} />
      <div className="mt-6 mb-6">
        <Suspense fallback={null}>
          <SearchFilters  />
        </Suspense>
      </div>
      {q && <p className="text-sm text-muted-foreground mb-4">Showing results for: <strong>{q}</strong></p>}
      <Suspense fallback={<p>Loading...</p>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
