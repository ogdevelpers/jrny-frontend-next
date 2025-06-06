import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './PartnerSlider.css';

type PartnerSliderProps = {
  brandLogos: any[]; 
};

const PartnerSlider: React.FC<PartnerSliderProps> = ({brandLogos}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const handleResize = () => {
    if (animationRef.current) {
      // Kill existing animation
      animationRef.current.kill();
      
      playMarkee();
    }
  };

  const playMarkee = ()=>{
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;

    // Target the correct elements - first-partner and second-partner divs
    const firstPartner = sliderElement.querySelector('.first-partner') as HTMLElement;
    const secondPartner = sliderElement.querySelector('.second-partner') as HTMLElement;
    
    if (!firstPartner || !secondPartner) return;
    
    // Calculate total width of the first partner section (including all images)
    const totalWidth = firstPartner.offsetWidth;
    
    // Create infinite loop animation
    animationRef.current = gsap.to([firstPartner, secondPartner], {
      x: `-${totalWidth}px`,
      duration: 32, // slower speed for smoother animation 
      repeat: -1, 
      ease:"linear",
      onRepeat: () => {
        // Reset position when animation repeats
        gsap.set([firstPartner, secondPartner], { x: 0 });
      }
    });

  }

  // Initialize animation using useGSAP within the scope of containerRef
  useGSAP(() => {


    playMarkee();

    
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      window.removeEventListener('resize', handleResize);
    };


  }, { scope: containerRef });

 

  // Pause/resume animation on hover
  const handleMouseEnter = () => {
    if (animationRef.current) {
      // animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      // animationRef.current.play();
    }
  };

  return (
    <div
      className="partner-slider"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="partner-slider-container">
        <div className="partner-images" ref={sliderRef}>
          {/* First set of images */}
          <div className="first-partner">
            {brandLogos?.map((element: any) => (
              <div className="partner-image" key={element.key}>
                <img
                  className="partner-image-img"
                  src={element.brandLogoLink}
                  alt={element.brandName}
                  loading="lazy"
                  width="100"
                  height="50"
                />
              </div>
            ))} 
          </div>
          <div className="second-partner">
            {brandLogos?.map((element: any) => (
              <div className="partner-image" key={element.key} aria-hidden="true">
                <img
                  className="partner-image-img"
                  src={element.brandLogoLink}
                  alt="" // Alt text for aria-hidden elements can be empty
                  loading="lazy"
                  width="100"
                  height="50"
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