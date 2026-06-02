"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminApi } from "@/lib/api-client";
import { Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => (await adminApi.categories()).data.data,
  });

  const createMutation = useMutation({
    mutationFn: () => adminApi.createCategory({ name, status: "ACTIVE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-categories"] }); setName(""); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-categories"] }),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="bg-white p-6 rounded-lg border mb-8 max-w-md flex gap-2 items-end">
        <div className="flex-1">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" placeholder="New category" />
        </div>
        <Button onClick={() => createMutation.mutate()} disabled={!name} className="bg-emerald-600 hover:bg-emerald-700">Add</Button>
      </div>
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.slug}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(c.id)}>
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
