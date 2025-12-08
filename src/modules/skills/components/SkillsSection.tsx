/**
 * Skills Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { SkillsSectionProps, SkillCategoryCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{category.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, index) => (
            <div key={index} className="group relative">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/20">
                {skill.name}
              </span>
              {(skill.level || skill.years) && (
                <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md group-hover:block">
                  {skill.level && (
                    <span className="capitalize">{skill.level}</span>
                  )}
                  {skill.level && skill.years && <span> • </span>}
                  {skill.years && <span>{skill.years} years</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillsSection({ data, className = '' }: SkillsSectionProps) {
  return (
    <section
      className={`skills-section py-16 ${className}`}
      data-testid="skills-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {data.length > 0 ? (
            data.map((category) => (
              <SkillCategoryCard key={category.id} category={category} />
            ))
          ) : (
            <p className="text-muted-foreground">
              No skills entries available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
