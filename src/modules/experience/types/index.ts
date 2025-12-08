/**
 * Experience Module Types
 */

import { ExperienceItem } from '@/types/content';

export interface ExperienceSectionProps {
  data: ExperienceItem[];
  className?: string;
}

export interface ExperienceCardProps {
  experience: ExperienceItem;
}
