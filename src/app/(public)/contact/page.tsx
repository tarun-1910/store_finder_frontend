export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Have questions or want to list your business? Reach out to us.
      </p>
      <div className="space-y-2 text-sm">
        <p><strong>Email:</strong> hello@storefinder.local</p>
        <p><strong>City:</strong> Bangalore, Karnataka</p>
      </div>
    </div>
  );
}
