// hooks/useSingleUser.js
"use client";

import { useState, useEffect } from "react";
import { useMainContext } from "../provider/MainContextStore";
import { useSession } from "next-auth/react";
import { getUserById } from "@/app/backend/controllers/user.controller";

const useSingleUser = () => {
  const session = useSession();
  const { updateUserProfile, setUpdateUserProfile } = useMainContext();
  // console.log("updateUserProfile,,,,", updateUserProfile);
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  //   console.log("id in single user//", id);
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching user data...");

      try {
        const res = await getUserById(session?.data?.user?.id);
        // console.log("User data response:", res);
        setUser(res);
      } catch (error) {
        // console.error("Failed to fetch user:", error);
      } finally {
        setUserLoading(false);
        setUpdateUserProfile(false);
      }
    };

    // Only fetch data when session?.data?.user?.id is available
    if (session?.data?.user?.id) {
      fetchData();
    }
  }, [session?.data?.user?.id, updateUserProfile]);

  return { user, userLoading };
};

export default useSingleUser;
