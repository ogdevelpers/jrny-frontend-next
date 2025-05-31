import "./showreel.css";
export default function ShowReel() {
  return (
    <>
      <div className="video-card-container">
        <div className="video-card">
          <img
            className="landing-video-png"
            src="landing-video-card.png"
            alt="Reel"
          />

          <div className="video-card-footer">
            <span className="video-footer-reel">Show Reel</span>
            <span className="play-reel-button">
              <img src="/play-icon.png" alt="play" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
