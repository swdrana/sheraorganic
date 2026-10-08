import connectDB from "@/app/utils/database";
import User from "../model/user.model";

// Server-only lookup used by the next-auth credentials provider. Deliberately NOT in a
// "use server" file: exports there become browser-callable Server Actions, and this returns
// the full user document (including the password).
export async function findUserByEmail(email) {
  await connectDB();
  return User.findOne({ email });
}
