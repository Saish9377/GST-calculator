import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: 'GST Inclusive Calculator — Add GST to Base Amount Online',
  description: 'Easily calculate the final price including GST. Input base amount, choose tax rate (5%, 12%, 18%, 28%), and get a detailed tax split instantly.',
};

const faqs = [
  {
    question: 'What is a GST inclusive calculator?',
    answer: 'A GST inclusive calculator (or GST addition calculator) is a tool used to calculate the final price of a product or service after adding the Goods and Services Tax (GST) to the original base cost.',
  },
  {
    question: 'How do I calculate GST inclusive price manually?',
    answer: 'To calculate GST inclusive price manually: Multiply the base amount by the GST rate, divide by 100 to get the GST amount, and then add this GST amount to the original base amount. Formula: Total Price = Base Price + (Base Price * GST Rate / 100).',
  },
];

export default function GSTAddCalculatorPage() {
  return (
    <CalculatorPage
      title="GST Add Calculator"
      subtitle="Add GST to any base amount and get the total with CGST, SGST, and IGST breakdown."
      defaultMode="add"
      defaultRate={18}
      faqs={faqs}
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
