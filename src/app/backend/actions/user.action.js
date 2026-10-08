"use server";
import connectDB from "@/app/utils/database";
import User from "../model/user.model";

export async function updateUser(userId, updateUserData) {
  await connectDB();
  // console.log("userId, updateUserData", userId, updateUserData);
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateUserData },
      { new: true, runValidators: true }
    );

    if (user) {
      return user;
    } else {
      return { message: "User not found", status: 404 };
    }
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}
