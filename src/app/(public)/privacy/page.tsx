import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy - StoreSutra",
  description: "Learn how StoreSutra collects, uses, and protects personal data for buyers and sellers.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
