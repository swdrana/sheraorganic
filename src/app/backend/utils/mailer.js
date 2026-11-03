import { getCachedSettings } from "@/app/data/cachedData";
import { normalizeBrand } from "@/app/utils/brand";
import nodemailer from "nodemailer";

// Server-only Gmail sender (GMAIL_USER + a Gmail App Password in GMAIL_PASSWORD; a normal Google
// password is rejected with EAUTH 535). One pooled transporter per server process.
let transporter = null;

export const mailConfigured = () => !!(process.env.GMAIL_USER && process.env.GMAIL_PASSWORD);

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: (process.env.GMAIL_PASSWORD || "").replace(/\s/g, ""),
      },
    });
  }
  return transporter;
};

export async function sendMail(options, brand) {
  const resolved = brand || normalizeBrand(await getCachedSettings());
  return getTransporter().sendMail({
    ...options,
    from: { name: resolved.site_name, address: process.env.GMAIL_USER },
  });
}

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);

export const isEmail = (value) =>
  typeof value === "string" && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.trim());
