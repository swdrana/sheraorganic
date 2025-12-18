"use client";
import React, { useState } from "react";
import { updateOrderStatus } from "@/app/backend/controllers/order.controller";

import { toast } from "react-toastify";
import { useMainContext } from "../../context/mainContext";
const SelectStatus = ({ order }) => {
  const [loading, setLoading] = useState(false);
  const { setUpdateOrderStatus } = useMainContext();
  const handleChangeStatus = async (e) => {
    const status = e.target.value;
    setLoading(true);
    setUpdateOrderStatus(false);
    const res = await updateOrderStatus(order._id, status);
    if (res?.message) {
      setUpdateOrderStatus(true);
      toast.success(res.message);
    }
    setLoading(false);
  };

  return (
    <>
      <select
        onChange={handleChangeStatus}
        className={`h-8 bg-primary-2 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={loading ? "" : order?.status || ""}
        disabled={loading}
      >
        {loading ? (
          <option value="" disabled>
            Updating...
          </option>
        ) : (
          <option disabled value="">
            Select Status
          </option>
        )}
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancel">Cancel</option>
      </select>
    </>
  );
};

export default SelectStatus;
