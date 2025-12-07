/**
 * Layout Component
 * Main application layout wrapper with Header and Footer
 */

import React from 'react';
import { Header, type HeaderProps } from './Header';
import { Footer, type FooterProps } from './Footer';

export interface LayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  className?: string;
}

export function Layout({
  children,
  headerProps,
  footerProps,
  className = '',
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header {...headerProps} />
      <main className={`flex-1 ${className}`}>{children}</main>
      <Footer {...footerProps} />
    </div>
  );
}
