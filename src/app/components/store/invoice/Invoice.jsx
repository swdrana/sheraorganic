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
      <section ref={invoiceRef} className="invoice-section pt-6 pb-120">
        <div className="container">
          <div className="invoice-box bg-white rounded p-4 p-sm-6">
            {/* Content */}
            <div className="row g-5 justify-content-between">
              <div className="col-lg-6">
                <div className="invoice-title d-flex align-items-center">
                  <h3>Invoice</h3>
                  <span className="badge rounded-pill bg-primary-light text-primary fw-medium ms-3">
                    {codeOrder?.status}
                  </span>
                </div>
                <table className="invoice-table-sm">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Invoice No</strong>
                      </td>
                      <td>#G-Store: {codeOrder?.orderCode}</td>
                    </tr>

                    <tr>
                      <td>
                        <strong>Date</strong>
                      </td>
                      <td>15 January, 2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-5 col-md-8">
                <div className="text-end">
                  <a href="#">
                    <img src={setting?.home?.logo || "/img/logo.png"} alt="logo" className="img-fluid ms-auto d-block" style={{maxWidth: '150px'}} />
                  </a>
                  <h6 className="mb-0 text-gray mt-4">
                    {setting?.home?.address || "Address not available"}
                  </h6>
                </div>
              </div>
            </div>
            <span className="my-6 w-100 d-block border-top"></span>
            <div className="row justify-content-between g-5">
              <div className="col-xl-8 col-lg-7">
                <div className="welcome-message">
                  <h4 className="mb-2">Dear {codeOrder?.user_info?.name}</h4>
                  <p className="mb-0">
                    Here are your order details. We thank you for your purchase.
                  </p>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="shipping-address">
                  <h6 className="mb-2">Shipping Address</h6>
                  <p className="mb-0">{codeOrder?.user_info?.address}</p>
                </div>
              </div>
            </div>
            <div className="table-responsive mt-6">
              <table className="table invoice-table">
                <thead>
                  <tr>
                    <th>SR.</th>
                    <th>Products</th>
                    <th>SKU</th>
                    <th>QTY</th>
                    <th>Item Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {codeOrder?.cart?.map((o, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="">
                        <img
                          src={o?.image[0]}
                          alt="product"
                          className="img-fluid product-item"
                        />
                        <p className="ms-2 max-w-[45ch] overflow-hidden">
                          {o?.name}{" "}
                        </p>
                      </td>
                      <td>{o?.sku}</td>
                      <td>{o?.quantity}</td>
                      <td>৳{o?.price}.00</td>
                      <td>৳{o?.itemTotal}.00</td>
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
                      <strong className="text-dark d-block">
                        Payment Method
                      </strong>
                      <span>{codeOrder?.paymentMethod}</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block">
                        Shipping Cost
                      </strong>
                      <span>৳{codeOrder?.shippingCost}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block">
                        Discount
                      </strong>
                      <span>৳{codeOrder?.discount}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block">
                        Taxes
                      </strong>
                      <span>৳{codeOrder?.taxes}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block">
                        Total Price
                      </strong>
                      <span>৳{codeOrder?.subTotal}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block">
                        Total Amount
                      </strong>
                      <span className="text-primary fw-bold">
                        ৳{codeOrder?.total}.00
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-7">
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
