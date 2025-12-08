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
import { SidebarNav } from '@/core/components/SidebarNav';
import { ResearchMetrics } from '@/core/components/ResearchMetrics';
import { ScrollToTop } from '@/core/components/ScrollToTop';
import { SocialProofBadges } from '@/core/components/SocialProofBadges';

export default function Home() {
  const content = getContent().getSiteContent();
  const enabledModules = getEnabledModules();

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
      <PublicationsSection key="publications" data={content.publications} />
    ),
    teaching: <TeachingSection key="teaching" data={content.teaching} />,
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
                <SocialProofBadges />
                <ResearchMetrics />
              </React.Fragment>
            );
          }
          return moduleComponents[module.id];
        })}
      </main>
    </>
  );
}
