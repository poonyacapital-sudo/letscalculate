const fs = require('fs');
const path = require('path');

console.log('Building bundled index.html for Branch-Antigravity (Finance, Math & Health)...');

// 1. Read Styles (Only Core, Components & Calculator - No Learning CSS)
const mainCss = fs.readFileSync(path.join(__dirname, 'styles', 'main.css'), 'utf8');
const compCss = fs.readFileSync(path.join(__dirname, 'styles', 'components.css'), 'utf8');
const calcCss = fs.readFileSync(path.join(__dirname, 'styles', 'calculator.css'), 'utf8');
const combinedCss = [mainCss, compCss, calcCss].join('\n\n');

// 2. Read Scripts (No Learning Data, No Unit Converter Widgets)
const dataJs = fs.readFileSync(path.join(__dirname, 'scripts', 'calculators-data.js'), 'utf8');
const engineJs = fs.readFileSync(path.join(__dirname, 'scripts', 'calculator-engine.js'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'scripts', 'app.js'), 'utf8');
const combinedJs = [dataJs, engineJs, appJs].join('\n\n');

// 3. Assemble HTML
const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>letscalculate.in - Free Precision Finance, Math &amp; Health Calculators</title>
  
  <!-- Security Directives -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Canonical & Crawl Directives -->
  <link rel="canonical" href="https://letscalculate.in/">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="We are finance enthusiasts trying to help people on calculating all the required finances. Access 60+ free precision calculators for SIP, EMI, loans, stocks, math, and health. 100% Free, no signup required.">
  <meta name="keywords" content="finance calculator, emi calculator, sip calculator, mutual fund calculator, stock calculator, loan calculator, math calculator, health calculator, percentage calculator, compound interest, bmi calculator, free calculators india, financial planning tools">
  <meta name="author" content="letscalculate.in">
  <meta name="theme-color" content="#080c14">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="LetsCalculate">
  
  <!-- OpenGraph & Social Cards -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://letscalculate.in/">
  <meta property="og:site_name" content="letscalculate.in">
  <meta property="og:locale" content="en_IN">
  <meta property="og:title" content="letscalculate.in - Free Precision Finance, Math &amp; Health Calculators">
  <meta property="og:description" content="We are finance enthusiasts trying to help people on calculating all the required finances with 60+ free instant calculators. No signup required.">
  <meta property="og:image" content="https://letscalculate.in/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="letscalculate.in Free Precision Calculator Platform">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@letscalculate_in">
  <meta name="twitter:title" content="letscalculate.in - Precision Financial, Math &amp; Health Calculators">
  <meta name="twitter:description" content="We are finance enthusiasts trying to help people on calculating all the required finances. 100% Free instant calculators.">
  <meta name="twitter:image" content="https://letscalculate.in/og-image.png">

  <!-- Structured Data Schema for SEO (JSON-LD) -->
  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "letscalculate.in",
      "url": "https://letscalculate.in/",
      "description": "We are finance enthusiasts trying to help people on calculating all the required finances.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://letscalculate.in/#/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "letscalculate.in",
      "url": "https://letscalculate.in/",
      "logo": "https://letscalculate.in/favicon.ico",
      "description": "We are finance enthusiasts trying to help people on calculating all the required finances."
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "letscalculate.in Calculator Suite",
      "url": "https://letscalculate.in/",
      "applicationCategory": "FinanceApplication",
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
      "name": "Popular Calculators",
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
          "name": "BMI Calculator",
          "url": "https://letscalculate.in/#/calculator/bmi-calculator"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Percentage Calculator",
          "url": "https://letscalculate.in/#/calculator/percentage-calculator"
        }
      ]
    }
  ]
  </script>
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='16' height='20' x='4' y='2' rx='2'/%3E%3Cline x1='8' x2='16' y1='6' y2='6'/%3E%3Cline x1='16' x2='16' y1='14' y2='18'/%3E%3Cpath d='M16 10h.01'/%3E%3Cpath d='M12 10h.01'/%3E%3Cpath d='M8 10h.01'/%3E%3Cpath d='M12 14h.01'/%3E%3Cpath d='M8 14h.01'/%3E%3Cpath d='M12 18h.01'/%3E%3Cpath d='M8 18h.01'/%3E%3C/svg%3E">

  <!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
