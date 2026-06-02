"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminApi } from "@/lib/api-client";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminSellersPage() {
  const qc = useQueryClient();
  const { data: sellers = [], isLoading } = useQuery({
    queryKey: ["admin-sellers"],
    queryFn: async () => (await adminApi.sellers()).data.data,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteSeller(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-sellers"] }),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sellers</h1>
        <Link href="/admin/sellers/create" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium">
          <Plus className="h-4 w-4" /> Add Seller
        </Link>
      </div>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Flags</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.businessName}</TableCell>
                <TableCell>{s.categoryName}</TableCell>
                <TableCell>{s.area}</TableCell>
                <TableCell><Badge variant="outline">{s.status}</Badge></TableCell>
                <TableCell>
                  {s.verified && <Badge className="mr-1">Verified</Badge>}
                  {s.featured && <Badge variant="secondary">Featured</Badge>}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link href={`/admin/sellers/edit/${s.id}`} className="inline-flex p-2 hover:bg-slate-100 rounded">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(s.id)}>
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
