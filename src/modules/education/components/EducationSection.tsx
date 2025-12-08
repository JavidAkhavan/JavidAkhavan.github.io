/**
 * Education Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { EducationSectionProps, EducationCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function EducationCard({ education }: EducationCardProps) {
  const dateRange = `${education.startDate}${education.endDate ? ` - ${education.endDate}` : ''}`;
  const isPerfectGPA = education.gpa === '4.0';

  return (
    <Card className="group mb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl transition-colors group-hover:text-primary">
              {education.degree}
            </CardTitle>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold">{education.institution}</p>
              {education.location && <p>{education.location}</p>}
              <p>{dateRange}</p>
              {education.gpa && (
                <p className="font-medium">
                  GPA: {education.gpa}
                  {isPerfectGPA && (
                    <span className="ml-2 text-xs text-primary">★ Perfect</span>
                  )}
                </p>
              )}
            </div>
          </div>
          {isPerfectGPA && (
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
              4.0 GPA
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.honors && education.honors.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Honors & Awards:</h4>
            <ul className="space-y-2">
              {education.honors.map((honor, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground transition-transform hover:translate-x-1"
                >
                  <span className="mt-1 text-primary transition-transform group-hover:scale-125">
                    ▪
                  </span>
                  <span>{honor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {education.coursework && education.coursework.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Relevant Coursework:</h4>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course, index) => (
                <span
                  key={index}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium transition-all hover:scale-105 hover:bg-primary/20"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function EducationSection({
  data,
  className = '',
}: EducationSectionProps) {
  return (
    <section
      className={`education-section py-16 ${className}`}
      data-testid="education-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Education</h2>
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((education) => (
              <EducationCard key={education.id} education={education} />
            ))
          ) : (
            <p className="text-muted-foreground">
              No education entries available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
