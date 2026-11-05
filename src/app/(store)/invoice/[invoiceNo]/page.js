import Invoice from "@/app/components/store/invoice/Invoice";

const Page = ({ params, searchParams }) => {
  const { invoiceNo } = params;

  return (
    <>
      <Invoice invoiceNo={invoiceNo} accessToken={searchParams?.t || ""} />
    </>
  );
};

export default Page;
