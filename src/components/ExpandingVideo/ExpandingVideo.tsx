'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './expandingvideo.css'; 

gsap.registerPlugin(ScrollTrigger);

export default function ExpandingVideo() {
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
      x: -200, // Start further left (relative to their CSS transform)
      opacity: 0
    });
    
    gsap.set(rightCards, {
      x: 200, // Start further right (relative to their CSS transform)  
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
        x: 0, // Move to their CSS-defined position
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6') // Start before video finishes
      .to(rightCards, {
        x: 0, // Move to their CSS-defined position
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.8'); // Start at same time as left cards

    // Scroll-based expansion animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.expanding-video-container',
        start: 'top 45%',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Video expansion animation with fromTo to prevent shrinking
    tl.fromTo('.expanding-video', 
      {
        width: 'min(50vw, 700px)', // Explicit start value
        boxShadow: '0px 4px 24px 0px #FF5B0066'
      },
      {
        width: 'min(90vw, 1200px)',
        boxShadow: '0px 8px 48px 0px #FF5B0099',
      }
    );

    // Fixed card movements - animate containers only (not individual cards)
    tl.fromTo('.left-cards', 
      {
        y: 0,
        x: 0 // Start from CSS position
      },
      {
        y: '20vh',
        xPercent: -100, // Move further left (negative value moves left from CSS transform)
      }, 0
    );

    tl.fromTo('.right-cards',
      {
        y: 0, 
        x: 0 // Start from CSS position
      },
      {
        y: '20vh',
        xPercent: 100, // Move further right (positive value moves right from CSS transform)
      }, 0
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef });

  const leftCardData = [
    { id: 1, title: 'Card 1', image: 'https://picsum.photos/150/200?random=1' },
    { id: 2, title: 'Card 2', image: 'https://picsum.photos/150/200?random=2' },
  ];

  const rightCardData = [
    { id: 3, title: 'Card 3', image: 'https://picsum.photos/150/200?random=3' }, 
  ];

  return (
    <div className="expanding-video-wrapper" ref={containerRef}>
      <div className="expanding-video-container">
        {/* Left Cards */}
        <div className="left-cards" ref={leftCardsRef}>
          {leftCardData.map((card) => (
            <div key={`left-${card.id}`} className="left-card card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Video */}
        <video
          ref={videoRef}
          src="https://cdn-front.freepik.com/revamp/temp/hero/1905-AnonymousHome1920x1080.webm"
          autoPlay
          muted
          loop
          className="expanding-video"
        />

        {/* Right Cards */}
        <div className="right-cards" ref={rightCardsRef}>
          {rightCardData.map((card) => (
            <div key={`right-${card.id}`} className="right-card card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>


      </div> 

    </div>
  );
}