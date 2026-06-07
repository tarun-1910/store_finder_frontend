import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/seller/:slug",
        destination: "/sellers/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
