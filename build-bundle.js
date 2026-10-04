const fs = require('fs');
const path = require('path');

console.log('Building bundled index.html for letscalculate.in...');

// 1. Read Styles
const mainCss = fs.readFileSync(path.join(__dirname, 'styles', 'main.css'), 'utf8');
const compCss = fs.readFileSync(path.join(__dirname, 'styles', 'components.css'), 'utf8');
const calcCss = fs.readFileSync(path.join(__dirname, 'styles', 'calculator.css'), 'utf8');
const combinedCss = [mainCss, compCss, calcCss].join('\n\n');

// 2. Read Scripts
const dataJs = fs.readFileSync(path.join(__dirname, 'scripts', 'calculators-data.js'), 'utf8');
const widgetJs = fs.readFileSync(path.join(__dirname, 'scripts', 'converters-and-widgets.js'), 'utf8');
const engineJs = fs.readFileSync(path.join(__dirname, 'scripts', 'calculator-engine.js'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'scripts', 'app.js'), 'utf8');
const combinedJs = [dataJs, widgetJs, engineJs, appJs].join('\n\n');

// 3. Assemble HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>letscalculate.in - Every Calculator You Need, All in One Place</title>
  
  <!-- Canonical & Crawl Directives -->
  <link rel="canonical" href="https://letscalculate.in/">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="letscalculate.in is a high-speed, modern, SEO-friendly all-in-one calculator platform featuring 100+ precision calculators for finance, mathematics, health, fitness, date, time, and unit conversions. 100% Free.">
  <meta name="keywords" content="calculator, loan calculator, emi calculator, mortgage calculator, bmi calculator, percentage calculator, sip calculator, compound interest, unit converter, scientific calculator, financial calculators india, GST calculator">
  <meta name="author" content="letscalculate.in">
  <meta name="theme-color" content="#0a0f1d">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="LetsCalculate">
  
  <!-- OpenGraph & Social Cards -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://letscalculate.in/">
  <meta property="og:site_name" content="letscalculate.in">
  <meta property="og:locale" content="en_IN">
  <meta property="og:title" content="letscalculate.in - Every Calculator You Need, All in One Place">
  <meta property="og:description" content="Access 100+ free, instant, and precision calculators for loans, mortgages, investments, health, algebra, units, and everyday life.">
  <meta property="og:image" content="https://letscalculate.in/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="letscalculate.in Precision Calculator Suite">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@letscalculate_in">
  <meta name="twitter:title" content="letscalculate.in - Precision Calculator Platform">
  <meta name="twitter:description" content="100+ powerful calculators with real-time graphs, formulas, and step-by-step solutions. 100% Free.">
  <meta name="twitter:image" content="https://letscalculate.in/og-image.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='16' height='20' x='4' y='2' rx='2'/%3E%3Cline x1='8' x2='16' y1='6' y2='6'/%3E%3Cline x1='16' x2='16' y1='14' y2='18'/%3E%3Cpath d='M16 10h.01'/%3E%3Cpath d='M12 10h.01'/%3E%3Cpath d='M8 10h.01'/%3E%3Cpath d='M12 14h.01'/%3E%3Cpath d='M8 14h.01'/%3E%3Cpath d='M12 18h.01'/%3E%3Cpath d='M8 18h.01'/%3E%3C/svg%3E">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
${combinedCss}
  </style>

  <!-- Structured Data Schema for SEO (JSON-LD) -->
  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "letscalculate.in",
      "url": "https://letscalculate.in/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://letscalculate.in/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "letscalculate.in",
      "url": "https://letscalculate.in/",
      "logo": "https://letscalculate.in/logo.png",
      "sameAs": []
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "letscalculate.in",
      "url": "https://letscalculate.in/",
      "applicationCategory": "EducationalApplication",
      "applicationSubCategory": "Calculator",
      "description": "Comprehensive suite of 100+ precision calculators for financial calculations, math equations, health metrics, and unit conversions.",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Popular Precision Calculators",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "SIP Calculator",
          "url": "https://letscalculate.in/#/calculator/sip-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "EMI Calculator",
          "url": "https://letscalculate.in/#/calculator/emi-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Loan Calculator",
          "url": "https://letscalculate.in/#/calculator/loan-calculator"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Mortgage Calculator",
          "url": "https://letscalculate.in/#/calculator/mortgage-calculator"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Compound Interest Calculator",
          "url": "https://letscalculate.in/#/calculator/compound-interest-calculator"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "BMI Calculator",
          "url": "https://letscalculate.in/#/calculator/bmi-calculator"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Scientific Calculator",
          "url": "https://letscalculate.in/#/calculator/scientific-calculator"
        }
      ]
    }
  ]
  </script>
