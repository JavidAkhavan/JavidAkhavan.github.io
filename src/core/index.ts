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
export { ThemeProvider } from './components/ThemeProvider';
export type { ThemeProviderProps } from './components/ThemeProvider';
export { ThemeToggle } from './components/ThemeToggle';
export type { ThemeToggleProps } from './components/ThemeToggle';
export { ScrollAnimation } from './components/ScrollAnimation';
export type { ScrollAnimationProps } from './components/ScrollAnimation';
export { ParallaxSection } from './components/ParallaxSection';
export type { ParallaxSectionProps } from './components/ParallaxSection';
export { StaggeredList } from './components/StaggeredList';
export type { StaggeredListProps } from './components/StaggeredList';
