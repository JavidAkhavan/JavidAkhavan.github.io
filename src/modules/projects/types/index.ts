/**
 * Projects Module Types
 */

import { ProjectItem } from '@/types/content';

export interface ProjectsSectionProps {
  data: ProjectItem[];
  className?: string;
}

export interface ProjectCardProps {
  project: ProjectItem;
}
