"use client";
import React, { useEffect, useState } from "react";
import { useMainContext } from "../context/mainContext";
import DeleteModal from "../modal/DeleteModal";
import { FiSearch } from "react-icons/fi";

import CustomerTable from "./CustomerTable";
import useCustomerFilter from "@/app/hooks/useCustomerFilter";
import { getAllUser } from "@/app/backend/controllers/customer.controller";
import LoadingSkeleton from "../loader/TableLoading";

const Customers = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setIsOpenCustomerDrawer, customerId, setCustomerDetails } =
    useMainContext();

  const {
    searchText,
    setSearchText,
    filterCustomer,
    pageCount,
    handlePageChange,
  } = useCustomerFilter(users);

  const handelCustomerUpdate = (item) => {
    setCustomerDetails(item);
    setIsOpenCustomerDrawer(true);
  };
  // console.log('filterCustomer..',filterCustomer)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUser();
      // console.log("res..in", res);
      setUser(res?.users);
      setLoading(false);
    };

    fetchData();
  }, []);

  // console.log("users..", users);
  return (
    <div>
      {/* <CustomerDrawer
        
      /> */}
      <DeleteModal customerId={customerId} />
      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Customers</h2>
          </div>
        </div>

        <div className=" relative my-10">
          <input
            type="text"
            placeholder="Search customer-name/email/contact-number"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-md border-0 py-2 text-gray-900  shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
          />
          <p className="absolute top-3 left-3">
            <FiSearch size={20} />
          </p>
        </div>

        {loading ? (
          <>
            {" "}
            <LoadingSkeleton />{" "}
          </>
        ) : (
          <CustomerTable
            users={filterCustomer}
            handelCustomerUpdate={handelCustomerUpdate}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
};

export default Customers;
