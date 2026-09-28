'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, MessageCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useHouse } from '@/lib/store';

interface CleaningSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappMessage: string;
  whatsappUrl: string;
}

export function CleaningSuccessModal({
  isOpen,
  onClose,
  whatsappMessage,
  whatsappUrl,
}: CleaningSuccessModalProps) {
  const { t } = useHouse();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fire celebratory confetti when opened and lock scroll
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#3D664B', '#C85A32', '#D99313', '#68D391'],
      });
    } catch (err) {
      // Fallback
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleOpenWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      style={{ touchAction: 'none' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Strictly Centered Success Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl z-10 text-center border border-cream-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-cream-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Checkmark Circle */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3 shadow-soft">
          <Check className="w-9 h-9 stroke-[3]" />
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-serif font-bold text-xl text-stone-900 mb-1 leading-tight">
          {t.cleaning.successModal.title}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mb-5">
          {t.cleaning.successModal.subtitle}
        </p>

        {/* WhatsApp message preparation card */}
        <div className="bg-cream-50 border border-cream-200/90 rounded-2xl p-4 text-left mb-5 shadow-soft">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              {t.cleaning.successModal.sendWhatsappTitle}
            </span>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">
            {t.cleaning.successModal.whatsappPreview}
          </p>
          <div className="bg-white p-3 rounded-xl border border-cream-200 text-xs text-stone-700 whitespace-pre-line font-sans leading-relaxed select-all">
            {whatsappMessage}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white font-bold text-sm shadow-warm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span>{t.cleaning.successModal.openWhatsappBtn}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-medium hover:bg-cream-100 transition-colors cursor-pointer"
          >
            {t.cleaning.successModal.doneBtn}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
