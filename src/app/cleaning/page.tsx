'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Check,
  History,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { useHouse } from '@/lib/store';
import { CleaningModal } from '@/components/CleaningModal';
import { CleaningSuccessModal } from '@/components/CleaningSuccessModal';

export default function CleaningPage() {
  const {
    language,
    t,
    currentTurn,
    isCleanedThisWeek,
    lastCleanedAt,
    completedByName,
    upcomingTurns,
    cleaningHistory,
    roommates,
    markCleaningCompleted,
    unmarkCleaningCompleted,
  } = useHouse();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [whatsappInfo, setWhatsappInfo] = useState<{ message: string; url: string }>({
    message: '',
    url: '',
  });

  const assignedRoommate = roommates.find((r) => r.id === currentTurn?.roommate_id);

  const cleanDateFormatted = currentTurn?.cleaning_date
    ? new Date(currentTurn.cleaning_date).toLocaleDateString(
        language === 'it' ? 'it-IT' : 'en-GB',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
      )
    : '';

  const completedTimeFormatted = lastCleanedAt
    ? new Date(lastCleanedAt).toLocaleTimeString(
        language === 'it' ? 'it-IT' : 'en-GB',
        { hour: '2-digit', minute: '2-digit' }
      )
    : '';

  const completedDateFormatted = lastCleanedAt
    ? new Date(lastCleanedAt).toLocaleDateString(
        language === 'it' ? 'it-IT' : 'en-GB',
        { day: 'numeric', month: 'long' }
      )
    : '';

  const handleMarkCleanedClick = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmCleaning = async () => {
    try {
      setIsProcessing(true);
      const res = await markCleaningCompleted();
      setConfirmModalOpen(false);
      setWhatsappInfo({
        message: res.whatsappMessage,
        url: res.whatsappUrl,
      });
      setSuccessModalOpen(true);
    } catch (err) {
      console.error('Error marking cleaning completed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 space-y-8 animate-fade-in">
      {/* 1. Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.cleaning.singlePersonModelNotice}</span>
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
          {t.cleaning.pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl">
          {t.cleaning.pageSubtitle}
        </p>
      </div>

      {/* 2. Current Turn Card (Turns vibrant green after cleaning is completed!) */}
      {currentTurn ? (
        <div
          className={`rounded-3xl p-6 sm:p-8 shadow-warm-md relative overflow-hidden transition-all duration-300 space-y-6 border-2 ${
            isCleanedThisWeek
              ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
              : 'bg-white border-amber-300'
          }`}
        >
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-200/80 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-bold uppercase tracking-wider block ${
                    isCleanedThisWeek ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {t.cleaning.currentTurnTitle}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCleanedThisWeek
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isCleanedThisWeek ? t.cleaning.cleanedStatusBadge : t.cleaning.pendingStatusBadge}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium capitalize flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>{cleanDateFormatted} (Sunday / Domenica)</span>
              </p>
            </div>

            {/* Roommate details & Avatar */}
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-warm shrink-0"
                style={{ backgroundColor: assignedRoommate?.avatar_color || '#3D664B' }}
              >
                {currentTurn.roommate_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    {currentTurn.roommate_name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                    {t.cleaning.yourTurn}
                  </span>
                </div>
                {assignedRoommate?.room && (
                  <p className="text-xs text-stone-500">
                    {assignedRoommate.room}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Cleaned Banner or Cleaning Checklist */}
          {isCleanedThisWeek ? (
            <div className="bg-white/80 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                <span>{t.cleaning.alreadyCleanedMsg}</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                {t.cleaning.lastCleaned} {completedDateFormatted} at {completedTimeFormatted} by <strong>{completedByName || currentTurn.roommate_name}</strong>.
              </p>
            </div>
          ) : (
            <div className="space-y-3 bg-cream-50/70 p-5 rounded-2xl border border-cream-200">
              <h4 className="font-serif font-bold text-sm text-stone-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                <span>{t.cleaning.cleanSharedAreasList}</span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                <div className="flex items-start gap-2">
                  <span className="text-sage-600 font-bold">✓</span>
                  <span>{t.cleaning.checklist.kitchen}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sage-600 font-bold">✓</span>
                  <span>{t.cleaning.checklist.bathrooms}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sage-600 font-bold">✓</span>
                  <span>{t.cleaning.checklist.common}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sage-600 font-bold">✓</span>
                  <span>{t.cleaning.checklist.floors}</span>
                </div>
                <div className="flex items-start gap-2 sm:col-span-2">
                  <span className="text-sage-600 font-bold">✓</span>
                  <span>{t.cleaning.checklist.bins}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          {isCleanedThisWeek ? (
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>House clean for this week ✨</span>
              </div>
              <button
                type="button"
                onClick={unmarkCleaningCompleted}
                className="text-[11px] text-stone-400 hover:text-stone-700 underline transition-colors"
                title="Advance to next turn or undo"
              >
                Next Turn / Reset
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleMarkCleanedClick}
              className="w-full py-4 px-6 rounded-2xl bg-sage-700 hover:bg-sage-800 active:scale-[0.99] text-white font-serif font-bold text-base shadow-warm hover:shadow-warm-md transition-all flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t.cleaning.markCleanedBtn}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl border border-cream-200 text-center">
          <p className="text-stone-600 text-sm">
            No active cleaning turn assigned. Please add roommates to start the rotation.
          </p>
        </div>
      )}

      {/* 3. Upcoming Weekly Turns (Sundays) */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-xl text-stone-900">
          {t.cleaning.upcomingTitle}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {upcomingTurns.map((turn, idx) => {
            const rMate = roommates.find((r) => r.id === turn.roommate_id);
            const sundayFormatted = new Date(turn.cleaning_date).toLocaleDateString(
              language === 'it' ? 'it-IT' : 'en-GB',
              { weekday: 'short', day: 'numeric', month: 'short' }
            );

            return (
              <div
                key={turn.id}
                className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-soft shrink-0"
                    style={{ backgroundColor: rMate?.avatar_color || '#888' }}
                  >
                    {turn.roommate_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">
                      {turn.roommate_name}
                    </h4>
                    <p className="text-[11px] text-stone-500 capitalize">
                      Sunday, {sundayFormatted}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-stone-400 bg-cream-100 px-2.5 py-1 rounded-full">
                  Week +{idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Cleaning History Section */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
            <History className="w-5 h-5 text-stone-600" />
            <span>{t.cleaning.historyTitle}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {t.cleaning.retentionNotice}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft overflow-hidden divide-y divide-cream-100">
          {cleaningHistory.length > 0 ? (
            cleaningHistory.map((item) => {
              const compDate = new Date(item.completed_at);
              const dateStr = compDate.toLocaleDateString(
                language === 'it' ? 'it-IT' : 'en-GB',
                {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }
              );
              const timeStr = compDate.toLocaleTimeString(
                language === 'it' ? 'it-IT' : 'en-GB',
                {
                  hour: '2-digit',
                  minute: '2-digit',
                }
              );

              return (
                <div
                  key={item.id}
                  className="p-4 sm:px-6 flex items-center justify-between gap-3 text-xs sm:text-sm hover:bg-cream-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <span className="font-serif font-bold text-stone-900 block">
                        {item.roommate_name}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        Weekly clean for {item.cleaning_date}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold text-stone-700 block">
                      {dateStr}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {timeStr}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-stone-500 text-xs">
              {t.cleaning.noHistory}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <CleaningModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmCleaning}
        isLoading={isProcessing}
      />

      {/* Celebratory Success & WhatsApp Modal */}
      <CleaningSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        whatsappMessage={whatsappInfo.message}
        whatsappUrl={whatsappInfo.url}
      />
    </div>
  );
}
