// import { getAllOrders } from "@/app/backend/controllers/order.controller";
// import DashboardContent from "@/app/components/admin/shared/DashboardContent";
// const page = async () => {
// const orders=await getAllOrders()
//   return (
//     <>
//       <DashboardContent orders={orders} />
//     </>
//   );
// };

// export default page;

"use client";
import DashboardContent from "@/app/components/admin/shared/DashboardContent";
const page = () => {
  return (
    <>
      <DashboardContent />
    </>
  );
};

export default page;
