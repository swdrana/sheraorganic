// hooks/useOrderCode.js
"use client";

import { getOrderByCode } from "@/app/backend/controllers/order.controller";
import { useState, useEffect } from "react";

const useOrderCode = (code) => {
  const [codeOrder, setCodeOrder] = useState({});
  const [codeOrderLoading, setCodeOrderLoading] = useState(false);
  //   console.log("id in single user//", id);
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching user data...");
      setCodeOrderLoading(true);
      try {
        const res = await getOrderByCode(code);
        // console.log("User data response:", res);
        setCodeOrder(res?.singleOrder);
      } catch (error) {
        // console.error("Failed to fetch user:", error);
      } finally {
        setCodeOrderLoading(false);
      }
    };

    // Only fetch data when session?.data?.user?.id is available

    fetchData();
  }, [code]);

  return { codeOrder, codeOrderLoading };
};

export default useOrderCode;
