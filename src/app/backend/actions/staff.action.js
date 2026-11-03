"use server";
import connectDB from "@/app/utils/database";
import User from "../model/user.model";
import { requireStaff, canManageRoles } from "../utils/apiAuth";

export async function staffUpdate(id, updateStaffData) {
  const session = await requireStaff();
  await connectDB();
  // console.log("staffId", id, "update ProductData", updateStaffData);
  try {
    const staff = await User.findById(id);
    // console.log("staff", staff);

    if (staff) {
      if (updateStaffData.role !== undefined &&
          updateStaffData.role !== staff.role && !canManageRoles(session)) {
        return { message: "Forbidden", status: 403 };
      }
      staff.name = updateStaffData.name;
      staff.email = updateStaffData.email;
      staff.contact = updateStaffData.contact;
      staff.joiningDate = updateStaffData.joiningDate;
      staff.status = updateStaffData.status;
      if (updateStaffData.role !== undefined) staff.role = updateStaffData.role;
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
