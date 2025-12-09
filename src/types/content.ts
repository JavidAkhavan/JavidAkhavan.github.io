/**
 * Content Data Types
 * Content-agnostic type definitions - can be reused for any project
 */

export interface HeroContent {
  title: string;
  subtitle?: string;
  description: string;
  cta?: CallToAction[];
  background?: MediaAsset;
}

export interface AboutContent {
  heading: string;
  bio: string;
  image?: MediaAsset;
  highlights?: string[];
  interests?: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  highlights?: string[];
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  honors?: string[];
  coursework?: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: MediaAsset;
  technologies?: string[];
  links?: ProjectLink[];
  featured?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface ProjectLink {
  type: 'github' | 'live' | 'demo' | 'other';
  url: string;
  label?: string;
}

export interface ContactContent {
  heading: string;
  description?: string;
  email?: string;
  phone?: string;
  social?: SocialLink[];
  formEnabled?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface CallToAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Publication {
  id: string;
  title: string;
  authors?: string[] | string;
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'preprint' | 'dataset' | string;
  status?: 'published' | 'under-review' | 'accepted' | string;
  abstract?: string;
  links?: {
    type: 'doi' | 'pdf' | 'scholar' | 'arxiv' | 'github' | 'other' | string;
    url: string;
    label?: string;
  }[];
  featured?: boolean;
}

export interface PublicationsContent {
  heading: string;
  description?: string;
  publications: Publication[];
}

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

export interface TeachingContent {
  heading: string;
  description?: string;
  positions: TeachingPosition[];
}

/**
 * Site-wide content structure
 * All content externalized - easily replaceable for different projects
 */
export interface SiteContent {
  metadata: SiteMetadata;
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  publications: PublicationsContent;
  teaching: TeachingContent;
  contact: ContactContent;
}

export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  keywords?: string[];
  siteUrl?: string;
  locale?: string;
}
