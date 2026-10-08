import Brand from "@/app/backend/model/brands.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS, getCachedBrandList } from "@/app/data/cachedData";

// get all brands (served from the shared data cache; writes revalidate the tag)
export const GET = async () => {
  try {
    const brands = await getCachedBrandList();
    if (brands.length === 0)
      return NextResponse.json({ error: "brands not found" });

    // console.log("brands...", brands);
    return NextResponse.json({
      message: "successfully get all brands",
      brands,
    });
  } catch (error) {
    return NextResponse.json({
      message: "testing backend",
      error,
      status: 400,
    });
  }
};

// post request for attributes post | save a attributes in database
export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  // console.log('data in category',data)
  try {
    const newBrand = new Brand({
      name: data.name,
      icon: data.icon,
      // icon:data.icon
    });
    await newBrand.save();
    revalidateTag(CACHE_TAGS.brands);
    return NextResponse.json({ message: "brand add success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};
