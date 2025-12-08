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

interface ResearchMetricsProps {
  totalPublications: number;
  featuredPublications: number;
  yearsExperience: number;
}

export function ResearchMetrics({
  totalPublications,
  featuredPublications,
  yearsExperience,
}: ResearchMetricsProps) {
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
      value: totalPublications,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: 'Featured',
      value: featuredPublications,
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: 'Experience',
      value: yearsExperience,
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
        publications: Math.floor(totalPublications * progress),
        featured: Math.floor(featuredPublications * progress),
        years: Math.floor(yearsExperience * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts({
          publications: totalPublications,
          featured: featuredPublications,
          years: yearsExperience,
        });
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, totalPublications, featuredPublications, yearsExperience]);

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
