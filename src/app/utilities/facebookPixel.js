// Small utility to ensure fbq is ready before attempting to track
const isFbqReady = () =>
  typeof window !== "undefined" && typeof window.fbq === "function";

export const PageView = () => {
  if (!isFbqReady()) return;
  window.fbq("track", "PageView");
};

// Track AddToCart event (supports both object payload and positional args)
export const trackAddToCart = (...args) => {
  if (!isFbqReady()) return;
  if (args.length === 1 && args[0] && typeof args[0] === "object") {
    // Already in standard Pixel format
    window.fbq("track", "AddToCart", args[0]);
    return;
  }
  const [
    userId,
    userName,
    userEmail,
    userPhone,
    userAddress,
    productId,
    productName,
    productCategory,
    productPrice,
  ] = args;
  window.fbq("track", "AddToCart", {
    user_id: userId,
    user_name: userName,
    user_email: userEmail,
    user_phone: userPhone,
    user_address: userAddress,
    content_ids: productId ? [productId] : undefined,
    content_name: productName,
    content_category: productCategory,
    value: productPrice,
    currency: "BDT",
  });
};

// Track InitiateCheckout (supports object payload or legacy args)
export const InitiateCheckout = (...args) => {
  if (!isFbqReady()) return;
  if (args.length === 1 && args[0] && typeof args[0] === "object") {
    window.fbq("track", "InitiateCheckout", args[0]);
    return;
  }
  const [productIds, productName, totalValue] = args;
  window.fbq("track", "InitiateCheckout", {
    content_ids: productIds,
    content_type: "product",
    content_name: productName,
    value: totalValue,
    currency: "BDT",
  });
};

// Track Purchase (supports object payload or legacy args)
export const Purchase = (...args) => {
  if (!isFbqReady()) return;
  if (args.length === 1 && args[0] && typeof args[0] === "object") {
    window.fbq("track", "Purchase", args[0]);
    return;
  }
  const [userId, orderIds, totalValue, numItems] = args;
  window.fbq("track", "Purchase", {
    user_id: userId,
    content_ids: orderIds,
    content_type: "product",
    value: totalValue,
    num_items: numItems,
    currency: "BDT",
  });
};