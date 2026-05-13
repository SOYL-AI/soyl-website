import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Sanity CDN serves library images / OG assets via image-url builder.
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  async redirects() {
    return [
      { source: '/speak', destination: '/products/butler-ai', permanent: true },
    ]
  },
};

export default nextConfig;
