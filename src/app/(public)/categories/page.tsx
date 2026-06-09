import Link from "next/link";
import { publicApi } from "@/lib/api-client";
import { getCategoryEmoji } from "@/lib/colors";
import { ArrowRight } from "lucide-react";

export default async function CategoriesPage() {
  let categories: Awaited<ReturnType<typeof publicApi.categories>>["data"]["data"] = [];
  try {
    categories = (await publicApi.categories()).data.data;
  } catch (err) {
    console.error("Failed to load categories:", err);
  }

  // Define premium gradient backgrounds for different category indices
  const gradients = [
    "from-[#003049]/5 to-[#eae2b7]/20 border-brand-main/10",
    "from-[#f77f00]/5 to-[#fcbf49]/20 border-brand-highlight/10",
    "from-[#d62828]/5 to-[#f77f00]/20 border-brand-accent/10",
    "from-[#25D366]/5 to-[#fcbf49]/20 border-green-500/10",
    "from-[#9b59b6]/5 to-[#ecf0f1]/20 border-purple-500/10",
    "from-[#3498db]/5 to-[#2ecc71]/20 border-blue-500/10",
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-brand-yellow/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-brand-highlight/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-main/5 text-brand-main border border-brand-main/10 mb-4 uppercase tracking-wider">
            📁 Categories Index
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-main tracking-tight mb-4">
            Browse by Specialty
          </h1>
          <p className="text-brand-main/70 font-medium text-sm sm:text-base max-w-md mx-auto">
            Explore independent sellers, custom curators, and home studios organized by product category.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50/50 border border-neutral-100 rounded-3xl max-w-md mx-auto">
            <p className="text-brand-main/50 text-sm">No categories available at this moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {categories.map((cat, idx) => {
              const gradientClass = gradients[idx % gradients.length];
              const emoji = getCategoryEmoji(cat.name);
              
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`group relative overflow-hidden p-6 rounded-3xl border bg-gradient-to-br ${gradientClass} hover:shadow-xl hover:shadow-brand-main/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[160px]`}
                >
                  {/* Decorative circle ornament inside the card */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/40 blur-md group-hover:scale-110 transition-transform duration-300" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 select-none">
                        {emoji}
                      </span>
                      <span className="text-xs font-bold text-brand-main/40 uppercase tracking-widest bg-white/70 px-2.5 py-1 rounded-full border border-neutral-100 group-hover:bg-white transition-colors">
                        Explore
                      </span>
                    </div>
                    
                    <h2 className="text-lg font-extrabold text-brand-main group-hover:text-brand-highlight transition-colors duration-250">
                      {cat.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-main/60 mt-4 group-hover:text-brand-main transition-colors">
                    <span>View Sellers</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
