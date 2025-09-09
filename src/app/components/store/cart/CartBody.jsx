"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

const CartBody = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { items, updateItemQuantity, emptyCart, cartTotal } = useCart();
  const handleQuantityChange = (itemId, newQuantity) => {
    updateItemQuantity(itemId, newQuantity);
  };

  const handleDecrease = (item) => {
    handleQuantityChange(item?.id, item?.quantity - 1);
  };

  const handleIncrease = (item) => {
    handleQuantityChange(item?.id, item?.quantity + 1);
  };

  const [isChecked, setIsChecked] = useState(false);
  //   console.log("isChecked..", isChecked);

  // Handle checkbox change event
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };
  return (
    <>
      {isClient && (
        <section className="cart-section ptb-120">
          <div className="container">
            <div className="select-all d-flex align-items-center justify-content-between bg-white rounded p-4">
              <div className="d-inline-flex gap-2 align-items-center">
                <div className="theme-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked} // Controlled by state
                    onChange={handleCheckboxChange} // Toggle on change
                  />
                  <span className="checkbox-field">
                    {isChecked && <i className="fa-solid fa-check"></i>}
                  </span>
                </div>
                <label htmlFor="select-all">
                  Select All({items?.length} ITEMS)
                </label>
              </div>
              <a
                href="#"
                type="button"
                className={`text-danger ${!isChecked ? "disabled-link" : ""}`} // Disable class
                onClick={() => emptyCart()}
                style={{
                  pointerEvents: !isChecked ? "none" : "auto",
                  opacity: !isChecked ? 0.5 : 1,
                }} // Styling for disabled state
              >
                <span className="me-2">
                  <i className="fa-solid fa-trash-can"></i>
                </span>
                Delete
              </a>
            </div>
            {items?.length === 0 ? (
              <div className="d-flex justify-content-center mt-10">
                {" "}
                Empty Cart{" "}
              </div>
            ) : (
              <>
                {" "}
                {/* Desktop Table View */}
                <div className="mt-4 bg-white rounded-2 overflow-hidden d-none d-lg-block">
                  <table className="cart-table next_style w-100">
                    <thead>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Price</th>
                    </thead>
                    <tbody className="cart_tbody">
                      {items.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <div className="border border-success border-opacity-25 w-[120px] h-[100px] p-3 rounded-md overflow-hidden">
                              <img
                                src={item.image[0]}
                                alt="product-thumb"
                                className="w-full h-[100%] object-contain"
                              />
                            </div>
                          </td>
                          <td className="text-start product-title">
                            <h6 className="fw-medium tt-line-clamp tt-clamp-1 mb-0">
                              {item.name}
                            </h6>
                          </td>
                          <td>
                            <div className="product-qty d-inline-flex align-items-center">
                              <button
                                onClick={() => handleDecrease(item)}
                                className="decrese"
                              >
                                -
                              </button>
                              <input type="text" value={item.quantity} />
                              <button
                                onClick={() => handleIncrease(item)}
                                className="increase"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            <span className="text-dark fw-semibold">
                              ${item.price}.00
                            </span>
                          </td>
                          <td>
                            <span className="text-dark fw-bold">
                              ${item.price * item.quantity}.00
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="mt-4 d-lg-none">
                  {items.map((item, i) => (
                    <div key={i} className="bg-white rounded-2 p-3 mb-3 border">
                      <div className="row align-items-center">
                        <div className="col-4">
                          <div className="border border-success border-opacity-25 rounded-md overflow-hidden" style={{width: '80px', height: '80px'}}>
                            <img
                              src={item.image[0]}
                              alt="product-thumb"
                              className="w-100 h-100 object-fit-contain"
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <h6 className="fw-medium mb-2 text-truncate">
                            {item.name}
                          </h6>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small">Unit Price:</span>
                            <span className="fw-semibold">${item.price}.00</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small">Quantity:</span>
                            <div className="product-qty d-inline-flex align-items-center">
                              <button
                                onClick={() => handleDecrease(item)}
                                className="decrese btn btn-sm btn-outline-secondary"
                                style={{minWidth: '30px', height: '30px', padding: '0'}}
                              >
                                -
                              </button>
                              <input 
                                type="text" 
                                value={item.quantity} 
                                className="form-control text-center mx-1"
                                style={{width: '50px', height: '30px', padding: '0'}}
                                readOnly
                              />
                              <button
                                onClick={() => handleIncrease(item)}
                                className="increase btn btn-sm btn-outline-secondary"
                                style={{minWidth: '30px', height: '30px', padding: '0'}}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted small">Total:</span>
                            <span className="fw-bold text-primary">${item.price * item.quantity}.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row g-4">
                  <div className="col-xl-7"></div>
                  <div className="col-xl-5 ">
                    <div className="cart-summery bg-white rounded-2 pt-4 pb-6 px-5 mt-4 h-[100%]">
                      <table className="w-100">
                        <tr>
                          <td className="py-3">
                            <h5 className="mb-0 fw-medium">Subtotal</h5>
                          </td>
                          <td className="py-3">
                            <h5 className="mb-0 fw-semibold text-end">
                              ${cartTotal}.00
                            </h5>
                          </td>
                        </tr>
                      </table>
                      <p className="mb-5 mt-2">
                        Shipping options will be updated during checkout.
                      </p>
                      <div className="btns-group d-flex gap-3">
                        <Link
                          type="button"
                          href="/products"
                          className="btn btn-outline-secondary border-secondary btn-md rounded-1"
                        >
                          Continue Shopping
                        </Link>
                        <Link
                          type="submit"
                          href="/checkout"
                          className="btn btn-primary btn-md rounded-1"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default CartBody;
