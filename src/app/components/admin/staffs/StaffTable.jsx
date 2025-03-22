"use client";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useMainContext } from "../context/mainContext";
import Pagination from "../shared/Pagination";
import { LiaEdit } from "react-icons/lia";

import dayjs from "dayjs";
import SwitchToggleStatus from "../form/switch/SwitchToggleStatus";

const StaffTable = ({
  staffs,
  handelStaffUpdate,pageCount,
  handlePageChange
}) => {
  const { setIsDeleteModal,setStaffId, } = useMainContext();



  return (
    <>
      

      <div className="">
      <div className="mt-8 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle bg-white py-11 px-8 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
              <thead>
                <tr className="bg-primary-2">
                 
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-dark sm:pl-6 lg:pl-8"
                  >
               
                    STAFF NAME
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                  
                    EMAIL
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                   
                    CONTACT
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                   
                    JOINING DATE
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                    
                    ROLE
                  </th>
                 
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
             
                    STATUS
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark">
                  
                    PUBLISHED
                  </th>

                
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                   
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {staffs?.map((item) => (
                  <tr key={item._id}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {/* <img src={item.image} alt="" width={40} height={40} /> */}

                    <div className="flex items-center gap-x-4">
                  <img src={item.image} alt="" className="h-8 w-8 rounded-full " />
                  <div className="truncate text-sm font-medium leading-6 ">{item?.name}</div>
                  </div>
                    </td>
                    
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item?.email}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item?.contact}</td>
                   
                   <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                    {dayjs(item.joiningDate).format("YYYY-MM-DD")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">{item?.role}</td>
                    
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                     {
                      item?.status==="show" ? <p className="text-green-300 font-bold">active</p> : <p className="text-red-400 font-bold">inactive</p>
                     }
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">

                      <SwitchToggleStatus item={item}  /> 
                    
                    </td>
                    
                    
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                      <div className="inline-flex items-center justify-center gap-2">
                      <button 
                              onClick={() => handelStaffUpdate(item)}
                              className="text-green-500 cursor-pointer mr-2 "
                            >
                              <LiaEdit /><span className="sr-only"> {item.name}</span>
                            </button>

                            <button
                             onClick={() => {
                              setIsDeleteModal(true), setStaffId(item._id.toString());
                            }}
                              className="text-brand"
                            >
                              <RiDeleteBin5Fill className=" cursor-pointer " />
                            </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
                pageCount={pageCount}
                handlePageChange={handlePageChange}
              />
            
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default StaffTable;
