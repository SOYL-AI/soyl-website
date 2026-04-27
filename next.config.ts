import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: '/speak', destination: '/products/butler-ai', permanent: true },
    ]
  },
};

export default nextConfig;
