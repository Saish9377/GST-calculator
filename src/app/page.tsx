'use client';

// ============================================================
// Homepage — Hero + Calculator + Content Sections
// ============================================================

import { useState } from 'react';
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
import { CalculationHistory } from '@/components/calculator/CalculationHistory';
import {
  HiCalculator,
  HiClock,
  HiSparkles,
  HiChevronDown,
  HiCheckCircle,
  HiLightBulb,
  HiQuestionMarkCircle,
} from 'react-icons/hi2';

export default function HomePage() {
  const calculator = useGSTCalculator();
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleHistorySelect = (entry: import('@/lib/gst-calculator').GSTResult) => {
    calculator.setAmount(entry.baseAmount.toString());
    calculator.setRate(entry.rate);
    calculator.setMode(entry.mode);
    calculator.setStateType(entry.stateType);
    calculator.setRoundOff(entry.roundOff);
  };

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-background dark:to-purple-950/30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 sm:pt-12 sm:pb-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 animate-fade-in">
              <HiSparkles className="w-3.5 h-3.5" />
              Fast, Accurate & Free
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-4 animate-slide-up">
              GST{' '}
              <span className="gradient-text">Calculator</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
              Add or remove GST instantly with{' '}
              <span className="font-semibold text-foreground">CGST</span>,{' '}
              <span className="font-semibold text-foreground">SGST</span>, and{' '}
              <span className="font-semibold text-foreground">IGST</span> breakdown.
            </p>

            {/* Scroll indicator */}
            <a
              href="#calculator"
              className="inline-flex items-center gap-1 mt-6 text-sm text-muted hover:text-primary transition-colors animate-float"
            >
              <span>Start Calculating</span>
              <HiChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Calculator Section ─── */}
      <section id="calculator" className="scroll-mt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left Column: Calculator Input */}
            <div className="lg:col-span-3 space-y-6">
              {/* Calculator Card */}
              <div className="card-elevated p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <HiCalculator className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">GST Calculator</h2>
                      <p className="text-xs text-muted">Auto-calculates as you type</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setHistoryOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-background border border-border transition-all cursor-pointer"
                  >
                    <HiClock className="w-3.5 h-3.5" />
                    History
                  </button>
                </div>

                <div className="h-px bg-border" />

                {/* Input Fields */}
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
                  <ModeToggle
                    mode={calculator.mode}
                    onChange={calculator.setMode}
                  />
                  <StateToggle
                    stateType={calculator.stateType}
                    onChange={calculator.setStateType}
                  />
                </div>

                <RoundOffToggle
                  enabled={calculator.roundOff}
                  onChange={calculator.setRoundOff}
                />

                <div className="h-px bg-border" />

                {/* Action Buttons */}
                <ActionButtons
                  result={calculator.result}
                  onReset={calculator.reset}
                />
              </div>
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-2 space-y-6">
              <ResultCard result={calculator.result} />
              <TaxBreakdownTable result={calculator.result} />
              <TaxSummaryCard result={calculator.result} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── What is GST Section ─── */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">What is GST?</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Understanding Goods and Services Tax in India
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted leading-relaxed">
              <strong className="text-foreground">Goods and Services Tax (GST)</strong> is a comprehensive indirect tax levied on the supply of goods and services in India. It was introduced on July 1, 2017, replacing multiple cascading taxes such as VAT, service tax, excise duty, and others.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8 not-prose">
              <div className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-blue-500">C</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">CGST</h3>
                <p className="text-sm text-muted">Central GST — collected by the Central Government on intra-state transactions.</p>
              </div>

              <div className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-emerald-500">S</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">SGST</h3>
                <p className="text-sm text-muted">State GST — collected by the State Government on intra-state transactions.</p>
              </div>

              <div className="card p-5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-violet-500">I</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">IGST</h3>
                <p className="text-sm text-muted">Integrated GST — collected by the Central Government on inter-state transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How to Calculate GST ─── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">How to Calculate GST?</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Simple formulas to add or remove GST from any amount
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Add GST */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-emerald-500 font-bold text-sm">+</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Adding GST</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-background font-mono text-muted">
                  GST Amount = Base Amount × (GST Rate / 100)
                </div>
                <div className="p-3 rounded-xl bg-background font-mono text-muted">
                  Total = Base Amount + GST Amount
                </div>
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Example:</p>
                  <p className="text-sm text-muted">
                    Amount = ₹1,000 | GST = 18%<br/>
                    GST Amount = ₹1,000 × 0.18 = <strong className="text-foreground">₹180</strong><br/>
                    Total = ₹1,000 + ₹180 = <strong className="text-foreground">₹1,180</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Remove GST */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="text-amber-500 font-bold text-sm">−</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Removing GST</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-xl bg-background font-mono text-muted">
                  Base Amount = Total ÷ (1 + GST Rate / 100)
                </div>
                <div className="p-3 rounded-xl bg-background font-mono text-muted">
                  GST Amount = Total − Base Amount
                </div>
                <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">Example:</p>
                  <p className="text-sm text-muted">
                    Total = ₹1,180 | GST = 18%<br/>
                    Base = ₹1,180 ÷ 1.18 = <strong className="text-foreground">₹1,000</strong><br/>
                    GST Amount = ₹1,180 − ₹1,000 = <strong className="text-foreground">₹180</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GST Rate Chart ─── */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">GST Rate Chart</h2>
            <p className="text-muted">Common GST rates applicable in India</p>
          </div>

          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-background">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted uppercase tracking-wider">GST Rate</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted uppercase tracking-wider">CGST</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted uppercase tracking-wider">SGST</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-muted uppercase tracking-wider">Items Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rate: '0%', cgst: '0%', sgst: '0%', items: 'Essential items, fresh vegetables, milk, grains' },
                  { rate: '3%', cgst: '1.5%', sgst: '1.5%', items: 'Gold, silver, platinum, precious stones' },
                  { rate: '5%', cgst: '2.5%', sgst: '2.5%', items: 'Packaged food, footwear under ₹1000, transport' },
                  { rate: '12%', cgst: '6%', sgst: '6%', items: 'Mobile phones, processed food, business class air' },
                  { rate: '18%', cgst: '9%', sgst: '9%', items: 'IT services, electronics, restaurants, financial services' },
                  { rate: '28%', cgst: '14%', sgst: '14%', items: 'Luxury cars, tobacco, aerated drinks, cement' },
                ].map((row) => (
                  <tr key={row.rate} className="border-t border-border hover:bg-background/50 transition-colors">
                    <td className="px-5 py-3.5 font-semibold text-primary">{row.rate}</td>
                    <td className="px-5 py-3.5 text-foreground">{row.cgst}</td>
                    <td className="px-5 py-3.5 text-foreground">{row.sgst}</td>
                    <td className="px-5 py-3.5 text-muted text-xs">{row.items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section id="faq" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              <HiQuestionMarkCircle className="inline w-8 h-8 text-primary mr-2 -mt-1" />
              Frequently Asked Questions
            </h2>
            <p className="text-muted">Everything you need to know about GST</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is GST and when was it introduced in India?',
                a: 'GST (Goods and Services Tax) is a comprehensive indirect tax introduced on July 1, 2017. It replaced multiple taxes like VAT, service tax, excise duty, and others under one unified tax system.',
              },
              {
                q: 'What are the different GST slabs in India?',
                a: 'India has four main GST slabs: 5%, 12%, 18%, and 28%. Additionally, there are special rates of 0% (exempt) and 3% (for gold and precious metals). Some items attract a cess over and above the 28% slab.',
              },
              {
                q: 'What is the difference between CGST, SGST, and IGST?',
                a: 'CGST (Central GST) and SGST (State GST) are charged on intra-state transactions — the total GST is split equally between them. IGST (Integrated GST) is charged on inter-state transactions and is collected by the Central Government.',
              },
              {
                q: 'How to calculate GST from a total amount?',
                a: 'To remove GST from a total (inclusive) amount: Base Amount = Total ÷ (1 + GST Rate/100). For example, if total is ₹1,180 at 18% GST, base amount = 1180 ÷ 1.18 = ₹1,000.',
              },
              {
                q: 'Is this GST calculator free to use?',
                a: 'Yes! Our GST calculator is completely free. You can calculate GST, generate invoices, and download PDFs without any charges or registration.',
              },
              {
                q: 'What is reverse charge mechanism in GST?',
                a: 'Under the reverse charge mechanism (RCM), the recipient of goods or services is liable to pay GST instead of the supplier. This applies to specific categories notified by the government.',
              },
              {
                q: 'Can I generate a GST invoice using this tool?',
                a: 'Yes! Our Invoice Generator allows you to create professional GST-compliant invoices with buyer/seller details, GSTIN, itemized billing, tax breakdown, and PDF download.',
              },
              {
                q: 'How accurate is this GST calculator?',
                a: 'Our calculator uses precise mathematical formulas and rounds to 2 decimal places. It handles all GST rates and correctly splits CGST/SGST for intra-state and IGST for inter-state transactions.',
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Calculation History ─── */}
      <CalculationHistory
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelect={handleHistorySelect}
      />
    </>
  );
}

// ─── FAQ Accordion Item ───
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-5 text-left hover:bg-background/50 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <div className={`w-6 h-6 mt-0.5 rounded-lg flex-shrink-0 flex items-center justify-center transition-colors ${
          open ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
        }`}>
          <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
        <span className="text-sm font-semibold text-foreground">{question}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pl-14">
          <p className="text-sm text-muted leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
