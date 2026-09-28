'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  Roommate,
  CleaningTurn,
  CleaningHistory,
  HouseInfo,
  HouseRule,
  Contact,
} from '@/types';
import {
  INITIAL_ROOMMATES,
  INITIAL_HOUSE_RULES,
  INITIAL_HOUSE_INFO,
  INITIAL_CONTACTS,
} from '@/data/houseData';
import { translations } from '@/lib/i18n';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

interface HouseContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  roommates: Roommate[];
  currentTurn: CleaningTurn | null;
  isCleanedThisWeek: boolean;
  lastCleanedAt: string | null;
  completedByName: string | null;
  upcomingTurns: CleaningTurn[];
  cleaningHistory: CleaningHistory[];
  houseInfo: HouseInfo;
  houseRules: HouseRule[];
  contacts: Contact[];
  addRoommate: (data: { name: string; joined_at: string; room?: string }) => Promise<Roommate>;
  removeRoommate: (id: string) => Promise<void>;
  markCleaningCompleted: () => Promise<{ success: boolean; completedTurn: CleaningTurn; whatsappMessage: string; whatsappUrl: string }>;
  unmarkCleaningCompleted: () => Promise<void>;
}

const HouseContext = createContext<HouseContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'cozy_flatmate_';

// Helper to calculate target Sunday date (YYYY-MM-DD)
function getTargetSunday(offsetWeeks = 0, baseDate = new Date()): string {
  const d = new Date(baseDate);
  const day = d.getDay(); // 0 is Sunday, 1 is Monday...
  const diffToSunday = (day === 0 ? 0 : 7 - day) + offsetWeeks * 7;
  d.setDate(d.getDate() + diffToSunday);
  return d.toISOString().split('T')[0];
}

