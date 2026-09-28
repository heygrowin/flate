'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Sparkles, Check, ArrowRight, UserPlus, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useHouse } from '@/lib/store';

export default function JoinPage() {
  const { language, t, addRoommate } = useHouse();
  const router = useRouter();

  const todayStr = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [joinedAt, setJoinedAt] = useState(todayStr);
  const [room, setRoom] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredRoommateName, setRegisteredRoommateName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg(t.join.nameRequired);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);

      const created = await addRoommate({
        name: name.trim(),
        joined_at: joinedAt || todayStr,
        room: room.trim() || undefined,
      });

      setRegisteredRoommateName(created.name);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#C85A32', '#3D664B', '#D99313', '#4A90E2'],
        });
      } catch (err) {
        // Fallback
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMsg('Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-terracotta-100 text-terracotta-600 mx-auto flex items-center justify-center shadow-soft mb-2">
          <UserPlus className="w-7 h-7" />
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
          {t.join.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          {t.join.pageSubtitle}
        </p>
      </div>

      {/* Main Registration Card or Success Confirmation */}
      {registeredRoommateName ? (
        /* Confirmation State */
        <div className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-emerald-300 shadow-warm-lg text-center space-y-5 animate-scale-up">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-soft">
            <Check className="w-9 h-9 stroke-[3]" />
          </div>

          <div>
            <h2 className="font-serif font-bold text-2xl text-stone-900 mb-2">
              {t.join.successTitle.replace('{name}', registeredRoommateName)}
            </h2>
            <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              {t.join.successSubtitle}
            </p>
          </div>

          <div className="pt-4 space-y-2.5">
            <Link
              href="/"
              className="w-full py-3.5 px-5 rounded-2xl bg-sage-700 hover:bg-sage-800 text-white font-bold text-sm shadow-warm transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>{t.join.goToHome}</span>
            </Link>

            <Link
              href="/rules"
              className="w-full py-3 px-5 rounded-2xl border border-cream-300 text-stone-700 hover:bg-cream-100 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>{t.join.viewRules}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-warm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {errorMsg}
              </div>
            )}

            {/* 1. Name Input (REQUIRED) */}
            <div>
              <label
                htmlFor="roommate-name"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
              >
                {t.join.nameLabel}
              </label>
              <input
                id="roommate-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.join.namePlaceholder}
                className="w-full px-4 py-3.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                autoFocus
              />
            </div>

            {/* 2. Date Joined (REQUIRED, defaults to today) */}
            <div>
              <label
                htmlFor="roommate-date"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
              >
                {t.join.dateLabel}
              </label>
              <div className="relative">
                <input
                  id="roommate-date"
                  type="date"
                  required
                  value={joinedAt}
                  onChange={(e) => setJoinedAt(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
                />
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Defaults to today. You can adjust if you arrived earlier.
              </p>
            </div>

            {/* 3. Room (OPTIONAL) */}
            <div>
              <label
                htmlFor="roommate-room"
                className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5"
              >
                {t.join.roomLabel}
              </label>
              <input
                id="roommate-room"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder={t.join.roomPlaceholder}
                className="w-full px-4 py-3.5 rounded-2xl border border-cream-300 bg-cream-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:bg-white transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-sage-700 hover:bg-sage-800 active:scale-[0.98] text-white font-serif font-bold text-base shadow-warm hover:shadow-warm-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Joining...</span>
                ) : (
                  <>
                    <Home className="w-5 h-5" />
                    <span>{t.join.submitBtn}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
