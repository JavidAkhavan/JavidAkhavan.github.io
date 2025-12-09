/**
 * Experience Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { ExperienceSectionProps, ExperienceCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimation, StaggeredList } from '@/core';

// Helper function to parse text with markdown-style links and convert to JSX
function parseLinksInText(text: string) {
  // Match [text](url) pattern
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add the link
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline decoration-primary/30 transition-all hover:decoration-primary"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  const dateRange = experience.current
    ? `${experience.startDate} - Present`
    : `${experience.startDate}${experience.endDate ? ` - ${experience.endDate}` : ''}`;

  return (
    <Card className="group mb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl transition-colors group-hover:text-primary">
              {experience.title}
            </CardTitle>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold">{experience.company}</p>
              {experience.location && <p>{experience.location}</p>}
              <p>{dateRange}</p>
            </div>
          </div>
          {experience.current && (
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
              Current
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{experience.description}</p>

        {experience.highlights && experience.highlights.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Key Achievements:</h4>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground transition-transform hover:translate-x-1"
                >
                  <span className="mt-1 text-primary transition-transform group-hover:scale-125">
                    ▪
                  </span>
                  <span>{parseLinksInText(highlight)}</span>
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
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium transition-all hover:scale-105 hover:bg-primary/20"
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
        <ScrollAnimation animation="fade">
          <h2 className="mb-8 text-3xl font-bold">Experience</h2>
        </ScrollAnimation>
        <div className="space-y-4">
          {data.length > 0 ? (
            <StaggeredList animation="slide-up" staggerDelay={100}>
              {data.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </StaggeredList>
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
