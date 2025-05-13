"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieIconProps {
  animationData: unknown;
  size?: number;
  className?: string;
  isHovered?: boolean; // Accept external hover state
}

const LottieIcon: React.FC<LottieIconProps> = ({ 
  animationData, 
  size = 24, 
  className = "",
  isHovered: externalHoverState
}) => {
  // Local hover state for when component is used standalone
  const [localHoverState, setLocalHoverState] = useState(false);
  
  // Use external hover state if provided, otherwise use local state
  const isHovered = externalHoverState !== undefined ? externalHoverState : localHoverState;
  
  // Reset animation when hover state changes
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    // Reset the animation when hover state changes
    setKey(prev => prev + 1);
  }, [isHovered]);
  
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setLocalHoverState(true)}
      onMouseLeave={() => setLocalHoverState(false)}
    >
      <Lottie 
        key={key}
        animationData={animationData} 
        loop={isHovered}
        autoplay={isHovered}
        style={{ width: '100%', height: '100%' }}
        initialSegment={isHovered ? [0, 60] : [0, 1]} // Play full animation when hovered, otherwise show first frame
      />
    </div>
  );
};

export default LottieIcon;
