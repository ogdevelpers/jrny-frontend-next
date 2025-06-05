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
  // showContentFromRight state is handled implicitly by isLoading changing and CSS
  // const [showContentFromRight, setShowContentFromRight] = useState(false);

  useEffect(() => {
    // Initial dark grey bar slides up (animation starts immediately via CSS)

    // The text content should appear after the initial bar finishes sliding up.
    const showTextContentTimer = setTimeout(() => {
      setShowTextContent(true);
    }, 1000); // After initial bar's slideUp animation (1s)

    // Trigger progress bar to appear after text has faded in
    const showProgressBarTimer = setTimeout(() => {
      setShowProgressBar(true);
    }, 1800); // 1s (bar) + 0.5s (text fadeIn) + 0.3s (buffer after text visible)

    // Trigger letters to move out after text has faded in and settled
    const triggerLettersOutTimer = setTimeout(() => {
      setLettersMovingOut(true);
    }, 2800); // After progress bar starts filling + some buffer

    // Trigger the final black bar to slide up *before* the white bar bursts
    // This is crucial to prevent the flash.
    const finalBlackBarTimer = setTimeout(() => {
      setShowFinalBlackBar(true);
    }, 3200); // Start before burstWhiteBarTimer to cover background

    // Trigger the initial dark grey bar burst effect
    const burstWhiteBarTimer = setTimeout(() => {
      setBurstWhiteBar(true);
    }, 3500); // Bursts after finalBlackBar has started to slide up

    // Trigger the entire loader to slide up and fade out
    const slideOutUpLoaderTimer = setTimeout(() => {
      setSlideOutUpLoader(true);
    }, 5000); // Adjusted based on overall flow. Final black bar should be fully up and settled.

    // Hide the entire loader component and trigger content slide-in
    const hideLoaderAndShowContentTimer = setTimeout(() => {
      setIsLoading(false);
      // setShowContentFromRight(true); // No longer needed as it's implicit
    }, 5000); // After slideOutUpLoader completes (5s start + 0.8s duration = 5.8s)

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
    // The content will appear and slide in from the right due to the .contentSlideIn class
    return <div className={styles.contentSlideIn}>{children}</div>;
  }

  return (
    <div
      className={`${styles.loaderContainer} ${
        slideOutUpLoader ? styles.slideOutUpLoader : ''
      }`}
    >
      {/* Final black bar positioned earlier and with higher z-index to prevent flash */}
      {showFinalBlackBar && <div className={styles.finalBlackBar}></div>}

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
                  // Stagger the move-out animation
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
    </div>
  );
};

export default LoaderWrapper;