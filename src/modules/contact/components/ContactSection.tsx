/**
 * Contact Section Component
 * Content-agnostic - accepts data via props
 */

'use client';

import React, { useState } from 'react';
import { ContactSectionProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export function ContactSection({ data, className = '' }: ContactSectionProps) {
  const [formState, setFormState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      // Use Formspree (free for static sites) or a simple mailto fallback
      // For now, we'll use mailto as a fallback
      const mailtoLink = `mailto:${data.email}?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;

      setFormState('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      className={`contact-section py-16 ${className}`}
      data-testid="contact-section"
    >
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{data.heading}</CardTitle>
            {data.description && (
              <p className="text-lg text-muted-foreground">
                {data.description}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                {data.email && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${data.email}`}
                      className="text-lg text-primary hover:underline"
                    >
                      {data.email}
                    </a>
                  </div>
                )}
                {data.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone
                    </p>
                    <a
                      href={`tel:${data.phone}`}
                      className="text-lg text-primary hover:underline"
                    >
                      {data.phone}
                    </a>
                  </div>
                )}

                {data.social && data.social.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      Connect with me
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {data.social.map((social, index) => (
                        <Button key={index} variant="outline" asChild>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {social.platform}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {data.formEnabled && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                        disabled={formState === 'submitting'}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                        disabled={formState === 'submitting'}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                        disabled={formState === 'submitting'}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formState === 'submitting'}
                    >
                      {formState === 'submitting' && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {formState === 'submitting'
                        ? 'Sending...'
                        : 'Send Message'}
                    </Button>

                    {formState === 'success' && (
                      <div className="flex items-center gap-2 rounded-md bg-green-500/10 px-4 py-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span>Message sent successfully!</span>
                      </div>
                    )}

                    {formState === 'error' && (
                      <div className="flex items-center gap-2 rounded-md bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
                        <XCircle className="h-4 w-4" />
                        <span>Failed to send message. Please try again.</span>
                      </div>
                    )}
                  </form>
                  <p className="text-xs text-muted-foreground">
                    Your default email client will open to send the message.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
