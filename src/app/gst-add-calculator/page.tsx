import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: 'GST Add Calculator — Add GST to Any Amount Online',
  description: 'Free GST Add Calculator to quickly add GST to any amount. Get instant CGST, SGST, IGST breakdown with all GST rates: 5%, 12%, 18%, 28%.',
};

export default function GSTAddCalculatorPage() {
  return (
    <CalculatorPage
      title="GST Add Calculator"
      subtitle="Add GST to any base amount and get the total with CGST, SGST, and IGST breakdown."
      defaultMode="add"
      defaultRate={18}
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">How to Add GST to an Amount?</h2>
      <p className="text-muted leading-relaxed mb-4">
        Adding GST to an amount is simple. Multiply the base amount by the GST rate and add it to the original amount. For example, if your base amount is ₹1,000 and the GST rate is 18%:
      </p>
      <div className="card p-5 mb-4">
        <p className="font-mono text-sm text-muted">GST Amount = ₹1,000 × 18/100 = ₹180</p>
        <p className="font-mono text-sm text-muted">Total Amount = ₹1,000 + ₹180 = <strong className="text-foreground">₹1,180</strong></p>
      </div>
      <p className="text-muted leading-relaxed">
        For intra-state transactions, the 18% GST is split into CGST (9%) and SGST (9%). For inter-state transactions, the entire 18% is charged as IGST.
      </p>
    </CalculatorPage>
  );
}
