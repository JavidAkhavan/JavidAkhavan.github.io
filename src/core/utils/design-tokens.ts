/**
 * Design Token Utilities
 * Helper functions to access and use design tokens
 */

import { designTokens } from '@/config/design-tokens';

/**
 * Get CSS variable value from design tokens
 */
export function getCSSVariable(name: string): string {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }
  return '';
}

/**
 * Set CSS variable value
 */
export function setCSSVariable(name: string, value: string): void {
  if (typeof window !== 'undefined') {
    document.documentElement.style.setProperty(name, value);
  }
}

/**
 * Get design token value by path
 * Example: getToken('colors.primary.500')
 */
export function getToken(path: string): any {
  const keys = path.split('.');
  let value: any = designTokens;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
}

/**
 * Convert design tokens to CSS custom properties
 */
export function tokensToCSS(
  tokens: Record<string, any>,
  prefix = '--'
): string {
  let css = '';

  function processObject(obj: any, path: string[] = []): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];

      if (typeof value === 'object' && !Array.isArray(value)) {
        processObject(value, currentPath);
      } else {
        const varName = `${prefix}${currentPath.join('-')}`;
        css += `  ${varName}: ${value};\n`;
      }
    }
  }

  processObject(tokens);
  return css;
}

/**
 * Export design tokens for external use
 */
export { designTokens };
