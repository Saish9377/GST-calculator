'use client';

// ============================================================
// TaxBreakdownTable — Detailed tax breakdown
// ============================================================

import { GSTResult, formatCurrency, getHalfRate } from '@/lib/gst-calculator';

interface TaxBreakdownTableProps {
  result: GSTResult | null;
}

export function TaxBreakdownTable({ result }: TaxBreakdownTableProps) {
  if (!result) return null;

  const halfRate = getHalfRate(result.rate);

  const rows = [
    {
      label: 'Base Amount',
      rate: '—',
      amount: result.baseAmount,
      highlight: false,
    },
    ...(result.stateType === 'intra'
      ? [
          {
            label: 'CGST',
            rate: `${halfRate}%`,
            amount: result.cgst,
            highlight: false,
          },
          {
            label: 'SGST',
            rate: `${halfRate}%`,
            amount: result.sgst,
            highlight: false,
          },
        ]
      : [
          {
            label: 'IGST',
            rate: `${result.rate}%`,
            amount: result.igst,
            highlight: false,
          },
        ]),
    {
      label: 'Total Amount',
      rate: `${result.rate}%`,
      amount: result.totalAmount,
      highlight: true,
    },
  ];

  return (
    <div className="card overflow-hidden animate-slide-up">
      <div className="px-5 py-3.5 border-b border-border bg-background/50">
        <h3 className="text-sm font-semibold text-foreground">Tax Breakdown</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                Component
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">
                Rate
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-muted uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={`border-b border-border last:border-0 transition-colors ${
                  row.highlight
                    ? 'bg-primary/5 dark:bg-primary/10'
                    : 'hover:bg-background/50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td
                  className={`px-5 py-3.5 ${
                    row.highlight ? 'font-bold text-foreground' : 'text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {!row.highlight && (
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.label === 'Base Amount'
                            ? 'bg-slate-400'
                            : row.label === 'CGST'
                            ? 'bg-blue-500'
                            : row.label === 'SGST'
                            ? 'bg-emerald-500'
                            : 'bg-violet-500'
                        }`}
                      />
                    )}
                    {row.label}
                  </div>
                </td>
                <td
                  className={`px-5 py-3.5 text-center ${
                    row.highlight ? 'font-bold text-primary' : 'text-muted'
                  }`}
                >
                  {row.rate}
                </td>
                <td
                  className={`px-5 py-3.5 text-right font-mono ${
                    row.highlight
                      ? 'font-bold text-foreground text-base'
                      : 'text-foreground'
                  }`}
                >
                  {formatCurrency(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result.roundOff && (
        <div className="px-5 py-2 bg-warning/5 border-t border-warning/20 text-xs text-warning flex items-center gap-1.5">
          <span>⚡</span>
          Final amount has been rounded off
        </div>
      )}
    </div>
  );
}
