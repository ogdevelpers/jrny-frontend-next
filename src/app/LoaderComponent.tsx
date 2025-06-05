'use client';

import { useState, useEffect, ReactNode } from 'react';
import styles from './loader.module.css';

const LoaderWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTextContent, setShowTextContent] = useState(false);
  const [lettersMovingOut, setLettersMovingOut] = useState(false);
  const [burstWhiteBar, setBurstWhiteBar] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showFinalBlackBar, setShowFinalBlackBar] = useState(false);
  const [slideOutUpLoader, setSlideOutUpLoader] = useState(false);
  const [showContentFromRight, setShowContentFromRight] = useState(false); // New state for content animation

  useEffect(() => {
    // Initial dark grey bar slides up (animation starts immediately via CSS)

    // The text content should appear after the initial bar finishes sliding up.
    const showTextContentTimer = setTimeout(() => {
      setShowTextContent(true);
    }, 1000); // After initial bar's slideUp animation (1s)

    // Trigger progress bar to appear after text has faded in (0.5s fade-in after 1s delay = 1.5s total)
    const showProgressBarTimer = setTimeout(() => {
      setShowProgressBar(true);
    }, 1800); // 1s (bar) + 0.5s (text fadeIn) + 0.3s (buffer after text visible)

    // Trigger letters to move out after text has faded in and settled
    const triggerLettersOutTimer = setTimeout(() => {
      setLettersMovingOut(true);
    }, 2800); // After progress bar starts filling + some buffer

    // Trigger the initial dark grey bar burst effect
    const burstWhiteBarTimer = setTimeout(() => {
      setBurstWhiteBar(true);
    }, 3500); // Can overlap with letters moving out and progress bar

    // Trigger the final black bar to slide up
    const finalBlackBarTimer = setTimeout(() => {
      setShowFinalBlackBar(true);
    }, 4500); // After progress bar finishes (1.8s start + 0.8s duration = 2.6s end), giving a small buffer after letters move out

    // Trigger the entire loader to slide up and fade out
    const slideOutUpLoaderTimer = setTimeout(() => {
      setSlideOutUpLoader(true);
    }, 5000); // After final black bar has slid up (4.5s start + 0.5s duration = 5s)

    // Hide the entire loader component and trigger content slide-in
    const hideLoaderAndShowContentTimer = setTimeout(() => {
      setIsLoading(false);
      setShowContentFromRight(true); // Trigger content animation
    }, 5800); // After slideOutUpLoader completes (5s start + 0.8s duration = 5.8s)

    return () => {
      clearTimeout(showTextContentTimer);
      clearTimeout(showProgressBarTimer);
      clearTimeout(triggerLettersOutTimer);
      clearTimeout(burstWhiteBarTimer);
      clearTimeout(finalBlackBarTimer);
      clearTimeout(slideOutUpLoaderTimer);
      clearTimeout(hideLoaderAndShowContentTimer);
    };
  }, []);

  if (!isLoading) {
    return <div className={styles.contentSlideIn}>{children}</div>;
  }

  return (
    <div
      className={`${styles.loaderContainer} ${
        slideOutUpLoader ? styles.slideOutUpLoader : ''
      }`}
    >
      <div className={`${styles.whiteBar} ${burstWhiteBar ? styles.burstOut : ''}`} />

      {/* Text container appears after initial bar animation */}
      {showTextContent && (
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            {['J', 'R', 'N', 'Y'].map((letter, index) => (
              <span
                key={index}
                className={`${styles.letter} ${lettersMovingOut ? styles.moveOut : ''}`}
                style={{
                  transitionDelay: `${lettersMovingOut ? index * 100 : 0}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          {/* Progress Bar */}
          {showProgressBar && (
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}></div>
            </div>
          )}
        </div>
      )}

      {/* Final black bar that slides up as component unmounts */}
      {showFinalBlackBar && <div className={styles.finalBlackBar}></div>}
    </div>
  );
};

export default LoaderWrapper;