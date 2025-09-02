'use client';

import React, { useState, useEffect } from 'react';
import { AnimatedCardProps } from '@/types';
import { ANIMATION } from '@/utils/constants';

/**
 * Reusable animated card component with glassmorphism effect
 */
export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  delay = 0,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const baseStyles = `
    transition-all duration-${ANIMATION.DURATION.SLOW} ease-out transform
    backdrop-blur-md bg-white/5 border border-white/10 
    shadow-lg hover:shadow-2xl
  `;

  const visibilityStyles = isVisible 
    ? 'translate-y-0 opacity-100 scale-100' 
    : 'translate-y-8 opacity-0 scale-95';

  return (
    <div 
      className={`${baseStyles} ${visibilityStyles} ${className}`}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};