import { FileText, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - StoreSutra",
  description: "Read the Terms of Service for using the StoreSutra directory platform.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-highlight/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-main/5 text-brand-main border border-brand-main/10 mb-4 uppercase tracking-wider">
              <FileText className="h-4 w-4 text-brand-highlight" />
              Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-main tracking-tight mb-3">
              Terms of Service
            </h1>
            <p className="text-brand-main/50 text-xs sm:text-sm font-semibold">
              Last updated: March 24, 2026
            </p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-neutral max-w-none text-sm sm:text-base text-brand-main/70 leading-relaxed space-y-6">
            <p>
              Welcome to StoreSutra. By accessing or using our website <a href="https://www.storesutra.com" target="_blank" rel="noopener noreferrer" className="text-brand-highlight font-bold hover:underline">www.storesutra.com</a>, you agree to comply with and be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-xl font-bold text-brand-main mt-8 border-b border-neutral-100 pb-2">
              1. Acceptable Use
            </h2>
            <p>
              You agree to use StoreSutra only for lawful purposes related to discovering and connecting with independent stores and businesses. You must not use this platform to spam, harass, commit fraud, or post misleading reviews.
            </p>

            <h2 className="text-xl font-bold text-brand-main mt-8 border-b border-neutral-100 pb-2">
              2. Platform Role (Directory Only)
            </h2>
            <p>
              StoreSutra is strictly a discovery directory. We do not act as a marketplace, process payments, manage inventory, or handle shipping/returns. All business transactions, communication, and agreements take place directly between you and the respective seller.
            </p>

            <h2 className="text-xl font-bold text-brand-main mt-8 border-b border-neutral-100 pb-2">
              3. Limitation of Liability
            </h2>
            <p>
              We are not responsible for the quality, safety, legality, or delivery of any products purchased from stores listed in our directory. Any disputes must be resolved directly with the seller.
            </p>

            <h2 className="text-xl font-bold text-brand-main mt-8 border-b border-neutral-100 pb-2">
              4. Contact Us
            </h2>
            <p className="flex items-center gap-1.5">
              If you have any questions about these Terms of Service, please reach out to us at:
              <Mail className="h-4 w-4 text-brand-main/40 ml-1.5 shrink-0" />
              <a href="mailto:support@storesutra.in" className="font-semibold text-brand-highlight hover:underline">support@storesutra.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
