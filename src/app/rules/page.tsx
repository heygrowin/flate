'use client';

import React from 'react';
import {
  BookOpen,
  Sparkles,
  RotateCw,
  Recycle,
  UtensilsCrossed,
  Bath,
  Volume2,
  Wrench,
  Key,
  Heart,
} from 'lucide-react';
import { useHouse } from '@/lib/store';

const RULE_ICONS: Record<string, any> = {
  Sparkles,
  RotateCw,
  Recycle,
  UtensilsCrossed,
  Bath,
  Volume2,
  Wrench,
  Key,
};

export default function RulesPage() {
  const { language, t, houseRules } = useHouse();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{t.rules.friendlyNote}</span>
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
          {t.rules.pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl">
          {t.rules.pageSubtitle}
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {houseRules.map((rule, idx) => {
          const Icon = RULE_ICONS[rule.icon] || Sparkles;
          const title = language === 'it' ? rule.title_it : rule.title_en;
          const desc = language === 'it' ? rule.description_it : rule.description_en;

          return (
            <div
              key={rule.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-200/90 shadow-warm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-cream-100 text-sage-800 flex items-center justify-center shrink-0 shadow-soft">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-terracotta-600 uppercase tracking-widest block mb-0.5">
                    {language === 'it' ? `Regola ${idx + 1}` : `Rule ${idx + 1}`}
                  </span>
                  <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                    {title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-1">
                {desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Warm concluding quote banner */}
      <div className="bg-sage-50 border border-sage-200/80 rounded-3xl p-6 text-center space-y-2">
        <p className="font-serif italic text-sage-900 text-sm sm:text-base">
          {language === 'it'
            ? '“Una casa pulita e accogliente è il risultato del rispetto che abbiamo l’uno per l’altro ogni giorno.”'
            : '“A clean and welcoming home is simply the result of caring for one another each and every day.”'}
        </p>
        <p className="text-xs text-sage-700 font-medium">
          Casa Nostra — Messina 🏠
        </p>
      </div>
    </div>
  );
}
