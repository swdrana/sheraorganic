"use client";
import { useEffect, useState } from "react";

const useBrandFilter = (Brands) => {
  const [filterBrand, setFilterBrand] = useState(Brands);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const pageCount = Math.ceil(Brands?.length / itemsPerPage);

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Create a copy of Brands array
    if (Brands?.length === undefined) return;
    let updateBrand = [...Brands];

    // Apply additional filtering based on search text if present
    if (searchText) {
      updateBrand = updateBrand?.filter((Brand) =>
        Brand.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBrand = updateBrand?.slice(startIndex, endIndex);

    setFilterBrand(currentBrand);
  }, [searchText, Brands, currentPage]);

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    handlePageChange,
    pageCount,
    filterBrand,
  };
};

export default useBrandFilter;
