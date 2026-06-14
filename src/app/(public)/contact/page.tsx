"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background visual accents */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-brand-highlight/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 relative z-10 max-w-5xl">
        
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-main/5 text-brand-main border border-brand-main/10 mb-4 uppercase tracking-wider">
            ✉️ Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-main tracking-tight mb-4">
            Contact StoreSutra
          </h1>
          <p className="text-brand-main/70 font-medium text-xs sm:text-sm md:text-base max-w-md mx-auto">
            Have questions about seller registration, listings, or feedback? Drop us a line.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-6 md:gap-8 lg:gap-10 lg:grid-cols-12 items-start">
          
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-100 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm relative overflow-hidden">
            {isSubmitted ? (
              <div className="py-12 text-center animate-in fade-in zoom-in-95 duration-350">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-main mb-2">Message Sent Successfully!</h3>
                <p className="text-xs text-brand-main/60 max-w-sm mx-auto mb-8">
                  Thank you for reaching out to StoreSutra. Our support team will review your inquiry and get back to you at the earliest convenience.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-brand-main text-white font-bold text-xs rounded-full hover:bg-brand-main/90 hover:scale-102 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-bold text-brand-main mb-6 border-b border-neutral-100 pb-3">
                  Send us a Message
                </h2>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-brand-main/75 uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight/25 text-xs text-brand-main transition-all bg-neutral-50/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-brand-main/75 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight/25 text-xs text-brand-main transition-all bg-neutral-50/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-main/75 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Listing query, feature suggestion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-10 px-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight/25 text-xs text-brand-main transition-all bg-neutral-50/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-main/75 uppercase tracking-wider mb-2">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what you need help with or details about your online store..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight/25 text-xs text-brand-main transition-all resize-none bg-neutral-50/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-brand-highlight text-white hover:bg-brand-highlight/90 font-bold text-xs rounded-xl shadow-md shadow-brand-highlight/10 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-neutral-300 disabled:shadow-none disabled:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column - Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Contact Card */}
            <div className="bg-[#003049] text-[#eae2b7] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm relative overflow-hidden border border-brand-main/20">
              {/* Radial glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-brand-highlight/15 rounded-full blur-[40px] pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3">
                Contact Information
              </h3>
              
              <div className="space-y-6 text-xs">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email Support</h4>
                    <p className="opacity-80">support@storesutra.in</p>
                    <p className="opacity-55 text-[10px] mt-0.5">Average response: 24 Hours</p>
                  </div>
                </div>



                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Business Hours</h4>
                    <p className="opacity-80">Monday — Friday: 9 AM to 6 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketplace Warning Reminder Box */}
            <div className="bg-gradient-to-br from-brand-accent/5 via-white/80 to-transparent border border-brand-accent/20 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              {/* Soft decorative blur spot */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex gap-4 items-start relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent shrink-0 shadow-inner">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-brand-main mb-1.5 flex items-center gap-1.5">
                    No Transaction Assistance
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                    </span>
                  </h4>
                  <p className="text-xs text-brand-main/70 leading-relaxed font-medium">
                    StoreSutra is an information platform and <span className="font-bold text-brand-accent">cannot resolve transaction issues, issue refunds, or track shipments.</span> Please contact the seller directly through the social buttons on their page for all business correspondence.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
