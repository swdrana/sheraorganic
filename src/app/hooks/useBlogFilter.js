"use client";
import { useEffect, useState } from "react";

const useBlogFilter = (blogs) => {
  const [filterBlog, setFilterBlog] = useState(blogs);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const pageCount = Math.ceil(blogs?.length / itemsPerPage);

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Create a copy of blogs array
    if (blogs?.length === undefined) return;
    let updateBrand = [...blogs];

    // Apply additional filtering based on search text if present
    if (searchText) {
      updateBrand = updateBrand?.filter((blog) =>
        blog?.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBrand = updateBrand?.slice(startIndex, endIndex);

    setFilterBlog(currentBrand);
  }, [searchText, blogs, currentPage]);

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    handlePageChange,
    pageCount,
    filterBlog,
  };
};

export default useBlogFilter;
