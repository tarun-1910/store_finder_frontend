"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { adminApi } from "@/lib/api-client";
import type { SellerDetail } from "@/lib/types";
import { toast, Toaster } from "sonner";

interface SellerFormProps {
  seller?: SellerDetail;
}    

export function SellerForm({ seller }: SellerFormProps) {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: seller ? {
      businessName: seller.businessName,
      description: seller.description,
      categoryId: seller.categoryId ? String(seller.categoryId) : "",
      storeType: seller.storeType,
      area: seller.area,
      city: seller.city,
      phone: seller.phone,
      address: seller.address,
      pincode: seller.pincode,
      logoUrl: seller.logoUrl,
      coverUrl: seller.coverUrl,
      whatsappUrl: seller.whatsappUrl,
      instagramUrl: seller.instagramUrl,
      websiteUrl: seller.websiteUrl,
      youtubeUrl: seller.youtubeUrl,
      status: seller.status,
      verified: seller.verified,
      featured: seller.featured,
      tags: seller.tags?.join(", "),
    } : {
      businessName: "", description: "", storeType: "ONLINE", status: "PENDING", verified: false, featured: false,
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => (await adminApi.categories()).data.data,
  });


  const storeType = watch("storeType");

  const onSubmit = async (data: Record<string, unknown>) => {
    const category = categories.find((c) => c.slug === data.categoryId || String(c.id) === data.categoryId);
    const payload = {
      ...data,
      categoryId: category?.id ?? Number(data.categoryId),
      verified: data.verified === true || data.verified === "true",
      featured: data.featured === true || data.featured === "true",
      tags: typeof data.tags === "string" ? (data.tags as string).split(",").map((t) => t.trim()).filter(Boolean) : [],
    };
    if (seller) {
      try {
      await adminApi.updateSeller(seller.id, payload);
      toast.success("seller created");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data?.message ||
          "Business already exits in this category"
        );
      }
    } else {
      await adminApi.createSeller(payload);
    }
    router.push("/admin/sellers");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl bg-card p-6 rounded-lg border">
      <div><Label>Business Name</Label><Input {...register("businessName", { required: true })} className="mt-1" /></div>
      <div><Label>Description</Label><Textarea {...register("description")} className="mt-1" /></div>
      <div>
        <Label>Category</Label>
        <Select defaultValue={seller?.categoryId ? String(seller.categoryId) : undefined} onValueChange={(v) => v && setValue("categoryId", v)}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Store Type</Label>
        <Select defaultValue={watch("storeType") || "BOTH"} onValueChange={(v) => v && setValue("storeType", v)}>
          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ONLINE">Online</SelectItem>
            <SelectItem value="OFFLINE">Offline</SelectItem>
            <SelectItem value="BOTH">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>
     <div>
        <Label>Phone</Label>
        <Input {...register("phone")} className="mt-1" />
      </div>

        {storeType !== "ONLINE" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Area</Label>
                <Input {...register("area")} className="mt-1" />
              </div>

              <div>
                <Label>City</Label>
                <Input {...register("city")} className="mt-1" />
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Input {...register("address")} className="mt-1" />
            </div>

            <div>
              <Label>Pincode</Label>
              <Input {...register("pincode")} className="mt-1" />
            </div>
          </>
        )}
      <div><Label>Tags (comma separated)</Label><Input {...register("tags")} className="mt-1" placeholder="sarees, silk sarees" /></div>
      <div><Label>WhatsApp URL</Label><Input {...register("whatsappUrl")} className="mt-1" /></div>
      <div><Label>Instagram URL</Label><Input {...register("instagramUrl")} className="mt-1" /></div>
      <div><Label>Website URL</Label><Input {...register("websiteUrl")} className="mt-1" /></div>
      <div><Label>Youtube URL</Label><Input {...register("youtubeUrl")} className="mt-1" /></div>
      <div>
        <Label>Status</Label>
        <Select defaultValue={watch("status") || "PENDING"} onValueChange={(v) => v && setValue("status", v)}>
          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["PENDING","APPROVED","REJECTED","ACTIVE","INACTIVE"].map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2"><input type="checkbox" {...register("verified")} /> Verified</label>
        <label className="flex items-center gap-2"><input type="checkbox" {...register("featured")} /> Featured</label>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
