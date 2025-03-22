"use client";
import { useState } from "react";
import useCategory from "../../dataFetching/useCategory";
import CategoryOffcanvas from "./CategoryOffcanvas";
import FooterNav from "./FooterNav";
import Link from "next/link";
import useSetting from "../../dataFetching/useSetting";
import { toast } from "react-toastify";

const Footer = () => {
  const [categoryOffcanvas, setCategoryOffcanvas] = useState(false);
  const { categorys } = useCategory();
  // console.log("category..", categorys);
  const { setting, settingLoading } = useSetting();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    console.log("click..............");
    e.preventDefault();
    setLoading(true);

    const emailData = {
      sender: email,
      message: "Subscription successfully",
    };

    try {
      const response = await fetch("/api/v1/subscribe-gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });
      console.log("response in contac", response);
      if (response.ok) {
        setLoading(false);
        toast.success("Your gmail successfuly subscrition");
        setEmail("");
      } else {
        toast.error("Failed to subscription.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
      setLoading(false);
    }
  };
  return (
    <>
      {/* Footer navbar */}
      <FooterNav
        categoryOffcanvas={categoryOffcanvas}
        setCategoryOffcanvas={setCategoryOffcanvas}
      />
      {/* category offcanvs */}
      <CategoryOffcanvas
        categoryOffcanvas={categoryOffcanvas}
        setCategoryOffcanvas={setCategoryOffcanvas}
        categorys={categorys}
      />

      <div className="footer-curve position-relative overflow-hidden">
        <span
          className="position-absolute section-curve-wrapper top-0 h-100"
          data-background="/img/shapes/section-curve.png"
        ></span>
      </div>
      <footer className="gshop-footer position-relative pt-8 bg-dark z-1 overflow-hidden">
        <img
          src="/img/shapes/tomato.svg"
          alt="tomato"
          className="position-absolute z--1 tomato vector-shape"
        />
        <img
          src="/img/shapes/pata-lg.svg"
          alt="pata"
          className="position-absolute z--1 pata-lg vector-shape"
        />
        <img
          src="/img/shapes/pata-xs.svg"
          alt="pata"
          className="position-absolute z--1 pata-xs vector-shape"
        />
        <img
          src="/img/shapes/frame-circle.svg"
          alt="frame"
          className="position-absolute z--1 frame-circle vector-shape"
        />
        <img
          src="/img/shapes/leaf.svg"
          alt="leaf"
          className="position-absolute z--1 leaf vector-shape"
        />

        <img
          src="/img/shapes/leaf.svg"
          alt="pata"
          className="position-absolute leaf-2 z--1 vector-shape"
        />
        <img
          src="/img/shapes/pata-xs.svg"
          alt="pata"
          className="position-absolute pata-xs-2 z--1 vector-shape"
        />
        <img
          src="/img/shapes/tomato-slice.svg"
          alt="tomato slice"
          className="position-absolute tomato-slice vector-shape z--1"
        />
        <img
          src="/img/shapes/tomato-half.svg"
          alt="tomato"
          className="position-absolute tomato-half z--1 vector-shape"
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6">
              <div className="gshop_subscribe_form text-center">
                <h4 className="text-white gshop-title">
                  {setting?.home?.footer_title}
                  <mark className="p-0 position-relative text-secondary bg-transparent">
                    New Arrivals{" "}
                    <img
                      src="/img/shapes/border-line.svg"
                      alt="border line"
                      className="position-absolute border-line"
                    />
                  </mark>
                </h4>
                <form
                  onSubmit={handleSubmit}
                  className="mt-5 d-flex align-items-center bg-white rounded subscribe_form"
                >
                  <input
                    value={email}
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-shrink-0"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
          <span className="gradient-spacer my-8 d-block"></span>
          <div className="row g-5">
            <div className="col-sm-6">
              <div className="footer-widget">
                <h5 className="text-white mb-4">Category</h5>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <ul className="footer-nav">
                      {categorys?.slice(0, 6).map((c, i) => (
                        <li key={i}>
                          <Link
                            href={`/products/category=${c.name
                              .replace(/\s+/g, "")
                              .toLowerCase()}=${c._id}`}
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="footer-nav">
                      {categorys?.slice(7, 13).map((c, i) => (
                        <li key={i}>
                          <Link
                            href={`/products/category=${c.name
                              .replace(/\s+/g, "")
                              .toLowerCase()}=${c._id}`}
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="footer-widget">
                <h5 className="text-white mb-4">Quick Links</h5>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <ul className="footer-nav">
                      <li>
                        <Link href="/products">Products</Link>
                      </li>
                      <li>
                        <Link href="/coupons">Coupons</Link>
                      </li>
                      <li>
                        <Link href="/about">About Us</Link>
                      </li>
                      <li>
                        <Link href="/blog">Blog</Link>
                      </li>
                      <li>
                        <Link href="/terms-condition">Terms & Condition</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="footer-nav">
                      <li>
                        <Link href="/login">Log In</Link>
                      </li>
                      <li>
                        <Link href="/singup">Sing Up</Link>
                      </li>
                      <li>
                        <Link href="/cart">Cart</Link>
                      </li>
                      <li>
                        <Link href="/checkout">Checkout</Link>
                      </li>
                      <li>
                        <Link href="/terms-condition">Terms & Condition</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright pt-120 pb-3">
          <span className="gradient-spacer d-block mb-3"></span>
          <div className="container">
            <div className="row align-items-center g-3">
              <div className="col-lg-4">
                <div className="copyright-text">
                  <p className="mb-0 text-white">
                    {setting?.home?.footer_copy_right}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-none d-lg-block">
                <div className="logo-wrapper d-flex justify-center">
                  <Link href="/" className="logo">
                    <img
                      src={setting?.home?.footer_logo}
                      alt="logo"
                      className="img-fluid"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-payments-info d-flex align-items-center justify-content-lg-end gap-2">
                  {setting?.home?.footer_payment_incon_one && (
                    <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                      <img
                        src={setting?.home?.footer_payment_incon_one}
                        alt="visa"
                        className="img-fluid"
                      />
                    </div>
                  )}

                  {setting?.home?.footer_payment_incon_two && (
                    <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                      <img
                        src={setting?.home?.footer_payment_incon_two}
                        alt="visa"
                        className="img-fluid"
                      />
                    </div>
                  )}
                  {setting?.home?.footer_payment_incon_three && (
                    <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                      <img
                        src={setting?.home?.footer_payment_incon_three}
                        alt="visa"
                        className="img-fluid"
                      />
                    </div>
                  )}
                  {setting?.home?.footer_payment_incon_four && (
                    <div className="supported-payment-box rounded-1 bg-dark-light d-inline-flex align-items-center justify-content-center p-2 flex-shrink-0">
                      <img
                        src={setting?.home?.footer_payment_incon_four}
                        alt="visa"
                        className="img-fluid"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
