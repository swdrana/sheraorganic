"use client";

import Link from "next/link";
import { useCart } from "react-use-cart";

const ShoppingBegHoverContent = () => {
  const { items, removeItem, updateItemQuantity, cartTotal } = useCart();

  return (
    <>
      <div className="gshop-header-cart position-relative">
        <button type="button" className="header-icon ">
          <svg
            width="18"
            height="25"
            viewBox="0 0 22 25"
            fill="none"
            xmlns="http:/www.w3.org/2000/svg"
          >
            <path
              d="M21.1704 23.9559L19.6264 7.01422C19.5843 6.55156 19.1908 6.19718 18.7194 6.19718H15.5355V4.78227C15.5355 2.14533 13.3583 0 10.6823 0C8.00628 0 5.82937 2.14533 5.82937 4.78227V6.19718H2.6433C2.17192 6.19718 1.77839 6.55156 1.73625 7.01422L0.186259 24.0225C0.163431 24.2735 0.248671 24.5223 0.421216 24.7082C0.593761 24.8941 0.837705 25 1.0933 25H20.2695C20.2702 25 20.2712 25 20.2719 25C20.775 25 21.1826 24.5982 21.1826 24.1027C21.1825 24.0528 21.1784 24.0036 21.1704 23.9559ZM7.65075 4.78227C7.65075 3.1349 9.01071 1.79465 10.6824 1.79465C12.3542 1.79465 13.7142 3.1349 13.7142 4.78227V6.19718H7.65075V4.78227ZM2.08948 23.2055L3.47591 7.99183H5.82937V9.59649C5.82937 10.0921 6.237 10.4938 6.74006 10.4938C7.24313 10.4938 7.65075 10.0921 7.65075 9.59649V7.99183H13.7142V9.59649C13.7142 10.0921 14.1219 10.4938 14.6249 10.4938C15.128 10.4938 15.5356 10.0921 15.5356 9.59649V7.99183H17.8869L19.2733 23.2055H2.08948Z"
              fill="#5D6374"
            />
          </svg>
          <span className="cart-counter badge bg-primary rounded-circle p-0">
            {items.length}
          </span>
        </button>
        {items.length === 0 ? (
          <div className="cart-box-wrapper w-80 h-100">
            <p className="text-center bg-white text-danger shadow-lg py-4">
              Empty cart
            </p>
          </div>
        ) : (
          <div className="cart-box-wrapper">
            <div className="apt_cart_box theme-scrollbar">
              <ul
                className="at_scrollbar scrollbar cart-navbar-wrapper"
                style={{
                  height: "auto",
                  overflowY: "auto", // Enables vertical scrolling
                  overflowX: "hidden", // Hides horizontal scrolling, if content overflows
                }}
              >
                {items.map((item, i) => (
                  <li key={i} className="d-flex align-items-center">
                    <div className="thumb-wrapper">
                      <a href="#">
                        <img
                          src={item.image[0]}
                          alt="products"
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <div className="items-content ms-3">
                      <Link href={`/product-details/${item._id}`}>
                        <h6 className="tt-line-clamp tt-clamp-1 max-text-30 mb-1">
                          {item.name}
                        </h6>
                      </Link>
                      <div className="products_meta d-flex align-items-center">
                        <div>
                          <span className="price text-primary fw-semibold mx-1">
                            ${item.price}.00
                          </span>

                          <span className="count">x {item.quantity}</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="remove_cart_btn"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="mb-0">Subtotal:</h6>
                <span className="fw-semibold text-primary">
                  ${cartTotal}.00
                </span>
              </div>

              <div className="row align-items-center justify-content-between">
                <div className="col-6">
                  <Link
                    href="/cart"
                    className="btn btn-secondary btn-md mt-4 w-100"
                  >
                    <span className="me-2">
                      <i className="fa-solid fa-shopping-bag"></i>
                    </span>
                    View Cart
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    href="/checkout"
                    className="btn btn-primary btn-md mt-4 w-100"
                  >
                    <span className="me-2">
                      <i className="fa-solid fa-credit-card"></i>
                    </span>
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingBegHoverContent;
