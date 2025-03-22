"use client";

import DashboardContent from "@/app/components/admin/shared/DashboardContent";

// Keep this if you need client-side features

const Page = ({ params }) => {
  const { code } = params;

  return (
    <>
      <DashboardContent orderCode={code} />
    </>
  );
};

export default Page;
