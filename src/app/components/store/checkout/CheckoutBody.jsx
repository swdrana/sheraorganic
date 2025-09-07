"use client";

import { createOrder } from "@/app/controlers/order.controler";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { getAllCoupons } from "@/app/backend/controllers/coupon.controller";
import { InitiateCheckout, Purchase } from "@/app/utilities/facebookPixel";

import dayjs from "dayjs";
const CheckoutBody = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();
  const router = useRouter();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponInfo, setCouponInfo] = useState({});
  const { items, updateItemQuantity, emptyCart, cartTotal } = useCart();
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const taxes =
    cartTotal * 0.01 < 50
      ? Math.floor(cartTotal * 0.01)
      : Math.ceil(cartTotal * 0.01);

  const grandTotal = shippingCost + taxes + cartTotal - discount;

  const handleCheckoutSubmit = async () => {
    // Validate the form fields
    const isValid = await trigger();

    if (isValid) {
      const values = getValues();
      // console.log("values..", values);
      const {
        name,
        email,
        payment,
        address,
        phone,
        cardNumber,
        expiryDate,
        cvc,
      } = values;

      // Track InitiateCheckout event
      InitiateCheckout({
        content_ids: items.map(item => item.id),
        contents: items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          item_price: item.price
        })),
        currency: 'BDT',
        num_items: items.length,
        value: grandTotal,
        user_data: {
          em: email,
          ph: phone,
          fn: name.split(' ')[0],
          ln: name.split(' ')[1] || '',
          ct: address
        }
      });

      const userInfo = {
        name: name,
        email: email,
        contact: phone,
        address: address,
      };
      const orderData = {
        user: session?.data?.user?.id,
        cart: items,
        user_info: userInfo,
        subTotal: cartTotal,
        shippingCost: shippingCost,
        taxes: taxes,
        discount: Math.floor(discount),
        total: grandTotal,
        paymentMethod: payment,
        status: "Pending",
      };

      const res = await createOrder(orderData);
      // console.log("res......", res);
      if (res?.message) {
        // Track Purchase event
        Purchase({
          content_ids: items.map(item => item.id),
          contents: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            item_price: item.price
          })),
          currency: 'BDT',
          num_items: items.length,
          value: grandTotal,
          user_data: {
            em: email,
            ph: phone,
            fn: name.split(' ')[0],
            ln: name.split(' ')[1] || '',
            ct: address
          }
        });
        
        emptyCart();
        // Cookies.remove("couponInfo");
        // getOrderRevalidate();
        router.push("/my-account");
      } else {
      }
    }
  };

  // console.log("discount..", discount);

  const [enterCouponCodeList, setEnterCouponCodeList] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCoupons();
        // console.log("res..in", res);

        // Filter out active coupons based on endTime
        const activeCoupons = res?.filter((coupon) =>
          dayjs().isBefore(dayjs(coupon.endTime))
        );
        // console.log("activeCoupons", activeCoupons);
        setEnterCouponCodeList(activeCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountPercentage);
    }
  }, []);

  const handleCopunApply = (e) => {
    e.preventDefault();
    // console.log("click.. handelcoupon");
    // Check if the entered coupon code is valid and active
    const foundCoupon = enterCouponCodeList?.find(
      (coupon) => coupon.couponCode.toLowerCase() === couponCode.toLowerCase()
    );
    // console.log("foundCoupon", foundCoupon);
    if (foundCoupon) {
      setMessage("Coupon applied successfully!");
      setDiscount((cartTotal * foundCoupon?.discountPercentage) / 100);
      setCouponInfo(foundCoupon);
      Cookies.set("couponInfo", JSON.stringify(foundCoupon));
    } else {
      setMessage("Invalid or expired coupon.");
    }
  };
  return (
    <>
      {isClient && (
        <div className="checkout-section ptb-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-8">
                <div className="col-12">
                  <div className="bg-white p-4 rounded">
                    <h5 className="text-muted fs-5 fw-semibold mb-2">
                      Billing Details
                    </h5>
                    <form id="reviewForm" className="review-form mt-3">
                      <div className="d-flex flex-wrap gap-3">
                        <div className="w-100 col-md-6">
                          <label
                            className="form-label fw-medium"
                            htmlFor="Name"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="First Name"
                            className="form-control"
                            {...register("name", {
                              required: " Name is required",
                            })}
                          />
                          {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                          )}
                        </div>
                      </div>

                      {/* <div className="w-100 mt-4">
                        <label className="form-label fw-medium" htmlFor="email">
                          Email Address <span className="text-primary">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="form-control"
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                        {errors.email && (
                          <p className="text-danger">{errors.email.message}</p>
                        )}
                      </div> */}

                      <div className="d-flex flex-wrap gap-3 mt-4">
                        <div className="w-100 col-md-6">
                          <label
                            className="form-label fw-medium"
                            htmlFor="phone"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            placeholder="Phone"
                            className="form-control"
                            {...register("phone", {
                              required: "Phone is required",
                            })}
                          />
                          {errors.phone && (
                            <p className="text-danger">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="w-100 mt-4">
                        <label
                          className="form-label fw-medium"
                          htmlFor="address"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          placeholder="Street Address"
                          className="form-control"
                          {...register("address", {
                            required: "address is required",
                          })}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-danger">{errors.address.message}</p>
                      )}

                      <h5 className="text-muted fs-5 fw-semibold mt-4">
                        Select Shipping Method
                      </h5>
                      <div className="mt-3">
                        <div className="p-3 border rounded">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              <input
                                onClick={() => setShippingCost(20)}
                                type="radio"
                                name="shipping"
                                value="20"
                                id="20"
                                className="form-check-input"
                                {...register("shipping", {
                                  required: "Shipping method is required",
                                })}
                              />
                              <label
                                className="form-check-label fw-semibold"
                                htmlFor="20"
                              >
                                Normal Shipping -{" "}
                                <span className="text-primary">$20 USD</span>
                              </label>
                            </div>
                          </div>
                          <div className="py-2">
                            <p className="text-muted">
                              Estimated delivery on Feb 7 days
                            </p>
                          </div>
                        </div>

                        <div className="p-3 border rounded mt-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              <input
                                onClick={() => setShippingCost(40)}
                                type="radio"
                                name="shipping"
                                value="40"
                                id="40"
                                className="form-check-input"
                                {...register("shipping", {
                                  required: "Shipping method is required",
                                })}
                              />
                              <label
                                className="form-check-label fw-semibold"
                                htmlFor="40"
                              >
                                Fast Shipping -{" "}
                                <span className="text-primary">$40 USD</span>
                              </label>
                            </div>
                          </div>
                          <div className="py-2">
                            <p className="text-muted">
                              Estimated delivery on Feb 3 days
                            </p>
                          </div>
                        </div>
                        {errors.shipping && (
                          <p className="text-danger mt-3 fw-bold">
                            {errors.shipping.message}
                          </p>
                        )}
                      </div>
                      <h4 className="mt-7">Payment Method</h4>

                      {/* {paymentMethod === "card" && (
                        <>
                          <div className="mb-3">
                            <label className="form-label">Card number</label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.cardNumber ? "is-invalid" : ""
                              }`}
                              placeholder="Card number"
                              {...register("cardNumber", {
                                required: "Card number is required",
                                pattern: {
                                  value: /^[0-9]{16}$/,
                                  message:
                                    "Invalid card number (16 digits required)",
                                },
                              })}
                            />
                            {errors.cardNumber && (
                              <div className="invalid-feedback">
                                {errors.cardNumber.message}
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Expiry Date</label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.expiryDate ? "is-invalid" : ""
                              }`}
                              placeholder="MM/YY"
                              {...register("expiryDate", {
                                required: "Expiry date is required",
                                pattern: {
                                  value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                  message:
                                    "Invalid expiry date (format: MM/YY)",
                                },
                              })}
                            />
                            {errors.expiryDate && (
                              <div className="invalid-feedback">
                                {errors.expiryDate.message}
                              </div>
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label">CVC</label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.cvc ? "is-invalid" : ""
                              }`}
                              placeholder="CVC"
                              {...register("cvc", {
                                required: "CVC is required",
                                pattern: {
                                  value: /^[0-9]{3,4}$/,
                                  message: "Invalid CVC (3-4 digits required)",
                                },
                              })}
                            />
                            {errors.cvc && (
                              <div className="invalid-feedback">
                                {errors.cvc.message}
                              </div>
                            )}
                          </div>
                        </>
                      )} */}

                      {/* <div className="checkout-radio d-flex align-items-center justify-content-between gap-3 bg-white rounded p-4 mt-3">
                        <div className="radio-left d-inline-flex align-items-center">
                          <div className="theme-radio">
                            <input
                              onClick={() => setPaymentMethod("card")}
                              type="radio"
                              name="payment"
                              value="card"
                              {...register("payment", {
                                required: "payment method is required",
                              })}
                            />
                            <span className="custom-radio"></span>
                          </div>
                          <label htmlFor="wallet" className="ms-2 h6 mb-0">
                            Credit Card
                          </label>
                        </div>
                        <div className="radio-right text-end">
                          <img
                            src="https://grostore.themetags.com/public/frontend/pg/wallet.svg?v=v4.4.0"
                            alt="wallet"
                            className="img-fluid"
                          />
                        </div>
                      </div> */}
                      <div className="checkout-radio d-flex align-items-center justify-content-between gap-3 bg-white rounded p-4 mt-3">
                        <div className="radio-left d-inline-flex align-items-center">
                          <div className="theme-radio">
                            <input
                              onClick={() => setPaymentMethod("cod")}
                              type="radio"
                              name="payment"
                              value="cod"
                              {...register("payment", {
                                required: "payment method is required",
                              })}
                            />
                            <span className="custom-radio"></span>
                          </div>
                          <label htmlFor="cod" className="ms-2 h6 mb-0">
                            Cash on delivery (COD)
                          </label>
                        </div>

                        <div className="radio-right text-end">
                          <img
                            src="https://grostore.themetags.com/public/frontend/pg/cod.svg?v=v4.4.0"
                            alt="cod"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      {errors.payment && (
                        <p className="text-danger mt-3 fw-bold">
                          {errors.payment.message}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="checkout-sidebar">
                  <div className="sidebar-widget checkout-sidebar py-6 px-4 bg-white rounded-2">
                    <img
                      src="/img/shapes/circle-half.png"
                      alt="circle shape"
                      className="position-absolute end-0 top-0 z--1"
                    />
                    <h4 className="mb-3">Have a coupon?</h4>
                    <p className="mb-7">Apply coupon to get discount.</p>
                    {couponInfo?.couponCode ? (
                      <span className=" border px-4 pt-3 leading-tight w-full rounded-md flex justify-between">
                        <p className=" font-extrabold text-sm">
                          Coupon Applied
                        </p>
                        <span className="text-black font-extrabold text-sm text-right">
                          {couponInfo.couponCode}
                        </span>
                      </span>
                    ) : (
                      <form
                        onSubmit={handleCopunApply}
                        className="d-flex align-items-center"
                        action="#"
                      >
                        <input
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          type="text"
                          placeholder="Enter Your Coupn Cod"
                          className="theme-input w-100"
                        />
                        <button
                          type="submit"
                          className="btn btn-secondary flex-shrink-0"
                        >
                          Apply Coupon
                        </button>
                      </form>
                    )}

                    {message && (
                      <div className="w-full  text-sm text-green-500 mt-4">
                        {message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="checkout-sidebar">
                  <div className="sidebar-widget checkout-sidebar py-6 px-4 bg-white rounded-2">
                    <div className="widget-title d-flex">
                      <h5 className="mb-0 flex-shrink-0">Order Summery</h5>
                      <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
                    </div>
                    <table className="sidebar-table w-100 mt-5">
                      <tbody>
                        <tr>
                          <td>Items ({items.length}):</td>
                          <td className="text-end">${cartTotal}.00</td>
                        </tr>
                        <tr>
                          <td>Shipping & handling:</td>
                          <td className="text-end">${shippingCost}.00</td>
                        </tr>
                        <tr>
                          <td>Discount:</td>
                          <td className="text-end">
                            ${Math.floor(discount)}.00
                          </td>
                        </tr>
                        <tr>
                          <td>Tax:</td>
                          <td className="text-end">${taxes}.00</td>
                        </tr>
                      </tbody>
                    </table>

                    <span className="sidebar-spacer d-block my-4 opacity-50"></span>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="mb-0 fs-md">Total</h6>
                      <h6 className="mb-0 fs-md">
                        ${Math.floor(grandTotal)}.00
                      </h6>
                    </div>
                    <button
                      type="submit"
                      onClick={handleCheckoutSubmit}
                      className="btn btn-primary btn-md rounded mt-6 w-100"
                    >
                      Place Order
                    </button>
                    <p className="mt-3 mb-0 fs-xs">
                      By Placing your order your agree to our company{" "}
                      <Link href="/terms-condition">Privacy-policy</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutBody;
