/**
 * About Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { AboutSectionProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ScrollAnimation, StaggeredList } from '@/core';

export function AboutSection({ data, className = '' }: AboutSectionProps) {
  return (
    <section
      className={`about-section py-16 ${className}`}
      data-testid="about-section"
    >
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{data.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <ScrollAnimation animation="slide-up" delay={200}>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {data.bio}
                    </p>
                  </ScrollAnimation>

                  {data.highlights && data.highlights.length > 0 && (
                    <ScrollAnimation animation="slide-up" delay={400}>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Highlights</h3>
                        <ul className="space-y-2">
                          {data.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <span className="mt-1 text-primary">▪</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollAnimation>
                  )}
                </div>

                {data.image && (
                  <ScrollAnimation animation="scale" delay={300}>
                    <div className="flex items-center justify-center">
                      <div className="relative h-64 w-64 overflow-hidden rounded-lg">
                        <Image
                          src={data.image.src}
                          alt={data.image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </ScrollAnimation>
                )}
              </div>

              {data.interests && data.interests.length > 0 && (
                <ScrollAnimation animation="slide-up" delay={600}>
                  <div className="mt-6 border-t pt-6">
                    <h3 className="mb-4 text-xl font-semibold">
                      Research Interests
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {data.interests.map((interest, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3 transition-all hover:bg-secondary"
                        >
                          <span className="text-primary">•</span>
                          <span className="text-sm font-medium">{interest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimation>
              )}
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
}
