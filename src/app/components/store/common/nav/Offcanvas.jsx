"use client";

import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { menuItems } from "@/app/utils/data";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import useCategory from "../../dataFetching/useCategory";
import useSetting from "../../dataFetching/useSetting";
import { useMainContext } from "../../provider/MainContextStore";

const Offcanvas = () => {
  const { openOffcanvas, setOpenOffcanvas } = useMainContext();
  const offcanvasRef = useRef(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const session = useSession();
  const { totalItems } = useCart();
  const { categorys } = useCategory();
  const { setting } = useSetting();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
        setOpenOffcanvas(false);
      }
    };
    if (openOffcanvas) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openOffcanvas, setOpenOffcanvas]);

  const closeOffcanvas = () => setOpenOffcanvas(false);
  const handleSearch = (event) => {
    event.preventDefault();
    if (!q.trim()) return;
    router.push(`/products/search=${q.trim()}`);
    closeOffcanvas();
  };

  return (
    <>
      {openOffcanvas && (
        <div
          onClick={closeOffcanvas}
          style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 1090 }}
        />
      )}
      <div ref={offcanvasRef} style={{ zIndex: 1100 }} className={`offcanvas_menu position-fixed ${openOffcanvas ? "active" : ""}`}>
        <div className="mobile-menu d-block">
          <button onClick={closeOffcanvas} className="offcanvas-close" aria-label="Close Navigation Menu"><i className="fa-solid fa-xmark"></i></button>
          <Link href="/" onClick={closeOffcanvas} className="d-inline-block mb-4">
            <img src={setting?.home?.logo} alt="logo" width="200" height="30" loading="lazy" />
          </Link>
          <form className="offcanvas-search mb-3" onSubmit={handleSearch}>
            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="পণ্য খুঁজুন..."
              className="form-control"
            />
            <button type="submit" className="btn btn-primary btn-sm mt-2 w-100">
              খুঁজুন
            </button>
          </form>
          <nav className="mobile-menu-wrapper mt-3">
            <ul>
              {!session?.data?.user?.email ? (
                <><li><Link href="/login" onClick={closeOffcanvas}>Login</Link></li><li><Link href="/singup" onClick={closeOffcanvas}>Registration</Link></li></>
              ) : session.data.user.role !== "Customer" ? (
                <li><Link href="/admin" onClick={closeOffcanvas}>Dashboard</Link></li>
              ) : (
                <>
                  <li><Link href="/my-account" onClick={closeOffcanvas}>My Account</Link></li>
                  <li><Link href="/cart" onClick={closeOffcanvas}>My Cart</Link></li>
                  <li><button type="button" className="bg-transparent border-0 p-0" onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button></li>
                </>
              )}
              <li className="has-submenu">
                <Link href="#" onClick={(event) => { event.preventDefault(); setActiveSubmenu((current) => current === "categories" ? null : "categories"); }}>
                  All Product Categories <span className="ms-1 fs-xs float-end"><i className="fa-solid fa-angle-right"></i></span>
                </Link>
                <ul className={activeSubmenu === "categories" ? "d-block" : "d-none"}>
                  {categorys?.map((category) => (
                    <li key={category._id}>
                      <Link href={`/products/category=${category.name.replace(/\s+/g, "").toLowerCase()}=${category._id}`} onClick={closeOffcanvas} className="d-flex align-items-center">
                        <img src={optimizeCloudinaryUrl(category.icon, 48)} alt={category.name} width="32" height="32" className="rounded-circle me-2" style={{ objectFit: "contain" }} />
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {menuItems.map((item) => <li key={item.href}><Link href={item.href} onClick={closeOffcanvas}>{item.name}</Link></li>)}
              <li><Link href="/cart" onClick={closeOffcanvas}>কার্ট ({mounted ? totalItems : 0})</Link></li>
            </ul>
          </nav>
          <div className="offcanvas-contact mt-15">
            <h5 className="mb-5">Contact Info</h5>
            <address>
              {setting?.contact?.contact_office_address_one}<br />
              <a href={`tel:${setting?.contact?.contact_emergency_call || ""}`}>{setting?.contact?.contact_emergency_call}</a><br />
              <a href={`mailto:${setting?.contact?.contact_general_comunication || ""}`}>{setting?.contact?.contact_general_comunication}</a>
            </address>
          </div>
          <div className="social-contact offcanvas_social mt-4">
            <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_facebook_link || "#"} aria-label="Facebook"><i className="fab fa-facebook-f"></i></Link>
            <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_linkdin_link || "#"} aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></Link>
            <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_twitter_link || "#"} aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
            <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_youtube_link || "#"} aria-label="YouTube"><i className="fab fa-youtube"></i></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
