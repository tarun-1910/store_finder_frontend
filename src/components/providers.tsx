"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SellerModalProvider } from "@/components/sellers/seller-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SellerModalProvider>{children}</SellerModalProvider>
    </QueryClientProvider>
  );
}
