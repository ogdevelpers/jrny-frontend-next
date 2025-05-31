import { useGSAP } from "@gsap/react";
import "./carasoul.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";  
import Card from "./Card";



const cards = [
  {
    profilePic: "/carousol_john.png",
    profileName: "John Doe",
    profileDesignation: "Director, ABC",
    compliment:
      "1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    profilePic: "/carousol_john.png",
    profileName: "Jane Smith",
    profileDesignation: "Manager, XYZ",
    compliment:
      "2 enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    profilePic: "carousol_john.png",
    profileName: "Mike Johnson",
    profileDesignation: "CEO, LMN",
    compliment:
      "3 aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    profilePic: "carousol_john.png",
    profileName: "Emily Brown",
    profileDesignation: "CTO, DEF",
    compliment:
      "4 sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    profilePic: "carousol_john.png",
    profileName: "Emily Brown",
    profileDesignation: "CTO, DEF",
    compliment:
      "5 sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    profilePic: "carousol_john.png",
    profileName: "Emily Brown",
    profileDesignation: "CTO, DEF",
    compliment:
      "6 sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function Carasoul({testimonial}: any) {
    const [active,setActive] = useState(false);
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

    const playMarkee=()=>{
      const carSlider = carSliderRef.current;
      const carTag = carTagRef.current;

      if(!carSlider || !carTag){
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

    useGSAP(()=>{

      
 

      playMarkee();
      window.addEventListener('resize', handleResize);
 
    // Return cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      window.removeEventListener('resize', handleResize);
    };

    },[]);


     

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

  useEffect(()=>{

    const carSlider = carSliderRef.current;
    if(!carSlider) return;
    
    carSlider.addEventListener('mouseenter',handleMouseEnter);
    carSlider.addEventListener('mouseleave',handleMouseLeave);

    return ()=>{
      carSlider.removeEventListener('mouseenter',handleMouseEnter);
      carSlider.removeEventListener('mouseLeave',handleMouseEnter);
    }

  },[]);


      return (
        <div className='carousel-component'>
          <div className="carousel-slider" ref={carSliderRef} id="yourID">
            <div className="carousel-container" ref={carTagRef}>
              {
              testimonial?.map((card: any,index:number)=>(
                <Card key={index} profileName={card.name} profileDesignation={card.jobTitle}
                      compliment={card.message} active={active} />

              ))
              }
            </div>
            <div className="carousel-container" >
              {
              testimonial?.map((card: any,index:number)=>(
                <Card key={index} profileName={card.name} profileDesignation={card.jobTitle}
                      compliment={card.message} active={active} />
              ))
              }
            </div>
            <div className="carousel-container" >
              {
              testimonial?.map((card: any,index:number)=>(
                <Card key={index} profileName={card.name} profileDesignation={card.jobTitle}
                      compliment={card.message} active={active} />
              ))
              }
            </div>
          </div>
        </div>
      );
    }

