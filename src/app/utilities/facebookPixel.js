// One privacy boundary for all callers, including legacy cards. Never forward caller user_data.
let tracking = { enabled: false };
export function configureTracking(value) { tracking = value || { enabled: false }; }
const active = () => typeof window !== "undefined" && tracking.enabled && !window.location.pathname.startsWith("/admin");
function layer(event, ecommerce) {
  if (!active()) return;
  window.dataLayer = window.dataLayer || [];
  if (ecommerce) window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({ event, ...(ecommerce ? { ecommerce } : { page_path: window.location.pathname }) });
}
export function PageView() {
  if (!active()) return;
  if (tracking.fb_pixel_id) window.fbq?.("track", "PageView");
  if (tracking.ga4_id) window.gtag?.("event", "page_view", { page_path: window.location.pathname, send_to: tracking.ga4_id });
  if (tracking.tiktok_pixel_id) window.ttq?.page?.();
  layer("page_view");
}
function commerce(fbEvent, gaEvent, input = {}, orderCode) {
  if (!active()) return;
  const contents = (Array.isArray(input.contents) ? input.contents : []).map((item) => ({
    id: String(item.id ?? ""), quantity: Number(item.quantity) || 1, item_price: Number(item.item_price) || 0,
  }));
  const params = {
    content_type: "product", content_ids: contents.map((item) => item.id), contents,
    currency: "BDT", value: Number(input.value) || 0, num_items: contents.reduce((sum, item) => sum + item.quantity, 0),
  };
  if (tracking.fb_pixel_id) {
    if (orderCode) window.fbq?.("track", fbEvent, params, { eventID: String(orderCode) });
    else window.fbq?.("track", fbEvent, params);
  }
  const ecommerce = {
    currency: params.currency, value: params.value,
    items: contents.map((item) => ({ item_id: item.id, quantity: item.quantity, price: item.item_price })),
    ...(orderCode ? { transaction_id: String(orderCode) } : {}),
  };
  layer(gaEvent, ecommerce);
  if (tracking.ga4_id) window.gtag?.("event", gaEvent, { ...ecommerce, send_to: tracking.ga4_id });
}
export const trackAddToCart = (input) => commerce("AddToCart", "add_to_cart", input);
export const InitiateCheckout = (input) => commerce("InitiateCheckout", "begin_checkout", input);
export function Purchase(input, orderCode) {
  if (!orderCode || !active()) return;
  // Protect against retries/re-renders within a session, but never let blocked storage break checkout.
  const key = `purchase:${orderCode}`;
  try { if (sessionStorage.getItem(key)) return; } catch { /* Storage may be disabled. Checkout must still succeed. */ }
  commerce("Purchase", "purchase", input, orderCode);
  try { sessionStorage.setItem(key, "1"); } catch { /* Storage may be disabled. Checkout must still succeed. */ }
}
