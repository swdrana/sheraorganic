"use server";
import connectDB from "@/app/utils/database";
import Staff from "../model/staff.model";

export async function staffUpdate(id, updateStaffData) {
  connectDB();
  // console.log("staffId", id, "update ProductData", updateStaffData);
  try {
    const staff = await Staff.findById(id);
    // console.log("staff", staff);

    if (staff) {
      staff.name = updateStaffData.name;
      staff.email = updateStaffData.email;
      staff.contact = updateStaffData.contact;
      staff.joiningDate = updateStaffData.joiningDate;
      staff.status = updateStaffData.status;
      staff.role = updateStaffData.role;
      staff.image = updateStaffData.image;

      await staff.save();

      return { message: "staff update successfully" };
    } else {
      return { message: "staff not found" };
    }
  } catch (err) {
    return { message: err.message, status: 500 };
  }
}