${combinedCss}
  </style>
</head>
<body>

  <!-- Site Header (Antigravity Modern Style) -->
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

      <!-- Navigation Links: Home, All Calculators, 3 Categories & Favorites -->
      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li class="nav-item active"><a href="#/">Home</a></li>
          <li class="nav-item"><a href="#/categories">All Calculators</a></li>
          <li class="nav-item"><a href="#/category/financial">Finance <span class="nav-calc-word">Calculator</span></a></li>
          <li class="nav-item"><a href="#/category/math">Math <span class="nav-calc-word">Calculator</span></a></li>
          <li class="nav-item"><a href="#/category/health">Health &amp; Fitness <span class="nav-calc-word">Calculator</span></a></li>
          <li class="nav-item">
            <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="nav-invest-pill" title="Open Investing Account on Zerodha">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              <span class="invest-label-long">Investing Account</span>
              <span class="invest-label-short">Invest</span>
            </a>
          </li>
          <li class="nav-item"><a href="#/favorites">Favorites</a></li>
          <li class="nav-item">
            <button type="button" class="open-feedback-modal-btn" title="Open Feedback Form" style="background: none; border: none; font-family: inherit; font-size: 0.88rem; font-weight: 500; color: var(--text-secondary); padding: 0.38rem 0.65rem; border-radius: var(--radius-md); display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
              Feedback
            </button>
          </li>
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

        <!-- Mobile Navigation Menu Toggle Button (Visible on mobile/tablet <= 900px) -->
        <button class="icon-btn mobile-menu-toggle-btn" id="mobile-menu-btn" title="Open Menu" aria-label="Open Navigation Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Main View Container -->
  <main id="app-main"></main>

  <!-- Search Modal Overlay -->
  <div class="modal-backdrop" id="search-modal-backdrop">
    <div class="search-modal">
      <div class="search-modal-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" id="global-search-input" placeholder="Search Finance, Math &amp; Health Calculators..." autocomplete="off">
        <button class="modal-close-btn" id="close-search-modal" aria-label="Close search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="search-results-list" id="global-search-results"></div>
    </div>
  </div>

  <!-- Feedback Popup Modal Overlay (Requested Feature) -->
  <div class="modal-backdrop" id="feedback-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="feedback-modal-title">
    <div class="feedback-modal glass-panel">
      <div class="feedback-modal-header">
        <div class="feedback-modal-header-text">
          <div class="feedback-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Feedback &amp; Suggestions</span>
          </div>
          <h2 class="feedback-modal-title" id="feedback-modal-title">Help Us Improve letscalculate.in</h2>
          <p class="feedback-modal-subtitle">We read every submission to keep our tools 100% free, fast, and accurate.</p>
        </div>
        <button class="modal-close-btn" id="close-feedback-modal" aria-label="Close feedback modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div class="feedback-modal-body">
        <!-- Server Alert Banner -->
        <div class="fb-server-alert" id="fb-server-alert" style="display: none;" role="alert"></div>

        <!-- Success Confirmation Card -->
        <div class="fb-success-card" id="fb-success-card" style="display: none;" role="status">
          <div class="fb-success-icon-wrap">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 class="fb-success-title">Thank you for your feedback!</h3>
          <p class="fb-success-desc">
            Your feedback has been securely recorded in our database. We appreciate your valuable insights in making letscalculate.in the best free financial calculation suite.
          </p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="btn-secondary fb-btn-reset" id="fb-submit-another-btn">
              Submit Another Feedback
            </button>
            <button type="button" class="btn-primary fb-btn-done-highlight" id="fb-close-success-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Done &amp; Close</span>
            </button>
          </div>
        </div>

        <!-- Feedback Form -->
        <form class="feedback-form" id="feedback-form" novalidate>
          <div class="fb-grid-3">
            <!-- Name Input (Alphabets only) -->
            <div class="fb-form-group" id="group-fb-name">
              <label for="fb-name" class="fb-label">
                <span>Name</span>
                <span class="fb-required-mark">*</span>
              </label>
              <div class="fb-input-wrapper">
                <span class="fb-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input type="text" id="fb-name" name="name" class="fb-input" placeholder="e.g. Poonya Kumar" autocomplete="name" required>
              </div>
              <div class="fb-field-error" id="fb-name-error" aria-live="polite"></div>
            </div>

            <!-- Email Input (Valid email format) -->
            <div class="fb-form-group" id="group-fb-email">
              <label for="fb-email" class="fb-label">
                <span>Email</span>
                <span class="fb-required-mark">*</span>
              </label>
              <div class="fb-input-wrapper">
                <span class="fb-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <input type="email" id="fb-email" name="email" class="fb-input" placeholder="example@example.com" autocomplete="email" required>
              </div>
              <div class="fb-field-error" id="fb-email-error" aria-live="polite"></div>
            </div>

            <!-- Phone Number Input (10 digits only) -->
            <div class="fb-form-group" id="group-fb-phone">
              <label for="fb-phone" class="fb-label">
                <span>Phone Number</span>
                <span class="fb-required-mark">*</span>
              </label>
              <div class="fb-input-wrapper">
                <span class="fb-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <input type="tel" id="fb-phone" name="phone_number" class="fb-input" placeholder="10 digits only" maxlength="10" autocomplete="tel" required>
              </div>
              <div class="fb-field-error" id="fb-phone-error" aria-live="polite"></div>
            </div>
          </div>

          <!-- What is best here (Textarea, min 10 chars, required) -->
          <div class="fb-form-group" id="group-fb-best">
            <div class="fb-label-row">
              <label for="fb-best" class="fb-label">
                <span>What is best here</span>
                <span class="fb-required-mark">*</span>
              </label>
              <span class="fb-counter" id="fb-best-counter">0 / 10 min chars</span>
            </div>
            <textarea id="fb-best" name="best_here" class="fb-textarea" rows="3" placeholder="Tell us what you like most about letscalculate.in (minimum 10 characters)..." required></textarea>
            <div class="fb-field-error" id="fb-best-error" aria-live="polite"></div>
          </div>

          <!-- What can be improved or added (Textarea, optional, min 10 chars if filled) -->
          <div class="fb-form-group" id="group-fb-improvements">
            <div class="fb-label-row">
              <label for="fb-improvements" class="fb-label">
                <span>What can be improved or added</span>
                <span class="fb-optional-mark">(Optional)</span>
              </label>
              <span class="fb-counter" id="fb-improvements-counter">Optional (10 min if filled)</span>
            </div>
            <textarea id="fb-improvements" name="improvements" class="fb-textarea" rows="3" placeholder="Any calculators or features to improve or add? (minimum 10 characters if filled)..."></textarea>
            <div class="fb-field-error" id="fb-improvements-error" aria-live="polite"></div>
          </div>

          <!-- Actions -->
          <div class="fb-actions">
            <button type="submit" class="btn-primary fb-submit-btn" id="fb-submit-btn">
              <span>Submit Feedback</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
            <div class="fb-security-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Feedback is stored securely in our database. No spam.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- History Drawer -->
  <div class="drawer-backdrop" id="drawer-backdrop"></div>
  <aside class="drawer" id="history-drawer" aria-label="Calculation History">
    <div class="drawer-header">
      <div class="drawer-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
        <span>Calculation History</span>
      </div>
      <button class="modal-close-btn" id="close-history-drawer" aria-label="Close history">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="drawer-body" id="history-list"></div>
    <div class="drawer-footer">
      <button class="btn-secondary" id="clear-history-btn" style="width: 100%;">Clear History</button>
    </div>
  </aside>

  <!-- Favorites Drawer -->
  <aside class="drawer" id="favorites-drawer" aria-label="Bookmarked Favorites">
    <div class="drawer-header">
      <div class="drawer-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>Favorites</span>
      </div>
      <button class="modal-close-btn" id="close-favorites-drawer" aria-label="Close favorites">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="drawer-body" id="favorites-list"></div>
  </aside>

  <!-- Mobile Navigation Drawer -->
  <aside class="drawer" id="mobile-nav-drawer" aria-label="Mobile Navigation Menu">
    <div class="drawer-header">
      <div class="drawer-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        <span>Navigation Menu</span>
      </div>
      <button class="modal-close-btn close-drawer-btn" id="close-mobile-nav-drawer" aria-label="Close navigation">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div class="drawer-body mobile-nav-drawer-body">
      <ul class="mobile-drawer-links">
        <li>
          <a href="#/" class="mobile-drawer-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#/categories" class="mobile-drawer-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            <span>All Calculators (60+)</span>
          </a>
        </li>
        <li>
          <a href="#/category/financial" class="mobile-drawer-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Finance Calculators</span>
          </a>
        </li>
        <li>
          <a href="#/category/math" class="mobile-drawer-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="8" x2="16" y1="9" y2="9"/><line x1="8" x2="16" y1="15" y2="15"/></svg>
            <span>Math Calculators</span>
          </a>
        </li>
        <li>
          <a href="#/category/health" class="mobile-drawer-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span>Health &amp; Fitness</span>
          </a>
        </li>
        <li>
          <a href="#/blog/nps" class="mobile-drawer-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
            <span>NPS Educational Guide &amp; Blog</span>
          </a>
        </li>
        <li>
          <a href="#/calculator/nps-calculator" class="mobile-drawer-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/></svg>
            <span>NPS Calculator</span>
          </a>
        </li>
        <li>
          <a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer" class="mobile-drawer-link mobile-invest-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <span>Investing Account (Zerodha)</span>
          </a>
        </li>
        <li>
          <button type="button" class="mobile-drawer-link open-feedback-modal-btn" style="width: 100%; background: none; border: none; text-align: left; font-family: inherit; font-size: 0.95rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>Feedback Form</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>

  <!-- Toast Notification Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Site Footer (Antigravity Style) -->
  <footer class="site-footer">
    <div class="container footer-top">
      <div class="footer-col brand-col">
        <div class="brand-logo">
          <div class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
          </div>
          <div class="brand-name">LetsCalculate<span class="highlight">.in</span></div>
        </div>
        <p class="footer-tagline">
          Precision calculators for personal finance, mathematics, and health metrics. 100% Free, instant access, no signup required.
        </p>
      </div>

      <div class="footer-col about-col">
        <h4>About Us</h4>
        <p class="footer-about-text">
          We are finance enthusiasts trying to help people on calculating all the required finances. Our platform is built to provide transparent, fast, and mathematically validated calculation tools for smarter financial planning.
        </p>
      </div>

      <div class="footer-col legal-col">
        <h4>Legal</h4>
        <ul class="footer-links">
          <li><a href="#/privacy">Privacy Policy</a></li>
          <li><a href="#/terms">Terms of Service</a></li>
        </ul>
      </div>

      <div class="footer-col platform-col">
        <h4>Platform</h4>
        <ul class="footer-links">
          <li><a href="#/about">About Us</a></li>
          <li><a href="#/categories">All Calculators</a></li>
          <li><a href="#/category/financial">Finance Calculator</a></li>
          <li><a href="#/calculator/nps-calculator">NPS Calculator</a></li>
          <li><a href="#/blog/nps">NPS Guide &amp; Blog</a></li>
          <li><a href="javascript:void(0)" class="open-feedback-modal-btn">Feedback Form</a></li>
          <li><a href="https://zerodha.com/open-account?c=ZAPCVV" target="_blank" rel="noopener noreferrer">Investing Account</a></li>
          <li><a href="#/favorites">Favorites</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <div class="footer-copy">&copy; ${new Date().getFullYear()} letscalculate.in. All rights reserved.</div>
        <div class="footer-badge">Finance, Math &amp; Health Suite • 100% Free</div>
      </div>
    </div>
  </footer>

  <!-- Bundled Application Logic -->
  <script>
${combinedJs}
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');
console.log('Successfully built index.html for Branch-Antigravity! (' + (Buffer.byteLength(htmlContent, 'utf8') / 1024).toFixed(1) + ' KB)');
