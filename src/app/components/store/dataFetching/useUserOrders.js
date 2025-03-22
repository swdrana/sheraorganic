// hooks/useUserOrders.js
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserOrders } from "@/app/backend/controllers/order.controller";

const useUserOrders = () => {
  const session = useSession();
  // console.log("session..", session);

  const [userOrders, setUserOrders] = useState({});
  const [userOrdersLoading, setUserOrdersLoading] = useState(true);
  //   console.log("id in single user//", id);
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching user data...");

      try {
        const res = await getUserOrders(session?.data?.user?.id);
        // console.log("User data response:", res);
        setUserOrders(res?.userOrder);
      } catch (error) {
        // console.error("Failed to fetch user:", error);
      } finally {
        setUserOrdersLoading(false);
      }
    };

    // Only fetch data when session?.data?.user?.id is available
    if (session?.data?.user?.id) {
      fetchData();
    }
  }, [session?.data?.user?.id]);

  return { userOrders, userOrdersLoading };
};

export default useUserOrders;
