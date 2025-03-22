// Helper function to get API URL
function getApiUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return null;
  }
  return apiUrl;
}

// Get user by ID
export async function getUserById(id) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/user/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user by ID. Status: ${response.status}`);
    }

    const user = await response.json();
    return user.userDetails;
  } catch (error) {
    console.error("Error in getting user by ID:", error);
    return null;
  }
}

// Update user profile
export async function updateUserProfile(id, updateUserData) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/v1/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update user profile. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updating user profile:", error);
    return null;
  }
}

// Create a new user
export async function createUser(userData) {
  const apiUrl = getApiUrl();
  if (!apiUrl) return null;

  try {
    const response = await fetch(`${apiUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user. Status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error in creating user:", error);
    return null;
  }
}
