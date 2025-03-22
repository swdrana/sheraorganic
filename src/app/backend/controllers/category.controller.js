const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not defined");
}

// Add category
export async function addCategory(newCategory) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/categorys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    if (!response.ok) {
      throw new Error(`Failed to add category. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
}

// Get all categories
export async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/categorys`, {
      next: { tags: ["category"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.categorys || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Update category
export async function updateCategory({ id, updateCategoryData }) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/categorys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateCategoryData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update category with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
}

// Delete category
export async function deleteCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/categorys/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete category with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
}
