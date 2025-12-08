/**
 * Test Scores Module Types
 */

export interface TestScore {
  id: string;
  name: string;
  overall: string;
  breakdown?: {
    label: string;
    score: string;
  }[];
}

export interface TestScoresSectionProps {
  data: TestScore[];
  transcriptUrl?: string;
  className?: string;
}

export interface TestScoreCardProps {
  testScore: TestScore;
}
