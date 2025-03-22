"use client";
import React, { useEffect, useState } from "react";
import StaffTable from "./StaffTable";
import { useMainContext } from "../context/mainContext";
import DeleteModal2 from "../modal/DeleteModal";
import StaffDrawer from "../drawer/StaffDrawer";
import { FiSearch } from "react-icons/fi";
import useStaffFilter from "@/app/hooks/useStaffFilter";
import { getAllStaffs } from "@/app/backend/controllers/staff.controller";
import TableLoading from "../loader/TableLoading";

const Staffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { staffId, setIsOpenStaffDrawer, setStaffDetails, staffUpdate } =
    useMainContext();
  const {
    searchText,
    setSearchText,
    filterStaff,
    pageCount,
    handlePageChange,
  } = useStaffFilter(staffs);
  // console.log('staffUpdate',staffUpdate)
  const handelStaffUpdate = (item) => {
    setStaffDetails(item);
    setIsOpenStaffDrawer(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllStaffs();
      // console.log('res..in',res )
      setStaffs(res);
      setLoading(false);
    };

    fetchData();
  }, [staffUpdate]);
  return (
    <div>
      <StaffDrawer staffs={staffs} />
      <DeleteModal2 staffId={staffId} />
      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Staffs</h2>
          </div>

          <div>
            <button
              onClick={() => {
                setIsOpenStaffDrawer(true), setStaffDetails({});
              }}
              type="button"
              className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new staff
            </button>
          </div>
        </div>

        <div className=" relative my-10">
          <input
            type="text"
            placeholder="Search staffs name/email/contact-number"
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
            <TableLoading />{" "}
          </>
        ) : (
          <>
            {" "}
            <StaffTable
              staffs={filterStaff}
              handelStaffUpdate={handelStaffUpdate}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default Staffs;
