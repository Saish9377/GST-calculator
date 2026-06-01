import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: 'SGST Calculator — Calculate State GST Online',
  description: 'State GST (SGST) online calculator. Calculate SGST on goods and services for intra-state transactions instantly and accurately.',
};

const faqs = [
  {
    question: 'What is SGST?',
    answer: 'SGST stands for State Goods and Services Tax. It is the tax collected by the State Government of India on transactions that occur within that specific state (intra-state).',
  },
  {
    question: 'Is SGST different from CGST?',
    answer: 'While SGST goes to the State Government and CGST goes to the Central Government, they are calculated on the same intra-state transaction, and their rates are always equal.',
  },
];

export default function SGSTCalculatorPage() {
  return (
    <CalculatorPage
      title="SGST Calculator"
      subtitle="Calculate State GST (SGST) on intra-state transactions. SGST is half of the total GST rate."
      defaultMode="add"
      defaultRate={18}
      defaultStateType="intra"
      faqs={faqs}
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">What is SGST?</h2>
      <p className="text-muted leading-relaxed mb-4">
        <strong className="text-foreground">SGST (State Goods and Services Tax)</strong> is the portion of GST collected by the State Government on intra-state transactions. SGST is always equal to CGST, and both together equal the total GST rate.
      </p>
      <div className="card p-5 mb-4">
        <p className="text-sm text-muted mb-2"><strong className="text-foreground">Example:</strong> For 12% GST on an intra-state sale:</p>
        <p className="font-mono text-sm text-muted">CGST = 12% ÷ 2 = <strong className="text-foreground">6%</strong></p>
        <p className="font-mono text-sm text-muted">SGST = 12% ÷ 2 = <strong className="text-foreground">6%</strong></p>
      </div>
      <p className="text-muted leading-relaxed">
        SGST revenue goes directly to the state where the goods or services are consumed.
      </p>
    </CalculatorPage>
  );
}
