/**
 * letscalculate.in - Main Application Controller & Router
 * State management, URL hash routing, DOM rendering, live search,
 * favorites, history drawer, and event delegation.
 */

// SVG Icon Helper
// SVG Icon Helper
function getIconSvg(iconName, size = 20) {
  const icons = {
    'wallet': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`,
    'jewellery': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/><circle cx="19.5" cy="3.5" r="1.5" fill="#eab308" stroke="none"/><path d="M19.5 1v5M17 3.5h5" stroke="#fbbf24" stroke-width="1.5"/></svg>`,
    'gem': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/><circle cx="19.5" cy="3.5" r="1.5" fill="#eab308" stroke="none"/><path d="M19.5 1v5M17 3.5h5" stroke="#fbbf24" stroke-width="1.5"/></svg>`,
    'square-root': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h2l4 8 4-16h8"/></svg>`,
    'heart-pulse': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>`,
    'calendar-clock': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><circle cx="16" cy="16" r="6"/><path d="M16 14v2l1 1"/></svg>`,
    'refresh-cw': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
    'coffee': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`,
    'trending-up': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    'search': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    'calculator': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
    'star': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    'history': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>`,
    'arrow-right': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
    'arrow-left': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
    'rotate-ccw': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
    'chevron-down': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    'copy': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    'share-2': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`,
    'printer': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`,
    'sun': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    'moon': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    'x': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    'check': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    'alert-triangle': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
    'user': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    'lock': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    'mail': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    'log-out': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
    'sparkles': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    'shield-check': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    'phone': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    'download': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    'indian-rupee': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3a4 4 0 0 0 0-8"/></svg>`,
        'building': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
    'layers': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5"/><path d="m22 17.5-9.17 4.16a2 2 0 0 1-1.66 0L2 17.5"/></svg>`,
    'folder-check': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="m9 13 2 2 4-4"/></svg>`,
    'award': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    'activity': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    'rupee': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3a4 4 0 0 0 0-8"/></svg>`
  };
  return icons[iconName] || icons['calculator'];
}

// Migration: clear any legacy or demo/guest sessions from user's browser
try {
  const currentAuthV = localStorage.getItem('letscalculate_auth_v');
  const storedUserStr = localStorage.getItem('letscalculate_user');
  if (currentAuthV !== '2.3' || (storedUserStr && (storedUserStr.includes('demo@') || storedUserStr.includes('guest@') || storedUserStr.includes('Demo User') || storedUserStr.includes('Guest')))) {
    localStorage.removeItem('letscalculate_user');
    localStorage.setItem('letscalculate_auth_v', '2.3');
  }
} catch (e) { }

// Country & Currency Data Matrix (22 Countries: Currency‑Country‑Symbol)
const currencyMap = {
  "INR‑INDIA‑₹": "₹",
  "USD‑UNITED STATES‑$": "$",
  "GBP‑UNITED KINGDOM‑£": "£",
  "EUR‑EUROPE‑€": "€",
  "JPY‑JAPAN‑¥": "¥",
  "AUD‑AUSTRALIA‑A$": "A$",
  "CAD‑CANADA‑C$": "C$",
  "AED‑UNITED ARAB EMIRATES‑د.إ": "د.إ",
  "CHF‑SWITZERLAND‑CHF": "CHF",
  "CNY‑CHINA‑¥": "¥",
  "SGD‑SINGAPORE‑S$": "S$",
  "HKD‑HONG KONG‑HK$": "HK$",
  "NZD‑NEW ZEALAND‑NZ$": "NZ$",
  "ZAR‑SOUTH AFRICA‑R": "R",
  "BRL‑BRAZIL‑R$": "R$",
  "MXN‑MEXICO‑$": "$",
  "SEK‑SWEDEN‑kr": "kr",
  "NOK‑NORWAY‑kr": "kr",
  "DKK‑DENMARK‑kr": "kr",
  "TRY‑TURKEY‑₺": "₺",
  "RUB‑RUSSIA‑₽": "₽",
  "KRW‑SOUTH KOREA‑₩": "₩"
};

const countryConfig = {
  "INR‑INDIA‑₹": { code: "INR", name: "India", flag: "🇮🇳", currency: "₹", locale: "en-IN" },
  "USD‑UNITED STATES‑$": { code: "USD", name: "United States", flag: "🇺🇸", currency: "$", locale: "en-US" },
  "GBP‑UNITED KINGDOM‑£": { code: "GBP", name: "United Kingdom", flag: "🇬🇧", currency: "£", locale: "en-GB" },
  "EUR‑EUROPE‑€": { code: "EUR", name: "Europe", flag: "🇪🇺", currency: "€", locale: "de-DE" },
  "JPY‑JAPAN‑¥": { code: "JPY", name: "Japan", flag: "🇯🇵", currency: "¥", locale: "ja-JP" },
  "AUD‑AUSTRALIA‑A$": { code: "AUD", name: "Australia", flag: "🇦🇺", currency: "A$", locale: "en-AU" },
  "CAD‑CANADA‑C$": { code: "CAD", name: "Canada", flag: "🇨🇦", currency: "C$", locale: "en-CA" },
  "AED‑UNITED ARAB EMIRATES‑د.إ": { code: "AED", name: "United Arab Emirates", flag: "🇦🇪", currency: "د.إ", locale: "ar-AE" },
  "CHF‑SWITZERLAND‑CHF": { code: "CHF", name: "Switzerland", flag: "🇨🇭", currency: "CHF", locale: "de-CH" },
  "CNY‑CHINA‑¥": { code: "CNY", name: "China", flag: "🇨🇳", currency: "¥", locale: "zh-CN" },
  "SGD‑SINGAPORE‑S$": { code: "SGD", name: "Singapore", flag: "🇸🇬", currency: "S$", locale: "en-SG" },
  "HKD‑HONG KONG‑HK$": { code: "HKD", name: "Hong Kong", flag: "🇭🇰", currency: "HK$", locale: "zh-HK" },
  "NZD‑NEW ZEALAND‑NZ$": { code: "NZD", name: "New Zealand", flag: "🇳🇿", currency: "NZ$", locale: "en-NZ" },
  "ZAR‑SOUTH AFRICA‑R": { code: "ZAR", name: "South Africa", flag: "🇿🇦", currency: "R", locale: "en-ZA" },
  "BRL‑BRAZIL‑R$": { code: "BRL", name: "Brazil", flag: "🇧🇷", currency: "R$", locale: "pt-BR" },
  "MXN‑MEXICO‑$": { code: "MXN", name: "Mexico", flag: "🇲🇽", currency: "$", locale: "es-MX" },
  "SEK‑SWEDEN‑kr": { code: "SEK", name: "Sweden", flag: "🇸🇪", currency: "kr", locale: "sv-SE" },
  "NOK‑NORWAY‑kr": { code: "NOK", name: "Norway", flag: "🇳🇴", currency: "kr", locale: "nb-NO" },
  "DKK‑DENMARK‑kr": { code: "DKK", name: "Denmark", flag: "🇩🇰", currency: "kr", locale: "da-DK" },
  "TRY‑TURKEY‑₺": { code: "TRY", name: "Turkey", flag: "🇹🇷", currency: "₺", locale: "tr-TR" },
  "RUB‑RUSSIA‑₽": { code: "RUB", name: "Russia", flag: "🇷🇺", currency: "₽", locale: "ru-RU" },
  "KRW‑SOUTH KOREA‑₩": { code: "KRW", name: "South Korea", flag: "🇰🇷", currency: "₩", locale: "ko-KR" }
};

// Aliases for standard hyphen variants (e.g. INR-INDIA-₹)
Object.keys(currencyMap).forEach(key => {
  const stdKey = key.replace(/\u2011/g, '-');
  if (stdKey !== key) {
    currencyMap[stdKey] = currencyMap[key];
    countryConfig[stdKey] = countryConfig[key];
  }
});

// Friendly aliases and legacy names
const countryAliases = {
  'India': 'INR‑INDIA‑₹',
  'INR': 'INR‑INDIA‑₹',
  'US': 'USD‑UNITED STATES‑$',
  'USD': 'USD‑UNITED STATES‑$',
  'United States': 'USD‑UNITED STATES‑$',
  'UK': 'GBP‑UNITED KINGDOM‑£',
  'GBP': 'GBP‑UNITED KINGDOM‑£',
  'United Kingdom': 'GBP‑UNITED KINGDOM‑£',
  'Europe': 'EUR‑EUROPE‑€',
  'EUR': 'EUR‑EUROPE‑€',
  'Japan': 'JPY‑JAPAN‑¥',
  'JPY': 'JPY‑JAPAN‑¥',
  'Australia': 'AUD‑AUSTRALIA‑A$',
  'AUD': 'AUD‑AUSTRALIA‑A$',
  'Canada': 'CAD‑CANADA‑C$',
  'CAD': 'CAD‑CANADA‑C$',
  'UAE': 'AED‑UNITED ARAB EMIRATES‑د.إ',
  'AED': 'AED‑UNITED ARAB EMIRATES‑د.إ',
  'Switzerland': 'CHF‑SWITZERLAND‑CHF',
  'CHF': 'CHF‑SWITZERLAND‑CHF',
  'China': 'CNY‑CHINA‑¥',
  'CNY': 'CNY‑CHINA‑¥',
  'Singapore': 'SGD‑SINGAPORE‑S$',
  'SGD': 'SGD‑SINGAPORE‑S$',
  'Hong Kong': 'HKD‑HONG KONG‑HK$',
  'HKD': 'HKD‑HONG KONG‑HK$',
  'New Zealand': 'NZD‑NEW ZEALAND‑NZ$',
  'NZD': 'NZD‑NEW ZEALAND‑NZ$',
  'South Africa': 'ZAR‑SOUTH AFRICA‑R',
  'ZAR': 'ZAR‑SOUTH AFRICA‑R',
  'Brazil': 'BRL‑BRAZIL‑R$',
  'BRL': 'BRL‑BRAZIL‑R$',
  'Mexico': 'MXN‑MEXICO‑$',
  'MXN': 'MXN‑MEXICO‑$',
  'Sweden': 'SEK‑SWEDEN‑kr',
  'SEK': 'SEK‑SWEDEN‑kr',
  'Norway': 'NOK‑NORWAY‑kr',
  'NOK': 'NOK‑NORWAY‑kr',
  'Denmark': 'DKK‑DENMARK‑kr',
  'DKK': 'DKK‑DENMARK‑kr',
  'Turkey': 'TRY‑TURKEY‑₺',
  'TRY': 'TRY‑TURKEY‑₺',
  'Russia': 'RUB‑RUSSIA‑₽',
  'RUB': 'RUB‑RUSSIA‑₽',
  'South Korea': 'KRW‑SOUTH KOREA‑₩',
  'KRW': 'KRW‑SOUTH KOREA‑₩'
};

Object.entries(countryAliases).forEach(([alias, target]) => {
  currencyMap[alias] = currencyMap[target];
  countryConfig[alias] = countryConfig[target];
});

function normalizeCountryKey(k) {
  if (!k) return 'INR‑INDIA‑₹';
  if (countryAliases[k]) return countryAliases[k];
  if (currencyMap[k]) return k;
  const nbKey = String(k).replace(/-/g, '\u2011');
  if (countryAliases[nbKey]) return countryAliases[nbKey];
  if (currencyMap[nbKey]) return nbKey;
  const stdKey = String(k).replace(/\u2011/g, '-');
  if (countryAliases[stdKey]) return countryAliases[stdKey];
  if (currencyMap[stdKey]) return stdKey;
  return 'INR‑INDIA‑₹';
}

// App State
const AppState = {
  theme: localStorage.getItem('letscalculate_theme') || 'dark',
  selectedCountry: 'INR‑INDIA‑₹',
  currencySymbol: '₹',
  currencySubscribers: [],
  currencyMap: currencyMap,
  countryConfig: countryConfig,
  favorites: JSON.parse(localStorage.getItem('letscalculate_favs') || '[]'),
  history: JSON.parse(localStorage.getItem('letscalculate_history') || '[]'),
  currentUser: JSON.parse(localStorage.getItem('letscalculate_user') || 'null'),
  accounts: JSON.parse(localStorage.getItem('letscalculate_accounts') || '[]'),
  currentCalculator: null,
  calcInputs: {},
  countdownInterval: null,
  worldClockInterval: null,
  previousRoute: null,
  currentRoute: null,

  initCountry() {
    let saved = null;
    try {
      saved = localStorage.getItem('letscalculate_selected_country');
    } catch (e) {}

    // Validation: Default back to INR‑INDIA‑₹ if no country is selected or invalid
    let normalized = normalizeCountryKey(saved);
    if (!saved || !currencyMap[saved]) {
      saved = normalized || 'INR‑INDIA‑₹';
      try {
        localStorage.setItem('letscalculate_selected_country', saved);
        localStorage.setItem('letscalculate_currency_symbol', currencyMap[saved] || '₹');
      } catch (e) {}
    } else {
      saved = normalized;
    }

    this.selectedCountry = saved;
    this.currencySymbol = currencyMap[saved] || '₹';
    this.syncCountryDropdownUI();
  },

  getCountry() {
    return this.selectedCountry || 'INR‑INDIA‑₹';
  },

  getCurrencySymbol() {
    return this.currencySymbol || currencyMap[this.selectedCountry] || '₹';
  },

  getLocale() {
    const cfg = countryConfig[this.selectedCountry];
    return (cfg && cfg.locale) ? cfg.locale : 'en-IN';
  },

  subscribeCurrency(fn) {
    if (typeof fn === 'function' && !this.currencySubscribers.includes(fn)) {
      this.currencySubscribers.push(fn);
    }
  },

  unsubscribeCurrency(fn) {
    this.currencySubscribers = this.currencySubscribers.filter(f => f !== fn);
  },

  setCountry(countryCode) {
    // Validation: Default back to INR‑INDIA‑₹ if no country is selected or invalid
    let target = normalizeCountryKey(countryCode);
    if (!target || !currencyMap[target]) {
      target = 'INR‑INDIA‑₹';
    }

    this.selectedCountry = target;
    this.currencySymbol = currencyMap[target] || '₹';

    try {
      localStorage.setItem('letscalculate_selected_country', this.selectedCountry);
      localStorage.setItem('letscalculate_currency_symbol', this.currencySymbol);
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }

    this.syncCountryDropdownUI();

    // Trigger reactive subscribers (Redux / Context subscriber pattern)
    this.currencySubscribers.forEach(cb => {
      try { cb(this.currencySymbol, this.selectedCountry); } catch (e) { console.error(e); }
    });

    // Trigger custom events on window
    window.dispatchEvent(new CustomEvent('countryChange', {
      detail: { country: this.selectedCountry, currency: this.currencySymbol }
    }));
    window.dispatchEvent(new CustomEvent('currencyChange', {
      detail: { country: this.selectedCountry, currency: this.currencySymbol }
    }));

    // Trigger instant DOM and calculator update
    if (typeof AppUI !== 'undefined' && typeof AppUI.propagateCurrencyUpdate === 'function') {
      AppUI.propagateCurrencyUpdate(this.currencySymbol, this.selectedCountry);
    } else if (window.App && typeof window.App.propagateCurrencyUpdate === 'function') {
      window.App.propagateCurrencyUpdate(this.currencySymbol, this.selectedCountry);
    }
  },

  syncCountryDropdownUI() {
    const sel = document.getElementById('country-selector-dropdown');
    if (sel && sel.options) {
      const targetVal = this.selectedCountry;
      let matched = false;
      for (let i = 0; i < sel.options.length; i++) {
        const optVal = sel.options[i].value;
        if (
          optVal === targetVal ||
          optVal.replace(/\u2011/g, '-') === targetVal.replace(/\u2011/g, '-') ||
          countryAliases[optVal] === targetVal
        ) {
          sel.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && sel.options.length > 0) {
        sel.selectedIndex = 0;
      }
    } else if (sel) {
      sel.value = this.selectedCountry;
    }
    const flagEl = document.getElementById('country-active-flag');
    if (flagEl && countryConfig[this.selectedCountry]) {
      flagEl.textContent = countryConfig[this.selectedCountry].flag || '🇮🇳';
    }
  },

  isLoggedIn() {
    if (!this.currentUser) return false;
    // Disallow any legacy demo or guest sessions
    if (
      this.currentUser.email === 'demo@letscalculate.in' ||
      this.currentUser.email === 'guest@letscalculate.in' ||
      this.currentUser.name === 'Demo User' ||
      this.currentUser.name === 'Guest User' ||
      this.currentUser.plan === 'Guest Pass'
    ) {
      this.currentUser = null;
      try { localStorage.removeItem('letscalculate_user'); } catch (e) { }
      return false;
    }
    return true;
  },

  signup(name, mobile, email, password) {
    if (!name || name.trim().length < 2) {
      throw new Error('Full Name is mandatory (at least 2 characters).');
    }
    const cleanMobile = String(mobile || '').replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      throw new Error('Valid 10-digit Mobile Number is mandatory.');
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw new Error('Valid Email ID is mandatory.');
    }
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    const cleanEmail = email.toLowerCase().trim();
    if (this.accounts.some(acc => acc.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email already exists. Please log in.');
    }
    const newAccount = {
      name: name.trim(),
      mobile: cleanMobile,
      email: cleanEmail,
      password: password,
      createdAt: new Date().toISOString()
    };
    this.accounts.push(newAccount);
    localStorage.setItem('letscalculate_accounts', JSON.stringify(this.accounts));

    this.currentUser = {
      name: newAccount.name,
      mobile: cleanMobile,
      email: newAccount.email,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      plan: 'Free Lifetime Member'
    };
    localStorage.setItem('letscalculate_user', JSON.stringify(this.currentUser));

    // Sync directly to backend Excel spreadsheet API
    try {
      fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAccount.name,
          mobile: cleanMobile,
          email: cleanEmail,
          password: password
        })
      }).then(r => r.json()).then(res => {
        console.log('[EXCEL SYNC]', res);
      }).catch(err => {
        console.warn('Backend Excel sync notification:', err.message);
      });
    } catch (e) { }

    AppUI.updateHeaderBadges();
    return this.currentUser;
  },

  login(email, password) {
    if (!email || !password) {
      throw new Error('Please enter both your email and password.');
    }
    const cleanEmail = email.toLowerCase().trim();
    const account = this.accounts.find(a => a.email.toLowerCase() === cleanEmail && a.password === password);

    if (!account) {
      const emailExists = this.accounts.some(a => a.email.toLowerCase() === cleanEmail);
      if (emailExists) {
        throw new Error('Incorrect password. Please try again.');
      }
      throw new Error('Account not found with this email. Please switch to "Sign Up Free" to create your account.');
    }

    this.currentUser = {
      name: account.name || 'Member',
      mobile: account.mobile || '9876543210',
      email: account.email,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      plan: 'Free Lifetime Member'
    };
    localStorage.setItem('letscalculate_user', JSON.stringify(this.currentUser));
    AppUI.updateHeaderBadges();
    return this.currentUser;
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem('letscalculate_user');
    AppUI.updateHeaderBadges();
    AppUI.showToast('You have been logged out.');
    window.location.hash = '#/login';
    AppUI.handleRoute();
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('letscalculate_theme', this.theme);
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.innerHTML = this.theme === 'dark' ? getIconSvg('sun') : getIconSvg('moon');
    }
  },

  isFavorite(calcId) {
    return this.favorites.includes(calcId);
  },

  toggleFavorite(calcId) {
    if (this.isFavorite(calcId)) {
      this.favorites = this.favorites.filter(id => id !== calcId);
      AppUI.showToast('Removed from favorites');
    } else {
      this.favorites.push(calcId);
      AppUI.showToast('Added to favorites!');
    }
    localStorage.setItem('letscalculate_favs', JSON.stringify(this.favorites));
    AppUI.updateHeaderBadges();
  },

  addHistory(calcId, calcTitle, resultStr) {
    const item = {
      id: Date.now(),
      calcId,
      calcTitle,
      result: resultStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.history.unshift(item);
    if (this.history.length > 25) this.history.pop();
    localStorage.setItem('letscalculate_history', JSON.stringify(this.history));
    AppUI.updateHeaderBadges();
  },

  clearHistory() {
    this.history = [];
    localStorage.setItem('letscalculate_history', JSON.stringify(this.history));
    AppUI.renderHistoryDrawer();
    AppUI.showToast('Calculation history cleared');
  }
};

// UI Rendering & Management

// ==========================================================================
// BROKER SELECTION & RELATIVE CALCULATIONS CONTROLLER
// ==========================================================================
const BrokerModuleController = {
  activeBroker: 'zerodha',
  activeTab: 'brokerage',
  segment: 'delivery',

  // Form State
  state: {
    // Brokerage
    buyPrice: 1000,
    sellPrice: 1100,
    quantity: 100,

    // SIP
    sipMonthly: 10000,
    sipRoi: 12,
    sipTenure: 15,

    // ETF / REIT
    reitType: 'reit',
    reitUnits: 500,
    reitNav: 360,
    reitGrowth: 8,
    reitDivYield: 6.5,
    reitTenure: 5,

    // Demat Savings
    turnover: 500000,
    tradesCount: 24,
    traditionalRate: 0.40
  },

  init(container) {
    if (!container) return;
    this.container = container;
    this.renderActiveTab();
    this.bindEvents();
  },

  bindEvents() {
    const root = this.container;
    if (!root) return;

    // Broker selection tabs
    const brokerCards = root.querySelectorAll('#broker-selector-row .broker-select-card');
    brokerCards.forEach(card => {
      card.addEventListener('click', () => {
        const brokerId = card.getAttribute('data-broker');
        if (brokerId !== 'zerodha') {
          AppUI.showToast('More details coming soon! Zerodha is currently active.');
          return;
        }
      });
    });

    // Calc tab switching
    const tabBtns = root.querySelectorAll('#broker-calc-nav .broker-calc-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeTab = tab;
        this.renderActiveTab();
      });
    });
  },

  renderActiveTab() {
    const inputCol = this.container.querySelector('#broker-inputs-column');
    const resultCol = this.container.querySelector('#broker-results-panel');
    if (!inputCol || !resultCol) return;

    if (this.activeTab === 'brokerage') {
      this.renderBrokerageInputs(inputCol);
      this.computeBrokerage(resultCol);
    } else if (this.activeTab === 'sip') {
      this.renderSipInputs(inputCol);
      this.computeSip(resultCol);
    } else if (this.activeTab === 'etf-reit') {
      this.renderEtfReitInputs(inputCol);
      this.computeEtfReit(resultCol);
    } else if (this.activeTab === 'demat') {
      this.renderDematInputs(inputCol);
      this.computeDemat(resultCol);
    }
  },

  // 1. BROKERAGE TAB
  renderBrokerageInputs(container) {
    container.innerHTML = `
      <div style="margin-bottom: 0.25rem;">
        <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); display: block; margin-bottom: 0.45rem;">Trade Segment</label>
        <div class="broker-segment-selector" id="broker-seg-selector">
          <button type="button" class="broker-seg-btn ${this.segment === 'delivery' ? 'active' : ''}" data-seg="delivery">Equity Delivery (₹0)</button>
          <button type="button" class="broker-seg-btn ${this.segment === 'intraday' ? 'active' : ''}" data-seg="intraday">Equity Intraday (₹20)</button>
          <button type="button" class="broker-seg-btn ${this.segment === 'futures' ? 'active' : ''}" data-seg="futures">F&amp;O Futures (₹20)</button>
          <button type="button" class="broker-seg-btn ${this.segment === 'options' ? 'active' : ''}" data-seg="options">F&amp;O Options (₹20)</button>
        </div>
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Buy Price per Share</span>
          <span style="color: var(--emerald); font-weight: 700;">₹${this.state.buyPrice.toLocaleString('en-IN')}</span>
        </div>
        <input type="number" id="brk-buy-price" class="broker-input-field" value="${this.state.buyPrice}" min="1" step="1">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Sell Price per Share</span>
          <span style="color: var(--emerald); font-weight: 700;">₹${this.state.sellPrice.toLocaleString('en-IN')}</span>
        </div>
        <input type="number" id="brk-sell-price" class="broker-input-field" value="${this.state.sellPrice}" min="1" step="1">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Quantity (Shares / Lots)</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.quantity.toLocaleString('en-IN')}</span>
        </div>
        <input type="number" id="brk-qty" class="broker-input-field" value="${this.state.quantity}" min="1" step="1">
        <input type="range" id="brk-qty-slider" class="broker-slider" min="10" max="1000" step="10" value="${this.state.quantity}">
      </div>
    `;

    container.querySelectorAll('.broker-seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.segment = btn.getAttribute('data-seg');
        container.querySelectorAll('.broker-seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.computeBrokerage(this.container.querySelector('#broker-results-panel'));
      });
    });

    const bindLive = (id, stateKey, isSlider) => {
      const el = container.querySelector(id);
      if (!el) return;
      el.addEventListener('input', () => {
        this.state[stateKey] = parseFloat(el.value) || 0;
        if (stateKey === 'quantity') {
          const companion = container.querySelector(isSlider ? '#brk-qty' : '#brk-qty-slider');
          if (companion) companion.value = this.state.quantity;
        }
        this.computeBrokerage(this.container.querySelector('#broker-results-panel'));
      });
    };

    bindLive('#brk-buy-price', 'buyPrice', false);
    bindLive('#brk-sell-price', 'sellPrice', false);
    bindLive('#brk-qty', 'quantity', false);
    bindLive('#brk-qty-slider', 'quantity', true);
  },

  computeBrokerage(resEl) {
    const res = CalculatorEngine.calculateBrokerage(this.segment, this.state.buyPrice, this.state.sellPrice, this.state.quantity);
    const isProfit = res.netProfit >= 0;
    const profitColor = isProfit ? 'var(--emerald)' : 'var(--rose)';

    resEl.innerHTML = `
      <div class="broker-results-header-row">
        <div class="broker-results-title">
          ${getIconSvg('landmark', 18)}
          <span>EMI-Style Trade Summary</span>
        </div>
        <span class="broker-live-badge">${this.segment.toUpperCase()}</span>
      </div>

      <div class="broker-kpi-grid">
        <div class="broker-kpi-card">
          <span class="broker-kpi-label">Total Trade Turnover</span>
          <span class="broker-kpi-val">₹${Math.round(res.turnover).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">Buy: ₹${Math.round(res.buyVal).toLocaleString('en-IN')} | Sell: ₹${Math.round(res.sellVal).toLocaleString('en-IN')}</span>
        </div>

        <div class="broker-kpi-card ${res.brokerage === 0 ? 'highlight-emerald' : ''}">
          <span class="broker-kpi-label">Brokerage Charged</span>
          <span class="broker-kpi-val" style="color: ${res.brokerage === 0 ? 'var(--emerald)' : 'var(--text-primary)'};">
            ${res.brokerage === 0 ? '₹0 ZERO' : '₹' + res.brokerage.toFixed(2)}
          </span>
          <span class="broker-kpi-sub">${res.brokerage === 0 ? 'Flat ₹0 on Zerodha Delivery' : 'Max ₹20 / executed order'}</span>
        </div>

        <div class="broker-kpi-card" style="border-color: ${profitColor};">
          <span class="broker-kpi-label">Net Realized P&amp;L</span>
          <span class="broker-kpi-val" style="color: ${profitColor};">
            ${isProfit ? '+' : ''}₹${res.netProfit.toFixed(2)}
          </span>
          <span class="broker-kpi-sub">Gross: ${res.grossProfit >= 0 ? '+' : ''}₹${res.grossProfit.toFixed(2)}</span>
        </div>

        <div class="broker-kpi-card highlight-gold">
          <span class="broker-kpi-label">Breakeven Per Share</span>
          <span class="broker-kpi-val" style="color: #fbbf24;">₹${res.breakeven.toFixed(2)}</span>
          <span class="broker-kpi-sub">Price rise needed to cover all taxes</span>
        </div>
      </div>

      <!-- Itemized Taxes Breakdown -->
      <div class="broker-charges-list">
        <div class="broker-charge-row">
          <span>STT / CTT (Securities Transaction Tax)</span>
          <span>₹${res.stt.toFixed(2)}</span>
        </div>
        <div class="broker-charge-row">
          <span>Exchange Txn Charges (NSE/BSE)</span>
          <span>₹${res.exchTxn.toFixed(2)}</span>
        </div>
        <div class="broker-charge-row">
          <span>GST (18% on Brokerage + Exch + SEBI)</span>
          <span>₹${res.gst.toFixed(2)}</span>
        </div>
        <div class="broker-charge-row">
          <span>SEBI Turnover Fees &amp; Stamp Duty</span>
          <span>₹${(res.sebi + res.stampDuty).toFixed(2)}</span>
        </div>
        <div class="broker-charge-row total">
          <span>Total Statutory Taxes &amp; Charges</span>
          <span style="color: var(--rose);">₹${res.totalCharges.toFixed(2)}</span>
        </div>
      </div>

      <!-- Zerodha Referral CTA Banner -->
      <div class="broker-cta-panel">
        <div class="broker-cta-text">
          <strong>Open your Zerodha Demat &amp; Trading Account</strong>
          <span>Enjoy ₹0 Equity Delivery Brokerage &amp; Flat ₹20 on F&amp;O</span>
        </div>
        <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-emerald" style="width: auto; padding: 0.65rem 1.25rem;">
          <span>Open Account Now</span>
          ${getIconSvg('arrow-right', 14)}
        </a>
      </div>
    `;
  },

  // 2. SIP TAB
  renderSipInputs(container) {
    container.innerHTML = `
      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Monthly SIP Amount (₹)</span>
          <span style="color: var(--emerald); font-weight: 700;">₹${this.state.sipMonthly.toLocaleString('en-IN')}</span>
        </div>
        <input type="number" id="brk-sip-amt" class="broker-input-field" value="${this.state.sipMonthly}" min="500" step="500">
        <input type="range" id="brk-sip-amt-slider" class="broker-slider" min="1000" max="100000" step="1000" value="${this.state.sipMonthly}">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Expected Annual Return Rate (%)</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.sipRoi}%</span>
        </div>
        <input type="number" id="brk-sip-roi" class="broker-input-field" value="${this.state.sipRoi}" min="1" max="30" step="0.5">
        <input type="range" id="brk-sip-roi-slider" class="broker-slider" min="6" max="25" step="0.5" value="${this.state.sipRoi}">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.35rem;">
          <span>Investment Tenure</span>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div class="tenure-toggle-container" id="tenure-toggle-broker-sip" role="group" aria-label="Broker SIP tenure toggle">
              <button type="button" class="tenure-unit-btn ${this.state.sipTenureUnit === 'months' ? '' : 'active'}" data-brk-tenure="years">Yr</button>
              <button type="button" class="tenure-unit-btn ${this.state.sipTenureUnit === 'months' ? 'active' : ''}" data-brk-tenure="months">Mo</button>
            </div>
            <span id="brk-sip-tenure-disp" style="color: var(--emerald); font-weight: 700;">${this.state.sipTenureUnit === 'months' ? (Math.round(this.state.sipTenure * 12)) + ' Mos' : this.state.sipTenure + ' Years'}</span>
          </div>
        </div>
        <input type="number" id="brk-sip-tenure" class="broker-input-field" value="${this.state.sipTenureUnit === 'months' ? Math.round(this.state.sipTenure * 12) : this.state.sipTenure}" min="${this.state.sipTenureUnit === 'months' ? 12 : 1}" max="${this.state.sipTenureUnit === 'months' ? 420 : 35}" step="1">
        <input type="range" id="brk-sip-tenure-slider" class="broker-slider" min="${this.state.sipTenureUnit === 'months' ? 12 : 1}" max="${this.state.sipTenureUnit === 'months' ? 420 : 35}" step="1" value="${this.state.sipTenureUnit === 'months' ? Math.round(this.state.sipTenure * 12) : this.state.sipTenure}">
      </div>
    `;

    const bindLive = (id, stateKey, isSlider) => {
      const el = container.querySelector(id);
      if (!el) return;
      el.addEventListener('input', () => {
        this.state[stateKey] = parseFloat(el.value) || 0;
        const companion = container.querySelector(isSlider ? `#brk-${stateKey === 'sipMonthly' ? 'sip-amt' : (stateKey === 'sipRoi' ? 'sip-roi' : 'sip-tenure')}` : `#brk-${stateKey === 'sipMonthly' ? 'sip-amt' : (stateKey === 'sipRoi' ? 'sip-roi' : 'sip-tenure')}-slider`);
        if (companion) companion.value = this.state[stateKey];
        this.computeSip(this.container.querySelector('#broker-results-panel'));
      });
    };

    bindLive('#brk-sip-amt', 'sipMonthly', false);
    bindLive('#brk-sip-amt-slider', 'sipMonthly', true);
    bindLive('#brk-sip-roi', 'sipRoi', false);
    bindLive('#brk-sip-roi-slider', 'sipRoi', true);

    const tenureToggle = container.querySelector('#tenure-toggle-broker-sip');
    if (tenureToggle) {
      tenureToggle.querySelectorAll('.tenure-unit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetUnit = btn.getAttribute('data-brk-tenure');
          if (this.state.sipTenureUnit === targetUnit) return;
          this.state.sipTenureUnit = targetUnit;
          tenureToggle.querySelectorAll('.tenure-unit-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-brk-tenure') === targetUnit);
          });
          const numEl = container.querySelector('#brk-sip-tenure');
          const rngEl = container.querySelector('#brk-sip-tenure-slider');
          const dispEl = container.querySelector('#brk-sip-tenure-disp');
          if (targetUnit === 'months') {
            const mos = Math.round(this.state.sipTenure * 12);
            if (numEl) { numEl.min = 12; numEl.max = 420; numEl.step = 1; numEl.value = mos; }
            if (rngEl) { rngEl.min = 12; rngEl.max = 420; rngEl.step = 1; rngEl.value = mos; }
            if (dispEl) dispEl.textContent = `${mos} Mos`;
          } else {
            const yrs = this.state.sipTenure;
            if (numEl) { numEl.min = 1; numEl.max = 35; numEl.step = 1; numEl.value = yrs; }
            if (rngEl) { rngEl.min = 1; rngEl.max = 35; rngEl.step = 1; rngEl.value = yrs; }
            if (dispEl) dispEl.textContent = `${yrs} Years`;
          }
          this.computeSip(this.container.querySelector('#broker-results-panel'));
        });
      });
    }

    const bindLiveTenure = (id, isSlider) => {
      const el = container.querySelector(id);
      if (!el) return;
      el.addEventListener('input', () => {
        const raw = parseFloat(el.value) || 0;
        if (this.state.sipTenureUnit === 'months') {
          this.state.sipTenure = raw / 12;
          const dispEl = container.querySelector('#brk-sip-tenure-disp');
          if (dispEl) dispEl.textContent = `${raw} Mos`;
        } else {
          this.state.sipTenure = raw;
          const dispEl = container.querySelector('#brk-sip-tenure-disp');
          if (dispEl) dispEl.textContent = `${raw} Years`;
        }
        const companion = container.querySelector(isSlider ? '#brk-sip-tenure' : '#brk-sip-tenure-slider');
        if (companion) companion.value = raw;
        this.computeSip(this.container.querySelector('#broker-results-panel'));
      });
    };
    bindLiveTenure('#brk-sip-tenure', false);
    bindLiveTenure('#brk-sip-tenure-slider', true);
  },

  computeSip(resEl) {
    const res = CalculatorEngine.calculateBrokerSip(this.state.sipMonthly, this.state.sipRoi, this.state.sipTenure);
    const investedPct = Math.round((res.totalInvested / res.fvDirect) * 100);
    const gainsPct = 100 - investedPct;

    resEl.innerHTML = `
      <div class="broker-results-header-row">
        <div class="broker-results-title">
          ${getIconSvg('wallet', 18)}
          <span>EMI-Style SIP Growth &amp; Savings</span>
        </div>
        <span class="broker-live-badge">DIRECT COIN PLAN</span>
      </div>

      <div class="broker-kpi-grid">
        <div class="broker-kpi-card">
          <span class="broker-kpi-label">Total Invested Principal</span>
          <span class="broker-kpi-val">₹${Math.round(res.totalInvested).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">${this.state.sipTenure * 12} monthly installments</span>
        </div>

        <div class="broker-kpi-card highlight-emerald">
          <span class="broker-kpi-label">Total Expected Corpus</span>
          <span class="broker-kpi-val" style="color: var(--emerald);">₹${Math.round(res.fvDirect).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">Est. Wealth Gain: ₹${Math.round(res.netReturnsDirect).toLocaleString('en-IN')}</span>
        </div>

        <div class="broker-kpi-card highlight-gold" style="grid-column: span 2;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="broker-kpi-label">Zerodha Direct Mutual Fund Advantage</span>
              <div class="broker-kpi-val" style="color: #fbbf24; font-size: 1.6rem;">+₹${Math.round(res.commissionSaved).toLocaleString('en-IN')}</div>
              <span class="broker-kpi-sub">Extra wealth created by saving ~1.2% distributor commission every year!</span>
            </div>
            <div style="background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; padding: 0.4rem 0.8rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700;">
              0% Commission
            </div>
          </div>
        </div>
      </div>

      <!-- Proportional Breakdown Bar -->
      <div class="broker-breakdown-bar-wrap">
        <div class="broker-breakdown-bar">
          <div class="broker-bar-segment broker-bar-seg-principal" style="width: ${investedPct}%;"></div>
          <div class="broker-bar-segment broker-bar-seg-gain" style="width: ${gainsPct}%;"></div>
        </div>
        <div class="broker-breakdown-legend">
          <div class="broker-legend-item">
            <span class="broker-legend-dot" style="background: #3b82f6;"></span>
            <span>Principal Invested: ${investedPct}%</span>
          </div>
          <div class="broker-legend-item">
            <span class="broker-legend-dot" style="background: #10b981;"></span>
            <span>Compounded Wealth Growth: ${gainsPct}%</span>
          </div>
        </div>
      </div>

      <!-- Zerodha Referral CTA Banner -->
      <div class="broker-cta-panel">
        <div class="broker-cta-text">
          <strong>Start Direct SIPs with Zerodha Coin</strong>
          <span>Save ₹${Math.round(res.commissionSaved).toLocaleString('en-IN')} in hidden mutual fund commissions.</span>
        </div>
        <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-emerald" style="width: auto; padding: 0.65rem 1.25rem;">
          <span>Start Direct SIP</span>
          ${getIconSvg('arrow-right', 14)}
        </a>
      </div>
    `;
  },

  // 3. ETF & REIT TAB
  renderEtfReitInputs(container) {
    container.innerHTML = `
      <div style="margin-bottom: 0.25rem;">
        <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); display: block; margin-bottom: 0.45rem;">Asset Type</label>
        <div class="broker-segment-selector" id="brk-reit-type-toggle">
          <button type="button" class="broker-seg-btn ${this.state.reitType === 'reit' ? 'active' : ''}" data-type="reit">REIT (Commercial Real Estate)</button>
          <button type="button" class="broker-seg-btn ${this.state.reitType === 'etf' ? 'active' : ''}" data-type="etf">ETF (Index / Sector Fund)</button>
        </div>
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Number of Units</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.reitUnits.toLocaleString('en-IN')} Units</span>
        </div>
        <input type="number" id="brk-reit-units" class="broker-input-field" value="${this.state.reitUnits}" min="10" step="10">
        <input type="range" id="brk-reit-units-slider" class="broker-slider" min="50" max="5000" step="50" value="${this.state.reitUnits}">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Purchase NAV / Unit Price (₹)</span>
          <span style="color: var(--emerald); font-weight: 700;">₹${this.state.reitNav.toLocaleString('en-IN')}</span>
        </div>
        <input type="number" id="brk-reit-nav" class="broker-input-field" value="${this.state.reitNav}" min="10" step="5">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Expected Capital Growth (% p.a.)</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.reitGrowth}%</span>
        </div>
        <input type="number" id="brk-reit-growth" class="broker-input-field" value="${this.state.reitGrowth}" min="0" max="25" step="0.5">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Annual Dividend / Rental Yield (%)</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.reitDivYield}%</span>
        </div>
        <input type="number" id="brk-reit-yield" class="broker-input-field" value="${this.state.reitDivYield}" min="0" max="15" step="0.5">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Holding Period (Years)</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.reitTenure} Years</span>
        </div>
        <input type="number" id="brk-reit-tenure" class="broker-input-field" value="${this.state.reitTenure}" min="1" max="20" step="1">
      </div>
    `;

    container.querySelectorAll('#brk-reit-type-toggle .broker-seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.reitType = btn.getAttribute('data-type');
        if (this.state.reitType === 'reit') {
          this.state.reitNav = 360;
          this.state.reitGrowth = 8;
          this.state.reitDivYield = 6.5;
        } else {
          this.state.reitNav = 250;
          this.state.reitGrowth = 12;
          this.state.reitDivYield = 1.2;
        }
        this.renderEtfReitInputs(container);
        this.computeEtfReit(this.container.querySelector('#broker-results-panel'));
      });
    });

    const bindLive = (id, stateKey, isSlider) => {
      const el = container.querySelector(id);
      if (!el) return;
      el.addEventListener('input', () => {
        this.state[stateKey] = parseFloat(el.value) || 0;
        if (stateKey === 'reitUnits') {
          const companion = container.querySelector(isSlider ? '#brk-reit-units' : '#brk-reit-units-slider');
          if (companion) companion.value = this.state.reitUnits;
        }
        this.computeEtfReit(this.container.querySelector('#broker-results-panel'));
      });
    };

    bindLive('#brk-reit-units', 'reitUnits', false);
    bindLive('#brk-reit-units-slider', 'reitUnits', true);
    bindLive('#brk-reit-nav', 'reitNav', false);
    bindLive('#brk-reit-growth', 'reitGrowth', false);
    bindLive('#brk-reit-yield', 'reitDivYield', false);
    bindLive('#brk-reit-tenure', 'reitTenure', false);
  },

  computeEtfReit(resEl) {
    const res = CalculatorEngine.calculateBrokerEtfReit(this.state.reitType, this.state.reitUnits, this.state.reitNav, this.state.reitGrowth, this.state.reitDivYield, this.state.reitTenure);

    resEl.innerHTML = `
      <div class="broker-results-header-row">
        <div class="broker-results-title">
          ${getIconSvg('building', 18)}
          <span>${this.state.reitType === 'reit' ? 'REIT Real Estate Cashflow' : 'ETF Growth Projection'}</span>
        </div>
        <span class="broker-live-badge">${this.state.reitTenure} YEARS HOLDING</span>
      </div>

      <div class="broker-kpi-grid">
        <div class="broker-kpi-card">
          <span class="broker-kpi-label">Capital Invested</span>
          <span class="broker-kpi-val">₹${Math.round(res.capitalInvested).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">${this.state.reitUnits} units @ ₹${this.state.reitNav}</span>
        </div>

        <div class="broker-kpi-card highlight-emerald">
          <span class="broker-kpi-label">Total Projected Portfolio Value</span>
          <span class="broker-kpi-val" style="color: var(--emerald);">₹${Math.round(res.totalValue).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">Total Gain: ₹${Math.round(res.totalGain).toLocaleString('en-IN')}</span>
        </div>

        <div class="broker-kpi-card highlight-gold">
          <span class="broker-kpi-label">Cumulative Dividends / Rental</span>
          <span class="broker-kpi-val" style="color: #fbbf24;">₹${Math.round(res.cumulativeDividends).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">Quarterly cash payouts to your bank</span>
        </div>

        <div class="broker-kpi-card">
          <span class="broker-kpi-label">Future Asset Value</span>
          <span class="broker-kpi-val">₹${Math.round(res.futureCapitalVal).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">Capital Appreciation: ₹${Math.round(res.capitalGain).toLocaleString('en-IN')}</span>
        </div>
      </div>

      <!-- Zerodha Referral CTA Banner -->
      <div class="broker-cta-panel">
        <div class="broker-cta-text">
          <strong>Hold REITs &amp; ETFs with Zero Delivery Brokerage</strong>
          <span>Dematerialized holding in CDSL with seamless quarterly dividend credits.</span>
        </div>
        <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-indigo" style="width: auto; padding: 0.65rem 1.25rem;">
          <span>Invest via Zerodha</span>
          ${getIconSvg('arrow-right', 14)}
        </a>
      </div>
    `;
  },

  // 4. DEMAT SAVINGS TAB
  renderDematInputs(container) {
    container.innerHTML = `
      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Annual Equity Delivery Turnover (₹)</span>
          <span style="color: var(--emerald); font-weight: 700;">₹${this.state.turnover.toLocaleString('en-IN')}</span>
        </div>
        <input type="number" id="brk-demat-turnover" class="broker-input-field" value="${this.state.turnover}" min="50000" step="50000">
        <input type="range" id="brk-demat-turnover-slider" class="broker-slider" min="100000" max="5000000" step="50000" value="${this.state.turnover}">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Number of Delivery Trades per Year</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.tradesCount} Trades</span>
        </div>
        <input type="number" id="brk-demat-trades" class="broker-input-field" value="${this.state.tradesCount}" min="1" max="500" step="1">
      </div>

      <div class="broker-input-group">
        <div class="broker-input-label-row">
          <span>Traditional Brokerage Rate (%)</span>
          <span style="color: var(--emerald); font-weight: 700;">${this.state.traditionalRate}%</span>
        </div>
        <input type="number" id="brk-demat-rate" class="broker-input-field" value="${this.state.traditionalRate}" min="0.1" max="1.0" step="0.05">
      </div>
    `;

    const bindLive = (id, stateKey, isSlider) => {
      const el = container.querySelector(id);
      if (!el) return;
      el.addEventListener('input', () => {
        this.state[stateKey] = parseFloat(el.value) || 0;
        if (stateKey === 'turnover') {
          const companion = container.querySelector(isSlider ? '#brk-demat-turnover' : '#brk-demat-turnover-slider');
          if (companion) companion.value = this.state.turnover;
        }
        this.computeDemat(this.container.querySelector('#broker-results-panel'));
      });
    };

    bindLive('#brk-demat-turnover', 'turnover', false);
    bindLive('#brk-demat-turnover-slider', 'turnover', true);
    bindLive('#brk-demat-trades', 'tradesCount', false);
    bindLive('#brk-demat-rate', 'traditionalRate', false);
  },

  computeDemat(resEl) {
    const res = CalculatorEngine.calculateDematSavings(this.state.turnover, this.state.tradesCount, this.state.traditionalRate);

    resEl.innerHTML = `
      <div class="broker-results-header-row">
        <div class="broker-results-title">
          ${getIconSvg('award', 18)}
          <span>Demat Account Comparative Savings</span>
        </div>
        <span class="broker-live-badge">₹0 DELIVERY BROKERAGE</span>
      </div>

      <div class="broker-kpi-grid">
        <div class="broker-kpi-card" style="border-color: rgba(239, 68, 68, 0.4);">
          <span class="broker-kpi-label">Traditional Broker Fees</span>
          <span class="broker-kpi-val" style="color: var(--rose);">₹${Math.round(res.traditionalPaid).toLocaleString('en-IN')}</span>
          <span class="broker-kpi-sub">${this.state.traditionalRate}% on delivery volume</span>
        </div>

        <div class="broker-kpi-card highlight-emerald">
          <span class="broker-kpi-label">Zerodha Brokerage Paid</span>
          <span class="broker-kpi-val" style="color: var(--emerald);">₹0.00</span>
          <span class="broker-kpi-sub">100% Free Equity Delivery forever</span>
        </div>

        <div class="broker-kpi-card highlight-emerald" style="grid-column: span 2;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <span class="broker-kpi-label">Guaranteed Annual Savings</span>
              <div class="broker-kpi-val" style="color: var(--emerald); font-size: 1.6rem;">₹${Math.round(res.annualSavings).toLocaleString('en-IN')} / year</div>
              <span class="broker-kpi-sub">10-Year Compounded Wealth (invested @ 12%): <strong>₹${Math.round(res.tenYearCompounded).toLocaleString('en-IN')}</strong></span>
            </div>
            <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: var(--emerald); padding: 0.4rem 0.85rem; border-radius: var(--radius-full); font-size: 0.82rem; font-weight: 700;">
              Keep 100% Profits
            </div>
          </div>
        </div>
      </div>

      <!-- Zerodha Referral CTA Banner -->
      <div class="broker-cta-panel">
        <div class="broker-cta-text">
          <strong>Open a Zero Brokerage Demat Account Today</strong>
          <span>Save ₹${Math.round(res.annualSavings).toLocaleString('en-IN')} every single year with India's leading discount broker.</span>
        </div>
        <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-emerald" style="width: auto; padding: 0.65rem 1.25rem;">
          <span>Claim ₹0 Brokerage</span>
          ${getIconSvg('arrow-right', 14)}
        </a>
      </div>
    `;
  }
};

const AppUI = {

  // Global SPA click interceptor for clean URLs
  setupLinkInterceptor() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      // If internal path route without hash e.g. /home, /new-launch, /game, /calculators/finance, /blogs/nps
      if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/api') && !href.endsWith('.xlsx')) {
        e.preventDefault();
        window.location.hash = '#' + href;
      }
    });
  },

  renderCategoriesPage() {
    this.renderAllCategoriesPage();
  },

  renderProfilePage() {
    this.renderHomePage();
  },

  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  init() {
    this.setupLinkInterceptor();
    // Initialize active country & currency
    AppState.initCountry();
    // Apply theme
    document.documentElement.setAttribute('data-theme', AppState.theme);

    // Setup global listeners
    this.setupEventListeners();

    // Setup country selector listeners
    this.setupCountrySelector();

    // Setup seasonal promotional bottom banner manager
    this.setupSeasonalBanner();

    // Setup festive campaign popup (Dhanteras / Muhurat trading)
    this.setupFestivePopup();

    // Setup feedback form
    this.setupFeedbackForm();

    // Setup router
    window.addEventListener('hashchange', () => {
      // Always close all open dropdowns on route change
      document.querySelectorAll('.dropdown.open, .nav-item-has-dropdown.open').forEach(el => el.classList.remove('open'));
      this.handleRoute();
    });
    this.handleRoute();

    // Update badges
    this.updateHeaderBadges();

    // Setup global delegated dropdown interactions
    this.setupDropdownMenus();

    // Expose festive banner and popup functions globally for testing and automation
    window.setupSeasonalBanner = (d) => this.setupSeasonalBanner(d);
    window.showSeasonalBanner = (m, l, c) => this.showSeasonalBanner(m, l, c);
    window.showBanner = (m, l, c) => this.showBanner(m, l, c);
    window.closeSeasonalBanner = () => this.closeSeasonalBanner();
    window.setupFestivePopup = (d, f) => this.setupFestivePopup(d, f);
    window.setupDhanterasPopup = (d, f) => this.setupDhanterasPopup(d, f);
    window.showDhanterasPopup = (t, m, l, o) => this.showDhanterasPopup(t, m, l, o);
    window.setupMuhuratPopup = (d, f) => this.setupMuhuratPopup(d, f);
    window.showMuhuratPopup = (t, m, l, o) => this.showMuhuratPopup(t, m, l, o);
    window.closeMuhuratPopup = () => this.closeMuhuratPopup();
    window.setupFestiveDiwaliPopup = (d, f) => this.setupFestivePopup(d, f);
    window.closeFestiveDiwaliPopup = () => this.closeMuhuratPopup();
  },

  setupCountrySelector() {
    const isLocal3000 = window.location.port === "3000";
    const countryWidget = document.getElementById('country-selector-widget');

    // Environment-based conditional rendering: Hide Country Selector on localhost:3000
    if (isLocal3000) {
      if (countryWidget) {
        countryWidget.style.display = 'none';
        countryWidget.setAttribute('aria-hidden', 'true');
        countryWidget.remove();
      }
      return;
    }

    // Keep Country Selector visible and functional on localhost:3001 and other environments
    AppState.initCountry();
    const sel = document.getElementById('country-selector-dropdown');
    if (sel) {
      AppState.syncCountryDropdownUI();
      sel.addEventListener('change', (e) => {
        AppState.setCountry(e.target.value);
      });
    }

    // Window event listener for global state dispatch
    window.addEventListener('currencyChange', (e) => {
      if (e.detail && e.detail.currency) {
        this.propagateCurrencyUpdate(e.detail.currency, e.detail.country);
      }
    });
  },

  // Seasonal Banners Configuration
  seasonalBanners: [
    {
      message: "🌸 Happy Navratri! Wishing you strength, devotion, and joy.",
      start: "2026-10-01T00:00:00",
      end: "2026-10-19T23:59:59",
      link: null,
      theme: "navratri",
      icon: "🌸",
      instagramText: "Join us on Instagram"
    },
    {
      message: "🔥 Happy Dussehra! Celebrate the victory of good over evil.",
      start: "2026-10-20T00:00:00",
      end: "2026-10-20T23:59:59",
      link: null,
      theme: "dussehra",
      icon: "🔥",
      instagramText: "Join us on Instagram"
    },
    {
      title: "✨ Dhanteras is coming! ✨",
      message: "✨ Dhanteras is coming! ✨ Buy gold and silver this Dhanteras in ETF form by opening a free demat account.",
      start: "2026-10-21T00:00:00",
      end: "2026-11-05T23:59:59",
      link: "https://zerodha.com/open-account?c=ZAPCVV",
      ctaText: "Open Free Demat Account Now",
      instagramText: "Join us on Instagram",
      theme: "dhanteras",
      icon: "✨",
      animation: "gold coins"
    },
    {
      title: "✨ Happy Dhanteras! ✨",
      message: "✨ Happy Dhanteras! ✨ Buy gold and silver this Dhanteras in ETF form by opening a free demat account.",
      start: "2026-11-06T00:00:00",
      end: "2026-11-06T12:00:00",
      link: "https://zerodha.com/open-account?c=ZAPCVV",
      ctaText: "Open Free Demat Account Now",
      instagramText: "Join us on Instagram",
      theme: "dhanteras",
      icon: "✨",
      animation: "gold coins"
    },
    {
      title: "✨ Happy Diwali! ✨",
      message: "✨ Happy Diwali! Open free demat accounts quickly for Muhurat Trading on 8th November 2026 ✨",
      start: "2026-11-06T12:00:00",
      end: "2026-11-08T12:00:00",
      link: "https://zerodha.com/open-account?c=ZAPCVV",
      ctaText: "Open Free Demat Account",
      instagramText: "Join us on Instagram",
      theme: "diwali",
      icon: "✨",
      animation: "crackers"
    },
    {
      message: "🎄 Merry Christmas! Celebrate joy and togetherness.",
      start: "2026-12-24T00:00:00",
      end: "2026-12-26T23:59:59",
      link: null,
      theme: "christmas",
      icon: "🎄"
    },
    {
      message: "🎉 Happy New Year! Wishing you success and happiness.",
      start: "2026-12-31T00:00:00",
      end: "2027-01-01T23:59:59",
      link: null,
      theme: "newyear",
      icon: "🎉"
    },
    {
      message: "🌈 Happy Holi! Spread colors of joy and love.",
      start: "2027-03-06T00:00:00",
      end: "2027-03-07T23:59:59",
      link: null,
      theme: "holi",
      icon: "🌈"
    }
  ],

  get banners() {
    return this.seasonalBanners;
  },
  set banners(val) {
    this.seasonalBanners = val;
  },

  setupSeasonalBanner(currentDate = null) {
    const now = currentDate ? (currentDate instanceof Date ? currentDate : new Date(currentDate)) : new Date();
    const navratriEnd = new Date("2026-10-19T23:59:59");
    const dussehraDay = new Date("2026-10-20T23:59:59");
    const dhanterasStart = new Date("2026-10-21T00:00:00");
    const dhanterasEnd = new Date("2026-11-06T12:00:00");
    const diwaliStart = new Date("2026-11-06T12:00:00");
    const diwaliEnd = new Date("2026-11-08T12:00:00");

    const banner = document.getElementById('festive-diwali-banner');
    if (!banner) return;

    if (now <= navratriEnd) {
      this.showBanner("🌸 Happy Navratri! Wishing you strength, devotion, and joy.", null, {
        theme: "navratri",
        icon: "🌸",
        instagramText: "Join us on Instagram"
      });
    } else if (now <= dussehraDay) {
      this.showBanner("🔥 Happy Dussehra! Celebrate the victory of good over evil.", null, {
        theme: "dussehra",
        icon: "🔥",
        instagramText: "Join us on Instagram"
      });
    } else if (now >= dhanterasStart && now < dhanterasEnd) {
      const dhanterasMessage = (now <= new Date("2026-11-05T23:59:59"))
        ? "✨ Dhanteras is coming! ✨ Buy gold and silver this Dhanteras in ETF form by opening a free demat account."
        : "✨ Happy Dhanteras! ✨ Buy gold and silver this Dhanteras in ETF form by opening a free demat account.";

      this.showBanner(
        dhanterasMessage,
        "https://zerodha.com/open-account?c=ZAPCVV",
        {
          ctaText: "Open Free Demat Account Now",
          instagramText: "Join us on Instagram",
          theme: "dhanteras",
          icon: "✨",
          animation: "gold coins"
        }
      );
    } else if (now >= diwaliStart && now <= diwaliEnd) {
      this.showBanner(
        "✨ Happy Diwali! Open free demat accounts quickly for Muhurat Trading on 8th November 2026 ✨",
        "https://zerodha.com/open-account?c=ZAPCVV",
        {
          ctaText: "Open Free Demat Account",
          instagramText: "Join us on Instagram",
          theme: "diwali",
          icon: "✨",
          animation: "crackers"
        }
      );
    } else {
      // Check for any additional configured seasonal festival banners (Christmas, New Year, Holi, etc.)
      const otherBanner = this.seasonalBanners && this.seasonalBanners.find(b => now >= new Date(b.start) && now <= new Date(b.end));
      if (otherBanner) {
        this.showBanner(otherBanner.message, otherBanner.link, otherBanner);
      } else {
        // Banner auto-hides after 8th November 12 PM / outside active festival dates
        banner.style.display = 'none';
        banner.classList.remove('festive-banner-visible');
        banner.classList.add('festive-banner-hidden');
        this.stopBannerFireworks();
      }
    }
  },

  showBanner(message, link = null, bannerConfig = null) {
    const banner = document.getElementById('festive-diwali-banner');
    if (!banner) return;

    const messageEl = document.getElementById('festive-banner-message');
    const ctaBtn = document.getElementById('festive-diwali-cta-btn');
    const iconEl = document.getElementById('festive-banner-icon');
    const closeBtn = document.getElementById('festive-diwali-close-btn');
    const toggleBtn = document.getElementById('festive-banner-toggle-btn');
    const instagramBtn = document.getElementById('festive-banner-instagram-btn');

    // Update message text
    if (messageEl) {
      messageEl.innerHTML = `<strong>${message}</strong>`;
    }

    // Determine theme and icon
    let theme = (bannerConfig && bannerConfig.theme) ? bannerConfig.theme : null;
    let icon = (bannerConfig && bannerConfig.icon) ? bannerConfig.icon : null;
    const lowerMsg = (message || '').toLowerCase();
    if (!theme) {
      if (lowerMsg.includes('navratri')) { theme = 'navratri'; icon = icon || '🌸'; }
      else if (lowerMsg.includes('dussehra')) { theme = 'dussehra'; icon = icon || '🔥'; }
      else if (lowerMsg.includes('dhanteras')) { theme = 'dhanteras'; icon = icon || '✨'; }
      else if (lowerMsg.includes('diwali') || lowerMsg.includes('muhurat')) { theme = 'diwali'; icon = icon || '✨'; }
      else if (lowerMsg.includes('christmas')) { theme = 'christmas'; icon = icon || '🎄'; }
      else if (lowerMsg.includes('new year')) { theme = 'newyear'; icon = icon || '🎉'; }
      else if (lowerMsg.includes('holi')) { theme = 'holi'; icon = icon || '🌈'; }
      else { theme = 'diwali'; icon = icon || '✨'; }
    }

    if (iconEl && icon) {
      iconEl.textContent = icon;
    }

    // Apply theme classes
    banner.classList.remove('theme-navratri', 'theme-dussehra', 'theme-dhanteras', 'theme-diwali', 'theme-christmas', 'theme-newyear', 'theme-holi');
    banner.classList.add('theme-' + theme);

    // Configure CTA button
    if (ctaBtn) {
      if (link) {
        ctaBtn.style.display = 'inline-flex';
        ctaBtn.href = link;
        ctaBtn.target = '_blank';
        ctaBtn.rel = 'noopener noreferrer';
        const textSpan = ctaBtn.querySelector('span');
        if (textSpan) {
          const defaultCta = (theme === 'dhanteras' || (bannerConfig && bannerConfig.theme === 'dhanteras'))
            ? 'Open Free Demat Account Now'
            : 'Open Free Demat Account';
          textSpan.textContent = (bannerConfig && bannerConfig.ctaText) || defaultCta;
        }
      } else {
        ctaBtn.style.display = 'none';
      }
    }

    // Configure Instagram button text and link
    if (instagramBtn) {
      const igTextSpan = instagramBtn.querySelector('.instagram-btn-text');
      if (igTextSpan) {
        igTextSpan.textContent = (bannerConfig && bannerConfig.instagramText) || 'Join us on Instagram';
      }
      instagramBtn.href = "https://www.instagram.com/letscalculate.in?utm_source=qr&mdxt=bDM3MjR2cDdrOTc5";
      instagramBtn.target = "_blank";
      instagramBtn.rel = "noopener noreferrer";
    }

    // Setup interactive handlers if not yet bound
    if (!banner._handlersBound) {
      banner._handlersBound = true;

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeSeasonalBanner();
        });
      }

      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          banner.classList.toggle('is-collapsed');
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && banner.classList.contains('festive-banner-visible')) {
          this.closeSeasonalBanner();
        }
      });
    }

    // Display banner
    banner.style.display = 'block';
    void banner.offsetWidth; // Reflow
    banner.classList.remove('festive-banner-hidden');
    banner.classList.add('festive-banner-visible');

    // Launch crackers or gold coins background animation if requested
    if (bannerConfig && (bannerConfig.animation === 'crackers' || bannerConfig.animation === 'gold coins')) {
      this.startBannerFireworks(bannerConfig.animation);
    } else {
      this.stopBannerFireworks();
    }
  },

  startBannerFireworks(animationType = 'crackers') {
    const canvas = document.getElementById('festive-banner-fireworks-canvas');
    if (!canvas || typeof canvas.getContext !== 'function') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.bannerFireworksLoop) {
      cancelAnimationFrame(this.bannerFireworksLoop);
    }

    const resize = () => {
      const banner = canvas.parentElement;
      if (banner) {
        canvas.width = banner.offsetWidth || window.innerWidth;
        canvas.height = banner.offsetHeight || 60;
      }
    };
    resize();

    const particles = [];
    const isGoldCoins = animationType === 'gold coins';
    const colors = isGoldCoins
      ? ['#ffd700', '#fbbf24', '#f59e0b', '#d4af37', '#caa63c', '#e2e8f0', '#ffffff']
      : ['#ffd700', '#f59e0b', '#fbbf24', '#f43f5e', '#38bdf8', '#ffffff'];

    const spawnBurst = () => {
      const originX = Math.random() * canvas.width;
      const originY = canvas.height * (0.2 + Math.random() * 0.6);
      const count = isGoldCoins ? (8 + Math.floor(Math.random() * 8)) : (12 + Math.floor(Math.random() * 10));
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = isGoldCoins ? (0.6 + Math.random() * 1.8) : (0.8 + Math.random() * 2.2);
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isGoldCoins ? 0.1 : 0.3),
          color: color,
          alpha: 1,
          decay: isGoldCoins ? (0.012 + Math.random() * 0.018) : (0.015 + Math.random() * 0.02),
          radius: isGoldCoins ? (1.8 + Math.random() * 2.2) : (1.2 + Math.random() * 1.5)
        });
      }
    };

    let lastSpawn = 0;
    const render = (nowTime) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (nowTime - lastSpawn > 800) {
        spawnBurst();
        lastSpawn = nowTime;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // soft gravity
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha * 0.75;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const banner = document.getElementById('festive-diwali-banner');
      if (banner && banner.style.display !== 'none' && !banner.classList.contains('festive-banner-hidden')) {
        this.bannerFireworksLoop = requestAnimationFrame(render);
      }
    };
    this.bannerFireworksLoop = requestAnimationFrame(render);
  },

  stopBannerFireworks() {
    if (this.bannerFireworksLoop) {
      cancelAnimationFrame(this.bannerFireworksLoop);
      this.bannerFireworksLoop = null;
    }
    const canvas = document.getElementById('festive-banner-fireworks-canvas');
    if (canvas && typeof canvas.getContext === 'function') {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },

  showSeasonalBanner(message, link = null, bannerConfig = null) {
    return this.showBanner(message, link, bannerConfig);
  },

  closeSeasonalBanner() {
    this.stopBannerFireworks();
    const banner = document.getElementById('festive-diwali-banner');
    if (banner) {
      banner.classList.remove('festive-banner-visible');
      banner.classList.add('festive-banner-hidden');
      setTimeout(() => {
        if (banner.classList.contains('festive-banner-hidden')) {
          banner.style.display = 'none';
        }
      }, 400);
    }
  },

  setupFestiveDiwaliBanner(date) {
    this.setupSeasonalBanner(date);
  },

  closeFestiveDiwaliBanner() {
    this.closeSeasonalBanner();
  },

  // Soft Firecracker Sound Effect Synthesis (Web Audio API)
  playSoftFirecrackerSound() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      // Generate a soft authentic festive crackle/burst
      const bufferSize = Math.floor(ctx.sampleRate * 0.7);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Noise with gentle crackle peaks
      for (let i = 0; i < bufferSize; i++) {
        const t = i / ctx.sampleRate;
        const decay = Math.exp(-t * 8);
        const crackle = (Math.random() > 0.96 ? (Math.random() * 2 - 1) * 1.5 : (Math.random() * 2 - 1) * 0.4);
        data[i] = crackle * decay;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.6);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.045, ctx.currentTime); // Low volume
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      // Audio playback fails silently if restricted by browser policy
    }
  },

  // Dhanteras Festive Popup (Triggered 21st Oct 00:00 to 6th Nov 12:00)
  setupDhanterasPopup(currentDate = null, force = false) {
    const now = currentDate ? (currentDate instanceof Date ? currentDate : new Date(currentDate)) : new Date();
    const dhanterasStart = new Date("2026-10-21T00:00:00");
    const dhanterasEnd = new Date("2026-11-06T12:00:00");

    if (!force) {
      if (now < dhanterasStart || now >= dhanterasEnd) {
        this.closeMuhuratPopup();
        return;
      }

      // Check snooze: if user chose 'Remind Me Tomorrow'
      try {
        const snoozedUntil = localStorage.getItem('dhanteras_popup_snooze_until') || localStorage.getItem('festive_popup_snooze_until');
        if (snoozedUntil && now < new Date(snoozedUntil)) {
          this.closeMuhuratPopup();
          return;
        }
      } catch (e) {}

      // Once per session
      try {
        if (sessionStorage.getItem('dhanteras_popup_shown_session') === 'true' || sessionStorage.getItem('festive_popup_shown_session') === 'true') {
          this.closeMuhuratPopup();
          return;
        }
      } catch (e) {}
    }

    const isHappyDhanteras = now >= new Date("2026-11-06T00:00:00");
    const popupTitle = isHappyDhanteras ? "✨ Happy Dhanteras! ✨" : "✨ Dhanteras is coming! ✨";
    const popupMessage = isHappyDhanteras
      ? "Buy gold and silver this Dhanteras in ETF form by opening a free demat account."
      : "Dhanteras is coming! Buy gold and silver this Dhanteras in ETF form by opening a free demat account.";

    this.showDhanterasPopup(
      popupTitle,
      popupMessage,
      "https://zerodha.com/open-account?c=ZAPCVV",
      {
        theme: "dhanteras",
        ctaText: "Open Free Demat Account Now",
        animation: "gold coins",
        sound: "firecracker-soft-low",
        snooze: true,
        currentDate: now,
        showCountdown: false,
        badge: "✨ Auspicious Dhanteras ✨"
      }
    );
  },

  showDhanterasPopup(title, message, link, options = {}) {
    const opts = Object.assign({
      theme: 'dhanteras',
      ctaText: 'Open Free Demat Account Now',
      animation: 'gold coins',
      showCountdown: false,
      badge: '✨ Auspicious Dhanteras ✨'
    }, options);
    return this.showMuhuratPopup(title, message, link, opts);
  },

  // Main Festive Popup Manager (routes dynamically between Dhanteras and Muhurat Trading)
  setupFestivePopup(currentDate = null, force = false) {
    const now = currentDate ? (currentDate instanceof Date ? currentDate : new Date(currentDate)) : new Date();
    const dhanterasStart = new Date("2026-10-21T00:00:00");
    const dhanterasEnd = new Date("2026-11-06T12:00:00");
    const muhuratTrigger = new Date("2026-11-05T18:00:00");
    const muhuratEnd = new Date("2026-11-08T12:00:00");

    if (now >= dhanterasStart && now < dhanterasEnd) {
      this.setupDhanterasPopup(currentDate, force);
    } else if (now >= muhuratTrigger && now <= muhuratEnd) {
      this.setupMuhuratPopup(currentDate, force);
    } else {
      this.closeMuhuratPopup();
    }
  },

  // Muhurat Trading Reminder Popup (Triggered 5th Nov 18:00 to 8th Nov 12:00)
  setupMuhuratPopup(currentDate = null, force = false) {
    const now = currentDate ? (currentDate instanceof Date ? currentDate : new Date(currentDate)) : new Date();
    const popupTrigger = new Date("2026-11-05T18:00:00");
    const muhuratStart = new Date("2026-11-08T12:00:00");

    if (!force) {
      if (now < popupTrigger || now >= muhuratStart) {
        this.closeMuhuratPopup();
        return;
      }

      // Check snooze: if user chose 'Remind Me Tomorrow'
      try {
        const snoozedUntil = localStorage.getItem('muhurat_popup_snooze_until') || localStorage.getItem('festive_popup_snooze_until');
        if (snoozedUntil && now < new Date(snoozedUntil)) {
          this.closeMuhuratPopup();
          return;
        }
      } catch (e) {}

      // Once per session
      try {
        if (sessionStorage.getItem('muhurat_popup_shown_session') === 'true' || sessionStorage.getItem('festive_popup_shown_session') === 'true') {
          this.closeMuhuratPopup();
          return;
        }
      } catch (e) {}
    }

    this.showMuhuratPopup(
      "🔥 Muhurat Trading Reminder 🔥",
      "Get ready! Muhurat Trading is on 8th November 2026 — a special Diwali tradition to begin your investment journey. Don’t miss it!",
      "https://zerodha.com/open-account?c=ZAPCVV",
      {
        theme: "diwali",
        ctaText: "Open Free Demat Account",
        animation: "crackers",
        sound: "firecracker-soft-low",
        snooze: true,
        currentDate: now,
        showCountdown: true,
        muhuratStart: muhuratStart,
        badge: "✨ Special Diwali Tradition ✨"
      }
    );
  },

  showMuhuratPopup(title, message, link, options = {}) {
    const overlay = document.getElementById('muhurat-trading-popup-overlay');
    if (!overlay) return;

    const dialog = overlay.querySelector('.muhurat-popup-dialog');
    const badgeEl = overlay.querySelector('.muhurat-popup-badge');
    const titleEl = document.getElementById('muhurat-popup-title');
    const descEl = document.getElementById('muhurat-popup-desc');
    const countdownEl = document.getElementById('muhurat-popup-countdown');
    const ctaBtn = document.getElementById('muhurat-popup-cta-btn');
    const closeBtn = document.getElementById('muhurat-popup-close-btn');
    const snoozeBtn = document.getElementById('muhurat-popup-snooze-btn');
    const backdrop = document.getElementById('muhurat-popup-backdrop');

    // Theme configuration
    const isDhanteras = options.theme === 'dhanteras' || (title && title.includes('Dhanteras'));
    const theme = options.theme || (isDhanteras ? 'dhanteras' : 'diwali');

    if (dialog) {
      dialog.classList.remove('theme-diwali', 'theme-dhanteras');
      dialog.classList.add('theme-' + theme);
    }

    if (badgeEl) {
      badgeEl.textContent = options.badge || (isDhanteras ? '✨ Auspicious Dhanteras ✨' : '✨ Special Diwali Tradition ✨');
    }

    if (titleEl && title) titleEl.textContent = title;
    if (descEl && message) descEl.textContent = message;

    if (ctaBtn) {
      if (link) {
        ctaBtn.href = link;
        ctaBtn.target = '_blank';
        ctaBtn.rel = 'noopener noreferrer';
      }
      const ctaText = options.ctaText || (isDhanteras ? 'Open Free Demat Account Now' : 'Open Free Demat Account');
      const textSpan = ctaBtn.querySelector('span');
      if (textSpan) {
        textSpan.textContent = ctaText;
      } else {
        ctaBtn.textContent = ctaText;
      }
    }

    const sessionKey = isDhanteras ? 'dhanteras_popup_shown_session' : 'muhurat_popup_shown_session';
    try {
      sessionStorage.setItem(sessionKey, 'true');
      sessionStorage.setItem('festive_popup_shown_session', 'true');
    } catch (e) {}

    // Countdown configuration
    if (this.muhuratCountdownInterval) {
      clearInterval(this.muhuratCountdownInterval);
      this.muhuratCountdownInterval = null;
    }

    if (options.showCountdown !== false && !isDhanteras) {
      if (countdownEl) countdownEl.style.display = 'inline-block';
      const muhuratStart = options.muhuratStart || new Date("2026-11-08T12:00:00");
      const simulatedNow = options.currentDate || new Date();
      const timeDelta = simulatedNow.getTime() - Date.now();

      const updateCountdown = () => {
        const effectiveNow = new Date(Date.now() + timeDelta);
        const diff = muhuratStart - effectiveNow;
        if (!countdownEl) return;
        if (diff <= 0) {
          countdownEl.textContent = '⏳ Muhurat Trading has begun!';
          return;
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        countdownEl.textContent = `⏳ ${hours} hours ${minutes} minutes left until Muhurat Trading!`;
      };

      updateCountdown();
      this.muhuratCountdownInterval = setInterval(updateCountdown, 1000);
    } else if (countdownEl) {
      countdownEl.style.display = 'none';
    }

    // Event handlers
    if (!overlay._handlersBound) {
      overlay._handlersBound = true;
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeMuhuratPopup();
        });
      }
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          this.closeMuhuratPopup();
        });
      }
      if (snoozeBtn) {
        snoozeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const curr = options.currentDate || new Date();
          const next6PM = new Date(curr);
          next6PM.setDate(next6PM.getDate() + 1);
          next6PM.setHours(18, 0, 0, 0);
          const snoozeKey = isDhanteras ? 'dhanteras_popup_snooze_until' : 'muhurat_popup_snooze_until';
          try {
            localStorage.setItem(snoozeKey, next6PM.toISOString());
            localStorage.setItem('festive_popup_snooze_until', next6PM.toISOString());
          } catch (err) {}
          this.closeMuhuratPopup();
        });
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
          this.closeMuhuratPopup();
        }
      });
    }

    // Display overlay
    overlay.style.display = 'flex';
    void overlay.offsetWidth;
    overlay.classList.add('is-active');

    // Play soft sound effect
    if (options.sound !== false) {
      this.playSoftFirecrackerSound();
    }

    // Auto-close popup after 10 seconds
    if (this.muhuratAutoCloseTimeout) {
      clearTimeout(this.muhuratAutoCloseTimeout);
      this.muhuratAutoCloseTimeout = null;
    }
    this.muhuratAutoCloseTimeout = setTimeout(() => {
      this.closeMuhuratPopup();
    }, 10000);

    // Play crackers or gold coins animation
    if (options.animation !== false) {
      const animType = (options.animation === 'gold coins' || isDhanteras) ? 'gold coins' : 'crackers';
      this.startMuhuratFireworks(6000, animType);
    }
  },

  startMuhuratFireworks(durationMs = 6000, animationType = 'crackers') {
    const canvas = document.getElementById('muhurat-popup-fireworks-canvas');
    if (!canvas || typeof canvas.getContext !== 'function') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.muhuratFireworksLoop) {
      cancelAnimationFrame(this.muhuratFireworksLoop);
    }

    const resize = () => {
      const dialog = canvas.parentElement;
      if (dialog) {
        canvas.width = dialog.offsetWidth || 500;
        canvas.height = dialog.offsetHeight || 380;
      }
    };
    resize();

    const particles = [];
    const isGoldCoins = animationType === 'gold coins';
    const colors = isGoldCoins
      ? ['#ffd700', '#fbbf24', '#f59e0b', '#d4af37', '#caa63c', '#e2e8f0', '#ffffff']
      : ['#ffd700', '#f59e0b', '#ef4444', '#10b981', '#38bdf8', '#ec4899', '#ffffff'];

    const spawnBurst = () => {
      const originX = 40 + Math.random() * (canvas.width - 80);
      const originY = 40 + Math.random() * (canvas.height * 0.6);
      const count = isGoldCoins ? (16 + Math.floor(Math.random() * 12)) : (24 + Math.floor(Math.random() * 16));
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = isGoldCoins ? (0.9 + Math.random() * 2.5) : (1.2 + Math.random() * 3.5);
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isGoldCoins ? 0.2 : 0.5),
          color: color,
          alpha: 1,
          decay: isGoldCoins ? (0.015 + Math.random() * 0.02) : (0.018 + Math.random() * 0.025),
          radius: isGoldCoins ? (2 + Math.random() * 2.5) : (1.5 + Math.random() * 2)
        });
      }
    };

    const startTime = Date.now();
    let lastSpawn = 0;

    const render = (nowTime) => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Keep spawning bursts for the duration (5-7 seconds)
      if (elapsed < durationMs && nowTime - lastSpawn > 550) {
        spawnBurst();
        lastSpawn = nowTime;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Stop loop when duration exceeded and particles finished
      if (elapsed < durationMs || particles.length > 0) {
        this.muhuratFireworksLoop = requestAnimationFrame(render);
      } else {
        this.muhuratFireworksLoop = null;
      }
    };

    spawnBurst();
    this.muhuratFireworksLoop = requestAnimationFrame(render);
  },

  stopMuhuratFireworks() {
    if (this.muhuratFireworksLoop) {
      cancelAnimationFrame(this.muhuratFireworksLoop);
      this.muhuratFireworksLoop = null;
    }
    const canvas = document.getElementById('muhurat-popup-fireworks-canvas');
    if (canvas && typeof canvas.getContext === 'function') {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },

  closeMuhuratPopup() {
    if (this.muhuratAutoCloseTimeout) {
      clearTimeout(this.muhuratAutoCloseTimeout);
      this.muhuratAutoCloseTimeout = null;
    }
    if (this.muhuratCountdownInterval) {
      clearInterval(this.muhuratCountdownInterval);
      this.muhuratCountdownInterval = null;
    }
    this.stopMuhuratFireworks();
    const overlay = document.getElementById('muhurat-trading-popup-overlay');
    if (overlay) {
      overlay.classList.remove('is-active');
      overlay.style.display = 'none';
    }
  },

  setupFestiveDiwaliPopup(date, force = false) {
    this.setupFestivePopup(date, force);
  },

  closeFestiveDiwaliPopup() {
    this.closeMuhuratPopup();
  },

  propagateCurrencyUpdate(newCurrency, country) {
    const allSymbols = [
      'AED', 'CHF', 'HK$', 'NZ$', 'A$', 'C$', 'S$', 'R$', 'د.إ', 'kr',
      '₹', '$', '£', '€', '¥', 'R', '₺', '₽', '₩'
    ];
    const currRegex = /\((AED|CHF|HK\$|NZ\$|A\$|C\$|S\$|R\$|د\.إ|kr|₹|\$|£|€|¥|R|₺|₽|₩)\)/g;

    // 1. Update all input addon prefixes
    document.querySelectorAll('.input-addon-prefix').forEach(el => {
      const txt = el.textContent.trim();
      if (allSymbols.includes(txt) || txt === '₹' || txt === '') {
        el.textContent = newCurrency;
      }
    });

    // 2. Update all labels containing currency (e.g. Loan Amount (₹) -> Loan Amount ($), Monthly EMI (₹) -> Monthly EMI (£))
    document.querySelectorAll('.form-label, .form-label-row label, label[for="input-reverse-principal"], label[for="input-reverse-monthlyEmi"], .bt-summary-label, .card-title span').forEach(lbl => {
      lbl.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          if (currRegex.test(child.nodeValue)) {
            child.nodeValue = child.nodeValue.replace(currRegex, `(${newCurrency})`);
          }
        } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('field-tooltip-wrapper')) {
          if (currRegex.test(child.textContent)) {
            child.innerHTML = child.innerHTML.replace(currRegex, `(${newCurrency})`);
          }
        }
      });
    });

    // 3. Update form-value-display prefixes
    document.querySelectorAll('.form-value-display').forEach(disp => {
      const valStr = disp.textContent.trim();
      for (const s of allSymbols) {
        if (valStr.startsWith(s)) {
          disp.textContent = newCurrency + valStr.slice(s.length);
          break;
        }
      }
    });

    // 4. Update live custom calculators or standard calculators
    if (this.currentCalculator) {
      const calc = this.currentCalculator;
      if (calc.id === 'loan-reverse-calculator') {
        if (typeof this.updateReverseCalculation === 'function') {
          this.updateReverseCalculation();
        }
      } else if (calc.id === 'compare-loan-calculator') {
        if (typeof this.updateCompareCalculation === 'function') {
          this.updateCompareCalculation();
        }
      } else if (!calc.customUi) {
        // Standard calculator: recompute and refresh results display
        const safeInputs = { ...AppState.calcInputs };
        if (calc.fields) {
          calc.fields.forEach(f => {
            if (f.type !== 'select' && safeInputs[f.id] !== undefined && safeInputs[f.id] !== '') {
              const n = Number(safeInputs[f.id]);
              if (!isNaN(n)) {
                if (f.min !== undefined && n < f.min) safeInputs[f.id] = f.min;
                if (f.max !== undefined && n > f.max) safeInputs[f.id] = f.max;
              }
            }
          });
        }
        const result = CalculatorEngine.compute(calc.id, safeInputs);
        this.renderResults(result);

        // Update Personal Loan fee summary if present
        if (calc.id === 'personal-loan-calculator') {
          const loanAmt = (parseFloat(AppState.calcInputs.amount) !== undefined && !isNaN(parseFloat(AppState.calcInputs.amount)))
            ? parseFloat(AppState.calcInputs.amount) : 500000;
          const feePct = (parseFloat(AppState.calcInputs.processingFee) !== undefined && !isNaN(parseFloat(AppState.calcInputs.processingFee)))
            ? parseFloat(AppState.calcInputs.processingFee) / 100 : 0.01;
          const feeAmt = loanAmt * feePct;
          const disbAmt = Math.max(0, loanAmt - feeAmt);
          const feeEl = document.getElementById('live-processing-fee-amt');
          const disbEl = document.getElementById('live-disbursed-amt');
          if (feeEl) feeEl.textContent = CalculatorEngine.formatCurrency(feeAmt);
          if (disbEl) disbEl.textContent = CalculatorEngine.formatCurrency(disbAmt);
        }
      }
    }
  },

  setupDropdownMenus() {
    // Delegated click handler: toggle dropdown on trigger click, handle submenu clicks/taps, close on leaf item click or outside click
    document.addEventListener('click', (e) => {
      // 1. Check if user clicked/tapped on a category with a submenu (Finance, Math, Health)
      const subTrigger = e.target.closest('.nav-dropdown-item-has-sub, .dropdown-submenu-item > a, .nav-dropdown-item-wrapper > a');
      if (subTrigger) {
        const submenuItem = subTrigger.closest('.dropdown-submenu-item, .nav-dropdown-item-wrapper');
        if (submenuItem) {
          e.preventDefault();
          e.stopPropagation();

          const isSubOpen = submenuItem.classList.contains('open');

          // Close sibling submenus within the same parent menu
          const parentMenu = submenuItem.closest('.dropdown-menu, .nav-dropdown-menu');
          if (parentMenu) {
            parentMenu.querySelectorAll('.dropdown-submenu-item.open, .nav-dropdown-item-wrapper.open').forEach(item => {
              if (item !== submenuItem) item.classList.remove('open');
            });
          }

          // Toggle this submenu
          submenuItem.classList.toggle('open', !isSubOpen);

          // Boundary check: flip flyout left if it exceeds the viewport right edge
          if (!isSubOpen) {
            const subMenu = submenuItem.querySelector('.sub-dropdown-menu, .nav-dropdown-submenu');
            if (subMenu) {
              const rect = subMenu.getBoundingClientRect();
              const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
              if (rect.right > viewportWidth - 10 && rect.left >= 280) {
                subMenu.classList.add('flyout-left');
              } else {
                subMenu.classList.remove('flyout-left');
              }
            }
          }
          return;
        }
      }

      // 2. If user clicked on a leaf link inside a dropdown or submenu, close all menus and navigate
      const leafLink = e.target.closest('.dropdown-menu a, .nav-dropdown-menu a');
      if (leafLink && !leafLink.classList.contains('nav-dropdown-item-has-sub')) {
        document.querySelectorAll('.dropdown.open, .nav-item-has-dropdown.open, .dropdown-submenu-item.open, .nav-dropdown-item-wrapper.open')
          .forEach(d => d.classList.remove('open'));
        return;
      }

      // 3. Check if user clicked/tapped the main dropdown trigger (All Calculators)
      const trigger = e.target.closest('.nav-dropdown-trigger, .dropdown-toggle');
      const dropdown = trigger ? trigger.closest('.dropdown, .nav-item-has-dropdown') : null;

      if (trigger && dropdown) {
        const isOpen = dropdown.classList.contains('open');
        // Close any other open dropdowns and submenus
        document.querySelectorAll('.dropdown.open, .nav-item-has-dropdown.open, .dropdown-submenu-item.open, .nav-dropdown-item-wrapper.open')
          .forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
          });

        dropdown.classList.toggle('open', !isOpen);

        if (isOpen) {
          dropdown.querySelectorAll('.dropdown-submenu-item.open, .nav-dropdown-item-wrapper.open').forEach(sub => sub.classList.remove('open'));
        } else {
          // Prevent navigating away when opening dropdown
          e.preventDefault();
        }
      } else {
        // 4. Clicked outside or on another navigation button -> close all open dropdowns and submenus
        document.querySelectorAll('.dropdown.open, .nav-item-has-dropdown.open, .dropdown-submenu-item.open, .nav-dropdown-item-wrapper.open')
          .forEach(d => d.classList.remove('open'));
      }
    });

    // Keyboard accessibility: Escape key closes all dropdowns & submenus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown.open, .nav-item-has-dropdown.open, .dropdown-submenu-item.open, .nav-dropdown-item-wrapper.open')
          .forEach(d => d.classList.remove('open'));
      }
    });

    // Delegated mouse hover handlers for smooth 200ms fade-out and boundary checking
    document.addEventListener('mouseover', (e) => {
      const dropdown = e.target.closest('.dropdown, .nav-item-has-dropdown');
      if (dropdown) {
        dropdown.querySelectorAll('.dropdown-menu, .nav-dropdown-menu').forEach(m => m.classList.remove('hide'));
      }

      const subItem = e.target.closest('.dropdown-submenu-item, .nav-dropdown-item-wrapper');
      if (subItem) {
        const subMenu = subItem.querySelector('.sub-dropdown-menu, .nav-dropdown-submenu');
        if (subMenu) {
          const rect = subMenu.getBoundingClientRect();
          const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
          if (rect.right > viewportWidth - 10 && rect.left >= 280) {
            subMenu.classList.add('flyout-left');
          } else {
            subMenu.classList.remove('flyout-left');
          }
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const fromDropdown = e.target.closest('.dropdown, .nav-item-has-dropdown');
      const toElement = e.relatedTarget ? e.relatedTarget.closest('.dropdown, .nav-item-has-dropdown') : null;
      if (fromDropdown && fromDropdown !== toElement) {
        const menus = fromDropdown.querySelectorAll('.dropdown-menu, .nav-dropdown-menu');
        menus.forEach(m => m.classList.add('hide'));
        setTimeout(() => {
          menus.forEach(m => m.classList.remove('hide'));
        }, 200);
      }
    });
  },

  setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
      AppState.toggleTheme();
    });

    // Search modal open/close
    const searchModal = document.getElementById('search-modal-backdrop');
    const searchInput = document.getElementById('global-search-input');
    const closeSearchBtn = document.getElementById('close-search-modal');

    const openSearch = (initialQuery = '') => {
      if (!searchModal) return;
      searchModal.classList.add('open');
      const input = document.getElementById('global-search-input');
      if (input) {
        input.value = initialQuery;
        setTimeout(() => input.focus(), 60);
      }
      this.renderSearchResults(initialQuery);
    };

    const closeSearch = () => {
      if (searchModal) searchModal.classList.remove('open');
    };

    this.openSearchModal = openSearch;
    this.closeSearchModal = closeSearch;

    // Bulletproof click delegation for header search, hero search trigger, and close button
    document.addEventListener('click', (e) => {
      // Header search trigger
      if (e.target.closest('#header-search-btn')) {
        e.preventDefault();
        openSearch('');
        return;
      }
      // Hero search trigger box on Home page
      if (e.target.closest('#hero-search-trigger') || e.target.closest('.hero-search-input-box')) {
        e.preventDefault();
        openSearch('');
        return;
      }
      // Search modal close button ONLY
      if (e.target.closest('#close-search-modal') || (e.target.closest('.modal-close-btn') && e.target.closest('#search-modal-backdrop'))) {
        e.preventDefault();
        closeSearch();
        return;
      }
      // Backdrop click outside modal dialog
      if (e.target === searchModal) {
        closeSearch();
        return;
      }
    });

    // Global anchor click listener: Prevent accidental homepage navigation from dummy, empty, or javascript: links
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.trim() === '' || href.startsWith('javascript:')) {
          e.preventDefault();
        }
      }
    });

    // Support focusing/clicking hero input to open modal
    document.addEventListener('focusin', (e) => {
      if (e.target && (e.target.id === 'hero-search-input' || e.target.closest('#hero-search-trigger'))) {
        openSearch('');
      }
    });

    // Keyboard shortcut '/' or 'Cmd+K' / 'Ctrl+K' & Escape key handler
    window.addEventListener('keydown', (e) => {
      if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch('');
      }
      if (e.key === 'Escape') {
        if (searchModal?.classList.contains('open')) {
          closeSearch();
        }
        if (historyDrawer?.classList.contains('open') || favDrawer?.classList.contains('open') || mobileNavDrawer?.classList.contains('open')) {
          closeDrawers();
        }
      }
    });

    // Real-time input searching in modal
    searchInput?.addEventListener('input', (e) => {
      this.renderSearchResults(e.target.value);
    });

    // Forward typing from hero search input on home page
    document.addEventListener('input', (e) => {
      if (e.target && e.target.id === 'hero-search-input') {
        const val = e.target.value;
        e.target.value = '';
        openSearch(val);
      }
    });

    // History, Favorites & Mobile Navigation Drawers
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const historyDrawer = document.getElementById('history-drawer');
    const favDrawer = document.getElementById('favorites-drawer');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

    const closeDrawers = (e) => {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      drawerBackdrop?.classList.remove('open');
      historyDrawer?.classList.remove('open');
      favDrawer?.classList.remove('open');
      mobileNavDrawer?.classList.remove('open');
    };

    this.closeDrawers = closeDrawers;
    window.closeDrawers = closeDrawers;

    document.getElementById('header-history-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      drawerBackdrop?.classList.add('open');
      historyDrawer?.classList.add('open');
      favDrawer?.classList.remove('open');
      mobileNavDrawer?.classList.remove('open');
      this.renderHistoryDrawer();
    });

    document.getElementById('header-favorites-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      drawerBackdrop?.classList.add('open');
      favDrawer?.classList.add('open');
      historyDrawer?.classList.remove('open');
      mobileNavDrawer?.classList.remove('open');
      this.renderFavoritesDrawer();
    });

    document.getElementById('mobile-menu-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      drawerBackdrop?.classList.add('open');
      mobileNavDrawer?.classList.add('open');
      historyDrawer?.classList.remove('open');
      favDrawer?.classList.remove('open');
    });

    // Direct event listeners for drawer close buttons (Click & Touchend for desktop + mobile)
    const drawerCloseSelectors = [
      '#close-history-drawer',
      '#close-favorites-drawer',
      '#close-mobile-nav-drawer',
      '.close-drawer-btn'
    ];
    drawerCloseSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(btn => {
        ['click', 'touchend'].forEach(evtType => {
          btn.addEventListener(evtType, (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeDrawers();
          }, { passive: false });
        });
      });
    });

    // Bulletproof delegated click & touchend listener on document
    ['click', 'touchend'].forEach(evtType => {
      document.addEventListener(evtType, (e) => {
        if (
          e.target.closest('#close-history-drawer') ||
          e.target.closest('#close-favorites-drawer') ||
          e.target.closest('#close-mobile-nav-drawer') ||
          e.target.closest('.close-drawer-btn') ||
          (e.target.closest('.modal-close-btn') && (e.target.closest('#history-drawer') || e.target.closest('#favorites-drawer') || e.target.closest('#mobile-nav-drawer')))
        ) {
          e.preventDefault();
          e.stopPropagation();
          closeDrawers();
        }
      }, { passive: false });
    });

    mobileNavDrawer?.querySelectorAll?.('a, button')?.forEach(el => {
      el.addEventListener('click', () => {
        closeDrawers();
      });
    });

    drawerBackdrop?.addEventListener('click', closeDrawers);
    drawerBackdrop?.addEventListener('touchend', (e) => {
      e.preventDefault();
      closeDrawers();
    }, { passive: false });

    // Clear history
    document.getElementById('clear-history-btn')?.addEventListener('click', () => {
      AppState.clearHistory();
    });
  },

  setupFeedbackForm() {
    const modalBackdrop = document.getElementById('feedback-modal-backdrop');
    const form = document.getElementById('feedback-form');
    if (!form && !modalBackdrop) return;

    const nameInput = document.getElementById('fb-name');
    const emailInput = document.getElementById('fb-email');
    const phoneInput = document.getElementById('fb-phone');
    const bestInput = document.getElementById('fb-best');
    const improvementsInput = document.getElementById('fb-improvements');
    const submitBtn = document.getElementById('fb-submit-btn');
    const successCard = document.getElementById('fb-success-card');
    const resetBtn = document.getElementById('fb-submit-another-btn');
    const closeSuccessBtn = document.getElementById('fb-close-success-btn');
    const alertBanner = document.getElementById('fb-server-alert');
    const bestCounter = document.getElementById('fb-best-counter');
    const improvementsCounter = document.getElementById('fb-improvements-counter');

    const openModal = () => {
      if (!modalBackdrop) return;
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (form && form.style.display !== 'none') {
          nameInput?.focus();
        }
      }, 60);
    };

    const closeModal = () => {
      if (!modalBackdrop) return;
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    this.openFeedbackModal = openModal;
    this.closeFeedbackModal = closeModal;

    // Bulletproof click delegation for any button or link opening feedback popup
    document.addEventListener('click', (e) => {
      if (e.target.closest('.open-feedback-modal-btn') || e.target.closest('#main-page-feedback-trigger') || e.target.closest('#hero-feedback-trigger')) {
        e.preventDefault();
        openModal();
        return;
      }
      if (e.target.closest('#close-feedback-modal') || e.target.closest('#fb-close-success-btn')) {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.target === modalBackdrop) {
        closeModal();
        return;
      }
    });

    // Escape key listener to close modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
        closeModal();
      }
    });

    // Field error containers
    const errors = {
      name: document.getElementById('fb-name-error'),
      email: document.getElementById('fb-email-error'),
      phone: document.getElementById('fb-phone-error'),
      best: document.getElementById('fb-best-error'),
      improvements: document.getElementById('fb-improvements-error')
    };

    const setFieldError = (inputEl, errorEl, message) => {
      if (!inputEl) return false;
      if (message) {
        inputEl.classList.add('input-invalid');
        inputEl.closest('.fb-form-group')?.classList.add('has-error');
        if (errorEl) {
          errorEl.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>${this.escapeHtml(message)}</span>
          `;
          errorEl.classList.add('visible');
        }
        return false;
      } else {
        inputEl.classList.remove('input-invalid');
        inputEl.closest('.fb-form-group')?.classList.remove('has-error');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('visible');
        }
        return true;
      }
    };

    // Validation rules according to user specifications:
    // 1. Name: must contain only alphabets, no numbers or special characters. Required.
    const validateName = () => {
      const val = (nameInput?.value || '').trim();
      if (!val) {
        return setFieldError(nameInput, errors.name, 'Name is required.');
      }
      // Only alphabets and spaces between names
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(val)) {
        return setFieldError(nameInput, errors.name, 'Name must contain only alphabets, no numbers or special characters.');
      }
      return setFieldError(nameInput, errors.name, null);
    };

    // 2. Email: must follow valid email format (example@example.com). Required.
    const validateEmail = () => {
      const val = (emailInput?.value || '').trim();
      if (!val) {
        return setFieldError(emailInput, errors.email, 'Email is required.');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return setFieldError(emailInput, errors.email, 'Please enter a valid email format (e.g. example@example.com).');
      }
      return setFieldError(emailInput, errors.email, null);
    };

    // 3. Phone Number: must be exactly 10 digits, numeric only. Required.
    const validatePhone = () => {
      const val = (phoneInput?.value || '').trim();
      if (!val) {
        return setFieldError(phoneInput, errors.phone, 'Phone number is required.');
      }
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(val)) {
        return setFieldError(phoneInput, errors.phone, 'Phone number must be exactly 10 digits, numeric only.');
      }
      return setFieldError(phoneInput, errors.phone, null);
    };

    // 4. Best Here: minimum 10 characters, required.
    const validateBest = () => {
      const val = (bestInput?.value || '').trim();
      if (!val) {
        return setFieldError(bestInput, errors.best, 'What is best here is required (minimum 10 characters).');
      }
      if (val.length < 10) {
        return setFieldError(bestInput, errors.best, `What is best here must be at least 10 characters (currently ${val.length}/10).`);
      }
      return setFieldError(bestInput, errors.best, null);
    };

    // 5. Improvements: optional, but if filled must be minimum 10 characters.
    const validateImprovements = () => {
      const val = (improvementsInput?.value || '').trim();
      if (!val) {
        // Optional - valid if empty
        return setFieldError(improvementsInput, errors.improvements, null);
      }
      if (val.length < 10) {
        return setFieldError(improvementsInput, errors.improvements, `What can be improved must be at least 10 characters if filled (currently ${val.length}/10).`);
      }
      return setFieldError(improvementsInput, errors.improvements, null);
    };

    // Character counter updates
    const updateCounters = () => {
      const bestLen = (bestInput?.value || '').trim().length;
      if (bestCounter) {
        bestCounter.textContent = `${bestLen} / 10 min chars`;
        if (bestLen >= 10) {
          bestCounter.classList.add('counter-valid');
          bestCounter.classList.remove('counter-error');
        } else if (bestLen > 0) {
          bestCounter.classList.remove('counter-valid');
          bestCounter.classList.add('counter-error');
        } else {
          bestCounter.classList.remove('counter-valid', 'counter-error');
        }
      }

      const impLen = (improvementsInput?.value || '').trim().length;
      if (improvementsCounter) {
        if (impLen === 0) {
          improvementsCounter.textContent = 'Optional (10 min if filled)';
          improvementsCounter.classList.remove('counter-valid', 'counter-error');
        } else if (impLen < 10) {
          improvementsCounter.textContent = `${impLen} / 10 min chars`;
          improvementsCounter.classList.add('counter-error');
          improvementsCounter.classList.remove('counter-valid');
        } else {
          improvementsCounter.textContent = `${impLen} chars (valid)`;
          improvementsCounter.classList.add('counter-valid');
          improvementsCounter.classList.remove('counter-error');
        }
      }
    };

    // Highlight Submit button once all required fields are validly filled
    const checkFormFilled = () => {
      const nameVal = (nameInput?.value || '').trim();
      const emailVal = (emailInput?.value || '').trim();
      const phoneVal = (phoneInput?.value || '').trim();
      const bestVal = (bestInput?.value || '').trim();
      const impVal = (improvementsInput?.value || '').trim();

      const isNameOk = /^[A-Za-z\s]+$/.test(nameVal) && nameVal.length > 0;
      const isEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      const isPhoneOk = /^\d{10}$/.test(phoneVal);
      const isBestOk = bestVal.length >= 10;
      const isImpOk = impVal.length === 0 || impVal.length >= 10;

      const isFilled = isNameOk && isEmailOk && isPhoneOk && isBestOk && isImpOk;

      if (submitBtn) {
        if (isFilled) {
          submitBtn.classList.add('btn-highlighted');
        } else {
          submitBtn.classList.remove('btn-highlighted');
        }
      }
      return isFilled;
    };

    // Attach Live Listeners
    nameInput?.addEventListener('blur', () => {
      validateName();
      checkFormFilled();
    });
    nameInput?.addEventListener('input', () => {
      checkFormFilled();
      if (nameInput.classList.contains('input-invalid')) validateName();
    });

    emailInput?.addEventListener('blur', () => {
      validateEmail();
      checkFormFilled();
    });
    emailInput?.addEventListener('input', () => {
      checkFormFilled();
      if (emailInput.classList.contains('input-invalid')) validateEmail();
    });

    phoneInput?.addEventListener('blur', () => {
      validatePhone();
      checkFormFilled();
    });
    phoneInput?.addEventListener('input', () => {
      // Auto strip non-digit characters for smooth user experience while ensuring numeric only
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      checkFormFilled();
      if (phoneInput.classList.contains('input-invalid')) validatePhone();
    });

    bestInput?.addEventListener('blur', () => {
      validateBest();
      checkFormFilled();
    });
    bestInput?.addEventListener('input', () => {
      updateCounters();
      checkFormFilled();
      if (bestInput.classList.contains('input-invalid')) validateBest();
    });

    improvementsInput?.addEventListener('blur', () => {
      validateImprovements();
      checkFormFilled();
    });
    improvementsInput?.addEventListener('input', () => {
      updateCounters();
      checkFormFilled();
      if (improvementsInput.classList.contains('input-invalid')) validateImprovements();
    });

    updateCounters();
    checkFormFilled();

    // Reset button on success card to submit another response
    resetBtn?.addEventListener('click', () => {
      if (successCard) successCard.style.display = 'none';
      if (form) form.style.display = 'block';
      form.reset();
      updateCounters();
      checkFormFilled();
      nameInput?.focus();
    });

    // Form Submission Handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (alertBanner) alertBanner.style.display = 'none';

      // Validate all fields
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isBestValid = validateBest();
      const isImpValid = validateImprovements();

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isBestValid || !isImpValid) {
        // Focus first invalid element
        if (!isNameValid) nameInput?.focus();
        else if (!isEmailValid) emailInput?.focus();
        else if (!isPhoneValid) phoneInput?.focus();
        else if (!isBestValid) bestInput?.focus();
        else if (!isImpValid) improvementsInput?.focus();
        return;
      }

      // Prepare payload
      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim().toLowerCase(),
        phone_number: phoneInput.value.trim(),
        best_here: bestInput.value.trim(),
        improvements: improvementsInput.value.trim() || null
      };

      // Set button to submitting state
      submitBtn.disabled = true;
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span class="pulse-ring" style="width: 16px; height: 16px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 0.8s linear infinite;"></span>
        <span>Submitting...</span>
      `;

      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Success! Clear form fields and show confirmation
          form.reset();
          updateCounters();
          
          // Clear any remaining invalid classes
          [nameInput, emailInput, phoneInput, bestInput, improvementsInput].forEach(inp => {
            inp?.classList.remove('input-invalid');
            inp?.closest('.fb-form-group')?.classList.remove('has-error');
          });
          Object.values(errors).forEach(err => {
            if (err) {
              err.textContent = '';
              err.classList.remove('visible');
            }
          });

          // Show Success Card inline
          form.style.display = 'none';
          if (successCard) {
            successCard.style.display = 'block';
            successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const doneCloseBtn = document.getElementById('fb-close-success-btn');
            if (doneCloseBtn) {
              doneCloseBtn.classList.add('fb-btn-done-highlight');
              setTimeout(() => doneCloseBtn.focus(), 100);
            }
          }
          AppUI.showToast('Thank you for your feedback!', 'check');
        } else if (response.status === 409) {
          // Duplicate email
          setFieldError(emailInput, errors.email, data.error || 'Feedback from this email has already been submitted.');
          emailInput?.focus();
          if (alertBanner) {
            alertBanner.textContent = data.error || 'Feedback from this email address has already been submitted. Thank you!';
            alertBanner.style.display = 'flex';
          }
        } else {
          // Other error
          if (alertBanner) {
            alertBanner.textContent = data.error || 'Failed to submit feedback. Please check your inputs.';
            alertBanner.style.display = 'flex';
          }
        }
      } catch (err) {
        console.error('Feedback submission error:', err);
        if (alertBanner) {
          alertBanner.textContent = 'Connection error. Please try again in a moment.';
          alertBanner.style.display = 'flex';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  },

  updateHeaderBadges() {
    const favBadge = document.getElementById('fav-count-badge');
    if (favBadge) {
      favBadge.textContent = AppState.favorites.length;
      favBadge.style.display = AppState.favorites.length > 0 ? 'inline-block' : 'none';
    }

    // Navigation links: Home, All Calculators (dropdown), New Launch, Game, Blogs (dropdown), Investing Account, Favorites, Feedback
    const navLinksEl = document.querySelector('.nav-links');
    if (navLinksEl) {
      const curHash = window.location.hash || '#/';
      const isHome = (curHash === '#/' || curHash === '#' || curHash === '' || curHash === '#/home');
      const isAllCalcs = (curHash.startsWith('#/calculators') || curHash === '#/categories' || curHash.startsWith('#/category/'));
      const isNewLaunch = (curHash === '#/new-launch');
      const isGame = (curHash === '#/game');
      const isBlogs = (curHash.startsWith('#/blog'));
      const isFavs = (curHash === '#/favorites');

      navLinksEl.innerHTML = `
        <li class="nav-item ${isHome ? 'active' : ''}"><a href="#/home">Home</a></li>

        <!-- All Calculators with Dropdown & Subcategories -->
        <li class="nav-item nav-item-has-dropdown dropdown ${isAllCalcs ? 'active' : ''}">
          <a href="#/calculators/all" class="nav-dropdown-trigger dropdown-toggle" title="All Calculators">
            <span>All Calculators</span>
            <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </a>
          <ul class="dropdown-menu nav-dropdown-menu glass-panel">
            <!-- Finance with Flyout Submenu -->
            <li class="dropdown-submenu-item nav-dropdown-item-wrapper">
              <a href="#/calculators/finance" class="nav-dropdown-item nav-dropdown-item-has-sub">
                <span class="dropdown-item-icon" style="color: #10b981;">${getIconSvg('wallet', 18)}</span>
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Finance</span>
                  <span class="dropdown-item-desc">Loans, SIP, Trading &amp; Wealth</span>
                </div>
                <svg class="submenu-chevron-right" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </a>
              <ul class="dropdown-menu sub-dropdown-menu nav-dropdown-submenu">
                <li><a href="#/calculators/finance/emi-loan" class="nav-sub-item"><span class="sub-icon">💳</span><span>EMI &amp; Loan Calculators</span></a></li>
                <li><a href="#/calculators/finance/sip" class="nav-sub-item"><span class="sub-icon">🔄</span><span>SIP Calculators</span></a></li>
                <li><a href="#/calculators/finance/trading" class="nav-sub-item"><span class="sub-icon">📊</span><span>Trading Calculators</span></a></li>
                <li><a href="#/calculators/finance/investment" class="nav-sub-item"><span class="sub-icon">📈</span><span>Investment Calculators</span></a></li>
                <li><a href="#/calculator/us-stocks-calculator" class="nav-sub-item"><span class="sub-icon">🇺🇸</span><span>US Stocks Calculator</span></a></li>
                <li class="nav-dropdown-divider"></li>
                <li><a href="#/calculators/finance" class="nav-sub-item" style="color: #10b981; font-weight: 700;"><span>View All Finance →</span></a></li>
              </ul>
            </li>

            <!-- Math with Flyout Submenu -->
            <li class="dropdown-submenu-item nav-dropdown-item-wrapper">
              <a href="#/calculators/math" class="nav-dropdown-item nav-dropdown-item-has-sub">
                <span class="dropdown-item-icon" style="color: #6366f1;">${getIconSvg('square-root', 18)}</span>
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Math</span>
                  <span class="dropdown-item-desc">Basic, Advanced &amp; Analytics</span>
                </div>
                <svg class="submenu-chevron-right" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </a>
              <ul class="dropdown-menu sub-dropdown-menu nav-dropdown-submenu">
                <li><a href="#/calculators/math/basic" class="nav-sub-item"><span class="sub-icon">➕</span><span>Basic Math Tools</span></a></li>
                <li><a href="#/calculators/math/advanced" class="nav-sub-item"><span class="sub-icon">📐</span><span>Advanced Math Tools</span></a></li>
                <li><a href="#/calculators/math/statistics" class="nav-sub-item"><span class="sub-icon">🎲</span><span>Probability &amp; Statistics</span></a></li>
                <li><a href="#/calculators/math/comparison" class="nav-sub-item"><span class="sub-icon">⚖️</span><span>Comparison Tools</span></a></li>
                <li class="nav-dropdown-divider"></li>
                <li><a href="#/calculators/math" class="nav-sub-item" style="color: #6366f1; font-weight: 700;"><span>View All Math Tools →</span></a></li>
              </ul>
            </li>

            <!-- Health with Flyout Submenu -->
            <li class="dropdown-submenu-item nav-dropdown-item-wrapper">
              <a href="#/calculators/health" class="nav-dropdown-item nav-dropdown-item-has-sub">
                <span class="dropdown-item-icon" style="color: #f43f5e;">${getIconSvg('heart-pulse', 18)}</span>
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">Health</span>
                  <span class="dropdown-item-desc">General, Medical Scores &amp; Wellness</span>
                </div>
                <svg class="submenu-chevron-right" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
              </a>
              <ul class="dropdown-menu sub-dropdown-menu nav-dropdown-submenu">
                <li><a href="#/calculators/health/general" class="nav-sub-item"><span class="sub-icon">🩺</span><span>General Health</span></a></li>
                <li><a href="#/calculators/health/scores" class="nav-sub-item"><span class="sub-icon">📋</span><span>Medical Scores</span></a></li>
                <li><a href="#/calculators/health/wellness" class="nav-sub-item"><span class="sub-icon">🌿</span><span>Wellness &amp; Lifestyle</span></a></li>
                <li class="nav-dropdown-divider"></li>
                <li><a href="#/calculators/health" class="nav-sub-item" style="color: #f43f5e; font-weight: 700;"><span>View All Health Tools →</span></a></li>
              </ul>
            </li>

            <li class="nav-dropdown-divider"></li>

            <li>
              <a href="#/calculators/all" class="nav-dropdown-item nav-dropdown-all">
                <span class="dropdown-item-icon" style="color: #fbbf24;">${getIconSvg('calculator', 18)}</span>
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">All Calculators Directory</span>
                  <span class="dropdown-item-desc">Browse complete 110+ directory</span>
                </div>
                <span class="dropdown-arrow-hint">→</span>
              </a>
            </li>
          </ul>
        </li>

        <!-- New Launch (Hidden on letscalculate.in) -->
        <li class="nav-item nav-item-new-launch ${isNewLaunch ? 'active' : ''}" style="display: none !important;">
          <a href="#/new-launch">
            <span>New Launch</span>
            <span class="nav-new-badge">NEW</span>
          </a>
        </li>

        <!-- Game (Hidden on letscalculate.in) -->
        <li class="nav-item nav-item-game ${isGame ? 'active' : ''}" style="display: none !important;">
          <a href="#/game">
            <span>Game</span>
            <span class="nav-game-badge">🎮</span>
          </a>
        </li>

        <!-- Blogs with Dropdown -->
        <li class="nav-item nav-item-has-dropdown dropdown ${isBlogs ? 'active' : ''}">
          <a href="#/blogs" class="nav-dropdown-trigger dropdown-toggle" title="Blogs &amp; Guides">
            <span>Blogs</span>
            <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
          </a>
          <ul class="dropdown-menu nav-dropdown-menu glass-panel">
            <li>
              <a href="#/blogs/nps" class="nav-dropdown-item">
                <span class="dropdown-item-icon" style="color: #10b981;">${getIconSvg('award', 18)}</span>
                <div class="dropdown-item-content">
                  <span class="dropdown-item-badge">Featured Guide</span>
                  <span class="dropdown-item-title">Understanding NPS</span>
                  <span class="dropdown-item-desc">National Pension System Guide</span>
                </div>
              </a>
            </li>
            <li class="nav-dropdown-divider"></li>
            <li>
              <a href="#/blogs" class="nav-dropdown-item nav-dropdown-all">
                <span class="dropdown-item-icon" style="color: #818cf8;">${getIconSvg('sparkles', 18)}</span>
                <div class="dropdown-item-content">
                  <span class="dropdown-item-title">All Articles &amp; Guides</span>
                  <span class="dropdown-item-desc">Browse complete knowledge base</span>
                </div>
                <span class="dropdown-arrow-hint">→</span>
              </a>
            </li>
          </ul>
        </li>

        <!-- Investing Account -->
        <li class="nav-item">
          <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="nav-invest-pill" title="Open Investing Account on Zerodha">
            ${getIconSvg('trending-up', 13)}
            <span class="invest-label-long">Investing Account</span>
            <span class="invest-label-short">Invest</span>
          </a>
        </li>

        <!-- Favorites -->
        <li class="nav-item ${isFavs ? 'active' : ''}"><a href="#/favorites">Favorites</a></li>

        <!-- Feedback -->
        <li class="nav-item">
          <button type="button" class="nav-feedback-pill open-feedback-modal-btn" title="Open Feedback Form">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Feedback</span>
          </button>
        </li>
      `;
    }

    const authContainer = document.getElementById('header-auth-container');
    if (authContainer) {
      if (AppState.isLoggedIn()) {
        const user = AppState.currentUser;
        const initial = (user.name || 'U').charAt(0).toUpperCase();
        const firstName = user.name ? user.name.split(' ')[0] : 'Member';
        authContainer.innerHTML = `
          <div class="user-pill-dropdown-wrap">
            <a href="#/profile" class="header-user-btn" title="View Profile (${user.name})">
              <span class="avatar-circle">${initial}</span>
              <span class="user-name-text">${firstName}</span>
              <span class="user-tier-badge">FREE</span>
            </a>
            <button type="button" class="btn-header-logout" id="quick-logout-btn" title="Sign Out">
              ${getIconSvg('log-out', 16)}
            </button>
          </div>
        `;
        document.getElementById('quick-logout-btn')?.addEventListener('click', (e) => {
          e.preventDefault();
          AppState.logout();
        });
      } else {
        authContainer.innerHTML = `
          <a href="#/login" class="btn-auth-signin">Sign In</a>
          <a href="#/signup" class="btn-auth-signup">
            ${getIconSvg('sparkles', 14)}
            <span>Sign Up Free</span>
          </a>
        `;
      }
    }
  },

  showToast(message, icon = 'check') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${getIconSvg(icon, 18)}</span>
      <span>${this.escapeHtml(message)}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  },

  updateSeoMeta(title, description, canonicalUrl, schemaData = null) {
    if (title) document.title = title;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    if (description) metaDesc.content = description;

    // Dynamic Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (canonicalUrl) canonical.href = canonicalUrl;

    // Dynamic OpenGraph Tags
    const setMetaProp = (prop, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMetaProp('og:title', title);
    setMetaProp('og:description', description);
    setMetaProp('og:url', canonicalUrl || window.location.href);

    // Dynamic Twitter Tags
    const setMetaName = (name, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);

    // Dynamic Schema.org JSON-LD
    let dynamicSchema = document.getElementById('dynamic-seo-schema');
    if (schemaData) {
      if (!dynamicSchema) {
        dynamicSchema = document.createElement('script');
        dynamicSchema.id = 'dynamic-seo-schema';
        dynamicSchema.type = 'application/ld+json';
        document.head.appendChild(dynamicSchema);
      }
      dynamicSchema.textContent = JSON.stringify(schemaData);
    } else if (dynamicSchema) {
      dynamicSchema.remove();
    }
  },

  handleRoute() {
    // Clear any timers
    if (AppState.countdownInterval) clearInterval(AppState.countdownInterval);
    if (AppState.worldClockInterval) clearInterval(AppState.worldClockInterval);

    let rawHash = window.location.hash || '#/';
    if (AppState.currentRoute && AppState.currentRoute !== rawHash) {
      AppState.previousRoute = AppState.currentRoute;
    }
    AppState.currentRoute = rawHash;
    let queryString = '';
    if (rawHash.includes('?')) {
      const parts = rawHash.split('?');
      rawHash = parts[0];
      queryString = parts[1] || '';
    }
    let hash = rawHash;
    if (hash.length > 2 && hash.endsWith('/')) {
      hash = hash.slice(0, -1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav link
    document.querySelectorAll('.nav-links .nav-item').forEach(item => {
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === hash) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Public Informational, Educational Blog & Legal Pages
    // Support both hash and pathname routing
    if (
      hash === '#/blog/nps' || hash === '#blog/nps' || hash === '#/blogs/nps' || hash === '#blogs/nps' ||
      (typeof window !== 'undefined' && window.location.pathname && (window.location.pathname.endsWith('/blog/nps') || window.location.pathname.endsWith('/blogs/nps')))
    ) {
      this.renderNpsBlogPage();
      this.updateHeaderBadges();
      return;
    }
    if (
      hash === '#/blogs' || hash === '#/blog' || hash === '#blogs' || hash === '#blog' ||
      (typeof window !== 'undefined' && window.location.pathname && (window.location.pathname.endsWith('/blogs') || window.location.pathname.endsWith('/blog')))
    ) {
      this.renderBlogsPage();
      this.updateHeaderBadges();
      return;
    }
    if (
      hash === '#/new-launch' || hash === '#new-launch' ||
      (typeof window !== 'undefined' && window.location.pathname && window.location.pathname.endsWith('/new-launch'))
    ) {
      this.renderHomePage();
      this.updateHeaderBadges();
      return;
    }
    if (
      hash === '#/game' || hash === '#game' ||
      hash === '#/game/cross-math' || hash === '#/cross-math' ||
      hash === '#/calculator/cross-math-game' ||
      (typeof window !== 'undefined' && window.location.pathname && (
        window.location.pathname.endsWith('/game') ||
        window.location.pathname.endsWith('/game/cross-math') ||
        window.location.pathname.endsWith('/cross-math') ||
        window.location.pathname.endsWith('/calculator/cross-math-game')
      ))
    ) {
      this.renderHomePage();
      this.updateHeaderBadges();
      return;
    }

    if (
      hash === '#/calculators/jewellery-price' ||
      hash === '#/calculator/jewellery-price' ||
      hash === '#/calculators/jewellery-price-calculator' ||
      (typeof window !== 'undefined' && window.location.pathname && (
        window.location.pathname.endsWith('/calculators/jewellery-price') ||
        window.location.pathname.endsWith('/calculator/jewellery-price')
      ))
    ) {
      this.renderCalculatorPage('jewellery-price-calculator');
      this.updateHeaderBadges();
      return;
    }
    const curPath = (typeof window !== 'undefined' && window.location.pathname) ? window.location.pathname : '';

    // Finance Subcategories
    if (hash === '#/calculators/finance/emi-loan' || hash === '#/calculators/finance/emi-loans' || (curPath && (curPath.endsWith('/calculators/finance/emi-loan') || curPath.endsWith('/calculators/finance/emi-loans')))) {
      this.renderCategoryPage('financial', 'emi-loan');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/finance/sip' || (curPath && curPath.endsWith('/calculators/finance/sip'))) {
      this.renderCategoryPage('financial', 'sip');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/finance/trading' || (curPath && curPath.endsWith('/calculators/finance/trading'))) {
      this.renderCategoryPage('financial', 'trading');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/finance/investment' || hash === '#/calculators/finance/investments' || (curPath && (curPath.endsWith('/calculators/finance/investment') || curPath.endsWith('/calculators/finance/investments')))) {
      this.renderCategoryPage('financial', 'investment');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/finance' || hash === '#calculators/finance' || (curPath && curPath.endsWith('/calculators/finance'))) {
      this.renderCategoryPage('financial');
      this.updateHeaderBadges();
      return;
    }

    // Math Subcategories
    if (hash === '#/calculators/math/basic' || hash === '#/calculators/math/basic-math' || (curPath && (curPath.endsWith('/calculators/math/basic') || curPath.endsWith('/calculators/math/basic-math')))) {
      this.renderCategoryPage('math', 'basic');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/math/advanced' || hash === '#/calculators/math/advanced-math' || (curPath && (curPath.endsWith('/calculators/math/advanced') || curPath.endsWith('/calculators/math/advanced-math')))) {
      this.renderCategoryPage('math', 'advanced');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/math/statistics' || hash === '#/calculators/math/stats' || (curPath && (curPath.endsWith('/calculators/math/statistics') || curPath.endsWith('/calculators/math/stats')))) {
      this.renderCategoryPage('math', 'statistics');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/math/comparison' || hash === '#/calculators/math/comparison-affordability' || (curPath && (curPath.endsWith('/calculators/math/comparison') || curPath.endsWith('/calculators/math/comparison-affordability')))) {
      this.renderCategoryPage('math', 'comparison');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/math' || hash === '#calculators/math' || (curPath && curPath.endsWith('/calculators/math'))) {
      this.renderCategoryPage('math');
      this.updateHeaderBadges();
      return;
    }

    // Health Subcategories
    if (hash === '#/calculators/health/general' || hash === '#/calculators/health/general-health' || (curPath && (curPath.endsWith('/calculators/health/general') || curPath.endsWith('/calculators/health/general-health')))) {
      this.renderCategoryPage('health', 'general');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/health/scores' || hash === '#/calculators/health/medical-scores' || (curPath && (curPath.endsWith('/calculators/health/scores') || curPath.endsWith('/calculators/health/medical-scores')))) {
      this.renderCategoryPage('health', 'scores');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/health/wellness' || hash === '#/calculators/health/wellness-lifestyle' || (curPath && (curPath.endsWith('/calculators/health/wellness') || curPath.endsWith('/calculators/health/wellness-lifestyle')))) {
      this.renderCategoryPage('health', 'wellness');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/health' || hash === '#calculators/health' || (curPath && curPath.endsWith('/calculators/health'))) {
      this.renderCategoryPage('health');
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/calculators/all' || hash === '#calculators/all' || hash === '#/calculators' || hash.startsWith('#/hub')) {
      this.renderCategoriesPage();
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/home' || hash === '#home') {
      this.renderHomePage();
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/about') {
      this.renderAboutPage();
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/terms') {
      this.renderTermsPage();
      this.updateHeaderBadges();
      return;
    }
    if (hash === '#/privacy') {
      this.renderPrivacyPage();
      this.updateHeaderBadges();
      return;
    }


    // NO SIGNUP REQUIRED: Unauthenticated visitors have 100% free immediate access to all calculators!

    // LOGGED IN USER: If visiting auth routes, redirect to home page
    if (hash === '#/login' || hash === '#/signup') {
      window.location.hash = '#/';
      return;
    }

    if (hash === '#/' || hash === '#' || hash === '') {
      this.renderHomePage();
    } else if (hash === '#/broker-calculator' || hash === '#/invest' || hash === '#/broker-selection' || hash === '#/investing-in-us-stocks') {
      const scrollToBroker = () => {
        const usStocksEl = document.getElementById('us-stocks-broker-section');
        const brokerEl = usStocksEl || document.getElementById('home-broker-module');
        if (brokerEl) {
          brokerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          brokerEl.classList.remove('emi-section-highlight');
          void brokerEl.offsetWidth;
          brokerEl.classList.add('emi-section-highlight');
        }
      };
      if (document.getElementById('home-broker-module')) {
        scrollToBroker();
      } else {
        this.renderHomePage();
        setTimeout(scrollToBroker, 70);
      }
    } else if (hash === '#/emi-suite') {
      const scrollToEmi = () => {
        const emiSection = document.getElementById('home-emi-suite-section');
        const emiPanel = document.getElementById('home-emi-suite-panel');
        if (emiSection) {
          emiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (emiPanel) {
            emiPanel.classList.remove('emi-section-highlight');
            void emiPanel.offsetWidth;
            emiPanel.classList.add('emi-section-highlight');
          }
        }
      };
      if (document.getElementById('home-emi-suite-section')) {
        scrollToEmi();
      } else {
        this.renderHomePage();
        setTimeout(scrollToEmi, 70);
      }
    } else if (hash === '#/categories' || hash === '#/calculators') {
      this.renderAllCategoriesPage();
    } else if (hash.startsWith('#/category/')) {
      const catId = hash.replace('#/category/', '');
      this.renderCategoryPage(catId);
    } else if (hash.startsWith('#/calculator/')) {
      const calcId = hash.replace('#/calculator/', '');
      this.renderCalculatorPage(calcId);
    } else if (hash === '#/profile' || hash === '#/account') {
      this.renderProfilePage();
    } else if (hash === '#/favorites') {
      this.renderFavoritesPage();
    } else {
      this.renderHomePage();
    }

    this.updateHeaderBadges();
  },

  // ==========================================
  // VIEW: ABOUT US PAGE
  // ==========================================

  // ==========================================
  // VIEW: DEDICATED NPS EDUCATIONAL BLOG PAGE
  // ==========================================
  
  // ==========================================
  // VIEW: BLOGS HUB PAGE (All Articles & Guides)
  // ==========================================
  renderBlogsPage() {
    this.updateSeoMeta(
      'Financial Guides, Calculation Blogs & Wealth Wisdom | letscalculate.in',
      'Read in-depth financial planning guides including Understanding NPS (National Pension System), Section 80CCD tax saving, SIP step-up compounding analysis, and loan prepayment vs investing math.',
      'https://letscalculate.in/#/blogs'
    );

    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    const articles = [
      {
        id: 'nps',
        title: 'Understanding NPS (National Pension System)',
        subtitle: 'Complete Guide: Tier I vs Tier II, Section 80CCD(1B) Tax Deductions, Annuity & Retirement Returns',
        summary: 'Master NPS Tier I vs Tier II differences, claim an exclusive ₹50,000 tax deduction under Section 80CCD(1B), and understand 60% tax-free lump sum withdrawal at age 60.',
        readTime: '8 min read',
        category: 'Tax & Retirement',
        badge: 'Featured Guide • PFRDA Regulated',
        link: '#/blogs/nps',
        date: 'Updated Oct 2026',
        calcLink: '#/calculator/nps-calculator',
        calcText: 'Open NPS Calculator',
        tags: ['Retirement', '80CCD(1B)', 'PFRDA', 'Tax Saving']
      },
      {
        id: 'sip-compounding',
        title: 'The Power of SIP Step-Up Compounding: Build 2x Wealth',
        subtitle: 'Why an annual 10% increment dramatically outpaces flat monthly contributions over 15+ years',
        summary: 'Why stepping up your SIP contributions by 10% annually inline with salary increments creates more than double the final retirement corpus compared to a flat monthly SIP.',
        readTime: '6 min read',
        category: 'Wealth Building',
        badge: 'Investment Strategy',
        link: '#/calculator/sip-step-up-calculator',
        date: 'Updated Oct 2026',
        calcLink: '#/calculator/sip-step-up-calculator',
        calcText: 'Try Step-Up Calculator',
        tags: ['Mutual Funds', 'Compounding', 'SIP', 'Equity']
      },
      {
        id: 'loan-prepayment',
        title: 'Home Loan Prepayment vs. Equity Investing: The Math',
        subtitle: 'A scientific framework for deciding whether to clear 8.5% mortgage debt or invest in 12% equity index funds',
        summary: 'A deep-dive mathematical comparison between prepaying an 8.5% home loan early vs investing that surplus cash into a 12% equity mutual fund SIP.',
        readTime: '7 min read',
        category: 'Debt & Loans',
        badge: 'Loan Optimization',
        link: '#/calculator/loan-prepayment-calculator',
        date: 'Updated Oct 2026',
        calcLink: '#/calculator/loan-prepayment-calculator',
        calcText: 'Prepayment Calculator',
        tags: ['Home Loans', 'Interest Savings', 'Opportunity Cost']
      },
      {
        id: 'brokerage-charges',
        title: 'Demystifying Stock & Options Brokerage in India',
        subtitle: 'The transparent truth behind STT, exchange turnover fees, SEBI charges, stamp duty, and GST',
        summary: 'Understanding the complete statutory cost structure of equity delivery, intraday, and F&O trading: STT/CTT, exchange transaction fees, SEBI turnover charges, and GST.',
        readTime: '6 min read',
        category: 'Active Trading',
        badge: 'Trading Insights',
        link: '#/calculator/brokerage-calculator',
        date: 'Updated Oct 2026',
        calcLink: '#/calculator/brokerage-calculator',
        calcText: 'Open Brokerage Calculator',
        tags: ['F&O Trading', 'STT Charges', 'Zerodha', 'Turnover']
      },
      {
        id: 'bmi-metabolism',
        title: 'Beyond the Scale: Understanding BMI, BMR & Body Composition',
        subtitle: 'Why body weight alone is deceiving, and how calculating BMR & TDEE unlocks sustainable health',
        summary: 'Why scale weight and BMI are initial screening metrics, and how understanding your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) accelerates fat loss.',
        readTime: '5 min read',
        category: 'Health & Fitness',
        badge: 'Wellness Science',
        link: '#/calculator/calorie-calculator',
        date: 'Updated Oct 2026',
        calcLink: '#/calculator/calorie-calculator',
        calcText: 'Calculate Daily Calories',
        tags: ['Metabolic Rate', 'TDEE', 'Calorie Deficit', 'Fitness']
      }
    ];

    mainEl.innerHTML = `
      <div class="container blogs-page-wrapper">
        <div class="calc-breadcrumb">
          <a href="#/home">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>Blogs &amp; Financial Guides</span>
        </div>

        <div class="blogs-hero">
          <div class="blogs-badge">
            ${getIconSvg('award', 15)}
            <span>Knowledge Base &amp; Calculation Guides</span>
          </div>
          <h1 class="blogs-title">Financial Wisdom &amp; Calculation Guides</h1>
          <p class="blogs-desc">
            Evidence-based educational articles, tax optimization strategies, and algorithmic breakdowns to help you make smarter financial, mathematical, and health decisions.
          </p>
        </div>

        <!-- Featured NPS Article Banner -->
        <div class="blog-card glass-panel" style="margin-bottom: 2rem; border-color: rgba(16, 185, 129, 0.35); background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 18, 30, 0.95) 100%);">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="blog-card-top-meta">
              <span class="blog-badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border-color: rgba(16, 185, 129, 0.4);">⭐ FEATURED ARTICLE</span>
              <span class="blog-read-time">8 min read • PFRDA Regulated</span>
            </div>
            <h2 class="blog-card-title" style="font-size: 1.6rem; color: #ffffff;">Understanding NPS (National Pension System)</h2>
            <p style="color: #94a3b8; font-size: 0.96rem; line-height: 1.6; max-width: 900px;">
              Master NPS Tier I vs Tier II differences, claim an exclusive ₹50,000 tax deduction under Section 80CCD(1B), explore 60% tax-free lump sum withdrawal at age 60, and calculate your compounding retirement corpus.
            </p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span class="hub-input-pill" style="color: #34d399;">Tax Saving 80CCD(1B)</span>
              <span class="hub-input-pill">Retirement Planning</span>
              <span class="hub-input-pill">Tier I vs Tier II</span>
              <span class="hub-input-pill">Annuity Pension</span>
            </div>
            <div class="blog-card-cta" style="margin-top: 0.5rem;">
              <a href="#/blogs/nps" class="blog-read-btn" style="background: var(--emerald); color: #ffffff;">
                <span>Read Complete NPS Guide</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
              <a href="#/calculator/nps-calculator" class="quick-tag" style="font-size: 0.85rem; font-weight: 700;">
                Open Interactive NPS Calculator →
              </a>
            </div>
          </div>
        </div>

        <!-- Other Articles Grid -->
        <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-primary);">All Knowledge Base Guides</h3>
        <div class="blogs-grid">
          ${articles.map(art => `
            <div class="blog-card glass-panel">
              <div>
                <div class="blog-card-top-meta">
                  <span class="blog-badge">${art.badge}</span>
                  <span class="blog-read-time">${art.readTime}</span>
                </div>
                <h2 class="blog-card-title">${art.title}</h2>
                <p class="blog-card-summary">${art.summary}</p>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem;">
                  ${art.tags.map(t => `<span class="hub-input-pill" style="font-size: 0.72rem;">${t}</span>`).join('')}
                </div>
              </div>
              <div class="blog-card-cta">
                <a href="${art.link}" class="blog-read-btn">
                  <span>${art.id === 'nps' ? 'Read Complete Guide' : 'Explore Guide & Tool'}</span>
                  ${getIconSvg('arrow-right', 16)}
                </a>
                <a href="${art.calcLink}" class="quick-tag" style="font-size: 0.8rem; font-weight: 600;">
                  ${art.calcText}
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==========================================
  // VIEW: NEW LAUNCH PAGE
  // ==========================================
  renderNewLaunchPage() {
    this.updateSeoMeta(
      'Newly Launched Calculators | letscalculate.in',
      'Discover the latest high-precision financial, mathematical, and health calculators with interactive inputs, real-time results, and visual breakdowns.',
      'https://letscalculate.in/#/new-launch'
    );

    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    // Filter newly launched calculators
    const newCalcs = CALCULATORS_DATA.filter(c => {
      if (typeof isNewCalculator === 'function' && isNewCalculator(c)) return true;
      const id = c.id;
      return (
        id.includes('advanced-sip') || id.includes('step-up') || id.includes('goal-planner') ||
        id.includes('brokerage') || id.includes('margin') || id.includes('options-profit') ||
        id.includes('futures') || id.includes('mutual-fund-returns') || id.includes('jewellery') ||
        id.includes('algebra') || id.includes('matrix') || id.includes('prime-factorization') ||
        id.includes('age-calendar') || id.includes('apgar') || id.includes('glasgow') ||
        id.includes('gfr') || id.includes('burns-fluid') || id.includes('nutrition-planner')
      );
    });

    mainEl.innerHTML = `
      <div class="container new-launch-page-wrapper">
        <div class="calc-breadcrumb">
          <a href="#/home">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>New Launch Showcase</span>
        </div>

        <div class="new-launch-hero">
          <div class="new-launch-badge">
            ${getIconSvg('sparkles', 15)}
            <span>Fresh Releases • 100% Free &amp; Private</span>
          </div>
          <h1 class="new-launch-title">Newly Launched Precision Calculators</h1>
          <p class="new-launch-desc">
            Explore our latest tools designed with state-of-the-art algorithms, dynamic visual charts, and instant precision calculation.
          </p>
        </div>

        <!-- Category Filter Chips -->
        <div class="new-launch-filter-bar" id="new-launch-filter-bar">
          <button type="button" class="new-launch-filter-btn active" data-filter="all">All Fresh Tools (${newCalcs.length})</button>
          <button type="button" class="new-launch-filter-btn" data-filter="financial">💳 Finance (${newCalcs.filter(c => c.category === 'financial').length})</button>
          <button type="button" class="new-launch-filter-btn" data-filter="math">📐 Math (${newCalcs.filter(c => c.category === 'math').length})</button>
          <button type="button" class="new-launch-filter-btn" data-filter="health">🩺 Health (${newCalcs.filter(c => c.category === 'health').length})</button>
        </div>

        <!-- Cards Grid -->
        <div class="calc-hub-cards-grid" id="new-launch-cards-grid">
          ${newCalcs.map(calc => {
            const inputsText = (typeof getCalcInputsSummary === 'function') ? getCalcInputsSummary(calc) : 'Key Inputs';
            const outputsText = (typeof getCalcOutputsSummary === 'function') ? getCalcOutputsSummary(calc) : 'Calculated Results';
            const inputsList = inputsText.split(' • ').map(s => s.trim()).filter(Boolean);
            const outputsList = outputsText.split(' • ').map(s => s.trim()).filter(Boolean);

            let accent = '#10b981';
            if (calc.category === 'math') accent = '#6366f1';
            if (calc.category === 'health') accent = '#f43f5e';

            return `
              <div class="calc-hub-card glass-panel" style="--card-accent: ${accent};" data-cat="${calc.category}">
                <div>
                  <div class="hub-card-header">
                    <div class="hub-card-icon-title">
                      <div class="hub-card-icon-box">
                        ${getIconSvg(calc.icon || 'calculator', 20)}
                      </div>
                      <div>
                        <h3 class="hub-card-title">${calc.title}</h3>
                        <span class="hub-card-cat-badge">${calc.category.toUpperCase()}</span>
                      </div>
                    </div>
                    <span class="hub-card-badge">NEW</span>
                  </div>

                  <p class="hub-card-desc">${calc.summary || calc.description}</p>

                  <div class="hub-card-meta-row">
                    <div class="hub-card-meta-label">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="8 17 12 21 16 17"/><line x1="12" x2="12" y1="3" y2="21"/></svg>
                      <span>Key Inputs:</span>
                    </div>
                    <div class="hub-card-pills-wrap">
                      ${inputsList.map(item => `<span class="hub-input-pill">${item}</span>`).join('')}
                    </div>
                  </div>

                  <div class="hub-card-meta-row outputs-row">
                    <div class="hub-card-meta-label">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 7 12 3 8 7"/><line x1="12" x2="12" y1="21" y2="3"/></svg>
                      <span>Outputs:</span>
                    </div>
                    <div class="hub-card-pills-wrap">
                      ${outputsList.map(item => `<span class="hub-output-pill">${item}</span>`).join('')}
                    </div>
                  </div>
                </div>

                <div class="hub-card-action">
                  <a href="#/calculator/${calc.id}" class="btn-hub-calculate">
                    <span>Launch Calculator</span>
                    ${getIconSvg('arrow-right', 15)}
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Filter bar event handlers
    const filterBtns = mainEl.querySelectorAll('.new-launch-filter-btn');
    const cards = mainEl.querySelectorAll('#new-launch-cards-grid .calc-hub-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-cat') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==========================================
  // VIEW: GAME ARENA (Speed Math & Tycoon)
  // ==========================================
  renderGamePage(initialMode = 'crossmath') {
    this.updateSeoMeta(
      'Finance & Math Game Arena | letscalculate.in',
      'Test your financial reflexes, speed calculation skills, and build a virtual ₹1,00,000 investment portfolio in this interactive brain arena.',
      'https://letscalculate.in/#/game'
    );

    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    mainEl.innerHTML = `
      <div class="container game-page-wrapper">
        <div class="calc-breadcrumb">
          <a href="#/home">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>Game Arena</span>
        </div>

        <div class="game-hero">
          <div class="game-badge">
            ${getIconSvg('sparkles', 15)}
            <span>Cross Math Puzzle &amp; Investment Simulation</span>
          </div>
          <h1 class="game-title">Finance &amp; Math Game Arena</h1>
          <p class="section-desc" style="max-width: 650px; margin: 0 auto;">
            Solve progressive Cross Math equations, test speed calculation reflexes, or build an investment empire from ₹1 Lakh.
          </p>
        </div>

        <div class="game-mode-selector">
          <button type="button" class="game-mode-card ${initialMode === 'crossmath' ? 'active' : ''}" id="game-mode-crossmath-btn">
            <span>🧩</span>
            <span>Cross Math (Progressive)</span>
            <span class="badge badge-emerald" style="font-size: 0.65rem; margin-left: 4px;">HOT</span>
          </button>
          <button type="button" class="game-mode-card ${initialMode === 'blitz' ? 'active' : ''}" id="game-mode-blitz-btn">
            <span>⚡</span>
            <span>Speed Math &amp; ROI Blitz</span>
          </button>
          <button type="button" class="game-mode-card ${initialMode === 'tycoon' ? 'active' : ''}" id="game-mode-tycoon-btn">
            <span>📈</span>
            <span>Compound Wealth Tycoon</span>
          </button>
        </div>

        <!-- Active Game Container -->
        <div id="game-arena-content"></div>
      </div>
    `;

    const contentEl = document.getElementById('game-arena-content');
    const crossmathBtn = document.getElementById('game-mode-crossmath-btn');
    const blitzBtn = document.getElementById('game-mode-blitz-btn');
    const tycoonBtn = document.getElementById('game-mode-tycoon-btn');

    const loadCrossMath = () => {
      crossmathBtn?.classList.add('active');
      blitzBtn?.classList.remove('active');
      tycoonBtn?.classList.remove('active');
      this.initCrossMathGame(contentEl);
    };

    const loadBlitz = () => {
      blitzBtn?.classList.add('active');
      crossmathBtn?.classList.remove('active');
      tycoonBtn?.classList.remove('active');
      this.initSpeedMathGame(contentEl);
    };

    const loadTycoon = () => {
      tycoonBtn?.classList.add('active');
      crossmathBtn?.classList.remove('active');
      blitzBtn?.classList.remove('active');
      this.initTycoonGame(contentEl);
    };

    crossmathBtn?.addEventListener('click', loadCrossMath);
    blitzBtn?.addEventListener('click', loadBlitz);
    tycoonBtn?.addEventListener('click', loadTycoon);

    if (initialMode === 'blitz') {
      loadBlitz();
    } else if (initialMode === 'tycoon') {
      loadTycoon();
    } else {
      loadCrossMath();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==========================================
  // GAME MODE: CROSS MATH PROGRESSIVE PUZZLE
  // ==========================================
  initCrossMathGame(mountEl) {
    if (!mountEl) return;

    const STORAGE_KEY = 'cross_math_game_progress_v2';
    const loadState = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            unlocked: {
              easy: true,
              medium: !!(parsed.unlocked && parsed.unlocked.medium),
              hard: !!(parsed.unlocked && parsed.unlocked.hard)
            },
            currentLevel: parsed.currentLevel || 'easy',
            stats: {
              easy: (parsed.stats && parsed.stats.easy) || { solved: false, bestScore: 0, bestTime: null },
              medium: (parsed.stats && parsed.stats.medium) || { solved: false, bestScore: 0, bestTime: null },
              hard: (parsed.stats && parsed.stats.hard) || { solved: false, bestScore: 0, bestTime: null }
            }
          };
        }
      } catch (e) {
        console.warn('Failed to load Cross Math progress', e);
      }
      return {
        unlocked: { easy: true, medium: false, hard: false },
        currentLevel: 'easy',
        stats: {
          easy: { solved: false, bestScore: 0, bestTime: null },
          medium: { solved: false, bestScore: 0, bestTime: null },
          hard: { solved: false, bestScore: 0, bestTime: null }
        }
      };
    };

    const saveState = (s) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      } catch (e) {}
    };

    let gameState = loadState();

    // Puzzle level specifications with sample progressive flow
    const LEVEL_CONFIGS = {
      easy: {
        id: 'easy',
        name: 'Easy',
        gridSize: '3×3',
        badge: 'Single‑Step Equations',
        color: '#10b981',
        nextLevel: 'medium',
        baseScore: 1000,
        timeTarget: 45,
        presets: [
          // Sample Progressive Flow 1: Easy 3x3
          [
            { id: 'e1', tokens: [{ t: 'input', expected: [5] }, { t: 'op', v: '+' }, { t: 'num', v: 4 }, { t: 'eq', v: '=' }, { t: 'res', v: 9 }] },
            { id: 'e2', tokens: [{ t: 'num', v: 6 }, { t: 'op', v: '−' }, { t: 'input', expected: [4] }, { t: 'eq', v: '=' }, { t: 'res', v: 2 }] },
            { id: 'e3', tokens: [{ t: 'input', expected: [4] }, { t: 'op', v: '×' }, { t: 'num', v: 3 }, { t: 'eq', v: '=' }, { t: 'res', v: 12 }] }
          ],
          // Additional Preset for Easy
          [
            { id: 'e1', tokens: [{ t: 'input', expected: [7] }, { t: 'op', v: '+' }, { t: 'num', v: 8 }, { t: 'eq', v: '=' }, { t: 'res', v: 15 }] },
            { id: 'e2', tokens: [{ t: 'num', v: 14 }, { t: 'op', v: '−' }, { t: 'input', expected: [5] }, { t: 'eq', v: '=' }, { t: 'res', v: 9 }] },
            { id: 'e3', tokens: [{ t: 'input', expected: [6] }, { t: 'op', v: '×' }, { t: 'num', v: 4 }, { t: 'eq', v: '=' }, { t: 'res', v: 24 }] }
          ]
        ]
      },
      medium: {
        id: 'medium',
        name: 'Medium',
        gridSize: '4×4',
        badge: 'Mixed Operations',
        color: '#00bfff',
        nextLevel: 'hard',
        baseScore: 2500,
        timeTarget: 90,
        presets: [
          // Sample Progressive Flow 2: Medium 4x4
          [
            { id: 'm1', tokens: [{ t: 'input', expected: [4] }, { t: 'op', v: '×' }, { t: 'num', v: 2 }, { t: 'op', v: '+' }, { t: 'num', v: 3 }, { t: 'eq', v: '=' }, { t: 'res', v: 11 }] },
            { id: 'm2', tokens: [{ t: 'num', v: 12 }, { t: 'op', v: '÷' }, { t: 'input', expected: [3] }, { t: 'op', v: '−' }, { t: 'num', v: 2 }, { t: 'eq', v: '=' }, { t: 'res', v: 2 }] },
            { id: 'm3', tokens: [{ t: 'input', expected: [5] }, { t: 'op', v: '+' }, { t: 'num', v: 5 }, { t: 'op', v: '×' }, { t: 'num', v: 2 }, { t: 'eq', v: '=' }, { t: 'res', v: 15 }] },
            { id: 'm4', tokens: [{ t: 'num', v: 20 }, { t: 'op', v: '−' }, { t: 'input', expected: [12] }, { t: 'op', v: '÷' }, { t: 'num', v: 2 }, { t: 'eq', v: '=' }, { t: 'res', v: 14 }] }
          ],
          // Additional Preset for Medium
          [
            { id: 'm1', tokens: [{ t: 'input', expected: [5] }, { t: 'op', v: '×' }, { t: 'num', v: 3 }, { t: 'op', v: '+' }, { t: 'num', v: 4 }, { t: 'eq', v: '=' }, { t: 'res', v: 19 }] },
            { id: 'm2', tokens: [{ t: 'num', v: 24 }, { t: 'op', v: '÷' }, { t: 'input', expected: [6] }, { t: 'op', v: '−' }, { t: 'num', v: 1 }, { t: 'eq', v: '=' }, { t: 'res', v: 3 }] },
            { id: 'm3', tokens: [{ t: 'input', expected: [7] }, { t: 'op', v: '+' }, { t: 'num', v: 4 }, { t: 'op', v: '×' }, { t: 'num', v: 3 }, { t: 'eq', v: '=' }, { t: 'res', v: 19 }] },
            { id: 'm4', tokens: [{ t: 'num', v: 30 }, { t: 'op', v: '−' }, { t: 'input', expected: [16] }, { t: 'op', v: '÷' }, { t: 'num', v: 2 }, { t: 'eq', v: '=' }, { t: 'res', v: 22 }] }
          ]
        ]
      },
      hard: {
        id: 'hard',
        name: 'Hard',
        gridSize: '5×5',
        badge: 'Multi‑Step Equations',
        color: '#f43f5e',
        nextLevel: null,
        baseScore: 5000,
        timeTarget: 150,
        presets: [
          // Sample Progressive Flow 3: Hard 5x5
          [
            { id: 'h1', tokens: [{ t: 'input', expected: [4] }, { t: 'op', v: '×' }, { t: 'num', v: 3 }, { t: 'op', v: '−' }, { t: 'num', v: 4 }, { t: 'eq', v: '=' }, { t: 'res', v: 8 }] },
            { id: 'h2', tokens: [{ t: 'num', v: 12 }, { t: 'op', v: '÷' }, { t: 'input', expected: [7, 2] }, { t: 'op', v: '+' }, { t: 'num', v: 5 }, { t: 'eq', v: '=' }, { t: 'res', v: 11 }] },
            { id: 'h3', tokens: [{ t: 'input', expected: [6] }, { t: 'op', v: '+' }, { t: 'num', v: 6 }, { t: 'op', v: '×' }, { t: 'num', v: 2 }, { t: 'eq', v: '=' }, { t: 'res', v: 18 }] },
            { id: 'h4', tokens: [{ t: 'num', v: 20 }, { t: 'op', v: '−' }, { t: 'input', expected: [12] }, { t: 'op', v: '÷' }, { t: 'num', v: 2 }, { t: 'eq', v: '=' }, { t: 'res', v: 14 }] },
            { id: 'h5', tokens: [{ t: 'input', expected: [10] }, { t: 'op', v: '×' }, { t: 'num', v: 2 }, { t: 'op', v: '+' }, { t: 'num', v: 10 }, { t: 'eq', v: '=' }, { t: 'res', v: 30 }] }
          ],
          // Additional Preset for Hard
          [
            { id: 'h1', tokens: [{ t: 'input', expected: [5] }, { t: 'op', v: '×' }, { t: 'num', v: 4 }, { t: 'op', v: '−' }, { t: 'num', v: 6 }, { t: 'eq', v: '=' }, { t: 'res', v: 14 }] },
            { id: 'h2', tokens: [{ t: 'num', v: 24 }, { t: 'op', v: '÷' }, { t: 'input', expected: [6] }, { t: 'op', v: '+' }, { t: 'num', v: 7 }, { t: 'eq', v: '=' }, { t: 'res', v: 11 }] },
            { id: 'h3', tokens: [{ t: 'input', expected: [8] }, { t: 'op', v: '+' }, { t: 'num', v: 7 }, { t: 'op', v: '×' }, { t: 'num', v: 3 }, { t: 'eq', v: '=' }, { t: 'res', v: 29 }] },
            { id: 'h4', tokens: [{ t: 'num', v: 30 }, { t: 'op', v: '−' }, { t: 'input', expected: [15] }, { t: 'op', v: '÷' }, { t: 'num', v: 3 }, { t: 'eq', v: '=' }, { t: 'res', v: 25 }] },
            { id: 'h5', tokens: [{ t: 'input', expected: [9] }, { t: 'op', v: '×' }, { t: 'num', v: 3 }, { t: 'op', v: '+' }, { t: 'num', v: 12 }, { t: 'eq', v: '=' }, { t: 'res', v: 39 }] }
          ]
        ]
      }
    };

    let activeLevel = gameState.currentLevel || 'easy';
    if (!gameState.unlocked[activeLevel]) activeLevel = 'easy';

    let activePresetIdx = 0;
    let timerInterval = null;
    let elapsedSeconds = 0;
    let isLevelSolved = false;

    const stopTimer = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    };

    const startTimer = () => {
      stopTimer();
      elapsedSeconds = 0;
      const timerEl = document.getElementById('cm-hud-timer');
      if (timerEl) timerEl.textContent = '00:00';
      timerInterval = setInterval(() => {
        if (!isLevelSolved) {
          elapsedSeconds++;
          const m = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
          const s = String(elapsedSeconds % 60).padStart(2, '0');
          if (timerEl) timerEl.textContent = `${m}:${s}`;
        }
      }, 1000);
    };

    const renderGame = () => {
      stopTimer();
      isLevelSolved = false;

      const lvlConf = LEVEL_CONFIGS[activeLevel];
      const rows = lvlConf.presets[activePresetIdx % lvlConf.presets.length];

      const bestScore = (gameState.stats[activeLevel] && gameState.stats[activeLevel].bestScore) || 0;
      const bestTimeSec = (gameState.stats[activeLevel] && gameState.stats[activeLevel].bestTime);
      const bestTimeStr = (bestTimeSec !== null && bestTimeSec !== undefined) 
        ? `${String(Math.floor(bestTimeSec / 60)).padStart(2, '0')}:${String(bestTimeSec % 60).padStart(2, '0')}`
        : '--:--';

      mountEl.innerHTML = `
        <div class="crossmath-arena-panel">
          <!-- Stepper Progress Bar (Easy -> Medium -> Hard) -->
          <div class="cm-progress-stepper" id="cm-progress-bar">
            <!-- Step Easy -->
            <div class="cm-step-item ${activeLevel === 'easy' ? 'active' : ''} ${gameState.stats.easy.solved ? 'completed' : ''}" id="cm-step-easy" data-level="easy">
              <div class="cm-step-circle">
                ${gameState.stats.easy.solved ? '✓' : '1'}
              </div>
              <div class="cm-step-details">
                <span class="cm-step-title">Easy</span>
                <span class="cm-step-sub">3×3 Grid</span>
              </div>
            </div>

            <div class="cm-step-line ${gameState.unlocked.medium ? 'completed' : ''}"></div>

            <!-- Step Medium -->
            <div class="cm-step-item ${activeLevel === 'medium' ? 'active' : ''} ${gameState.stats.medium.solved ? 'completed' : ''} ${!gameState.unlocked.medium ? 'locked' : ''}" id="cm-step-medium" data-level="medium">
              <div class="cm-step-circle">
                ${gameState.stats.medium.solved ? '✓' : (!gameState.unlocked.medium ? '🔒' : '2')}
              </div>
              <div class="cm-step-details">
                <span class="cm-step-title">
                  Medium
                  ${!gameState.unlocked.medium ? '<span class="cm-lock-tag" id="cm-lock-badge-medium">🔒 Locked</span>' : ''}
                </span>
                <span class="cm-step-sub">4×4 Grid</span>
              </div>
            </div>

            <div class="cm-step-line ${gameState.unlocked.hard ? 'completed' : ''}"></div>

            <!-- Step Hard -->
            <div class="cm-step-item ${activeLevel === 'hard' ? 'active' : ''} ${gameState.stats.hard.solved ? 'completed' : ''} ${!gameState.unlocked.hard ? 'locked' : ''}" id="cm-step-hard" data-level="hard">
              <div class="cm-step-circle">
                ${gameState.stats.hard.solved ? '✓' : (!gameState.unlocked.hard ? '🔒' : '3')}
              </div>
              <div class="cm-step-details">
                <span class="cm-step-title">
                  Hard
                  ${!gameState.unlocked.hard ? '<span class="cm-lock-tag" id="cm-lock-badge-hard">🔒 Locked</span>' : ''}
                </span>
                <span class="cm-step-sub">5×5 Grid</span>
              </div>
            </div>
          </div>

          <!-- HUD Bar -->
          <div class="cm-hud-bar">
            <div class="cm-hud-stats">
              <div class="cm-hud-stat">
                <span class="cm-hud-label">Difficulty Grid</span>
                <span class="cm-hud-val accent" id="cm-current-level-name">${lvlConf.name} (${lvlConf.gridSize})</span>
              </div>
              <div class="cm-hud-stat">
                <span class="cm-hud-label">Timer</span>
                <span class="cm-hud-val" id="cm-hud-timer">00:00</span>
              </div>
              <div class="cm-hud-stat">
                <span class="cm-hud-label">Solved</span>
                <span class="cm-hud-val emerald" id="cm-hud-solved-count">0 / ${rows.length}</span>
              </div>
              <div class="cm-hud-stat">
                <span class="cm-hud-label">Best Record</span>
                <span class="cm-hud-val" style="font-size: 0.95rem; color: #94a3b8;">
                  ${bestTimeStr} (${bestScore} pts)
                </span>
              </div>
            </div>

            <div class="cm-hud-actions">
              <button type="button" class="btn-secondary" id="cm-new-puzzle-btn" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;">
                🔄 New Puzzle
              </button>
              <button type="button" class="btn-secondary" id="cm-demo-solve-btn" style="font-size: 0.78rem; padding: 0.35rem 0.65rem; color: #00bfff; border-color: rgba(0, 191, 255, 0.4);">
                ⚡ Quick Solve (Demo)
              </button>
              <button type="button" class="btn-secondary" id="cm-reset-grid-btn" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;">
                Clear
              </button>
            </div>
          </div>

          <!-- Puzzle Equations Grid -->
          <div class="cm-grid-container" id="cm-grid-container">
            ${rows.map((row, rIdx) => `
              <div class="cm-equation-row" id="cm-row-${row.id}" data-row-id="${row.id}">
                <div class="cm-row-num">#${rIdx + 1}</div>
                <div class="cm-row-tiles">
                  ${row.tokens.map((tok) => {
                    if (tok.t === 'input') {
                      return `
                        <div class="cm-tile cm-tile-input" id="cm-tile-input-${row.id}">
                          <input 
                            type="number" 
                            class="cm-number-input" 
                            id="cm-input-${row.id}" 
                            data-row-id="${row.id}" 
                            data-expected="${tok.expected.join(',')}"
                            placeholder="?" 
                            autocomplete="off"
                          />
                        </div>
                      `;
                    } else if (tok.t === 'op') {
                      return `<div class="cm-tile cm-tile-op">${tok.v}</div>`;
                    } else if (tok.t === 'eq') {
                      return `<div class="cm-tile cm-tile-eq">=</div>`;
                    } else if (tok.t === 'res') {
                      return `<div class="cm-tile cm-tile-res">${tok.v}</div>`;
                    } else {
                      return `<div class="cm-tile cm-tile-num">${tok.v}</div>`;
                    }
                  }).join('')}
                </div>
                <div class="cm-row-status" id="cm-status-${row.id}">
                  <span class="cm-status-badge pending">Enter Answer</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Victory / Level Unlocked Banner Container -->
          <div id="cm-victory-slot"></div>

          <!-- Bottom Meta Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; font-size: 0.75rem; color: #64748b; flex-wrap: wrap; gap: 0.5rem;">
            <span>💡 Solve all equations in the current level to unlock the next progressive difficulty.</span>
            <button type="button" id="cm-reset-progress-btn" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer; text-decoration: underline;">
              Reset Game Progress
            </button>
          </div>
        </div>
      `;

      bindEvents(rows, lvlConf);
      startTimer();
    };

    const updateStepperHeader = () => {
      const stepMed = document.getElementById('cm-step-medium');
      const stepHard = document.getElementById('cm-step-hard');

      if (stepMed) {
        if (gameState.unlocked.medium) {
          stepMed.classList.remove('locked');
          const circle = stepMed.querySelector('.cm-step-circle');
          if (circle && !gameState.stats.medium.solved) circle.textContent = '2';
          const lockBadge = document.getElementById('cm-lock-badge-medium');
          if (lockBadge) lockBadge.remove();
        }
      }

      if (stepHard) {
        if (gameState.unlocked.hard) {
          stepHard.classList.remove('locked');
          const circle = stepHard.querySelector('.cm-step-circle');
          if (circle && !gameState.stats.hard.solved) circle.textContent = '3';
          const lockBadge = document.getElementById('cm-lock-badge-hard');
          if (lockBadge) lockBadge.remove();
        }
      }
    };

    const handleLevelComplete = (rows, lvlConf) => {
      if (isLevelSolved) return;
      isLevelSolved = true;
      stopTimer();

      const timeBonus = Math.max(100, Math.round((lvlConf.timeTarget - elapsedSeconds) * 20));
      const finalScore = lvlConf.baseScore + timeBonus;
      const m = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
      const s = String(elapsedSeconds % 60).padStart(2, '0');
      const timeStr = `${m}:${s}`;

      // Update statistics
      const prevBest = gameState.stats[activeLevel].bestScore || 0;
      const prevBestTime = gameState.stats[activeLevel].bestTime;
      gameState.stats[activeLevel].solved = true;
      gameState.stats[activeLevel].bestScore = Math.max(prevBest, finalScore);
      gameState.stats[activeLevel].bestTime = (prevBestTime !== null && prevBestTime !== undefined) ? Math.min(prevBestTime, elapsedSeconds) : elapsedSeconds;

      let nextLevelUnlocked = null;
      if (activeLevel === 'easy') {
        if (!gameState.unlocked.medium) {
          gameState.unlocked.medium = true;
          nextLevelUnlocked = 'medium';
        }
      } else if (activeLevel === 'medium') {
        if (!gameState.unlocked.hard) {
          gameState.unlocked.hard = true;
          nextLevelUnlocked = 'hard';
        }
      }

      saveState(gameState);

      // Render victory card in slot
      const slot = document.getElementById('cm-victory-slot');
      if (slot) {
        slot.innerHTML = `
          <div class="cm-victory-banner" id="cm-victory-card">
            <div class="cm-victory-title">
              <span>🎉</span>
              <span>${lvlConf.name} Level Mastered!</span>
            </div>
            <div class="cm-victory-desc">
              Completed in <strong>${timeStr}</strong> with a score of <strong style="color: #00bfff;">${finalScore.toLocaleString('en-IN')} pts</strong>!
              ${nextLevelUnlocked ? `<div style="margin-top: 0.5rem; font-weight: 700; color: #10b981;">🔓 ${LEVEL_CONFIGS[nextLevelUnlocked].name} Difficulty Unlocked!</div>` : ''}
            </div>
            <div class="cm-victory-actions">
              ${nextLevelUnlocked ? `
                <button type="button" class="btn-primary" id="cm-goto-next-level-btn" style="font-size: 0.9rem; padding: 0.5rem 1.25rem;">
                  Play ${LEVEL_CONFIGS[nextLevelUnlocked].name} (${LEVEL_CONFIGS[nextLevelUnlocked].gridSize}) →
                </button>
              ` : ''}
              <button type="button" class="btn-secondary" id="cm-replay-level-btn" style="font-size: 0.9rem; padding: 0.5rem 1.25rem;">
                Replay ${lvlConf.name} Grid
              </button>
            </div>
          </div>
        `;

        document.getElementById('cm-goto-next-level-btn')?.addEventListener('click', () => {
          activeLevel = nextLevelUnlocked;
          gameState.currentLevel = nextLevelUnlocked;
          saveState(gameState);
          renderGame();
        });

        document.getElementById('cm-replay-level-btn')?.addEventListener('click', () => {
          activePresetIdx++;
          renderGame();
        });
      }

      updateStepperHeader();
      this.showToast(`🎉 ${lvlConf.name} Solved! Score: ${finalScore} pts`);
    };

    const bindEvents = (rows, lvlConf) => {
      // Stepper click handlers
      document.getElementById('cm-step-easy')?.addEventListener('click', () => {
        if (activeLevel !== 'easy') {
          activeLevel = 'easy';
          gameState.currentLevel = 'easy';
          saveState(gameState);
          renderGame();
        }
      });

      document.getElementById('cm-step-medium')?.addEventListener('click', () => {
        if (!gameState.unlocked.medium) {
          const el = document.getElementById('cm-step-medium');
          el?.classList.add('cm-shake');
          setTimeout(() => el?.classList.remove('cm-shake'), 400);
          this.showToast('🔒 Solve Easy puzzle first to unlock Medium!');
          return;
        }
        if (activeLevel !== 'medium') {
          activeLevel = 'medium';
          gameState.currentLevel = 'medium';
          saveState(gameState);
          renderGame();
        }
      });

      document.getElementById('cm-step-hard')?.addEventListener('click', () => {
        if (!gameState.unlocked.hard) {
          const el = document.getElementById('cm-step-hard');
          el?.classList.add('cm-shake');
          setTimeout(() => el?.classList.remove('cm-shake'), 400);
          this.showToast('🔒 Solve Medium puzzle first to unlock Hard!');
          return;
        }
        if (activeLevel !== 'hard') {
          activeLevel = 'hard';
          gameState.currentLevel = 'hard';
          saveState(gameState);
          renderGame();
        }
      });

      // Handle row input events
      const inputs = mountEl.querySelectorAll('.cm-number-input');
      inputs.forEach(input => {
        const checkRow = () => {
          const rowId = input.getAttribute('data-row-id');
          const rowEl = document.getElementById(`cm-row-${rowId}`);
          const statusEl = document.getElementById(`cm-status-${rowId}`);
          const expectedArr = (input.getAttribute('data-expected') || '').split(',').map(Number);
          const val = input.value.trim();

          if (val === '') {
            input.classList.remove('is-correct', 'is-wrong');
            rowEl?.classList.remove('is-solved');
            if (statusEl) statusEl.innerHTML = '<span class="cm-status-badge pending">Enter Answer</span>';
          } else {
            const num = Number(val);
            if (!isNaN(num) && expectedArr.includes(num)) {
              input.classList.add('is-correct');
              input.classList.remove('is-wrong');
              rowEl?.classList.add('is-solved');
              if (statusEl) statusEl.innerHTML = '<span class="cm-status-badge correct">✓ Solved</span>';
            } else {
              input.classList.remove('is-correct');
              input.classList.add('is-wrong');
              rowEl?.classList.remove('is-solved');
              if (statusEl) statusEl.innerHTML = '<span class="cm-status-badge pending">✗ Check Math</span>';
            }
          }

          // Check if all rows in the level are solved
          const solvedRows = mountEl.querySelectorAll('.cm-equation-row.is-solved').length;
          const countEl = document.getElementById('cm-hud-solved-count');
          if (countEl) countEl.textContent = `${solvedRows} / ${rows.length}`;

          if (solvedRows === rows.length) {
            handleLevelComplete(rows, lvlConf);
          }
        };

        input.addEventListener('input', checkRow);
        input.addEventListener('change', checkRow);
      });

      // Demo Solve button
      document.getElementById('cm-demo-solve-btn')?.addEventListener('click', () => {
        rows.forEach(r => {
          const inp = document.getElementById(`cm-input-${r.id}`);
          const inputTok = r.tokens.find(t => t.t === 'input');
          if (inp && inputTok) {
            inp.value = inputTok.expected[0];
            inp.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      });

      // New Puzzle button
      document.getElementById('cm-new-puzzle-btn')?.addEventListener('click', () => {
        activePresetIdx++;
        renderGame();
      });

      // Clear Grid button
      document.getElementById('cm-reset-grid-btn')?.addEventListener('click', () => {
        inputs.forEach(inp => {
          inp.value = '';
          inp.dispatchEvent(new Event('input', { bubbles: true }));
        });
        startTimer();
      });

      // Reset Game Progress button
      document.getElementById('cm-reset-progress-btn')?.addEventListener('click', () => {
        if (confirm('Reset your Cross Math unlocked levels and scores back to start?')) {
          localStorage.removeItem(STORAGE_KEY);
          gameState = loadState();
          activeLevel = 'easy';
          activePresetIdx = 0;
          renderGame();
          this.showToast('Progress reset! Started on Easy level.');
        }
      });
    };

    renderGame();
  },

  // Game Mode 1 Implementation
  initSpeedMathGame(mountEl) {
    let score = 0;
    let questionIdx = 0;
    let combo = 1;

    const questions = [
      { q: 'What is 15% of ₹800?', a: '₹120', options: ['₹100', '₹120', '₹140', '₹160'], answer: 1 },
      { q: 'According to Rule of 72, how many years to double money at 12% return?', a: '6 Years', options: ['4 Years', '6 Years', '8 Years', '10 Years'], answer: 1 },
      { q: 'If monthly EMI is ₹10,000 for 12 months, what is the total repayment?', a: '₹1,20,000', options: ['₹1,00,000', '₹1,20,000', '₹1,50,000', '₹2,00,000'], answer: 1 },
      { q: 'What is 20% profit on a ₹500 purchase price?', a: '₹100', options: ['₹50', '₹80', '₹100', '₹120'], answer: 2 },
      { q: 'What is 25 × 25?', a: '625', options: ['525', '605', '625', '675'], answer: 2 },
      { q: 'What is the square root of 144?', a: '12', options: ['10', '12', '14', '16'], answer: 1 },
      { q: 'A healthy adult BMI is between:', a: '18.5 – 24.9', options: ['12.0 – 16.0', '18.5 – 24.9', '28.0 – 35.0', '35.0 – 40.0'], answer: 1 },
      { q: 'If initial investment is ₹50,000 and final value is ₹75,000, what is the absolute gain %?', a: '50%', options: ['25%', '33.3%', '50%', '75%'], answer: 2 }
    ];

    const renderQuestion = () => {
      if (questionIdx >= questions.length) {
        // Game Complete
        mountEl.innerHTML = `
          <div class="game-arena-panel glass-panel" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏆</div>
            <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem;">Blitz Complete!</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">You scored <strong>${score}</strong> points across ${questions.length} questions.</p>
            <div style="display: inline-block; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--emerald); padding: 0.75rem 1.5rem; border-radius: var(--radius-xl); margin-bottom: 2rem;">
              <span style="color: var(--emerald); font-weight: 800; font-size: 1.2rem;">
                ${score >= 700 ? '🌟 Financial Grandmaster' : (score >= 400 ? '📊 Investment Analyst' : '🌱 Emerging Learner')}
              </span>
            </div>
            <div>
              <button type="button" class="btn-primary" id="restart-blitz-btn" style="padding: 0.75rem 1.75rem; border-radius: var(--radius-full); font-weight: 700;">
                Play Again
              </button>
            </div>
          </div>
        `;
        mountEl.querySelector('#restart-blitz-btn')?.addEventListener('click', () => {
          score = 0; questionIdx = 0; combo = 1;
          renderQuestion();
        });
        return;
      }

      const curQ = questions[questionIdx];

      mountEl.innerHTML = `
        <div class="game-arena-panel glass-panel">
          <div class="game-score-ticker">
            <div class="game-stat-box">
              <div class="game-stat-label">Question</div>
              <div class="game-stat-val">${questionIdx + 1} / ${questions.length}</div>
            </div>
            <div class="game-stat-box">
              <div class="game-stat-label">Score</div>
              <div class="game-stat-val" style="color: var(--emerald);">${score}</div>
            </div>
            <div class="game-stat-box">
              <div class="game-stat-label">Combo</div>
              <div class="game-stat-val" style="color: #fbbf24;">${combo}x</div>
            </div>
          </div>

          <div class="game-question-box">
            <div class="game-question-text">${curQ.q}</div>
          </div>

          <div class="game-options-grid">
            ${curQ.options.map((opt, i) => `
              <button type="button" class="game-option-btn" data-index="${i}">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;

      mountEl.querySelectorAll('.game-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
          if (selectedIdx === curQ.answer) {
            btn.classList.add('correct');
            score += 100 * combo;
            combo++;
          } else {
            btn.classList.add('wrong');
            combo = 1;
            const correctBtn = mountEl.querySelector(`.game-option-btn[data-index="${curQ.answer}"]`);
            if (correctBtn) correctBtn.classList.add('correct');
          }
          setTimeout(() => {
            questionIdx++;
            renderQuestion();
          }, 650);
        });
      });
    };

    renderQuestion();
  },

  // Game Mode 2 Implementation
  initTycoonGame(mountEl) {
    let age = 25;
    let netWorth = 100000; // 1 Lakh initial
    let equityAlloc = 50;
    let goldAlloc = 20;
    let fdAlloc = 30;

    const renderTycoon = (lastEventMsg = 'You start with ₹1,00,000 capital at Age 25. Choose your portfolio allocation and advance market cycles!') => {
      mountEl.innerHTML = `
        <div class="game-arena-panel glass-panel">
          <div class="game-score-ticker">
            <div class="game-stat-box">
              <div class="game-stat-label">Current Age</div>
              <div class="game-stat-val">${age} yrs</div>
            </div>
            <div class="game-stat-box">
              <div class="game-stat-label">Net Worth Portfolio</div>
              <div class="game-stat-val" style="color: var(--emerald);">${CalculatorEngine.formatCurrency(netWorth)}</div>
            </div>
            <div class="game-stat-box">
              <div class="game-stat-label">Target at Age 60</div>
              <div class="game-stat-val" style="color: #6366f1;">₹2.5 Cr</div>
            </div>
          </div>

          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-glass); border-radius: var(--radius-lg); padding: 1rem 1.25rem; margin-bottom: 1.5rem; font-size: 0.92rem; color: var(--text-secondary);">
            <strong>📢 Market Cycle Report:</strong> ${lastEventMsg}
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 0.4rem;">
              <span>🚀 Equity Mutual Funds (High Growth):</span>
              <span id="alloc-equity-val">${equityAlloc}%</span>
            </label>
            <input type="range" min="0" max="100" value="${equityAlloc}" id="alloc-equity" style="width: 100%;">
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 0.4rem;">
              <span>🛡️ Safe Fixed Deposits (7% p.a.):</span>
              <span id="alloc-fd-val">${fdAlloc}%</span>
            </label>
            <input type="range" min="0" max="100" value="${fdAlloc}" id="alloc-fd" style="width: 100%;">
          </div>

          <div style="margin-bottom: 2rem;">
            <label style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 0.4rem;">
              <span>🪙 Gold &amp; Real Estate Hedge:</span>
              <span id="alloc-gold-val">${goldAlloc}%</span>
            </label>
            <input type="range" min="0" max="100" value="${goldAlloc}" id="alloc-gold" style="width: 100%;">
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
            ${age < 60 ? `
              <button type="button" class="btn-primary" id="advance-years-btn" style="flex: 1; padding: 0.85rem 1.5rem; border-radius: var(--radius-full); font-weight: 700;">
                Advance 5 Market Years (Age ${age} → ${age + 5}) →
              </button>
            ` : `
              <div style="width: 100%; text-align: center;">
                <h3 style="color: var(--emerald); font-size: 1.5rem; margin-bottom: 0.5rem;">🎉 Retirement Age 60 Reached!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Final Nest Egg: ${CalculatorEngine.formatCurrency(netWorth)}</p>
                <button type="button" class="btn-secondary" id="restart-tycoon-btn" style="padding: 0.65rem 1.4rem; border-radius: var(--radius-full);">Restart Simulation</button>
              </div>
            `}
          </div>
        </div>
      `;

      // Slider updates
      const eqInput = mountEl.querySelector('#alloc-equity');
      const fdInput = mountEl.querySelector('#alloc-fd');
      const goldInput = mountEl.querySelector('#alloc-gold');

      eqInput?.addEventListener('input', (e) => {
        equityAlloc = parseInt(e.target.value, 10);
        mountEl.querySelector('#alloc-equity-val').textContent = equityAlloc + '%';
      });
      fdInput?.addEventListener('input', (e) => {
        fdAlloc = parseInt(e.target.value, 10);
        mountEl.querySelector('#alloc-fd-val').textContent = fdAlloc + '%';
      });
      goldInput?.addEventListener('input', (e) => {
        goldAlloc = parseInt(e.target.value, 10);
        mountEl.querySelector('#alloc-gold-val').textContent = goldAlloc + '%';
      });

      // Advance Years Button
      mountEl.querySelector('#advance-years-btn')?.addEventListener('click', () => {
        const marketCycles = [
          { msg: 'Bull Market! Indian GDP surged 8.2%, equity returns hit +18% p.a.', eqRate: 0.18, fdRate: 0.07, goldRate: 0.09 },
          { msg: 'Global Tech Rally! Foreign inflows boosted equity +22% p.a., gold flat.', eqRate: 0.22, fdRate: 0.065, goldRate: 0.04 },
          { msg: 'Inflation Surge & Geopolitical tension: Gold rallied +16% p.a., equities corrected -3%.', eqRate: -0.03, fdRate: 0.075, goldRate: 0.16 },
          { msg: 'Economic Stability: Consistent compound growth across all asset classes (+12% equity, +8% gold).', eqRate: 0.12, fdRate: 0.07, goldRate: 0.08 }
        ];

        const cycle = marketCycles[Math.floor(Math.random() * marketCycles.length)];
        const totalAlloc = equityAlloc + fdAlloc + goldAlloc || 100;

        const eqPortion = netWorth * (equityAlloc / totalAlloc);
        const fdPortion = netWorth * (fdAlloc / totalAlloc);
        const goldPortion = netWorth * (goldAlloc / totalAlloc);

        // Compound over 5 years
        const newEq = eqPortion * Math.pow(1 + cycle.eqRate, 5);
        const newFd = fdPortion * Math.pow(1 + cycle.fdRate, 5);
        const newGold = goldPortion * Math.pow(1 + cycle.goldRate, 5);

        // Add additional savings
        netWorth = Math.round(newEq + newFd + newGold + 250000); // +2.5L savings over 5 yrs
        age += 5;

        renderTycoon(cycle.msg);
      });

      mountEl.querySelector('#restart-tycoon-btn')?.addEventListener('click', () => {
        age = 25; netWorth = 100000; equityAlloc = 50; goldAlloc = 20; fdAlloc = 30;
        renderTycoon();
      });
    };

    renderTycoon();
  },

  // ==========================================
  // CALCULATOR HUB SECTION (Tabs & Sub-Tabs)
  // ==========================================
  renderCalculatorHub(containerEl, activeCat = 'finance', activeSubcat = null) {
    if (!containerEl) return;
    const taxonomy = (typeof getHubTaxonomy === 'function') ? getHubTaxonomy() : null;
    if (!taxonomy) return;

    const currentCatKey = taxonomy[activeCat] ? activeCat : 'finance';
    const currentCat = taxonomy[currentCatKey];
    const subcats = currentCat.subcategories || {};
    const subcatKeys = Object.keys(subcats);
    const currentSubcatKey = (activeSubcat && subcats[activeSubcat]) ? activeSubcat : subcatKeys[0];
    const currentSubcat = subcats[currentSubcatKey] || subcats[subcatKeys[0]];
    const calculators = (typeof getHubCalculators === 'function') ? getHubCalculators(currentCatKey, currentSubcatKey) : [];

    containerEl.innerHTML = `
      <section class="calc-hub-section" id="calc-hub-section">
        <div class="calc-hub-panel glass-panel" style="--hub-accent: ${currentCat.accent};">
          <!-- Hub Section Header -->
          <div class="calc-hub-header">
            <div class="calc-hub-badge" style="color: ${currentCat.accent}; border-color: ${currentCat.accent}55; background: ${currentCat.accent}1a;">
              ${getIconSvg('calculator', 15)}
              <span>Calculator Hub • ${currentCat.name}</span>
            </div>
            <h2 class="calc-hub-title">Interactive Calculator Hub</h2>
            <p class="calc-hub-subtitle">
              Explore specialized calculators organized into 3 core domains and subcategories with key inputs, real-time outputs, and visual breakdowns.
            </p>
          </div>

          <!-- Main Category Tabs: Finance, Math, Health -->
          <div class="calc-hub-main-tabs" role="tablist" aria-label="Calculator Domains">
            ${Object.values(taxonomy).map(cat => {
              const isActive = cat.id === currentCatKey;
              const subCount = Object.keys(cat.subcategories || {}).length;
              return `
                <button type="button" class="calc-hub-main-tab ${isActive ? 'active' : ''}" data-hub-cat="${cat.id}" role="tab" aria-selected="${isActive}" style="--tab-accent: ${cat.accent};">
                  <span class="hub-main-tab-icon">${getIconSvg(cat.icon, 22)}</span>
                  <div class="hub-main-tab-text">
                    <span class="hub-main-tab-name">${cat.name}</span>
                    <span class="hub-main-tab-sub">${cat.tagline || cat.badge}</span>
                  </div>
                  <span class="hub-main-tab-badge">${subCount} Subcategories</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Subcategories Navigation Tabs -->
          <div class="calc-hub-subtabs-scroll" id="calc-hub-subtabs-bar">
            ${subcatKeys.map(key => {
              const sub = subcats[key];
              const isSubActive = key === currentSubcatKey;
              const count = (sub.calculatorIds || []).length;
              return `
                <button type="button" class="calc-hub-subtab-btn ${isSubActive ? 'active' : ''}" data-hub-sub="${key}" style="--tab-accent: ${currentCat.accent};">
                  <span>${getIconSvg(sub.icon, 16)}</span>
                  <span>${sub.name}</span>
                  <span class="hub-subtab-count">${count}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Active Subcategory Meta bar -->
          <div class="calc-hub-subcat-meta">
            <div>
              <div class="hub-subcat-meta-title">
                ${getIconSvg(currentSubcat.icon, 20)}
                <span>${currentSubcat.name}</span>
              </div>
              <p class="hub-subcat-meta-desc">${currentSubcat.description}</p>
            </div>
            <span class="hub-subcat-meta-count">Showing ${calculators.length} Calculators</span>
          </div>

          <!-- Calculator Cards Grid -->
          <div class="calc-hub-cards-grid">
            ${calculators.map(calc => {
              const inputsText = (typeof getCalcInputsSummary === 'function') ? getCalcInputsSummary(calc) : 'Key Inputs';
              const outputsText = (typeof getCalcOutputsSummary === 'function') ? getCalcOutputsSummary(calc) : 'Calculated Results';
              const inputsList = inputsText.split(' • ').map(s => s.trim()).filter(Boolean);
              const outputsList = outputsText.split(' • ').map(s => s.trim()).filter(Boolean);

              return `
                <div class="calc-hub-card glass-panel" style="--card-accent: ${currentCat.accent};">
                  <div>
                    <div class="hub-card-header">
                      <div class="hub-card-icon-title">
                        <div class="hub-card-icon-box">
                          ${getIconSvg(calc.icon || 'calculator', 20)}
                        </div>
                        <div>
                          <h3 class="hub-card-title">${calc.title}</h3>
                          <span class="hub-card-cat-badge">${currentSubcat.name}</span>
                        </div>
                      </div>
                      ${calc.badge ? `<span class="hub-card-badge">${calc.badge}</span>` : ''}
                    </div>

                    <p class="hub-card-desc">${calc.summary || calc.description}</p>

                    <!-- Key Inputs -->
                    <div class="hub-card-meta-row">
                      <div class="hub-card-meta-label">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="8 17 12 21 16 17"/><line x1="12" x2="12" y1="3" y2="21"/></svg>
                        <span>Key Inputs:</span>
                      </div>
                      <div class="hub-card-pills-wrap">
                        ${inputsList.map(item => `<span class="hub-input-pill">${item}</span>`).join('')}
                      </div>
                    </div>

                    <!-- Key Outputs -->
                    <div class="hub-card-meta-row outputs-row">
                      <div class="hub-card-meta-label">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 7 12 3 8 7"/><line x1="12" x2="12" y1="21" y2="3"/></svg>
                        <span>Outputs:</span>
                      </div>
                      <div class="hub-card-pills-wrap">
                        ${outputsList.map(item => `<span class="hub-output-pill">${item}</span>`).join('')}
                      </div>
                    </div>

                    <!-- Detailed Breakdown Indicator -->
                    <div class="hub-card-breakdown-note">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
                      <span>Interactive charts, formula steps &amp; detailed breakdown</span>
                    </div>
                  </div>

                  <div class="hub-card-action">
                    <a href="#/calculator/${calc.id}" class="btn-hub-calculate">
                      <span>Calculate Now</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Hub Footer -->
          <div class="calc-hub-footer">
            <div class="calc-hub-footer-trust">
              ${getIconSvg('shield-check', 16)}
              <span>Instant Precision Results • Visual Donut &amp; Bar Graphs • 100% Free &amp; Private</span>
            </div>
            <a href="#/categories" class="calc-hub-footer-link">
              <span>View All 110+ Calculators in Directory →</span>
            </a>
          </div>
        </div>
      </section>
    `;

    // Event Listeners for Main Tabs
    containerEl.querySelectorAll('.calc-hub-main-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const catKey = tab.getAttribute('data-hub-cat');
        this.renderCalculatorHub(containerEl, catKey, null);
      });
    });

    // Event Listeners for Sub-Tabs
    containerEl.querySelectorAll('.calc-hub-subtab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subKey = btn.getAttribute('data-hub-sub');
        this.renderCalculatorHub(containerEl, currentCatKey, subKey);
      });
    });
  },

  renderNpsBlogPage() {
    const faqSchema = [
      {
        '@type': 'Question',
        'name': 'What is the National Pension System (NPS)?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The National Pension System (NPS) is a voluntary, defined-contribution retirement savings scheme regulated by the Pension Fund Regulatory and Development Authority (PFRDA) in India. It enables subscribers to build a long-term retirement corpus through systematic contributions invested across equities, corporate debt, and government securities.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the extra tax benefit under Section 80CCD(1B)?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Section 80CCD(1B) provides an exclusive additional income tax deduction of up to ₹50,000 per financial year for investments in NPS Tier 1. This deduction is over and above the ₹1.5 Lakh limit under Section 80C, allowing individuals in the 30% tax slab to save up to ₹15,600 extra in taxes annually.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the difference between NPS Tier I and Tier II accounts?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Tier I is the primary, mandatory retirement account with a strict lock-in until age 60, offering exclusive tax deductions under Sections 80CCD(1), 80CCD(1B), and 80CCD(2). Tier II is a voluntary investment account that offers unrestricted liquidity with zero lock-in, but does not provide tax deductions for general citizens.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What happens to my NPS corpus when I turn 60?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'At age 60 (superannuation), you can withdraw up to 60% of your accumulated corpus as a completely tax-free lump sum. The remaining 40% (minimum) must be utilized to purchase an annuity from a PFRDA-registered Annuity Service Provider to provide guaranteed monthly pension for life.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I withdraw money from NPS before retirement age 60?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. After 3 years of membership, partial withdrawals of up to 25% of your own contributions are permitted for specified reasons such as children higher education, marriage, purchasing a first residential property, or critical medical emergencies (allowed up to 3 times during the entire tenure).'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the fund management charges in NPS compared to mutual funds?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'NPS is recognized as the lowest-cost investment vehicle globally. Fund management charges (FMC) are capped at between 0.03% and 0.09% p.a., compared to 0.5%–2.0% typically charged by equity and debt mutual funds, which leaves substantially more money compounding over several decades.'
        }
      }
    ];

    this.updateSeoMeta(
      'NPS: National Pension System – Complete Guide, Benefits, Returns & Calculator | letscalculate.in',
      'Comprehensive guide to the National Pension System (NPS). Understand Tier 1 vs Tier 2, 80CCD tax benefits, returns, annuity options, and calculate your retirement corpus.',
      'https://letscalculate.in/#/blog/nps',
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://letscalculate.in/#/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://letscalculate.in/#/blog/nps' },
              { '@type': 'ListItem', 'position': 3, 'name': 'NPS Complete Guide', 'item': 'https://letscalculate.in/#/blog/nps' }
            ]
          },
          {
            '@type': 'BlogPosting',
            'headline': 'NPS: National Pension System – Complete Guide, Benefits, Returns & Calculator',
            'description': 'Comprehensive guide to the National Pension System (NPS). Understand Tier 1 vs Tier 2, 80CCD tax benefits, returns, annuity options, and calculate your retirement corpus.',
            'url': 'https://letscalculate.in/#/blog/nps',
            'datePublished': '2026-10-06T00:00:00+05:30',
            'dateModified': '2026-10-06T09:30:00+05:30',
            'author': {
              '@type': 'Organization',
              'name': 'letscalculate.in Editorial Team'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'letscalculate.in',
              'url': 'https://letscalculate.in/'
            }
          },
          {
            '@type': 'FAQPage',
            'mainEntity': faqSchema
          }
        ]
      }
    );

    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    mainEl.innerHTML = `
      <article class="nps-article-container" itemscope itemtype="https://schema.org/Article">
        <!-- Breadcrumbs -->
        <nav class="calc-breadcrumb" aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <a href="#/category/financial">Finance</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span aria-current="page">NPS Complete Guide</span>
        </nav>

        <!-- Article Hero Header -->
        <header class="nps-blog-hero">
          <div class="nps-blog-badge-row">
            <span class="badge badge-emerald">Retirement Planning</span>
            <span class="badge badge-indigo">Tax Saving 80CCD</span>
            <span class="badge badge-amber" style="background: rgba(245, 158, 11, 0.15); border: 1px solid var(--amber); color: #fbbf24;">PFRDA Regulated</span>
          </div>

          <h1 class="nps-blog-title" itemprop="headline">
            Understanding NPS (National Pension System): Complete Guide, Benefits &amp; Tax Deductions
          </h1>

          <div class="nps-blog-meta-bar">
            <div class="nps-blog-meta-item">
              ${getIconSvg('calendar-clock', 16)}
              <span>Updated: October 2026</span>
            </div>
            <div class="nps-blog-meta-item">
              ${getIconSvg('coffee', 16)}
              <span>15 min comprehensive read</span>
            </div>
            <div class="nps-blog-meta-item">
              ${getIconSvg('shield-check', 16)}
              <span>Author: letscalculate.in Editorial Team</span>
            </div>
          </div>

          <div class="nps-highlight-box">
            <strong>Key Takeaway:</strong> The National Pension System (NPS) is India's most cost-effective retirement vehicle, combining market-linked equity compounding, the lowest fund management charges globally (&lt;0.09% p.a.), an exclusive extra ₹50,000 tax deduction under Section 80CCD(1B), and a guaranteed lifetime pension structure with a 60% tax-free lump sum exit.
          </div>
        </header>

        <!-- Main Blog Prose Content -->
        <div class="nps-blog-content">

          <!-- Section 1 -->
          <h2>1. What is the National Pension System (NPS)?</h2>
          <p>
            The <strong>National Pension System (NPS)</strong> is a voluntary, defined-contribution retirement savings scheme launched by the Government of India and regulated by the <strong>Pension Fund Regulatory and Development Authority (PFRDA)</strong>. Originally introduced in January 2004 for newly recruited central government employees, NPS was opened to all Indian citizens (including Non-Resident Indians) on a voluntary basis in May 2009.
          </p>
          <p>
            The core objective of NPS is to instill financial discipline and empower individuals to accumulate an adequate retirement nest egg during their productive working years. Unlike traditional defined-benefit pensions that rely on government exchequer payouts, NPS is an individual market-linked pension program where your accumulated corpus directly reflects the performance of your chosen asset classes and compounding returns over time.
          </p>

          <!-- Section 2 -->
          <h2>2. How NPS Works: Institutional Architecture</h2>
          <p>
            NPS operates on an institutional architecture characterized by unbundled functions, rigorous regulatory oversight, and zero conflict of interest:
          </p>
          <ul>
            <li><strong>PRAN (Permanent Retirement Account Number):</strong> Upon enrollment, every subscriber receives a unique 12-digit PRAN. This account remains portable across employment changes, cities, and states throughout your working life.</li>
            <li><strong>PFRDA (Regulator):</strong> The statutory authority established by Parliament to promote, regulate, and safeguard the interests of pension subscribers.</li>
            <li><strong>CRA (Central Recordkeeping Agency):</strong> Entities like Protean (formerly NSDL) and KFin Technologies maintain master subscriber records, track transactions, issue account statements, and process administrative requests.</li>
            <li><strong>Pension Fund Managers (PFMs):</strong> Professional asset management houses (such as SBI Pension Funds, LIC Pension Fund, HDFC Pension Management, ICICI Prudential Pension Funds, UTI Retirement Solutions, and Kotak Pension Fund) invest your contributions in diversified market portfolios.</li>
            <li><strong>NPS Trust &amp; Custodian:</strong> The NPS Trust holds legal custody of all subscriber assets, ensuring institutional safety and separation from the commercial operations of the fund managers.</li>
          </ul>

          <!-- Section 3 -->
          <h2>3. Who Can Invest in NPS? (Eligibility Criteria)</h2>
          <p>
            NPS offers one of the most inclusive eligibility criteria among formal Indian investment instruments:
          </p>
          <ul>
            <li><strong>Age Requirement:</strong> Any individual citizen aged between <strong>18 and 70 years</strong> at the date of submission of application.</li>
            <li><strong>Citizenship:</strong> Open to Resident Indian Citizens, Non-Resident Indians (NRIs), and Overseas Citizens of India (OCIs).</li>
            <li><strong>KYC Compliance:</strong> Must possess valid KYC documentation (PAN card, Aadhaar or Passport, and an active bank account).</li>
            <li><strong>Sectors:</strong> Available across the All Citizens Model (voluntary retail investors), Corporate Model (employer-employee co-contributions), and Government Sector.</li>
          </ul>

          <!-- Section 4 -->
          <h2>4. How to Open an NPS Account</h2>
          <p>
            Opening an NPS account is 100% digital and takes under 10 minutes:
          </p>
          <ol>
            <li><strong>Online via eNPS:</strong> Visit the official eNPS portal (enps.nsdl.com or enps.kfintech.com). Choose registration using Aadhaar (via DigiLocker or OTP) or PAN with online bank verification.</li>
            <li><strong>Select Account Type:</strong> Choose Tier I (mandatory for retirement) or Tier I &amp; Tier II combined.</li>
            <li><strong>Select Fund Manager &amp; Asset Allocation:</strong> Pick your preferred Pension Fund Manager and choose between <em>Active Choice</em> or <em>Auto Choice</em>.</li>
            <li><strong>Nomination &amp; Initial Deposit:</strong> Add nominee details and make the initial contribution (minimum ₹500 for Tier 1) using Net Banking, UPI, or Debit Card.</li>
            <li><strong>Instant PRAN Generation:</strong> Your PRAN is generated immediately, and your digital PRAN card is downloadable in seconds.</li>
          </ol>
          <p>
            Subscribers can also register offline through authorized <strong>Points of Presence (POPs)</strong>, which include public and private commercial banks, post offices, and registered fintech platforms.
          </p>

          <!-- Section 5 -->
          <h2>5. NPS Contribution Rules &amp; Limits</h2>
          <p>
            NPS gives subscribers complete flexibility over contribution timing and amounts:
          </p>
          <ul>
            <li><strong>Minimum Initial Deposit:</strong> ₹500 for Tier I; ₹1,000 for Tier II.</li>
            <li><strong>Minimum Contribution per Transaction:</strong> ₹500 for Tier I; ₹250 for Tier II.</li>
            <li><strong>Minimum Annual Contribution:</strong> At least <strong>₹1,000 per financial year</strong> in Tier I to keep the account active.</li>
            <li><strong>Maximum Limit:</strong> There is <strong>no upper ceiling</strong> on contributions in either Tier I or Tier II. You can contribute as much as you wish toward your retirement corpus.</li>
          </ul>

          <!-- Section 6 -->
          <h2>6. Tier I vs Tier II Accounts: Key Differences &amp; Comparison</h2>
          <p>
            NPS features two distinct account types with separate regulatory frameworks and objectives:
          </p>
          
          <div class="blog-table-wrapper">
            <table class="blog-comparison-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Tier I (Retirement Account)</th>
                  <th>Tier II (Voluntary Savings Account)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Primary Purpose</strong></td>
                  <td>Core retirement nest egg accumulation</td>
                  <td>Flexible, liquid investment &amp; wealth generation</td>
                </tr>
                <tr>
                  <td><strong>Lock-in Period</strong></td>
                  <td>Locked until age 60 (superannuation)</td>
                  <td>Zero lock-in; open liquidity at any time</td>
                </tr>
                <tr>
                  <td><strong>Tax Deductions</strong></td>
                  <td>Yes: Under 80CCD(1), 80CCD(1B) and 80CCD(2)</td>
                  <td>No tax deduction for private sector / retail subscribers</td>
                </tr>
                <tr>
                  <td><strong>Withdrawal Freedom</strong></td>
                  <td>Restricted: partial withdrawals for emergencies only</td>
                  <td>Unrestricted: withdraw anytime without penalty</td>
                </tr>
                <tr>
                  <td><strong>Exit at Age 60</strong></td>
                  <td>60% Tax-Free Lump Sum + 40% Minimum Mandatory Annuity</td>
                  <td>100% corpus can be redeemed or transferred anytime</td>
                </tr>
                <tr>
                  <td><strong>Prerequisite</strong></td>
                  <td>Stand-alone account</td>
                  <td>Requires an active Tier I PRAN account to open</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Section 7 -->
          <h2>7. NPS Tax Benefits: The Triple Tax Deduction Framework</h2>
          <p>
            NPS provides one of the most powerful tax deduction structures under the Indian Income Tax Act (Old Tax Regime), often called the <em>Triple Tax Benefit</em>:
          </p>
          <ul>
            <li>
              <strong>1. Section 80CCD(1) – Self Contributions:</strong> 
              Contributions up to 10% of salary (Basic + DA) for salaried employees or 20% of Gross Total Income for self-employed individuals, capped under the overall ₹1,50,000 limit shared with Section 80C.
            </li>
            <li>
              <strong>2. Section 80CCD(1B) – Exclusive Additional ₹50,000 Deduction:</strong>
              An <em>exclusive additional deduction of up to ₹50,000</em> for contributions to Tier I, completely over and above the ₹1.5 Lakh ceiling of Section 80C. For taxpayers in the 30% tax slab (plus 4% cess), this delivers an immediate direct tax savings of <strong>₹15,600 every year</strong>.
            </li>
            <li>
              <strong>3. Section 80CCD(2) – Employer Contributions:</strong>
              Employer contributions up to 10% of salary (Basic + DA) for private sector employees (and 14% for Central/State Government employees) are fully tax-deductible without any monetary ceiling under Section 80CCD(2), subject to the overall ₹7.5 Lakh aggregate employer contribution cap.
            </li>
            <li>
              <strong>4. Tax-Exempt Maturity (EEE Status):</strong>
              At age 60, the 60% lump sum withdrawal is completely exempt from income tax under Section 10(12A). The remaining 40% utilized to purchase an annuity is also exempt from tax at purchase (though monthly annuity payouts are taxable as regular income).
            </li>
          </ul>

          <!-- CONTEXTUAL CTA 1 -->
          <div class="blog-calc-cta-card">
            <div class="blog-calc-cta-text">
              <h4>Calculate Your NPS Corpus &amp; Tax Savings</h4>
              <p>Discover how much tax you save under Section 80CCD(1B) and watch your monthly contributions compound toward retirement.</p>
            </div>
            <a href="#/calculator/nps-calculator" class="blog-calc-cta-btn" id="blog-cta-1-btn">
              <span>Calculate Your NPS Corpus</span>
              ${getIconSvg('arrow-right', 16)}
            </a>
          </div>

          <!-- Section 8 -->
          <h2>8. How NPS Returns Work &amp; Fund Management Charges</h2>
          <p>
            Unlike fixed-return instruments like PPF or EPF, NPS is market-linked. When you make a contribution, units are allotted to your account based on the daily <strong>Net Asset Value (NAV)</strong> declared by your chosen Pension Fund Manager.
          </p>
          <h3>The Ultra-Low Cost Advantage</h3>
          <p>
            Expenses are the silent killer of long-term compounding. Mutual funds often charge 0.75% to 2.25% in Expense Ratios. In stark contrast, <strong>NPS fund management fees are capped between 0.03% and 0.09% per annum</strong>. Over a 25 to 35-year investment horizon, this 1.5% fee differential compounds into millions of additional rupees in your retirement kitty.
          </p>
          <h3>Historical Performance Benchmarks</h3>
          <p>
            Over the past decade (2014–2024), major NPS pension funds have generated competitive historical annualized returns (CAGR):
          </p>
          <ul>
            <li><strong>Asset Class E (Equities):</strong> 12.0% – 14.5% annualized return</li>
            <li><strong>Asset Class C (Corporate Bonds):</strong> 8.5% – 10.0% annualized return</li>
            <li><strong>Asset Class G (Government Securities):</strong> 7.8% – 9.2% annualized return</li>
          </ul>

          <!-- Section 9 -->
          <h2>9. Investment Choices: Active Choice vs. Auto Choice Lifecycle Funds</h2>
          <p>
            NPS offers four underlying asset classes:
          </p>
          <ul>
            <li><strong>Asset Class E (Equity):</strong> Up to 75% in large-cap and diversified index stocks and equities.</li>
            <li><strong>Asset Class C (Corporate Debt):</strong> Fixed-income debt securities issued by infrastructure companies and top-rated corporations.</li>
            <li><strong>Asset Class G (Government Securities):</strong> Central and State Government bonds, offering sovereign safety.</li>
            <li><strong>Asset Class A (Alternative Assets):</strong> Up to 5% in Real Estate Investment Trusts (REITs), InvITs, and Alternative Investment Funds.</li>
          </ul>
          <h3>Active Choice vs Auto Choice</h3>
          <p>
            Subscribers can choose how their capital is distributed across these classes:
          </p>
          <ul>
            <li><strong>Active Choice:</strong> You manually determine your asset allocation. You can allocate up to 75% in Equity (Class E) until age 50, after which the equity cap gradually reduces by 2.5% each year until it stabilizes at 50% at age 60.</li>
            <li><strong>Auto Choice (Lifecycle Funds):</strong> The system automatically manages your risk profile based on your age. As you grow older, capital systematically shifts from volatile equities into stable corporate debt and sovereign bonds:
              <ul>
                <li><em>Aggressive Lifecycle Fund (LC-75):</em> Maximum 75% equity until age 35, tapering to 15% at age 55.</li>
                <li><em>Moderate Lifecycle Fund (LC-50 - Default):</em> Maximum 50% equity until age 35, tapering to 10% at age 55.</li>
                <li><em>Conservative Lifecycle Fund (LC-25):</em> Maximum 25% equity until age 35, tapering to 5% at age 55.</li>
              </ul>
            </li>
          </ul>

          <!-- CONTEXTUAL CTA 2 -->
          <div class="blog-calc-cta-card">
            <div class="blog-calc-cta-text">
              <h4>Estimate Your NPS Returns with the Calculator</h4>
              <p>Customize your monthly investment, expected return rate, and retirement tenure to simulate your corpus in real time.</p>
            </div>
            <a href="#/calculator/nps-calculator" class="blog-calc-cta-btn" id="blog-cta-2-btn">
              <span>Estimate Your NPS Returns with the Calculator</span>
              ${getIconSvg('arrow-right', 16)}
            </a>
          </div>

          <!-- Section 10 -->
          <h2>10. Retirement Exit Rules: What Happens at Age 60?</h2>
          <p>
            When a subscriber reaches age 60 (superannuation), the formal NPS exit framework takes effect:
          </p>
          <ul>
            <li><strong>Maximum 60% Lump Sum Withdrawal:</strong> You can withdraw up to 60% of your total accumulated corpus as a cash payout. This entire 60% is <strong>100% tax-free</strong>.</li>
            <li><strong>Minimum 40% Mandatory Annuity:</strong> You must allocate at least 40% of the accumulated corpus to purchase a life annuity policy from an authorized Annuity Service Provider.</li>
            <li><strong>Small Corpus Exception (100% Lump Sum):</strong> If your total accumulated corpus at age 60 is <strong>₹5 Lakh or less</strong>, you have the option to withdraw 100% of the money as a lump sum without purchasing any annuity.</li>
            <li><strong>Deferment Option:</strong> You can choose to defer lump sum withdrawal or annuity purchase up to age 75 to let your investments continue compounding.</li>
          </ul>

          <!-- Section 11 -->
          <h2>11. Understanding the NPS Annuity &amp; Guaranteed Pension</h2>
          <p>
            The annuity portion of your NPS corpus is deployed to guarantee lifelong monthly income. PFRDA has empanelled leading life insurance companies as <strong>Annuity Service Providers (ASPs)</strong>, including LIC of India, SBI Life, HDFC Life, ICICI Prudential, and Max Life.
          </p>
          <h3>Popular Annuity Options</h3>
          <ul>
            <li><strong>Annuity for Life (Without Return of Purchase Price):</strong> Pays the highest monthly pension for your entire life, but the principal is not returned after death.</li>
            <li><strong>Annuity for Life with Return of Purchase Price (ROPP):</strong> Pays a guaranteed monthly pension for life, and 100% of the invested principal is paid to your legal nominee upon death.</li>
            <li><strong>Joint Life Annuity:</strong> Pays the monthly pension to you, then continues paying the same pension to your spouse for their lifetime, with purchase price returned to nominees thereafter.</li>
          </ul>

          <!-- Section 12 -->
          <h2>12. Partial Withdrawal Rules &amp; Premature Exit</h2>
          <p>
            While NPS is intentionally designed with lock-in restrictions to protect your retirement capital, PFRDA provides reasonable liquidity windows for life milestones:
          </p>
          <ul>
            <li><strong>Partial Withdrawals:</strong> Allowed after 3 years of joining NPS. You can withdraw up to <strong>25% of your own contributions</strong> (excluding employer contributions and accumulated interest).</li>
            <li><strong>Approved Reasons:</strong> Higher education of children, marriage of children, construction or purchase of first residential property, and treatment of specified critical illnesses.</li>
            <li><strong>Frequency:</strong> Allowed a maximum of 3 times across your entire subscription lifetime with a minimum 5-year gap between withdrawals.</li>
            <li><strong>Premature Exit (Before Age 60):</strong> If you choose to exit voluntarily before age 60, at least <strong>80% of the corpus must be annuitized</strong>, and only 20% can be taken as a lump sum (unless total corpus is &le; ₹2.5 Lakh).</li>
          </ul>

          <!-- Section 13 -->
          <h2>13. The Power of Long-Term Compounding: Real-World Example</h2>
          <p>
            To appreciate how systematic NPS contributions transform modest savings into multi-crore wealth, consider the journey of <strong>Ankit</strong>, a 28-year-old professional:
          </p>

          <div class="worked-example-card">
            <h3 style="margin-top: 0; color: var(--emerald);">Worked Case Study: 32 Years of Compounding</h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">
              Ankit invests ₹5,000 every month (₹60,000 annually) into NPS Tier 1 with an Active Choice allocation of 70% Equity and 30% Debt. He assumes a conservative blended CAGR of 10.0% p.a. until retiring at age 60, and a 6.5% lifelong annuity yield on 40% of his corpus:
            </p>

            <div class="example-step-grid">
              <div class="example-step-item">
                <div class="example-step-label">Total Out-of-Pocket Deposit</div>
                <div class="example-step-val">₹19,20,000</div>
                <div class="example-step-desc">₹5,000/mo × 384 months (32 yrs)</div>
              </div>
              <div class="example-step-item">
                <div class="example-step-label">Total Corpus at Age 60</div>
                <div class="example-step-val">₹1,40,41,677</div>
                <div class="example-step-desc">Over ₹1.40 Crore accumulated</div>
              </div>
              <div class="example-step-item">
                <div class="example-step-label">60% Tax-Free Lump Sum</div>
                <div class="example-step-val">₹84,25,006</div>
                <div class="example-step-desc">100% Tax-Free Cash Payout</div>
              </div>
              <div class="example-step-item">
                <div class="example-step-label">Guaranteed Monthly Pension</div>
                <div class="example-step-val">₹30,424 / mo</div>
                <div class="example-step-desc">Lifelong income from 40% annuity</div>
              </div>
            </div>

            <p style="margin-top: 1.25rem; font-size: 0.92rem; color: #a5b4fc;">
              ⚡ <strong>Bonus Income Tax Saved:</strong> Over these 32 years, by claiming ₹50,000 annually under Section 80CCD(1B) in the 30% slab, Ankit also saved <strong>₹4,99,200 in direct income taxes</strong>!
            </p>
          </div>

          <!-- Section 14 -->
          <h2>14. Advantages vs Limitations of NPS</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0 2rem;">
            <div class="glass-panel" style="padding: 1.5rem; border-radius: var(--radius-lg); border-left: 4px solid var(--emerald);">
              <h4 style="color: var(--emerald); margin-top: 0; font-size: 1.15rem;">Key Advantages</h4>
              <ul style="padding-left: 1.25rem; font-size: 0.94rem; margin: 0.5rem 0 0;">
                <li><strong>Lowest Fees:</strong> Under 0.09% expense ratio saves massive capital.</li>
                <li><strong>Triple Tax Deductions:</strong> Exclusive 80CCD(1B) and 80CCD(2) breaks.</li>
                <li><strong>60% Tax-Free Exit:</strong> Substantial liquidity at superannuation.</li>
                <li><strong>Disciplined Lock-in:</strong> Prevents premature lifestyle depletion of pension wealth.</li>
                <li><strong>Portability:</strong> PRAN stays active anywhere in India across employers.</li>
              </ul>
            </div>

            <div class="glass-panel" style="padding: 1.5rem; border-radius: var(--radius-lg); border-left: 4px solid var(--amber);">
              <h4 style="color: var(--amber); margin-top: 0; font-size: 1.15rem;">Limitations to Consider</h4>
              <ul style="padding-left: 1.25rem; font-size: 0.94rem; margin: 0.5rem 0 0;">
                <li><strong>Strict Lock-in:</strong> Inflexible access to funds prior to age 60.</li>
                <li><strong>Mandatory 40% Annuity:</strong> You cannot withdraw 100% of corpus as cash unless under ₹5 Lakh.</li>
                <li><strong>Annuity Taxation:</strong> Monthly pension payments are added to income and taxed at slab rates.</li>
                <li><strong>Equity Cap:</strong> Retail subscribers cannot exceed 75% equity exposure.</li>
              </ul>
            </div>
          </div>

          <!-- Section 15 -->
          <h2>15. Benchmarking NPS: NPS vs EPF vs PPF vs Mutual Funds</h2>
          <p>
            How does NPS compare against other popular Indian savings and retirement avenues?
          </p>

          <div class="blog-table-wrapper">
            <table class="blog-comparison-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Expected Returns</th>
                  <th>Tax Deduction</th>
                  <th>Lock-in Period</th>
                  <th>Maturity Taxation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>NPS (Tier 1)</strong></td>
                  <td>Market-linked (9%–12%)</td>
                  <td>80C + Extra ₹50,000 (80CCD-1B) + 80CCD(2)</td>
                  <td>Until Age 60</td>
                  <td>60% Tax-Free Lump Sum, 40% Annuity</td>
                </tr>
                <tr>
                  <td><strong>EPF (Provident Fund)</strong></td>
                  <td>Fixed Govt (8.15%–8.25%)</td>
                  <td>Under Section 80C only (up to ₹1.5L)</td>
                  <td>Until retirement / job switch</td>
                  <td>100% Tax-Free after 5 years of service</td>
                </tr>
                <tr>
                  <td><strong>PPF (Public Provident)</strong></td>
                  <td>Fixed Govt (~7.1%)</td>
                  <td>Under Section 80C only (up to ₹1.5L)</td>
                  <td>15 Years mandatory</td>
                  <td>100% Tax-Free (Complete EEE status)</td>
                </tr>
                <tr>
                  <td><strong>Mutual Funds (SIP)</strong></td>
                  <td>Market-linked (12%–15%)</td>
                  <td>ELSS only under Section 80C (up to ₹1.5L)</td>
                  <td>None (ELSS has 3 years)</td>
                  <td>LTCG taxed at 12.5% above ₹1.25L exemption</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- CONTEXTUAL CTA 3 -->
          <div class="blog-calc-cta-card highlight-cta">
            <div class="blog-calc-cta-text">
              <h4>Plan Your Retirement with the NPS Calculator</h4>
              <p>Turn financial knowledge into an actionable retirement roadmap. Calculate your estimated corpus, monthly pension, and lump sum in seconds.</p>
            </div>
            <a href="#/calculator/nps-calculator" class="blog-calc-cta-btn" id="blog-cta-3-btn">
              <span>Plan Your Retirement with the NPS Calculator</span>
              ${getIconSvg('arrow-right', 16)}
            </a>
          </div>

          <!-- Section 16: FAQs -->
          <h2>16. Frequently Asked Questions (FAQs) About NPS</h2>
          <div class="faqs-card glass-panel" style="margin-top: 1.5rem;">
            <div class="faq-list">
              <div class="faq-accordion-item">
                <div class="faq-question">
                  <span>Is NPS compulsory or voluntary?</span>
                </div>
                <div class="faq-answer">
                  NPS is voluntary for private sector professionals, self-employed citizens, and gig workers. It is mandatory for Central and State Government employees recruited after 2004.
                </div>
              </div>

              <div class="faq-accordion-item">
                <div class="faq-question">
                  <span>Can I switch my Pension Fund Manager or Asset Allocation later?</span>
                </div>
                <div class="faq-answer">
                  Yes. Under PFRDA regulations, subscribers can change their Pension Fund Manager once per financial year and adjust their asset allocation (Active vs Auto Choice) up to four times per financial year free of charge via the CRA portal.
                </div>
              </div>

              <div class="faq-accordion-item">
                <div class="faq-question">
                  <span>What happens to my NPS account if I move abroad or change jobs?</span>
                </div>
                <div class="faq-answer">
                  Your PRAN is completely portable. When changing employers, you simply furnish your PRAN to your new employer. If you relocate abroad as an NRI, you can continue contributing from your NRE or NRO bank account.
                </div>
              </div>

              <div class="faq-accordion-item">
                <div class="faq-question">
                  <span>Can I invest in both EPF and NPS simultaneously?</span>
                </div>
                <div class="faq-answer">
                  Yes, absolutely. Salaried employees can contribute to EPF through payroll and independently contribute to NPS Tier 1 to maximize the exclusive ₹50,000 tax deduction under Section 80CCD(1B) alongside corporate NPS under Section 80CCD(2).
                </div>
              </div>

              <div class="faq-accordion-item">
                <div class="faq-question">
                  <span>What happens if the subscriber passes away before age 60?</span>
                </div>
                <div class="faq-answer">
                  In the unfortunate event of the subscriber's demise before age 60, 100% of the accumulated corpus is handed over to the designated nominee or legal heirs as a tax-free lump sum payout. Alternatively, the nominee may opt to purchase an annuity.
                </div>
              </div>

              <div class="faq-accordion-item">
                <div class="faq-question">
                  <span>Is the monthly NPS pension taxable?</span>
                </div>
                <div class="faq-answer">
                  While the 60% lump sum at age 60 is completely tax-free, the monthly annuity pension received from the Annuity Service Provider is treated as taxable income under 'Income from Other Sources' and taxed at your applicable personal income tax slab rate in the year of receipt.
                </div>
              </div>
            </div>
          </div>

          <!-- Section 17: Mandatory Regulatory Disclaimer on Blog -->
          <div class="disclaimer-banner nps-disclaimer" id="nps-blog-mandatory-disclaimer" style="margin-top: 3.5rem;">
            ${getIconSvg('alert-triangle', 22)}
            <div>
              <strong>Mandatory Regulatory &amp; Legal Disclaimer:</strong> The information presented in this educational article is prepared strictly for informational, educational, and reference purposes and does not constitute financial, taxation, investment, or legal advice. Regulations governing the National Pension System (NPS), tax deductions under Section 80CCD, partial withdrawal thresholds, and exit frameworks are formulated by the Pension Fund Regulatory and Development Authority (PFRDA) and the Ministry of Finance, Government of India, and are subject to periodic amendments. Historical performance, compounding calculations, and example returns are illustrative and do not guarantee future returns. Users should verify current official guidelines on official portals (pfrda.org.in and npstrust.org.in) and consult a licensed SEBI-registered investment advisor or certified chartered accountant prior to making investment commitments.
            </div>
          </div>

          <!-- Related Calculators Section -->
          <div style="margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--border-glass);">
            <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem;">
              Explore Related Financial &amp; Retirement Calculators
            </h3>
            <div class="calculators-grid">
              ${['nps-calculator', 'sip-calculator', 'swp-calculator', 'ppf-calculator', 'retirement-calculator']
                .map(id => getCalculatorById(id))
                .filter(Boolean)
                .map(calc => this.renderCalcCard(calc))
                .join('')}
            </div>
          </div>

        </div>
      </article>
    `;

    this.bindCardEvents();
  },

  renderAboutPage() {
    this.updateSeoMeta(
      'About Us - We Help You Calculate Your Finances | letscalculate.in',
      'We are finance enthusiasts trying to help people on calculating all the required finances. Discover our mission, 100% free precision calculation tools, and principles of transparency.',
      'https://letscalculate.in/#/about'
    );
    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    mainEl.innerHTML = `
      <div class="container" style="max-width: 960px; padding: 2.5rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>About Us</span>
        </div>

        <!-- Hero Header -->
        <div style="margin-bottom: 3rem;">
          <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--emerald); color: var(--emerald); padding: 0.25rem 0.8rem; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 0.05em;">
            ${getIconSvg('heart-pulse', 14)} Our Mission &amp; Purpose
          </div>
          <h1 style="font-size: 2.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">
            We are finance enthusiasts trying to help people on calculating all the required finances.
          </h1>
          <p style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.7; max-width: 820px;">
            At letscalculate.in, our passion is simplifying complex financial, mathematical, and health equations into lightning-fast, beautiful, and accessible tools that anyone can use for free.
          </p>
        </div>

        <!-- 3 Pillars Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3.5rem;">
          <div class="glass-panel" style="padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; color: var(--emerald); margin-bottom: 1.25rem;">
              ${getIconSvg('sparkles', 24)}
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">100% Free Access</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin: 0;">
              No paywalls, no forced subscription tiers, and no mandatory logins. Every single tool is completely accessible to all individuals worldwide.
            </p>
          </div>

          <div class="glass-panel" style="padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; color: var(--indigo); margin-bottom: 1.25rem;">
              ${getIconSvg('calculator', 24)}
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">Mathematical Rigor</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin: 0;">
              All our models and formulas are benchmarked against official banking regulations, Reserve Bank standards, and verified scientific algorithms.
            </p>
          </div>

          <div class="glass-panel" style="padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: rgba(245, 158, 11, 0.15); display: flex; align-items: center; justify-content: center; color: var(--amber); margin-bottom: 1.25rem;">
              ${getIconSvg('shield-check', 24)}
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">Privacy by Default</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin: 0;">
              Your calculation parameters and results execute right in your browser. We never sell, transmit, or monetize your sensitive numbers.
            </p>
          </div>
        </div>

        <!-- Story Narrative Section -->
        <div class="glass-panel" style="padding: 2.5rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card); margin-bottom: 3.5rem;">
          <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">Our Story &amp; Philosophy</h2>
          <div style="color: var(--text-secondary); font-size: 1rem; line-height: 1.8; display: flex; flex-direction: column; gap: 1rem;">
            <p>
              Money decisions are often intimidating. Between complex EMI amortizations, compound interest curves, dynamic inflation effects, and tax brackets, most people find it difficult to project their financial future clearly.
            </p>
            <p>
              We created <strong>letscalculate.in</strong> as finance enthusiasts who believe that financial literacy begins with transparent arithmetic. When you can see exactly how an extra 1% return on your mutual fund SIP affects your 20-year corpus, or how making small prepayments slashes years off your home loan, you gain clarity and confidence.
            </p>
            <p>
              Beyond finance, we expanded our precision engines to cover essential mathematics and health &amp; fitness benchmarks so users have a dependable, comprehensive calculation suite in one seamless interface.
            </p>
          </div>
        </div>

        <!-- Action Row -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding: 2rem; border-radius: var(--radius-lg); background: var(--bg-surface); border: 1px solid var(--border-card);">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.25rem; color: var(--text-primary);">Ready to run your calculations?</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; margin: 0;">Explore our 60+ verified calculators or get started with smart investing.</p>
          </div>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="#/categories" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: var(--radius-full); font-weight: 700; text-decoration: none;">
              <span>Explore All Calculators</span>
              ${getIconSvg('arrow-right', 14)}
            </a>
            <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: var(--radius-full); font-weight: 700; text-decoration: none;">
              <span>Start Investing</span>
              ${getIconSvg('arrow-right', 14)}
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // VIEW: TERMS OF SERVICE PAGE
  // ==========================================
  renderTermsPage() {
    this.updateSeoMeta(
      'Terms of Service - letscalculate.in',
      'Read the Terms of Service and calculation accuracy disclaimer for letscalculate.in. 100% Free precision calculators.',
      'https://letscalculate.in/#/terms'
    );
    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    mainEl.innerHTML = `
      <div class="container" style="max-width: 860px; padding: 2.5rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>Terms of Service</span>
        </div>

        <div class="glass-panel" style="padding: 2.5rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card);">
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">Terms of Service</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">Last Updated: October 2026</p>

          <div style="color: var(--text-secondary); line-height: 1.8; font-size: 0.95rem; display: flex; flex-direction: column; gap: 1.5rem;">
            <section>
              <h3 style="color: var(--text-primary); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem;">1. Acceptance of Terms</h3>
              <p>By accessing letscalculate.in, you agree to comply with and be bound by these Terms of Service. All calculators and mathematical tools provided on this website are 100% Free for educational and personal use.</p>
            </section>

            <section>
              <h3 style="color: var(--text-primary); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem;">2. Calculation Accuracy &amp; Financial Disclaimer</h3>
              <p>While our algorithms are developed by finance enthusiasts and rigorously tested against standard mathematical formulas, calculation outputs are estimates provided for informational purposes only. Results do not constitute professional financial, tax, legal, or medical advice.</p>
            </section>

            <section>
              <h3 style="color: var(--text-primary); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem;">3. Fair Use &amp; Intellectual Property</h3>
              <p>All content, algorithms, and interface elements are protected by applicable intellectual property laws. You may not scrape, frame, or republish our calculation engines without prior written authorization.</p>
            </section>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // VIEW: PRIVACY POLICY PAGE
  // ==========================================
  renderPrivacyPage() {
    this.updateSeoMeta(
      'Privacy Policy - letscalculate.in',
      'Learn how letscalculate.in protects your privacy with client-side computation and zero data selling.',
      'https://letscalculate.in/#/privacy'
    );
    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    mainEl.innerHTML = `
      <div class="container" style="max-width: 860px; padding: 2.5rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>Privacy Policy</span>
        </div>

        <div class="glass-panel" style="padding: 2.5rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card);">
          <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">Privacy Policy</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">Last Updated: October 2026</p>

          <div style="color: var(--text-secondary); line-height: 1.8; font-size: 0.95rem; display: flex; flex-direction: column; gap: 1.5rem;">
            <section>
              <h3 style="color: var(--text-primary); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem;">1. No Registration Required</h3>
              <p>We respect your anonymity. We do not require visitors to create an account, log in, or provide phone numbers or passwords to use any of our 60+ calculators.</p>
            </section>

            <section>
              <h3 style="color: var(--text-primary); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem;">2. Client-Side Local Execution</h3>
              <p>Your calculation parameters (such as loan amount, income, interest rate, weight, height) execute locally in your web browser. Your inputs are not transmitted to or stored on our servers.</p>
            </section>

            <section>
              <h3 style="color: var(--text-primary); font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem;">3. Local Storage</h3>
              <p>If you bookmark a favorite calculator or view recent calculation history, this data is saved exclusively inside your browser's LocalStorage and can be cleared by you at any time.</p>
            </section>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // VIEW: HOME PAGE (STREAMLINED & COMPACT)
  // ==========================================
  renderHomePage() {
    this.updateSeoMeta(
      'letscalculate.in - Free Precision Finance, Math & Health Calculators',
      'We are finance enthusiasts trying to help people on calculating all the required finances. Access 60+ free calculators for SIP, EMI, loans, stocks, and health. 100% Free.',
      'https://letscalculate.in/'
    );
    const mainEl = document.getElementById('app-main');

    mainEl.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-glow-bg"></div>
        <div class="container hero-content">
          <div class="hero-tagline-pill">
            ${getIconSvg('calculator', 16)} Precision Finance, Math &amp; Health Calculators
          </div>
          <h1 class="hero-title">
            Every Calculator You Need, <br>
            <span class="text-gradient">All in One Place.</span>
          </h1>
          <p class="hero-subtitle">
            Fast, responsive, and beautifully designed calculators for personal finance, mathematics, and health &amp; fitness. 100% Free, no signup required.
          </p>

          <!-- Interactive Search Trigger Box -->
          <div class="hero-search-wrapper">
            <div class="hero-search-input-box" id="hero-search-trigger" style="cursor: pointer;">
              ${getIconSvg('search', 20)}
              <input type="text" id="hero-search-input" placeholder="Search Finance, Math &amp; Health calculators (e.g. Loan, EMI, BMI, Percentage, SIP)..." autocomplete="off">
              <button class="hero-search-submit" type="button" aria-label="Find tool">
                <span>Find Tool</span>
                <span class="search-shortcut-badge">/</span>
              </button>
            </div>
          </div>

          <!-- Quick Navigation Chips -->
          <div class="hero-quick-tags">
            <span style="font-size: 0.85rem; color: var(--text-muted); margin-right: 0.25rem;">Popular:</span>
            <!-- US Stocks Popular Quick-tag hidden for now:
            <a href="#/calculator/us-stocks-calculator" class="quick-tag quick-tag-popular" title="Popular US Stocks Calculator" style="border-color: rgba(59, 130, 246, 0.45); background: rgba(37, 99, 235, 0.12); color: #93c5fd;">
              <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
                <span>🇺🇸 US Stocks</span>
              </span>
              <span class="quick-tag-badge-new" style="background: #2563eb; color: #fff;">POPULAR</span>
            </a>
            -->
            <a href="#/calculator/loan-calculator" class="quick-tag">Loan Calculator</a>
            <a href="#/calculator/emi-calculator" class="quick-tag">EMI Calculator</a>
            <a href="#/calculator/bmi-calculator" class="quick-tag">BMI Calculator</a>
            <a href="#/calculator/sip-calculator" class="quick-tag">SIP Calculator</a>
            <a href="#/calculator/swp-calculator" class="quick-tag">SWP Calculator</a>
            <a href="#/calculator/jewellery-price-calculator" class="quick-tag quick-tag-new" title="New Jewellery Price Calculator">
              <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: #fbbf24;"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
                <span>Jewellery Price</span>
              </span>
              <span class="quick-tag-badge-new">NEW</span>
            </a>
            <a href="#/calculator/percentage-calculator" class="quick-tag">Percentage</a>
            <a href="#/calculator/scientific-calculator" class="quick-tag">Scientific</a>
            <button type="button" class="feedback-highlight-pill open-feedback-modal-btn" title="Open Feedback Form">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Feedback Form</span>
            </button>
          </div>

          <!-- Public Access Badge & Feedback Link -->
          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 1.5rem; align-items: center; flex-wrap: wrap;">
            <div class="hero-tagline-pill" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3); color: var(--emerald);">
              ${getIconSvg('sparkles', 16)} 100% Free • No Signup Required • Instant Access
            </div>
            <button type="button" class="hero-tagline-pill open-feedback-modal-btn" style="background: rgba(99, 102, 241, 0.15); border-color: rgba(99, 102, 241, 0.3); color: #818cf8; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; font-family: inherit;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Share Feedback</span>
            </button>
          </div>
        </div>
      </section>

            <!-- Interactive Calculator Hub Section (3 Domains & Subcategories) -->
      <div id="home-calc-hub-mount"></div>

      <!-- Main Categories Section (3 Core Domains) -->
      <section class="container" style="padding-top: 1.5rem;">
        <div class="section-header">
          <div>
            <h2 class="section-title">Explore Main Categories</h2>
            <p class="section-desc">Browse specialized calculators organized into 3 primary domains.</p>
          </div>
          <a href="#/categories" class="btn-secondary">
            View All Calculators ${getIconSvg('arrow-right', 16)}
          </a>
        </div>

        <div class="categories-grid">
          ${CATEGORIES_DATA.map(cat => {
      const count = getCalculatorsByCategory(cat.id).length;
      return `
              <a href="#/category/${cat.id}" class="category-card glass-panel" style="--cat-accent: ${cat.accent};">
                <div>
                  <div class="cat-card-top">
                    <div class="cat-icon-box" style="color: ${cat.accent};">
                      ${getIconSvg(cat.icon, 28)}
                    </div>
                    <span class="cat-count-badge">${count} Calculators</span>
                  </div>
                  <h3 class="cat-title">${cat.name}</h3>
                  <p class="cat-desc">${cat.description}</p>
                </div>
                <div class="cat-footer-link">
                  <span>Explore ${cat.name}</span>
                  ${getIconSvg('arrow-right', 16)}
                </div>
              </a>
            `;
    }).join('')}
        </div>
      </section>

      <!-- Dedicated EMI & Loan Calculator Suite Section (Hidden on letscalculate.in) -->
      <section class="container" id="home-emi-suite-section" style="display: none !important;">
        <div class="glass-panel" id="home-emi-suite-panel" style="padding: 2.5rem 2rem; border-radius: var(--radius-2xl); border: 1px solid rgba(16, 185, 129, 0.28); background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.05) 50%, rgba(15, 23, 42, 0.96) 100%); position: relative; overflow: hidden;">
          <div class="section-header" style="margin-bottom: 1.75rem;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: var(--emerald); font-weight: 700; padding: 0.3rem 0.85rem; border-radius: var(--radius-full); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.75rem;">
                ${getIconSvg('landmark', 15)}
                <span>Dedicated EMI Suite • 29 Specialized Calculators</span>
              </div>
              <h2 class="section-title" style="font-size: 2.2rem; letter-spacing: -0.025em;">EMI &amp; Loan Calculator Suite</h2>
              <p class="section-desc" style="max-width: 800px;">
                Calculate monthly installments, interest savings from prepayment, borrowing capacity, and reverse loan tenures across 5 specialized loan categories.
              </p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
              <a href="#/calculator/emi-calculator" class="btn-primary" style="padding: 0.75rem 1.5rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.92rem; text-decoration: none; box-shadow: 0 4px 16px var(--emerald-glow); display: inline-flex; align-items: center; gap: 0.5rem;">
                <span>Open EMI Calculator</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
              <a href="#/calculator/compare-loan-calculator" class="btn-secondary" style="padding: 0.75rem 1.25rem; border-radius: var(--radius-full); font-weight: 600; font-size: 0.9rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                <span>Compare Loans</span>
              </a>
            </div>
          </div>

          <!-- Category Tabs Row -->
          <div class="home-emi-tabs-scroll" id="home-emi-tabs-row" style="margin-bottom: 1.75rem;">
            ${Object.entries(EMI_SUITE_CATEGORIES).map(([key, cat], i) => `
              <button type="button" class="home-emi-cat-tab ${i === 0 ? 'active' : ''}" data-cat="${key}">
                <span>${cat.icon}</span>
                <span>${cat.name}</span>
                <span class="home-emi-count-badge">${cat.calculators.length}</span>
              </button>
            `).join('')}
            <button type="button" class="home-emi-cat-tab" data-cat="all">
              <span>⭐</span>
              <span>All EMI Calculators</span>
              <span class="home-emi-count-badge">29</span>
            </button>
          </div>

          <!-- Cards Grid for Active Category -->
          <div class="calculators-grid" id="home-emi-cards-grid">
            ${EMI_SUITE_CATEGORIES.tools.calculators.map(c => {
              const meta = getCalculatorById(c.id);
              return meta ? this.renderCalcCard(meta) : '';
            }).join('')}
          </div>

          <!-- Bottom Footer Bar of Suite Section -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-glass);">
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.88rem;">
              ${getIconSvg('shield-check', 16)}
              <span>RBI Reducing Balance Standards • Exact Decimal Precision • 100% Free &amp; Private</span>
            </div>
            <a href="#/categories" class="quick-tag" style="padding: 0.45rem 1rem; font-size: 0.84rem; font-weight: 600;">
              Browse All 91 Calculators in Directory →
            </a>
          </div>
        </div>
      </section>

      <!-- Newly Launched & Trending Tools Showcase -->
      <section class="container" id="home-newly-launched-section" style="padding-top: 1.5rem;">
        <div class="section-header">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); color: #fbbf24; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.65rem;">
              ${getIconSvg('sparkles', 13)} Fresh Releases
            </div>
            <h2 class="section-title">Newly Launched Calculators</h2>
            <p class="section-desc">Explore our latest high-precision tools with instant calculations, visual graphs, and 100% free access.</p>
          </div>
          <a href="#/categories" class="btn-secondary">
            View All ${CALCULATORS_DATA.length} Calculators ${getIconSvg('arrow-right', 16)}
          </a>
        </div>

        <div class="calculators-grid" id="home-newly-launched-grid">
          ${[getCalculatorById('us-stocks-calculator'), ...CALCULATORS_DATA.filter(c => c.id !== 'us-stocks-calculator' && (typeof isNewCalculator === 'function' ? isNewCalculator(c) : false))].filter(Boolean).slice(0, 6).map(c => this.renderCalcCard(c)).join('')}
        </div>
      </section>

      <!-- Popular Calculators Section -->
      <section class="container" id="home-popular-section" style="padding-top: 1.5rem;">
        <div class="section-header">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); color: #60a5fa; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; text-transform: uppercase; margin-bottom: 0.65rem;">
              ${getIconSvg('star', 13)} Most Popular Calculators
            </div>
            <h2 class="section-title">Popular Calculators</h2>
            <p class="section-desc">The most widely used financial, stock investment, loan, and health calculation tools.</p>
          </div>
          <a href="#/categories" class="btn-secondary">
            View All ${CALCULATORS_DATA.length} Calculators ${getIconSvg('arrow-right', 16)}
          </a>
        </div>

        <div class="calculators-grid" id="home-popular-cards-grid">
          ${['us-stocks-calculator', 'sip-calculator', 'emi-calculator', 'loan-calculator', 'compound-interest-calculator', 'fd-calculator']
            .map(id => getCalculatorById(id))
            .filter(Boolean)
            .map(c => this.renderCalcCard(c))
            .join('')}
        </div>
      </section>

      <!-- Broker Selection & Relative Calculations Module (Hidden per requirement) -->
      <section class="container invest-section broker-module-wrapper" id="home-broker-module" style="display: none !important;">
        <div class="section-header">
          <div>
            <div class="invest-section-tagline-badge">
              ${getIconSvg('trending-up', 14)}
              <span>Broker Selection &amp; Relative Calculations</span>
            </div>
            <h2 class="section-title">Broker Selection &amp; Investment Suite</h2>
            <p class="section-desc">Choose your broker, explore specialized investment paths, and calculate real brokerage savings, SIP growth, and ETF/REIT dividend returns.</p>
          </div>
          <div class="invest-header-meta">
            <span class="invest-trust-pill">
              ${getIconSvg('shield-check', 14)}
              <span>SEBI Registered • 1.5+ Crore Investors</span>
            </span>
          </div>
        </div>

        <!-- Broker Selection Cards Row -->
        <div class="broker-selector-row" id="broker-selector-row">
          <div class="broker-select-card active" data-broker="zerodha">
            <div class="broker-card-top-row">
              <span class="broker-brand-title" style="color: #387ed1;">ZERODHA</span>
              <span class="broker-status-pill pill-active-broker">Selected • ₹0 Delivery</span>
            </div>
            <p class="broker-card-tagline">India's pioneer discount broker with 1.5+ Crore clients. ₹0 equity delivery &amp; direct mutual funds.</p>
            <div class="broker-card-footer">
              <span>★ 4.8 Rating</span>
              <span>•</span>
              <span>1.5+ Cr Clients</span>
              <span>•</span>
              <span style="color: var(--emerald); font-weight: 700;">Zero AMC Available</span>
            </div>
          </div>

          <div class="broker-select-card disabled" data-broker="coming-soon" style="cursor: default; background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border-glass);">
            <div class="broker-card-top-row">
              <span class="broker-brand-title" style="color: var(--text-muted); font-size: 1.05rem;">More Brokers</span>
              <span class="broker-status-pill pill-coming-soon">Coming Soon</span>
            </div>
            <p class="broker-card-tagline" style="color: var(--text-muted); margin-bottom: 0.6rem;">
              More details coming soon. Integration with additional brokers will be available shortly.
            </p>
            <div class="broker-card-footer" style="color: var(--text-muted);">
              <span>More details coming soon...</span>
            </div>
          </div>
        </div>

        <!-- Selected Broker Header Banner -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--emerald); box-shadow: 0 0 10px var(--emerald);"></div>
            <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">Zerodha Investment Options</span>
            <span style="font-size: 0.78rem; color: var(--text-muted); background: var(--bg-surface); padding: 0.15rem 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">SEBI Reg: INZ000031633</span>
          </div>
          <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" style="color: var(--emerald); font-size: 0.86rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
            <span>Open Zerodha Account Directly</span>
            ${getIconSvg('arrow-right', 14)}
          </a>
        </div>

        <!-- Broker Options 6-Card Responsive Grid -->
        <div class="invest-grid" id="broker-options-grid">
          <!-- Card 1: Open a Free Demat Account (Highlighted) -->
          <div class="invest-card featured-emerald">
            <div class="invest-card-top">
              <div class="invest-card-header-row">
                <div class="invest-card-icon-box icon-emerald">
                  ${getIconSvg('folder-check', 26)}
                </div>
                <span class="invest-badge badge-popular">
                  ${getIconSvg('sparkles', 12)} Most Popular
                </span>
              </div>
              <h3 class="invest-card-title">Open a Free Demat Account</h3>
              <p class="invest-card-desc">
                Fast, 100% paperless onboarding in under 5 minutes. Hold stocks, direct mutual funds, ETFs, SGBs, and bonds securely with CDSL.
              </p>
              <ul class="invest-perks-list">
                <li><span class="perk-bullet">✓</span> Zero account opening charge</li>
                <li><span class="perk-bullet">✓</span> Instant Aadhaar e-Sign KYC</li>
              </ul>
            </div>
            <div class="invest-card-bottom">
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-emerald">
                <span>Open Free Account</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>

          <!-- Card 2: Want Zero Equity Delivery Brokerage? Open a Demat (Highlighted) -->
          <div class="invest-card featured-indigo">
            <div class="invest-card-top">
              <div class="invest-card-header-row">
                <div class="invest-card-icon-box icon-indigo">
                  ${getIconSvg('award', 26)}
                </div>
                <span class="invest-badge badge-zero">
                  ${getIconSvg('sparkles', 12)} ₹0 Brokerage
                </span>
              </div>
              <h3 class="invest-card-title">Want Zero Equity Delivery Brokerage? Open a Demat</h3>
              <p class="invest-card-desc">
                Enjoy ₹0 brokerage on all equity delivery investments forever. Keep 100% of your long-term compounding profits without hidden fees.
              </p>
              <ul class="invest-perks-list">
                <li><span class="perk-bullet">✓</span> Flat ₹0 on Equity Delivery</li>
                <li><span class="perk-bullet">✓</span> No hidden maintenance traps</li>
              </ul>
            </div>
            <div class="invest-card-bottom">
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-indigo">
                <span>Open Demat Account</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>

          <!-- Card 3: Want to start SIP in Mutual Funds? -->
          <div class="invest-card">
            <div class="invest-card-top">
              <div class="invest-card-header-row">
                <div class="invest-card-icon-box icon-emerald">
                  ${getIconSvg('wallet', 26)}
                </div>
                <span class="invest-badge">Direct Plans</span>
              </div>
              <h3 class="invest-card-title">Want to start SIP in Mutual Funds?</h3>
              <p class="invest-card-desc">
                Automate monthly wealth creation in direct mutual funds via Coin. Save up to 1.5% in distributor commissions every single year.
              </p>
              <ul class="invest-perks-list">
                <li><span class="perk-bullet">✓</span> 0% distributor commissions</li>
                <li><span class="perk-bullet">✓</span> Flexible SIP pause &amp; top-up</li>
              </ul>
            </div>
            <div class="invest-card-bottom">
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-default">
                <span>Start SIP Now</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>

          <!-- Card 4: Want to start SIP in ETFs? -->
          <div class="invest-card">
            <div class="invest-card-top">
              <div class="invest-card-header-row">
                <div class="invest-card-icon-box icon-sky">
                  ${getIconSvg('layers', 26)}
                </div>
                <span class="invest-badge">Index SIP</span>
              </div>
              <h3 class="invest-card-title">Want to start SIP in ETFs?</h3>
              <p class="invest-card-desc">
                Schedule recurring SIPs in Nifty 50, Sensex, Gold, and Global Index ETFs traded directly on exchange at real-time market prices.
              </p>
              <ul class="invest-perks-list">
                <li><span class="perk-bullet">✓</span> Ultra-low expense ratios (&lt; 0.1%)</li>
                <li><span class="perk-bullet">✓</span> Real-time exchange liquidity</li>
              </ul>
            </div>
            <div class="invest-card-bottom">
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-default">
                <span>Start ETF SIP</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>

          <!-- Card 5: Want to Invest in REITs? -->
          <div class="invest-card">
            <div class="invest-card-top">
              <div class="invest-card-header-row">
                <div class="invest-card-icon-box icon-amber">
                  ${getIconSvg('building', 26)}
                </div>
                <span class="invest-badge">Real Estate</span>
              </div>
              <h3 class="invest-card-title">Want to Invest in REITs?</h3>
              <p class="invest-card-desc">
                Earn regular quarterly rental dividend payouts from Grade-A commercial office parks, tech hubs, and prime retail infrastructure.
              </p>
              <ul class="invest-perks-list">
                <li><span class="perk-bullet">✓</span> Fractional prime commercial ownership</li>
                <li><span class="perk-bullet">✓</span> Quarterly rental dividend yield</li>
              </ul>
            </div>
            <div class="invest-card-bottom">
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-default">
                <span>Invest in REITs</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>

          <!-- Card 6: Open an Account for Trading -->
          <div class="invest-card">
            <div class="invest-card-top">
              <div class="invest-card-header-row">
                <div class="invest-card-icon-box icon-rose">
                  ${getIconSvg('activity', 26)}
                </div>
                <span class="invest-badge">Active Trading</span>
              </div>
              <h3 class="invest-card-title">Open an Account for Trading</h3>
              <p class="invest-card-desc">
                Pro-grade interactive charting with TradingView, ultra-low latency execution, and flat ₹20 per executed order for F&amp;O and intraday.
              </p>
              <ul class="invest-perks-list">
                <li><span class="perk-bullet">✓</span> Flat ₹20 per order on F&amp;O &amp; Intraday</li>
                <li><span class="perk-bullet">✓</span> Advanced orders, GTT &amp; Basket orders</li>
              </ul>
            </div>
            <div class="invest-card-bottom">
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-default">
                <span>Start Trading</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>
        </div>

        <!-- Section: Investing in US Stocks -->
        <div class="us-stocks-section-wrap" id="us-stocks-broker-section">
          <div class="section-header" style="margin-bottom: 1.25rem;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(37, 99, 235, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); color: #60a5fa; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.76rem; text-transform: uppercase; margin-bottom: 0.5rem;">
                <span style="font-size: 0.9rem;">🇺🇸</span> Global Equities • US Markets
              </div>
              <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.35rem; letter-spacing: -0.015em; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span>Investing in US Stocks</span>
                <span style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); background: rgba(37, 99, 235, 0.18); color: #93c5fd; font-weight: 600; border: 1px solid rgba(59, 130, 246, 0.35);">NYSE &amp; NASDAQ</span>
              </h3>
              <p style="font-size: 0.92rem; color: var(--text-secondary); max-width: 720px; margin: 0;">
                Invest directly in leading US technology giants and global ETFs with fractional shares, and calculate your rupee allocation in real-time.
              </p>
            </div>
            <div class="invest-header-meta">
              <a href="#/calculator/us-stocks-calculator" style="color: #60a5fa; font-size: 0.86rem; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
                <span>Open Calculator Directly</span>
                ${getIconSvg('arrow-right', 14)}
              </a>
            </div>
          </div>

          <!-- US Stocks Responsive 2-Card Grid -->
          <div class="invest-grid us-stocks-grid" id="us-stocks-cards-grid">
            <!-- Card 1: Invest in US Stocks -->
            <div class="invest-card featured-us-stocks">
              <div class="invest-card-top">
                <div class="invest-card-header-row">
                  <div class="invest-card-icon-box icon-us-blue">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <span class="invest-badge badge-us-pill">
                    🇺🇸 Direct US Equities
                  </span>
                </div>
                <h3 class="invest-card-title">Invest in US Stocks</h3>
                <p class="invest-card-desc">
                  Open a Zerodha account to start investing in US companies.
                </p>
                <ul class="invest-perks-list">
                  <li><span class="perk-bullet">✓</span> Access Apple, Microsoft, Google, Nvidia &amp; Tesla</li>
                  <li><span class="perk-bullet">✓</span> Start with affordable fractional share investing</li>
                </ul>
              </div>
              <div class="invest-card-bottom" style="display: flex; flex-direction: column; gap: 0.65rem;">
                <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn btn-cta-us-blue">
                  <span>Open Account</span>
                  ${getIconSvg('arrow-right', 16)}
                </a>
                <a href="#/calculator/us-stocks-calculator" class="invest-cta-btn-secondary btn-sec-us-blue">
                  ${getIconSvg('calculator', 16)}
                  <span>Use US Stocks Calculator</span>
                </a>
              </div>
            </div>

            <!-- Card 2: US Stocks Calculator -->
            <div class="invest-card featured-us-stocks">
              <div class="invest-card-top">
                <div class="invest-card-header-row">
                  <div class="invest-card-icon-box icon-us-cyan">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="16" height="20" x="4" y="2" rx="2"/>
                      <line x1="8" x2="16" y1="6" y2="6"/>
                      <path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/>
                      <path d="M12 14h.01"/><path d="M8 14h.01"/>
                      <path d="M12 18h.01"/><path d="M8 18h.01"/>
                    </svg>
                  </div>
                  <span class="invest-badge badge-calc-pill">
                    ⚡ Instant FX &amp; Allocation
                  </span>
                </div>
                <h3 class="invest-card-title">US Stocks Calculator</h3>
                <p class="invest-card-desc">
                  Convert INR to USD and check how many shares you can buy.
                </p>
                <ul class="invest-perks-list">
                  <li><span class="perk-bullet">✓</span> Full &amp; fractional shares breakdown with donut chart</li>
                  <li><span class="perk-bullet">✓</span> Real-time exchange rate conversion &amp; presets</li>
                </ul>
              </div>
              <div class="invest-card-bottom" style="display: flex; flex-direction: column; gap: 0.65rem;">
                <a href="#/calculator/us-stocks-calculator" class="invest-cta-btn btn-cta-us-cyan">
                  <span>Calculate Now</span>
                  ${getIconSvg('arrow-right', 16)}
                </a>
                <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="invest-cta-btn-secondary btn-sec-us-cyan">
                  ${getIconSvg('arrow-right', 15)}
                  <span>Open Zerodha Account</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Relative Calculations Suite (Zerodha Edition - Hidden on letscalculate.in) -->
        <div class="broker-calc-box" id="broker-calc-box" style="display: none !important;">
          <div class="section-header" style="margin-bottom: 1.5rem;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: var(--emerald); font-weight: 700; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.76rem; text-transform: uppercase; margin-bottom: 0.5rem;">
                ${getIconSvg('calculator', 14)} Relative Calculations • Zerodha Module
              </div>
              <h3 style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.35rem; letter-spacing: -0.02em;">
                Interactive Brokerage &amp; Investment Calculations
              </h3>
              <p style="font-size: 0.94rem; color: var(--text-secondary); max-width: 760px; margin: 0;">
                Calculate real regulatory charges, project SIP wealth with 0% distributor commission savings, forecast REIT rental cashflows, and compare Demat savings.
              </p>
            </div>
          </div>

          <!-- Calculation Category Tabs -->
          <div class="broker-calc-nav" id="broker-calc-nav">
            <button type="button" class="broker-calc-tab-btn active" data-tab="brokerage">
              <span>📊</span>
              <span>Brokerage &amp; Net P&amp;L</span>
            </button>
            <button type="button" class="broker-calc-tab-btn" data-tab="sip">
              <span>📈</span>
              <span>SIP &amp; Commission Savings</span>
            </button>
            <button type="button" class="broker-calc-tab-btn" data-tab="etf-reit">
              <span>🏢</span>
              <span>ETF &amp; REIT Projections</span>
            </button>
            <button type="button" class="broker-calc-tab-btn" data-tab="demat">
              <span>🛡️</span>
              <span>Demat Account Savings</span>
            </button>
          </div>

          <!-- Dynamic Calculation Content Grid: Inputs + EMI-style Results -->
          <div class="broker-calc-content-grid" id="broker-calc-content-grid">
            <!-- Inputs Column rendered by Controller -->
            <div class="broker-inputs-column" id="broker-inputs-column"></div>

            <!-- EMI-Style Results Panel rendered by Controller -->
            <div class="broker-results-panel" id="broker-results-panel"></div>
          </div>
        </div>
      </section>

      <!-- Prominent Call-to-Action for All Calculators Directory -->
      <section class="container" style="margin-top: 2rem; margin-bottom: 2rem;">
        <div class="glass-panel" style="padding: 2.25rem 2rem; border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%); border: 1px solid var(--border-card);">
          <div style="max-width: 680px;">
            <div style="display: inline-flex; align-items: center; gap: 0.45rem; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--emerald); color: var(--emerald); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.65rem; letter-spacing: 0.05em;">
              ${getIconSvg('calculator', 14)} Full Directory • 60+ Calculators
            </div>
            <h3 style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.4rem; letter-spacing: -0.02em;">
              Looking for a specific calculator?
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.98rem; line-height: 1.6; margin: 0;">
              Visit the complete All Calculators page to search, filter by domain (Finance, Math, Health &amp; Fitness), and instantly calculate.
            </p>
          </div>
          <a href="#/categories" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.85rem 1.65rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.95rem; text-decoration: none; white-space: nowrap; box-shadow: 0 4px 16px var(--emerald-glow);">
            <span>Open All Calculators</span>
            ${getIconSvg('arrow-right', 16)}
          </a>
        </div>
      </section>

      <!-- Main Page Feedback Callout Section -->
      <section class="container" style="margin-top: 2rem; margin-bottom: 2rem;">
        <div class="feedback-cta-banner glass-panel">
          <div class="feedback-cta-left">
            <div class="feedback-badge">
              ${getIconSvg('sparkles', 14)} Community &amp; Feedback
            </div>
            <h3 class="feedback-cta-title">
              Have feedback or want a new calculator added?
            </h3>
            <p class="feedback-cta-desc">
              We value your ideas! Tell us what you like best and what calculators we should build next. Click below to open the quick feedback form.
            </p>
          </div>
          <button type="button" class="feedback-cta-btn-highlight open-feedback-modal-btn" id="main-page-feedback-trigger">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Feedback Form</span>
          </button>
        </div>
      </section>

      <!-- Loading More Calculators Line (User Requirement) -->
      <div class="more-calculators-loading-banner">
        <div class="loading-pulse-indicator">
          <span class="pulse-ring"></span>
          <span class="pulse-dot"></span>
        </div>
        <span class="loading-text">More calculators coming soon...</span>
      </div>
    `;

    // Initialize Broker Selection & Relative Calculations Module
    const brokerModuleContainer = mainEl.querySelector('#home-broker-module');
    if (brokerModuleContainer && typeof BrokerModuleController !== 'undefined') {
      BrokerModuleController.init(brokerModuleContainer);
    }

    // Interactive Tab Switching for Dedicated Home EMI Suite Section
    const homeEmiTabs = mainEl.querySelectorAll('#home-emi-tabs-row .home-emi-cat-tab');
    const homeEmiGrid = mainEl.querySelector('#home-emi-cards-grid');
    if (homeEmiTabs.length && homeEmiGrid) {
      homeEmiTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const catKey = tab.getAttribute('data-cat');
          homeEmiTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          if (catKey === 'all') {
            const allCalcs = Object.values(EMI_SUITE_CATEGORIES).flatMap(c => c.calculators);
            homeEmiGrid.innerHTML = allCalcs.map(c => {
              const meta = getCalculatorById(c.id);
              return meta ? this.renderCalcCard(meta) : '';
            }).join('');
            this.bindCardEvents();
          } else {
            const catData = EMI_SUITE_CATEGORIES[catKey];
            if (catData && catData.calculators) {
              homeEmiGrid.innerHTML = catData.calculators.map(c => {
                const meta = getCalculatorById(c.id);
                return meta ? this.renderCalcCard(meta) : '';
              }).join('');
              this.bindCardEvents();
            }
          }
        });
      });
    }

    this.bindCardEvents();
  },

  // ==========================================
  // VIEW: ALL CALCULATORS & DIRECTORY PAGE
  // ==========================================
  // ==========================================
  // VIEW: ALL CALCULATORS & DIRECTORY PAGE (ENHANCED INDEXING)
  // ==========================================
  renderAllCategoriesPage() {
    this.updateSeoMeta(
      'All Calculators Directory - 90+ Free Online Tools | letscalculate.in',
      'Search and filter our complete catalog of 90+ verified calculators across Finance, Loans & EMI Suite, Mathematics, and Health & Fitness. Fast, accurate, and 100% free with no signup required.',
      'https://letscalculate.in/#/categories',
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://letscalculate.in/#/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'All Calculators Directory', 'item': 'https://letscalculate.in/#/categories' }
        ]
      }
    );

    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    const totalCount = CALCULATORS_DATA.length;
    const newCount = CALCULATORS_DATA.filter(c => typeof isNewCalculator === 'function' ? isNewCalculator(c) : false).length;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    mainEl.innerHTML = `
      <div class="container" style="padding: 2.5rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>All Calculators Directory</span>
        </div>

        <!-- Page Hero Header -->
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 0.6rem; letter-spacing: -0.025em; line-height: 1.2;">
            All Calculators Directory
          </h1>
          <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 780px; line-height: 1.6;">
            Explore our comprehensive, categorized directory of ${totalCount} high-precision calculators spanning Loans &amp; EMI suites, Investments, Retirement, Mathematics, and Health &amp; Fitness.
          </p>

          <div class="dir-stats-bar">
            <span class="dir-stat-pill">
              ${getIconSvg('calculator', 15)}
              <span><strong>${totalCount}</strong> Total Tools</span>
            </span>
            <span class="dir-stat-pill highlight">
              ${getIconSvg('sparkles', 15)}
              <span><strong>${newCount}</strong> Newly Launched</span>
            </span>
            <span class="dir-stat-pill">
              ${getIconSvg('shield-check', 15)}
              <span>100% Free &amp; Private</span>
            </span>
            <span class="dir-stat-pill">
              ${getIconSvg('zap', 15)}
              <span>Instant Precision Results</span>
            </span>
          </div>
        </div>

                <!-- Interactive Calculator Hub Section (Tabs & Sub-Tabs) -->
        <div id="dir-calc-hub-mount" style="margin-bottom: 2rem;"></div>

        <!-- Search & View Mode Toolbar -->
        <div class="dir-toolbar">
          <div class="dir-search-box" id="dir-search-box">
            ${getIconSvg('search', 18)}
            <input type="text" id="dir-search-input" class="dir-search-input" placeholder="Search ${totalCount} calculators by name, topic, or keyword..." autocomplete="off">
            <button type="button" class="dir-clear-btn" id="dir-clear-btn" title="Clear search">✕</button>
          </div>

          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <div id="dir-count-pill" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
              Showing ${totalCount} of ${totalCount} calculators
            </div>
            <div class="dir-view-mode-toggle">
              <button type="button" class="view-toggle-btn active" id="view-mode-grid" title="Cards Grid View">
                ${getIconSvg('layout', 15)} Grid
              </button>
              <button type="button" class="view-toggle-btn" id="view-mode-table" title="Compact Table / List View">
                ${getIconSvg('list', 15)} Table
              </button>
            </div>
          </div>
        </div>

        <!-- Topical Sub-Category Navigation Tabs -->
        <div class="dir-topic-tabs" id="dir-topic-tabs">
          ${CALCULATOR_TOPICS.map((topic, i) => {
            const count = topic.id === 'all'
              ? totalCount
              : (topic.id === 'new'
                ? newCount
                : CALCULATORS_DATA.filter(c => getCalculatorTopic(c) === topic.id).length);
            return `
              <button type="button" class="dir-topic-btn ${i === 0 ? 'active' : ''} ${topic.id === 'new' ? 'is-new-tab' : ''}" data-topic="${topic.id}">
                <span>${topic.id === 'new' ? '✨' : getIconSvg(topic.icon, 15)}</span>
                <span>${topic.name}</span>
                <span style="font-size: 0.72rem; opacity: 0.8; font-weight: 700; background: rgba(255,255,255,0.14); padding: 0.1rem 0.4rem; border-radius: var(--radius-full);">${count}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- A-Z Alphabetical Quick-Filter Bar -->
        <div class="alpha-filter-bar" id="dir-alpha-bar">
          <button type="button" class="alpha-btn active" data-letter="all">ALL</button>
          ${letters.map(letter => `
            <button type="button" class="alpha-btn" data-letter="${letter}">${letter}</button>
          `).join('')}
        </div>

        <!-- Dynamic Content Area (Grid or Table View) -->
        <div id="dir-content-area"></div>

        <!-- Loading More Calculators Line (User Requirement) -->
        <div class="more-calculators-loading-banner" style="margin-top: 3.5rem;">
          <div class="loading-pulse-indicator">
            <span class="pulse-ring"></span>
            <span class="pulse-dot"></span>
          </div>
          <span class="loading-text">many more specialized calculators are continuously being added</span>
        </div>
      </div>
    `;

    // State
    let currentTopic = 'all';
    let currentLetter = 'all';
    let currentQuery = '';
    let currentView = 'grid'; // 'grid' | 'table'

    const searchInput = document.getElementById('dir-search-input');
    const searchBox = document.getElementById('dir-search-box');
    const clearBtn = document.getElementById('dir-clear-btn');
    const countPill = document.getElementById('dir-count-pill');
    const contentArea = document.getElementById('dir-content-area');
    const topicBtns = document.querySelectorAll('#dir-topic-tabs .dir-topic-btn');
    const alphaBtns = document.querySelectorAll('#dir-alpha-bar .alpha-btn');
    const gridToggleBtn = document.getElementById('view-mode-grid');
    const tableToggleBtn = document.getElementById('view-mode-table');

    const renderDirectoryContent = () => {
      // 1. Filter items
      let filtered = CALCULATORS_DATA;

      if (currentTopic === 'new') {
        filtered = filtered.filter(c => isNewCalculator(c));
      } else if (currentTopic !== 'all') {
        filtered = filtered.filter(c => getCalculatorTopic(c) === currentTopic);
      }

      if (currentLetter !== 'all') {
        filtered = filtered.filter(c => c.title.trim().toUpperCase().startsWith(currentLetter));
      }

      if (currentQuery) {
        const q = currentQuery.toLowerCase().trim();
        filtered = filtered.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          (c.formula && c.formula.toLowerCase().includes(q))
        );
      }

      // Update counter
      if (countPill) {
        countPill.textContent = `Showing ${filtered.length} of ${totalCount} calculators`;
      }

      // If empty results
      if (filtered.length === 0) {
        contentArea.innerHTML = `
          <div class="glass-panel" style="padding: 3.5rem 2rem; text-align: center; border-radius: var(--radius-xl); margin-top: 1rem;">
            <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
            <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.5rem;">No Calculators Found</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem;">
              No calculator matched "${currentQuery || currentLetter}". Try adjusting your search keyword or clearing the letter filter.
            </p>
            <button type="button" class="btn-primary" id="reset-dir-filter-btn" style="padding: 0.6rem 1.4rem; border-radius: var(--radius-full);">
              Clear All Filters
            </button>
          </div>
        `;
        document.getElementById('reset-dir-filter-btn')?.addEventListener('click', () => {
          currentTopic = 'all';
          currentLetter = 'all';
          currentQuery = '';
          if (searchInput) searchInput.value = '';
          searchBox?.classList.remove('has-val');
          topicBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-topic') === 'all'));
          alphaBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-letter') === 'all'));
          this.renderCalculatorHub(document.getElementById('dir-calc-hub-mount'), 'finance');
    renderDirectoryContent();
        });
        return;
      }

      // 2. Render in selected view
      if (currentView === 'table') {
        // Table list view
        contentArea.innerHTML = `
          <div class="dir-table-container glass-panel">
            <table class="dir-table">
              <thead>
                <tr>
                  <th style="min-width: 280px;">Calculator</th>
                  <th style="width: 160px;">Category</th>
                  <th style="min-width: 220px;">Formula Preview</th>
                  <th style="width: 140px; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${filtered.map(c => this.renderCalcTableRow(c)).join('')}
              </tbody>
            </table>
          </div>
        `;
      } else {
        // Grid View: If viewing 'all' with no query and no letter, show curated sections
        const isDefaultView = currentTopic === 'all' && currentLetter === 'all' && !currentQuery;

        if (isDefaultView) {
          const sections = [
            {
              id: 'new-shelf',
              title: '🌟 Newly Released Calculators',
              calcs: filtered.filter(c => isNewCalculator(c))
            },
            {
              id: 'sec-loans',
              title: '🏠 Loans & Comprehensive EMI Suite',
              calcs: filtered.filter(c => getCalculatorTopic(c) === 'loans-emi')
            },
            {
              id: 'sec-investments',
              title: '📈 Investments & Wealth Building',
              calcs: filtered.filter(c => getCalculatorTopic(c) === 'investments')
            },
            {
              id: 'sec-retirement',
              title: '🏖️ Retirement & Long-Term Savings',
              calcs: filtered.filter(c => getCalculatorTopic(c) === 'retirement')
            },
            {
              id: 'sec-taxes',
              title: '💼 Tax, Salary & Commercial Finance',
              calcs: filtered.filter(c => getCalculatorTopic(c) === 'taxes-business')
            },
            {
              id: 'sec-math',
              title: '🧮 Mathematics & Scientific Solvers',
              calcs: filtered.filter(c => getCalculatorTopic(c) === 'math')
            },
            {
              id: 'sec-health',
              title: '🏃 Health, Body Composition & Fitness',
              calcs: filtered.filter(c => getCalculatorTopic(c) === 'health')
            }
          ];

          contentArea.innerHTML = sections.map(sec => `
            <div style="margin-bottom: 2.75rem;">
              <div class="dir-section-header">
                <h2 class="dir-section-title">${sec.title}</h2>
                <span class="dir-section-count">${sec.calcs.length} Tools</span>
              </div>
              <div class="calculators-grid">
                ${sec.calcs.map(c => this.renderCalcCard(c)).join('')}
              </div>
            </div>
          `).join('');
        } else {
          // Flat filtered grid
          contentArea.innerHTML = `
            <div class="calculators-grid">
              ${filtered.map(c => this.renderCalcCard(c)).join('')}
            </div>
          `;
        }
      }

      this.bindCardEvents();
    };

    // Event Bindings
    searchInput?.addEventListener('input', (e) => {
      currentQuery = e.target.value;
      if (currentQuery) {
        searchBox?.classList.add('has-val');
      } else {
        searchBox?.classList.remove('has-val');
      }
      renderDirectoryContent();
    });

    clearBtn?.addEventListener('click', () => {
      currentQuery = '';
      if (searchInput) searchInput.value = '';
      searchBox?.classList.remove('has-val');
      renderDirectoryContent();
      searchInput?.focus();
    });

    topicBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        topicBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTopic = btn.getAttribute('data-topic') || 'all';
        renderDirectoryContent();
      });
    });

    alphaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        alphaBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLetter = btn.getAttribute('data-letter') || 'all';
        renderDirectoryContent();
      });
    });

    gridToggleBtn?.addEventListener('click', () => {
      currentView = 'grid';
      gridToggleBtn.classList.add('active');
      tableToggleBtn?.classList.remove('active');
      renderDirectoryContent();
    });

    tableToggleBtn?.addEventListener('click', () => {
      currentView = 'table';
      tableToggleBtn.classList.add('active');
      gridToggleBtn?.classList.remove('active');
      renderDirectoryContent();
    });

    // Initial render
    renderDirectoryContent();
  },

  renderCategoryPage(catId, subcatKey = null) {
    const category = getCategoryById(catId);
    if (!category) {
      window.location.hash = '#/';
      return;
    }

    const domainKey = (category.id === 'financial') ? 'finance' : category.id;
    const allCalcs = getCalculatorsByCategory(catId);

    // Subcategory definitions for switcher tabs and routing
    const subcatsMap = {
      'finance': [
        { key: 'emi-loan', hubKey: 'emi-loans', name: 'EMI & Loan Calculators', icon: '💳' },
        { key: 'sip', hubKey: 'sip', name: 'SIP Calculators', icon: '🔄' },
        { key: 'trading', hubKey: 'trading', name: 'Trading Calculators', icon: '📊' },
        { key: 'investment', hubKey: 'investments', name: 'Investment Calculators', icon: '📈' }
      ],
      'financial': [
        { key: 'emi-loan', hubKey: 'emi-loans', name: 'EMI & Loan Calculators', icon: '💳' },
        { key: 'sip', hubKey: 'sip', name: 'SIP Calculators', icon: '🔄' },
        { key: 'trading', hubKey: 'trading', name: 'Trading Calculators', icon: '📊' },
        { key: 'investment', hubKey: 'investments', name: 'Investment Calculators', icon: '📈' }
      ],
      'math': [
        { key: 'basic', hubKey: 'basic-math', name: 'Basic Math Tools', icon: '➕' },
        { key: 'advanced', hubKey: 'advanced-math', name: 'Advanced Math Tools', icon: '📐' },
        { key: 'statistics', hubKey: 'advanced-math', name: 'Probability & Statistics', icon: '🎲' },
        { key: 'comparison', hubKey: 'comparison-affordability', name: 'Comparison Tools', icon: '⚖️' }
      ],
      'health': [
        { key: 'general', hubKey: 'general-health', name: 'General Health', icon: '🩺' },
        { key: 'scores', hubKey: 'medical-scores', name: 'Medical Scores', icon: '📋' },
        { key: 'wellness', hubKey: 'wellness-lifestyle', name: 'Wellness & Lifestyle', icon: '🌿' }
      ]
    };

    const subcats = subcatsMap[domainKey] || [];
    let currentSubcat = null;
    let calcs = allCalcs;

    if (subcatKey) {
      currentSubcat = subcats.find(s => s.key === subcatKey || s.hubKey === subcatKey);
      if (currentSubcat && typeof getHubCalculators === 'function') {
        const hubCalcs = getHubCalculators(domainKey, currentSubcat.hubKey);
        if (hubCalcs && hubCalcs.length > 0) {
          calcs = hubCalcs;
        }
      }
    }

    const pageTitle = currentSubcat 
      ? `${currentSubcat.name} – ${category.name} Calculators | letscalculate.in`
      : `${category.name} - Free Online Calculators | letscalculate.in`;

    const pageDesc = currentSubcat
      ? `Explore precision ${currentSubcat.name} in the ${category.name} suite. 100% Free with step-by-step results and visual charts.`
      : `${category.description || category.tagline}. Accurate, free calculators for ${category.name.toLowerCase()} computations. No signup required.`;

    this.updateSeoMeta(
      pageTitle,
      pageDesc,
      `https://letscalculate.in/#/calculators/${domainKey}${currentSubcat ? '/' + currentSubcat.key : ''}`,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://letscalculate.in/#/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'All Calculators', 'item': 'https://letscalculate.in/#/calculators/all' },
          { '@type': 'ListItem', 'position': 3, 'name': category.name, 'item': `https://letscalculate.in/#/calculators/${domainKey}` }
        ]
      }
    );

    const mainEl = document.getElementById('app-main');
    if (!mainEl) return;

    mainEl.innerHTML = `
      <div class="container" style="padding: 3rem 1.5rem 5rem;">
        <!-- Breadcrumbs -->
        <div class="calc-breadcrumb">
          <a href="#/home">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <a href="#/calculators/all">All Calculators</a>
          <span class="calc-breadcrumb-separator">/</span>
          <a href="#/calculators/${domainKey}">${category.name}</a>
          ${currentSubcat ? `
            <span class="calc-breadcrumb-separator">/</span>
            <span>${currentSubcat.name}</span>
          ` : ''}
        </div>

        <!-- Header -->
        <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
          <div class="cat-icon-box" style="width: 64px; height: 64px; border-radius: var(--radius-xl); color: ${category.accent};">
            ${getIconSvg(category.icon, 34)}
          </div>
          <div>
            <h1 style="font-size: 2.4rem; margin-bottom: 0.25rem;">
              ${currentSubcat ? currentSubcat.name : category.name}
            </h1>
            <p style="font-size: 1.05rem; color: var(--text-secondary);">
              ${currentSubcat ? `Specialized ${currentSubcat.name} tools in the ${category.name} domain.` : category.tagline}
            </p>
          </div>
        </div>

        <!-- Subcategory Filter Chips Bar -->
        <div class="cat-subtabs-bar">
          <a href="#/calculators/${domainKey}" class="cat-subtab-chip ${!currentSubcat ? 'active' : ''}">
            <span>All ${category.name} (${allCalcs.length})</span>
          </a>
          ${subcats.map(sub => `
            <a href="#/calculators/${domainKey}/${sub.key}" class="cat-subtab-chip ${currentSubcat && currentSubcat.key === sub.key ? 'active' : ''}">
              <span>${sub.icon}</span>
              <span>${sub.name}</span>
            </a>
          `).join('')}
        </div>

        ${category.disclaimer ? `
          <div class="disclaimer-banner">
            ${getIconSvg('alert-triangle', 20)}
            <div>${category.disclaimer}</div>
          </div>
        ` : ''}

        <!-- Filter and Search within Category -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <p style="font-size: 1rem; color: var(--text-secondary);">
            Showing <strong>${calcs.length}</strong> calculators ${currentSubcat ? 'in ' + currentSubcat.name : 'in ' + category.name}
          </p>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <input type="text" id="cat-search-input" placeholder="Filter ${currentSubcat ? currentSubcat.name : category.name}..." style="padding: 0.45rem 0.9rem; font-size: 0.9rem; width: 240px;">
          </div>
        </div>

        <div class="calculators-grid" id="category-calcs-grid">
          ${calcs.map(calc => this.renderCalcCard(calc)).join('')}
        </div>
      </div>
    `;

    // Filter within category input
    const filterInput = document.getElementById('cat-search-input');
    const gridEl = document.getElementById('category-calcs-grid');
    filterInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = calcs.filter(c => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q));
      gridEl.innerHTML = filtered.map(c => this.renderCalcCard(c)).join('');
      this.bindCardEvents();
    });

    this.bindCardEvents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ==========================================
  // VIEW: DEDICATED CALCULATOR PAGE
  // ==========================================

  renderEmiSuiteSwitcher(activeCalcId) {
    const activeCategoryKey = typeof getEmiSuiteCategoryForCalc === 'function' ? getEmiSuiteCategoryForCalc(activeCalcId) : 'tools';
    if (typeof EMI_SUITE_CATEGORIES === 'undefined') return '';

    const catButtons = Object.entries(EMI_SUITE_CATEGORIES).map(([key, cat]) => {
      const isActive = key === activeCategoryKey;
      return `
        <button class="emi-suite-cat-btn ${isActive ? 'active' : ''}" data-cat="${key}" type="button">
          <span>${cat.icon}</span>
          <span>${cat.name}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="emi-suite-nav glass-panel" id="emi-suite-nav">
        <div class="emi-suite-top">
          <div class="emi-suite-brand">
            <span class="emi-suite-badge">Suite</span>
            <span class="emi-suite-title">EMI &amp; Loan Calculators</span>
          </div>
          <div class="emi-suite-cats-scroll" id="emi-suite-cats-scroll">
            ${catButtons}
          </div>
        </div>
        <div class="emi-suite-calcs-row" id="emi-suite-pills-row">
          ${this.renderEmiSuitePills(activeCategoryKey, activeCalcId)}
        </div>
      </div>
    `;
  },

  renderEmiSuitePills(catKey, activeCalcId) {
    if (typeof EMI_SUITE_CATEGORIES === 'undefined') return '';
    const cat = EMI_SUITE_CATEGORIES[catKey];
    if (!cat || !cat.calculators) return '';

    return cat.calculators.map(c => {
      const isActive = c.id === activeCalcId;
      return `
        <a href="#/calculator/${c.id}" class="emi-suite-calc-pill ${isActive ? 'active' : ''}">
          <span>${c.name}</span>
          ${c.badge ? `<span class="emi-pill-badge">${c.badge}</span>` : ''}
        </a>
      `;
    }).join('');
  },

  navigateBack(calc) {
    if (!calc || !calc.category) {
      window.location.hash = '#/calculators/all';
      return;
    }
    const cat = String(calc.category).toLowerCase();
    if (cat === 'financial' || cat === 'finance') {
      window.location.hash = '#/calculators/finance';
    } else if (cat === 'math') {
      window.location.hash = '#/calculators/math';
    } else if (cat === 'health') {
      window.location.hash = '#/calculators/health';
    } else {
      window.location.hash = '#/calculators/all';
    }
  },

  // ==========================================
  // TENURE FIELD HELPERS (Years <-> Months Toggle)
  // ==========================================
  isTenureField(field, calc) {
    if (!field) return false;
    if (field.hasTenureToggle !== undefined) return field.hasTenureToggle;
    if (field.isTenure !== undefined) return field.isTenure;
    if (field.type === 'select' || field.type === 'date' || field.type === 'text') return false;

    // Explicit exclusions for fields that are not loan/investment duration
    if (/grace|moratorium|course|crop|age|birth|processingFee|foir|interestRate|amount|principal|price|downPayment|exchangeValue|margin|tax/i.test(field.id)) return false;

    // 1. Any field with 'tenure' in id or label
    if (/tenure/i.test(field.id) || /tenure/i.test(field.label)) return true;

    // 2. Specific loan/repayment term fields
    if (field.id === 'termMonths' || field.id === 'loanTermMonths' || field.id === 'topUpTenureYears' || 
        field.id === 'remainingTenureMonths' || field.id === 'originalTenureYears' || 
        field.id === 'repaymentTenureYears' || field.id === 'tenureYearsA' || field.id === 'tenureYearsB' ||
        field.id === 'tenureYears' || field.id === 'tenureMonths') {
      return true;
    }

    // 3. Label contains Loan Term, Repayment Period, Time Horizon, Investment Period, etc.
    if (/loan\s*term|repayment\s*period|time\s*period|time\s*horizon|investment\s*horizon|investment\s*length|investment\s*duration|holding\s*period/i.test(field.label)) {
      if (field.suffix && /yr|year|mo|month/i.test(field.suffix)) {
        return true;
      }
    }

    // 4. In investment/loan calculators, any years/timeYears/periodMonths/timePeriod/holdingYears field
    if ((field.id === 'years' || field.id === 'timeYears' || field.id === 'timePeriod' || field.id === 'periodMonths' || field.id === 'holdingYears') &&
        field.suffix && /yr|year|mo|month/i.test(field.suffix)) {
      return true;
    }

    return false;
  },

  getFieldBaseUnit(field) {
    if (field.baseUnit) return field.baseUnit;
    if (field.id && field.id.toLowerCase().includes('month')) return 'months';
    if (field.suffix && /mo|month/i.test(field.suffix)) return 'months';
    return 'years';
  },

  getTenureBounds(field, activeUnit, baseUnit) {
    baseUnit = baseUnit || this.getFieldBaseUnit(field);
    const baseMin = field.min !== undefined ? Number(field.min) : (baseUnit === 'years' ? 1 : 12);
    const baseMax = field.max !== undefined ? Number(field.max) : (baseUnit === 'years' ? 30 : 360);
    const baseStep = field.step !== undefined ? Number(field.step) : 1;

    if (baseUnit === 'years') {
      if (activeUnit === 'months') {
        return {
          min: Math.max(1, Math.round(baseMin * 12)),
          max: Math.round(baseMax * 12),
          step: 1,
          suffix: 'Mos'
        };
      } else {
        return {
          min: baseMin,
          max: baseMax,
          step: baseStep,
          suffix: field.suffix || 'Yrs'
        };
      }
    } else {
      // baseUnit === 'months'
      if (activeUnit === 'years') {
        const minYears = Math.max(0.5, Math.round((baseMin / 12) * 10) / 10);
        const maxYears = Math.round(baseMax / 12);
        const step = (baseMin < 12 || baseMax % 12 !== 0) ? 0.5 : 1;
        return {
          min: minYears,
          max: maxYears,
          step: step,
          suffix: 'Yrs'
        };
      } else {
        return {
          min: baseMin,
          max: baseMax,
          step: baseStep,
          suffix: field.suffix || 'Mos'
        };
      }
    }
  },

  getFieldValidationMessage(calc, field, limitType) {
    const calcId = calc ? calc.id : '';
    const fieldId = field ? field.id : '';

    // Specific Overrides for Indian Market Standards
    if (calcId === 'personal-loan-calculator' && fieldId === 'amount') {
      if (limitType === 'min') return 'Minimum allowed loan amount is ₹25,000.';
      if (limitType === 'max') return 'Maximum allowed loan amount is ₹70,00,000.';
    }

    if (calcId === 'personal-loan-calculator' && (fieldId === 'processingFee' || fieldId === 'processingFeePercent')) {
      return 'Processing Fee must be between 0% and 5%.';
    }

    if (calcId === 'car-loan-calculator' && fieldId === 'vehiclePrice') {
      if (limitType === 'min') return 'Minimum allowed vehicle purchase value is ₹1,00,000.';
      if (limitType === 'max') return 'Maximum allowed vehicle purchase value is ₹5,00,00,000 (₹5 crore).';
    }

    if (calcId === 'home-loan-calculator' && (fieldId === 'propertyValue' || fieldId === 'loanAmount')) {
      if (limitType === 'min') return 'Minimum allowed home loan amount is ₹5,00,000.';
      if (limitType === 'max') return 'Maximum allowed home loan amount is ₹10,00,00,000 (₹10 crore).';
    }

    if (calcId === 'home-loan-calculator' && (fieldId === 'loanPercent' || fieldId === 'ltv')) {
      if (limitType === 'min') return 'Financing Percentage (LTV) cannot be less than 50%.';
      if (limitType === 'max') return 'Financing Percentage (LTV) cannot exceed 90%.';
    }

    if (calcId === 'compare-loan-calculator') {
      if (fieldId === 'loanAmountA' || fieldId === 'loanAmountB') {
        const loanLabel = fieldId === 'loanAmountA' ? 'Loan A' : 'Loan B';
        if (limitType === 'min') return `Minimum allowed ${loanLabel} amount is ₹10,000.`;
        if (limitType === 'max') return `Maximum allowed ${loanLabel} amount is ₹5,00,00,000 (₹5 crore).`;
      }
      if (fieldId === 'interestRateA' || fieldId === 'interestRateB') {
        const loanLabel = fieldId === 'interestRateA' ? 'Loan A' : 'Loan B';
        if (limitType === 'min') return `Minimum allowed ${loanLabel} interest rate is 1%.`;
        if (limitType === 'max') return `Maximum allowed ${loanLabel} interest rate is 30%.`;
      }
      if (fieldId === 'tenureYearsA' || fieldId === 'tenureYearsB') {
        const loanLabel = fieldId === 'tenureYearsA' ? 'Loan A' : 'Loan B';
        const activeUnit = (AppState.tenureUnits && AppState.tenureUnits[fieldId]) || 'years';
        if (activeUnit === 'months') {
          if (limitType === 'min') return `Minimum allowed ${loanLabel} tenure is 12 months.`;
          if (limitType === 'max') return `Maximum allowed ${loanLabel} tenure is 360 months.`;
        } else {
          if (limitType === 'min') return `Minimum allowed ${loanLabel} tenure is 1 year.`;
          if (limitType === 'max') return `Maximum allowed ${loanLabel} tenure is 30 years.`;
        }
      }
      if (fieldId === 'feeA' || fieldId === 'feeB') {
        const loanLabel = fieldId === 'feeA' ? 'Loan A' : 'Loan B';
        if (limitType === 'min') return `Minimum allowed ${loanLabel} processing fee is 0%.`;
        if (limitType === 'max') return `Maximum allowed ${loanLabel} processing fee is 5%.`;
      }
    }

    if ((calcId === 'balance-transfer-calculator' && (fieldId === 'preClosureFeePct' || fieldId === 'preClosureCharges' || fieldId === 'preclosure')) || fieldId === 'preClosureFeePct') {
      return 'Pre‑Closure Charges must be between 0% and 5%.';
    }

    if ((calcId === 'loan-affordability-calculator' && (fieldId === 'maxFoirPct' || fieldId === 'foir' || fieldId === 'foirPct')) || fieldId === 'maxFoirPct') {
      if (limitType === 'min') return 'FOIR cannot be less than 30 %.';
      if (limitType === 'max') return 'FOIR cannot exceed 70 % – loan may not be affordable.';
    }

    if (calcId === 'bmi-calculator') {
      if (fieldId === 'heightCm') {
        if (limitType === 'min') return 'Minimum height allowed is 100 cm.';
        if (limitType === 'max') return 'Maximum height allowed is 250 cm.';
      }
      if (fieldId === 'weightKg') {
        if (limitType === 'min') return 'Minimum weight allowed is 30 kg.';
        if (limitType === 'max') return 'Maximum weight allowed is 300 kg.';
      }
    }

    if (fieldId === 'calories' || fieldId === 'dailyCalories' || (field.suffix === 'kcal' && (field.label.toLowerCase().includes('calorie') || field.label.toLowerCase().includes('intake')))) {
      if (limitType === 'min') return 'Minimum daily intake allowed is 800 kcal.';
      if (limitType === 'max') return `Maximum daily intake allowed is ${field.max ? field.max : '8000'} kcal.`;
    }

    // Universal Smart Generator across all calculators
    if (this.isTenureField(field, calc)) {
      const baseUnit = this.getFieldBaseUnit(field);
      const activeUnit = (AppState.tenureUnits && AppState.tenureUnits[fieldId]) || baseUnit;
      const bounds = this.getTenureBounds(field, activeUnit, baseUnit);
      const cleanTLabel = (field.label || 'Tenure').replace(/\s*\(.*?\)/g, '').trim();
      if (limitType === 'min') {
        return `Minimum allowed ${cleanTLabel.toLowerCase()} is ${bounds.min} ${bounds.suffix}.`;
      } else {
        return `Maximum allowed ${cleanTLabel.toLowerCase()} is ${bounds.max} ${bounds.suffix}.`;
      }
    }

    const cleanLabel = (field.label || 'Value')
      .replace(/\s*\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/%+/g, '')
      .trim();

    if (limitType === 'min') {
      if (field.prefix === '₹') {
        const croreText = (field.min >= 10000000 && field.min % 10000000 === 0) ? ` (₹${field.min / 10000000} crore)` : '';
        return `Minimum allowed ${cleanLabel.toLowerCase()} is ₹${Number(field.min).toLocaleString('en-IN')}${croreText}.`;
      } else {
        const unit = field.suffix ? ' ' + field.suffix : '';
        return `Minimum ${cleanLabel.toLowerCase()} allowed is ${field.min}${unit}.`;
      }
    } else {
      if (field.prefix === '₹') {
        const croreText = (field.max >= 10000000 && field.max % 10000000 === 0) ? ` (₹${field.max / 10000000} crore)` : '';
        return `Maximum allowed ${cleanLabel.toLowerCase()} is ₹${Number(field.max).toLocaleString('en-IN')}${croreText}.`;
      } else {
        const unit = field.suffix ? ' ' + field.suffix : '';
        return `Maximum ${cleanLabel.toLowerCase()} allowed is ${field.max}${unit}.`;
      }
    }
  },

  resetCalculator(calc) {
    if (!calc) return;

    if (calc.customUi === 'basic-keypad') {
      if (typeof KeypadController !== 'undefined') {
        const resetState = KeypadController.handleBasic('C');
        const dispEl = document.getElementById('basic-lcd-display');
        const eqEl = document.getElementById('basic-lcd-eq');
        if (dispEl) dispEl.textContent = resetState.display;
        if (eqEl) eqEl.textContent = resetState.equation;
      }
    } else if (calc.customUi === 'scientific-keypad') {
      if (typeof KeypadController !== 'undefined') {
        const resetState = KeypadController.handleScientific('AC');
        const dispEl = document.getElementById('sci-lcd-display');
        const eqEl = document.getElementById('sci-lcd-eq');
        if (dispEl) dispEl.textContent = resetState.display;
        if (eqEl) eqEl.textContent = resetState.equation;
      }
    } else if (calc.customUi === 'jewellery-price-calculator') {
      const p24 = document.getElementById('jewel-p24-input');
      if (p24) p24.value = 7500;
      const weight = document.getElementById('jewel-weight-input');
      if (weight) weight.value = 10;
      const making = document.getElementById('jewel-making-input');
      if (making) making.value = 10;
      const makingSlider = document.getElementById('jewel-making-slider');
      if (makingSlider) makingSlider.value = 10;
      const gst = document.getElementById('jewel-gst-input');
      if (gst) gst.value = 3;
      const budget = document.getElementById('budget-amount-input');
      if (budget) budget.value = 50000;
      this.initJewelleryPriceCalculatorBehavior();
    } else if (calc.customUi === 'matrix-converter') {
      if (calc.fields && calc.fields[0]) {
        const mInput = document.getElementById('matrix-input-val');
        if (mInput) {
          mInput.value = calc.fields[0].default;
          mInput.dispatchEvent(new Event('input'));
        }
      }
    } else if (calc.customUi === 'gpa-builder') {
      this.initGpaBuilderBehavior();
    } else if (calc.customUi === 'compare-loan-calculator' || calc.id === 'compare-loan-calculator') {
      this.resetCompareLoanCalculator(calc);
    } else if (calc.customUi === 'home-purchase-planner' || calc.id === 'home-purchase-planner' || calc.customUi === 'flat-purchase-planner' || calc.id === 'flat-purchase-planner') {
      this.resetHomePurchasePlanner(calc);
    } else if (calc.customUi === 'loan-reverse-calculator' || calc.id === 'loan-reverse-calculator') {
      this.resetReverseLoanCalculator(calc);
    } else {
      // Standard Form Calculator: Reset all inputs and recalculate outputs
      if (calc.fields) {
        // Clear any validation messages and input error highlights
        document.querySelectorAll('.field-validation-msg').forEach(el => {
          el.style.display = 'none';
          el.textContent = '';
        });
        document.querySelectorAll('.form-input').forEach(el => {
          el.classList.remove('has-error');
        });

        calc.fields.forEach(f => {
          AppState.calcInputs[f.id] = f.default;
          if (f.hasCheckbox && f.checkboxId) {
            AppState.calcInputs[f.checkboxId] = false;
            const chk = document.getElementById(`input-${f.checkboxId}`);
            if (chk) chk.checked = false;
            const wrap = document.getElementById(`field-wrap-${f.id}`);
            if (wrap) {
              wrap.style.opacity = '0.45';
              wrap.style.pointerEvents = 'none';
            }
            const inp = document.getElementById(`input-${f.id}`);
            if (inp) inp.disabled = true;
            const rng = document.getElementById(`range-${f.id}`);
            if (rng) rng.disabled = true;
            const badge = document.getElementById(`checkbox-badge-${f.id}`);
            if (badge) {
              badge.textContent = 'Excluded (₹0)';
              badge.style.background = 'rgba(148, 163, 184, 0.15)';
              badge.style.color = '#94a3b8';
            }
          }
          if (this.isTenureField(f, calc)) {
            const baseUnit = this.getFieldBaseUnit(f);
            AppState.tenureUnits = AppState.tenureUnits || {};
            AppState.tenureUnits[f.id] = baseUnit;
            const toggleContainer = document.getElementById(`tenure-toggle-${f.id}`);
            if (toggleContainer) {
              toggleContainer.querySelectorAll('.tenure-unit-btn').forEach(b => {
                const isAct = b.getAttribute('data-unit') === baseUnit;
                b.classList.toggle('active', isAct);
                b.setAttribute('aria-pressed', isAct ? 'true' : 'false');
              });
            }
            const bounds = this.getTenureBounds(f, baseUnit, baseUnit);
            const numEl = document.getElementById(`input-${f.id}`);
            const rngEl = document.getElementById(`range-${f.id}`);
            const suffixEl = numEl?.parentElement?.querySelector('.input-addon-suffix');
            const labelSpan = document.getElementById(`label-text-${f.id}`);
            if (numEl) {
              numEl.min = bounds.min; numEl.max = bounds.max; numEl.step = bounds.step; numEl.value = f.default;
            }
            if (rngEl) {
              rngEl.min = bounds.min; rngEl.max = bounds.max; rngEl.step = bounds.step; rngEl.value = f.default;
            }
            if (suffixEl) suffixEl.textContent = bounds.suffix;
            if (labelSpan) labelSpan.textContent = f.label;
          }

          const inp = document.getElementById(`input-${f.id}`);
          if (inp) {
            inp.value = f.default;
            inp.classList.remove('has-error');
            if (inp.type === 'checkbox') inp.checked = !!f.default;
          }
          const rng = document.getElementById(`range-${f.id}`);
          if (rng) rng.value = f.default;
          const disp = document.getElementById(`val-display-${f.id}`);
          if (disp) {
            const formattedVal = (f.prefix === '₹' && !isNaN(Number(f.default)))
              ? Number(f.default).toLocaleString('en-IN')
              : f.default;
            disp.textContent = `${f.prefix || ''}${formattedVal}${f.suffix ? ' ' + f.suffix : ''}`;
          }
          const valMsg = document.getElementById(`validation-msg-${f.id}`);
          if (valMsg) {
            valMsg.style.display = 'none';
            valMsg.textContent = '';
          }
        });
      }
      const result = CalculatorEngine.compute(calc.id, AppState.calcInputs);
      this.renderResults(result);
    }

    this.showToast('Calculator reset to default values');
  },

  renderCalculatorPage(calcId) {
    const calc = getCalculatorById(calcId);
    if (!calc) {
      window.location.hash = '#/';
      return;
    }

    AppState.currentCalculator = calc;
    const cat = getCategoryById(calc.category);
    this.updateSeoMeta(
      `${calc.title} - Free Online Calculator | letscalculate.in`,
      `${calc.description || calc.summary}. Free online calculator with instant precision results, formulas, and visual breakdowns. 100% free with no signup.`,
      `https://letscalculate.in/#/calculator/${calc.id}`,
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://letscalculate.in/#/' },
              { '@type': 'ListItem', 'position': 2, 'name': cat.name, 'item': `https://letscalculate.in/#/category/${cat.id}` },
              { '@type': 'ListItem', 'position': 3, 'name': calc.title, 'item': `https://letscalculate.in/#/calculator/${calc.id}` }
            ]
          },
          {
            '@type': 'SoftwareApplication',
            'name': calc.title,
            'operatingSystem': 'All',
            'applicationCategory': cat.id === 'financial' ? 'FinanceApplication' : (cat.id === 'health' ? 'HealthApplication' : 'EducationalApplication'),
            'description': calc.description || calc.summary,
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'INR'
            }
          }
        ]
      }
    );

    // Default inputs
    AppState.calcInputs = {};
    if (calc.fields) {
      calc.fields.forEach(f => {
        AppState.calcInputs[f.id] = f.default;
        if (f.hasCheckbox && f.checkboxId) {
          AppState.calcInputs[f.checkboxId] = false;
        }
      });
    }

    const mainEl = document.getElementById('app-main');

    mainEl.innerHTML = `
      <div class="container calc-page-container">
        <!-- Breadcrumbs -->
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <a href="#/category/${cat.id}">${cat.name}</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>${calc.title}</span>
        </div>

        <!-- Page Header -->
        <div class="calc-page-header">
          <div class="calc-header-meta">
            <div class="calc-title-row">
              <span class="badge badge-${cat.color}">${cat.name}</span>
              ${(typeof isNewCalculator === 'function' && isNewCalculator(calc)) ? `<span class="badge badge-gold" style="font-weight: 800; box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);">✨ NEW CALCULATOR</span>` : (calc.badge ? `<span class="badge badge-emerald">${calc.badge}</span>` : '')}
            </div>
            <div class="calc-actions-toolbar">
              <button type="button" class="btn-secondary" id="page-fav-btn" title="Add to Favorites">
                <span id="page-fav-icon">${AppState.isFavorite(calc.id) ? '★ Favorited' : '☆ Favorite'}</span>
              </button>
              <button type="button" class="btn-secondary" id="page-share-btn" title="Share Calculator">
                ${getIconSvg('share-2', 16)} Share
              </button>
              <button type="button" class="btn-secondary" id="page-print-btn" title="Print Calculation">
                ${getIconSvg('printer', 16)} Print
              </button>
            </div>
          </div>
          <h1 class="calc-page-title">${calc.title}</h1>
          <p class="calc-page-desc">${calc.description}</p>
        </div>

        <!-- Disclaimer for Health -->
        ${cat.id === 'health' ? `
          <div class="disclaimer-banner">
            ${getIconSvg('alert-triangle', 20)}
            <div>
              <strong>Medical Disclaimer:</strong> This health calculator is for informational purposes only and does not constitute medical advice or treatment. Always consult a physician or healthcare specialist for personal medical decisions.
            </div>
          </div>
        ` : ''}

        <!-- Two-Way Connection: NPS Calculator -> NPS Educational Blog Callout -->
        ${calc.id === 'nps-calculator' ? `
          <div class="nps-blog-callout glass-panel">
            <div class="nps-blog-callout-content">
              <span class="nps-blog-callout-badge">
                ${getIconSvg('sparkles', 12)} Educational Guide
              </span>
              <h3 class="nps-blog-callout-title">Want to understand NPS before calculating?</h3>
              <p class="nps-blog-callout-desc">
                Learn how Tier 1 vs Tier 2 works, Section 80CCD(1B) extra ₹50,000 tax deduction, 60% tax-free lump sum exit, and annuity pension mechanics in our complete educational guide.
              </p>
            </div>
            <a href="#/blog/nps" class="nps-blog-callout-btn" id="nps-calc-to-blog-btn">
              <span>Read Complete NPS Guide</span>
              ${getIconSvg('arrow-right', 14)}
            </a>
          </div>

          <!-- Mandatory Regulatory Disclaimer on NPS Calculator -->
          <div class="disclaimer-banner nps-disclaimer" id="nps-calculator-mandatory-disclaimer">
            ${getIconSvg('alert-triangle', 22)}
            <div>
              <strong>Mandatory Regulatory Disclaimer:</strong> NPS calculator results are estimates provided strictly for informational and educational purposes only. Actual NPS returns, accumulated retirement corpus, annuity rates, monthly pension payouts, and tax benefits depend on market performance, individual asset allocation (Equity, Corporate Debt, Government Bonds), fund manager performance, prevailing annuity rates at retirement, and future amendments to PFRDA regulations and Income Tax laws. This calculator does not constitute financial, investment, taxation, or legal advice. Users should verify current official rules and consult a qualified SEBI-registered financial advisor or tax consultant before making investment decisions.
            </div>
          </div>
        ` : ''}

        <!-- Two-Way Connection: US Stocks Calculator -> Invest in US Stocks Broker Section -->
        ${calc.id === 'us-stocks-calculator' ? `
          <div class="us-stocks-broker-callout glass-panel">
            <div style="display: flex; align-items: center; gap: 0.9rem;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(37, 99, 235, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0;">
                🇺🇸
              </div>
              <div>
                <div style="font-size: 0.78rem; text-transform: uppercase; font-weight: 700; color: #60a5fa; letter-spacing: 0.04em;">Direct US Investing • Zerodha Account</div>
                <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-top: 0.1rem;">Investing in US Stocks</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.15rem;">Open a Zerodha account to start investing in US companies.</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
              <a href="#/broker-selection" class="btn-secondary" id="back-to-us-broker-btn" style="color: #60a5fa; border-color: rgba(59, 130, 246, 0.4); display: inline-flex; align-items: center; gap: 0.45rem; font-weight: 600; padding: 0.55rem 1rem;">
                ${getIconSvg('arrow-left', 16)}
                <span>Back to Invest in US Stocks</span>
              </a>
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; display: inline-flex; align-items: center; gap: 0.45rem; font-weight: 600; padding: 0.55rem 1rem; border: none; text-decoration: none; border-radius: var(--radius-md, 8px);">
                <span>Open Account</span>
                ${getIconSvg('arrow-right', 15)}
              </a>
            </div>
          </div>
        ` : ''}

        <!-- EMI Suite Category & Calculator Switcher -->
        ${(typeof isEmiSuiteCalculator === 'function' && isEmiSuiteCalculator(calc.id)) ? this.renderEmiSuiteSwitcher(calc.id) : ''}

        <!-- Workspace Container (Custom Keypad, Matrix, or 2-Column Inputs/Results) -->
        <div id="calculator-dynamic-workspace">
          ${this.renderCalculatorWorkspace(calc)}
        </div>

        <!-- Calculator Bottom Action Bar: Back and Reset buttons placed below input/output section -->
        <div class="calc-bottom-actions-bar">
          <button type="button" class="btn-calc-action btn-calc-back" id="calc-page-back-btn" title="Go back to previous page or all calculators">
            ${getIconSvg('arrow-left', 18)}
            <span>Back</span>
          </button>
          ${calc.id === 'us-stocks-calculator' ? `
            <a href="#/broker-selection" class="btn-calc-action btn-calc-broker-back" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.45rem; color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); background: rgba(37, 99, 235, 0.15); padding: 0.65rem 1.15rem; border-radius: var(--radius-md, 8px); font-weight: 600; font-size: 0.88rem;">
              ${getIconSvg('arrow-left', 16)}
              <span>Back to Invest in US Stocks</span>
            </a>
          ` : ''}
          <button type="button" class="btn-calc-action btn-calc-reset" id="calc-page-reset-btn" title="Reset all input fields to defaults">
            ${getIconSvg('refresh-cw', 18)}
            <span>Reset</span>
          </button>
        </div>

        <!-- Educational / Formula & FAQ Section -->
        <div class="educational-section">
          <!-- Formula Box -->
          <div class="formula-card glass-panel">
            <h3 style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              ${getIconSvg('square-root', 20)} How It Works & Mathematical Formula
            </h3>
            <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1rem;">
              ${calc.formulaDesc || 'Precise calculation based on standard mathematical principles.'}
            </p>
            ${calc.formula ? `
              <div class="formula-box">${calc.formula}</div>
            ` : ''}
            <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              <p>Every calculation on letscalculate.in executes with high precision floating-point algorithms, zero external dependencies, and real-time validation.</p>
            </div>
          </div>

          <!-- FAQs Section -->
          <div class="faqs-card glass-panel">
            <h3 style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              ${getIconSvg('calculator', 20)} Frequently Asked Questions
            </h3>
            <div class="faq-list">
              ${(calc.faqs && calc.faqs.length > 0) ? calc.faqs.map(faq => `
                <div class="faq-accordion-item">
                  <div class="faq-question">
                    <span>${faq.q}</span>
                  </div>
                  <div class="faq-answer">${faq.a}</div>
                </div>
              `).join('') : `
                <div class="faq-accordion-item">
                  <div class="faq-question"><span>Is this calculator completely free to use?</span></div>
                  <div class="faq-answer">Yes, all calculators on letscalculate.in are 100% free with unlimited computations and zero registration required.</div>
                </div>
                <div class="faq-accordion-item">
                  <div class="faq-question"><span>How accurate are the results?</span></div>
                  <div class="faq-answer">Calculations follow globally accepted standard mathematical, financial, and scientific formulas validated against official standards.</div>
                </div>
              `}
            </div>
          </div>
        </div>

        ${cat.id === 'financial' ? `
          <!-- Direct Investment Callout for Financial Tools -->
          <div class="glass-panel" style="margin-top: 2.5rem; padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card); background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(15, 23, 42, 0.95) 100%); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
            <div>
              <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--emerald); color: var(--emerald); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">
                ${getIconSvg('sparkles', 12)} Start Your Wealth Journey
              </span>
              <h3 style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); margin: 0.6rem 0 0.3rem;">
                Ready to put this calculation into action?
              </h3>
              <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0; line-height: 1.5;">
                Start direct mutual fund SIPs with zero commission or trade stocks with zero delivery brokerage.
              </p>
            </div>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.92rem; text-decoration: none; box-shadow: 0 4px 14px var(--emerald-glow);">
                <span>Invest in Mutual Funds</span>
                ${getIconSvg('arrow-right', 14)}
              </a>
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.92rem; text-decoration: none; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);">
                <span>Invest in Stocks</span>
                ${getIconSvg('arrow-right', 14)}
              </a>
            </div>
          </div>
        ` : ''}

        <!-- Related Calculators Carousel -->
        <div style="margin-top: 3rem;">
          <h3 style="font-size: 1.5rem; margin-bottom: 1.25rem;">Related ${cat.name}</h3>
          <div class="calculators-grid">
            ${getCalculatorsByCategory(cat.id).filter(c => c.id !== calc.id).slice(0, 3).map(c => this.renderCalcCard(c)).join('')}
          </div>
        </div>
      </div>
    `;

    // Hook up workspace behavior
    this.initCalculatorWorkspaceBehavior(calc);

    // Header actions
    document.getElementById('page-fav-btn')?.addEventListener('click', () => {
      AppState.toggleFavorite(calc.id);
      const icon = document.getElementById('page-fav-icon');
      if (icon) icon.textContent = AppState.isFavorite(calc.id) ? '★ Favorited' : '☆ Favorite';
    });

    document.getElementById('page-share-btn')?.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        this.showToast('Calculator link copied to clipboard!');
      }
    });

    document.getElementById('page-print-btn')?.addEventListener('click', () => {
      window.print();
    });

    // Bottom Action Bar: Back and Reset buttons
    document.getElementById('calc-page-back-btn')?.addEventListener('click', () => {
      this.navigateBack(calc);
    });

    document.getElementById('calc-page-reset-btn')?.addEventListener('click', () => {
      this.resetCalculator(calc);
    });

    this.bindCardEvents();
  },

  // ==========================================
  // RENDER CALCULATOR WORKSPACE
  // ==========================================
  renderCalculatorWorkspace(calc) {
    // Custom UI: Basic Keypad
    if (calc.customUi === 'basic-keypad') {
      return this.renderBasicKeypadUi();
    }
    // Custom UI: Scientific Keypad
    if (calc.customUi === 'scientific-keypad') {
      return this.renderScientificKeypadUi();
    }
    // Custom UI: Matrix Unit Converter
    if (calc.customUi === 'matrix-converter') {
      return this.renderMatrixConverterUi(calc);
    }
    // Custom UI: Live Countdown
    if (calc.customUi === 'countdown-live') {
      return this.renderCountdownLiveUi();
    }
    // Custom UI: GPA Builder
    if (calc.customUi === 'gpa-builder') {
      return this.renderGpaBuilderUi();
    }
    // Custom UI: Time Zone
    if (calc.customUi === 'time-zone') {
      return this.renderTimeZoneUi();
    }
    // Custom UI: Jewellery Price Calculator
    if (calc.customUi === 'jewellery-price-calculator') {
      return this.renderJewelleryPriceCalculatorUi(calc);
    }
    // Custom UI: Compare EMI Loans
    if (calc.customUi === 'compare-loan-calculator' || calc.id === 'compare-loan-calculator') {
      return this.renderCompareLoanUi(calc);
    }
    // Custom UI: Home Purchase Planner
    if (calc.customUi === 'home-purchase-planner' || calc.id === 'home-purchase-planner' || calc.customUi === 'flat-purchase-planner' || calc.id === 'flat-purchase-planner') {
      return this.renderHomePurchasePlannerUi(calc);
    }
    // Custom UI: Reverse EMI Calculators (Calculate Interest & Period)
    if (calc.customUi === 'loan-reverse-calculator' || calc.id === 'loan-reverse-calculator') {
      return this.renderReverseLoanUi(calc);
    }
    // Custom UI: Cross Math Game
    if (calc.customUi === 'cross-math-game' || calc.id === 'cross-math-game') {
      return `<div id="cross-math-workspace-mount" style="padding: 1rem 0;"></div>`;
    }

    // Standard 2-Column Form & Visual Dashboard
    return `
      <div class="calc-workspace-grid calculator-container ${calc.id === 'nps-calculator' ? 'nps-calculator-wrapper' : ''}">
        <!-- Input Form Card -->
        <div class="calc-inputs-card glass-panel">
          <div class="card-title">
            <span>Input Parameters</span>
            <button type="button" class="btn-secondary" id="reset-inputs-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
              Reset Default
            </button>
          </div>

          <form id="calc-parameters-form" onsubmit="event.preventDefault(); return false;">
            ${(calc.fields || []).map(field => {
              const isChecked = !!AppState.calcInputs[field.checkboxId];
              const isCheckboxField = !!field.hasCheckbox;
              const currSym = AppState.getCurrencySymbol();
              const currRegex = /\((AED|CHF|HK\$|NZ\$|A\$|C\$|S\$|R\$|د\.إ|kr|₹|\$|£|€|¥|R|₺|₽|₩)\)/g;
              const cleanLabel = field.fixedLabel ? field.label : (field.label ? field.label.replace(currRegex, `(${currSym})`) : '');
              const allCurrencies = ['AED', 'CHF', 'HK$', 'NZ$', 'A$', 'C$', 'S$', 'R$', 'د.إ', 'kr', '₹', '$', '£', '€', '¥', 'R', '₺', '₽', '₩'];
              const isCurr = !field.fixedPrefix && (field.prefix === '₹' || allCurrencies.includes(field.prefix));
              const fieldPrefix = field.fixedPrefix || (isCurr ? currSym : (field.prefix || ''));

              // Tenure Unit Toggle Support (Years <-> Months)
              const isTenure = this.isTenureField(field, calc);
              const baseUnit = isTenure ? this.getFieldBaseUnit(field) : null;
              const activeUnit = isTenure ? ((AppState.tenureUnits && AppState.tenureUnits[field.id]) || baseUnit) : null;
              const bounds = isTenure ? this.getTenureBounds(field, activeUnit, baseUnit) : null;

              const fieldMin = bounds ? bounds.min : (field.min !== undefined ? field.min : '');
              const fieldMax = bounds ? bounds.max : (field.max !== undefined ? field.max : '');
              const fieldStep = bounds ? bounds.step : (field.step || 1);
              const fieldSuffix = bounds ? bounds.suffix : (field.suffix || '');

              let currentVal = AppState.calcInputs[field.id] !== undefined ? AppState.calcInputs[field.id] : field.default;
              if (isTenure && activeUnit !== baseUnit) {
                if (baseUnit === 'years' && activeUnit === 'months') {
                  currentVal = Math.round(Number(currentVal) * 12);
                } else if (baseUnit === 'months' && activeUnit === 'years') {
                  currentVal = Math.round((Number(currentVal) / 12) * 10) / 10;
                }
              }

              let displayLabel = cleanLabel;
              if (isTenure) {
                if (activeUnit === 'months') {
                  displayLabel = displayLabel.replace(/\(Years\)/gi, '(Months)').replace(/\(Yrs\)/gi, '(Mos)');
                } else {
                  displayLabel = displayLabel.replace(/\(Months\)/gi, '(Years)').replace(/\(Mos\)/gi, '(Yrs)');
                }
              }

              const formattedDefault = isTenure
                ? currentVal
                : (isCurr && !isNaN(Number(field.default)))
                  ? Number(field.default).toLocaleString(AppState.getLocale())
                  : (field.fixedPrefix === '₹' && !isNaN(Number(field.default)))
                    ? Number(field.default).toLocaleString(AppState.getLocale())
                    : (!isNaN(Number(field.default)) && field.type !== 'text')
                      ? Number(field.default).toLocaleString('en-US')
                      : field.default;

              return `
              <div class="form-group" id="form-group-${field.id}">
                ${isCheckboxField ? `
                  <div class="form-checkbox-row">
                    <label class="form-checkbox-label" for="input-${field.checkboxId}">
                      <input 
                        type="checkbox" 
                        class="form-checkbox-input" 
                        id="input-${field.checkboxId}" 
                        data-checkbox-for="${field.id}" 
                        ${isChecked ? 'checked' : ''}
                      >
                      <span>${field.checkboxLabel || 'Apply ' + cleanLabel}</span>
                    </label>
                    <span id="checkbox-badge-${field.id}" class="badge" style="font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: ${isChecked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.15)'}; color: ${isChecked ? '#10b981' : '#94a3b8'}; font-weight: 600;">
                      ${isChecked ? 'Applied' : `Excluded (${currSym}0)`}
                    </span>
                  </div>
                ` : ''}

                <div class="form-label-row">
                  <label class="form-label" for="input-${field.id}">
                    <span id="label-text-${field.id}">${displayLabel}</span>
                    ${field.tooltip ? `
                      <span class="field-tooltip-wrapper" tabindex="0" role="tooltip" aria-label="Information">
                        <span class="field-tooltip-icon" title="View details" aria-label="Information">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00bfff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; display: inline-block;">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                        </span>
                        <span class="field-tooltip-content">${field.tooltip}</span>
                      </span>
                    ` : ''}
                  </label>
                  <div class="form-label-controls">
                    ${isTenure ? `
                      <div class="tenure-toggle-container" id="tenure-toggle-${field.id}" role="group" aria-label="Tenure unit toggle">
                        <button type="button" class="tenure-unit-btn ${activeUnit === 'years' ? 'active' : ''}" data-field-id="${field.id}" data-unit="years" aria-pressed="${activeUnit === 'years'}">Yr</button>
                        <button type="button" class="tenure-unit-btn ${activeUnit === 'months' ? 'active' : ''}" data-field-id="${field.id}" data-unit="months" aria-pressed="${activeUnit === 'months'}">Mo</button>
                      </div>
                    ` : ''}
                    <span class="form-value-display" id="val-display-${field.id}">
                      ${fieldPrefix}${formattedDefault}${fieldSuffix ? ' ' + fieldSuffix : ''}
                    </span>
                  </div>
                </div>

                <div id="field-wrap-${field.id}" class="field-wrap" style="${isCheckboxField && !isChecked ? 'opacity: 0.45; pointer-events: none;' : ''}">
                  ${field.type === 'select' ? `
                    <select class="form-input" id="input-${field.id}" data-id="${field.id}" ${isCheckboxField && !isChecked ? 'disabled' : ''}>
                      ${field.options.map(opt => `
                        <option value="${opt.value}" ${opt.value === field.default ? 'selected' : ''}>${opt.label}</option>
                      `).join('')}
                    </select>
                  ` : field.type === 'date' ? `
                    <input type="date" class="form-input" id="input-${field.id}" data-id="${field.id}" value="${field.default}" ${isCheckboxField && !isChecked ? 'disabled' : ''}>
                  ` : field.type === 'time' ? `
                    <input type="time" class="form-input" id="input-${field.id}" data-id="${field.id}" value="${field.default}" ${isCheckboxField && !isChecked ? 'disabled' : ''}>
                  ` : field.type === 'text' ? `
                    <input type="text" class="form-input" id="input-${field.id}" data-id="${field.id}" value="${field.default || ''}" placeholder="${field.placeholder || ''}" ${isCheckboxField && !isChecked ? 'disabled' : ''}>
                  ` : `
                    <div class="input-with-addons">
                      ${fieldPrefix ? `<span class="input-addon-prefix">${fieldPrefix}</span>` : ''}
                      <input 
                        type="number" 
                        class="form-input ${field.prefix ? 'has-prefix' : ''} ${fieldSuffix ? 'has-suffix' : ''}" 
                        id="input-${field.id}" 
                        data-id="${field.id}" 
                        value="${currentVal}"
                        min="${fieldMin}" 
                        max="${fieldMax}" 
                        step="${fieldStep}"
                        ${isCheckboxField && !isChecked ? 'disabled' : ''}
                      >
                      ${fieldSuffix ? `<span class="input-addon-suffix">${fieldSuffix}</span>` : ''}
                    </div>
                    ${fieldMin !== '' && fieldMax !== '' ? `
                      <input 
                        type="range" 
                        class="form-range-slider" 
                        id="range-${field.id}" 
                        data-id="${field.id}" 
                        value="${currentVal}" 
                        min="${fieldMin}" 
                        max="${fieldMax}" 
                        step="${fieldStep}"
                        ${isCheckboxField && !isChecked ? 'disabled' : ''}
                      >
                    ` : ''}
                  `}
                </div>
                ${(calc.id === 'personal-loan-calculator' && field.id === 'processingFee') ? `
                  <div class="processing-fee-summary-row" id="processing-fee-live-summary">
                    <div>
                      <span style="color: var(--text-muted); display: block; font-size: 0.72rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Processing Fee Amount</span>
                      <span id="live-processing-fee-amt" style="font-weight: 700; color: #f59e0b; font-family: monospace; font-size: 0.95rem;">₹5,000.00</span>
                    </div>
                    <div style="text-align: right;">
                      <span style="color: var(--text-muted); display: block; font-size: 0.72rem; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Disbursed Amount</span>
                      <span id="live-disbursed-amt" style="font-weight: 700; color: #10b981; font-family: monospace; font-size: 0.95rem;">₹4,95,000.00</span>
                    </div>
                  </div>
                ` : ''}
                <div class="field-validation-msg" id="validation-msg-${field.id}"></div>
              </div>
            `;
            }).join('')}
          </form>
          ${calc.id === 'loan-affordability-calculator' ? `
            <div class="foir-sample-test-case" id="foir-sample-test-card">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.6rem; flex-wrap: wrap;">
                <span style="font-weight: 700; color: #00bfff; font-size: 0.88rem; display: flex; align-items: center; gap: 0.4rem;">
                  ${getIconSvg('sparkles', 16)} Sample Test Case (FOIR Verification)
                </span>
                <div style="display: flex; gap: 0.4rem;">
                  <button type="button" id="load-foir-test-pass-btn" class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.65rem; border-color: rgba(16, 185, 129, 0.4); color: #10b981;">
                    Apply 60% Test
                  </button>
                  <button type="button" id="load-foir-test-fail-btn" class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.65rem; border-color: rgba(239, 68, 68, 0.4); color: #ef4444;">
                    Test 80% (Over Limit)
                  </button>
                </div>
              </div>
              <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.55;">
                <div>• <strong>Net Monthly Income:</strong> ₹1,00,000</div>
                <div>• <strong>Fixed Obligations (Existing EMIs):</strong> ₹60,000</div>
                <div>• <strong>FOIR Formula:</strong> (₹60,000 ÷ ₹1,00,000) × 100 = <strong style="color: #10b981;">60 %</strong> (Within allowed 30%–70%)</div>
                <div style="margin-top: 0.35rem; color: #94a3b8; font-size: 0.76rem;">
                  ⚠️ <em>If obligations reach ₹80,000 (80%), triggers: <span style="color: #ff4d4d; font-weight: 600;">“FOIR cannot exceed 70 % – loan may not be affordable.”</span></em>
                </div>
              </div>
            </div>
          ` : ''}
          ${calc.id === 'balance-transfer-calculator' ? `
            <div class="bt-scenarios-card glass-panel" id="bt-test-scenarios-card" style="margin-top: 1.25rem; padding: 1rem; border: 1px solid rgba(0, 191, 255, 0.25); border-radius: 10px; background: rgba(15, 23, 42, 0.6);">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.6rem; flex-wrap: wrap;">
                <span style="font-weight: 700; color: #00bfff; font-size: 0.88rem; display: flex; align-items: center; gap: 0.4rem;">
                  ${getIconSvg('sparkles', 16)} Pre‑Closure Quick Scenarios
                </span>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                  <button type="button" id="bt-set-0pct-btn" class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.55rem; border-color: rgba(16, 185, 129, 0.4); color: #10b981;">
                    0% (Floating Waiver)
                  </button>
                  <button type="button" id="bt-set-2pct-btn" class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.55rem; border-color: rgba(0, 191, 255, 0.4); color: #00bfff;">
                    2% (Default)
                  </button>
                  <button type="button" id="bt-set-5pct-btn" class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.55rem; border-color: rgba(245, 158, 11, 0.4); color: #f59e0b;">
                    5% (Max Allowed)
                  </button>
                  <button type="button" id="bt-set-invalid-btn" class="btn-secondary" style="font-size: 0.75rem; padding: 0.25rem 0.55rem; border-color: rgba(239, 68, 68, 0.4); color: #ef4444;">
                    6% (Test Error)
                  </button>
                </div>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.55;">
                <div>• <strong>0% Floating Loan:</strong> Pre‑Closure Charges = ₹0 | Total Transfer Cost = Processing Fee only</div>
                <div>• <strong>2% Default:</strong> Charges = ₹70,000 on ₹35L balance | Net Savings dynamically computed</div>
                <div>• <strong>Validation Range:</strong> 0% – 5%. Values &lt; 0% or &gt; 5% show: <span style="color: #ff4d4d; font-weight: 600;">“Pre‑Closure Charges must be between 0% and 5%.”</span></div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Real-Time Results Card -->
        <div class="calc-results-card glass-panel">
          <div class="card-title">
            <span>Live Calculation Summary</span>
            <button type="button" class="btn-secondary" id="copy-result-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
              ${getIconSvg('copy', 14)} Copy Result
            </button>
          </div>

          <div id="results-display-area">
            <!-- Populated via CalculatorEngine.compute() -->
          </div>
        </div>
      </div>

      <!-- Breakdown Table Container (if exists) -->
      <div id="calc-table-area"></div>
    `;
  },

  // ==========================================
  // INITIALIZE WORKSPACE BEHAVIOR & REAL-TIME COMPUTE
  // ==========================================
  initCalculatorWorkspaceBehavior(calc) {
    // EMI Suite Category Switcher Event Delegation
    if (typeof isEmiSuiteCalculator === 'function' && isEmiSuiteCalculator(calc.id)) {
      const navEl = document.getElementById('emi-suite-nav');
      if (navEl) {
        navEl.querySelectorAll('.emi-suite-cat-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const catKey = btn.getAttribute('data-cat');
            navEl.querySelectorAll('.emi-suite-cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const pillsRow = document.getElementById('emi-suite-pills-row');
            if (pillsRow) {
              pillsRow.innerHTML = this.renderEmiSuitePills(catKey, calc.id);
            }
          });
        });
      }
    }

    // If standard calculator, bind inputs to compute
    if (!calc.customUi) {
      const updateOutputs = () => {
        // Prepare safe bounded inputs for CalculatorEngine computation
        const safeInputs = { ...AppState.calcInputs };
        if (calc.fields) {
          calc.fields.forEach(f => {
            if (f.type !== 'select' && safeInputs[f.id] !== undefined && safeInputs[f.id] !== '') {
              let n = Number(safeInputs[f.id]);
              if (!isNaN(n)) {
                if (this.isTenureField(f, calc)) {
                  const baseUnit = this.getFieldBaseUnit(f);
                  const activeUnit = (AppState.tenureUnits && AppState.tenureUnits[f.id]) || baseUnit;
                  if (baseUnit === 'years' && activeUnit === 'months') {
                    n = n / 12;
                  } else if (baseUnit === 'months' && activeUnit === 'years') {
                    n = n * 12;
                  }
                  if (f.min !== undefined && n < f.min) n = f.min;
                  if (f.max !== undefined && n > f.max) n = f.max;
                  safeInputs[f.id] = n;
                } else {
                  if (f.min !== undefined && n < f.min) safeInputs[f.id] = f.min;
                  if (f.max !== undefined && n > f.max) safeInputs[f.id] = f.max;
                }
              }
            }
          });
        }
        const result = CalculatorEngine.compute(calc.id, safeInputs);
        this.renderResults(result);

        // Update Personal Loan live fee & disbursed summary if present
        if (calc.id === 'personal-loan-calculator') {
          const loanAmt = (parseFloat(AppState.calcInputs.amount) !== undefined && !isNaN(parseFloat(AppState.calcInputs.amount)))
            ? parseFloat(AppState.calcInputs.amount)
            : 500000;
          const feePct = (parseFloat(AppState.calcInputs.processingFee) !== undefined && !isNaN(parseFloat(AppState.calcInputs.processingFee)))
            ? parseFloat(AppState.calcInputs.processingFee) / 100
            : 0.01;
          const feeAmt = loanAmt * feePct;
          const disbAmt = Math.max(0, loanAmt - feeAmt);
          const feeEl = document.getElementById('live-processing-fee-amt');
          const disbEl = document.getElementById('live-disbursed-amt');
          if (feeEl) feeEl.textContent = CalculatorEngine.formatCurrency(feeAmt);
          if (disbEl) disbEl.textContent = CalculatorEngine.formatCurrency(disbAmt);
        }

        // Record to history automatically on significant changes
        if (result.primaryResult) {
          AppState.addHistory(calc.id, calc.title, result.primaryResult.value);
        }
      };

      // Checkbox toggles for fields with hasCheckbox
      if (calc.fields) {
        calc.fields.forEach(f => {
          if (f.hasCheckbox && f.checkboxId) {
            const chk = document.getElementById(`input-${f.checkboxId}`);
            if (chk) {
              chk.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                AppState.calcInputs[f.checkboxId] = isChecked;

                const wrap = document.getElementById(`field-wrap-${f.id}`);
                const inp = document.getElementById(`input-${f.id}`);
                const rng = document.getElementById(`range-${f.id}`);
                const badge = document.getElementById(`checkbox-badge-${f.id}`);

                if (wrap) {
                  wrap.style.opacity = isChecked ? '1' : '0.45';
                  wrap.style.pointerEvents = isChecked ? 'auto' : 'none';
                }
                if (inp) inp.disabled = !isChecked;
                if (rng) rng.disabled = !isChecked;
                if (badge) {
                  const currSym = (typeof AppState !== 'undefined' && AppState.getCurrencySymbol) ? AppState.getCurrencySymbol() : '₹';
                  badge.textContent = isChecked ? 'Applied' : `Excluded (${currSym}0)`;
                  badge.style.background = isChecked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.15)';
                  badge.style.color = isChecked ? '#10b981' : '#94a3b8';
                }

                updateOutputs();
              });
            }
          }
        });
      }

      // Tenure Unit Toggle Event Handlers (Years <-> Months)
      const formCard = document.querySelector('.calc-inputs-card');
      if (formCard) {
        formCard.querySelectorAll('.tenure-unit-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const fieldId = btn.getAttribute('data-field-id');
            const targetUnit = btn.getAttribute('data-unit');
            const fieldDef = (calc.fields || []).find(f => f.id === fieldId);
            if (!fieldDef) return;

            const baseUnit = this.getFieldBaseUnit(fieldDef);
            AppState.tenureUnits = AppState.tenureUnits || {};
            const currentUnit = AppState.tenureUnits[fieldId] || baseUnit;
            if (currentUnit === targetUnit) return;

            AppState.tenureUnits[fieldId] = targetUnit;

            const numEl = document.getElementById(`input-${fieldId}`);
            const rangeEl = document.getElementById(`range-${fieldId}`);
            const valDispEl = document.getElementById(`val-display-${fieldId}`);
            const valMsgEl = document.getElementById(`validation-msg-${fieldId}`);
            const toggleContainer = document.getElementById(`tenure-toggle-${fieldId}`);
            const suffixEl = numEl?.parentElement?.querySelector('.input-addon-suffix');
            const labelSpan = document.getElementById(`label-text-${fieldId}`);

            let currentVal = parseFloat(AppState.calcInputs[fieldId]);
            if (isNaN(currentVal)) currentVal = Number(fieldDef.default) || 0;

            let newVal = currentVal;
            if (targetUnit === 'months' && currentUnit === 'years') {
              newVal = Math.round(currentVal * 12);
            } else if (targetUnit === 'years' && currentUnit === 'months') {
              newVal = Math.round((currentVal / 12) * 10) / 10;
            }

            const bounds = this.getTenureBounds(fieldDef, targetUnit, baseUnit);

            if (numEl) {
              numEl.min = bounds.min;
              numEl.max = bounds.max;
              numEl.step = bounds.step;
              numEl.value = newVal;
              numEl.classList.remove('has-error');
            }
            if (rangeEl) {
              rangeEl.min = bounds.min;
              rangeEl.max = bounds.max;
              rangeEl.step = bounds.step;
              rangeEl.value = newVal;
            }
            if (suffixEl) {
              suffixEl.textContent = bounds.suffix;
            }
            if (valMsgEl) {
              valMsgEl.style.display = 'none';
              valMsgEl.textContent = '';
            }
            if (toggleContainer) {
              toggleContainer.querySelectorAll('.tenure-unit-btn').forEach(b => {
                const isAct = b.getAttribute('data-unit') === targetUnit;
                b.classList.toggle('active', isAct);
                b.setAttribute('aria-pressed', isAct ? 'true' : 'false');
              });
            }

            if (labelSpan) {
              let lbl = labelSpan.textContent;
              if (targetUnit === 'months') {
                lbl = lbl.replace(/\(Years\)/gi, '(Months)').replace(/\(Yrs\)/gi, '(Mos)');
              } else {
                lbl = lbl.replace(/\(Months\)/gi, '(Years)').replace(/\(Mos\)/gi, '(Yrs)');
              }
              labelSpan.textContent = lbl;
            }

            AppState.calcInputs[fieldId] = newVal;

            if (valDispEl) {
              valDispEl.textContent = `${newVal} ${bounds.suffix}`;
            }

            updateOutputs();
          });
        });
      }

      // Form input listeners & prevent default submit on Enter
      const formEl = document.getElementById('calc-parameters-form');
      if (formEl) {
        formEl.addEventListener('submit', (e) => {
          e.preventDefault();
          return false;
        });
        formEl.querySelectorAll('input, select').forEach(input => {
          input.addEventListener('input', (e) => {
            const fieldId = e.target.getAttribute('data-id');
            const val = e.target.value;
            AppState.calcInputs[fieldId] = val;

            const fieldDef = (calc.fields || []).find(f => f.id === fieldId);
            const numEl = document.getElementById(`input-${fieldId}`);
            const rangeEl = document.getElementById(`range-${fieldId}`);
            const valMsgEl = document.getElementById(`validation-msg-${fieldId}`);

            const isTenure = this.isTenureField(fieldDef, calc);
            let effMin = fieldDef ? fieldDef.min : undefined;
            let effMax = fieldDef ? fieldDef.max : undefined;
            let effSuffix = fieldDef ? (fieldDef.suffix || '') : '';
            if (isTenure && fieldDef) {
              const baseUnit = this.getFieldBaseUnit(fieldDef);
              const activeUnit = (AppState.tenureUnits && AppState.tenureUnits[fieldId]) || baseUnit;
              const bounds = this.getTenureBounds(fieldDef, activeUnit, baseUnit);
              effMin = bounds.min;
              effMax = bounds.max;
              effSuffix = bounds.suffix;
            }

            // Validation check against defined min / max ranges
            let isFieldValid = true;
            if (fieldDef && fieldDef.type !== 'select' && val !== '' && !isNaN(Number(val))) {
              const numVal = Number(val);
              if (effMin !== undefined && numVal < effMin) {
                isFieldValid = false;
                if (valMsgEl) {
                  valMsgEl.textContent = this.getFieldValidationMessage(calc, fieldDef, 'min');
                  valMsgEl.style.display = 'block';
                }
                if (numEl) numEl.classList.add('has-error');
              } else if (effMax !== undefined && numVal > effMax) {
                isFieldValid = false;
                if (valMsgEl) {
                  valMsgEl.textContent = this.getFieldValidationMessage(calc, fieldDef, 'max');
                  valMsgEl.style.display = 'block';
                }
                if (numEl) numEl.classList.add('has-error');
              }
            }

            if (isFieldValid) {
              if (valMsgEl) {
                valMsgEl.style.display = 'none';
                valMsgEl.textContent = '';
              }
              if (numEl) numEl.classList.remove('has-error');
            }

            // Sync range slider if exists (clamp within active min/max)
            if (rangeEl && e.target !== rangeEl) {
              if (effMin !== undefined && effMax !== undefined) {
                const numVal = Number(val);
                if (!isNaN(numVal)) {
                  rangeEl.value = Math.min(Math.max(numVal, effMin), effMax);
                }
              } else {
                rangeEl.value = val;
              }
            }

            // Sync number input if range was changed
            if (numEl && e.target === rangeEl) {
              numEl.value = val;
            }

            // Update value display tag with dynamic currency or tenure formatting
            const disp = document.getElementById(`val-display-${fieldId}`);
            if (disp && fieldDef) {
              if (isTenure) {
                disp.textContent = `${val}${effSuffix ? ' ' + effSuffix : ''}`;
              } else {
                const currSym = AppState.getCurrencySymbol();
                const allCurrencies = ['AED', 'CHF', 'HK$', 'NZ$', 'A$', 'C$', 'S$', 'R$', 'د.إ', 'kr', '₹', '$', '£', '€', '¥', 'R', '₺', '₽', '₩'];
                const isCurr = !fieldDef.fixedPrefix && (fieldDef.prefix === '₹' || allCurrencies.includes(fieldDef.prefix));
                const fieldPrefix = fieldDef.fixedPrefix || (isCurr ? currSym : (fieldDef.prefix || ''));
                const formattedVal = (isCurr && !isNaN(Number(val)) && val !== '')
                  ? Number(val).toLocaleString(AppState.getLocale())
                  : (fieldDef.fixedPrefix === '₹' && !isNaN(Number(val)) && val !== '')
                    ? Number(val).toLocaleString(AppState.getLocale())
                    : (!isNaN(Number(val)) && val !== '' && fieldDef.type !== 'text')
                      ? Number(val).toLocaleString('en-US')
                      : val;
                disp.textContent = `${fieldPrefix}${formattedVal}${fieldDef.suffix ? ' ' + fieldDef.suffix : ''}`;
              }
            }

            // Loan Affordability Calculator: dynamic FOIR sync when income or obligations change
            if (calc.id === 'loan-affordability-calculator' && (fieldId === 'existingEmis' || fieldId === 'monthlyIncome')) {
              const currentIncome = parseFloat(AppState.calcInputs.monthlyIncome);
              const currentObligations = parseFloat(AppState.calcInputs.existingEmis);

              if (!isNaN(currentIncome) && currentIncome > 0 && !isNaN(currentObligations) && currentObligations >= 0) {
                const computedFoir = Math.round((currentObligations / currentIncome) * 100);
                AppState.calcInputs.maxFoirPct = computedFoir;

                const foirNumEl = document.getElementById('input-maxFoirPct');
                const foirRngEl = document.getElementById('range-maxFoirPct');
                const foirDispEl = document.getElementById('val-display-maxFoirPct');
                const foirValMsgEl = document.getElementById('validation-msg-maxFoirPct');

                if (foirNumEl) {
                  foirNumEl.value = computedFoir;
                }
                if (foirRngEl) {
                  foirRngEl.value = Math.min(Math.max(computedFoir, 30), 70);
                }
                if (foirDispEl) {
                  foirDispEl.textContent = `${computedFoir} %`;
                }

                if (computedFoir < 30) {
                  if (foirValMsgEl) {
                    foirValMsgEl.textContent = 'FOIR cannot be less than 30 %.';
                    foirValMsgEl.style.display = 'block';
                  }
                  if (foirNumEl) foirNumEl.classList.add('has-error');
                } else if (computedFoir > 70) {
                  if (foirValMsgEl) {
                    foirValMsgEl.textContent = 'FOIR cannot exceed 70 % – loan may not be affordable.';
                    foirValMsgEl.style.display = 'block';
                  }
                  if (foirNumEl) foirNumEl.classList.add('has-error');
                } else {
                  if (foirValMsgEl) {
                    foirValMsgEl.style.display = 'none';
                    foirValMsgEl.textContent = '';
                  }
                  if (foirNumEl) foirNumEl.classList.remove('has-error');
                }
              }
            }

            updateOutputs();
          });
        });
      }

      // Sample Test Case buttons for Loan Affordability Calculator
      if (calc.id === 'loan-affordability-calculator') {
        document.getElementById('load-foir-test-pass-btn')?.addEventListener('click', () => {
          const incInput = document.getElementById('input-monthlyIncome');
          const incRange = document.getElementById('range-monthlyIncome');
          const incDisp = document.getElementById('val-display-monthlyIncome');
          if (incInput) incInput.value = 100000;
          if (incRange) incRange.value = 100000;
          if (incDisp) incDisp.textContent = '₹1,00,000';
          AppState.calcInputs.monthlyIncome = 100000;

          const obligInput = document.getElementById('input-existingEmis');
          const obligRange = document.getElementById('range-existingEmis');
          const obligDisp = document.getElementById('val-display-existingEmis');
          if (obligInput) obligInput.value = 60000;
          if (obligRange) obligRange.value = 60000;
          if (obligDisp) obligDisp.textContent = '₹60,000';
          AppState.calcInputs.existingEmis = 60000;

          const foirInput = document.getElementById('input-maxFoirPct');
          const foirRange = document.getElementById('range-maxFoirPct');
          const foirDisp = document.getElementById('val-display-maxFoirPct');
          const foirMsg = document.getElementById('validation-msg-maxFoirPct');
          if (foirInput) {
            foirInput.value = 60;
            foirInput.classList.remove('has-error');
          }
          if (foirRange) foirRange.value = 60;
          if (foirDisp) foirDisp.textContent = '60 %';
          if (foirMsg) {
            foirMsg.style.display = 'none';
            foirMsg.textContent = '';
          }
          AppState.calcInputs.maxFoirPct = 60;

          updateOutputs();
          this.showToast('Applied test case: Income ₹1,00,000, Obligations ₹60,000 (FOIR 60% - Valid)');
        });

        document.getElementById('load-foir-test-fail-btn')?.addEventListener('click', () => {
          const incInput = document.getElementById('input-monthlyIncome');
          const incRange = document.getElementById('range-monthlyIncome');
          const incDisp = document.getElementById('val-display-monthlyIncome');
          if (incInput) incInput.value = 100000;
          if (incRange) incRange.value = 100000;
          if (incDisp) incDisp.textContent = '₹1,00,000';
          AppState.calcInputs.monthlyIncome = 100000;

          const obligInput = document.getElementById('input-existingEmis');
          const obligRange = document.getElementById('range-existingEmis');
          const obligDisp = document.getElementById('val-display-existingEmis');
          if (obligInput) obligInput.value = 80000;
          if (obligRange) obligRange.value = 80000;
          if (obligDisp) obligDisp.textContent = '₹80,000';
          AppState.calcInputs.existingEmis = 80000;

          const foirInput = document.getElementById('input-maxFoirPct');
          const foirRange = document.getElementById('range-maxFoirPct');
          const foirDisp = document.getElementById('val-display-maxFoirPct');
          const foirMsg = document.getElementById('validation-msg-maxFoirPct');
          if (foirInput) {
            foirInput.value = 80;
            foirInput.classList.add('has-error');
          }
          if (foirRange) foirRange.value = 70;
          if (foirDisp) foirDisp.textContent = '80 %';
          if (foirMsg) {
            foirMsg.textContent = 'FOIR cannot exceed 70 % – loan may not be affordable.';
            foirMsg.style.display = 'block';
          }
          AppState.calcInputs.maxFoirPct = 80;

          updateOutputs();
          this.showToast('Applied test case: Obligations ₹80,000 (FOIR 80% - Exceeds 70% Limit)');
        });
      }

      // Sample Test Case buttons for Balance Transfer Calculator
      if (calc.id === 'balance-transfer-calculator') {
        const updateBtPreClosureField = (pctValue, isInvalid = false) => {
          const inp = document.getElementById('input-preClosureFeePct');
          const rng = document.getElementById('range-preClosureFeePct');
          const disp = document.getElementById('val-display-preClosureFeePct');
          const msg = document.getElementById('validation-msg-preClosureFeePct');

          if (inp) {
            inp.value = pctValue;
            if (isInvalid) {
              inp.classList.add('has-error');
            } else {
              inp.classList.remove('has-error');
            }
          }
          if (rng) {
            rng.value = Math.min(Math.max(Number(pctValue) || 0, 0), 5);
          }
          if (disp) {
            disp.textContent = `${pctValue} %`;
          }
          if (msg) {
            if (isInvalid) {
              msg.textContent = 'Pre‑Closure Charges must be between 0% and 5%.';
              msg.style.display = 'block';
            } else {
              msg.textContent = '';
              msg.style.display = 'none';
            }
          }
          AppState.calcInputs.preClosureFeePct = pctValue;
          updateOutputs();
        };

        document.getElementById('bt-set-0pct-btn')?.addEventListener('click', () => {
          updateBtPreClosureField(0, false);
          this.showToast('Applied 0% Pre‑Closure Charges (₹0 Charges Waiver)');
        });

        document.getElementById('bt-set-2pct-btn')?.addEventListener('click', () => {
          updateBtPreClosureField(2, false);
          this.showToast('Applied 2% Default Pre‑Closure Charges');
        });

        document.getElementById('bt-set-5pct-btn')?.addEventListener('click', () => {
          updateBtPreClosureField(5, false);
          this.showToast('Applied 5% Maximum Pre‑Closure Charges');
        });

        document.getElementById('bt-set-invalid-btn')?.addEventListener('click', () => {
          updateBtPreClosureField(6, true);
          this.showToast('Triggered validation: 6% exceeds 5% limit');
        });
      }

      // Stock Preset chips for US Stocks Calculator
      if (calc.id === 'us-stocks-calculator') {
        const workspaceEl = document.getElementById('calculator-view') || document;
        workspaceEl.addEventListener('click', (e) => {
          const chip = e.target.closest('.us-stock-chip');
          if (!chip) return;
          const sName = chip.getAttribute('data-name');
          const sPrice = chip.getAttribute('data-price');

          if (sName) {
            const nameInput = document.getElementById('input-stockName');
            const nameDisp = document.getElementById('val-display-stockName');
            if (nameInput) nameInput.value = sName;
            if (nameDisp) nameDisp.textContent = sName;
            AppState.calcInputs.stockName = sName;
          }
          if (sPrice) {
            const priceInput = document.getElementById('input-stockPriceUsd');
            const priceRange = document.getElementById('range-stockPriceUsd');
            const priceDisp = document.getElementById('val-display-stockPriceUsd');
            if (priceInput) priceInput.value = sPrice;
            if (priceRange) priceRange.value = Math.min(Math.max(Number(sPrice) || 0, 1), 2000);
            if (priceDisp) priceDisp.textContent = `$${Number(sPrice).toLocaleString('en-US')}`;
            AppState.calcInputs.stockPriceUsd = sPrice;
          }
          updateOutputs();
          this.showToast(`Selected ${sName} ($${sPrice})`);
        });
      }

      // Reset button
      document.getElementById('reset-inputs-btn')?.addEventListener('click', () => {
        this.resetCalculator(calc);
      });

      // Copy result button
      document.getElementById('copy-result-btn')?.addEventListener('click', () => {
        const result = CalculatorEngine.compute(calc.id, AppState.calcInputs);
        const text = `${calc.title}\n${result.primaryResult.label}: ${result.primaryResult.value}\nComputed on letscalculate.in`;
        navigator.clipboard.writeText(text);
        this.showToast('Calculation copied to clipboard!');
      });

      // Initial compute
      updateOutputs();
    } else if (calc.customUi === 'basic-keypad') {
      this.initBasicKeypadBehavior();
    } else if (calc.customUi === 'scientific-keypad') {
      this.initScientificKeypadBehavior();
    } else if (calc.customUi === 'matrix-converter') {
      this.initMatrixConverterBehavior(calc);
    } else if (calc.customUi === 'countdown-live') {
      this.initCountdownBehavior();
    } else if (calc.customUi === 'gpa-builder') {
      this.initGpaBuilderBehavior();
    } else if (calc.customUi === 'time-zone') {
      this.initTimeZoneBehavior();
    } else if (calc.customUi === 'jewellery-price-calculator') {
      this.initJewelleryPriceCalculatorBehavior();
    } else if (calc.customUi === 'compare-loan-calculator' || calc.id === 'compare-loan-calculator') {
      this.initCompareLoanBehavior(calc);
    } else if (calc.customUi === 'home-purchase-planner' || calc.id === 'home-purchase-planner' || calc.customUi === 'flat-purchase-planner' || calc.id === 'flat-purchase-planner') {
      this.initHomePurchasePlannerBehavior(calc);
    } else if (calc.customUi === 'loan-reverse-calculator' || calc.id === 'loan-reverse-calculator') {
      this.initReverseLoanBehavior(calc);
    } else if (calc.customUi === 'cross-math-game' || calc.id === 'cross-math-game') {
      const mount = document.getElementById('cross-math-workspace-mount');
      if (mount) this.initCrossMathGame(mount);
    }
  },

  // Render computed outputs & visual charts
  renderResults(result) {
    const area = document.getElementById('results-display-area');
    if (!area) return;

    let chartHtml = '';
    if (result.chartData) {
      if (result.chartData.type === 'donut') {
        const total = result.chartData.values.reduce((a, b) => a + b, 0);
        let accumulatedPercent = 0;
        const slices = result.chartData.values.map((v, i) => {
          const pct = total > 0 ? (v / total) * 100 : 0;
          const strokeDash = `${pct} ${100 - pct}`;
          const strokeOffset = -accumulatedPercent;
          accumulatedPercent += pct;
          return `
            <circle class="donut-slice" cx="21" cy="21" r="15.91549430918954" 
              stroke="${result.chartData.colors[i % result.chartData.colors.length]}"
              stroke-dasharray="${strokeDash}"
              stroke-dashoffset="${strokeOffset}">
            </circle>
          `;
        }).join('');

        chartHtml = `
          <div class="chart-container">
            <svg class="donut-chart-svg" viewBox="0 0 42 42">
              ${slices}
            </svg>
            <div class="chart-legend">
              ${result.chartData.labels.map((lbl, idx) => `
                <div class="legend-item">
                  <div class="legend-color-dot" style="background: ${result.chartData.colors[idx % result.chartData.colors.length]}"></div>
                  <span>${lbl}: <strong>${total > 0 ? ((result.chartData.values[idx] / total) * 100).toFixed(1) : 0}%</strong></span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (result.chartData.type === 'gauge') {
        const { current, min, max, zones } = result.chartData;
        const normalized = Math.min(1, Math.max(0, (current - min) / (max - min)));
        const strokeDasharray = `${normalized * 157} 157`;

        chartHtml = `
          <div class="gauge-chart-container">
            <svg class="gauge-svg" viewBox="0 0 120 70">
              <path class="gauge-meter-path" d="M 15 60 A 45 45 0 0 1 105 60" />
              <path class="gauge-fill-path" d="M 15 60 A 45 45 0 0 1 105 60"
                stroke="${current < 25 ? '#10b981' : (current < 30 ? '#f59e0b' : '#ef4444')}"
                stroke-dasharray="${strokeDasharray}" />
              <text x="60" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="var(--text-primary)">
                ${current}
              </text>
            </svg>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Gauge Scale (${min} - ${max})</div>
          </div>
        `;
      }
    }

    area.innerHTML = `
      <div class="primary-result-box">
        <div class="primary-result-label">${result.primaryResult.label}</div>
        <div class="primary-result-value">${result.primaryResult.value}</div>
        ${result.primaryResult.subtext ? `<div class="primary-result-subtext">${result.primaryResult.subtext}</div>` : ''}
      </div>

      <div class="secondary-metrics-grid">
        ${(result.stats || []).map(st => `
          <div class="metric-tile ${st.highlight ? 'highlight' : ''}">
            <div class="metric-tile-label">${st.label}</div>
            <div class="metric-tile-value">${st.value}</div>
          </div>
        `).join('')}
      </div>

      ${chartHtml}
      ${result.customHtml ? `<div class="calc-custom-output" style="margin-top: 1.25rem;">${result.customHtml}</div>` : ''}
    `;

    // Render table if amortization / breakdown exists
    const tableArea = document.getElementById('calc-table-area');
    if (tableArea) {
      if (result.breakdownTable) {
        tableArea.innerHTML = `
          <div class="table-card glass-panel" style="margin-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
              <div>
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${result.breakdownTable.title || 'Detailed Calculation Breakdown'}</h3>
                ${result.breakdownTable.subtitle ? `<div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${result.breakdownTable.subtitle}</div>` : ''}
              </div>
              ${result.breakdownTable.badge ? `<span class="badge badge-emerald">${result.breakdownTable.badge}</span>` : ''}
            </div>
            ${result.breakdownTable.customHtml ? result.breakdownTable.customHtml : ''}
            ${result.breakdownTable.headers && result.breakdownTable.rows ? `
              <div class="table-wrapper">
                <table class="data-table">
                  <thead>
                    <tr>
                      ${result.breakdownTable.headers.map(h => `<th>${h}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    ${result.breakdownTable.rows.map(row => {
                      if (Array.isArray(row)) {
                        return `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
                      }
                      return `<tr style="${row.highlight ? 'font-weight: 700; background: rgba(16, 185, 129, 0.1);' : ''}">${(row.cells || []).map(cell => `<td>${cell}</td>`).join('')}</tr>`;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}
            ${result.breakdownTable.footerNote ? `<div style="margin-top: 1.15rem; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${result.breakdownTable.footerNote}</div>` : ''}
          </div>
        `;
      } else {
        tableArea.innerHTML = '';
      }
    }
  },

  // ==========================================
  // SPECIALIZED UI RENDERERS
  // ==========================================
  renderBasicKeypadUi() {
    return `
      <div class="basic-calc-container glass-panel">
        <div class="calc-lcd-screen">
          <div class="calc-lcd-equation" id="basic-lcd-eq"></div>
          <div class="calc-lcd-main" id="basic-lcd-display">0</div>
        </div>

        <div class="basic-keypad-grid">
          <button type="button" class="keypad-btn action" data-key="C">C</button>
          <button type="button" class="keypad-btn action" data-key="CE">CE</button>
          <button type="button" class="keypad-btn action" data-key="backspace">⌫</button>
          <button type="button" class="keypad-btn operator" data-key="/">÷</button>

          <button type="button" class="keypad-btn" data-key="7">7</button>
          <button type="button" class="keypad-btn" data-key="8">8</button>
          <button type="button" class="keypad-btn" data-key="9">9</button>
          <button type="button" class="keypad-btn operator" data-key="*">×</button>

          <button type="button" class="keypad-btn" data-key="4">4</button>
          <button type="button" class="keypad-btn" data-key="5">5</button>
          <button type="button" class="keypad-btn" data-key="6">6</button>
          <button type="button" class="keypad-btn operator" data-key="-">−</button>

          <button type="button" class="keypad-btn" data-key="1">1</button>
          <button type="button" class="keypad-btn" data-key="2">2</button>
          <button type="button" class="keypad-btn" data-key="3">3</button>
          <button type="button" class="keypad-btn operator" data-key="+">+</button>

          <button type="button" class="keypad-btn" data-key="+/-">±</button>
          <button type="button" class="keypad-btn" data-key="0">0</button>
          <button type="button" class="keypad-btn" data-key=".">.</button>
          <button type="button" class="keypad-btn operator" data-key="%">%</button>

          <button type="button" class="keypad-btn equals" data-key="=" style="grid-column: span 4;">=</button>
        </div>
      </div>
    `;
  },

  initBasicKeypadBehavior() {
    const dispEl = document.getElementById('basic-lcd-display');
    const eqEl = document.getElementById('basic-lcd-eq');

    // Reset keypad to clean initial state
    if (typeof KeypadController !== 'undefined') {
      const resetState = KeypadController.handleBasic('C');
      if (dispEl) dispEl.textContent = resetState.display;
      if (eqEl) eqEl.textContent = resetState.equation;
    }

    const container = document.querySelector('.basic-calc-container');
    if (container) {
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.keypad-btn');
        if (!btn) return;
        const key = btn.getAttribute('data-key');
        if (!key) return;

        if (typeof KeypadController === 'undefined') return;
        const state = KeypadController.handleBasic(key);
        if (dispEl) dispEl.textContent = state.display;
        if (eqEl) eqEl.textContent = state.equation;

        if (key === '=' && state.display !== 'Error') {
          AppState.addHistory('basic-calculator', 'Basic Calculator', state.display);
        }
      });
    }

    // Keyboard support (bind once globally)
    if (!this._basicKeydownBound) {
      this._basicKeydownBound = true;
      window.addEventListener('keydown', (e) => {
        if (AppState.currentCalculator?.id !== 'basic-calculator') return;
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

        let k = e.key;
        if (k === 'Enter') k = '=';
        if (k === 'Escape') k = 'C';
        if (k === 'Backspace') k = 'backspace';

        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', 'C', 'backspace', '%'].includes(k)) {
          e.preventDefault();
          if (typeof KeypadController === 'undefined') return;
          const state = KeypadController.handleBasic(k);
          const currentDisp = document.getElementById('basic-lcd-display');
          const currentEq = document.getElementById('basic-lcd-eq');
          if (currentDisp) currentDisp.textContent = state.display;
          if (currentEq) currentEq.textContent = state.equation;

          if (k === '=' && state.display !== 'Error') {
            AppState.addHistory('basic-calculator', 'Basic Calculator', state.display);
          }
        }
      });
    }
  },

  renderScientificKeypadUi() {
    return `
      <div class="scientific-calc-container glass-panel">
        <div class="calc-lcd-screen">
          <div class="calc-lcd-equation" id="sci-lcd-eq">DEG</div>
          <div class="calc-lcd-main" id="sci-lcd-display">0</div>
        </div>

        <div class="scientific-keypad-grid">
          <button type="button" class="keypad-btn sci-fn" data-sci="TOGGLE_DEG_RAD" id="deg-rad-btn">DEG</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="sin(">sin</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="cos(">cos</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="tan(">tan</button>
          <button type="button" class="keypad-btn action" data-sci="AC">AC</button>

          <button type="button" class="keypad-btn sci-fn" data-sci="ln(">ln</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="log(">log</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="^">x^y</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="sqrt(">√</button>
          <button type="button" class="keypad-btn action" data-sci="DEL">DEL</button>

          <button type="button" class="keypad-btn sci-fn" data-sci="(">(</button>
          <button type="button" class="keypad-btn sci-fn" data-sci=")">)</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="π">π</button>
          <button type="button" class="keypad-btn sci-fn" data-sci="e">e</button>
          <button type="button" class="keypad-btn operator" data-sci="/">÷</button>

          <button type="button" class="keypad-btn" data-sci="7">7</button>
          <button type="button" class="keypad-btn" data-sci="8">8</button>
          <button type="button" class="keypad-btn" data-sci="9">9</button>
          <button type="button" class="keypad-btn operator" data-sci="*">×</button>
          <button type="button" class="keypad-btn operator" data-sci="-">−</button>

          <button type="button" class="keypad-btn" data-sci="4">4</button>
          <button type="button" class="keypad-btn" data-sci="5">5</button>
          <button type="button" class="keypad-btn" data-sci="6">6</button>
          <button type="button" class="keypad-btn operator" data-sci="+">+</button>
          <button type="button" class="keypad-btn" data-sci=".">.</button>

          <button type="button" class="keypad-btn" data-sci="1">1</button>
          <button type="button" class="keypad-btn" data-sci="2">2</button>
          <button type="button" class="keypad-btn" data-sci="3">3</button>
          <button type="button" class="keypad-btn" data-sci="0">0</button>
          <button type="button" class="keypad-btn equals" data-sci="=">=</button>
        </div>
      </div>
    `;
  },

  initScientificKeypadBehavior() {
    const dispEl = document.getElementById('sci-lcd-display');
    const eqEl = document.getElementById('sci-lcd-eq');
    const degRadBtn = document.getElementById('deg-rad-btn');

    // Reset keypad to clean initial state
    if (typeof KeypadController !== 'undefined') {
      const resetState = KeypadController.handleScientific('AC');
      if (dispEl) dispEl.textContent = '0';
      if (eqEl) eqEl.textContent = resetState.angleMode.toUpperCase();
      if (degRadBtn) degRadBtn.textContent = resetState.angleMode.toUpperCase();
    }

    const updateDisplay = (state, action) => {
      if (action === '=') {
        if (dispEl) dispEl.textContent = state.result;
        if (eqEl) eqEl.textContent = `${state.expression} =`;
      } else {
        if (dispEl) dispEl.textContent = state.expression || '0';
        if (eqEl) eqEl.textContent = state.angleMode.toUpperCase();
      }
      if (degRadBtn) degRadBtn.textContent = state.angleMode.toUpperCase();
    };

    const container = document.querySelector('.scientific-calc-container');
    if (container) {
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.keypad-btn');
        if (!btn) return;
        const action = btn.getAttribute('data-sci');
        if (!action) return;

        if (typeof KeypadController === 'undefined') return;
        const state = KeypadController.handleScientific(action);
        updateDisplay(state, action);

        if (action === '=' && state.result !== 'Syntax Error' && !state.result.includes('Cannot') && !state.result.includes('Error')) {
          AppState.addHistory('scientific-calculator', 'Scientific Calculator', state.result);
        }
      });
    }

    // Keyboard support (bind once globally)
    if (!this._scientificKeydownBound) {
      this._scientificKeydownBound = true;
      window.addEventListener('keydown', (e) => {
        if (AppState.currentCalculator?.id !== 'scientific-calculator') return;
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

        let k = e.key;
        if (k === 'Enter') k = '=';
        else if (k === 'Escape') k = 'AC';
        else if (k === 'Backspace') k = 'DEL';

        const validKeys = [
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.',
          '+', '-', '*', '/', '^', '%', '(', ')', '=', 'AC', 'DEL', 'e', 'π'
        ];

        if (validKeys.includes(k)) {
          e.preventDefault();
          if (typeof KeypadController === 'undefined') return;
          const state = KeypadController.handleScientific(k);
          updateDisplay(state, k);

          if (k === '=' && state.result !== 'Syntax Error' && !state.result.includes('Cannot') && !state.result.includes('Error')) {
            AppState.addHistory('scientific-calculator', 'Scientific Calculator', state.result);
          }
        }
      });
    }
  },

  renderJewelleryPriceCalculatorUi(calc) {
    return `
      <div class="jewel-calc-wrapper">
        <!-- Live Gold Rates Banner -->
        <div class="jewel-rates-ticker glass-panel">
          <div class="jewel-rate-item">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <span class="jewel-rate-label">24K Gold Rate (Per Gram)</span>
              <div class="jewel-rate-input-wrap">
                <span style="color: #fbbf24; font-weight: 700;">₹</span>
                <input type="number" id="jewel-p24-input" value="7500" step="50" min="1000" max="50000" aria-label="24K gold price per gram">
              </div>
            </div>
          </div>

          <div class="jewel-rate-item">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="jewel-rate-label">22K Gold Rate</span>
                <span class="jewel-rate-badge">24K × (22÷24)</span>
              </div>
              <div class="jewel-rate-val" id="jewel-rate-22k-display">₹6,875.00 <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">/g</span></div>
            </div>
          </div>

          <div class="jewel-rate-item">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="jewel-rate-label">18K Gold Rate</span>
                <span class="jewel-rate-badge">24K × (18÷24)</span>
              </div>
              <div class="jewel-rate-val" id="jewel-rate-18k-display">₹5,625.00 <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">/g</span></div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs: Jewellery Price vs Gold for My Budget -->
        <div class="jewel-nav-tabs">
          <button type="button" class="jewel-tab-btn active" id="jewel-tab-btn-price" data-tab="price">
            ${getIconSvg('gem', 18)}
            <span>Jewellery Price Calculator</span>
          </button>
          <button type="button" class="jewel-tab-btn" id="jewel-tab-btn-budget" data-tab="budget">
            ${getIconSvg('wallet', 18)}
            <span>Gold for My Budget</span>
          </button>
        </div>

        <!-- Tab 1 Pane: Jewellery Price Calculator -->
        <div id="jewel-tab-pane-price" class="jewel-workspace-grid">
          <!-- Inputs Card -->
          <div class="glass-panel" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
              ${getIconSvg('calculator', 18)}
              <span>Jewellery Specifications</span>
            </h3>

            <!-- Purity Choice -->
            <div class="form-group">
              <label class="form-label">Gold Purity (Carat)</label>
              <div class="jewel-chips-row" id="jewel-purity-chips">
                <button type="button" class="jewel-chip-btn active" data-carat="22">22K (91.6% Hallmark)</button>
                <button type="button" class="jewel-chip-btn" data-carat="24">24K (99.9% Pure)</button>
                <button type="button" class="jewel-chip-btn" data-carat="18">18K (75.0%)</button>
                <button type="button" class="jewel-chip-btn" data-carat="14">14K (58.5%)</button>
              </div>
            </div>

            <!-- Weight in Grams -->
            <div class="form-group">
              <label class="form-label" for="jewel-weight-input">Weight of Jewellery (Grams)</label>
              <div style="position: relative;">
                <input type="number" class="form-input" id="jewel-weight-input" value="10" step="0.1" min="0.1" max="1000" style="padding-right: 3.5rem;">
                <span style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-weight: 600;">grams</span>
              </div>
              <div class="jewel-chips-row" id="jewel-weight-quick-chips">
                <button type="button" class="jewel-chip-btn" data-weight="1">1g</button>
                <button type="button" class="jewel-chip-btn" data-weight="4">4g</button>
                <button type="button" class="jewel-chip-btn" data-weight="8">8g (1 Pavan)</button>
                <button type="button" class="jewel-chip-btn active" data-weight="10">10g (1 Tola)</button>
                <button type="button" class="jewel-chip-btn" data-weight="20">20g</button>
                <button type="button" class="jewel-chip-btn" data-weight="50">50g</button>
              </div>
            </div>

            <!-- Making Charges -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label class="form-label" for="jewel-making-input" style="margin-bottom: 0;">Making Charges (%)</label>
                <span style="font-weight: 700; color: #fbbf24; font-family: var(--font-mono, monospace);" id="jewel-making-val-preview">10%</span>
              </div>
              <div style="position: relative; margin-bottom: 0.75rem;">
                <input type="number" class="form-input" id="jewel-making-input" value="10" step="0.5" min="0" max="40" style="padding-right: 2.5rem;">
                <span style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-weight: 600;">%</span>
              </div>
              <input type="range" id="jewel-making-slider" min="0" max="30" step="0.5" value="10" style="width: 100%; accent-color: #eab308; cursor: pointer;">
              <div class="jewel-chips-row" id="jewel-making-quick-chips">
                <button type="button" class="jewel-chip-btn" data-making="5">5% (Simple)</button>
                <button type="button" class="jewel-chip-btn" data-making="8">8% (Machine)</button>
                <button type="button" class="jewel-chip-btn active" data-making="10">10% (Standard)</button>
                <button type="button" class="jewel-chip-btn" data-making="15">15% (Handcrafted)</button>
                <button type="button" class="jewel-chip-btn" data-making="20">20% (Antique)</button>
              </div>
            </div>

            <!-- GST Rate -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="jewel-gst-input">GST on Gold Jewellery (%)</label>
              <div style="position: relative;">
                <input type="number" class="form-input" id="jewel-gst-input" value="3" step="0.5" min="0" max="18" style="padding-right: 2.5rem;">
                <span style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-weight: 600;">%</span>
              </div>
              <div class="jewel-chips-row" id="jewel-gst-quick-chips">
                <button type="button" class="jewel-chip-btn active" data-gst="3">3% (Standard Indian Gold GST)</button>
                <button type="button" class="jewel-chip-btn" data-gst="0">0% (Export/Exempt)</button>
              </div>
            </div>
          </div>

          <!-- Results Card -->
          <div class="jewel-results-panel">
            <div class="jewel-hero-card glass-panel">
              <div class="jewel-hero-label">Final Jewellery Price</div>
              <div class="jewel-hero-value" id="jewel-calc-final-price">₹77,894</div>
              <div class="jewel-hero-subtext" id="jewel-calc-price-subtext">For 10.0g (22K) • Effective rate: ₹7,789.38/g</div>
            </div>

            <!-- Chart & Receipt Breakdown -->
            <div class="glass-panel" style="padding: 1.5rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-secondary);">Cost Distribution Breakdown</h4>
              <div id="jewel-price-donut-chart"></div>

              <table class="jewel-receipt-table" style="margin-top: 1rem;">
                <tbody>
                  <tr>
                    <td style="color: var(--text-secondary);">Gold Value (<span id="jewel-rcpt-purity">22K</span>)</td>
                    <td id="jewel-rcpt-gold-val">₹68,750.00</td>
                  </tr>
                  <tr>
                    <td style="color: var(--text-secondary);">Making Charges (<span id="jewel-rcpt-making-pct">10%</span>)</td>
                    <td id="jewel-rcpt-making-val" style="color: #60a5fa;">₹6,875.00</td>
                  </tr>
                  <tr>
                    <td style="color: var(--text-secondary);">Subtotal (Taxable Value)</td>
                    <td id="jewel-rcpt-subtotal-val">₹75,625.00</td>
                  </tr>
                  <tr>
                    <td style="color: var(--text-secondary);">GST (<span id="jewel-rcpt-gst-pct">3%</span>)</td>
                    <td id="jewel-rcpt-gst-val" style="color: #f472b6;">₹2,268.75</td>
                  </tr>
                  <tr class="jewel-receipt-total">
                    <td>Total Payable Amount</td>
                    <td id="jewel-rcpt-total-val" style="color: #10b981;">₹77,893.75</td>
                  </tr>
                </tbody>
              </table>

              <div style="margin-top: 1.25rem;">
                <button type="button" class="btn-secondary" id="jewel-copy-price-btn" style="width: 100%; padding: 0.6rem; font-size: 0.88rem; justify-content: center;">
                  ${getIconSvg('copy', 16)} Copy Price Breakdown
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 2 Pane: Gold for My Budget -->
        <div id="jewel-tab-pane-budget" class="jewel-workspace-grid" style="display: none;">
          <!-- Budget Inputs -->
          <div class="glass-panel" style="padding: 1.75rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
              ${getIconSvg('wallet', 18)}
              <span>Budget Planner</span>
            </h3>

            <!-- Budget Amount -->
            <div class="form-group">
              <label class="form-label" for="budget-amount-input">How Much Money Do You Want to Spend?</label>
              <div style="position: relative;">
                <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #10b981; font-weight: 700; font-size: 1.15rem;">₹</span>
                <input type="number" class="form-input" id="budget-amount-input" value="50000" step="1000" min="500" max="10000000" style="padding-left: 2.2rem; font-size: 1.15rem; font-weight: 700;">
              </div>
              <div class="jewel-chips-row" id="budget-quick-chips">
                <button type="button" class="jewel-chip-btn" data-budget="25000">₹25,000</button>
                <button type="button" class="jewel-chip-btn active" data-budget="50000">₹50,000</button>
                <button type="button" class="jewel-chip-btn" data-budget="100000">₹1,00,000</button>
                <button type="button" class="jewel-chip-btn" data-budget="250000">₹2,50,000</button>
                <button type="button" class="jewel-chip-btn" data-budget="500000">₹5,00,000</button>
              </div>
            </div>

            <!-- Target Purity -->
            <div class="form-group">
              <label class="form-label">Target Gold Purity</label>
              <div class="jewel-chips-row" id="budget-purity-chips">
                <button type="button" class="jewel-chip-btn active" data-carat="22">22K (91.6% Hallmark)</button>
                <button type="button" class="jewel-chip-btn" data-carat="24">24K (99.9% Pure)</button>
                <button type="button" class="jewel-chip-btn" data-carat="18">18K (75.0%)</button>
              </div>
            </div>

            <!-- Expected Making Charges -->
            <div class="form-group">
              <label class="form-label" for="budget-making-input">Expected Making Charges (%)</label>
              <div style="position: relative;">
                <input type="number" class="form-input" id="budget-making-input" value="10" step="0.5" min="0" max="40" style="padding-right: 2.5rem;">
                <span style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-weight: 600;">%</span>
              </div>
            </div>

            <!-- Expected GST -->
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="budget-gst-input">GST Rate (%)</label>
              <div style="position: relative;">
                <input type="number" class="form-input" id="budget-gst-input" value="3" step="0.5" min="0" max="18" style="padding-right: 2.5rem;">
                <span style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-weight: 600;">%</span>
              </div>
            </div>
          </div>

          <!-- Budget Results Card -->
          <div class="jewel-results-panel">
            <div class="jewel-hero-card glass-panel" style="background: linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%); border-color: rgba(234, 179, 8, 0.4);">
              <div class="jewel-hero-label">Total Gold You Can Buy</div>
              <div class="jewel-hero-value" id="budget-grams-display" style="color: #fbbf24;">6.419 Grams</div>
              <div class="jewel-hero-subtext" id="budget-grams-subtext">Approx. 6 grams 419 milligrams of 22K Gold Jewellery</div>
            </div>

            <div class="glass-panel" style="padding: 1.5rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-secondary);">Traditional Indian Units &amp; Allocation</h4>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;">
                <div style="padding: 0.85rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border-glass); text-align: center;">
                  <div style="font-size: 0.76rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Tolas (10g)</div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); font-family: var(--font-mono, monospace);" id="budget-tola-display">0.642 Tola</div>
                </div>
                <div style="padding: 0.85rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border-glass); text-align: center;">
                  <div style="font-size: 0.76rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Pavans / Sovereigns (8g)</div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); font-family: var(--font-mono, monospace);" id="budget-pavan-display">0.802 Pavan</div>
                </div>
              </div>

              <div id="jewel-budget-donut-chart"></div>

              <table class="jewel-receipt-table" style="margin-top: 1rem;">
                <tbody>
                  <tr>
                    <td style="color: var(--text-secondary);">Pure Gold Purchased (<span id="budget-rcpt-purity">22K</span>)</td>
                    <td id="budget-rcpt-gold-val">₹44,130.63</td>
                  </tr>
                  <tr>
                    <td style="color: var(--text-secondary);">Making Charges Allocated</td>
                    <td id="budget-rcpt-making-val" style="color: #60a5fa;">₹4,413.06</td>
                  </tr>
                  <tr>
                    <td style="color: var(--text-secondary);">GST Allocated (3%)</td>
                    <td id="budget-rcpt-gst-val" style="color: #f472b6;">₹1,456.31</td>
                  </tr>
                  <tr class="jewel-receipt-total">
                    <td>Total Budget Utilized</td>
                    <td id="budget-rcpt-total-val" style="color: #10b981;">₹50,000.00</td>
                  </tr>
                </tbody>
              </table>

              <div style="margin-top: 1.25rem;">
                <button type="button" class="btn-secondary" id="budget-copy-btn" style="width: 100%; padding: 0.6rem; font-size: 0.88rem; justify-content: center;">
                  ${getIconSvg('copy', 16)} Copy Budget Breakdown
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initJewelleryPriceCalculatorBehavior() {
    const state = {
      p24: 7500,
      priceCarat: 22,
      priceWeight: 10,
      priceMaking: 10,
      priceGst: 3,
      budgetAmount: 50000,
      budgetCarat: 22,
      budgetMaking: 10,
      budgetGst: 3
    };

    const formatInr = (n) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
      }).format(n);
    };

    const generateDonutHtml = (labels, values, colors, centerLabel) => {
      const total = values.reduce((a, b) => a + b, 0);
      if (total <= 0) return '';
      let accumulated = 0;
      const circles = values.map((v, i) => {
        const pct = (v / total) * 100;
        const dash = `${pct} ${100 - pct}`;
        const offset = -accumulated;
        accumulated += pct;
        return `<circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="${colors[i]}" stroke-width="5" stroke-dasharray="${dash}" stroke-dashoffset="${offset}"></circle>`;
      }).join('');

      const legends = labels.map((l, i) => {
        const pct = ((values[i] / total) * 100).toFixed(1);
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: ${colors[i]}; display: inline-block;"></span>
              <span style="color: var(--text-secondary);">${l}</span>
            </div>
            <span style="font-weight: 700; color: var(--text-primary); font-family: var(--font-mono, monospace);">${pct}%</span>
          </div>
        `;
      }).join('');

      return `
        <div style="display: flex; align-items: center; justify-content: space-around; gap: 1.5rem; flex-wrap: wrap;">
          <div style="position: relative; width: 140px; height: 140px;">
            <svg viewBox="0 0 42 42" style="width: 100%; height: 100%; transform: rotate(-90deg);">
              ${circles}
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; pointer-events: none;">
              <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${centerLabel}</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem; min-width: 160px;">
            ${legends}
          </div>
        </div>
      `;
    };

    // DOM Elements
    const p24Input = document.getElementById('jewel-p24-input');
    const p22Display = document.getElementById('jewel-rate-22k-display');
    const p18Display = document.getElementById('jewel-rate-18k-display');

    // Tab 1 Elements
    const weightInput = document.getElementById('jewel-weight-input');
    const makingInput = document.getElementById('jewel-making-input');
    const makingSlider = document.getElementById('jewel-making-slider');
    const makingValPreview = document.getElementById('jewel-making-val-preview');
    const gstInput = document.getElementById('jewel-gst-input');

    const heroPriceDisplay = document.getElementById('jewel-calc-final-price');
    const heroPriceSubtext = document.getElementById('jewel-calc-price-subtext');
    const priceChartContainer = document.getElementById('jewel-price-donut-chart');
    const rcptPurity = document.getElementById('jewel-rcpt-purity');
    const rcptGoldVal = document.getElementById('jewel-rcpt-gold-val');
    const rcptMakingPct = document.getElementById('jewel-rcpt-making-pct');
    const rcptMakingVal = document.getElementById('jewel-rcpt-making-val');
    const rcptSubtotalVal = document.getElementById('jewel-rcpt-subtotal-val');
    const rcptGstPct = document.getElementById('jewel-rcpt-gst-pct');
    const rcptGstVal = document.getElementById('jewel-rcpt-gst-val');
    const rcptTotalVal = document.getElementById('jewel-rcpt-total-val');

    // Tab 2 Elements
    const budgetAmountInput = document.getElementById('budget-amount-input');
    const budgetMakingInput = document.getElementById('budget-making-input');
    const budgetGstInput = document.getElementById('budget-gst-input');

    const budgetGramsDisplay = document.getElementById('budget-grams-display');
    const budgetGramsSubtext = document.getElementById('budget-grams-subtext');
    const budgetTolaDisplay = document.getElementById('budget-tola-display');
    const budgetPavanDisplay = document.getElementById('budget-pavan-display');
    const budgetChartContainer = document.getElementById('jewel-budget-donut-chart');
    const budgetRcptPurity = document.getElementById('budget-rcpt-purity');
    const budgetRcptGoldVal = document.getElementById('budget-rcpt-gold-val');
    const budgetRcptMakingVal = document.getElementById('budget-rcpt-making-val');
    const budgetRcptGstVal = document.getElementById('budget-rcpt-gst-val');
    const budgetRcptTotalVal = document.getElementById('budget-rcpt-total-val');

    // Compute Tab 1 (Jewellery Price)
    const computePrice = () => {
      const p24 = parseFloat(state.p24) || 7500;
      const caratRate = p24 * (state.priceCarat / 24);
      const weight = parseFloat(state.priceWeight) || 0;
      const makingPct = parseFloat(state.priceMaking) || 0;
      const gstPct = parseFloat(state.priceGst) || 0;

      const goldCost = weight * caratRate;
      const makingCost = goldCost * (makingPct / 100);
      const subtotal = goldCost + makingCost;
      const gstCost = subtotal * (gstPct / 100);
      const finalPrice = subtotal + gstCost;
      const pricePerGram = weight > 0 ? finalPrice / weight : 0;

      // Update Rate Ticker
      const rate22k = p24 * (22 / 24);
      const rate18k = p24 * (18 / 24);
      if (p22Display) p22Display.innerHTML = `${formatInr(rate22k)} <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">/g</span>`;
      if (p18Display) p18Display.innerHTML = `${formatInr(rate18k)} <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">/g</span>`;

      // Update Tab 1 Outputs
      if (heroPriceDisplay) heroPriceDisplay.textContent = formatInr(finalPrice);
      if (heroPriceSubtext) heroPriceSubtext.textContent = `For ${weight.toFixed(1)}g (${state.priceCarat}K) • Effective rate: ${formatInr(pricePerGram)}/g`;
      if (rcptPurity) rcptPurity.textContent = `${state.priceCarat}K`;
      if (rcptGoldVal) rcptGoldVal.textContent = formatInr(goldCost);
      if (rcptMakingPct) rcptMakingPct.textContent = `${makingPct}%`;
      if (rcptMakingVal) rcptMakingVal.textContent = formatInr(makingCost);
      if (rcptSubtotalVal) rcptSubtotalVal.textContent = formatInr(subtotal);
      if (rcptGstPct) rcptGstPct.textContent = `${gstPct}%`;
      if (rcptGstVal) rcptGstVal.textContent = formatInr(gstCost);
      if (rcptTotalVal) rcptTotalVal.textContent = formatInr(finalPrice);

      if (priceChartContainer) {
        priceChartContainer.innerHTML = generateDonutHtml(
          ['Pure Gold', 'Making Charges', 'GST'],
          [goldCost, makingCost, gstCost],
          ['#eab308', '#60a5fa', '#f472b6'],
          'Gold Price'
        );
      }
    };

    // Compute Tab 2 (Gold for My Budget)
    const computeBudget = () => {
      const p24 = parseFloat(state.p24) || 7500;
      const caratRate = p24 * (state.budgetCarat / 24);
      const budget = parseFloat(state.budgetAmount) || 0;
      const makingPct = parseFloat(state.budgetMaking) || 0;
      const gstPct = parseFloat(state.budgetGst) || 0;

      const costPerGramPreTax = caratRate * (1 + makingPct / 100);
      const finalCostPerGram = costPerGramPreTax * (1 + gstPct / 100);
      const affordableGrams = finalCostPerGram > 0 ? budget / finalCostPerGram : 0;

      const goldValue = affordableGrams * caratRate;
      const makingValue = goldValue * (makingPct / 100);
      const gstValue = (goldValue + makingValue) * (gstPct / 100);

      const tolas = affordableGrams / 10;
      const pavans = affordableGrams / 8;

      const wholeGrams = Math.floor(affordableGrams);
      const milligrams = Math.round((affordableGrams - wholeGrams) * 1000);

      if (budgetGramsDisplay) budgetGramsDisplay.textContent = `${affordableGrams.toFixed(3)} Grams`;
      if (budgetGramsSubtext) budgetGramsSubtext.textContent = `Approx. ${wholeGrams} grams ${milligrams} milligrams of ${state.budgetCarat}K Gold Jewellery`;
      if (budgetTolaDisplay) budgetTolaDisplay.textContent = `${tolas.toFixed(3)} Tola`;
      if (budgetPavanDisplay) budgetPavanDisplay.textContent = `${pavans.toFixed(3)} Pavan`;

      if (budgetRcptPurity) budgetRcptPurity.textContent = `${state.budgetCarat}K`;
      if (budgetRcptGoldVal) budgetRcptGoldVal.textContent = formatInr(goldValue);
      if (budgetRcptMakingVal) budgetRcptMakingVal.textContent = formatInr(makingValue);
      if (budgetRcptGstVal) budgetRcptGstVal.textContent = formatInr(gstValue);
      if (budgetRcptTotalVal) budgetRcptTotalVal.textContent = formatInr(budget);

      if (budgetChartContainer) {
        budgetChartContainer.innerHTML = generateDonutHtml(
          ['Pure Gold', 'Making Charges', 'GST'],
          [goldValue, makingValue, gstValue],
          ['#eab308', '#60a5fa', '#f472b6'],
          'Budget'
        );
      }
    };

    // Recompute All
    const updateAll = () => {
      computePrice();
      computeBudget();
    };

    // Tab Switcher Handling
    const tabBtnPrice = document.getElementById('jewel-tab-btn-price');
    const tabBtnBudget = document.getElementById('jewel-tab-btn-budget');
    const panePrice = document.getElementById('jewel-tab-pane-price');
    const paneBudget = document.getElementById('jewel-tab-pane-budget');

    if (tabBtnPrice && tabBtnBudget && panePrice && paneBudget) {
      tabBtnPrice.addEventListener('click', () => {
        tabBtnPrice.classList.add('active');
        tabBtnBudget.classList.remove('active');
        panePrice.style.display = 'grid';
        paneBudget.style.display = 'none';
        computePrice();
      });

      tabBtnBudget.addEventListener('click', () => {
        tabBtnBudget.classList.add('active');
        tabBtnPrice.classList.remove('active');
        paneBudget.style.display = 'grid';
        panePrice.style.display = 'none';
        computeBudget();
      });
    }

    // 24K Rate Input
    if (p24Input) {
      p24Input.addEventListener('input', () => {
        state.p24 = parseFloat(p24Input.value) || 0;
        updateAll();
      });
    }

    // Tab 1 Event Bindings
    if (weightInput) {
      weightInput.addEventListener('input', () => {
        state.priceWeight = parseFloat(weightInput.value) || 0;
        computePrice();
      });
    }

    if (makingInput) {
      makingInput.addEventListener('input', () => {
        const val = parseFloat(makingInput.value) || 0;
        state.priceMaking = val;
        if (makingSlider) makingSlider.value = val;
        if (makingValPreview) makingValPreview.textContent = `${val}%`;
        computePrice();
      });
    }

    if (makingSlider) {
      makingSlider.addEventListener('input', () => {
        const val = parseFloat(makingSlider.value) || 0;
        state.priceMaking = val;
        if (makingInput) makingInput.value = val;
        if (makingValPreview) makingValPreview.textContent = `${val}%`;
        computePrice();
      });
    }

    if (gstInput) {
      gstInput.addEventListener('input', () => {
        state.priceGst = parseFloat(gstInput.value) || 0;
        computePrice();
      });
    }

    // Tab 1 Purity Chips
    document.querySelectorAll('#jewel-purity-chips .jewel-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#jewel-purity-chips .jewel-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.priceCarat = parseFloat(btn.getAttribute('data-carat')) || 22;
        computePrice();
      });
    });

    // Tab 1 Weight Chips
    document.querySelectorAll('#jewel-weight-quick-chips .jewel-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#jewel-weight-quick-chips .jewel-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const w = parseFloat(btn.getAttribute('data-weight')) || 10;
        state.priceWeight = w;
        if (weightInput) weightInput.value = w;
        computePrice();
      });
    });

    // Tab 1 Making Quick Chips
    document.querySelectorAll('#jewel-making-quick-chips .jewel-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#jewel-making-quick-chips .jewel-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const m = parseFloat(btn.getAttribute('data-making')) || 10;
        state.priceMaking = m;
        if (makingInput) makingInput.value = m;
        if (makingSlider) makingSlider.value = m;
        if (makingValPreview) makingValPreview.textContent = `${m}%`;
        computePrice();
      });
    });

    // Tab 1 GST Quick Chips
    document.querySelectorAll('#jewel-gst-quick-chips .jewel-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#jewel-gst-quick-chips .jewel-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const g = parseFloat(btn.getAttribute('data-gst')) || 3;
        state.priceGst = g;
        if (gstInput) gstInput.value = g;
        computePrice();
      });
    });

    // Tab 2 Event Bindings
    if (budgetAmountInput) {
      budgetAmountInput.addEventListener('input', () => {
        state.budgetAmount = parseFloat(budgetAmountInput.value) || 0;
        computeBudget();
      });
    }

    if (budgetMakingInput) {
      budgetMakingInput.addEventListener('input', () => {
        state.budgetMaking = parseFloat(budgetMakingInput.value) || 0;
        computeBudget();
      });
    }

    if (budgetGstInput) {
      budgetGstInput.addEventListener('input', () => {
        state.budgetGst = parseFloat(budgetGstInput.value) || 0;
        computeBudget();
      });
    }

    // Tab 2 Budget Quick Chips
    document.querySelectorAll('#budget-quick-chips .jewel-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#budget-quick-chips .jewel-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const bVal = parseFloat(btn.getAttribute('data-budget')) || 50000;
        state.budgetAmount = bVal;
        if (budgetAmountInput) budgetAmountInput.value = bVal;
        computeBudget();
      });
    });

    // Tab 2 Purity Chips
    document.querySelectorAll('#budget-purity-chips .jewel-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#budget-purity-chips .jewel-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.budgetCarat = parseFloat(btn.getAttribute('data-carat')) || 22;
        computeBudget();
      });
    });

    // Copy Price Breakdown
    const copyPriceBtn = document.getElementById('jewel-copy-price-btn');
    if (copyPriceBtn) {
      copyPriceBtn.addEventListener('click', () => {
        const text = `Gold Jewellery Price Estimate (letscalculate.in):\n` +
          `- 24K Rate: ₹${state.p24}/g\n` +
          `- Purity: ${state.priceCarat}K\n` +
          `- Weight: ${state.priceWeight}g\n` +
          `- Making Charges: ${state.priceMaking}%\n` +
          `- GST: ${state.priceGst}%\n` +
          `Total Price: ${heroPriceDisplay?.textContent || ''}`;
        navigator.clipboard?.writeText(text);
        App.showToast('Jewellery price breakdown copied to clipboard!');
        AppState.addHistory('jewellery-price-calculator', 'Jewellery Price Calculator', heroPriceDisplay?.textContent || '');
      });
    }

    // Copy Budget Breakdown
    const copyBudgetBtn = document.getElementById('budget-copy-btn');
    if (copyBudgetBtn) {
      copyBudgetBtn.addEventListener('click', () => {
        const text = `Gold For Budget Estimate (letscalculate.in):\n` +
          `- Budget: ₹${state.budgetAmount}\n` +
          `- 24K Rate: ₹${state.p24}/g\n` +
          `- Purity: ${state.budgetCarat}K\n` +
          `- Making Charges: ${state.budgetMaking}%\n` +
          `- Gold You Can Buy: ${budgetGramsDisplay?.textContent || ''} (${budgetTolaDisplay?.textContent || ''})`;
        navigator.clipboard?.writeText(text);
        App.showToast('Gold budget estimate copied to clipboard!');
      });
    }

    // Initial Compute
    updateAll();
  },

  // ==========================================
  // HOME PURCHASE PLANNER CUSTOM UI & BEHAVIOR
  // ==========================================
  renderHomePurchasePlannerUi(calc) {
    const currSym = AppState.getCurrencySymbol();
    const flatPrice = AppState.calcInputs.flatPrice !== undefined ? AppState.calcInputs.flatPrice : 4000000;
    const downPct = AppState.calcInputs.downPaymentPct !== undefined ? AppState.calcInputs.downPaymentPct : 10;
    const loanRate = AppState.calcInputs.interestRate !== undefined ? AppState.calcInputs.interestRate : 8.5;
    const loanTenure = AppState.calcInputs.loanTenure !== undefined ? AppState.calcInputs.loanTenure : 25;
    const buyerSavings = AppState.calcInputs.buyerSavings !== undefined ? AppState.calcInputs.buyerSavings : 650000;
    const buyerIncome = AppState.calcInputs.buyerIncome !== undefined ? AppState.calcInputs.buyerIncome : 70000;
    const buyerObligations = AppState.calcInputs.buyerObligations !== undefined ? AppState.calcInputs.buyerObligations : 0;

    AppState.tenureUnits = AppState.tenureUnits || {};
    const tenureUnit = AppState.tenureUnits['fpp-tenure'] || 'years';
    const isMos = tenureUnit === 'months';
    const dispTenure = isMos ? (loanTenure <= 30 ? Math.round(loanTenure * 12) : loanTenure) : loanTenure;

    return `
      <!-- Click-outside Overlay for Fullscreen Mode -->
      <div id="overlay"></div>

      <!-- Main Planner Container -->
      <div id="plannerContainer" class="planner home-purchase-planner-container">
        
        <!-- Fullscreen Header (visible when in fullscreen mode) -->
        <div id="hppFullscreenHeader" class="hpp-fullscreen-header" style="display: none; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 14px 20px; background: var(--bg-surface-elevated, #1a2234); border-radius: 12px; border: 1px solid var(--border-card, #2d3748);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <h2 style="margin: 0; font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">Home Purchase Planner</h2>
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 0.75rem; padding: 3px 10px; border-radius: 999px; font-weight: 700;">Fullscreen Prototype</span>
          </div>
          <button type="button" id="closeBtn" class="btn-secondary" style="display: none; align-items: center; gap: 8px; cursor: pointer; padding: 6px 14px; font-weight: 600;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Exit Fullscreen (Esc)</span>
          </button>
        </div>

        <!-- Master Controls Bar -->
        <div class="fpp-master-bar">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.05em;">
              Agreement Property Value
            </label>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <div class="input-with-addons" style="width: 180px;">
                <span class="input-addon-prefix">${currSym}</span>
                <input type="number" class="form-input has-prefix" id="fpp-flat-price" value="${flatPrice}" min="500000" max="200000000" step="50000">
              </div>
              <div class="fpp-quick-chips">
                <button type="button" class="fpp-chip-btn ${flatPrice == 4000000 ? 'active' : ''}" data-val="4000000">₹40L</button>
                <button type="button" class="fpp-chip-btn ${flatPrice == 5000000 ? 'active' : ''}" data-val="5000000">₹50L</button>
                <button type="button" class="fpp-chip-btn ${flatPrice == 6250000 ? 'active' : ''}" data-val="6250000">₹62.5L</button>
                <button type="button" class="fpp-chip-btn ${flatPrice == 7500000 ? 'active' : ''}" data-val="7500000">₹75L</button>
                <button type="button" class="fpp-chip-btn ${flatPrice == 10000000 ? 'active' : ''}" data-val="10000000">₹1 Cr</button>
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <!-- Fullscreen Prototype Toggle Button -->
            <button type="button" id="btn-toggle-fullscreen" class="btn-secondary" style="font-size: 0.82rem; padding: 0.5rem 1rem; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; border-radius: 8px;" title="View Fullscreen">
              <span>Fullscreen Prototype View</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </button>
          </div>
        </div>

        <!-- 3 Side-By-Side Comparison Cards (Mockup Structure) -->
        <div class="fpp-comparison-container">
          <!-- CARD 1: Developer Schedule -->
          <div class="fpp-card" id="fpp-card-developer">
            <div class="fpp-card-header">
              <h3 class="fpp-card-title">
                ${getIconSvg('landmark', 18)} Developer Schedule
              </h3>
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">Milestones</span>
            </div>
            <div class="fpp-quick-chips" style="margin-bottom: 8px;">
              <button type="button" class="fpp-chip-btn active" data-fpp-plan="clp">CLP</button>
              <button type="button" class="fpp-chip-btn" data-fpp-plan="subvention">20:80</button>
              <button type="button" class="fpp-chip-btn" data-fpp-plan="ninety">10:90</button>
              <button type="button" class="fpp-chip-btn" data-fpp-plan="empty">Clear</button>
            </div>
            <div class="fpp-table-container">
              <table class="fpp-table" id="developerSchedule">
                <thead>
                  <tr>
                    <th style="text-align: left;">Milestone</th>
                    <th>%</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody id="fpp-milestones-body">
                  <!-- Dynamically populated by generateDeveloperSchedule() -->
                </tbody>
              </table>
            </div>
            <div class="fpp-status" style="color: var(--emerald);">
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Total Demand</span>
              <span id="fpp-total-demand-label" style="font-size: 1.15rem; font-family: 'JetBrains Mono', monospace;">${currSym}${Number(flatPrice).toLocaleString(AppState.getLocale())}</span>
            </div>
          </div>

          <!-- CARD 2: Bank Loan EMI -->
          <div class="fpp-card" id="fpp-card-loan">
            <div class="fpp-card-header">
              <h3 class="fpp-card-title">
                ${getIconSvg('wallet', 18)} Bank Loan EMI
              </h3>
              <span class="badge" style="background: rgba(99, 102, 241, 0.15); color: #6366f1; font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">Loan Math</span>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">
              <div class="form-group" style="margin-bottom: 0;">
                <div class="form-label-row">
                  <label class="form-label" for="fpp-downpayment-pct">Down Payment (%)</label>
                  <span class="form-value-display" id="fpp-disp-downpayment">${downPct}% (${currSym}${(flatPrice * downPct / 100).toLocaleString(AppState.getLocale())})</span>
                </div>
                <input type="range" class="form-range-slider" id="fpp-slider-downpayment" value="${downPct}" min="10" max="80" step="1">
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <div class="form-label-row">
                  <label class="form-label" for="fpp-loan-rate">Interest Rate (% p.a.)</label>
                  <span class="form-value-display" id="fpp-disp-rate">${loanRate}%</span>
                </div>
                <input type="range" class="form-range-slider" id="fpp-slider-rate" value="${loanRate}" min="6" max="15" step="0.05">
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <div class="form-label-row">
                  <label class="form-label" for="fpp-loan-tenure">
                    <span id="fpp-label-tenure">${isMos ? 'Tenure (Months)' : 'Tenure (Years)'}</span>
                  </label>
                  <div class="form-label-controls">
                    <div class="tenure-toggle-container" id="fpp-tenure-toggle" role="group">
                      <button type="button" class="tenure-unit-btn ${!isMos ? 'active' : ''}" id="fpp-btn-tenure-yr" data-unit="years">YR</button>
                      <button type="button" class="tenure-unit-btn ${isMos ? 'active' : ''}" id="fpp-btn-tenure-mo" data-unit="months">MO</button>
                    </div>
                    <span class="form-value-display" id="fpp-disp-tenure">${dispTenure} ${isMos ? 'Mos' : 'Yrs'}</span>
                  </div>
                </div>
                <input type="range" class="form-range-slider" id="fpp-slider-tenure" value="${dispTenure}" min="${isMos ? 12 : 1}" max="${isMos ? 360 : 30}" step="${isMos ? 6 : 1}">
              </div>
            </div>

            <!-- Summary Table -->
            <div class="fpp-table-container">
              <table class="fpp-table">
                <thead>
                  <tr>
                    <th>Loan Amount</th>
                    <th>Rate</th>
                    <th>Tenure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fpp-val-mono" id="fpp-tbl-loan-amt">${currSym}${Math.round(flatPrice * (1 - downPct/100)).toLocaleString(AppState.getLocale())}</td>
                    <td class="fpp-val-mono" id="fpp-tbl-loan-rate">${loanRate}%</td>
                    <td class="fpp-val-mono" id="fpp-tbl-loan-tenure">${dispTenure} ${isMos ? 'mos' : 'yrs'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="fpp-status" style="color: var(--emerald);">
              <span id="fpp-emi-status-line" style="font-size: 1.15rem; font-family: 'JetBrains Mono', monospace; font-weight: 800;">Monthly EMI: ₹28,988</span>
              <span id="fpp-subtext-loan" style="font-size: 0.78rem; color: var(--text-secondary);">Total Interest: ₹50,96,453</span>
            </div>
          </div>

          <!-- CARD 3: Buyer Capacity -->
          <div class="fpp-card" id="fpp-card-buyer">
            <div class="fpp-card-header">
              <h3 class="fpp-card-title">
                ${getIconSvg('award', 18)} Buyer Capacity
              </h3>
              <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; font-weight: 700;">Affordability</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px;">
              <div class="form-group" style="margin-bottom: 0;">
                <div class="form-label-row">
                  <label class="form-label" for="fpp-savings">Liquid Savings (${currSym})</label>
                  <span class="form-value-display" id="fpp-disp-savings">${currSym}${Number(buyerSavings).toLocaleString(AppState.getLocale())}</span>
                </div>
                <input type="range" class="form-range-slider" id="fpp-slider-savings" value="${buyerSavings}" min="100000" max="10000000" step="50000">
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <div class="form-label-row">
                  <label class="form-label" for="fpp-income">Monthly Take-Home (${currSym})</label>
                  <span class="form-value-display" id="fpp-disp-income">${currSym}${Number(buyerIncome).toLocaleString(AppState.getLocale())}</span>
                </div>
                <input type="range" class="form-range-slider" id="fpp-slider-income" value="${buyerIncome}" min="25000" max="500000" step="5000">
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <div class="form-label-row">
                  <label class="form-label" for="fpp-obligations">Existing Monthly EMIs (${currSym})</label>
                  <span class="form-value-display" id="fpp-disp-obligations">${currSym}${Number(buyerObligations).toLocaleString(AppState.getLocale())}</span>
                </div>
                <input type="range" class="form-range-slider" id="fpp-slider-obligations" value="${buyerObligations}" min="0" max="100000" step="2000">
              </div>
            </div>

            <!-- Summary Table -->
            <div class="fpp-table-container">
              <table class="fpp-table">
                <thead>
                  <tr>
                    <th>Savings</th>
                    <th>Monthly Income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="fpp-val-mono" id="fpp-tbl-savings">${currSym}${Number(buyerSavings).toLocaleString(AppState.getLocale())}</td>
                    <td class="fpp-val-mono" id="fpp-tbl-income">${currSym}${Number(buyerIncome).toLocaleString(AppState.getLocale())}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="fpp-status">
              <p style="font-size: 1.05rem;" id="fpp-affordability-status-line">
                Affordability: <span class="fpp-surplus" id="fpp-verdict-highlight">Surplus +₹2,50,000</span>
              </p>
              <span id="fpp-subtext-buyer" style="font-size: 0.78rem; color: var(--emerald);">Down payment of ₹4,00,000 fully covered by available savings.</span>
            </div>
          </div>
        </div>

        <!-- Overall Verdict Banner -->
        <div class="fpp-decision-banner" id="fpp-decision-banner">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div id="fpp-decision-badge" style="font-size: 1.8rem;">✅</div>
            <div>
              <h4 id="fpp-decision-title" style="font-size: 1.05rem; font-weight: 800; margin-bottom: 2px;">Purchase Viability: Approved</h4>
              <p id="fpp-decision-desc" style="font-size: 0.84rem; color: var(--text-secondary); max-width: 600px;">
                Down payment of ₹4,00,000 is comfortably covered by ₹6,50,000 liquid savings, and monthly EMI is well within safe income ratios.
              </p>
            </div>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <div style="background: var(--bg-surface); padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
              <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Upfront Cash Position</span>
              <strong id="fpp-stat-upfront" class="fpp-surplus" style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem;">+₹2,50,000</strong>
            </div>
            <div style="background: var(--bg-surface); padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column;">
              <span style="font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Monthly FOIR</span>
              <strong id="fpp-stat-foir" style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; color: var(--emerald);">41.4%</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderFlatPurchasePlannerUi(calc) {
    return this.renderHomePurchasePlannerUi(calc);
  },

  initHomePurchasePlannerBehavior(calc) {
    const currSym = AppState.getCurrencySymbol();
    AppState.calcInputs = AppState.calcInputs || {};
    AppState.tenureUnits = AppState.tenureUnits || {};

    let flatPrice = AppState.calcInputs.flatPrice !== undefined ? Number(AppState.calcInputs.flatPrice) : 4000000;
    let downPct = AppState.calcInputs.downPaymentPct !== undefined ? Number(AppState.calcInputs.downPaymentPct) : 10;
    let loanRate = AppState.calcInputs.interestRate !== undefined ? Number(AppState.calcInputs.interestRate) : 8.5;
    let tenureVal = AppState.calcInputs.loanTenure !== undefined ? Number(AppState.calcInputs.loanTenure) : 25;
    let buyerSavings = AppState.calcInputs.buyerSavings !== undefined ? Number(AppState.calcInputs.buyerSavings) : 650000;
    let buyerIncome = AppState.calcInputs.buyerIncome !== undefined ? Number(AppState.calcInputs.buyerIncome) : 70000;
    let buyerObligations = AppState.calcInputs.buyerObligations !== undefined ? Number(AppState.calcInputs.buyerObligations) : 0;
    let tenureUnit = AppState.tenureUnits['fpp-tenure'] || 'years';

    // -------------------------------------------------------------
    // 1. DEVELOPER SCHEDULE MILESTONES & GENERATE FUNCTION
    // -------------------------------------------------------------
    const MILESTONE_PRESETS = {
      clp: [
        { name: "Booking & Foundation", percent: 20, dueDate: "01-Nov-2026" },
        { name: "Structure Slabs", percent: 40, dueDate: "01-Jul-2027" },
        { name: "Brickwork & Finishing", percent: 30, dueDate: "01-Jan-2028" },
        { name: "Possession & Handover", percent: 10, dueDate: "01-Oct-2028" }
      ],
      subvention: [
        { name: "Booking / Advance", percent: 20, dueDate: "01-Nov-2026" },
        { name: "Possession & Handover", percent: 80, dueDate: "01-Oct-2028" }
      ],
      ninety: [
        { name: "Booking / Advance", percent: 10, dueDate: "01-Nov-2026" },
        { name: "Possession & Handover", percent: 90, dueDate: "01-Oct-2028" }
      ],
      empty: []
    };

    function generateDeveloperSchedule(milestones) {
      const tbody = document.querySelector("#developerSchedule tbody") || document.getElementById("fpp-milestones-body");
      if (!milestones || milestones.length === 0) {
        if (tbody) {
          tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted, #94a3b8); padding: 16px 8px; font-style: italic;">No developer schedule available</td></tr>`;
        }
        return [{ milestone: "No schedule available", amountDue: 0, dueDate: "-" }];
      }

      if (tbody) {
        tbody.innerHTML = "";
        milestones.forEach(m => {
          const row = `<tr>
            <td style="text-align: left; font-weight: 500;">${m.name}</td>
            <td style="font-family: 'JetBrains Mono', monospace; font-weight: 600;">${m.percent}%</td>
            <td style="color: var(--text-secondary); font-size: 0.82rem;">${m.dueDate}</td>
          </tr>`;
          tbody.innerHTML += row;
        });
      }

      return milestones.map(m => ({
        milestone: m.name,
        amountDue: (m.percent / 100),
        dueDate: m.dueDate
      }));
    }

    // Expose globally for direct integration testing
    window.generateDeveloperSchedule = generateDeveloperSchedule;

    // Milestone preset buttons (CLP, 20:80, 10:90, Clear)
    const planChips = document.querySelectorAll('[data-fpp-plan]');
    planChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const planKey = chip.getAttribute('data-fpp-plan');
        planChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const selected = MILESTONE_PRESETS[planKey] || [];
        generateDeveloperSchedule(selected);
      });
    });

    // Populate default developer schedule
    generateDeveloperSchedule(MILESTONE_PRESETS.clp);

    // -------------------------------------------------------------
    // 2. FULLSCREEN PROTOTYPE VIEW TOGGLE & ESC / OVERLAY HANDLERS
    // -------------------------------------------------------------
    function toggleFullscreen() {
      const container = document.getElementById("plannerContainer");
      const closeBtn = document.getElementById("closeBtn");
      const overlay = document.getElementById("overlay");
      const fsHeader = document.getElementById("hppFullscreenHeader");

      if (!container) return;

      if (container.classList.contains("fullscreen")) {
        container.classList.add("fadeOut");
        if (overlay) overlay.style.display = "none";
        setTimeout(() => {
          container.classList.remove("fullscreen", "fadeOut");
          if (closeBtn) closeBtn.style.display = "none";
          if (fsHeader) fsHeader.style.display = "none";
        }, 400);
      } else {
        container.classList.add("fullscreen");
        if (overlay) overlay.style.display = "block";
        if (closeBtn) closeBtn.style.display = "inline-flex";
        if (fsHeader) fsHeader.style.display = "flex";
      }
    }

    function exitFullscreen() {
      const container = document.getElementById("plannerContainer");
      const closeBtn = document.getElementById("closeBtn");
      const overlay = document.getElementById("overlay");
      const fsHeader = document.getElementById("hppFullscreenHeader");

      if (container && container.classList.contains("fullscreen")) {
        container.classList.add("fadeOut");
        if (overlay) overlay.style.display = "none";
        setTimeout(() => {
          container.classList.remove("fullscreen", "fadeOut");
          if (closeBtn) closeBtn.style.display = "none";
          if (fsHeader) fsHeader.style.display = "none";
        }, 400);
      }
    }

    // Expose fullscreen methods globally
    window.toggleFullscreen = toggleFullscreen;
    window.exitFullscreen = exitFullscreen;

    // Wire up Fullscreen button
    const btnFullscreen = document.getElementById("btn-toggle-fullscreen");
    if (btnFullscreen) {
      btnFullscreen.addEventListener("click", toggleFullscreen);
    }

    // Wire up Close button
    const closeBtn = document.getElementById("closeBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", exitFullscreen);
    }

    // Click-outside overlay close
    const overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.addEventListener("click", exitFullscreen);
    }

    // ESC key shortcut
    const escKeyHandler = (e) => {
      if (e.key === "Escape") {
        exitFullscreen();
      }
    };
    document.removeEventListener("keydown", escKeyHandler);
    document.addEventListener("keydown", escKeyHandler);

    // -------------------------------------------------------------
    // 3. MASTER CALCULATIONS & INPUT LISTENERS
    // -------------------------------------------------------------
    const flatPriceInput = document.getElementById('fpp-flat-price');
    const chipBtns = document.querySelectorAll('.fpp-chip-btn[data-val]');
    const sliderDown = document.getElementById('fpp-slider-downpayment');
    const sliderRate = document.getElementById('fpp-slider-rate');
    const sliderTenure = document.getElementById('fpp-slider-tenure');
    const sliderSavings = document.getElementById('fpp-slider-savings');
    const sliderIncome = document.getElementById('fpp-slider-income');
    const sliderObligations = document.getElementById('fpp-slider-obligations');
    const btnTenureYr = document.getElementById('fpp-btn-tenure-yr');
    const btnTenureMo = document.getElementById('fpp-btn-tenure-mo');

    const updateCalculations = () => {
      const requiredDown = flatPrice * (downPct / 100);
      const loanAmount = Math.max(0, flatPrice - requiredDown);
      const tenureMonths = tenureUnit === 'years' ? Math.round(tenureVal * 12) : Math.round(tenureVal);

      // EMI
      const r = loanRate / 12 / 100;
      const emi = r > 0 && tenureMonths > 0 
        ? (loanAmount * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1)
        : (tenureMonths > 0 ? loanAmount / tenureMonths : 0);
      const totalPayment = emi * tenureMonths;
      const totalInterest = Math.max(0, totalPayment - loanAmount);

      // Affordability
      const upfrontDiff = buyerSavings - requiredDown;
      const isShortfall = upfrontDiff < 0;
      const safeMaxEmi = Math.max(0, (buyerIncome * 0.50) - buyerObligations);
      const monthlyDiff = safeMaxEmi - emi;
      const foir = buyerIncome > 0 ? ((emi + buyerObligations) / buyerIncome) * 100 : 0;

      // Update DOM
      const dispDown = document.getElementById('fpp-disp-downpayment');
      if (dispDown) dispDown.textContent = `${downPct}% (${currSym}${Math.round(requiredDown).toLocaleString(AppState.getLocale())})`;

      const dispRate = document.getElementById('fpp-disp-rate');
      if (dispRate) dispRate.textContent = `${loanRate}%`;

      const dispTenure = document.getElementById('fpp-disp-tenure');
      if (dispTenure) dispTenure.textContent = `${tenureVal} ${tenureUnit === 'years' ? 'Yrs' : 'Mos'}`;

      const dispSavings = document.getElementById('fpp-disp-savings');
      if (dispSavings) dispSavings.textContent = `${currSym}${Number(buyerSavings).toLocaleString(AppState.getLocale())}`;

      const dispIncome = document.getElementById('fpp-disp-income');
      if (dispIncome) dispIncome.textContent = `${currSym}${Number(buyerIncome).toLocaleString(AppState.getLocale())}`;

      const dispOblig = document.getElementById('fpp-disp-obligations');
      if (dispOblig) dispOblig.textContent = `${currSym}${Number(buyerObligations).toLocaleString(AppState.getLocale())}`;

      const tblAmt = document.getElementById('fpp-tbl-loan-amt');
      if (tblAmt) tblAmt.textContent = `${currSym}${Math.round(loanAmount).toLocaleString(AppState.getLocale())}`;

      const tblRate = document.getElementById('fpp-tbl-loan-rate');
      if (tblRate) tblRate.textContent = `${loanRate}%`;

      const tblTenure = document.getElementById('fpp-tbl-loan-tenure');
      if (tblTenure) tblTenure.textContent = `${tenureVal} ${tenureUnit === 'years' ? 'yrs' : 'mos'}`;

      const emiLine = document.getElementById('fpp-emi-status-line');
      if (emiLine) emiLine.textContent = `Monthly EMI: ${currSym}${Math.round(emi).toLocaleString(AppState.getLocale())}`;

      const subtextLoan = document.getElementById('fpp-subtext-loan');
      if (subtextLoan) subtextLoan.textContent = `Total Interest: ${currSym}${Math.round(totalInterest).toLocaleString(AppState.getLocale())}`;

      const tblSav = document.getElementById('fpp-tbl-savings');
      if (tblSav) tblSav.textContent = `${currSym}${Number(buyerSavings).toLocaleString(AppState.getLocale())}`;

      const tblInc = document.getElementById('fpp-tbl-income');
      if (tblInc) tblInc.textContent = `${currSym}${Number(buyerIncome).toLocaleString(AppState.getLocale())}`;

      const totalDemand = document.getElementById('fpp-total-demand-label');
      if (totalDemand) totalDemand.textContent = `${currSym}${Math.round(flatPrice).toLocaleString(AppState.getLocale())}`;

      const verdictHighlight = document.getElementById('fpp-verdict-highlight');
      if (verdictHighlight) {
        if (isShortfall) {
          verdictHighlight.className = 'fpp-shortfall';
          verdictHighlight.textContent = `Shortfall ${currSym}${Math.round(Math.abs(upfrontDiff)).toLocaleString(AppState.getLocale())}`;
        } else {
          verdictHighlight.className = 'fpp-surplus';
          verdictHighlight.textContent = `Surplus +${currSym}${Math.round(upfrontDiff).toLocaleString(AppState.getLocale())}`;
        }
      }

      const subtextBuyer = document.getElementById('fpp-subtext-buyer');
      if (subtextBuyer) {
        if (isShortfall) {
          subtextBuyer.style.color = '#ef4444';
          subtextBuyer.textContent = `Down payment required is ${currSym}${Math.round(requiredDown).toLocaleString(AppState.getLocale())} vs ${currSym}${Math.round(buyerSavings).toLocaleString(AppState.getLocale())} available.`;
        } else {
          subtextBuyer.style.color = 'var(--emerald)';
          subtextBuyer.textContent = `Down payment of ${currSym}${Math.round(requiredDown).toLocaleString(AppState.getLocale())} fully covered by available savings.`;
        }
      }

      const statUpfront = document.getElementById('fpp-stat-upfront');
      if (statUpfront) {
        statUpfront.textContent = (isShortfall ? '-' : '+') + `${currSym}${Math.round(Math.abs(upfrontDiff)).toLocaleString(AppState.getLocale())}`;
        statUpfront.className = isShortfall ? 'fpp-shortfall' : 'fpp-surplus';
      }

      const statFoir = document.getElementById('fpp-stat-foir');
      if (statFoir) {
        statFoir.textContent = `${foir.toFixed(1)}%`;
        statFoir.style.color = foir > 55 ? '#ef4444' : (foir > 45 ? 'var(--amber)' : 'var(--emerald)');
      }

      const badge = document.getElementById('fpp-decision-badge');
      const title = document.getElementById('fpp-decision-title');
      const desc = document.getElementById('fpp-decision-desc');
      if (badge && title && desc) {
        if (isShortfall && monthlyDiff < 0) {
          badge.textContent = '⚠️';
          title.textContent = 'High Financial Burden: Dual Shortfall';
          desc.textContent = `You face an upfront down payment deficit of ${currSym}${Math.round(Math.abs(upfrontDiff)).toLocaleString(AppState.getLocale())} and projected EMI consumes ${foir.toFixed(1)}% of your monthly take-home.`;
        } else if (isShortfall) {
          badge.textContent = '⚠️';
          title.textContent = 'Action Required: Upfront Down Payment Shortfall';
          desc.textContent = `You require ${currSym}${Math.round(requiredDown).toLocaleString(AppState.getLocale())} for the ${downPct}% down payment, creating a gap of ${currSym}${Math.round(Math.abs(upfrontDiff)).toLocaleString(AppState.getLocale())}.`;
        } else if (monthlyDiff < 0) {
          badge.textContent = '⚠️';
          title.textContent = 'Stretched Cashflow: High Monthly EMI';
          desc.textContent = `Down payment is covered, but monthly EMI of ${currSym}${Math.round(emi).toLocaleString(AppState.getLocale())} exceeds 50% safe borrowing guidelines.`;
        } else {
          badge.textContent = '✅';
          title.textContent = 'Purchase Viability: Approved';
          desc.textContent = `Down payment of ${currSym}${Math.round(requiredDown).toLocaleString(AppState.getLocale())} is comfortably funded (+${currSym}${Math.round(upfrontDiff).toLocaleString(AppState.getLocale())} surplus) and monthly EMI is well within safe income ratios.`;
        }
      }

      // Persist state
      AppState.calcInputs.flatPrice = flatPrice;
      AppState.calcInputs.downPaymentPct = downPct;
      AppState.calcInputs.interestRate = loanRate;
      AppState.calcInputs.loanTenure = tenureUnit === 'years' ? tenureVal : (tenureVal / 12);
      AppState.calcInputs.buyerSavings = buyerSavings;
      AppState.calcInputs.buyerIncome = buyerIncome;
      AppState.calcInputs.buyerObligations = buyerObligations;
    };

    if (flatPriceInput) {
      flatPriceInput.addEventListener('input', () => {
        flatPrice = parseFloat(flatPriceInput.value) || 4000000;
        chipBtns.forEach(b => b.classList.toggle('active', parseFloat(b.getAttribute('data-val')) === flatPrice));
        updateCalculations();
      });
    }

    chipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        flatPrice = parseFloat(btn.getAttribute('data-val')) || 4000000;
        if (flatPriceInput) flatPriceInput.value = flatPrice;
        chipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCalculations();
      });
    });

    if (sliderDown) {
      sliderDown.addEventListener('input', () => {
        downPct = parseFloat(sliderDown.value) || 10;
        updateCalculations();
      });
    }

    if (sliderRate) {
      sliderRate.addEventListener('input', () => {
        loanRate = parseFloat(sliderRate.value) || 8.5;
        updateCalculations();
      });
    }

    // Tenure Toggle Pill (Years <-> Months)
    if (btnTenureYr) {
      btnTenureYr.addEventListener('click', () => {
        if (tenureUnit === 'years') return;
        tenureUnit = 'years';
        AppState.tenureUnits['fpp-tenure'] = 'years';
        btnTenureYr.classList.add('active');
        if (btnTenureMo) btnTenureMo.classList.remove('active');
        tenureVal = Math.max(1, Math.min(30, Math.round(tenureVal / 12) || 25));
        if (sliderTenure) {
          sliderTenure.min = "1";
          sliderTenure.max = "30";
          sliderTenure.step = "1";
          sliderTenure.value = tenureVal;
        }
        const lbl = document.getElementById('fpp-label-tenure');
        if (lbl) lbl.textContent = 'Tenure (Years)';
        updateCalculations();
      });
    }

    if (btnTenureMo) {
      btnTenureMo.addEventListener('click', () => {
        if (tenureUnit === 'months') return;
        tenureUnit = 'months';
        AppState.tenureUnits['fpp-tenure'] = 'months';
        btnTenureMo.classList.add('active');
        if (btnTenureYr) btnTenureYr.classList.remove('active');
        tenureVal = Math.max(12, Math.min(360, Math.round(tenureVal * 12) || 300));
        if (sliderTenure) {
          sliderTenure.min = "12";
          sliderTenure.max = "360";
          sliderTenure.step = "6";
          sliderTenure.value = tenureVal;
        }
        const lbl = document.getElementById('fpp-label-tenure');
        if (lbl) lbl.textContent = 'Tenure (Months)';
        updateCalculations();
      });
    }

    if (sliderTenure) {
      sliderTenure.addEventListener('input', () => {
        tenureVal = parseFloat(sliderTenure.value) || (tenureUnit === 'years' ? 25 : 300);
        updateCalculations();
      });
    }

    if (sliderSavings) {
      sliderSavings.addEventListener('input', () => {
        buyerSavings = parseFloat(sliderSavings.value) || 650000;
        updateCalculations();
      });
    }

    if (sliderIncome) {
      sliderIncome.addEventListener('input', () => {
        buyerIncome = parseFloat(sliderIncome.value) || 70000;
        updateCalculations();
      });
    }

    if (sliderObligations) {
      sliderObligations.addEventListener('input', () => {
        buyerObligations = parseFloat(sliderObligations.value) || 0;
        updateCalculations();
      });
    }

    // Initial Compute
    updateCalculations();
  },

  initFlatPurchasePlannerBehavior(calc) {
    this.initHomePurchasePlannerBehavior(calc);
  },

  resetHomePurchasePlanner(calc) {
    AppState.calcInputs.flatPrice = 4000000;
    AppState.calcInputs.downPaymentPct = 10;
    AppState.calcInputs.interestRate = 8.5;
    AppState.calcInputs.loanTenure = 25;
    AppState.calcInputs.buyerSavings = 650000;
    AppState.calcInputs.buyerIncome = 70000;
    AppState.calcInputs.buyerObligations = 0;
    if (AppState.tenureUnits) AppState.tenureUnits['fpp-tenure'] = 'years';
    this.initHomePurchasePlannerBehavior(calc);
  },

  resetFlatPurchasePlanner(calc) {
    this.resetHomePurchasePlanner(calc);
  },

  // ==========================================
  // COMPARE EMI LOANS CUSTOM UI & BEHAVIOR
  // ==========================================
  renderCompareLoanUi(calc) {
    const currSym = AppState.getCurrencySymbol();
    const loanAAmount = AppState.calcInputs.loanAmountA !== undefined ? AppState.calcInputs.loanAmountA : 2000000;
    const loanARate = AppState.calcInputs.interestRateA !== undefined ? AppState.calcInputs.interestRateA : 8.5;
    const loanATenure = AppState.calcInputs.tenureYearsA !== undefined ? AppState.calcInputs.tenureYearsA : 15;
    const loanAFee = AppState.calcInputs.feeA !== undefined ? AppState.calcInputs.feeA : 0.5;

    const loanBAmount = AppState.calcInputs.loanAmountB !== undefined ? AppState.calcInputs.loanAmountB : 2000000;
    const loanBRate = AppState.calcInputs.interestRateB !== undefined ? AppState.calcInputs.interestRateB : 8.75;
    const loanBTenure = AppState.calcInputs.tenureYearsB !== undefined ? AppState.calcInputs.tenureYearsB : 15;
    const loanBFee = AppState.calcInputs.feeB !== undefined ? AppState.calcInputs.feeB : 0.25;

    return `
      <div class="compare-loans-container">
        <!-- Two-Column Grid: Left Column -> Loan A, Right Column -> Loan B -->
        <div class="compare-loans-grid">
          
          <!-- Loan A Card -->
          <div class="compare-loan-card loan-a glass-panel">
            <div class="compare-column-header">
              <h3 class="compare-column-title" style="color: #00bfff;">
                ${getIconSvg('wallet', 20)} Loan A
              </h3>
              <span class="badge" style="background: rgba(0, 191, 255, 0.15); color: #00bfff; border: 1px solid rgba(0, 191, 255, 0.3); font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: 999px; font-weight: 700;">
                Offer Option 1
              </span>
            </div>

            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-loanAmountA">Loan Amount (${currSym})</label>
                <span class="form-value-display" id="val-display-loanAmountA">${currSym}${Number(loanAAmount).toLocaleString(AppState.getLocale())}</span>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <span class="input-addon-prefix">${currSym}</span>
                  <input type="number" class="form-input has-prefix" id="input-loanAmountA" data-id="loanAmountA" value="${loanAAmount}" min="10000" max="50000000" step="25000">
                </div>
                <input type="range" class="form-range-slider" id="range-loanAmountA" data-id="loanAmountA" value="${loanAAmount}" min="10000" max="50000000" step="25000" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-loanAmountA"></div>
            </div>

            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-interestRateA">Interest Rate (%)</label>
                <span class="form-value-display" id="val-display-interestRateA">${loanARate}%</span>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <input type="number" class="form-input has-suffix" id="input-interestRateA" data-id="interestRateA" value="${loanARate}" min="1" max="30" step="0.05">
                  <span class="input-addon-suffix">%</span>
                </div>
                <input type="range" class="form-range-slider" id="range-interestRateA" data-id="interestRateA" value="${loanARate}" min="1" max="30" step="0.05" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-interestRateA"></div>
            </div>

            ${(() => {
              AppState.tenureUnits = AppState.tenureUnits || {};
              const unitA = AppState.tenureUnits.tenureYearsA || 'years';
              const isMosA = unitA === 'months';
              const valA = isMosA ? Math.round(Number(loanATenure) * (loanATenure <= 30 ? 12 : 1)) : loanATenure;
              const minA = isMosA ? 12 : 1;
              const maxA = isMosA ? 360 : 30;
              const suffixA = isMosA ? 'Mos' : 'Yrs';
              return `
            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-tenureYearsA">
                  <span id="label-text-tenureYearsA">${isMosA ? 'Loan A Tenure (Months)' : 'Loan A Tenure (Years)'}</span>
                </label>
                <div class="form-label-controls">
                  <div class="tenure-toggle-container" id="tenure-toggle-tenureYearsA" role="group" aria-label="Loan A tenure toggle">
                    <button type="button" class="tenure-unit-btn ${!isMosA ? 'active' : ''}" data-compare-field="tenureYearsA" data-unit="years" aria-pressed="${!isMosA}">Yr</button>
                    <button type="button" class="tenure-unit-btn ${isMosA ? 'active' : ''}" data-compare-field="tenureYearsA" data-unit="months" aria-pressed="${isMosA}">Mo</button>
                  </div>
                  <span class="form-value-display" id="val-display-tenureYearsA">${valA} ${suffixA}</span>
                </div>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <input type="number" class="form-input has-suffix" id="input-tenureYearsA" data-id="tenureYearsA" value="${valA}" min="${minA}" max="${maxA}" step="1">
                  <span class="input-addon-suffix">${suffixA}</span>
                </div>
                <input type="range" class="form-range-slider" id="range-tenureYearsA" data-id="tenureYearsA" value="${valA}" min="${minA}" max="${maxA}" step="1" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-tenureYearsA"></div>
            </div>`;
            })()}

            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-feeA">Processing Fee (%)</label>
                <span class="form-value-display" id="val-display-feeA">${loanAFee}%</span>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <input type="number" class="form-input has-suffix" id="input-feeA" data-id="feeA" value="${loanAFee}" min="0" max="5" step="0.1">
                  <span class="input-addon-suffix">%</span>
                </div>
                <input type="range" class="form-range-slider" id="range-feeA" data-id="feeA" value="${loanAFee}" min="0" max="5" step="0.1" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-feeA"></div>
            </div>

            <!-- Results Panel for Loan A -->
            <div class="compare-loan-results-panel" id="compare-results-panel-a">
              <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 700; color: #00bfff; margin-bottom: 0.75rem;">
                Loan A Results
              </div>
              <div class="compare-results-grid">
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Monthly EMI</span>
                  <span class="compare-metric-value-lg" id="res-loanA-emi" style="color: #00bfff;">₹19,694.79</span>
                </div>
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Total Payment</span>
                  <span class="compare-metric-value-lg" id="res-loanA-totalPayment" style="color: #ffffff;">₹35,45,062.41</span>
                </div>
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Total Interest</span>
                  <span class="compare-metric-value-sm" id="res-loanA-interest" style="color: #94a3b8;">₹15,45,062.41</span>
                </div>
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Fee Amount</span>
                  <span class="compare-metric-value-sm" id="res-loanA-fee" style="color: #f59e0b;">₹10,000.00</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Loan B Card -->
          <div class="compare-loan-card loan-b glass-panel">
            <div class="compare-column-header">
              <h3 class="compare-column-title" style="color: #00bfff;">
                ${getIconSvg('award', 20)} Loan B
              </h3>
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: 999px; font-weight: 700;">
                Offer Option 2
              </span>
            </div>

            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-loanAmountB">Loan Amount (${currSym})</label>
                <span class="form-value-display" id="val-display-loanAmountB">${currSym}${Number(loanBAmount).toLocaleString(AppState.getLocale())}</span>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <span class="input-addon-prefix">${currSym}</span>
                  <input type="number" class="form-input has-prefix" id="input-loanAmountB" data-id="loanAmountB" value="${loanBAmount}" min="10000" max="50000000" step="25000">
                </div>
                <input type="range" class="form-range-slider" id="range-loanAmountB" data-id="loanAmountB" value="${loanBAmount}" min="10000" max="50000000" step="25000" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-loanAmountB"></div>
            </div>

            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-interestRateB">Interest Rate (%)</label>
                <span class="form-value-display" id="val-display-interestRateB">${loanBRate}%</span>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <input type="number" class="form-input has-suffix" id="input-interestRateB" data-id="interestRateB" value="${loanBRate}" min="1" max="30" step="0.05">
                  <span class="input-addon-suffix">%</span>
                </div>
                <input type="range" class="form-range-slider" id="range-interestRateB" data-id="interestRateB" value="${loanBRate}" min="1" max="30" step="0.05" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-interestRateB"></div>
            </div>

            ${(() => {
              AppState.tenureUnits = AppState.tenureUnits || {};
              const unitB = AppState.tenureUnits.tenureYearsB || 'years';
              const isMosB = unitB === 'months';
              const valB = isMosB ? Math.round(Number(loanBTenure) * (loanBTenure <= 30 ? 12 : 1)) : loanBTenure;
              const minB = isMosB ? 12 : 1;
              const maxB = isMosB ? 360 : 30;
              const suffixB = isMosB ? 'Mos' : 'Yrs';
              return `
            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-tenureYearsB">
                  <span id="label-text-tenureYearsB">${isMosB ? 'Loan B Tenure (Months)' : 'Loan B Tenure (Years)'}</span>
                </label>
                <div class="form-label-controls">
                  <div class="tenure-toggle-container" id="tenure-toggle-tenureYearsB" role="group" aria-label="Loan B tenure toggle">
                    <button type="button" class="tenure-unit-btn ${!isMosB ? 'active' : ''}" data-compare-field="tenureYearsB" data-unit="years" aria-pressed="${!isMosB}">Yr</button>
                    <button type="button" class="tenure-unit-btn ${isMosB ? 'active' : ''}" data-compare-field="tenureYearsB" data-unit="months" aria-pressed="${isMosB}">Mo</button>
                  </div>
                  <span class="form-value-display" id="val-display-tenureYearsB">${valB} ${suffixB}</span>
                </div>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <input type="number" class="form-input has-suffix" id="input-tenureYearsB" data-id="tenureYearsB" value="${valB}" min="${minB}" max="${maxB}" step="1">
                  <span class="input-addon-suffix">${suffixB}</span>
                </div>
                <input type="range" class="form-range-slider" id="range-tenureYearsB" data-id="tenureYearsB" value="${valB}" min="${minB}" max="${maxB}" step="1" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-tenureYearsB"></div>
            </div>`;
            })()}

            <div class="compare-form-group">
              <div class="form-label-row">
                <label class="form-label" for="input-feeB">Processing Fee (%)</label>
                <span class="form-value-display" id="val-display-feeB">${loanBFee}%</span>
              </div>
              <div class="compare-input-controls">
                <div class="input-with-addons" style="flex: 1;">
                  <input type="number" class="form-input has-suffix" id="input-feeB" data-id="feeB" value="${loanBFee}" min="0" max="5" step="0.1">
                  <span class="input-addon-suffix">%</span>
                </div>
                <input type="range" class="form-range-slider" id="range-feeB" data-id="feeB" value="${loanBFee}" min="0" max="5" step="0.1" style="flex: 1.2;">
              </div>
              <div class="field-validation-msg" id="validation-msg-feeB"></div>
            </div>

            <!-- Results Panel for Loan B -->
            <div class="compare-loan-results-panel" id="compare-results-panel-b">
              <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 700; color: #00bfff; margin-bottom: 0.75rem;">
                Loan B Results
              </div>
              <div class="compare-results-grid">
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Monthly EMI</span>
                  <span class="compare-metric-value-lg" id="res-loanB-emi" style="color: #00bfff;">₹19,988.97</span>
                </div>
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Total Payment</span>
                  <span class="compare-metric-value-lg" id="res-loanB-totalPayment" style="color: #ffffff;">₹35,98,015.14</span>
                </div>
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Total Interest</span>
                  <span class="compare-metric-value-sm" id="res-loanB-interest" style="color: #94a3b8;">₹15,98,015.14</span>
                </div>
                <div class="compare-metric-box">
                  <span class="compare-metric-label">Fee Amount</span>
                  <span class="compare-metric-value-sm" id="res-loanB-fee" style="color: #f59e0b;">₹5,000.00</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Comparison Summary Row (Placed directly below the two columns) -->
        <div class="compare-summary-card glass-panel" id="compare-summary-panel">
          <div class="compare-summary-header">
            <h3 class="compare-summary-title" style="color: #00bfff;">
              ${getIconSvg('refresh-cw', 20)} Comparison Summary
            </h3>
            <div id="compare-summary-recommendation" class="compare-recommendation-pill">
              ${getIconSvg('check', 14)} Loan A saves ₹47,952.73 overall
            </div>
          </div>

          <!-- Differences Grid: EMI, Total Interest, Total Payment in BOLD -->
          <div class="compare-diff-grid">
            <div class="compare-diff-box">
              <div class="compare-diff-title">EMI Difference</div>
              <div class="compare-diff-amount" id="diff-emi-amt" style="font-size: 20px; font-weight: 800;">₹294.18/mo</div>
              <div class="compare-diff-sub" id="diff-emi-sub">Lower for Loan A</div>
            </div>
            <div class="compare-diff-box">
              <div class="compare-diff-title">Total Interest Difference</div>
              <div class="compare-diff-amount" id="diff-interest-amt" style="font-size: 20px; font-weight: 800;">₹52,952.73</div>
              <div class="compare-diff-sub" id="diff-interest-sub">Lower for Loan A</div>
            </div>
            <div class="compare-diff-box">
              <div class="compare-diff-title">Total Payment Difference</div>
              <div class="compare-diff-amount" id="diff-payment-amt" style="font-size: 20px; font-weight: 800;">₹52,952.73</div>
              <div class="compare-diff-sub" id="diff-payment-sub">Lower for Loan A</div>
            </div>
          </div>

          <div class="compare-summary-footer">
            <div style="font-size: 0.85rem; color: var(--text-secondary); max-width: 65%;">
              💡 <em>Total lifetime cost comparison factors in all monthly EMIs plus non-refundable upfront processing charges.</em>
            </div>
            <!-- Copy Result button: positioned at bottom right of summary panel -->
            <button type="button" class="compare-copy-btn" id="compare-copy-result-btn" title="Copy Loan A, Loan B, and Comparison Summary">
              ${getIconSvg('copy', 16)}
              <span>Copy Result</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  initCompareLoanBehavior(calc) {
    const paramDefs = [
      { id: 'loanAmountA', default: 2000000, min: 10000, max: 50000000, step: 25000, prefix: '₹', label: 'Loan A Amount' },
      { id: 'interestRateA', default: 8.5, min: 1, max: 30, step: 0.05, suffix: '%', label: 'Loan A Interest Rate' },
      { id: 'tenureYearsA', default: 15, min: 1, max: 30, step: 1, suffix: 'Yrs', label: 'Loan A Tenure' },
      { id: 'feeA', default: 0.5, min: 0, max: 5, step: 0.1, suffix: '%', label: 'Loan A Processing Fee' },
      { id: 'loanAmountB', default: 2000000, min: 10000, max: 50000000, step: 25000, prefix: '₹', label: 'Loan B Amount' },
      { id: 'interestRateB', default: 8.75, min: 1, max: 30, step: 0.05, suffix: '%', label: 'Loan B Interest Rate' },
      { id: 'tenureYearsB', default: 15, min: 1, max: 30, step: 1, suffix: 'Yrs', label: 'Loan B Tenure' },
      { id: 'feeB', default: 0.25, min: 0, max: 5, step: 0.1, suffix: '%', label: 'Loan B Processing Fee' }
    ];

    // Ensure defaults in AppState.calcInputs
    paramDefs.forEach(p => {
      if (AppState.calcInputs[p.id] === undefined || AppState.calcInputs[p.id] === null || AppState.calcInputs[p.id] === '') {
        AppState.calcInputs[p.id] = p.default;
      }
    });

    const updateAndCompute = () => {
      const safeInputs = {};
      paramDefs.forEach(p => {
        let val = parseFloat(AppState.calcInputs[p.id]);
        if (isNaN(val)) {
          val = p.default;
        }
        if (p.id === 'tenureYearsA' || p.id === 'tenureYearsB') {
          const u = (AppState.tenureUnits && AppState.tenureUnits[p.id]) || 'years';
          if (u === 'months') {
            val = val / 12;
          }
        }
        safeInputs[p.id] = Math.min(Math.max(val, p.min), p.max);
      });

      const result = CalculatorEngine.compute('compare-loan-calculator', safeInputs);
      this.updateCompareLoanUi(result);

      if (result.primaryResult) {
        AppState.addHistory(calc.id, calc.title, result.primaryResult.value);
      }
    };

    this.updateCompareCalculation = updateAndCompute;

    // Attach tenure toggle button listeners for Loan A and Loan B
    document.querySelectorAll('.compare-loans-container .tenure-unit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const fieldId = btn.getAttribute('data-compare-field');
        const targetUnit = btn.getAttribute('data-unit');
        AppState.tenureUnits = AppState.tenureUnits || {};
        const currentUnit = AppState.tenureUnits[fieldId] || 'years';
        if (currentUnit === targetUnit) return;

        AppState.tenureUnits[fieldId] = targetUnit;
        const toggleWrap = document.getElementById(`tenure-toggle-${fieldId}`);
        if (toggleWrap) {
          toggleWrap.querySelectorAll('.tenure-unit-btn').forEach(b => {
            const isAct = b.getAttribute('data-unit') === targetUnit;
            b.classList.toggle('active', isAct);
            b.setAttribute('aria-pressed', isAct ? 'true' : 'false');
          });
        }

        const numEl = document.getElementById(`input-${fieldId}`);
        const rangeEl = document.getElementById(`range-${fieldId}`);
        const dispEl = document.getElementById(`val-display-${fieldId}`);
        const labelEl = document.getElementById(`label-text-${fieldId}`);
        const suffixEl = numEl?.parentElement?.querySelector('.input-addon-suffix');

        let val = parseFloat(AppState.calcInputs[fieldId]);
        if (isNaN(val)) val = 15;

        let newVal = val;
        let min = 1, max = 30, step = 1, suffix = 'Yrs';
        if (targetUnit === 'months') {
          newVal = Math.round(val * 12);
          min = 12; max = 360; step = 1; suffix = 'Mos';
          if (labelEl) labelEl.textContent = fieldId === 'tenureYearsA' ? 'Loan A Tenure (Months)' : 'Loan B Tenure (Months)';
        } else {
          newVal = Math.round((val / 12) * 10) / 10;
          min = 1; max = 30; step = 1; suffix = 'Yrs';
          if (labelEl) labelEl.textContent = fieldId === 'tenureYearsA' ? 'Loan A Tenure (Years)' : 'Loan B Tenure (Years)';
        }

        if (numEl) {
          numEl.min = min; numEl.max = max; numEl.step = step; numEl.value = newVal;
        }
        if (rangeEl) {
          rangeEl.min = min; rangeEl.max = max; rangeEl.step = step; rangeEl.value = newVal;
        }
        if (suffixEl) suffixEl.textContent = suffix;
        if (dispEl) dispEl.textContent = `${newVal} ${suffix}`;

        AppState.calcInputs[fieldId] = newVal;
        updateAndCompute();
      });
    });

    // Attach sync & validation listeners for both inputs and sliders
    paramDefs.forEach(p => {
      const numInput = document.getElementById(`input-${p.id}`);
      const rangeInput = document.getElementById(`range-${p.id}`);
      const valDisp = document.getElementById(`val-display-${p.id}`);
      const valMsg = document.getElementById(`validation-msg-${p.id}`);

      const handleValChange = (newVal, source) => {
        AppState.calcInputs[p.id] = newVal;

        const numVal = parseFloat(newVal);
        let isValid = true;
        if (newVal === '' || isNaN(numVal)) {
          isValid = false;
          if (valMsg) {
            valMsg.textContent = `Please enter a valid numeric value for ${p.label}.`;
            valMsg.style.display = 'block';
          }
          if (numInput) numInput.classList.add('has-error');
        } else {
          let effMin = p.min;
          let effMax = p.max;
          if (p.id === 'tenureYearsA' || p.id === 'tenureYearsB') {
            const u = (AppState.tenureUnits && AppState.tenureUnits[p.id]) || 'years';
            if (u === 'months') {
              effMin = 12; effMax = 360;
            }
          }
          if (numVal < effMin) {
            isValid = false;
            if (valMsg) {
              valMsg.textContent = this.getFieldValidationMessage(calc, p, 'min');
              valMsg.style.display = 'block';
            }
            if (numInput) numInput.classList.add('has-error');
          } else if (numVal > effMax) {
            isValid = false;
            if (valMsg) {
              valMsg.textContent = this.getFieldValidationMessage(calc, p, 'max');
              valMsg.style.display = 'block';
            }
            if (numInput) numInput.classList.add('has-error');
          }
        }

        if (isValid) {
          if (valMsg) {
            valMsg.style.display = 'none';
            valMsg.textContent = '';
          }
          if (numInput) numInput.classList.remove('has-error');
        }

        // Sync counterpart control
        if (source === 'number' && rangeInput && !isNaN(numVal)) {
          rangeInput.value = Math.min(Math.max(numVal, p.min), p.max);
        } else if (source === 'range' && numInput) {
          numInput.value = newVal;
        }

        // Update display text
        if (valDisp) {
          const currSym = AppState.getCurrencySymbol();
          if (p.prefix === '₹' || p.prefix === currSym) {
            const formatted = (!isNaN(numVal) && newVal !== '') ? Number(numVal).toLocaleString(AppState.getLocale()) : newVal;
            valDisp.textContent = `${currSym}${formatted}`;
          } else {
            valDisp.textContent = `${newVal}${p.suffix ? ' ' + p.suffix : ''}`;
          }
        }

        updateAndCompute();
      };

      if (numInput) {
        numInput.addEventListener('input', (e) => handleValChange(e.target.value, 'number'));
      }
      if (rangeInput) {
        rangeInput.addEventListener('input', (e) => handleValChange(e.target.value, 'range'));
      }
    });

    // Copy Result Button Event Listener
    const copyBtn = document.getElementById('compare-copy-result-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const safeInputs = {};
        paramDefs.forEach(p => {
          const val = parseFloat(AppState.calcInputs[p.id]);
          safeInputs[p.id] = (!isNaN(val)) ? Math.min(Math.max(val, p.min), p.max) : p.default;
        });
        const res = CalculatorEngine.compute('compare-loan-calculator', safeInputs);
        const lA = res.loanA;
        const lB = res.loanB;
        const comp = res.comparison;

        const summaryText = [
          '========================================',
          '        COMPARE EMI LOANS SUMMARY       ',
          '========================================',
          '',
          '[LOAN A OFFER]',
          `• Loan Amount:       ${lA.formatted.amount}`,
          `• Interest Rate:     ${lA.rate}%`,
          `• Loan Tenure:       ${lA.tenureYears} Years`,
          `• Processing Fee:    ${lA.feePercent}% (${lA.formatted.fee})`,
          `• Monthly EMI:       ${lA.formatted.emi}`,
          `• Total Interest:    ${lA.formatted.totalInterest}`,
          `• Total Payment:     ${lA.formatted.totalPayment}`,
          `• Lifetime Cost:     ${lA.formatted.totalCost}`,
          '',
          '[LOAN B OFFER]',
          `• Loan Amount:       ${lB.formatted.amount}`,
          `• Interest Rate:     ${lB.rate}%`,
          `• Loan Tenure:       ${lB.tenureYears} Years`,
          `• Processing Fee:    ${lB.feePercent}% (${lB.formatted.fee})`,
          `• Monthly EMI:       ${lB.formatted.emi}`,
          `• Total Interest:    ${lB.formatted.totalInterest}`,
          `• Total Payment:     ${lB.formatted.totalPayment}`,
          `• Lifetime Cost:     ${lB.formatted.totalCost}`,
          '',
          '[COMPARISON ANALYSIS]',
          `• Cheaper Option:    ${comp.betterLoan} saves ${comp.formattedSavings}`,
          `• EMI Difference:    ${comp.formattedEmiDiff}/month (Lower for ${comp.lowerEmiLoan})`,
          `• Interest Diff:     ${comp.formattedInterestDiff} (Lower for ${comp.lowerInterestLoan})`,
          `• Payment Diff:      ${comp.formattedPaymentDiff} (Lower for ${comp.lowerPaymentLoan})`,
          '',
          'Calculated on letscalculate.in'
        ].join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(summaryText)
            .then(() => this.showToast('Comparison results copied to clipboard!'))
            .catch(() => this.showToast('Calculation copied to clipboard!'));
        } else {
          const ta = document.createElement('textarea');
          ta.value = summaryText;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          this.showToast('Comparison results copied to clipboard!');
        }
      });
    }

    // Initial Compute & Render
    updateAndCompute();
  },

  updateCompareLoanUi(result) {
    if (!result || !result.loanA || !result.loanB || !result.comparison) return;

    const { loanA, loanB, comparison } = result;

    // Update Loan A Results
    const lAEmi = document.getElementById('res-loanA-emi');
    const lAPay = document.getElementById('res-loanA-totalPayment');
    const lAInt = document.getElementById('res-loanA-interest');
    const lAFee = document.getElementById('res-loanA-fee');

    if (lAEmi) lAEmi.textContent = loanA.formatted.emi;
    if (lAPay) lAPay.textContent = loanA.formatted.totalPayment;
    if (lAInt) lAInt.textContent = loanA.formatted.totalInterest;
    if (lAFee) lAFee.textContent = loanA.formatted.fee;

    // Update Loan B Results
    const lBEmi = document.getElementById('res-loanB-emi');
    const lBPay = document.getElementById('res-loanB-totalPayment');
    const lBInt = document.getElementById('res-loanB-interest');
    const lBFee = document.getElementById('res-loanB-fee');

    if (lBEmi) lBEmi.textContent = loanB.formatted.emi;
    if (lBPay) lBPay.textContent = loanB.formatted.totalPayment;
    if (lBInt) lBInt.textContent = loanB.formatted.totalInterest;
    if (lBFee) lBFee.textContent = loanB.formatted.fee;

    // Update Comparison Summary
    const recEl = document.getElementById('compare-summary-recommendation');
    if (recEl) {
      if (comparison.betterLoan === 'Both Equal') {
        recEl.innerHTML = `${getIconSvg('check', 14)} Both loan offers have identical lifetime costs`;
        recEl.style.borderColor = '#00bfff';
        recEl.style.color = '#00bfff';
        recEl.style.background = 'rgba(0, 191, 255, 0.15)';
      } else {
        const isA = comparison.betterLoan === 'Loan A';
        recEl.innerHTML = `${getIconSvg('check', 14)} ${comparison.betterLoan} saves ${comparison.formattedSavings} overall`;
        recEl.style.borderColor = isA ? '#00bfff' : '#10b981';
        recEl.style.color = isA ? '#00bfff' : '#10b981';
        recEl.style.background = isA ? 'rgba(0, 191, 255, 0.15)' : 'rgba(16, 185, 129, 0.15)';
      }
    }

    const diffEmiAmt = document.getElementById('diff-emi-amt');
    const diffEmiSub = document.getElementById('diff-emi-sub');
    if (diffEmiAmt) diffEmiAmt.textContent = `${comparison.formattedEmiDiff}/mo`;
    if (diffEmiSub) diffEmiSub.textContent = comparison.emiDiff === 0 ? 'Exact same EMI' : `Lower for ${comparison.lowerEmiLoan}`;

    const diffIntAmt = document.getElementById('diff-interest-amt');
    const diffIntSub = document.getElementById('diff-interest-sub');
    if (diffIntAmt) diffIntAmt.textContent = comparison.formattedInterestDiff;
    if (diffIntSub) diffIntSub.textContent = comparison.interestDiff === 0 ? 'Exact same interest' : `Lower for ${comparison.lowerInterestLoan}`;

    const diffPayAmt = document.getElementById('diff-payment-amt');
    const diffPaySub = document.getElementById('diff-payment-sub');
    if (diffPayAmt) diffPayAmt.textContent = comparison.formattedPaymentDiff;
    if (diffPaySub) diffPaySub.textContent = comparison.paymentDiff === 0 ? 'Exact same payment' : `Lower for ${comparison.lowerPaymentLoan}`;

    // Fade-in animation when recalculated
    const panels = [
      document.getElementById('compare-results-panel-a'),
      document.getElementById('compare-results-panel-b'),
      document.getElementById('compare-summary-panel')
    ];
    panels.forEach(p => {
      if (p) {
        p.classList.remove('compare-recalculated');
        void p.offsetWidth;
        p.classList.add('compare-recalculated');
      }
    });
  },

  resetCompareLoanCalculator(calc) {
    const defaultParams = {
      loanAmountA: 2000000,
      interestRateA: 8.5,
      tenureYearsA: 15,
      feeA: 0.5,
      loanAmountB: 2000000,
      interestRateB: 8.75,
      tenureYearsB: 15,
      feeB: 0.25
    };

    Object.keys(defaultParams).forEach(k => {
      const defVal = defaultParams[k];
      AppState.calcInputs[k] = defVal;

      const numEl = document.getElementById(`input-${k}`);
      if (numEl) {
        numEl.value = defVal;
        numEl.classList.remove('has-error');
      }

      const rngEl = document.getElementById(`range-${k}`);
      if (rngEl) {
        rngEl.value = defVal;
      }

      const valDisp = document.getElementById(`val-display-${k}`);
      if (valDisp) {
        if (k.startsWith('loanAmount')) {
          valDisp.textContent = `₹${Number(defVal).toLocaleString('en-IN')}`;
        } else if (k.startsWith('interestRate') || k.startsWith('fee')) {
          valDisp.textContent = `${defVal}%`;
        } else if (k.startsWith('tenureYears')) {
          valDisp.textContent = `${defVal} Yrs`;
        }
      }

      const valMsg = document.getElementById(`validation-msg-${k}`);
      if (valMsg) {
        valMsg.style.display = 'none';
        valMsg.textContent = '';
      }
    });

    const result = CalculatorEngine.compute('compare-loan-calculator', defaultParams);
    this.updateCompareLoanUi(result);
    this.showToast('Compare loans calculator reset to default values');
  },

  // ==========================================
  // REVERSE EMI CALCULATORS CUSTOM UI & BEHAVIOR
  // ==========================================
  renderReverseLoanUi(calc) {
    const mode = AppState.calcInputs.calcMode || 'period';
    const P = AppState.calcInputs.principal !== undefined ? AppState.calcInputs.principal : 1000000;
    const emi = AppState.calcInputs.monthlyEmi !== undefined ? AppState.calcInputs.monthlyEmi : 20517;
    const rate = AppState.calcInputs.interestRate !== undefined ? AppState.calcInputs.interestRate : 8.5;
    const tenureMonths = AppState.calcInputs.tenureMonths !== undefined ? AppState.calcInputs.tenureMonths : 60;
    const currSym = (typeof AppState !== 'undefined' && AppState.getCurrencySymbol) ? AppState.getCurrencySymbol() : '₹';
    const currLocale = (typeof AppState !== 'undefined' && AppState.getLocale) ? AppState.getLocale() : 'en-IN';

    return `
      <div class="reverse-loan-container">
        <!-- Mode Switcher Tabs: Calculate Period vs Calculate Interest Rate -->
        <div class="reverse-calc-mode-nav">
          <button type="button" class="reverse-mode-tab-btn ${mode === 'period' ? 'active' : ''}" id="mode-tab-period" data-mode="period">
            ${getIconSvg('clock', 18)}
            <span>Calculate Period (Tenure)</span>
          </button>
          <button type="button" class="reverse-mode-tab-btn ${mode === 'interest' ? 'active' : ''}" id="mode-tab-interest" data-mode="interest">
            ${getIconSvg('percent', 18)}
            <span>Calculate Interest Rate (ROI)</span>
          </button>
        </div>

        <!-- Edge Case Test Scenarios Bar -->
        <div class="reverse-scenarios-card glass-panel">
          <div class="reverse-scenarios-header">
            <span class="reverse-scenarios-title">
              ${getIconSvg('sparkles', 16)} Edge Case Test Scenarios
            </span>
            <span class="reverse-scenarios-hint">Click any preset to validate instantly:</span>
          </div>
          <div class="reverse-scenarios-grid">
            <button type="button" class="reverse-scenario-btn" id="scenario-btn-high-emi" title="Case 1: ₹10L, EMI ₹1L, ROI 9.5% → ≈ 11 Months">
              <span class="scenario-btn-badge">Case 1</span>
              <div class="scenario-btn-info">
                <strong>High EMI Case</strong>
                <small>₹10L Loan • ₹1L EMI • 9.5% ROI</small>
              </div>
              <span class="scenario-expected-tag">≈ 11 Mos</span>
            </button>

            <button type="button" class="reverse-scenario-btn" id="scenario-btn-low-roi" title="Case 2: ₹10L, EMI ₹15k, ROI 2% → ≈ 71 Months">
              <span class="scenario-btn-badge">Case 2</span>
              <div class="scenario-btn-info">
                <strong>Low ROI Case</strong>
                <small>₹10L Loan • ₹15k EMI • 2% ROI</small>
              </div>
              <span class="scenario-expected-tag">≈ 71 Mos</span>
            </button>

            <button type="button" class="reverse-scenario-btn" id="scenario-btn-short-tenure" title="Case 3: ₹5L, EMI ₹2.6L, 2 Months → Total ₹5.2L, Int ₹20k">
              <span class="scenario-btn-badge">Case 3</span>
              <div class="scenario-btn-info">
                <strong>Short Tenure Case</strong>
                <small>₹5L Loan • ₹2.6L EMI • 2 Mos</small>
              </div>
              <span class="scenario-expected-tag">₹20k Int</span>
            </button>

            <button type="button" class="reverse-scenario-btn warning" id="scenario-btn-invalid" title="Case 4: ₹10L, EMI ₹10k, ROI 12% → Triggers Validation Error">
              <span class="scenario-btn-badge warning">Case 4</span>
              <div class="scenario-btn-info">
                <strong>Invalid Case (EMI ≤ P×r)</strong>
                <small>₹10L Loan • ₹10k EMI • 12% ROI</small>
              </div>
              <span class="scenario-expected-tag warning">Error Alert</span>
            </button>
          </div>
        </div>

        <!-- 2-Column Workspace: Inputs & Dashboard -->
        <div class="calc-workspace-grid reverse-calc-grid">
          <!-- Inputs Column -->
          <div class="calc-inputs-card glass-panel">
            <div class="card-title">
              <span id="reverse-inputs-title">${mode === 'period' ? 'Period Calculator Inputs' : 'Interest Calculator Inputs'}</span>
              <button type="button" class="btn-secondary" id="reverse-reset-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
                Reset Default
              </button>
            </div>

            <form id="reverse-calc-form" onsubmit="event.preventDefault(); return false;">
              <!-- Field 1: Loan Amount (Always present) -->
              <div class="form-group" id="group-reverse-principal">
                <div class="form-label-row">
                  <label class="form-label" for="input-reverse-principal">Loan Amount (${currSym})</label>
                  <span class="form-value-display" id="val-display-reverse-principal">${currSym}${Number(P).toLocaleString(currLocale)}</span>
                </div>
                <div class="input-with-addons">
                  <span class="input-addon-prefix">${currSym}</span>
                  <input type="number" class="form-input has-prefix" id="input-reverse-principal" data-id="principal" value="${P}" min="10000" max="100000000" step="10000">
                </div>
                <input type="range" class="form-range-slider" id="range-reverse-principal" data-id="principal" value="${P}" min="10000" max="100000000" step="10000">
                <div class="field-validation-msg" id="validation-msg-reverse-principal"></div>
              </div>

              <!-- Field 2: Target Monthly EMI (Always present) -->
              <div class="form-group" id="group-reverse-monthlyEmi">
                <div class="form-label-row">
                  <label class="form-label" for="input-reverse-monthlyEmi">Monthly EMI (${currSym})</label>
                  <span class="form-value-display" id="val-display-reverse-monthlyEmi">${currSym}${Number(emi).toLocaleString(currLocale)}</span>
                </div>
                <div class="input-with-addons">
                  <span class="input-addon-prefix">${currSym}</span>
                  <input type="number" class="form-input has-prefix" id="input-reverse-monthlyEmi" data-id="monthlyEmi" value="${emi}" min="500" max="10000000" step="500">
                </div>
                <input type="range" class="form-range-slider" id="range-reverse-monthlyEmi" data-id="monthlyEmi" value="${emi}" min="500" max="10000000" step="500">
                <div class="field-validation-msg" id="validation-msg-reverse-monthlyEmi"></div>
              </div>

              <!-- Field 3A: Interest Rate ROI % (Only in Period Mode) -->
              <div class="form-group" id="group-reverse-interestRate" style="display: ${mode === 'period' ? 'block' : 'none'};">
                <div class="form-label-row">
                  <label class="form-label" for="input-reverse-interestRate">Interest Rate (ROI % p.a.)</label>
                  <span class="form-value-display" id="val-display-reverse-interestRate">${rate}%</span>
                </div>
                <div class="input-with-addons">
                  <input type="number" class="form-input has-suffix" id="input-reverse-interestRate" data-id="interestRate" value="${rate}" min="0.1" max="30" step="0.05">
                  <span class="input-addon-suffix">%</span>
                </div>
                <input type="range" class="form-range-slider" id="range-reverse-interestRate" data-id="interestRate" value="${rate}" min="0.1" max="30" step="0.05">
                <div class="field-validation-msg" id="validation-msg-reverse-interestRate"></div>
              </div>

              <!-- Field 3B: Loan Tenure Months (Only in Interest Mode) -->
              ${(() => {
                AppState.tenureUnits = AppState.tenureUnits || {};
                const revUnit = AppState.tenureUnits['reverse-tenure'] || 'months';
                const isYr = revUnit === 'years';
                const revVal = isYr ? Math.round((Number(tenureMonths) / 12) * 10) / 10 : tenureMonths;
                const revMin = isYr ? 0.5 : 1;
                const revMax = isYr ? 30 : 360;
                const revStep = isYr ? 0.5 : 1;
                const revSuffix = isYr ? 'Yrs' : 'Mos';
                const dispText = isYr ? `${revVal} Years (${Math.round(revVal * 12)} Mos)` : `${revVal} Months (${(revVal / 12).toFixed(1)} Yrs)`;
                return `
              <div class="form-group" id="group-reverse-tenureMonths" style="display: ${mode === 'interest' ? 'block' : 'none'};">
                <div class="form-label-row">
                  <label class="form-label" for="input-reverse-tenureMonths">
                    <span id="label-reverse-tenureMonths">${isYr ? 'Loan Period (Years)' : 'Loan Period (Tenure)'}</span>
                  </label>
                  <div class="form-label-controls">
                    <div class="tenure-toggle-container" id="tenure-toggle-reverse-tenure" role="group" aria-label="Reverse loan tenure toggle">
                      <button type="button" class="tenure-unit-btn ${isYr ? 'active' : ''}" data-reverse-tenure-btn="years" aria-pressed="${isYr}">Yr</button>
                      <button type="button" class="tenure-unit-btn ${!isYr ? 'active' : ''}" data-reverse-tenure-btn="months" aria-pressed="${!isYr}">Mo</button>
                    </div>
                    <span class="form-value-display" id="val-display-reverse-tenureMonths">${dispText}</span>
                  </div>
                </div>
                <div class="input-with-addons">
                  <input type="number" class="form-input has-suffix" id="input-reverse-tenureMonths" data-id="tenureMonths" value="${revVal}" min="${revMin}" max="${revMax}" step="${revStep}">
                  <span class="input-addon-suffix">${revSuffix}</span>
                </div>
                <input type="range" class="form-range-slider" id="range-reverse-tenureMonths" data-id="tenureMonths" value="${revVal}" min="${revMin}" max="${revMax}" step="${revStep}">
                <div class="field-validation-msg" id="validation-msg-reverse-tenureMonths"></div>
              </div>`;
              })()}

              <!-- Inline Validation Error Box (Visible in red #ff4d4d when EMI <= P*r or EMI*n < P) -->
              <div id="reverse-inline-error-box" class="reverse-inline-error-banner" style="display: none;">
                <div class="reverse-error-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div class="reverse-error-content">
                  <strong class="reverse-error-title" id="reverse-inline-error-title" style="color: #ff4d4d; font-size: 0.95rem; display: block;">
                    Please enter valid Loan Amount, EMI, and ROI.
                  </strong>
                  <span class="reverse-error-desc" id="reverse-inline-error-desc" style="color: #ffb3b3; font-size: 0.83rem; line-height: 1.4; display: block; margin-top: 2px;">
                    Monthly interest exceeds or matches EMI. EMI must be strictly greater than Loan Amount × Monthly Rate.
                  </span>
                </div>
              </div>
            </form>
          </div>

          <!-- Results Column -->
          <div class="calc-results-card glass-panel" id="reverse-results-card">
            <div class="card-title">
              <span id="reverse-results-heading">${mode === 'period' ? 'Tenure Calculation Results' : 'Interest Rate Results'}</span>
              <button type="button" class="btn-secondary" id="reverse-copy-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
                ${getIconSvg('copy', 14)} Copy
              </button>
            </div>

            <!-- Primary Metric Display -->
            <div class="result-hero-box" id="reverse-hero-box">
              <div class="result-hero-label" id="reverse-hero-label">Required Loan Tenure</div>
              <div class="result-hero-value" id="reverse-hero-value">--</div>
              <div class="result-hero-subtext" id="reverse-hero-subtext">Calculating precision reverse loan amortization...</div>
            </div>

            <!-- Metrics List -->
            <div class="result-stats-list" id="reverse-stats-list"></div>

            <!-- Visual Donut Chart Breakdown -->
            <div class="result-chart-box" id="reverse-chart-box" style="margin-top: 1.5rem;">
              <h4 style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Payment Breakdown</h4>
              <div id="reverse-donut-chart-container" style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initReverseLoanBehavior(calc) {
    if (!AppState.calcInputs.calcMode) {
      AppState.calcInputs.calcMode = 'period';
    }
    if (AppState.calcInputs.principal === undefined) AppState.calcInputs.principal = 1000000;
    if (AppState.calcInputs.monthlyEmi === undefined) AppState.calcInputs.monthlyEmi = 20517;
    if (AppState.calcInputs.interestRate === undefined) AppState.calcInputs.interestRate = 8.5;
    if (AppState.calcInputs.tenureMonths === undefined) AppState.calcInputs.tenureMonths = 60;

    const syncAndCompute = () => {
      const mode = AppState.calcInputs.calcMode || 'period';
      const P = parseFloat(AppState.calcInputs.principal) || 0;
      const emi = parseFloat(AppState.calcInputs.monthlyEmi) || 0;
      const rate = parseFloat(AppState.calcInputs.interestRate) || 0;
      const revUnit = (AppState.tenureUnits && AppState.tenureUnits['reverse-tenure']) || 'months';
      let tenure = parseFloat(AppState.calcInputs.tenureMonths) || 60;
      let engineTenure = tenure;
      if (revUnit === 'years') {
        engineTenure = Math.round(tenure * 12);
      }

      // Update value displays
      const currSym = (typeof AppState !== 'undefined' && AppState.getCurrencySymbol) ? AppState.getCurrencySymbol() : '₹';
      const currLocale = (typeof AppState !== 'undefined' && AppState.getLocale) ? AppState.getLocale() : 'en-IN';

      const dispP = document.getElementById('val-display-reverse-principal');
      if (dispP) dispP.textContent = `${currSym}${Math.round(P).toLocaleString(currLocale)}`;

      const dispE = document.getElementById('val-display-reverse-monthlyEmi');
      if (dispE) dispE.textContent = `${currSym}${Math.round(emi).toLocaleString(currLocale)}`;

      const dispR = document.getElementById('val-display-reverse-interestRate');
      if (dispR) dispR.textContent = `${rate}%`;

      const dispT = document.getElementById('val-display-reverse-tenureMonths');
      if (dispT) {
        dispT.textContent = revUnit === 'years'
          ? `${tenure} Years (${Math.round(tenure * 12)} Mos)`
          : `${tenure} Months (${(tenure / 12).toFixed(1)} Yrs)`;
      }

      // Compute result from engine
      const engineInputs = { ...AppState.calcInputs, tenureMonths: Math.max(1, engineTenure) };
      const result = CalculatorEngine.compute('loan-reverse-calculator', engineInputs);
      this.updateReverseLoanUi(result);
    };

    this.updateReverseCalculation = syncAndCompute;

    // Tab buttons
    const tabPeriod = document.getElementById('mode-tab-period');
    const tabInterest = document.getElementById('mode-tab-interest');
    const groupRate = document.getElementById('group-reverse-interestRate');
    const groupTenure = document.getElementById('group-reverse-tenureMonths');
    const inputTitle = document.getElementById('reverse-inputs-title');
    const resultsHeading = document.getElementById('reverse-results-heading');

    const switchMode = (newMode) => {
      AppState.calcInputs.calcMode = newMode;
      if (tabPeriod) tabPeriod.classList.toggle('active', newMode === 'period');
      if (tabInterest) tabInterest.classList.toggle('active', newMode === 'interest');

      if (groupRate) groupRate.style.display = newMode === 'period' ? 'block' : 'none';
      if (groupTenure) groupTenure.style.display = newMode === 'interest' ? 'block' : 'none';

      if (inputTitle) {
        inputTitle.textContent = newMode === 'period' ? 'Period Calculator Inputs' : 'Interest Calculator Inputs';
      }
      if (resultsHeading) {
        resultsHeading.textContent = newMode === 'period' ? 'Tenure Calculation Results' : 'Interest Rate Results';
      }

      syncAndCompute();
    };

    if (tabPeriod) {
      tabPeriod.addEventListener('click', () => switchMode('period'));
    }
    if (tabInterest) {
      tabInterest.addEventListener('click', () => switchMode('interest'));
    }

    // Input & Slider two-way binding
    const setupFieldSync = (fieldId) => {
      const numInput = document.getElementById(`input-reverse-${fieldId}`);
      const rangeInput = document.getElementById(`range-reverse-${fieldId}`);

      if (numInput && rangeInput) {
        numInput.addEventListener('input', (e) => {
          let val = parseFloat(e.target.value);
          if (isNaN(val)) val = 0;
          AppState.calcInputs[fieldId] = val;
          rangeInput.value = val;
          syncAndCompute();
        });

        rangeInput.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          AppState.calcInputs[fieldId] = val;
          numInput.value = val;
          syncAndCompute();
        });
      }
    };

    setupFieldSync('principal');
    setupFieldSync('monthlyEmi');
    setupFieldSync('interestRate');
    setupFieldSync('tenureMonths');

    // Reverse Loan Tenure Toggle Listener
    document.querySelectorAll('[data-reverse-tenure-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUnit = btn.getAttribute('data-reverse-tenure-btn');
        AppState.tenureUnits = AppState.tenureUnits || {};
        const currentUnit = AppState.tenureUnits['reverse-tenure'] || 'months';
        if (currentUnit === targetUnit) return;

        AppState.tenureUnits['reverse-tenure'] = targetUnit;
        const toggleWrap = document.getElementById('tenure-toggle-reverse-tenure');
        if (toggleWrap) {
          toggleWrap.querySelectorAll('.tenure-unit-btn').forEach(b => {
            const isAct = b.getAttribute('data-reverse-tenure-btn') === targetUnit;
            b.classList.toggle('active', isAct);
            b.setAttribute('aria-pressed', isAct ? 'true' : 'false');
          });
        }

        const numEl = document.getElementById('input-reverse-tenureMonths');
        const rangeEl = document.getElementById('range-reverse-tenureMonths');
        const dispEl = document.getElementById('val-display-reverse-tenureMonths');
        const labelEl = document.getElementById('label-reverse-tenureMonths');
        const suffixEl = numEl?.parentElement?.querySelector('.input-addon-suffix');

        let val = parseFloat(AppState.calcInputs.tenureMonths);
        if (isNaN(val)) val = 60;

        let newVal = val;
        let min = 1, max = 360, step = 1, suffix = 'Mos';
        if (targetUnit === 'years') {
          newVal = Math.round((val / 12) * 10) / 10;
          min = 0.5; max = 30; step = 0.5; suffix = 'Yrs';
          if (labelEl) labelEl.textContent = 'Loan Period (Years)';
        } else {
          newVal = Math.round(val * 12);
          min = 1; max = 360; step = 1; suffix = 'Mos';
          if (labelEl) labelEl.textContent = 'Loan Period (Tenure)';
        }

        if (numEl) {
          numEl.min = min; numEl.max = max; numEl.step = step; numEl.value = newVal;
        }
        if (rangeEl) {
          rangeEl.min = min; rangeEl.max = max; rangeEl.step = step; rangeEl.value = newVal;
        }
        if (suffixEl) suffixEl.textContent = suffix;
        if (dispEl) {
          dispEl.textContent = targetUnit === 'years'
            ? `${newVal} Years (${Math.round(newVal * 12)} Mos)`
            : `${newVal} Months (${(newVal / 12).toFixed(1)} Yrs)`;
        }

        AppState.calcInputs.tenureMonths = newVal;
        syncAndCompute();
      });
    });

    // Preset Edge Cases
    const setFields = (p, e, r, t, mode) => {
      AppState.calcInputs.principal = p;
      AppState.calcInputs.monthlyEmi = e;
      if (r !== undefined) AppState.calcInputs.interestRate = r;
      if (t !== undefined) AppState.calcInputs.tenureMonths = t;

      const numP = document.getElementById('input-reverse-principal');
      const rngP = document.getElementById('range-reverse-principal');
      if (numP) numP.value = p;
      if (rngP) rngP.value = p;

      const numE = document.getElementById('input-reverse-monthlyEmi');
      const rngE = document.getElementById('range-reverse-monthlyEmi');
      if (numE) numE.value = e;
      if (rngE) rngE.value = e;

      if (r !== undefined) {
        const numR = document.getElementById('input-reverse-interestRate');
        const rngR = document.getElementById('range-reverse-interestRate');
        if (numR) numR.value = r;
        if (rngR) rngR.value = r;
      }

      if (t !== undefined) {
        const numT = document.getElementById('input-reverse-tenureMonths');
        const rngT = document.getElementById('range-reverse-tenureMonths');
        if (numT) numT.value = t;
        if (rngT) rngT.value = t;
      }

      switchMode(mode);
    };

    // Case 1: High EMI Case (P = 10L, EMI = 1L, ROI = 9.5% -> ~11 months)
    document.getElementById('scenario-btn-high-emi')?.addEventListener('click', () => {
      setFields(1000000, 100000, 9.5, undefined, 'period');
      this.showToast('Loaded Case 1: High EMI (₹10L, EMI ₹1L, ROI 9.5%)');
    });

    // Case 2: Low ROI Case (P = 10L, EMI = 15k, ROI = 2% -> ~71 months)
    document.getElementById('scenario-btn-low-roi')?.addEventListener('click', () => {
      setFields(1000000, 15000, 2, undefined, 'period');
      this.showToast('Loaded Case 2: Low ROI (₹10L, EMI ₹15k, ROI 2%)');
    });

    // Case 3: Short Tenure Case (P = 5L, EMI = 2.6L, Tenure = 2 Mos -> Total ₹5.2L, Int ₹20k)
    document.getElementById('scenario-btn-short-tenure')?.addEventListener('click', () => {
      setFields(500000, 260000, undefined, 2, 'interest');
      this.showToast('Loaded Case 3: Short Tenure (₹5L, EMI ₹2.6L, 2 Months)');
    });

    // Case 4: Invalid Case (P = 10L, EMI = 10k, ROI = 12% -> EMI <= P*r)
    document.getElementById('scenario-btn-invalid')?.addEventListener('click', () => {
      setFields(1000000, 10000, 12, undefined, 'period');
      this.showToast('Loaded Case 4: Invalid Case (EMI ≤ Loan Amount × r)');
    });

    // Reset button inside card
    document.getElementById('reverse-reset-btn')?.addEventListener('click', () => {
      this.resetReverseLoanCalculator(calc);
    });

    // Copy result button
    document.getElementById('reverse-copy-btn')?.addEventListener('click', () => {
      const heroVal = document.getElementById('reverse-hero-value')?.textContent || '';
      const heroLbl = document.getElementById('reverse-hero-label')?.textContent || '';
      const sub = document.getElementById('reverse-hero-subtext')?.textContent || '';
      const text = `${calc.title} (${AppState.calcInputs.calcMode === 'interest' ? 'Calculate Interest' : 'Calculate Period'})
${heroLbl}: ${heroVal}
${sub}
Computed on letscalculate.in`;
      navigator.clipboard.writeText(text);
      this.showToast('Calculation copied to clipboard!');
    });

    // Initial computation
    syncAndCompute();
  },

  updateReverseLoanUi(result) {
    const errorBox = document.getElementById('reverse-inline-error-box');
    const errorTitle = document.getElementById('reverse-inline-error-title');
    const errorDesc = document.getElementById('reverse-inline-error-desc');
    const heroBox = document.getElementById('reverse-hero-box');
    const heroLabel = document.getElementById('reverse-hero-label');
    const heroValue = document.getElementById('reverse-hero-value');
    const heroSubtext = document.getElementById('reverse-hero-subtext');
    const statsList = document.getElementById('reverse-stats-list');
    const chartContainer = document.getElementById('reverse-donut-chart-container');
    const chartBox = document.getElementById('reverse-chart-box');
    const emiInput = document.getElementById('input-reverse-monthlyEmi');

    if (!result || result.isValid === false) {
      // Show inline error in red (#ff4d4d)
      if (errorBox) {
        errorBox.style.display = 'flex';
      }
      if (errorTitle) {
        errorTitle.textContent = result.error || 'Please enter valid Loan Amount, EMI, and ROI.';
        errorTitle.style.color = '#ff4d4d';
      }
      if (errorDesc) {
        errorDesc.textContent = (result.primaryResult && result.primaryResult.subtext)
          ? result.primaryResult.subtext
          : 'EMI must be strictly greater than Loan Amount × Monthly Rate for the loan to amortize.';
      }
      if (emiInput) {
        emiInput.classList.add('has-error');
      }

      if (heroBox) {
        heroBox.style.borderColor = 'rgba(255, 77, 77, 0.4)';
        heroBox.style.background = 'rgba(255, 77, 77, 0.05)';
      }
      if (heroLabel) {
        heroLabel.textContent = result.primaryResult ? result.primaryResult.label : 'Validation Alert';
      }
      if (heroValue) {
        heroValue.innerHTML = `<span style="color: #ff4d4d; font-size: 1.85rem;">${result.primaryResult ? result.primaryResult.value : 'Invalid Input'}</span>`;
      }
      if (heroSubtext) {
        heroSubtext.textContent = result.error || 'Please enter valid Loan Amount, EMI, and ROI.';
        heroSubtext.style.color = '#ff8080';
      }

      // Stats list
      if (statsList && result.stats) {
        statsList.innerHTML = result.stats.map(s => `
          <div class="result-stat-row">
            <span class="stat-label">${s.label}</span>
            <span class="stat-value" style="${s.highlight ? 'color: #ff4d4d; font-weight: 800;' : ''}">${s.value}</span>
          </div>
        `).join('');
      }

      // Hide donut chart on invalid state
      if (chartBox) {
        chartBox.style.display = 'none';
      }
      return;
    }

    // Valid state
    if (errorBox) {
      errorBox.style.display = 'none';
    }
    if (emiInput) {
      emiInput.classList.remove('has-error');
    }

    if (heroBox) {
      heroBox.style.borderColor = '';
      heroBox.style.background = '';
    }
    if (heroLabel) {
      heroLabel.textContent = result.primaryResult.label;
    }
    if (heroValue) {
      heroValue.innerHTML = `<span style="color: #38bdf8;">${result.primaryResult.value}</span>`;
    }
    if (heroSubtext) {
      heroSubtext.textContent = result.primaryResult.subtext || '';
      heroSubtext.style.color = '';
    }

    // Stats list
    if (statsList && result.stats) {
      statsList.innerHTML = result.stats.map(s => `
        <div class="result-stat-row ${s.highlight ? 'highlight-row' : ''}">
          <span class="stat-label">${s.label}</span>
          <span class="stat-value ${s.highlight ? 'accent' : ''}">${s.value}</span>
        </div>
      `).join('');
    }

    // Donut chart
    if (chartBox && result.chartData) {
      chartBox.style.display = 'block';
      const values = result.chartData.values || [];
      const labels = result.chartData.labels || [];
      const colors = result.chartData.colors || ['#06b6d4', '#f59e0b'];
      const total = values.reduce((a, b) => a + b, 0);

      let accumulated = 0;
      const slices = values.map((v, i) => {
        const pct = total > 0 ? (v / total) * 100 : 0;
        const strokeDash = `${pct} ${100 - pct}`;
        const strokeOffset = -accumulated;
        accumulated += pct;
        return `
          <circle class="donut-slice" cx="21" cy="21" r="15.91549430918954" 
            fill="transparent" 
            stroke="${colors[i % colors.length]}" 
            stroke-width="5" 
            stroke-dasharray="${strokeDash}" 
            stroke-dashoffset="${strokeOffset}">
          </circle>
        `;
      }).join('');

      const legends = labels.map((lbl, i) => {
        const val = values[i];
        const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
        return `
          <div class="chart-legend-item" style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; margin-bottom: 0.35rem;">
            <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${colors[i % colors.length]};"></span>
            <span style="color: var(--text-secondary);">${lbl}:</span>
            <strong style="color: #fff;">₹${Math.round(val).toLocaleString('en-IN')}</strong>
            <span style="color: var(--text-muted); font-size: 0.78rem;">(${pct}%)</span>
          </div>
        `;
      }).join('');

      if (chartContainer) {
        chartContainer.innerHTML = `
          <div style="width: 140px; height: 140px; flex-shrink: 0;">
            <svg class="donut-svg" viewBox="0 0 42 42" width="100%" height="100%">
              ${slices}
            </svg>
          </div>
          <div class="chart-legend-wrap" style="flex: 1; min-width: 170px;">
            ${legends}
          </div>
        `;
      }
    }
  },

  resetReverseLoanCalculator(calc) {
    const mode = AppState.calcInputs.calcMode || 'period';
    if (mode === 'period') {
      AppState.calcInputs.principal = 1000000;
      AppState.calcInputs.monthlyEmi = 20517;
      AppState.calcInputs.interestRate = 8.5;
    } else {
      AppState.calcInputs.principal = 1000000;
      AppState.calcInputs.monthlyEmi = 20517;
      AppState.calcInputs.tenureMonths = 60;
    }

    const numP = document.getElementById('input-reverse-principal');
    const rngP = document.getElementById('range-reverse-principal');
    if (numP) numP.value = AppState.calcInputs.principal;
    if (rngP) rngP.value = AppState.calcInputs.principal;

    const numE = document.getElementById('input-reverse-monthlyEmi');
    const rngE = document.getElementById('range-reverse-monthlyEmi');
    if (numE) numE.value = AppState.calcInputs.monthlyEmi;
    if (rngE) rngE.value = AppState.calcInputs.monthlyEmi;

    const numR = document.getElementById('input-reverse-interestRate');
    const rngR = document.getElementById('range-reverse-interestRate');
    if (numR) numR.value = AppState.calcInputs.interestRate || 8.5;
    if (rngR) rngR.value = AppState.calcInputs.interestRate || 8.5;

    const numT = document.getElementById('input-reverse-tenureMonths');
    const rngT = document.getElementById('range-reverse-tenureMonths');
    if (numT) numT.value = AppState.calcInputs.tenureMonths || 60;
    if (rngT) rngT.value = AppState.calcInputs.tenureMonths || 60;

    const emiInput = document.getElementById('input-reverse-monthlyEmi');
    if (emiInput) emiInput.classList.remove('has-error');

    const errBox = document.getElementById('reverse-inline-error-box');
    if (errBox) errBox.style.display = 'none';

    const dispP = document.getElementById('val-display-reverse-principal');
    if (dispP) dispP.textContent = `₹${Math.round(AppState.calcInputs.principal).toLocaleString('en-IN')}`;

    const dispE = document.getElementById('val-display-reverse-monthlyEmi');
    if (dispE) dispE.textContent = `₹${Math.round(AppState.calcInputs.monthlyEmi).toLocaleString('en-IN')}`;

    const dispR = document.getElementById('val-display-reverse-interestRate');
    if (dispR) dispR.textContent = `${AppState.calcInputs.interestRate || 8.5}%`;

    const dispT = document.getElementById('val-display-reverse-tenureMonths');
    if (dispT) dispT.textContent = `${AppState.calcInputs.tenureMonths || 60} Months (${((AppState.calcInputs.tenureMonths || 60) / 12).toFixed(1)} Yrs)`;

    const result = CalculatorEngine.compute('loan-reverse-calculator', AppState.calcInputs);
    this.updateReverseLoanUi(result);
    this.showToast('Calculator restored to default values');
  },


  renderMatrixConverterUi(calc) {
    const cat = UnitMatrices[calc.unitCategory] || UnitMatrices.length;
    const unitKeys = Object.keys(cat.units);

    return `
      <div class="matrix-converter-layout glass-panel" style="padding: 2rem;">
        <div class="matrix-inputs-row">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Value to Convert</label>
            <input type="number" class="form-input" id="matrix-input-val" value="100" step="any">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">From Unit</label>
            <select class="form-input" id="matrix-from-unit">
              ${unitKeys.map(k => `<option value="${k}">${cat.units[k].name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">To Unit</label>
            <select class="form-input" id="matrix-to-unit">
              ${unitKeys.map((k, i) => `<option value="${k}" ${i === 1 ? 'selected' : ''}>${cat.units[k].name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="primary-result-box" style="margin: 1.5rem 0 0;">
          <div class="primary-result-label" id="matrix-res-label">Converted Result</div>
          <div class="primary-result-value" id="matrix-res-val">0</div>
        </div>

        <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Instant Multi-Unit Comparison Table</h4>
        <div class="table-wrapper">
          <table class="data-table" id="matrix-comparison-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Equivalent Value</th>
                <th>Standard Abbreviation</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    `;
  },

  initMatrixConverterBehavior(calc) {
    const inputVal = document.getElementById('matrix-input-val');
    const fromSelect = document.getElementById('matrix-from-unit');
    const toSelect = document.getElementById('matrix-to-unit');
    const resVal = document.getElementById('matrix-res-val');
    const resLabel = document.getElementById('matrix-res-label');
    const tableBody = document.querySelector('#matrix-comparison-table tbody');

    const updateMatrix = () => {
      const val = parseFloat(inputVal.value) || 0;
      const from = fromSelect.value;
      const to = toSelect.value;
      const cat = calc.unitCategory;

      const converted = convertUnit(val, cat, from, to);
      const toName = UnitMatrices[cat].units[to].name;
      const fromName = UnitMatrices[cat].units[from].name;

      if (resVal) resVal.textContent = `${Number(converted.toFixed(6))} ${to}`;
      if (resLabel) resLabel.textContent = `${val} ${fromName} =`;

      // Update comparison table
      if (tableBody) {
        const units = UnitMatrices[cat].units;
        tableBody.innerHTML = Object.keys(units).map(uKey => {
          const compVal = convertUnit(val, cat, from, uKey);
          return `
            <tr>
              <td><strong>${units[uKey].name}</strong></td>
              <td style="font-family: monospace; font-size: 1.05rem; color: var(--emerald);">${Number(compVal.toFixed(6))}</td>
              <td>${uKey}</td>
            </tr>
          `;
        }).join('');
      }
    };

    inputVal?.addEventListener('input', updateMatrix);
    fromSelect?.addEventListener('change', updateMatrix);
    toSelect?.addEventListener('change', updateMatrix);
    updateMatrix();
  },

  renderCountdownLiveUi() {
    return `
      <div class="glass-panel" style="padding: 2.5rem; text-align: center;">
        <h2 id="countdown-event-title" style="margin-bottom: 0.5rem;">New Year 2027 Celebration</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Real-time ticking precision countdown</p>

        <div class="countdown-clock-wrapper">
          <div class="countdown-block">
            <span class="countdown-digit" id="cd-days">00</span>
            <span class="countdown-label">Days</span>
          </div>
          <div class="countdown-block">
            <span class="countdown-digit" id="cd-hours">00</span>
            <span class="countdown-label">Hours</span>
          </div>
          <div class="countdown-block">
            <span class="countdown-digit" id="cd-mins">00</span>
            <span class="countdown-label">Minutes</span>
          </div>
          <div class="countdown-block">
            <span class="countdown-digit" id="cd-secs">00</span>
            <span class="countdown-label">Seconds</span>
          </div>
        </div>

        <div style="max-width: 480px; margin: 2rem auto 0; display: flex; gap: 1rem; flex-wrap: wrap;">
          <input type="datetime-local" class="form-input" id="cd-target-input" value="2027-01-01T00:00" style="flex: 1;">
          <button type="button" class="btn-secondary" id="cd-update-btn">Set Countdown</button>
        </div>
      </div>
    `;
  },

  initCountdownBehavior() {
    let target = new Date('2027-01-01T00:00:00');

    const updateClock = () => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        document.getElementById('cd-days').textContent = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-mins').textContent = '00';
        document.getElementById('cd-secs').textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      document.getElementById('cd-days').textContent = days.toString().padStart(2, '0');
      document.getElementById('cd-hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('cd-mins').textContent = mins.toString().padStart(2, '0');
      document.getElementById('cd-secs').textContent = secs.toString().padStart(2, '0');
    };

    updateClock();
    AppState.countdownInterval = setInterval(updateClock, 1000);

    document.getElementById('cd-update-btn')?.addEventListener('click', () => {
      const val = document.getElementById('cd-target-input')?.value;
      if (val) {
        target = new Date(val);
        updateClock();
        this.showToast('Countdown target updated!');
      }
    });
  },

  renderGpaBuilderUi() {
    return `
      <div class="calc-workspace-grid">
        <div class="calc-inputs-card glass-panel">
          <div class="card-title">
            <span>Course Grade Entries</span>
            <button type="button" class="btn-secondary" id="gpa-add-row-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
              + Add Course
            </button>
          </div>

          <div id="gpa-courses-container">
            <!-- Course rows dynamically added -->
          </div>
        </div>

        <div class="calc-results-card glass-panel">
          <div class="card-title">
            <span>Cumulative Grade Point Average</span>
          </div>

          <div class="primary-result-box">
            <div class="primary-result-label">Weighted GPA (4.0 Scale)</div>
            <div class="primary-result-value" id="gpa-calculated-val">3.65</div>
            <div class="primary-result-subtext" id="gpa-status-text">Honors Standing</div>
          </div>

          <div class="secondary-metrics-grid">
            <div class="metric-tile highlight">
              <div class="metric-tile-label">Total Credit Hours</div>
              <div class="metric-tile-value" id="gpa-total-credits">16</div>
            </div>
            <div class="metric-tile">
              <div class="metric-tile-label">Total Quality Points</div>
              <div class="metric-tile-value" id="gpa-total-points">58.4</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initGpaBuilderBehavior() {
    const container = document.getElementById('gpa-courses-container');
    const gradePoints = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0
    };

    const courses = [
      { name: 'Calculus I', credits: 4, grade: 'A' },
      { name: 'Computer Science', credits: 4, grade: 'A-' },
      { name: 'Physics Mechanics', credits: 4, grade: 'B+' },
      { name: 'Academic Writing', credits: 4, grade: 'B' }
    ];

    const recalculateGpa = () => {
      let totalPts = 0;
      let totalCreds = 0;

      container.querySelectorAll('.gpa-course-row').forEach(row => {
        const cred = parseFloat(row.querySelector('.course-credits').value) || 0;
        const grd = row.querySelector('.course-grade').value;
        const pts = gradePoints[grd] || 0;

        totalCreds += cred;
        totalPts += cred * pts;
      });

      const gpa = totalCreds > 0 ? (totalPts / totalCreds) : 0;
      document.getElementById('gpa-calculated-val').textContent = gpa.toFixed(2);
      document.getElementById('gpa-total-credits').textContent = totalCreds.toString();
      document.getElementById('gpa-total-points').textContent = totalPts.toFixed(1);

      let status = 'Standard Standing';
      if (gpa >= 3.8) status = 'Summa Cum Laude / Dean’s List';
      else if (gpa >= 3.5) status = 'Magna Cum Laude / Honors';
      else if (gpa >= 3.0) status = 'Good Academic Standing';
      document.getElementById('gpa-status-text').textContent = status;
    };

    const renderRow = (course) => {
      const row = document.createElement('div');
      row.className = 'gpa-course-row';
      row.innerHTML = `
        <input type="text" class="form-input course-name" value="${course.name}" placeholder="Course name">
        <input type="number" class="form-input course-credits" value="${course.credits}" min="1" max="10" placeholder="Credits">
        <select class="form-input course-grade">
          ${Object.keys(gradePoints).map(g => `<option value="${g}" ${g === course.grade ? 'selected' : ''}>${g} (${gradePoints[g]})</option>`).join('')}
        </select>
        <button type="button" class="btn-secondary delete-row-btn" style="padding: 0.5rem; color: var(--rose);">
          ${getIconSvg('x', 16)}
        </button>
      `;

      row.querySelectorAll('input, select').forEach(inp => inp.addEventListener('input', recalculateGpa));
      row.querySelector('.delete-row-btn').addEventListener('click', () => {
        row.remove();
        recalculateGpa();
      });

      container.appendChild(row);
    };

    courses.forEach(renderRow);
    recalculateGpa();

    document.getElementById('gpa-add-row-btn')?.addEventListener('click', () => {
      renderRow({ name: 'New Course', credits: 3, grade: 'A' });
      recalculateGpa();
    });
  },

  renderTimeZoneUi() {
    return `
      <div class="glass-panel" style="padding: 2.5rem;">
        <h2 style="margin-bottom: 0.5rem;">International World Clock & Time Zones</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Compare live times across global financial and business capitals.</p>

        <div class="timezone-grid" id="timezone-cards-container">
          <!-- World clocks populated via updateWorldClocks() -->
        </div>
      </div>
    `;
  },

  initTimeZoneBehavior() {
    const cities = [
      { name: 'London (GMT / BST)', zone: 'Europe/London' },
      { name: 'New York (EDT / EST)', zone: 'America/New_York' },
      { name: 'San Francisco (PDT / PST)', zone: 'America/Los_Angeles' },
      { name: 'Mumbai / Delhi (IST)', zone: 'Asia/Kolkata' },
      { name: 'Tokyo (JST)', zone: 'Asia/Tokyo' },
      { name: 'Sydney (AEST)', zone: 'Australia/Sydney' },
      { name: 'Dubai (GST)', zone: 'Asia/Dubai' },
      { name: 'Singapore (SGT)', zone: 'Asia/Singapore' }
    ];

    const container = document.getElementById('timezone-cards-container');

    const updateWorldClocks = () => {
      const now = new Date();
      if (!container) return;

      container.innerHTML = cities.map(city => {
        const timeStr = now.toLocaleTimeString('en-US', { timeZone: city.zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString('en-US', { timeZone: city.zone, weekday: 'short', month: 'short', day: 'numeric' });

        return `
          <div class="timezone-city-card">
            <div class="timezone-city-name">${city.name}</div>
            <div class="timezone-city-time">${timeStr}</div>
            <div class="timezone-city-date">${dateStr}</div>
          </div>
        `;
      }).join('');
    };

    updateWorldClocks();
    AppState.worldClockInterval = setInterval(updateWorldClocks, 1000);
  },

  // ==========================================
  // VIEW: FAVORITES PAGE
  // ==========================================
  renderFavoritesPage() {
    this.updateSeoMeta(
      'Saved Favorite Calculators - letscalculate.in',
      'Quick access to your saved favorite calculators across finance, mathematics, and health metrics.',
      'https://letscalculate.in/#/favorites'
    );
    const mainEl = document.getElementById('app-main');
    const favCalcs = CALCULATORS_DATA.filter(c => AppState.isFavorite(c.id));

    mainEl.innerHTML = `
      <div class="container" style="padding: 3rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>Favorites</span>
        </div>

        <div style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Your Favorite Calculators</h1>
          <p style="color: var(--text-secondary); font-size: 1.1rem;">Quick access to all your bookmarked calculators.</p>
        </div>

        ${favCalcs.length === 0 ? `
          <div class="glass-panel" style="padding: 4rem 2rem; text-align: center;">
            <p style="font-size: 1.25rem; margin-bottom: 1.5rem; color: var(--text-secondary);">No favorite calculators saved yet.</p>
            <a href="#/" class="btn-secondary" style="display: inline-flex;">Explore Calculators</a>
          </div>
        ` : `
          <div class="calculators-grid">
            ${favCalcs.map(calc => this.renderCalcCard(calc)).join('')}
          </div>
        `}
      </div>
    `;

    this.bindCardEvents();
  },

  // ==========================================
  // HELPER: RENDER CALCULATOR CARD
  // ==========================================
  renderCalcCard(calc) {
    const isFav = AppState.isFavorite(calc.id);
    const cat = getCategoryById(calc.category);
    const isNew = typeof isNewCalculator === 'function' ? isNewCalculator(calc) : (calc.badge === 'New' || calc.id === 'jewellery-price-calculator');

    return `
      <div class="calc-card glass-panel ${isNew ? 'is-new-calc' : ''}" data-id="${calc.id}">
        <div>
          <div class="calc-card-header">
            <div class="calc-card-icon" style="${isNew ? 'background: linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.12) 100%); border-color: rgba(245, 158, 11, 0.45); color: #fbbf24;' : ''}">
              ${getIconSvg(calc.icon, 20)}
            </div>
            <div class="calc-card-top-right">
              ${isNew ? `
                <span class="calc-card-new-badge" title="Newly Added Calculator">
                  <span class="badge-new-dot"></span>
                  <span>NEW</span>
                </span>
              ` : ''}
              <button type="button" class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${calc.id}" title="Toggle Favorite">
                ${getIconSvg('star', 18)}
              </button>
            </div>
          </div>
          <h4 class="calc-card-title">${calc.title}</h4>
          <p class="calc-card-summary">${calc.summary}</p>
        </div>
        <div class="calc-card-footer">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="badge badge-${cat.color}">${cat.name.split(' ')[0]}</span>
            ${calc.badge && !isNew ? `<span class="badge badge-subtle">${calc.badge}</span>` : ''}
          </div>
          <span class="calc-card-action">
            Calculate ${getIconSvg('arrow-right', 14)}
          </span>
        </div>
      </div>
    `;
  },

  renderCalcTableRow(calc) {
    const cat = getCategoryById(calc.category);
    const isNew = typeof isNewCalculator === 'function' ? isNewCalculator(calc) : false;
    const isFav = AppState.isFavorite(calc.id);

    return `
      <tr class="dir-table-row ${isNew ? 'row-is-new' : ''}" data-id="${calc.id}">
        <td class="dir-table-col-name">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="dir-table-icon" style="${isNew ? 'color: #fbbf24; background: rgba(245, 158, 11, 0.15);' : ''}">
              ${getIconSvg(calc.icon, 18)}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.45rem;">
                <a href="#/calculator/${calc.id}" class="dir-table-title">${calc.title}</a>
                ${isNew ? `<span class="calc-card-new-badge" style="font-size: 0.62rem; padding: 0.12rem 0.45rem;">NEW</span>` : ''}
              </div>
              <div class="dir-table-desc">${calc.summary}</div>
            </div>
          </div>
        </td>
        <td class="dir-table-col-cat">
          <span class="badge badge-${cat.color}">${cat.name}</span>
        </td>
        <td class="dir-table-col-formula">
          <code class="dir-table-formula-code">${calc.formula || 'Standard Algorithmic Calculation'}</code>
        </td>
        <td class="dir-table-col-actions">
          <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-end;">
            <button type="button" class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${calc.id}" title="Favorite">
              ${getIconSvg('star', 16)}
            </button>
            <a href="#/calculator/${calc.id}" class="btn-primary" style="padding: 0.38rem 0.85rem; font-size: 0.82rem; border-radius: var(--radius-full); text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">
              <span>Calculate</span>
              ${getIconSvg('arrow-right', 12)}
            </a>
          </div>
        </td>
      </tr>
    `;
  },

  bindCardEvents() {
    // Click on card to open calculator
    document.querySelectorAll('.calc-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.fav-btn')) return; // ignore fav clicks
        const id = card.getAttribute('data-id');
        window.location.hash = `#/calculator/${id}`;
      });
    });

    // Star favorite button
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-fav-id');
        AppState.toggleFavorite(id);
        btn.classList.toggle('active', AppState.isFavorite(id));
      });
    });

    // Static Field Tooltips: Tap to toggle on mobile/touch screens
    document.querySelectorAll('.field-tooltip-wrapper').forEach(wrapper => {
      wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = wrapper.classList.contains('is-open');
        document.querySelectorAll('.field-tooltip-wrapper.is-open').forEach(el => el.classList.remove('is-open'));
        if (!wasOpen) wrapper.classList.add('is-open');
      });
    });

    if (!window._tooltipDismissBound) {
      window._tooltipDismissBound = true;
      document.addEventListener('click', () => {
        document.querySelectorAll('.field-tooltip-wrapper.is-open').forEach(el => el.classList.remove('is-open'));
      });
    }
  },

  // ==========================================
  // LIVE SEARCH MODAL RESULTS
  // ==========================================
  renderSearchResults(query) {
    const listEl = document.getElementById('global-search-results') || document.getElementById('search-results-list');
    const countEl = document.getElementById('search-results-count');
    if (!listEl) return;

    let results = [];
    const q = (query || '').trim();
    if (!q) {
      // Suggest top popular calculators when search is first opened, with US Stocks Calculator prominently at the top
      results = [
        getCalculatorById('us-stocks-calculator'),
        ...CALCULATORS_DATA.filter(c => ['sip-calculator', 'emi-calculator', 'loan-calculator', 'bmi-calculator', 'percentage-calculator', 'gst-calculator', 'compound-interest-calculator', 'fd-calculator'].includes(c.id))
      ].filter(Boolean);
      if (results.length === 0) results = CALCULATORS_DATA.slice(0, 8);
    } else {
      results = searchCalculators(q);
      // Ensure US Stocks Calculator appears at the top of search results whenever matched
      results.sort((a, b) => {
        if (a.id === 'us-stocks-calculator') return -1;
        if (b.id === 'us-stocks-calculator') return 1;
        return 0;
      });
    }

    if (countEl) countEl.textContent = `${results.length} found`;

    if (results.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-muted);">
          <p style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--text-primary); font-weight: 600;">No calculators found matching "${this.escapeHtml(query)}"</p>
          <p style="font-size: 0.88rem; margin: 0;">Try searching for "loan", "emi", "sip", "finance", "percentage", or "bmi".</p>
        </div>
      `;
      return;
    }

    const headerNote = !q ? `<div style="padding: 0.5rem 0.75rem; font-size: 0.76rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Popular Calculators</div>` : '';

    listEl.innerHTML = headerNote + results.slice(0, 15).map(calc => {
      const cat = getCategoryById(calc.category) || { name: 'Tools', color: 'emerald' };
      return `
        <div class="search-result-item" data-id="${calc.id}">
          <div class="search-result-item-left">
            <div class="search-result-item-icon">
              ${getIconSvg(calc.icon, 18)}
            </div>
            <div>
              <div class="search-result-item-title">${calc.title}</div>
              <div class="search-result-item-cat">${cat.name} • ${calc.summary}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span class="badge badge-${cat.color}">${cat.name.split(' ')[0]}</span>
            ${(typeof isNewCalculator === 'function' && isNewCalculator(calc)) ? `<span class="calc-card-new-badge" style="font-size: 0.62rem; padding: 0.12rem 0.45rem;">NEW</span>` : ''}
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        document.getElementById('search-modal-backdrop')?.classList.remove('open');
        window.location.hash = `#/calculator/${id}`;
      });
    });
  },

  // ==========================================
  // DRAWERS: HISTORY & FAVORITES
  // ==========================================
  renderHistoryDrawer() {
    const body = document.getElementById('history-list') || document.getElementById('history-drawer-body');
    if (!body) return;

    if (AppState.history.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          ${getIconSvg('history', 36)}
          <p style="margin-top: 1rem;">No recent calculations yet. Start calculating to record history here.</p>
        </div>
      `;
      return;
    }

    body.innerHTML = AppState.history.map(item => `
      <div class="history-item">
        <div class="history-item-top">
          <span>${item.calcTitle}</span>
          <span>${item.timestamp}</span>
        </div>
        <div class="history-item-result">${item.result}</div>
      </div>
    `).join('');
  },

  renderFavoritesDrawer() {
    const body = document.getElementById('favorites-list') || document.getElementById('favorites-drawer-body');
    if (!body) return;

    const favCalcs = CALCULATORS_DATA.filter(c => AppState.isFavorite(c.id));

    if (favCalcs.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          ${getIconSvg('star', 36)}
          <p style="margin-top: 1rem;">No favorites saved yet. Click the star icon on any calculator to bookmark it.</p>
        </div>
      `;
      return;
    }

    body.innerHTML = favCalcs.map(calc => `
      <div class="history-item" style="cursor: pointer;" onclick="window.location.hash='#/calculator/${calc.id}'; document.getElementById('drawer-backdrop').classList.remove('open'); document.getElementById('favorites-drawer').classList.remove('open');">
        <div class="history-item-title">${calc.title}</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">${calc.summary}</div>
      </div>
    `).join('');
  }
};

// Expose globals for window routing, inline events & debugging
if (typeof window !== 'undefined') {
  window.AppUI = AppUI;
  window.App = AppUI;
  window.BrokerModuleController = typeof BrokerModuleController !== 'undefined' ? BrokerModuleController : null;
  window.AppState = typeof AppState !== 'undefined' ? AppState : null;
  window.CalculatorEngine = typeof CalculatorEngine !== 'undefined' ? CalculatorEngine : null;
}

// Initialize App immediately if DOM is ready, or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    AppUI.init();
  });
} else {
  AppUI.init();
}