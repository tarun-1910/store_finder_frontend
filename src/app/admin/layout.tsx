"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  return (
    <AdminGuard>
      {isLogin ? (
        children
      ) : (
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 bg-slate-50 p-8 overflow-auto">{children}</div>
        </div>
      )}
    </AdminGuard>
  );
}
