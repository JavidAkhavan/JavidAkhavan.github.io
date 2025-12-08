/**
 * Skills Section Component
 * Content-agnostic - accepts data via props
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SkillsSectionProps, SkillCategoryCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Map skill levels to proficiency percentages
const getLevelPercentage = (level?: string): number => {
  const levelMap: Record<string, number> = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 95,
  };
  return level ? levelMap[level.toLowerCase()] || 50 : 50;
};

function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  return (
    <Card ref={ref} className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{category.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {category.skills.map((skill, index) => {
            const percentage = getLevelPercentage(skill.level);
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {skill.level && (
                      <span className="capitalize">{skill.level}</span>
                    )}
                    {skill.years && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5">
                        {skill.years}y
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${percentage}%` : '0%',
                      transitionDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillsSection({ data, className = '' }: SkillsSectionProps) {
  return (
    <section
      className={`skills-section py-16 ${className}`}
      data-testid="skills-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {data.length > 0 ? (
            data.map((category) => (
              <SkillCategoryCard key={category.id} category={category} />
            ))
          ) : (
            <p className="text-muted-foreground">
              No skills entries available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
