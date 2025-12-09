/**
 * Home Page
 * Clean and focused landing page with hero, about, quick links, and contact
 */

import React from 'react';
import { getContent } from '@/lib/content-adapter';
import { HeroSection } from '@/modules/hero';
import { AboutSection } from '@/modules/about';
import { ContactSection } from '@/modules/contact';
import { SidebarNav } from '@/core/components/SidebarNav';
import { ScrollToTop } from '@/core/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ScrollAnimation } from '@/core';
import {
  GraduationCap,
  Briefcase,
  FileText,
  Code,
  BookOpen,
  Award,
} from 'lucide-react';

export default function Home() {
  const content = getContent().getSiteContent();

  return (
    <>
      <SidebarNav />
      <ScrollToTop />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection data={content.hero} />

        {/* About Section */}
        <AboutSection data={content.about} />

        {/* Quick Links Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold">Explore My Work</h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Discover my academic research, professional experience, and
                  technical projects
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Academic Profile Card */}
              <ScrollAnimation animation="scale" delay={100}>
                <Link href="/academic">
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl transition-colors group-hover:text-primary">
                        Academic Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        Explore my research publications, educational
                        background, teaching experience, and academic
                        achievements
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span>Research Publications & Papers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span>PhD & Graduate Education</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>Teaching Experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span>Test Scores & Certifications</span>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4 w-full">
                        View Academic Profile →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollAnimation>

              {/* Professional Profile Card */}
              <ScrollAnimation animation="scale" delay={200}>
                <Link href="/professional">
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                        <Briefcase className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl transition-colors group-hover:text-primary">
                        Professional Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        View my industry experience, technical skills, and
                        professional projects in ML and software engineering
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span>6+ Years Industry Experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-primary" />
                          <span>Technical Skills & Expertise</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span>Professional Projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span>Industry Certifications</span>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4 w-full">
                        View Professional Profile →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection data={content.contact} />
      </main>
    </>
  );
}
