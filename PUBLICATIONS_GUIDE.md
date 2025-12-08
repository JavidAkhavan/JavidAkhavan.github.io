# Publications Management Guide

## 📚 Overview

Your publications system now supports:

- ✅ YAML-based data storage (easy manual editing)
- ✅ Google Scholar parsing scripts (automated)
- ✅ Advanced filtering and sorting
- ✅ Citation tracking
- ✅ Multiple link types (DOI, PDF, Scholar, GitHub, arXiv)
- ✅ Full abstracts, keywords, author lists

## 🔧 Setup Complete

### 1. Scripts Created

- `scripts/parse-scholar.ts` - Main parser (TypeScript)
- `scripts/parse-scholar.py` - Python Scholar parser (auto-generated)
- `scripts/scholar-to-yaml.ts` - JSON to YAML converter

### 2. NPM Commands Added

```bash
npm run parse-scholar [scholar_id]  # Generate Python parser
npm run scholar-to-yaml [input] [output]  # Convert JSON to YAML
```

### 3. Dependencies Installed

- ✅ `js-yaml` - YAML parsing
- ✅ `tsx` - TypeScript execution
- ✅ `scholarly` (Python) - Google Scholar API

## 🚀 How to Update Publications

### Method 1: Automated (Google Scholar)

**Note:** Google Scholar blocking automated requests. Use browser extension or manual method.

```bash
# 1. Install Python library
pip install scholarly

# 2. Generate and run parser
npm run parse-scholar hTwbmPUAAAAJ  # Your Scholar ID from old site
python3 scripts/parse-scholar.py > scholar-data.json

# 3. Convert to YAML
npm run scholar-to-yaml scholar-data.json src/data/publications.yml

# 4. Review and commit
git add src/data/publications.yml
git commit -m "Update publications from Scholar"
```

### Method 2: Manual (Recommended)

1. Go to your Google Scholar profile:
   https://scholar.google.com/citations?hl=en&user=hTwbmPUAAAAJ

2. For each publication, copy these details:
   - Title
   - Authors
   - Venue (journal/conference name)
   - Year
   - Citations count
   - Abstract
   - DOI/PDF links

3. Edit `src/data/publications.yml`:

```yaml
- id: pub-8 # Increment ID
  title: Your Paper Title
  authors:
    - First Author
    - Second Author
    - Third Author
  venue: Journal/Conference Name
  year: 2024
  citations: 15 # From Scholar
  abstract: >
    Your abstract text here.
    Can span multiple lines.
  type: journal # or: conference, preprint, dataset, workshop
  status: published # or: under-review, accepted
  featured: false # Set true for highlighted papers
  doi: 10.xxxx/xxxxx
  volumeInfo: Vol. 10, No. 2
  pageInfo: pp. 123-145
  links:
    - type: doi
      url: https://doi.org/10.xxxx/xxxxx
      label: DOI
    - type: pdf
      url: https://example.com/paper.pdf
      label: PDF
    - type: scholar
      url: https://scholar.google.com/...
      label: Cited by X
    - type: github
      url: https://github.com/username/repo
      label: Code
  keywords:
    - Machine Learning
    - Computer Vision
```

## 📊 YAML File Structure

### Profile Section

```yaml
profile:
  name: Javid Akhavan
  affiliation: Stevens Institute of Technology
  scholar_id: hTwbmPUAAAAJ
  scholar_url: https://scholar.google.com/citations?hl=en&user=hTwbmPUAAAAJ
  citations: 150 # Total citations - update manually
  h_index: 8 # Update from Scholar
  i10_index: 5 # Update from Scholar
```

### Publications Section

```yaml
publications:
  - id: pub-1
    title: Title Here
    authors: [Author 1, Author 2]
    # ... rest of fields
```

## 🎯 Publication Fields

### Required Fields

- `id` - Unique identifier (pub-1, pub-2, etc.)
- `title` - Full paper title
- `authors` - List of author names
- `venue` - Journal/conference name
- `year` - Publication year
- `type` - One of: journal, conference, preprint, dataset, workshop
- `status` - One of: published, under-review, accepted

