/**
 * Module System Types
 * Core type definitions for the plugin-based module architecture
 */

export interface ModuleConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  path: string;
  metadata?: ModuleMetadata;
}

export interface ModuleMetadata {
  version?: string;
  author?: string;
  description?: string;
  dependencies?: string[];
}

export interface ModuleComponent<T = any> {
  data: T;
  className?: string;
  testId?: string;
}
