'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trash2, Sparkles, BookOpen, Info, Users, PhoneCall, Menu, UserPlus } from 'lucide-react';
import { useHouse } from '@/lib/store';
import { HomeLogo } from './HomeLogo';
import { MobileDrawer } from './MobileDrawer';

export function Header() {
  const { language, setLanguage, t } = useHouse();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/waste', label: t.nav.waste, icon: Trash2 },
    { href: '/cleaning', label: t.nav.cleaning, icon: Sparkles },
    { href: '/rules', label: t.nav.rules, icon: BookOpen },
    { href: '/info', label: t.nav.info, icon: Info },
    { href: '/roommates', label: t.nav.roommates, icon: Users },
    { href: '/contacts', label: t.nav.contacts, icon: PhoneCall },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#FCFBF7]/95 backdrop-blur-md border-b border-cream-200/80 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & House Title with new cozy HomeLogo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-sage-500 rounded-xl p-1"
          >
            <HomeLogo className="w-9 h-9" />
            <div>
              <span className="font-serif font-bold text-lg text-sage-900 tracking-tight block leading-tight">
                {t.siteTitle}
              </span>
              <span className="text-[10px] text-terracotta-600 font-semibold tracking-wide uppercase block -mt-0.5">
                Messina 🇮🇹
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-sage-600 text-white shadow-soft font-semibold'
                      : 'text-stone-600 hover:text-sage-800 hover:bg-cream-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions: Join + Language Switcher (ENG / IT) + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Quick Join Button for Desktop */}
            <Link
              href="/join"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold shadow-soft hover:shadow transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t.nav.join}</span>
            </Link>

            {/* Language Switcher with ENG instead of GB */}
            <div className="flex items-center bg-cream-100 border border-cream-200/90 rounded-full p-0.5 shadow-soft">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  language === 'en'
                    ? 'bg-white text-sage-900 shadow-sm font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Switch to English"
                aria-label="English"
              >
                <span>🇬🇧</span>
                <span>ENG</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('it')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  language === 'it'
                    ? 'bg-white text-sage-900 shadow-sm font-bold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Passa a Italiano"
                aria-label="Italiano"
              >
                <span>🇮🇹</span>
                <span>IT</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-cream-200 transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
