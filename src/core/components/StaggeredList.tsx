'use client';

/**
 * Staggered List Animation Component
 * Animates list items with staggered delays (Apple-style)
 */

import React from 'react';
import { ScrollAnimation } from './ScrollAnimation';

export interface StaggeredListProps {
  children: React.ReactNode[];
  animation?:
    | 'fade'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'scale';
  staggerDelay?: number; // Delay between each item in ms
  duration?: number;
  threshold?: number;
  className?: string;
  itemClassName?: string;
}

export function StaggeredList({
  children,
  animation = 'slide-up',
  staggerDelay = 100,
  duration = 600,
  threshold = 0.1,
  className = '',
  itemClassName = '',
}: StaggeredListProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollAnimation
          animation={animation}
          delay={index * staggerDelay}
          duration={duration}
          threshold={threshold}
          className={itemClassName}
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
}
