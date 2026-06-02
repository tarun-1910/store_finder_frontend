export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">About StoreFinder</h1>
      <p className="text-muted-foreground leading-relaxed mb-4">
        StoreFinder is a discovery platform for Bangalore. We help you find local sellers offering
        products and services — from sarees and biryani to paint, furniture, home bakeries, and more.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        This is <strong>not</strong> an e-commerce marketplace. You cannot purchase products here.
        Instead, we connect you directly to sellers via WhatsApp, Instagram, their website, YouTube,
        Facebook, or Google Maps.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Whether you are looking for an Instagram store, a WhatsApp seller, a restaurant, or a
        neighborhood paint shop — StoreFinder helps you discover them.
      </p>
    </div>
  );
}
