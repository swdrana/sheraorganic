const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not defined");
}

// Add coupon
export async function addCoupon(newCoupon) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCoupon),
    });

    if (!response.ok) {
      throw new Error(`Failed to add coupon. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding coupon:", error);
    return null;
  }
}

// Get all coupons
export async function getAllCoupons() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/coupons`, {
      next: { tags: ["coupon"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch coupons. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.coupons || [];
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
}

// Update coupon
export async function updateCoupon({ updateCouponData, id }) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/coupons/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCouponData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update coupon with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating coupon:", error);
    return null;
  }
}

// Delete coupon
export async function deleteCoupon(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/coupons/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete coupon with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return null;
  }
}
