/**
 * Home Page
 * Renders all enabled modules from the module registry
 */

import { getContent } from '@/lib/content-adapter';
import { getEnabledModules } from '@/registry/module-registry';
import { HeroSection } from '@/modules/hero';
import { AboutSection } from '@/modules/about';
import { ExperienceSection } from '@/modules/experience';
import { EducationSection } from '@/modules/education';
import { SkillsSection } from '@/modules/skills';
import { ProjectsSection } from '@/modules/projects';
import { ContactSection } from '@/modules/contact';

export default function Home() {
  const content = getContent().getSiteContent();
  const enabledModules = getEnabledModules();

  const moduleComponents: Record<string, React.ReactNode> = {
    hero: <HeroSection key="hero" data={content.hero} />,
    about: <AboutSection key="about" data={content.about} />,
    experience: <ExperienceSection key="experience" data={content.experience} />,
    education: <EducationSection key="education" data={content.education} />,
    skills: <SkillsSection key="skills" data={content.skills} />,
    projects: <ProjectsSection key="projects" data={content.projects} />,
    contact: <ContactSection key="contact" data={content.contact} />,
  };

  return (
    <main className="min-h-screen">
      {enabledModules.map((module) => moduleComponents[module.id])}
    </main>
  );
}
