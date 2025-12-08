/**
 * Publications YAML Loader
 * Loads and parses publications from YAML file
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface ScholarProfile {
  name: string;
  affiliation: string;
  scholar_id: string;
  scholar_url?: string;
  citations: number;
  h_index: number;
  i10_index: number;
}

export interface PublicationLink {
  type: 'doi' | 'pdf' | 'scholar' | 'arxiv' | 'github' | 'other';
  url: string;
  label?: string;
}

export interface YAMLPublication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  citations: number;
  abstract?: string;
  type: 'journal' | 'conference' | 'preprint' | 'dataset' | 'workshop';
  status: 'published' | 'under-review' | 'accepted';
  featured?: boolean;
  doi?: string;
  arxivId?: string;
  volumeInfo?: string;
  pageInfo?: string;
  links?: PublicationLink[];
  keywords?: string[];
}

export interface PublicationsData {
  profile: ScholarProfile;
  publications: YAMLPublication[];
}

/**
 * Load publications from YAML file
 */
export function loadPublications(): PublicationsData {
  const yamlPath = path.join(process.cwd(), 'src/data/publications.yml');

  try {
    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const data = yaml.load(fileContents) as PublicationsData;

    // Sort publications by year (descending) and citations (descending)
    data.publications.sort((a, b) => {
      if (b.year !== a.year) {
        return b.year - a.year;
      }
      return b.citations - a.citations;
    });

    return data;
  } catch (error) {
    console.error('Error loading publications YAML:', error);
    // Return empty structure if file doesn't exist
    return {
      profile: {
        name: '',
        affiliation: '',
        scholar_id: '',
        citations: 0,
        h_index: 0,
        i10_index: 0,
      },
      publications: [],
    };
  }
}

/**
 * Get publications statistics
 */
export function getPublicationStats(publications: YAMLPublication[]) {
  const totalCitations = publications.reduce(
    (sum, pub) => sum + pub.citations,
    0
  );
  const totalPublications = publications.length;
  const journalCount = publications.filter((p) => p.type === 'journal').length;
  const conferenceCount = publications.filter(
    (p) => p.type === 'conference'
  ).length;
  const datasetCount = publications.filter((p) => p.type === 'dataset').length;

  return {
    totalCitations,
    totalPublications,
    journalCount,
    conferenceCount,
    datasetCount,
    averageCitations:
      totalPublications > 0
        ? Math.round(totalCitations / totalPublications)
        : 0,
  };
}

/**
 * Get unique years from publications
 */
export function getPublicationYears(publications: YAMLPublication[]): number[] {
  const years = publications.map((p) => p.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
}

/**
 * Get unique keywords from publications
 */
export function getAllKeywords(publications: YAMLPublication[]): string[] {
  const keywordsSet = new Set<string>();
  publications.forEach((pub) => {
    pub.keywords?.forEach((keyword) => keywordsSet.add(keyword));
  });
  return Array.from(keywordsSet).sort();
}
