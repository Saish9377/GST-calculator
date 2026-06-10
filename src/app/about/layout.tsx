import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — GST Calculator India',
  description: 'Learn more about GST Calculator India, our mission, values, and why we build free financial utilities for businesses, CAs, and startups.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
