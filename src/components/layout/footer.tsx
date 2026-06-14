import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#002133] to-[#001420] text-[#eae2b7]/95 shrink-0 overflow-hidden">
      {/* Visual Top Highlight Line */}
      <div className="h-1 bg-gradient-to-r from-brand-accent via-brand-highlight to-brand-yellow w-full" />

      {/* Subtle background glow */}
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-brand-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 mb-12 pb-12 border-b border-white/10">

          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 group transition-transform duration-200 hover:-translate-y-0.5 mb-4">
              <img src="/logo.png" alt="StoreSutra Logo" className="h-10 w-10 object-contain shrink-0 group-hover:scale-105 transition-transform duration-300" />
              <span className="font-extrabold text-xl tracking-tight text-white">
                Store<span className="bg-gradient-to-r from-brand-highlight to-brand-yellow bg-clip-text text-transparent">Sutra</span>
              </span>
            </Link>
            <p className="text-xs text-[#eae2b7]/80 leading-relaxed max-w-sm mb-6">
              Find the hidden gems of Indian commerce. Discover independent boutique brands, home chefs, and Instagram studios connecting directly with buyers.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#25D366]/25 border border-white/10 flex items-center justify-center hover:border-[#25D366]/40 text-[#eae2b7] hover:text-[#25D366] transition-all duration-200" title="WhatsApp">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.48-.003 9.93-4.437 9.933-9.889.002-2.641-1.03-5.124-2.906-7c-1.875-1.875-4.368-2.907-7.01-2.909-5.485 0-9.94 4.437-9.943 9.892-.001 1.564.413 3.09 1.198 4.432l-.986 3.6 3.693-.976zm11.536-5.402c-.3-.15-1.772-.875-2.046-.975-.276-.102-.476-.152-.676.152-.2.304-.777.977-.95 1.18-.173.203-.347.228-.647.078-.3-.15-1.267-.467-2.414-1.49-1.047-.93-1.626-2.023-1.748-2.227-.123-.203-.013-.314.088-.413.09-.09.2-.234.3-.35.1-.117.133-.2.2-.333.067-.133.033-.25-.017-.35-.05-.102-.476-1.15-.654-1.577-.172-.416-.347-.36-.476-.36-.124-.002-.267-.002-.412-.002-.146 0-.382.054-.582.273-.2.22-1.773 1.733-1.773 4.223 0 2.49 1.815 4.893 2.067 5.228.25.334 3.57 5.451 8.647 7.643 1.207.521 2.15.834 2.884 1.067 1.21.384 2.31.33 3.18.2.973-.146 2.047-.837 2.336-1.608.29-.77.29-1.43.203-1.608-.087-.18-.3-.3-.6-.45z" /></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-accent/25 border border-white/10 flex items-center justify-center hover:border-brand-accent/40 text-[#eae2b7] hover:text-brand-accent transition-all duration-200" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#3b5998]/25 border border-white/10 flex items-center justify-center hover:border-[#3b5998]/40 text-[#eae2b7] hover:text-[#3b5998] transition-all duration-200" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" /></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 lg:ml-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-highlight pl-2.5">
              Discover
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/sellers" className="hover:text-brand-yellow hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                  <span>Browse Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-brand-yellow hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                  <span>Specialty Categories</span>
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-brand-yellow hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                  <span>Search Sellers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: About & Help */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-yellow pl-2.5">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-brand-yellow hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                  <span>How StoreSutra Works</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-yellow hover:translate-x-0.5 transition-all inline-flex items-center gap-1">
                  <span>Contact Support</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Seller CTA */}
          <div className="lg:col-span-4 bg-white/[0.03] border border-white/5 p-6 rounded-2xl relative overflow-hidden">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
              Are you a seller?
            </h4>
            <p className="text-[11px] text-[#eae2b7]/70 leading-relaxed mb-4">
              Get listed on StoreSutra for free. Help buyers discover your boutique shop, Instagram brand, or independent studio.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 px-4 py-2 bg-brand-highlight text-white font-bold text-xs rounded-xl hover:bg-brand-highlight/95 transition-all shadow-md shadow-brand-highlight/5 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>List Your Store</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#eae2b7]/60 pt-2 border-t border-white/5 mt-8">
          <div>
            &copy; {new Date().getFullYear()} StoreSutra. Discovering India&apos;s Independent Sellers.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center md:justify-end">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="text-white/10 hidden xs:inline">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="text-white/10 hidden xs:inline">|</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span className="text-white/10 hidden xs:inline">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span className="text-white/20 ml-2">Made with ❤️ for Indian Creators</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
