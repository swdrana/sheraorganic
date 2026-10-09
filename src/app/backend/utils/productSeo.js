const cleanText = (value, max) =>
  typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, max).trimEnd()
    : "";

export function cleanSeo({ seoTitle, seoDescription, seoKeywords } = {}) {
  const values = Array.isArray(seoKeywords)
    ? seoKeywords
    : typeof seoKeywords === "string"
      ? seoKeywords.split(/[,،]/)
      : [];
  const keywords = [];
  const seen = new Set();
  for (const value of values) {
    const keyword = cleanText(value, 60);
    const key = keyword.toLowerCase();
    if (!keyword || seen.has(key)) continue;
    seen.add(key);
    keywords.push(keyword);
    if (keywords.length === 20) break;
  }
  return {
    seoTitle: cleanText(seoTitle, 120),
    seoDescription: cleanText(seoDescription, 300),
    seoKeywords: keywords,
  };
}
