import React, { useState } from 'react';
import './textarea.css'


interface TextareaProps {
  placeholder?: string;
  classList?: string;
  name?: string;
  value?: string;
  rows?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder = 'Enter text...',
  classList = '',
  name,
  value,
  rows = 4,
  cols,
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
    <div className={`textarea-wrapper ${focused ? 'focused' : ''} ${explode ? 'explode' : ''}`}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        className={`custom-textarea ${classList}`}
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

export default Textarea;