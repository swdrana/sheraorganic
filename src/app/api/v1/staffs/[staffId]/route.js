import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import User from "../../../../backend/model/user.model";

//===== Delete single staff by id =========
export const DELETE = async (req, { params }) => {
  // console.log("req in staff", req);
  connectDB();
  try {
    const { staffId } = params;
    const deletedStaff = await User.findByIdAndDelete(staffId);
    if (!deletedStaff) {
      return NextResponse.json({ error: "staff not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "staff deleted successfully",
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(`Deleting Error: ${error.message}`));
  }
};

// ======== update single staff  ============
export const PATCH = async (req, { params }) => {
  connectDB();

  const updateStaffData = await req.json();
  const { staffId } = params;
  // console.log(staffId, updateStaffData);

  try {
    // Find the existing staff
    const existingStaff = await User.findById(staffId);
    if (!existingStaff) {
      return new Response("blog not found", { status: 404 });
    }
    existingStaff.name = updateStaffData.name;
    existingStaff.email = updateStaffData.email;
    existingStaff.role = updateStaffData.role;
    existingStaff.contact = updateStaffData.contact;
    existingStaff.image = updateStaffData.image;
    existingStaff.joiningDate = updateStaffData.joiningDate;
    existingStaff.status = updateStaffData.status;
    await existingStaff.save();
    return NextResponse.json({
      message: "staff Update successfully",
      status: 200,
    });
  } catch (error) {
    return new Response(`Updating Error: ${error.message}`);
  }
};

//======== single staff details =========
export const GET = async (req, { params }) => {
  // console.log("req is staff route", req);

  connectDB();
  try {
    const { staffId } = params;
    const staffDetails = await Staff.findOne({ _id: staffId });
    if (!staffDetails) {
      return NextResponse.json(
        { error: "staffDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ staffDetails: staffDetails }, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(`staffDetails Error: ${error.message}`));
  }
};
