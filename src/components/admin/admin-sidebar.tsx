"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Store, Package, Tags, Settings, LogOut } from "lucide-react";
import { setAuthToken } from "@/lib/api";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/sellers", label: "Sellers", icon: Store },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    setAuthToken(null);
    router.push("/admin/login");
  };

  return (
    <aside className="w-56 border-r border-sidebar-border bg-sidebar text-sidebar-foreground min-h-screen p-4 flex flex-col">
      <Link href="/admin/dashboard" className="font-bold text-lg mb-8 block text-sidebar-foreground">StoreSutra Admin</Link>
      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
              pathname.startsWith(href) ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"
            )}
          >
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent mt-4">
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </aside>
  );
}
