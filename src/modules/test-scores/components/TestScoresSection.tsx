/**
 * Test Scores Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { TestScoresSectionProps, TestScoreCardProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, GraduationCap } from 'lucide-react';

function TestScoreCard({ testScore }: TestScoreCardProps) {
  return (
    <Card className="group mb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl transition-colors group-hover:text-primary">
              {testScore.name}
            </CardTitle>
            <p className="mt-2 text-2xl font-bold text-primary">
              Overall: {testScore.overall}
            </p>
          </div>
        </div>
      </CardHeader>
      {testScore.breakdown && testScore.breakdown.length > 0 && (
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {testScore.breakdown.map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-secondary/50 p-4 transition-all hover:bg-secondary"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-bold">{item.score}</p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function TestScoresSection({
  data,
  transcriptUrl,
  className = '',
}: TestScoresSectionProps) {
  return (
    <section
      className={`test-scores-section py-16 ${className}`}
      data-testid="test-scores-section"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Test Scores</h2>
          {transcriptUrl && (
            <Button asChild variant="outline">
              <a
                href={transcriptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Transcript
              </a>
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((testScore) => (
              <TestScoreCard key={testScore.id} testScore={testScore} />
            ))
          ) : (
            <p className="text-muted-foreground">No test scores available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
