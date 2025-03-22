import Category from "@/app/backend/model/category.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// ======== update single Category  ============
// export const PATCH = async (req, { params }) => {
//   connectDB();

//   const updateCategoryData = await req.json();
//   const { categoryId } = params;
//   // console.log(categoryId, updateCategoryData);

//   try {
//     // Find the existing category
//     const existingCategory = await Category.findById(categoryId);
//     if (!existingCategory) {
//       return new Response("blog not found", { status: 404 });
//     }

//     existingCategory.name = updateCategoryData.name;
//     existingCategory.description = updateCategoryData.description;
//     existingCategory.parentId = updateCategoryData.parentId;
//     existingCategory.parentName = updateCategoryData.parentName;
//     existingCategory.status = updateCategoryData.status;
//     await existingCategory.save();
//     return NextResponse.json({
//       message: "Category Update successfully",
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(`Updating Error: ${error.message}`);
//   }
// };

//======== single category details =========
export const GET = async (req, { params }) => {
  // console.log("hit get in signle blog details");

  connectDB();
  try {
    const { categoryId } = params;
    const CategoryDetails = await Category.findOne({ _id: categoryId });
    if (!CategoryDetails) {
      return NextResponse.json(
        { error: "CategoryDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { CategoryDetails: CategoryDetails },
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify(`CategoryDetails Error: ${error.message}`)
    );
  }
};