</head>
<body>

  <!-- Site Header -->
  <header class="site-header" id="site-header">
    <div class="container header-container">
      <!-- Logo -->
      <a href="#/" class="brand-logo" title="letscalculate.in Home">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="2"/>
            <line x1="8" x2="16" y1="6" y2="6"/>
            <path d="M16 10h.01"/>
            <path d="M12 10h.01"/>
            <path d="M8 10h.01"/>
            <path d="M12 14h.01"/>
            <path d="M8 14h.01"/>
            <path d="M12 18h.01"/>
            <path d="M8 18h.01"/>
          </svg>
        </div>
        <div class="brand-name">LetsCalculate<span class="highlight">.in</span></div>
      </a>

      <!-- Navigation Links -->
      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li class="nav-item active"><a href="#/">Home</a></li>
          <li class="nav-item"><a href="#/categories">Categories</a></li>
          <li class="nav-item"><a href="#/category/financial">Finance</a></li>
          <li class="nav-item"><a href="#/category/math">Math</a></li>
          <li class="nav-item"><a href="#/category/health">Health</a></li>
          <li class="nav-item"><a href="#/category/conversion">Conversions</a></li>
          <li class="nav-item"><a href="#/favorites">Favorites</a></li>
          <li class="nav-item"><a href="#/signup" style="color: var(--emerald); font-weight: 700;">Sign Up Free</a></li>
        </ul>
      </nav>

      <!-- Action Controls -->
      <div class="header-actions">
        <!-- Live Search Trigger -->
        <button class="search-trigger-btn" id="header-search-btn" title="Search Calculators (Press / or ⌘K)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span style="display: none; @media(min-width: 768px){display: inline;}">Search...</span>
          <span class="search-shortcut-badge">/</span>
        </button>

        <!-- Calculation History Drawer Trigger -->
        <button class="icon-btn" id="header-history-btn" title="Calculation History" aria-label="History">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
        </button>

        <!-- Bookmarked Favorites Drawer Trigger -->
        <button class="icon-btn" id="header-favorites-btn" title="Bookmarked Favorites" aria-label="Favorites">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span class="badge-dot" id="fav-count-badge" style="display: none;"></span>
        </button>

        <!-- Dark / Light Theme Toggle -->
        <button class="icon-btn" id="theme-toggle-btn" title="Toggle Theme" aria-label="Toggle Dark/Light Mode">
          <span id="theme-toggle-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          </span>
        </button>

        <!-- Header Auth Actions / Profile Pill -->
        <div class="header-auth-container" id="header-auth-container"></div>
      </div>
    </div>
  </header>

  <!-- Main View Container (Driven by SPA Hash Router) -->
  <main id="app-main" role="main">
    <!-- Populated by AppUI -->
  </main>

  <!-- Live Search Modal -->
  <div class="modal-backdrop" id="search-modal-backdrop" role="dialog" aria-modal="true" aria-label="Search Calculators">
    <div class="search-modal">
      <div class="search-modal-header">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" class="search-modal-input" id="modal-search-input" placeholder="Type a calculator name, topic or formula..." autocomplete="off">
        <button type="button" class="icon-btn" id="close-search-btn" aria-label="Close Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="search-results-list" id="search-results-list"></div>
      <div class="search-modal-footer">
        <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to select</span>
        <span id="search-results-count">80+ calculators</span>
      </div>
    </div>
  </div>

  <!-- History & Favorites Drawers Backdrop -->
  <div class="drawer-backdrop" id="drawer-backdrop"></div>

  <!-- History Drawer -->
  <aside class="drawer" id="history-drawer" aria-label="Calculation History">
    <div class="drawer-header">
      <h3 class="drawer-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
        Recent Calculations
      </h3>
      <button class="icon-btn close-drawer-btn" aria-label="Close Drawer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="drawer-body" id="history-drawer-body"></div>
    <div class="drawer-footer">
      <button class="btn-secondary" id="clear-history-btn" style="color: var(--rose);">Clear History</button>
      <span style="font-size: 0.8rem; color: var(--text-muted);">Saved locally</span>
    </div>
  </aside>

  <!-- Favorites Drawer -->
  <aside class="drawer" id="favorites-drawer" aria-label="Favorite Calculators">
    <div class="drawer-header">
      <h3 class="drawer-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--amber)" stroke="var(--amber)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Favorite Calculators
      </h3>
      <button class="icon-btn close-drawer-btn" aria-label="Close Drawer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="drawer-body" id="favorites-drawer-body"></div>
    <div class="drawer-footer">
      <a href="#/favorites" class="btn-secondary close-drawer-btn">View All Bookmarks</a>
    </div>
  </aside>

  <!-- Toast Notification Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-logo" style="font-size: 1.6rem;">
            <div class="brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
            </div>
            <div class="brand-name">LetsCalculate<span class="highlight">.in</span></div>
          </div>
          <p>
            <strong>“Every Calculator You Need, All in One Place.”</strong><br>
            A high-speed, modern, SEO-friendly online calculator platform engineered for accuracy, ease of use, and visual clarity.
          </p>
        </div>

        <div class="footer-col">
          <h4>Finance & Business</h4>
          <ul class="footer-links">
            <li><a href="#/calculator/loan-calculator">Loan Calculator</a></li>
            <li><a href="#/calculator/emi-calculator">EMI Calculator</a></li>
            <li><a href="#/calculator/mortgage-calculator">Mortgage Calculator</a></li>
            <li><a href="#/calculator/sip-calculator">SIP Calculator</a></li>
            <li><a href="#/calculator/compound-interest-calculator">Compound Interest</a></li>
            <li><a href="#/calculator/profit-margin-calculator">Profit Margin</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Math & Science</h4>
          <ul class="footer-links">
            <li><a href="#/calculator/basic-calculator">Basic Calculator</a></li>
            <li><a href="#/calculator/scientific-calculator">Scientific Calculator</a></li>
            <li><a href="#/calculator/percentage-calculator">Percentage Calculator</a></li>
            <li><a href="#/calculator/fraction-calculator">Fraction Calculator</a></li>
            <li><a href="#/calculator/average-calculator">Average Calculator</a></li>
            <li><a href="#/calculator/quadratic-equation-calculator">Quadratic Solver</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Health & Everyday</h4>
          <ul class="footer-links">
            <li><a href="#/calculator/bmi-calculator">BMI Calculator</a></li>
            <li><a href="#/calculator/tdee-calculator">TDEE & Calorie Burn</a></li>
            <li><a href="#/calculator/age-calculator">Exact Age Calculator</a></li>
            <li><a href="#/calculator/length-converter">Unit Converter</a></li>
            <li><a href="#/calculator/electricity-bill-calculator">Electricity Bill</a></li>
            <li><a href="#/calculator/gpa-calculator">GPA Calculator</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          © 2026 letscalculate.in. All rights reserved. Precision calculations for personal and professional use.
        </div>
        <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap;">
          <a href="#/terms" style="color: var(--text-secondary); text-decoration: underline;">Terms &amp; Conditions</a>
          <span>•</span>
          <a href="#/terms" style="color: var(--text-secondary); text-decoration: underline;">Privacy Policy</a>
          <span>•</span>
          <a href="#/categories" style="color: var(--text-secondary); text-decoration: underline;">All Categories</a>
          <span>•</span>
          <a href="#/signup" style="color: var(--emerald); text-decoration: underline; font-weight: 600;">Sign Up Free</a>
        </div>
        <div>
          Financial and health calculations are for educational purposes. Consult certified advisors for professional guidance.
        </div>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script>
${combinedJs}
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');
const stats = fs.statSync(path.join(__dirname, 'index.html'));
console.log(`Successfully built index.html! (${(stats.size / 1024).toFixed(1)} KB)`);
