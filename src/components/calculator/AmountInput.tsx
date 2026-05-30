'use client';

// ============================================================
// AmountInput — Currency Input with ₹ prefix
// ============================================================

import { HiCurrencyRupee, HiXMark } from 'react-icons/hi2';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  mode: 'add' | 'remove';
}

export function AmountInput({ value, onChange, mode }: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow only numbers and single decimal point
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      onChange(raw);
    }
  };

  const label = mode === 'add' ? 'Enter Base Amount' : 'Enter Total Amount (Tax Inclusive)';

  return (
    <div className="space-y-2">
      <label
        htmlFor="amount-input"
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <div className="relative group">
        {/* ₹ Icon */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center pointer-events-none">
          <HiCurrencyRupee className="w-5 h-5 text-primary opacity-70 group-focus-within:opacity-100 transition-opacity" />
        </div>

        {/* Input */}
        <input
          id="amount-input"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder="0.00"
          autoComplete="off"
          className="w-full pl-12 pr-10 py-4 text-lg font-semibold bg-background border-2 border-border rounded-2xl text-foreground placeholder:text-muted/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none"
        />

        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-border/50 hover:bg-danger/10 hover:text-danger flex items-center justify-center transition-all duration-200 cursor-pointer"
            aria-label="Clear amount"
          >
            <HiXMark className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
