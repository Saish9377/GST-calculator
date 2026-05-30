import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions About GST',
  description: 'Find answers to common questions about GST, CGST, SGST, IGST, GST slabs, reverse charge mechanism, and how to use our free GST calculator.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
