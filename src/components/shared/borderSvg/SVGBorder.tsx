import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin, useGSAP);

interface SVGBorderProps {
  children: React.ReactNode;
  strokeWidth?: number;
  strokeColor?: string;
  hoverColor?: string;
  borderRadius?: number;
  className?: string;
  duration?: number;
}

const SVGBorder: React.FC<SVGBorderProps> = ({
  children,
  strokeWidth = 2,
  strokeColor = '#FF5B00',
  hoverColor = '#FFB500',
  borderRadius = 0,
  className = '',
  duration = 0.8
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  useGSAP(() => {
    if (!rectRef.current) return;

    // Initial state - invisible
    gsap.set(rectRef.current, {
      drawSVG: '0% 0%',
      stroke: strokeColor
    });

    // Animation timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(rectRef.current, {
      drawSVG: '100%',
      duration: duration * 0.75,
      ease: 'power2.inOut'
    });

    tl.to(rectRef.current, {
      stroke: hoverColor,
      duration: duration * 0.25,
      ease: 'power1.out'
    }, '<0.5');

    return tl;
  }, [strokeColor, hoverColor, duration]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ padding: strokeWidth }}
    >
      {children}
      
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <rect
          ref={rectRef}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width="100%"
          height="100%"
          rx={borderRadius}
          ry={borderRadius}
          fill="none"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default SVGBorder