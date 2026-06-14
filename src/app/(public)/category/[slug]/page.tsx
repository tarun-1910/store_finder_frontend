import Link from "next/link";
import { notFound } from "next/navigation";
import { SellerCard } from "@/components/sellers/seller-card";
import { publicApi } from "@/lib/api-client";
import type { SellerCard as SellerCardType } from "@/lib/types";
import { getCategoryEmoji } from "@/lib/colors";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";

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
  let sellers: SellerCardType[] = [];
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
  } catch (err) {
    console.error("Failed to load category page:", err);
    notFound();
  }

  const emoji = getCategoryEmoji(category.name);

  return (
    <div className="relative min-h-screen">
      {/* Subtle mesh grid background overlay */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Back Link */}
        <div className="mb-8 max-w-5xl mx-auto">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-main/60 hover:text-brand-main transition-colors uppercase tracking-wider"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Categories
          </Link>
        </div>

        {/* Category Header */}
        <div className="max-w-5xl mx-auto mb-12 border-b border-neutral-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl filter drop-shadow-sm select-none">{emoji}</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-main/5 text-brand-main border border-brand-main/10 uppercase tracking-wider">
                Category
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-main tracking-tight">
              {category.name}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-brand-main/5 border border-brand-main/10 text-brand-main font-bold text-xs px-4 py-2 rounded-full w-fit">
            <Store className="h-3.5 w-3.5" />
            <span>{totalElements} {totalElements === 1 ? "seller" : "sellers"} registered</span>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="max-w-5xl mx-auto">
          {sellers.length === 0 ? (
            <div className="text-center py-20 bg-brand-main/[0.01] rounded-3xl border border-dashed border-neutral-200 p-8">
              <span className="text-4xl block mb-4">🏪</span>
              <h3 className="text-base font-bold text-brand-main mb-1">No Sellers Registered Yet</h3>
              <p className="text-sm text-brand-main/50 max-w-sm mx-auto">
                We don't have active sellers in this category at the moment. Check back soon or register a store.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {sellers.map((seller) => (
                  <SellerCard
                    key={seller.id}
                    seller={seller}
                  />
                ))}
              </div>

              {/* Styled Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12 pt-8 border-t border-neutral-100">
                  {page > 0 ? (
                    <Link
                      href={`/category/${slug}?page=${page - 1}`}
                      className="flex items-center justify-center w-10 h-10 border border-neutral-200 bg-white rounded-full text-brand-main hover:bg-neutral-50 hover:border-brand-main/20 hover:-translate-x-0.5 transition-all duration-200 shadow-sm cursor-pointer"
                      title="Previous Page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 border border-neutral-100 bg-neutral-50 rounded-full text-neutral-300 pointer-events-none" />
                  )}

                  <span className="text-xs font-bold text-brand-main/60 bg-brand-main/5 px-4 py-2.5 rounded-full border border-neutral-100">
                    Page {page + 1} of {totalPages}
                  </span>

                  {page < totalPages - 1 ? (
                    <Link
                      href={`/category/${slug}?page=${page + 1}`}
                      className="flex items-center justify-center w-10 h-10 border border-neutral-200 bg-white rounded-full text-brand-main hover:bg-neutral-50 hover:border-brand-main/20 hover:translate-x-0.5 transition-all duration-200 shadow-sm cursor-pointer"
                      title="Next Page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 border border-neutral-100 bg-neutral-50 rounded-full text-neutral-300 pointer-events-none" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}