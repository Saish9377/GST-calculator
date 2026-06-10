'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp, FaXTwitter, FaLink } from 'react-icons/fa6';
import toast, { Toaster } from 'react-hot-toast';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: 'var(--surface)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
          fontSize: '14px',
        },
      });
    } catch (err) {
      toast.error('Failed to copy link.');
    }
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <div className="flex items-center gap-3">
      <Toaster />
      
      {/* WhatsApp Share */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on WhatsApp"
        className="w-10 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        <FaWhatsapp className="w-5 h-5" />
      </a>

      {/* Twitter Share */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X (Twitter)"
        className="w-10 h-10 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        <FaXTwitter className="w-5 h-5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        title="Copy Link"
        className="w-10 h-10 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
      >
        <FaLink className="w-4 h-4" />
      </button>
    </div>
  );
}
