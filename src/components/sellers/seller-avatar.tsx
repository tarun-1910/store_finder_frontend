"use client";

import Image from "next/image";
import { useState } from "react";

export function SellerAvatar({
  name,
  logoUrl,
  size = "md",
}: {
  name: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const sizeClass = size === "sm" ? "h-16 w-16 text-2xl" : size === "lg" ? "h-24 w-24 text-3xl" : "h-16 w-16 text-2xl";

  if (!logoUrl || failed) {
    return (
      <div className={`${sizeClass} shrink-0 rounded-lg bg-brand-accent/15 flex items-center justify-center font-bold text-brand-main avatar-shadow`}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} shrink-0 rounded-lg overflow-hidden bg-brand-cream avatar-shadow`}>
      <Image
        src={logoUrl}
        alt={name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
