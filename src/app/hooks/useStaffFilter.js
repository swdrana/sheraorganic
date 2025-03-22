"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useStaffFilter = (staffs) => {
  const router = useRouter();
  const [filterStaff, setFilterStaff] = useState(staffs);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(staffs?.length / itemsPerPage);

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Create a copy of staffs array
    if (staffs?.length === undefined) return;
    let updateStaff = [...staffs];

    // Apply additional filtering based on search text if present
    if (searchText) {
      updateStaff = updateStaff.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.email.toLowerCase().includes(searchText.toLowerCase()) ||
          product.contact.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStaff = updateStaff?.slice(startIndex, endIndex);

    setFilterStaff(currentStaff);
  }, [searchText, staffs, currentPage]);

  // handel reset filtering
  const handelResetFiltering = () => {
    setCurrentPage(0);
    setSearchText("");
    router.refresh();
  };

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    handlePageChange,
    handelResetFiltering,
    pageCount,
    filterStaff,
  };
};

export default useStaffFilter;
