'use client';
import React from 'react';

type Props = React.ComponentPropsWithoutRef<'h1'>;

/**
 * H1Reset
 * - Renders a semantic <h1>
 * - Resets all default browser/h1 styles so you can style via className
 */
export default function H1({ children, className, style, ...rest }: Props) {
  const resetStyle: React.CSSProperties = {
    all: 'unset', // remove browser default h1 styles
    display: 'block', // restore block semantics
  };

  return (
    <h1
      {...rest}
      className={className}
      style={{ ...resetStyle, ...(style || {}) }}
    >
      {children}
    </h1>
  );
}