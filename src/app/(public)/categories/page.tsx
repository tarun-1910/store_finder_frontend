import Link from "next/link";
import { publicApi } from "@/lib/api-client";

export default async function CategoriesPage() {
  let categories: Awaited<ReturnType<typeof publicApi.categories>>["data"]["data"] = [];
  try {
    categories = (await publicApi.categories()).data.data;
  } catch { /* ignore */ }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">All Categories</h1>
      <p className="text-muted-foreground mb-8">Browse sellers by category in Bangalore</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="p-6 rounded-xl border bg-white hover:border-emerald-400 hover:shadow transition text-center"
          >
            <span className="font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
