#!/usr/bin/env python3
"""
Google Scholar Parser using scholarly library
Install: pip install scholarly
Usage: python3 parse-scholar.py hTwbmPUAAAAJ
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
    user_id = 'hTwbmPUAAAAJ'
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
        print(f"\nParsing publications...", file=sys.stderr)

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
        print(f"\n✓ Successfully parsed {len(publications)} publications", file=sys.stderr)

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
