'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./MobileNavBar.css";
import { routes } from "@/lib/constants";

const MobileNavBar = ( {navBar}: any ) => {
  const location = usePathname();
  const [active, setActive] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen]= useState(false);

  useEffect(() => {
    const mainRoute = "/" + (location?.split("/")[1] || "");
    setActive(mainRoute === "//" ? "/" : mainRoute);
    setMobileMenuOpen(false);
  }, [location, setActive]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="mobile-nav-wrapper">
      <div className="navbar-mobile-container">
        <button
          className="navbar-burger-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <img
            className="navbar-burger-icon"
            src="/burger_mobile.png"
            alt="Menu"
          />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      <div className={`mobile-sidebar ${mobileMenuOpen ? "open" : ""}`}>
        {/* X Close Button */}
        <button
          className="mobile-close-button"
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <NavBarUlMobile
          active={active}
          setActive={setActive}
          closeMenu={closeMobileMenu}
          navBarData={navBar}
        />
      </div>
    </div>
  );
};

const NavBarUlMobile = ({
  active,
  setActive,
  closeMenu,
  navBarData,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  closeMenu: () => void;
  navBarData: any;
}) => {
 
  return (
    <ul className="navbar-list-mobile">
      {navBarData?.map((route: any) => {
        const isActive = active === route.url;
        return (
          <li className="navbar-list-item" key={route.url}>
            <Link
              href={route.url}
              className={isActive ? "navbar-active" : ""}
              onClick={() => {
                setActive(route.url);
                closeMenu();
              }}
            >
              {route.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileNavBar;