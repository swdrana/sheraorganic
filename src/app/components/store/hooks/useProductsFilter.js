"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const useProductFilter = (allProducts, categoryOrBrand) => {
  const router = useRouter();
  // console.log("categoryOrBrand..", categoryOrBrand);

  // State for filtering, sorting, and pagination
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(10000);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchText, setSearchText] = useState("");
  // const [category, setCategory] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // console.log("filteredProducts..", filteredProducts);

  // Derived state for sorting and filtering
  const normalizedSortValue = sortValue?.replaceAll(" ", "").toLowerCase();

  // Handle page changes for pagination
  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  // Increment and decrement items per page
  const incrementItems = () => setItemsPerPage((prev) => prev + 1);
  const decrementItems = () => setItemsPerPage((prev) => Math.max(1, prev - 1));

  // Memoized filtering and sorting logic to improve performance
  const sortedAndFilteredProducts = useMemo(() => {
    if (!Array.isArray(allProducts) || allProducts.length === 0) return [];

    let updatedProducts = [...allProducts];

    // Filter by category
    if (categoryOrBrand) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product?.category?.replace(/\s+/g, "").toLowerCase() ===
            categoryOrBrand ||
          product?.brand?.replace(/\s+/g, "").toLowerCase() ===
            categoryOrBrand ||
          product?.name.toLowerCase().includes(categoryOrBrand.toLowerCase())
      );
    }

    // Filter by price range
    updatedProducts = updatedProducts.filter(
      (product) =>
        product?.prices?.price >= filterMinPrice &&
        product?.prices?.price <= filterMaxPrice
    );

    // Filter by search text
    if (searchText) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply sorting
    if (normalizedSortValue) {
      if (normalizedSortValue === "popularity") {
        updatedProducts.sort((a, b) => b.numOfReviews - a.numOfReviews);
      } else if (normalizedSortValue === "a_zorder") {
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (normalizedSortValue === "z_aorder") {
        updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
      } else if (normalizedSortValue === "low_highprice") {
        updatedProducts.sort(
          (a, b) =>
            Number(a.prices?.originalPrice) - Number(b.prices?.originalPrice)
        );
      } else if (normalizedSortValue === "high_lowprice") {
        updatedProducts.sort(
          (a, b) =>
            Number(b.prices?.originalPrice) - Number(a.prices?.originalPrice)
        );
      }
    }

    return updatedProducts;
  }, [
    allProducts,
    categoryOrBrand,
    filterMinPrice,
    filterMaxPrice,
    searchText,
    normalizedSortValue,
  ]);

  // Paginate the filtered products and update pagination based on the filtered result
  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return sortedAndFilteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [currentPage, itemsPerPage, sortedAndFilteredProducts]);

  // console.log("sortedAndFilteredProducts..", sortedAndFilteredProducts);
  // console.log("paginatedProducts", paginatedProducts);

  // Calculate page count based on the filtered products
  const pageCount = useMemo(() => {
    return Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);
  }, [sortedAndFilteredProducts.length, itemsPerPage]);

  // Set filtered products when changes occur
  useEffect(() => {
    setFilteredProducts(paginatedProducts);
  }, [paginatedProducts]);

  // Reset the current page to 0 when filters are applied
  useEffect(() => {
    setCurrentPage(0);
  }, [categoryOrBrand, filterMinPrice, filterMaxPrice, searchText, sortValue]);

  // Reset all filters
  const resetFilters = () => {
    setSearchText("");
    setSortValue("");
    setFilterMinPrice(0);
    setFilterMaxPrice(10000);
    setCurrentPage(0);
    router.refresh(); // Refresh the page if necessary
  };

  return {
    searchText,
    setSearchText,
    sortValue,
    setSortValue,
    currentPage,
    handlePageChange,
    resetFilters,
    pageCount,
    filteredProducts,
    itemsPerPage,
    incrementItems,
    decrementItems,
    filterMinPrice,
    setFilterMinPrice,
    filterMaxPrice,
    setFilterMaxPrice,
    sortedAndFilteredProducts,
  };
};

