/**
 * letscalculate.in - Calculator Registry & Metadata
 * Working Functionalities:
 * - Finance Calculator
 * - Math Calculator
 * - Health and Fitness Calculator
 * 100% Free - Public Access - No Signup Required
 */

const CATEGORIES_DATA = [
  {
    "id": "financial",
    "name": "Finance Calculator",
    "tagline": "Loans, Investments, Taxes & Wealth Management",
    "description": "Empower your financial decisions with professional calculators for loans, mortgages, investments, retirement, and tax planning.",
    "color": "emerald",
    "icon": "wallet",
    "accent": "#10b981"
  },
  {
    "id": "math",
    "name": "Math Calculator",
    "tagline": "Algebra, Geometry, Statistics & Scientific Tools",
    "description": "Solve mathematical problems instantly with interactive scientific keypads, equation solvers, statistics analyzers, and geometry tools.",
    "color": "indigo",
    "icon": "square-root",
    "accent": "#6366f1"
  },
  {
    "id": "health",
    "name": "Health and Fitness Calculator",
    "tagline": "Body Metrics, Calorie Burn, Macros & Hydration",
    "description": "Track body composition, metabolic rates, nutrition targets, and workout pacing with evidence-based health algorithms.",
    "disclaimer": "Disclaimer: The health and fitness calculators on letscalculate.in are provided strictly for informational and educational purposes. They do not constitute medical advice, diagnosis, or treatment. Consult a physician or certified dietitian before starting any diet or exercise regimen.",
    "color": "rose",
    "icon": "heart-pulse",
    "accent": "#f43f5e"
  }
];



const CALCULATOR_HUB_TAXONOMY = {
  finance: {
    id: 'finance',
    categoryId: 'financial',
    name: 'Finance',
    icon: 'wallet',
    accent: '#10b981',
    badge: 'Wealth & Loans',
    tagline: 'Loans, SIPs, Active Trading & Investments',
    subcategories: {
      'emi-loans': {
        id: 'emi-loans',
        name: 'EMI & Loan Calculators',
        icon: 'landmark',
        description: 'Calculate monthly EMIs, total interest, and borrowing affordability across homes, cars, personal loans, and reverse loans.',
        calculatorIds: [
          'home-loan-calculator',
          'home-purchase-planner',
          'car-loan-calculator',
          'personal-loan-calculator',
          'loan-reverse-calculator',
          'emi-calculator',
          'mortgage-calculator',
          'loan-affordability-calculator',
          'compare-loan-calculator'
        ]
      },
      'sip': {
        id: 'sip',
        name: 'SIP Calculators',
        icon: 'repeat',
        description: 'Model systematic wealth accumulation through basic SIPs, advanced inflation-adjusted plans, annual step-up compounding, and goal planning.',
        calculatorIds: [
          'sip-calculator',
          'advanced-sip-calculator',
          'sip-step-up-calculator',
          'sip-goal-planner',
          'swp-calculator',
          'lumpsum-calculator'
        ]
      },
      'trading': {
        id: 'trading',
        name: 'Trading Calculators',
        icon: 'trending-up',
        description: 'Calculate net trading payoffs, broker commission & statutory taxes, margin leverage, and derivative contracts.',
        calculatorIds: [
          'brokerage-calculator',
          'margin-calculator',
          'options-profit-calculator',
          'futures-calculator',
          'profit-margin-calculator',
          'break-even-calculator'
        ]
      },
      'investments': {
        id: 'investments',
        name: 'Investment Calculators',
        icon: 'wallet',
        description: 'Analyze capital appreciation with ROI formulas, compound interest schedules, retirement milestones, and mutual fund rolling CAGR.',
        calculatorIds: [
          'us-stocks-calculator',
          'roi-calculator',
          'compound-interest-calculator',
          'retirement-calculator',
          'mutual-fund-returns-calculator',
          'cagr-calculator',
          'ppf-calculator',
          'nps-calculator',
          'fd-calculator'
        ]
      }
    }
  },
  math: {
    id: 'math',
    categoryId: 'math',
    name: 'Math',
    icon: 'square-root',
    accent: '#6366f1',
    badge: 'Arithmetic & Analysis',
    tagline: 'Arithmetic, Advanced Algebra, Trigonometry & Matrices',
    subcategories: {
      'basic-math': {
        id: 'basic-math',
        name: 'Basic Math Tools',
        icon: 'calculator',
        description: 'Essential arithmetic calculations with step-by-step column breakdowns for addition, subtraction, multiplication, and long division.',
        calculatorIds: [
          'addition-calculator',
          'subtraction-calculator',
          'multiplication-calculator',
          'division-calculator',
          'basic-calculator',
          'fraction-calculator'
        ]
      },
      'advanced-math': {
        id: 'advanced-math',
        name: 'Advanced Math Tools',
        icon: 'layers',
        description: 'Solve polynomial roots, trigonometric values, 2D/3D matrix operations, permutations, combinations, and probability distributions.',
        calculatorIds: [
          'algebra-solver',
          'trigonometry-calculator',
          'matrix-calculator',
          'probability-calculator',
          'standard-deviation-calculator',
          'scientific-calculator',
          'quadratic-equation-calculator'
        ]
      },
      'comparison-affordability': {
        id: 'comparison-affordability',
        name: 'Comparison & Affordability Tools',
        icon: 'percentage',
        description: 'Compare numeric ratios, evaluate percentage increases, explore integer prime factor trees, and calculate chronological calendar metrics.',
        calculatorIds: [
          'ratio-calculator',
          'percentage-calculator',
          'prime-factorization-calculator',
          'age-calendar-calculator',
          'prime-number-calculator',
          'gcd-lcm-calculator'
        ]
      }
    }
  },
  health: {
    id: 'health',
    categoryId: 'health',
    name: 'Health',
    icon: 'heart-pulse',
    accent: '#f43f5e',
    badge: 'Clinical & Wellness',
    tagline: 'Body Metrics, Medical Scoring & Nutrition Planning',
    subcategories: {
      'general-health': {
        id: 'general-health',
        name: 'General Health',
        icon: 'activity',
        description: 'Evidence-based body composition metrics, metabolic energy expenditure, and healthy weight targets.',
        calculatorIds: [
          'bmi-calculator',
          'calorie-calculator',
          'ideal-weight-calculator',
          'bmr-calculator',
          'tdee-calculator',
          'body-fat-calculator'
        ]
      },
      'medical-scores': {
        id: 'medical-scores',
        name: 'Medical Scores',
        icon: 'shield-check',
        description: 'Validated clinical assessment tools: Newborn Apgar score, Glasgow Coma Scale (GCS), CKD-EPI Glomerular Filtration Rate, and Parkland burn fluids.',
        calculatorIds: [
          'apgar-score-calculator',
          'glasgow-coma-scale-calculator',
          'gfr-calculator',
          'burns-fluid-calculator'
        ]
      },
      'wellness-lifestyle': {
        id: 'wellness-lifestyle',
        name: 'Wellness & Lifestyle',
        icon: 'coffee',
        description: 'Healthcare financing through emergency medical loans, pregnancy gestational age milestones, and macro nutrition planning.',
        calculatorIds: [
          'medical-loan-calculator',
          'due-date-calculator',
          'pregnancy-calculator',
          'nutrition-planner',
          'macro-calculator',
          'water-intake-calculator'
        ]
      }
    }
  }
};

const EMI_SUITE_CATEGORIES = {
  tools: {
    id: 'tools',
    name: 'Basic & Advanced Tools',
    icon: '🛠️',
    calculators: [
      { id: 'emi-calculator', name: 'EMI Basic Calculator', badge: 'Essential' },
      { id: 'emi-advance-calculator', name: 'EMI Advance Calculator', badge: 'Advanced' },
      { id: 'emi-table-generator', name: 'EMI Table Generator', badge: 'Schedule' },
      { id: 'compare-loan-calculator', name: 'Compare EMI Loans', badge: 'Compare' },
      { id: 'loan-affordability-calculator', name: 'Loan Affordability', badge: 'Capacity' },
      { id: 'loan-reverse-calculator', name: 'Calculate Interest & Period', badge: 'Reverse' }
    ]
  },
  mainstream: {
    id: 'mainstream',
    name: 'Mainstream Loans',
    icon: '🏠',
    calculators: [
      { id: 'home-purchase-planner', name: 'Home Purchase Planner', badge: 'New' },
      { id: 'home-loan-calculator', name: 'Home Loan', badge: 'Essential' },
      { id: 'personal-loan-calculator', name: 'Personal Loan', badge: 'Popular' },
      { id: 'car-loan-calculator', name: 'Car Loan', badge: 'Vehicle' },
      { id: 'education-loan-calculator', name: 'Education Loan', badge: 'Student' },
      { id: 'mortgage-loan-calculator', name: 'Mortgage / LAP', badge: 'Property' },
      { id: 'business-loan-calculator', name: 'Business Loan', badge: 'Commercial' },
      { id: 'loan-prepayment-calculator', name: 'Loan Prepayment Impact', badge: 'Savings' },
      { id: 'loan-amortization-calculator', name: 'Loan Amortization', badge: 'Schedule' }
    ]
  },
  asset: {
    id: 'asset',
    name: 'Asset-Based Loans',
    icon: '🪙',
    calculators: [
      { id: 'gold-loan-calculator', name: 'Gold Loan', badge: 'Gold' },
      { id: 'two-wheeler-loan-calculator', name: 'Two-Wheeler Loan', badge: 'Bike' },
      { id: 'consumer-durable-loan-calculator', name: 'Consumer Durable Loan', badge: '0% EMI' },
      { id: 'fd-loan-calculator', name: 'Loan Against FD', badge: 'Low Rate' },
      { id: 'top-up-loan-calculator', name: 'Top-Up Loan', badge: 'Cash' },
      { id: 'balance-transfer-calculator', name: 'Balance Transfer', badge: 'Switch' },
      { id: 'overdraft-calculator', name: 'Overdraft / OD Facility', badge: 'Flexible' }
    ]
  },
  lifestyle: {
    id: 'lifestyle',
    name: 'Lifestyle & Events',
    icon: '🎉',
    calculators: [
      { id: 'credit-card-emi-calculator', name: 'Credit Card EMI', badge: 'Card' },
      { id: 'medical-loan-calculator', name: 'Medical Emergency Loan', badge: 'Healthcare' },
      { id: 'wedding-loan-calculator', name: 'Wedding Loan', badge: 'Marriage' },
      { id: 'travel-loan-calculator', name: 'Travel & Holiday Loan', badge: 'Vacation' }
    ]
  },
  specialized: {
    id: 'specialized',
    name: 'Specialized Loans',
    icon: '🚜',
    calculators: [
      { id: 'agriculture-loan-calculator', name: 'Agriculture & KCC Loan', badge: 'Kisan' },
      { id: 'equipment-loan-calculator', name: 'Business Equipment Loan', badge: 'Machinery' },
      { id: 'reverse-mortgage-calculator', name: 'Reverse Mortgage', badge: 'Senior' },
      { id: 'education-abroad-loan-calculator', name: 'Education Abroad Loan', badge: 'Global' }
    ]
  }
};



const BROKERS_DATA = {
  zerodha: {
    id: 'zerodha',
    name: 'Zerodha',
    tagline: "India's pioneer discount broker • 1.5+ Crore clients • SEBI Registered",
    badge: 'Recommended • ₹0 Delivery',
    trustScore: '4.8 ★★★★★',
    usersCount: '1.5+ Crore Investors',
    logoText: 'ZERODHA',
    logoColor: '#387ed1',
    accentColor: '#10b981',
    refUrl: 'https://zerodha.com/open-account?c=ZAPCVV',
    deliveryBrokerage: 0,
    intradayRate: 0.03,
    intradayCap: 20,
    foFlat: 20,
    options: [
      {
        id: 'free-demat',
        title: 'Open a Free Demat Account',
        desc: 'Fast, 100% paperless onboarding in under 5 minutes. Hold stocks, direct mutual funds, ETFs, SGBs, and bonds securely with CDSL.',
        badge: 'Most Popular',
        badgeClass: 'badge-popular',
        featured: 'featured-emerald',
        icon: 'folder-check',
        iconColor: 'icon-emerald',
        perks: ['Zero account opening charge', 'Instant Aadhaar e-Sign KYC'],
        btnText: 'Open Free Account',
        btnClass: 'btn-cta-emerald',
        url: 'https://zerodha.com/open-account?c=ZAPCVV'
      },
      {
        id: 'zero-delivery',
        title: 'Want Zero Equity Delivery Brokerage? Open a Demat',
        desc: 'Enjoy ₹0 brokerage on all equity delivery investments forever. Keep 100% of your long-term compounding profits without hidden fees.',
        badge: '₹0 Brokerage',
        badgeClass: 'badge-zero',
        featured: 'featured-indigo',
        icon: 'award',
        iconColor: 'icon-indigo',
        perks: ['Flat ₹0 on Equity Delivery', 'No hidden maintenance traps'],
        btnText: 'Open Demat Account',
        btnClass: 'btn-cta-indigo',
        url: 'https://zerodha.com/open-account?c=ZAPCVV'
      },
      {
        id: 'sip-mf',
        title: 'Want to start SIP in Mutual Funds?',
        desc: 'Automate monthly wealth creation in mutual funds. Start your systematic investment journey with disciplined goal-based investing.',
        badge: 'Mutual Funds',
        badgeClass: '',
        featured: '',
        icon: 'wallet',
        iconColor: 'icon-emerald',
        perks: ['Goal-based portfolio planning', 'Flexible SIP pause & top-up'],
        btnText: 'Start SIP Now',
        btnClass: 'btn-cta-default',
        url: 'https://www.assetplus.in/mfd/ARN-145622?productSource=Default'
      },
      {
        id: 'sip-etf',
        title: 'Want to start SIP in ETFs?',
        desc: 'Schedule recurring SIPs in Nifty 50, Sensex, Gold, and Global Index ETFs traded directly on exchange at real-time market prices.',
        badge: 'Index SIP',
        badgeClass: '',
        featured: '',
        icon: 'layers',
        iconColor: 'icon-sky',
        perks: ['Ultra-low expense ratios (< 0.1%)', 'Real-time exchange liquidity'],
        btnText: 'Start ETF SIP',
        btnClass: 'btn-cta-default',
        url: 'https://zerodha.com/open-account?c=ZAPCVV'
      },
      {
        id: 'invest-reits',
        title: 'Want to Invest in REITs?',
        desc: 'Earn regular quarterly rental dividend payouts from Grade-A commercial office parks, tech hubs, and prime retail infrastructure.',
        badge: 'Real Estate',
        badgeClass: '',
        featured: '',
        icon: 'building',
        iconColor: 'icon-amber',
        perks: ['Fractional prime commercial ownership', 'Quarterly rental dividend yield'],
        btnText: 'Invest in REITs',
        btnClass: 'btn-cta-default',
        url: 'https://zerodha.com/open-account?c=ZAPCVV'
      },
      {
        id: 'trading-account',
        title: 'Open an Account for Trading',
        desc: 'Pro-grade interactive charting with TradingView, ultra-low latency execution, and flat ₹20 per executed order for F&O and intraday.',
        badge: 'Active Trading',
        badgeClass: '',
        featured: '',
        icon: 'activity',
        iconColor: 'icon-rose',
        perks: ['Flat ₹20 per order on F&O & Intraday', 'Advanced orders, GTT & Basket orders'],
        btnText: 'Start Trading',
        btnClass: 'btn-cta-default',
        url: 'https://zerodha.com/open-account?c=ZAPCVV'
      }
    ]
  },
  more_coming_soon: {
    id: 'more_coming_soon',
    name: 'More Brokers',
    tagline: 'More details coming soon. Integration with additional brokers will be available shortly.',
    badge: 'Coming Soon',
    comingSoon: true
  }
};

const NEW_CALCULATOR_IDS = new Set([
  'us-stocks-calculator',
  'jewellery-price-calculator',
  'gold-loan-calculator',
  'two-wheeler-loan-calculator',
  'consumer-durable-loan-calculator',
  'fd-loan-calculator',
  'top-up-loan-calculator',
  'balance-transfer-calculator',
  'overdraft-calculator',
  'credit-card-emi-calculator',
  'medical-loan-calculator',
  'wedding-loan-calculator',
  'travel-loan-calculator',
  'agriculture-loan-calculator',
  'equipment-loan-calculator',
  'reverse-mortgage-calculator',
  'education-abroad-loan-calculator',
  'emi-advance-calculator',
  'emi-table-generator',
  'compare-loan-calculator',
  'loan-affordability-calculator',
  'loan-reverse-calculator',
  'education-loan-calculator',
  'mortgage-loan-calculator',
  'business-loan-calculator',
  'loan-prepayment-calculator',
  'loan-amortization-calculator',
  'home-purchase-planner',
  'flat-purchase-planner'
]);

function isNewCalculator(calcOrId) {
  const id = typeof calcOrId === 'string' ? calcOrId : (calcOrId ? calcOrId.id : '');
  if (!id) return false;
  if (NEW_CALCULATOR_IDS.has(id)) return true;
  if (typeof calcOrId === 'object' && (calcOrId.isNew || (calcOrId.badge && calcOrId.badge.toLowerCase().includes('new')))) return true;
  return false;
}

const CALCULATOR_TOPICS = [
  { id: 'all', name: 'All Calculators', icon: 'calculator' },
  { id: 'new', name: '✨ New Tools', icon: 'sparkles' },
  { id: 'loans-emi', name: 'Loans & EMI Suite', icon: 'landmark' },
  { id: 'investments', name: 'Investments & Wealth', icon: 'trending-up' },
  { id: 'retirement', name: 'Retirement & Savings', icon: 'umbrella' },
  { id: 'taxes-business', name: 'Tax, Salary & Business', icon: 'receipt' },
  { id: 'math', name: 'Math & Scientific', icon: 'square-root' },
  { id: 'health', name: 'Health & Fitness', icon: 'heart-pulse' }
];

function getCalculatorTopic(calc) {
  if (typeof isEmiSuiteCalculator === 'function' && isEmiSuiteCalculator(calc.id)) {
    return 'loans-emi';
  }
  if (calc.id.includes('loan') || calc.id.includes('mortgage') || calc.id.includes('emi')) {
    return 'loans-emi';
  }
  if (calc.category === 'financial') {
    if (calc.id.includes('retirement') || calc.id.includes('nps') || calc.id.includes('ppf') || calc.id.includes('epf') || calc.id.includes('pension') || calc.id.includes('gratuity') || calc.id.includes('senior') || calc.id.includes('fd-') || calc.id.includes('rd-')) {
      return 'retirement';
    }
    if (calc.id.includes('tax') || calc.id.includes('gst') || calc.id.includes('salary') || calc.id.includes('in-hand') || calc.id.includes('employee') || calc.id.includes('breakeven') || calc.id.includes('cagr') || calc.id.includes('roi') || calc.id.includes('inflation')) {
      return 'taxes-business';
    }
    return 'investments';
  }
  if (calc.category === 'math') {
    return 'math';
  }
  if (calc.category === 'health') {
    return 'health';
  }
  return 'investments';
}

function isEmiSuiteCalculator(calcId) {
  for (const cat of Object.values(EMI_SUITE_CATEGORIES)) {
    if (cat.calculators.some(c => c.id === calcId)) return true;
  }
  return false;
}

function getEmiSuiteCategoryForCalc(calcId) {
  for (const [key, cat] of Object.entries(EMI_SUITE_CATEGORIES)) {
    if (cat.calculators.some(c => c.id === calcId)) return key;
  }
  return 'tools';
}

