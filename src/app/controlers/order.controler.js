// Create a new order
export async function createOrder(newOrder) {
  if (!newOrder) {
    console.error("No order data provided.");
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create order. Status: ${response.status}`);
    }

    const order = await response.json();
    return order;
  } catch (error) {
    console.error("Error in creating order:", error);
    return null;
  }
}

// Get user orders
export async function getUserOrders(id) {
  if (!id) {
    console.error("User ID is required to fetch orders.");
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user-order/${id}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user orders. Status: ${response.status}`
      );
    }

    const userOrders = await response.json();
    return userOrders || [];
  } catch (error) {
    console.error("Error in fetching user orders:", error);
    return [];
  }
}

// Get order by code
export async function getOrderByCode(code) {
  if (!code) {
    console.error("Order code is required to fetch order.");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order-code/${code}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch order by code. Status: ${response.status}`
      );
    }

    const order = await response.json();
    return order || null;
  } catch (error) {
    console.error("Error in fetching order by code:", error);
    return null;
  }
}
