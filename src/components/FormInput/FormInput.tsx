import React, { useState } from 'react';
import './formInput.css';

interface InputProps {
  placeholder?: string;
  type?: string;
  classList?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = 'Enter text...',
  type = 'text',
  classList = '',
  name,
  value,
  onChange,
}) => {
  const [explode, setExplode] = useState(false);
  const [focused, setFocused] = useState(false);

  const triggerExplosion = () => {
    setExplode(true);
    setTimeout(() => setExplode(false), 200); // match animation duration
  };

  const handleFocus = () => {
    setFocused(true);
    triggerExplosion();
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className={`input-wrapper ${focused ? 'focused' : ''} ${explode ? 'explode' : ''}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`custom-input ${classList}`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={triggerExplosion}
      />
      <span className="plusIcon">
        +
        {explode && (
          <>
            <span className="projectile left" />
            <span className="projectile top" />
          </>
        )}
      </span>
    </div>
  );
};

export default Input;
