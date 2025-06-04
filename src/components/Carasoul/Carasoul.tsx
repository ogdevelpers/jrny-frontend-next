import { useGSAP } from "@gsap/react";
import "./carasoul.css";
import { useCallback, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import Card from "./Card";

interface TestimonialItem {
  name: string;
  jobTitle: string;
  message: string;
}

interface CarouselProps {
  testimonial: TestimonialItem[];
}

export default function Carousel({ testimonial }: CarouselProps) {
  const [active, setActive] = useState(false);
  const carSliderRef = useRef<HTMLDivElement>(null);
  const carTagRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize testimonial cards to prevent unnecessary re-renders
  const testimonialCards = useMemo(() => 
    testimonial?.map((card, index) => (
      <Card 
        key={`${card.name}-${index}`} 
        profileName={card.name} 
        profileDesignation={card.jobTitle}
        compliment={card.message} 
        active={active} 
      />
    )) || [], 
    [testimonial, active]
  );

  const playMarquee = useCallback(() => {
    const carSlider = carSliderRef.current;
    const carTag = carTagRef.current;

    if (!carSlider || !carTag) return;

    // Kill existing animation before creating new one
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const totalWidth = carTag.getBoundingClientRect().width;

    // Use transform3d for hardware acceleration and better performance
    animationRef.current = gsap.to(carSlider, {
      x: `-${totalWidth}px`,
      duration: 30,
      ease: 'none', // 'none' is more performant than 'linear' for continuous animations
      repeat: -1,
      force3D: true, // Force hardware acceleration
      // Use will-change CSS property for better performance
      onStart: () => {
        if (carSlider) {
          carSlider.style.willChange = 'transform';
        }
      },
      onComplete: () => {
        if (carSlider) {
          carSlider.style.willChange = 'auto';
        }
      }
    });
  }, []);

  // Debounced resize handler for better performance
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      playMarquee();
    }, 150); // 150ms debounce
  }, [playMarquee]);

  // Optimized mouse event handlers
  const handleMouseEnter = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  useGSAP(() => {
    const carSlider = carSliderRef.current;
    if (!carSlider || !testimonial?.length) return;

    // Initial animation setup
    playMarquee();

    // Add event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    carSlider.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    carSlider.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Cleanup function
    return () => {
      // Clear resize timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Kill animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      if (carSlider) {
        carSlider.removeEventListener('mouseenter', handleMouseEnter);
        carSlider.removeEventListener('mouseleave', handleMouseLeave);
        // Reset will-change property
        carSlider.style.willChange = 'auto';
      }
    };
  },{scope: carSliderRef, dependencies:[testimonial, handleResize, handleMouseEnter, handleMouseLeave, playMarquee]});

  // Early return if no testimonials
  if (!testimonial?.length) {
    return null;
  }

  return (
    <div className='carousel-component'>
      <div className="carousel-slider" ref={carSliderRef}>
        <div className="carousel-container" ref={carTagRef}>
          {testimonialCards}
        </div>
        <div className="carousel-container">
          {testimonialCards}
        </div>
        <div className="carousel-container">
          {testimonialCards}
        </div>
      </div>
    </div>
  );
}