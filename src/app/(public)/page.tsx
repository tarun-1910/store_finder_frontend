import { SearchBar } from "@/components/search/search-bar";
import { publicApi } from "@/lib/api-client";
import { SellerDirectory } from "@/components/sellers/seller-directory";
import type { SellerCard } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let sellers: SellerCard[] = [];
  let categories: Awaited<ReturnType<typeof publicApi.categories>>["data"]["data"] = [];
  let totalPages = 0;
  let totalElements = 0;

  console.log("HomePage rendered", Date.now());

  try {
    console.log("Loading homepage...");

    const [sellersRes, catRes] = await Promise.all([
      publicApi.sellers(0, 20),
      publicApi.categories(),
    ]);

    console.log("Sellers API success");
    console.log("Categories API success");


    console.log(
        "SELLERS RESPONSE:",
        JSON.stringify(sellersRes.data, null, 2)
      );

      console.log(
        "CATEGORIES RESPONSE:",
        JSON.stringify(catRes.data, null, 2)
      );



    sellers = sellersRes.data.data.content || [];
    categories = catRes.data.data || [];
    totalPages = sellersRes.data.data.totalPages || 0;
    totalElements = sellersRes.data.data.totalElements || 0;

    
    console.log("SELLERS LENGTH:", sellers.length);
    console.log("CATEGORIES LENGTH:", categories.length);



  } catch (error) {
    console.error("Homepage fetch failed:", error);
  }

  return (
    <div>
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-28 px-4 bg-white border-b border-neutral-100">
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-yellow/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-highlight/10 blur-[100px] pointer-events-none" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-main/5 text-brand-main border border-brand-main/10 mb-6 backdrop-blur-sm tracking-wide uppercase">
            <span>✨</span> India's Premium Seller Directory
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-brand-main mb-6 tracking-tight leading-none">
            Discover the Story. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-highlight to-brand-yellow bg-clip-text text-transparent">Witness the Making.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-brand-main/70 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
            Find and connect directly with local boutiques, home businesses, craft bakers, and Instagram brands.
          </p>
          <SearchBar large />
        </div>
      </section>



      <div>
            Sellers Loaded: {sellers.length}
          </div>

          <div>
            Categories Loaded: {categories.length}
          </div>

      <SellerDirectory 
        initialSellers={sellers} 
        categories={categories} 
        initialTotalPages={totalPages}
        initialTotalElements={totalElements}
      />

        
    </div>
  );
}
