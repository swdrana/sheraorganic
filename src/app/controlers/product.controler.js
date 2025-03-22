// Get all products
export async function getAllProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`,
      {
        next: { tags: ["product"] },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const products = await response.json();
    return products?.products || []; // Return an empty array if no products are found
  } catch (error) {
    console.error("Error in fetching all products:", error);
    return []; // Return an empty array in case of error
  }
}

// Get product details by id
export async function getProductById(id) {
  if (!id) {
    console.error("Product ID is required.");
    return null; // Return null if no ID is provided
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`,
      {
        next: { tags: ["collection"] },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product details. Status: ${response.status}`
      );
    }

    const product = await response.json();
    return product?.productDetails || null; // Return null if no product details are found
  } catch (error) {
    console.error("Error in fetching product details:", error);
    return null; // Return null in case of error
  }
}
