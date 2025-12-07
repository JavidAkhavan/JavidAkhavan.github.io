/**
 * Footer Component
 * Main site footer with links and social media
 */

import React from 'react';
import Link from 'next/link';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}

export interface FooterProps {
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  className?: string;
}

export function Footer({
  sections = [],
  socialLinks = [],
  copyright,
  className = '',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-muted/50 border-t border-border ${className}`}
      data-testid="site-footer"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Footer Sections */}
        {sections.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        {...(link.external && {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        })}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.platform}
              >
                {social.icon || social.platform}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
          {copyright || `© ${currentYear} All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
