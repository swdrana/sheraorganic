import User from "@/app/backend/model/user.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  connectDB();

  const { id } = params;
  const updateUserData = await req.json(); // Get the status from request body
  // console.log("update updateUserData", updateUserData, id);
  try {
    const result = await User.updateOne(
      { _id: id },
      {
        $set: {
          name: updateUserData.name,
          contact: updateUserData.contact || updateUserData.phone,
          username: updateUserData.userName,
          address: updateUserData.address,
          email: updateUserData.email,
          img: updateUserData.img,
          birthday: updateUserData.birthday ? new Date(updateUserData.birthday) : undefined,
        },
      }
    );

    if (result.nModified === 0) {
      return NextResponse.json(
        { message: "User not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User Updated Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in update user..", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Get signle user details
export const GET = async (req, { params }) => {
  // console.log("hit get in signle blog details");

  connectDB();
  try {
    const { id } = params;
    // console.log("user id..", id);
    const userDetails = await User.findById(id);

    // console.log("product details in api route", productDetails);
    if (!userDetails) {
      return NextResponse.json(
        { error: "userDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ userDetails: userDetails }, { status: 200 });
  } catch (error) {
    console.log("error in get single user by id", error);
    return new Response(JSON.stringify(`userDetails Error: ${error.message}`));
  }
};
