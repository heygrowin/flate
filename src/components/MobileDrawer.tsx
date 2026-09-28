'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  Home,
  Trash2,
  Sparkles,
  BookOpen,
  Info,
  Users,
  PhoneCall,
  UserPlus,
  Check,
} from 'lucide-react';
import { useHouse } from '@/lib/store';
import { HomeLogo } from './HomeLogo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { href: string; label: string; icon?: any }[];
}

export function MobileDrawer({ isOpen, onClose, navItems }: MobileDrawerProps) {
  const { language, setLanguage, t } = useHouse();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Content */}
      <div className="relative w-full max-w-xs bg-[#FCFBF7] h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-slide-left">
        <div>
          {/* Header */}
          <div className="p-5 flex items-center justify-between border-b border-cream-200">
            <div className="flex items-center gap-2.5">
              <HomeLogo className="w-8 h-8" />
              <div>
                <span className="font-serif font-bold text-base text-sage-900 block leading-tight">
                  {t.siteTitle}
                </span>
                <span className="text-[10px] text-terracotta-600 font-semibold block">
                  Messina 🇮🇹
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-cream-200 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Member Registration CTA inside Drawer */}
          <div className="p-4 border-b border-cream-200/60">
            <Link
              href="/join"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium text-sm shadow-warm transition-transform active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.home.newHere} {t.nav.join}</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sage-600 text-white font-semibold shadow-soft'
                      : 'text-stone-700 hover:bg-cream-100 hover:text-sage-800'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Language Switcher List & House Location */}
        <div className="p-5 border-t border-cream-200 bg-cream-50/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            Language / Lingua
          </p>
          <div className="space-y-1.5">
            <button
              onClick={() => {
                setLanguage('en');
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                language === 'en'
                  ? 'bg-white font-semibold text-sage-900 shadow-soft border border-sage-200'
                  : 'text-stone-600 hover:bg-cream-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">🇬🇧</span>
                <span>English (ENG)</span>
              </span>
              {language === 'en' && <Check className="w-4 h-4 text-sage-600" />}
            </button>

            <button
              onClick={() => {
                setLanguage('it');
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                language === 'it'
                  ? 'bg-white font-semibold text-sage-900 shadow-soft border border-sage-200'
                  : 'text-stone-600 hover:bg-cream-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">🇮🇹</span>
                <span>Italiano (IT)</span>
              </span>
              {language === 'it' && <Check className="w-4 h-4 text-sage-600" />}
            </button>
          </div>

          <p className="text-[11px] text-stone-400 text-center mt-4">
            Via Garibaldi 142, Messina 🏡
          </p>
        </div>
      </div>
    </div>
  );
}
