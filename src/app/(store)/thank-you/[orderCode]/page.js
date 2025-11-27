"use client";
import ThankYou from "@/app/components/store/order/ThankYou";

const Page = ({ params }) => {
  const { orderCode } = params;
  return (
    <>
      <ThankYou orderCode={orderCode} />
    </>
  );
};

export default Page;