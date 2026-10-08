/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
  productionBrowserSourceMaps: false,
  // mongoose/mongodb/bson are already server-external by default in Next 14
  // (`serverExternalPackages` is the Next 15 key and was silently ignored here).
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  compiler: {
    // Keep console.error/warn so production server errors and [perf] slow-operation logs are
    // visible in the Coolify container logs; strip the rest.
    removeConsole: { exclude: ["error", "warn"] },
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
