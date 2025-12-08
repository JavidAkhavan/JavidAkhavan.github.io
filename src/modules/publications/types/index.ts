/**
 * Publications Module Types
 */

export interface Publication {
  id: string;
  title: string;
  authors?: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'preprint' | 'dataset';
  status?: 'published' | 'under-review' | 'accepted';
  abstract?: string;
  links?: {
    type: 'doi' | 'pdf' | 'scholar' | 'arxiv' | 'github' | 'other';
    url: string;
    label?: string;
  }[];
  featured?: boolean;
}

export interface PublicationsSectionProps {
  data: {
    heading: string;
    description?: string;
    publications: Publication[];
  };
  className?: string;
}
