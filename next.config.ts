import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scjptltrknigahwflgkp.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/nosotros",
        destination: "/",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/venenatis-tellus-metus-culputate-scelerisque",
        destination: "/",
        permanent: true,
      },
      {
        source: "/quisque-sagittis-purus-neque-aliquam",
        destination: "/",
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }
    return config;
  },
  // Next.js Turbopack configuration
  turbopack: {
    resolveAlias: {
      canvas: "./src/lib/empty.js",
    },
  },
};

export default nextConfig;
