"use client";
import { getAllOrders } from "@/app/backend/controllers/order.controller";
import { getAllProducts } from "@/app/backend/controllers/product.controller";
import useProductFilter from "@/app/hooks/useProductFilter";
import useOrderFilter from "@/app/hooks/useOrderFilter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { useMainContext } from "../context/mainContext";
import TableLoading from "../loader/TableLoading";
import DeleteModal from "../modal/DeleteModal";
import OrderTable from "../orders/OrderTable";
import ProductTable from "./../products/ProductTable";
import CardItemTwo from "./CardItemTwo";

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const { productDetails, updateProduct, updateOrderStatus } = useMainContext();
  const { filteredProducts, pageCount, handlePageChange } =
    useProductFilter(products);

  const {
    filterOrder,
    pageCount: orderPageCount,
    handlePageChange: handleOrderPageChange,
    itemsPerPage,
    setItemsPerPage,
  } = useOrderFilter(orders);

  const totalOrder = Math.floor(orders?.reduce((a, b) => a + b.total, 0));
  const totalOrderCount = orders?.length;
  const pendingOrder = orders?.filter((order) => order.status === "Pending");

  const pendingOrderCount = pendingOrder?.length;
  const pendingOrderTotal = Math.floor(
    pendingOrder?.reduce((a, b) => a + b.total, 0)
  );
  const rocessingOrder = orders?.filter(
    (order) => order.status === "Processing"
  );
  const processingOrderCount = rocessingOrder?.length;
  const processingOrderTotal = Math.floor(
    rocessingOrder?.reduce((a, b) => a + b.total, 0)
  );

  const deliverdOrder = orders?.filter((order) => order.status === "Delivered");
  const deliverOrderCount = deliverdOrder?.length;
  const deliverOrderTotal = Math.floor(
    deliverdOrder?.reduce((a, b) => a + b.total, 0)
  );

  useEffect(() => {
    const fetchData = async () => {
      const [orderRes, productRes] = await Promise.all([
        getAllOrders(),
        getAllProducts(),
      ]);
      setOrders(
        orderRes?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setProducts(productRes);

      setLoading(false);
    };

    fetchData();
  }, [updateProduct, updateOrderStatus]);
  return (
    <>
      <DeleteModal productId={productDetails._id} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-5">
        <CardItemTwo
          title="Total Order"
          Icon={FiShoppingCart}
          amount={totalOrder}
          totalCount={totalOrderCount}
        />
        <CardItemTwo
          title="Order Pending"
          Icon={FiRefreshCw}
          amount={pendingOrderTotal}
          totalCount={pendingOrderCount}
        />
        <CardItemTwo
          title="Order Processing"
          Icon={FiTruck}
          amount={processingOrderTotal}
          totalCount={processingOrderCount}
        />
        <CardItemTwo
          title="Order Delivered"
          Icon={FiCheck}
          amount={deliverOrderTotal}
          totalCount={deliverOrderCount}
        />
      </div>

      <section className="mx-auto w-full py-10 ">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <p className="text-gray-500">Your 10 Most Recent Orders</p>
          </div>
          <div>
            <Link href="/admin/order">
              <button className="bg-secondary text-white font-semibold py-2 px-4 rounded transition duration-300">
                View All Orders
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <>
            {" "}
            <TableLoading />{" "}
          </>
        ) : (
          <OrderTable
            orders={filterOrder}
            showAction={true}
            pageCount={orderPageCount}
            handlePageChange={handleOrderPageChange}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}
      </section>
      {loading ? (
        <>
          <TableLoading />{" "}
        </>
      ) : (
        <div className="py-6">
          <div>
            <h2 className="text-lg font-semibold">Products</h2>
          </div>
          <ProductTable
            products={filteredProducts}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default DashboardHome;
