import type { Metadata } from 'next';
import { CalculatorPage } from '@/components/seo/CalculatorPage';

export const metadata: Metadata = {
  title: '18% GST Calculator — Calculate 18 Percent GST Online',
  description: 'Calculate 18% GST instantly. Most services, electronics, and financial services fall under the 18% GST slab. Get CGST 9% and SGST 9% breakdown.',
};

export default function GST18PercentPage() {
  return (
    <CalculatorPage
      title="18% GST Calculator"
      subtitle="Calculate 18% GST on any amount with CGST (9%) and SGST (9%) breakdown."
      defaultRate={18}
      defaultMode="add"
    >
      <h2 className="text-2xl font-bold text-foreground mb-4">What Items Fall Under 18% GST?</h2>
      <p className="text-muted leading-relaxed mb-4">
        The 18% GST slab is one of the most common rates in India. Here are some items and services that attract 18% GST:
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          'IT services and software',
          'Financial services',
          'Telecom services',
          'Restaurant services (AC)',
          'Electronics & appliances',
          'Hair oil, toothpaste, soap',
          'Cement and iron/steel',
          'Capital goods',
          'Ice cream',
          'Cameras and projectors'
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted">
            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </CalculatorPage>
  );
}
