/**
 * About Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { AboutSectionProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export function AboutSection({ data, className = '' }: AboutSectionProps) {
  return (
    <section
      className={`about-section py-16 ${className}`}
      data-testid="about-section"
    >
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{data.heading}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {data.bio}
                </p>

                {data.highlights && data.highlights.length > 0 && (
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
                )}
              </div>

              {data.image && (
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
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
