import { forgetShared } from "@/app/components/store/dataFetching/sharedFetch";

// Helper function to get API URL
function getApiUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || "";
}

// Add store customization setting
export async function addStoreCustomizationSetting(
  storeCustomizationSettingData
) {
  const apiUrl = getApiUrl();

  // console.log(
  //   "Adding store customization setting:",
  //   storeCustomizationSettingData
  // );
  try {
    const response = await fetch(`${apiUrl}/api/v1/store`, {
      method: "POST",
      credentials: "include",
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

    forgetShared("settings"); // later useSetting() calls must not see the pre-save copy
    return await response.json();
  } catch (error) {
    console.error("Error adding store customization setting:", error);
    return null;
  }
}

// Get all store customization settings
export async function getStoreCustomizationSetting() {
  const apiUrl = getApiUrl();

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

  try {
    const response = await fetch(`${apiUrl}/api/v1/store`, {
      method: "PATCH",
      credentials: "include",
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

    forgetShared("settings"); // later useSetting() calls must not see the pre-save copy
    return await response.json();
  } catch (error) {
    console.error("Error updating store customization setting:", error);
    return null;
  }
}
