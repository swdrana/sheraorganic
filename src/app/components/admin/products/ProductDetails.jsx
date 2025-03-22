"use client";
import { Table, TableCell, TableHeader } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import AttributeList from "../attributes/AttributeList";

import { useMainContext } from "../context/mainContext";
import ProductDrawer from "../drawer/ProductDrawer";
import { getAllCategories } from "@/app/backend/controllers/category.controller";
import { getAllProducts } from "@/app/backend/controllers/product.controller";
import { getAllAttributes } from "@/app/backend/controllers/attribute.controller";
import Loading from "../loader/Loading";

const ProductDetails = ({ productId }) => {
  const {
    setIsProductDrawerOpen,
    setProductDetails,
    updateCategory,
    updateProduct,
    updateAttribute,
  } = useMainContext();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [variantTitle, setVariantTitle] = useState([]);

  const productDetails =
    products && productId
      ? products.find((product) => product?._id === productId)
      : null;

  useEffect(() => {
    if (productDetails?.variants) {
      const res = Object.keys(Object.assign({}, ...productDetails.variants));
      const varTitle = attributes?.filter((att) => res.includes(att._id));
      setVariantTitle(varTitle);
    }
  }, [productDetails, attributes]);

  //  console.log('productDetails',productDetails)

  useEffect(() => {
    const fetchData = async () => {
      const [categoryRes, productRes, attributeRes] = await Promise.all([
        getAllCategories(),
        getAllProducts(),
        getAllAttributes(),
      ]);
      setCategories(categoryRes);
      setProducts(productRes);
      setAttributes(attributeRes);
      setLoading(false);
    };

    fetchData();
  }, [updateCategory, updateProduct, updateAttribute]);

  return (
    <>
      <ProductDrawer
        products={products}
        attribue={attributes}
        categoriesList={categories}
      />
      <div className="">
        <div className="bg-white px-10  py-10 sm:py-16 rounded-lg">
          <h2 className="text-lg font-semibold mb-5">Products Details</h2>
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
              <img
                src={productDetails?.image[0]}
                alt="product"
                className="h-64 w-64"
              />
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  Status:{" "}
                  <span className="text-brand">This product Showing</span>
                </p>
                <h2 className="text-dark font-semibold text-lg md:text-xl lg:text-2xl">
                  {productDetails?.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  QUANTITY: {productDetails?.stock}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-dark font-bold text-2xl">
                    €{productDetails?.prices?.price}
                  </h4>
                  {productDetails?.skock >= 0 ? (
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-emerald-600 bg-emerald-100">
                      {" "}
                      <span className="font-bold">In Stock</span>
                    </span>
                  ) : (
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-600 bg-emerald-100">
                      {" "}
                      <span className="font-bold">Stock out</span>
                    </span>
                  )}
                </div>
                <p className="text-sm leading-6 text-gray-500 md:leading-7 max-w-[100ch] mb-2">
                  {productDetails.description}
                </p>
                <p className="font-semibold py-1 text-gray-500 text-sm">
                  <span className="text-gray-700">Category: </span>{" "}
                  {productDetails?.category?.name}{" "}
                </p>
                {/* <div className="flex flex-wrap mt-2">
                      <span className="bg-gray-200 mr-2 border-0 text-gray-500 cursor-pointer rounded-full inline-flex items-center justify-center px-3 py-1 text-sm font-medium mt-2">premium-shirt</span>
                      <span className="bg-gray-200 mr-2 border-0 text-gray-500 cursor-pointer rounded-full inline-flex items-center justify-center px-3 py-1 text-sm font-medium mt-2">t-shirt</span>
                      <span className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-3 py-1 text-sm font-medium cursor-pointer mt-2">new-t-shirt</span>
                    </div> */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setIsProductDrawerOpen(true),
                        setProductDetails(productDetails);
                    }}
                    className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-brand border border-transparent"
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!loading && (
        <>
          {" "}
          {productDetails?.variants?.length !== 0 && (
            <div className="py-8">
              <h1 className="mb-6">Product Variant List</h1>
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>SR</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Combination</TableCell>
                    <TableCell>Sku</TableCell>
                    <TableCell>Barcode</TableCell>
                    <TableCell>OrginalPrice</TableCell>
                    <TableCell>SalePrice</TableCell>
                    <TableCell>Quantity</TableCell>
                  </tr>
                </TableHeader>
                <AttributeList
                  variants={productDetails?.variants}
                  variantTitle={variantTitle}
                />
              </Table>
            </div>
          )}{" "}
        </>
      )}
    </>
  );
};

export default ProductDetails;
