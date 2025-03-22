import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import Blog from "../../../backend/model/blog.model";

// get all Blogs
export const GET = async () => {
  connectDB();
  try {
    // get blogs from the server
    const blogs = await Blog.find().sort({ _id: -1 });
    // console.log("Blogs..", Blogs);

    if (blogs?.length <= 0)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json(
      { message: "successfully get all Blogs", blogs },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in Blog route", error);
    return NextResponse.json(
      { message: "testing backend", error },
      { status: 404 }
    );
  }
};

// post request for Blogs post | save a Blogs in database
export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  // console.log("Blog data", data);
  try {
    const newBlog = new Blog({
      title: data.title,
      description: data.description,
      category: data.category,
      img: data.img,
      status: data.status,
    });
    // console.log("new Blog...", newBlog);
    const blog = await newBlog.save();
    return NextResponse.json({ message: "success", blog });
  } catch (error) {
    console.log("errro in blog route", error);
    return NextResponse.json({ message: "error", error });
  }
};
