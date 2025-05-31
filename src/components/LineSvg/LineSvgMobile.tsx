import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import { useGSAP } from '@gsap/react';
import useIsMobile from '../../hooks/useIsMobile';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const LineSvgMobile: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const movingGroupRef = useRef<SVGGElement>(null);
  const [rightEdge, setRightEdge] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setRightEdge(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    if (!pathRef.current || !movingGroupRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const moving = movingGroupRef.current;
    const svg = svgRef.current;

    // Get SVG dimensions and viewport info
    const svgRect = svg.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate path bounds to understand the full travel distance
    const pathBBox = path.getBBox();
    const pathWidth = pathBBox.width;
    const pathHeight = pathBBox.height;
    
    // Calculate the maximum dimension to ensure full visibility
    const maxDimension = Math.max(pathWidth, pathHeight);
    
    // Dynamic scroll distance calculation
    const baseScrollDistance = svgRect.height + viewportHeight;
    const pathTravelBuffer = maxDimension * 0.5;
    const totalScrollDistance = baseScrollDistance + pathTravelBuffer;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top bottom",
        end: "bottom 40%", 
        scrub: true,
        markers: true, // Remove in production
      }
    });

    tl.fromTo(moving, 
      { 
        x: -100, 
        y: -100,
        scale: 0.3, // Scale down to fit better in the SVG coordinate system
        opacity: 1
      }, 
      {
        ease: "none",
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        scale: 0.35, // Slight scale change during animation
        duration: 1
      }
    );

    // Handle window resize to recalculate distances
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, { scope: svgRef });

  const isMobile = useIsMobile(450);

  const smallScreen = `M${rightEdge/2},40 L${rightEdge/2},40 L${rightEdge/2},160 L2,300 L2,1850 L${rightEdge},1900 L${rightEdge},3040 L2,3140 L2,3290`;

  const d = isMobile ? smallScreen
    : `M${rightEdge/2},40 L${rightEdge/2},40 L${rightEdge/2},160 L2,300 L2,1900 L${rightEdge},1950 L${rightEdge},3380 L2,3440 L2,3590`;

  return (
    <div style={{ position: 'relative' }}>
      {/* Combined SVG with path and moving element */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${rightEdge} 4000`}
        style={{ 
          width: '100%', 
          height: '4000px', 
          position: 'absolute'
        }}
      >
        {/* Define filters and gradients */}
        <defs>
          <filter id="filter0_ddddddf_1156_2104" x="0.117996" y="0.117996" width="532.04" height="407.764" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2.2605"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.329412 0 0 0 0 0.0313726 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1156_2104"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="4.521"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.329412 0 0 0 0 0.0313726 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow_1156_2104" result="effect2_dropShadow_1156_2104"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="15.8235"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.329412 0 0 0 0 0.0313726 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect2_dropShadow_1156_2104" result="effect3_dropShadow_1156_2104"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="31.647"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.329412 0 0 0 0 0.0313726 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect3_dropShadow_1156_2104" result="effect4_dropShadow_1156_2104"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="54.252"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.329412 0 0 0 0 0.0313726 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect4_dropShadow_1156_2104" result="effect5_dropShadow_1156_2104"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="94.941"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.329412 0 0 0 0 0.0313726 0 0 0 1 0"/>
            <feBlend mode="normal" in2="effect5_dropShadow_1156_2104" result="effect6_dropShadow_1156_2104"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_1156_2104" result="shape"/>
            <feGaussianBlur stdDeviation="13.45" result="effect7_foregroundBlur_1156_2104"/>
          </filter>
          <radialGradient id="paint0_radial_1156_2104" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(266.138 256) scale(76.1381 14)">
            <stop stopColor="#FFCB64"/>
            <stop offset="1" stopColor="#FF4900"/>
          </radialGradient>
        </defs>

        {/* The path that the element follows - uses responsive path based on screen size */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="#FF5B00"
          strokeWidth="4"
        />

        {/* Moving element group */}
        <g 
          ref={movingGroupRef}
          opacity="0.6" 
          filter="url(#filter0_ddddddf_1156_2104)"
          style={{
            transformOrigin: 'center',
            willChange: 'transform'
          }}
        >
          <path 
            d="M190 204C190 196.268 196.268 190 204 190H328.276C336.008 190 342.276 196.268 342.276 204V204C342.276 211.732 336.008 218 328.276 218H204C196.268 218 190 211.732 190 204V204Z" 
            fill="url(#paint0_radial_1156_2104)"
          />
        </g>
      </svg>
    </div>
  );
};

export default LineSvgMobile;