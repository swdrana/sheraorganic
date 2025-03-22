"use client";

import DashboardContent from "@/app/components/admin/shared/DashboardContent";

// Keep this if you need client-side features

const Page = ({ params }) => {
  const { id } = params;

  return (
    <>
      <DashboardContent userId={id} />
    </>
  );
};

export default Page;
