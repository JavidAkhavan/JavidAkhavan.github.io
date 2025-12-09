'use client';

/**
 * Scroll Animation Component
 * Provides Apple-style scroll animations for children elements
 */

import React, { useEffect, useRef, useState } from 'react';

export interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?:
    | 'fade'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'scale'
    | 'blur';
  delay?: number; // Delay in ms
  duration?: number; // Animation duration in ms
  threshold?: number; // Intersection threshold (0-1)
  className?: string;
  once?: boolean; // Animate only once
}

export function ScrollAnimation({
  children,
  animation = 'fade',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  once = true,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
          }
        } else if (!once && !hasAnimated) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, hasAnimated]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all';
    const visible = isVisible || hasAnimated;

    switch (animation) {
      case 'fade':
        return `${baseClass} ${visible ? 'opacity-100' : 'opacity-0'}`;
      case 'slide-up':
        return `${baseClass} ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`;
      case 'slide-down':
        return `${baseClass} ${visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`;
      case 'slide-left':
        return `${baseClass} ${visible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`;
      case 'slide-right':
        return `${baseClass} ${visible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`;
      case 'scale':
        return `${baseClass} ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;
      case 'blur':
        return `${baseClass} ${visible ? 'blur-0 opacity-100' : 'blur-sm opacity-0'}`;
      default:
        return baseClass;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
