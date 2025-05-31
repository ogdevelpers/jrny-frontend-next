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

    if (!video || !leftCards.length || !rightCards.length || !container ) return;

    // Set initial states for video only
    gsap.set(video, {
      scale: 0.4,
      transformOrigin: "center top",
    });

    // Page load animations for cards (opacity 0 to 1)
    gsap.set(leftCards, { 
      x: -50,
      opacity: 0,
    });

    gsap.set(rightCards, { 
      y: -50,
      opacity: 0,
    });

    // Animate cards on page load
    gsap.to(leftCards, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0.3
    });

    gsap.to(rightCards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0.5
    });
 

    // Create timeline for scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `top 300px`, // Start when container is 60% from top of viewport
        end: "top top", // End when container bottom is 40% from top of viewport
        scrub: 1.2,
        markers: true,
      }
    });

    // Calculate the amount video will expand (from scale 0.4 to 1 = 60% increase)
    // Move cards down proportionally to maintain visual alignment
    const videoExpansionOffset = 120; // Approximate pixel offset based on video growth

    // Animate video expansion
    tl.to(video, {
      scale: 1,
      ease: "power2.out"
    })
    // Move left cards down as video expands
    .to(leftCards, {
      y: videoExpansionOffset,
      ease: "power2.out"
    }, 0) // Start at same time as video
    // Move right cards down as video expands
    .to(rightCards, {
      y: videoExpansionOffset,
      ease: "power2.out"
    }, 0); // Start at same time as video

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