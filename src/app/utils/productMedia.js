// Keep the first image first, followed by the product video (same order as product details).
export function productMedia(product) {
  const images = Array.isArray(product?.image) ? product.image : [];
  const media = images
    .filter((src) => typeof src === "string" && src.trim())
    .map((src) => ({ type: "image", src }));
  if (typeof product?.videoUrl === "string" && product.videoUrl.trim()) {
    media.splice(1, 0, { type: "video", src: product.videoUrl });
  }
  return media;
}
