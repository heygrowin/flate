'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Check, X } from 'lucide-react';
import { useHouse } from '@/lib/store';

interface CleaningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function CleaningModal({ isOpen, onClose, onConfirm, isLoading }: CleaningModalProps) {
  const { t } = useHouse();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling while modal is open without layout shift
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      style={{ touchAction: 'none' }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      {/* Centered Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-center border border-cream-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close icon in top corner */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-cream-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cleaning icon badge */}
        <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 mx-auto flex items-center justify-center mb-4 shadow-soft">
          <Sparkles className="w-8 h-8" />
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-xl text-stone-900 mb-2 leading-tight">
          {t.cleaning.modal.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          {t.cleaning.modal.description}
        </p>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="w-full py-3.5 px-5 rounded-2xl bg-sage-700 hover:bg-sage-800 active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-warm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{t.cleaning.modal.confirmBtn}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full py-3 px-5 rounded-2xl border border-cream-300 text-stone-600 hover:bg-cream-100 active:scale-[0.98] font-semibold text-xs tracking-wider transition-all cursor-pointer"
          >
            {t.cleaning.modal.cancelBtn}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
