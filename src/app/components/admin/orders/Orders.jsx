"use client";
import useOrderFilter from "@/app/hooks/useOrderFilter";
import React from "react";
import OrderTable from "./OrderTable";
import { GrClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import LoadingSkeleton from "../loader/TableLoading";
import useOrders from "../featch/useOrder";
import useOrderCode from "../../store/dataFetching/useOrderCode";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Orders = ({ orderCode }) => {
  const invoiceRef = useRef();
  const { orders, orderloading } = useOrders();
  const {
    searchText,
    setSearchText,
    status,
    setStatus,
    filterOrder,
    handelResetFiltering,
    pageCount,
    handlePageChange,
    method,
    setMethod,
  } = useOrderFilter(orders);

  const { codeOrder, codeOrderLoading } = useOrderCode(orderCode);

  const downloadInvoice = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 page width in mm
    const pageHeight = 297; // A4 page height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  };
  return (
    <>
      {orderCode ? (
        <>
          {" "}
          <section ref={invoiceRef} className="invoice-section pt-6 pb-28">
            <div className="container mx-auto">
              <div className="invoice-box bg-white rounded-lg p-4 sm:p-6 shadow">
                {/* Content */}
                <div className="flex flex-wrap justify-between gap-5">
                  <div className="w-full lg:w-1/2">
                    <div className="invoice-title flex items-center">
                      <h3 className="text-2xl font-semibold">Invoice</h3>
                      <span className="badge rounded-full bg-blue-200 text-blue-600 font-medium ml-3">
                        {codeOrder?.status}
                      </span>
                    </div>whitespace-nowrap
                    <table className="invoice-table-sm w-full mt-2">
                      <tbody>
                        <tr>
                          <td className="font-bold">Invoice No</td>
                          <td>#G-Store: {codeOrder?.orderCode}</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Date</td>
                          <td>15 January, 2023</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full lg:w-5/12">
                    <div className="text-right">
                      <a href="#">
                        <img
                          src="/img/logo.png"
                          alt="logo"
                          className="img-fluid mx-auto"
                        />
                      </a>
                      <h6 className="mb-0 text-gray-600 mt-4">
                        Cecilia Chapman, 711-2880 Nulla St, Mankato Mississippi
                        96522
                      </h6>
                    </div>
                  </div>
                </div>
                <span className="my-6 block border-t border-gray-300"></span>
                <div className="flex flex-wrap justify-between gap-5">
                  <div className="w-full xl:w-2/3 lg:w-3/4">
                    <div className="welcome-message">
                      <h4 className="mb-2 text-xl">
                        Dear {codeOrder?.user_info?.name}
                      </h4>
                      <p className="mb-0">
                        Here are your order details. We thank you for your
                        purchase.
                      </p>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 lg:w-1/4">
                    <div className="shipping-address">
                      <h6 className="mb-2 font-bold">Shipping Address</h6>
                      <p className="mb-0">{codeOrder?.user_info?.address}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border-b border-gray-300">SR.</th>
                        <th className="border-b border-gray-300">Products</th>
                        <th className="border-b border-gray-300">SKU</th>
                        <th className="border-b border-gray-300">QTY</th>
                        <th className="border-b border-gray-300">Item Price</th>
                        <th className="border-b border-gray-300">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {codeOrder?.cart?.map((o, i) => (
                        <tr key={i} className="border-b border-gray-200">
                          <td>{i + 1}</td>
                          <td className="flex items-center text-nowrap">
                            <img
                              src={o?.image[0]}
                              alt="product"
                              className="img-fluid w-12 h-12 object-cover"
                            />
                            <span className="ml-2">{o?.name} </span>
                          </td>
                          <td>{o?.sku}</td>
                          <td>{o?.quantity}</td>
                          <td>${o?.price}.00</td>
                          <td>${o?.itemTotal}.00</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="table-auto w-full">
                    <tbody>
                      <tr>
                        <td>
                          <strong className="text-dark block whitespace-nowrap">
                            Payment Method
                          </strong>
                          <span>{codeOrder?.paymentMethod}</span>
                        </td>
                        <td>
                          <strong className="text-dark block whitespace-nowrap">
                            Shipping Cost
                          </strong>
                          <span>${codeOrder?.shippingCost}.00</span>
                        </td>
                        <td>
                          <strong className="text-dark block whitespace-nowrap">
                            Discount
                          </strong>
                          <span>${codeOrder?.discount}.00</span>
                        </td>
                        <td>
                          <strong className="text-dark block whitespace-nowrap">
                            Taxes
                          </strong>
                          <span>${codeOrder?.taxes}.00</span>
                        </td>
                        <td>
                          <strong className="text-dark block whitespace-nowrap">
                            Total Price
                          </strong>
                          <span>${codeOrder?.subTotal}.00</span>
                        </td>
                        <td>
                          <strong className="text-dark block whitespace-nowrap">
                            Total Amount
                          </strong>
                          <span className="text-blue-600 font-bold">
                            ${codeOrder?.total}.00
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-3 mt-7">
                  <button
                    disabled
                    className="btn btn-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Print Invoice
                  </button>
                  <button
                    onClick={downloadInvoice}
                    className="btn btn-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {" "}
          <section className="mx-auto w-full  px-4 py-4 ">
            <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="basis-1/2">
                <h2 className="text-lg font-semibold">Orders</h2>
              </div>
            </div>
            <div className="flex gap-4  mt-8 flex-col sm:flex-row py-3 ">
              <div className="basis-1/2">
                <div className=" relative ">
                  <input
                    type="text"
                    placeholder="Search by customer name"
                    value={searchText}
                    // onKeyPress={handleSearch}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
                  />
                  <p className="absolute top-2 left-3">
                    <FiSearch size={20} />
                  </p>
                  {searchText.length !== 0 && (
                    <p
                      onClick={() => setSearchText("")}
                      className="absolute top-3 right-2 cursor-pointer"
                    >
                      <GrClose size={15} />
                    </p>
                  )}
                </div>
              </div>

              <div className="basis-1/2">
                <div className="bg-white px-3 rounded-md border border-gray-200">
                  <select
                    id="status"
                    name="status"
                    className="block w-full text-gray-900 py-2 border-0 border-transparent ring-inset ring-gray-300 focus:ring-0 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none shadow-none"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="All" defaultValue hidden>
                      Status
                    </option>
                    <option>Delivered</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Cancel</option>
                  </select>
                </div>
              </div>
              <div className="basis-1/2">
                <div className="bg-white px-3 rounded-md border border-gray-200">
                  <select
                    id="method"
                    name="method"
                    className="block w-full text-gray-900 py-2 border-0 border-transparent ring-inset ring-gray-300 focus:ring-0 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none shadow-none"
                    onChange={(e) => setMethod(e.target.value)}
                    value={method}
                  >
                    <option value="All" defaultValue hidden>
                      Method
                    </option>
                    <option>COD</option>
                    <option>Card</option>
                    <option>Credit</option>
                  </select>
                </div>
              </div>
              <div className="basis-1/3">
                <button
                  onClick={() => handelResetFiltering()}
                  type="button"
                  className="rounded-md w-full bg-dark px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Reset filtering
                </button>
              </div>
            </div>
            {orderloading ? (
              <>
                {" "}
                <LoadingSkeleton />{" "}
              </>
            ) : (
              <OrderTable
                orders={filterOrder}
                pageCount={pageCount}
                handlePageChange={handlePageChange}
              />
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Orders;
