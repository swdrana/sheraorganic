"use client";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { MainContextProvider } from "./components/admin/context/mainContext";
import { ThemeProvider } from "./components/admin/context/themeContext";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("./components/admin/shared/Sidebar"), { ssr: false });
import Footer from "./components/store/common/nav/Footer";
import Navbar from "./components/store/common/nav/Navbar";
import Offcanvas from "./components/store/common/nav/Offcanvas";
const ProductModal = dynamic(() => import("./components/store/common/others/ProductModal"), { ssr: false });
import { AuthProvider } from "./components/store/provider/AuthProvider";
import CartProviderContext from "./components/store/provider/CartProviderContex";
import { MainContextProviderStore } from "./components/store/provider/MainContextStore";
import { WishlistProvider } from "./components/store/provider/WishlistProvider";
import { loadStylesheet } from "./utils/loadStylesheet";
import AnalyticsLoader from "./components/store/common/others/AnalyticsLoader";
import { useEffect } from "react";

export default function ClientLayout({ children }) {
  useEffect(() => {
    loadStylesheet("/css/react-toastify.css");
  }, []);
  const pathname = usePathname() || "";

  const isStorePage =
    pathname === "/" ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/product-details") ||
    pathname.startsWith("/invoice") ||
    pathname.startsWith("/blog-details") ||
    pathname === "/checkout" ||
    pathname === "/cart" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/blog" ||
    pathname === "/my-account" ||
    pathname === "/terms-condition" ||
    pathname === "/coupons";

  return (
    <AuthProvider>
      <CartProviderContext>
        <ToastContainer />
        <ThemeProvider>
          <WishlistProvider>
            <MainContextProvider>
              <MainContextProviderStore>
                <AnalyticsLoader />
                {isStorePage && (
                  <>
                    <Offcanvas />
                    <Navbar />
                  </>
                )}
                {pathname.startsWith("/admin") && <Sidebar />}
                <main id="main-content">{children}</main>
                {isStorePage && <Footer />}
                <ProductModal />
              </MainContextProviderStore>
            </MainContextProvider>
          </WishlistProvider>
        </ThemeProvider>
      </CartProviderContext>
    </AuthProvider>
  );
}
