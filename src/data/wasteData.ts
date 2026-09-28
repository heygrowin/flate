import { WasteCategoryInfo, DayWasteSchedule } from '@/types';

export const WASTE_CATEGORIES: Record<string, WasteCategoryInfo> = {
  organic: {
    id: 'organic',
    name_en: 'Organic Waste',
    name_it: 'Umido / Organico',
    color: '#8D5338',
    borderColor: '#D7B9A5',
    badgeColor: 'bg-[#8D5338] text-white',
    bgColor: 'bg-[#F7F0EB]',
    bin_color: 'Marrone / Brown',
    icon: 'Apple',
    short_desc_en: 'Food waste, vegetable and fruit scraps, coffee grounds, tea bags.',
    short_desc_it: 'Scarti di cucina, bucce di frutta e verdura, fondi di caffè, bustine di tè.',
    what_goes_en: [
      'Fruit & vegetable peels and scraps',
      'Food leftovers, meat, fish, small bones',
      'Coffee grounds and paper tea bags',
      'Eggshells, bread, pasta, and rice scraps',
      'Food-soiled paper napkins and paper towels',
      'Small houseplants cuttings and wilted flowers',
    ],
    what_goes_it: [
      'Bucce e scarti di frutta e verdura',
      'Avanzi di cibo cotti o crudi, carne, pesce',
      'Fondi di caffè e bustine di tè',
      'Gusci d’uovo, pane, riso e pasta',
      'Tovaglioli di carta sporchi di cibo',
      'Piccoli scarti vegetali, foglie e fiori recisi',
    ],
    what_not_goes_en: [
      'Normal plastic bags or packaging',
      'Glass, metals, aluminum foil',
      'Cigarette butts and ash',
      'Diapers and sanitary pads',
      'Pet litter (unless certified compostable)',
      'Medicines and chemicals',
    ],
    what_not_goes_it: [
      'Sacchetti di plastica tradizionale',
      'Vetro, metalli, fogli di alluminio',
      'Mozziconi di sigaretta e cenere',
      'Pannolini e assorbenti',
      'Lettiere per animali non compostabili',
      'Medicinali e prodotti chimici',
    ],
    how_to_prepare_en: [
      'Always use certified biodegradable & compostable bags (Mater-Bi).',
      'Close and tie the bag securely.',
      'Place inside the brown household organic bin.',
    ],
    how_to_prepare_it: [
      'Usa solo sacchetti biodegradabili e compostabili certificati (Mater-Bi).',
      'Chiudi bene il sacchetto prima di esporlo.',
      'Riponi il sacchetto nel mastello marrone.',
    ],
    collection_time_en: 'Put out the evening before collection between 20:00 and 22:00.',
    collection_time_it: 'Esporre la sera precedente il giorno di raccolta tra le 20:00 e le 22:00.',
  },
  paper: {
    id: 'paper',
    name_en: 'Paper & Cardboard',
    name_it: 'Carta e Cartone',
    color: '#1D4ED8',
    borderColor: '#BFDBFE',
    badgeColor: 'bg-[#2563EB] text-white',
    bgColor: 'bg-[#EFF6FF]',
    bin_color: 'Blu / Blue',
    icon: 'Newspaper',
    short_desc_en: 'Newspapers, boxes, paper bags, clean cartons, egg cartons.',
    short_desc_it: 'Giornali, riviste, scatoloni, sacchetti di carta, cartoni puliti.',
    what_goes_en: [
      'Newspapers, magazines, flyers, notebooks',
      'Cardboard boxes and corrugated packaging',
      'Clean paper bags and egg cartons',
      'Clean pizza boxes (free of grease and cheese residue)',
      'Beverage cartons (Tetra Pak) if rinsed',
    ],
    what_goes_it: [
      'Giornali, riviste, volantini, quaderni',
      'Scatoloni di cartone e imballaggi in carta',
      'Sacchetti di carta puliti e cartoni delle uova',
      'Cartoni della pizza SOLO SE PULITI (senza residui di cibo)',
      'Cartoni per bevande tipo Tetra Pak sciacquati',
    ],
    what_not_goes_en: [
      'Greasy or dirty pizza boxes (put in Non-recyclable)',
      'Thermal store receipts (carta chimica/termica)',
      'Wax paper, laminated paper, baking paper',
      'Dirty paper tissues or napkins (put in Organic)',
      'Plastic folders or adhesive tape',
    ],
    what_not_goes_it: [
      'Cartoni della pizza unti o con formaggio (vanno nell’indifferenziato)',
      'Scontrini fiscali (carta termica)',
      'Carta forno, carta oleata o plastificata',
      'Fazzoletti e tovaglioli usati (vanno nell’umido)',
      'Nastro adesivo e fascette di plastica',
    ],
    how_to_prepare_en: [
      'Flatten and compress cardboard boxes to save space.',
      'Remove adhesive tape and plastic wrapping.',
      'Do not place in plastic bags! Use paper bags or loose in the blue bin.',
    ],
    how_to_prepare_it: [
      'Appiattisci e riduci il volume degli scatoloni.',
      'Rimuovi nastro adesivo e parti in plastica.',
      'Non usare sacchetti di plastica! Usa sacchi di carta o esponi direttamente nel mastello blu.',
    ],
    collection_time_en: 'Put out Monday evening between 20:00 and 22:00 for Tuesday collection.',
    collection_time_it: 'Esporre il lunedì sera tra le 20:00 e le 22:00 per il ritiro del martedì.',
  },
  plastic: {
    id: 'plastic',
    name_en: 'Plastic & Metals',
    name_it: 'Plastica e Metalli',
    color: '#B45309',
    borderColor: '#FDE68A',
    badgeColor: 'bg-[#D97706] text-white',
    bgColor: 'bg-[#FEFCE8]',
    bin_color: 'Giallo / Yellow',
    icon: 'Package',
    short_desc_en: 'Plastic bottles, cans, food tins, clean plastic trays, wrappers.',
    short_desc_it: 'Bottiglie di plastica, lattine, vaschette pulite, scatolette di metallo.',
    what_goes_en: [
      'Plastic water and drink bottles',
      'Aluminum beverage cans (soda, beer)',
      'Tin food cans (tuna, tomato cans, pet food)',
      'Clean plastic containers, shampoo & detergent bottles',
      'Clean food trays (plastic or polystyrene)',
      'Clean aluminum foil and trays',
      'Plastic bags and snack packaging',
    ],
    what_goes_it: [
      'Bottiglie di acqua e bibite in plastica',
      'Lattine per bevande in alluminio',
      'Barattoli e scatolette metalliche (tonno, pomodoro)',
      'Flaconi per detersivi, saponi e bagnoschiuma',
      'Vaschette per alimenti in plastica o polistirolo pulite',
      'Fogli e vaschette in alluminio',
      'Sacchetti e buste di plastica per la spesa',
    ],
    what_not_goes_en: [
      'Hard plastic toys, hangers, buckets, basins',
      'Pens, toothbrushes, razors',
      'Electronics, cables, batteries',
      'Rubber items and kitchen utensils',
      'Glass bottles or ceramic',
    ],
    what_not_goes_it: [
      'Giocattoli, bacinelle, grucce, secchielli in plastica rigida',
      'Penne, spazzolini da denti, lamette',
      'Apparecchi elettronici, cavi, pile',
      'Oggetti in gomma o utensili da cucina',
      'Bottiglie di vetro o ceramica',
    ],
    how_to_prepare_en: [
      'Empty completely and give a quick rinse.',
      'Crush plastic bottles horizontally to reduce volume.',
      'Place in the yellow bag or yellow bin.',
    ],
    how_to_prepare_it: [
      'Svuota completamente e sciacqua velocemente i contenitori.',
      'Schiaccia le bottiglie in senso orizzontale.',
      'Inserisci nei sacchi semitrasparenti o nel mastello giallo.',
    ],
    collection_time_en: 'Put out Tuesday evening between 20:00 and 22:00 for Wednesday collection.',
    collection_time_it: 'Esporre il martedì sera tra le 20:00 e le 22:00 per il ritiro del mercoledì.',
  },
  glass: {
    id: 'glass',
    name_en: 'Glass',
    name_it: 'Vetro',
    color: '#15803D',
    borderColor: '#BBF7D0',
    badgeColor: 'bg-[#16A34A] text-white',
    bgColor: 'bg-[#F0FDF4]',
    bin_color: 'Verde / Green',
    icon: 'Wine',
    short_desc_en: 'Glass bottles, glass jars, food jars (jam, sauce).',
    short_desc_it: 'Bottiglie in vetro, barattoli di conserve, vasetti in vetro.',
    what_goes_en: [
      'Glass bottles (wine, water, beer, oil)',
      'Glass food jars (sauces, jam, pickles)',
      'Glass perfume or cosmetic bottles (empty)',
    ],
    what_goes_it: [
      'Bottiglie in vetro (vino, birra, olio, succhi)',
      'Vasetti e barattoli per conserve, sughi e marmellate',
      'Boccette di profumo e cosmetici in vetro vuote',
    ],
    what_not_goes_en: [
      'Ceramic cups, plates, porcelain, mugs',
      'Crystal glasses and decorative glassware',
      'Mirrors and window glass',
      'Light bulbs and neon tubes',
      'Oven dishes (Pyrex)',
      'Metal or plastic caps (put in Plastic/Metals)',
    ],
    what_not_goes_it: [
      'Tazzine, piatti di ceramica o porcellana',
      'Calici e bicchieri di cristallo',
      'Specchi e vetri delle finestre',
      'Lampadine e tubi al neon',
      'Pirofile da forno (Pyrex)',
      'Tappi metallici o in plastica (vanno nella plastica/metalli)',
    ],
    how_to_prepare_en: [
      'Rinse glass jars and bottles to remove food remnants.',
      'Remove metal or plastic caps (place them in Plastic & Metals).',
      'Place loose into the green bin — NEVER in a plastic bag.',
    ],
    how_to_prepare_it: [
      'Svuota e sciacqua i contenitori.',
      'Togli tappi e coperchi (vanno con plastica e metalli).',
      'Inserisci il vetro sfuso nel mastello verde — MAI chiuderlo in buste di plastica.',
    ],
    collection_time_en: 'Put out Sunday evening between 20:00 and 22:00 for Monday collection.',
    collection_time_it: 'Esporre la domenica sera tra le 20:00 e le 22:00 per il ritiro del lunedì.',
  },
  residual: {
    id: 'residual',
    name_en: 'Non-recyclable / Residual',
    name_it: 'Indifferenziato / Secco Residuo',
    color: '#374151',
    borderColor: '#E5E7EB',
    badgeColor: 'bg-[#4B5563] text-white',
    bgColor: 'bg-[#F3F4F6]',
    bin_color: 'Grigio / Grey',
    icon: 'Trash2',
    short_desc_en: 'Everything that cannot be recycled (clean thoroughly before deciding).',
    short_desc_it: 'Tutto ciò che non può essere riciclato nelle altre raccolte.',
    what_goes_en: [
      'Thermal cash register receipts (scontrini)',
      'Greasy, cheese-stained dirty pizza boxes',
      'Toothbrushes, razors, plastic pens, markers',
      'Dust, sweepings, vacuum cleaner bags',
      'Sponges, rubber gloves, broken toys',
      'Diapers and feminine hygiene items',
      'Broken ceramic, mirrors, porcelain dishes',
    ],
    what_goes_it: [
      'Scontrini della cassa (carta termica)',
      'Cartoni della pizza unti e sporchi di formaggio',
      'Spazzolini da denti, lamette, penne, pennarelli',
      'Polvere da spazzamento, sacchetti aspirapolvere',
      'Spugne, guanti in gomma, giocattoli rotti',
      'Pannolini e assorbenti igienici',
      'Cocci di ceramica, porcellana e piccoli specchi',
    ],
    what_not_goes_en: [
      'Any recyclable waste (organic, paper, plastic, metal, glass)',
      'Batteries and electronic devices (RAEE)',
      'Expired medicines and hazardous waste',
      'Building rubble or construction debris',
    ],
    what_not_goes_it: [
      'Tutti i materiali riciclabili (organico, carta, plastica, metalli, vetro)',
      'Pile scariche e piccoli elettrodomestici (RAEE)',
      'Medicinali scaduti e rifiuti tossici o infiammabili',
      'Macerie e calcinacci',
    ],
    how_to_prepare_en: [
      'Ensure no recyclables are mixed in.',
      'Place in standard closed household garbage bags.',
      'Put inside the grey residual bin.',
    ],
    how_to_prepare_it: [
      'Assicurati che non vi siano materiali riciclabili all’interno.',
      'Usa normali sacchi per rifiuti ben chiusi.',
      'Inserisci il sacco nel mastello grigio.',
    ],
    collection_time_en: 'Put out Thursday evening between 20:00 and 22:00 for Friday collection.',
    collection_time_it: 'Esporre il giovedì sera tra le 20:00 e le 22:00 per il ritiro del venerdì.',
  },
};

