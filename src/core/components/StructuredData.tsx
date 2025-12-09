/**
 * Structured Data Component
 * Adds JSON-LD structured data for better SEO
 */

import React from 'react';

export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Javid Akhavan',
    url: 'https://javidakhavan.github.io',
    image: 'https://javidakhavan.github.io/profile.jpg',
    jobTitle: 'PhD in Robotics & Artificial Intelligence',
    worksFor: {
      '@type': 'Organization',
      name: 'Stevens Institute of Technology',
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'Stevens Institute of Technology',
      },
      {
        '@type': 'Organization',
        name: 'Sharif University of Technology',
      },
    ],
    knowsAbout: [
      'Machine Learning',
      'Artificial Intelligence',
      'Computer Vision',
      'Deep Learning',
      'Reinforcement Learning',
      'Robotics',
      'Additive Manufacturing',
      'TensorFlow',
      'Python',
      'MATLAB',
    ],
    email: 'mailto:akhavanjavid@gmail.com',
    sameAs: [
      'https://www.linkedin.com/in/javid-akhavan-94b700151/',
      'https://github.com/javidakhavan',
      'https://scholar.google.com/citations?user=hTwbmPUAAAAJ',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Javid Akhavan Portfolio',
    url: 'https://javidakhavan.github.io',
    description:
      'Professional portfolio of Javid Akhavan, PhD in Robotics & AI',
    author: {
      '@type': 'Person',
      name: 'Javid Akhavan',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
