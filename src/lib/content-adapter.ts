/**
 * Content Adapter
 * Abstraction layer for content loading - swap data sources without code changes
 * Currently: JSON file
 * Future: CMS, API, Database, etc.
 */

import { SiteContent } from '@/types/content';
import siteContentData from '@/data/site-content.json';

export class ContentAdapter {
  private static instance: ContentAdapter;
  private content: SiteContent;

  private constructor() {
    // Type assertion for JSON import
    this.content = siteContentData as SiteContent;
  }

  public static getInstance(): ContentAdapter {
    if (!ContentAdapter.instance) {
      ContentAdapter.instance = new ContentAdapter();
    }
    return ContentAdapter.instance;
  }

  /**
   * Get all site content
   */
  public getSiteContent(): SiteContent {
    return this.content;
  }

  /**
   * Get specific section content
   */
  public getSection<K extends keyof SiteContent>(section: K): SiteContent[K] {
    return this.content[section];
  }

  /**
   * Future: Load from external API
   */
  // public async loadFromAPI(url: string): Promise<SiteContent> {
  //   const response = await fetch(url);
  //   this.content = await response.json();
  //   return this.content;
  // }

  /**
   * Future: Load from CMS
   */
  // public async loadFromCMS(apiKey: string): Promise<SiteContent> {
  //   // CMS integration logic
  //   return this.content;
  // }
}

/**
 * Convenience function to get content adapter instance
 */
export function getContent(): ContentAdapter {
  return ContentAdapter.getInstance();
}
