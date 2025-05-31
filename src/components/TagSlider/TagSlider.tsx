// TagSlider.tsx
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef    } from 'react';
import Tags from '../Tags/Tags';
import './tagSlider.css';

const TagSlider = ({tag}: any) => {
  const tagSliderRef = useRef<HTMLDivElement>(null);
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slider = tagSliderRef.current;
    const tagContainer = tagContainerRef.current;
    if (!slider || !tagContainer) return;

    // Calculate the actual width using getBoundingClientRect() for more accuracy
    const containerWidth = tagContainer.getBoundingClientRect().width;
    
    // Ensure we have a valid width before animating
    if (containerWidth <= 0) return;

    console.log("Container width:", containerWidth); // Debug width value

    // Create the animation
    const animation = gsap.to(slider, {
      x: `-${containerWidth}px`, // Use exact pixel value
      duration: 28,
      ease: 'linear',
      repeat: -1, 
    });

    // Return cleanup function
    return () => {
      animation.kill(); // Clean up animation on unmount
    };
  }, {
    scope: wrapperRef,
    dependencies: [] // Only run once on mount
  });

  // const tagsArray = [
  //   "Virtual Networking",
  //   "Digital Tracking and Registration",
  //   "Live Streaming",
  //   "Event Branding and Digital Identity", 
  //   "Event Analytics",
  //   "Post-event Content",
  //   "Planning and Execution"
  // ];

  return (
    <div className="tag-slider-wrapper" ref={wrapperRef}>
      <div className="tag-slider" ref={tagSliderRef}>
        {/* First set of tags - this is what we'll measure */}
        <div className="tag-container" ref={tagContainerRef}>
          {tag?.map((tag: any, index: number) => (
            <Tags tagTitle={tag.tagTitle} key={index} />
          ))}
        </div>
        
        {/* Duplicate sets for seamless looping */}
        <div className="tag-container">
          {tag?.map((tag: any, index: number) => (
            <Tags tagTitle={tag.tagTitle} key={`tag-dup-1-${index}`} />
          ))}
        </div>
        <div className="tag-container">
          {tag?.map((tag: any, index: number) => (
            <Tags tagTitle={tag.tagTitle} key={`tag-dup-1-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagSlider;
