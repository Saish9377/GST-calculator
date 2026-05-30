'use client';

// ============================================================
// StateToggle — Intra-State / Inter-State toggle
// ============================================================

import type { StateType } from '@/lib/gst-calculator';
import { HiArrowsRightLeft, HiArrowLongRight } from 'react-icons/hi2';

interface StateToggleProps {
  stateType: StateType;
  onChange: (stateType: StateType) => void;
}

export function StateToggle({ stateType, onChange }: StateToggleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-foreground">
          Transaction Type
        </label>
        <div className="group relative">
          <span className="inline-flex w-4 h-4 rounded-full bg-muted/20 text-muted text-[10px] font-bold items-center justify-center cursor-help">
            ?
          </span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-xl bg-foreground text-background text-xs leading-relaxed opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
            <strong>Intra-State:</strong> Within same state → CGST + SGST
            <br />
            <strong>Inter-State:</strong> Different states → IGST
          </div>
        </div>
      </div>

      <div className="relative flex bg-background border-2 border-border rounded-2xl p-1">
        {/* Sliding Indicator */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl transition-all duration-300 ease-out ${
            stateType === 'intra'
              ? 'left-1 bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/25'
              : 'left-[calc(50%+2px)] bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25'
          }`}
        />

        <button
          onClick={() => onChange('intra')}
          className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 z-10 cursor-pointer ${
            stateType === 'intra' ? 'text-white' : 'text-muted hover:text-foreground'
          }`}
          aria-pressed={stateType === 'intra'}
        >
          <HiArrowsRightLeft className="w-4 h-4" />
          Intra-State
        </button>

        <button
          onClick={() => onChange('inter')}
          className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 z-10 cursor-pointer ${
            stateType === 'inter' ? 'text-white' : 'text-muted hover:text-foreground'
          }`}
          aria-pressed={stateType === 'inter'}
        >
          <HiArrowLongRight className="w-4 h-4" />
          Inter-State
        </button>
      </div>
    </div>
  );
}
