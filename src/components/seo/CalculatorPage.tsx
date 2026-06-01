'use client';

// ============================================================
// CalculatorPage — Reusable wrapper for SEO calculator pages
// ============================================================

import { useGSTCalculator } from '@/hooks/useGSTCalculator';
import { AmountInput } from '@/components/calculator/AmountInput';
import { GSTRateSelector } from '@/components/calculator/GSTRateSelector';
import { ModeToggle } from '@/components/calculator/ModeToggle';
import { StateToggle } from '@/components/calculator/StateToggle';
import { RoundOffToggle } from '@/components/calculator/RoundOffToggle';
import { ResultCard } from '@/components/calculator/ResultCard';
import { TaxBreakdownTable } from '@/components/calculator/TaxBreakdownTable';
import { TaxSummaryCard } from '@/components/calculator/TaxSummaryCard';
import { ActionButtons } from '@/components/calculator/ActionButtons';
import { HiCalculator } from 'react-icons/hi2';
import type { GSTMode, StateType } from '@/lib/gst-calculator';
import { usePathname } from 'next/navigation';

interface FAQItem {
  question: string;
  answer: string;
}

interface CalculatorPageProps {
  title: string;
  subtitle: string;
  defaultRate?: number;
  defaultMode?: GSTMode;
  defaultStateType?: StateType;
  faqs?: FAQItem[];
  children?: React.ReactNode; // Page-specific content below calculator
}

export function CalculatorPage({
  title,
  subtitle,
  defaultRate = 18,
  defaultMode = 'add',
  defaultStateType = 'intra',
  faqs,
  children,
}: CalculatorPageProps) {
  const calculator = useGSTCalculator({
    defaultRate,
    defaultMode,
    defaultStateType,
  });

  const pathname = usePathname();
  const url = `https://gstcalculator.in${pathname}`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': title,
    'url': url,
    'description': subtitle,
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'INR',
    },
  };

  const faqSchema = faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-background dark:to-purple-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-3">
              {title}
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Input */}
            <div className="lg:col-span-3">
              <div className="card-elevated p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <HiCalculator className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{title}</h2>
                    <p className="text-xs text-muted">Auto-calculates as you type</p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <AmountInput
                  value={calculator.amount}
                  onChange={calculator.setAmount}
                  mode={calculator.mode}
                />
                <GSTRateSelector
                  selectedRate={calculator.rate}
                  customRate={calculator.customRate}
                  onSelectRate={calculator.setRate}
                  onCustomRateChange={calculator.setCustomRate}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <ModeToggle mode={calculator.mode} onChange={calculator.setMode} />
                  <StateToggle stateType={calculator.stateType} onChange={calculator.setStateType} />
                </div>
                <RoundOffToggle enabled={calculator.roundOff} onChange={calculator.setRoundOff} />
                <div className="h-px bg-border" />
                <ActionButtons result={calculator.result} onReset={calculator.reset} />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              <ResultCard result={calculator.result} />
              <TaxBreakdownTable result={calculator.result} />
              <TaxSummaryCard result={calculator.result} />
            </div>
          </div>
        </div>
      </section>

      {/* Page-specific content */}
      {children && (
        <section className="py-16 bg-surface border-y border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </section>
      )}
    </>
  );
}
