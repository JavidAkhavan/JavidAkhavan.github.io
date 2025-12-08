'use client';

/**
 * Research Metrics Component
 * Displays key research statistics with animated counters
 */

import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Award, TrendingUp } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
}

export function ResearchMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    publications: 0,
    featured: 0,
    years: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  const metrics: Metric[] = [
    {
      label: 'Publications',
      value: 7,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: 'Featured',
      value: 3,
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: 'Experience',
      value: 6,
      suffix: '+ years',
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        publications: Math.floor(7 * progress),
        featured: Math.floor(3 * progress),
        years: Math.floor(6 * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts({ publications: 7, featured: 3, years: 6 });
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {metrics.map((metric, index) => {
            const countValue =
              index === 0
                ? counts.publications
                : index === 1
                  ? counts.featured
                  : counts.years;

            return (
              <div
                key={metric.label}
                className="flex flex-col items-center text-center transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-foreground md:text-4xl">
                  {countValue}
                  {metric.suffix && (
                    <span className="text-2xl">{metric.suffix}</span>
                  )}
                </div>
                <div className="mt-1 text-sm font-medium text-muted-foreground md:text-base">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
