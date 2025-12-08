/**
 * Certificate Module Types
 */

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface CertificatesSectionProps {
  data: Certificate[];
  className?: string;
}

export interface CertificateCardProps {
  certificate: Certificate;
}
