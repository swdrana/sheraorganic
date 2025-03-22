// hooks/useorders.js

import { getAllOrders } from "@/app/backend/controllers/order.controller";
import { useState, useEffect } from "react";
import { useMainContext } from "../context/mainContext";

const useOrders = () => {
  const [orders, setorders] = useState([]);
  const [orderloading, setOrdersLoading] = useState(true);
  const { updateOrderStatus } = useMainContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllOrders();
        // console.log("res..in", res);
        setorders(res);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchData();
  }, [updateOrderStatus]);

  return { orders, orderloading };
};

export default useOrders;
