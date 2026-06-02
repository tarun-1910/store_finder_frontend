import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-auto py-8 bg-slate-50">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">StoreFinder Online</p>
        <p>Discover local sellers — not a marketplace. Connect via WhatsApp, Instagram & more.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/admin/login" className="hover:underline">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
