'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, ArrowRight, Clock } from 'lucide-react';
import { getTodaySchedule, WASTE_CATEGORIES } from '@/data/wasteData';
import { useHouse } from '@/lib/store';

export function TodayWasteWidget() {
  const { language, t } = useHouse();

  const today = new Date();
  const schedule = getTodaySchedule(today);
  const categories = schedule.categories.map((c) => WASTE_CATEGORIES[c]).filter(Boolean);

  const formattedDate = today.toLocaleDateString(language === 'it' ? 'it-IT' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Link
      href="/waste"
      className="block group bg-white/90 hover:bg-white border border-cream-200 hover:border-cream-300 rounded-3xl p-5 sm:p-6 shadow-warm hover:shadow-warm-md transition-all active:scale-[0.99] cursor-pointer"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-600 block">
              {t.home.todayWaste}
            </span>
            <h3 className="font-serif font-bold text-stone-900 text-base capitalize">
              {formattedDate}
            </h3>
          </div>
        </div>

        <div className="text-xs font-semibold text-sage-700 group-hover:text-sage-900 flex items-center gap-1">
          <span>{t.home.viewAll}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Main Content */}
      {categories.length > 0 ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const catName = language === 'it' ? cat.name_it : cat.name_en;
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-white shadow-soft"
                  style={{ backgroundColor: cat.color }}
                >
                  <span className="text-sm font-bold">{catName}</span>
                  <span className="text-[11px] opacity-90 font-medium bg-black/15 px-2 py-0.5 rounded-full">
                    {cat.bin_color}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-stone-600 pt-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>
              {language === 'it' ? schedule.notes_it : schedule.notes_en}
            </span>
          </p>
        </div>
      ) : (
        <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200 text-stone-600 text-xs">
          <p className="font-semibold text-stone-800 mb-1">
            {t.home.noWasteToday}
          </p>
          <p className="text-stone-500">
            {language === 'it' ? schedule.notes_it : schedule.notes_en}
          </p>
        </div>
      )}
    </Link>
  );
}
