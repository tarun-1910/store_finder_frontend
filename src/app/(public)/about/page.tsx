import { Search, Compass, MessageCircle, AlertCircle, ShieldCheck, Users, Layers, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-brand-highlight/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-main/5 text-brand-main border border-brand-main/10 mb-4 uppercase tracking-wider">
            ✨ About StoreSutra
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-main tracking-tight mb-6">
            Empowering Independent Sellers
          </h1>
          <p className="text-brand-main/70 font-medium text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            StoreSutra is a premium seller discovery platform connecting passionate buyers directly with independent artisans, home chefs, boutiques, and Instagram brands.
          </p>
        </div>

        {/* 3-Step Process Flow (How it Works) */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-main text-center mb-10 tracking-tight">
            How StoreSutra Works
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <span className="absolute right-4 top-2 text-7xl font-extrabold text-brand-main/[0.03] select-none group-hover:text-brand-main/[0.05] transition-colors">
                01
              </span>
              <div className="w-10 h-10 rounded-2xl bg-brand-yellow/10 text-brand-highlight flex items-center justify-center mb-6">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-brand-main mb-2">
                1. Search Directory
              </h3>
              <p className="text-xs text-brand-main/60 leading-relaxed">
                Browse through diverse categories including handloom sarees, bespoke jewelry, custom cakes, home furnishing, and art supplies.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <span className="absolute right-4 top-2 text-7xl font-extrabold text-brand-main/[0.03] select-none group-hover:text-brand-main/[0.05] transition-colors">
                02
              </span>
              <div className="w-10 h-10 rounded-2xl bg-brand-main/5 text-brand-main flex items-center justify-center mb-6">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-brand-main mb-2">
                2. Discover Creators
              </h3>
              <p className="text-xs text-brand-main/60 leading-relaxed">
                Explore dedicated portfolios, store descriptions, location tags, and catalog details. Read ratings and verify authenticity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <span className="absolute right-4 top-2 text-7xl font-extrabold text-brand-main/[0.03] select-none group-hover:text-brand-main/[0.05] transition-colors">
                03
              </span>
              <div className="w-10 h-10 rounded-2xl bg-brand-accent/5 text-brand-accent flex items-center justify-center mb-6">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-brand-main mb-2">
                3. Connect Directly
              </h3>
              <p className="text-xs text-brand-main/60 leading-relaxed">
                Initiate orders or query details directly on their preferred channel, whether it's WhatsApp chat, Instagram DM, or their own website.
              </p>
            </div>
          </div>
        </div>

        {/* Not a Marketplace Callout */}
        <div className="max-w-3xl mx-auto mb-20 bg-brand-main/5 border border-brand-main/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-[0.02] translate-y-4 translate-x-4">
            <Zap className="w-48 h-48 text-brand-main" />
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-brand-main/10 flex items-center justify-center text-brand-main shrink-0 mt-0.5">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-main mb-2.5">
                Important: StoreSutra is Not a Marketplace
              </h3>
              <p className="text-xs sm:text-sm text-brand-main/70 leading-relaxed">
                StoreSutra operates strictly as a directory service. We do <strong>not</strong> process financial transactions, handle product inventory, offer shipment or shipping guarantees, or facilitate direct checkout orders. All payments and fulfillment occur independently through your direct communications with the respective seller.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="max-w-4xl mx-auto border border-neutral-100 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            <div className="pt-4 md:pt-0">
              <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center mx-auto mb-2 text-brand-highlight">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-3xl font-extrabold text-brand-main mb-1">
                500+
              </div>
              <div className="text-xs font-bold text-brand-main/55 uppercase tracking-wider">
                Verified Sellers
              </div>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="w-8 h-8 rounded-full bg-brand-main/5 flex items-center justify-center mx-auto mb-2 text-brand-main">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-3xl font-extrabold text-brand-main mb-1">
                12+
              </div>
              <div className="text-xs font-bold text-brand-main/55 uppercase tracking-wider">
                Categories
              </div>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="w-8 h-8 rounded-full bg-brand-accent/5 flex items-center justify-center mx-auto mb-2 text-brand-accent">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-3xl font-extrabold text-brand-main mb-1">
                100%
              </div>
              <div className="text-xs font-bold text-brand-main/55 uppercase tracking-wider">
                Direct & Free
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}