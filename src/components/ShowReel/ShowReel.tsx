import { showReelVideoUrl } from "@/lib/constants";
import "./showreel.css";
import { useRef, useState } from "react";

export default function ShowReel({ reelData }: any) {
  const [trackMe, setTrackMe] = useState(true);
  const showReelRef = useRef<HTMLVideoElement>(null);
  const handleShowReelPlay = () => {
    if (showReelRef.current) {
      showReelRef.current.play();
      setTrackMe(false);
      showReelRef.current.muted = false;
      showReelRef.current.setAttribute("controls", "true");
    }
  };
  return (
    <>
      <div className="video-card-container">
        <div className="video-card">
          <div className="video-image-container">
            {trackMe && (
              <span className="play-reel-button">
                <img
                  src="/play-icon.png"
                  alt="play"
                  onClick={handleShowReelPlay}
                  height="66"
                  width="66"
                />
              </span>
            )}
            <video
              className="landing-video-mobile-tag"
              muted
              playsInline
              ref={showReelRef}
              // Remove controls by default
            >
              <source src={reelData?.ShowReelLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="video-card-footer">
            <span className="video-footer-reel">{reelData?.ShowReelText}</span>
          </div>
        </div>
      </div>
    </>
  );
}
