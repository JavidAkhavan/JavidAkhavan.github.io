/**
 * Projects Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { ProjectsSectionProps, ProjectCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {project.featured && (
            <div className="absolute right-2 top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Featured
            </div>
          )}
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        {(project.startDate || project.endDate) && (
          <p className="text-sm text-muted-foreground">
            {project.startDate}
            {project.endDate && ` - ${project.endDate}`}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col space-y-4">
        <p className="text-muted-foreground">{project.description}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {project.links.map((link, index) => (
              <Button key={index} variant="outline" size="sm" asChild>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize"
                >
                  {link.label || link.type}
                </a>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ProjectsSection({
  data,
  className = '',
}: ProjectsSectionProps) {
  const featuredProjects = data.filter((p) => p.featured);
  const otherProjects = data.filter((p) => !p.featured);

  return (
    <section
      className={`projects-section py-16 ${className}`}
      data-testid="projects-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Projects</h2>

        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">Featured Projects</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <h3 className="mb-4 text-xl font-semibold">Other Projects</h3>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {data.length === 0 && (
          <p className="text-muted-foreground">No projects available.</p>
        )}
      </div>
    </section>
  );
}
