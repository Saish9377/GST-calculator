'use client';

// ============================================================
// GSTRateSelector — Pill-style rate buttons + custom input
// ============================================================

import { GST_RATES } from '@/lib/gst-calculator';

interface GSTRateSelectorProps {
  selectedRate: number;
  customRate: string;
  onSelectRate: (rate: number) => void;
  onCustomRateChange: (value: string) => void;
}

export function GSTRateSelector({
  selectedRate,
  customRate,
  onSelectRate,
  onCustomRateChange,
}: GSTRateSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        GST Rate
      </label>

      {/* Rate Pills */}
      <div className="flex flex-wrap gap-2">
        {GST_RATES.map((rate) => {
          const isSelected = selectedRate === rate && customRate === '';
          return (
            <button
              key={rate}
              onClick={() => onSelectRate(rate)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                  : 'bg-surface border-border text-muted hover:border-primary/40 hover:text-foreground hover:shadow-md'
              }`}
              aria-pressed={isSelected}
            >
              {rate}%
            </button>
          );
        })}

        {/* Custom Rate */}
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            value={customRate}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d*\.?\d*$/.test(val)) {
                onCustomRateChange(val);
              }
            }}
            placeholder="Custom"
            className={`w-24 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 outline-none text-center ${
              customRate !== ''
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                : 'bg-surface border-border text-muted hover:border-primary/40 placeholder:text-muted/60'
            }`}
            aria-label="Custom GST rate"
          />
          {customRate !== '' && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/80 font-medium pointer-events-none">
              %
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
