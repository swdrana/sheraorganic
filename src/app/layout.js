"use client";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import "react-quill/dist/quill.snow.css";
import "./globals.css";
import "../assets/css/main.css";
import "rc-tree/assets/index.css";
import { ThemeProvider } from "./components/admin/context/themeContext";
import { MainContextProvider } from "./components/admin/context/mainContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "./components/admin/shared/Sidebar";
import { WishlistProvider } from "./components/store/provider/WishlistProvider";
import { MainContextProviderStore } from "./components/store/provider/MainContextStore";
import Offcanvas from "./components/store/common/nav/Offcanvas";
import Navbar from "./components/store/common/nav/Navbar";
import { AuthProvider } from "./components/store/provider/AuthProvider";
import Footer from "./components/store/common/nav/Footer";
import CartProviderContext from "./components/store/provider/CartProviderContex";
import ProductModal from "./components/store/common/others/ProductModal";
import useSetting from "./components/store/dataFetching/useSetting";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Use usePathname to get the current path
  let title = "Home- SheraOrganic Online Store";
  let description = "Welcome to my Next.js application!";

  if (pathname.startsWith("/products")) {
    title = "Products - SheraOrganic Online Store";
    description = "Browse the latest products in the SheraOrganic online store.";
  } else if (pathname.startsWith("/about")) {
    title = "About Us - SheraOrganic Online Store";
    description = "Learn more about the SheraOrganic online store and our mission.";
  } else if (pathname.startsWith("/contact")) {
    title = "Contact Us - SheraOrganic Online Store";
    description = "Get in touch with the SheraOrganic online store team.";
  } else if (pathname.startsWith("/coupons")) {
    title = "Coupons - SheraOrganic Online Store";
    description = "Get in touch with the SheraOrganic online store team.";
  } else if (pathname.startsWith("/blog")) {
    title = "Blog - SheraOrganic Online Store";
    description = "Get in touch with the SheraOrganic online store team.";
  } else if (pathname.startsWith("/terms-condition")) {
    title = "Terms - SheraOrganic Online Store";
    description = "Get in touch with the SheraOrganic online store team.";
  } else if (pathname.startsWith("/product-details")) {
    title = "Product Details - SheraOrganic Online Store";
    description = "Get in touch with the SheraOrganic online store team.";
  }

  const { setting, settingLoading } = useSetting();

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="icon" href={setting?.home?.favicon} />
      </head>
      <body>
        <AuthProvider>
          <CartProviderContext>
            <ToastContainer />
            <ThemeProvider>
              <WishlistProvider>
                <MainContextProvider>
                  <MainContextProviderStore>
                    {(pathname === "/" ||
                      pathname.startsWith("/products") ||
                      pathname.startsWith("/product-details") ||
                      pathname.startsWith("/invoice") ||
                      pathname.startsWith("/blog-details") ||
                      pathname === "/products" ||
                      pathname === "/checkout" ||
                      pathname === "/cart" ||
                      pathname === "/about" ||
                      pathname === "/contact" ||
                      pathname === "/blog" ||
                      pathname === "/my-account" ||
                      pathname === "/terms-condition" ||
                      pathname === "/coupons") && (
                      <>
                        <Offcanvas />
                        <Navbar />
                      </>
                    )}
                    {pathname.startsWith("/admin") && <Sidebar />}
                    {children}
                    {(pathname === "/" ||
                      pathname.startsWith("/products") ||
                      pathname.startsWith("/product-details") ||
                      pathname.startsWith("/invoice") ||
                      pathname === "/products" ||
                      pathname === "/about" ||
                      pathname === "/contact" ||
                      pathname === "/blog" ||
                      pathname === "/cart" ||
                      pathname === "/checkout" ||
                      pathname === "/my-account" ||
                      pathname === "/terms-condition" ||
                      pathname.startsWith("/blog-details") ||
                      pathname === "/coupons") && (
                      <>
                        <Footer />
                      </>
                    )}
                    <ProductModal />
                  </MainContextProviderStore>
                </MainContextProvider>
              </WishlistProvider>
            </ThemeProvider>
          </CartProviderContext>
        </AuthProvider>
      </body>
    </html>
  );
}
