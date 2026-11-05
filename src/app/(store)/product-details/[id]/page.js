import { breadcrumbJsonLd, jsonLdBrand, productDescription } from "@/app/utils/productMetadata";
import { normalizeBrand } from "@/app/utils/brand";
import { getSiteUrl } from "@/app/utils/siteUrl";
import { notFound, permanentRedirect } from "next/navigation";
import ProductDetailsBody from "@/app/components/store/productDetails/ProductDetailsBody";
import ProductBreadcrumb from "@/app/components/store/productDetails/ProductBreadcrumb";
import RelatatedProduct from "@/app/components/store/productDetails/RelatatedProduct";
import { getCachedCategories, getCachedProductList, getCachedSettings } from "@/app/data/cachedData";
import {
  categoryPath,
  findProductByParam,
  productPathEncoded,
  productSlug,
} from "@/app/utils/productUrl";
import { normalizeCategory, productCategoryList } from "@/app/utils/productCategory";

const decodeURIComponentSafe = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const SITE_URL = getSiteUrl();

// The URL is /product-details/<url path> (the product's unique `slug`). Lookup uses the cached
// product list: current slug, else a legacy /product-details/<mongo id> link or an old slug, which
// redirect to the current path. A DB failure throws (app/error.js shows "try again").
async function loadProduct(param) {
  const products = await getCachedProductList();
  return findProductByParam(products, param);
}

const plainText = (html, max = 160) => {
  const text = String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};

const variantPrices = (product) =>
  (Array.isArray(product.variants) ? product.variants : [])
    .map((variant) => Number(variant?.price))
    .filter((price) => price > 0);

const inStock = (product) =>
  Number(product.stock) > 0 ||
  (Array.isArray(product.variants) && product.variants.some((v) => Number(v?.quantity) > 0));

// schema.org Product + BreadcrumbList for Google rich results.
function productJsonLd(product, url, category) {
  const prices = variantPrices(product);
  const availability = `https://schema.org/${inStock(product) ? "InStock" : "OutOfStock"}`;
  const offers = prices.length
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "BDT",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: prices.length,
        availability,
        url,
      }
    : {
        "@type": "Offer",
        priceCurrency: "BDT",
        price: Number(product.prices?.price) || 0,
        availability,
        url,
      };
  const ratings = Array.isArray(product.ratings) ? product.ratings : [];
  const breadcrumb = [
    { name: "Home", item: SITE_URL || undefined },
    { name: "Products", item: SITE_URL ? `${SITE_URL}/products` : undefined },
    ...(category ? [{ name: category.name, item: SITE_URL ? `${SITE_URL}${category.href}` : undefined }] : []),
    { name: product.name, item: url },
  ];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: (product.image || []).filter(Boolean),
      description: plainText(product.description, 500) || undefined,
      sku: product.sku || String(product._id),
      ...(jsonLdBrand(product.brand) ? { brand: jsonLdBrand(product.brand) } : {}),
      offers,
      ...(ratings.length && Number(product.averageRating) > 0
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: Number(product.averageRating),
              reviewCount: ratings.length,
            },
          }
        : {}),
    },
    breadcrumbJsonLd(breadcrumb),
  ];
}

async function findCategory(product) {
  const names = productCategoryList(product).map(normalizeCategory);
  if (!names.length) return null;
  const categories = await getCachedCategories();
  const match = categories.find((c) => c?.status !== "hide" && names.includes(normalizeCategory(c?.name)));
  return match ? { name: match.name, href: categoryPath(match) } : null;
}

export async function generateMetadata({ params }) {
  const { product } = await loadProduct(params.id);
  if (!product) return {};
  const brand = normalizeBrand(await getCachedSettings());
  const url = SITE_URL ? `${SITE_URL}${productPathEncoded(product)}` : undefined;
  const baseTitle = product.seoTitle || product.name;
  const title = !brand.site_name || baseTitle.includes(brand.site_name) ? baseTitle : `${baseTitle} | ${brand.site_name}`;
  const description = productDescription(product, brand.site_name, plainText(product.description));
  // Old saves hold tags as one JSON-encoded string, either bare or inside the [String] array.
  const decodeTags = (value) => {
    if (typeof value !== "string") return [value];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [value];
    } catch {
      return [value];
    }
  };
  const tags = (Array.isArray(product.tag) ? product.tag : [product.tag]).flatMap(decodeTags);
  const keywords = (Array.isArray(product.seoKeywords) && product.seoKeywords.length
    ? product.seoKeywords
    : tags)
    .filter((keyword) => typeof keyword === "string" && keyword.trim());
  const images = (product.image || []).filter(Boolean).slice(0, 1);
  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { type: "website", url, title, description, siteName: brand.site_name, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

const page = async ({ params }) => {
  const { product, canonical } = await loadProduct(params.id);
  if (!product) notFound();
  // Legacy id links, old URL paths and differently-encoded variants land on the current URL.
  if (!canonical || decodeURIComponentSafe(params.id) !== productSlug(product)) {
    permanentRedirect(productPathEncoded(product));
  }

  const id = String(product._id);
  const category = await findCategory(product);
  const jsonLd = productJsonLd(product, SITE_URL ? `${SITE_URL}${productPathEncoded(product)}` : undefined, category);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProductBreadcrumb name={product.name} category={category} />
      <ProductDetailsBody id={id} initialProduct={product} />
      <RelatatedProduct id={id} initialProduct={product} />
    </>
  );
};

export default page;
