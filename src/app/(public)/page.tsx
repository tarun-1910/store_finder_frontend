import { SearchBar } from "@/components/search/search-bar";
import { publicApi } from "@/lib/api-client";
import { SellerDirectory } from "@/components/sellers/seller-directory";
import type { SellerCard } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let sellers: SellerCard[] = [];
  let categories: Awaited<ReturnType<typeof publicApi.categories>>["data"]["data"] = [];

     console.log("HomePage rendered", Date.now());
                                                                

  try {
  console.log("Loading homepage...");

  const [sellersRes, catRes] = await Promise.all([
    publicApi.sellers(0,20),
    publicApi.categories(),
  ]);

  console.log("Sellers API success");
  console.log("Categories API success");

  sellers =  sellersRes.data.data.content || [];
  categories = catRes.data.data || [];
} catch (error) {
  console.error("Homepage fetch failed:", error);
}

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-main to-brand-accent py-24 px-4 hero-shadow">
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-brand-yellow/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-highlight/20 blur-[130px] pointer-events-none" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-brand-yellow border border-white/15 mb-6 backdrop-blur-sm tracking-wide uppercase">
            <span>✨</span> India's Premium Seller Directory
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Discover <span className="bg-gradient-to-r from-brand-yellow to-brand-highlight bg-clip-text text-transparent">Online Sellers</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto font-medium">
            Find from local stores, home businesses & Instagram sellers.
          </p>
          <SearchBar large />
        </div>
      </section>

      <SellerDirectory initialSellers={sellers} categories={categories} />
    </div>
  );
}
