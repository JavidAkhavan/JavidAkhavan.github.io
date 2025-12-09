/**
 * Publications Module Types
 */

export interface Publication {
  id: string;
  title: string;
  authors?: string[];
  venue: string;
  year: number;
  citations?: number;
  type: 'journal' | 'conference' | 'preprint' | 'dataset' | 'workshop';
  status?: 'published' | 'under-review' | 'accepted';
  abstract?: string;
  doi?: string;
  arxivId?: string;
  volumeInfo?: string;
  pageInfo?: string;
  keywords?: string[];
  image?: string; // Path to publication thumbnail/image
  links?: {
    type: 'doi' | 'pdf' | 'scholar' | 'arxiv' | 'github' | 'other';
    url: string;
    label?: string;
  }[];
  featured?: boolean;
}

export interface ScholarProfile {
  name: string;
  affiliation: string;
  scholar_id: string;
  scholar_url?: string;
  citations: number;
  h_index: number;
  i10_index: number;
}

export interface PublicationsSectionProps {
  data: {
    heading: string;
    description?: string;
    publications: Publication[];
    profile?: ScholarProfile;
  };
  className?: string;
}

export type SortOption = 'year' | 'citations' | 'title' | 'type';
export type FilterType =
  | 'all'
  | 'journal'
  | 'conference'
  | 'preprint'
  | 'dataset'
  | 'workshop';
export type FilterStatus = 'all' | 'published' | 'under-review' | 'accepted';
