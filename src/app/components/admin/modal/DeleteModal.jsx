"use client";

import { deleteChildAttribute } from "@/app/backend/actions/attribute.action";
import { deleteCategoryById } from "@/app/backend/actions/category.action";
import { deleteAttribute } from "@/app/backend/controllers/attribute.controller";
import { deleteBrand } from "@/app/backend/controllers/brand.controller";
import { deleteCoupon } from "@/app/backend/controllers/coupon.controller";
import { deleteProduct } from "@/app/backend/controllers/product.controller";
import { deleteStaff } from "@/app/backend/controllers/staff.controller";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { deleteBlog } from "../../../backend/controllers/blog.controller";
import { useMainContext } from "../context/mainContext";
import Loading from "../loader/Loading";

const DeleteModal2 = ({
  productId,
  categoryId,
  // staffId,
  couponId,
  attributeId,
  attributeChildrenId,
  variantId,
  brandId,
  blogId,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const {
    staffId,
    isDeleteModal,
    setIsDeleteModal,
    setChildCategoryUpdate,
    setStaffUpdate,
    staffUpdate,
    setUpdateCoupon,
    setUpdateProduct,
    setUpdateAttribute,
    setUpdateCategory,
    setBrandUpdate,
    setBlogUpdate,
  } = useMainContext();
  const cancelButtonRef = useRef(null);
  // console.log(staffId,'staffId')
  // console.log('attributeId....',attributeId)
  // console.log('id, id-2',attributeChildrenId , variantId )
  //  console.log('categoryId....',categoryId)
  const handelDelete = async () => {
    //delete categroy
    if (categoryId !== undefined) {
      setUpdateCategory(false);
      const res = await deleteCategoryById(categoryId);
      // console.log("res in delete modal", res);
      setSubmitting(true);
      if (res) {
        toast.success(`${res?.message}` || "category delete successfully");
        setIsDeleteModal(false);
        setUpdateCategory(true);
        setChildCategoryUpdate(true);
        setSubmitting(false);
      } else {
        toast.error(`${res?.error}` || "something error is happend");
        setSubmitting(false);
      }
    }

    //delete product
    else if (productId !== undefined) {
      setUpdateProduct(false);
      setSubmitting(true);
      const res = await deleteProduct(productId);
      // console.log("res in delete modal", res);
      if (res?.status === 200) {
        toast.success(`${res?.message}`);
        setIsDeleteModal(false);
        setUpdateProduct(true);
        setSubmitting(false);
      } else {
        toast.error("errors");
        setSubmitting(false);
      }
    }

    //delete brand
    else if (brandId !== undefined) {
      setBrandUpdate(false);
      setSubmitting(true);
      const res = await deleteBrand(brandId);
      // console.log("res in delete modal", res);
      if (res?.status === 200) {
        toast.success(`${res?.message}`);
        setIsDeleteModal(false);
        setBrandUpdate(true);
        setSubmitting(false);
      } else {
        toast.error("errors");
        setSubmitting(false);
      }
    }

    //delete staff
    else if (staffId !== undefined) {
      setStaffUpdate(true);
      console.log(staffUpdate, "staffUpdate");
      setSubmitting(true);
      const res = await deleteStaff(staffId);
      // console.log("res in delete modal", res);
      if (res?.status === 200) {
        toast.success(`${res?.message}`);
        setIsDeleteModal(false);
        setSubmitting(false);
        setStaffUpdate(true);
      } else {
        toast.error(`${res?.error?.message}` || "something is error here");
        setSubmitting(false);
      }
    }

    //Delete coupon
    else if (couponId !== undefined) {
      setUpdateCoupon(false);
      setSubmitting(true);
      const res = await deleteCoupon(couponId);
      // console.log("res in delete modal", res);
      if (res?.status === 200) {
        toast.success(`${res?.message}` || "Delete");
        setIsDeleteModal(false);
        setSubmitting(false);
        setUpdateCoupon(true);
      } else {
        toast.error(`${res?.error?.message}` || "Something worng here");
        setSubmitting(false);
      }
    }

    //Delete child  attribute
    else if (attributeChildrenId && variantId !== undefined) {
      setUpdateAttribute(false);
      setSubmitting(true);
      const res = await deleteChildAttribute(attributeChildrenId, variantId);
      // console.log("res in delete modal", res);
      if (res) {
        toast.success("delete item successfully");
        setIsDeleteModal(false);
        setUpdateAttribute(false);
        setSubmitting(false);
      } else {
        toast.error(`${res?.error?.message}` || "Something worng here");
        setSubmitting(false);
      }
    }

    //Delete attribute
    else if (attributeId !== undefined) {
      setUpdateAttribute(false);
      setSubmitting(true);
      const res = await deleteAttribute(attributeId);
      // console.log("res in delete modal attribute...==", res);
      if (res?.message) {
        toast.success("attribute delete successfully");
        setIsDeleteModal(false);
        setUpdateAttribute(true);
        setSubmitting(false);
      } else {
        toast.error(`${res?.error}` || "Something worng here");
        setSubmitting(false);
        setIsDeleteModal(false);
      }
    }

    //Delete bloge
    else if (blogId !== undefined) {
      setBlogUpdate(false);
      setSubmitting(true);
      const res = await deleteBlog(blogId);
      // console.log("res in delete modal attribute...==", res);
      if (res?.message) {
        toast.success("attribute delete successfully");
        setIsDeleteModal(false);
        setBlogUpdate(true);
        setSubmitting(false);
      } else {
        toast.error(`${res?.error}` || "Something worng here");
        setSubmitting(false);
        setIsDeleteModal(false);
      }
    }
  };

  return (
    <Transition.Root show={isDeleteModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsDeleteModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <RiDeleteBin5Fill />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Delete This Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item? All of your
                        data will be permanently removed from our servers
                        forever. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  {submitting && (
                    <>
                      {" "}
                      <Loading />{" "}
                    </>
                  )}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      disabled={submitting}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handelDelete()}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setIsDeleteModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteModal2;
