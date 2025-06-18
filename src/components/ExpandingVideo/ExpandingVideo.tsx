'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './expandingvideo.css';
import { showReelVideoUrl } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingVideo({heroData}: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef(null);
  const leftCardsRef = useRef(null);
  const rightCardsRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    const leftCards = gsap.utils.toArray('.left-card');
    const rightCards = gsap.utils.toArray('.right-card');
    const container = containerRef.current;

    if (!video || !leftCards.length || !rightCards.length || !container) return;

    // Initial page load animation
    const entranceTl = gsap.timeline();

    // Set initial positions (off-screen)
    gsap.set('.expanding-video', {
      y: window.innerHeight, // Start from bottom of screen
      opacity: 0
    });

    gsap.set(leftCards, {
      xPercent: -230, // Start further left (relative to their CSS transform)
      opacity: 0
    });

    gsap.set(rightCards, {
      xPercent: 230, // Start further right (relative to their CSS transform)
      opacity: 0
    });

    // Entrance animations
    entranceTl
      .to('.expanding-video', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out' // Good for initial entrance
      })
      .to(leftCards, {
        xPercent: 0, // Move to their CSS-defined position
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out' // Consistent ease for entrance
      }, '-=0.6') // Start before video finishes
      .to(rightCards, {
        xPercent: 0, // Move to their CSS-defined position
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out' // Consistent ease for entrance
      }, '-=0.8'); // Start at same time as left cards

    // Scroll-based expansion animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.expanding-video-container',
        start: 'top 45%',
        end: 'bottom bottom', 
        scrub: 0.8,
        snap:0.2,
      },
      defaults: {
        ease: 'power2.out', // Try this for the main scroll animation
      },
    });

    // Video expansion animation with fromTo to prevent shrinking
    tl.fromTo('.expanding-video',
      {
        width: 'min(45vw, 650px)', // Explicit start value
        boxShadow: '0px 4px 24px 0px #FF5B0066'
      },
      {
        width: 'min(74vw, 1400px)',
        boxShadow: '0px 8px 48px 0px #FF5B0099',
      }
    );

    // Fixed card movements - animate containers only (not individual cards)
    tl.fromTo('.left-cards',
      {
        y: 0,
        xPercent: 0 // Explicitly start from current CSS position
      },
      {
        y: '18vh',
        xPercent: -105, // Move further left
      }, 0 // Start at the same time as the video animation
    );

    tl.fromTo('.right-cards',
      {
        y: 0,
        xPercent: 0 // Explicitly start from current CSS position
      },
      {
        y: '20vh',
        xPercent: 110, // Move further right
      }, 0 // Start at the same time as the video animation
    );

    return () => {
      // Clean up ScrollTriggers on component unmount
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  const leftCardData = heroData?.Background_Image_Left;

  const rightCardData = heroData?.Background_Image_Right;

  return (
    <div className="expanding-video-wrapper" ref={containerRef}>
      <div className="expanding-video-container">
        {/* Left Cards */}
        <div className="left-cards" ref={leftCardsRef}>
          {leftCardData.map((card: any, index: number) => (
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
          {rightCardData.map((card: any, index: number) => (
            <div key={`right-${index}`} className="right-card card">
              <img src={card.thumbnail} alt={card.original} className="card-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}