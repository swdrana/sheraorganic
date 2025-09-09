"use client";

import useOrderCode from "../dataFetching/useOrderCode";
import useSetting from "../dataFetching/useSetting";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const Invoice = ({ invoiceNo }) => {
  const invoiceRef = useRef();
  // console.log("invoiceNo..", invoiceNo);
  const { codeOrder, codeOrderLoading } = useOrderCode(invoiceNo);
  const { setting, settingLoading } = useSetting();
  // console.log("codeOrder in invoice", codeOrder);

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

    const printWindow = window.open('', '_blank');
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
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background-color: #f9fafb; font-weight: 600; }
            .text-right { text-align: right; }
            .d-flex { display: flex; }
            .align-items-center { align-items: center; }
            .justify-content-between { justify-content: space-between; }
            .g-5 { gap: 20px; }
            .col-lg-6 { width: 50%; }
            .ms-3 { margin-left: 12px; }
            .fw-medium { font-weight: 500; }
            .bg-primary-light { background-color: #dbeafe; }
            .text-primary { color: #2563eb; }
            .rounded-pill { border-radius: 9999px; }
            .p-4 { padding: 16px; }
            .p-sm-6 { padding: 24px; }
            .pt-6 { padding-top: 24px; }
            .pb-120 { padding-bottom: 120px; }
            strong { font-weight: bold; }
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
              .text-right, .text-center.lg\:text-right { text-align: right !important; }
              .text-right img, .text-center.lg\:text-right img { margin-left: auto !important; display: block !important; }
              .lg\:w-5\/12, .lg\:w-5\/12 *, .lg\:w-5\/12 div, .lg\:w-5\/12 .text-right, .lg\:w-5\/12 .text-center { text-align: right !important; }
              .lg\:w-5\/12 img, .lg\:w-5\/12 a img { margin-left: auto !important; margin-right: 0 !important; display: block !important; float: right !important; }
              .lg\:w-5\/12 h6 { text-align: right !important; }
              .max-w-\[150px\] { max-width: 100px !important; width: 100px !important; }
              .btn, button, .print-buttons { display: none !important; }
              .no-print { display: none !important; }
              .row {
                display: flex !important;
                flex-direction: row !important;
                justify-content: space-between !important;
                align-items: flex-start !important;
              }
              .lg\:w-7\/12 {
                width: 58.333333% !important;
                float: left !important;
                text-align: left !important;
              }
              .lg\:w-5\/12 {
                width: 41.666667% !important;
                float: right !important;
                text-align: right !important;
              }
              .invoice-table-sm {
                text-align: left !important;
              }
              .invoice-table-sm td {
                text-align: left !important;
              }
            }
            @media (max-width: 768px) {
              .invoice-section { padding: 10px !important; }
              .container { padding: 0 10px !important; }
              .invoice-box { padding: 15px !important; }
              .row { flex-direction: column !important; }
              .col-lg-6, .col-lg-5, .col-md-8 { width: 100% !important; margin-bottom: 20px !important; }
              .table { font-size: 12px !important; overflow-x: auto !important; }
              .table th, .table td { padding: 8px 4px !important; }
              .text-end { text-align: center !important; }
              .text-end img { margin: 0 auto !important; }
              h3 { font-size: 20px !important; }
              h4 { font-size: 16px !important; }
              h6 { font-size: 12px !important; }
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
      <section ref={invoiceRef} className="invoice-section pt-6 pb-120">
        <div className="container mx-auto px-4">
          <div className="invoice-box bg-white rounded p-4 p-sm-6 shadow-sm">
            {/* Content */}
            <div className="flex flex-wrap justify-between items-start gap-5">
              <div className="flex-1 min-w-0 lg:max-w-[58%]">
                <div className="invoice-title flex items-center">
                  <h3 className="text-sm text-black">Invoice</h3>
                  <span className="badge rounded-pill bg-primary-light text-primary fw-medium ms-3 text-xs">
                    {codeOrder?.status}
                  </span>
                </div>
                <table className="invoice-table-sm">
                  <tbody>
                    <tr>
                      <td className="text-sm text-black">
                        <strong>Invoice No</strong>
                      </td>
                      <td className="text-sm text-black">#G-Store: {codeOrder?.orderCode}</td>
                    </tr>

                    <tr>
                      <td className="text-sm text-black">
                        <strong>Date</strong>
                      </td>
                      <td className="text-sm text-black">15 January, 2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex-shrink-0 text-right lg:max-w-[40%]">
                <div className="text-right">
                  <a href="#">
                    <img src={setting?.home?.logo || "/img/logo.png"} alt="logo" className="max-w-[150px] ml-auto block" />
                  </a>
                  <p className="mb-0 text-gray-600 mt-4 text-right text-sm">
                    {setting?.contact?.contact_office_address_one || "Address not available"}
                  </p>
                </div>
              </div>
            </div>
            <span className="my-6 w-100 d-block border-top"></span>
            <div className="row justify-content-start">
              <div className="col-12">
                <h6 className="mb-3 text-sm text-black">Customer Information</h6>
                <div className="user-info">
                  <p className="mb-1 text-sm text-black"><strong>{codeOrder?.user_info?.name}</strong></p>
                  {codeOrder?.user_info?.email && (
                    <p className="mb-1 text-sm text-black">{codeOrder?.user_info?.email}</p>
                  )}
                  {codeOrder?.user_info?.contact && (
                    <p className="mb-1 text-sm text-black">{codeOrder?.user_info?.contact}</p>
                  )}
                  {codeOrder?.user_info?.address && (
                    <p className="mb-0 text-sm text-black">{codeOrder?.user_info?.address}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="table-responsive mt-6 overflow-x-auto">
              <table className="table invoice-table w-100">
                <thead>
                  <tr>
                    <th className="text-sm">SR.</th>
                    <th className="text-sm">Products</th>
                    <th className="text-sm">QTY</th>
                    <th className="text-sm">Item Price</th>
                    <th className="text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {codeOrder?.cart?.map((o, i) => (
                    <tr key={i}>
                      <td className="text-sm">{i + 1}</td>
                      <td className="">
                        <img
                          src={o?.image[0]}
                          alt="product"
                          className="img-fluid product-item"
                        />
                        <p className="ms-2 max-w-[45ch] overflow-hidden text-sm">
                          {o?.name}{" "}
                        </p>
                      </td>

                      <td className="text-sm">{o?.quantity}</td>
                      <td className="text-sm">৳{o?.price}.00</td>
                      <td className="text-sm">৳{o?.itemTotal}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 table-responsive">
              <table className="table footer-table">
                <tbody>
                  <tr>
                    <td>
                      <strong className="text-dark d-block text-sm">
                        Payment Method
                      </strong>
                      <span className="text-sm">{codeOrder?.paymentMethod}</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-sm">
                        Shipping Cost
                      </strong>
                      <span className="text-sm">৳{codeOrder?.shippingCost}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-sm">
                        Discount
                      </strong>
                      <span className="text-sm">৳{codeOrder?.discount}.00</span>
                    </td>

                    <td>
                      <strong className="text-dark d-block text-sm">
                        Total Price
                      </strong>
                      <span className="text-sm">৳{codeOrder?.subTotal}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-sm">
                        Total Amount
                      </strong>
                      <span className="text-primary fw-bold text-sm">
                        ৳{codeOrder?.total}.00
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-7 no-print">
              <button
                type="button"
                onClick={printInvoice}
                className="btn btn-primary btn-md"
              >
                Print Invoice
              </button>
              <a
                type="button"
                onClick={downloadInvoice}
                className="btn btn-primary btn-md "
              >
                Download Invoice
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Invoice;
