'use client';

// ============================================================
// RoundOffToggle — Round final amount toggle
// ============================================================

interface RoundOffToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export function RoundOffToggle({ enabled, onChange }: RoundOffToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      {/* Toggle Switch */}
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
          enabled ? 'bg-primary' : 'bg-border'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
            enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>

      <span className="text-sm text-muted group-hover:text-foreground transition-colors">
        Round off final amount
      </span>
    </label>
  );
}
