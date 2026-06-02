"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const token = localStorage.getItem("accessToken");
    if (!token) router.replace("/admin/login");
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  return <>{children}</>;
}
