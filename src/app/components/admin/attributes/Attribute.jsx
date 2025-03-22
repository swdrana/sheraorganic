"use client";
import React, { useEffect, useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import AttributeTable from "./AttributeTable";
import AttributesDrawer from "../drawer/AttributesDrawer";
import { FiSearch } from "react-icons/fi";
import { useMainContext } from "../context/mainContext";
import useAttributeFilter from "@/app/hooks/useAttributeFilter";
import { getAllAttributes } from "@/app/backend/controllers/attribute.controller";
import TableLoading from "../loader/TableLoading";

const Attribute =  () => {
  const [attributes,setAttributes]=useState([])
  const [loading,setLoading]=useState(true)
  const { attributeId, setAttributeDetails, setIsOpenAttributeDrawer,updateAttribute } =
    useMainContext();
  const {
    searchText,
    setSearchText,
    handlePageChange,
    pageCount,
    currentAttributes,
  } = useAttributeFilter(attributes);

  useEffect(() => {
    const fetchData = async () => {
    const  res = await getAllAttributes()
    // console.log('res..in',res )
    setAttributes(res)
      setLoading(false)
    };

    fetchData();
  }, [updateAttribute]);

  return (
    <>
      <AttributesDrawer
      />
      <DeleteModal attributeId={attributeId} />

      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Attributes</h2>
          </div>

          <div>
            <button
              onClick={() => {
                setIsOpenAttributeDrawer(true), setAttributeDetails({});
              }}
              type="button"
              className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Attribute
            </button>
          </div>
        </div>

        <div className=" relative my-10">
          <input
            type="text"
            placeholder="Search attribute"
            value={searchText}
            // onKeyPress={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-md border-0 py-2 text-gray-900  shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
          />
          <p className="absolute top-3 left-3">
            <FiSearch size={20} />
          </p>
        </div>

        {
          loading ? <> <TableLoading/> </> : <AttributeTable
          attributes={currentAttributes}
          pageCount={pageCount}
          handlePageChange={handlePageChange}
        />
        }
      </section>
    </>
  );
};

export default Attribute;
