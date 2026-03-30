import React from 'react';
import './ScrollArrow.css';

const ScrollArrow: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <a href="#" className="scroll-arrow-container" onClick={handleClick} aria-label="Scroll down">
      <div className="scroll-arrow"></div>
      <div className="scroll-arrow"></div>
      <div className="scroll-arrow"></div>
    </a>
  );
};

export default ScrollArrow;
