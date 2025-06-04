import { useGSAP } from "@gsap/react";
import "./carasoul.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Card from "./Card";


export default function Carasoul({ testimonial }: any) {
  const [active, setActive] = useState(false);
  const carSliderRef = useRef<HTMLDivElement>(null);
  const carTagRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const handleResize = () => {
    if (animationRef.current) {
      // Kill existing animation
      animationRef.current.kill();

      playMarkee();
    }
  };

  const playMarkee = () => {
    const carSlider = carSliderRef.current;
    const carTag = carTagRef.current;

    if (!carSlider || !carTag) {
      return;
    }

    const totalWidth = carTag.getBoundingClientRect().width;

    // Create the animation
    animationRef.current = gsap.to(carSlider, {
      x: `-${totalWidth}px`, // Use exact pixel value
      duration: 30,
      ease: 'linear',
      repeat: -1,
    });
  }

  useGSAP(() => {
    const carSlider = carSliderRef.current;
    if (!carSlider) return;

    playMarkee();
    window.addEventListener('resize', handleResize);


    carSlider.addEventListener('mouseenter', handleMouseEnter);
    carSlider.addEventListener('mouseleave', handleMouseLeave);


    // Return cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      carSlider.removeEventListener('mouseenter', handleMouseEnter);
      carSlider.removeEventListener('mouseLeave', handleMouseEnter);

      window.removeEventListener('resize', handleResize);
    };

  }, []);




  // Pause/resume animation on hover
  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };



  return (
    <div className='carousel-component'>
      <div className="carousel-slider" ref={carSliderRef} id="yourID">
        <div className="carousel-container" ref={carTagRef}>
          {
            testimonial?.map((card: any, index: number) => (
              <Card key={index} profileName={card.name} profileDesignation={card.jobTitle}
                compliment={card.message} active={active} />

            ))
          }
        </div>
        <div className="carousel-container" >
          {
            testimonial?.map((card: any, index: number) => (
              <Card key={index} profileName={card.name} profileDesignation={card.jobTitle}
                compliment={card.message} active={active} />
            ))
          }
        </div>
        <div className="carousel-container" >
          {
            testimonial?.map((card: any, index: number) => (
              <Card key={index} profileName={card.name} profileDesignation={card.jobTitle}
                compliment={card.message} active={active} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

