// Add brand
export async function addBrand(newBrand) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBrand),
    });

    if (!response.ok) {
      throw new Error(`Failed to add brand. Status: ${response.status}`);
    }

    const brands = await response.json();
    return brands;
  } catch (error) {
    console.error("Error adding brand:", error);
    return null;
  }
}

// Get all brands
export async function getAllBrands() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/brands`, {
      next: { tags: ["brand"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brands. Status: ${response.status}`);
    }

    const brand = await response.json();
    return brand?.brands || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

// Update brand
export async function updateBrand({ updateBrandData, id }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/brands/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBrandData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update brand with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating brand:", error);
    return null;
  }
}

// Delete brand
export async function deleteBrand(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/brands/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete brand with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting brand:", error);
    return null;
  }
}
