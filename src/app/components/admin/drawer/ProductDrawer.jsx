"use client";

import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars } from "react-loader-spinner";
import { MultiSelect } from "react-multi-select-component";
import SwitchToggleForCombination from "../form/switch/SwitchToggleForCombination";
import ActiveButton from "../form/buttons/ActiveButton";
import useProductSubmit from "@/app/hooks/useProductSubmit";
import { useMainContext } from "../context/mainContext";
import Link from "next/link";
import AttributeOptionTwo from "../attributes/AttributeOptionTwo";
import AttributeListTable2 from "../attributes/AttributeListTable2";
import Uploader from "../imageUploader/Uploader";
import SwitchToggle from "../form/switch/SwitchToggle";
import usebrands from "../featch/brands";
import DescriptionInput from "../form/input/DescriptionInput";

const ProductDrawer = ({ attribue, categoriesList }) => {
  const {
    values,
    language,
    register,
    onSubmit,
    errors,
    setValues,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    tapValue,
    setTapValue,
    handleSkuBarcode,
    handleProductTap,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectInlineImage,
    handleGenerateCombination,
    isSubmitting,
    brand,
    setBrand,
    flashSaleProduct,
    setFlashSaleProduct,
    category,
    setCategory,
    productDes,
    setProductDes,
  } = useProductSubmit(attribue);
  // use state value

  const { isProductDrawerOpen, setIsProductDrawerOpen, productDetails } =
    useMainContext();

  const { brands } = usebrands();

  return (
    <Transition.Root show={isProductDrawerOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100] "
        onClose={setIsProductDrawerOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex w-[85%] pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    {tapValue === "Basic Info" && (
                      <>
                        <div className="flex-1">
                          {/* Header */}

                          <div className="sticky top-0 bg-gray-50 relative z-10">
                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                              <div className="flex items-start justify-between space-x-3">
                                <div className="space-y-1">
                                  <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                    {productDetails?.name
                                      ? `Update product (${productDetails?.name})`
                                      : "Add Product"}
                                  </Dialog.Title>
                                </div>
                                <div className="flex h-7 items-center">
                                  <button
                                    type="button"
                                    className="relative text-gray-400 hover:text-gray-500"
                                    onClick={() =>
                                      setIsProductDrawerOpen(false)
                                    }
                                  >
                                    <span className="absolute -inset-2.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                              <SwitchToggleForCombination
                                product
                                handleProcess={handleIsCombination}
                                processOption={isCombination}
                              />

                              <ul className="flex flex-wrap -mb-px mt-10">
                                <li className="mr-2">
                                  <ActiveButton
                                    tapValue={tapValue}
                                    activeValue="Basic Info"
                                    handleProductTap={handleProductTap}
                                  />
                                </li>

                                {isCombination && (
                                  <li className="mr-2">
                                    <ActiveButton
                                      tapValue={tapValue}
                                      activeValue="Combination"
                                      handleProductTap={handleProductTap}
                                    />
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* Divider container */}
                          <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                            {/* Product Name */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Product Name
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  // setValue={}
                                  // defaultValue={productDetails ? productDetails?.name : ""}
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("name", { required: true })}
                                />
                                {errors.name?.type === "required" && (
                                  <p className="text-red-400 font-bold mt-1">
                                    Product name is required
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Project description */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Description
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <DescriptionInput
                                  productDes={productDes}
                                  setProductDes={setProductDes}
                                  productDetails={productDetails}
                                />
                              </div>

                              {/* <div className="sm:col-span-2">
                                <textarea
                                  // defaultValue={productDetails?.des}
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  {...register("description", {
                                    required: true,
                                  })}
                                />
                                {errors.description?.type === "required" && (
                                  <p className="text-red-400 font-bold mt-1">
                                    Product description is required
                                  </p>
                                )}
                              </div> */}
                            </div>
                            {/* Video url */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Video Url
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("videoUrl", {
                                    required: true,
                                  })}
                                />
                                {errors?.videoUrl?.type === "required" && (
                                  <p className="text-red-400 font-bold mt-1">
                                    video url is required
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                Image
                              </label>
                              <div className="">
                                <Uploader
                                  product
                                  folder="product"
                                  imageUrl={imageUrl}
                                  setImageUrl={setImageUrl}
                                />
                              </div>
                            </div>
                            {/* Project Sku */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Product SKU
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  // setValue={}
                                  // defaultValue={productDetails ? productDetails?.name : ""}
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("sku")}
                                />
                              </div>
                            </div>

                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Product Barcode
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  // setValue={}
                                  // defaultValue={productDetails ? productDetails?.name : ""}
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("barcode")}
                                />
                              </div>
                            </div>
                            {/* category */}

                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Category
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <div>
                                  <select
                                    value={category}
                                    onChange={(e) =>
                                      setCategory(e.target.value)
                                    }
                                    className="mt-2 w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  >
                                    <option hidden value="">
                                      Select a Category
                                    </option>
                                    {categoriesList?.map((category, i) => (
                                      <option key={i}>{category?.name}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Brand*/}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Brand
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <div>
                                  <select
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="mt-2 w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  >
                                    <option hidden value="">
                                      Select a brand
                                    </option>
                                    {brands?.map((brand, i) => (
                                      <option key={i + 10}>
                                        {brand?.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Flash sale product*/}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  weekly best deals Product ?
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <SwitchToggle
                                  handleProcess={setFlashSaleProduct}
                                  processOption={flashSaleProduct}
                                />
                              </div>
                            </div>

                            {/* product sale  price */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Product Price
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  disabled={isCombination}
                                  // defaultValue={productDetails?.price}
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("originalPrice", {
                                    required: true,
                                  })}
                                />
                                {errors.originalPrice?.type === "required" && (
                                  <p className="text-red-400 font-bold mt-1">
                                    Product price is required
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* product  price */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Sale Price
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  disabled={isCombination}
                                  // defaultValue={productDetails?.price}
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("price", { required: true })}
                                />
                                {errors.price?.type === "required" && (
                                  <p className="text-red-400 font-bold mt-1">
                                    Product price is required
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* product Quantity */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Quantity
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  // defaultValue={productDetails?.price}
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("stock")}
                                />
                              </div>
                            </div>
                            {/* product slug */}
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Product slug
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  // setValue={}
                                  // defaultValue={productDetails ? productDetails?.name : ""}
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("slug")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                      </>
                    )}

                    {tapValue === "Combination" && isCombination && (
                      <>
                        <div className="sticky top-0 bg-gray-50 relative z-10">
                          <div className="bg-gray-50 px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between space-x-3">
                              <div className="space-y-1">
                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                  {productDetails?.name
                                    ? `Update product (${productDetails?.name})`
                                    : "Add Product"}
                                </Dialog.Title>
                              </div>
                              <div className="flex h-7 items-center">
                                <button
                                  type="button"
                                  className="relative text-gray-400 hover:text-gray-500"
                                  onClick={() => setIsProductDrawerOpen(false)}
                                >
                                  <span className="absolute -inset-2.5" />
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                            <SwitchToggleForCombination
                              product
                              handleProcess={handleIsCombination}
                              processOption={isCombination}
                            />

                            <ul className="flex flex-wrap -mb-px mt-10 sm:mt-0">
                              <li className="mr-2">
                                <ActiveButton
                                  tapValue={tapValue}
                                  activeValue="Basic Info"
                                  handleProductTap={handleProductTap}
                                />
                              </li>

                              {isCombination && (
                                <li className="mr-2">
                                  <ActiveButton
                                    tapValue={tapValue}
                                    activeValue="Combination"
                                    handleProductTap={handleProductTap}
                                  />
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                        {attribue.length < 1 ? (
                          <div
                            className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
                            role="alert"
                          >
                            <div className="flex">
                              <div className="py-1">
                                <svg
                                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm">
                                  AddCombinationsDiscription
                                  <Link to="/attributes" className="font-bold">
                                    AttributesFeatures
                                  </Link>
                                  AddCombinationsDiscriptionTwo
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6">
                            {/* <h4 className="mb-4 font-semibold text-lg">Variants</h4> */}
                            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
                              <MultiSelect
                                options={attTitle}
                                value={attributes}
                                onChange={(v) => handleAddAtt(v)}
                                labelledBy="Select"
                              />

                              {attributes?.map((attribute, i) => (
                                <div key={attribute._id}>
                                  <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200">
                                    {"Select"}
                                    attribute?.title
                                  </div>

                                  <AttributeOptionTwo
                                    id={i + 1}
                                    values={values}
                                    lang={language}
                                    attributes={attribute}
                                    setValues={setValues}
                                  />
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-end mb-6">
                              {attributes?.length > 0 && (
                                <button
                                  onClick={handleGenerateCombination}
                                  type="button"
                                  className="mx-2 bg-brand px-4 py-2 text-white rounded-md"
                                >
                                  <span className="text-xs">
                                    Generate Variants
                                  </span>
                                </button>
                              )}

                              {variantTitle.length > 0 && (
                                <div
                                  onClick={handleClearVariant}
                                  className="mx-2 cursor-pointer"
                                >
                                  <span className="text-xs">
                                    Clear Variants
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {tapValue === "Combination" &&
                      isCombination &&
                      variantTitle.length > 0 && (
                        <div className="px-6 overflow-x-auto">
                          {/* {variants?.length >= 0 && ( */}
                          {isCombination && (
                            <div className="mt-8 flow-root">
                              <div className="overflow-x-auto">
                                <div className="inline-block min-w-full py-2 align-middle">
                                  <table className="min-w-full divide-y divide-gray-300 border">
                                    <thead>
                                      <tr>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Image
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Combination
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Sku
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Barcode
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Price
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Sale Price
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          Quantity
                                        </th>
                                        <th
                                          scope="col"
                                          className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900"
                                        >
                                          ACTION
                                        </th>
                                      </tr>
                                    </thead>
                                    <AttributeListTable2
                                      lang={language}
                                      variants={variants}
                                      setTapValue={setTapValue}
                                      variantTitle={variantTitle}
                                      handleSkuBarcode={handleSkuBarcode}
                                      handleEditVariant={handleEditVariant}
                                      handleRemoveVariant={handleRemoveVariant}
                                      handleQuantityPrice={handleQuantityPrice}
                                      handleSelectInlineImage={
                                        handleSelectInlineImage
                                      }
                                    />
                                  </table>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    <div className="flex-shrink-0 border-t border-gray-200  sticky bottom-0 bg-gray-50   ">
                      {isSubmitting && (
                        <>
                          <Bars
                            height="50"
                            width="50"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperclassName=""
                            visible={true}
                          />
                        </>
                      )}
                      <div className="flex justify-end space-x-3 right-14 py-4 px-5">
                        <button
                          type="button"
                          className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setIsProductDrawerOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {productDetails?._id ? (
                            <span>Update</span>
                          ) : (
                            <span>Create</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ProductDrawer;
