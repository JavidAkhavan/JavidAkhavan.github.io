/**
 * Academic Page
 * Displays all academic-related content including publications, education, teaching, test scores
 */

import React from 'react';
import { getContent } from '@/lib/content-adapter';
import { EducationSection } from '@/modules/education';
import { PublicationsSection } from '@/modules/publications';
import { TeachingSection } from '@/modules/teaching';
import { CertificatesSection } from '@/modules/certificates';
import { TestScoresSection } from '@/modules/test-scores';
import { SidebarNav } from '@/core/components/SidebarNav';
import { ScrollToTop } from '@/core/components/ScrollToTop';
import { ResearchMetrics } from '@/core/components/ResearchMetrics';
import { certificatesData } from '@/data/certificates';
import { testScoresData, transcriptUrl } from '@/data/test-scores';
import { loadPublications } from '@/lib/publications-loader';
import { ScrollAnimation } from '@/core';

export const metadata = {
  title: 'Academic Profile - Javid Akhavan',
  description:
    'Academic achievements, publications, education, and teaching experience in Machine Learning, Computer Vision, and Robotics',
};

export default function AcademicPage() {
  const content = getContent().getSiteContent();

  // Load publications from YAML
  const publicationsYamlData = loadPublications();

  // Calculate research metrics
  const totalPublications = publicationsYamlData.publications.length;
  const featuredPublications = publicationsYamlData.publications.filter(
    (pub) => pub.featured
  ).length;
  const currentYear = new Date().getFullYear();
  const firstJobYear = content.experience[0]?.startDate
    ? parseInt(content.experience[0].startDate.split(' ')[1])
    : currentYear - 6;
  const yearsExperience = currentYear - firstJobYear;

  return (
    <>
      <SidebarNav />
      <ScrollToTop />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade">
              <div className="text-center">
                <h1 className="mb-4 text-5xl font-bold">Academic Profile</h1>
                <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                  Research publications, educational background, teaching
                  experience, and academic achievements in Machine Learning,
                  Computer Vision, and Autonomous Systems
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Research Metrics */}
        <ResearchMetrics
          totalPublications={totalPublications}
          featuredPublications={featuredPublications}
          yearsExperience={yearsExperience}
        />

        {/* Publications Section */}
        <PublicationsSection
          data={{
            heading: 'Publications',
            description:
              'Selected publications from my research in additive manufacturing, machine learning, and quality control.',
            publications: publicationsYamlData.publications,
            profile: publicationsYamlData.profile,
          }}
        />

        {/* Education Section */}
        <EducationSection data={content.education} />

        {/* Teaching Experience */}
        <TeachingSection data={content.teaching} />

        {/* Test Scores */}
        <TestScoresSection
          data={testScoresData}
          transcriptUrl={transcriptUrl}
        />

        {/* Academic Certificates */}
        <CertificatesSection data={certificatesData} />
      </main>
    </>
  );
}
