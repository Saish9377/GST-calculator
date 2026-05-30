'use client';

// ============================================================
// ModeToggle — GST Add / GST Remove segmented control
// ============================================================

import type { GSTMode } from '@/lib/gst-calculator';
import { HiPlus, HiMinus } from 'react-icons/hi2';

interface ModeToggleProps {
  mode: GSTMode;
  onChange: (mode: GSTMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Calculation Mode
      </label>
      <div className="relative flex bg-background border-2 border-border rounded-2xl p-1">
        {/* Sliding Indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ease-out ${
            mode === 'add'
              ? 'left-1 bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25'
              : 'left-[calc(50%+2px)] bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25'
          }`}
        />

        <button
          onClick={() => onChange('add')}
          className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 z-10 cursor-pointer ${
            mode === 'add' ? 'text-white' : 'text-muted hover:text-foreground'
          }`}
          aria-pressed={mode === 'add'}
        >
          <HiPlus className="w-4 h-4" />
          GST Add
        </button>

        <button
          onClick={() => onChange('remove')}
          className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 z-10 cursor-pointer ${
            mode === 'remove' ? 'text-white' : 'text-muted hover:text-foreground'
          }`}
          aria-pressed={mode === 'remove'}
        >
          <HiMinus className="w-4 h-4" />
          GST Remove
        </button>
      </div>
    </div>
  );
}
