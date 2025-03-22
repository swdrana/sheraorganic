import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import Blog from "../../../../backend/model/blog.model";

//===== Delete single category by id =========
export const DELETE = async (req, { params }) => {
  connectDB();
  //   console.log("req......===", req?.url);
  try {
    const { id } = params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "blog deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log("error in blog id route..", error);
    return new Response(JSON.stringify(`Deleting Error: ${error.message}`));
  }
};

// ======== update single blog  ============
export const PATCH = async (req, { params }) => {
  connectDB();

  const updateBlogData = await req.json();
  const { id } = params;
  // console.log("data======", updateBlogData);

  try {
    // Find the existing category
    const existingBlog = await Blog.findById(id);
    // console.log("existingBlog", existingBlog);

    if (!existingBlog) {
      return new Response("blog not found", { status: 404 });
    }
    existingBlog.img = updateBlogData.img;
    existingBlog.description = updateBlogData.description;
    existingBlog.category = updateBlogData.category;
    existingBlog.title = updateBlogData.title;
    existingBlog.status = updateBlogData.status;
    await existingBlog.save();
    return NextResponse.json({
      message: "blog Update successfully",
      status: 200,
    });
  } catch (error) {
    // console.log("error in blog update route==========================", error);
    return new Response(`Updating Error: ${error.message}`);
  }
};
