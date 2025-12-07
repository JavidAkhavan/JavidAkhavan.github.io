/**
 * Core System Exports
 * DO NOT MODIFY - Core utilities and types
 */

// Utilities
export { cn } from './utils/cn';
export {
  getCSSVariable,
  setCSSVariable,
  getToken,
  tokensToCSS,
  designTokens,
} from './utils/design-tokens';

// Components
export { Header } from './components/Header';
export type { HeaderProps, NavItem } from './components/Header';
export { Footer } from './components/Footer';
export type {
  FooterProps,
  FooterLink,
  FooterSection,
  SocialLink,
} from './components/Footer';
export { Layout } from './components/Layout';
export type { LayoutProps } from './components/Layout';
