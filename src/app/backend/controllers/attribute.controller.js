export async function addAttribute(newAttribute) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Ensure this is correctly defined
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }

    const response = await fetch(`${baseUrl}/api/v1/attributes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAttribute),
    });
    const attribute = await response.json();
    return attribute;
  } catch (error) {
    console.error("Error in addAttribute:", error);
  }
}

export async function getAllAttributes() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }

    const response = await fetch(`${baseUrl}/api/v1/attributes`, {
      next: { tags: ["attribute"] },
    });
    const attribute = await response.json();
    return attribute.attributes;
  } catch (error) {
    console.error("Error in getAllAttributes:", error);
  }
}

export async function updateAttribute(id, updateAttributeData) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }

    const response = await fetch(`${baseUrl}/api/v1/attributes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateAttributeData),
    });
    return response.json();
  } catch (error) {
    console.error("Error in updateAttribute:", error);
  }
}

export async function deleteAttribute(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }

    const response = await fetch(`${baseUrl}/api/v1/attributes/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    console.error("Error in deleteAttribute:", error);
  }
}
