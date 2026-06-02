import { publicApi } from "@/lib/api-client";
import { SellerCard } from "@/components/sellers/seller-card";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let category;
  let sellers = [];

  try {
    category = (await publicApi.category(slug)).data.data;
    sellers = (await publicApi.sellersByCategory(slug)).data.data;
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{category.name}</h1>
      <p className="text-muted-foreground mt-2 mb-8">{sellers.length} sellers found</p>
      {sellers.length === 0 ? (
        <p className="text-muted-foreground">No sellers in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellers.map((s) => (
            <SellerCard key={s.id} seller={s} />
          ))}
        </div>
      )}
    </div>
  );
}
