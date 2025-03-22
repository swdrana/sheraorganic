"use client";

import { useEffect, useState } from "react";

const useAttributeFilter = (attributes) => {
  const [searchText, setSearchText] = useState("");
  const [filteredAttributes, setFilteredAttributes] = useState(attributes);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!Array.isArray(attributes)) return;

    const updatedAttributes = searchText
      ? attributes?.filter(
          (attribute) =>
            attribute.title.toLowerCase().includes(searchText.toLowerCase()) ||
            attribute.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : attributes;

    setFilteredAttributes(updatedAttributes);
    setCurrentPage(0);
  }, [searchText, attributes]);

  const pageCount = Math.ceil(filteredAttributes?.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentAttributes = filteredAttributes?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    handlePageChange,
    pageCount,
    filteredAttributes,
    currentAttributes,
  };
};

export default useAttributeFilter;
