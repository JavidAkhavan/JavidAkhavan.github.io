/**
 * Test Scores Content Data
 */

import { TestScore } from '@/modules/test-scores/types';

export const testScoresData: TestScore[] = [
  {
    id: 'test-1',
    name: 'GRE',
    overall: '322',
    breakdown: [
      {
        label: 'Quantitative',
        score: '170/170',
      },
      {
        label: 'Verbal',
        score: '152/170',
      },
    ],
  },
  {
    id: 'test-2',
    name: 'TOEFL',
    overall: '98',
  },
];

export const transcriptUrl = '/Official_transcript.pdf';
