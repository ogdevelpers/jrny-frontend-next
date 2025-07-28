'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './expandingvideo.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingVideo({heroData}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftCardsRef = useRef(null);
  const rightCardsRef = useRef(null);
  
  // State to store calculated dimensions
  const [dimensions, setDimensions] = useState({
    initialWidth: 0,
    finalWidth: 0,
    scaleRatio: 1,
    leftCardsInitialLeft: 0,
    rightCardsInitialRight: 0
  });

  // Calculate real pixel values from CSS min() functions using your initial values
  useEffect(() => {
    const calculateDimensions = () => {
      // Calculate min(45vw, 650px) for initial width (your original value)
      const initialWidth = Math.min(window.innerWidth * 0.45, 650);
      
      // Calculate min(74vw, 1400px) for final width (your original value)
      const finalWidth = Math.min(window.innerWidth * 0.74, 1400);
      
      // Calculate scale ratio
      const scaleRatio = finalWidth / initialWidth;
      
      // Calculate card positions - min(39vw, 550px) (your original values)
      const cardOffset = Math.min(window.innerWidth * 0.34, 550);
      const leftCardsInitialLeft = window.innerWidth * 0.48 - cardOffset;
      const rightCardsInitialRight = window.innerWidth * 0.474 - cardOffset;
      
      setDimensions({
        initialWidth,
        finalWidth,
        scaleRatio,
        leftCardsInitialLeft,
        rightCardsInitialRight
      });
    };

    calculateDimensions();
    
    // Recalculate on window resize
    const handleResize = () => calculateDimensions();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    const video = videoRef.current;
    const leftCards = gsap.utils.toArray('.left-card');
    const rightCards = gsap.utils.toArray('.right-card');
    const container = containerRef.current;

    if (!video || !leftCards.length || !rightCards.length || !container || dimensions.scaleRatio === 1) return;

    // Set initial video width using calculated dimensions
    gsap.set(video, {
      width: dimensions.initialWidth + 'px'
    });

    // Set initial card positions using calculated dimensions
    gsap.set('.left-cards', {
      left: dimensions.leftCardsInitialLeft + 'px'
    });

    gsap.set('.right-cards', {
      right: dimensions.rightCardsInitialRight + 'px'
    });

    // Initial page load animation
    const entranceTl = gsap.timeline();

    // Set initial positions (off-screen)
    gsap.set('.expanding-video', {
      y: window.innerHeight,
      opacity: 0,
      scale: 1 // Ensure scale starts at 1
    });

    gsap.set(leftCards, {
      xPercent: -230,
      opacity: 0
    });

    gsap.set(rightCards, {
      xPercent: 230,
      opacity: 0
    });

    // Entrance animations
    entranceTl
      .to('.expanding-video', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      })
      .to(leftCards, {
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .to(rightCards, {
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.8');

    // Scroll-based expansion animation using transform: scale()
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.expanding-video-container',
        start: 'top 45%',
        end: 'bottom bottom', 
        scrub: 0.3, // Reduced from 0.8 for more responsive, smoother scrolling
        // snap: 0.1,
      },
      defaults: {
        ease: 'none', // Linear easing for smoothest scroll-synced animation
      },
    });

    // Video expansion using scaleX for width and scaleY for height with different origins
    tl.fromTo('.expanding-video',
      {
        scaleX: 1,
        scaleY: 1,
        boxShadow: '0px 4px 24px 0px #FF5B0066'
      },
      {
        scaleX: dimensions.scaleRatio, // Scale width
        scaleY: dimensions.scaleRatio, // Scale height but only downward due to transform-origin
        boxShadow: '0px 8px 48px 0px #FF5B0099',
      }
    );

    // Calculate card movement distances in pixels for better performance
    const viewportHeight = window.innerHeight;
    const leftCardsMoveY = viewportHeight * 0.18; // 18vh in pixels
    const rightCardsMoveY = viewportHeight * 0.20; // 20vh in pixels
    
    // Card movements using pixel values
    tl.fromTo('.left-cards',
      {
        y: 0,
        xPercent: 0
      },
      {
        y: leftCardsMoveY,
        xPercent: -105,
      }, 0
    );

    tl.fromTo('.right-cards',
      {
        y: 0,
        xPercent: 0
      },
      {
        y: rightCardsMoveY,
        xPercent: 110,
      }, 0
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { 
    scope: containerRef,
    dependencies: [dimensions] // Re-run when dimensions change
  });

  const leftCardData = heroData?.Background_Image_Left;
  const rightCardData = heroData?.Background_Image_Right;

  return (
    <div className="expanding-video-wrapper" ref={containerRef}>
      <div className="expanding-video-container">
        {/* Left Cards */}
        <div className="left-cards" ref={leftCardsRef}>
          {leftCardData?.map((card: any, index: number) => (
            <div key={`left-${card.id}-${index}`} className="left-card card">
              <img src={card.thumbnail} alt={card.original} className="card-image" />
            </div>
          ))}
        </div>

        {/* Main Video */}
        <video
          ref={videoRef}
          src={heroData?.ShowReelVideoLink}
          autoPlay
          muted
          loop
          className="expanding-video"
        />

        {/* Right Cards */}
        <div className="right-cards" ref={rightCardsRef}>
          {rightCardData?.map((card: any, index: number) => (
            <div key={`right-${index}`} className="right-card card">
              <img src={card.thumbnail} alt={card.original} className="card-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}