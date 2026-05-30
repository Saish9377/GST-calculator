import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: 'GST Remove Calculator — Remove GST from Any Amount',
  description: 'Free GST Remove Calculator to extract GST from a tax-inclusive amount. Find the original base amount before GST was added.',
};

export default function GSTRemoveCalculatorPage() {
  return (
    <CalculatorPage
      title="GST Remove Calculator"
      subtitle="Remove GST from a tax-inclusive amount to find the original base price."
      defaultMode="remove"
      defaultRate={18}
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">How to Remove GST from a Total Amount?</h2>
      <p className="text-muted leading-relaxed mb-4">
        To remove GST from a total (inclusive) amount, divide the total by (1 + GST rate/100). For example, if the total amount is ₹1,180 with 18% GST:
      </p>
      <div className="card p-5 mb-4">
        <p className="font-mono text-sm text-muted">Base Amount = ₹1,180 ÷ (1 + 18/100) = ₹1,180 ÷ 1.18</p>
        <p className="font-mono text-sm text-muted">Base Amount = <strong className="text-foreground">₹1,000</strong></p>
        <p className="font-mono text-sm text-muted">GST Amount = ₹1,180 − ₹1,000 = <strong className="text-foreground">₹180</strong></p>
      </div>
      <p className="text-muted leading-relaxed">
        This reverse calculation is useful when you receive a bill with GST included and need to know the actual price before tax.
      </p>
    </CalculatorPage>
  );
}
