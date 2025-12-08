/**
 * Enhanced Publications Section Component
 * Features: Sorting, Filtering, Search, Pagination, Citation Metrics
 */

'use client';

import React, { useState, useMemo } from 'react';
import {
  PublicationsSectionProps,
  Publication,
  SortOption,
  FilterType,
  FilterStatus,
} from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  FileText,
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Award,
  TrendingUp,
} from 'lucide-react';

export function PublicationsSection({
  data,
  className = '',
}: PublicationsSectionProps) {
  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('year');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate statistics
  const stats = useMemo(() => {
    const pubs = data.publications;
    return {
      total: pubs.length,
      totalCitations: pubs.reduce((sum, p) => sum + (p.citations || 0), 0),
      journals: pubs.filter((p) => p.type === 'journal').length,
      conferences: pubs.filter((p) => p.type === 'conference').length,
      datasets: pubs.filter((p) => p.type === 'dataset').length,
    };
  }, [data.publications]);

  // Filter and sort publications
  const filteredAndSortedPublications = useMemo(() => {
    let filtered = [...data.publications];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.authors?.some((author) => author.toLowerCase().includes(query)) ||
          pub.abstract?.toLowerCase().includes(query) ||
          pub.venue.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((pub) => pub.type === filterType);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((pub) => pub.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          if (b.year !== a.year) return b.year - a.year;
          return (b.citations || 0) - (a.citations || 0);
        case 'citations':
          return (b.citations || 0) - (a.citations || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'type':
          if (a.type !== b.type) return a.type.localeCompare(b.type);
          return b.year - a.year;
        default:
          return 0;
      }
    });

    return filtered;
  }, [data.publications, searchQuery, sortBy, filterType, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedPublications.length / itemsPerPage
  );
  const paginatedPublications = filteredAndSortedPublications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle abstract expansion
  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  // Render individual publication card
  const renderPublication = (publication: Publication) => {
    const isExpanded = expandedIds.has(publication.id);
    const hasLongAbstract = (publication.abstract?.length || 0) > 300;

    return (
      <Card
        key={publication.id}
        className="group mb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight transition-colors group-hover:text-primary">
                {publication.title}
              </CardTitle>

              {/* Metadata badges */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary transition-all group-hover:bg-primary/20">
                  {publication.type}
                </span>
                <span className="text-muted-foreground">
                  {publication.year}
                </span>
                {publication.citations !== undefined &&
                  publication.citations > 0 && (
                    <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-1 font-medium text-blue-600 dark:text-blue-400">
                      <TrendingUp className="h-3 w-3" />
                      {publication.citations} citations
                    </span>
                  )}
                {publication.featured && (
                  <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1 font-semibold text-yellow-600 dark:text-yellow-400">
                    <Award className="h-3 w-3" />
                    Featured
                  </span>
                )}
                {publication.status && publication.status !== 'published' && (
                  <span className="rounded-full bg-orange-500/10 px-2.5 py-1 font-medium text-orange-600 dark:text-orange-400">
                    {publication.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Authors */}
          {publication.authors && publication.authors.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Authors:</span>{' '}
              {publication.authors.join(', ')}
            </div>
          )}

          {/* Venue */}
          {publication.venue && (
            <div className="flex items-start gap-2">
              <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <span className="text-sm italic text-muted-foreground">
                {publication.venue}
                {publication.volumeInfo && `, ${publication.volumeInfo}`}
                {publication.pageInfo && `, ${publication.pageInfo}`}
              </span>
            </div>
          )}

          {/* Abstract */}
          {publication.abstract && (
            <div className="text-sm leading-relaxed text-muted-foreground">
              {hasLongAbstract && !isExpanded
                ? `${publication.abstract.substring(0, 300)}...`
                : publication.abstract}
              {hasLongAbstract && (
                <button
                  onClick={() => toggleExpanded(publication.id)}
                  className="ml-2 text-primary hover:underline"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}

          {/* Keywords */}
          {publication.keywords && publication.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {publication.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium transition-colors hover:bg-secondary/80"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {publication.links && publication.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {publication.links.map((link, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    {link.type === 'doi' && (
                      <FileText className="h-3.5 w-3.5" />
                    )}
                    {link.type === 'pdf' && (
                      <FileText className="h-3.5 w-3.5" />
                    )}
                    {link.type !== 'doi' && link.type !== 'pdf' && (
                      <ExternalLink className="h-3.5 w-3.5" />
                    )}
                    {link.label || link.type.toUpperCase()}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <section
      className={`publications-section py-16 ${className}`}
      data-testid="publications-section"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">{data.heading}</h2>
          {data.description && (
            <p className="text-lg text-muted-foreground">{data.description}</p>
          )}
        </div>

        {/* Citation Metrics */}
        {data.profile && (
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-blue-500/5">
            <CardContent className="py-6">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {data.profile.citations}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Citations
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {data.profile.h_index}
                  </div>
                  <div className="text-sm text-muted-foreground">h-index</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {data.profile.i10_index}
                  </div>
                  <div className="text-sm text-muted-foreground">i10-index</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {stats.total}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Publications
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="space-y-4 py-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search publications by title, authors, abstract..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Filters and Sort */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {/* Sort By */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="year">Year (Newest)</option>
                  <option value="citations">Citations (Most)</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="type">Type</option>
                </select>
              </div>

              {/* Filter by Type */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value as FilterType);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Types</option>
                  <option value="journal">Journal</option>
                  <option value="conference">Conference</option>
                  <option value="preprint">Preprint</option>
                  <option value="dataset">Dataset</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>

              {/* Filter by Status */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value as FilterStatus);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="under-review">Under Review</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>

              {/* Items per page */}
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Per page
                </label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              Showing {paginatedPublications.length} of{' '}
              {filteredAndSortedPublications.length} publications
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          </CardContent>
        </Card>

        {/* Publications List */}
        <div className="space-y-4">
          {paginatedPublications.length > 0 ? (
            paginatedPublications.map(renderPublication)
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No publications found matching your criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="h-9 w-9"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
