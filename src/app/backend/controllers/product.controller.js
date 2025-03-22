// Helper function to check if the API URL is available
function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return null;
  }
  return apiUrl;
}

// Add product
export async function addProduct(newProduct) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
}

// Get all products
export async function getAllProducts() {
  const apiUrl = getApiUrl();
  if (!apiUrl) return [];

  try {
    const response = await fetch(`${apiUrl}/api/v1/products`, {
      next: { tags: ["collection"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    // console.log("all product..", response);

    const products = await response.json();
    return products.products || []; // Return empty array if no products found
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get single product by ID
export async function getProductById(id) {
  if (!id) return null;

  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/products/${id}`, {
      next: { tags: ["collection"] },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product by ID. Status: ${response.status}`
      );
    }

    const product = await response.json();
    return product.productDetails || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

// Update product
export async function updateProduct({ id, updateProductData }) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProductData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
}

// Delete product
export async function deleteProduct(id) {
  if (!id) return null;

  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete product. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
}

// Update product rating
export async function updateProductRating(id, data) {
  if (!id || !data) return null;

  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update product rating. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product rating:", error);
    return null;
  }
}

// Get products by IDs
export async function getProductByIds(productIds) {
  // console.log(
  //   "product ids in product controler====================================================================================================================",
  //   productIds
  // );
  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    console.error("Invalid product IDs array");
    return [];
  }

  const apiUrl = getApiUrl();
  if (!apiUrl) return [];

  try {
    const response = await fetch(`${apiUrl}/api/v1/productIds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productIds),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products by IDs. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products by IDs:", error);
    return [];
  }
}
