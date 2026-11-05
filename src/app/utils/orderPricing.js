export const SHIPPING_OPTIONS = Object.freeze({
  insideDhaka: Object.freeze({ value: "80", cost: 80 }),
  outsideDhaka: Object.freeze({ value: "100", cost: 100 }),
});

export const ALLOWED_PAYMENT_METHODS = Object.freeze(["cod"]);

export const shippingOptionFor = (value) =>
  Object.values(SHIPPING_OPTIONS).find(
    (option) => option.value === String(value)
  );
