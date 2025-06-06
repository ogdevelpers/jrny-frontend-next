'use client';

import { useState, useEffect } from "react";
import "./navbar.css"; 
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "@/lib/constants";

export const NavBar = () => {
  const location = usePathname();
  const [active, setActive] = useState(""); 

  useEffect(() => {
    const mainRoute = "/" + (location.split("/")[1] || "");
    setActive(mainRoute === "//" ? "/" : mainRoute); 
  }, [location]);

  return (
    <nav className={`navbar `}>
      <NavBarUl active={active} setActive={setActive} />
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
        const isActive = active === route.path;
        return (
          <li className="navbar-list-item" key={route.path}>
            <Link
              href={route.path}
              className={isActive ? "navbar-active" : ""}
              onClick={() => setActive(route.path)}
            >
              <span className="navbar-text">
                {route.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};