'use client';

// ============================================================
// MobileNav — Slide-in Mobile Navigation Drawer
// ============================================================

import Link from 'next/link';
import { HiCalculator, HiDocumentText, HiQuestionMarkCircle, HiEnvelope, HiBookOpen } from 'react-icons/hi2';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <HiCalculator className="w-5 h-5" />,
  Invoice: <HiDocumentText className="w-5 h-5" />,
  Blog: <HiBookOpen className="w-5 h-5" />,
  FAQ: <HiQuestionMarkCircle className="w-5 h-5" />,
  Contact: <HiEnvelope className="w-5 h-5" />,
};

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-surface border-l border-border z-50 md:hidden transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-20 px-4 gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-muted hover:text-foreground hover:bg-background transition-all duration-200 active:scale-[0.98]"
            >
              <span className="text-primary">
                {iconMap[link.label] || <HiCalculator className="w-5 h-5" />}
              </span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="px-4 py-3 rounded-xl bg-background text-center">
            <p className="text-xs text-muted">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
