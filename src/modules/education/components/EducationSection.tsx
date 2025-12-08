/**
 * Education Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { EducationSectionProps, EducationCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function EducationCard({ education }: EducationCardProps) {
  const dateRange = `${education.startDate}${education.endDate ? ` - ${education.endDate}` : ''}`;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl">{education.degree}</CardTitle>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-semibold">{education.institution}</p>
          {education.location && <p>{education.location}</p>}
          <p>{dateRange}</p>
          {education.gpa && (
            <p className="font-medium">GPA: {education.gpa}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.honors && education.honors.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">Honors & Awards:</h4>
            <ul className="space-y-1">
              {education.honors.map((honor, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1 text-primary">▪</span>
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
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
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