/**
 * Official Messina "Area Nord" Weekly Schedule
 * Verified strictly with official municipal rules:
 * - MON: Organic + Glass
 * - TUE: Paper & Cardboard
 * - WED: Plastic & Metals
 * - THU: Organic
 * - FRI: Non-recyclable / Residual
 * - SAT: Organic
 * - SUN: No collection
 */
export const WEEKLY_SCHEDULE: DayWasteSchedule[] = [
  {
    day_index: 1,
    day_code: 'MON',
    day_name_en: 'Monday',
    day_name_it: 'Lunedì',
    categories: ['organic', 'glass'],
    notes_en: 'Organic and Glass are collected on Monday morning. Put bins out Sunday night (20:00–22:00).',
    notes_it: 'Umido e Vetro vengono ritirati il lunedì mattina. Esporre i mastelli domenica sera (20:00–22:00).',
  },
  {
    day_index: 2,
    day_code: 'TUE',
    day_name_en: 'Tuesday',
    day_name_it: 'Martedì',
    categories: ['paper'],
    notes_en: 'Paper & Cardboard collected on Tuesday morning. Put out Monday night (20:00–22:00).',
    notes_it: 'Carta e Cartone ritirati martedì mattina. Esporre lunedì sera (20:00–22:00).',
  },
  {
    day_index: 3,
    day_code: 'WED',
    day_name_en: 'Wednesday',
    day_name_it: 'Mercoledì',
    categories: ['plastic'],
    notes_en: 'Plastic & Metals collected Wednesday morning. Put out Tuesday night (20:00–22:00).',
    notes_it: 'Plastica e Metalli ritirati mercoledì mattina. Esporre martedì sera (20:00–22:00).',
  },
  {
    day_index: 4,
    day_code: 'THU',
    day_name_en: 'Thursday',
    day_name_it: 'Giovedì',
    categories: ['organic'],
    notes_en: 'Organic waste collected Thursday morning. Put out Wednesday night (20:00–22:00).',
    notes_it: 'Umido / Organico ritirato giovedì mattina. Esporre mercoledì sera (20:00–22:00).',
  },
  {
    day_index: 5,
    day_code: 'FRI',
    day_name_en: 'Friday',
    day_name_it: 'Venerdì',
    categories: ['residual'],
    notes_en: 'Non-recyclable / Residual waste collected Friday morning. Put out Thursday night (20:00–22:00).',
    notes_it: 'Indifferenziato / Secco ritirato venerdì mattina. Esporre giovedì sera (20:00–22:00).',
  },
  {
    day_index: 6,
    day_code: 'SAT',
    day_name_en: 'Saturday',
    day_name_it: 'Sabato',
    categories: ['organic'],
    notes_en: 'Organic waste collected Saturday morning. Put out Friday night (20:00–22:00).',
    notes_it: 'Umido / Organico ritirato sabato mattina. Esporre venerdì sera (20:00–22:00).',
  },
  {
    day_index: 0,
    day_code: 'SUN',
    day_name_en: 'Sunday',
    day_name_it: 'Domenica',
    categories: [],
    notes_en: 'No municipal collection on Sunday. Please remember Sunday evening to put out Monday bins (Organic + Glass)!',
    notes_it: 'Nessuna raccolta prevista per la domenica. Ricorda domenica sera di esporre Umido e Vetro per lunedì!',
  },
];

export function getTodaySchedule(targetDate: Date = new Date()): DayWasteSchedule {
  const day = targetDate.getDay(); // 0 is Sunday, 1 is Monday...
  return WEEKLY_SCHEDULE.find((s) => s.day_index === day) || WEEKLY_SCHEDULE[0];
}

export function getNextCollection(targetDate: Date = new Date()): { day: DayWasteSchedule; categories: WasteCategoryInfo[] } {
  const current = getTodaySchedule(targetDate);
  if (current.categories.length > 0) {
    return {
      day: current,
      categories: current.categories.map((c) => WASTE_CATEGORIES[c]).filter(Boolean),
    };
  }
  // If Sunday (no collection today), Monday is next
  const monday = WEEKLY_SCHEDULE.find((s) => s.day_index === 1)!;
  return {
    day: monday,
    categories: monday.categories.map((c) => WASTE_CATEGORIES[c]).filter(Boolean),
  };
}
