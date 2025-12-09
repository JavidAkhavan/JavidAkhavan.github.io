'use client';

/**
 * Sidebar Navigation Component
 * Sticky navigation with scroll-spy functionality
 * Dynamically detects sections on the current page
 */

import React, { useEffect, useState } from 'react';
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Folder,
  BookOpen,
  Users,
  Mail,
  Award,
  FileText,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Icon mapping for dynamic section detection
const iconMap: Record<string, React.ReactNode> = {
  hero: <Home className="h-4 w-4" />,
  about: <User className="h-4 w-4" />,
  experience: <Briefcase className="h-4 w-4" />,
  education: <GraduationCap className="h-4 w-4" />,
  skills: <Code className="h-4 w-4" />,
  projects: <Folder className="h-4 w-4" />,
  publications: <BookOpen className="h-4 w-4" />,
  teaching: <Users className="h-4 w-4" />,
  certificates: <Award className="h-4 w-4" />,
  'test-scores': <FileText className="h-4 w-4" />,
  contact: <Mail className="h-4 w-4" />,
};

// Label mapping for better display names
const labelMap: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  publications: 'Publications',
  teaching: 'Teaching',
  certificates: 'Certificates',
  'test-scores': 'Test Scores',
  contact: 'Contact',
};

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    // Dynamically detect sections on the page
    const detectSections = () => {
      const sections = document.querySelectorAll('[data-testid$="-section"]');
      const detectedItems: NavItem[] = [];

      sections.forEach((section) => {
        const testId = section.getAttribute('data-testid');
        if (testId) {
          const id = testId.replace('-section', '');
          detectedItems.push({
            id,
            label: labelMap[id] || id.charAt(0).toUpperCase() + id.slice(1),
            icon: iconMap[id] || <Folder className="h-4 w-4" />,
          });
        }
      });

      setNavItems(detectedItems);
      if (detectedItems.length > 0 && !activeSection) {
        setActiveSection(detectedItems[0].id);
      }
    };

    // Run detection after DOM is ready
    detectSections();

    // Show sidebar after initial scroll
    const handleInitialScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Calculate scroll progress
    const updateScrollProgress = () => {
      const progress = Math.min(
        100,
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );
      setScrollProgress(progress);
    };

    // Scroll spy - detect which section is in view
    const handleScroll = () => {
      handleInitialScroll();
      updateScrollProgress();

      const sections = navItems.map((item) => {
        const element = document.querySelector(
          `[data-testid="${item.id}-section"]`
        );
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= 150 && rect.bottom >= 150;

        return { id: item.id, isInView, top: rect.top };
      });

      // Find the section closest to the top of viewport
      const visibleSections = sections.filter((s) => s && s.isInView);
      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0]!.id);
      } else {
        // If no section is directly in view, find the one closest to top
        const filteredSections = sections.filter((s) => s !== null);
        if (filteredSections.length > 0) {
          const closestSection = filteredSections.reduce((closest, current) => {
            if (!closest) return current;
            if (!current) return closest;
            return Math.abs(current.top) < Math.abs(closest.top)
              ? current
              : closest;
          });
          if (closestSection) {
            setActiveSection(closestSection.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(
      `[data-testid="${sectionId}-section"]`
    );
    if (element) {
      const offset = 80; // Offset for fixed header if any
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  };

  // Don't render if no sections detected
  if (navItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, visible on lg and up */}
      <nav
        className={`fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 lg:block ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
        }`}
      >
        <div className="space-y-1 rounded-lg border bg-background/80 p-2 shadow-lg backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
                title={item.label}
              >
                {/* Progress indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-md bg-primary-foreground" />
                )}

                <span
                  className={`transition-transform ${isActive ? 'scale-110' : ''}`}
                >
                  {item.icon}
                </span>

                {/* Label - show on hover */}
                <span
                  className={`absolute left-full ml-4 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md transition-all ${
                    isActive
                      ? 'opacity-0 group-hover:opacity-100'
                      : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll progress indicator */}
        <div className="mt-4 flex justify-center">
          <div className="relative h-32 w-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="absolute left-0 top-0 w-full bg-primary transition-all duration-300"
              style={{
                height: `${scrollProgress}%`,
              }}
            />
          </div>
        </div>
      </nav>

      {/* Mobile FAB Toggle Button - Only visible on mobile (below lg) */}
      {isVisible && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 lg:hidden ${
            mobileMenuOpen ? 'rotate-90' : ''
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      )}

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <nav className="fixed bottom-24 right-6 z-50 max-h-[70vh] w-64 overflow-y-auto rounded-lg border bg-background/95 p-4 shadow-2xl backdrop-blur-sm lg:hidden">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <span
                      className={`transition-transform ${isActive ? 'scale-110' : ''}`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Scroll Progress */}
            <div className="mt-4 flex items-center gap-2 border-t pt-4">
              <div className="flex-1">
                <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${scrollProgress}%`,
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.round(scrollProgress)}%
              </span>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
