import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GST Invoice Generator — Create Professional Tax Invoices Free',
  description: 'Free GST Invoice Generator. Add seller/buyer details, GSTIN, multiple items with different GST rates, and download professional PDF invoices instantly.',
};

export default function InvoiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
