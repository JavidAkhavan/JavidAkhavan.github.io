/**
 * Publications Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { PublicationsSectionProps, Publication } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, FileText, BookOpen } from 'lucide-react';

export function PublicationsSection({
  data,
  className = '',
}: PublicationsSectionProps) {
  const featuredPublications = data.publications.filter((pub) => pub.featured);
  const otherPublications = data.publications.filter((pub) => !pub.featured);

  const renderPublication = (publication: Publication) => (
    <Card key={publication.id} className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl leading-tight">
              {publication.title}
            </CardTitle>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                {publication.type}
              </span>
              <span>{publication.year}</span>
              {publication.status && publication.status !== 'published' && (
                <span className="italic">({publication.status})</span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {publication.venue && (
          <div className="flex items-start gap-2">
            <BookOpen className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <span className="text-sm italic text-muted-foreground">
              {publication.venue}
            </span>
          </div>
        )}

        {publication.abstract && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {publication.abstract}
          </p>
        )}

        {publication.links && publication.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {publication.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                {link.type === 'doi' && <FileText className="h-3 w-3" />}
                {link.type === 'pdf' && <FileText className="h-3 w-3" />}
                {link.type === 'scholar' && (
                  <ExternalLink className="h-3 w-3" />
                )}
                <span>{link.label || link.type.toUpperCase()}</span>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <section
      className={`publications-section py-16 ${className}`}
      data-testid="publications-section"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">{data.heading}</h2>
          {data.description && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {data.description}
            </p>
          )}
        </div>

        {featuredPublications.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold">
              Featured Publications
            </h3>
            <div className="space-y-6">
              {featuredPublications.map(renderPublication)}
            </div>
          </div>
        )}

        {otherPublications.length > 0 && (
          <div>
            {featuredPublications.length > 0 && (
              <h3 className="mb-6 text-2xl font-semibold">
                Other Publications
              </h3>
            )}
            <div className="space-y-6">
              {otherPublications.map(renderPublication)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
