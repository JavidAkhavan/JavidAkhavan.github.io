/**
 * Contact Section Component
 * Content-agnostic - accepts data via props
 */

import React from 'react';
import { ContactSectionProps } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ContactSection({ data, className = '' }: ContactSectionProps) {
  return (
    <section
      className={`contact-section py-16 ${className}`}
      data-testid="contact-section"
    >
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {data.heading}
            </CardTitle>
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
                  <form className="space-y-4">
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
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
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
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
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
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    Note: Form submission functionality needs to be implemented
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
