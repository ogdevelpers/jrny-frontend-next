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
    const mainRoute = "/" + (location.split("/")[1] || "");
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
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}

      <div className={`mobile-sidebar ${mobileMenuOpen ? "open" : ""}`}>
        <NavBarUlMobile
          active={active}
          setActive={setActive}
          closeMenu={() => setMobileMenuOpen(false)}
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

  const routesArray = Object.values(navBarData);

  return (
    <ul className="navbar-list-mobile">
      {routesArray.map((route: any) => {
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