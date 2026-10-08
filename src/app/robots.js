const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://sheraorganic.com").replace(/\/$/, "");

// Search engines may crawl the public storefront; API endpoints, admin, and per-user /
// transactional pages are useless in search results and only cost server time when crawled.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/my-account",
          "/checkout",
          "/cart",
          "/invoice/",
          "/thank-you/",
          "/login",
          "/singup",
          "/wishlist",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
