import { getSiteUrl } from "@/app/utils/siteUrl";

// Search engines may crawl the public storefront; API endpoints, admin, and per-user /
// transactional pages are useless in search results and only cost server time when crawled.
export default function robots() {
  const BASE_URL = getSiteUrl();
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
        ],
      },
    ],
    ...(BASE_URL ? { sitemap: `${BASE_URL}/sitemap.xml`, host: BASE_URL } : {}),
  };
}
