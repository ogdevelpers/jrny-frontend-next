import { useGSAP } from "@gsap/react";
import "./carasoul.css";
import { useCallback, useRef, useState, useMemo, useEffect, forwardRef } from "react";
import gsap from "gsap";
import Card from "./Card";

interface TestimonialItem {
  name: string;
  jobTitle: string;
  message: string;
}

interface EnhancedCardProps {
  card: TestimonialItem;
  active: boolean;
  isMobile: boolean;
  isVisible: boolean;
  setIsPaused: (paused: boolean) => void;
  animationRef: React.MutableRefObject<gsap.core.Tween | null>;
}

// Extracted EnhancedCard into its own component
const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ card, active, isMobile, isVisible, setIsPaused, animationRef }, ref) => {
    const hoverTween = useRef<gsap.core.Tween | null>(null);

    const handleCardMouseEnter = useCallback(() => {
      // It's safer to check ref.current directly as `ref` itself might be the ref object or a function
      if (!ref || typeof ref === 'function' || !ref.current || isMobile) return;

      // Pause carousel animation when hovering over any card
      setIsPaused(true);
      if (animationRef.current) {
        animationRef.current.pause();
      }

      // Kill any existing hover animation
      if (hoverTween.current) {
        hoverTween.current.kill();
      }

      // Smooth scale up with GSAP
      hoverTween.current = gsap.to(ref.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        transformOrigin: "center center",
        force3D: true,
        // Bring card forward
        zIndex: 10,
      });
    }, [isMobile, setIsPaused, animationRef, ref]);  

    const handleCardMouseLeave = useCallback(() => {
      // It's safer to check ref.current directly as `ref` itself might be the ref object or a function
      if (!ref || typeof ref === 'function' || !ref.current || isMobile) return;

      // Resume carousel animation
      setIsPaused(false);
      if (animationRef.current && isVisible) {
        animationRef.current.play();
      }

      // Kill any existing hover animation
      if (hoverTween.current) {
        hoverTween.current.kill();
      }

      // Smooth scale back to normal
      hoverTween.current = gsap.to(ref.current, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        transformOrigin: "center center",
        force3D: true,
        zIndex: 1,
      });
    }, [isMobile, isVisible, setIsPaused, animationRef, ref]); // Added ref to dependency array

    return (
      <div
        ref={ref} // Assign the ref passed from the parent
        className="card-wrapper"
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transformOrigin: 'center center',
          position: 'relative',
          zIndex: 1,
          willChange: 'transform',
        }}
      >
        <Card
          profileName={card.name}
          profileDesignation={card.jobTitle}
          compliment={card.message}
          active={active}
        />
      </div>
    );
  }
);

// Add the displayName property here
EnhancedCard.displayName = 'EnhancedCard';

interface CarouselProps {
  testimonial: TestimonialItem[];
}

export default function Carousel({ testimonial }: CarouselProps) {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const carSliderRef = useRef<HTMLDivElement>(null);
  const carTagRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Detect mobile devices and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    const checkReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      setReducedMotion(prefersReducedMotion);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Intersection Observer for visibility optimization
  useEffect(() => {
    if (!carSliderRef.current) return;

    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);

        if (!entry.isIntersecting && animationRef.current) {
          animationRef.current.pause();
        } else if (entry.isIntersecting && animationRef.current && !isPaused) {
          animationRef.current.play();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    intersectionObserverRef.current.observe(carSliderRef.current);

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [isPaused]); // isPaused is a dependency because the play/pause logic depends on its value

  // Memoize testimonial cards with enhanced hover functionality
  const testimonialCards = useMemo(() => {
    if (!testimonial?.length) return [];

    return testimonial.map((card, index) => (
      <EnhancedCard
        key={`${card.name}-${index}`}
        card={card}
        active={active}
        isMobile={isMobile}
        isVisible={isVisible}
        setIsPaused={setIsPaused}
        animationRef={animationRef}
      />
    ));
  }, [testimonial, active, isMobile, isVisible, setIsPaused, animationRef]); // Added animationRef as a dependency

  const playMarquee = useCallback(() => {
    const carSlider = carSliderRef.current;
    const carTag = carTagRef.current;

    if (!carSlider || !carTag || !isVisible || isPaused) return;

    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Skip animation if reduced motion is preferred
    if (reducedMotion) {
      return;
    }

    const totalWidth = carTag.getBoundingClientRect().width;

    // Mobile-specific optimizations
    const mobileConfig = {
      duration: isMobile ? 40 : 30,
      ease: 'none',
      repeat: -1,
      force3D: true,
      ...(isMobile && {
        immediateRender: false,
        lazy: false,
      }),
    };

    // Set CSS optimizations
    if (carSlider) {
      carSlider.style.willChange = 'transform';
      if (isMobile) {
        carSlider.style.transform = 'translateZ(0)';
        carSlider.style.backfaceVisibility = 'hidden';
      }
    }

    animationRef.current = gsap.to(carSlider, {
      x: `-${totalWidth}px`,
      ...mobileConfig,
      onComplete: () => {
        if (carSlider) {
          carSlider.style.willChange = 'auto';
        }
      },
    });
  }, [isMobile, isVisible, reducedMotion, isPaused]); // No changes here

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    const debounceTime = isMobile ? 300 : 150;

    resizeTimeoutRef.current = setTimeout(() => {
      playMarquee();
    }, debounceTime);
  }, [playMarquee, isMobile]); // No changes here

  useGSAP(
    () => {
      const carSlider = carSliderRef.current;
      if (!carSlider || !testimonial?.length) return;

      // Initial animation setup
      playMarquee();

      // Add resize listener
      window.addEventListener('resize', handleResize, { passive: true });

      // Page visibility API for mobile battery optimization
      const handleVisibilityChange = () => {
        if (document.hidden && animationRef.current) {
          animationRef.current.pause();
        } else if (!document.hidden && animationRef.current && isVisible && !isPaused) {
          animationRef.current.play();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

      // Cleanup function
      return () => {
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }

        if (animationRef.current) {
          animationRef.current.kill();
        }

        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);

        if (carSlider) {
          carSlider.style.willChange = 'auto';
        }
      };
    },
    {
      scope: carSliderRef,
      dependencies: [testimonial, handleResize, playMarquee, isPaused, isVisible, animationRef], // Added animationRef here
    }
  );

  // Early return if no testimonials
  if (!testimonial?.length) {
    return null;
  }

  // Render fewer duplicate containers on mobile
  const containerCount = isMobile ? 2 : 3;

  return (
    <div className='carousel-component'>
      <div
        className={`carousel-slider ${isMobile ? 'mobile-optimized' : ''}`}
        ref={carSliderRef}
        style={{
          ...(isMobile && {
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
          }),
        }}
      >
        {Array.from({ length: containerCount }, (_, i) => (
          <div key={i} className="carousel-container" {...(i === 0 && { ref: carTagRef })}>
            {testimonialCards}
          </div>
        ))}
      </div>
    </div>
  );
}