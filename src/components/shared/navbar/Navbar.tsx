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
 