import { getCachedSettings } from "@/app/data/cachedData";
import { normalizeBrand } from "@/app/utils/brand";
import { getSiteUrl } from "@/app/utils/siteUrl";
import User from "@/app/backend/model/user.model";
import { escapeHtml, isEmail, mailConfigured, sendMail } from "@/app/backend/utils/mailer";



const taka = (value) => `৳${Number(value || 0).toLocaleString("en-US")}`;

const PAYMENT_LABELS = { cod: "ক্যাশ অন ডেলিভারি" };

// Customer's copy of a new order (Bengali). Pure: takes the saved order, returns { subject, html, text }.
export function buildOrderEmail(order, brandInput = {}, siteUrl = getSiteUrl()) {
  const brand = normalizeBrand({ brand: brandInput });
  const BRAND = brand.email_brand_color || "#333333";
  const shop = brand.site_name;
  const thanks = `${shop ? `${shop} থেকে ` : ""}অর্ডার করার জন্য ধন্যবাদ।`;
  const info = order.user_info || {};
  const cart = Array.isArray(order.cart) ? order.cart : [];
  const invoiceUrl = siteUrl ? `${siteUrl}/invoice/${encodeURIComponent(order.orderCode)}` : "";
  const payment = PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod || "";

  const rows = cart
    .map((item) => {
      const qty = Number(item.quantity) || 1;
      const price = Number(item.price) || 0;
      return `<tr>
        <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(item.name)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${qty}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${taka(price * qty)}</td>
      </tr>`;
    })
    .join("");

  const totalRow = (label, value, bold = false) =>
    `<tr><td colspan="2" style="padding:6px 8px;text-align:right${bold ? ";font-weight:bold" : ""}">${label}</td>
      <td style="padding:6px 8px;text-align:right${bold ? ";font-weight:bold" : ""}">${value}</td></tr>`;

  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f5f5f5;font-family:Arial,sans-serif;color:#222;word-break:break-word">
  <div style="max-width:600px;margin:0 auto;background:#fff">
    <div style="background:${BRAND};color:#fff;padding:20px;text-align:center">
      ${shop ? `<h2 style="margin:0">${escapeHtml(shop)}</h2>` : ""}
      <p style="margin:6px 0 0">আপনার অর্ডারটি আমরা পেয়েছি</p>
    </div>
    <div style="padding:20px">
      <p>প্রিয় ${escapeHtml(info.name)},</p>
      <p>${escapeHtml(thanks)} আপনার অর্ডার নম্বর <strong>#${escapeHtml(order.orderCode)}</strong>।
        শিগগিরই আমরা আপনার সাথে যোগাযোগ করে অর্ডারটি নিশ্চিত করব।</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead><tr style="background:#f0f7f0">
          <th style="padding:8px;text-align:left">পণ্য</th>
          <th style="padding:8px;text-align:center">পরিমাণ</th>
          <th style="padding:8px;text-align:right">দাম</th>
        </tr></thead>
        <tbody>${rows}</tbody>
        <tfoot>
          ${totalRow("সাবটোটাল", taka(order.subTotal))}
          ${totalRow("ডেলিভারি চার্জ", taka(order.shippingCost))}
          ${Number(order.discount) > 0 ? totalRow("ডিসকাউন্ট", `-${taka(order.discount)}`) : ""}
          ${totalRow("মোট", taka(order.total), true)}
        </tfoot>
      </table>
      <h3 style="margin:24px 0 8px;font-size:16px">ডেলিভারির ঠিকানা</h3>
      <p style="margin:0;line-height:1.6">${escapeHtml(info.name)}<br>${escapeHtml(info.contact)}<br>${escapeHtml(info.address)}</p>
      ${payment ? `<p style="margin:12px 0 0">পেমেন্ট: ${escapeHtml(payment)}</p>` : ""}
      ${invoiceUrl ? `<p style="text-align:center;margin:28px 0">
        <a href="${escapeHtml(invoiceUrl)}" style="background:${BRAND};color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none">ইনভয়েস দেখুন</a>
      </p>` : ""}
      <p style="font-size:13px;color:#666">কোনো প্রশ্ন থাকলে এই ইমেইলের রিপ্লাই দিন ${siteUrl ? `অথবা আমাদের <a href="${escapeHtml(siteUrl)}/contact" style="color:${BRAND}">যোগাযোগ পেজে</a> যোগাযোগ করুন।` : ""}</p>
    </div>
  </div>
</body></html>`;

  const text = [
    `প্রিয় ${info.name || ""},`,
    `${thanks} অর্ডার নম্বর: #${order.orderCode}`,
    "",
    ...cart.map((item) => `- ${item.name} x ${Number(item.quantity) || 1}: ${taka((Number(item.price) || 0) * (Number(item.quantity) || 1))}`),
    "",
    `সাবটোটাল: ${taka(order.subTotal)}`,
    `ডেলিভারি চার্জ: ${taka(order.shippingCost)}`,
    ...(Number(order.discount) > 0 ? [`ডিসকাউন্ট: -${taka(order.discount)}`] : []),
    `মোট: ${taka(order.total)}`,
    "",
    `ঠিকানা: ${info.address || ""}`,
    ...(invoiceUrl ? [`ইনভয়েস: ${invoiceUrl}`] : []),
  ].join("\n");

  return { subject: `আপনার অর্ডার #${order.orderCode}${shop ? ` — ${shop}` : ""}`, html, text };
}

// Recipient: the checkout email, or the signed-in customer's account email when that was left blank.
async function recipientFor(order) {
  const typed = order.user_info?.email?.trim();
  if (isEmail(typed)) return typed;
  if (!order.user) return null;
  const user = await User.findById(order.user).select("email").lean();
  return isEmail(user?.email) ? user.email.trim() : null;
}

// Never throws: a mail problem must not fail or slow down the order itself.
export async function sendOrderConfirmation(order) {
  try {
    if (!mailConfigured()) return;
    const to = await recipientFor(order);
    if (!to) return;
    const brand = normalizeBrand(await getCachedSettings());
    const siteUrl = getSiteUrl();
    if (!siteUrl) console.warn("[mail] NEXT_PUBLIC_BASE_URL missing/invalid; absolute links omitted");
    await sendMail({ to, ...buildOrderEmail(order, brand, siteUrl) }, brand);
  } catch (error) {
    console.error(`[mail] order #${order?.orderCode} confirmation failed:`, error?.code || error?.message || error);
  }
}