export default useProductFilter;

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const useProductFilter = (allProducts) => {
//   const router = useRouter();
//   const [filteredProducts, setFilteredProducts] = useState(allProducts);
//   const [filterMinPrice, setFilterMinPrice] = useState(0);
//   const [filterMaxPrice, setFilterMaxPrice] = useState(10000);
//   const [itemsPerPage, setItemPerPage] = useState(5);
//   const pageCount = Math.ceil(allProducts?.length / itemsPerPage);

//   // console.log('attributes in product com',attribue)
//   //handle shorting by category
//   const [searchText, setSearchText] = useState("");
//   const [category, setCategory] = useState("");
//   // console.log('category......',category)
//   const [shotvalue, setShotValue] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const sv = shotvalue?.toString().replaceAll(" ", "").toLowerCase();

//   //  console.log('allProducts length',allProducts?.length)

//   // Handle pagination change
//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const incrementItems = () => {
//     setItemPerPage((prev) => prev + 1);
//   };

//   // Handler for decrementing
//   const decrementItems = () => {
//     setItemPerPage((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent negative or zero
//   };

//   useEffect(() => {
//     // Create a copy of allProducts array
//     if (!Array.isArray(allProducts) || !allProducts.length) return;
//     let updatedProducts = [...allProducts];

//     // Filter products based on category
//     if (category) {
//       updatedProducts = updatedProducts?.filter(
//         (product) => product?.category === category
//       );
//     }

//     // filtering on price range
//     console.log("product..s", updatedProducts);

//     updatedProducts = updatedProducts.filter(
//       (product) =>
//         product.prices?.price >= filterMinPrice &&
//         product.prices.price <= filterMaxPrice
//     );

//     console.log("updatedProducts...............", updatedProducts);

//     // Apply additional filtering based on search text if present
//     if (searchText) {
//       updatedProducts = updatedProducts?.filter((product) =>
//         product.name.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }

//     // Apply sorting based on shotvalue if present
//     if (shotvalue) {
//       if (sv === "popularity") {
//         updatedProducts?.sort((a, b) =>
//           a.numOfReviews > b.numOfReviews ? 1 : -1
//         );
//       } else if (sv === "a_zorder") {
//         updatedProducts?.sort((a, b) => (a.name > b.name ? 1 : -1));
//       } else if (sv === "z_aorder") {
//         updatedProducts?.sort((a, b) => (b.name > a.name ? 1 : -1));
//       } else if (sv === "low_highprice") {
//         updatedProducts?.sort((a, b) =>
//           Number(a.prices?.originalPrice) > Number(b.prices?.originalPrice)
//             ? 1
//             : -1
//         );
//       } else if (sv === "high_lowprice") {
//         updatedProducts?.sort((a, b) =>
//           Number(b.prices?.originalPrice) > Number(a.prices?.originalPrice)
//             ? 1
//             : -1
//         );
//       }
//     }

//     // Slice the current page of products based on pagination

//     // Update filtered products state

//     const startIndex = currentPage * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentProducts = updatedProducts?.slice(startIndex, endIndex);

//     setFilteredProducts(currentProducts);
//     console.log("filter product...");
//   }, [
//     searchText,
//     allProducts,
//     category,
//     shotvalue,
//     currentPage,
//     itemsPerPage,
//     filterMinPrice,
//     filterMaxPrice,
//   ]);

//   // handel reset filtering
//   const handelResetFiltering = () => {
//     setCurrentPage(0);
//     setCategory("");
//     setSearchText("");
//     setShotValue("");
//     router.refresh();
//     setCurrentPage(0);
//   };

//   return {
//     searchText,
//     setSearchText,
//     category,
//     setCategory,
//     shotvalue,
//     setShotValue,
//     currentPage,
//     setCurrentPage,
//     handlePageChange,
//     handelResetFiltering,
//     pageCount,
//     filteredProducts,
//     itemsPerPage,
//     setItemPerPage,
//     incrementItems,
//     decrementItems,
//     filterMinPrice,
//     setFilterMinPrice,
//     filterMaxPrice,
//     setFilterMaxPrice,
//   };
// };

// export default useProductFilter;
