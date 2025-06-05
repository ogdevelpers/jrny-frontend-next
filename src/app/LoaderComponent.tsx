'use client';

import { useState, useEffect, ReactNode } from 'react';
import styles from './loader.module.css';

const LoaderWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTextContent, setShowTextContent] = useState(false);
  const [lettersMovingOut, setLettersMovingOut] = useState(false); 
  const [lettersEntering, setLettersEntering] = useState(false); // New state for letters entering

  useEffect(() => {
    // The sweepIn animation for .whiteBar starts immediately via CSS.

    // Show text content (JRNY) after the sweep-in animation of the white bar is complete
    // and before the letters themselves start animating.
    const showTextContentTimer = setTimeout(() => {
      setShowTextContent(true);
    }, 900); // After sweepIn (0.9s)

    // Trigger letters to enter from a slightly lower position
    const lettersEnteringTimer = setTimeout(() => {
      setLettersEntering(true);
    }, 1200); // After text content is visible (0.9s + 0.3s buffer)

 
    // Trigger letters to move out after progress bar starts filling and some settling time
    const triggerLettersOutTimer = setTimeout(() => {
      setLettersMovingOut(true);
    }, 3200); // Adjusted for slower progress bar fill
 

    // Hide the entire loader component and trigger content slide-in
    const hideLoaderAndShowContentTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3700); // After slideOutUpLoader animation (0.1s duration + buffer)

    return () => {
      clearTimeout(showTextContentTimer);
      clearTimeout(lettersEnteringTimer); 
      clearTimeout(triggerLettersOutTimer); 
      clearTimeout(hideLoaderAndShowContentTimer);
    };
  }, []);

  if (!isLoading) {
    // The content will appear and slide in from the right due to the .contentSlideIn class
    return <div className={styles.contentSlideIn}>{children}</div>;
  }

  return (
    <div
      className={`${styles.loaderContainer}  `}
    > 

      <div className={`${styles.whiteBar}`} />

      {/* Text container appears after initial bar animation */}
      {showTextContent && (
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            {['J', 'R', 'N', 'Y'].map((letter, index) => (
              <span
                key={index}
                className={`${styles.letter} ${lettersMovingOut ? styles.moveOut : ''} ${lettersEntering ? styles.enterFromBottom : ''}`}
                style={{
                  // Stagger the entering and move-out animation
                  transitionDelay: `${lettersEntering || lettersMovingOut ? index * 100 : 0}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          {/* Progress Bar */} 
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}></div>
            </div> 
        </div>
      )}
    </div>
  );
};

export default LoaderWrapper;