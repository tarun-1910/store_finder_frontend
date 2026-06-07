export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">About StoreSutra</h1>

      <p className="text-muted-foreground leading-relaxed mb-4">
        StoreSutra is an online seller discovery platform that helps people find businesses,
        creators, and independent sellers operating through Instagram, WhatsApp, YouTube,
        Facebook, websites, and other online channels.
      </p>

      <p className="text-muted-foreground leading-relaxed mb-4">
        Our goal is to make it easier for customers to discover trusted online sellers across
        different categories such as fashion, jewelry, home decor, handmade products, food,
        electronics, beauty, and more.
      </p>

      <p className="text-muted-foreground leading-relaxed mb-4">
        StoreSutra is <strong>not</strong> an e-commerce marketplace. We do not process
        payments, handle orders, provide delivery services, or facilitate purchases on the
        platform.
      </p>

      <p className="text-muted-foreground leading-relaxed">
        Instead, we connect customers directly with sellers through their preferred channels
        such as WhatsApp, Instagram, YouTube, websites, or other contact methods, allowing
        buyers and sellers to interact directly.
      </p>
    </div>
  );
}