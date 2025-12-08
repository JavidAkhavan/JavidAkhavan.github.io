/**
 * Teaching Module Types
 */

export interface TeachingPosition {
  id: string;
  title: string;
  institution: string;
  location: string;
  course?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  responsibilities?: string[];
}

export interface TeachingSectionProps {
  data: {
    heading: string;
    description?: string;
    positions: TeachingPosition[];
  };
  className?: string;
}
