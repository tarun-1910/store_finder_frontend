"use client";

import { useState } from "react";
import { AlertTriangle, ShieldCheck, Mail, FileText, ArrowRight } from "lucide-react";

export function PrivacyContent() {
  const [activeTab, setActiveTab] = useState<"buyer" | "seller">("buyer");

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-highlight/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-main/5 text-brand-main border border-brand-main/10 mb-4 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-brand-highlight" />
              Privacy Protection
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-main tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-brand-main/60 text-xs sm:text-sm font-medium">
              We respect your privacy and protect the data you share with us.
            </p>
          </div>

          {/* Toggle Switch Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-brand-main/5 p-1.5 rounded-full inline-flex border border-brand-main/10 shadow-sm">
              <button
                onClick={() => setActiveTab("buyer")}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "buyer"
                    ? "bg-brand-main text-white shadow-sm"
                    : "text-brand-main/60 hover:text-brand-main"
                }`}
              >
                👩‍💼 Buyer Policy
              </button>
              <button
                onClick={() => setActiveTab("seller")}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === "seller"
                    ? "bg-brand-main text-white shadow-sm"
                    : "text-brand-main/60 hover:text-brand-main"
                }`}
              >
                🏬 Seller Policy
              </button>
            </div>
          </div>

          {/* Tab 1: Buyer Privacy Policy */}
          {activeTab === "buyer" && (
            <div className="prose prose-neutral max-w-none animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-6">
                <h2 className="text-lg font-extrabold text-brand-main uppercase tracking-wider">
                  Buyer &amp; User Policy
                </h2>
                <span className="text-xs text-brand-main/55 font-bold bg-brand-main/5 px-3 py-1 rounded-full">
                  Updated: March 24, 2026
                </span>
              </div>

              <p className="text-sm sm:text-base text-brand-main/70 leading-relaxed mb-6">
                StoreSutra (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use <a href="https://www.storesutra.com" target="_blank" rel="noopener noreferrer" className="text-brand-highlight font-bold hover:underline">www.storesutra.com</a> as a buyer or browser.
              </p>

              <p className="text-sm sm:text-base text-brand-main/70 leading-relaxed mb-8">
                This policy is published in compliance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 of India.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">1. Information We Collect</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                We do not collect any personal information, contact details, or usage data from buyers. You can browse, search, and discover stores on StoreSutra completely anonymously. No registration is required for buyers, and no user profiles are created.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">2. How We Use Information</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                Since we do not collect any personal information or activity history from buyers, we do not build buyer profiles, track browsing behaviors, or target advertisements.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">3. Data Retention</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                We do not retain any buyer data since no personal or identifying information is collected.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">4. Data Sharing</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                No buyer data is shared with third parties or external service providers, as no buyer data is collected or stored.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">5. Payments Disclaimer</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                StoreSutra does not process any payments or collect billing details. All financial transactions occur directly between you and the sellers outside of the StoreSutra platform.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">6. Cookies &amp; Tracking</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                We do not use tracking cookies, marketing cookies, or user-profiling scripts for buyers. We only use strictly necessary session identifiers to ensure site performance and basic security.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">7. Data Storage &amp; Security</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                Since we do not store any buyer records or database profiles, there is no threat of buyer data exposure or unauthorized access on our servers.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">8. Your Rights</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-4">
                As a buyer, since we do not hold any personal data associated with you, there are no records to edit, access, or delete. If you have any inquiries, you can contact us at <a href="mailto:support@storesutra.in" className="text-brand-highlight font-semibold hover:underline">support@storesutra.in</a>. We will respond within 30 days.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">9. Third-Party Links</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                StoreSutra displays links to Instagram profiles, WhatsApp, and external store websites. We are not responsible for the privacy practices of those third-party platforms.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">10. Contact Us</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-4">
                For general privacy questions or data requests, contact us at:
              </p>
              <div className="flex items-center gap-3 bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm w-fit">
                <div className="w-10 h-10 rounded-xl bg-brand-main/5 text-brand-main flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brand-main/55 font-bold uppercase tracking-wider">Support Email</p>
                  <a href="mailto:support@storesutra.in" className="font-semibold text-brand-highlight text-sm sm:text-base hover:underline">
                    support@storesutra.in
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Seller Privacy Policy */}
          {activeTab === "seller" && (
            <div className="prose prose-neutral max-w-none animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-6">
                <h2 className="text-lg font-extrabold text-brand-main uppercase tracking-wider">
                  Seller &amp; Partner Policy
                </h2>
                <span className="text-xs text-brand-main/55 font-bold bg-brand-main/5 px-3 py-1 rounded-full">
                  Updated: June 13, 2026
                </span>
              </div>

              <p className="text-sm sm:text-base text-brand-main/70 leading-relaxed mb-6">
                This policy applies to sellers who create and manage a store profile on **StoreSutra** through our website/app (&quot;Seller Account&quot;). It explains what information we collect from you, how we use it, and your rights.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">1. Information We Collect</h3>
              
              <h4 className="text-sm font-bold text-brand-main mt-4 mb-2">At registration:</h4>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-1 mb-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Password (stored as a secure hash only)</li>
                <li>Store/business name</li>
                <li>Store category</li>
              </ul>

              <h4 className="text-sm font-bold text-brand-main mt-4 mb-2">Profile and inventory information you provide:</h4>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-1 mb-4">
                <li>Store description, logo, photos, banner images</li>
                <li>Products you list (including product names, descriptions, pricing, and product photos)</li>
                <li>Contact details (phone number, WhatsApp, email, social media handles/links)</li>
                <li>Store location (city/area)</li>
                <li>Business hours, offers, or promotions you choose to display</li>
                <li>Links to your Instagram, YouTube, or other social profiles</li>
              </ul>

              <h4 className="text-sm font-bold text-brand-main mt-4 mb-2">Usage information (collected automatically):</h4>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-1 mb-6">
                <li>Login activity, pages visited within your seller dashboard</li>
                <li>Views, likes, and ratings your store receives from buyers</li>
                <li>Device type, browser, IP address (for security and abuse prevention)</li>
              </ul>

              <div className="bg-brand-accent/5 border border-brand-accent/10 rounded-2xl p-5 mb-8">
                <h4 className="text-brand-accent font-extrabold text-sm mb-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  We do NOT collect:
                </h4>
                <ul className="list-disc pl-5 text-xs text-brand-main/70 space-y-1">
                  <li>Payment, bank, or card details</li>
                  <li>Government IDs (Aadhaar, PAN, etc.)</li>
                  <li>Your precise GPS location</li>
                  <li>Your account password in plain text</li>
                </ul>
              </div>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">2. How We Use Your Information</h3>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-1 mb-6">
                <li>To create, display, and manage your store listing on the platform</li>
                <li>To authenticate your account and secure your dashboard</li>
                <li>To show your store to buyers in search and discovery</li>
                <li>To send you account-related emails (verification, password reset, support)</li>
                <li>To send optional product updates or announcements (you may opt out)</li>
                <li>To detect fraud, fake accounts, or abuse of the platform</li>
                <li>To generate anonymised, aggregated analytics (e.g., &quot;most viewed categories&quot;)</li>
              </ul>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">3. Public vs Private Information</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-4">
                Some information you provide becomes publicly visible to buyers as part of your store listing:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-1.5 mb-6">
                <li><strong>Public:</strong> store name, description, photos, listed products (names, descriptions, pricing, product photos), contact links, category, location (city/area), ratings/reviews received</li>
                <li><strong>Private:</strong> your email, login credentials, account activity, IP address — never shown to buyers or other sellers</li>
              </ul>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">4. Your Control Over Your Listing</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-4">
                As a registered seller, you can at any time:
              </p>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-1.5 mb-6">
                <li>Edit or update your store profile through your dashboard</li>
                <li>Add or remove photos, links, and descriptions</li>
                <li>Temporarily deactivate your listing (hidden from search, data retained)</li>
                <li>Permanently delete your account and listing</li>
              </ul>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">5. Data Sharing</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                We do not sell or rent your information. We share data only with service providers necessary to run the platform (e.g., hosting, email delivery, analytics) — strictly to operate the service, and bound by confidentiality. We may disclose information if required by law, court order, or to investigate fraud/abuse.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">6. Data Retention</h3>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-2 mb-6">
                <li><strong>Active seller accounts:</strong> data retained as long as your account exists</li>
                <li><strong>Deleted accounts:</strong> personal data removed within 30 days of a verified deletion request</li>
                <li>Some anonymised analytics may be retained even after deletion</li>
              </ul>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">7. Security</h3>
              <ul className="list-disc pl-5 text-sm text-brand-main/70 space-y-1.5 mb-6">
                <li>All data is encrypted in transit (HTTPS/TLS) and at rest</li>
                <li>Passwords stored as secure hashes</li>
                <li>Access to seller data restricted to authorised personnel</li>
                <li>In case of a data breach, affected sellers will be notified as required by law</li>
              </ul>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">8. Your Rights</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-4">
                You may access the data we hold about your account, correct inaccurate information, delete your account and associated data, or withdraw consent for optional communications.
              </p>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                To exercise these rights, email us at <a href="mailto:support@storesutra.in" className="text-brand-highlight font-semibold hover:underline">support@storesutra.in</a>. We respond within 30 days.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">9. Third-Party Links</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                If you add links to Instagram, YouTube, WhatsApp, or other external platforms on your store profile, we are not responsible for the privacy practices of those platforms.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">10. Children&apos;s Privacy</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-6">
                Seller registration is intended for individuals aged 18 and above, or businesses operated by adults. We do not knowingly allow minors to register as sellers.
              </p>

              <h3 className="text-lg font-bold text-brand-main mt-8 mb-3">11. Contact Us</h3>
              <p className="text-sm text-brand-main/70 leading-relaxed mb-4">
                For seller privacy queries or data requests, contact us at:
              </p>
              <div className="flex items-center gap-3 bg-white border border-neutral-100 rounded-2xl p-4 shadow-sm w-fit">
                <div className="w-10 h-10 rounded-xl bg-brand-main/5 text-brand-main flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-brand-main/55 font-bold uppercase tracking-wider">Seller Support Email</p>
                  <a href="mailto:support@storesutra.in" className="font-semibold text-brand-highlight text-sm sm:text-base hover:underline">
                    support@storesutra.in
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
