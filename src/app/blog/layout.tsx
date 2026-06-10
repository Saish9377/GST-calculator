import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax Compliance & GST Blog — GST Calculator India',
  description: 'Read the latest updates, compliance guides, HSN rate directories, and expert tax articles to help you manage GST filing and computations.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
