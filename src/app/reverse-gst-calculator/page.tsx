import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: 'Reverse GST Calculator — Calculate Base Price Online',
  description: 'Reverse calculate GST from any tax-inclusive amount. Ideal for MSMEs and accountants checking invoice accuracy. Get instant tax splits.',
};

const faqs = [
  {
    question: 'What is a Reverse GST Calculator?',
    answer: 'A Reverse GST Calculator is a tool that allows you to calculate the pre-tax base amount and the exact tax values (CGST, SGST, IGST) from a final billing amount that already includes GST.',
  },
  {
    question: 'Why use reverse GST calculation?',
    answer: 'It is used by small businesses, retail buyers, and accountants to cross-verify supplier invoices, file GST tax returns accurately, and separate real product costs from taxes.',
  },
];

export default function ReverseGSTCalculatorPage() {
  return (
    <CalculatorPage
      title="Reverse GST Calculator"
      subtitle="Extract GST from a total (tax-inclusive) amount and find the original base price."
      defaultMode="remove"
      defaultRate={18}
      faqs={faqs}
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">What is Reverse GST Calculation?</h2>
      <p className="text-muted leading-relaxed mb-4">
        Reverse GST calculation (also called GST exclusive calculation) helps you find the original price before GST was added. This is useful when you have a bill amount that includes GST and you want to know the actual product/service cost.
      </p>
      <div className="card p-5 mb-4">
        <p className="text-sm font-semibold text-foreground mb-2">Formula:</p>
        <p className="font-mono text-sm text-muted">Base Amount = Total Amount ÷ (1 + GST Rate / 100)</p>
        <p className="font-mono text-sm text-muted mt-2">GST Amount = Total Amount − Base Amount</p>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3 mt-6">When Do You Need Reverse GST Calculation?</h3>
      <div className="space-y-2">
        {[
          'When you receive an invoice with GST included in the total',
          'When filing GST returns and need to separate tax from sales',
          'When comparing pre-tax prices of different products',
          'When claiming Input Tax Credit (ITC)',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-muted">
            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
            {item}
          </div>
        ))}
      </div>
    </CalculatorPage>
  );
}
