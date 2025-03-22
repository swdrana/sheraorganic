/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "https:/i.postimg.cc"],
  },
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        source: "/api/v1/orders",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://grostore.themetags.com/api/products", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
