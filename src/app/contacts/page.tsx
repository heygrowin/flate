'use client';

import React from 'react';
import {
  PhoneCall,
  Home,
  MessageCircle,
  Phone,
  ShieldAlert,
  Stethoscope,
  Cross,
  Heart,
} from 'lucide-react';
import { useHouse } from '@/lib/store';

const CONTACT_ICONS: Record<string, any> = {
  PhoneCall,
  Home,
  Stethoscope,
  Cross,
};

export default function ContactsPage() {
  const { language, t, contacts } = useHouse();

  const emergencyContact = contacts.find((c) => c.emergency) || contacts[0];
  const regularContacts = contacts.filter((c) => !c.emergency);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{t.contacts.pageTitle}</span>
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-4xl text-stone-900 tracking-tight">
          {t.contacts.pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl">
          {t.contacts.pageSubtitle}
        </p>
      </div>

      {/* 1. Primary Italy Emergency Number (112) Card */}
      <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-warm-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-extrabold text-rose-200 block">
              {t.contacts.emergencyCard}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-serif font-black text-4xl sm:text-5xl tracking-tight">
                112
              </span>
              <span className="text-xs sm:text-sm text-rose-100 max-w-xs leading-tight">
                {t.contacts.emergencyDesc}
              </span>
            </div>
          </div>

          <a
            href="tel:112"
            className="self-start sm:self-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-red-700 font-bold text-sm shadow-soft transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>{t.contacts.call112Btn}</span>
          </a>
        </div>

        <p className="text-xs text-rose-100/90 pt-1 border-t border-white/20">
          {language === 'it'
            ? 'Numero unico gratuito valido in tutta Italia e in Unione Europea. Operatori multilingue disponibili.'
            : 'Toll-free emergency number valid across Italy and the EU. Multilingual operators available 24/7.'}
        </p>
      </div>

      {/* 2. Landlord & House Owner Card */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-xl text-stone-900">
          {t.contacts.landlordCard}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {regularContacts.map((contact) => {
            const role = language === 'it' ? contact.role_it : contact.role_en;
            const notes = language === 'it' ? contact.notes_it : contact.notes_en;
            const Icon = CONTACT_ICONS[contact.icon] || Home;

            return (
              <div
                key={contact.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-cream-200/90 shadow-warm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-2">
                    <div className="w-11 h-11 rounded-2xl bg-cream-100 text-stone-700 flex items-center justify-center shrink-0 shadow-soft">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                        {contact.name}
                      </h3>
                      <p className="text-xs text-stone-500">{role}</p>
                    </div>
                  </div>

                  {notes && (
                    <p className="text-xs text-stone-600 bg-cream-50/70 p-3 rounded-2xl border border-cream-200/60 leading-relaxed mt-3">
                      {notes}
                    </p>
                  )}
                </div>

                {/* Call & WhatsApp Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t.contacts.callBtn}</span>
                  </a>

                  {contact.whatsapp && (
                    <a
                      href={`https://wa.me/${contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-soft transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
