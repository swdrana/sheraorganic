// Get all categories
export async function getAllCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return [];
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/categorys`, {
      next: { tags: ["category"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    const categoryData = await response.json();
    return categoryData?.categorys || [];
  } catch (error) {
    console.error("Error in fetching categories:", error);
    return [];
  }
}
