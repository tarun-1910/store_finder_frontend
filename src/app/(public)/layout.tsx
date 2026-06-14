import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-x-hidden bg-neutral-50/60">{children}</main>
      <Footer />
    </>
  );
}
