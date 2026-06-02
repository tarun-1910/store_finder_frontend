"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminApi } from "@/lib/api-client";

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => (await adminApi.dashboard()).data.data,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Failed to load dashboard</p>;

  const stats = [
    { label: "Total Sellers", value: data.totalSellers },
    { label: "Active Sellers", value: data.activeSellers },
    { label: "Pending Sellers", value: data.pendingSellers },
    { label: "Inactive Sellers", value: data.inactiveSellers },
    { label: "Total Products", value: data.totalProducts },
    { label: "Total Categories", value: data.totalCategories },
    { label: "Total Searches", value: data.totalSearches },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Top Categories</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.topCategories.map((c) => (
              <li key={c.categoryName} className="flex justify-between text-sm">
                <span>{c.categoryName}</span>
                <span className="font-medium">{c.sellerCount} sellers</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
