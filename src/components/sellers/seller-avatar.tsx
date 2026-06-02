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
      <div className={`${sizeClass} shrink-0 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-emerald-600`}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClass} shrink-0 rounded-lg overflow-hidden bg-slate-100`}>
      <Image
        src={logoUrl}
        alt={name}
        fill
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
