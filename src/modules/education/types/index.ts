/**
 * Education Module Types
 */

import { EducationItem } from '@/types/content';

export interface EducationSectionProps {
  data: EducationItem[];
  className?: string;
}

export interface EducationCardProps {
  education: EducationItem;
}
