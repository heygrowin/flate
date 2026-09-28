'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Users, UserPlus, Trash2, AlertTriangle } from 'lucide-react';
import { useHouse } from '@/lib/store';

export default function RoommatesPage() {
  const { language, t, roommates, removeRoommate } = useHouse();
  const [removeTarget, setRemoveTarget] = useState<{ id: string; name: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeList = roommates.filter((r) => r.active);

  const handleConfirmRemove = async () => {
    if (removeTarget) {
      await removeRoommate(removeTarget.id);
      setRemoveTarget(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>
              {t.roommates.activeCount.replace('{count}', activeList.length.toString())}
            </span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            {t.roommates.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            {t.roommates.pageSubtitle}
          </p>
        </div>

        {/* Action Button: Add Roommate */}
        <Link
          href="/join"
          className="self-center sm:self-auto px-5 py-3 rounded-2xl bg-sage-700 hover:bg-sage-800 text-white font-semibold text-xs shadow-warm transition-all flex items-center gap-2 active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.roommates.addNewBtn}</span>
        </Link>
      </div>

      {/* Roommates List */}
      <div className="grid sm:grid-cols-2 gap-4">
        {activeList.map((roommate) => {
          const joinedFormatted = new Date(roommate.joined_at).toLocaleDateString(
            language === 'it' ? 'it-IT' : 'en-GB',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
          );

          return (
            <div
              key={roommate.id}
              className="bg-white rounded-3xl p-5 border border-cream-200/90 shadow-warm hover:shadow-warm-md transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                {/* Avatar with initial */}
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-lg shadow-soft shrink-0"
                  style={{ backgroundColor: roommate.avatar_color || '#3D664B' }}
                >
                  {roommate.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      {roommate.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {t.roommates.activeBadge}
                    </span>
                  </div>

                  {roommate.room && (
                    <p className="text-xs font-medium text-stone-500">
                      {roommate.room}
                    </p>
                  )}

                  <p className="text-[11px] text-stone-400 mt-1">
                    {t.roommates.joinedOn.replace('{date}', joinedFormatted)}
                  </p>
                </div>
              </div>

              {/* Direct remove button */}
              <button
                type="button"
                onClick={() => setRemoveTarget({ id: roommate.id, name: roommate.name })}
                className="text-stone-400 hover:text-rose-600 p-2.5 rounded-xl hover:bg-rose-50 transition-colors"
                title={t.roommates.removeBtn}
                aria-label={`Remove ${roommate.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Confirmation Dialog for Removing a Roommate with Portal */}
      {removeTarget && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
          style={{ touchAction: 'none' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setRemoveTarget(null);
          }}
        >
          <div
            className="relative bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl z-10 text-center space-y-4 border border-cream-200 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-soft">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {t.roommates.removeBtn}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              {t.roommates.confirmRemove.replace('{name}', removeTarget.name)}
            </p>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmRemove}
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs tracking-wider uppercase shadow-soft transition-all cursor-pointer"
              >
                {t.common.delete}
              </button>
              <button
                type="button"
                onClick={() => setRemoveTarget(null)}
                className="w-full py-2.5 rounded-xl border border-cream-200 text-stone-600 text-xs font-semibold hover:bg-cream-50 cursor-pointer"
              >
                {t.common.cancel}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
