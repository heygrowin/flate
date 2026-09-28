'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, Calendar } from 'lucide-react';
import { useHouse } from '@/lib/store';

export function TodayCleaningWidget() {
  const { currentTurn, roommates, isCleanedThisWeek, completedByName, language, t } = useHouse();

  const assignedRoommate = roommates.find((r) => r.id === currentTurn?.roommate_id);

  const cleanDateFormatted = currentTurn?.cleaning_date
    ? new Date(currentTurn.cleaning_date).toLocaleDateString(
        language === 'it' ? 'it-IT' : 'en-GB',
        { weekday: 'long', day: 'numeric', month: 'short' }
      )
    : '';

  return (
    <Link
      href="/cleaning"
      className={`block group rounded-3xl p-5 sm:p-6 shadow-warm hover:shadow-warm-md transition-all active:scale-[0.99] cursor-pointer border ${
        isCleanedThisWeek
          ? 'bg-emerald-50/90 hover:bg-emerald-50 border-emerald-300'
          : 'bg-white/90 hover:bg-white border-cream-200 hover:border-cream-300'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform ${
              isCleanedThisWeek
                ? 'bg-emerald-600 text-white'
                : 'bg-sage-100 text-sage-800'
            }`}
          >
            {isCleanedThisWeek ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <span
              className={`text-[11px] font-bold uppercase tracking-wider block ${
                isCleanedThisWeek ? 'text-emerald-700' : 'text-sage-700'
              }`}
            >
              {t.home.todayCleaning}
            </span>
            <h3 className="font-serif font-bold text-stone-900 text-base">
              {isCleanedThisWeek ? t.cleaning.cleanedStatusBadge : `${currentTurn?.roommate_name || ''}'s ${t.cleaning.turnFor}`}
            </h3>
          </div>
        </div>

        <div className="text-xs font-semibold text-sage-700 group-hover:text-sage-900 flex items-center gap-1">
          <span>{t.home.viewAll}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Main Content */}
      {currentTurn ? (
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl p-3.5 border ${
            isCleanedThisWeek
              ? 'bg-white/90 border-emerald-200'
              : 'bg-cream-50/70 border-cream-200/80'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shadow-soft shrink-0"
              style={{ backgroundColor: assignedRoommate?.avatar_color || '#3D664B' }}
            >
              {currentTurn.roommate_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900 text-sm">
                  {currentTurn.roommate_name}
                </span>
                {assignedRoommate?.room && (
                  <span className="text-[10px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded-md border border-cream-200">
                    {assignedRoommate.room}
                  </span>
                )}
                {isCleanedThisWeek && (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Done ✓
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5 capitalize flex items-center gap-1">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>{cleanDateFormatted}</span>
              </p>
            </div>
          </div>

          <div
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-soft transition-all ${
              isCleanedThisWeek
                ? 'bg-emerald-600 text-white'
                : 'bg-sage-700 text-white'
            }`}
          >
            {isCleanedThisWeek ? 'Cleaned ✨' : t.cleaning.markCleanedBtn.replace('✨', '')}
          </div>
        </div>
      ) : (
        <p className="text-xs text-stone-500">
          No active cleaning turn assigned.
        </p>
      )}
    </Link>
  );
}
