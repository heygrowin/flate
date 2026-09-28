'use client';

import React, { useState } from 'react';
import {
  Apple,
  Newspaper,
  Package,
  Wine,
  Trash2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { WasteCategoryInfo } from '@/types';
import { useHouse } from '@/lib/store';

const ICON_MAP: Record<string, any> = {
  Apple,
  Newspaper,
  Package,
  Wine,
  Trash2,
};

interface WasteCardProps {
  category: WasteCategoryInfo;
  defaultExpanded?: boolean;
  highlightToday?: boolean;
}

export function WasteCard({ category, defaultExpanded = false, highlightToday = false }: WasteCardProps) {
  const { language, t } = useHouse();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const Icon = ICON_MAP[category.icon] || Trash2;
  const name = language === 'it' ? category.name_it : category.name_en;
  const shortDesc = language === 'it' ? category.short_desc_it : category.short_desc_en;
  const whatGoes = language === 'it' ? category.what_goes_it : category.what_goes_en;
  const whatNotGoes = language === 'it' ? category.what_not_goes_it : category.what_not_goes_en;
  const howToPrepare = language === 'it' ? category.how_to_prepare_it : category.how_to_prepare_en;
  const collectionTime = language === 'it' ? category.collection_time_it : category.collection_time_en;

  return (
    <div
      className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
        highlightToday
          ? 'ring-2 ring-sage-600 shadow-warm-md bg-white border-sage-300'
          : 'bg-white/80 hover:bg-white border-cream-200 shadow-warm'
      }`}
    >
      {/* Card Header (clickable) */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 focus:outline-none focus:bg-cream-50/60"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start sm:items-center gap-4">
          {/* Category Icon Badge */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-soft"
            style={{ backgroundColor: category.color }}
          >
            <Icon className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                {name}
              </h3>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${category.color}15`,
                  color: category.color,
                  border: `1px solid ${category.color}35`,
                }}
              >
                {t.waste.binColorLabel} {category.bin_color}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
              {shortDesc}
            </p>
          </div>
        </div>

        {/* Expand / Collapse Icon */}
        <div className="p-1 rounded-full bg-cream-100 text-stone-500 hover:text-stone-800 transition-transform shrink-0 mt-1 sm:mt-0">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Expanded Details Body */}
      {isExpanded && (
        <div className="p-5 sm:p-6 pt-0 border-t border-cream-100 space-y-5 animate-fade-in bg-[#FCFBF7]/50">
          {/* 1. What goes here? */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
            <h4 className="flex items-center gap-2 font-serif font-bold text-xs uppercase tracking-wider text-emerald-800 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t.waste.whatGoes}
            </h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {whatGoes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. What does NOT go here? */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-4">
            <h4 className="flex items-center gap-2 font-serif font-bold text-xs uppercase tracking-wider text-rose-800 mb-2.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              {t.waste.whatNotGoes}
            </h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {whatNotGoes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <span className="text-rose-500 font-bold shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. How to prepare it & When to put out */}
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4">
              <h4 className="flex items-center gap-2 font-serif font-bold text-xs uppercase tracking-wider text-amber-900 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                {t.waste.howToPrepare}
              </h4>
              <ul className="space-y-1.5">
                {howToPrepare.map((tip, idx) => (
                  <li key={idx} className="text-xs text-stone-700 flex items-start gap-1.5">
                    <span className="text-amber-600 shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-100/70 border border-stone-200 rounded-2xl p-4">
              <h4 className="flex items-center gap-2 font-serif font-bold text-xs uppercase tracking-wider text-stone-800 mb-2">
                <Clock className="w-4 h-4 text-stone-600" />
                {t.waste.whenToPutOut}
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed">
                {collectionTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
