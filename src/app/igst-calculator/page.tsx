import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: 'IGST Calculator — Calculate Integrated GST Online',
  description: 'Free IGST Calculator for inter-state transactions. IGST is the full GST rate charged on transactions between different states.',
};

export default function IGSTCalculatorPage() {
  return (
    <CalculatorPage
      title="IGST Calculator"
      subtitle="Calculate Integrated GST (IGST) on inter-state transactions between different states."
      defaultMode="add"
      defaultRate={18}
      defaultStateType="inter"
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">What is IGST?</h2>
      <p className="text-muted leading-relaxed mb-4">
        <strong className="text-foreground">IGST (Integrated Goods and Services Tax)</strong> is charged on inter-state supply of goods and services, i.e., when the buyer and seller are in different states. Unlike intra-state transactions where GST is split into CGST and SGST, IGST is charged as a single tax at the full rate.
      </p>
      <div className="card p-5 mb-4">
        <p className="text-sm text-muted mb-2"><strong className="text-foreground">Example:</strong> Seller in Maharashtra, Buyer in Gujarat — 18% GST:</p>
        <p className="font-mono text-sm text-muted">IGST = <strong className="text-foreground">18%</strong> (full rate, not split)</p>
        <p className="font-mono text-sm text-muted mt-1">On ₹1,000: IGST = <strong className="text-foreground">₹180</strong></p>
      </div>
      <p className="text-muted leading-relaxed">
        IGST is collected by the Central Government and then distributed to the destination state. It also applies to imports into India.
      </p>
    </CalculatorPage>
  );
}
