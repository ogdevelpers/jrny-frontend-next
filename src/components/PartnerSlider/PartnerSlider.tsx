import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './PartnerSlider.css';

type PartnerSliderProps = {
  brandLogos: any[];
};

const PartnerSlider: React.FC<PartnerSliderProps> = ({ brandLogos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const playMarquee = useCallback(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    // Target the correct elements - first-partner and second-partner divs
    const firstPartner = sliderElement.querySelector('.first-partner') as HTMLElement;
    const secondPartner = sliderElement.querySelector('.second-partner') as HTMLElement;
    
    if (!firstPartner || !secondPartner) return;
    
    // Calculate total width of the first partner section
    const totalWidth = firstPartner.getBoundingClientRect().width;
    
    // Adjust animation duration based on screen size for better mobile experience
    const isMobile = window.innerWidth <= 768;
    const duration = isMobile ? 20 : 32; // faster on mobile for better UX
    
    // Create infinite loop animation
    animationRef.current = gsap.to([firstPartner, secondPartner], {
      x: `-${totalWidth}px`,
      duration,
      repeat: -1,
      ease: "none", // Use "none" instead of "linear" for consistent timing
      onRepeat: () => {
        // Reset position when animation repeats
        gsap.set([firstPartner, secondPartner], { x: 0 });
      }
    });
  }, []);

  const handleResize = useCallback(() => {
    if (animationRef.current) {
      // Kill existing animation
      animationRef.current.kill();
      animationRef.current = null;
    }
    
    // Use requestAnimationFrame to ensure DOM has updated after resize
    requestAnimationFrame(() => {
      playMarquee();
    });
  }, [playMarquee]);

  // Initialize animation using useGSAP within the scope of containerRef
  useGSAP(() => {
    playMarquee();
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, { scope: containerRef });

  // Early return if no brand logos
  if (!brandLogos || brandLogos.length === 0) {
    return null;
  }

  return (
    <div className="partner-slider" ref={containerRef}>
      <div className="partner-slider-container" ref={sliderRef}>
        <div className="partner-images">
          {/* First set of images */}
          <div className="first-partner">
            {brandLogos.map((logo) => (
              <div key={`first-${logo.id}`} className="partner-image">
                <img
                  src={logo.brandLogoLink}
                  alt={logo.alt}
                  className="partner-image-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Second set of images (duplicate for seamless loop) */}
          <div className="second-partner">
            {brandLogos.map((logo) => (
              <div key={`second-${logo.id}`} className="partner-image">
                <img
                  src={logo.brandLogoLink}
                  alt={logo.alt}
                  className="partner-image-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSlider;