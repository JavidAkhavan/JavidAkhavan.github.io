'use client';

/**
 * Parallax Section Component
 * Creates Apple-style parallax scrolling effects
 */

import React, { useEffect, useRef, useState } from 'react';

export interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // Parallax speed (-1 to 1, where 0 is no parallax)
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const sectionTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;

      // Only apply parallax when section is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const yOffset = (scrolled - sectionTop) * speed;
        setOffset(yOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
