"use client";
import Invoice from "@/app/components/store/invoice/Invoice";

// Keep this if you need client-side features

const Page = ({ params }) => {
  const { invoiceNo } = params;

  return (
    <>
      <Invoice invoiceNo={invoiceNo} />
    </>
  );
};

export default Page;
