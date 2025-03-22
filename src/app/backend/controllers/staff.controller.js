// Helper function to check if the API URL is available
function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return null;
  }
  return apiUrl;
}

// Add staff
export async function addStaff(newStaff) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/staffs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStaff),
    });

    if (!response.ok) {
      throw new Error(`Failed to add staff. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding staff:", error);
    return null;
  }
}

// Get all staff
export async function getAllStaffs() {
  const apiUrl = getApiUrl();
  if (!apiUrl) return [];

  try {
    const response = await fetch(`${apiUrl}/api/v1/staffs`, {
      next: { tags: ["staff"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch staff. Status: ${response.status}`);
    }

    const staff = await response.json();
    return staff.staffs || []; // Return empty array if no staff found
  } catch (error) {
    console.error("Error fetching staff:", error);
    return [];
  }
}

// Update staff
export async function updateStaff({ updateStaffData, id }) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/staffs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateStaffData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update staff. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating staff:", error);
    return null;
  }
}

// Delete staff
export async function deleteStaff(id) {
  if (!id) return null;

  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/staffs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete staff. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting staff:", error);
    return null;
  }
}
