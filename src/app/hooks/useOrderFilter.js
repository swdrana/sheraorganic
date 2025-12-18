"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useOrderFilter = (allOrder) => {
  // console.log("allOrder..", allOrder);
  const router = useRouter();
  const [filterOrder, setFilterOrder] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

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

    // Sort orders by date descending (newest first)
    updateOrder.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Update page count based on filtered results
    setPageCount(Math.ceil(updateOrder.length / itemsPerPage));

    // Slice the current page of products based on pagination

    // Update filtered products state

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrder = updateOrder?.slice(startIndex, endIndex);

    setFilterOrder(currentOrder);
  }, [searchText, allOrder, status, currentPage, method, itemsPerPage]);

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
    itemsPerPage,
    setItemsPerPage,
  };
};

export default useOrderFilter;
