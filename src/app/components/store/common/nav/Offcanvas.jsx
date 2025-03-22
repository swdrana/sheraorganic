"use client";

import { menuItems } from "@/app/utils/data";
import { useMainContext } from "../../provider/MainContextStore";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useSetting from "../../dataFetching/useSetting";

const Offcanvas = () => {
  const { openOffcanvas, setOpenOffcanvas } = useMainContext();
  const offcanvasRef = useRef(null);

  // Close offcanvas when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        offcanvasRef.current &&
        !offcanvasRef.current.contains(event.target)
      ) {
        setOpenOffcanvas(false);
      }
    };

    if (openOffcanvas) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openOffcanvas, setOpenOffcanvas]);

  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleItemClick = (index, hasSubmenu) => {
    if (hasSubmenu) {
      setActiveSubmenu((prev) => (prev === index ? null : index));
    } else {
      setOpenOffcanvas(false);
    }
  };

  const { setting, settingLoading } = useSetting();
  return (
    <>
      <div
        ref={offcanvasRef}
        className={`offcanvas_menu position-fixed ${
          openOffcanvas ? "active" : ""
        }`}
      >
        <div className="tt-short-info d-none d-md-none d-lg-none d-xl-block">
          <button
            onClick={() => setOpenOffcanvas(false)}
            className="offcanvas-close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <Link href="/" className="logo-wrapper d-inline-block mb-5">
            <img src={setting?.home?.logo} alt="logo" />
          </Link>
          <div className="offcanvas-content">
            <h4 className="mb-4">About Us</h4>
            <p>{setting?.about?.about_top_description}</p>

            <Link
              onClick={() => setOpenOffcanvas(false)}
              href="/about"
              className="btn btn-primary mt-4"
            >
              About Us
            </Link>
          </div>
          <div className="offcanvas-contact mt-15">
            <h5 className="mb-5">Contact Info</h5>
            <address>
              {setting?.contact?.contact_office_address_one} <br />
              <a href="tel:+8801682648101">
                {setting?.contact?.contact_emergency_call}
              </a>{" "}
              <br />
              <a href="mailto:info@example.com">
                {setting?.contact?.contact_general_comunication}
              </a>
            </address>
          </div>
          <div className="social-contact offcanvas_social mt-4">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={setting?.home?.hero_facebook_link || "#"}
            >
              <i className="fab fa-facebook-f"></i>
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={setting?.home?.hero_linkdin_link || "#"}
            >
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={setting?.home?.hero_twitter_link || "#"}
            >
              <i className="fab fa-twitter"></i>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={setting?.home?.hero_youtube_link || "#"}
            >
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </div>
        <div className="mobile-menu d-md-block d-lg-block d-xl-none">
          <button
            onClick={() => setOpenOffcanvas(false)}
            className="offcanvas-close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <a href="#" className="d-inline-block mb-5">
            <img src={setting?.home?.logo} alt="logo" />
          </a>
          <nav className="mobile-menu-wrapper mt-4">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className={item.submenu ? "has-submenu" : ""}>
                  <Link
                    href={item.href || "#"}
                    onClick={() => handleItemClick(index, item.submenu)}
                  >
                    {item.name}
                    {item.submenu && (
                      <span className="ms-1 fs-xs float-end">
                        <i className="fa-solid fa-angle-right"></i>
                      </span>
                    )}
                  </Link>
                  {item.submenu && (
                    <ul
                      className={activeSubmenu === index ? "d-block" : "d-none"}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            onClick={() => setOpenOffcanvas(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="offcanvas-contact mt-15">
            <h5 className="mb-5">Contact Info</h5>
            <address>
              {setting?.contact?.contact_office_address_one} <br />
              <a href="tel:+8801682648101">
                {setting?.contact?.contact_emergency_call}
              </a>{" "}
              <br />
              <a href="mailto:info@example.com">
                {setting?.contact?.contact_general_comunication}
              </a>
            </address>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
