export async function addBlog(newBlog) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });
    // console.log("response in blog controler", response);

    if (!response.ok) {
      throw new Error(`Failed to add blog. Status: ${response.status}`);
    }

    const blogs = await response.json();

    return blogs;
  } catch (error) {
    console.error("Error adding blog:", error);
    return null;
  }
}

// Get all blogs
export async function getAllBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/blogs`, {
      next: { tags: ["blog"] },
    });

    // console.log("blog in blog controller", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs. Status: ${response.status}`);
    }

    const blogs = await response.json();

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Update blog
export async function updateBlog({ blogData, id }) {
  // console.log("updateblogdata==========================", blogData);
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });

    // console.log("response in blog controller========", response);

    if (!response.ok) {
      throw new Error(
        `Failed to update blog with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    // console.error("Error updating blog:", error);
    return null;
  }
}

// Delete blog
export async function deleteBlog(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "Environment variable NEXT_PUBLIC_BASE_URL is not defined"
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/blogs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete blog with ID: ${id}. Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting blog:", error);
    return null;
  }
}
