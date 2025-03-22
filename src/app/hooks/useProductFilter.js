"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useProductFilter = (allProducts) => {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(allProducts?.length / itemsPerPage);

  // console.log('attributes in product com',attribue)
  //handle shorting by category
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  // console.log('category......',category)
  const [shotvalue, setShotValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const sv = shotvalue?.toString().replaceAll(" ", "").toLowerCase();

  //  console.log('allProducts length',allProducts?.length)

  // Handle pagination change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    // Create a copy of allProducts array
    if (allProducts?.length === undefined) return;
    let updatedProducts = [...allProducts];

    // Filter products based on category
    if (category) {
      updatedProducts = updatedProducts?.filter(
        (product) => product?.category === category
      );
    }

    // Apply additional filtering based on search text if present
    if (searchText) {
      updatedProducts = updatedProducts?.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting based on shotvalue if present
    if (shotvalue) {
      if (sv === "popularity") {
        updatedProducts?.sort((a, b) =>
          a.numOfReviews > b.numOfReviews ? 1 : -1
        );
      } else if (sv === "a_zorder") {
        updatedProducts?.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (sv === "z_aorder") {
        updatedProducts?.sort((a, b) => (b.name > a.name ? 1 : -1));
      } else if (sv === "low_highprice") {
        updatedProducts?.sort((a, b) =>
          Number(a.prices?.originalPrice) > Number(b.prices?.originalPrice)
            ? 1
            : -1
        );
      } else if (sv === "high_lowprice") {
        updatedProducts?.sort((a, b) =>
          Number(b.prices?.originalPrice) > Number(a.prices?.originalPrice)
            ? 1
            : -1
        );
      }
    }

    // Slice the current page of products based on pagination

    // Update filtered products state

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = updatedProducts?.slice(startIndex, endIndex);

    setFilteredProducts(currentProducts);
  }, [searchText, allProducts, category, shotvalue, currentPage]);

  // handel reset filtering
  const handelResetFiltering = () => {
    setCurrentPage(0);
    setCategory("");
    setSearchText("");
    setShotValue("");
    router.refresh();
    setCurrentPage(0);
  };

  return {
    searchText,
    setSearchText,
    category,
    setCategory,
    shotvalue,
    setShotValue,
    currentPage,
    setCurrentPage,
    handlePageChange,
    handelResetFiltering,
    pageCount,
    filteredProducts,
  };
};

export default useProductFilter;
