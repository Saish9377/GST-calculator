'use client';

// ============================================================
// ActionButtons — Copy, WhatsApp, Reset, Download
// ============================================================

import { useState } from 'react';
import { GSTResult } from '@/lib/gst-calculator';
import { copyToClipboard, shareWhatsApp } from '@/lib/share';
import {
  HiClipboardDocument,
  HiCheck,
  HiArrowPath,
  HiShare,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';

interface ActionButtonsProps {
  result: GSTResult | null;
  onReset: () => void;
}

export function ActionButtons({ result, onReset }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    const success = await copyToClipboard(result);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (!result) return;
    shareWhatsApp(result);
  };

  const handleReset = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
    onReset();
  };

  const handleShare = async () => {
    if (!result || typeof navigator.share === 'undefined') {
      handleCopy();
      return;
    }

    try {
      const { generateShareText } = await import('@/lib/share');
      await navigator.share({
        title: 'GST Calculation Result',
        text: generateShareText(result),
      });
    } catch {
      // User cancelled or share not supported
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Copy */}
      <button
        onClick={handleCopy}
        disabled={!result}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface border border-border hover:bg-background hover:border-primary/30 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-95"
      >
        {copied ? (
          <>
            <HiCheck className="w-4 h-4 text-success" />
            <span className="text-success">Copied!</span>
          </>
        ) : (
          <>
            <HiClipboardDocument className="w-4 h-4 text-muted" />
            <span className="text-foreground">Copy</span>
          </>
        )}
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsApp}
        disabled={!result}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-95"
      >
        <FaWhatsapp className="w-4 h-4" />
        WhatsApp
      </button>

      {/* Share (Native) */}
      <button
        onClick={handleShare}
        disabled={!result}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-surface border border-border hover:bg-background hover:border-primary/30 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-95"
      >
        <HiShare className="w-4 h-4 text-muted" />
        <span className="text-foreground">Share</span>
      </button>

      {/* Reset */}
      <button
        onClick={handleReset}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-danger/10 border border-danger/30 text-danger hover:bg-danger/20 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 ml-auto`}
      >
        <HiArrowPath className={`w-4 h-4 ${spinning ? 'animate-spin-once' : ''}`} />
        Reset
      </button>
    </div>
  );
}
