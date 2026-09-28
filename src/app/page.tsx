'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Sparkles,
  BookOpen,
  Info,
  Users,
  PhoneCall,
  UserPlus,
  Heart,
} from 'lucide-react';
import { useHouse } from '@/lib/store';
import { TodayWasteWidget } from '@/components/TodayWasteWidget';
import { TodayCleaningWidget } from '@/components/TodayCleaningWidget';

export default function HomePage() {
  const { t } = useHouse();

  const mainCards = [
    {
      href: '/waste',
      title: t.home.cards.wasteTitle,
      desc: t.home.cards.wasteDesc,
      icon: Trash2,
    },
    {
      href: '/cleaning',
      title: t.home.cards.cleaningTitle,
      desc: t.home.cards.cleaningDesc,
      icon: Sparkles,
    },
    {
      href: '/rules',
      title: t.home.cards.rulesTitle,
      desc: t.home.cards.rulesDesc,
      icon: BookOpen,
    },
    {
      href: '/info',
      title: t.home.cards.infoTitle,
      desc: t.home.cards.infoDesc,
      icon: Info,
    },
    {
      href: '/roommates',
      title: t.home.cards.roommatesTitle,
      desc: t.home.cards.roommatesDesc,
      icon: Users,
    },
    {
      href: '/contacts',
      title: t.home.cards.contactsTitle,
      desc: t.home.cards.contactsDesc,
      icon: PhoneCall,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12 space-y-7 animate-fade-in">
      {/* 1. Hero Welcome Header */}
      <div className="text-center sm:text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200/60 text-stone-600 text-xs font-medium">
          <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500" />
          <span>Messina, Sicily — Shared Apartment</span>
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-tight">
          {t.home.welcome}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl">
          {t.home.welcomeSubtitle}
        </p>
      </div>

      {/* 2. Cozy Living Room Banner */}
      <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-3xl overflow-hidden shadow-warm-md border border-cream-200">
        <Image
          src="/images/cozy_living_room.jpg"
          alt="Our cozy living room in Messina"
          fill
          priority
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-5 sm:p-7">
          <div className="text-white">
            <span className="text-xs uppercase tracking-widest font-bold text-cream-200">
              Casa Nostra
            </span>
            <p className="font-serif text-lg sm:text-xl font-bold drop-shadow-sm">
              Via Giuseppe Garibaldi 142
            </p>
          </div>
        </div>
      </div>

      {/* 3. Prominent "New here? Join the House" Banner */}
      <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 rounded-3xl p-5 sm:p-6 text-white shadow-warm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg sm:text-xl leading-tight">
              {t.home.newHere}
            </h2>
            <p className="text-xs sm:text-sm text-terracotta-100">
              Just arrived in the flat? Add your name in 10 seconds to join the household.
            </p>
          </div>
        </div>

        <Link
          href="/join"
          className="shrink-0 w-full sm:w-auto text-center px-6 py-3 rounded-2xl bg-white hover:bg-cream-50 active:scale-[0.98] text-terracotta-700 font-bold text-sm shadow-soft transition-all"
        >
          {t.home.joinAction}
        </Link>
      </div>

      {/* 4. Today's Overview: Waste & Cleaning Widgets (clean without "Today's house pulse" text) */}
      <div className="grid md:grid-cols-2 gap-4">
        <TodayWasteWidget />
        <TodayCleaningWidget />
      </div>

      {/* 5. Category Navigation Cards */}
      <div className="space-y-3 pt-2">
        <h2 className="font-serif font-bold text-xl text-stone-900 tracking-tight">
          {t.home.quickLinksTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group p-5 rounded-3xl bg-white border border-cream-200/90 shadow-warm hover:shadow-warm-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 shadow-soft bg-cream-100 text-stone-700">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1 group-hover:text-sage-800 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs font-semibold text-sage-700 group-hover:text-sage-900">
                  <span>{t.home.viewAll}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
