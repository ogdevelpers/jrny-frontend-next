 'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./MobileNavBar.css"; // Ensure you create this CSS file
import { routes } from "@/lib/constants";

// These routes should ideally be imported from a shared constants file

 
const MobileNavBar = ( ) => {
  const location = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [active, setActive] = useState(""); 

  // Close menu on route change and update active state
  useEffect(() => {
    const mainRoute = "/" + (location.split("/")[1] || "");
    setActive(mainRoute === "//" ? "/" : mainRoute);
    setMobileMenuOpen(false); // Close menu when navigating
  }, [location, setActive]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="mobile-nav-wrapper"> {/* Top-level wrapper for mobile nav */}
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

      {/* Overlay: Render conditionally only when menu is open */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}

      {/* Sidebar: Render conditionally and apply 'open' class */}
      {/* The `visibility` and `pointer-events` transitions are managed by CSS */}
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

// --- Mobile Navigation List Component (Moved from original NavBar) ---
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
      {routes.map((route) => {
        const isActive = active === route;
        return (
          <li className="navbar-list-item" key={route}>
            <Link
              href={route}
              className={isActive ? "navbar-active" : ""}
              onClick={() => {
                setActive(route);
                closeMenu();
              }}
            >
              {route === "/" ? "Home" : route.replace("/", "").replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MobileNavBar;