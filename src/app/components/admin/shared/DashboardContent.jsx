"use client";

import DashboardHome from "../dashboard/DashboardHome";
import Products from "../products/Products";
import ProductDetails from "../products/ProductDetails";
import Category from "../category/Category";
import Coupon from "../coupon/Coupon";
import Staffs from "../staffs/Staffs";
import Orders from "../orders/Orders";
import Attribute from "../attributes/Attribute";
import ChildAttribute from "../attributes/ChildAttribute";
import ChildCategory from "../category/ChildCategory";

import { usePathname } from "next/navigation";
import StoreCustomization from "../store-customization/StoreCustomization";
import Customers from "../customers/Customers";
import Settings from "../settings/Settings";
import CustomerOrder from "../customerOrder/CustomerOrder";
import Brands from "../brands/Brands";
import ProductForm from "../test/ProductForm";
import BlogsBody from "../blogs/BlogsBody";
import PackingReports from "../packingReports/PackingReports";

const DashboardContent = ({
  attributeChildrenId,
  categoryId,
  productId,
  orderId,
  orderCode,
  userId,
}) => {
  const pathname = usePathname();

  return (
    <>
      <div className="lg:pl-72">
        <main className="py-10 bg-primary-1">
          <div className="container mx-auto">
            <div className="px-4 sm:px-6 lg:px-8">
              {pathname === "/admin" && <DashboardHome />}
              {pathname === "/admin/product" && <Products />}
              {productId !== undefined && (
                <ProductDetails productId={productId} />
              )}
              {pathname === "/admin/category" && <Category />}

              {pathname === "/admin/coupon" && <Coupon />}
              {pathname === "/admin/staff" && <Staffs />}
              {pathname.startsWith("/admin/order") && (
                <Orders orderCode={orderCode} />
              )}
              {pathname === "/admin/attributes" && <Attribute />}
              {pathname === "/admin/store-customization" && (
                <StoreCustomization />
              )}
              {pathname === "/admin/customers" && <Customers />}
              {pathname === "/admin/test" && <ProductForm />}
              {pathname === "/admin/brands" && <Brands />}
              {pathname === "/admin/settings" && <Settings />}
              {pathname === "/admin/blogs" && <BlogsBody />}
              {pathname === "/admin/packing-reports" && <PackingReports />}
              {userId && <CustomerOrder userId={userId} />}
              {attributeChildrenId && (
                <ChildAttribute attributeChildrenId={attributeChildrenId} />
              )}
              {categoryId && <ChildCategory categoryId={categoryId} />}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardContent;
