'use client';

// ============================================================
// ThemeToggle — Sun/Moon animated toggle button
// ============================================================

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi2';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light Mode' : 'Dark Mode'}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <HiSun
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-500 ${
            isDark
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Moon icon */}
        <HiMoon
          className={`absolute inset-0 w-5 h-5 text-indigo-400 transition-all duration-500 ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
}
