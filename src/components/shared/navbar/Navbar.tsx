'use client';

import { useState, useEffect } from "react";
import "./navbar.css";
import useIsMobile from "../../../hooks/useIsMobile";
import { usePathname } from "next/navigation";
import Link from "next/link";

const routes = ["/", "/portfolio", "/about-us", "/blog", "/contact-us"];

export const NavBar = () => {
  const location = usePathname();
  const [active, setActive] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile(1000);

  useEffect(() => {
    const mainRoute = "/" + (location.split("/")[1] || "");
    setActive(mainRoute === "//" ? "/" : mainRoute);
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${mobileMenuOpen ? "mobile-menu-open" : ""}`}>
      {isMobile ? (
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
      ) : ( 
        <NavBarUl active={active} setActive={setActive} />
 
      )}
    </nav>
  );
};

const NavBarUl = ({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <ul className="navbar-list">
      {routes.map((route) => {
        const isActive = active === route;
        return (
          <li className="navbar-list-item" key={route}>
            <Link
              href={route}
              className={isActive ? "navbar-active" : ""}
              onClick={() => setActive(route)}
            >
              <span className="navbar-text">
                {route === "/" ? "Home" : route.replace("/", "").replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
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
