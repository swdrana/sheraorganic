export const PageView = () => {
  fbq("track", "PageView");
};

// Function to track AddToCart event
export const trackAddToCart = (userId, userName, userEmail, userPhone, userAddress, productId, productName, productCategory, productPrice) => {
  fbq('track', 'AddToCart', {
    user_id: userId, // Include user ID
    user_name: userName, // Include user name
    user_email: userEmail, // Include user email
    user_phone: userPhone, // Include user phone number
    user_address: userAddress,
    content_ids: [productId],
    content_name: productName,
    content_category: productCategory,
    value: productPrice,
    currency: 'BDT'
    // Include additional product information as needed
  });
};

export const InitiateCheckout = (productIds, productName, totalValue) => {
  fbq("track", "InitiateCheckout", {
    content_ids: productIds,
    content_type: "product",
    content_name: productName,
    value: totalValue,
    currency: "BDT",
  });
};

export const Purchase = (userId, orderIds, totalValue, numItems) => {
  fbq("track", "Purchase", {
    user_id: userId,
    content_ids: orderIds,
    content_type: "product",
    value: totalValue,
    num_items: numItems,
    currency: 'BDT',
  });
};