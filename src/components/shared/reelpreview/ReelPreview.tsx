import Button from "@/components/Button/Button";
import { useState, useEffect } from "react";
import "./reel.css";
import { createPortal } from "react-dom";

export default function ReelPreview({
  bolo,
  url,
}: {
  bolo: string;
  url: string;
}) {
  const [showVideo, setShowVideo] = useState(false);

  const handleShowreelClick = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  useEffect(() => {
    if (showVideo) {
      document.body.classList.add("video-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("video-open");

      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("video-open");
    };
  }, [showVideo]);

  return (
    <>
      <Button
        classList="landing-showreel-button button-white-theme"
        onClick={handleShowreelClick}
      >
        <div className="button-content-animated">
          {bolo}
          <img src="/arrow-right.png" alt="arrow" />
        </div>
      </Button>
      {showVideo &&
        url &&
        createPortal(
          <div className="video-overlay" onClick={handleCloseVideo}>
            <button
              className="close-button"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseVideo();
              }}
              title="Close Video"
            >
              ✕
            </button>

            <video
              className="video-player"
              src={url}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body, // 👈 ensures it's rendered at the viewport level
        )}
    </>
  );
}
