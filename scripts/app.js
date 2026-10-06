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

// App State
const AppState = {
  theme: localStorage.getItem('letscalculate_theme') || 'dark',
  favorites: JSON.parse(localStorage.getItem('letscalculate_favs') || '[]'),
  history: JSON.parse(localStorage.getItem('letscalculate_history') || '[]'),
  currentUser: JSON.parse(localStorage.getItem('letscalculate_user') || 'null'),
  accounts: JSON.parse(localStorage.getItem('letscalculate_accounts') || '[]'),
  currentCalculator: null,
  calcInputs: {},
  countdownInterval: null,
  worldClockInterval: null,

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
const AppUI = {
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
    // Apply theme
    document.documentElement.setAttribute('data-theme', AppState.theme);

    // Setup global listeners
    this.setupEventListeners();

    // Setup feedback form
    this.setupFeedbackForm();

    // Setup router
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();

    // Update badges
    this.updateHeaderBadges();
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
      // Modal close button
      if (e.target.closest('#close-search-modal') || e.target.closest('.modal-close-btn')) {
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

    // Support focusing/clicking hero input to open modal
    document.addEventListener('focusin', (e) => {
      if (e.target && (e.target.id === 'hero-search-input' || e.target.closest('#hero-search-trigger'))) {
        openSearch('');
      }
    });

    // Keyboard shortcut '/' or 'Cmd+K' / 'Ctrl+K'
    window.addEventListener('keydown', (e) => {
      if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch('');
      }
      if (e.key === 'Escape' && searchModal?.classList.contains('open')) {
        closeSearch();
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

    const closeDrawers = () => {
      drawerBackdrop?.classList.remove('open');
      historyDrawer?.classList.remove('open');
      favDrawer?.classList.remove('open');
      mobileNavDrawer?.classList.remove('open');
    };

    document.getElementById('header-history-btn')?.addEventListener('click', () => {
      drawerBackdrop?.classList.add('open');
      historyDrawer?.classList.add('open');
      this.renderHistoryDrawer();
    });

    document.getElementById('header-favorites-btn')?.addEventListener('click', () => {
      drawerBackdrop?.classList.add('open');
      favDrawer?.classList.add('open');
      this.renderFavoritesDrawer();
    });

    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
      drawerBackdrop?.classList.add('open');
      mobileNavDrawer?.classList.add('open');
    });

    document.querySelectorAll('.close-drawer-btn').forEach(btn => {
      btn.addEventListener('click', closeDrawers);
    });

    mobileNavDrawer?.querySelectorAll?.('a, button')?.forEach(el => {
      el.addEventListener('click', () => {
        closeDrawers();
      });
    });

    drawerBackdrop?.addEventListener('click', closeDrawers);

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

    // Navigation links: Home, All Calculators, 3 Categories & Favorites
    const navLinksEl = document.querySelector('.nav-links');
    if (navLinksEl) {
      const curHash = window.location.hash || '#/';
      navLinksEl.innerHTML = `
        <li class="nav-item ${(curHash === '#/' || curHash === '#' || curHash === '') ? 'active' : ''}"><a href="#/">Home</a></li>
        <li class="nav-item ${(curHash === '#/categories' || curHash === '#/calculators') ? 'active' : ''}"><a href="#/categories">All Calculators</a></li>
        <li class="nav-item ${curHash.includes('/financial') ? 'active' : ''}"><a href="#/category/financial">Finance <span class="nav-calc-word">Calculator</span></a></li>
        <li class="nav-item ${curHash.includes('/math') ? 'active' : ''}"><a href="#/category/math">Math <span class="nav-calc-word">Calculator</span></a></li>
        <li class="nav-item ${curHash.includes('/health') ? 'active' : ''}"><a href="#/category/health">Health &amp; Fitness <span class="nav-calc-word">Calculator</span></a></li>
        <li class="nav-item">
          <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="nav-invest-pill" title="Open Investing Account on Zerodha">
            ${getIconSvg('trending-up', 13)}
            <span class="invest-label-long">Investing Account</span>
            <span class="invest-label-short">Invest</span>
          </a>
        </li>
        <li class="nav-item ${curHash.includes('/favorites') ? 'active' : ''}"><a href="#/favorites">Favorites</a></li>
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
    if (hash === '#/blog/nps' || hash === '#blog/nps' || hash === '#/blog' || (typeof window !== 'undefined' && window.location.pathname && window.location.pathname.endsWith('/blog/nps'))) {
      this.renderNpsBlogPage();
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
            NPS: National Pension System – Complete Guide, Benefits, Returns &amp; Calculator
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
              ${['nps-calculator', 'sip-calculator', 'ppf-calculator', 'retirement-calculator']
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
            <a href="#/calculator/loan-calculator" class="quick-tag">Loan Calculator</a>
            <a href="#/calculator/emi-calculator" class="quick-tag">EMI Calculator</a>
            <a href="#/calculator/bmi-calculator" class="quick-tag">BMI Calculator</a>
            <a href="#/calculator/sip-calculator" class="quick-tag">SIP Calculator</a>
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

      <!-- Direct Investment Options Section -->
      <section class="container" style="margin-top: 2rem; margin-bottom: 2rem;">
        <div class="section-header">
          <div>
            <h2 class="section-title">Start Investing Today</h2>
            <p class="section-desc">Put your financial plans into action with direct, low-cost investments.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
          <!-- Card 1: Invest in Mutual Funds -->
          <div class="glass-panel" style="padding: 2.25rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card); background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%); display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                <div style="width: 50px; height: 50px; border-radius: var(--radius-lg); background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; color: var(--emerald);">
                  ${getIconSvg('wallet', 28)}
                </div>
                <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--emerald); font-weight: 700; padding: 0.3rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em;">
                  ${getIconSvg('sparkles', 13)} Zero Commission
                </span>
              </div>
              <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.65rem; letter-spacing: -0.02em;">
                <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">Invest in Mutual Funds</a>
              </h3>
              <p style="color: var(--text-secondary); font-size: 0.96rem; line-height: 1.6; margin-bottom: 1.75rem;">
                Build long-term compounding wealth with direct mutual funds and automated SIPs. Save up to 1.5% in distributor commissions every year across top equity, debt, and index funds.
              </p>
            </div>
            <div>
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.85rem 1.6rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.95rem; text-decoration: none; width: fit-content; box-shadow: 0 4px 16px var(--emerald-glow);">
                <span>Invest in Mutual Funds</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>

          <!-- Card 2: Invest in Stocks -->
          <div class="glass-panel" style="padding: 2.25rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card); background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%); display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                <div style="width: 50px; height: 50px; border-radius: var(--radius-lg); background: rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; color: var(--indigo);">
                  ${getIconSvg('trending-up', 28)}
                </div>
                <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: var(--indigo); font-weight: 700; padding: 0.3rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em;">
                  ${getIconSvg('sparkles', 13)} Zero Delivery Brokerage
                </span>
              </div>
              <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.65rem; letter-spacing: -0.02em;">
                <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">Invest in Stocks</a>
              </h3>
              <p style="color: var(--text-secondary); font-size: 0.96rem; line-height: 1.6; margin-bottom: 1.75rem;">
                Invest directly in India’s leading companies and ETFs across NSE and BSE with lightning-fast execution, advanced interactive charting, and portfolio analytics.
              </p>
            </div>
            <div>
              <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.85rem 1.6rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.95rem; text-decoration: none; width: fit-content; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);">
                <span>Invest in Stocks</span>
                ${getIconSvg('arrow-right', 16)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- About Us Mission Showcase Section -->
      <section class="container" style="margin-top: 2rem; margin-bottom: 2rem;">
        <div class="glass-panel" style="padding: 2.25rem 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-card); background: linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(30, 41, 59, 0.7) 100%);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
            <div style="max-width: 720px;">
              <div style="display: inline-flex; align-items: center; gap: 0.45rem; background: rgba(16, 185, 129, 0.15); border: 1px solid var(--emerald); color: var(--emerald); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.05em;">
                ${getIconSvg('heart-pulse', 14)} About Us • Our Mission
              </div>
              <h2 style="font-size: 1.65rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; line-height: 1.3; letter-spacing: -0.02em;">
                We are finance enthusiasts trying to help people on calculating all the required finances.
              </h2>
              <p style="color: var(--text-secondary); font-size: 0.98rem; line-height: 1.7; margin: 0;">
                At <strong>letscalculate.in</strong>, we believe everyone deserves transparent, accurate, and completely free financial tools. Whether you're planning a home loan EMI, forecasting SIP wealth, managing debt, or tracking health and daily mathematics, our algorithms give you clarity without signups, paywalls, or hidden agendas.
              </p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem; min-width: 180px;">
              <a href="#/about" class="btn-secondary" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.92rem; text-decoration: none;">
                <span>Read Full Story</span>
                ${getIconSvg('arrow-right', 14)}
              </a>
              <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.82rem; justify-content: center;">
                ${getIconSvg('shield-check', 14)}
                <span>100% Free &amp; Private</span>
              </div>
            </div>
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

    this.bindCardEvents();
  },

  // ==========================================
  // VIEW: ALL CALCULATORS & DIRECTORY PAGE
  // ==========================================
  renderAllCategoriesPage() {
    this.updateSeoMeta(
      'All Calculators Directory - 60+ Free Online Tools | letscalculate.in',
      'Search and filter 60+ verified calculators across Finance, Mathematics, and Health & Fitness. Fast, accurate, and 100% free with no signup required.',
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

    mainEl.innerHTML = `
      <div class="container" style="padding: 2.5rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>All Calculators Directory</span>
        </div>

        <div style="margin-bottom: 2.5rem;">
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 0.6rem; letter-spacing: -0.02em;">All Calculators Directory</h1>
          <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 760px;">
            Search and filter our complete collection of 60+ verified calculators across Finance, Math, and Health &amp; Fitness. 100% Free, no signup required.
          </p>
        </div>

        <!-- 3 Category Quick Domain Cards -->
        <div class="categories-grid" style="margin-bottom: 3.5rem;">
          ${CATEGORIES_DATA.map(cat => {
      const calcs = getCalculatorsByCategory(cat.id);
      return `
              <div class="category-card glass-panel" style="--cat-accent: ${cat.accent};">
                <div>
                  <div class="cat-card-top">
                    <div class="cat-icon-box" style="color: ${cat.accent};">
                      ${getIconSvg(cat.icon, 28)}
                    </div>
                    <span class="cat-count-badge">${calcs.length} Calculators</span>
                  </div>
                  <h3 class="cat-title">${cat.name}</h3>
                  <p class="cat-desc">${cat.description}</p>

                  <div style="margin-bottom: 1.5rem;">
                    <span style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">Featured:</span>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                      ${calcs.slice(0, 4).map(c => `
                        <a href="#/calculator/${c.id}" class="quick-tag" style="font-size: 0.8rem; padding: 0.2rem 0.6rem;">${c.title}</a>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <a href="#/category/${cat.id}" class="cat-footer-link" style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
                  <span>Explore ${cat.name} (${calcs.length})</span>
                  ${getIconSvg('arrow-right', 16)}
                </a>
              </div>
            `;
    }).join('')}
        </div>

        <!-- Interactive Filter & Search Directory Section -->
        <div class="section-header" style="margin-bottom: 1.5rem;">
          <div>
            <h2 class="section-title">Browse &amp; Filter All Calculators</h2>
            <p class="section-desc">Filter by domain or search by keyword to immediately launch any tool.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <input type="text" id="dir-search-input" placeholder="Search 60+ calculators..." style="padding: 0.5rem 1rem; font-size: 0.9rem; width: 260px; border-radius: var(--radius-full); background: var(--bg-surface); border: 1px solid var(--border-card); color: var(--text-primary);">
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="category-filter-nav" id="directory-category-filter" style="margin-bottom: 1.75rem;">
          <button class="cat-filter-btn active" data-cat="all">All (${CALCULATORS_DATA.length})</button>
          ${CATEGORIES_DATA.map(c => `
            <button class="cat-filter-btn" data-cat="${c.id}">${c.name} (${getCalculatorsByCategory(c.id).length})</button>
          `).join('')}
        </div>

        <div class="calculators-grid" id="directory-all-calcs-grid">
          ${CALCULATORS_DATA.map(calc => this.renderCalcCard(calc)).join('')}
        </div>

        <!-- Loading More Calculators Line (User Requirement) -->
        <div class="more-calculators-loading-banner">
          <div class="loading-pulse-indicator">
            <span class="pulse-ring"></span>
            <span class="pulse-dot"></span>
          </div>
          <span class="loading-text">many more calculators are loading</span>
        </div>
      </div>
    `;

    // Filter event listeners
    const filterBtns = mainEl.querySelectorAll('#directory-category-filter .cat-filter-btn');
    const gridEl = mainEl.querySelector('#directory-all-calcs-grid');
    const searchInput = mainEl.querySelector('#dir-search-input');

    let activeCat = 'all';
    let searchQuery = '';

    const applyDirFilter = () => {
      let filtered = activeCat === 'all'
        ? CALCULATORS_DATA
        : CALCULATORS_DATA.filter(c => c.category === activeCat);

      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          (c.formula && c.formula.toLowerCase().includes(q))
        );
      }

      gridEl.innerHTML = filtered.map(calc => this.renderCalcCard(calc)).join('');
      this.bindCardEvents();
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.getAttribute('data-cat') || 'all';
        applyDirFilter();
      });
    });

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyDirFilter();
    });

    this.bindCardEvents();
  },

  // ==========================================
  // VIEW: DEDICATED CATEGORY PAGE
  // ==========================================
  renderCategoryPage(catId) {
    const category = getCategoryById(catId);
    if (!category) {
      window.location.hash = '#/';
      return;
    }

    const calcs = getCalculatorsByCategory(catId);
    this.updateSeoMeta(
      `${category.name} - Free Online Calculators | letscalculate.in`,
      `${category.description || category.tagline}. Accurate, free calculators for ${category.name.toLowerCase()} computations. No signup required.`,
      `https://letscalculate.in/#/category/${category.id}`,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://letscalculate.in/#/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Categories', 'item': 'https://letscalculate.in/#/categories' },
          { '@type': 'ListItem', 'position': 3, 'name': category.name, 'item': `https://letscalculate.in/#/category/${category.id}` }
        ]
      }
    );
    const mainEl = document.getElementById('app-main');

    mainEl.innerHTML = `
      <div class="container" style="padding: 3rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <a href="#/categories">Categories</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>${category.name}</span>
        </div>

        <div style="margin-bottom: 2.5rem; display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
          <div class="cat-icon-box" style="width: 64px; height: 64px; border-radius: var(--radius-xl); color: ${category.accent};">
            ${getIconSvg(category.icon, 34)}
          </div>
          <div>
            <h1 style="font-size: 2.5rem; margin-bottom: 0.25rem;">${category.name}</h1>
            <p style="font-size: 1.1rem; color: var(--text-secondary);">${category.tagline}</p>
          </div>
        </div>

        ${category.disclaimer ? `
          <div class="disclaimer-banner">
            ${getIconSvg('alert-triangle', 20)}
            <div>${category.disclaimer}</div>
          </div>
        ` : ''}

        <!-- Filter and Search within Category -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <p style="font-size: 1rem; color: var(--text-secondary);">Showing <strong>${calcs.length}</strong> calculators in this category</p>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <input type="text" id="cat-search-input" placeholder="Filter ${category.name}..." style="padding: 0.45rem 0.9rem; font-size: 0.9rem; width: 240px;">
          </div>
        </div>

        <div class="calculators-grid" id="category-calcs-grid">
          ${calcs.map(calc => this.renderCalcCard(calc)).join('')}
        </div>

        <!-- Loading More Calculators Line (User Requirement) -->
        <div class="more-calculators-loading-banner">
          <div class="loading-pulse-indicator">
            <span class="pulse-ring"></span>
            <span class="pulse-dot"></span>
          </div>
          <span class="loading-text">More calculators coming soon...</span>
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
  },

  // ==========================================
  // VIEW: DEDICATED CALCULATOR PAGE
  // ==========================================
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
      });
    }

    const mainEl = document.getElementById('app-main');

    mainEl.innerHTML = `
      <div class="container" style="padding: 2.5rem 1.5rem 5rem;">
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
              ${calc.badge ? `<span class="badge badge-emerald">${calc.badge}</span>` : ''}
            </div>
            <div class="calc-actions-toolbar">
              <button class="btn-secondary" id="page-fav-btn" title="Add to Favorites">
                <span id="page-fav-icon">${AppState.isFavorite(calc.id) ? '★ Favorited' : '☆ Favorite'}</span>
              </button>
              <button class="btn-secondary" id="page-share-btn" title="Share Calculator">
                ${getIconSvg('share-2', 16)} Share
              </button>
              <button class="btn-secondary" id="page-print-btn" title="Print Calculation">
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

        <!-- Workspace Container (Custom Keypad, Matrix, or 2-Column Inputs/Results) -->
        <div id="calculator-dynamic-workspace">
          ${this.renderCalculatorWorkspace(calc)}
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

    // Standard 2-Column Form & Visual Dashboard
    return `
      <div class="calc-workspace-grid">
        <!-- Input Form Card -->
        <div class="calc-inputs-card glass-panel">
          <div class="card-title">
            <span>Input Parameters</span>
            <button class="btn-secondary" id="reset-inputs-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
              Reset Default
            </button>
          </div>

          <form id="calc-parameters-form">
            ${(calc.fields || []).map(field => `
              <div class="form-group">
                <div class="form-label-row">
                  <label class="form-label" for="input-${field.id}">${field.label}</label>
                  <span class="form-value-display" id="val-display-${field.id}">
                    ${field.prefix || ''}${field.default}${field.suffix ? ' ' + field.suffix : ''}
                  </span>
                </div>

                ${field.type === 'select' ? `
                  <select class="form-input" id="input-${field.id}" data-id="${field.id}">
                    ${field.options.map(opt => `
                      <option value="${opt.value}" ${opt.value === field.default ? 'selected' : ''}>${opt.label}</option>
                    `).join('')}
                  </select>
                ` : field.type === 'date' ? `
                  <input type="date" class="form-input" id="input-${field.id}" data-id="${field.id}" value="${field.default}">
                ` : field.type === 'time' ? `
                  <input type="time" class="form-input" id="input-${field.id}" data-id="${field.id}" value="${field.default}">
                ` : field.type === 'text' ? `
                  <input type="text" class="form-input" id="input-${field.id}" data-id="${field.id}" value="${field.default}">
                ` : `
                  <div class="input-with-addons">
                    ${field.prefix ? `<span class="input-addon-prefix">${field.prefix}</span>` : ''}
                    <input 
                      type="number" 
                      class="form-input ${field.prefix ? 'has-prefix' : ''} ${field.suffix ? 'has-suffix' : ''}" 
                      id="input-${field.id}" 
                      data-id="${field.id}" 
                      value="${field.default}"
                      min="${field.min !== undefined ? field.min : ''}" 
                      max="${field.max !== undefined ? field.max : ''}" 
                      step="${field.step || 1}"
                    >
                    ${field.suffix ? `<span class="input-addon-suffix">${field.suffix}</span>` : ''}
                  </div>
                  ${field.min !== undefined && field.max !== undefined ? `
                    <input 
                      type="range" 
                      class="form-range-slider" 
                      id="range-${field.id}" 
                      data-id="${field.id}" 
                      value="${field.default}" 
                      min="${field.min}" 
                      max="${field.max}" 
                      step="${field.step || 1}"
                    >
                  ` : ''}
                `}
              </div>
            `).join('')}
          </form>
        </div>

        <!-- Real-Time Results Card -->
        <div class="calc-results-card glass-panel">
          <div class="card-title">
            <span>Live Calculation Summary</span>
            <button class="btn-secondary" id="copy-result-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
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
    // If standard calculator, bind inputs to compute
    if (!calc.customUi) {
      const updateOutputs = () => {
        const result = CalculatorEngine.compute(calc.id, AppState.calcInputs);
        this.renderResults(result);

        // Record to history automatically on significant changes
        if (result.primaryResult) {
          AppState.addHistory(calc.id, calc.title, result.primaryResult.value);
        }
      };

      // Form input listeners
      const formEl = document.getElementById('calc-parameters-form');
      if (formEl) {
        formEl.querySelectorAll('input, select').forEach(input => {
          input.addEventListener('input', (e) => {
            const fieldId = e.target.getAttribute('data-id');
            const val = e.target.value;
            AppState.calcInputs[fieldId] = val;

            // Sync range slider if exists
            const rangeEl = document.getElementById(`range-${fieldId}`);
            if (rangeEl && e.target !== rangeEl) rangeEl.value = val;

            // Sync number input if range was changed
            const numEl = document.getElementById(`input-${fieldId}`);
            if (numEl && e.target === rangeEl) numEl.value = val;

            // Update value display tag
            const fieldDef = calc.fields.find(f => f.id === fieldId);
            const disp = document.getElementById(`val-display-${fieldId}`);
            if (disp && fieldDef) {
              disp.textContent = `${fieldDef.prefix || ''}${val}${fieldDef.suffix ? ' ' + fieldDef.suffix : ''}`;
            }

            updateOutputs();
          });
        });
      }

      // Reset button
      document.getElementById('reset-inputs-btn')?.addEventListener('click', () => {
        calc.fields.forEach(f => {
          AppState.calcInputs[f.id] = f.default;
          const inp = document.getElementById(`input-${f.id}`);
          if (inp) inp.value = f.default;
          const rng = document.getElementById(`range-${f.id}`);
          if (rng) rng.value = f.default;
          const disp = document.getElementById(`val-display-${f.id}`);
          if (disp) disp.textContent = `${f.prefix || ''}${f.default}${f.suffix ? ' ' + f.suffix : ''}`;
        });
        updateOutputs();
        this.showToast('Inputs reset to defaults');
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
    `;

    // Render table if amortization / breakdown exists
    const tableArea = document.getElementById('calc-table-area');
    if (tableArea && result.breakdownTable) {
      tableArea.innerHTML = `
        <div class="table-card glass-panel">
          <h3 style="margin-bottom: 1.25rem;">Amortization Schedule Preview</h3>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  ${result.breakdownTable.headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${result.breakdownTable.rows.map(row => `
                  <tr>
                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
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
          <button class="keypad-btn action" data-key="C">C</button>
          <button class="keypad-btn action" data-key="CE">CE</button>
          <button class="keypad-btn action" data-key="backspace">⌫</button>
          <button class="keypad-btn operator" data-key="/">÷</button>

          <button class="keypad-btn" data-key="7">7</button>
          <button class="keypad-btn" data-key="8">8</button>
          <button class="keypad-btn" data-key="9">9</button>
          <button class="keypad-btn operator" data-key="*">×</button>

          <button class="keypad-btn" data-key="4">4</button>
          <button class="keypad-btn" data-key="5">5</button>
          <button class="keypad-btn" data-key="6">6</button>
          <button class="keypad-btn operator" data-key="-">−</button>

          <button class="keypad-btn" data-key="1">1</button>
          <button class="keypad-btn" data-key="2">2</button>
          <button class="keypad-btn" data-key="3">3</button>
          <button class="keypad-btn operator" data-key="+">+</button>

          <button class="keypad-btn" data-key="+/-">±</button>
          <button class="keypad-btn" data-key="0">0</button>
          <button class="keypad-btn" data-key=".">.</button>
          <button class="keypad-btn operator" data-key="%">%</button>

          <button class="keypad-btn equals" data-key="=" style="grid-column: span 4;">=</button>
        </div>
      </div>
    `;
  },

  initBasicKeypadBehavior() {
    const dispEl = document.getElementById('basic-lcd-display');
    const eqEl = document.getElementById('basic-lcd-eq');

    document.querySelectorAll('.basic-calc-container .keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        const state = KeypadController.handleBasic(key);
        if (dispEl) dispEl.textContent = state.display;
        if (eqEl) eqEl.textContent = state.equation;

        if (key === '=') {
          AppState.addHistory('basic-calculator', 'Basic Calculator', state.display);
        }
      });
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (AppState.currentCalculator?.id !== 'basic-calculator') return;
      let k = e.key;
      if (k === 'Enter') k = '=';
      if (k === 'Escape') k = 'C';
      if (k === 'Backspace') k = 'backspace';

      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', 'C', 'backspace'].includes(k)) {
        e.preventDefault();
        const state = KeypadController.handleBasic(k);
        if (dispEl) dispEl.textContent = state.display;
        if (eqEl) eqEl.textContent = state.equation;
      }
    });
  },

  renderScientificKeypadUi() {
    return `
      <div class="scientific-calc-container glass-panel">
        <div class="calc-lcd-screen">
          <div class="calc-lcd-equation" id="sci-lcd-eq">sin, cos, log, powers...</div>
          <div class="calc-lcd-main" id="sci-lcd-display">0</div>
        </div>

        <div class="scientific-keypad-grid">
          <button class="keypad-btn sci-fn" data-sci="TOGGLE_DEG_RAD" id="deg-rad-btn">DEG</button>
          <button class="keypad-btn sci-fn" data-sci="sin(">sin</button>
          <button class="keypad-btn sci-fn" data-sci="cos(">cos</button>
          <button class="keypad-btn sci-fn" data-sci="tan(">tan</button>
          <button class="keypad-btn action" data-sci="AC">AC</button>

          <button class="keypad-btn sci-fn" data-sci="ln(">ln</button>
          <button class="keypad-btn sci-fn" data-sci="log(">log</button>
          <button class="keypad-btn sci-fn" data-sci="^">x^y</button>
          <button class="keypad-btn sci-fn" data-sci="sqrt(">√</button>
          <button class="keypad-btn action" data-sci="DEL">DEL</button>

          <button class="keypad-btn sci-fn" data-sci="(">(</button>
          <button class="keypad-btn sci-fn" data-sci=")">)</button>
          <button class="keypad-btn sci-fn" data-sci="π">π</button>
          <button class="keypad-btn sci-fn" data-sci="e">e</button>
          <button class="keypad-btn operator" data-sci="/">÷</button>

          <button class="keypad-btn" data-sci="7">7</button>
          <button class="keypad-btn" data-sci="8">8</button>
          <button class="keypad-btn" data-sci="9">9</button>
          <button class="keypad-btn operator" data-sci="*">×</button>
          <button class="keypad-btn operator" data-sci="-">−</button>

          <button class="keypad-btn" data-sci="4">4</button>
          <button class="keypad-btn" data-sci="5">5</button>
          <button class="keypad-btn" data-sci="6">6</button>
          <button class="keypad-btn operator" data-sci="+">+</button>
          <button class="keypad-btn equals" data-sci="=" style="grid-row: span 2; height: 108px;">=</button>

          <button class="keypad-btn" data-sci="1">1</button>
          <button class="keypad-btn" data-sci="2">2</button>
          <button class="keypad-btn" data-sci="3">3</button>
          <button class="keypad-btn" data-sci="0">0</button>
        </div>
      </div>
    `;
  },

  initScientificKeypadBehavior() {
    const dispEl = document.getElementById('sci-lcd-display');
    const eqEl = document.getElementById('sci-lcd-eq');
    const degRadBtn = document.getElementById('deg-rad-btn');

    document.querySelectorAll('.scientific-calc-container .keypad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-sci');
        const state = KeypadController.handleScientific(action);
        if (dispEl) dispEl.textContent = state.result !== '0' ? state.result : (state.expression || '0');
        if (eqEl) eqEl.textContent = state.expression || 'Expression';
        if (degRadBtn) degRadBtn.textContent = state.angleMode.toUpperCase();

        if (action === '=' && state.result !== 'Error') {
          AppState.addHistory('scientific-calculator', 'Scientific Calculator', state.result);
        }
      });
    });
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
          <button class="btn-secondary" id="cd-update-btn">Set Countdown</button>
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
            <button class="btn-secondary" id="gpa-add-row-btn" style="font-size: 0.8rem; padding: 0.35rem 0.65rem;">
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

    return `
      <div class="calc-card glass-panel" data-id="${calc.id}">
        <div>
          <div class="calc-card-header">
            <div class="calc-card-icon">
              ${getIconSvg(calc.icon, 20)}
            </div>
            <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${calc.id}" title="Toggle Favorite">
              ${getIconSvg('star', 18)}
            </button>
          </div>
          <h4 class="calc-card-title">${calc.title}</h4>
          <p class="calc-card-summary">${calc.summary}</p>
        </div>
        <div class="calc-card-footer">
          <span class="badge badge-${cat.color}">${cat.name.split(' ')[0]}</span>
          <span class="calc-card-action">
            Calculate ${getIconSvg('arrow-right', 14)}
          </span>
        </div>
      </div>
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
      // Suggest top popular calculators when search is first opened
      results = CALCULATORS_DATA.filter(c => ['sip-calculator', 'emi-calculator', 'loan-calculator', 'bmi-calculator', 'percentage-calculator', 'gst-calculator', 'compound-interest-calculator', 'fd-calculator'].includes(c.id));
      if (results.length === 0) results = CALCULATORS_DATA.slice(0, 8);
    } else {
      results = searchCalculators(q);
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
          <span class="badge badge-${cat.color}">${cat.name.split(' ')[0]}</span>
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

// Initialize App immediately if DOM is ready, or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    AppUI.init();
  });
} else {
  AppUI.init();
}
