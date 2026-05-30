'use client';

// ============================================================
// ResultCard — Big highlighted total + tax split cards
// ============================================================

import { useEffect, useState } from 'react';
import { GSTResult, formatCurrency, getHalfRate } from '@/lib/gst-calculator';
import { HiArrowTrendingUp, HiReceiptPercent } from 'react-icons/hi2';

interface ResultCardProps {
  result: GSTResult | null;
}

export function ResultCard({ result }: ResultCardProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (result) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [result?.totalAmount, result?.baseAmount]);

  if (!result) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <HiReceiptPercent className="w-8 h-8 text-primary opacity-50" />
        </div>
        <p className="text-muted text-sm">
          Enter an amount to see the GST breakdown
        </p>
      </div>
    );
  }

  const halfRate = getHalfRate(result.rate);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Total Amount — Big Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 p-6 shadow-xl shadow-indigo-500/20 dark:shadow-indigo-500/10">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <HiArrowTrendingUp className="w-5 h-5 text-white/80" />
            <span className="text-sm font-medium text-white/80">
              {result.mode === 'add' ? 'Total Amount (with GST)' : 'Base Amount (without GST)'}
            </span>
          </div>

          <div className={`text-3xl sm:text-4xl font-bold text-white tracking-tight ${animate ? 'animate-pulse-number' : ''}`}>
            {result.mode === 'add'
              ? formatCurrency(result.totalAmount)
              : formatCurrency(result.baseAmount)}
          </div>

          <div className="mt-3 flex items-center gap-4 text-sm text-white/70">
            <span>
              {result.mode === 'add' ? 'Base' : 'Total'}: {' '}
              <strong className="text-white/90">
                {result.mode === 'add'
                  ? formatCurrency(result.baseAmount)
                  : formatCurrency(result.totalAmount)}
              </strong>
            </span>
            <span>•</span>
            <span>
              GST: <strong className="text-white/90">{formatCurrency(result.gstAmount)}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Tax Split Cards */}
      <div className="grid grid-cols-2 gap-3">
        {result.stateType === 'intra' ? (
          <>
            {/* CGST */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">CGST</span>
                <span className="text-xs font-medium text-primary ml-auto">{halfRate}%</span>
              </div>
              <div className={`text-xl font-bold text-foreground ${animate ? 'animate-pulse-number' : ''}`}>
                {formatCurrency(result.cgst)}
              </div>
            </div>

            {/* SGST */}
            <div className="card p-4 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">SGST</span>
                <span className="text-xs font-medium text-secondary ml-auto">{halfRate}%</span>
              </div>
              <div className={`text-xl font-bold text-foreground ${animate ? 'animate-pulse-number' : ''}`}>
                {formatCurrency(result.sgst)}
              </div>
            </div>
          </>
        ) : (
          /* IGST — Full width */
          <div className="col-span-2 card p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-xs font-semibold text-muted uppercase tracking-wider">IGST</span>
              <span className="text-xs font-medium text-primary ml-auto">{result.rate}%</span>
            </div>
            <div className={`text-xl font-bold text-foreground ${animate ? 'animate-pulse-number' : ''}`}>
              {formatCurrency(result.igst)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
