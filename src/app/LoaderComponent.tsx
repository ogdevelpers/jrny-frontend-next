'use client';

import { useState, useEffect } from 'react';
import styles from './loader.module.css';

import { ReactNode } from 'react';

const LoaderWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWhiteBar, setShowWhiteBar] = useState(true);
  const [showText, setShowText] = useState(false);
  const [lettersOut, setLettersOut] = useState([false, false, false, false]);

  useEffect(() => {
    // Start the loading sequence
    const timer = setTimeout(() => {
      // Show white bar immediately
      setShowWhiteBar(true);
      
      // After white bar animation (1s), show text
      setTimeout(() => {
        setShowText(true);
      }, 1000);

      // Start letter animations after text appears (1.5s total)
      // Each letter moves out in sequence: J, R, N, Y
      const letterTimings = [1500, 1700, 1900, 2100]; // 200ms apart
      
      letterTimings.forEach((timing, index) => {
        setTimeout(() => {
          setLettersOut(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, timing);
      });

      // Hide entire loader after all animations complete
      setTimeout(() => {
        setIsLoading(false);
      }, 3500);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return children;
  }

  return (
    <div className={styles.loaderContainer}>
      {/* White bar that slides up */}
      {showWhiteBar && (
        <div className={styles.whiteBar} />
      )}

      {/* Text container - 90vw x 89vh centered */}
      {showText && (
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            {['J', 'R', 'N', 'Y'].map((letter, index) => (
              <span
                key={index}
                className={`${styles.letter} ${lettersOut[index] ? styles.moveOut : ''}`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderWrapper;