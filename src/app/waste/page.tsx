'use client';

import React, { useState } from 'react';
import {
  Trash2,
  Calendar,
  AlertCircle,
  FileText,
  Clock,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import {
  WEEKLY_SCHEDULE,
  WASTE_CATEGORIES,
  getTodaySchedule,
} from '@/data/wasteData';
import { useHouse } from '@/lib/store';
import { WasteCard } from '@/components/WasteCard';

export default function WastePage() {
  const { language, t } = useHouse();

  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 is Sunday
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(currentDayIndex);

  const activeSchedule =
    WEEKLY_SCHEDULE.find((s) => s.day_index === selectedDayIndex) ||
    WEEKLY_SCHEDULE[0];

  const activeCategories = activeSchedule.categories
    .map((id) => WASTE_CATEGORIES[id])
    .filter(Boolean);

  const isSelectedToday = selectedDayIndex === currentDayIndex;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 space-y-8 animate-fade-in">
      {/* 1. Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Trash2 className="w-3.5 h-3.5" />
          <span>Messina Servizi Bene Comune — Area Nord</span>
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
          {t.waste.pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl">
          {t.waste.pageSubtitle}
        </p>
      </div>

      {/* 2. Today's Highlight Hero Card */}
      <div className="bg-white border-2 border-sage-300 rounded-3xl p-6 sm:p-7 shadow-warm-md relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-sage-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-soft">
          {t.waste.todayBadge}
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600 block mb-1">
              {t.waste.todayTitle}
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 capitalize">
              {today.toLocaleDateString(language === 'it' ? 'it-IT' : 'en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h2>
          </div>

          {/* Categories for Today */}
          {getTodaySchedule(today).categories.length > 0 ? (
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                {getTodaySchedule(today).categories.map((catId) => {
                  const cat = WASTE_CATEGORIES[catId];
                  if (!cat) return null;
                  const catName = language === 'it' ? cat.name_it : cat.name_en;
                  const shortDesc = language === 'it' ? cat.short_desc_it : cat.short_desc_en;
                  return (
                    <div
                      key={cat.id}
                      className="p-4 rounded-2xl border flex items-start gap-3.5 shadow-soft"
                      style={{
                        backgroundColor: cat.bgColor,
                        borderColor: cat.borderColor,
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-soft"
                        style={{ backgroundColor: cat.color }}
                      >
                        <Trash2 className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-serif font-bold text-base text-stone-900">
                            {catName}
                          </h3>
                        </div>
                        <p className="text-xs text-stone-600 mb-1.5">
                          {shortDesc}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-stone-700 border border-stone-200">
                          {t.waste.binColorLabel} {cat.bin_color}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-cream-100/80 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs text-stone-700">
                <Clock className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>
                  {language === 'it'
                    ? getTodaySchedule(today).notes_it
                    : getTodaySchedule(today).notes_en}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-5 bg-cream-50 rounded-2xl border border-cream-200 text-stone-700 space-y-1">
              <p className="font-semibold text-stone-900">
                {t.waste.noCollectionToday}
              </p>
              <p className="text-xs text-stone-500">
                {language === 'it'
                  ? 'La domenica non è previsto il ritiro porta a porta. Ricordati però che domenica sera (tra le 20:00 e le 22:00) si espongono Umido e Vetro per il lunedì!'
                  : 'No municipal collection on Sunday. However, remember to put out Organic and Glass on Sunday evening (between 20:00 and 22:00) for Monday morning!'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Weekly Schedule (Area Nord) Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl text-stone-900">
            {t.waste.weeklyScheduleTitle}
          </h2>
          <span className="text-xs text-stone-500 hidden sm:inline">
            Click any day to inspect
          </span>
        </div>

        {/* 7 Day Strip */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
          {WEEKLY_SCHEDULE.map((day) => {
            const isToday = day.day_index === currentDayIndex;
            const isSelected = day.day_index === selectedDayIndex;
            const dayName = language === 'it' ? day.day_name_it : day.day_name_en;

            return (
              <button
                key={day.day_index}
                type="button"
                onClick={() => setSelectedDayIndex(day.day_index)}
                className={`p-2.5 sm:p-3 rounded-2xl text-center transition-all flex flex-col items-center justify-between min-h-[92px] ${
                  isSelected
                    ? 'bg-sage-700 text-white shadow-warm-md ring-2 ring-sage-500 scale-[1.03]'
                    : isToday
                    ? 'bg-sage-100 text-sage-900 border border-sage-300 font-semibold'
                    : 'bg-white border border-cream-200 text-stone-700 hover:bg-cream-50'
                }`}
              >
                <div>
                  <span className="text-[10px] sm:text-xs font-bold block uppercase tracking-wider">
                    {day.day_code}
                  </span>
                  {isToday && (
                    <span
                      className={`text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-full block mt-0.5 ${
                        isSelected ? 'bg-white text-sage-900' : 'bg-sage-600 text-white'
                      }`}
                    >
                      {t.waste.todayBadge}
                    </span>
                  )}
                </div>

                {/* Dots or Mini icons representing scheduled categories */}
                <div className="flex items-center gap-1 mt-2">
                  {day.categories.length > 0 ? (
                    day.categories.map((catId) => {
                      const cat = WASTE_CATEGORIES[catId];
                      return (
                        <div
                          key={catId}
                          className="w-2.5 h-2.5 rounded-full border border-white/50"
                          style={{ backgroundColor: cat?.color || '#ccc' }}
                          title={cat ? (language === 'it' ? cat.name_it : cat.name_en) : ''}
                        />
                      );
                    })
                  ) : (
                    <span className="text-[10px] opacity-60">—</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Expanded Info */}
        <div className="bg-cream-100/70 border border-cream-200 rounded-3xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {language === 'it' ? activeSchedule.day_name_it : activeSchedule.day_name_en}
              {isSelectedToday && (
                <span className="ml-2 text-xs font-bold text-terracotta-600 uppercase">
                  ({t.waste.todayBadge})
                </span>
              )}
            </h3>
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>20:00 – 22:00</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-700">
            {language === 'it' ? activeSchedule.notes_it : activeSchedule.notes_en}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {activeCategories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 rounded-xl text-xs font-bold text-white shadow-soft"
                style={{ backgroundColor: cat.color }}
              >
                {language === 'it' ? cat.name_it : cat.name_en} ({cat.bin_color})
              </span>
            ))}
            {activeCategories.length === 0 && (
              <span className="text-xs text-stone-500 italic">
                {t.waste.noCollectionToday}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Complete Category Separation Guide */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-stone-900">
            {t.waste.allCategoriesTitle}
          </h2>
          <p className="text-xs text-stone-500">
            Click on any category to view full items, items not allowed, preparation tips, and collection windows.
          </p>
        </div>

        <div className="space-y-3.5">
          {Object.values(WASTE_CATEGORIES).map((category) => {
            const isTodayCategory = getTodaySchedule(today).categories.includes(category.id);
            return (
              <WasteCard
                key={category.id}
                category={category}
                defaultExpanded={isTodayCategory}
                highlightToday={isTodayCategory}
              />
            );
          })}
        </div>
      </div>

      {/* 5. Official Source Notice Banner */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-5 sm:p-6 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-stone-700 leading-relaxed">
          <h4 className="font-serif font-bold text-sm text-amber-900">
            {t.waste.officialNotice}
          </h4>
          <p>{t.waste.officialNoticeDesc}</p>
          <p className="text-[11px] text-stone-500 pt-1">
            Messina Servizi Bene Comune SpA — Raccolta differenziata porta a porta (Area Nord).
          </p>
        </div>
      </div>
    </div>
  );
}
