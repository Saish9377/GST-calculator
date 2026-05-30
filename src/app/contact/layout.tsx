import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — GST Calculator India',
  description: 'Get in touch with our team for any questions, suggestions, or support regarding the GST Calculator or Invoice Generator.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
