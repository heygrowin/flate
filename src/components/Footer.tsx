'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useHouse } from '@/lib/store';
import { HomeLogo } from './HomeLogo';

export function Footer() {
  const { t } = useHouse();

  return (
    <footer className="bg-cream-100/70 border-t border-cream-200 mt-16 pt-10 pb-20 lg:pb-12 text-stone-600 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-cream-200/80 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <HomeLogo className="w-8 h-8" />
            <div>
              <p className="font-serif font-bold text-stone-900 text-sm">
                {t.siteTitle} — Messina 🇮🇹
              </p>
              <p className="text-[11px] text-stone-500">
                Via Giuseppe Garibaldi 142, 98122 Messina ME
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link
              href="/waste"
              className="text-stone-600 hover:text-sage-800 transition-colors"
            >
              {t.nav.waste}
            </Link>
            <Link
              href="/cleaning"
              className="text-stone-600 hover:text-sage-800 transition-colors"
            >
              {t.nav.cleaning}
            </Link>
            <Link
              href="/rules"
              className="text-stone-600 hover:text-sage-800 transition-colors"
            >
              {t.nav.rules}
            </Link>
            <Link
              href="/contacts"
              className="text-stone-600 hover:text-sage-800 transition-colors"
            >
              {t.nav.contacts}
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-400 text-center">
          <p className="flex items-center justify-center gap-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-terracotta-500 fill-terracotta-500 inline" />
            <span>for our shared flat in Messina</span>
          </p>
          <p>
            Waste rules verified with Messina Servizi Bene Comune (Area Nord)
          </p>
        </div>
      </div>
    </footer>
  );
}
