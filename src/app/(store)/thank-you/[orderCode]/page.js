import ThankYou from "@/app/components/store/order/ThankYou";

const Page = ({ params, searchParams }) => {
  const { orderCode } = params;
  return (
    <>
      <ThankYou orderCode={orderCode} accessToken={searchParams?.t || ""} />
    </>
  );
};

export default Page;
