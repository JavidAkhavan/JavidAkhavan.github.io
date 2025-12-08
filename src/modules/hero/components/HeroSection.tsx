/**
 * Hero Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { HeroSectionProps } from '../types';
import { Button } from '@/components/ui/button';

export function HeroSection({ data, className = '' }: HeroSectionProps) {
  return (
    <section className={`hero-section ${className}`} data-testid="hero-section">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-4">{data.title}</h1>
        {data.subtitle && (
          <h2 className="text-2xl text-gray-600 mb-4">{data.subtitle}</h2>
        )}
        <p className="text-lg mb-8">{data.description}</p>

        {data.cta && data.cta.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {data.cta.map((cta, index) => {
              const variant =
                cta.variant === 'primary'
                  ? 'default'
                  : cta.variant === 'secondary'
                    ? 'secondary'
                    : 'outline';

              // Check if it's a download link
              const isDownload = cta.href.endsWith('.pdf');

              return (
                <Button key={index} variant={variant} asChild>
                  <a
                    href={cta.href}
                    {...(isDownload && {
                      download: true,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  >
                    {cta.label}
                  </a>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
