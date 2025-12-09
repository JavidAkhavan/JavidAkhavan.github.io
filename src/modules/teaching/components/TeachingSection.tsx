/**
 * Teaching Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { TeachingSectionProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { ScrollAnimation, StaggeredList } from '@/core';

export function TeachingSection({
  data,
  className = '',
}: TeachingSectionProps) {
  return (
    <section
      className={`teaching-section py-16 ${className}`}
      data-testid="teaching-section"
    >
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">{data.heading}</h2>
            {data.description && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {data.description}
              </p>
            )}
          </div>
        </ScrollAnimation>

        <div className="space-y-6">
          <StaggeredList animation="slide-up" staggerDelay={100}>
            {data.positions.map((position) => (
              <Card key={position.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">
                          {position.title}
                        </CardTitle>
                        <div className="mt-1 text-lg font-medium text-muted-foreground">
                          {position.institution}
                        </div>
                        {position.course && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            {position.course}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{position.location}</div>
                      <div className="mt-1">
                        {position.startDate} -{' '}
                        {position.current ? 'Present' : position.endDate}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {(position.description || position.responsibilities) && (
                  <CardContent className="space-y-4">
                    {position.description && (
                      <p className="text-muted-foreground">
                        {position.description}
                      </p>
                    )}

                    {position.responsibilities &&
                      position.responsibilities.length > 0 && (
                        <ul className="space-y-2">
                          {position.responsibilities.map((resp, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <span className="mt-1 text-primary">▪</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </CardContent>
                )}
              </Card>
            ))}
          </StaggeredList>
        </div>
      </div>
    </section>
  );
}
