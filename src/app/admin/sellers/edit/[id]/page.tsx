"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { SellerForm } from "@/components/admin/seller-form";
import { adminApi } from "@/lib/api-client";

export default function EditSellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: seller, isLoading } = useQuery({
    queryKey: ["admin-seller", id],
    queryFn: async () => {
      const sellers = (await adminApi.sellers()).data.data;
      return sellers.find((s) => s.id === Number(id));
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!seller) return <p>Seller not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Seller</h1>
      <SellerForm seller={seller} />
    </div>
  );
}
