"use client";

import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import Link from "next/link";
import { useEffect, useRef } from "react";
import useCategory from "../../dataFetching/useCategory";
import { useMainContext } from "../../provider/MainContextStore";

const CategoryDrawer = () => {
  const { openCategoryDrawer, setOpenCategoryDrawer } = useMainContext();
  const { categorys } = useCategory();
  const panelRef = useRef(null);
  const close = () => setOpenCategoryDrawer(false);

  useEffect(() => {
    const handleKeyDown = (event) => event.key === "Escape" && close();
    const handleOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) close();
    };
    if (openCategoryDrawer) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [openCategoryDrawer]);

  return (
    <>
      {openCategoryDrawer && (
        <div
          onClick={close}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1090 }}
        />
      )}
      <aside
        ref={panelRef}
        aria-hidden={!openCategoryDrawer}
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: openCategoryDrawer ? 0 : -320,
          width: "min(320px, 88vw)",
          zIndex: 1100,
          background: "#fff",
          transition: "left .25s ease",
          overflowY: "auto",
          padding: 24,
        }}
      >
        <button type="button" className="offcanvas-close" onClick={close} aria-label="Close categories">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h5 className="mb-4">পণ্যের ক্যাটাগরি</h5>
        <ul className="list-unstyled mb-0">
          {categorys?.map((category) => (
            <li key={category._id} className="border-bottom">
              <Link
                href={`/products/category=${category.name.replace(/\s+/g, "").toLowerCase()}=${category._id}`}
                onClick={close}
                className="d-flex align-items-center gap-3 py-3 text-dark"
              >
                <img
                  src={optimizeCloudinaryUrl(category.icon, 48)}
                  alt={category.name}
                  width="40"
                  height="40"
                  style={{ objectFit: "contain" }}
                />
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default CategoryDrawer;
