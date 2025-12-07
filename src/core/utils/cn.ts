/**
 * Core Utility: cn (className merger)
 * Merges Tailwind CSS classes with proper precedence
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
