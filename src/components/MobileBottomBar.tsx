'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trash2, Sparkles, BookOpen, Info } from 'lucide-react';
import { useHouse } from '@/lib/store';

export function MobileBottomBar() {
  const { t } = useHouse();
  const pathname = usePathname();

  const links = [
    { href: '/', label: t.nav.home, icon: Home },
    { href: '/waste', label: t.nav.waste.split(' ')[0], icon: Trash2 },
    { href: '/cleaning', label: t.nav.cleaning.split(' ')[0], icon: Sparkles },
    { href: '/rules', label: t.nav.rules.split(' ')[0], icon: BookOpen },
    { href: '/info', label: t.nav.info.split(' ')[0], icon: Info },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFBF7]/95 backdrop-blur-md border-t border-cream-200/90 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-sage-700 font-bold scale-105'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-sage-100 text-sage-800' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
