import Attribute from "@/app/backend/model/attributes.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

//===== Delete single category by id =========
export const DELETE = async (req, { params }) => {
  connectDB();
  console.log("req......===", req?.url);
  try {
    const { attributeId } = params;
    const deletedAttribute = await Attribute.findByIdAndDelete(attributeId);
    if (!deletedAttribute) {
      return NextResponse.json(
        { error: "Attribute not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Attribute deleted successfully",
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(`Deleting Error: ${error.message}`));
  }
};

// ======== update single Attribute  ============
export const PATCH = async (req, { params }) => {
  connectDB();

  const updateAttributeData = await req.json();
  const { attributeId } = params;
  // console.log(attributeId, updateAttributeData);

  try {
    // Find the existing category
    const existingAttribute = await Attribute.findById(attributeId);
    // console.log(
    //   "existingAttribute",
    //   existingAttribute,
    //   "update attribute data",
    //   updateAttributeData
    // );
    if (!existingAttribute) {
      return new Response("blog not found", { status: 404 });
    }
    existingAttribute.title = updateAttributeData.title;
    existingAttribute.name = updateAttributeData.name;
    existingAttribute.option = updateAttributeData.option;
    existingAttribute.variants = updateAttributeData.variants;
    existingAttribute.status = updateAttributeData.status;
    await existingAttribute.save();
    return NextResponse.json({
      message: "Attribute Update successfully",
      status: 200,
    });
  } catch (error) {
    return new Response(`Updating Error: ${error.message}`);
  }
};

//======== single category details =========
export const GET = async ({ params }) => {
  // console.log("hit get in signle blog details");

  connectDB();
  try {
    const { attributeId } = params;
    const CategoryDetails = await Attribute.findOne({ _id: attributeId });
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
