'use client';

import { useState, useEffect } from "react";
import "./navbar.css"; 
import { usePathname } from "next/navigation";
import Link from "next/link";
import { routes } from "@/lib/constants";

export const NavBar = ({navBar}: any) => {
  const location = usePathname();
  const [active, setActive] = useState(""); 

  useEffect(() => {
    const mainRoute = "/" + (location?.split("/")[1] || "");
    setActive(mainRoute === "//" ? "/" : mainRoute); 
  }, [location]);

  return (
    <nav className={`navbar `}>
      <NavBarUl active={active} setActive={setActive} navBarData={navBar} />
    </nav>
  );
};

const NavBarUl = ({
  active,
  setActive,
  navBarData,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  navBarData: any;
}) => {
  return (
    <ul className="navbar-list">
      {navBarData?.map((route: any) => {
        const isActive = active === route.url;
        return (
          <li className="navbar-list-item" key={route.url}>
            <Link
              href={route.url}
              className={isActive ? "navbar-active" : ""}
              onClick={() => setActive(route.url)}
            >
              <span className="navbar-text">
                {route.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};