export function HouseProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [roommates, setRoommates] = useState<Roommate[]>(INITIAL_ROOMMATES);
  const [turnIndex, setTurnIndex] = useState<number>(0);
  const [isCleanedThisWeek, setIsCleanedThisWeek] = useState<boolean>(false);
  const [lastCleanedAt, setLastCleanedAt] = useState<string | null>(null);
  const [completedByName, setCompletedByName] = useState<string | null>(null);
  const [cleaningHistory, setCleaningHistory] = useState<CleaningHistory[]>([
    {
      id: 'hist-1',
      roommate_id: 'roommate-5',
      roommate_name: 'Luca',
      completed_at: '2026-09-20T18:30:00Z',
      cleaning_date: '2026-09-20',
    },
    {
      id: 'hist-2',
      roommate_id: 'roommate-4',
      roommate_name: 'Kaisa',
      completed_at: '2026-09-13T17:15:00Z',
      cleaning_date: '2026-09-13',
    },
    {
      id: 'hist-3',
      roommate_id: 'roommate-3',
      roommate_name: 'Maria',
      completed_at: '2026-09-06T19:00:00Z',
      cleaning_date: '2026-09-06',
    },
  ]);
  const [houseInfo] = useState<HouseInfo>(INITIAL_HOUSE_INFO);
  const [houseRules] = useState<HouseRule[]>(INITIAL_HOUSE_RULES);
  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}lang`);
      if (savedLang === 'en' || savedLang === 'it') {
        setLanguageState(savedLang);
      } else {
        const navLang = navigator.language.toLowerCase();
        if (navLang.startsWith('it')) {
          setLanguageState('it');
        }
      }

      const savedRoommates = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}roommates`);
      if (savedRoommates) {
        setRoommates(JSON.parse(savedRoommates));
      }

      const savedTurnIndex = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}turn_index`);
      if (savedTurnIndex !== null) {
        setTurnIndex(parseInt(savedTurnIndex, 10));
      }

      const savedCleaned = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}cleaned_this_week`);
      if (savedCleaned !== null) {
        setIsCleanedThisWeek(savedCleaned === 'true');
      }

      const savedLastCleanedAt = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}last_cleaned_at`);
      if (savedLastCleanedAt) {
        setLastCleanedAt(savedLastCleanedAt);
      }

      const savedCompletedBy = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}completed_by`);
      if (savedCompletedBy) {
        setCompletedByName(savedCompletedBy);
      }

      const savedHistory = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}history`);
      if (savedHistory) {
        setCleaningHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.warn('LocalStorage error', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 2. Firebase Firestore Real-Time Sync
  useEffect(() => {
    if (!db) return;

    // Listen to roommates collection
    try {
      const roommatesCol = collection(db, 'roommates');
      const unsubscribe = onSnapshot(
        roommatesCol,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Roommate[] = [];
            snapshot.forEach((docSnap) => {
              list.push(docSnap.data() as Roommate);
            });
            if (list.length > 0) {
              setRoommates(list);
            }
          }
        },
        (error) => {
          console.warn('Firestore roommates sync error (running local mode):', error.message);
        }
      );

      // Listen to cleaning state doc
      const stateDocRef = doc(db, 'app_state', 'cleaning');
      const unsubState = onSnapshot(
        stateDocRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (typeof data.turnIndex === 'number') setTurnIndex(data.turnIndex);
            if (typeof data.isCleanedThisWeek === 'boolean') setIsCleanedThisWeek(data.isCleanedThisWeek);
            if (data.lastCleanedAt) setLastCleanedAt(data.lastCleanedAt);
            if (data.completedByName) setCompletedByName(data.completedByName);
          }
        },
        (error) => {
          console.warn('Firestore cleaning state error:', error.message);
        }
      );

      return () => {
        unsubscribe();
        unsubState();
      };
    } catch (err) {
      console.warn('Firestore initialization notice:', err);
    }
  }, []);

  // 3. LocalStorage persistence
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}lang`, language);
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}roommates`, JSON.stringify(roommates));
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}turn_index`, turnIndex.toString());
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}cleaned_this_week`, isCleanedThisWeek.toString());
      if (lastCleanedAt) localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}last_cleaned_at`, lastCleanedAt);
      if (completedByName) localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}completed_by`, completedByName);
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}history`, JSON.stringify(cleaningHistory));
    } catch (e) {
      console.warn('Error saving to LocalStorage', e);
    }
  }, [language, roommates, turnIndex, isCleanedThisWeek, lastCleanedAt, completedByName, cleaningHistory, isInitialized]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Active roommates
  const activeRoommates = roommates.filter((r) => r.active);

  // Sunday cleaning dates
  const currentSunday = getTargetSunday(0);

  const currentRoommate = activeRoommates.length > 0
    ? activeRoommates[turnIndex % activeRoommates.length]
    : null;

  const currentTurn: CleaningTurn | null = currentRoommate
    ? {
        id: `turn-sunday-${currentSunday}`,
        roommate_id: currentRoommate.id,
        roommate_name: currentRoommate.name,
        cleaning_date: currentSunday,
        status: isCleanedThisWeek ? 'completed' : 'pending',
        completed_at: isCleanedThisWeek && lastCleanedAt ? lastCleanedAt : undefined,
        completed_by_name: isCleanedThisWeek && completedByName ? completedByName : undefined,
      }
    : null;

  // Upcoming Sunday turns
  const upcomingTurns: CleaningTurn[] = [];
  if (activeRoommates.length > 0) {
    for (let i = 1; i <= 4; i++) {
      const nextSunday = getTargetSunday(i);
      const nextRoommate = activeRoommates[(turnIndex + i) % activeRoommates.length];
      upcomingTurns.push({
        id: `turn-sunday-${nextSunday}`,
        roommate_id: nextRoommate.id,
        roommate_name: nextRoommate.name,
        cleaning_date: nextSunday,
        status: 'pending',
      });
    }
  }

  // Add Roommate
  const addRoommate = async (data: { name: string; joined_at: string; room?: string }) => {
    const colors = ['#C85A32', '#3D664B', '#D97706', '#2563EB', '#7C3AED', '#059669', '#DB2777'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newRoommate: Roommate = {
      id: `roommate-${Date.now()}`,
      name: data.name.trim(),
      joined_at: data.joined_at || new Date().toISOString().split('T')[0],
      room: data.room ? data.room.trim() : undefined,
      active: true,
      avatar_color: randomColor,
      created_at: new Date().toISOString(),
    };

    setRoommates((prev) => [...prev, newRoommate]);

    // Save to Firestore
    if (db) {
      try {
        await setDoc(doc(db, 'roommates', newRoommate.id), newRoommate);
      } catch (err) {
        console.warn('Firestore save error:', err);
      }
    }

    return newRoommate;
  };

  // Remove Roommate
  const removeRoommate = async (id: string) => {
    setRoommates((prev) => prev.filter((r) => r.id !== id));

    if (db) {
      try {
        await deleteDoc(doc(db, 'roommates', id));
      } catch (err) {
        console.warn('Firestore delete error:', err);
      }
    }
  };

  // Mark Cleaning Completed
  const markCleaningCompleted = async () => {
    if (!currentRoommate) {
      throw new Error('No active roommate found for current turn');
    }

    const now = new Date();
    const isoString = now.toISOString();

    const newHistoryItem: CleaningHistory = {
      id: `hist-${Date.now()}`,
      roommate_id: currentRoommate.id,
      roommate_name: currentRoommate.name,
      completed_at: isoString,
      cleaning_date: currentSunday,
    };

    setIsCleanedThisWeek(true);
    setLastCleanedAt(isoString);
    setCompletedByName(currentRoommate.name);
    setCleaningHistory((prev) => [newHistoryItem, ...prev]);

    // Prepare WhatsApp Message
    const formattedDate = now.toLocaleDateString(language === 'it' ? 'it-IT' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString(language === 'it' ? 'it-IT' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const template = translations[language].cleaning.whatsappTemplate;
    const whatsappMessage = template
      .replace('{name}', currentRoommate.name)
      .replace('{date}', formattedDate)
      .replace('{time}', formattedTime);

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

    // Sync to Firestore
    if (db) {
      try {
        await setDoc(doc(db, 'app_state', 'cleaning'), {
          turnIndex,
          isCleanedThisWeek: true,
          lastCleanedAt: isoString,
          completedByName: currentRoommate.name,
          updatedAt: isoString,
        });

        await setDoc(doc(db, 'cleaning_history', newHistoryItem.id), newHistoryItem);
      } catch (err) {
        console.warn('Firestore sync error:', err);
      }
    }

    return {
      success: true,
      completedTurn: currentTurn!,
      whatsappMessage,
      whatsappUrl,
    };
  };

  // Unmark / Advance to next turn
  const unmarkCleaningCompleted = async () => {
    setIsCleanedThisWeek(false);
    setLastCleanedAt(null);
    setCompletedByName(null);
    setTurnIndex((prev) => prev + 1);

    if (db) {
      try {
        await setDoc(doc(db, 'app_state', 'cleaning'), {
          turnIndex: turnIndex + 1,
          isCleanedThisWeek: false,
          lastCleanedAt: null,
          completedByName: null,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Firestore unmark error:', err);
      }
    }
  };

  return (
    <HouseContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        roommates,
        currentTurn,
        isCleanedThisWeek,
        lastCleanedAt,
        completedByName,
        upcomingTurns,
        cleaningHistory,
        houseInfo,
        houseRules,
        contacts,
        addRoommate,
        removeRoommate,
        markCleaningCompleted,
        unmarkCleaningCompleted,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}

export function useHouse() {
  const context = useContext(HouseContext);
  if (!context) {
    throw new Error('useHouse must be used within a HouseProvider');
  }
  return context;
}
