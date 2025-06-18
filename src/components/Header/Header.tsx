'use client';

import { useState, useEffect } from 'react';
import { Logo } from "../shared/navbar/Logo";
import MobileNavBar from "../shared/navbar/MobileNavbar";
import { NavBar } from "../shared/navbar/Navbar";

export default function Header({header}: any) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down (only after scrolling past 100px)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let timeoutId: any= null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 10);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`header ${isVisible ? 'header-visible' : 'header-hidden'}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        willChange: 'transform'
      }}
    >
      <div className="logo-div">
        <Logo logo={header?.Logo}/>
      </div>
      <div className="navbar-div">
        <NavBar navBar={header?.Links}/> 
      </div>
      <div className="mobile-navbar-div">
        <MobileNavBar navBar={header?.Links}/>
      </div>
    </header>
  );
}