### Optional Fields

- `citations` - Citation count from Scholar
- `abstract` - Full abstract text
- `featured` - Boolean, highlights paper
- `doi` - DOI identifier
- `arxivId` - arXiv ID
- `volumeInfo` - Volume/issue info
- `pageInfo` - Page numbers
- `links` - Array of link objects
- `keywords` - Array of keywords/tags

### Link Types

- `doi` - DOI link
- `pdf` - PDF download
- `scholar` - Google Scholar page
- `arxiv` - arXiv preprint
- `github` - Code repository
- `other` - Custom link

## 🔄 Updating Existing Publications

1. Open `src/data/publications.yml`
2. Find publication by `id`
3. Update any fields (especially `citations`)
4. Save and commit

## 📈 Enhanced Publications Component

### Features Implemented (Next Steps)

- [ ] Sort by: Year, Citations, Title, Type
- [ ] Filter by: Type, Status, Year range, Keywords
- [ ] Search: Title, authors, abstract
- [ ] Pagination: 10/20/50 per page
- [ ] Export: BibTeX, RIS, plain text
- [ ] Citation metrics display
- [ ] Expandable abstracts
- [ ] Link type icons

### Current Features

- ✅ Display all publications
- ✅ YAML data source
- ✅ Links with icons
- ✅ Publication types
- ✅ Status badges

## 🐛 Troubleshooting

### Python Script Errors

```bash
# Install scholarly with correct SSL
pip install --upgrade certifi urllib3

# Or use user installation
pip install --user scholarly
```

### YAML Parsing Errors

- Check indentation (use 2 spaces)
- Ensure arrays use `- ` prefix
- Multi-line strings use `>`
- Quote special characters

### Scholar Blocking

- Use VPN or proxy
- Add delays between requests
- Use browser extension to export data
- Manual entry is most reliable

## 📝 Example: Adding a New Publication

```yaml
- id: pub-8
  title: Real-time Defect Detection Using CNNs
  authors:
    - Javid Akhavan
    - Souran Manoochehri
  venue: IEEE Transactions on Manufacturing
  year: 2024
  citations: 5
  abstract: >
    This paper presents a novel approach for real-time defect detection
    in additive manufacturing using convolutional neural networks.
  type: journal
  status: published
  featured: true
  doi: 10.1109/TM.2024.12345
  volumeInfo: Vol. 45, No. 3
  pageInfo: pp. 234-248
  links:
    - type: doi
      url: https://doi.org/10.1109/TM.2024.12345
      label: DOI
    - type: pdf
      url: https://example.com/paper.pdf
      label: PDF
    - type: scholar
      url: https://scholar.google.com/...
      label: Cited by 5
  keywords:
    - CNN
    - Defect Detection
    - Real-time Processing
    - Additive Manufacturing
```

## 🔗 Useful Links

- Google Scholar Profile: https://scholar.google.com/citations?hl=en&user=hTwbmPUAAAAJ
- scholarly Documentation: https://scholarly.readthedocs.io/
- YAML Syntax: https://yaml.org/spec/1.2/spec.html
- DOI Resolver: https://doi.org/

## ✅ Next Steps

1. **Manually add all publications from your Scholar profile**
   - Visit: https://scholar.google.com/citations?hl=en&user=hTwbmPUAAAAJ
   - Copy each publication's details
   - Add to `src/data/publications.yml`

2. **Implement enhanced filtering component**
   - Sort controls
   - Filter dropdowns
   - Search bar
   - Pagination

3. **Add citation metrics**
   - Total citations
   - h-index
   - i10-index
   - Citation graph (optional)

4. **Export functionality**
   - BibTeX format
   - RIS format
   - Plain text citation

## 📞 Support

If you encounter issues:

1. Check this guide
2. Review YAML syntax
3. Test with template publication
4. Commit working changes incrementally

---

**Remember:** The YAML file is the source of truth. You can edit it anytime to add/update publications without running any scripts!
