import React, { useState } from 'react';
import './button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'draw' | 'meet';
  classList: string;
  onClick?: () => void; // 👈 added support
}

const Button: React.FC<ButtonProps> = ({ children, classList, variant = 'draw', onClick }) => {
  const [explode, setExplode] = useState(false);
  const [active, setActive] = useState(false);

  const triggerExplosion = () => {
    setExplode(true);
    setTimeout(() => setExplode(false), 200);
  };

  const handleClick = () => {
    setActive(true);
    triggerExplosion();

    if (onClick) onClick(); // 👈 trigger external onClick from parent

    setTimeout(() => setActive(false), 500);
  };

  return (
    <button
      className={`button-base ${active ? 'active' : ''} ${variant} ${explode ? 'explode' : ''} ${classList}`}
      onClick={handleClick}
      onMouseEnter={triggerExplosion}
    >
      <div className="button-content">
        {children}
      </div>
      <span className="plusButton">
        +
        {explode && (
          <>
            <span className="projectile left" />
            <span className="projectile top" />
          </>
        )}
      </span>
    </button>
  );
};

export default Button;
