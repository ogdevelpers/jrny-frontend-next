'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./MobileNavBar.css";
import { routes } from "@/lib/constants";

const routesArray = Object.values(routes);

const MobileNavBar = ( ) => {
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
        />
      </div>
    </div>
  );
};

const NavBarUlMobile = ({
  active,
  setActive,
  closeMenu,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  closeMenu: () => void;
}) => {
  return (
    <ul className="navbar-list-mobile">
      {routesArray.map((route) => {
        const isActive = active === route.path;
        return (
          <li className="navbar-list-item" key={route.path}>
            <Link
              href={route.path}
              className={isActive ? "navbar-active" : ""}
              onClick={() => {
                setActive(route.path);
                closeMenu();
              }}
            >
              {route.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileNavBar;