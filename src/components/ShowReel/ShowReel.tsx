import { showReelVideoUrl } from "@/lib/constants";
import "./showreel.css";
import { useRef } from "react";


export default function ShowReel() {
  const showReelRef = useRef<HTMLVideoElement>(null);
  const handleShowReelPlay = () => {
    if (showReelRef.current) {
      showReelRef.current.play();
      showReelRef.current.muted = false;
      showReelRef.current.setAttribute("controls", "true");
    }
  };
return (
  <>
    <div className="video-card-container">
      <div className="video-card">
        <div className="video-image-container">
          <video
            className="landing-video-mobile-tag"  
            muted
            playsInline
            ref={showReelRef}
            // Remove controls by default
          >
            <source src={showReelVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-card-footer">
          <span className="video-footer-reel">Show Reel</span>
          <span className="play-reel-button">
            <img src="/play-icon.png" alt="play" onClick={handleShowReelPlay}/>
          </span>
        </div>
      </div>
    </div>
  </>
);
}