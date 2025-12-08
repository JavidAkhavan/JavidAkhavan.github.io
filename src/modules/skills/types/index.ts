/**
 * Skills Module Types
 */

import { SkillCategory } from '@/types/content';

export interface SkillsSectionProps {
  data: SkillCategory[];
  className?: string;
}

export interface SkillCategoryCardProps {
  category: SkillCategory;
}
