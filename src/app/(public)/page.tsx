import { SearchBar } from "@/components/search/search-bar";
import { publicApi } from "@/lib/api-client";
import { SellerDirectory } from "@/components/sellers/seller-directory";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let sellers = [];
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
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Discover Online Sellers
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Find from local stores, home businesses & Instagram sellers.
          </p>
          <SearchBar large />
        </div>
      </section>

      <SellerDirectory initialSellers={sellers} categories={categories} />
    </div>
  );
}
