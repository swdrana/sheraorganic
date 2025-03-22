"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useOrderFilter = (allOrder) => {
  // console.log("allOrder..", allOrder);
  const router = useRouter();
  const [filterOrder, setFilterOrder] = useState(allOrder);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(allOrder?.length / itemsPerPage);

  // console.log('attributes in product com',attribue)
  //handle shorting by category
  const [searchText, setSearchText] = useState("");

  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Create a copy of allOrder array
    if (allOrder?.length === undefined) return;
    let updateOrder = [...allOrder];

    // Filter order based on status
    if (method) {
      updateOrder = updateOrder.filter(
        (order) => order?.paymentMethod.toLowerCase() === method.toLowerCase()
      );
    }

    // Filter order based on status
    if (status) {
      updateOrder = updateOrder.filter(
        (order) => order?.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Apply additional filtering based on search text if present
    if (searchText) {
      updateOrder = updateOrder.filter((order) =>
        order?.user_info?.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Slice the current page of products based on pagination

    // Update filtered products state

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrder = updateOrder?.slice(startIndex, endIndex);

    setFilterOrder(currentOrder);
  }, [searchText, allOrder, status, currentPage, method]);

  // handel reset filtering
  const handelResetFiltering = () => {
    setCurrentPage(0);
    setSearchText("");
    setStatus("");
    setMethod("");
    router.refresh();
    setCurrentPage(0);
  };

  return {
    searchText,
    setSearchText,
    status,
    setStatus,
    currentPage,
    setCurrentPage,
    handlePageChange,
    handelResetFiltering,
    pageCount,
    filterOrder,
    method,
    setMethod,
  };
};

export default useOrderFilter;
