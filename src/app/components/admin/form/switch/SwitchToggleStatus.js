"use client";
import useAttributeSubmite from "@/app/hooks/useAttributesSubmite";
import useBrandSubmit from "@/app/hooks/useBrandSubmit";
import useCategorySubmit from "@/app/hooks/useCategorySubmit";
import useChildrenAttributeSubmit from "@/app/hooks/useChilldrenAttributeSubmit";
import useCouponSubmit from "@/app/hooks/useCouponSubmit";
import useStaffSubmit from "@/app/hooks/useStaffSubmit";
import { Switch } from "@headlessui/react";
import { usePathname } from "next/navigation";
import useBlogSubmit from "../../../../hooks/useBlogSubmit";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SwitchToggleStatus = ({
  handelProductUpdate,
  item,
  categories,
  attributeChildrenId,
  singleCategory,
}) => {
  const path = usePathname();
  const { handelStaffStatusUpdate } = useStaffSubmit();
  const { couponStatusUpdate } = useCouponSubmit();
  const { handelCategoryStatusUpdate } = useCategorySubmit(categories);
  const { handelAttributeStatus } = useAttributeSubmite();
  const { handelBrandStatusUpdate } = useBrandSubmit();
  const { handelBlogStatusUpdate } = useBlogSubmit();
  const { handelChildAttributeStatus } =
    useChildrenAttributeSubmit(attributeChildrenId);

  const handelStatusUpdate = (item) => {
    // product status update
    if (path === "/admin/product") {
      handelProductUpdate(item);
    }

    if (path !== "/admin/category" && singleCategory) {
      handelCategoryStatusUpdate(item);
    }

    if (attributeChildrenId) {
      handelChildAttributeStatus(item);
    }

    if (path === "/admin/attributes") {
      handelAttributeStatus(item);
    }
    if (path === "/admin/brands") {
      handelBrandStatusUpdate(item);
    }

    // category status update
    if (path === "/admin/category") {
      // console.log("category...");
      handelCategoryStatusUpdate(item);
    }

    if (path === "/admin/staff") {
      handelStaffStatusUpdate(item);
    }
    if (path === "/admin/coupon") {
      couponStatusUpdate(item);
    }
    if (path === "/admin/store-customization") {
      handelBlogStatusUpdate(item);
    }
  };

  return (
    <>
      <Switch
        onClick={() => handelStatusUpdate(item)}
        checked={item?.status === "show"}
        className={classNames(
          item.status === "show" ? "bg-secondary" : "bg-gray-200",
          "relative inline-flex h-3 w-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            item.status === "show" ? "translate-x-[14px]" : "translate-x-[2px]",
            "pointer-events-none inline-block h-2 w-2 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out absolute top-[2px]"
          )}
        />
      </Switch>
    </>
  );
};

export default SwitchToggleStatus;
