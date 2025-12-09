/**
 * Certificates Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { CertificatesSectionProps, CertificateCardProps } from '../types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Award } from 'lucide-react';
import { ScrollAnimation, StaggeredList } from '@/core';

function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card className="group mb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl transition-colors group-hover:text-primary">
              {certificate.url ? (
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  {certificate.title}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                certificate.title
              )}
            </CardTitle>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold">{certificate.issuer}</p>
              {certificate.date && <p>{certificate.date}</p>}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export function CertificatesSection({
  data,
  className = '',
}: CertificatesSectionProps) {
  return (
    <section
      className={`certificates-section py-16 ${className}`}
      data-testid="certificates-section"
    >
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade">
          <h2 className="mb-8 text-3xl font-bold">Certificates</h2>
        </ScrollAnimation>
        <div className="space-y-4">
          {data.length > 0 ? (
            <StaggeredList animation="slide-up" staggerDelay={80}>
              {data.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </StaggeredList>
          ) : (
            <p className="text-muted-foreground">No certificates available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
