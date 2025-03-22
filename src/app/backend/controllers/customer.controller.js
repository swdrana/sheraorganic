export async function getAllUser() {
  // Ensure the environment variable is defined
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiUrl) {
    console.error("API URL is not defined in environment variables.");
    return []; // Return an empty array or handle this case as appropriate
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/user`);

    if (!response.ok) {
      // If the response is not ok, throw an error with the status code
      throw new Error(`Failed to fetch users. Status: ${response.status}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error("Error fetching users:", error);
    return []; // Return an empty array as fallback
  }
}
