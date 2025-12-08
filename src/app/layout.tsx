import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/core/components/ThemeProvider';
import { StructuredData } from '@/core/components/StructuredData';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Javid Akhavan - PhD in Robotics & AI | ML Engineer',
  description:
    'PhD in Robotics & AI specializing in Machine Learning, Computer Vision, and Autonomous Manufacturing. 6+ years experience in ML/AI research and development. Available for immediate start.',
  keywords: [
    'Machine Learning',
    'Artificial Intelligence',
    'Computer Vision',
    'Deep Learning',
    'Robotics',
    'PhD',
    'TensorFlow',
    'Python',
    'Reinforcement Learning',
    'Additive Manufacturing',
    'Research',
    'Stevens Institute of Technology',
  ],
  authors: [{ name: 'Javid Akhavan' }],
  creator: 'Javid Akhavan',
  publisher: 'Javid Akhavan',
  metadataBase: new URL('https://javidakhavan.github.io'),
  alternates: {
    canonical: 'https://javidakhavan.github.io',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://javidakhavan.github.io',
    title: 'Javid Akhavan - PhD in Robotics & AI | ML Engineer',
    description:
      'PhD in Robotics & AI with 6+ years experience in Machine Learning, Computer Vision, and Autonomous Manufacturing Systems. Available for immediate start.',
    siteName: 'Javid Akhavan Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Javid Akhavan - PhD in Robotics & AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Javid Akhavan - PhD in Robotics & AI',
    description: 'PhD in Robotics & AI | ML Engineer | 6+ years experience',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
