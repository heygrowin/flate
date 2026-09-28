export type Language = 'en' | 'it';

export interface Roommate {
  id: string;
  name: string;
  room?: string;
  joined_at: string; // ISO date string: YYYY-MM-DD
  active: boolean;
  avatar_color?: string;
  created_at?: string;
}

export interface CleaningTurn {
  id: string;
  roommate_id: string;
  roommate_name: string;
  cleaning_date: string; // Target Sunday cleaning date (YYYY-MM-DD)
  status: 'pending' | 'completed';
  completed_at?: string; // ISO timestamp when cleaned
  completed_by_name?: string;
}

export interface CleaningHistory {
  id: string;
  roommate_id: string;
  roommate_name: string;
  completed_at: string; // ISO timestamp
  cleaning_date: string;
}

export type WasteCategoryId = 'organic' | 'paper' | 'plastic' | 'glass' | 'residual' | 'none';

export interface WasteCategoryInfo {
  id: WasteCategoryId;
  name_en: string;
  name_it: string;
  color: string;
  borderColor: string;
  badgeColor: string;
  bgColor: string;
  icon: string;
  short_desc_en: string;
  short_desc_it: string;
  what_goes_en: string[];
  what_goes_it: string[];
  what_not_goes_en: string[];
  what_not_goes_it: string[];
  how_to_prepare_en: string[];
  how_to_prepare_it: string[];
  collection_time_en: string;
  collection_time_it: string;
  bin_color: string;
}

export interface DayWasteSchedule {
  day_index: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  day_code: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  day_name_en: string;
  day_name_it: string;
  categories: WasteCategoryId[];
  notes_en?: string;
  notes_it?: string;
}

export interface HouseRule {
  id: string;
  category: 'common' | 'cleaning' | 'waste' | 'noise' | 'kitchen' | 'bathroom' | 'safety';
  icon: string;
  title_en: string;
  title_it: string;
  description_en: string;
  description_it: string;
}

export interface HouseInfo {
  address: string;
  building_floor: string;
  intercom_name: string;
  google_maps_url: string;
  quiet_hours: string;
  notes_en?: string;
  notes_it?: string;
  updated_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  role_en: string;
  role_it: string;
  phone: string;
  whatsapp?: string;
  emergency: boolean;
  icon: string;
  notes_en?: string;
  notes_it?: string;
}
