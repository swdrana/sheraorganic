import DashboardContent from "@/app/components/admin/shared/DashboardContent";

const page = ({ params }) => {
  return (
    <>
      <DashboardContent productId={params?.id} />
    </>
  );
};

export default page;
