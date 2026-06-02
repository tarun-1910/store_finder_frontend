"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminApi } from "@/lib/api-client";
import { Trash2 } from "lucide-react";

export default function AdminProductsPage() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ sellerId: "", name: "", description: "", imageUrl: "" });

  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => (await adminApi.products()).data.data,
  });

  const { data: sellers = [] } = useQuery({
    queryKey: ["admin-sellers"],
    queryFn: async () => (await adminApi.sellers()).data.data,
  });

  const createMutation = useMutation({
    mutationFn: () => adminApi.createProduct({
      sellerId: Number(form.sellerId),
      name: form.name,
      description: form.description,
      imageUrl: form.imageUrl,
      status: "ACTIVE",
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      setForm({ sellerId: "", name: "", description: "", imageUrl: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="bg-white p-6 rounded-lg border mb-8 max-w-xl space-y-3">
        <h2 className="font-semibold">Add Product</h2>
        <div>
          <Label>Seller</Label>
          <select
            className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
            value={form.sellerId}
            onChange={(e) => setForm({ ...form, sellerId: e.target.value })}
          >
            <option value="">Select seller</option>
            {sellers.map((s) => <option key={s.id} value={s.id}>{s.businessName}</option>)}
          </select>
        </div>
        <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
        <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" /></div>
        <Button onClick={() => createMutation.mutate()} disabled={!form.sellerId || !form.name} className="bg-emerald-600 hover:bg-emerald-700">
          Add Product
        </Button>
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.sellerName}</TableCell>
                <TableCell>{p.status}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(p.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
