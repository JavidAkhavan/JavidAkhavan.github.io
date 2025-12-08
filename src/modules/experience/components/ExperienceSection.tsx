/**
 * Experience Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { ExperienceSectionProps, ExperienceCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ExperienceCard({ experience }: ExperienceCardProps) {
  const dateRange = experience.current
    ? `${experience.startDate} - Present`
    : `${experience.startDate}${experience.endDate ? ` - ${experience.endDate}` : ''}`;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl">{experience.title}</CardTitle>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-semibold">{experience.company}</p>
          {experience.location && <p>{experience.location}</p>}
          <p>{dateRange}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{experience.description}</p>

        {experience.highlights && experience.highlights.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Key Achievements:</h4>
            <ul className="space-y-1">
              {experience.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1 text-primary">▪</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {experience.technologies && experience.technologies.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ExperienceSection({
  data,
  className = '',
}: ExperienceSectionProps) {
  return (
    <section
      className={`experience-section py-16 ${className}`}
      data-testid="experience-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Experience</h2>
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))
          ) : (
            <p className="text-muted-foreground">
              No experience entries available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
