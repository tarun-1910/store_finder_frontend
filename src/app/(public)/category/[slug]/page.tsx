import Link from "next/link";
import { notFound } from "next/navigation";
import { SellerCard } from "@/components/sellers/seller-card";
import { publicApi } from "@/lib/api-client";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const page = Number(sp.page ?? "0");

  let category;
  let sellers = [];
  let totalPages = 0;
  let totalElements = 0;

  try {
    category = (await publicApi.category(slug)).data.data;

    const sellerPage = (
      await publicApi.sellersByCategory(
        slug,
        page,
        20
      )
    ).data.data;

    sellers = sellerPage.content;
    totalPages = sellerPage.totalPages;
    totalElements = sellerPage.totalElements;
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">
        {category.name}
      </h1>

      <p className="text-muted-foreground mt-2 mb-8">
        {totalElements} sellers found
      </p>

      {sellers.length === 0 ? (
        <p className="text-muted-foreground">
          No sellers in this category yet.
        </p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellers.map((seller) => (
              <SellerCard
                key={seller.id}
                seller={seller}
              />
            ))}
          </div>


        


          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              {page > 0 && (
                <Link
                  href={`/category/${slug}?page=${page - 1}`}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50"
                >
                  ← Previous
                </Link>
              )}

              <span className="text-sm font-medium text-slate-600">
                Page {page + 1} of {totalPages}
              </span>

              {page < totalPages - 1 && (
                <Link
                  href={`/category/${slug}?page=${page + 1}`}
                  className="px-4 py-2 border rounded-lg hover:bg-slate-50"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}