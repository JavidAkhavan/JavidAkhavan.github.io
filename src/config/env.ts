/**
 * Environment Variables Configuration
 * Type-safe access to environment variables
 */

/**
 * Client-side environment variables (NEXT_PUBLIC_*)
 */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://javidakhavan.github.io',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Javid Akhavan Portfolio',

  // Analytics
  gaTrackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,

  // Feature Flags
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableContactForm: process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === 'true',
} as const;

/**
 * Server-side environment variables
 * Only accessible in server components and API routes
 */
export const serverEnv = {
  // Email Service
  emailServiceApiKey: process.env.EMAIL_SERVICE_API_KEY,
  emailFrom: process.env.EMAIL_FROM,
  emailTo: process.env.EMAIL_TO,

  // CMS/API
  cmsApiUrl: process.env.CMS_API_URL,
  cmsApiKey: process.env.CMS_API_KEY,
} as const;

/**
 * Validate required environment variables
 * Call this in server-side code to ensure all required vars are set
 */
export function validateEnv(): void {
  const required: Array<keyof typeof env> = ['siteUrl', 'siteName'];

  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

/**
 * Check if running in development mode
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Check if running in test mode
 */
export const isTest = process.env.NODE_ENV === 'test';
