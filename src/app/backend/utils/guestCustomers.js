import { normalizeBdPhone } from "@/app/utils/phone";

// Statuses that do not count towards a buyer's spend (the Order enum uses "Cancel").
export const CANCELLED_STATUSES = Object.freeze(["Cancel", "Cancelled", "cancel", "cancelled"]);

// Latest non-empty value of a field: $max skips nulls and compares the embedded docs by `at` first.
const latestNonEmpty = (field, skipRegex) => ({
  $max: {
    $cond: [
      skipRegex
        ? {
            $and: [
              { $ne: [{ $ifNull: [field, ""] }, ""] },
              { $not: [{ $regexMatch: { input: { $toString: { $ifNull: [field, ""] } }, regex: skipRegex, options: "i" } }] },
            ],
          }
        : { $ne: [{ $ifNull: [field, ""] }, ""] },
      { at: "$createdAt", value: field },
      null,
    ],
  },
});

// Cheap first pass grouped by the raw stored phone. Old orders may hold unnormalized phones
// (Bengali digits, +88, dashes), so mergeGuestCustomers folds these rows by normalized phone.
// Only the fields below leave the database (never accessToken, cart or user documents).
export const GUEST_CUSTOMER_PIPELINE = Object.freeze([
  { $match: { "user_info.contact": { $nin: [null, ""] } } },
  {
    $group: {
      _id: "$user_info.contact",
      name: latestNonEmpty("$user_info.name"),
      address: latestNonEmpty("$user_info.address"),
      email: latestNonEmpty("$user_info.email", "@anonymous\\.com$"),
      orderCount: { $sum: 1 },
      cancelledCount: {
        $sum: { $cond: [{ $in: ["$status", CANCELLED_STATUSES] }, 1, 0] },
      },
      totalSpent: {
        $sum: {
          $cond: [{ $in: ["$status", CANCELLED_STATUSES] }, 0, { $ifNull: ["$total", 0] }],
        },
      },
      firstOrderAt: { $min: "$createdAt" },
      lastOrderAt: { $max: "$createdAt" },
      registered: { $max: { $cond: [{ $gt: ["$user", null] }, 1, 0] } },
    },
  },
]);

const time = (value) => {
  const ms = value ? new Date(value).getTime() : NaN;
  return Number.isNaN(ms) ? null : ms;
};

// Old "order without login" accounts carry a generated `<date>@anonymous.com` email (Login.jsx): not a real address.
const isPlaceholderEmail = (value) => /@anonymous\.com$/i.test(String(value || "").trim());

const pickLatest = (current, candidate) => {
  if (!candidate || typeof candidate.value !== "string" || !candidate.value.trim()) return current;
  if (isPlaceholderEmail(candidate.value)) return current;
  if (!current) return candidate;
  return (time(candidate.at) ?? -Infinity) > (time(current.at) ?? -Infinity) ? candidate : current;
};

const earlier = (a, b) => (a == null ? b : b == null ? a : time(b) < time(a) ? b : a);
const later = (a, b) => (a == null ? b : b == null ? a : time(b) > time(a) ? b : a);

export const mergeGuestCustomers = (rows) => {
  const byPhone = new Map();

  for (const row of Array.isArray(rows) ? rows : []) {
    const phone = normalizeBdPhone(row?._id);
    if (!phone) continue;
    const prev = byPhone.get(phone) || {
      phone, name: null, address: null, email: null, orderCount: 0, cancelledCount: 0,
      totalSpent: 0, firstOrderAt: null, lastOrderAt: null, registered: false,
    };
    byPhone.set(phone, {
      phone,
      name: pickLatest(prev.name, row.name),
      address: pickLatest(prev.address, row.address),
      email: pickLatest(prev.email, row.email),
      orderCount: prev.orderCount + (Number(row.orderCount) || 0),
      cancelledCount: prev.cancelledCount + (Number(row.cancelledCount) || 0),
      totalSpent: prev.totalSpent + (Number(row.totalSpent) || 0),
      firstOrderAt: earlier(prev.firstOrderAt, time(row.firstOrderAt) == null ? null : row.firstOrderAt),
      lastOrderAt: later(prev.lastOrderAt, time(row.lastOrderAt) == null ? null : row.lastOrderAt),
      registered: prev.registered || Boolean(row.registered),
    });
  }

  return [...byPhone.values()]
    .map((buyer) => ({
      ...buyer,
      name: buyer.name?.value.trim() || "",
      address: buyer.address?.value.trim() || "",
      email: buyer.email?.value.trim() || "",
      totalSpent: Math.round(buyer.totalSpent * 100) / 100,
      firstOrderAt: buyer.firstOrderAt ? new Date(buyer.firstOrderAt).toISOString() : null,
      lastOrderAt: buyer.lastOrderAt ? new Date(buyer.lastOrderAt).toISOString() : null,
    }))
    .sort((a, b) => (time(b.lastOrderAt) ?? 0) - (time(a.lastOrderAt) ?? 0));
};
