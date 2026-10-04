/**
 * letscalculate.in - Main Application Controller & Router
 * State management, URL hash routing, DOM rendering, live search,
 * favorites, history drawer, and event delegation.
 */

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
    'alert-triangle': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`
  };
  return icons[iconName] || icons['calculator'];
}

// App State
const AppState = {
  theme: localStorage.getItem('letscalculate_theme') || 'dark',
  favorites: JSON.parse(localStorage.getItem('letscalculate_favs') || '[]'),
  history: JSON.parse(localStorage.getItem('letscalculate_history') || '[]'),
  currentCalculator: null,
  calcInputs: {},
  countdownInterval: null,
  worldClockInterval: null,

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
  init() {
    // Apply theme
    document.documentElement.setAttribute('data-theme', AppState.theme);

    // Setup global listeners
    this.setupEventListeners();

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
    const searchInput = document.getElementById('modal-search-input');

    const openSearch = () => {
      searchModal.classList.add('open');
      searchInput.value = '';
      searchInput.focus();
      this.renderSearchResults('');
    };

    const closeSearch = () => {
      searchModal.classList.remove('open');
    };

    document.getElementById('header-search-btn')?.addEventListener('click', openSearch);
    document.getElementById('hero-search-trigger')?.addEventListener('click', openSearch);
    document.getElementById('close-search-btn')?.addEventListener('click', closeSearch);

    searchModal?.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    // Keyboard shortcut '/' or 'Cmd+K'
    window.addEventListener('keydown', (e) => {
      if ((e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && searchModal.classList.contains('open')) {
        closeSearch();
      }
    });

    searchInput?.addEventListener('input', (e) => {
      this.renderSearchResults(e.target.value);
    });

    // History & Favorites Drawers
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const historyDrawer = document.getElementById('history-drawer');
    const favDrawer = document.getElementById('favorites-drawer');

    const closeDrawers = () => {
      drawerBackdrop.classList.remove('open');
      historyDrawer?.classList.remove('open');
      favDrawer?.classList.remove('open');
    };

    document.getElementById('header-history-btn')?.addEventListener('click', () => {
      drawerBackdrop.classList.add('open');
      historyDrawer?.classList.add('open');
      this.renderHistoryDrawer();
    });

    document.getElementById('header-favorites-btn')?.addEventListener('click', () => {
      drawerBackdrop.classList.add('open');
      favDrawer?.classList.add('open');
      this.renderFavoritesDrawer();
    });

    document.querySelectorAll('.close-drawer-btn').forEach(btn => {
      btn.addEventListener('click', closeDrawers);
    });

    drawerBackdrop?.addEventListener('click', closeDrawers);

    // Clear history
    document.getElementById('clear-history-btn')?.addEventListener('click', () => {
      AppState.clearHistory();
    });
  },

  updateHeaderBadges() {
    const favBadge = document.getElementById('fav-count-badge');
    if (favBadge) {
      favBadge.textContent = AppState.favorites.length;
      favBadge.style.display = AppState.favorites.length > 0 ? 'inline-block' : 'none';
    }
  },

  showToast(message, icon = 'check') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${getIconSvg(icon, 18)}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  },

  handleRoute() {
    // Clear any timers
    if (AppState.countdownInterval) clearInterval(AppState.countdownInterval);
    if (AppState.worldClockInterval) clearInterval(AppState.worldClockInterval);

    let hash = window.location.hash || '#/';
    if (hash.includes('?')) {
      hash = hash.split('?')[0];
    }
    if (hash.length > 2 && hash.endsWith('/')) {
      hash = hash.slice(0, -1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (hash === '#/' || hash === '#' || hash === '') {
      this.renderHomePage();
    } else if (hash === '#/categories') {
      this.renderAllCategoriesPage();
    } else if (hash.startsWith('#/category/')) {
      const catId = hash.replace('#/category/', '');
      this.renderCategoryPage(catId);
    } else if (hash.startsWith('#/calculator/')) {
      const calcId = hash.replace('#/calculator/', '');
      this.renderCalculatorPage(calcId);
    } else if (hash === '#/favorites') {
      this.renderFavoritesPage();
    } else {
      this.renderHomePage();
    }
  },

  // ==========================================
  // VIEW: HOME PAGE
  // ==========================================
  renderHomePage() {
    document.title = 'letscalculate.in - Every Calculator You Need, All in One Place';
    const mainEl = document.getElementById('app-main');

    // Popular Calculators
    const popularCalcs = CALCULATORS_DATA.filter(c => c.badge === 'Popular' || c.badge === 'Essential').slice(0, 8);

    mainEl.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-glow-bg"></div>
        <div class="container hero-content">
          <div class="hero-tagline-pill">
            ${getIconSvg('calculator', 16)} 80+ Precision Calculators & Tools
          </div>
          <h1 class="hero-title">
            Every Calculator You Need, <br>
            <span class="text-gradient">All in One Place.</span>
          </h1>
          <p class="hero-subtitle">
            Fast, responsive, and beautifully designed calculators for personal finance, mathematics, health metrics, unit conversions, and everyday business.
          </p>

          <!-- Interactive Search Trigger Box -->
          <div class="hero-search-wrapper">
            <div class="hero-search-input-box" id="hero-search-trigger" style="cursor: pointer;">
              ${getIconSvg('search', 20)}
              <input type="text" placeholder="Search 80+ calculators (e.g. Loan, EMI, BMI, Percentage, SIP)..." readonly>
              <button class="hero-search-submit" type="button">
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
            <a href="#/calculator/age-calculator" class="quick-tag">Age Calculator</a>
          </div>
        </div>
      </section>

      <!-- Main Categories Section -->
      <section class="container" style="padding-top: 1rem;">
        <div class="section-header">
          <div>
            <h2 class="section-title">Explore Main Categories</h2>
            <p class="section-desc">Browse specialized calculators organized into 7 primary domains.</p>
          </div>
          <a href="#/categories" class="btn-secondary">
            View All Categories ${getIconSvg('arrow-right', 16)}
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

      <!-- Popular Calculators Showcase -->
      <section class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Most Popular Calculators</h2>
            <p class="section-desc">The most trusted tools used daily by millions of users.</p>
          </div>
        </div>

        <div class="calculators-grid">
          ${popularCalcs.map(calc => this.renderCalcCard(calc)).join('')}
        </div>
      </section>

      <!-- All Calculators Interactive Explorer -->
      <section class="container" style="margin-bottom: 5rem;">
        <div class="section-header">
          <div>
            <h2 class="section-title">All Calculators Directory</h2>
            <p class="section-desc">Filter and quickly launch any calculator in our catalog.</p>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="category-filter-nav" id="home-category-filter">
          <button class="cat-filter-btn active" data-cat="all">All (80+)</button>
          ${CATEGORIES_DATA.map(c => `
            <button class="cat-filter-btn" data-cat="${c.id}">${c.name}</button>
          `).join('')}
        </div>

        <div class="calculators-grid" id="home-all-calcs-grid">
          ${CALCULATORS_DATA.map(calc => this.renderCalcCard(calc)).join('')}
        </div>
      </section>
    `;

    // Filter event listeners
    const filterBtns = mainEl.querySelectorAll('#home-category-filter .cat-filter-btn');
    const gridEl = mainEl.querySelector('#home-all-calcs-grid');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedCat = btn.getAttribute('data-cat');
        const filtered = selectedCat === 'all' 
          ? CALCULATORS_DATA 
          : CALCULATORS_DATA.filter(c => c.category === selectedCat);

        gridEl.innerHTML = filtered.map(calc => this.renderCalcCard(calc)).join('');
        this.bindCardEvents();
      });
    });

    this.bindCardEvents();
  },

  // ==========================================
  // VIEW: ALL CATEGORIES PAGE
  // ==========================================
  renderAllCategoriesPage() {
    document.title = 'Calculator Categories - letscalculate.in';
    const mainEl = document.getElementById('app-main');

    mainEl.innerHTML = `
      <div class="container" style="padding: 3rem 1.5rem 5rem;">
        <div class="calc-breadcrumb">
          <a href="#/">Home</a>
          <span class="calc-breadcrumb-separator">/</span>
          <span>Categories</span>
        </div>

        <div style="margin-bottom: 3rem;">
          <h1 style="font-size: 2.75rem; margin-bottom: 0.75rem;">Calculator Categories</h1>
          <p style="font-size: 1.15rem; color: var(--text-secondary); max-width: 720px;">
            Choose a domain below to browse our comprehensive suite of calculators with live mathematical verification, formulas, and step-by-step guides.
          </p>
        </div>

        <div class="categories-grid">
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
                  <span>View All ${calcs.length} Calculators</span>
                  ${getIconSvg('arrow-right', 16)}
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
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
    document.title = `${category.name} - letscalculate.in`;
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
    document.title = `${calc.title} - letscalculate.in | Accurate & Instant Online Calculator`;

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

      if (['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','=','C','backspace'].includes(k)) {
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
    document.title = 'Saved Favorite Calculators - letscalculate.in';
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
    const listEl = document.getElementById('search-results-list');
    const countEl = document.getElementById('search-results-count');
    if (!listEl) return;

    const results = searchCalculators(query);
    if (countEl) countEl.textContent = `${results.length} found`;

    if (results.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
          No calculators found matching "${query}". Try searching "loan", "bmi", "mortgage", or "percent".
        </div>
      `;
      return;
    }

    listEl.innerHTML = results.slice(0, 15).map(calc => {
      const cat = getCategoryById(calc.category);
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
    const body = document.getElementById('history-drawer-body');
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
    const body = document.getElementById('favorites-drawer-body');
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
