"use client";
import React from "react";
import { Fragment } from "react";
import { Dialog, Switch } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars } from "react-loader-spinner";

import { Transition } from "@headlessui/react";
import { useMainContext } from "../context/mainContext";

import useChildrenAttributeSubmit from "@/app/hooks/useChilldrenAttributeSubmit";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChildAttributeDrawer = ({ attributeChildrenId }) => {
  // console.log('attributeChildrenId in chiild dreaw',attributeChildrenId)

  const {
    openChildAttributeDrawer,
    setOpenChildAttributeDrawer,
    singleVariant,
  } = useMainContext();

  const {
    handelChildrenAttributeAddUpdate,
    handleSubmit,
    register,
    errors,
    submitting,
    status,
    setStatus,
  } = useChildrenAttributeSubmit(attributeChildrenId);

  return (
    <Transition.Root show={openChildAttributeDrawer} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={setOpenChildAttributeDrawer}
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
                    onSubmit={handleSubmit(handelChildrenAttributeAddUpdate)}
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              {singleVariant?._id
                                ? `Update attribute`
                                : "Add Attribute value"}
                            </Dialog.Title>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="relative text-gray-400 hover:text-gray-500"
                              onClick={() => setOpenChildAttributeDrawer(false)}
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

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Display name */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Display Name
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              // setValue={}
                              // defaultValue={attributeDetails ? attributeDetails?.name : ""}
                              className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
                              {...register("name", { required: true })}
                            />
                            {errors.name?.type === "required" && (
                              <p className="text-red-400 font-bold mt-1 ">
                                display name is required
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                              Published
                            </label>
                          </div>
                          <Switch
                            checked={status === "show"}
                            // onChange={setEnabled}
                            onChange={() => {
                              setStatus((prevStatus) =>
                                prevStatus === "show" ? "hide" : "show"
                              );
                            }}
                            className={classNames(
                              status === "show"
                                ? "bg-secondary"
                                : "bg-gray-200",
                              "relative inline-flex h-3 w-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-2"
                            )}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                status === "show"
                                  ? "translate-x-[14px]"
                                  : "translate-x-[2px]",
                                "pointer-events-none inline-block h-2 w-2 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out absolute top-[2px]"
                              )}
                            />
                          </Switch>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      {submitting && (
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
                          onClick={() => setOpenChildAttributeDrawer(false)}
                        >
                          Cancel
                        </button>
                        <button
                          disabled={submitting}
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                          {singleVariant?._id ? (
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
export default ChildAttributeDrawer;
