/**
 * Module Registry
 * Central registry for all feature modules with feature flag support
 * Enables/disables modules without touching core code
 */

import { ModuleConfig } from '@/types/module';

export const moduleRegistry: Record<string, ModuleConfig> = {
  hero: {
    id: 'hero',
    name: 'Hero Section',
    enabled: true,
    order: 1,
    path: '@/modules/hero',
  },
  about: {
    id: 'about',
    name: 'About Section',
    enabled: true,
    order: 2,
    path: '@/modules/about',
  },
  experience: {
    id: 'experience',
    name: 'Experience Section',
    enabled: true,
    order: 3,
    path: '@/modules/experience',
  },
  education: {
    id: 'education',
    name: 'Education Section',
    enabled: true,
    order: 4,
    path: '@/modules/education',
  },
  skills: {
    id: 'skills',
    name: 'Skills Section',
    enabled: true,
    order: 5,
    path: '@/modules/skills',
  },
  projects: {
    id: 'projects',
    name: 'Projects Section',
    enabled: true,
    order: 6,
    path: '@/modules/projects',
  },
  contact: {
    id: 'contact',
    name: 'Contact Section',
    enabled: true,
    order: 7,
    path: '@/modules/contact',
  },
};

/**
 * Get all enabled modules sorted by order
 */
export function getEnabledModules(): ModuleConfig[] {
  return Object.values(moduleRegistry)
    .filter((module) => module.enabled)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get module by ID
 */
export function getModule(id: string): ModuleConfig | undefined {
  return moduleRegistry[id];
}

/**
 * Check if module is enabled
 */
export function isModuleEnabled(id: string): boolean {
  return moduleRegistry[id]?.enabled ?? false;
}
