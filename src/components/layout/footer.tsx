import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-accent/20 mt-auto py-8 bg-brand-main text-brand-gray/90">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="font-medium text-brand-gray mb-2">StoreSutra Online</p>
        <p>Discover local sellers — not a marketplace. Connect via WhatsApp, Instagram & more.</p>
        <div className="flex justify-center gap-4 mt-4">
          <Link href="/about" className="hover:text-brand-yellow hover:underline">About</Link>
          <Link href="/contact" className="hover:text-brand-yellow hover:underline">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
