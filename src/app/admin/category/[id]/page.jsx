import DashboardContent from "@/app/components/admin/shared/DashboardContent";

const page = ({ params }) => {
  return (
    <>
      <DashboardContent categoryId={params.id} />
    </>
  );
};

export default page;
