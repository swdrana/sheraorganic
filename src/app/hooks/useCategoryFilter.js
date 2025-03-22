"use client";
import { useEffect, useState } from "react";
import { readyToParentAndChildrenCategory } from "./random";

const useCategoryFilter = (categories) => {
  const [searchText, setSearchText] = useState("");
  // console.log('searchText length',searchText.length)

  const [filteredCategoy, setFilteredCategory] = useState(categories);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  // Slice the current page of products based on pagination
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategory =
    searchText?.length === 0
      ? filteredCategoy.slice(startIndex, endIndex)
      : filteredCategoy?.slice(startIndex, endIndex);
  // console.log('currentCategory',currentCategory)

  const pageCount = Math.ceil(
    searchText?.length === 0
      ? filteredCategoy.length / itemsPerPage
      : filteredCategoy?.length / itemsPerPage
  );
  // console.log('filteredCategoy',filteredCategoy)

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    let updatedCategory = [...categories]; // Create a copy of attributes array

    //  console.log('update category',updatedCategory)
    // Apply additional filtering based on search text if present
    if (searchText) {
      updatedCategory = updatedCategory.filter((category) =>
        category.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Update filtered products state
    setFilteredCategory(updatedCategory);
    setCurrentPage(0);
  }, [searchText, categories]);

  return {
    currentCategory,
    pageCount,
    handlePageChange,
    searchText,
    setSearchText,
  };
};

export default useCategoryFilter;
