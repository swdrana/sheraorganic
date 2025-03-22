// Helper function to get API URL
function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return null;
  }
  return apiUrl;
}

// Add store customization setting
export async function addStoreCustomizationSetting(
  storeCustomizationSettingData
) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  // console.log(
  //   "Adding store customization setting:",
  //   storeCustomizationSettingData
  // );
  try {
    const response = await fetch(`${apiUrl}/api/v1/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeCustomizationSettingData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add store customization setting. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding store customization setting:", error);
    return null;
  }
}

// Get all store customization settings
export async function getStoreCustomizationSetting() {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/store`, {
      cache: "no-store", // Ensure no caching
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch store customization settings. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching store customization settings:", error);
    return null;
  }
}

// Update store customization setting
export async function updateStoreCustomizationSetting(
  storeCustomizationSettingData
) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/store`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeCustomizationSettingData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update store customization setting. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating store customization setting:", error);
    return null;
  }
}
