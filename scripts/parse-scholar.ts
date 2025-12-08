#!/usr/bin/env tsx
/**
 * Google Scholar Parser Script
 * Parses publications from Google Scholar profile and generates YAML data
 *
 * Usage:
 *   npm run parse-scholar <scholar_user_id>
 *   npm run parse-scholar F1dmBdMAAAAJ
 */

import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface ScholarPublication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  citations: number;
  abstract?: string;
  type: 'journal' | 'conference' | 'preprint' | 'dataset' | 'workshop';
  status: 'published' | 'under-review' | 'accepted';
  links?: {
    type: 'doi' | 'pdf' | 'scholar' | 'arxiv' | 'github' | 'other';
    url: string;
    label?: string;
  }[];
  featured?: boolean;
  doi?: string;
  arxivId?: string;
  volumeInfo?: string;
  pageInfo?: string;
}

interface ScholarProfile {
  name: string;
  affiliation: string;
  citations: number;
  hIndex: number;
  i10Index: number;
  publications: ScholarPublication[];
}

/**
 * Parse Google Scholar user page
 * Note: This is a basic parser. For production, consider using the scholarly Python library
 * or Google Scholar API (if available)
 */
async function parseScholarProfile(userId: string): Promise<ScholarProfile> {
  const url = `https://scholar.google.com/citations?user=${userId}&hl=en`;

  console.log(`Fetching Google Scholar profile: ${url}`);

  // Note: Google Scholar blocks scraping. You'll need to:
  // 1. Use the scholarly Python library (recommended)
  // 2. Use a proxy/API service
  // 3. Manually export data
  // 4. Use browser automation (Puppeteer)

  // For now, return a template structure
  console.warn(
    '⚠️  Direct scraping is not implemented due to Google Scholar restrictions.'
  );
  console.warn('📝 Please use one of these methods:');
  console.warn('   1. scholarly Python library: pip install scholarly');
  console.warn('   2. Export manually and paste into publications.yml');
  console.warn('   3. Use browser automation with Puppeteer');

  return {
    name: '',
    affiliation: '',
    citations: 0,
    hIndex: 0,
    i10Index: 0,
    publications: [],
  };
}

/**
 * Parse using scholarly Python library (recommended)
 * Requires: pip install scholarly
 */
function generatePythonScript(userId: string): string {
  return `#!/usr/bin/env python3
"""
Google Scholar Parser using scholarly library
Install: pip install scholarly
Usage: python3 parse-scholar.py ${userId}
"""

from scholarly import scholarly
import json
import sys

def parse_publication(pub_data):
    """Parse a single publication"""
    bib = pub_data.get('bib', {})

    # Determine publication type
    pub_type = 'conference'
    venue = bib.get('venue', '').lower()
    if 'journal' in venue or 'ieee' in venue or 'acm' in venue:
        pub_type = 'journal'
    elif 'arxiv' in venue:
        pub_type = 'preprint'
    elif 'dataset' in bib.get('title', '').lower():
        pub_type = 'dataset'

    # Extract authors
    authors = []
    author_str = bib.get('author', '')
    if author_str:
        authors = [a.strip() for a in author_str.split(' and ')]

    # Build publication object
    publication = {
        'id': f"pub-{pub_data.get('author_pub_id', '').split(':')[-1]}",
        'title': bib.get('title', ''),
        'authors': authors,
        'venue': bib.get('venue', bib.get('journal', '')),
        'year': int(bib.get('pub_year', 0)) if bib.get('pub_year') else 0,
        'citations': pub_data.get('num_citations', 0),
        'abstract': bib.get('abstract', ''),
        'type': pub_type,
        'status': 'published',
        'links': [],
        'featured': False,
    }

    # Add links
    if 'pub_url' in pub_data:
        publication['links'].append({
            'type': 'other',
            'url': pub_data['pub_url'],
            'label': 'View Paper'
        })

    if 'eprint_url' in pub_data:
        url = pub_data['eprint_url']
        link_type = 'pdf' if url.endswith('.pdf') else 'other'
        publication['links'].append({
            'type': link_type,
            'url': url,
            'label': 'PDF'
        })

    # Add Google Scholar link
    if 'citedby_url' in pub_data:
        scholar_url = f"https://scholar.google.com{pub_data['citedby_url']}"
        publication['links'].append({
            'type': 'scholar',
            'url': scholar_url,
            'label': 'Google Scholar'
        })

    # Add DOI if available
    if 'doi' in bib:
        publication['doi'] = bib['doi']
        publication['links'].append({
            'type': 'doi',
            'url': f"https://doi.org/{bib['doi']}",
            'label': 'DOI'
        })

    # Add volume and page info
    if 'volume' in bib or 'pages' in bib:
        volume_info = []
        if 'volume' in bib:
            volume_info.append(f"Vol. {bib['volume']}")
        if 'number' in bib:
            volume_info.append(f"No. {bib['number']}")
        if volume_info:
            publication['volumeInfo'] = ', '.join(volume_info)

        if 'pages' in bib:
            publication['pageInfo'] = f"pp. {bib['pages']}"

    return publication

def main():
    user_id = '${userId}'
    print(f"Fetching Google Scholar profile for user: {user_id}", file=sys.stderr)

    try:
        # Search for author
        search_query = scholarly.search_author_id(user_id)
        author = scholarly.fill(search_query)

        print(f"Found: {author['name']}", file=sys.stderr)
        print(f"Affiliation: {author.get('affiliation', 'N/A')}", file=sys.stderr)
        print(f"Citations: {author.get('citedby', 0)}", file=sys.stderr)
        print(f"h-index: {author.get('hindex', 0)}", file=sys.stderr)
        print(f"i10-index: {author.get('i10index', 0)}", file=sys.stderr)

        # Get publications
        publications = []
        print(f"\\nParsing publications...", file=sys.stderr)

        for i, pub in enumerate(author['publications'], 1):
            try:
                print(f"  [{i}] Fetching details...", file=sys.stderr)
                pub_filled = scholarly.fill(pub)
                parsed_pub = parse_publication(pub_filled)
                publications.append(parsed_pub)
                print(f"  [{i}] ✓ {parsed_pub['title'][:50]}...", file=sys.stderr)
            except Exception as e:
                print(f"  [{i}] ✗ Error: {str(e)}", file=sys.stderr)
                continue

        # Create output structure
        output = {
            'profile': {
                'name': author['name'],
                'affiliation': author.get('affiliation', ''),
                'scholar_id': user_id,
                'citations': author.get('citedby', 0),
                'h_index': author.get('hindex', 0),
                'i10_index': author.get('i10index', 0),
            },
            'publications': sorted(publications, key=lambda x: (-x['year'], -x['citations']))
        }

        # Output as JSON
        print(json.dumps(output, indent=2))
        print(f"\\n✓ Successfully parsed {len(publications)} publications", file=sys.stderr)

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
`;
}

