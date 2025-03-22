"use client";
import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars } from "react-loader-spinner";
import { useMainContext } from "../context/mainContext";
import SelectRole from "../form/selectOption/SelectRole";
import { Input } from "@windmill/react-ui";
import useStaffSubmit from "@/app/hooks/useStaffSubmit";
import Uploader from "../imageUploader/Uploader";

const StaffDrawer = ({ staffs }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    isSubmitting,
  } = useStaffSubmit(staffs);
  const { isOpenStaffDrawer, setIsOpenStaffDrawer, staffDetails } =
    useMainContext();

  return (
    <Transition.Root show={isOpenStaffDrawer} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={setIsOpenStaffDrawer}
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

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              {staffDetails?.name
                                ? `Update Staff (${staffDetails?.name})`
                                : "Add Staff"}
                            </Dialog.Title>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="relative text-gray-400 hover:text-gray-500"
                              onClick={() => setIsOpenStaffDrawer(false)}
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

                      <div className="space-y-6 py-6 sm:space-y-0  sm:py-0">
                        {/*  Image */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Image
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <Uploader
                              folder="staff"
                              imageUrl={imageUrl}
                              setImageUrl={setImageUrl}
                            />
                            {errors.name?.type === "required" && (
                              <p className="text-red-400 font-bold mt-1">
                                staff name is required
                              </p>
                            )}
                          </div>
                        </div>
                        {/*  Name */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Staff Name
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                              {...register("name", { required: true })}
                            />
                            {errors.name?.type === "required" && (
                              <p className="text-red-400 font-bold mt-1">
                                staff name is required
                              </p>
                            )}
                          </div>
                        </div>
                        {/* email */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Staff Email
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="email"
                              className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                              {...register("email", { required: true })}
                            />
                            {errors.email?.type === "required" && (
                              <p className="text-red-400 font-bold mt-1">
                                email is required
                              </p>
                            )}
                          </div>
                        </div>
                        {staffDetails?._id ? (
                          <></>
                        ) : (
                          <>
                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                  Staff Password
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="password"
                                  className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                                  {...register("password")}
                                />
                                {/* {errors.password?.type === "required" && (
                                  <p className="text-red-400 font-bold mt-1">
                                    staff password is required
                                  </p>
                                )} */}
                              </div>
                            </div>
                          </>
                        )}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Staff Contact
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="Number"
                              className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                              {...register("contact", { required: true })}
                            />
                            {errors.contact?.type === "required" && (
                              <p className="text-red-400 font-bold mt-1">
                                staff contact is required
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Joining Date
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <Input
                              onChange={(e) => setSelectedDate(e.target.value)}
                              label="Joining Date"
                              name="joiningDate"
                              value={selectedDate}
                              type="date"
                              placeholder="StaffJoiningDate"
                              className="w-full rounded-lg bg-white bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Staf role
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <SelectRole
                              register={register}
                              label="Role"
                              name="role"
                            />
                            {errors.role?.type === "required" && (
                              <p className="text-red-400 font-bold mt-1">
                                Staff role is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      {isSubmitting && (
                        <>
                          <Bars
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperclassName=""
                            visible={true}
                          />
                        </>
                      )}
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setIsOpenStaffDrawer(false)}
                        >
                          Cancel
                        </button>
                        <button
                          // disabled={submitting}
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {staffDetails?._id ? (
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
export default StaffDrawer;
