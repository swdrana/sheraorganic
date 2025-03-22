import Counter from "../model/counter.model";

// Helper function to check if the API URL is defined
function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return null; // Returning null to indicate an issue with the URL
  }
  return apiUrl;
}

// add order
export async function addOrder(newOrder) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null; // Avoid making the request if the API URL is missing

  try {
    const response = await fetch(`${apiUrl}/api/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) {
      throw new Error(`Failed to add order. Status: ${response.status}`);
    }

    const order = await response.json();
    return order;
  } catch (error) {
    console.error("Error adding order:", error);
    return null; // Return null if the order could not be added
  }
}

// Get all orders
export async function getAllOrders() {
  const apiUrl = getApiUrl();
  if (!apiUrl) return []; // Return an empty array if the API URL is missing

  try {
    const response = await fetch(`${apiUrl}/api/v1/orders`, {
      cache: "no-store", // Ensures no caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders. Status: ${response.status}`);
    }

    const { orders } = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return []; // Return an empty array in case of failure
  }
}

// Update order status
export async function updateOrderStatus(id, updateOrderStatus) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null; // Return null if the API URL is missing

  try {
    const response = await fetch(`${apiUrl}/api/v1/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateOrderStatus),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update order status. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating order status:", error);
    return null; // Return null if the update fails
  }
}

// Get order by code
export async function getOrderByCode(code) {
  if (!code) return null;

  const apiUrl = getApiUrl();
  if (!apiUrl) return null; // Return null if the API URL is missing

  try {
    const response = await fetch(`${apiUrl}/api/v1/order-code/${code}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch order by code. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order by code:", error);
    return null; // Return null in case of failure
  }
}

// Get user orders by user ID
export async function getUserOrders(id) {
  if (!id) return [];

  const apiUrl = getApiUrl();
  if (!apiUrl) return []; // Return empty array if API URL is missing

  try {
    const response = await fetch(`${apiUrl}/api/v1/user-order/${id}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user orders. Status: ${response.status}`
      );
    }

    const userOrders = await response.json();
    return userOrders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return []; // Return an empty array in case of failure
  }
}

// Get next order code (using the Counter model)
async function getNextOrderCode() {
  try {
    const result = await Counter.findOneAndUpdate(
      { name: "orderCode" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    return result.count;
  } catch (error) {
    console.error("Error getting next order code:", error);
    return null; // Return null if getting the order code fails
  }
}

export default getNextOrderCode;
