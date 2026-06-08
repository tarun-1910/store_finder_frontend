import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Star, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryTag } from "@/components/ui/category-tag";
import { StoreTypeBadge } from "@/components/sellers/store-type-badge";
import { SellerAvatar } from "@/components/sellers/seller-avatar";
import { getExternalLinkClasses } from "@/lib/colors";
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
    { label: "Chat on WhatsApp", url: seller.whatsappUrl },
    { label: "Open Instagram", url: seller.instagramUrl },
    { label: "Visit Website", url: seller.websiteUrl },
    { label: "Watch on YouTube", url: seller.youtubeUrl },
    { label: "Open Facebook", url: seller.facebookUrl },
  ].filter((l) => l.url);

  return (
    <div>
      {seller.coverUrl && (
        <div className="relative h-48 md:h-64 w-full bg-indian-brown/10">
          <Image src={seller.coverUrl} alt="" fill className="object-cover" priority />
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <SellerAvatar name={seller.businessName} logoUrl={seller.logoUrl} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold">{seller.businessName}</h1>
              {seller.verified && <BadgeCheck className="h-6 w-6 text-brand-accent" />}
              {seller.featured && <Star className="h-6 w-6 text-brand-yellow fill-brand-yellow" />}
            </div>
            <p className="text-muted-foreground mt-2">{seller.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <CategoryTag name={seller.categoryName} className="text-sm px-3 py-1 rounded-full" />
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
                  <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="text-xs border border-brand-main/20 text-brand-main px-2 py-1 rounded hover:bg-brand-accent/15">
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
              className={getExternalLinkClasses(link.label)}
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
                      <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3 bg-indian-cream">
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
