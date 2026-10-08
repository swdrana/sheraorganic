import Brand from "@/app/backend/model/brands.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/app/data/cachedData";
import { destroyImages, diffRemoved } from "@/app/backend/utils/cloudinaryServer";

//===== Delete single category by id =========
export const DELETE = async (req, { params }) => {
  connectDB();
  //   console.log("req......===", req?.url);
  try {
    const { brandId } = params;
    const deletedBrand = await Brand.findByIdAndDelete(brandId);
    if (!deletedBrand) {
      return NextResponse.json({ error: "brand not found" }, { status: 404 });
    }
    revalidateTag(CACHE_TAGS.brands);
    void destroyImages(deletedBrand.icon);
    return NextResponse.json({
      message: "brand deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.log("error in brand id route..", error);
    return new Response(JSON.stringify(`Deleting Error: ${error.message}`));
  }
};

// ======== update single brand  ============
export const PATCH = async (req, { params }) => {
  connectDB();

  const updateBrandData = await req.json();
  const { brandId } = params;
  // console.log("brandId,........", brandId, updateBrandData?.name);

  try {
    // Find the existing category
    const existingBrand = await Brand.findById(brandId);
    // console.log("existingBrand", existingBrand);

    if (!existingBrand) {
      return new Response("blog not found", { status: 404 });
    }
    const previousIcon = existingBrand.icon;
    existingBrand.icon = updateBrandData.icon;
    existingBrand.name = updateBrandData.name;
    existingBrand.status = updateBrandData.status;
    await existingBrand.save();
    revalidateTag(CACHE_TAGS.brands);
    void destroyImages(diffRemoved(previousIcon, updateBrandData.icon));
    return NextResponse.json({
      message: "brand Update successfully",
      status: 200,
    });
  } catch (error) {
    // console.log("error", error);
    return new Response(`Updating Error: ${error.message}`);
  }
};
