'use client';

/**
 * Social Proof Badges Component
 * Displays key qualifications and achievements
 */

import React from 'react';
import { Award, GraduationCap, Briefcase, MapPin } from 'lucide-react';

interface Badge {
  icon: React.ReactNode;
  label: string;
  highlight: string;
}

interface BadgeData {
  label: string;
  highlight: string;
}

interface SocialProofBadgesProps {
  education: BadgeData;
  gpa: BadgeData;
  experience: BadgeData;
  location: BadgeData;
}

export function SocialProofBadges({
  education,
  gpa,
  experience,
  location,
}: SocialProofBadgesProps) {
  const badges: Badge[] = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      label: education.label,
      highlight: education.highlight,
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: gpa.label,
      highlight: gpa.highlight,
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: experience.label,
      highlight: experience.highlight,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: location.label,
      highlight: location.highlight,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="group flex items-start gap-3 rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
              {badge.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">
                {badge.label}
              </h3>
              <p className="text-xs text-muted-foreground">{badge.highlight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
