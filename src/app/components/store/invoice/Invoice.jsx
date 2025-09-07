"use client";

import useOrderCode from "../dataFetching/useOrderCode";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const Invoice = ({ invoiceNo }) => {
  const invoiceRef = useRef();
  // console.log("invoiceNo..", invoiceNo);
  const { codeOrder, codeOrderLoading } = useOrderCode(invoiceNo);
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
                <div className="text-lg-end">
                  <a href="#">
                    <img src="/img/logo.png" alt="logo" className="img-fluid" />
                  </a>
                  <h6 className="mb-0 text-gray mt-4">
                    Cecilia Chapman, 711-2880 Nulla St, Mankato Mississippi
                    96522
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
                      <td className="text-nowrap">
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
                      <strong className="text-dark d-block text-nowrap">
                        Payment Method
                      </strong>
                      <span>{codeOrder?.paymentMethod}</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-nowrap">
                        Shipping Cost
                      </strong>
                      <span>৳{codeOrder?.shippingCost}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-nowrap">
                        Discount
                      </strong>
                      <span>৳{codeOrder?.discount}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-nowrap">
                        Taxes
                      </strong>
                      <span>৳{codeOrder?.taxes}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-nowrap">
                        Total Price
                      </strong>
                      <span>৳{codeOrder?.subTotal}.00</span>
                    </td>
                    <td>
                      <strong className="text-dark d-block text-nowrap">
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
              <a
                type="button"
                disabled={true}
                className="btn btn-primary btn-md"
              >
                Prient Invoice
              </a>
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
