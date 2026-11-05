export const normalizeBdPhone = (value) =>
  String(value ?? "")
    .replace(/[০-৯]/g, (digit) => String(digit.charCodeAt(0) - "০".charCodeAt(0)))
    .replace(/[\s.()-]/g, "")
    .replace(/^(?:\+88|88)/, "");

export const isValidBdPhone = (value) => /^01[3-9]\d{8}$/.test(normalizeBdPhone(value));
