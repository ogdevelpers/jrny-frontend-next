import { useEffect, useState } from 'react';
import Tags from '../Tags/Tags';

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
    <div style={{padding: "0 0 4rem 0", cursor: 'pointer'}} onClick={scrollToTop}>
    <Tags iconSrc='/up-arrow.png'  />
    </div>
    )
  );
};

export default ScrollTopButton;