/**
 * Convert JSON to YAML publications file
 */
function jsonToYaml(data: any, outputPath: string): void {
  const yamlStr = yaml.dump(data, {
    indent: 2,
    lineWidth: 100,
    noRefs: true,
    sortKeys: false,
  });

  fs.writeFileSync(outputPath, yamlStr, 'utf-8');
  console.log(`✓ Generated: ${outputPath}`);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const userId = args[0] || 'F1dmBdMAAAAJ'; // Javid's Scholar ID

  console.log('='.repeat(60));
  console.log('📚 Google Scholar Publications Parser');
  console.log('='.repeat(60));
  console.log();

  // Generate Python script
  const pythonScript = generatePythonScript(userId);
  const scriptPath = path.join(__dirname, 'parse-scholar.py');
  fs.writeFileSync(scriptPath, pythonScript, { mode: 0o755 });
  console.log(`✓ Generated Python script: ${scriptPath}`);
  console.log();

  // Instructions
  console.log('📝 INSTRUCTIONS:');
  console.log('─'.repeat(60));
  console.log('1. Install scholarly library:');
  console.log('   pip install scholarly');
  console.log();
  console.log('2. Run the Python script:');
  console.log(`   python3 ${scriptPath} > scholar-data.json`);
  console.log();
  console.log('3. Convert to YAML:');
  console.log('   npm run scholar-to-yaml');
  console.log();
  console.log('4. Review and edit:');
  console.log('   src/data/publications.yml');
  console.log('─'.repeat(60));
  console.log();

  // Create template YAML
  const templatePath = path.join(__dirname, '../src/data/publications.yml');
  if (!fs.existsSync(templatePath)) {
    const template = {
      profile: {
        name: 'Javid Akhavan',
        affiliation: 'Stevens Institute of Technology',
        scholar_id: userId,
        citations: 0,
        h_index: 0,
        i10_index: 0,
      },
      publications: [
        {
          id: 'example',
          title: 'Example Publication',
          authors: ['Author One', 'Author Two'],
          venue: 'Conference/Journal Name',
          year: 2024,
          citations: 0,
          abstract: 'Publication abstract goes here...',
          type: 'journal',
          status: 'published',
          featured: false,
          links: [
            {
              type: 'doi',
              url: 'https://doi.org/10.xxxx/xxxxx',
              label: 'DOI',
            },
          ],
        },
      ],
    };

    jsonToYaml(template, templatePath);
    console.log(`✓ Created template: ${templatePath}`);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { parseScholarProfile, jsonToYaml };
