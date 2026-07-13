/**
 * Optimizes a Cloudinary image URL by injecting transformation parameters.
 * This resizes the image to the requested width, auto-selects format (WebP/AVIF),
 * and auto-adjusts quality — drastically reducing download size.
 *
 * @param {string} url - Original Cloudinary URL
 * @param {number} width - Desired width in pixels
 * @param {number} [quality=80] - Image quality (1-100)
 * @returns {string} - Optimized URL
 */
export function optimizeCloudinaryUrl(url, width = 400, quality = 80) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  // Insert transformation after /upload/
  return url.replace(
    "/upload/",
    `/upload/w_${width},q_${quality},f_auto/`
  );
}
