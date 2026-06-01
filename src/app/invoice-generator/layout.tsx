import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GST Invoice Generator — Create & Download PDF Invoice',
  description: 'Create professional, GST-compliant tax invoices online. Add logo, buyer & seller GSTINs, itemized taxes, and download free PDF. No registration required.',
};

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
