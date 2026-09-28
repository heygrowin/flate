'use client';

import React, { useState } from 'react';
import {
  Info,
  MapPin,
  Copy,
  Check,
  Clock,
  Building,
} from 'lucide-react';
import { useHouse } from '@/lib/store';

export default function InfoPage() {
  const { language, t, houseInfo } = useHouse();
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(houseInfo.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 space-y-7 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
          <Info className="w-3.5 h-3.5" />
          <span>{t.info.pageTitle}</span>
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
          {t.info.pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl">
          {t.info.pageSubtitle}
        </p>
      </div>

      <div className="space-y-5">
        {/* 1. House Address & Location Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-warm space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 shadow-soft">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-900 mb-0.5">
                {t.info.addressCard}
              </h2>
              <p className="text-xs text-stone-500">
                Messina City Center, Sicily 🇮🇹
              </p>
            </div>
          </div>

          <div className="space-y-3 bg-cream-50/80 p-5 rounded-2xl border border-cream-200 text-xs sm:text-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                {t.info.addressLabel}
              </span>
              <p className="font-semibold text-stone-900 select-all text-sm sm:text-base">
                {houseInfo.address}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-cream-200/80">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  {t.info.floorLabel}
                </span>
                <p className="font-medium text-stone-800">
                  {houseInfo.building_floor}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  {t.info.intercomLabel}
                </span>
                <p className="font-medium text-stone-800">
                  {houseInfo.intercom_name}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="py-3 px-3 rounded-2xl border border-cream-300 text-stone-700 hover:bg-cream-100 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAddress ? t.info.copiedBtn : t.info.copyAddressBtn}</span>
            </button>

            <a
              href={houseInfo.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs shadow-soft transition-colors flex items-center justify-center gap-1.5 text-center"
            >
              <span>{t.info.openMapsBtn}</span>
            </a>
          </div>
        </div>

        {/* 2. Building Notes & Quiet Hours */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-warm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center shadow-soft">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-900">
                {t.info.notesCard}
              </h2>
              <p className="text-xs text-stone-500">
                Condominium and flat guidelines.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed bg-cream-50/70 p-4 rounded-2xl border border-cream-200">
            <p>
              {language === 'it' ? houseInfo.notes_it : houseInfo.notes_en}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
            <Clock className="w-4 h-4 text-terracotta-600 shrink-0" />
            <span>
              <strong>{t.info.quietHoursLabel}</strong> {houseInfo.quiet_hours}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
