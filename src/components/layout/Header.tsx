'use client';

// ============================================================
// Header — Sticky Navigation with Theme Toggle
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiCalculator, HiBars3, HiXMark } from 'react-icons/hi2';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MobileNav } from './MobileNav';

const navLinks = [
  { href: '/', label: 'Calculator' },
  { href: '/invoice-generator', label: 'Invoice' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300 group-hover:scale-110">
                <HiCalculator className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground leading-tight">
                  GST <span className="gradient-text">Calculator</span>
                </span>
                <span className="text-[10px] font-medium text-muted leading-none hidden sm:block">
                  Fast & Accurate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-surface transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-surface-elevated transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <HiXMark className="w-5 h-5 text-foreground" />
                ) : (
                  <HiBars3 className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
