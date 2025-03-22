import DashboardContent from "@/app/components/admin/shared/DashboardContent";

const page = ({ params }) => {
  return (
    <>
      <DashboardContent attributeChildrenId={params?.id} />
    </>
  );
};

export default page;
