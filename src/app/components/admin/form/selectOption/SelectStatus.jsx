"use client"
import { updateOrderStatus } from "@/app/backend/controllers/order.controller";


import React from "react";
import { toast } from "react-toastify";
import { useMainContext } from "../../context/mainContext";
const SelectStatus = ({order}) => {
  const {setUpdateOrderStatus}=useMainContext()
  const handleChangeStatus =async (id, status) => {
    setUpdateOrderStatus(false)
       const res=await updateOrderStatus(id,status)
         if(res?.message){
          setUpdateOrderStatus(true)
            toast.success(res.message)
         }
  };

  return (
    <>
      <select
        onChange={(e) => handleChangeStatus(order._id, e.target.value)}
        className="h-8 bg-primary-2"
      >
        <option value="status" defaultValue hidden>
          {order?.status}
        </option>
        <option defaultValue={order?.status === "Delivered"} value="Delivered">
          Delivered
        </option>
        <option defaultValue={order?.status === "Pending"} value="Pending">
          Pending
        </option>
        <option
          defaultValue={order?.status === "Processing"}
          value="Processing"
        >
          Processing
        </option>
        <option defaultValue={order?.status === "Cancel"} value="Cancel">
          Cancel
        </option>
      </select>
    </>
  );
};

export default SelectStatus;


