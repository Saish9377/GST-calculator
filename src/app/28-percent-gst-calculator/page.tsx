import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: '28% GST Calculator — Calculate Luxury Tax Online',
  description: 'Instant 28% GST calculator for luxury goods, vehicles, and high-tax items. Find out base price and tax amounts.',
};

const faqs = [
  {
    question: 'What items fall under the 28% GST rate?',
    answer: 'The 28% slab is the highest standard tax rate in India and applies to luxury, premium, and demerit goods such as luxury cars, SUVs, tobacco products, pan masala, aerated drinks, and high-end electronics like air conditioners.',
  },
  {
    question: 'Is there additional cess on 28% GST items?',
    answer: 'Yes, certain demerit goods like luxury cars, aerated beverages, and tobacco products attract an additional GST Compensation Cess on top of the base 28% GST rate.',
  },
];

export default function GST28PercentPage() {
  return (
    <CalculatorPage
      title="28% GST Calculator"
      subtitle="Calculate 28% GST on luxury and demerit goods with CGST (14%) and SGST (14%) breakdown."
      defaultRate={28}
      defaultMode="add"
      faqs={faqs}
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">What Items Fall Under 28% GST?</h2>
      <p className="text-muted leading-relaxed mb-4">
        The 28% GST slab is the highest rate and applies to luxury goods and demerit items:
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          'Luxury cars and SUVs',
          'Tobacco and cigarettes',
          'Aerated/carbonated drinks',
          'Pan masala',
          'Air conditioners',
          'Dishwashers',
          'Cement',
          'Automobile parts',
          'Yachts and private aircraft',
          'Gaming and betting',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted">
            <div className="w-1.5 h-1.5 rounded-full bg-danger flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </CalculatorPage>
  );
}
