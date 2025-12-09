/**
 * Professional Page
 * Displays all professional-related content including experience, skills, and projects
 */

import React from 'react';
import { getContent } from '@/lib/content-adapter';
import { ExperienceSection } from '@/modules/experience';
import { SkillsSection } from '@/modules/skills';
import { ProjectsSection } from '@/modules/projects';
import { SidebarNav } from '@/core/components/SidebarNav';
import { ScrollToTop } from '@/core/components/ScrollToTop';
import { SocialProofBadges } from '@/core/components/SocialProofBadges';
import { ScrollAnimation } from '@/core';

export const metadata = {
  title: 'Professional Profile - Javid Akhavan',
  description:
    'Professional experience, skills, and projects in Machine Learning, Software Engineering, and AI Development',
};

export default function ProfessionalPage() {
  const content = getContent().getSiteContent();

  // Calculate years of experience
  const currentYear = new Date().getFullYear();
  const firstJobYear = content.experience[0]?.startDate
    ? parseInt(content.experience[0].startDate.split(' ')[1])
    : currentYear - 6;
  const yearsExperience = currentYear - firstJobYear;

  // Extract education info for badges
  const phd = content.education.find(
    (edu) => edu.degree === 'Doctor of Philosophy (Ph.D.)'
  );

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
                <h1 className="mb-4 text-5xl font-bold">
                  Professional Profile
                </h1>
                <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                  Industry experience, technical skills, and professional
                  projects in Machine Learning, Software Engineering, and
                  Autonomous Systems
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Professional Credentials */}
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

        {/* Experience Section */}
        <ExperienceSection data={content.experience} />

        {/* Skills Section */}
        <SkillsSection data={content.skills} />

        {/* Projects Section */}
        <ProjectsSection data={content.projects} />
      </main>
    </>
  );
}
