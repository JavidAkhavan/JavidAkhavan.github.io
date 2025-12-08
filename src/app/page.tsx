/**
 * Home Page
 * Renders all enabled modules from the module registry
 */

import React from 'react';
import { getContent } from '@/lib/content-adapter';
import { getEnabledModules } from '@/registry/module-registry';
import { HeroSection } from '@/modules/hero';
import { AboutSection } from '@/modules/about';
import { ExperienceSection } from '@/modules/experience';
import { EducationSection } from '@/modules/education';
import { SkillsSection } from '@/modules/skills';
import { ProjectsSection } from '@/modules/projects';
import { PublicationsSection } from '@/modules/publications';
import { TeachingSection } from '@/modules/teaching';
import { ContactSection } from '@/modules/contact';
import { CertificatesSection } from '@/modules/certificates';
import { TestScoresSection } from '@/modules/test-scores';
import { SidebarNav } from '@/core/components/SidebarNav';
import { ResearchMetrics } from '@/core/components/ResearchMetrics';
import { ScrollToTop } from '@/core/components/ScrollToTop';
import { SocialProofBadges } from '@/core/components/SocialProofBadges';
import { certificatesData } from '@/data/certificates';
import { testScoresData, transcriptUrl } from '@/data/test-scores';
import { loadPublications } from '@/lib/publications-loader';

export default function Home() {
  const content = getContent().getSiteContent();
  const enabledModules = getEnabledModules();

  // Load publications from YAML
  const publicationsYamlData = loadPublications();

  // Calculate dynamic metrics from data
  const totalPublications = publicationsYamlData.publications.length;
  const featuredPublications = publicationsYamlData.publications.filter(
    (pub) => pub.featured
  ).length;

  // Extract years of experience from experience data
  const currentYear = new Date().getFullYear();
  const firstJobYear = content.experience[0]?.startDate
    ? parseInt(content.experience[0].startDate.split(' ')[1])
    : currentYear - 6; // fallback to 6 years
  const yearsExperience = currentYear - firstJobYear;

  // Extract education info for badges
  const phd = content.education.find(
    (edu) => edu.degree === 'Doctor of Philosophy (Ph.D.)'
  );

  const moduleComponents: Record<string, React.ReactNode> = {
    hero: <HeroSection key="hero" data={content.hero} />,
    about: <AboutSection key="about" data={content.about} />,
    experience: (
      <ExperienceSection key="experience" data={content.experience} />
    ),
    education: <EducationSection key="education" data={content.education} />,
    skills: <SkillsSection key="skills" data={content.skills} />,
    projects: <ProjectsSection key="projects" data={content.projects} />,
    publications: (
      <PublicationsSection
        key="publications"
        data={{
          heading: 'Publications',
          description:
            'Selected publications from my research in additive manufacturing, machine learning, and quality control.',
          publications: publicationsYamlData.publications,
          profile: publicationsYamlData.profile,
        }}
      />
    ),
    teaching: <TeachingSection key="teaching" data={content.teaching} />,
    certificates: (
      <CertificatesSection key="certificates" data={certificatesData} />
    ),
    'test-scores': (
      <TestScoresSection
        key="test-scores"
        data={testScoresData}
        transcriptUrl={transcriptUrl}
      />
    ),
    contact: <ContactSection key="contact" data={content.contact} />,
  };

  return (
    <>
      <SidebarNav />
      <ScrollToTop />
      <main className="min-h-screen">
        {enabledModules.map((module) => {
          // Insert SocialProofBadges and ResearchMetrics after Hero section
          if (module.id === 'hero') {
            return (
              <React.Fragment key="hero-with-enhancements">
                {moduleComponents[module.id]}
                <SocialProofBadges
                  education={{
                    label: phd?.degree || 'PhD in Robotics & AI',
                    highlight: phd?.institution || 'Stevens Institute of Technology',
                  }}
                  gpa={{
                    label: `Perfect ${phd?.gpa || '4.0'} GPA`,
                    highlight: 'Graduate Studies',
                  }}
                  experience={{
                    label: `${yearsExperience}+ Years Experience`,
                    highlight: 'ML & Computer Vision',
                  }}
                  location={{
                    label: 'Based in NJ, USA',
                    highlight: 'Immediate Start Available',
                  }}
                />
                <ResearchMetrics
                  totalPublications={totalPublications}
                  featuredPublications={featuredPublications}
                  yearsExperience={yearsExperience}
                />
              </React.Fragment>
            );
          }
          return moduleComponents[module.id];
        })}
      </main>
    </>
  );
}
