"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import NavbarTop from "./NavbarTop";
// import useCategory from "@/components/store/dataFetching/useCategory";
import dynamic from "next/dynamic";
import { useCart } from "react-use-cart";
import { signOut, useSession } from "next-auth/react";
// import { useMainContext } from "@/components/store/provider/MainContext";
import useCategory from "../../dataFetching/useCategory";
import { useMainContext } from "../../provider/MainContextStore";
import { useRouter } from "next/navigation";
import useSetting from "../../dataFetching/useSetting";
import Skeleton from "react-loading-skeleton";

const ShoppingBegHoverContent = dynamic(
  () => import("./ShoppingBegHoverContent"),
  { ssr: false }
);

const pages = [
  {
    name: "About Us",
    href: "/about",
  },

  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Terms & Condition",
    href: "/terms-condition",
  },
];

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchBarRef = useRef(null);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (searchText.trim()) {
      // Handle search logic here, e.g., make an API request or update the UI
      // console.log("Searching for:", searchText);
      router.push(`/products/search=${searchText}`);
    } else {
      // console.log("Please enter a search term.");
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    // Your custom click logic here
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true); // Add the class when scrolled down
      } else {
        setIsScrolled(false); // Remove the class when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // click and bottom to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  //   browser category
  const [browserCategory, setBrowserCategory] = useState(false);
  const browserCategoryRef = useRef(null);

  // Close offcanvas when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        browserCategoryRef.current &&
        !browserCategoryRef.current.contains(event.target) &&
        !event.target.closest(".swiper") // Prevent offcanvas
      ) {
        setBrowserCategory(false);
      }
    };

    if (browserCategory) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // console.log("document", document); // Log the document object for debugging

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [browserCategory, setBrowserCategory]);

  const { categorys, categoryLoading } = useCategory();

  const session = useSession();
  // console.log("session..", session);
  const { setOpenOffcanvas } = useMainContext();

  const { setting, settingLoading } = useSetting();

  return (
    <>
      <header
        ref={browserCategoryRef}
        className={`gheader position-relative z-2 header-sticky  ${
          isScrolled ? "sticky-on" : ""
        }`}
      >
        {/*==== navbar top =========*/}
        <NavbarTop />

        <div className="container px-3 px-md-3">
          <div className="gshop-navbar bg-white rounded ps-lg-5 position-relative">
            <div className="row align-items-center">
              <div className="col-xxl-2 col-xl-3 col-md-3 col-5">
                <Link href="/" className="logo">
                  {setting?.home?.logo ? (
                    <img
                      src={setting?.home?.logo}
                      alt="logo"
                      className="img-fluid"
                    />
                  ) : (
                    <>
                      <Skeleton width={250} height={30} />
                    </>
                  )}
                </Link>
              </div>
              <div className="col-xxl-10 col-xl-9 col-md-9 col-7">
                <div className="gshop-navbar-right d-flex align-items-center justify-content-end position-relative pr-0">
                  <div className="category-dropdown position-relative d-none d-md-inline-block">
                    <a
                      type="button"
                      onClick={() =>
                        setBrowserCategory((pre) =>
                          pre === false ? true : false
                        )
                      }
                      className="category-dropdown-btn fw-bold d-none d-sm-inline-block"
                    >
                      Browse Category
                      <span className="ms-1">
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </a>
                    <a
                      href="#"
                      onClick={handleClick}
                      className="category-dropdown-btn fw-bold d-sm-none"
                    >
                      Categories
                      <span className="ms-1">
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </a>
                    <div
                      ref={browserCategoryRef}
                      className={`category-dropdown-box scrollbar ${
                        browserCategory && "active"
                      }`}
                    >
                      <ul className="category-dropdown-menu">
                        {categorys?.map((category, i) => (
                          <li key={i}>
                            <Link
                              href={`/products/category=${category.name
                                .replace(/\s+/g, "")
                                .toLowerCase()}=${category._id}`}
                              className="d-flex align-items-center"
                            >
                              <div className="me-2 avatar-icon">
                                <img
                                  src={category.icon}
                                  alt="vegetables"
                                  className="w-100 h-100 rounded-circle"
                                />
                              </div>
                              <span>{category.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <nav className="gshop-navmenu ms-3 d-none d-xl-block">
                    <ul className="d-flex align-itmes-center justify-content-end">
                      <li className="has-submenu">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="has-submenu">
                        <Link href="/products">Products</Link>
                      </li>
                      <li className="has-submenu">
                        <Link href="/coupons">Coupons</Link>
                      </li>
                      <li className="has-submenu">
                        <a href="#" onClick={handleClick}>
                          Pages
                          <span className="ms-1 fs-xs float-end">
                            <i className="fa-solid fa-angle-down"></i>
                          </span>
                        </a>
                        <ul className="">
                          {pages.map((p, i) => (
                            <li key={i}>
                              <Link href={p.href}>{p.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                  <div className="gshop-header-icons d-none d-md-inline-flex align-items-center justify-content-end ms-3">
                    <div className="gshop-header-search " ref={searchBarRef}>
                      <button
                        type="button"
                        onClick={() => setShowSearchBar(true)}
                        className="header-icon"
                        data-bs-toggle="dropdown"
                      >
                        <svg
                          width="18"
                          height="23"
                          viewBox="0 0 22 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.68859 0.5C4.34645 0.5 0 4.84646 0 10.1886C0 15.5311 4.34645 19.8772 9.68859 19.8772C15.031 19.8772 19.3772 15.5311 19.3772 10.1886C19.3772 4.84646 15.031 0.5 9.68859 0.5ZM9.68859 18.0886C5.33261 18.0886 1.78866 14.5447 1.78866 10.1887C1.78866 5.83266 5.33261 2.28867 9.68859 2.28867C14.0446 2.28867 17.5885 5.83262 17.5885 10.1886C17.5885 14.5446 14.0446 18.0886 9.68859 18.0886Z"
                            fill="#5D6374"
                          />
                          <path
                            d="M21.7406 20.9824L16.6436 15.8853C16.2962 15.538 15.7338 15.538 15.3865 15.8853C15.0391 16.2323 15.0391 16.7954 15.3865 17.1424L20.4835 22.2395C20.6571 22.4131 20.8845 22.5 21.1121 22.5C21.3393 22.5 21.5669 22.4131 21.7406 22.2395C22.0879 21.8925 22.0879 21.3294 21.7406 20.9824Z"
                            fill="#5D6374"
                          />
                        </svg>
                      </button>
                      <div
                        className={`dropdown-menu dropdown-menu-end border-0 ${
                          showSearchBar ? "show" : ""
                        }`}
                      >
                        <form
                          className="search-form d-flex align-items-center"
                          onSubmit={handleSubmit}
                        >
                          <input
                            type="text"
                            placeholder="Search products..."
                            className="w-100"
                            value={searchText} // Controlled input
                            onChange={(e) => setSearchText(e.target.value)} // Update state on change
                          />
                          <button
                            type="submit"
                            className="submit-icon-btn-secondary"
                          >
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </button>
                        </form>
                      </div>
                    </div>

                    <div className="gshop-header-user position-relative">
                      <button type="button" className="header-icon">
                        <svg
                          width="18"
                          height="25"
                          viewBox="0 0 22 25"
                          fill="none"
                          xmlns="http:/www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.092 11.9546C12.6656 11.9546 14.0281 11.3902 15.1416 10.2766C16.2547 9.16322 16.8193 7.80093 16.8193 6.2271C16.8193 4.65382 16.2549 3.29134 15.1414 2.1776C14.0279 1.0644 12.6654 0.5 11.092 0.5C9.51825 0.5 8.156 1.0644 7.04266 2.17778C5.92931 3.29116 5.36475 4.65363 5.36475 6.2271C5.36475 7.80093 5.92931 9.1634 7.04266 10.2768C8.15636 11.39 9.51879 11.9546 11.092 11.9546ZM8.0281 3.16308C8.88239 2.30877 9.88453 1.89349 11.092 1.89349C12.2993 1.89349 13.3017 2.30877 14.1561 3.16308C15.0104 4.01757 15.4259 5.01992 15.4259 6.2271C15.4259 7.43464 15.0104 8.43681 14.1561 9.2913C13.3017 10.1458 12.2993 10.5611 11.092 10.5611C9.88489 10.5611 8.88275 10.1456 8.0281 9.2913C7.17364 8.43699 6.7582 7.43464 6.7582 6.2271C6.7582 5.01992 7.17364 4.01757 8.0281 3.16308Z"
                            fill="#5D6374"
                            stroke="#5D6374"
                            strokeWidth="0.2"
                          />
                          <path
                            d="M21.1339 18.893C21.1012 18.4201 21.0352 17.9043 20.9379 17.3596C20.8397 16.8108 20.7133 16.292 20.562 15.8178C20.4055 15.3277 20.1931 14.8438 19.9301 14.38C19.6575 13.8986 19.3371 13.4794 18.9776 13.1345C18.6016 12.7736 18.1414 12.4835 17.6091 12.2719C17.0787 12.0614 16.4909 11.9547 15.8621 11.9547C15.6152 11.9547 15.3763 12.0564 14.9151 12.3576C14.6313 12.5433 14.2993 12.7581 13.9287 12.9956C13.6118 13.1982 13.1825 13.3879 12.6523 13.5598C12.135 13.7277 11.6098 13.8129 11.0912 13.8129C10.5729 13.8129 10.0477 13.7277 9.53001 13.5598C9.00034 13.3881 8.57088 13.1984 8.25455 12.9958C7.88747 12.7605 7.55527 12.5457 7.26718 12.3574C6.80634 12.0562 6.56753 11.9545 6.32059 11.9545C5.69163 11.9545 5.10401 12.0614 4.57378 12.2721C4.04189 12.4833 3.58143 12.7734 3.20512 13.1347C2.84561 13.4798 2.52522 13.8988 2.25281 14.38C1.99019 14.8438 1.77758 15.3276 1.62108 15.818C1.46993 16.2922 1.34351 16.8108 1.24533 17.3596C1.14788 17.9035 1.082 18.4195 1.04933 18.8935C1.01722 19.3569 1.00098 19.8393 1.00098 20.3266C1.00098 21.5934 1.40238 22.6189 2.19394 23.3752C2.97572 24.1216 4.00996 24.5 5.26808 24.5H16.9157C18.1735 24.5 19.2077 24.1216 19.9897 23.3752C20.7814 22.6194 21.1828 21.5935 21.1828 20.3264C21.1826 19.8374 21.1662 19.3551 21.1339 18.893ZM19.0123 22.3449C18.4957 22.8381 17.8099 23.0779 16.9155 23.0779H5.26808C4.37354 23.0779 3.68773 22.8381 3.17135 22.3451C2.66474 21.8613 2.41854 21.2008 2.41854 20.3266C2.41854 19.8718 2.43349 19.4229 2.46339 18.9918C2.49255 18.569 2.55216 18.1044 2.64056 17.6108C2.72786 17.1233 2.83896 16.6658 2.9711 16.2516C3.09789 15.8545 3.27082 15.4612 3.48527 15.0824C3.68995 14.7214 3.92544 14.4116 4.18529 14.1621C4.42835 13.9286 4.73471 13.7375 5.0957 13.5942C5.42956 13.4616 5.80476 13.3891 6.21208 13.3781C6.26172 13.4046 6.35012 13.4552 6.49334 13.5488C6.78475 13.7394 7.12064 13.9567 7.49197 14.1946C7.91054 14.4624 8.44981 14.7042 9.09409 14.9128C9.75277 15.1265 10.4245 15.235 11.0913 15.235C11.7581 15.235 12.4301 15.1265 13.0884 14.913C13.7333 14.704 14.2723 14.4624 14.6915 14.1943C15.0715 13.9506 15.3979 13.7395 15.6894 13.5488C15.8326 13.4553 15.921 13.4046 15.9706 13.3781C16.3781 13.3891 16.7533 13.4616 17.0874 13.5942C17.4482 13.7375 17.7545 13.9288 17.9976 14.1621C18.2574 14.4114 18.4929 14.7212 18.6976 15.0826C18.9122 15.4612 19.0854 15.8547 19.212 16.2515C19.3443 16.6662 19.4556 17.1235 19.5427 17.6106C19.6309 18.1052 19.6907 18.5699 19.7199 18.992V18.9924C19.7499 19.4218 19.7651 19.8705 19.7653 20.3266C19.7651 21.201 19.5189 21.8613 19.0123 22.3449Z"
                            fill="#5D6374"
                            stroke="#5D6374"
                            strokeWidth="0.2"
                          />
                        </svg>
                      </button>
                      <div className="user-menu-wrapper">
                        <ul className="user-menu">
                          {!session?.data?.user?.email ? (
                            <>
                              {" "}
                              <li>
                                <Link href="/singup">
                                  <span className="me-2">
                                    <i className="fa-solid fa-user"></i>
                                  </span>
                                  Registration
                                </Link>
                              </li>
                              <li>
                                <Link href="/login">
                                  <span className="me-2">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                  </span>
                                  Login
                                </Link>
                              </li>
                            </>
                          ) : (
                            <>
                              {session?.data?.user?.role !== "Customer" ? (
                                <>
                                  <li>
                                    <Link href="/admin">
                                      <span className="me-2">
                                        <i className="fa-solid fa-user"></i>
                                      </span>
                                      Dashboard
                                    </Link>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <Link href="/my-account">
                                      <span className="me-2">
                                        <i className="fa-solid fa-user"></i>
                                      </span>
                                      My Account
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="/cart">
                                      <span className="me-2">
                                        <i className="fa-solid fa-tags"></i>
                                      </span>
                                      My Cart
                                    </Link>
                                  </li>
                                </>
                              )}

                              <li>
                                <a
                                  type="button"
                                  onClick={() => signOut({ callbackUrl: "/" })}
                                >
                                  <span className="me-2">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                  </span>
                                  Sign Out
                                </a>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* shopping beg hover content */}
                    <ShoppingBegHoverContent />
                  </div>
                  <div className="gshop-header-contact ms-7 position-relative d-none d-lg-flex d-xl-none d-xxl-flex">
                    <a
                      href="tel:+801570584567"
                      className="d-flex align-items-center"
                    >
                      <span className="icon d-inline-flex rounded-circle justify-content-center align-items-center bg-secondary-light">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 23 24"
                          fill="none"
                          xmlns="http:/www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.98193 3.44444C1.98193 2.09441 2.97352 1 4.19672 1H7.82812C8.30477 1 8.72795 1.33664 8.87867 1.83572L10.5373 7.3277C10.7116 7.90472 10.475 8.53538 9.98206 8.8074L7.48236 10.1868C8.70297 13.1748 10.884 15.5821 13.5913 16.9292L14.8411 14.1703C15.0876 13.6263 15.659 13.3651 16.1818 13.5575L21.1577 15.3881C21.61 15.5545 21.915 16.0215 21.915 16.5476V20.5556C21.915 21.9056 20.9234 23 19.7002 23H18.5928C9.41887 23 1.98193 14.7919 1.98193 4.66667V3.44444Z"
                            stroke="#FF7C08"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="ms-3">
                        <span className="text-muted fs-xs">
                          Phone & Telephone
                        </span>
                        <h6 className="mb-0 mt-1 fs-sm">
                          {setting?.home?.phone ? (
                            setting.home.phone
                          ) : (
                            <Skeleton width={150} height={20} />
                          )}
                        </h6>
                      </div>
                    </a>
                  </div>
                  <button
                    onClick={() => setOpenOffcanvas(true)}
                    className="gshop-offcanvas-btn offcanvas-toggle ms-3 mr-0"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http:/www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5892 0C1.66061 0 0.0917969 1.56893 0.0917969 3.4974C0.0917969 5.42588 1.65997 6.9947 3.5892 6.9947C5.51844 6.9947 7.08661 5.42588 7.08661 3.4974C7.08661 1.56893 5.51768 0 3.5892 0Z"
                        fill="white"
                      />
                      <path
                        d="M14.909 0C12.9805 0 11.4116 1.56893 11.4116 3.4974C11.4116 5.42588 12.9805 6.9947 14.909 6.9947C16.8376 6.9947 18.4068 5.42588 18.4068 3.4974C18.4068 1.56893 16.8383 0 14.909 0Z"
                        fill="white"
                      />
                      <path
                        d="M26.411 6.99481C28.3391 6.99481 29.9084 5.42599 29.9084 3.49751C29.9084 1.56903 28.3404 0 26.411 0C24.4815 0 22.9136 1.56893 22.9136 3.4974C22.9136 5.42588 24.4827 6.99481 26.411 6.99481Z"
                        fill="white"
                      />
                      <path
                        d="M3.49805 18.2016C5.42653 18.2016 6.99578 16.6331 6.99578 14.7043C6.99578 12.7754 5.42653 11.2066 3.49805 11.2066C1.56958 11.2066 0 12.7755 0 14.7043C0 16.6331 1.56958 18.2016 3.49805 18.2016Z"
                        fill="white"
                      />
                      <path
                        d="M14.8172 18.2016C16.7454 18.2016 18.3146 16.6331 18.3146 14.7043C18.3146 12.7754 16.7467 11.2066 14.8172 11.2066C12.8881 11.2066 11.3198 12.7754 11.3198 14.7043C11.3198 16.6331 12.8888 18.2016 14.8172 18.2016Z"
                        fill="white"
                      />
                      <path
                        d="M26.3205 18.2016C28.2494 18.2016 29.8179 16.6331 29.8179 14.7043C29.8179 12.7754 28.2494 11.2066 26.3205 11.2066C24.3916 11.2066 22.8218 12.7754 22.8218 14.7043C22.8218 16.6331 24.391 18.2016 26.3205 18.2016Z"
                        fill="white"
                      />
                      <path
                        d="M3.57813 22.3786C1.64965 22.3786 0.0800781 23.9471 0.0800781 25.876C0.0800781 27.8041 1.64965 29.3733 3.57813 29.3733C5.50661 29.3733 7.07543 27.8049 7.07543 25.876C7.07543 23.9471 5.50661 22.3786 3.57813 22.3786Z"
                        fill="white"
                      />
                      <path
                        d="M14.898 22.3786C12.9694 22.3786 11.3999 23.9471 11.3999 25.876C11.3999 27.8041 12.9688 29.3733 14.898 29.3733C16.8261 29.3733 18.3953 27.8049 18.3953 25.876C18.3953 23.9471 16.8261 22.3786 14.898 22.3786Z"
                        fill="white"
                      />
                      <path
                        d="M26.4002 22.3786C24.4721 22.3786 22.9028 23.9471 22.9028 25.876C22.9028 27.8041 24.4721 29.3733 26.4002 29.3733C28.3291 29.3733 29.8976 27.8049 29.8976 25.876C29.8976 23.9471 28.3284 22.3786 26.4002 22.3786Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Floating Social Buttons */}
      <div className="fixed bottom-20 right-2 md:right-10 z-40">
        <div className="mb-2">
          <a
            href="https://wa.me/+8801793143054"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#25D366"
              className="hover:scale-110 transition-transform"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
            </svg>
          </a>
        </div>
        <div className="mb-2">
          <a
            href="https://m.me/sheraorganicshop?text=Hello! I'm coming from your Website."
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#1877F2"
              className="hover:scale-110 transition-transform"
            >
              <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.13 3.26L19.752 8.1l-6.561 6.863z"/>
            </svg>
          </a>
        </div>
        {isScrolled && (
          <div className="mb-2">
            <button onClick={scrollToTop} className="block w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors">
              <i className="fa-regular fa-hand-pointer"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
