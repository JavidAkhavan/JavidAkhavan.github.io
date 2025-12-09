'use client';

/**
 * Sidebar Navigation Component
 * Sticky navigation with scroll-spy functionality
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
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { id: 'about', label: 'About', icon: <User className="h-4 w-4" /> },
  {
    id: 'experience',
    label: 'Experience',
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: 'education',
    label: 'Education',
    icon: <GraduationCap className="h-4 w-4" />,
  },
  { id: 'skills', label: 'Skills', icon: <Code className="h-4 w-4" /> },
  { id: 'projects', label: 'Projects', icon: <Folder className="h-4 w-4" /> },
  {
    id: 'publications',
    label: 'Publications',
    icon: <BookOpen className="h-4 w-4" />,
  },
  { id: 'teaching', label: 'Teaching', icon: <Users className="h-4 w-4" /> },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: <Award className="h-4 w-4" />,
  },
  {
    id: 'test-scores',
    label: 'Test Scores',
    icon: <FileText className="h-4 w-4" />,
  },
  { id: 'contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
];

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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
        const closestSection = sections
          .filter((s) => s !== null)
          .reduce((closest, current) => {
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
    }
  };

  return (
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
  );
}
