import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: 'CGST Calculator — Calculate Central GST Online',
  description: 'Free CGST Calculator for intra-state transactions. CGST is half of the total GST rate collected by the Central Government.',
};

export default function CGSTCalculatorPage() {
  return (
    <CalculatorPage
      title="CGST Calculator"
      subtitle="Calculate Central GST (CGST) on intra-state transactions. CGST is half of the total GST rate."
      defaultMode="add"
      defaultRate={18}
      defaultStateType="intra"
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">What is CGST?</h2>
      <p className="text-muted leading-relaxed mb-4">
        <strong className="text-foreground">CGST (Central Goods and Services Tax)</strong> is the portion of GST collected by the Central Government on intra-state (within the same state) transactions. CGST is always equal to SGST, and together they make up the total GST rate.
      </p>
      <div className="card p-5 mb-4">
        <p className="text-sm text-muted mb-2"><strong className="text-foreground">Example:</strong> For 18% GST on an intra-state sale:</p>
        <p className="font-mono text-sm text-muted">CGST = 18% ÷ 2 = <strong className="text-foreground">9%</strong></p>
        <p className="font-mono text-sm text-muted">SGST = 18% ÷ 2 = <strong className="text-foreground">9%</strong></p>
      </div>
      <p className="text-muted leading-relaxed">
        CGST is governed by the CGST Act, 2017 and applies to all goods and services sold within a state.
      </p>
    </CalculatorPage>
  );
}
