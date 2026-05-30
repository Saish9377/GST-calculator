import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: '28% GST Calculator — Calculate 28 Percent GST Online',
  description: 'Calculate 28% GST on luxury goods, tobacco, aerated drinks, and more. Get CGST 14% + SGST 14% breakdown instantly.',
};

export default function GST28PercentPage() {
  return (
    <CalculatorPage
      title="28% GST Calculator"
      subtitle="Calculate 28% GST on luxury and demerit goods with CGST (14%) and SGST (14%) breakdown."
      defaultRate={28}
      defaultMode="add"
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
