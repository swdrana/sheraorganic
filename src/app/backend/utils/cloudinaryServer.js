import { getCloudinaryPublicId } from "@/app/utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Prefer server-only vars; fall back to the existing NEXT_PUBLIC_* values so
// image cleanup works without adding new env vars.
const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey =
  process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret =
  process.env.CLOUDINARY_API_SECRET ||
  process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

const hasCloudinaryCredentials = Boolean(cloudName && apiKey && apiSecret);

if (hasCloudinaryCredentials) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export async function destroyImages(urls = []) {
  if (!hasCloudinaryCredentials) return;
  const list = Array.isArray(urls) ? urls : [urls];
  const publicIds = [
    ...new Set(list.map(getCloudinaryPublicId).filter(Boolean)),
  ];
  if (!publicIds.length) return;
  await Promise.allSettled(
    publicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
  );
}

export function diffRemoved(oldValue, newValue) {
  const oldValues = Array.isArray(oldValue)
    ? oldValue
    : oldValue
      ? [oldValue]
      : [];
  const newValues = Array.isArray(newValue)
    ? newValue
    : newValue
      ? [newValue]
      : [];
  const newSet = new Set(newValues);
  return oldValues.filter((url) => url && !newSet.has(url));
}
