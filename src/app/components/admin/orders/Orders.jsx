"use client";
import useOrderFilter from "@/app/hooks/useOrderFilter";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import useOrderCode from "../../store/dataFetching/useOrderCode";
import useSetting from "../../store/dataFetching/useSetting";
import useOrders from "../featch/useOrder";
import LoadingSkeleton from "../loader/TableLoading";
import OrderTable from "./OrderTable";

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
    itemsPerPage,
    setItemsPerPage,
  } = useOrderFilter(orders);

  const { codeOrder, codeOrderLoading } = useOrderCode(orderCode);
  const { setting, settingLoading } = useSetting();

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

  const printInvoice = () => {
    const element = invoiceRef.current;
    if (!element) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-section { padding: 20px; }
            .invoice-box { background: white; border-radius: 8px; padding: 24px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .invoice-title { display: flex; align-items: center; margin-bottom: 20px; }
            .invoice-title h3 { font-size: 24px; font-weight: 600; margin: 0; }
            .badge { padding: 4px 12px; border-radius: 9999px; background-color: #dbeafe; color: #2563eb; font-weight: 500; margin-left: 12px; }
            .invoice-table-sm { width: 100%; margin-top: 8px; }
            .invoice-table-sm td { padding: 4px 0; }
            .font-bold { font-weight: bold; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background-color: #f9fafb; font-weight: 600; }
            .text-right { text-align: right; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .gap-5 { gap: 20px; }
            .w-full { width: 100%; }
            .lg\:w-7\/12 { width: 58.333333%; }
            .lg\:w-5\/12 { width: 41.666667%; }
            .ml-2 { margin-left: 8px; }
            .font-bold { font-weight: bold; }
            .bg-primary-light { background-color: #dbeafe; }
            .text-primary { color: #2563eb; }
            .rounded-full { border-radius: 9999px; }
            .p-4 { padding: 16px; }
            .pt-6 { padding-top: 24px; }
            .pb-120 { padding-bottom: 120px; }
            @media print {
              body { margin: 0; font-size: 12px; }
              .invoice-section { padding: 20px !important; }
              .container { max-width: 100% !important; margin: 0 !important; padding: 0 !important; }
              .invoice-box { padding: 20px !important; box-shadow: none !important; }
              .flex { display: flex !important; flex-wrap: wrap !important; }
              .w-full { width: 100% !important; }
              .lg\:w-7\/12, .lg\:w-5\/12 { width: 50% !important; }
              table { width: 100% !important; font-size: 11px !important; }
              th, td { padding: 6px !important; }
              img { max-width: 120px !important; height: auto !important; }
              .text-right, .text-end { text-align: right !important; }
              .text-right img, .text-end img { margin-left: auto !important; display: block !important; }
              .lg\:w-5\/12 { text-align: right !important; }
              .lg\:w-5\/12 img { margin-left: auto !important; margin-right: 0 !important; }
              .btn, button, .print-buttons { display: none !important; }
              .no-print { display: none !important; }
            }
            @media (max-width: 768px) {
              .invoice-section { padding: 10px !important; }
              .container { padding: 0 10px !important; }
              .invoice-box { padding: 15px !important; }
              .flex { flex-direction: column !important; }
              .w-full, .lg\:w-7\/12, .lg\:w-5\/12 { width: 100% !important; margin-bottom: 20px !important; }
              table { font-size: 12px !important; overflow-x: auto !important; }
              th, td { padding: 8px 4px !important; }
              .text-right { text-align: center !important; }
              .text-right img { margin: 0 auto !important; }
              h3 { font-size: 20px !important; }
              h4 { font-size: 16px !important; }
              h6 { font-size: 12px !important; }
            }
            th { background-color: #f9fafb; font-weight: 600; }
            .text-right { text-align: right; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .gap-5 { gap: 20px; }
            .w-full { width: 100%; }
            .lg\\:w-1\\/2 { width: 50%; }
            .mt-2 { margin-top: 8px; }
            .mt-4 { margin-top: 16px; }
            .mb-4 { margin-bottom: 16px; }
            @media print {
              body { margin: 0; }
              .invoice-section { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
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
                <div className="flex flex-wrap justify-between items-start gap-5">
                  <div className="flex-1 min-w-0 lg:max-w-[58%]">
                    <div className="invoice-title flex items-center">
                      <h3 className="text-sm text-black">Invoice</h3>
                      <span className="badge rounded-full bg-blue-200 text-blue-600 font-medium ml-3 text-xs">
                        {codeOrder?.status}
                      </span>
                    </div>
                    <table className="invoice-table-sm w-full mt-2">
                      <tbody>
                        <tr>
                          <td className="font-bold text-sm text-black">
                            Invoice No
                          </td>
                          <td className="text-sm text-black">
                            #G-Store: {codeOrder?.orderCode}
                          </td>
                        </tr>
                        <tr>
                          <td className="font-bold text-sm text-black">Date</td>
                          <td className="text-sm text-black">
                            15 January, 2023
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-shrink-0 text-right lg:max-w-[40%]">
                    <div className="text-right">
                      <a href="#">
                        <img
                          src={setting?.home?.logo || "/img/logo.png"}
                          alt="logo"
                          className="img-fluid ml-auto block"
                          style={{ maxWidth: "150px" }}
                        />
                      </a>
                      <p className="mb-0 text-gray-600 mt-4 text-right text-sm">
                        {setting?.contact?.contact_office_address_one ||
                          "Address not available"}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="my-6 block border-t border-gray-300"></span>
                <div className="w-full">
                  <h6 className="mb-3 font-bold text-sm text-black">
                    Customer Information
                  </h6>
                  <div className="user-info">
                    <p className="mb-1 text-sm text-black">
                      <strong>{codeOrder?.user_info?.name}</strong>
                    </p>
                    {codeOrder?.user_info?.email && (
                      <p className="mb-1 text-sm text-black">
                        {codeOrder?.user_info?.email}
                      </p>
                    )}
                    {codeOrder?.user_info?.contact && (
                      <p className="mb-1 text-sm text-black">
                        {codeOrder?.user_info?.contact}
                      </p>
                    )}
                    {codeOrder?.user_info?.address && (
                      <p className="mb-0 text-sm text-black">
                        {codeOrder?.user_info?.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border-b border-gray-300 text-sm">
                          SR.
                        </th>
                        <th className="border-b border-gray-300 text-sm">
                          Products
                        </th>
                        <th className="border-b border-gray-300 text-sm">
                          QTY
                        </th>
                        <th className="border-b border-gray-300 text-sm">
                          Item Price
                        </th>
                        <th className="border-b border-gray-300 text-sm">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {codeOrder?.cart?.map((o, i) => (
                        <tr key={i} className="border-b border-gray-200">
                          <td className="text-sm">{i + 1}</td>
                          <td className="flex items-center">
                            <img
                              src={o?.image[0]}
                              alt="product"
                              className="img-fluid w-12 h-12 object-cover"
                            />
                            <span className="ml-2 text-sm">{o?.name} </span>
                          </td>

                          <td className="text-sm">{o?.quantity}</td>
                          <td className="text-sm">৳{o?.price}.00</td>
                          <td className="text-sm">৳{o?.itemTotal}.00</td>
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
                          <strong className="text-dark block text-sm">
                            Payment Method
                          </strong>
                          <span className="text-sm">
                            {codeOrder?.paymentMethod}
                          </span>
                        </td>
                        <td>
                          <strong className="text-dark block text-sm">
                            Shipping Cost
                          </strong>
                          <span className="text-sm">
                            ৳{codeOrder?.shippingCost}.00
                          </span>
                        </td>
                        <td>
                          <strong className="text-dark block text-sm">
                            Discount
                          </strong>
                          <span className="text-sm">
                            ৳{codeOrder?.discount}.00
                          </span>
                        </td>

                        <td>
                          <strong className="text-dark block text-sm">
                            Total Price
                          </strong>
                          <span className="text-sm">
                            ৳{codeOrder?.subTotal}.00
                          </span>
                        </td>
                        <td>
                          <strong className="text-dark block text-sm">
                            Total Amount
                          </strong>
                          <span className="text-blue-600 font-bold text-sm">
                            ৳{codeOrder?.total}.00
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-3 mt-7 no-print">
                  <button
                    onClick={printInvoice}
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
                <div className="flex gap-2 flex-wrap">
                  {["All", "Pending", "Processing", "Delivered", "Cancel"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() =>
                          item === "All" ? setStatus("") : setStatus(item)
                        }
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          (item === "All" && status === "") || status === item
                            ? "bg-dark text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
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
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Orders;
