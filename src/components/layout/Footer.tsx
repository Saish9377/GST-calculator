// ============================================================
// Footer — Links, SEO Pages, Branding
// ============================================================

import Link from 'next/link';
import { HiCalculator } from 'react-icons/hi2';

const quickLinks = [
  { href: '/', label: 'GST Calculator' },
  { href: '/gst-add-calculator', label: 'GST Add Calculator' },
  { href: '/gst-remove-calculator', label: 'GST Remove Calculator' },
  { href: '/reverse-gst-calculator', label: 'Reverse GST Calculator' },
];

const taxLinks = [
  { href: '/18-percent-gst-calculator', label: '18% GST Calculator' },
  { href: '/28-percent-gst-calculator', label: '28% GST Calculator' },
  { href: '/cgst-calculator', label: 'CGST Calculator' },
  { href: '/sgst-calculator', label: 'SGST Calculator' },
  { href: '/igst-calculator', label: 'IGST Calculator' },
];

const companyLinks = [
  { href: '/invoice-generator', label: 'Invoice Generator' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <HiCalculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">
                GST <span className="gradient-text">Calculator</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              India&apos;s fastest and most accurate GST calculator. Add or remove GST, split CGST/SGST/IGST, and generate tax invoices — all for free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Calculators
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tax Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Tax Rates
            </h3>
            <ul className="space-y-2.5">
              {taxLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} GST Calculator India. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
