'use client';

// ============================================================
// TaxSummaryCard — Compact glassmorphism summary
// ============================================================

import { GSTResult, formatCurrency } from '@/lib/gst-calculator';

interface TaxSummaryCardProps {
  result: GSTResult | null;
}

export function TaxSummaryCard({ result }: TaxSummaryCardProps) {
  if (!result) return null;

  const items = [
    { label: 'Taxable Value', value: result.baseAmount, color: 'text-foreground' },
    { label: `GST (${result.rate}%)`, value: result.gstAmount, color: 'text-warning' },
    { label: 'Total Amount', value: result.totalAmount, color: 'text-success' },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-background p-5 animate-scale-in">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4 relative z-10">
        Tax Summary
      </h3>

      <div className="space-y-3 relative z-10">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{item.label}</span>
              <span className={`text-sm font-bold ${item.color} font-mono`}>
                {formatCurrency(item.value)}
              </span>
            </div>
            {i < items.length - 1 && (
              <div className="mt-3 border-b border-border/50 border-dashed" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
