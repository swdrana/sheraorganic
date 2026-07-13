"use client";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContextProvider } from "./components/admin/context/mainContext";
import { ThemeProvider } from "./components/admin/context/themeContext";
import Sidebar from "./components/admin/shared/Sidebar";
import Footer from "./components/store/common/nav/Footer";
import Navbar from "./components/store/common/nav/Navbar";
import Offcanvas from "./components/store/common/nav/Offcanvas";
import ProductModal from "./components/store/common/others/ProductModal";
import { AuthProvider } from "./components/store/provider/AuthProvider";
import CartProviderContext from "./components/store/provider/CartProviderContex";
import { MainContextProviderStore } from "./components/store/provider/MainContextStore";
import { WishlistProvider } from "./components/store/provider/WishlistProvider";

export default function ClientLayout({ children }) {
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
