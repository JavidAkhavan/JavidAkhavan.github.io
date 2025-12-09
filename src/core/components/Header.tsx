/**
 * Header Component
 * Main site header with navigation and contact info
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HeaderProps {
  logo?: string;
  navItems?: NavItem[];
  email?: string;
  phone?: string;
  location?: string;
  social?: SocialLink[];
  className?: string;
}

export function Header({
  logo = 'JA',
  navItems = [],
  email,
  phone,
  location,
  social = [],
  className = '',
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const getSocialIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('linkedin'))
      return <Linkedin className="h-4 w-4" />;
    if (lowerPlatform.includes('github')) return <Github className="h-4 w-4" />;
    return null;
  };

  return (
    <header
      className={`sticky top-0 z-[var(--z-sticky)] bg-background/95 backdrop-blur-sm border-b border-border ${className}`}
      data-testid="site-header"
    >
      {/* Top Bar with Contact Info */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs">
            {/* Contact Info */}
            <div className="hidden lg:flex items-center gap-4 text-muted-foreground">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{email}</span>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{phone}</span>
                </a>
              )}
              {location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {social.map((link) => {
                const icon = getSocialIcon(link.platform);
                return icon ? (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.platform}
                  >
                    {icon}
                    <span className="hidden sm:inline">{link.platform}</span>
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-foreground hover:text-primary transition-colors group"
          >
            <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
              <Image
                src="/logo.svg"
                alt="Javid Akhavan"
                width={48}
                height={48}
                className="object-contain dark:invert-0"
                priority
              />
            </div>
            <span className="hidden sm:inline font-serif">{logo}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                {...(item.external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  {...(item.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
