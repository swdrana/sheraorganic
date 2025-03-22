// Get all brands
export async function getAllBrands() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/brands`, {
      next: { tags: ["brand"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brands. Status: ${response.status}`);
    }

    const brandData = await response.json();
    return brandData?.brands || [];
  } catch (error) {
    console.error("Error in fetching brands:", error);
    return [];
  }
}
