export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white p-6 rounded-lg border max-w-lg text-sm text-muted-foreground space-y-2">
        <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}</p>
        <p><strong>Default Admin:</strong> admin@storefinder.local</p>
        <p>Configure JWT secret and database via backend environment variables.</p>
      </div>
    </div>
  );
}
