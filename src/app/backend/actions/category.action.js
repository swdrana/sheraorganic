"use server";
import connectDB from "@/app/utils/database";
import Category from "../model/category.model";
import cloudinary from "cloudinary";

// add category
// category update
export async function addNewCategory(categoryData) {
  connectDB();
  // console.log("category data", categoryData);
  try {
    const newCategory = new Category({
      // set every value individually
      name: categoryData.name,
      description: categoryData.description,
      parentId: categoryData.parentId,
      parentName: categoryData.parentName,
      // status: data.status,
      // icon:data.icon
    });
    await newCategory.save();

    return { message: "category add successfully" };
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}

// category update
export async function categoryUpdate(categoryId, updateCategoryData) {
  connectDB();
  // console.log("categoryId", categoryId, "update data", updateCategoryData);
  try {
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return "category not found", { status: 404 };
    }

    existingCategory.name = updateCategoryData.name;
    existingCategory.description = updateCategoryData.description;
    existingCategory.parentId = updateCategoryData.parentId;
    existingCategory.parentName = updateCategoryData.parentName;
    existingCategory.status = updateCategoryData.status;
    existingCategory.icon = updateCategoryData.icon;
    await existingCategory.save();

    return { message: "category update successfully" };
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}

export async function categoryStatusUpdate(categoryId, updateCategoryData) {
  connectDB();
  // console.log("categoryId", categoryId, "update data", updateCategoryData);
  try {
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return "category not found", { status: 404 };
    }

    existingCategory.name = updateCategoryData.name;
    existingCategory.description = updateCategoryData.description;
    existingCategory.parentId = updateCategoryData.parentId;
    existingCategory.parentName = updateCategoryData.parentName;
    existingCategory.status = updateCategoryData.status;
    existingCategory.icon = updateCategoryData.icon;
    await existingCategory.save();

    return { message: "category update successfully" };
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}
// get category by id
export async function getCategoryById(categoryId) {
  connectDB();
  // console.log("categoryId", categoryId);
  try {
    await Category.findById(categoryId);
    // console.log("existingCategory", existingCategory);
    return { message: "category" };
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}

// delete category
export async function deleteCategoryById(id) {
  connectDB();
  try {
    // console.log("delete category ", id);
    const res = await Category.findByIdAndDelete(id);
    // console.log("res in delete action in category action", res);
    return { message: `${res.name} delete successfully ` };
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}

export async function imageUpload(req, res) {
  if (req.method === "POST") {
    const { image } = req.body;

    try {
      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(image[0].url);

      // Respond with the uploaded image URL
      res.status(200).json({ url: uploadedImage.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
