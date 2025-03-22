"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useCustomerFilter = (users) => {
  // console.log("users...", users);
  const router = useRouter();
  const [filterCustomer, setFilterCustomer] = useState(users);
  const [searchText, setSearchText] = useState("");
  // console.log("searchText", searchText);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(
    Math.ceil(users?.length / itemsPerPage)
  );

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Create a copy of users array
    if (users?.length === undefined) return;
    let updateCustomer = [...users];

    // Apply additional filtering based on search text if present
    if (searchText) {
      updateCustomer = updateCustomer.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Update page count based on filtered results
    setPageCount(Math.ceil(updateCustomer.length / itemsPerPage));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomer = updateCustomer.slice(startIndex, endIndex);

    setFilterCustomer(currentCustomer);
  }, [searchText, users, currentPage, itemsPerPage]);

  useEffect(() => {
    // Reset to the first page when searchText changes
    setCurrentPage(0);
  }, [searchText]);

  // Handle reset filtering
  const handleResetFiltering = () => {
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
    handleResetFiltering,
    pageCount,
    filterCustomer,
  };
};

export default useCustomerFilter;
