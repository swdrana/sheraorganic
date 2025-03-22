// Add staff (Create user)
export async function createUser(userData) {
  if (!userData) {
    console.error("User data is required.");
    return null; // Return null if userData is missing
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create user. Status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error in creating user:", error);
    return null; // Return null in case of error
  }
}

// Get user by email
export async function getUserByEmail(email) {
  if (!email) {
    console.error("Email is required.");
    return null; // Return null if email is missing
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Wrap email in an object if needed by API
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get user by email. Status: ${response.status}`
      );
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error in fetching user by email:", error);
    return null; // Return null in case of error
  }
}

// Update user profile
export async function updateUserProfile(id, updateUserData) {
  if (!id || !updateUserData) {
    console.error("User ID and update data are required.");
    return null; // Return null if any required argument is missing
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUserData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update user. Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in updating user profile:", error);
    return null; // Return null in case of error
  }
}

// Get user details by ID
export async function getUserById(id) {
  if (!id) {
    console.error("User ID is required.");
    return null; // Return null if id is missing
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${id}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details. Status: ${response.status}`
      );
    }

    const user = await response.json();
    return user?.userDetails || null; // Return null if userDetails is not found
  } catch (error) {
    console.error("Error in fetching user by ID:", error);
    return null; // Return null in case of error
  }
}
