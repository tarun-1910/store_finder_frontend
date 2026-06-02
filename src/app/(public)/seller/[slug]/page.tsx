import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StoreTypeBadge } from "@/components/sellers/store-type-badge";
import { SellerAvatar } from "@/components/sellers/seller-avatar";
import { publicApi } from "@/lib/api-client";
import { notFound } from "next/navigation";

export default async function SellerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let seller;
 let products = [];   

 try {
  const sellerResponse = await publicApi.seller(slug);
  console.log("SELLER OK", sellerResponse.data);

  seller = sellerResponse.data.data;

    const productsResponse = await publicApi.sellerProducts(seller.id);
    console.log("PRODUCTS OK", productsResponse.data);
     products = productsResponse.data.data;
} catch (error) {
  console.error(error);
  throw error;
}



  const externalLinks = [
    { label: "Chat on WhatsApp", url: seller.whatsappUrl, variant: "outline" as const },
    { label: "Open Instagram", url: seller.instagramUrl, variant: "default" as const },
    { label: "Visit Website", url: seller.websiteUrl, variant: "outline" as const },
    { label: "Watch on YouTube", url: seller.youtubeUrl, variant: "outline" as const },
    { label: "Open Facebook", url: seller.facebookUrl, variant: "outline" as const }
  ].filter((l) => l.url);

  return (
    <div>
      {seller.coverUrl && (
        <div className="relative h-48 md:h-64 w-full bg-slate-200">
          <Image src={seller.coverUrl} alt="" fill className="object-cover" priority />
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <SellerAvatar name={seller.businessName} logoUrl={seller.logoUrl} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold">{seller.businessName}</h1>
              {seller.verified && <BadgeCheck className="h-6 w-6 text-blue-500" />}
              {seller.featured && <Star className="h-6 w-6 text-amber-500 fill-amber-500" />}
            </div>
            <p className="text-muted-foreground mt-2">{seller.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">{seller.categoryName}</span>
              <StoreTypeBadge storeType={seller.storeType} />
            </div>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              {seller.address && <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{seller.address}</p>}
              <p>{[seller.area, seller.city, seller.pincode].filter(Boolean).join(", ")}</p>
              {seller.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4" />{seller.phone}</p>}
            </div>
            {seller.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {seller.tags.map((t) => (
                  <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="text-xs border px-2 py-1 rounded hover:bg-slate-50">
                    #{t}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.url!}
              target="_blank"
              rel="noopener noreferrer"
              className={
                link.variant === "default"
                  ? "inline-flex items-center justify-center rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium"
                  : "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {products.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">Products & Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-4">
                    {p.imageUrl && (
                      <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3 bg-slate-100">
                        <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                      </div>
                    )}
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