const CALCULATORS_DATA = [
  {
    "id": "us-stocks-calculator",
    "category": "financial",
    "title": "US Stocks Calculator",
    "badge": "Popular • US Equities",
    "keywords": "us stocks usa equities shares fractional dollar inr rupee exchange wall street nasdaq nyse apple nvda tsla zerodha invest investment calculator",
    "icon": "trending-up",
    "summary": "Calculate how many full and fractional US stock shares you can buy with an INR rupee investment.",
    "description": "Convert Indian Rupees (INR) to US Dollars (USD) at live or custom exchange rates and calculate exactly how many full and fractional shares of US companies (Apple, Microsoft, Nvidia, Tesla, Google, Amazon, etc.) your rupee investment will purchase.",
    "formula": "USD Available = Investment (INR) / Exchange Rate (USD/INR); Total Shares = USD Available / Stock Price (USD)",
    "formulaDesc": "Converts rupee capital into US Dollars and divides by the US share price to determine full and fractional share allocations.",
    "fields": [
      {
        "id": "amountInr",
        "label": "Investment Amount (INR ₹)",
        "fixedLabel": true,
        "type": "number",
        "default": 50000,
        "min": 500,
        "max": 2000000,
        "step": 500,
        "prefix": "₹",
        "fixedPrefix": "₹",
        "tooltip": "The amount in Indian Rupees (₹) you want to invest in US stocks."
      },
      {
        "id": "usdInrRate",
        "label": "USD / INR Exchange Rate",
        "fixedLabel": true,
        "type": "number",
        "default": 86.5,
        "min": 60,
        "max": 120,
        "step": 0.1,
        "prefix": "₹",
        "fixedPrefix": "₹",
        "tooltip": "Exchange rate for 1 US Dollar in Indian Rupees (e.g. ₹86.50 per USD)."
      },
      {
        "id": "stockName",
        "label": "Stock Name / Ticker",
        "fixedLabel": true,
        "type": "text",
        "default": "Apple Inc. (AAPL)",
        "placeholder": "e.g. Apple Inc. (AAPL), Nvidia (NVDA), Tesla (TSLA)",
        "tooltip": "Name or ticker symbol of the US company or ETF."
      },
      {
        "id": "stockPriceUsd",
        "label": "Stock Price in USD ($)",
        "fixedLabel": true,
        "type": "number",
        "default": 230,
        "min": 1,
        "max": 2000,
        "step": 1,
        "prefix": "$",
        "fixedPrefix": "$",
        "tooltip": "Market price of 1 share in US Dollars ($)."
      }
    ]
  },
  {
  "id": "gold-loan-calculator",
  "category": "financial",
  "title": "Gold Loan Calculator",
  "badge": "Gold",
  "icon": "coins",
  "summary": "Calculate eligible loan amount, monthly EMI, and bullet interest against physical gold ornaments.",
  "description": "Evaluate your gold borrowing power. Compute maximum loan eligibility under RBI's 75% LTV ceiling based on weight and purity (18K, 22K, 24K), with support for regular EMI and bullet interest repayments.",
  "formula": "Valuation = Weight × Rate × (Purity / 24), Max Loan = Valuation × LTV%",
  "formulaDesc": "RBI Loan-to-Value (LTV) framework evaluating gold pledged at market bullion benchmarks.",
  "fields": [
    {
      "id": "goldGrams",
      "label": "Gold Weight (Grams)",
      "type": "number",
      "default": 50,
      "min": 1,
      "max": 1000,
      "step": 1,
      "suffix": "g"
    },
    {
      "id": "goldPurity",
      "label": "Gold Purity (Karat)",
      "type": "select",
      "default": "22",
      "options": [
        {
          "value": "18",
          "label": "18 Karat (75.0% Purity)"
        },
        {
          "value": "22",
          "label": "22 Karat (91.6% Standard Hallmarked)"
        },
        {
          "value": "24",
          "label": "24 Karat (99.9% Pure Gold)"
        }
      ]
    },
    {
      "id": "goldRatePerGram",
      "label": "24K Gold Rate / Gram",
      "type": "number",
      "default": 7200,
      "min": 4000,
      "max": 15000,
      "step": 50,
      "prefix": "₹"
    },
    {
      "id": "ltvPercent",
      "label": "LTV Cap (%) [RBI Max 75%]",
      "tooltip": "LTV = Loan-to-Value Ratio. It represents the maximum percentage of the pledged gold's market valuation that can be disbursed as a loan under RBI's statutory 75% ceiling.",
      "type": "number",
      "default": 75,
      "min": 50,
      "max": 75,
      "step": 1,
      "suffix": "%"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (%)",
      "type": "number",
      "default": 9.5,
      "min": 6.5,
      "max": 24,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "tenureMonths",
      "label": "Loan Tenure (Months)",
      "type": "number",
      "default": 12,
      "min": 3,
      "max": 36,
      "step": 1,
      "suffix": "Mos"
    },
    {
      "id": "repaymentScheme",
      "label": "Repayment Mode",
      "type": "select",
      "default": "regular-emi",
      "options": [
        {
          "value": "regular-emi",
          "label": "Regular Monthly EMI (Principal + Interest)"
        },
        {
          "value": "monthly-interest",
          "label": "Bullet Repayment (Monthly Interest Only, Principal at End)"
        },
        {
          "value": "bullet",
          "label": "Lump-Sum Bullet (Principal + Interest at Maturity)"
        }
      ]
    }
  ]
},
  {
  "id": "two-wheeler-loan-calculator",
  "category": "financial",
  "title": "Two-Wheeler Loan Calculator",
  "badge": "Bike",
  "icon": "bike",
  "summary": "Plan your motorcycle or scooter purchase with instant EMI, down payment, and interest breakdown.",
  "description": "Determine your monthly installment for bikes and scooters. Factor in on-road price, down payment, and lender interest to find the ideal repayment tenure that fits your monthly budget.",
  "formula": "EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]",
  "formulaDesc": "Standard reducing-balance vehicle loan amortization schedule.",
  "fields": [
    {
      "id": "vehiclePrice",
      "label": "On-Road Two-Wheeler Price",
      "type": "number",
      "default": 125000,
      "min": 40000,
      "max": 600000,
      "step": 2500,
      "prefix": "₹"
    },
    {
      "id": "downPayment",
      "label": "Down Payment Paid",
      "type": "number",
      "default": 25000,
      "min": 0,
      "max": 500000,
      "step": 2500,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (%)",
      "type": "number",
      "default": 11.5,
      "min": 7,
      "max": 28,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "tenureMonths",
      "label": "Loan Tenure (Months)",
      "type": "number",
      "default": 36,
      "min": 6,
      "max": 60,
      "step": 6,
      "suffix": "Mos"
    }
  ]
},
  {
  "id": "consumer-durable-loan-calculator",
  "category": "financial",
  "title": "Consumer Durable Loan Calculator",
  "badge": "0% EMI",
  "icon": "tv",
  "summary": "Evaluate gadget, appliance, and zero-cost EMI financing with true cost and fee transparency.",
  "description": "Understand the real economics of electronics financing. Calculate monthly installments, upfront processing fees, and effective APR on laptops, smartphones, televisions, and white goods.",
  "formula": "Financed Amount = Price - Down Payment, Monthly EMI = Financed / Months",
  "formulaDesc": "Consumer credit financing factoring in zero-cost subvention discounts and mandatory processing fees.",
  "fields": [
    {
      "id": "productPrice",
      "label": "Appliance / Gadget Price",
      "type": "number",
      "default": 65000,
      "min": 5000,
      "max": 500000,
      "step": 1000,
      "prefix": "₹"
    },
    {
      "id": "downPayment",
      "label": "Upfront Down Payment",
      "type": "number",
      "default": 10000,
      "min": 0,
      "max": 300000,
      "step": 1000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (%) [0 for No-Cost EMI]",
      "type": "number",
      "default": 0,
      "min": 0,
      "max": 30,
      "step": 0.5,
      "suffix": "%"
    },
    {
      "id": "tenureMonths",
      "label": "Financing Tenure (Months)",
      "type": "number",
      "default": 9,
      "min": 3,
      "max": 24,
      "step": 1,
      "suffix": "Mos"
    },
    {
      "id": "processingFee",
      "label": "Upfront Processing Fee",
      "type": "number",
      "default": 499,
      "min": 0,
      "max": 5000,
      "step": 50,
      "prefix": "₹"
    }
  ]
},
  {
  "id": "fd-loan-calculator",
  "category": "financial",
  "title": "Loan Against Fixed Deposit (FD) Calculator",
  "badge": "Low Rate",
  "icon": "landmark",
  "summary": "Borrow against your bank fixed deposit at 1-2% spread while keeping your FD interest compounding intact.",
  "description": "Compare the advantage of borrowing against your FD versus breaking it prematurely. Calculate low-spread interest, monthly EMI, and the net savings earned by letting your principal stay invested.",
  "formula": "Loan Rate = FD Rate + Markup Rate (1-2%), Max Eligibility = Up to 95% of FD",
  "formulaDesc": "Secured lien-backed overdraft and demand loan pricing model.",
  "fields": [
    {
      "id": "fdAmount",
      "label": "Fixed Deposit Value",
      "type": "number",
      "default": 500000,
      "min": 25000,
      "max": 10000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "fdInterestRate",
      "label": "Existing FD Interest Rate (%)",
      "type": "number",
      "default": 7.25,
      "min": 3,
      "max": 12,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "bankMarkupRate",
      "label": "Bank Spread over FD (%)",
      "type": "number",
      "default": 1,
      "min": 0.5,
      "max": 3,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "loanAmount",
      "label": "Loan Amount Required",
      "type": "number",
      "default": 400000,
      "min": 10000,
      "max": 9500000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "tenureMonths",
      "label": "Loan Tenure (Months)",
      "type": "number",
      "default": 12,
      "min": 1,
      "max": 60,
      "step": 1,
      "suffix": "Mos"
    }
  ]
},
  {
  "id": "top-up-loan-calculator",
  "category": "financial",
  "title": "Top-Up Loan Calculator",
  "badge": "Cash",
  "icon": "plus-circle",
  "summary": "Calculate combined EMI, total interest, and revised LTV when adding a top-up facility to your existing loan.",
  "description": "Unlock extra liquidity from your existing home or property mortgage. Calculate new combined monthly outflows, interest rates, and total debt service capacity.",
  "formula": "Combined EMI = Existing EMI + TopUp EMI, Combined LTV = (Balance + TopUp) / Property Value",
  "formulaDesc": "Secondary tranche collateralized borrowing model.",
  "fields": [
    {
      "id": "existingLoanBalance",
      "label": "Existing Loan Outstanding",
      "type": "number",
      "default": 2500000,
      "min": 100000,
      "max": 50000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "propertyValue",
      "label": "Current Property Market Value",
      "type": "number",
      "default": 6000000,
      "min": 500000,
      "max": 100000000,
      "step": 100000,
      "prefix": "₹"
    },
    {
      "id": "topUpAmount",
      "label": "Top-Up Amount Requested",
      "type": "number",
      "default": 1000000,
      "min": 50000,
      "max": 20000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "topUpRate",
      "label": "Top-Up Interest Rate (%)",
      "type": "number",
      "default": 9,
      "min": 6.5,
      "max": 20,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "topUpTenureYears",
      "label": "Top-Up Tenure (Years)",
      "type": "number",
      "default": 15,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "existingEmi",
      "label": "Existing Monthly EMI",
      "type": "number",
      "default": 26000,
      "min": 1000,
      "max": 500000,
      "step": 1000,
      "prefix": "₹"
    }
  ]
},
  {
  "id": "balance-transfer-calculator",
  "category": "financial",
  "title": "Balance Transfer Calculator",
  "badge": "Switch",
  "icon": "arrow-right-left",
  "summary": "Calculate net lifetime savings and break-even months when transferring an existing loan to a lower ROI lender.",
  "description": "Determine whether switching your mortgage or personal loan is financially beneficial. Accurately factors in processing fees, stamp duty, valuation charges, and interest differential.",
  "formula": "Net Savings = (Current Interest - New Interest) - Switching Costs",
  "formulaDesc": "Refinancing cost-benefit algorithm incorporating switching friction and residual amortization.",
  "fields": [
    {
      "id": "currentOutstanding",
      "label": "Current Principal Outstanding",
      "type": "number",
      "default": 3500000,
      "min": 100000,
      "max": 50000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "currentRate",
      "label": "Current Loan ROI (%)",
      "type": "number",
      "default": 9.5,
      "min": 5,
      "max": 25,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "remainingTenureMonths",
      "label": "Remaining Term (Months)",
      "type": "number",
      "default": 180,
      "min": 12,
      "max": 360,
      "step": 6,
      "suffix": "Mos"
    },
    {
      "id": "newBankRate",
      "label": "New Lender ROI (%)",
      "type": "number",
      "default": 8.4,
      "min": 5,
      "max": 25,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "processingFeePct",
      "label": "New Lender Processing Fee (%)",
      "type": "number",
      "default": 0.5,
      "min": 0,
      "max": 5,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "preClosureFeePct",
      "label": "Pre‑Closure Charges (%)",
      "tooltip": "Pre‑Closure Charges are fees charged by banks when you close an existing loan before tenure completion. In some cases (e.g., floating‑rate home loans), these charges may be 0%.",
      "type": "number",
      "default": 2,
      "min": 0,
      "max": 5,
      "step": 0.1,
      "suffix": "%"
    }
  ],
  "faqs": [
    {
      "q": "What are Pre‑Closure Charges in a Balance Transfer?",
      "a": "Pre‑Closure Charges are fees charged by banks when you close an existing loan before tenure completion. In some cases (e.g., floating‑rate home loans), these charges may be 0%."
    },
    {
      "q": "How is Total Cost of Balance Transfer calculated?",
      "a": "Total Cost of Balance Transfer = Pre‑Closure Charges + Processing Fee Amount. Net Savings is calculated as Interest Saved on New Loan minus Total Cost of Balance Transfer."
    }
  ]
},
  {
  "id": "overdraft-calculator",
  "category": "financial",
  "title": "Overdraft (OD) Facility Calculator",
  "badge": "Flexible",
  "icon": "credit-card",
  "summary": "Calculate daily interest charges on utilized credit balances and compare massive savings over standard term loans.",
  "description": "Analyze bank overdraft facilities and cash credit accounts. Pay interest exclusively on funds actually utilized on a daily reducing balance instead of the entire sanctioned credit limit.",
  "formula": "Daily Interest = (Utilized Balance × ROI) / 365, Monthly Interest = Daily × 30",
  "formulaDesc": "Daily reducing balance calculation for revolving credit and commercial cash credit lines.",
  "fields": [
    {
      "id": "sanctionedLimit",
      "label": "Approved OD Credit Limit",
      "type": "number",
      "default": 1000000,
      "min": 50000,
      "max": 20000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "averageUtilization",
      "label": "Average Monthly Utilized Balance",
      "type": "number",
      "default": 350000,
      "min": 10000,
      "max": 20000000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "OD Annual Interest Rate (%)",
      "type": "number",
      "default": 10.5,
      "min": 5,
      "max": 24,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "annualRenewalFee",
      "label": "Annual Facility Renewal Fee",
      "type": "number",
      "default": 2500,
      "min": 0,
      "max": 50000,
      "step": 500,
      "prefix": "₹"
    }
  ]
},
  {
  "id": "credit-card-emi-calculator",
  "category": "financial",
  "title": "Credit Card EMI Calculator",
  "badge": "Card",
  "icon": "credit-card",
  "summary": "Convert credit card purchases to manageable EMIs with 18% GST and upfront processing fee transparency.",
  "description": "Avoid compounding credit card finance charges of 40%+ p.a. Convert retail transactions or statements into affordable monthly EMIs with clear visibility into statutory GST and bank fees.",
  "formula": "Total Outflow = Principal + Total Interest + Processing Fee + (18% GST on Interest & Fee)",
  "formulaDesc": "Standard retail banking card transaction conversion algorithm including Indian GST norms.",
  "fields": [
    {
      "id": "transactionAmount",
      "label": "Card Balance / Purchase Amount",
      "type": "number",
      "default": 60000,
      "min": 3000,
      "max": 1000000,
      "step": 1000,
      "prefix": "₹"
    },
    {
      "id": "cardInterestRate",
      "label": "Card EMI Interest Rate (% p.a.)",
      "type": "number",
      "default": 15,
      "min": 10,
      "max": 26,
      "step": 0.5,
      "suffix": "%"
    },
    {
      "id": "tenureMonths",
      "label": "Repayment Tenure (Months)",
      "type": "number",
      "default": 6,
      "min": 3,
      "max": 24,
      "step": 3,
      "suffix": "Mos"
    },
    {
      "id": "processingFee",
      "label": "Bank Processing Fee",
      "type": "number",
      "default": 199,
      "min": 0,
      "max": 2000,
      "step": 50,
      "prefix": "₹"
    },
    {
      "id": "gstRate",
      "label": "GST on Fee & Interest (%)",
      "type": "number",
      "default": 18,
      "min": 0,
      "max": 28,
      "step": 1,
      "suffix": "%"
    }
  ]
},
  {
  "id": "medical-loan-calculator",
  "category": "financial",
  "title": "Medical Emergency Loan Calculator",
  "badge": "Healthcare",
  "icon": "activity",
  "summary": "Plan hospital treatment and emergency medical financing factoring in health insurance deductibles.",
  "description": "Finance unexpected medical procedures, surgeries, and critical care expenses. Calculate monthly repayment installments on out-of-pocket medical bills after deducting insurance cashless approvals.",
  "formula": "Loan Required = Total Medical Estimate - Insurance Coverage",
  "formulaDesc": "Emergency healthcare financing calculator with custom repayment horizons.",
  "fields": [
    {
      "id": "treatmentEstimate",
      "label": "Total Hospital / Treatment Estimate",
      "type": "number",
      "default": 600000,
      "min": 25000,
      "max": 5000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "insuranceCover",
      "label": "Health Insurance / TPA Covered",
      "type": "number",
      "default": 250000,
      "min": 0,
      "max": 5000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Medical Loan Interest Rate (%)",
      "type": "number",
      "default": 11,
      "min": 7,
      "max": 24,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Repayment Period (Years)",
      "type": "number",
      "default": 3,
      "min": 1,
      "max": 7,
      "step": 0.5,
      "suffix": "Yrs"
    }
  ]
},
  {
  "id": "wedding-loan-calculator",
  "category": "financial",
  "title": "Wedding Loan Calculator",
  "badge": "Marriage",
  "icon": "heart",
  "summary": "Budget dream wedding celebrations by financing venue, catering, and apparel with planned monthly EMIs.",
  "description": "Manage marriage expenses smoothly without depleting family emergency reserves. Calculate required loan financing, monthly payments, and total interest commitments.",
  "formula": "Financed Sum = Total Wedding Budget - Savings Allocated",
  "formulaDesc": "Event financing model balancing disposable savings with amortized personal debt.",
  "fields": [
    {
      "id": "weddingBudget",
      "label": "Total Wedding Budget",
      "type": "number",
      "default": 1500000,
      "min": 100000,
      "max": 20000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "personalSavings",
      "label": "Allocated Savings & Contributions",
      "type": "number",
      "default": 600000,
      "min": 0,
      "max": 15000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Marriage Loan ROI (%)",
      "type": "number",
      "default": 11.5,
      "min": 8,
      "max": 22,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Repayment Period (Years)",
      "type": "number",
      "default": 4,
      "min": 1,
      "max": 7,
      "step": 1,
      "suffix": "Yrs"
    }
  ]
},
  {
  "id": "travel-loan-calculator",
  "category": "financial",
  "title": "Travel & Holiday Loan Calculator",
  "badge": "Vacation",
  "icon": "compass",
  "summary": "Finance international holidays, tour packages, and family vacations with comfortable monthly installments.",
  "description": "Turn your dream itinerary into reality. Plan flights, hotels, and sightseeing expenses with predictable monthly EMIs and clear visibility into total travel borrowing costs.",
  "formula": "Financed Sum = Trip Budget - Cash Paid Upfront",
  "formulaDesc": "Short to medium-term unsecured leisure loan amortization.",
  "fields": [
    {
      "id": "tripCost",
      "label": "Tour & Vacation Total Budget",
      "type": "number",
      "default": 250000,
      "min": 20000,
      "max": 2000000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "upfrontSavings",
      "label": "Self-Funded Cash Available",
      "type": "number",
      "default": 50000,
      "min": 0,
      "max": 1000000,
      "step": 5000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Holiday Loan Interest Rate (%)",
      "type": "number",
      "default": 12.5,
      "min": 8,
      "max": 24,
      "step": 0.5,
      "suffix": "%"
    },
    {
      "id": "tenureMonths",
      "label": "Repayment Tenure (Months)",
      "type": "number",
      "default": 18,
      "min": 6,
      "max": 36,
      "step": 3,
      "suffix": "Mos"
    }
  ]
},
  {
  "id": "agriculture-loan-calculator",
  "category": "financial",
  "title": "Agriculture & KCC Loan Calculator",
  "badge": "Kisan",
  "icon": "sprout",
  "summary": "Calculate Kisan Credit Card (KCC) and crop loan interest with Government 3% prompt repayment subvention.",
  "description": "Support agricultural planning with subsidized crop credit calculations. Factor in the Government of India's 3% interest subvention scheme (lowering 7% base rate to an effective 4% p.a.) for prompt repayments up to ₹3 Lakhs.",
  "formula": "Effective Interest = P × (Base Rate - 3% Subvention) × (Tenure / 12)",
  "formulaDesc": "Kisan Credit Card (KCC) agricultural credit framework with central interest subvention.",
  "fields": [
    {
      "id": "loanAmount",
      "label": "Crop / KCC Loan Amount",
      "type": "number",
      "default": 300000,
      "min": 25000,
      "max": 3000000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "baseRate",
      "label": "Standard Agriculture Rate (% p.a.)",
      "type": "number",
      "default": 7,
      "min": 5,
      "max": 14,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "promptRepayment",
      "label": "Prompt Repayment 3% Subvention",
      "type": "select",
      "default": "yes",
      "options": [
        {
          "value": "yes",
          "label": "Yes - 3% Subvention Active (Net 4% Effective Rate)"
        },
        {
          "value": "no",
          "label": "No - Regular Base Rate Applied"
        }
      ]
    },
    {
      "id": "cropSeasonMonths",
      "label": "Crop Cycle / Tenor (Months)",
      "type": "number",
      "default": 12,
      "min": 6,
      "max": 24,
      "step": 1,
      "suffix": "Mos"
    }
  ]
},
  {
  "id": "equipment-loan-calculator",
  "category": "financial",
  "title": "Business Equipment Loan Calculator",
  "badge": "Machinery",
  "icon": "cpu",
  "summary": "Finance industrial machinery, commercial vehicles, and office technology with payback and ROI tracking.",
  "description": "Assess capital expenditure loans for machinery, manufacturing tools, and medical equipment. Calculate monthly debt service alongside revenue uplift to determine net monthly cashflows and payback period.",
  "formula": "Loan = Machinery Cost × (1 - Down%), Net Cashflow = Monthly Revenue Gain - Monthly EMI",
  "formulaDesc": "Commercial capital asset financing and cash flow payback model.",
  "fields": [
    {
      "id": "machineryCost",
      "label": "Equipment Invoice Cost",
      "type": "number",
      "default": 2500000,
      "min": 100000,
      "max": 50000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "downPaymentPct",
      "label": "Margin Money / Down Payment (%)",
      "type": "number",
      "default": 20,
      "min": 5,
      "max": 50,
      "step": 5,
      "suffix": "%"
    },
    {
      "id": "interestRate",
      "label": "Equipment Loan ROI (%)",
      "type": "number",
      "default": 10.5,
      "min": 6,
      "max": 20,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Equipment Loan Tenure (Years)",
      "type": "number",
      "default": 5,
      "min": 1,
      "max": 10,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "expectedMonthlyRevenue",
      "label": "Estimated Monthly Revenue Gain",
      "type": "number",
      "default": 85000,
      "min": 10000,
      "max": 1000000,
      "step": 5000,
      "prefix": "₹"
    }
  ]
},
  {
  "id": "reverse-mortgage-calculator",
  "category": "financial",
  "title": "Reverse Mortgage Calculator",
  "badge": "Senior",
  "icon": "shield-check",
  "summary": "Senior citizens can convert home equity into guaranteed, tax-free monthly annuity income.",
  "description": "Designed for Indian senior citizens aged 60+. Calculate monthly reverse annuity payments received against residential property value without needing to vacate the premises.",
  "formula": "Monthly Annuity = [Corpus × r] / [(1+r)^n - 1]",
  "formulaDesc": "Reverse annuity mortgage scheme (RAMS) solving for periodic senior disbursements.",
  "fields": [
    {
      "id": "propertyValue",
      "label": "Residential Property Value",
      "type": "number",
      "default": 10000000,
      "min": 1500000,
      "max": 100000000,
      "step": 500000,
      "prefix": "₹"
    },
    {
      "id": "borrowerAge",
      "label": "Senior Citizen Age (Years)",
      "type": "number",
      "default": 65,
      "min": 60,
      "max": 85,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "tenureYears",
      "label": "Reverse Annuity Period (Years)",
      "type": "number",
      "default": 15,
      "min": 10,
      "max": 20,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "expectedRate",
      "label": "Reverse Mortgage Rate (%)",
      "type": "number",
      "default": 9.5,
      "min": 6,
      "max": 15,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "ltvCap",
      "label": "Maximum Eligible LTV (%)",
      "tooltip": "LTV = Loan-to-Value Ratio. It represents the maximum percentage of property valuation that can be disbursed as loan annuity to senior citizens.",
      "type": "number",
      "default": 60,
      "min": 40,
      "max": 80,
      "step": 5,
      "suffix": "%"
    }
  ]
},
  {
  "id": "education-abroad-loan-calculator",
  "category": "financial",
  "title": "Education Abroad Loan Calculator",
  "badge": "Global",
  "icon": "globe",
  "summary": "Finance foreign university degrees with multi-currency conversion, moratorium accrual, and Section 80E tax relief.",
  "description": "Plan higher studies in the USA, UK, Canada, Australia, or Europe. Calculate foreign currency tuition and living expenses, course moratorium simple interest accumulation, post-study EMIs, and unlimited Section 80E tax deductions.",
  "formula": "INR Loan = (Foreign Tuition × FX) - Self Funds, Capitalized Balance = Loan + Moratorium Interest",
  "formulaDesc": "International student education loan model with multi-currency FX indexing and Section 80E deductions.",
  "fields": [
    {
      "id": "tuitionForeignCost",
      "label": "Foreign University Expenses",
      "type": "number",
      "default": 50000,
      "min": 10000,
      "max": 250000,
      "step": 5000
    },
    {
      "id": "exchangeRate",
      "label": "Exchange Rate to INR (₹)",
      "type": "number",
      "default": 84,
      "min": 50,
      "max": 120,
      "step": 0.5,
      "prefix": "₹"
    },
    {
      "id": "scholarshipSelfFunding",
      "label": "Scholarship & Self Funds (INR)",
      "type": "number",
      "default": 500000,
      "min": 0,
      "max": 5000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Overseas Loan ROI (%)",
      "type": "number",
      "default": 10.5,
      "min": 7,
      "max": 18,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "courseYears",
      "label": "Course Duration (Years)",
      "type": "number",
      "default": 2,
      "min": 1,
      "max": 5,
      "step": 0.5,
      "suffix": "Yrs"
    },
    {
      "id": "repaymentTenureYears",
      "label": "Repayment Tenure Post-Study (Years)",
      "type": "number",
      "default": 10,
      "min": 3,
      "max": 15,
      "step": 1,
      "suffix": "Yrs"
    }
  ]
},
  {
  "id": "loan-amortization-calculator",
  "category": "financial",
  "title": "Loan Amortization Calculator",
  "badge": "Schedule",
  "icon": "calendar-clock",
  "summary": "Visual loan repayment tracker showing yearly principal, interest, and declining balance trajectory.",
  "description": "Inspect the complete lifecycle of your loan. View an interactive amortization chart depicting how your debt balance drops to zero while visualizing the shift from interest payments to equity accumulation.",
  "formula": "Balance_t = P(1+r)^t - EMI * [((1+r)^t - 1) / r]",
  "formulaDesc": "Standard amortization schedule tracking residual principal over regular compounding intervals.",
  "fields": [
    {
      "id": "loanAmount",
      "label": "Loan Amount",
      "type": "number",
      "default": 2000000,
      "min": 25000,
      "max": 50000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (%)",
      "type": "number",
      "default": 8.5,
      "min": 1,
      "max": 25,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Tenure (Years)",
      "type": "number",
      "default": 10,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "startDate",
      "label": "Start Date",
      "type": "text",
      "default": "Nov 2026"
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "Can I download this schedule for my tax filing?",
      "a": "Yes, you can print or export the amortization schedule showing full year-by-year principal and interest breakdowns required for claiming Income Tax deductions."
    }
  ]
},
  {
  "id": "loan-prepayment-calculator",
  "category": "financial",
  "title": "Loan Prepayment Impact Calculator",
  "badge": "Savings",
  "icon": "trending-up",
  "customUi": "loan-prepayment-calculator",
  "summary": "Calculate how much interest and tenure you save by making lump-sum or extra monthly loan prepayments.",
  "description": "Discover the immense financial power of loan prepayments. Compare 'Reduce Tenure' vs 'Reduce EMI' strategies and see exactly how many months and hundreds of thousands of rupees you save.",
  "formula": "Savings = Interest_original - Interest_prepaid; Months_Saved = n_original - n_prepaid",
  "formulaDesc": "Prepayment applies directly against the outstanding balance, eliminating compound interest compounding on that amount for all remaining periods.",
  "fields": [
    {
      "id": "originalPrincipal",
      "label": "Original Loan Amount",
      "type": "number",
      "default": 3000000,
      "min": 100000,
      "max": 50000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (p.a.)",
      "type": "number",
      "default": 8.5,
      "min": 1,
      "max": 25,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "originalTenureYears",
      "label": "Original Tenure (Years)",
      "type": "number",
      "default": 20,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "monthsPaid",
      "label": "EMIs Paid So Far (Months)",
      "type": "number",
      "default": 24,
      "min": 1,
      "max": 240,
      "step": 1,
      "suffix": "Mos"
    },
    {
      "id": "prepaymentAmount",
      "label": "Lump-Sum Prepayment Amount",
      "type": "number",
      "default": 300000,
      "min": 10000,
      "max": 5000000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "prepaymentOption",
      "label": "Prepayment Preference",
      "type": "select",
      "default": "reduce-tenure",
      "options": [
        {
          "value": "reduce-tenure",
          "label": "Reduce Loan Tenure (Maximum Interest Savings)"
        },
        {
          "value": "reduce-emi",
          "label": "Reduce Monthly EMI (Improve Monthly Cash Flow)"
        }
      ]
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "Which option saves more money: Reduce Tenure or Reduce EMI?",
      "a": "Reducing tenure ALWAYS saves significantly more interest because it accelerates debt elimination and cuts down the compounding time."
    }
  ]
},
  {
  "id": "business-loan-calculator",
  "category": "financial",
  "title": "Business Loan EMI Calculator",
  "badge": "Commercial",
  "icon": "briefcase",
  "summary": "Calculate business expansion and MSME working capital loan EMIs with processing fees & GST.",
  "description": "Estimate monthly cash flow requirements for business expansion, working capital, inventory, or machinery loans. Factoring in GST on processing charges and amortized business interest.",
  "formula": "EMI = [P x r x (1+r)^n] / [(1+r)^n - 1] + Fee Taxes",
  "formulaDesc": "Standard reducing balance monthly installment with tax-deductible commercial borrowing cost breakdown.",
  "fields": [
    {
      "id": "principal",
      "label": "Business Loan Amount",
      "type": "number",
      "default": 1500000,
      "min": 50000,
      "max": 50000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Annual Interest Rate (%)",
      "type": "number",
      "default": 13,
      "min": 8,
      "max": 28,
      "step": 0.25,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Loan Tenure (Years)",
      "type": "number",
      "default": 5,
      "min": 1,
      "max": 10,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "processingFeePct",
      "label": "Processing Fee (%)",
      "type": "number",
      "default": 2,
      "min": 0.5,
      "max": 5,
      "step": 0.25,
      "suffix": "%"
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "Is business loan interest tax-deductible in India?",
      "a": "Yes. Interest paid on genuine business loans is treated as a normal business operational expense under Section 36(1)(iii) of the Income Tax Act, reducing your net taxable business profits."
    }
  ]
},
  {
  "id": "mortgage-loan-calculator",
  "category": "financial",
  "title": "Mortgage / Loan Against Property (LAP)",
  "badge": "Property",
  "icon": "landmark",
  "summary": "Calculate EMI and eligibility for Loan Against Property (LAP) based on commercial/residential market value.",
  "description": "Unlock the value of your residential or commercial real estate. Calculate Loan Against Property EMIs, Loan-to-Value (LTV) limits (up to 65% of market value), and long-term interest costs.",
  "formula": "EMI on LTV-derived Principal at Mortgage Rates",
  "formulaDesc": "Principal is derived from property market valuation multiplied by maximum bank LTV percentage.",
  "fields": [
    {
      "id": "propertyValue",
      "label": "Property Market Value",
      "type": "number",
      "default": 8000000,
      "min": 500000,
      "max": 100000000,
      "step": 100000,
      "prefix": "₹"
    },
    {
      "id": "loanAmount",
      "label": "Desired Loan Amount",
      "type": "number",
      "default": 5000000,
      "min": 200000,
      "max": 70000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (%)",
      "type": "number",
      "default": 9.25,
      "min": 7,
      "max": 20,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Tenure (Years)",
      "type": "number",
      "default": 15,
      "min": 1,
      "max": 20,
      "step": 1,
      "suffix": "Yrs"
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "What is the difference between Home Loan and Loan Against Property (LAP)?",
      "a": "A Home Loan is taken specifically to buy or construct a new house. A Loan Against Property (LAP) is a mortgage against an existing, self-owned property that can be used for any personal, business, or medical need."
    }
  ]
},
  {
  "id": "education-loan-calculator",
  "category": "financial",
  "title": "Education Loan Calculator",
  "badge": "Student",
  "icon": "calculator",
  "summary": "Education loan EMI calculator with Moratorium during college & Section 80E tax deduction.",
  "description": "Calculate student loan repayments for higher studies in India and abroad. Accounts for study period moratorium (course duration + 1 year grace), simple interest during college, and tax deductions on interest under Section 80E of Income Tax.",
  "formula": "Post-Moratorium EMI on Capitalized Principal",
  "formulaDesc": "Simple interest accumulates during study and grace period, then amortizes over 5 to 15 years.",
  "fields": [
    {
      "id": "loanAmount",
      "label": "Course Loan Amount",
      "type": "number",
      "default": 2000000,
      "min": 50000,
      "max": 15000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (%)",
      "type": "number",
      "default": 9.5,
      "min": 5,
      "max": 20,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "courseDurationYears",
      "label": "Course Duration",
      "type": "number",
      "default": 2,
      "min": 1,
      "max": 5,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "gracePeriodMonths",
      "label": "Post-Course Grace Period",
      "type": "number",
      "default": 12,
      "min": 0,
      "max": 24,
      "step": 6,
      "suffix": "Mos"
    },
    {
      "id": "repaymentTenureYears",
      "label": "Repayment Tenure",
      "type": "number",
      "default": 7,
      "min": 1,
      "max": 15,
      "step": 1,
      "suffix": "Yrs"
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "Is Section 80E tax deduction capped for education loans?",
      "a": "No! Section 80E allows 100% deduction on the entire interest amount paid on higher education loans for up to 8 consecutive years with no upper monetary cap."
    }
  ]
},
  {
  "id": "loan-reverse-calculator",
  "category": "financial",
  "title": "Calculate Loan Interest & Period",
  "badge": "Reverse",
  "icon": "refresh-cw",
  "customUi": "loan-reverse-calculator",
  "summary": "Reverse calculate exact loan tenure required or effective APR rate from known EMI.",
  "description": "Need to know how many months it will take to repay a loan with a given EMI, or what real interest rate a lender is charging you? This reverse loan engine solves the exact period and interest rate algebraically.",
  "formula": "n = [ln(EMI) - ln(EMI - P*r)] / ln(1+r)",
  "formulaDesc": "Logarithmic rearrangement of standard annuity formula for tenure, and numerical bisection for APR root.",
  "fields": [
    {
      "id": "principal",
      "label": "Loan Amount",
      "type": "number",
      "default": 1000000,
      "min": 10000,
      "max": 100000000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "monthlyEmi",
      "label": "Target Monthly EMI",
      "type": "number",
      "default": 20517,
      "min": 500,
      "max": 10000000,
      "step": 500,
      "prefix": "₹"
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (p.a.)",
      "type": "number",
      "default": 8.5,
      "min": 0.1,
      "max": 30,
      "step": 0.05,
      "suffix": "%"
    },
    {
      "id": "tenureMonths",
      "label": "Loan Period (Tenure)",
      "type": "number",
      "default": 60,
      "min": 1,
      "max": 360,
      "step": 1,
      "suffix": "Mos"
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "What happens if my EMI is less than or equal to Loan Amount × Monthly Rate?",
      "a": "If your EMI is ≤ Loan Amount × Monthly Rate, the monthly payment does not even cover the interest charged by the lender for that month. As a result, the principal balance never decreases and the loan can never be amortized. In such cases, the calculator displays: 'Please enter valid Loan Amount, EMI, and ROI.'"
    },
    {
      "q": "How does the Calculate Period (Tenure) mode work?",
      "a": "It uses the logarithmic rearrangement of the standard annuity formula: n = [ln(EMI) - ln(EMI - P × r)] / ln(1 + r), where P is principal and r is monthly interest rate. This accurately solves the exact number of months needed to fully clear the debt."
    },
    {
      "q": "How does the Calculate Interest Rate (ROI) mode work?",
      "a": "When you know your loan principal, target EMI, and tenure, the effective annual interest rate cannot be solved with a simple closed formula. The calculator uses numerical bisection root-finding to solve the exact APR/ROI to high precision."
    }
  ]
},
  {
  "id": "loan-affordability-calculator",
  "category": "financial",
  "title": "Loan Affordability Calculator",
  "badge": "Eligibility",
  "icon": "wallet",
  "summary": "Determine the maximum loan amount you qualify for based on income, current EMIs, and FOIR.",
  "description": "Calculate your maximum borrowing eligibility and home/personal loan sanction limit based on your net monthly salary, existing debt EMIs, and the bank FOIR (Fixed Obligation to Income Ratio) norms.",
  "formula": "Max_Principal = [Max_EMI * ((1+r)^n - 1)] / [r(1+r)^n]",
  "formulaDesc": "Where Max_EMI is your disposable surplus under standard 50% bank FOIR limits.",
  "fields": [
    {
      "id": "monthlyIncome",
      "label": "Net Monthly Income (Take-Home)",
      "type": "number",
      "default": 100000,
      "min": 10000,
      "max": 2000000,
      "step": 2500,
      "prefix": "₹"
    },
    {
      "id": "existingEmis",
      "label": "Fixed Obligations (Existing EMIs)",
      "type": "number",
      "default": 50000,
      "min": 0,
      "max": 1000000,
      "step": 1000,
      "prefix": "₹"
    },
    {
      "id": "maxFoirPct",
      "label": "Bank FOIR Limit (%) – Fixed Obligations to Income Ratio.",
      "type": "number",
      "default": 50,
      "min": 30,
      "max": 70,
      "step": 1,
      "suffix": "%",
      "tooltip": "FOIR = Fixed Obligations to Income Ratio. It represents the percentage of your monthly income already committed to EMIs or fixed expenses. Banks in India typically allow FOIR up to 50 %."
    },
    {
      "id": "interestRate",
      "label": "Expected Interest Rate (%)",
      "type": "number",
      "default": 8.5,
      "min": 1,
      "max": 25,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Desired Tenure (Years)",
      "type": "number",
      "default": 20,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "What is FOIR?",
      "a": "FOIR = Fixed Obligations to Income Ratio. It represents the percentage of your monthly income already committed to EMIs or fixed expenses. Banks in India typically allow FOIR up to 50 %."
    }
  ]
},
  {
  "id": "home-purchase-planner",
  "category": "financial",
  "title": "Home Purchase Planner",
  "badge": "New",
  "icon": "home",
  "customUi": "home-purchase-planner",
  "summary": "Compare builder construction schedule, bank loan EMI with Yr/Mo tenure toggle, and buyer capacity side-by-side.",
  "description": "Comprehensive property purchase planner. Synchronize builder construction milestones with bank loan disbursements and evaluate personal savings and income affordability.",
  "formula": "Affordability = Buyer Savings - Down Payment; Safe EMI = 50% Monthly Income - Obligations",
  "formulaDesc": "Evaluates upfront cash surplus/shortfall against construction milestones and checks debt service ratio (FOIR).",
  "fields": [
    {
      "id": "flatPrice",
      "label": "Home Purchase Price",
      "type": "number",
      "default": 6250000,
      "min": 500000,
      "max": 200000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "downPaymentPct",
      "label": "Down Payment (%)",
      "type": "number",
      "default": 20,
      "min": 10,
      "max": 80,
      "step": 1,
      "suffix": "%"
    },
    {
      "id": "interestRate",
      "label": "Annual Interest Rate (%)",
      "type": "number",
      "default": 8.5,
      "min": 5,
      "max": 18,
      "step": 0.05,
      "suffix": "%"
    },
    {
      "id": "loanTenure",
      "label": "Loan Tenure",
      "type": "number",
      "default": 20,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "buyerSavings",
      "label": "Available Liquid Savings",
      "type": "number",
      "default": 1000000,
      "min": 0,
      "max": 100000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "buyerIncome",
      "label": "Monthly Take-Home Income",
      "type": "number",
      "default": 80000,
      "min": 15000,
      "max": 5000000,
      "step": 5000,
      "prefix": "₹"
    }
  ],
  "faq": [
    {
      "q": "What is the 3-Card Home Purchase Planner?",
      "a": "It evaluates home buying viability across three pillars simultaneously: (1) Builder construction milestone schedule, (2) Bank loan financing & monthly EMI, and (3) Buyer savings and monthly income affordability."
    },
    {
      "q": "How does tenure toggling between years and months help?",
      "a": "It lets you examine loan payoffs at both macro horizon (e.g. 20 years) and granular monthly loan tenure (e.g. 240 months) with identical calculation precision."
    }
  ]
},
  {
  "id": "flat-purchase-planner",
  "category": "financial",
  "title": "Home Purchase Planner",
  "badge": "New",
  "icon": "home",
  "customUi": "home-purchase-planner",
  "aliasFor": "home-purchase-planner",
  "summary": "Compare builder construction schedule, bank loan EMI with Yr/Mo tenure toggle, and buyer capacity side-by-side.",
  "description": "Comprehensive property purchase planner. Synchronize builder construction milestones with bank loan disbursements and evaluate personal savings and income affordability.",
  "fields": [
    { "id": "flatPrice", "default": 6250000 }
  ]
},
  {
  "id": "compare-loan-calculator",
  "category": "financial",
  "title": "Compare EMI Calculator",
  "badge": "Compare",
  "icon": "refresh-cw",
  "customUi": "compare-loan-calculator",
  "summary": "Side-by-side comparison of two loan offers to find the cheapest EMI, total interest, and fees.",
  "description": "Compare two competing loan offers side by side. Evaluate differences in interest rates, loan tenures, processing fees, and overall lifetime cash outflow to pick the truly superior financial deal.",
  "formula": "Difference = Cost_B - Cost_A; Net Savings Analysis",
  "formulaDesc": "Computes monthly EMI difference, interest differential, and net savings after factoring in one-time processing charges.",
  "fields": [
    {
      "id": "loanAmountA",
      "label": "Loan A: Amount",
      "type": "number",
      "default": 2000000,
      "min": 10000,
      "max": 50000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "interestRateA",
      "label": "Loan A: Rate (%)",
      "type": "number",
      "default": 8.5,
      "min": 1,
      "max": 30,
      "step": 0.05,
      "suffix": "%"
    },
    {
      "id": "tenureYearsA",
      "label": "Loan A: Tenure",
      "type": "number",
      "default": 15,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "feeA",
      "label": "Loan A: Fee (%)",
      "type": "number",
      "default": 0.5,
      "min": 0,
      "max": 5,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "loanAmountB",
      "label": "Loan B: Amount",
      "type": "number",
      "default": 2000000,
      "min": 10000,
      "max": 50000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "interestRateB",
      "label": "Loan B: Rate (%)",
      "type": "number",
      "default": 8.75,
      "min": 1,
      "max": 30,
      "step": 0.05,
      "suffix": "%"
    },
    {
      "id": "tenureYearsB",
      "label": "Loan B: Tenure",
      "type": "number",
      "default": 15,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "feeB",
      "label": "Loan B: Fee (%)",
      "type": "number",
      "default": 0.25,
      "min": 0,
      "max": 5,
      "step": 0.1,
      "suffix": "%"
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "Is a lower interest rate always better?",
      "a": "Not necessarily. If the lower-rate loan has a longer tenure or hefty non-refundable processing fees, your total out-of-pocket payment could be higher. Always look at the total repayment amount."
    }
  ]
},
  {
  "id": "emi-table-generator",
  "category": "financial",
  "title": "EMI Table Generator",
  "badge": "Schedule",
  "icon": "calculator",
  "customUi": "emi-table-generator",
  "summary": "Generate complete year-by-year and month-by-month loan amortization tables with CSV export.",
  "description": "Get a comprehensive accounting-grade payment schedule for your loan. View beginning balance, monthly installment, principal portion, interest charge, and ending balance for every single payment period.",
  "formula": "Amortization: Principal_t = EMI - (Balance_{t-1} * r)",
  "formulaDesc": "Each monthly payment splits between interest on the current balance and principal reduction. Over time, principal share increases while interest share diminishes.",
  "fields": [
    {
      "id": "principal",
      "label": "Loan Amount",
      "type": "number",
      "default": 1000000,
      "min": 10000,
      "max": 50000000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "rate",
      "label": "Interest Rate (p.a.)",
      "type": "number",
      "default": 8.5,
      "min": 0.5,
      "max": 30,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Loan Tenure (Years)",
      "type": "number",
      "default": 5,
      "min": 1,
      "max": 30,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "scheduleView",
      "label": "Schedule Display",
      "type": "select",
      "default": "yearly",
      "options": [
        {
          "value": "yearly",
          "label": "Annual Summary (Year-by-Year)"
        },
        {
          "value": "monthly",
          "label": "Complete Monthly Breakdown"
        }
      ]
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "Why is the interest portion higher in early years?",
      "a": "In a reducing balance loan, interest is calculated on the outstanding balance. Since the balance is highest at the beginning, the early EMIs are predominantly interest payments."
    }
  ]
},
  {
  "id": "emi-advance-calculator",
  "category": "financial",
  "title": "EMI Advance Calculator",
  "badge": "Advanced",
  "icon": "calendar-clock",
  "customUi": "emi-advance-calculator",
  "summary": "Advanced loan EMI planner with Moratorium periods, loan start date, changing ROI, and prepayment simulation.",
  "description": "Plan complex loan scenarios with precision. Incorporate moratorium periods (grace time during construction or study), schedule lump-sum or recurring prepayments, model mid-tenure interest rate hikes/cuts, and visualize exact interest savings.",
  "formula": "A = P(1+r/n)^nt; Adjusted EMI with Moratorium Interest & Prepayment Reductions",
  "formulaDesc": "Moratorium interest is accrued during the initial grace months. Prepayments are deducted directly from the outstanding balance to eliminate future compounding.",
  "fields": [
    {
      "id": "principal",
      "label": "Loan Principal",
      "type": "number",
      "default": 2500000,
      "min": 10000,
      "max": 50000000,
      "step": 25000,
      "prefix": "₹"
    },
    {
      "id": "rate",
      "label": "Annual Interest Rate (%)",
      "type": "number",
      "default": 8.5,
      "min": 1,
      "max": 30,
      "step": 0.1,
      "suffix": "%"
    },
    {
      "id": "tenureYears",
      "label": "Loan Tenure (Years)",
      "type": "number",
      "default": 20,
      "min": 1,
      "max": 35,
      "step": 1,
      "suffix": "Yrs"
    },
    {
      "id": "startDate",
      "label": "Loan Start Month",
      "type": "text",
      "default": "Nov 2026"
    },
    {
      "id": "moratoriumMonths",
      "label": "Moratorium Period (Months)",
      "type": "number",
      "default": 0,
      "min": 0,
      "max": 36,
      "step": 1,
      "suffix": "Mos"
    },
    {
      "id": "prepaymentMonthly",
      "label": "Monthly Extra Prepayment",
      "type": "number",
      "default": 0,
      "min": 0,
      "max": 100000,
      "step": 500,
      "prefix": "₹"
    },
    {
      "id": "prepaymentLumpSum",
      "label": "Lump-Sum Prepayment Amount",
      "type": "number",
      "default": 100000,
      "min": 0,
      "max": 5000000,
      "step": 10000,
      "prefix": "₹"
    },
    {
      "id": "prepaymentMonth",
      "label": "Prepayment at Month #",
      "type": "number",
      "default": 12,
      "min": 1,
      "max": 360,
      "step": 1
    }
  ],
  "chartType": "donut",
  "faqs": [
    {
      "q": "What is a loan moratorium period?",
      "a": "A moratorium is a lender-approved holiday period during which you are not required to pay standard EMIs. However, simple interest usually accrues during this time and gets added to your principal."
    },
    {
      "q": "How much can I save by prepaying a small lump sum early in the loan?",
      "a": "Because interest is heavily front-loaded in reducing-balance loans, prepaying even 5-10% of the principal in the first 1-3 years can eliminate multiple years of tenure and save massive interest charges."
    }
  ]
},
  {
    "id": "loan-calculator",
    "category": "financial",
    "title": "Loan Calculator",
    "badge": "Popular",
    "icon": "landmark",
    "summary": "Calculate monthly payments, total interest, and total repayment cost for any loan.",
    "description": "The Loan Calculator helps you analyze standard fixed-rate loans including personal loans, auto loans, and student loans. It generates a full amortization breakdown showing the principal and interest paid each month.",
    "formula": "M = P * [r(1 + r)^n] / [(1 + r)^n - 1]",
    "formulaDesc": "Where M is monthly payment, P is principal loan amount, r is monthly interest rate (annual rate / 12), and n is total number of monthly payments.",
    "fields": [
      {
        "id": "principal",
        "label": "Loan Amount",
        "type": "number",
        "default": 50000,
        "min": 500,
        "max": 10000000,
        "step": 1000,
        "prefix": "₹"
      },
      {
        "id": "rate",
        "label": "Annual Interest Rate",
        "type": "number",
        "default": 6.5,
        "min": 0.1,
        "max": 36,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "tenureYears",
        "label": "Loan Term (Years)",
        "type": "number",
        "default": 5,
        "min": 1,
        "max": 30,
        "step": 1,
        "suffix": "Years"
      },
      {
        "id": "extraPayment",
        "label": "Optional Extra Monthly Payment",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 10000,
        "step": 50,
        "prefix": "₹"
      }
    ],
    "chartType": "donut",
    "faqs": [
      {
        "q": "How does an extra monthly payment impact my loan?",
        "a": "Extra monthly payments go directly toward reducing the principal balance. This reduces future interest accrual, lowering your total repayment cost and shortening the loan term."
      },
      {
        "q": "What is the difference between APR and interest rate?",
        "a": "The interest rate represents the base cost of borrowing the principal. APR (Annual Percentage Rate) includes both the interest rate and mandatory lender fees or origination costs."
      }
    ]
  },
  {
    "id": "emi-calculator",
    "category": "financial",
    "title": "EMI Calculator",
    "badge": "Essential",
    "icon": "credit-card",
    "summary": "Equated Monthly Installment calculator with complete monthly and annual amortization schedule.",
    "description": "Calculate your exact monthly EMI payments for personal, home, vehicle, or commercial credit. Inspect visual payment distributions between interest and principal over time.",
    "formula": "EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]",
    "formulaDesc": "P = Principal loan amount, R = Monthly interest rate (Annual rate / 12 / 100), N = Number of monthly installments.",
    "fields": [
      {
        "id": "principal",
        "label": "Loan Amount",
        "type": "number",
        "default": 100000,
        "min": 1000,
        "max": 50000000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "rate",
        "label": "Interest Rate (Annual)",
        "type": "number",
        "default": 8.5,
        "min": 0.5,
        "max": 30,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "tenureMonths",
        "label": "Tenure (Months)",
        "type": "number",
        "default": 36,
        "min": 3,
        "max": 360,
        "step": 1,
        "suffix": "Mo"
      }
    ],
    "chartType": "amortization",
    "faqs": [
      {
        "q": "What is an EMI?",
        "a": "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month."
      }
    ]
  },
  {
    "id": "mortgage-calculator",
    "category": "financial",
    "title": "Mortgage Calculator",
    "badge": "Popular",
    "icon": "home",
    "summary": "Estimate home loan payments including property taxes, home insurance, and PMI.",
    "description": "Comprehensive home mortgage calculator that factors in down payment percentage, annual property tax, homeowner insurance, and private mortgage insurance (PMI) for a realistic monthly housing budget.",
    "formula": "Total Monthly = P&I + (Taxes / 12) + (Insurance / 12) + PMI",
    "formulaDesc": "Calculates the complete PITI (Principal, Interest, Taxes, and Insurance) payment breakdown.",
    "fields": [
      {
        "id": "homePrice",
        "label": "Home Purchase Price",
        "type": "number",
        "default": 5000000,
        "min": 500000,
        "max": 100000000,
        "step": 50000,
        "prefix": "₹"
      },
      {
        "id": "downPaymentPercent",
        "label": "Down Payment (%)",
        "type": "number",
        "default": 20,
        "min": 0,
        "max": 90,
        "step": 1,
        "suffix": "%"
      },
      {
        "id": "interestRate",
        "label": "Interest Rate",
        "type": "number",
        "default": 6.8,
        "min": 0.1,
        "max": 18,
        "step": 0.05,
        "suffix": "%"
      },
      {
        "id": "loanTerm",
        "label": "Loan Term",
        "type": "select",
        "default": "30",
        "options": [
          {
            "label": "30 Years Fixed",
            "value": "30"
          },
          {
            "label": "20 Years Fixed",
            "value": "20"
          },
          {
            "label": "15 Years Fixed",
            "value": "15"
          },
          {
            "label": "10 Years Fixed",
            "value": "10"
          }
        ]
      },
      {
        "id": "propertyTaxRate",
        "label": "Annual Property Tax Rate",
        "type": "number",
        "default": 1.2,
        "min": 0,
        "max": 5,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "annualInsurance",
        "label": "Annual Homeowners Insurance",
        "type": "number",
        "default": 1400,
        "min": 0,
        "max": 20000,
        "step": 100,
        "prefix": "₹"
      },
      {
        "id": "hoaFee",
        "label": "Monthly HOA Fees",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 5000,
        "step": 25,
        "prefix": "₹"
      }
    ],
    "chartType": "donut",
    "faqs": [
      {
        "q": "When do I have to pay PMI?",
        "a": "Private Mortgage Insurance (PMI) is typically required by conventional lenders if your down payment is less than 20% of the purchase price."
      }
    ]
  },
  {
    "id": "car-loan-calculator",
    "category": "financial",
    "title": "Car Vehicle Loan Calculator",
    "badge": "Popular",
    "icon": "car",
    "summary": "Calculate car and vehicle loan EMI for Indian market with GST, down payment, and exchange value.",
    "description": "Determine your monthly auto loan EMI in India. Account for vehicle purchase price up to ₹5 Crore, exchange value, 18% GST, down payment, and interest rates.",
    "formula": "On-Road Price = (Vehicle Price − Exchange Value) × (1 + GST%). Loan Amount = On-Road Price − Down Payment. EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]",
    "formulaDesc": "GST is applied on the effective purchase price after deducting exchange value. EMI is amortized monthly based on standard Indian auto finance rates.",
    "fields": [
      {
        "id": "vehiclePrice",
        "label": "Vehicle Purchase Price",
        "type": "number",
        "default": 800000,
        "min": 100000,
        "max": 50000000,
        "step": 10000,
        "prefix": "₹"
      },
      {
        "id": "downPayment",
        "label": "Down Payment",
        "type": "number",
        "default": 80000,
        "min": 0,
        "max": 50000000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "exchangeValue",
        "label": "Exchange Value",
        "type": "number",
        "hasCheckbox": true,
        "checkboxId": "applyExchange",
        "checkboxLabel": "Apply Exchange Value",
        "default": 50000,
        "min": 0,
        "max": 20000000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "gstRate",
        "label": "GST Rate (%)",
        "type": "number",
        "default": 18,
        "min": 0,
        "max": 40,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "interestRate",
        "label": "Interest Rate (%)",
        "type": "number",
        "default": 9.5,
        "min": 1,
        "max": 30,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "loanTermMonths",
        "label": "Term Length",
        "type": "select",
        "default": "60",
        "options": [
          {
            "label": "12 Months (1 Yr)",
            "value": "12"
          },
          {
            "label": "24 Months (2 Yrs)",
            "value": "24"
          },
          {
            "label": "36 Months (3 Yrs)",
            "value": "36"
          },
          {
            "label": "48 Months (4 Yrs)",
            "value": "48"
          },
          {
            "label": "60 Months (5 Yrs)",
            "value": "60"
          },
          {
            "label": "72 Months (6 Yrs)",
            "value": "72"
          },
          {
            "label": "84 Months (7 Yrs)",
            "value": "84"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "personal-loan-calculator",
    "category": "financial",
    "title": "Personal Loan Calculator",
    "badge": "Finance",
    "icon": "user-check",
    "summary": "Analyze personal loan installments, processing fees, and net disbursed amount.",
    "description": "Compute your monthly payments and evaluate the true borrowing cost for unsecured personal loans. Account for upfront processing fees (0% to 5%) and review net disbursed funds.",
    "formula": "Processing Fee = Loan Amount × (Fee% / 100) | Disbursed Amount = Loan Amount − Processing Fee | EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]",
    "formulaDesc": "EMI and interest are calculated on the full sanctioned loan amount. The processing fee is deducted directly from the disbursed principal.",
    "fields": [
      {
        "id": "amount",
        "label": "Loan Amount",
        "type": "number",
        "default": 500000,
        "min": 25000,
        "max": 7000000,
        "step": 10000,
        "prefix": "₹"
      },
      {
        "id": "interestRate",
        "label": "Interest Rate",
        "type": "number",
        "default": 10.5,
        "min": 1,
        "max": 36,
        "step": 0.25,
        "suffix": "%"
      },
      {
        "id": "termMonths",
        "label": "Loan Term (Months)",
        "type": "number",
        "default": 36,
        "min": 6,
        "max": 84,
        "step": 6,
        "suffix": "Mo"
      },
      {
        "id": "processingFee",
        "label": "Processing Fee (%)",
        "type": "number",
        "default": 1,
        "min": 0,
        "max": 5,
        "step": 0.1,
        "suffix": "%"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "home-loan-calculator",
    "category": "financial",
    "title": "Home Loan Calculator",
    "badge": "Finance",
    "icon": "building",
    "summary": "Evaluate home borrowing power, monthly payments, and long-term interest cost.",
    "description": "Fine-tune your home financing plan with customizable terms, interest rates, and loan payoff trajectories.",
    "formula": "M = P * [r(1+r)^n] / [(1+r)^n - 1]",
    "formulaDesc": "Standard fixed-rate home mortgage amortization calculation based on property value and LTV financing percentage.",
    "fields": [
      {
        "id": "propertyValue",
        "label": "Property Value",
        "type": "number",
        "default": 6250000,
        "min": 500000,
        "max": 100000000,
        "step": 50000,
        "prefix": "₹"
      },
      {
        "id": "loanPercent",
        "label": "Financing Percentage (LTV)",
        "tooltip": "LTV = Loan‑to‑Value Ratio. It represents the percentage of the property’s value financed by the bank. The remaining amount is your down payment. For example, if your property is worth ₹62,50,000 and the bank offers 80 % LTV, your loan amount will be ₹50,00,000 and you’ll pay ₹12,50,000 yourself.",
        "type": "number",
        "default": 80,
        "min": 50,
        "max": 90,
        "step": 1,
        "suffix": "%"
      },
      {
        "id": "interestRate",
        "label": "Annual Interest Rate",
        "type": "number",
        "default": 8.5,
        "min": 0.5,
        "max": 20,
        "step": 0.05,
        "suffix": "%"
      },
      {
        "id": "tenureYears",
        "label": "Tenure (Years)",
        "type": "number",
        "default": 20,
        "min": 1,
        "max": 30,
        "step": 1,
        "suffix": "Years"
      }
    ],
    "chartType": "amortization",
    "faqs": [
      {
        "q": "What is Financing Percentage (LTV) in Home Loans?",
        "a": "LTV = Loan‑to‑Value Ratio. It represents the percentage of the property’s value financed by the bank. The remaining amount is your down payment. For example, if your property is worth ₹62,50,000 and the bank offers 80 % LTV, your loan amount will be ₹50,00,000 and you’ll pay ₹12,50,000 yourself."
      },
      {
        "q": "What is the typical LTV limit allowed by banks in India?",
        "a": "Per RBI prudential norms, Indian banks typically sanction up to 90% LTV for home loans up to ₹30 Lakh, up to 80% LTV for loans between ₹30 Lakh and ₹75 Lakh, and up to 75% LTV for loans above ₹75 Lakh."
      }
    ]
  },
  {
    "id": "interest-calculator",
    "category": "financial",
    "title": "Interest Calculator",
    "badge": "Finance",
    "icon": "percent",
    "summary": "Compare simple vs compound interest over any custom timeframe.",
    "description": "Directly compare how your wealth grows under simple interest versus compound interest across any term and compounding frequency.",
    "formula": "Simple: I = P*r*t | Compound: A = P*(1 + r/n)^(nt)",
    "formulaDesc": "Reveals the compounding multiplier advantage over linear growth.",
    "fields": [
      {
        "id": "principal",
        "label": "Principal Sum",
        "type": "number",
        "default": 10000,
        "min": 100,
        "max": 10000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "rate",
        "label": "Annual Interest Rate",
        "type": "number",
        "default": 7,
        "min": 0.1,
        "max": 50,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "years",
        "label": "Time Horizon (Years)",
        "type": "number",
        "default": 10,
        "min": 1,
        "max": 50,
        "step": 1,
        "suffix": "Yrs"
      }
    ],
    "chartType": "bar"
  },
  {
    "id": "simple-interest-calculator",
    "category": "financial",
    "title": "Simple Interest Calculator",
    "badge": "Finance",
    "icon": "divide",
    "summary": "Compute basic non-compounding interest returns or loan interest.",
    "description": "Calculate simple interest accrued on bonds, short-term debt, or promissory notes without compounding.",
    "formula": "Interest = Principal * (Rate / 100) * Time",
    "formulaDesc": "Where Time is expressed in years or fraction of years.",
    "fields": [
      {
        "id": "principal",
        "label": "Principal Amount",
        "type": "number",
        "default": 5000,
        "min": 10,
        "max": 10000000,
        "step": 100,
        "prefix": "₹"
      },
      {
        "id": "rate",
        "label": "Annual Interest Rate (%)",
        "type": "number",
        "default": 5.5,
        "min": 0.1,
        "max": 100,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "timeYears",
        "label": "Time Period (Years)",
        "type": "number",
        "default": 3,
        "min": 0.1,
        "max": 50,
        "step": 0.5,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "compound-interest-calculator",
    "category": "financial",
    "title": "Compound Interest Calculator",
    "badge": "Popular",
    "icon": "activity",
    "summary": "Calculate future wealth with customizable compounding periods and regular deposits.",
    "description": "Harness the power of compounding. See your savings or investment portfolio grow over decades with periodic contributions and adjustable compounding frequencies.",
    "formula": "A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]",
    "formulaDesc": "P = initial balance, PMT = regular deposit, r = interest rate, n = compound frequency, t = years.",
    "fields": [
      {
        "id": "principal",
        "label": "Initial Principal",
        "type": "number",
        "default": 10000,
        "min": 0,
        "max": 10000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "monthlyDeposit",
        "label": "Monthly Addition",
        "type": "number",
        "default": 300,
        "min": 0,
        "max": 100000,
        "step": 50,
        "prefix": "₹"
      },
      {
        "id": "interestRate",
        "label": "Annual Return Rate (%)",
        "type": "number",
        "default": 8,
        "min": 0.1,
        "max": 30,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "years",
        "label": "Investment Length (Years)",
        "type": "number",
        "default": 20,
        "min": 1,
        "max": 50,
        "step": 1,
        "suffix": "Years"
      },
      {
        "id": "compoundingFrequency",
        "label": "Compounding Frequency",
        "type": "select",
        "default": "12",
        "options": [
          {
            "label": "Annually (1/yr)",
            "value": "1"
          },
          {
            "label": "Semi-Annually (2/yr)",
            "value": "2"
          },
          {
            "label": "Quarterly (4/yr)",
            "value": "4"
          },
          {
            "label": "Monthly (12/yr)",
            "value": "12"
          },
          {
            "label": "Daily (365/yr)",
            "value": "365"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "investment-calculator",
    "category": "financial",
    "title": "Investment Calculator",
    "badge": "Popular",
    "icon": "line-chart",
    "summary": "Project portfolio growth, total gains, and compound returns over time.",
    "description": "Model the future value of your brokerage, stocks, mutual funds, or real estate assets based on regular contributions and expected rates of return.",
    "formula": "Future Value = FV(rate, nper, pmt, pv)",
    "formulaDesc": "Computes future terminal asset valuation and total profit generated.",
    "fields": [
      {
        "id": "startingAmount",
        "label": "Starting Investment",
        "type": "number",
        "default": 25000,
        "min": 0,
        "max": 10000000,
        "step": 1000,
        "prefix": "₹"
      },
      {
        "id": "contribution",
        "label": "Monthly Contribution",
        "type": "number",
        "default": 500,
        "min": 0,
        "max": 50000,
        "step": 50,
        "prefix": "₹"
      },
      {
        "id": "annualReturn",
        "label": "Estimated Annual Return",
        "type": "number",
        "default": 9,
        "min": 1,
        "max": 30,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "years",
        "label": "Investment Horizon",
        "type": "number",
        "default": 15,
        "min": 1,
        "max": 40,
        "step": 1,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "sip-calculator",
    "category": "financial",
    "title": "SIP Calculator",
    "badge": "Popular",
    "icon": "repeat",
    "summary": "Calculate mutual fund returns from Systematic Investment Plans.",
    "description": "SIP (Systematic Investment Plan) allows you to invest small fixed amounts monthly in mutual funds or index funds. Compute your maturity value and total wealth generated.",
    "formula": "M = P * [((1 + i)^n - 1) / i] * (1 + i)",
    "formulaDesc": "Where P is monthly installment, i is monthly return rate, and n is total monthly installments.",
    "fields": [
      {
        "id": "monthlyInvestment",
        "label": "Monthly Investment Amount",
        "type": "number",
        "default": 5000,
        "min": 500,
        "max": 1000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "expectedReturn",
        "label": "Expected Annual Return Rate",
        "type": "number",
        "default": 12,
        "min": 1,
        "max": 35,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "timePeriod",
        "label": "Time Horizon (Years)",
        "type": "number",
        "default": 10,
        "min": 1,
        "max": 35,
        "step": 1,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "swp-calculator",
    "category": "financial",
    "title": "SWP Calculator",
    "badge": "Popular",
    "icon": "refresh-cw",
    "summary": "Calculate regular monthly cashflows, total withdrawals, and final corpus growth with Systematic Withdrawal Plans.",
    "description": "An SWP (Systematic Withdrawal Plan) allows you to withdraw a fixed sum regularly from your mutual fund investments while allowing the remaining balance to compound. Ideal for post-retirement pension income, passive cashflow, and high tax efficiency.",
    "formula": "V_n = P(1 + i)^n - W \\cdot \\frac{(1 + i)^n - 1}{i}",
    "formulaDesc": "Where P is initial investment, W is monthly withdrawal amount, i is monthly return rate (r / 12), and n is total months.",
    "fields": [
      {
        "id": "totalInvestment",
        "label": "Total Investment (Initial Corpus)",
        "type": "number",
        "default": 1000000,
        "min": 10000,
        "max": 100000000,
        "step": 10000,
        "prefix": "₹"
      },
      {
        "id": "monthlyWithdrawal",
        "label": "Monthly Withdrawal Amount",
        "type": "number",
        "default": 8000,
        "min": 500,
        "max": 1000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "expectedReturn",
        "label": "Expected Return Rate (Annual %)",
        "type": "number",
        "default": 10.0,
        "min": 1,
        "max": 35,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "timePeriod",
        "label": "Time Horizon (Years)",
        "type": "number",
        "default": 10,
        "min": 1,
        "max": 35,
        "step": 1,
        "suffix": "Years"
      }
    ],
    "chartType": "donut",
    "faqs": [
      {
        "q": "What is a Systematic Withdrawal Plan (SWP)?",
        "a": "An SWP is a mutual fund facility allowing investors to withdraw a fixed predetermined amount at regular intervals (monthly, quarterly, or annually) from an existing mutual fund corpus. While withdrawals provide regular cash flow, the remaining balance stays invested and continues to compound."
      },
      {
        "q": "How is SWP different from SIP?",
        "a": "SIP (Systematic Investment Plan) is used during wealth accumulation to invest fixed sums regularly into mutual funds. SWP (Systematic Withdrawal Plan) is used during wealth distribution or retirement to withdraw regular cashflows from an accumulated corpus."
      },
      {
        "q": "How are mutual fund SWP withdrawals taxed in India?",
        "a": "Unlike FD interest which is taxed 100% at your income tax slab, an SWP withdrawal is treated as a partial redemption of capital and capital gains. Only the capital gains component of each withdrawal is taxable. For Equity mutual funds, LTCG (held >12 months) up to ₹1.25 Lakh per financial year is tax-free, and above that is taxed at 12.5%. STCG is taxed at 20%."
      },
      {
        "q": "Is SWP better than Fixed Deposit (FD) monthly interest or Dividend (IDCW)?",
        "a": "Yes, for most investors SWP is vastly superior because: (1) Higher potential compounding returns in hybrid/equity mutual funds compared to fixed deposit interest; (2) Much greater tax efficiency because only the capital gain portion is taxed, not the principal; (3) Complete control over withdrawal amount, date, and tenure."
      }
    ]
  },
  {
    "id": "jewellery-price-calculator",
    "category": "financial",
    "title": "Jewellery Price Calculator",
    "badge": "New",
    "icon": "jewellery",
    "customUi": "jewellery-price-calculator",
    "summary": "Calculate final gold jewellery price with 22K/24K rates, making charges, and GST, or find gold weight for your budget.",
    "description": "Calculate the exact price of gold jewellery in India based on live 24-carat gold rates, automatic 22-carat conversion, jeweler making charges, and 3% GST. Includes an interactive 'Gold for My Budget' planner to discover how much gold you can buy for any budget.",
    "formula": "Final Price = (Weight × Carat Rate × (1 + Making %)) × (1 + GST %)",
    "formulaDesc": "Where 22K Rate = 24K Rate × (22 / 24). Making charges and 3% GST are computed on the total item value.",
    "fields": [
      {
        "id": "goldPrice24k",
        "label": "24-Carat Gold Rate (Per Gram)",
        "type": "number",
        "default": 7500,
        "min": 1000,
        "max": 50000,
        "step": 50,
        "prefix": "₹"
      },
      {
        "id": "purityCarat",
        "label": "Purity (Carat)",
        "type": "number",
        "default": 22,
        "min": 14,
        "max": 24,
        "step": 1,
        "suffix": "K"
      },
      {
        "id": "weightGrams",
        "label": "Jewellery Weight (Grams)",
        "type": "number",
        "default": 10,
        "min": 0.1,
        "max": 1000,
        "step": 0.1,
        "suffix": "g"
      },
      {
        "id": "makingChargePercent",
        "label": "Making Charges (%)",
        "type": "number",
        "default": 10,
        "min": 0,
        "max": 40,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "gstPercent",
        "label": "GST Rate (%)",
        "type": "number",
        "default": 3,
        "min": 0,
        "max": 18,
        "step": 0.5,
        "suffix": "%"
      }
    ],
    "chartType": "donut",
    "faqs": [
      {
        "q": "How is the 22-carat gold price calculated from 24-carat gold?",
        "a": "24-carat gold is 99.9% pure (24/24). 22-carat gold contains 22 parts gold and 2 parts alloy metals (91.6% purity). The 22K rate is calculated as: 22K Price = 24K Price × (22 ÷ 24)."
      },
      {
        "q": "What is the standard formula used by Indian jewelers for jewellery pricing?",
        "a": "The standard formula is: Final Price = [Gold Weight × Carat Rate + Making Charges] + 3% GST. Making charges are typically charged as a percentage of the gold value (ranging from 6% to 20% depending on craftsmanship and design)."
      },
      {
        "q": "What is the standard GST rate on gold jewellery in India?",
        "a": "Under Indian GST law, a uniform 3% GST is levied on the total value of the gold jewellery (Gold value + Making charges). An additional 5% GST applies on standalone making/job-work charges if done separately."
      },
      {
        "q": "How does the 'Gold for My Budget' calculation work?",
        "a": "It calculates the effective all-inclusive cost per gram: Cost Per Gram = Carat Rate × (1 + Making %) × (1 + GST %). Then it divides your total budget by this all-inclusive cost to show the exact grams and milligrams of jewellery you can purchase."
      },
      {
        "q": "What is BIS Hallmarking and HUID?",
        "a": "BIS (Bureau of Indian Standards) Hallmarking guarantees the purity of gold. Every hallmarked piece features 3 marks: the BIS logo, purity grade (e.g., 916 for 22K, 750 for 18K), and a unique 6-digit alphanumeric HUID (Hallmark Unique Identification Number)."
      }
    ]
  },
  {
    "id": "lumpsum-calculator",
    "category": "financial",
    "title": "Lumpsum Calculator",
    "badge": "Finance",
    "icon": "wallet",
    "summary": "Calculate maturity value for one-time lumpsum investments.",
    "description": "Calculate expected returns on a single, one-time investment in mutual funds, stocks, or index funds compounded over your chosen horizon.",
    "formula": "A = P * (1 + r)^t",
    "formulaDesc": "Annual compounding formula for one-time deposit P at annual rate r over t years.",
    "fields": [
      {
        "id": "totalInvestment",
        "label": "Lumpsum Investment",
        "type": "number",
        "default": 100000,
        "min": 1000,
        "max": 50000000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "returnRate",
        "label": "Expected Return Rate (Annual %)",
        "type": "number",
        "default": 11.5,
        "min": 1,
        "max": 35,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "years",
        "label": "Tenure (Years)",
        "type": "number",
        "default": 7,
        "min": 1,
        "max": 35,
        "step": 1,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "ppf-calculator",
    "category": "financial",
    "title": "PPF Calculator",
    "badge": "Finance",
    "icon": "shield-check",
    "summary": "Public Provident Fund 15-year maturity and interest calculator.",
    "description": "Plan your long-term tax-exempt government savings scheme with the 15-year statutory lock-in PPF calculator.",
    "formula": "F = P * [({(1 + i)^n} - 1) / i]",
    "formulaDesc": "Annual compounding with fixed government statutory interest rate.",
    "fields": [
      {
        "id": "yearlyDeposit",
        "label": "Yearly Deposit Amount",
        "type": "number",
        "default": 150000,
        "min": 500,
        "max": 150000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "interestRate",
        "label": "PPF Interest Rate",
        "type": "number",
        "default": 7.1,
        "min": 5,
        "max": 12,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "tenureYears",
        "label": "Tenure (Years)",
        "type": "number",
        "default": 15,
        "min": 15,
        "max": 30,
        "step": 5,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "fd-calculator",
    "category": "financial",
    "title": "FD Calculator",
    "badge": "Finance",
    "icon": "lock",
    "summary": "Fixed Deposit maturity amount with quarterly compounding.",
    "description": "Calculate interest earned and final maturity value on your bank Fixed Deposit (FD) accounts.",
    "formula": "A = P * (1 + r/4)^(4*t)",
    "formulaDesc": "Standard quarterly compounded fixed term interest.",
    "fields": [
      {
        "id": "principal",
        "label": "FD Deposit Amount",
        "type": "number",
        "default": 50000,
        "min": 1000,
        "max": 10000000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "interestRate",
        "label": "Interest Rate (% p.a.)",
        "type": "number",
        "default": 7.25,
        "min": 1,
        "max": 15,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "periodMonths",
        "label": "Tenure (Months)",
        "type": "number",
        "default": 24,
        "min": 3,
        "max": 120,
        "step": 3,
        "suffix": "Months"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "rd-calculator",
    "category": "financial",
    "title": "RD Calculator",
    "badge": "Finance",
    "icon": "layers",
    "summary": "Recurring Deposit maturity and cumulative interest calculator.",
    "description": "Determine the total maturity payout of monthly recurring deposits compounded quarterly.",
    "formula": "M = P * n + P * n(n+1)/2 * (r/12) * (1/100)",
    "formulaDesc": "Computes cumulative monthly recurring deposits with accrued compound interest.",
    "fields": [
      {
        "id": "monthlyDeposit",
        "label": "Monthly Deposit",
        "type": "number",
        "default": 5000,
        "min": 500,
        "max": 500000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "interestRate",
        "label": "Interest Rate (%)",
        "type": "number",
        "default": 6.8,
        "min": 1,
        "max": 15,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "periodMonths",
        "label": "Tenure (Months)",
        "type": "number",
        "default": 36,
        "min": 6,
        "max": 120,
        "step": 6,
        "suffix": "Months"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "cagr-calculator",
    "category": "financial",
    "title": "CAGR Calculator",
    "badge": "Finance",
    "icon": "bar-chart-2",
    "summary": "Compound Annual Growth Rate of investments over multi-year periods.",
    "description": "Calculate the smoothed annual return rate of an investment from its initial value to its final value over any period.",
    "formula": "CAGR = (Ending Value / Beginning Value)^(1 / n) - 1",
    "formulaDesc": "Where n is the total number of holding years.",
    "fields": [
      {
        "id": "initialValue",
        "label": "Beginning / Initial Value",
        "type": "number",
        "default": 10000,
        "min": 1,
        "max": 100000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "finalValue",
        "label": "Ending / Final Value",
        "type": "number",
        "default": 28500,
        "min": 1,
        "max": 100000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "years",
        "label": "Holding Period (Years)",
        "type": "number",
        "default": 5,
        "min": 0.1,
        "max": 50,
        "step": 0.5,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "roi-calculator",
    "category": "financial",
    "title": "ROI Calculator",
    "badge": "Finance",
    "icon": "pie-chart",
    "summary": "Return on Investment percentage and annualized performance.",
    "description": "Measure the profitability and efficiency of an investment or business expenditure.",
    "formula": "ROI = [(Net Profit) / Cost of Investment] * 100%",
    "formulaDesc": "Also calculates annualized ROI when holding duration is provided.",
    "fields": [
      {
        "id": "investmentCost",
        "label": "Amount Invested (Cost)",
        "type": "number",
        "default": 20000,
        "min": 1,
        "max": 100000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "amountReturned",
        "label": "Amount Returned / Final Value",
        "type": "number",
        "default": 29000,
        "min": 0,
        "max": 100000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "holdingYears",
        "label": "Investment Duration (Years)",
        "type": "number",
        "default": 3,
        "min": 0.1,
        "max": 50,
        "step": 0.5,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "nps-calculator",
    "category": "financial",
    "title": "NPS Calculator",
    "badge": "Retirement",
    "icon": "shield-check",
    "summary": "Calculate National Pension System corpus, monthly pension, and tax savings.",
    "description": "Estimate your accumulated retirement corpus, 60% tax-free lump sum withdrawal, 40% mandatory annuity pension, and triple tax benefits under National Pension System (NPS).",
    "formula": "FV = P * [((1 + r)^n - 1) / r] * (1 + r)",
    "formulaDesc": "Compound growth of monthly contributions, split into 60% tax-free lump sum and 40% minimum annuity pension.",
    "fields": [
      {
        "id": "monthlyInvestment",
        "label": "Monthly Contribution Amount",
        "type": "number",
        "default": 5000,
        "min": 500,
        "max": 150000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "currentAge",
        "label": "Your Current Age",
        "type": "number",
        "default": 28,
        "min": 18,
        "max": 65,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "retirementAge",
        "label": "Planned Retirement Age",
        "type": "number",
        "default": 60,
        "min": 50,
        "max": 75,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "expectedReturn",
        "label": "Expected Annual Return Rate",
        "type": "number",
        "default": 10,
        "min": 5,
        "max": 16,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "annuityPercent",
        "label": "Annuity Reinvestment Ratio (Min 40%)",
        "type": "number",
        "default": 40,
        "min": 40,
        "max": 100,
        "step": 5,
        "suffix": "%"
      },
      {
        "id": "annuityRate",
        "label": "Expected Annuity Return Rate",
        "type": "number",
        "default": 6.5,
        "min": 4,
        "max": 12,
        "step": 0.25,
        "suffix": "%"
      }
    ],
    "chartType": "donut",
    "faqs": [
      {
        "q": "What is the mandatory minimum annuity purchase in NPS at retirement?",
        "a": "Under PFRDA rules, at age 60, a subscriber must allocate a minimum of 40% of their accumulated NPS corpus toward purchasing an annuity for lifetime pension. Up to 60% of the corpus can be withdrawn as a completely tax-free lump sum."
      },
      {
        "q": "What are the tax advantages of investing in NPS?",
        "a": "NPS offers an exclusive additional deduction of up to ₹50,000 under Section 80CCD(1B) beyond the ₹1.5 Lakh limit of Section 80C. Employer contributions up to 10% (or 14% for government employees) of salary are also deductible under Section 80CCD(2)."
      },
      {
        "q": "Can I withdraw my money before age 60?",
        "a": "Partial withdrawals of up to 25% of your own contributions are allowed after 3 years for specific purposes like higher education, children's marriage, purchasing a first home, or critical illnesses. Premature exit before age 60 requires 80% to be put into annuity."
      }
    ]
  },
  {
    "id": "retirement-calculator",
    "category": "financial",
    "title": "Retirement Calculator",
    "badge": "Essential",
    "icon": "umbrella",
    "summary": "Plan your retirement nest egg, monthly savings target, and nest egg longevity.",
    "description": "Calculate how much you need to save each month to retire comfortably, accounting for inflation, lifespan expectancy, and post-retirement returns.",
    "formula": "Nest Egg = Desired Annual Spend / Safe Withdrawal Rate (4%)",
    "formulaDesc": "Accounts for pre-retirement accumulation and post-retirement drawdown.",
    "fields": [
      {
        "id": "currentAge",
        "label": "Current Age",
        "type": "number",
        "default": 30,
        "min": 18,
        "max": 80,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "retirementAge",
        "label": "Planned Retirement Age",
        "type": "number",
        "default": 60,
        "min": 30,
        "max": 90,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "lifeExpectancy",
        "label": "Life Expectancy",
        "type": "number",
        "default": 85,
        "min": 65,
        "max": 110,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "currentSavings",
        "label": "Current Savings / Portfolio",
        "type": "number",
        "default": 50000,
        "min": 0,
        "max": 10000000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "monthlyExpenseRetirement",
        "label": "Desired Monthly Spending in Retirement",
        "type": "number",
        "default": 4000,
        "min": 500,
        "max": 50000,
        "step": 250,
        "prefix": "₹"
      },
      {
        "id": "expectedInflation",
        "label": "Expected Inflation Rate (%)",
        "type": "number",
        "default": 3,
        "min": 0.5,
        "max": 10,
        "step": 0.5,
        "suffix": "%"
      },
      {
        "id": "preRetirementReturn",
        "label": "Pre-Retirement Return (%)",
        "type": "number",
        "default": 8.5,
        "min": 1,
        "max": 20,
        "step": 0.5,
        "suffix": "%"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "inflation-calculator",
    "category": "financial",
    "title": "Inflation Calculator",
    "badge": "Finance",
    "icon": "trending-down",
    "summary": "Measure the impact of inflation on purchasing power over time.",
    "description": "Understand how inflation erodes cash purchasing power and find out what an amount today will be worth in future years.",
    "formula": "Future Value = Present Value * (1 + inflation_rate)^years",
    "formulaDesc": "Shows how much purchasing power decreases over time.",
    "fields": [
      {
        "id": "presentAmount",
        "label": "Current Amount / Cost",
        "type": "number",
        "default": 1000,
        "min": 1,
        "max": 10000000,
        "step": 50,
        "prefix": "₹"
      },
      {
        "id": "inflationRate",
        "label": "Average Annual Inflation (%)",
        "type": "number",
        "default": 3.5,
        "min": 0.1,
        "max": 30,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "years",
        "label": "Number of Years",
        "type": "number",
        "default": 10,
        "min": 1,
        "max": 50,
        "step": 1,
        "suffix": "Years"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "salary-calculator",
    "category": "financial",
    "title": "Salary Calculator",
    "badge": "Popular",
    "icon": "briefcase",
    "summary": "Convert hourly, weekly, monthly, and annual pay into take-home estimates.",
    "description": "Convert between hourly wage and yearly salary, and estimate net take-home pay after standard tax and deduction withholding.",
    "formula": "Annual = Hourly * Hours/Week * 52 Weeks",
    "formulaDesc": "Breakdown across Hourly, Daily, Weekly, Bi-weekly, Monthly, and Annual pay.",
    "fields": [
      {
        "id": "salaryAmount",
        "label": "Pay Amount",
        "type": "number",
        "default": 75000,
        "min": 1,
        "max": 5000000,
        "step": 1000,
        "prefix": "₹"
      },
      {
        "id": "payFrequency",
        "label": "Pay Frequency",
        "type": "select",
        "default": "annual",
        "options": [
          {
            "label": "Annual (Per Year)",
            "value": "annual"
          },
          {
            "label": "Monthly (Per Month)",
            "value": "monthly"
          },
          {
            "label": "Bi-Weekly (Every 2 Wks)",
            "value": "biweekly"
          },
          {
            "label": "Weekly (Per Week)",
            "value": "weekly"
          },
          {
            "label": "Hourly (Per Hour)",
            "value": "hourly"
          }
        ]
      },
      {
        "id": "hoursPerWeek",
        "label": "Hours Worked Per Week",
        "type": "number",
        "default": 40,
        "min": 1,
        "max": 80,
        "step": 1,
        "suffix": "Hrs"
      },
      {
        "id": "estimatedTaxRate",
        "label": "Estimated Total Tax & Deductions (%)",
        "type": "number",
        "default": 22,
        "min": 0,
        "max": 60,
        "step": 1,
        "suffix": "%"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "income-tax-calculator",
    "category": "financial",
    "title": "Old vs New Regime Income Tax Calculator",
    "badge": "FY 2024-25 & 2025-26",
    "icon": "scale",
    "summary": "Compare tax liabilities under Old vs New Tax Regime (Budget 2024 revised slabs) with deductions, breakeven threshold, and regime recommendation.",
    "description": "Accurately compare your income tax liability under the New Tax Regime (Section 115BAC revised for FY 2024-25 / AY 2025-26 with ₹75,000 standard deduction) versus the Old Tax Regime. Covers Section 80C, 80D Mediclaim, HRA exemption, Section 24(b) Home Loan Interest, Section 80CCD(1B) NPS, Section 87A rebate, surcharge, cess, and intelligent breakeven deduction calculations.",
    "formula": "New Regime (Sec 115BAC): ₹75k Std Ded + Revised Slabs + Sec 87A Rebate vs Old Regime: ₹50k Std Ded + Age Slabs + Chapter VI-A Deductions",
    "formulaDesc": "Union Budget 2024 revised New Regime (₹75,000 standard deduction & zero tax up to ₹7.75 Lakh) vs Old Regime with full 80C, 80D, HRA & Home Loan deductions.",
    "fields": [
      {
        "id": "taxableIncome",
        "label": "Annual Gross Income / CTC",
        "type": "number",
        "default": 1200000,
        "min": 0,
        "max": 100000000,
        "step": 10000,
        "prefix": "₹"
      },
      {
        "id": "employmentType",
        "label": "Employment Category",
        "type": "select",
        "default": "salaried",
        "options": [
          {
            "label": "Salaried Employee (₹75k New / ₹50k Old Std Deduction)",
            "value": "salaried"
          },
          {
            "label": "Self-Employed / Business / Professional",
            "value": "self-employed"
          }
        ]
      },
      {
        "id": "ageGroup",
        "label": "Age Category (For Old Regime Slabs)",
        "type": "select",
        "default": "regular",
        "options": [
          {
            "label": "Below 60 Years (General Individual)",
            "value": "regular"
          },
          {
            "label": "60 to 79 Years (Senior Citizen)",
            "value": "senior"
          },
          {
            "label": "80 Years & Above (Super Senior Citizen)",
            "value": "super-senior"
          }
        ]
      },
      {
        "id": "sec80c",
        "label": "Section 80C (EPF, PPF, ELSS, Life Ins, Max ₹1.5L)",
        "type": "number",
        "default": 150000,
        "min": 0,
        "max": 150000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "sec80d",
        "label": "Section 80D (Health Insurance Mediclaim, Max ₹1L)",
        "type": "number",
        "default": 25000,
        "min": 0,
        "max": 100000,
        "step": 2500,
        "prefix": "₹"
      },
      {
        "id": "hraExemption",
        "label": "HRA Exemption (House Rent Allowance u/s 10(13A))",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 1000000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "homeLoanInterest",
        "label": "Sec 24(b) Home Loan Interest (Self Occupied, Max ₹2L)",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 200000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "npsAdditional",
        "label": "Sec 80CCD(1B) Additional NPS (Self, Max ₹50k)",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 50000,
        "step": 5000,
        "prefix": "₹"
      },
      {
        "id": "otherDeductions",
        "label": "Other Deductions (80E, 80G, 80TTA/TTB, etc.)",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 500000,
        "step": 5000,
        "prefix": "₹"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "gst-calculator",
    "category": "financial",
    "title": "GST Calculator",
    "badge": "Finance",
    "icon": "receipt",
    "summary": "Calculate GST inclusive or exclusive pricing with standard rate slabs.",
    "description": "Add or remove Goods and Services Tax (GST) with standard rate slabs (3%, 5%, 12%, 18%, 28%) and view the CGST/SGST split.",
    "formula": "Add GST: Net * (1 + R/100) | Remove GST: Gross / (1 + R/100)",
    "formulaDesc": "Accurately breaks down base amount and applicable tax components.",
    "fields": [
      {
        "id": "amount",
        "label": "Base Amount",
        "type": "number",
        "default": 1000,
        "min": 1,
        "max": 10000000,
        "step": 50,
        "prefix": "₹"
      },
      {
        "id": "gstRate",
        "label": "GST Rate (%)",
        "type": "select",
        "default": "18",
        "options": [
          {
            "label": "3% (Precious Metals)",
            "value": "3"
          },
          {
            "label": "5% (Essential Goods)",
            "value": "5"
          },
          {
            "label": "12% (Standard Low)",
            "value": "12"
          },
          {
            "label": "18% (Standard Services/Goods)",
            "value": "18"
          },
          {
            "label": "28% (Luxury Goods)",
            "value": "28"
          }
        ]
      },
      {
        "id": "gstAction",
        "label": "Calculation Mode",
        "type": "select",
        "default": "add",
        "options": [
          {
            "label": "Add GST (Price Exclusive of Tax)",
            "value": "add"
          },
          {
            "label": "Remove GST (Price Inclusive of Tax)",
            "value": "remove"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "tip-calculator",
    "category": "financial",
    "title": "Tip Calculator",
    "badge": "Popular",
    "icon": "utensils",
    "summary": "Calculate bill tips and split totals evenly among friends.",
    "description": "Quickly calculate customary tips for restaurants, food delivery, and service providers. Easily split the final amount among your group.",
    "formula": "Tip Amount = Bill * (Tip % / 100) | Total Per Person = (Bill + Tip) / People",
    "formulaDesc": "Effortlessly split bills at restaurant dining.",
    "fields": [
      {
        "id": "billAmount",
        "label": "Bill Amount",
        "type": "number",
        "default": 84.5,
        "min": 0.1,
        "max": 50000,
        "step": 0.5,
        "prefix": "₹"
      },
      {
        "id": "tipPercent",
        "label": "Tip Percentage",
        "type": "number",
        "default": 18,
        "min": 0,
        "max": 100,
        "step": 1,
        "suffix": "%"
      },
      {
        "id": "splitPeople",
        "label": "Number of People",
        "type": "number",
        "default": 2,
        "min": 1,
        "max": 50,
        "step": 1,
        "suffix": "Guests"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "discount-calculator",
    "category": "financial",
    "title": "Discount Calculator",
    "badge": "Popular",
    "icon": "tag",
    "summary": "Calculate sales discounts, markdown percentage, and final savings.",
    "description": "Find out exactly how much you save during retail sales, holiday promotions, and clearance events with single or stacked discounts.",
    "formula": "Final Price = Original Price * (1 - Discount% / 100)",
    "formulaDesc": "Includes optional extra secondary promo code discount.",
    "fields": [
      {
        "id": "originalPrice",
        "label": "Original Retail Price",
        "type": "number",
        "default": 120,
        "min": 1,
        "max": 100000,
        "step": 5,
        "prefix": "₹"
      },
      {
        "id": "discountPercent",
        "label": "Discount (%)",
        "type": "number",
        "default": 25,
        "min": 0,
        "max": 100,
        "step": 1,
        "suffix": "%"
      },
      {
        "id": "extraPromoPercent",
        "label": "Additional Promo Code (%)",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 50,
        "step": 5,
        "suffix": "%"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "profit-margin-calculator",
    "category": "financial",
    "title": "Profit Margin Calculator",
    "badge": "Finance",
    "icon": "percent",
    "summary": "Calculate gross profit margin, net margin, and cost markup percentage.",
    "description": "Determine your product selling price, gross profit margin, and markup percentage based on cost of goods sold.",
    "formula": "Margin = (Revenue - Cost) / Revenue | Markup = (Revenue - Cost) / Cost",
    "formulaDesc": "Essential metrics for commerce and pricing strategy.",
    "fields": [
      {
        "id": "cost",
        "label": "Cost of Goods (COGS)",
        "type": "number",
        "default": 45,
        "min": 0.01,
        "max": 10000000,
        "step": 1,
        "prefix": "₹"
      },
      {
        "id": "revenue",
        "label": "Selling Price (Revenue)",
        "type": "number",
        "default": 80,
        "min": 0.01,
        "max": 10000000,
        "step": 1,
        "prefix": "₹"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "break-even-calculator",
    "category": "financial",
    "title": "Break-Even Calculator",
    "badge": "Finance",
    "icon": "crosshair",
    "summary": "Determine unit sales and revenue required to cover all costs.",
    "description": "Find your break-even point where revenue exactly matches fixed and variable production costs.",
    "formula": "Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)",
    "formulaDesc": "Calculates the safety margin and required sales units.",
    "fields": [
      {
        "id": "fixedCosts",
        "label": "Total Fixed Costs",
        "type": "number",
        "default": 15000,
        "min": 0,
        "max": 10000000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "variableCostPerUnit",
        "label": "Variable Cost Per Unit",
        "type": "number",
        "default": 18,
        "min": 0.01,
        "max": 100000,
        "step": 1,
        "prefix": "₹"
      },
      {
        "id": "unitPrice",
        "label": "Selling Price Per Unit",
        "type": "number",
        "default": 45,
        "min": 0.01,
        "max": 100000,
        "step": 1,
        "prefix": "₹"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "currency-calculator",
    "category": "financial",
    "title": "Currency Calculator",
    "badge": "Popular",
    "icon": "refresh-cw",
    "summary": "Convert amounts between major global currencies with standard reference exchange rates.",
    "description": "Convert between USD, EUR, GBP, INR, JPY, CAD, AUD, CHF, CNY, and SGD with customizable exchange rate benchmarks.",
    "formula": "Converted = Amount * (Target Rate / Base Rate)",
    "formulaDesc": "Standard foreign currency exchange parity calculation.",
    "fields": [
      {
        "id": "amount",
        "label": "Amount to Convert",
        "type": "number",
        "default": 1000,
        "min": 0.01,
        "max": 10000000,
        "step": 10
      },
      {
        "id": "fromCurrency",
        "label": "From Currency",
        "type": "select",
        "default": "INR",
        "options": [
          {
            "label": "USD - US Dollar ($)",
            "value": "USD"
          },
          {
            "label": "EUR - Euro (€)",
            "value": "EUR"
          },
          {
            "label": "GBP - British Pound (£)",
            "value": "GBP"
          },
          {
            "label": "INR - Indian Rupee (₹)",
            "value": "INR"
          },
          {
            "label": "JPY - Japanese Yen (¥)",
            "value": "JPY"
          },
          {
            "label": "CAD - Canadian Dollar (C$)",
            "value": "CAD"
          },
          {
            "label": "AUD - Australian Dollar (A$)",
            "value": "AUD"
          },
          {
            "label": "CHF - Swiss Franc (Fr)",
            "value": "CHF"
          },
          {
            "label": "CNY - Chinese Yuan (¥)",
            "value": "CNY"
          },
          {
            "label": "SGD - Singapore Dollar (S$)",
            "value": "SGD"
          }
        ]
      },
      {
        "id": "toCurrency",
        "label": "To Currency",
        "type": "select",
        "default": "USD",
        "options": [
          {
            "label": "USD - US Dollar ($)",
            "value": "USD"
          },
          {
            "label": "EUR - Euro (€)",
            "value": "EUR"
          },
          {
            "label": "GBP - British Pound (£)",
            "value": "GBP"
          },
          {
            "label": "INR - Indian Rupee (₹)",
            "value": "INR"
          },
          {
            "label": "JPY - Japanese Yen (¥)",
            "value": "JPY"
          },
          {
            "label": "CAD - Canadian Dollar (C$)",
            "value": "CAD"
          },
          {
            "label": "AUD - Australian Dollar (A$)",
            "value": "AUD"
          },
          {
            "label": "CHF - Swiss Franc (Fr)",
            "value": "CHF"
          },
          {
            "label": "CNY - Chinese Yuan (¥)",
            "value": "CNY"
          },
          {
            "label": "SGD - Singapore Dollar (S$)",
            "value": "SGD"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "basic-calculator",
    "category": "math",
    "title": "Basic Calculator",
    "badge": "Essential",
    "icon": "calculator",
    "customUi": "basic-keypad",
    "summary": "Standard interactive 4-function calculator with history tape.",
    "description": "A clean, responsive desktop and mobile calculator supporting addition, subtraction, multiplication, division, percentages, and memory operations.",
    "formula": "Expression Evaluation with Standard Operator Precedence",
    "formulaDesc": "Standard arithmetic calculations with memory and backspace."
  },
  {
    "id": "scientific-calculator",
    "category": "math",
    "title": "Scientific Calculator",
    "badge": "Popular",
    "icon": "cpu",
    "customUi": "scientific-keypad",
    "summary": "Full scientific calculator with trigonometry, logarithms, powers, and roots.",
    "description": "Comprehensive scientific calculator featuring trigonometric functions (sin, cos, tan), inverses, natural logs, base-10 logs, exponents, factorials, radian/degree mode, and mathematical constants.",
    "formula": "Trigonometric, Logarithmic & Exponential Functions",
    "formulaDesc": "Supports sin, cos, tan, ln, log, x^y, sqrt, e, pi, and radians/degrees."
  },
  {
    "id": "percentage-calculator",
    "category": "math",
    "title": "Percentage Calculator",
    "badge": "Essential",
    "icon": "percent",
    "summary": "Compute percentages, percentage increases/decreases, and proportions.",
    "description": "Solve the three most common percentage questions: What is X% of Y? X is what percent of Y? And what is the percentage change from X to Y?",
    "formula": "P% of Y = (P / 100) * Y | % Change = [(New - Old) / Old] * 100%",
    "formulaDesc": "Comprehensive percentage utility for homework, shopping, and metrics.",
    "fields": [
      {
        "id": "mode",
        "label": "Calculation Type",
        "type": "select",
        "default": "percentOf",
        "options": [
          {
            "label": "What is X% of Y?",
            "value": "percentOf"
          },
          {
            "label": "X is what % of Y?",
            "value": "whatPercent"
          },
          {
            "label": "Percentage Change from X to Y",
            "value": "percentChange"
          }
        ]
      },
      {
        "id": "valX",
        "label": "Value X",
        "type": "number",
        "default": 20,
        "min": -1000000,
        "max": 1000000,
        "step": 0.1
      },
      {
        "id": "valY",
        "label": "Value Y",
        "type": "number",
        "default": 150,
        "min": -1000000,
        "max": 1000000,
        "step": 0.1
      }
    ]
  },
  {
    "id": "fraction-calculator",
    "category": "math",
    "title": "Fraction Calculator",
    "badge": "Math",
    "icon": "divide-square",
    "summary": "Add, subtract, multiply, and divide fractions with step-by-step simplification.",
    "description": "Perform arithmetic on proper, improper, and mixed fractions. Generates simplified lowest terms and decimal equivalents.",
    "formula": "a/b ± c/d = (ad ± bc) / bd | (a/b) * (c/d) = ac / bd | (a/b) ÷ (c/d) = ad / bc",
    "formulaDesc": "Automatic reduction using Greatest Common Divisor (GCD).",
    "fields": [
      {
        "id": "num1",
        "label": "Numerator 1",
        "type": "number",
        "default": 3,
        "step": 1
      },
      {
        "id": "den1",
        "label": "Denominator 1",
        "type": "number",
        "default": 4,
        "step": 1
      },
      {
        "id": "operation",
        "label": "Operation",
        "type": "select",
        "default": "+",
        "options": [
          {
            "label": "Addition (+)",
            "value": "+"
          },
          {
            "label": "Subtraction (-)",
            "value": "-"
          },
          {
            "label": "Multiplication (×)",
            "value": "*"
          },
          {
            "label": "Division (÷)",
            "value": "/"
          }
        ]
      },
      {
        "id": "num2",
        "label": "Numerator 2",
        "type": "number",
        "default": 2,
        "step": 1
      },
      {
        "id": "den2",
        "label": "Denominator 2",
        "type": "number",
        "default": 5,
        "step": 1
      }
    ]
  },
  {
    "id": "ratio-calculator",
    "category": "math",
    "title": "Ratio Calculator",
    "badge": "Math",
    "icon": "sliders",
    "summary": "Simplify ratios and solve proportions (A : B = C : D).",
    "description": "Solve for the missing term in any ratio equality or reduce complex ratios to their simplest irreducible integer format.",
    "formula": "A / B = C / D => A * D = B * C",
    "formulaDesc": "Cross-multiplication principle for proportional balance.",
    "fields": [
      {
        "id": "valA",
        "label": "Term A",
        "type": "number",
        "default": 12,
        "step": 1
      },
      {
        "id": "valB",
        "label": "Term B",
        "type": "number",
        "default": 16,
        "step": 1
      },
      {
        "id": "valC",
        "label": "Term C (Optional for proportion)",
        "type": "number",
        "default": 30,
        "step": 1
      }
    ]
  },
  {
    "id": "proportion-calculator",
    "category": "math",
    "title": "Proportion Calculator",
    "badge": "Math",
    "icon": "scale",
    "summary": "Solve direct and inverse proportions with step-by-step solutions.",
    "description": "Compute direct proportions (y = kx) or inverse proportions (y = k/x) for physics, recipes, chemistry, and engineering scaling.",
    "formula": "Direct: y1/x1 = y2/x2 | Inverse: x1 * y1 = x2 * y2",
    "formulaDesc": "Step-by-step constant of proportionality calculation.",
    "fields": [
      {
        "id": "type",
        "label": "Proportion Type",
        "type": "select",
        "default": "direct",
        "options": [
          {
            "label": "Direct Proportion (x increases, y increases)",
            "value": "direct"
          },
          {
            "label": "Inverse Proportion (x increases, y decreases)",
            "value": "inverse"
          }
        ]
      },
      {
        "id": "x1",
        "label": "X₁",
        "type": "number",
        "default": 5,
        "step": 0.1
      },
      {
        "id": "y1",
        "label": "Y₁",
        "type": "number",
        "default": 25,
        "step": 0.1
      },
      {
        "id": "x2",
        "label": "X₂ (Find Y₂)",
        "type": "number",
        "default": 12,
        "step": 0.1
      }
    ]
  },
  {
    "id": "average-calculator",
    "category": "math",
    "title": "Average Calculator",
    "badge": "Math",
    "icon": "sigma",
    "summary": "Calculate arithmetic mean, sum, count, and range of any number set.",
    "description": "Enter a list of numbers separated by commas or spaces to instantly calculate the arithmetic mean, count of values, and sum.",
    "formula": "Mean = Sum(x) / n",
    "formulaDesc": "The sum of all numbers divided by the total count.",
    "fields": [
      {
        "id": "numbers",
        "label": "Numbers (separated by commas or spaces)",
        "type": "text",
        "default": "12, 25, 34, 45, 68, 82, 91"
      }
    ]
  },
  {
    "id": "mean-median-mode-calculator",
    "category": "math",
    "title": "Mean, Median & Mode Calculator",
    "badge": "Essential",
    "icon": "bar-chart",
    "summary": "Find the statistical mean, median, mode, range, and frequency table.",
    "description": "Complete central tendency analyzer. Computes the arithmetic mean, exact median (middle value), modes (most frequent numbers), and statistical range.",
    "formula": "Mean = Sum/N | Median = Middle element of sorted set | Mode = Most frequent value",
    "formulaDesc": "Fundamental central tendency analysis in statistics.",
    "fields": [
      {
        "id": "numbers",
        "label": "Data Set (separated by commas or spaces)",
        "type": "text",
        "default": "4, 8, 6, 5, 3, 8, 9, 8, 12, 14, 8"
      }
    ]
  },
  {
    "id": "probability-calculator",
    "category": "math",
    "title": "Probability Calculator",
    "badge": "Math",
    "icon": "dice-5",
    "summary": "Calculate single event probability, complementary events, unions, and odds.",
    "description": "Determine the probability of events occurring, odds in favor vs against, and joint probabilities for independent events.",
    "formula": "P(A) = Favorable Outcomes / Total Outcomes | Odds = P(A) / (1 - P(A))",
    "formulaDesc": "Classical probability rules and likelihood conversions.",
    "fields": [
      {
        "id": "favorable",
        "label": "Number of Favorable Outcomes",
        "type": "number",
        "default": 3,
        "min": 0,
        "step": 1
      },
      {
        "id": "total",
        "label": "Total Number of Possible Outcomes",
        "type": "number",
        "default": 10,
        "min": 1,
        "step": 1
      }
    ]
  },
  {
    "id": "standard-deviation-calculator",
    "category": "math",
    "title": "Standard Deviation Calculator",
    "badge": "Math",
    "icon": "activity",
    "summary": "Calculate sample and population standard deviation, variance, and mean.",
    "description": "Determine the statistical dispersion of a dataset. Provides both sample standard deviation (s) and population standard deviation (σ) along with variance.",
    "formula": "Sample s = sqrt( Sum(x - mean)^2 / (n - 1) ) | Pop σ = sqrt( Sum(x - mean)^2 / n )",
    "formulaDesc": "Essential dispersion measurement in statistics and research.",
    "fields": [
      {
        "id": "numbers",
        "label": "Dataset (comma or space separated)",
        "type": "text",
        "default": "10, 12, 23, 23, 16, 23, 21, 16"
      }
    ]
  },
  {
    "id": "exponent-calculator",
    "category": "math",
    "title": "Exponent Calculator",
    "badge": "Math",
    "icon": "superscript",
    "summary": "Calculate powers (base^exponent), negative exponents, and fractional roots.",
    "description": "Compute power expressions base^exponent for integers, decimals, negative exponents, and scientific notations.",
    "formula": "y = b^x | b^(-x) = 1 / b^x",
    "formulaDesc": "Power arithmetic with exponential growth notation.",
    "fields": [
      {
        "id": "base",
        "label": "Base (b)",
        "type": "number",
        "default": 2,
        "step": 0.1
      },
      {
        "id": "exponent",
        "label": "Exponent (x)",
        "type": "number",
        "default": 10,
        "step": 0.1
      }
    ]
  },
  {
    "id": "square-root-calculator",
    "category": "math",
    "title": "Square Root Calculator",
    "badge": "Math",
    "icon": "square-root",
    "summary": "Calculate exact square roots and arbitrary nth roots of any number.",
    "description": "Find the principal square root, cube root, or any nth root of a positive real number with high decimal precision.",
    "formula": "y = √x = x^(1/2) | nth root: y = x^(1/n)",
    "formulaDesc": "Radical calculation and perfect square detection.",
    "fields": [
      {
        "id": "number",
        "label": "Radicand (Number)",
        "type": "number",
        "default": 144,
        "min": 0,
        "step": 1
      },
      {
        "id": "rootDegree",
        "label": "Root Degree (n)",
        "type": "number",
        "default": 2,
        "min": 1,
        "step": 1,
        "suffix": "Root"
      }
    ]
  },
  {
    "id": "cube-root-calculator",
    "category": "math",
    "title": "Cube Root Calculator",
    "badge": "Math",
    "icon": "box",
    "summary": "Calculate the cube root (∛x) of positive and negative numbers.",
    "description": "Find the real cube root of any positive or negative real number. ∛x is the number y such that y³ = x.",
    "formula": "y = ∛x = x^(1/3)",
    "formulaDesc": "Works for both positive and negative values.",
    "fields": [
      {
        "id": "number",
        "label": "Number",
        "type": "number",
        "default": 125,
        "step": 1
      }
    ]
  },
  {
    "id": "logarithm-calculator",
    "category": "math",
    "title": "Logarithm Calculator",
    "badge": "Math",
    "icon": "hash",
    "summary": "Calculate natural logarithm (ln), common log (log₁₀), or custom base logarithms.",
    "description": "Calculate log_b(x) for any positive base b and argument x. Shows natural log ln(x) and common base-10 log.",
    "formula": "log_b(x) = y  <=>  b^y = x | Change of base: log_b(x) = ln(x) / ln(b)",
    "formulaDesc": "Calculates the power to which a base must be raised to produce x.",
    "fields": [
      {
        "id": "argument",
        "label": "Argument (x)",
        "type": "number",
        "default": 100,
        "min": 1e-7,
        "step": 0.1
      },
      {
        "id": "base",
        "label": "Base (b)",
        "type": "number",
        "default": 10,
        "min": 1e-7,
        "step": 0.1
      }
    ]
  },
  {
    "id": "gcd-lcm-calculator",
    "category": "math",
    "title": "GCD & LCM Calculator",
    "badge": "Math",
    "icon": "git-merge",
    "summary": "Find Greatest Common Divisor (GCD) and Least Common Multiple (LCM).",
    "description": "Calculate the Greatest Common Divisor (HCF) and Least Common Multiple (LCM) for two or more integers using the Euclidean algorithm.",
    "formula": "GCD(a, b) * LCM(a, b) = |a * b|",
    "formulaDesc": "Euclidean division algorithm and prime factorization breakdown.",
    "fields": [
      {
        "id": "numA",
        "label": "Integer A",
        "type": "number",
        "default": 48,
        "step": 1
      },
      {
        "id": "numB",
        "label": "Integer B",
        "type": "number",
        "default": 180,
        "step": 1
      }
    ]
  },
  {
    "id": "prime-number-calculator",
    "category": "math",
    "title": "Prime Number Calculator",
    "badge": "Math",
    "icon": "award",
    "summary": "Check if a number is prime, view prime factors, and discover next prime.",
    "description": "Test any integer for primality, decompose composite numbers into their prime factorization tree, and identify neighboring primes.",
    "formula": "n is prime if it has exactly two distinct positive divisors: 1 and n.",
    "formulaDesc": "Trial division and sieve factorization.",
    "fields": [
      {
        "id": "number",
        "label": "Integer to Test",
        "type": "number",
        "default": 97,
        "min": 1,
        "max": 1000000000,
        "step": 1
      }
    ]
  },
  {
    "id": "factorial-calculator",
    "category": "math",
    "title": "Factorial Calculator",
    "badge": "Math",
    "icon": "alert-circle",
    "summary": "Calculate n! factorials, permutations (nPr), and combinations (nCr).",
    "description": "Compute n! (n factorial), combinations (nCr: n choose r), and permutations (nPr: ordered arrangements).",
    "formula": "n! = n * (n-1) * ... * 1 | nCr = n! / [r!(n-r)!] | nPr = n! / (n-r)!",
    "formulaDesc": "Combinatorics and probability arrangements.",
    "fields": [
      {
        "id": "n",
        "label": "Value of n",
        "type": "number",
        "default": 8,
        "min": 0,
        "max": 170,
        "step": 1
      },
      {
        "id": "r",
        "label": "Value of r (for nCr / nPr)",
        "type": "number",
        "default": 3,
        "min": 0,
        "max": 170,
        "step": 1
      }
    ]
  },
  {
    "id": "quadratic-equation-calculator",
    "category": "math",
    "title": "Quadratic Equation Calculator",
    "badge": "Popular",
    "icon": "function-square",
    "summary": "Solve ax² + bx + c = 0 for real and complex roots, vertex, and discriminant.",
    "description": "Find roots for quadratic equations using the quadratic formula. Inspect discriminant Δ = b² - 4ac, parabola vertex, axis of symmetry, and factoring.",
    "formula": "x = [-b ± √(b² - 4ac)] / (2a)",
    "formulaDesc": "Complete solution for real or imaginary complex conjugate roots.",
    "fields": [
      {
        "id": "a",
        "label": "Coefficient a (x²)",
        "type": "number",
        "default": 1,
        "step": 0.1
      },
      {
        "id": "b",
        "label": "Coefficient b (x)",
        "type": "number",
        "default": -5,
        "step": 0.1
      },
      {
        "id": "c",
        "label": "Constant c",
        "type": "number",
        "default": 6,
        "step": 0.1
      }
    ]
  },
  {
    "id": "area-calculator",
    "category": "math",
    "title": "Area Calculator",
    "badge": "Essential",
    "icon": "square",
    "summary": "Calculate 2D surface area of circles, rectangles, triangles, trapezoids, and sectors.",
    "description": "Compute geometric areas for standard shapes: Circle (πr²), Rectangle (w*h), Triangle (½b*h), Trapezoid, Ellipse, and Parallelogram.",
    "formula": "Circle: πr² | Rect: w*l | Triangle: ½b*h | Trapezoid: ½(a+b)*h",
    "formulaDesc": "Select shape geometry and input dimensions.",
    "fields": [
      {
        "id": "shape",
        "label": "Select Shape",
        "type": "select",
        "default": "circle",
        "options": [
          {
            "label": "Circle",
            "value": "circle"
          },
          {
            "label": "Rectangle",
            "value": "rectangle"
          },
          {
            "label": "Triangle",
            "value": "triangle"
          },
          {
            "label": "Trapezoid",
            "value": "trapezoid"
          },
          {
            "label": "Ellipse",
            "value": "ellipse"
          }
        ]
      },
      {
        "id": "dim1",
        "label": "Dimension 1 (Radius / Length / Base)",
        "type": "number",
        "default": 10,
        "min": 0.1,
        "step": 0.5
      },
      {
        "id": "dim2",
        "label": "Dimension 2 (Width / Height / Base 2)",
        "type": "number",
        "default": 15,
        "min": 0,
        "step": 0.5
      }
    ]
  },
  {
    "id": "perimeter-calculator",
    "category": "math",
    "title": "Perimeter Calculator",
    "badge": "Math",
    "icon": "maximize-2",
    "summary": "Compute perimeter and circumference for circles, rectangles, and triangles.",
    "description": "Find boundary lengths for geometric figures including circle circumference (2πr), rectangle perimeter 2(l+w), and triangle perimeters.",
    "formula": "Circle: C = 2πr | Rectangle: P = 2(l + w) | Triangle: P = a + b + c",
    "formulaDesc": "Boundary path measurement for architecture and design.",
    "fields": [
      {
        "id": "shape",
        "label": "Select Shape",
        "type": "select",
        "default": "rectangle",
        "options": [
          {
            "label": "Rectangle",
            "value": "rectangle"
          },
          {
            "label": "Circle (Circumference)",
            "value": "circle"
          },
          {
            "label": "Triangle",
            "value": "triangle"
          }
        ]
      },
      {
        "id": "dim1",
        "label": "Dimension 1 (Length / Radius / Side A)",
        "type": "number",
        "default": 12,
        "min": 0.1,
        "step": 0.5
      },
      {
        "id": "dim2",
        "label": "Dimension 2 (Width / Side B)",
        "type": "number",
        "default": 8,
        "min": 0.1,
        "step": 0.5
      },
      {
        "id": "dim3",
        "label": "Dimension 3 (Side C for triangle)",
        "type": "number",
        "default": 10,
        "min": 0,
        "step": 0.5
      }
    ]
  },
  {
    "id": "volume-calculator",
    "category": "math",
    "title": "Volume Calculator",
    "badge": "Math",
    "icon": "box",
    "summary": "Calculate 3D volume and surface area for spheres, cylinders, cones, and prisms.",
    "description": "Calculate volume and total surface area for 3D geometric solids: Sphere, Cylinder, Cube, Rectangular Box, and Cone.",
    "formula": "Sphere: (4/3)πr³ | Cylinder: πr²h | Box: l*w*h | Cone: (1/3)πr²h",
    "formulaDesc": "Three-dimensional cubic space and capacity calculation.",
    "fields": [
      {
        "id": "solid",
        "label": "Select 3D Solid",
        "type": "select",
        "default": "cylinder",
        "options": [
          {
            "label": "Cylinder",
            "value": "cylinder"
          },
          {
            "label": "Sphere",
            "value": "sphere"
          },
          {
            "label": "Rectangular Box / Prism",
            "value": "box"
          },
          {
            "label": "Cone",
            "value": "cone"
          }
        ]
      },
      {
        "id": "dim1",
        "label": "Radius / Length",
        "type": "number",
        "default": 5,
        "min": 0.1,
        "step": 0.5
      },
      {
        "id": "dim2",
        "label": "Height / Width",
        "type": "number",
        "default": 12,
        "min": 0.1,
        "step": 0.5
      },
      {
        "id": "dim3",
        "label": "Depth (Box only)",
        "type": "number",
        "default": 8,
        "min": 0.1,
        "step": 0.5
      }
    ]
  },
  {
    "id": "pythagorean-theorem-calculator",
    "category": "math",
    "title": "Pythagorean Theorem Calculator",
    "badge": "Popular",
    "icon": "triangle",
    "summary": "Calculate hypotenuse (c) or leg (a, b) for any right-angled triangle.",
    "description": "Solve the Pythagorean equation a² + b² = c² to find the hypotenuse or missing side of a right triangle with step-by-step arithmetic.",
    "formula": "c = √(a² + b²) | a = √(c² - b²)",
    "formulaDesc": "Fundamental Euclidean right triangle relation.",
    "fields": [
      {
        "id": "calcMode",
        "label": "Find Missing Side",
        "type": "select",
        "default": "findC",
        "options": [
          {
            "label": "Find Hypotenuse c (given legs a & b)",
            "value": "findC"
          },
          {
            "label": "Find Leg a (given leg b & hypotenuse c)",
            "value": "findA"
          }
        ]
      },
      {
        "id": "side1",
        "label": "Side 1 (Leg a or b)",
        "type": "number",
        "default": 6,
        "min": 0.1,
        "step": 0.5
      },
      {
        "id": "side2",
        "label": "Side 2 (Leg b or Hypotenuse c)",
        "type": "number",
        "default": 8,
        "min": 0.1,
        "step": 0.5
      }
    ]
  },
  {
    "id": "bmi-calculator",
    "category": "health",
    "title": "BMI Calculator",
    "badge": "Popular",
    "icon": "heart",
    "summary": "Body Mass Index calculator with WHO weight categories and visual gauge.",
    "description": "Calculate your Body Mass Index (BMI) to see whether your weight is in a healthy range for your height according to World Health Organization (WHO) standards.",
    "formula": "BMI = weight (kg) / [height (m)]²",
    "formulaDesc": "WHO Classification: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30+).",
    "fields": [
      {
        "id": "unitSystem",
        "label": "Measurement System",
        "type": "select",
        "default": "metric",
        "options": [
          {
            "label": "Metric (kg, cm)",
            "value": "metric"
          },
          {
            "label": "Imperial (lbs, feet & inches)",
            "value": "imperial"
          }
        ]
      },
      {
        "id": "weightKg",
        "label": "Weight (kg)",
        "type": "number",
        "default": 70,
        "min": 30,
        "max": 300,
        "step": 0.5,
        "suffix": "kg"
      },
      {
        "id": "heightCm",
        "label": "Height (cm)",
        "type": "number",
        "default": 175,
        "min": 100,
        "max": 250,
        "step": 1,
        "suffix": "cm"
      },
      {
        "id": "weightLbs",
        "label": "Weight (lbs) [Imperial]",
        "type": "number",
        "default": 154,
        "min": 40,
        "max": 600,
        "step": 1,
        "suffix": "lbs"
      },
      {
        "id": "heightFeet",
        "label": "Height (Feet) [Imperial]",
        "type": "number",
        "default": 5,
        "min": 2,
        "max": 8,
        "step": 1,
        "suffix": "ft"
      },
      {
        "id": "heightInches",
        "label": "Height (Inches) [Imperial]",
        "type": "number",
        "default": 9,
        "min": 0,
        "max": 11,
        "step": 1,
        "suffix": "in"
      }
    ],
    "chartType": "gauge"
  },
  {
    "id": "bmr-calculator",
    "category": "health",
    "title": "BMR Calculator",
    "badge": "Popular",
    "icon": "zap",
    "summary": "Calculate Basal Metabolic Rate using the Mifflin-St Jeor formula.",
    "description": "Discover how many calories your body burns at complete rest just to keep your vital organs functioning, heart beating, and lungs breathing.",
    "formula": "Mifflin-St Jeor: 10*weight(kg) + 6.25*height(cm) - 5*age + s (s = +5 men, -161 women)",
    "formulaDesc": "Gold standard formula validated across clinical nutrition trials.",
    "fields": [
      {
        "id": "gender",
        "label": "Biological Sex",
        "type": "select",
        "default": "male",
        "options": [
          {
            "label": "Male",
            "value": "male"
          },
          {
            "label": "Female",
            "value": "female"
          }
        ]
      },
      {
        "id": "age",
        "label": "Age (Years)",
        "type": "number",
        "default": 28,
        "min": 15,
        "max": 100,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "default": 72,
        "min": 30,
        "max": 250,
        "step": 0.5,
        "suffix": "kg"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "default": 178,
        "min": 100,
        "max": 230,
        "step": 1,
        "suffix": "cm"
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "tdee-calculator",
    "category": "health",
    "title": "TDEE Calculator",
    "badge": "Essential",
    "icon": "flame",
    "summary": "Total Daily Energy Expenditure based on BMR and physical activity level.",
    "description": "Find your true daily calorie burn including exercise and daily movement. Knowing your TDEE is the foundation for weight loss, maintenance, or muscle gain.",
    "formula": "TDEE = BMR * Physical Activity Multiplier (1.2 to 1.9)",
    "formulaDesc": "Combines Basal Metabolic Rate with Non-Exercise Activity & Exercise.",
    "fields": [
      {
        "id": "gender",
        "label": "Biological Sex",
        "type": "select",
        "default": "male",
        "options": [
          {
            "label": "Male",
            "value": "male"
          },
          {
            "label": "Female",
            "value": "female"
          }
        ]
      },
      {
        "id": "age",
        "label": "Age",
        "type": "number",
        "default": 28,
        "min": 15,
        "max": 100,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "default": 75,
        "min": 30,
        "max": 250,
        "step": 0.5,
        "suffix": "kg"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "default": 178,
        "min": 100,
        "max": 230,
        "step": 1,
        "suffix": "cm"
      },
      {
        "id": "activityLevel",
        "label": "Activity Level",
        "type": "select",
        "default": "moderate",
        "options": [
          {
            "label": "Sedentary (Office job, little/no exercise)",
            "value": "sedentary"
          },
          {
            "label": "Lightly Active (Exercise 1-3 days/week)",
            "value": "light"
          },
          {
            "label": "Moderately Active (Exercise 3-5 days/week)",
            "value": "moderate"
          },
          {
            "label": "Very Active (Hard exercise 6-7 days/week)",
            "value": "very"
          },
          {
            "label": "Extremely Active (Athletic training/physical labor)",
            "value": "extra"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "body-fat-calculator",
    "category": "health",
    "title": "Body Fat Calculator",
    "badge": "Health",
    "icon": "user",
    "summary": "Estimate body fat percentage using the U.S. Navy circumference method.",
    "description": "Calculate your body fat percentage and lean body mass using standard tape measurements of your neck, waist, height, and hips (for females).",
    "formula": "US Navy Body Fat equations based on log10 circumference differences.",
    "formulaDesc": "Standard measurement benchmark used by the Armed Forces.",
    "fields": [
      {
        "id": "gender",
        "label": "Gender",
        "type": "select",
        "default": "male",
        "options": [
          {
            "label": "Male",
            "value": "male"
          },
          {
            "label": "Female",
            "value": "female"
          }
        ]
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "default": 178,
        "min": 100,
        "max": 230,
        "step": 1,
        "suffix": "cm"
      },
      {
        "id": "neck",
        "label": "Neck Circumference (cm)",
        "type": "number",
        "default": 38,
        "min": 20,
        "max": 70,
        "step": 0.5,
        "suffix": "cm"
      },
      {
        "id": "waist",
        "label": "Waist Circumference (at navel) (cm)",
        "type": "number",
        "default": 84,
        "min": 40,
        "max": 160,
        "step": 0.5,
        "suffix": "cm"
      },
      {
        "id": "hip",
        "label": "Hip Circumference (Females only) (cm)",
        "type": "number",
        "default": 95,
        "min": 40,
        "max": 180,
        "step": 0.5,
        "suffix": "cm"
      }
    ],
    "chartType": "gauge"
  },
  {
    "id": "calorie-calculator",
    "category": "health",
    "title": "Calorie Calculator",
    "badge": "Popular",
    "icon": "pie-chart",
    "summary": "Calculate daily calorie targets for weight loss, maintenance, or muscle gain.",
    "description": "Get tailored daily calorie guidelines for maintaining your current weight, mild fat loss (-0.25kg/week), moderate loss (-0.5kg/week), or lean mass gain.",
    "formula": "1 lb of body fat ≈ 3,500 kcal | 500 kcal daily deficit = ~0.45 kg/week loss",
    "formulaDesc": "Evidence-based energy balance equation for body recomposition.",
    "fields": [
      {
        "id": "gender",
        "label": "Gender",
        "type": "select",
        "default": "female",
        "options": [
          {
            "label": "Female",
            "value": "female"
          },
          {
            "label": "Male",
            "value": "male"
          }
        ]
      },
      {
        "id": "age",
        "label": "Age",
        "type": "number",
        "default": 26,
        "min": 15,
        "max": 95,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "weight",
        "label": "Weight (kg)",
        "type": "number",
        "default": 64,
        "min": 30,
        "max": 250,
        "step": 0.5,
        "suffix": "kg"
      },
      {
        "id": "height",
        "label": "Height (cm)",
        "type": "number",
        "default": 165,
        "min": 100,
        "max": 230,
        "step": 1,
        "suffix": "cm"
      },
      {
        "id": "activity",
        "label": "Activity Level",
        "type": "select",
        "default": "moderate",
        "options": [
          {
            "label": "Sedentary",
            "value": "sedentary"
          },
          {
            "label": "Lightly Active",
            "value": "light"
          },
          {
            "label": "Moderately Active",
            "value": "moderate"
          },
          {
            "label": "Very Active",
            "value": "very"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "ideal-weight-calculator",
    "category": "health",
    "title": "Ideal Weight Calculator",
    "badge": "Health",
    "icon": "scale",
    "summary": "Calculate optimal weight ranges across Devine, Robinson, and Miller formulas.",
    "description": "Compare multiple clinical formulas (Devine, Robinson, Miller, and WHO Healthy BMI range) to determine your optimal target weight range.",
    "formula": "Devine: Men 50.0kg + 2.3kg per inch over 5ft | Women 45.5kg + 2.3kg per inch over 5ft",
    "formulaDesc": "Standard medical dosing and body composition baseline formulas.",
    "fields": [
      {
        "id": "gender",
        "label": "Biological Sex",
        "type": "select",
        "default": "male",
        "options": [
          {
            "label": "Male",
            "value": "male"
          },
          {
            "label": "Female",
            "value": "female"
          }
        ]
      },
      {
        "id": "heightCm",
        "label": "Height (cm)",
        "type": "number",
        "default": 175,
        "min": 120,
        "max": 230,
        "step": 1,
        "suffix": "cm"
      }
    ]
  },
  {
    "id": "macro-calculator",
    "category": "health",
    "title": "Macro Calculator",
    "badge": "Popular",
    "icon": "layers",
    "summary": "Calculate optimal macronutrient splits (Carbs, Protein, Fats) in grams and calories.",
    "description": "Plan your macronutrient distribution based on daily calorie targets and fitness style: Balanced, Low Carb, High Protein, or Ketogenic.",
    "formula": "Carbs: 4 kcal/g | Protein: 4 kcal/g | Fat: 9 kcal/g",
    "formulaDesc": "Calculates exact grams and percentages for each macronutrient.",
    "fields": [
      {
        "id": "calories",
        "label": "Daily Calorie Target",
        "type": "number",
        "default": 2000,
        "min": 800,
        "max": 8000,
        "step": 50,
        "suffix": "kcal"
      },
      {
        "id": "dietType",
        "label": "Dietary Goal / Strategy",
        "type": "select",
        "default": "balanced",
        "options": [
          {
            "label": "Balanced (40% C, 30% P, 30% F)",
            "value": "balanced"
          },
          {
            "label": "High Protein / Muscle Building (35% C, 40% P, 25% F)",
            "value": "highProtein"
          },
          {
            "label": "Low Carbohydrate (20% C, 40% P, 40% F)",
            "value": "lowCarb"
          },
          {
            "label": "Keto / High Fat (5% C, 25% P, 70% F)",
            "value": "keto"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "protein-calculator",
    "category": "health",
    "title": "Protein Calculator",
    "badge": "Health",
    "icon": "shield",
    "summary": "Calculate daily protein intake requirements based on body weight and activity.",
    "description": "Determine your optimal daily protein target in grams and scoops based on weight, strength training, and muscle preservation goals.",
    "formula": "Intake = Body Weight (kg) * Factor (0.8g sedentary up to 2.2g strength training)",
    "formulaDesc": "Guidelines aligned with sports nutrition and RDA benchmarks.",
    "fields": [
      {
        "id": "weightKg",
        "label": "Body Weight (kg)",
        "type": "number",
        "default": 75,
        "min": 30,
        "max": 250,
        "step": 0.5,
        "suffix": "kg"
      },
      {
        "id": "goal",
        "label": "Activity & Goal",
        "type": "select",
        "default": "muscle",
        "options": [
          {
            "label": "Sedentary / Baseline Health (0.8 - 1.0 g/kg)",
            "value": "sedentary"
          },
          {
            "label": "Endurance Runner / Cyclist (1.2 - 1.4 g/kg)",
            "value": "endurance"
          },
          {
            "label": "Strength Training / Muscle Gain (1.6 - 2.2 g/kg)",
            "value": "muscle"
          },
          {
            "label": "Fat Loss & Muscle Preservation (2.0 - 2.4 g/kg)",
            "value": "fatloss"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "water-intake-calculator",
    "category": "health",
    "title": "Water Intake Calculator",
    "badge": "Health",
    "icon": "droplet",
    "summary": "Calculate daily hydration target in liters and cups based on weight and exercise.",
    "description": "Calculate your daily hydration requirements accounting for body weight, daily workout minutes, and hot or humid climate adjustments.",
    "formula": "Base = Weight (kg) * 0.033 L + Exercise (min) * 0.012 L",
    "formulaDesc": "Ensures optimal cognitive performance, energy, and cellular function.",
    "fields": [
      {
        "id": "weightKg",
        "label": "Weight (kg)",
        "type": "number",
        "default": 70,
        "min": 30,
        "max": 250,
        "step": 1,
        "suffix": "kg"
      },
      {
        "id": "exerciseMinutes",
        "label": "Daily Exercise Time (Minutes)",
        "type": "number",
        "default": 45,
        "min": 0,
        "max": 240,
        "step": 15,
        "suffix": "Min"
      },
      {
        "id": "climate",
        "label": "Climate / Weather",
        "type": "select",
        "default": "moderate",
        "options": [
          {
            "label": "Moderate / Normal",
            "value": "moderate"
          },
          {
            "label": "Hot or Humid (+0.5 L)",
            "value": "hot"
          }
        ]
      }
    ],
    "chartType": "donut"
  },
  {
    "id": "pace-calculator",
    "category": "health",
    "title": "Pace Calculator",
    "badge": "Health",
    "icon": "timer",
    "summary": "Calculate running pace, finish time, or distance for workouts.",
    "description": "Quickly find your speed or pace per kilometer or mile given the total workout duration and distance covered.",
    "formula": "Pace = Time / Distance | Speed = Distance / Time",
    "formulaDesc": "Essential tool for runners, cyclists, and walkers.",
    "fields": [
      {
        "id": "distanceKm",
        "label": "Distance (Kilometers)",
        "type": "number",
        "default": 10,
        "min": 0.1,
        "max": 200,
        "step": 0.5,
        "suffix": "km"
      },
      {
        "id": "hours",
        "label": "Time (Hours)",
        "type": "number",
        "default": 0,
        "min": 0,
        "max": 24,
        "step": 1,
        "suffix": "hr"
      },
      {
        "id": "minutes",
        "label": "Time (Minutes)",
        "type": "number",
        "default": 52,
        "min": 0,
        "max": 59,
        "step": 1,
        "suffix": "min"
      },
      {
        "id": "seconds",
        "label": "Time (Seconds)",
        "type": "number",
        "default": 30,
        "min": 0,
        "max": 59,
        "step": 1,
        "suffix": "sec"
      }
    ]
  },
  {
    "id": "running-pace-calculator",
    "category": "health",
    "title": "Running Pace Calculator",
    "badge": "Popular",
    "icon": "play",
    "summary": "Predict race finish times for 5K, 10K, Half Marathon, and Full Marathon.",
    "description": "Calculate target split times and finish predictions across standard race distances: 5K, 10K, Half Marathon (21.1 km), and Full Marathon (42.2 km).",
    "formula": "Finish Time = Target Pace * Race Distance",
    "formulaDesc": "Generates comprehensive split pace table.",
    "fields": [
      {
        "id": "paceMinutes",
        "label": "Pace Minutes per km",
        "type": "number",
        "default": 5,
        "min": 2,
        "max": 15,
        "step": 1,
        "suffix": "min"
      },
      {
        "id": "paceSeconds",
        "label": "Pace Seconds per km",
        "type": "number",
        "default": 15,
        "min": 0,
        "max": 59,
        "step": 5,
        "suffix": "sec"
      }
    ]
  },
  {
    "id": "pregnancy-calculator",
    "category": "health",
    "title": "Pregnancy Calculator",
    "badge": "Health",
    "icon": "smile",
    "summary": "Calculate gestational age, current trimester, and baby development countdown.",
    "description": "Track gestational progress by entering the first day of your Last Menstrual Period (LMP). Shows current week, trimester, and countdown.",
    "formula": "Gestational Age = (Today - LMP) in days and weeks | 40 Weeks Full Term",
    "formulaDesc": "Standard obstetrical gestational calculation.",
    "fields": [
      {
        "id": "lmpDate",
        "label": "First Day of Last Menstrual Period (LMP)",
        "type": "date",
        "default": "2026-03-01"
      }
    ]
  },
  {
    "id": "due-date-calculator",
    "category": "health",
    "title": "Due Date Calculator",
    "badge": "Health",
    "icon": "calendar",
    "summary": "Estimate delivery date using Naegele’s rule from LMP or conception date.",
    "description": "Estimate your baby’s due date (EDD) based on Naegele’s rule (LMP + 280 days) or known conception date.",
    "formula": "Estimated Due Date = LMP + 280 Days (40 Weeks)",
    "formulaDesc": "Includes estimated dates for Trimester 1, 2, and 3 milestones.",
    "fields": [
      {
        "id": "method",
        "label": "Calculation Method",
        "type": "select",
        "default": "lmp",
        "options": [
          {
            "label": "Last Menstrual Period (LMP)",
            "value": "lmp"
          },
          {
            "label": "Conception Date",
            "value": "conception"
          }
        ]
      },
      {
        "id": "targetDate",
        "label": "Reference Date",
        "type": "date",
        "default": "2026-04-15"
      },
      {
        "id": "cycleLength",
        "label": "Average Cycle Length (Days)",
        "type": "number",
        "default": 28,
        "min": 21,
        "max": 35,
        "step": 1,
        "suffix": "Days"
      }
    ]
  },
  {
    "id": "health-age-calculator",
    "category": "health",
    "title": "Biological Age Calculator",
    "badge": "Health",
    "icon": "user-check",
    "summary": "Estimate biological fitness age compared to chronological age.",
    "description": "Compare chronological age with lifestyle factors including resting heart rate, exercise frequency, sleep, and nutrition to estimate biological age.",
    "formula": "Biological Age = Chrono Age + Lifestyle Adjustments (-8 to +10 years)",
    "formulaDesc": "Lifestyle and cardiovascular risk estimation.",
    "fields": [
      {
        "id": "chronoAge",
        "label": "Chronological Age",
        "type": "number",
        "default": 35,
        "min": 18,
        "max": 90,
        "step": 1,
        "suffix": "Yrs"
      },
      {
        "id": "exerciseDays",
        "label": "Days of Exercise / Week",
        "type": "number",
        "default": 4,
        "min": 0,
        "max": 7,
        "step": 1,
        "suffix": "Days"
      },
      {
        "id": "sleepHours",
        "label": "Average Sleep Hours / Night",
        "type": "number",
        "default": 7.5,
        "min": 4,
        "max": 12,
        "step": 0.5,
        "suffix": "Hrs"
      },
      {
        "id": "smokeStatus",
        "label": "Smoking Status",
        "type": "select",
        "default": "never",
        "options": [
          {
            "label": "Non-Smoker",
            "value": "never"
          },
          {
            "label": "Occasional Smoker",
            "value": "occasional"
          },
          {
            "label": "Daily Smoker",
            "value": "daily"
          }
        ]
      }
    ]
  }
,
{
  "id": "advanced-sip-calculator",
  "category": "financial",
  "title": "Advanced SIP Calculator",
  "badge": "Inflation & Tax",
  "icon": "repeat",
  "summary": "Calculate SIP maturity with inflation adjustment and capital gains taxation.",
  "description": "Advanced Systematic Investment Plan (SIP) model that projects both nominal and real purchasing power returns after factoring in annual inflation and applicable LTCG capital gains tax.",
  "formula": "Real FV = Nominal FV / (1 + inflation)^n, Net FV = Invested + (Gains * (1 - Tax))",
  "formulaDesc": "Where Nominal FV is standard compound SIP value, inflation discounts future purchasing power, and LTCG tax is applied to gains.",
  "inputsSummary": "Monthly Investment, Annual Return %, Time Horizon, Inflation Rate %, Tax %",
  "outputsSummary": "Real Purchasing Power Corpus, Nominal FV, Post-Tax Returns, Total Gains",
  "fields": [
    {
      "id": "monthlyInvestment",
      "label": "Monthly SIP Amount",
      "type": "number",
      "default": 10000,
      "min": 500,
      "max": 2000000,
      "step": 500,
      "prefix": "₹"
    },
    {
      "id": "expectedReturn",
      "label": "Expected Annual Return",
      "type": "number",
      "default": 12,
      "min": 1,
      "max": 35,
      "step": 0.5,
      "suffix": "%"
    },
    {
      "id": "timePeriod",
      "label": "Investment Horizon (Years)",
      "type": "number",
      "default": 15,
      "min": 1,
      "max": 40,
      "step": 1,
      "suffix": "Years"
    },
    {
      "id": "inflationRate",
      "label": "Expected Annual Inflation",
      "type": "number",
      "default": 6,
      "min": 0,
      "max": 15,
      "step": 0.5,
      "suffix": "%"
    },
    {
      "id": "taxRate",
      "label": "LTCG Capital Gains Tax",
      "type": "number",
      "default": 12.5,
      "min": 0,
      "max": 30,
      "step": 0.5,
      "suffix": "%"
    }
  ],
  "chartType": "donut"
},
{
  "id": "sip-step-up-calculator",
  "category": "financial",
  "title": "SIP with Step-Up Calculator",
  "badge": "Step-Up",
  "icon": "trending-up",
  "summary": "Boost your final corpus by stepping up monthly SIP contributions annually.",
  "description": "Calculate how increasing your monthly SIP amount each year (e.g. by 10% inline with salary increments) exponentially compounds your wealth compared to a fixed monthly SIP.",
  "formula": "P_k = P_0 * (1 + stepUpRate)^(k-1), compounded monthly",
  "formulaDesc": "Monthly investment increases each year by the step-up percentage, compounding at expected return rate.",
  "inputsSummary": "Initial Monthly SIP, Annual Step-Up %, Expected Return %, Time Horizon",
  "outputsSummary": "Step-Up Maturity Value, Total Invested, Wealth Bonus vs Regular SIP",
  "fields": [
    {
      "id": "monthlyInvestment",
      "label": "Initial Monthly Investment",
      "type": "number",
      "default": 10000,
      "min": 500,
      "max": 1000000,
      "step": 500,
      "prefix": "₹"
    },
    {
      "id": "annualStepUp",
      "label": "Annual Step-Up Percentage",
      "type": "number",
      "default": 10,
      "min": 1,
      "max": 50,
      "step": 1,
      "suffix": "%"
    },
    {
      "id": "expectedReturn",
      "label": "Expected Annual Return",
      "type": "number",
      "default": 12,
      "min": 1,
      "max": 35,
      "step": 0.5,
      "suffix": "%"
    },
    {
      "id": "timePeriod",
      "label": "Investment Duration (Years)",
      "type": "number",
      "default": 15,
      "min": 1,
      "max": 40,
      "step": 1,
      "suffix": "Years"
    }
  ],
  "chartType": "donut"
},
{
  "id": "sip-goal-planner",
  "category": "financial",
  "title": "SIP Goal Planner",
  "badge": "Goal Target",
  "icon": "award",
  "summary": "Determine exact monthly SIP savings required to achieve your financial target.",
  "description": "Reverse calculate the required monthly systematic investment needed to hit your financial milestone (retirement, child education, house down payment) given your target corpus and time horizon.",
  "formula": "Monthly SIP = (Target Corpus - Lumpsum*(1+r)^n) * (r / ((1+r)^n - 1)) / (1+r)",
  "formulaDesc": "Where r is monthly return, n is total months, and Target Corpus is the desired financial objective.",
  "inputsSummary": "Target Goal Corpus, Time Horizon, Expected Annual Return %, Existing Savings",
  "outputsSummary": "Required Monthly SIP, Total Self-Contribution, Compounded Wealth Gain",
  "fields": [
    {
      "id": "targetCorpus",
      "label": "Target Financial Goal Amount",
      "type": "number",
      "default": 10000000,
      "min": 100000,
      "max": 1000000000,
      "step": 50000,
      "prefix": "₹"
    },
    {
      "id": "timePeriod",
      "label": "Target Time Horizon (Years)",
      "type": "number",
      "default": 15,
      "min": 1,
      "max": 40,
      "step": 1,
      "suffix": "Years"
    },
    {
      "id": "expectedReturn",
      "label": "Expected Annual Return Rate",
      "type": "number",
      "default": 12,
      "min": 1,
      "max": 30,
      "step": 0.5,
      "suffix": "%"
    },
    {
      "id": "existingSavings",
      "label": "Current Existing Savings / Lumpsum",
      "type": "number",
      "default": 200000,
      "min": 0,
      "max": 100000000,
      "step": 10000,
      "prefix": "₹"
    }
  ],
  "chartType": "donut"
},
{
  "id": "brokerage-calculator",
  "category": "financial",
  "title": "Brokerage & Charges Calculator",
  "badge": "Trading",
  "icon": "trending-up",
  "summary": "Calculate net trading profit/loss after brokerage, STT, exchange fees & GST.",
  "description": "Comprehensive Indian equity and derivative trading charges calculator. Computes exact broker brokerage (e.g. Zerodha/Groww ₹20 discount rates), STT/CTT, NSE turnover fees, SEBI charges, stamp duty, and GST.",
  "formula": "Net P&L = Gross P&L - (Brokerage + STT + TurnOver + SEBI + StampDuty + GST)",
  "formulaDesc": "Full statutory deduction schedule as mandated by SEBI, exchanges, and Govt of India.",
  "inputsSummary": "Trade Segment, Buy Price, Sell Price, Quantity",
  "outputsSummary": "Net P&L, Total Statutory Charges, Breakeven Price Movement",
  "fields": [
    {
      "id": "segment",
      "label": "Trading Segment",
      "type": "select",
      "default": "equity_delivery",
      "options": [
        {
          "value": "equity_delivery",
          "label": "Equity Delivery (Zero Brokerage / Flat ₹20)"
        },
        {
          "value": "equity_intraday",
          "label": "Equity Intraday (₹20 or 0.03%)"
        },
        {
          "value": "futures",
          "label": "Equity Futures (₹20 or 0.03%)"
        },
        {
          "value": "options",
          "label": "Equity Options (Flat ₹20 per executed order)"
        }
      ]
    },
    {
      "id": "buyPrice",
      "label": "Buy Price per Share",
      "type": "number",
      "default": 1500,
      "min": 0.05,
      "max": 500000,
      "step": 0.5,
      "prefix": "₹"
    },
    {
      "id": "sellPrice",
      "label": "Sell Price per Share",
      "type": "number",
      "default": 1540,
      "min": 0.05,
      "max": 500000,
      "step": 0.5,
      "prefix": "₹"
    },
    {
      "id": "quantity",
      "label": "Quantity (Shares / Lots)",
      "type": "number",
      "default": 200,
      "min": 1,
      "max": 1000000,
      "step": 1
    }
  ],
  "chartType": "donut"
},
{
  "id": "margin-calculator",
  "category": "financial",
  "title": "Trading Margin Calculator",
  "badge": "Leverage",
  "icon": "layers",
  "summary": "Calculate required margin capital, leverage multiplier, and broker exposure.",
  "description": "Determine how much cash capital is required to enter an intraday or delivery position, compute effective leverage, broker funding loan amount, and liquidation price buffer.",
  "formula": "Required Margin = (Stock Price * Quantity) / Leverage Multiplier",
  "formulaDesc": "Computes trading position size, margin deposit, and borrowing exposure.",
  "inputsSummary": "Share Price, Trade Quantity, Margin Leverage (e.g. 5x)",
  "outputsSummary": "Required Margin Capital, Total Position Value, Broker Loan Exposure",
  "fields": [
    {
      "id": "stockPrice",
      "label": "Stock / Contract Price",
      "type": "number",
      "default": 1200,
      "min": 1,
      "max": 500000,
      "step": 1,
      "prefix": "₹"
    },
    {
      "id": "quantity",
      "label": "Trade Quantity",
      "type": "number",
      "default": 250,
      "min": 1,
      "max": 1000000,
      "step": 5
    },
    {
      "id": "leverage",
      "label": "Leverage Multiplier (e.g. 5x for Intraday MIS)",
      "type": "number",
      "default": 5,
      "min": 1,
      "max": 50,
      "step": 0.5,
      "suffix": "x"
    }
  ],
  "chartType": "donut"
},
{
  "id": "options-profit-calculator",
  "category": "financial",
  "title": "Options Profit & Payoff Calculator",
  "badge": "Derivatives",
  "icon": "activity",
  "summary": "Evaluate Call and Put options payoffs, breakeven points, and max profit/risk.",
  "description": "Interactive options contract analyzer. Model Call (CE) and Put (PE) trades for Long and Short positions, calculate breakeven spot prices, maximum upside, and risk exposure at expiry.",
  "formula": "Call Long Payoff = Max(0, Spot - Strike) - Premium; Put Long Payoff = Max(0, Strike - Spot) - Premium",
  "formulaDesc": "Standard options intrinsic value payoff adjusted for net premium paid or collected.",
  "inputsSummary": "Option Type (Call/Put), Position (Buy/Sell), Strike, Premium, Lot Size, Target Spot",
  "outputsSummary": "Net P&L at Target, Breakeven Spot, Max Profit Potential, Maximum Risk",
  "fields": [
    {
      "id": "optionType",
      "label": "Option Type",
      "type": "select",
      "default": "call",
      "options": [
        {
          "value": "call",
          "label": "Call Option (CE - Bullish)"
        },
        {
          "value": "put",
          "label": "Put Option (PE - Bearish)"
        }
      ]
    },
    {
      "id": "position",
      "label": "Position Type",
      "type": "select",
      "default": "buy",
      "options": [
        {
          "value": "buy",
          "label": "Buy / Long Option (Limited Risk)"
        },
        {
          "value": "sell",
          "label": "Sell / Short Option (Limited Profit)"
        }
      ]
    },
    {
      "id": "strikePrice",
      "label": "Strike Price",
      "type": "number",
      "default": 25000,
      "min": 50,
      "max": 200000,
      "step": 50,
      "prefix": "₹"
    },
    {
      "id": "premium",
      "label": "Option Premium Paid/Received",
      "type": "number",
      "default": 160,
      "min": 0.05,
      "max": 50000,
      "step": 1,
      "prefix": "₹"
    },
    {
      "id": "lotSize",
      "label": "Total Quantity (Lots * Lot Size)",
      "type": "number",
      "default": 50,
      "min": 1,
      "max": 100000,
      "step": 25
    },
    {
      "id": "targetPrice",
      "label": "Target Spot Price at Expiry",
      "type": "number",
      "default": 25400,
      "min": 50,
      "max": 200000,
      "step": 25,
      "prefix": "₹"
    }
  ],
  "chartType": "donut"
},
{
  "id": "futures-calculator",
  "category": "financial",
  "title": "Futures Trading Calculator",
  "badge": "F&O Futures",
  "icon": "trending-up",
  "summary": "Calculate futures contract profit/loss, margin return %, and point changes.",
  "description": "Analyze financial futures contracts (Index/Stock Futures). Calculate gross payoff from entry to exit price, return on initial margin required, and total underlying exposure value.",
  "formula": "Gross P&L = (Exit Price - Entry Price) * Quantity; Return on Margin = (P&L / Margin) * 100",
  "formulaDesc": "Linear payoff multiplied by total contract lot size over invested margin.",
  "inputsSummary": "Entry Price, Exit Price, Lot Size, Number of Lots, Margin Required per Lot",
  "outputsSummary": "Gross Profit/Loss, Return on Capital (ROC %), Point Spread, Contract Value",
  "fields": [
    {
      "id": "entryPrice",
      "label": "Futures Entry Price",
      "type": "number",
      "default": 24800,
      "min": 1,
      "max": 500000,
      "step": 5,
      "prefix": "₹"
    },
    {
      "id": "exitPrice",
      "label": "Futures Exit Price",
      "type": "number",
      "default": 25150,
      "min": 1,
      "max": 500000,
      "step": 5,
      "prefix": "₹"
    },
    {
      "id": "lotSize",
      "label": "Lot Size (e.g. 25 for Nifty)",
      "type": "number",
      "default": 25,
      "min": 1,
      "max": 10000,
      "step": 5
    },
    {
      "id": "numberOfLots",
      "label": "Number of Lots Traded",
      "type": "number",
      "default": 2,
      "min": 1,
      "max": 500,
      "step": 1
    },
    {
      "id": "marginPerLot",
      "label": "Initial Margin Required per Lot",
      "type": "number",
      "default": 125000,
      "min": 1000,
      "max": 5000000,
      "step": 1000,
      "prefix": "₹"
    }
  ],
  "chartType": "donut"
},
{
  "id": "mutual-fund-returns-calculator",
  "category": "financial",
  "title": "Mutual Fund Returns Calculator",
  "badge": "CAGR & NAV",
  "icon": "wallet",
  "summary": "Calculate rolling returns, CAGR, and absolute gain on mutual fund investments.",
  "description": "Analyze historical and expected performance of mutual fund schemes. Computes Compound Annual Growth Rate (CAGR), absolute return percentage, and wealth multiplication factors.",
  "formula": "CAGR = (Final Value / Initial Value)^(1 / Years) - 1",
  "formulaDesc": "Standard annualized geometric growth formula used across Indian mutual fund fact sheets.",
  "inputsSummary": "Initial Capital / Purchase NAV, Final Value / Exit NAV, Holding Period (Years)",
  "outputsSummary": "CAGR %, Absolute Return %, Net Capital Gain, Wealth Multiplier",
  "fields": [
    {
      "id": "initialAmount",
      "label": "Initial Investment Capital / Purchase NAV",
      "type": "number",
      "default": 100000,
      "min": 1000,
      "max": 100000000,
      "step": 5000,
      "prefix": "₹"
    },
    {
      "id": "finalAmount",
      "label": "Current / Exit Value",
      "type": "number",
      "default": 225000,
      "min": 1000,
      "max": 500000000,
      "step": 5000,
      "prefix": "₹"
    },
    {
      "id": "holdingYears",
      "label": "Holding Period (Years)",
      "type": "number",
      "default": 5,
      "min": 0.25,
      "max": 40,
      "step": 0.25,
      "suffix": "Years"
    }
  ],
  "chartType": "donut"
},
{
  "id": "addition-calculator",
  "category": "math",
  "title": "Addition Calculator",
  "badge": "Basic Math",
  "icon": "plus",
  "summary": "Add two or more numbers with step-by-step column addition and running stats.",
  "description": "Precision arithmetic addition tool supporting multiple decimals, running averages, column-by-column carry-over visualization, and total item counts.",
  "formula": "Sum = A + B + N₁ + N₂ + ...",
  "formulaDesc": "Arithmetic addition with exact decimal precision.",
  "inputsSummary": "Number A, Number B, Optional Additional Comma-Separated Values",
  "outputsSummary": "Grand Sum, Total Terms, Arithmetic Mean, Column Steps",
  "fields": [
    {
      "id": "numberA",
      "label": "Primary Number (A)",
      "type": "number",
      "default": 1450.75,
      "min": -1000000000,
      "max": 1000000000,
      "step": 0.01
    },
    {
      "id": "numberB",
      "label": "Secondary Number (B)",
      "type": "number",
      "default": 3825.25,
      "min": -1000000000,
      "max": 1000000000,
      "step": 0.01
    },
    {
      "id": "extraNumbers",
      "label": "Additional Numbers (Comma separated, optional)",
      "type": "text",
      "default": "120.50, 480"
    }
  ]
},
{
  "id": "subtraction-calculator",
  "category": "math",
  "title": "Subtraction Calculator",
  "badge": "Basic Math",
  "icon": "minus",
  "summary": "Subtract numbers with difference breakdown, sign check, and percentage drop.",
  "description": "Accurate subtraction calculator providing difference, absolute difference, sign change analysis, and percentage reduction between initial and subtracted values.",
  "formula": "Difference = Minuend (A) - Subtrahend (B)",
  "formulaDesc": "Direct arithmetic difference with relative decrease analysis.",
  "inputsSummary": "Minuend (A), Subtrahend (B)",
  "outputsSummary": "Difference, Absolute Difference, Percentage Reduction %",
  "fields": [
    {
      "id": "minuend",
      "label": "Minuend (Number A)",
      "type": "number",
      "default": 15000,
      "min": -1000000000,
      "max": 1000000000,
      "step": 0.5
    },
    {
      "id": "subtrahend",
      "label": "Subtrahend (Number B)",
      "type": "number",
      "default": 8350.5,
      "min": -1000000000,
      "max": 1000000000,
      "step": 0.5
    }
  ]
},
{
  "id": "multiplication-calculator",
  "category": "math",
  "title": "Multiplication Calculator",
  "badge": "Basic Math",
  "icon": "x",
  "summary": "Multiply numbers with partial product breakdown and factor decomposition.",
  "description": "Calculate exact products of two or more numbers, view step-by-step partial products, exponents, and mathematical prime factors.",
  "formula": "Product = Multiplicand * Multiplier",
  "formulaDesc": "Arithmetic multiplication with partial product decomposition.",
  "inputsSummary": "Multiplicand (A), Multiplier (B)",
  "outputsSummary": "Product, Factors, Scientific Notation, Square Root of Product",
  "fields": [
    {
      "id": "multiplicand",
      "label": "Multiplicand (Number A)",
      "type": "number",
      "default": 384,
      "min": -100000000,
      "max": 100000000,
      "step": 1
    },
    {
      "id": "multiplier",
      "label": "Multiplier (Number B)",
      "type": "number",
      "default": 65,
      "min": -100000000,
      "max": 100000000,
      "step": 1
    }
  ]
},
{
  "id": "division-calculator",
  "category": "math",
  "title": "Division & Remainder Calculator",
  "badge": "Basic Math",
  "icon": "divide",
  "summary": "Divide numbers with integer quotient, remainder, mixed fraction & decimal.",
  "description": "Complete long division solver showing integer quotient, remainder, repeating decimal representation, and equivalent mixed fraction.",
  "formula": "Dividend = (Divisor * Quotient) + Remainder",
  "formulaDesc": "Euclidean division algorithm with decimal expansion.",
  "inputsSummary": "Dividend, Divisor",
  "outputsSummary": "Quotient, Remainder, Exact Decimal, Mixed Fraction Form",
  "fields": [
    {
      "id": "dividend",
      "label": "Dividend (Number being divided)",
      "type": "number",
      "default": 9875,
      "min": -100000000,
      "max": 100000000,
      "step": 1
    },
    {
      "id": "divisor",
      "label": "Divisor (Divided by)",
      "type": "number",
      "default": 24,
      "min": 0.00001,
      "max": 100000000,
      "step": 1
    }
  ]
},
{
  "id": "algebra-solver",
  "category": "math",
  "title": "Algebra & Quadratic Solver",
  "badge": "Advanced Math",
  "icon": "layers",
  "summary": "Solve linear (ax + b = c) and quadratic (ax² + bx + c = 0) equations with steps.",
  "description": "Interactive algebraic equation solver. Computes exact roots using the quadratic formula, calculates discriminant Δ, identifies root types (real/complex), and parabola vertex.",
  "formula": "x = (-b ± √(b² - 4ac)) / (2a)",
  "formulaDesc": "Quadratic formula with discriminant classification (Δ > 0, Δ = 0, Δ < 0).",
  "inputsSummary": "Equation Type (Linear / Quadratic), Coefficients a, b, c",
  "outputsSummary": "Roots (x₁, x₂), Discriminant Δ, Root Nature, Parabola Vertex",
  "fields": [
    {
      "id": "eqType",
      "label": "Equation Type",
      "type": "select",
      "default": "quadratic",
      "options": [
        {
          "value": "quadratic",
          "label": "Quadratic: ax² + bx + c = 0"
        },
        {
          "value": "linear",
          "label": "Linear: ax + b = c"
        }
      ]
    },
    {
      "id": "coefA",
      "label": "Coefficient a (x² or x)",
      "type": "number",
      "default": 1,
      "min": -10000,
      "max": 10000,
      "step": 0.5
    },
    {
      "id": "coefB",
      "label": "Coefficient b (x or constant)",
      "type": "number",
      "default": -7,
      "min": -10000,
      "max": 10000,
      "step": 0.5
    },
    {
      "id": "coefC",
      "label": "Constant c",
      "type": "number",
      "default": 12,
      "min": -10000,
      "max": 10000,
      "step": 0.5
    }
  ]
},
{
  "id": "trigonometry-calculator",
  "category": "math",
  "title": "Trigonometry Calculator",
  "badge": "Advanced Math",
  "icon": "square-root",
  "summary": "Evaluate sin, cos, tan, cot, sec, csc, radians, and right triangle hypotenuse.",
  "description": "Full trigonometric ratios solver. Supports input in degrees or radians, and calculates all 6 primary and reciprocal trig functions along with right-triangle hypotenuse.",
  "formula": "sin(θ) = opp/hyp, cos(θ) = adj/hyp, tan(θ) = opp/adj",
  "formulaDesc": "Unit circle trigonometric values and Pythagorean relationship.",
  "inputsSummary": "Angle θ (Degrees or Radians), Triangle Sides Opposite & Adjacent",
  "outputsSummary": "sin, cos, tan, cot, sec, csc, Hypotenuse, Radians / Gradians",
  "fields": [
    {
      "id": "angleDegrees",
      "label": "Angle θ in Degrees",
      "type": "number",
      "default": 45,
      "min": -3600,
      "max": 3600,
      "step": 1,
      "suffix": "°"
    },
    {
      "id": "sideOpposite",
      "label": "Right Triangle Opposite Side (a)",
      "type": "number",
      "default": 3,
      "min": 0.01,
      "max": 100000,
      "step": 0.5
    },
    {
      "id": "sideAdjacent",
      "label": "Right Triangle Adjacent Side (b)",
      "type": "number",
      "default": 4,
      "min": 0.01,
      "max": 100000,
      "step": 0.5
    }
  ]
},
{
  "id": "matrix-calculator",
  "category": "math",
  "title": "Matrix Operations Calculator",
  "badge": "Advanced Math",
  "icon": "layers",
  "summary": "Compute 2x2 and 3x3 matrix determinants, addition, multiplication & transpose.",
  "description": "Perform linear algebra matrix computations including determinants (det A), matrix addition (A + B), matrix product (A × B), transpose (Aᵀ), and matrix trace.",
  "formula": "det([[a, b], [c, d]]) = ad - bc",
  "formulaDesc": "Matrix linear algebra algorithms for 2x2 and 3x3 dimensions.",
  "inputsSummary": "Matrix Dimension, Matrix A Entries, Matrix B Entries, Operation",
  "outputsSummary": "Determinant det(A), Result Matrix Grid, Matrix Trace, Invertibility",
  "fields": [
    {
      "id": "dimension",
      "label": "Matrix Dimension",
      "type": "select",
      "default": "2x2",
      "options": [
        {
          "value": "2x2",
          "label": "2 × 2 Matrix"
        },
        {
          "value": "3x3",
          "label": "3 × 3 Matrix"
        }
      ]
    },
    {
      "id": "operation",
      "label": "Operation",
      "type": "select",
      "default": "det",
      "options": [
        {
          "value": "det",
          "label": "Determinant of Matrix A: det(A)"
        },
        {
          "value": "add",
          "label": "Addition: A + B"
        },
        {
          "value": "multiply",
          "label": "Multiplication: A × B"
        },
        {
          "value": "transpose",
          "label": "Transpose of A: Aᵀ"
        }
      ]
    },
    {
      "id": "matrixA_row1",
      "label": "Matrix A - Row 1 (Comma-separated entries)",
      "type": "text",
      "default": "4, 7"
    },
    {
      "id": "matrixA_row2",
      "label": "Matrix A - Row 2 (Comma-separated entries)",
      "type": "text",
      "default": "2, 6"
    },
    {
      "id": "matrixB_row1",
      "label": "Matrix B - Row 1 (For A+B or A×B)",
      "type": "text",
      "default": "1, 3"
    },
    {
      "id": "matrixB_row2",
      "label": "Matrix B - Row 2 (For A+B or A×B)",
      "type": "text",
      "default": "5, 2"
    }
  ]
},
{
  "id": "prime-factorization-calculator",
  "category": "math",
  "title": "Prime Factorization Calculator",
  "badge": "Number Theory",
  "icon": "square-root",
  "summary": "Decompose numbers into prime factors, exponential forms, and divisor lists.",
  "description": "Decompose any integer into its fundamental prime factor product tree. Computes canonical prime factorization (e.g. 360 = 2³ × 3² × 5), total number of divisors, and sum of divisors.",
  "formula": "N = p₁^a₁ * p₂^a₂ * ... * p_k^a_k",
  "formulaDesc": "Fundamental Theorem of Arithmetic unique prime factor decomposition.",
  "inputsSummary": "Integer Number (N)",
  "outputsSummary": "Canonical Prime Factors, Divisors Count, Sum of Divisors, Prime Status",
  "fields": [
    {
      "id": "numberN",
      "label": "Enter Integer Number (N)",
      "type": "number",
      "default": 360,
      "min": 2,
      "max": 1000000000,
      "step": 1
    }
  ]
},
{
  "id": "age-calendar-calculator",
  "category": "math",
  "title": "Age & Calendar Calculator",
  "badge": "Chronological",
  "icon": "calendar-clock",
  "summary": "Calculate exact chronological age in years, months, days, and next birthday.",
  "description": "Precision chronological date tool. Calculates exact age breakdown in Years, Months, and Days, total days and hours lived, day of week you were born, and days until your next birthday.",
  "formula": "Age = Target Date - Date of Birth (accounting for leap years and month lengths)",
  "formulaDesc": "Calendar arithmetic factoring varying month days and Gregorian leap years.",
  "inputsSummary": "Date of Birth, Target / As of Date",
  "outputsSummary": "Exact Age (Y, M, D), Total Days Lived, Day of Week Born, Days to Next Birthday",
  "fields": [
    {
      "id": "birthDate",
      "label": "Date of Birth (YYYY-MM-DD)",
      "type": "text",
      "default": "1995-08-15"
    },
    {
      "id": "targetDate",
      "label": "Calculate Age As Of (YYYY-MM-DD, or leave today)",
      "type": "text",
      "default": "2026-10-15"
    }
  ]
},
{
  "id": "apgar-score-calculator",
  "category": "health",
  "title": "Apgar Score Calculator",
  "badge": "Neonatal",
  "icon": "heart-pulse",
  "summary": "Assess newborn infant health across 5 physiological parameters at 1 & 5 min.",
  "description": "Standard clinical scoring system used immediately after birth to evaluate newborn viability across Appearance, Pulse, Grimace, Activity, and Respiration (0 to 10 scale).",
  "formula": "Score = Appearance (0-2) + Pulse (0-2) + Grimace (0-2) + Activity (0-2) + Respiration (0-2)",
  "formulaDesc": "Clinical score from 0 (critical) to 10 (normal healthy newborn).",
  "inputsSummary": "Skin Color, Heart Rate, Reflex Irritability, Muscle Tone, Respiration",
  "outputsSummary": "Total Apgar Score (0-10), Clinical Category, Medical Action Recommendation",
  "fields": [
    {
      "id": "appearance",
      "label": "Appearance (Skin Color)",
      "type": "select",
      "default": "2",
      "options": [
        {
          "value": "2",
          "label": "2 - Completely Pink body and extremities"
        },
        {
          "value": "1",
          "label": "1 - Pink body, but blue extremities (Acrocyanosis)"
        },
        {
          "value": "0",
          "label": "0 - Blue or pale all over"
        }
      ]
    },
    {
      "id": "pulse",
      "label": "Pulse (Heart Rate)",
      "type": "select",
      "default": "2",
      "options": [
        {
          "value": "2",
          "label": "2 - > 100 beats per minute (Normal)"
        },
        {
          "value": "1",
          "label": "1 - < 100 beats per minute"
        },
        {
          "value": "0",
          "label": "0 - Absent pulse"
        }
      ]
    },
    {
      "id": "grimace",
      "label": "Grimace (Reflex Irritability to stimulation)",
      "type": "select",
      "default": "2",
      "options": [
        {
          "value": "2",
          "label": "2 - Vigorous cry, cough, or sneeze"
        },
        {
          "value": "1",
          "label": "1 - Grimace or feeble cry"
        },
        {
          "value": "0",
          "label": "0 - No response / flaccid"
        }
      ]
    },
    {
      "id": "activity",
      "label": "Activity (Muscle Tone)",
      "type": "select",
      "default": "2",
      "options": [
        {
          "value": "2",
          "label": "2 - Active spontaneous motion, well flexed"
        },
        {
          "value": "1",
          "label": "1 - Some flexion of extremities"
        },
        {
          "value": "0",
          "label": "0 - Limp / no movement"
        }
      ]
    },
    {
      "id": "respiration",
      "label": "Respiration (Breathing Effort)",
      "type": "select",
      "default": "2",
      "options": [
        {
          "value": "2",
          "label": "2 - Good, strong lusty cry; regular breathing"
        },
        {
          "value": "1",
          "label": "1 - Slow, irregular, or shallow breathing"
        },
        {
          "value": "0",
          "label": "0 - Absent / no breathing"
        }
      ]
    }
  ]
},
{
  "id": "glasgow-coma-scale-calculator",
  "category": "health",
  "title": "Glasgow Coma Scale (GCS) Calculator",
  "badge": "Neurological",
  "icon": "activity",
  "summary": "Measure level of consciousness and traumatic brain injury severity (3-15).",
  "description": "Gold-standard clinical assessment of consciousness in acute trauma patients based on Eye Opening (1-4), Verbal Response (1-5), and Motor Response (1-6).",
  "formula": "GCS Total = Eye (1-4) + Verbal (1-5) + Motor (1-6)",
  "formulaDesc": "Score range 3 (deep coma / death) to 15 (fully awake, alert, and oriented).",
  "inputsSummary": "Eye Opening (1-4), Verbal Response (1-5), Motor Response (1-6)",
  "outputsSummary": "Total GCS Score (3-15), Brain Injury Severity, Airway Management Flag",
  "fields": [
    {
      "id": "eye",
      "label": "Eye Opening Response (E)",
      "type": "select",
      "default": "4",
      "options": [
        {
          "value": "4",
          "label": "4 - Spontaneous eye opening"
        },
        {
          "value": "3",
          "label": "3 - In response to verbal command / speech"
        },
        {
          "value": "2",
          "label": "2 - In response to pain stimulus only"
        },
        {
          "value": "1",
          "label": "1 - No eye opening"
        }
      ]
    },
    {
      "id": "verbal",
      "label": "Best Verbal Response (V)",
      "type": "select",
      "default": "5",
      "options": [
        {
          "value": "5",
          "label": "5 - Oriented to person, place, and time"
        },
        {
          "value": "4",
          "label": "4 - Confused conversation, but replies"
        },
        {
          "value": "3",
          "label": "3 - Inappropriate / disorganized words"
        },
        {
          "value": "2",
          "label": "2 - Incomprehensible sounds / moans"
        },
        {
          "value": "1",
          "label": "1 - No verbal response"
        }
      ]
    },
    {
      "id": "motor",
      "label": "Best Motor Response (M)",
      "type": "select",
      "default": "6",
      "options": [
        {
          "value": "6",
          "label": "6 - Obeys commands for movement"
        },
        {
          "value": "5",
          "label": "5 - Localizes painful stimulus"
        },
        {
          "value": "4",
          "label": "4 - Normal flexion / withdrawal from pain"
        },
        {
          "value": "3",
          "label": "3 - Abnormal flexion (decorticate posturing)"
        },
        {
          "value": "2",
          "label": "2 - Abnormal extension (decerebrate posturing)"
        },
        {
          "value": "1",
          "label": "1 - Flaccid / no motor response"
        }
      ]
    }
  ]
},
{
  "id": "gfr-calculator",
  "category": "health",
  "title": "eGFR Kidney Function Calculator",
  "badge": "Renal / CKD",
  "icon": "activity",
  "summary": "Estimate Glomerular Filtration Rate using CKD-EPI formula and CKD staging.",
  "description": "Calculate estimated Glomerular Filtration Rate (eGFR) from serum creatinine level, age, and sex using the validated CKD-EPI equation, staging Chronic Kidney Disease from G1 to G5.",
  "formula": "eGFR = 142 * min(Scr/κ, 1)^α * max(Scr/κ, 1)^-1.200 * 0.9938^Age * [1.012 if female]",
  "formulaDesc": "2021 CKD-EPI Creatinine equation endorsed by KDIGO and the National Kidney Foundation.",
  "inputsSummary": "Serum Creatinine (mg/dL), Age, Biological Sex",
  "outputsSummary": "eGFR (mL/min/1.73m²), CKD Stage (G1 to G5), Kidney Function Level",
  "fields": [
    {
      "id": "creatinine",
      "label": "Serum Creatinine (mg/dL)",
      "type": "number",
      "default": 1,
      "min": 0.1,
      "max": 25,
      "step": 0.05,
      "suffix": "mg/dL"
    },
    {
      "id": "age",
      "label": "Patient Age (Years)",
      "type": "number",
      "default": 45,
      "min": 18,
      "max": 120,
      "step": 1,
      "suffix": "Years"
    },
    {
      "id": "gender",
      "label": "Biological Sex",
      "type": "select",
      "default": "male",
      "options": [
        {
          "value": "male",
          "label": "Male (κ = 0.9, α = -0.302)"
        },
        {
          "value": "female",
          "label": "Female (κ = 0.7, α = -0.241, multiplier 1.012)"
        }
      ]
    }
  ]
},
{
  "id": "burns-fluid-calculator",
  "category": "health",
  "title": "Burns Fluid Replacement (Parkland) Calculator",
  "badge": "Clinical / Trauma",
  "icon": "shield-check",
  "summary": "Calculate 24-hour Lactated Ringer's resuscitation fluids for burn injuries.",
  "description": "Clinical Parkland resuscitation formula for acute major burns. Computes total 24-hour intravenous crystalloid requirement (Lactated Ringer's), first 8-hour rate, and next 16-hour infusion rate.",
  "formula": "Total 24h Fluid = 4 mL * Weight (kg) * % TBSA Burned",
  "formulaDesc": "Parkland formula: 50% given in the first 8 hours post-injury, remaining 50% over the next 16 hours.",
  "inputsSummary": "Patient Weight (kg), % Total Body Surface Area (TBSA) Burned",
  "outputsSummary": "Total 24h Fluid (mL), First 8h Rate (mL/hr), Next 16h Rate (mL/hr)",
  "fields": [
    {
      "id": "weightKg",
      "label": "Patient Weight in Kilograms (kg)",
      "type": "number",
      "default": 70,
      "min": 10,
      "max": 300,
      "step": 1,
      "suffix": "kg"
    },
    {
      "id": "tbsa",
      "label": "Total Body Surface Area (% TBSA Burned)",
      "type": "number",
      "default": 30,
      "min": 10,
      "max": 90,
      "step": 1,
      "suffix": "%"
    }
  ]
},
{
  "id": "nutrition-planner",
  "category": "health",
  "title": "Nutrition & Macro Planner",
  "badge": "Diet & Macros",
  "icon": "coffee",
  "summary": "Plan daily caloric target, macronutrient distribution, and per-meal splits.",
  "description": "Generate customized daily macronutrient targets (Protein, Carbohydrates, Healthy Fats) in grams and calories based on your dietary strategy and number of meals per day.",
  "formula": "Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g split by target percentages",
  "formulaDesc": "Evidence-based macronutrient distribution split across daily meal frequency.",
  "inputsSummary": "Daily Calorie Goal, Dietary Strategy, Meals per Day",
  "outputsSummary": "Daily Protein (g), Carbohydrates (g), Fats (g), Per-Meal Calorie & Macro Target",
  "fields": [
    {
      "id": "dailyCalories",
      "label": "Daily Calorie Target (kcal)",
      "type": "number",
      "default": 2200,
      "min": 800,
      "max": 8000,
      "step": 50,
      "suffix": "kcal"
    },
    {
      "id": "dietType",
      "label": "Dietary Strategy / Macro Ratio",
      "type": "select",
      "default": "balanced",
      "options": [
        {
          "value": "balanced",
          "label": "Balanced (50% Carbs, 25% Protein, 25% Fat)"
        },
        {
          "value": "high_protein",
          "label": "High Protein / Muscle Gain (40% Carbs, 35% Protein, 25% Fat)"
        },
        {
          "value": "low_carb",
          "label": "Low Carb / Fat Loss (25% Carbs, 35% Protein, 40% Fat)"
        },
        {
          "value": "keto",
          "label": "Ketogenic (10% Carbs, 25% Protein, 65% Fat)"
        }
      ]
    },
    {
      "id": "mealsCount",
      "label": "Daily Meal Frequency",
      "type": "select",
      "default": "3",
      "options": [
        {
          "value": "3",
          "label": "3 Meals per Day (Breakfast, Lunch, Dinner)"
        },
        {
          "value": "4",
          "label": "4 Meals (3 Meals + 1 Snack)"
        },
        {
          "value": "5",
          "label": "5 Small Meals"
        }
      ]
    }
  ],
  "chartType": "donut"
},
{
  "id": "cross-math-game",
  "category": "math",
  "title": "Cross Math Puzzle Game",
  "badge": "Progressive",
  "icon": "puzzle",
  "summary": "Solve progressive arithmetic cross math grids from Easy 3×3 to Hard 5×5 with unlocked difficulty levels.",
  "description": "Progressive difficulty Cross Math puzzle. Solve single-step and multi-step equations to unlock Medium and Hard difficulties, tracking completion speed and scores.",
  "formula": "Row Calculation: A op B = C and Multi-Step Equations",
  "formulaDesc": "Interactive progressive difficulty arithmetic grid game with local storage progress tracking.",
  "customUi": "cross-math-game",
  "fields": []
}
];

// Helper methods on calculators data
function getCategoryById(id) {
  return CATEGORIES_DATA.find(c => c.id === id);
}

function getCalculatorById(id) {
  return CALCULATORS_DATA.find(c => c.id === id);
}

function getCalculatorsByCategory(catId) {
  return CALCULATORS_DATA.filter(c => c.category === catId);
}

function searchCalculators(query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  const qWords = q.split(/\s+/).filter(Boolean);

  const matched = CALCULATORS_DATA.filter(c => {
    const title = (c.title || '').toLowerCase();
    const summary = (c.summary || '').toLowerCase();
    const description = (c.description || '').toLowerCase();
    const category = (c.category || '').toLowerCase();
    const badge = (c.badge || '').toLowerCase();
    const formula = (c.formula || '').toLowerCase();
    const keywords = (c.keywords || '').toLowerCase();

    let catKeywords = '';
    if (category === 'financial') {
      catKeywords = 'finance financial money investment loan emi tax interest banking wealth stock stocks equities shares dollar usd inr';
    } else if (category === 'health') {
      catKeywords = 'health fitness medical diet body weight calories workout';
    } else if (category === 'math') {
      catKeywords = 'math mathematics numbers algebra geometry percentage equation';
    }

    const fullText = `${title} ${summary} ${description} ${category} ${catKeywords} ${badge} ${formula} ${keywords}`;

    if (fullText.includes(q)) return true;
    return qWords.every(w => fullText.includes(w));
  });

  // Ensure US Stocks Calculator appears at the top of search results whenever matched
  matched.sort((a, b) => {
    if (a.id === 'us-stocks-calculator') return -1;
    if (b.id === 'us-stocks-calculator') return 1;
    return 0;
  });

  return matched;
}


function getHubTaxonomy() {
  return CALCULATOR_HUB_TAXONOMY;
}

function getHubCategory(catKey) {
  return CALCULATOR_HUB_TAXONOMY[catKey] || null;
}

function getHubSubcategory(catKey, subKey) {
  const cat = CALCULATOR_HUB_TAXONOMY[catKey];
  if (!cat || !cat.subcategories) return null;
  return cat.subcategories[subKey] || null;
}

function getHubCalculators(catKey, subKey) {
  const subcat = getHubSubcategory(catKey, subKey);
  if (!subcat || !subcat.calculatorIds) return [];
  return subcat.calculatorIds.map(id => getCalculatorById(id)).filter(Boolean);
}

function getCalcInputsSummary(calc) {
  if (calc.inputsSummary) return calc.inputsSummary;
  if (calc.fields && calc.fields.length > 0) {
    return calc.fields.slice(0, 3).map(f => f.label.replace(/\s*\(.*?\)/g, '')).join(' • ');
  }
  return 'Key parameters & options';
}

function getCalcOutputsSummary(calc) {
  if (calc.outputsSummary) return calc.outputsSummary;
  if (calc.category === 'financial') {
    if (calc.id.includes('loan') || calc.id.includes('emi')) return 'Monthly EMI • Total Interest • Schedule Table';
    if (calc.id.includes('sip') || calc.id.includes('investment')) return 'Maturity Corpus • Capital Gains • Growth Chart';
    return 'Calculated Returns • Net Profit • Visual Breakdown';
  }
  if (calc.category === 'math') {
    return 'Exact Solution • Step-by-Step Breakdown • Analytics';
  }
  if (calc.category === 'health') {
    return 'Health Metric • Clinical Interpretation • Target Guidance';
  }
  return 'Instant Precision Results & Chart';
}

// Global attachment
if (typeof window !== 'undefined') {
  window.CATEGORIES_DATA = CATEGORIES_DATA;
  window.CALCULATORS_DATA = CALCULATORS_DATA;
  window.getCategoryById = getCategoryById;
  window.getCalculatorById = getCalculatorById;
  window.getCalculatorsByCategory = getCalculatorsByCategory;
  window.searchCalculators = searchCalculators;
  window.EMI_SUITE_CATEGORIES = EMI_SUITE_CATEGORIES;
  window.isEmiSuiteCalculator = isEmiSuiteCalculator;
  window.getEmiSuiteCategoryForCalc = getEmiSuiteCategoryForCalc;

  window.CALCULATOR_HUB_TAXONOMY = CALCULATOR_HUB_TAXONOMY;
  window.getHubTaxonomy = getHubTaxonomy;
  window.getHubCategory = getHubCategory;
  window.getHubSubcategory = getHubSubcategory;
  window.getHubCalculators = getHubCalculators;
  window.getCalcInputsSummary = getCalcInputsSummary;
  window.getCalcOutputsSummary = getCalcOutputsSummary;

}
