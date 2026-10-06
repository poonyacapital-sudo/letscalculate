/**
 * letscalculate.in - Comprehensive Learning Academy Data
 * realistic Indian market examples (Reliance, HDFC Bank, TCS, Infosys, Nifty 50, MCX, USD/INR),
 * and prominent, step-by-step highlighted calculation breakdowns.
 */

const LEARNING_MODULES_DATA = [
  {
    id: 'introduction-to-stock-markets',
    moduleNumber: 1,
    title: 'Introduction to Stock Markets',
    category: 'Equities & Trading Foundations',
    chaptersCount: 15,
    level: 'Beginner',
    accentColor: '#10b981',
    badgeClass: 'badge-emerald',
    shortDesc: 'Master how capital markets allocate savings into corporate wealth in India. Understand primary IPOs vs secondary market exchanges (NSE & BSE), depository clearing, market timings, and trade settlement.',
    readingTime: '45 mins',
    calculators: [
      { id: 'cagr-calculator', name: 'CAGR Calculator' },
      { id: 'percentage-calculator', name: 'Percentage Calculator' }
    ],
    fullOverview: `The stock market is the financial backbone of India's formal economy, allowing businesses to raise risk capital from the public and offering retail citizens a compounding mechanism to outpace inflation. In this module, you will learn the operational infrastructure of Indian exchanges: how companies transition from private enterprises to listed corporations via Initial Public Offerings (IPOs) on the Primary Market, and how equity shares subsequently trade among millions of market participants on the Secondary Market (NSE and BSE). We explore the vital supervisory roles of SEBI (Securities and Exchange Board of India), Depositories (CDSL & NSDL) safeguarding digital share ownership in Demat accounts, Clearing Corporations (NCL & ICCL) guaranteeing counterparty solvency, and stockbrokers facilitating order routing. You will also master trading schedules (Pre-Open Session 9:00–9:15 AM, Normal Market 9:15 AM–3:30 PM, Post-Closing 3:40–4:00 PM), order types (Market, Limit, Stop-Loss), and modern trade settlement cycles (T+1 and instantaneous T+0).`,
    coreConcepts: [
      {
        title: 'Capital Formation & The Dual Market Structure',
        detail: 'The Primary Market facilitates fresh capital creation when an issuing company sells equity directly to investors via an IPO or FPO. The Secondary Market (NSE & BSE) provides continuous liquidity, allowing existing shareholders to buy and sell among themselves without altering the company’s capital base.'
      },
      {
        title: 'Market Infrastructure Institutions (MIIs)',
        detail: 'Trading involves a secure tri-partite system: Stockbrokers (Order Routing) → Exchanges & Clearing Corporations (Matching & Settlement Guarantee) → Depositories CDSL/NSDL (Demat Custody).'
      },
      {
        title: 'Order Types & Market Depth (Bid/Ask Dynamics)',
        detail: 'Learn the critical difference between Market Orders (immediate execution at prevailing price) and Limit Orders (conditional price execution), plus reading the 5-deep market order book.'
      },
      {
        title: 'Settlement Cycles (T+1 & T+0)',
        detail: 'India became the first major global economy to shift to T+1 settlement. Shares bought on Monday settle into your Demat account on Tuesday, with real-time risk margins monitored by Clearing Corporations.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Rajesh Invests in Infosys (INFY)',
      narrative: `Rajesh wants to invest in India's leading IT exporter, Infosys Limited. He opens a Demat & Trading account with a SEBI-registered broker. On Wednesday at 10:30 AM, Infosys is quoting at ₹1,850. Rajesh places a Limit Buy Order for 100 shares at ₹1,848. Within 4 minutes, a seller offers 100 shares at ₹1,848 on the National Stock Exchange (NSE). The trade matches immediately. The Clearing Corporation (NCL) debits ₹1,84,800 (plus statutory STT and stamp duty) from Rajesh's broker ledger and earmarks 100 shares. On Thursday (T+1), the 100 INFY shares are electronically credited to Rajesh's CDSL Demat account under his unique Beneficiary Owner Identification Number (BOID).`
    },
    calculationHighlight: {
      topic: 'Return on Investment (ROI) vs Annualized Compounding (CAGR)',
      formula: `Absolute Return (%) = [ (Ending Value - Initial Cost) / Initial Cost ] × 100\nCAGR = [ (Ending Value / Initial Cost) ^ (1 / Number of Years) ] - 1`,
      explanation: 'Absolute return reflects total percentage growth irrespective of time elapsed, while CAGR (Compound Annual Growth Rate) reveals the true annualized compounding speed of your capital across multiple years.',
      workedExample: {
        inputs: [
          { label: 'Initial Purchase', value: '150 shares of Infosys @ ₹1,200 (Total: ₹1,80,000)' },
          { label: 'Holding Period', value: '4 Full Years (2021 to 2025)' },
          { label: 'Ending Stock Price', value: '₹1,950 per share (Total: ₹2,92,500)' },
          { label: 'Total Dividends Received', value: '₹18,000 cash credited across 4 years' },
          { label: 'Total Portfolio Ending Value', value: '₹2,92,500 + ₹18,000 = ₹3,10,500' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Absolute Return',
            math: '[(₹3,10,500 - ₹1,80,000) / ₹1,80,000] × 100 = [₹1,30,500 / ₹1,80,000] × 100',
            result: '72.50% Absolute Gain'
          },
          {
            stepNumber: 2,
            title: 'Calculate Annualized Compound Rate (CAGR)',
            math: '(₹3,10,500 / ₹1,80,000)^(1/4) - 1 = (1.725)^0.25 - 1 = 1.1460 - 1',
            result: '14.60% Compounded Annual Growth Rate (CAGR)'
          }
        ],
        conclusion: 'While a 72.50% gain appears massive, looking at the 14.60% CAGR enables you to accurately benchmark your performance against Nifty 50 (which historical delivered ~12-13% CAGR) and fixed income alternatives.'
      },
      calculatorId: 'cagr-calculator',
      calculatorName: 'Open CAGR Calculator'
    },
    chaptersList: [
      { number: 1, title: 'The Need to Invest & Beat Inflation' },
      { number: 2, title: 'Regulators & Market Intermediaries (SEBI, NSDL, CDSL)' },
      { number: 3, title: 'The IPO Lifecycle & Primary Markets' },
      { number: 4, title: 'Secondary Market Mechanics & Exchange Operations' },
      { number: 5, title: 'Understanding Stock Indices: Nifty 50 & Sensex' },
      { number: 6, title: 'Trading Terminology: Bull, Bear, Float, Market Cap' },
      { number: 7, title: 'Order Book Dynamics: Bid, Ask & Market Depth' },
      { number: 8, title: 'Types of Orders: Market, Limit, SL, AMO' },
      { number: 9, title: 'Clearing, Margins & T+1 Settlement Process' },
      { number: 10, title: 'Corporate Actions: Dividends, Stock Splits & Bonus Issues' },
      { number: 11, title: 'Rights Issues, Buybacks & Open Offers' },
      { number: 12, title: 'Statutory Charges: STT, Stamp Duty, GST, Exchange Fees' },
      { number: 13, title: 'Dematerialization & Power of Attorney (POA/DDPI)' },
      { number: 14, title: 'Market Timings, Circuits & Price Bands' },
      { number: 15, title: '10 Golden Rules for Every New Indian Investor' }
    ]
  },
  {
    id: 'technical-analysis',
    moduleNumber: 2,
    title: 'Technical Analysis',
    category: 'Technical Analysis',
    chaptersCount: 22,
    level: 'Intermediate',
    accentColor: '#3b82f6',
    badgeClass: 'badge-blue',
    shortDesc: 'Decipher price action, candlestick anatomy, support & resistance zones, chart patterns, and momentum indicators to pinpoint high-probability trading entries and exits.',
    readingTime: '60 mins',
    calculators: [
      { id: 'percentage-calculator', name: 'Percentage Calculator' },
      { id: 'average-calculator', name: 'Average Calculator' }
    ],
    fullOverview: `Technical Analysis (TA) is the study of collective market psychology reflected in historical price action, candlestick geometry, and volume behavior. Rather than evaluating balance sheets, technical analysts believe that all known fundamental information, market sentiment, and institutional expectations are already discounted in the market price. In this module, you will master the construction of Japanese candlesticks (Open, High, Low, Close), single candlestick patterns (Hammer, Shooting Star, Doji, Marubozu), and multi-candlestick reversals (Engulfing, Piercing Line, Morning Star). You will learn how to identify horizontal support and resistance zones, dynamic trendlines, classic chart continuation and reversal patterns (Head & Shoulders, Double Tops, Flags, Pennants), and employ mathematical momentum oscillators like the Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), Bollinger Bands, and Exponential Moving Averages (EMA 20, 50, 200).`,
    coreConcepts: [
      {
        title: 'The Core Tenet: Price Discounts Everything',
        detail: 'Prices move in trends (uptrends, downtrends, sideways consolidation). History tends to repeat itself due to consistent human emotions of greed and fear.'
      },
      {
        title: 'Candlestick Anatomy & Shadows',
        detail: 'The real body represents the conviction between open and close, while upper and lower wicks (shadows) reveal price rejection by buyers or sellers at the session extremes.'
      },
      {
        title: 'Support & Resistance Polarity Principle',
        detail: 'When a strong resistance level is decisively breached on elevated volume, it reverses roles to become dynamic support on subsequent pullbacks.'
      },
      {
        title: 'Momentum Oscillators & Indicator Divergences',
        detail: 'RSI overbought (>70) or oversold (<30) thresholds, coupled with bullish or bearish divergence (price makes lower low while RSI makes higher low), offer early warnings of institutional exhaustion.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Swing Trade on Tata Motors (TATAMOTORS)',
      narrative: `Tata Motors has undergone a 14% correction from its peak of ₹1,060 down to ₹915. A swing trader observes that ₹915 coincides with two technical factors: the rising 200-day Exponential Moving Average (EMA) and a prior multi-month breakout resistance that now serves as support. On Friday, Tata Motors forms a classic Bullish Hammer candle with a ₹28 lower shadow and a tiny green body near the session high (Open: ₹918, Low: ₹890, High: ₹924, Close: ₹922). Volume on the hammer is 2.5x the 20-day average. Furthermore, the 14-day Daily RSI rebounds from 29 back up through 32, confirming oversold exhaustion. The trader enters a long position at ₹925 with a stop-loss below the hammer low at ₹888 (risk = ₹37) and sets an initial profit target at the next resistance of ₹1,000 (reward = ₹75), yielding a favorable 1:2 Risk-to-Reward setup.`
    },
    calculationHighlight: {
      topic: '20-Period Exponential Moving Average (EMA) Calculation',
      formula: `Smoothing Multiplier = 2 / (Period + 1)\nEMA(today) = [ Current Close × Multiplier ] + [ EMA(yesterday) × (1 - Multiplier) ]`,
      explanation: 'Unlike a Simple Moving Average (SMA) which weights all days equally, an EMA applies exponential weighting to the most recent price data, making it far more responsive to sudden momentum shifts.',
      workedExample: {
        inputs: [
          { label: 'Lookback Period (N)', value: '20 trading sessions' },
          { label: 'Yesterday\'s 20-day EMA', value: '₹940.00' },
          { label: 'Today\'s Tata Motors Closing Price', value: '₹962.00 (bullish breakout session)' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Compute the Smoothing Multiplier',
            math: 'Multiplier = 2 / (20 + 1) = 2 / 21',
            result: '0.09524 (9.524% weight to today\'s close)'
          },
          {
            stepNumber: 2,
            title: 'Weight Today\'s Closing Price',
            math: '₹962.00 × 0.09524',
            result: '₹91.62'
          },
          {
            stepNumber: 3,
            title: 'Weight Yesterday\'s EMA',
            math: '₹940.00 × (1 - 0.09524) = ₹940.00 × 0.90476',
            result: '₹850.47'
          },
          {
            stepNumber: 4,
            title: 'Sum to derive Today\'s New EMA',
            math: '₹91.62 + ₹850.47',
            result: '₹942.09 (Up by +₹2.09 from yesterday)'
          }
        ],
        conclusion: 'By giving 9.52% immediate weight to today\'s high-velocity close, the 20 EMA adapts quickly to trend continuation, serving as a dependable trailing stop-loss line.'
      },
      calculatorId: 'percentage-calculator',
      calculatorName: 'Open Percentage Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to Technical Analysis & Philosophy' },
      { number: 2, title: 'The Japanese Candlestick Chart Paradigm' },
      { number: 3, title: 'Single Candlestick Patterns: Marubozu, Hammer & Hanging Man' },
      { number: 4, title: 'Shooting Star, Doji & Spinning Tops' },
      { number: 5, title: 'Multiple Candlestick Patterns: Bullish & Bearish Engulfing' },
      { number: 6, title: 'Harami, Piercing Line & Dark Cloud Cover' },
      { number: 7, title: 'Morning Star & Evening Star Trios' },
      { number: 8, title: 'Support & Resistance Construction' },
      { number: 9, title: 'Volume Spread Analysis & Confirmation' },
      { number: 10, title: 'Trendlines & Price Channels' },
      { number: 11, title: 'Moving Averages: SMA vs EMA Cross Strategies' },
      { number: 12, title: 'Relative Strength Index (RSI) & Divergences' },
      { number: 13, title: 'MACD: Moving Average Convergence Divergence' },
      { number: 14, title: 'Bollinger Bands & Volatility Squeeze' },
      { number: 15, title: 'Chart Patterns: Head and Shoulders & Inverted H&S' },
      { number: 16, title: 'Double Tops, Double Bottoms & Triple Reversals' },
      { number: 17, title: 'Continuation Patterns: Triangles, Flags & Pennants' },
      { number: 18, title: 'Fibonacci Retracements & Extension Levels' },
      { number: 19, title: 'Dow Theory Principles of Market Phase Structure' },
      { number: 20, title: 'Multiple Time Frame Analysis (Weekly, Daily, 15-Min)' },
      { number: 21, title: 'Designing a Complete Technical Trading Checklist' },
      { number: 22, title: 'Pitfalls in Technical Analysis & Avoiding Curve-Fitting' }
    ]
  },
  {
    id: 'fundamental-analysis',
    moduleNumber: 3,
    title: 'Fundamental Analysis',
    category: 'Equities & Valuation',
    chaptersCount: 16,
    level: 'Intermediate',
    accentColor: '#f59e0b',
    badgeClass: 'badge-amber',
    shortDesc: 'Evaluate business economics by analyzing audited financial statements, DuPont Return on Equity (ROE), economic moats, cash flows, and intrinsic equity valuation.',
    readingTime: '55 mins',
    calculators: [
      { id: 'profit-margin-calculator', name: 'Profit Margin Calculator' },
      { id: 'roi-calculator', name: 'ROI Calculator' }
    ],
    fullOverview: `Fundamental Analysis (FA) is the discipline of appraising a business's intrinsic economic value by conducting rigorous equity research into its financial statements, industry structure, competitive advantage (economic moat), and management integrity. While market prices fluctuate with daily sentiment, over the long term, stock prices gravitate toward the present value of the underlying company's cash-generating ability. In this module, you will learn how to dissect an Indian Annual Report, decipher the Profit & Loss Statement (Operating Revenue, EBITDA, PAT), the Balance Sheet (Equity Capital, Reserves, Borrowings, Fixed Assets, Net Working Capital), and the Cash Flow Statement (Operating, Investing, Financing). You will compute vital ratios including Price-to-Earnings (P/E), Price-to-Book (P/B), EV/EBITDA, Return on Capital Employed (ROCE), Debt-to-Equity, and execute a 3-way DuPont Return on Equity (ROE) breakdown.`,
    coreConcepts: [
      {
        title: 'The Three Audited Statements',
        detail: 'The P&L measures profitability over a period; the Balance Sheet reveals assets and obligations at a snapshot; the Cash Flow Statement tracks actual cash in and out, revealing whether accounting profits are backed by real liquidity.'
      },
      {
        title: 'Economic Moats (Buffett Framework)',
        detail: 'Sustainable competitive advantages: Brand pricing power (Titan, Asian Paints), High switching costs (TCS, Infosys), Network effects, and Low-cost scale economies (Reliance Retail).'
      },
      {
        title: 'DuPont Analysis for Quality of Earnings',
        detail: 'Decomposes ROE into Profitability (Net Margin), Efficiency (Asset Turnover), and Leverage (Equity Multiplier) to detect whether high returns are driven by operations or dangerous debt.'
      },
      {
        title: 'Margin of Safety in Valuation',
        detail: 'Buying a stock at a sensible discount to its conservatively estimated intrinsic value provides a defensive cushion against analytical errors or economic downturns.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Fundamental Screening of Reliance Industries (RIL)',
      narrative: `An equity research analyst evaluates Reliance Industries Limited (RIL) across its diversified portfolio: Oil-to-Chemicals (O2C), Reliance Jio Infocomm (telecom & digital services), and Reliance Retail. The analyst extracts RIL's Consolidated Annual Financials: Annual Net Revenue of ₹9,00,000 Crore, EBITDA of ₹1,78,000 Crore (EBITDA margin of 19.8%), and Net Profit of ₹79,000 Crore. Total Shareholder Equity stands at ₹7,90,000 Crore against Net Debt of ₹1,12,000 Crore (Net Debt-to-Equity is comfortable at 0.14x). Looking at Jio, Average Revenue Per User (ARPU) is steadily climbing from ₹181 to ₹195 with negligible subscriber churn, demonstrating an expanding digital moat.`
    },
    calculationHighlight: {
      topic: '3-Way DuPont Return on Equity (ROE) & PEG Ratio Analysis',
      formula: `ROE = Net Profit Margin × Asset Turnover × Equity Multiplier\nROE = (Net Profit / Revenue) × (Revenue / Total Assets) × (Total Assets / Shareholders' Equity)\nPEG Ratio = P/E Ratio / Expected Annual EPS Growth Rate (%)`,
      explanation: 'The DuPont model proves whether a company generates high returns through superior operational margins, brisk asset velocity, or risky financial debt leverage.',
      workedExample: {
        inputs: [
          { label: 'Annual Net Sales (Revenue)', value: '₹2,40,000 Crore' },
          { label: 'Net Profit after Tax (PAT)', value: '₹21,600 Crore' },
          { label: 'Average Total Assets', value: '₹1,80,000 Crore' },
          { label: 'Shareholders\' Net Worth (Equity)', value: '₹1,20,000 Crore' },
          { label: 'Current Market P/E Multiple', value: '24.0x' },
          { label: 'Projected 3-Year EPS Growth Rate', value: '18.0% per annum' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Component 1: Net Profit Margin (Profitability)',
            math: '(₹21,600 / ₹2,40,000) × 100',
            result: '9.00% Net Profit Margin'
          },
          {
            stepNumber: 2,
            title: 'Component 2: Total Asset Turnover (Asset Efficiency)',
            math: '₹2,40,000 / ₹1,80,000',
            result: '1.333x Asset Turnover'
          },
          {
            stepNumber: 3,
            title: 'Component 3: Equity Multiplier (Financial Leverage)',
            math: '₹1,80,000 / ₹1,20,000',
            result: '1.50x Financial Leverage'
          },
          {
            stepNumber: 4,
            title: 'Synthesize Total DuPont ROE',
            math: '9.00% × 1.333 × 1.50',
            result: '18.00% Return on Equity (ROE)'
          },
          {
            stepNumber: 5,
            title: 'Calculate PEG Ratio for Valuation Check',
            math: '24.0 / 18.0',
            result: '1.33 PEG Ratio (Fair Valuation with adequate earnings growth support)'
          }
        ],
        conclusion: 'An 18% ROE achieved with conservative 1.5x leverage and a 9% net margin confirms high-grade operational earnings, while a 1.33 PEG reflects fair market pricing without extreme speculative froth.'
      },
      calculatorId: 'profit-margin-calculator',
      calculatorName: 'Open Profit Margin Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to Fundamental Analysis & Mindset' },
      { number: 2, title: 'Understanding the Annual Report & Auditor Notes' },
      { number: 3, title: 'The Profit & Loss Statement (Income Statement)' },
      { number: 4, title: 'The Balance Sheet: Capital Structure & Net Worth' },
      { number: 5, title: 'The Cash Flow Statement (CFO, CFI, CFF)' },
      { number: 6, title: 'Profitability Ratios: Gross Margin, Operating Margin, PAT Margin' },
      { number: 7, title: 'Return Ratios: ROCE, ROIC and ROA' },
      { number: 8, title: 'DuPont Analysis 3-Step and 5-Step Breakdown' },
      { number: 9, title: 'Liquidity & Solvency Ratios: Current, Quick, Debt-to-Equity' },
      { number: 10, title: 'Operating Ratios: Inventory Turns & Working Capital Days' },
      { number: 11, title: 'Valuation Metrics: P/E, P/B, EV/EBITDA, Dividend Yield' },
      { number: 12, title: 'PEG Ratio & Intrinsic Value Margin of Safety' },
      { number: 13, title: 'Evaluating Management Quality & Corporate Governance' },
      { number: 14, title: 'Identifying Sustainable Competitive Moats' },
      { number: 15, title: 'Red Flags in Accounting & Forensic Screening' },
      { number: 16, title: 'Building a Long-Term Investment Thesis' }
    ]
  },
  {
    id: 'futures-trading',
    moduleNumber: 4,
    title: 'Futures Trading',
    category: 'Derivatives',
    chaptersCount: 13,
    level: 'Advanced',
    accentColor: '#f43f5e',
    badgeClass: 'badge-rose',
    shortDesc: 'Understand exchange-traded futures contracts, SPAN + Exposure margin requirements, daily Mark-to-Market (MTM) settlements, Open Interest analysis, and spot hedging.',
    readingTime: '50 mins',
    calculators: [
      { id: 'percentage-calculator', name: 'Percentage Calculator' },
      { id: 'profit-margin-calculator', name: 'Profit Margin Calculator' }
    ],
    fullOverview: `Futures trading is a major segment of the derivatives market, allowing traders and institutional hedgers to trade standardized contracts on underlying assets (like Nifty 50, Bank Nifty, and select single stocks) for delivery or cash settlement at a predetermined future date. Futures provide embedded financial leverage, meaning a trader can control a large contract value with only a fraction of upfront capital (Initial Margin consisting of SPAN margin and Exposure margin). In this module, you will learn the mechanics of exchange lot sizes, monthly expiry cycles (last Thursday of every month), Fair Value pricing via Cost of Carry (Interest rate minus dividends), Spot-Futures Basis, Contango vs Backwardation, Open Interest (OI) dynamics (Long Buildup, Short Covering, Short Buildup, Long Unwinding), and the daily Mark-to-Market (MTM) cash settlement process enforced by Clearing Corporations.`,
    coreConcepts: [
      {
        title: 'Standardized Contract Specifications',
        detail: 'Underlying asset, fixed lot size (e.g. 25 units for Nifty 50), tick size (₹0.05), and specific expiration dates set by NSE/BSE.'
      },
      {
        title: 'Initial Margin Architecture (SPAN + Exposure)',
        detail: 'SPAN (Standard Portfolio Analysis of Risk) margin covers worst-case single-day portfolio volatility, while Exposure margin buffers against tail-risk swings.'
      },
      {
        title: 'Daily Mark-to-Market (MTM) Settlement',
        detail: 'Every single trading day at 3:30 PM, all open futures positions are marked to the official daily settlement price. Daily profits are credited in cash to your ledger, while losses are directly debited.'
      },
      {
        title: 'Cost of Carry & Basis Mechanics',
        detail: 'Futures Price = Spot Price × (1 + Risk-free Rate - Dividend Yield). When futures trade at a premium to spot, it is in Contango; when at a discount, it is in Backwardation.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Multi-Day Long on Nifty 50 Futures',
      narrative: `Trader Priya is bullish on the Indian economy following robust corporate earnings and GST collections. With Nifty 50 cash spot at 25,180, Priya buys 1 lot of Nifty Current Month Futures (Lot Size = 25 units) at 25,200. The broker requires a combined SPAN + Exposure margin of ₹1,26,000 to initiate the position. Priya holds the trade over 3 sessions before closing her position at 25,450 points.`
    },
    calculationHighlight: {
      topic: 'Contract Exposure, Leverage Ratio & Daily Mark-to-Market (MTM) Cash Flows',
      formula: `Total Contract Value = Futures Price × Lot Size\nLeverage Multiple = Total Contract Value / Upfront Margin Paid\nDaily MTM Gain/Loss = (Daily Settlement Price - Previous Settlement Price) × Lot Size`,
      explanation: 'Mark-to-Market recalculates account equity every day, eliminating counterparty credit default risk across the entire national clearing ecosystem.',
      workedExample: {
        inputs: [
          { label: 'Entry Contract Price', value: '25,200 points (Nifty 50 Futures)' },
          { label: 'Lot Size', value: '25 units per lot' },
          { label: 'Upfront Margin Deposited', value: '₹1,26,000' },
          { label: 'Day 1 Settlement Close', value: '25,320 points (+120 points move)' },
          { label: 'Day 2 Settlement Close', value: '25,280 points (-40 points move)' },
          { label: 'Day 3 Exit Price', value: '25,450 points (+170 points move)' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Total Contract Value & Leverage',
            math: 'Contract Value = 25,200 × 25 = ₹6,30,000. Leverage = ₹6,30,000 / ₹1,26,000',
            result: '₹6,30,000 Exposure (5.0x Effective Leverage)'
          },
          {
            stepNumber: 2,
            title: 'Day 1 MTM Cash Settlement',
            math: '(25,320 - 25,200) × 25 = +120 points × 25',
            result: '+₹3,000 Cash Credited to Ledger'
          },
          {
            stepNumber: 3,
            title: 'Day 2 MTM Cash Settlement',
            math: '(25,280 - 25,320) × 25 = -40 points × 25',
            result: '-₹1,000 Cash Debited from Ledger'
          },
          {
            stepNumber: 4,
            title: 'Day 3 Realized Exit Settlement',
            math: '(25,450 - 25,280) × 25 = +170 points × 25',
            result: '+₹4,250 Cash Credited upon Position Close'
          },
          {
            stepNumber: 5,
            title: 'Net Cumulative Trade P&L & Return on Margin',
            math: '+₹3,000 - ₹1,000 + ₹4,250 = +₹6,250. Return = (₹6,250 / ₹1,26,000) × 100',
            result: '+₹6,250 Net Profit (+4.96% Return on ₹1,26,000 Margin)'
          }
        ],
        conclusion: 'Due to 5x leverage, a 0.99% upward move in the underlying Nifty index (from 25,200 to 25,450) produced a 4.96% return on the trader\'s capital.'
      },
      calculatorId: 'percentage-calculator',
      calculatorName: 'Open Percentage Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to Forwards and Futures' },
      { number: 2, title: 'Contract Specifications & Terminology' },
      { number: 3, title: 'Margin Architecture: SPAN and Exposure' },
      { number: 4, title: 'The Daily Mark-to-Market (MTM) Settlement' },
      { number: 5, title: 'Futures Pricing Model: Cost of Carry & Fair Value' },
      { number: 6, title: 'Spot-Futures Parity, Basis & Arbitrage' },
      { number: 7, title: 'Open Interest (OI) & Volume Relationship' },
      { number: 8, title: 'Four Market Regimes: Long Buildup to Short Covering' },
      { number: 9, title: 'Hedging Stock Portfolios with Index Futures' },
      { number: 10, title: 'Calculating Portfolio Beta & Hedge Ratio' },
      { number: 11, title: 'Rollover Analysis on Expiry Week' },
      { number: 12, title: 'Physical Delivery vs Cash Settlement Framework' },
      { number: 13, title: 'Risk Management Protocols in Futures Trading' }
    ]
  },
  {
    id: 'option-theory',
    moduleNumber: 5,
    title: 'Options Theory for Professional Trading',
    category: 'Derivatives',
    chaptersCount: 25,
    level: 'Advanced',
    accentColor: '#8b5cf6',
    badgeClass: 'badge-violet',
    shortDesc: 'Demystify Call & Put options contracts, Moneyness (ITM, ATM, OTM), Intrinsic vs Extrinsic Time Value, Black-Scholes pricing, Implied Volatility (IV), and the Option Greeks.',
    readingTime: '65 mins',
    calculators: [
      { id: 'percentage-calculator', name: 'Percentage Calculator' },
      { id: 'roi-calculator', name: 'ROI Calculator' }
    ],
    fullOverview: `Options are financial derivative contracts that confer upon the buyer the right, but not the obligation, to buy (Call Option - CE) or sell (Put Option - PE) an underlying security at a fixed strike price on or before a specified expiry date. For this privilege, the option buyer pays a non-refundable upfront cash premium to the option seller (writer), who assumes the contractual obligation. In this module, you will master Moneyness: In-the-Money (ITM), At-the-Money (ATM), and Out-of-the-Money (OTM), dissect Option Premium into Intrinsic Value and Extrinsic (Time) Value, analyze Implied Volatility (IV) and historical volatility, and delve into the mathematical Black-Scholes-Merton (BSM) formula. You will thoroughly dissect the Option Greeks: Delta (directional sensitivity), Gamma (rate of delta change), Theta (time decay drag), Vega (volatility sensitivity), and Rho (interest rate impact).`,
    coreConcepts: [
      {
        title: 'Asymmetry of Rights vs Obligations',
        detail: 'Option Buyers have limited defined risk (the premium paid) and unlimited theoretical upside. Option Sellers have capped profit (the premium received) and substantial tail-risk.'
      },
      {
        title: 'Moneyness & Premium Anatomy',
        detail: 'Option Premium = Intrinsic Value (immediate real worth if exercised today) + Extrinsic Time Value (the price of time and volatility uncertainty).'
      },
      {
        title: 'The Five Option Greeks',
        detail: 'Delta (Δ) measures price change per ₹1 stock move; Gamma (Γ) measures delta acceleration; Theta (Θ) measures daily time erosion; Vega (ν) measures sensitivity to 1% IV shift; Rho (ρ) measures interest rate impact.'
      },
      {
        title: 'Implied Volatility (IV) & Volatility Skew',
        detail: 'IV represents the market\'s annualized forecast of future price dispersion backed out from current market prices using the Black-Scholes model.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Analyzing Nifty 24,900 Call Option (CE)',
      narrative: `With Nifty cash spot index quoting at 25,020, a derivatives trader analyzes the 24,900 Call Option expiring in 6 days. The current market premium is quoting at ₹210 per unit. Because the strike (24,900) is below spot (25,020), this call option is In-the-Money (ITM). The trader evaluates the Option Greeks: Delta = +0.62, Gamma = +0.0016, Theta = -₹14.00 per day, and Vega = +₹8.50 per 1% change in IV. The trader expects Nifty to jump 80 points overnight following positive macroeconomic data.`
    },
    calculationHighlight: {
      topic: 'Intrinsic Value Decomposition & Delta-Gamma-Theta Premium Shift',
      formula: `Call Intrinsic Value = Max[0, Spot Price - Strike Price]\nTime Value (Extrinsic) = Market Premium - Intrinsic Value\nEstimated Premium Change ≈ (Delta × ΔS) + [ 0.5 × Gamma × (ΔS)² ] + (Theta × Δt)`,
      explanation: 'Separating intrinsic value from time value and combining Delta, Gamma, and Theta allows traders to predict how an option premium will reprice overnight.',
      workedExample: {
        inputs: [
          { label: 'Current Nifty Spot Price', value: '25,020 points' },
          { label: 'Option Strike Price', value: '24,900 CE (In-The-Money)' },
          { label: 'Current Option Market Premium', value: '₹210.00' },
          { label: 'Greeks', value: 'Delta = 0.62, Gamma = 0.0016, Theta = -₹14.00/day' },
          { label: 'Projected Overnight Move (ΔS)', value: '+80 index points (Spot rises to 25,100)' },
          { label: 'Time Elapsed (Δt)', value: '1 full day passed' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Decompose Current Premium into Intrinsic & Time Value',
            math: 'Intrinsic = 25,020 - 24,900 = ₹120.00. Time Value = ₹210.00 - ₹120.00',
            result: 'Intrinsic: ₹120.00 | Extrinsic Time Value: ₹90.00'
          },
          {
            stepNumber: 2,
            title: 'Calculate Linear Delta Gain',
            math: '0.62 × 80 points',
            result: '+₹49.60 gain from Delta'
          },
          {
            stepNumber: 3,
            title: 'Calculate Second-Order Gamma Boost',
            math: '0.5 × 0.0016 × (80)² = 0.0008 × 6,400',
            result: '+₹5.12 extra gain from Gamma acceleration'
          },
          {
            stepNumber: 4,
            title: 'Deduct 1-Day Theta Time Decay',
            math: '-₹14.00 × 1 day',
            result: '-₹14.00 loss from Theta erosion'
          },
          {
            stepNumber: 5,
            title: 'Synthesize Estimated New Option Premium',
            math: '₹210.00 + ₹49.60 + ₹5.12 - ₹14.00',
            result: '₹250.72 (+₹40.72 Net Gain per unit or +₹1,018 per 25-unit lot)'
          }
        ],
        conclusion: 'Even after surrendering ₹14 to inevitable overnight time decay, the 80-point index surge combined with positive gamma expands the premium from ₹210.00 to ₹250.72 (+19.4% gain).'
      },
      calculatorId: 'percentage-calculator',
      calculatorName: 'Open Percentage Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to Options & Derivative Payoffs' },
      { number: 2, title: 'Call Option (CE) Buying and Selling Fundamentals' },
      { number: 3, title: 'Put Option (PE) Buying and Selling Fundamentals' },
      { number: 4, title: 'Moneyness: In-the-Money (ITM), ATM & OTM' },
      { number: 5, title: 'Intrinsic Value vs Extrinsic Time Value Breakdown' },
      { number: 6, title: 'Option Greeks Overview & Practical Importance' },
      { number: 7, title: 'Delta (Δ): Directional Sensitivity & Hedge Ratio' },
      { number: 8, title: 'Delta as a Proxy for Probability of Expiry ITM' },
      { number: 9, title: 'Gamma (Γ): The Acceleration of Delta' },
      { number: 10, title: 'Gamma Risk in Expiry Week (Hero-to-Zero Moves)' },
      { number: 11, title: 'Theta (Θ): The Inevitable Cost of Time Decay' },
      { number: 12, title: 'Theta Decay Curve: Why Decay Accelerates near Expiry' },
      { number: 13, title: 'Vega (ν): Sensitivity to Implied Volatility' },
      { number: 14, title: 'Rho (ρ): Interest Rate Sensitivity' },
      { number: 15, title: 'Historical Volatility vs Implied Volatility (IV)' },
      { number: 16, title: 'Understanding India VIX & Option Premium Inflation' },
      { number: 17, title: 'The Black-Scholes-Merton (BSM) Mathematical Formula' },
      { number: 18, title: 'Calculating Fair Option Value with BSM' },
      { number: 19, title: 'The Volatility Smile, Smirk and Skew in Nifty' },
      { number: 20, title: 'Put-Call Ratio (PCR) as a Contrarian Market Indicator' },
      { number: 21, title: 'Max Pain Theory & Strike Concentration Analysis' },
      { number: 22, title: 'Open Interest Clues across Option Chains' },
      { number: 23, title: 'Weekly vs Monthly Expiry Option Dynamics' },
      { number: 24, title: 'STT on Exercised In-The-Money Options in India' },
      { number: 25, title: 'Synthesizing Greeks into an Edge: Risk Checklist' }
    ]
  },
  {
    id: 'option-strategies',
    moduleNumber: 6,
    title: 'Option Strategies',
    category: 'Derivatives',
    chaptersCount: 14,
    level: 'Advanced',
    accentColor: '#06b6d4',
    badgeClass: 'badge-cyan',
    shortDesc: 'Construct multi-leg option spreads: Bull Call Spreads, Bear Put Spreads, Iron Condors, Straddles, Strangles, and Credit Spreads with defined risk and capped margin.',
    readingTime: '55 mins',
    calculators: [
      { id: 'profit-margin-calculator', name: 'Profit Margin Calculator' },
      { id: 'roi-calculator', name: 'ROI Calculator' }
    ],
    fullOverview: `Rather than relying solely on naked directional options that suffer from relentless time decay or unlimited tail-risk, experienced traders construct multi-leg option spreads. These structured combinations allow traders to monetize directional views, volatility expansions, or sideways consolidation with strictly defined maximum loss and defined profit parameters. In this module, you will learn how to design and execute directional spreads (Bull Call Spread, Bear Put Spread), neutral income strategies (Iron Condor, Iron Butterfly, Calendar Spreads), volatility breakout strategies (Long Straddle, Long Strangle), and credit harvesting structures (Bull Put Credit Spread, Bear Call Credit Spread). You will master calculating precise Breakeven points, Margin benefit under exchange multi-leg rules, Risk-to-Reward profiles, and trade management adjustment rules.`,
    coreConcepts: [
      {
        title: 'Spread Trading vs Naked Positions',
        detail: 'Simultaneously buying and selling options on the same underlying with different strikes or expiries caps both maximum loss and maximum profit while drastically lowering margin requirements.'
      },
      {
        title: 'Debit Spreads vs Credit Spreads',
        detail: 'Debit Spreads involve a net cash outflow upfront and benefit from directional expansion. Credit Spreads collect a net cash credit upfront and profit if the underlying stays outside the short strikes.'
      },
      {
        title: 'Iron Condor: The Ultimate Neutral Strategy',
        detail: 'Combines an Out-of-the-Money Bull Put Credit Spread with an Out-of-the-Money Bear Call Credit Spread, generating consistent income when the underlying index consolidates within a wide range.'
      },
      {
        title: 'Adjustment Protocols & Roll Mechanics',
        detail: 'Defending breached strikes by rolling tested wings further out or converting vertical spreads into calendars to minimize maximum adverse excursion.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Deploying an Iron Condor on Nifty 50',
      narrative: `Nifty 50 is trading at 25,000 with India VIX elevated at 15.2% ahead of weekly expiry. Trader Vikram anticipates that Nifty will consolidate within a 600-point corridor between 24,700 and 25,300 over the next 4 trading sessions. To harvest rich time decay with strictly defined risk, Vikram deploys a 4-leg Iron Condor (Lot size = 25 units): Leg 1: Sell 25,200 CE @ ₹45 | Leg 2: Buy 25,400 CE @ ₹12 (Call Wing) | Leg 3: Sell 24,800 PE @ ₹42 | Leg 4: Buy 24,600 PE @ ₹10 (Put Wing).`
    },
    calculationHighlight: {
      topic: 'Net Credit, Maximum Profit, Maximum Loss & Breakeven Analysis for an Iron Condor',
      formula: `Net Credit per Unit = (Sell Call - Buy Call) + (Sell Put - Buy Put)\nMax Profit = Net Credit × Lot Size\nWing Width = Buy Strike - Sell Strike\nMax Loss = (Wing Width - Net Credit) × Lot Size\nUpper Breakeven = Short Call Strike + Net Credit\nLower Breakeven = Short Put Strike - Net Credit`,
      explanation: 'With an Iron Condor, the trader extracts maximum profit if the market expires anywhere between the two short strikes, with losses strictly capped if a massive black swan breakout occurs.',
      workedExample: {
        inputs: [
          { label: 'Current Nifty Spot', value: '25,000 points' },
          { label: 'Call Wing (Leg 1 & 2)', value: 'Sell 25,200 CE @ ₹45, Buy 25,400 CE @ ₹12 (Wing = 200 pts)' },
          { label: 'Put Wing (Leg 3 & 4)', value: 'Sell 24,800 PE @ ₹42, Buy 24,600 PE @ ₹10 (Wing = 200 pts)' },
          { label: 'Nifty Lot Size', value: '25 units per lot' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Net Credit Collected per Unit',
            math: '(₹45 - ₹12) + (₹42 - ₹10) = ₹33 (Call Credit) + ₹32 (Put Credit)',
            result: '₹65.00 Net Credit per Unit'
          },
          {
            stepNumber: 2,
            title: 'Calculate Maximum Potential Profit',
            math: '₹65.00 × 25 units',
            result: '+₹1,625.00 Max Profit per lot'
          },
          {
            stepNumber: 3,
            title: 'Calculate Maximum Defined Risk (Max Loss)',
            math: '(200 points Wing Width - 65 points Credit) × 25 units = 135 × 25',
            result: '-₹3,375.00 Max Loss per lot (strictly capped)'
          },
          {
            stepNumber: 4,
            title: 'Calculate Breakeven Boundaries',
            math: 'Upper BE = 25,200 + 65 = 25,265. Lower BE = 24,800 - 65 = 24,735',
            result: 'Profitable between 24,735 and 25,265 (530-point safe zone)'
          }
        ],
        conclusion: 'As long as Nifty closes between 24,735 and 25,265 on weekly expiry day, Vikram locks in a profit, collecting up to the full ₹1,625 without any overnight liquidation threat.'
      },
      calculatorId: 'profit-margin-calculator',
      calculatorName: 'Open Profit Margin Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to Multi-Leg Option Strategies' },
      { number: 2, title: 'Bull Call Spread: Directional Upside with Capped Cost' },
      { number: 3, title: 'Bear Put Spread: Hedging Downside with Reduced Premium' },
      { number: 4, title: 'Bull Put Credit Spread: Income Generation on Upward Bias' },
      { number: 5, title: 'Bear Call Credit Spread: Profiting from Downward Drift' },
      { number: 6, title: 'The Long Straddle: Exploiting Massive Volatility Breakouts' },
      { number: 7, title: 'The Short Straddle: Capturing Rich Volatility Crush' },
      { number: 8, title: 'Long & Short Strangle Mechanics' },
      { number: 9, title: 'The Iron Condor: The Flagship Non-Directional Income Engine' },
      { number: 10, title: 'The Iron Butterfly: High Credit on Tight Range Targets' },
      { number: 11, title: 'Calendar & Diagonal Spreads (Time Spread Engineering)' },
      { number: 12, title: 'Ratio Spreads & Backspreads' },
      { number: 13, title: 'Margin Optimization & Exchange Hedge Benefits' },
      { number: 14, title: 'Active Trade Management & Defending Breached Wings' }
    ]
  },
  {
    id: 'markets-and-taxation',
    moduleNumber: 7,
    title: 'Markets and Taxation',
    category: 'Tax & Regulatory',
    chaptersCount: 8,
    level: 'Beginner - Intermediate',
    accentColor: '#eab308',
    badgeClass: 'badge-amber',
    shortDesc: 'Navigate Indian securities taxation under the latest Union Budget. Master Section 112A LTCG (12.5%), Section 111A STCG (20%), F&O business income, turnover calculation, and ITR filing.',
    readingTime: '40 mins',
    calculators: [
      { id: 'income-tax-calculator-india', name: 'Income Tax Calculator (India)' },
      { id: 'gst-calculator', name: 'GST Calculator' }
    ],
    fullOverview: `Understanding tax rules and regulatory compliance is vital to preserving net returns. In India, taxation on trading and investments depends on holding duration, instrument classification, and transaction intent. Under the updated Union Budget framework, equity investments held for over 12 months qualify as Long-Term Capital Gains (LTCG under Section 112A), taxed at 12.5% on gains exceeding the ₹1.25 Lakh annual exemption threshold. Equity investments held under 12 months incur Short-Term Capital Gains (STCG under Section 111A) at a flat 20%. Intraday equity trading is classified as Speculative Business Income, while Futures and Options (F&O) trading is classified as Non-Speculative Business Income under Section 43(5). In this module, you will learn how to compute business turnover under CBDT guidelines, set off and carry forward capital and business losses, calculate eligible business expense deductions, understand Section 44AB tax audit limits, and select the correct tax filing form (ITR-2 vs ITR-3).`,
    coreConcepts: [
      {
        title: 'Capital Gains vs Business Income',
        detail: 'Delivery equity = Capital Gains (STCG/LTCG). Intraday equity = Speculative Business. F&O derivatives = Non-Speculative Business Income.'
      },
      {
        title: 'Union Budget Updated Capital Gains Rates',
        detail: 'Equity LTCG (>12 months) = 12.5% above ₹1.25 Lakh exemption limit. Equity STCG (<12 months) = 20% flat. Cess of 4% applies to all tax liabilities.'
      },
      {
        title: 'Turnover Calculation for F&O Derivatives',
        detail: 'Turnover equals the absolute sum of positive and negative P&Ls across all trades, plus premium received on options sold. This determines Section 44AB audit applicability.'
      },
      {
        title: 'Loss Set-Off & Carry Forward Rules',
        detail: 'LTCG losses can only offset LTCG. STCG losses can offset both STCG and LTCG. F&O business losses can offset any business income and carry forward for 8 consecutive Assessment Years.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Tax Computation for Investor Anita & F&O Trader Kunal',
      narrative: `Anita invested in Reliance and TCS shares and sold them after 18 months, realizing a Long-Term Capital Gain of ₹2,80,000. She also made ₹50,000 in Short-Term Capital Gains from swing trades held for 3 months. Kunal, on the other hand, is an active F&O index trader who generated ₹3,40,000 in gross trading profits, paid ₹45,000 in brokerage, STT, and exchange turnover fees, and incurred ₹25,000 in trading software subscriptions and advisory charges. Both need to determine their tax liabilities and filing obligations for FY 2024-25.`
    },
    calculationHighlight: {
      topic: 'Section 112A LTCG Tax with ₹1.25 Lakh Exemption & F&O Net Business Income',
      formula: `Taxable LTCG = Max[0, Total Equity LTCG - ₹1,25,000]\nTotal LTCG Tax = Taxable LTCG × 12.5% × 1.04 (incl. 4% Health & Education Cess)\nTotal STCG Tax = Total Equity STCG × 20.0% × 1.04\nNet F&O Business Income = Gross Trading Profits - Legitimate Business Expenses`,
      explanation: 'Applying the ₹1.25 Lakh statutory exemption under Section 112A and deducting legitimate business expenses shields significant earnings from unnecessary taxation.',
      workedExample: {
        inputs: [
          { label: 'Anita\'s Long-Term Capital Gain', value: '₹2,80,000 (holding > 12 months)' },
          { label: 'Anita\'s Short-Term Capital Gain', value: '₹50,000 (holding < 12 months)' },
          { label: 'Kunal\'s Gross F&O Profit', value: '₹3,40,000' },
          { label: 'Kunal\'s Deductible Business Expenses', value: '₹45,000 (brokerage/turnover) + ₹25,000 (software/tools) = ₹70,000' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Compute Anita\'s Taxable LTCG',
            math: '₹2,80,000 - ₹1,25,000 statutory exemption',
            result: '₹1,55,000 Net Taxable LTCG'
          },
          {
            stepNumber: 2,
            title: 'Compute Anita\'s LTCG Tax Payable',
            math: '₹1,55,000 × 12.5% = ₹19,375. With 4% Cess: ₹19,375 × 1.04',
            result: '₹20,150 Total LTCG Tax'
          },
          {
            stepNumber: 3,
            title: 'Compute Anita\'s STCG Tax Payable',
            math: '₹50,000 × 20.0% = ₹10,000. With 4% Cess: ₹10,000 × 1.04',
            result: '₹10,400 Total STCG Tax (Total Tax = ₹30,550)'
          },
          {
            stepNumber: 4,
            title: 'Compute Kunal\'s Net F&O Taxable Business Income',
            math: '₹3,40,000 Gross Profit - ₹70,000 Legitimate Expenses',
            result: '₹2,70,000 Net Business Income (Taxed at individual slab rates in ITR-3)'
          }
        ],
        conclusion: 'Anita pays ₹30,550 total capital gains tax, while Kunal reduces his taxable trading income from ₹3,40,000 down to ₹2,70,000 by claiming legitimate operational expense deductions.'
      },
      calculatorId: 'income-tax-calculator-india',
      calculatorName: 'Open Income Tax Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Classification of Market Income: Capital Gains vs Business' },
      { number: 2, title: 'Section 112A LTCG: 12.5% Tax Rate & ₹1.25L Exemption' },
      { number: 3, title: 'Section 111A STCG: 20% Flat Rate Mechanics' },
      { number: 4, title: 'Intraday Equity as Speculative Business Income' },
      { number: 5, title: 'F&O Derivatives as Non-Speculative Business Income' },
      { number: 6, title: 'Calculating F&O Turnover (CBDT Absolute Method)' },
      { number: 7, title: 'Tax Audit Mandates under Section 44AB & Presumptive Tax 44AD' },
      { number: 8, title: 'Loss Set-Off, Carry Forward Rules & Filing ITR-2 vs ITR-3' }
    ]
  },
  {
    id: 'commodities-currency-government-securities',
    moduleNumber: 8,
    title: 'Currency, Commodity, and Government Securities',
    category: 'Alternative Assets',
    chaptersCount: 20,
    level: 'Intermediate - Advanced',
    accentColor: '#14b8a6',
    badgeClass: 'badge-cyan',
    shortDesc: 'Expand beyond equities: Trade MCX commodities (Gold, Silver, Crude Oil), NSE currency derivatives (USD/INR), and invest in sovereign Government Securities (G-Secs) via RBI Retail Direct.',
    readingTime: '55 mins',
    calculators: [
      { id: 'simple-interest-calculator', name: 'Simple Interest Calculator' },
      { id: 'fd-calculator', name: 'FD Calculator' }
    ],
    fullOverview: `Broaden your market mastery beyond equities into the global macro arenas of commodities, foreign exchange (forex), and sovereign fixed income. In this module, you will explore commodity trading on the Multi Commodity Exchange of India (MCX): Precious Metals (Gold 1kg, Gold Mini, Silver), Energy (Crude Oil, Natural Gas), and Base Metals (Copper, Zinc, Aluminium), including contract multipliers, inventory supply cycles, physical delivery tender periods, and geopolitical drivers. You will study exchange-traded currency derivatives on the NSE/BSE: USD/INR, EUR/INR, GBP/INR, and JPY/INR, tick values, interest rate parity, and RBI foreign exchange reserve interventions. Finally, you will discover the Government Securities (G-Sec) market: Treasury Bills (91, 182, 364 days), Dated Sovereign Bonds, State Development Loans (SDLs), and how retail investors can buy sovereign bonds directly through RBI Retail Direct with zero default risk.`,
    coreConcepts: [
      {
        title: 'MCX Commodity Multipliers & Margin Dynamics',
        detail: 'Commodity contracts feature large underlying physical sizes (e.g. 100 barrels for Crude Oil, 1 kg for Gold), requiring strict margin monitoring during international market overlaps.'
      },
      {
        title: 'Currency Futures Tick Mechanics',
        detail: 'USD/INR trades in lot sizes of $1,000 with a tick size of 0.25 paisa (₹0.0025), creating a fixed tick value of ₹2.50 per lot.'
      },
      {
        title: 'Sovereign Debt (G-Secs) & T-Bills',
        detail: 'Government of India bonds offer absolute sovereign safety (zero credit risk), semi-annual coupon distributions, and predictable compounding for conservative retirement portfolios.'
      },
      {
        title: 'Interest Rate Parity & Macro Linkages',
        detail: 'How US Federal Reserve interest rates, domestic RBI repo rates, and crude oil import bills influence the rupee exchange rate and domestic inflation.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Importer Hedges USD/INR & Saver Invests in 10-Year G-Sec',
      narrative: `Amit runs a technology hardware import business in Mumbai. He must pay $1,00,000 to an international vendor in 3 months. To protect against rupee depreciation, Amit buys 100 lots of USD/INR 3-month Futures (Contract size: $1,000 per lot = $1,00,000 total exposure) at ₹83.80. Over the 3 months, the rupee weakens to ₹84.15 per dollar. Simultaneously, a conservative saver, Suman, purchases ₹5,00,000 face value of the 7.18% GS 2033 Sovereign Bond on the RBI Retail Direct platform to lock in dependable retirement income.`
    },
    calculationHighlight: {
      topic: 'Currency Futures Tick Value P&L & Semi-Annual Sovereign Bond Coupon Yield',
      formula: `USD/INR Tick Value per Lot = 0.0025 (tick size) × $1,000 = ₹2.50 per lot\nCurrency P&L = (Exit Price - Entry Price) × Total Currency Exposure\nSemi-Annual G-Sec Coupon Payment = (Face Value × Annual Coupon Rate) / 2`,
      explanation: 'Understanding exact tick values in currency futures and cash distribution dates for sovereign bonds enables precise macro hedging and cashflow planning.',
      workedExample: {
        inputs: [
          { label: 'Amit\'s USD/INR Position', value: '100 Lots (100 × $1,000 = $1,00,000 exposure)' },
          { label: 'Entry Price vs Exit Price', value: 'Bought @ ₹83.8000 | Settled @ ₹84.1500 (+₹0.3500 or 140 ticks)' },
          { label: 'Suman\'s G-Sec Bond Investment', value: '₹5,00,000 Face Value in 7.18% GS 2033 Sovereign Bond' },
          { label: 'Coupon Frequency', value: 'Semi-Annual (every 6 months)' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Currency Gain per Lot',
            math: '140 ticks × ₹2.50 per tick',
            result: '₹350.00 Profit per Lot'
          },
          {
            stepNumber: 2,
            title: 'Calculate Total Currency Hedge Gain',
            math: '100 lots × ₹350.00 = $1,00,000 × (₹84.15 - ₹83.80)',
            result: '+₹35,000 Net Currency Gain (Fully offsets the higher import invoice cost)'
          },
          {
            stepNumber: 3,
            title: 'Calculate Semi-Annual G-Sec Cash Coupon',
            math: '(₹5,00,000 × 7.18%) / 2 = ₹35,900 / 2',
            result: '₹17,950 Guaranteed Cashflow credited directly every 6 months'
          }
        ],
        conclusion: 'Amit insulated his commercial profit margins against currency volatility via USD/INR futures, while Suman secured a sovereign-guaranteed ₹35,900 annual income stream from the Government of India.'
      },
      calculatorId: 'simple-interest-calculator',
      calculatorName: 'Open Simple Interest Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to Commodity Markets & MCX Ecosystem' },
      { number: 2, title: 'Bullion Trading: Gold and Silver Contracts' },
      { number: 3, title: 'Energy Derivatives: Crude Oil & Natural Gas Mechanics' },
      { number: 4, title: 'Base Metals: Copper, Zinc & Global Supply Chains' },
      { number: 5, title: 'Physical Delivery, Tender Periods & Warehouse Receipts' },
      { number: 6, title: 'Introduction to Currency Trading & Forex Pairs' },
      { number: 7, title: 'USD/INR Futures: Tick Value & Lot Sizes' },
      { number: 8, title: 'EUR/INR, GBP/INR and JPY/INR Cross-Currency Contracts' },
      { number: 9, title: 'Factors Influencing Rupee Exchange Rate & RBI Operations' },
      { number: 10, title: 'Forex Hedging Strategies for Importers & Exporters' },
      { number: 11, title: 'Overview of Indian Fixed Income & Bond Markets' },
      { number: 12, title: 'Government Securities (G-Secs) vs State Development Loans (SDLs)' },
      { number: 13, title: 'Treasury Bills (T-Bills): 91, 182 and 364 Day Paper' },
      { number: 14, title: 'Yield-to-Maturity (YTM) & Bond Pricing Dynamics' },
      { number: 15, title: 'Bond Clean Price vs Dirty Price (Accrued Interest)' },
      { number: 16, title: 'Interest Rate Risk, Duration & Convexity' },
      { number: 17, title: 'The Sovereign Yield Curve as an Economic Barometer' },
      { number: 18, title: 'RBI Retail Direct Platform: How Citizens Buy G-Secs' },
      { number: 19, title: 'Sovereign Gold Bonds (SGB): Interest + Gold Appreciation' },
      { number: 20, title: 'Building a Multi-Asset Defensive Macro Portfolio' }
    ]
  },
  {
    id: 'risk-management',
    moduleNumber: 9,
    title: 'Risk Management and Trading Psychology',
    category: 'Psychology & Risk',
    chaptersCount: 16,
    level: 'All Levels',
    accentColor: '#ec4899',
    badgeClass: 'badge-rose',
    shortDesc: 'Survive and compound: Implement the 1% portfolio risk rule, calculate exact position sizing, establish asymmetric Risk-to-Reward (R:R), and conquer cognitive trading biases.',
    readingTime: '45 mins',
    calculators: [
      { id: 'percentage-calculator', name: 'Percentage Calculator' },
      { id: 'profit-margin-calculator', name: 'Profit Margin Calculator' }
    ],
    fullOverview: `In trading and investing, offense sells tickets, but defense wins championships. The overwhelming majority of retail market participants suffer capital loss not because of inferior chart analysis, but due to reckless position sizing, lack of risk control, and emotional derailment. In this module, you will master the foundational risk rules of elite hedge funds: the 1% Maximum Account Risk Rule, fixed fractional position sizing, determining technical stop losses before order entry, and enforcing favorable Risk-to-Reward (R:R) ratios (minimum 1:2). You will also explore behavioral finance and cognitive psychology: loss aversion (Kahneman & Tversky), disposition effect (cutting winners too early while holding losers), revenge trading after stop-outs, overconfidence following winning streaks, and the discipline of maintaining a detailed quantitative trading journal.`,
    coreConcepts: [
      {
        title: 'The 1% Rule of Capital Preservation',
        detail: 'Never risk losing more than 1% of your total trading capital on any single trading trade. Even a brutal 10-trade losing streak leaves over 90% of your account intact.'
      },
      {
        title: 'Position Sizing as the True Risk Dial',
        detail: 'Your stop-loss distance determines how many shares you buy, not the other way around. Never enter a position without an objective technical exit level.'
      },
      {
        title: 'Asymmetric Risk-to-Reward (R:R)',
        detail: 'With a 1:2.5 Risk-to-Reward ratio, you can be wrong on 65% of your trades and still generate positive net portfolio compounding.'
      },
      {
        title: 'Cognitive Biases in Live Markets',
        detail: 'Recognizing loss aversion, FOMO (Fear of Missing Out), confirmation bias, and the gambler\'s fallacy allows you to execute with emotionless consistency.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Position Sizing on State Bank of India (SBIN)',
      narrative: `Trader Karan manages an active swing trading account of ₹10,00,000. Adhering strictly to professional risk management, Karan allows a maximum risk of 1.0% (₹10,000) on any single setup. State Bank of India (SBIN) breaks out above a major resistance at ₹820. Karan identifies an objective technical support stop-loss at ₹804 (risk per share = ₹16.00). His technical upside target is ₹860 (reward per share = ₹40.00). Rather than buying an arbitrary 2,000 shares, Karan calculates the precise share quantity that limits his potential loss to exactly ₹10,000.`
    },
    calculationHighlight: {
      topic: 'Fixed Fractional Position Sizing & Required Breakeven Win Rate',
      formula: `Max Risk Amount (₹) = Total Capital × (Risk % / 100)\nPosition Size (Number of Shares) = Max Risk Amount / (Entry Price - Stop Loss Price)\nRequired Breakeven Win Rate (%) = [ 1 / (1 + Risk-to-Reward Ratio) ] × 100`,
      explanation: 'Sizing your share quantity inversely to your stop-loss distance ensures you never suffer catastrophic portfolio drawdowns, regardless of market volatility.',
      workedExample: {
        inputs: [
          { label: 'Trading Capital', value: '₹10,00,000' },
          { label: 'Maximum Risk Limit per Trade', value: '1.0% (₹10,000 maximum allowable loss)' },
          { label: 'SBIN Entry Price', value: '₹820.00' },
          { label: 'Technical Stop Loss Level', value: '₹804.00 (Risk per share = ₹16.00)' },
          { label: 'Target Price', value: '₹860.00 (Reward per share = ₹40.00 | R:R = 1:2.5)' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Exact Position Size in Shares',
            math: 'Position Size = ₹10,000 Max Risk / ₹16.00 Risk per share',
            result: '625 Shares (Capital Allocated: 625 × ₹820 = ₹5,12,500)'
          },
          {
            stepNumber: 2,
            title: 'Calculate Monetary Outcome if Stop Loss is Hit',
            math: '625 shares × (₹804 - ₹820) = 625 × (-₹16.00)',
            result: '-₹10,000.00 Loss (Precisely 1.0% of ₹10,00,000 account)'
          },
          {
            stepNumber: 3,
            title: 'Calculate Monetary Outcome if Target is Reached',
            math: '625 shares × (₹860 - ₹820) = 625 × (+₹40.00)',
            result: '+₹25,000.00 Gain (+2.5% of account)'
          },
          {
            stepNumber: 4,
            title: 'Compute Required Breakeven Win Rate',
            math: '[1 / (1 + 2.5)] × 100 = (1 / 3.5) × 100',
            result: '28.57% Breakeven Win Rate'
          }
        ],
        conclusion: 'With a 1:2.5 Risk-to-Reward ratio, Karan needs to be right only 29% of the time to break even. If he achieves a 40% win rate across 100 trades, his account grows significantly.'
      },
      calculatorId: 'percentage-calculator',
      calculatorName: 'Open Percentage Calculator'
    },
    chaptersList: [
      { number: 1, title: 'The Primacy of Capital Preservation' },
      { number: 2, title: 'The Mathematics of Ruin: Drawdown Recovery Asymmetry' },
      { number: 3, title: 'The 1% Maximum Account Risk Protocol' },
      { number: 4, title: 'Fixed Fractional Position Sizing in Practice' },
      { number: 5, title: 'Determining Technical vs Arbitrary Stop Losses' },
      { number: 6, title: 'Risk-to-Reward (R:R) Ratios & Mathematical Expectancy' },
      { number: 7, title: 'Trailing Stop Losses & Locking in Unrealized Gains' },
      { number: 8, title: 'Overnight Gap Risk & Volatility Sizing' },
      { number: 9, title: 'Behavioral Finance: Daniel Kahneman\'s Prospect Theory' },
      { number: 10, title: 'Loss Aversion & The Pain of Taking a Stop Loss' },
      { number: 11, title: 'The Disposition Effect: Riding Losers & Selling Winners' },
      { number: 12, title: 'Revenge Trading & The Emotional Downward Spiral' },
      { number: 13, title: 'FOMO, Confirmation Bias & Social Media Hype' },
      { number: 14, title: 'Developing Emotional Resilience & Patience' },
      { number: 15, title: 'Structuring an Audit-Grade Trading Journal' },
      { number: 16, title: 'Weekly Review Routines of Elite Performers' }
    ]
  },
  {
    id: 'trading-systems',
    moduleNumber: 10,
    title: 'Trading Systems',
    category: 'Quant & Systems',
    chaptersCount: 16,
    level: 'Advanced',
    accentColor: '#6366f1',
    badgeClass: 'badge-indigo',
    shortDesc: 'Transition from discretion to quantitative rules: Design mechanical trading systems, backtest with historical data, model transaction slippage, and evaluate Sharpe & Sortino ratios.',
    readingTime: '50 mins',
    calculators: [
      { id: 'percentage-calculator', name: 'Percentage Calculator' },
      { id: 'average-calculator', name: 'Average Calculator' }
    ],
    fullOverview: `Systematic and quantitative trading removes human emotional inconsistency by formalizing trade selection, entry triggers, stop-loss orders, and profit-taking exits into programmatic, rule-based algorithms. A trading system is a complete framework that dictates precisely what to buy, when to buy, how much to buy, and when to exit. In this module, you will learn the end-to-end process of building a mechanical trading system: formulating an economic hypothesis, sourcing clean historical tick and bar data, programming entry and exit logic, modeling realistic market frictions (brokerage, STT, exchange turnover fees, and execution slippage), conducting Walk-Forward optimization, avoiding curve-fitting (over-optimization) and lookahead bias, and stress-testing performance via Monte Carlo simulations. You will evaluate strategies through professional statistical metrics: Expectancy, Profit Factor, Maximum Drawdown (MDD), Sharpe Ratio, and Sortino Ratio.`,
    coreConcepts: [
      {
        title: 'Rule-Based Dispassionate Execution',
        detail: 'Eliminates second-guessing, hesitation, and emotional interference by executing predefined rules automatically via code or rigorous checklists.'
      },
      {
        title: 'Accounting for Market Frictions',
        detail: 'A backtest that ignores bid-ask spread slippage, statutory STT, and exchange transaction fees produces fictitious results. Real systems must survive net of all frictions.'
      },
      {
        title: 'The Danger of Curve-Fitting (Over-Optimization)',
        detail: 'Adding excessive filters to make a backtest look perfect on past data guarantees failure in live future markets. Robust systems rely on simple, economically sound principles.'
      },
      {
        title: 'Sharpe & Sortino Performance Evaluation',
        detail: 'Sharpe ratio measures excess return per unit of total risk; Sortino ratio penalizes only harmful downside volatility, providing a clearer picture of strategy resilience.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Backtesting a 50/200 Trend System on Nifty 50',
      narrative: `A quantitative analyst designs a systematic trend-following strategy on the Nifty 50 Index: Go long when the 50-day EMA crosses above the 200-day EMA (Golden Cross), and exit to cash when the 50-day EMA crosses below the 200-day EMA (Death Cross). The analyst runs a backtest across 10 years (2015 to 2025) comprising 100 completed trades across multiple market regimes, incorporating realistic slippage of 0.05% and full statutory transaction taxes.`
    },
    calculationHighlight: {
      topic: 'System Expectancy, Profit Factor & Annualized Sharpe Ratio',
      formula: `Expectancy per Trade = (Win Rate × Average Win) - (Loss Rate × Average Loss)\nProfit Factor = Total Gross Profits / Total Gross Losses\nSharpe Ratio = (Annualized Strategy Return - Risk-Free Rate) / Annualized Standard Deviation`,
      explanation: 'Expectancy determines the mathematical edge of every rupee risked, while the Profit Factor verifies that overall gross earnings exceed gross losses by a healthy safety buffer.',
      workedExample: {
        inputs: [
          { label: 'Total Sample Trades', value: '100 Trades across 10 Years' },
          { label: 'Winning Trades', value: '45 Trades (45.0% Win Rate)' },
          { label: 'Losing Trades', value: '55 Trades (55.0% Loss Rate)' },
          { label: 'Average Winning Trade', value: '+₹18,000' },
          { label: 'Average Losing Trade', value: '-₹8,000' },
          { label: 'Strategy Annual Return', value: '18.5% p.a. (Annualized Volatility: 12.0%)' },
          { label: 'India Risk-Free Rate (10Y G-Sec)', value: '7.0% p.a.' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Gross Profits and Gross Losses',
            math: 'Gross Profit = 45 × ₹18,000 = ₹8,10,000. Gross Loss = 55 × ₹8,000 = ₹4,40,000',
            result: 'Gross Profit: ₹8,10,000 | Gross Loss: ₹4,40,000'
          },
          {
            stepNumber: 2,
            title: 'Calculate Profit Factor',
            math: '₹8,10,000 / ₹4,40,000',
            result: '1.84 Profit Factor (Solid buffer > 1.50 threshold)'
          },
          {
            stepNumber: 3,
            title: 'Compute Expectancy per Trade',
            math: '(0.45 × ₹18,000) - (0.55 × ₹8,000) = ₹8,100 - ₹4,400',
            result: '+₹3,700 Expected Edge per Trade'
          },
          {
            stepNumber: 4,
            title: 'Calculate Strategy Sharpe Ratio',
            math: '(18.5% - 7.0%) / 12.0% = 11.5% / 12.0%',
            result: '0.958 Sharpe Ratio (Strong risk-adjusted outperformance)'
          }
        ],
        conclusion: 'Even with a modest 45% win rate, the system produces a positive mathematical expectancy of +₹3,700 per trade and a 1.84 Profit Factor, confirming an institutional-grade algorithmic edge.'
      },
      calculatorId: 'percentage-calculator',
      calculatorName: 'Open Percentage Calculator'
    },
    chaptersList: [
      { number: 1, title: 'What is a Trading System? Discretion vs Rules' },
      { number: 2, title: 'Formulating an Economic & Behavioral Hypothesis' },
      { number: 3, title: 'Trend Following vs Mean Reversion Systems' },
      { number: 4, title: 'Data Sourcing, Survivorship Bias & Split Adjustments' },
      { number: 5, title: 'Defining Objective Entry & Exit Criteria' },
      { number: 6, title: 'Modeling Realistic Slippage & Transaction Costs' },
      { number: 7, title: 'System Metrics: Win Rate, Payoff Ratio & Expectancy' },
      { number: 8, title: 'Profit Factor & Maximum Drawdown (MDD) Analysis' },
      { number: 9, title: 'Sharpe, Sortino & Calmar Ratios Explained' },
      { number: 10, title: 'The Pitfall of Curve-Fitting & In-Sample Over-Optimization' },
      { number: 11, title: 'Out-of-Sample Testing & Walk-Forward Validation' },
      { number: 12, title: 'Monte Carlo Simulations for Sequence Risk' },
      { number: 13, title: 'Portfolio Multi-Asset Diversification Systems' },
      { number: 14, title: 'Execution Infrastructure: APIs & Order Routing' },
      { number: 15, title: 'Monitoring Strategy Health & Recognizing System Breakdown' },
      { number: 16, title: 'The Lifecycle of an Algorithmic Trading Strategy' }
    ]
  },
  {
    id: 'personalfinance',
    moduleNumber: 11,
    title: 'Personal Finance - Mutual Funds',
    category: 'Wealth & Personal Finance',
    chaptersCount: 33,
    level: 'Beginner - Intermediate',
    accentColor: '#10b981',
    badgeClass: 'badge-emerald',
    shortDesc: 'Achieve financial freedom through strategic asset allocation, compounding Systematic Investment Plans (SIPs), Direct vs Regular mutual funds, index funds, and portfolio rebalancing.',
    readingTime: '60 mins',
    calculators: [
      { id: 'sip-calculator', name: 'SIP Calculator' },
      { id: 'compound-interest-calculator', name: 'Compound Interest Calculator' }
    ],
    fullOverview: `Personal finance is the science of managing money to achieve short-term milestones and long-term financial independence. Mutual funds are the most effective, accessible vehicle for retail Indian investors to build generational wealth through professional diversification. In this module, you will master SEBI's mutual fund classification framework: Equity Funds (Large Cap, Mid Cap, Small Cap, Flexi Cap, Value, ELSS Tax Savers), Debt Funds (Liquid, Money Market, Corporate Bond, Gilt), and Hybrid Funds (Balanced Advantage, Multi-Asset). You will learn the profound impact of Direct Plans vs Regular Plans, Total Expense Ratio (TER) drag over multi-decade horizons, Systematic Investment Plans (SIP), Step-Up SIP compounding, Systematic Withdrawal Plans (SWP) for retirement income, and rule-based asset allocation rebalancing between equity and fixed income.`,
    coreConcepts: [
      {
        title: 'Asset Allocation as the Primary Return Driver',
        detail: 'Over 90% of long-term investment performance variability is dictated by your split between asset classes (Equity, Debt, Gold), not by individual stock picking.'
      },
      {
        title: 'The Compounding Miracle of Direct Plans',
        detail: 'Direct plans bypass distributor commissions. An apparently small 0.8%–1.0% annual expense ratio savings compounds into tens of lakhs of extra wealth over a 20-year career.'
      },
      {
        title: 'Step-Up Systematic Investment Plans (SIP)',
        detail: 'Increasing your monthly SIP by just 10% each year in tandem with salary increments more than doubles your accumulated retirement corpus.'
      },
      {
        title: 'Active Funds vs Low-Cost Passive Index Funds',
        detail: 'Why index funds and ETFs tracking the Nifty 50 and Nifty Next 50 outperform the vast majority of active mutual fund managers over 10+ year time horizons.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Rahul (Direct Plan) vs Vikram (Regular Plan)',
      narrative: `Two 25-year-old software engineers, Rahul and Vikram, begin investing ₹15,000 every month into a Nifty 50 Index Fund. Rahul invests directly through the fund house website in the Direct-Growth Plan (Expense Ratio = 0.15% p.a.). Vikram invests through a local bank distributor in the Regular-Growth Plan (Expense Ratio = 1.05% p.a. due to ongoing trail commissions). Both invest faithfully for 20 years (240 months). Assuming the underlying Nifty index generates a gross annual market return of 12.0% p.a., Rahul realizes a net return of 11.85% while Vikram realizes 10.95%.`
    },
    calculationHighlight: {
      topic: 'Future Value of Monthly SIP & The Multi-Lakh Cost of Distributor Commissions',
      formula: `Future Value of SIP = P × [ ((1 + i)^n - 1) / i ] × (1 + i)\nwhere P = Monthly SIP, i = Monthly Interest Rate (r / 12), n = Number of Months\nCost of Regular Plan Drag = Direct Accumulated Corpus - Regular Accumulated Corpus`,
      explanation: 'Compounding magnifies even fractional expense ratio differences into enormous wealth disparities over multi-decade investing journeys.',
      workedExample: {
        inputs: [
          { label: 'Monthly SIP Amount', value: '₹15,00,000 every month' },
          { label: 'Investment Timeframe', value: '20 Years (240 monthly installments)' },
          { label: 'Total Capital Invested', value: '₹15,000 × 240 = ₹36,00,000' },
          { label: 'Direct Plan Net Return', value: '11.85% p.a. (TER = 0.15%)' },
          { label: 'Regular Plan Net Return', value: '10.95% p.a. (TER = 1.05% due to 0.90% commission)' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Rahul\'s Direct Plan Corpus at Year 20',
            math: 'P = ₹15,000, i = 0.1185 / 12 = 0.009875, n = 240 months',
            result: '₹1,41,52,000 Accumulated Direct Corpus'
          },
          {
            stepNumber: 2,
            title: 'Calculate Vikram\'s Regular Plan Corpus at Year 20',
            math: 'P = ₹15,000, i = 0.1095 / 12 = 0.009125, n = 240 months',
            result: '₹1,24,68,000 Accumulated Regular Corpus'
          },
          {
            stepNumber: 3,
            title: 'Compute Wealth Lost to Distributor Commissions',
            math: '₹1,41,52,000 - ₹1,24,68,000',
            result: '₹16,84,000 Lost Directly to Commissions!'
          }
        ],
        conclusion: 'For identical ₹36,00,000 invested in the exact same underlying shares, Rahul ends up with ₹16.84 Lakh more wealth simply by choosing the Direct Plan.'
      },
      calculatorId: 'sip-calculator',
      calculatorName: 'Open SIP Calculator'
    },
    chaptersList: [
      { number: 1, title: 'The Foundations of Financial Independence' },
      { number: 2, title: 'Emergency Fund Sizing: 6 Months of Living Expenses' },
      { number: 3, title: 'Budgeting Rules: 50-30-20 Framework & Cashflows' },
      { number: 4, title: 'What is a Mutual Fund? Structure & SEBI Mandates' },
      { number: 5, title: 'Net Asset Value (NAV), Units & Creation Mechanics' },
      { number: 6, title: 'Direct Plan vs Regular Plan: The Compounding Cost' },
      { number: 7, title: 'Equity Mutual Funds: Large, Mid, Small and Flexi Cap' },
      { number: 8, title: 'ELSS: Tax Saving Mutual Funds under Section 80C' },
      { number: 9, title: 'Debt Mutual Funds: Overnight to Gilt & Macaulay Duration' },
      { number: 10, title: 'Hybrid & Balanced Advantage Funds (Dynamic Allocation)' },
      { number: 11, title: 'Passive Investing: Index Funds vs Exchange Traded Funds (ETFs)' },
      { number: 12, title: 'Systematic Investment Plans (SIP) & Rupee Cost Averaging' },
      { number: 13, title: 'Step-Up SIP: Aligning Compounding with Income Growth' },
      { number: 14, title: 'Systematic Withdrawal Plans (SWP) for Post-Retirement' },
      { number: 15, title: 'Understanding Mutual Fund Factsheets & Portfolio Turnover' },
      { number: 16, title: 'Evaluating Fund Managers: Alpha, Beta & Tracking Error' },
      { number: 17, title: 'Standard Deviation and Sharpe Ratio in Fund Selection' },
      { number: 18, title: 'Taxation of Mutual Funds: Equity vs Debt (Budget Rules)' },
      { number: 19, title: 'Strategic Asset Allocation: Age-Based & Risk-Based Models' },
      { number: 20, title: 'Portfolio Rebalancing Protocols (Annual & Band Rebalancing)' },
      { number: 21, title: 'Gold as an Asset Class: SGB vs Gold ETFs vs Physical' },
      { number: 22, title: 'International Equity Exposure & Geographical Diversification' },
      { number: 23, title: 'Goal-Based Financial Planning: Children\'s Education & Home' },
      { number: 24, title: 'Retirement Corpus Calculation: The 25x and 30x Rules' },
      { number: 25, title: 'Safe Withdrawal Rates (SWR) in an Indian Context' },
      { number: 26, title: 'Debt Management: Repaying Expensive Debt (Snowball vs Avalanche)' },
      { number: 27, title: 'Credit Score (CIBIL) Optimization & Borrowing Best Practices' },
      { number: 28, title: 'Nomination, Joint Accounts and Estate Planning Essentials' },
      { number: 29, title: 'Drafting a Legally Valid Will in India' },
      { number: 30, title: 'Digital Asset Security & Preventing Financial Fraud' },
      { number: 31, title: 'Managing Financial Windfalls (Inheritance, ESOPs, Bonuses)' },
      { number: 32, title: 'Financial Hygiene Checklist for Working Professionals' },
      { number: 33, title: 'Achieving True Financial Independence (FIRE Movement in India)' }
    ]
  },
  {
    id: 'innerworth',
    moduleNumber: 12,
    title: 'Innerworth - Mind over markets',
    category: 'Psychology & Mindset',
    chaptersCount: 603,
    level: 'All Levels',
    accentColor: '#f97316',
    badgeClass: 'badge-amber',
    shortDesc: 'Master mental conditioning and psychological stamina for market longevity: Overcome drawdowns, eliminate self-sabotage, embrace uncertainty, and cultivate trader discipline.',
    readingTime: '50 mins',
    calculators: [
      { id: 'percentage-calculator', name: 'Percentage Calculator' },
      { id: 'roi-calculator', name: 'ROI Calculator' }
    ],
    fullOverview: `Originally an acclaimed collection of weekly behavioral reflections published for market professionals, 'Innerworth: Mind over Markets' addresses the profound psychological and emotional obstacles that confront active traders. The market is not merely an intellectual puzzle; it is an unforgiving mirror that exposes every human insecurity, greed impulse, and fear instinct. In this module, you will explore how to develop a professional trader's mindset: decoupling self-esteem from trade outcomes, conquering performance anxiety, navigating painful drawdowns without revenge trading, managing emotional fatigue, developing unshakeable self-discipline, and accepting uncertainty as the natural cost of market opportunity.`,
    coreConcepts: [
      {
        title: 'Probabilistic Thinking over Certainty',
        detail: 'Accepting that any single trade outcome is random, but an aggregate sample of 100 disciplined trades delivers a predictable mathematical edge.'
      },
      {
        title: 'Decoupling Self-Worth from P&L',
        detail: 'A losing trade does not mean you are a failure; it is simply a cost of doing business, identical to a store owner paying electricity rent.'
      },
      {
        title: 'Emotional Equilibrium During Winning & Losing Streaks',
        detail: 'Hot streaks breed dangerous overconfidence and rule-breaking; cold streaks breed hesitation and fear. Elite traders maintain emotional neutrality.'
      },
      {
        title: 'The Discipline of Radical Self-Honesty',
        detail: 'Documenting every trading error, admitting mistakes immediately, and treating mistakes as valuable data points for performance improvement.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Navigating a 30% Account Drawdown',
      narrative: `Trader Sameer has been trading the Indian index markets for 3 years. After a sudden series of geopolitical shocks and chop, his ₹20,00,000 account suffers a severe 30% drawdown, dropping to ₹14,00,000. Frustrated, Sameer feels the temptation to double his position size to make the money back in one lucky trade (revenge trading). Recognizing this destructive impulse, Sameer halts live trading for 48 hours, examines the mathematical reality of drawdown recovery percentages, and cuts his position size to one-third until his equity curve stabilizes.`
    },
    calculationHighlight: {
      topic: 'The Asymmetric Drawdown Recovery Formula & Kelly Fraction Risk Control',
      formula: `Required Gain to Breakeven (%) = [ (1 / (1 - Drawdown %)) - 1 ] × 100\nKelly Percentage (K%) = W - [ (1 - W) / R ]\nwhere W = Win Rate, R = Win/Loss Payoff Ratio`,
      explanation: 'Losses compound against you geometrically: a 50% loss requires a 100% gain just to break even, proving why capital preservation must supersede all else.',
      workedExample: {
        inputs: [
          { label: 'Initial Capital', value: '₹20,00,000' },
          { label: 'Drawdown Suffered', value: '30.0% (Current Balance: ₹14,00,000 | Loss: -₹6,00,000)' },
          { label: 'Trader Win Rate (W)', value: '50.0% (0.50)' },
          { label: 'Win/Loss Ratio (R)', value: '2.0 (Average win is 2x average loss)' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Percentage Gain Needed to Recover Capital',
            math: '[ 1 / (1 - 0.30) ] - 1 = [ 1 / 0.70 ] - 1 = 1.4286 - 1',
            result: '+42.86% Gain Required just to get back to Even!'
          },
          {
            stepNumber: 2,
            title: 'Review the Severe Non-Linear Drawdown Table',
            math: '10% DD → 11.1% gain | 20% DD → 25% gain | 50% DD → 100% gain | 75% DD → 300% gain',
            result: 'A 50% drop demands doubling your money (100% gain)!'
          },
          {
            stepNumber: 3,
            title: 'Compute Full Kelly Fraction',
            math: 'K% = 0.50 - [ (1 - 0.50) / 2.0 ] = 0.50 - 0.25',
            result: '25.0% Optimal Theoretical Kelly Exposure'
          },
          {
            stepNumber: 4,
            title: 'Apply Conservative Half-Kelly Sizing',
            math: '25.0% / 2',
            result: '12.5% Maximum Aggregate Portfolio Exposure (Keeps risk well under control)'
          }
        ],
        conclusion: 'Realizing that recovering from a 30% drawdown requires a +42.86% return prevents Sameer from gambling, guiding him to rebuild steadily using strict position limits.'
      },
      calculatorId: 'percentage-calculator',
      calculatorName: 'Open Percentage Calculator'
    },
    chaptersList: [
      { number: 1, title: 'The Inner Arena: Mindset as the Ultimate Edge' },
      { number: 2, title: 'The Illusion of Control in Probabilistic Markets' },
      { number: 3, title: 'Accepting Losses as Business Expenses' },
      { number: 4, title: 'Overcoming the Paralysis of Trading Hesitation' },
      { number: 5, title: 'The Danger of Hot Streaks & Euphoria' },
      { number: 6, title: 'Surviving the Psychological Depths of a Drawdown' },
      { number: 7, title: 'Eliminating the Urge to Revenge Trade' },
      { number: 8, title: 'Cultivating Quiet Focus & Emotional Equanimity' },
      { number: 9, title: 'Daily Mental Preparation & Post-Market Debriefs' },
      { number: 10, title: 'The Long Game: Building a Sustainable 30-Year Career' }
    ]
  },
  {
    id: 'financial-modelling',
    moduleNumber: 13,
    title: 'Integrated Financial Modelling',
    category: 'Financial Modeling & Valuation',
    chaptersCount: 18,
    level: 'Advanced',
    accentColor: '#3b82f6',
    badgeClass: 'badge-blue',
    shortDesc: 'Build dynamic 3-statement financial models, circular interest schedules, working capital schedules, Weighted Average Cost of Capital (WACC), and Discounted Cash Flow (DCF) models.',
    readingTime: '60 mins',
    calculators: [
      { id: 'present-value-calculator', name: 'Present Value Calculator' },
      { id: 'future-value-calculator', name: 'Future Value Calculator' }
    ],
    fullOverview: `Integrated Financial Modeling is the institutional standard for projecting future corporate earnings, cash flows, and intrinsic equity valuation. A dynamic 3-statement model connects the Income Statement, Balance Sheet, and Cash Flow Statement dynamically so that any change in operating assumptions flows automatically through the entire company. In this module, you will learn how to build professional models from scratch: projecting revenue growth drivers and cost of goods sold, building supporting schedules (Capital Expenditure and Depreciation Schedules, Working Capital Schedules, Debt and Circular Interest Schedules), calculating Free Cash Flow to Firm (FCFF) and Free Cash Flow to Equity (FCFE), estimating the Weighted Average Cost of Capital (WACC), computing Terminal Value using both Perpetual Growth and Exit Multiple approaches, and executing Discounted Cash Flow (DCF) sensitivity tables.`,
    coreConcepts: [
      {
        title: 'Dynamic 3-Statement Integration',
        detail: 'Net Income flows to Retained Earnings on the Balance Sheet and starts the Cash Flow Statement. The ending cash balance balances the Balance Sheet.'
      },
      {
        title: 'Supporting Schedules Engine',
        detail: 'Depreciation, Debt amortizations, and Net Working Capital changes must be modeled in separate schedules before feeding into core financial statements.'
      },
      {
        title: 'Free Cash Flow to Firm (FCFF)',
        detail: 'FCFF = EBIT × (1 - Tax Rate) + Depreciation - Capital Expenditures - Net Working Capital Investment. It represents actual distributable cash available to all capital providers.'
      },
      {
        title: 'Weighted Average Cost of Capital (WACC)',
        detail: 'Blends the required return on equity (via CAPM) with the after-tax cost of debt, weighted by their market proportions in the enterprise capital structure.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: DCF Valuation of an Indian Automotive Component Maker',
      narrative: `An equity research analyst builds a 5-year integrated financial model for an Indian Tier-1 automotive component manufacturer supplying Maruti Suzuki and Tata Motors. The company\'s enterprise capital structure consists of 70% Equity and 30% Debt. The analyst estimates Cost of Equity at 13.2% and Pre-Tax Cost of Debt at 8.5% (Corporate tax rate = 25%). Year 5 Projected FCFF is ₹900 Crore, with a long-term perpetual growth rate of 5.0%.`
    },
    calculationHighlight: {
      topic: 'WACC & Enterprise DCF Valuation with Terminal Value',
      formula: `WACC = [ (E/V) × Ke ] + [ (D/V) × Kd × (1 - Tax Rate) ]\nTerminal Value (TV) = [ FCFF(Year 5) × (1 + g) ] / (WACC - g)\nEnterprise Value = Present Value of Discrete Cash Flows + Present Value of Terminal Value`,
      explanation: 'Discounted Cash Flow intrinsic valuation discounts all future cash generation back to the present day using the company\'s blended cost of capital.',
      workedExample: {
        inputs: [
          { label: 'Equity Weight (E/V)', value: '70% (0.70) | Cost of Equity (Ke) = 13.2%' },
          { label: 'Debt Weight (D/V)', value: '30% (0.30) | Cost of Debt (Kd) = 8.5%' },
          { label: 'Corporate Tax Rate', value: '25% (0.25)' },
          { label: 'Year 5 Projected FCFF', value: '₹900 Crore' },
          { label: 'Perpetual Growth Rate (g)', value: '5.0% per annum' },
          { label: 'PV of 5-Year Discrete Cash Flows', value: '₹2,550 Crore' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate After-Tax Cost of Debt',
            math: '8.5% × (1 - 0.25) = 8.5% × 0.75',
            result: '6.375% After-Tax Cost of Debt'
          },
          {
            stepNumber: 2,
            title: 'Calculate Weighted Average Cost of Capital (WACC)',
            math: '(0.70 × 13.2%) + (0.30 × 6.375%) = 9.24% + 1.9125%',
            result: '11.15% WACC (Discount Rate)'
          },
          {
            stepNumber: 3,
            title: 'Compute Terminal Value at Year 5',
            math: '[ ₹900 Cr × (1 + 0.05) ] / (0.1115 - 0.05) = ₹945 Cr / 0.0615',
            result: '₹15,365.85 Crore Terminal Value'
          },
          {
            stepNumber: 4,
            title: 'Discount Terminal Value to Present Day',
            math: '₹15,365.85 Cr / (1.1115)^5 = ₹15,365.85 Cr / 1.6963',
            result: '₹9,058.45 Crore Present Value of Terminal Value'
          },
          {
            stepNumber: 5,
            title: 'Calculate Total Intrinsic Enterprise Value',
            math: '₹2,550 Cr (Discrete PV) + ₹9,058.45 Cr (Terminal PV)',
            result: '₹11,608.45 Crore Total Enterprise Value'
          }
        ],
        conclusion: 'Deducting net debt gives the fair equity value, providing the analyst with a concrete per-share target price backed by cash-generation fundamentals.'
      },
      calculatorId: 'present-value-calculator',
      calculatorName: 'Open Present Value Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to Financial Modeling & Best Practices' },
      { number: 2, title: 'Structuring Excel Spreadsheets: Colors, Dynamics & Checks' },
      { number: 3, title: 'Revenue Forecasting & Volume/Price Operating Drivers' },
      { number: 4, title: 'Cost of Goods Sold (COGS) & Operating Expenses (OPEX)' },
      { number: 5, title: 'Fixed Asset Schedule: Capex & Depreciation Mechanics' },
      { number: 6, title: 'Working Capital Schedule: Receivables, Inventory, Payables' },
      { number: 7, title: 'Debt Schedule: Senior Debt, Revolver & Circular Interest' },
      { number: 8, title: 'Integrating the Balance Sheet & Ensuring Equilibrium' },
      { number: 9, title: 'Cash Flow Statement Linkages' },
      { number: 10, title: 'Calculating Free Cash Flow to Firm (FCFF) and Equity (FCFE)' },
      { number: 11, title: 'Cost of Equity Estimation via CAPM & Beta Unlevering' },
      { number: 12, title: 'WACC Estimation & Capital Structure Weighting' },
      { number: 13, title: 'Terminal Value: Gordon Growth vs Exit Multiple Method' },
      { number: 14, title: 'Discounted Cash Flow (DCF) Valuation Synthesis' },
      { number: 15, title: 'Sensitivity Tables (WACC vs Growth Rate Matrices)' },
      { number: 16, title: 'Scenario Analysis: Bull, Base, and Bear Case Models' },
      { number: 17, title: 'Comparable Company Analysis (Trading Comps)' },
      { number: 18, title: 'Presenting Valuation Insights to Investment Committees' }
    ]
  },
  {
    id: 'insurance',
    moduleNumber: 14,
    title: 'Personal Finance - Insurance',
    category: 'Wealth Protection',
    chaptersCount: 9,
    level: 'Beginner',
    accentColor: '#10b981',
    badgeClass: 'badge-emerald',
    shortDesc: 'Protect your family from financial catastrophe: Master Pure Term Life Insurance, Human Life Value (HLV) calculation, 1 Crore+ Health Cover, Super Top-Ups, and avoid toxic ULIPs.',
    readingTime: '40 mins',
    calculators: [
      { id: 'loan-calculator', name: 'Loan Calculator' },
      { id: 'sip-calculator', name: 'SIP Calculator' }
    ],
    fullOverview: `Insurance is the defensive foundation of every sound financial plan. Its purpose is not wealth accumulation, but wealth protection: transferring catastrophic, low-probability financial risks (such as premature death or critical illness) away from your family to an insurance company. Mixing investment with insurance—through Unit Linked Insurance Plans (ULIPs), Endowment policies, or Money-Back policies—results in expensive premiums, poor 4-5% returns, and dangerously inadequate life cover. In this module, you will learn why Pure Term Insurance is the only life insurance you need, calculate your exact Human Life Value (HLV) life cover requirement, examine insurer Claim Settlement Ratios (CSR) and Amount Settlement Ratios, structure a comprehensive Health Insurance plan with Super Top-Ups, and navigate policy exclusions, pre-existing disease waiting periods, room-rent sub-limits, and co-payment clauses.`,
    coreConcepts: [
      {
        title: 'Separation of Insurance & Investment',
        detail: 'Buy Term Insurance for pure life risk protection, and invest the saved premium difference in low-cost mutual funds. Never buy endowment or money-back plans.'
      },
      {
        title: 'Human Life Value (HLV) Need Analysis',
        detail: 'Your life insurance cover must replace the present value of future financial support your family depends upon, plus clear all outstanding loans.'
      },
      {
        title: 'Super Top-Up Health Insurance Architecture',
        detail: 'A base health cover of ₹5–10 Lakhs combined with a ₹90–95 Lakh Super Top-Up policy (with a ₹5–10 Lakh deductible) delivers ₹1 Crore total coverage at a fraction of the cost.'
      },
      {
        title: 'Claim Settlement Ratio (CSR) vs Amount Settlement Ratio',
        detail: 'CSR measures percentage of claims approved by count; Amount Settlement Ratio reveals the percentage of actual claim money disbursed by the insurer.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Structuring Insurance for 30-Year-Old Sneha',
      narrative: `Sneha is a 30-year-old software team lead in Bengaluru earning ₹18,00,000 annually. She has dependent parents, an outstanding home loan of ₹50,00,000, and family living expenses of ₹70,000 per month. An agent attempts to sell Sneha an endowment policy with an annual premium of ₹1,00,000 offering a meager ₹15,00,000 death cover. Sneha recognizes this is completely inadequate. Instead, she purchases a ₹2.5 Crore Pure Term Insurance cover until age 60 for just ₹16,500/year, and secures a ₹1 Crore 1+99 Super Top-Up Health Insurance package for ₹11,000/year, investing the remaining ₹72,500 into index mutual funds.`
    },
    calculationHighlight: {
      topic: 'Human Life Value (HLV) Income Replacement Method',
      formula: `HLV Cover = [ (Annual Income - Personal Expenses) × Present Value Annuity Factor ] + Outstanding Debt - Liquid Investments\nSimplified Thumb Rule = (Gross Annual Income × 15 to 20) + Total Outstanding Debt`,
      explanation: 'Ensures that if the primary earner passes away, the invested insurance payout produces an ongoing monthly income that maintains the family\'s standard of living forever.',
      workedExample: {
        inputs: [
          { label: 'Sneha\'s Gross Annual Income', value: '₹18,00,000' },
          { label: 'Sneha\'s Personal Consumption', value: '₹3,00,000 (leaves ₹15,00,000 annual family support)' },
          { label: 'Working Years to Age 60', value: '30 Years' },
          { label: 'Net Real Discount Rate', value: '1.5% (Risk-free yield 7.0% - Inflation 5.5%)' },
          { label: 'Outstanding Home Loan', value: '₹50,00,000' },
          { label: 'Existing Liquid Investments', value: '₹20,00,000' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Compute Present Value of 30-Year Income Replacement',
            math: '₹15,00,000 × [ (1 - (1.015)^-30) / 0.015 ] = ₹15,00,000 × 24.0158',
            result: '₹3,60,23,700 Present Value of Future Support'
          },
          {
            stepNumber: 2,
            title: 'Add Outstanding Liabilities & Subtract Liquid Assets',
            math: '₹3,60,23,700 + ₹50,00,000 (Home Loan) - ₹20,00,000 (Existing Assets)',
            result: '₹3,90,23,700 Total Human Life Value'
          },
          {
            stepNumber: 3,
            title: 'Recommended Policy Cover Selection',
            math: 'Round up to nearest institutional slab',
            result: '₹4.0 Crore Pure Term Insurance Cover (Annual Premium ~₹22,000)'
          }
        ],
        conclusion: 'By securing a ₹4.0 Crore term policy, Sneha guarantees that her home loan will be settled immediately and her family will receive a sustainable lifetime monthly income.'
      },
      calculatorId: 'loan-calculator',
      calculatorName: 'Open Loan Calculator'
    },
    chaptersList: [
      { number: 1, title: 'The True Purpose of Insurance: Risk Transfer vs Investment' },
      { number: 2, title: 'Why You Must Avoid ULIPs and Endowment Policies' },
      { number: 3, title: 'Pure Term Life Insurance: Features & Critical Riders' },
      { number: 4, title: 'Calculating Human Life Value (HLV) for Adequate Cover' },
      { number: 5, title: 'Analyzing Insurer Solvency & Claim Settlement Ratios' },
      { number: 6, title: 'Comprehensive Health Insurance: Base vs Super Top-Up' },
      { number: 7, title: 'Crucial Health Policy Clauses: Room Rent, Co-Pay & PED' },
      { number: 8, title: 'Critical Illness & Personal Accident Disability Insurance' },
      { number: 9, title: 'The Complete Insurance Portfolio Audit Checklist' }
    ]
  },
  {
    id: 'sector-analysis',
    moduleNumber: 15,
    title: 'Sector Analysis',
    category: 'Equities & Research',
    chaptersCount: 17,
    level: 'Intermediate',
    accentColor: '#f59e0b',
    badgeClass: 'badge-amber',
    shortDesc: 'Master industry-specific KPIs across the Indian economy: Banking (NIM, NPA, CASA), IT (TCV, utilization), Automobiles (ARPV), FMCG (volume vs value), and Pharmaceuticals.',
    readingTime: '55 mins',
    calculators: [
      { id: 'profit-margin-calculator', name: 'Profit Margin Calculator' },
      { id: 'percentage-calculator', name: 'Percentage Calculator' }
    ],
    fullOverview: `Sector analysis bridges broad macroeconomic trends with individual stock picking. Different industries have fundamentally distinct operating models, revenue cycles, capital intensities, and key performance indicators (KPIs). Applying standard manufacturing metrics to a private bank or a SaaS IT company produces misleading conclusions. In this module, you will master the specialized analytical frameworks for India's major sectors: Banking & Financial Services (Net Interest Margin, CASA Ratio, Cost-to-Income, Gross & Net NPAs, Provision Coverage Ratio), IT & Software Services (Constant Currency growth, Deal Total Contract Value, Attrition, Billable Utilization), Automobiles (Wholesale Dispatches vs Vahan Registrations, Average Realization Per Vehicle, Margin per Unit), Fast-Moving Consumer Goods (Volume Growth vs Value Growth, Rural Penetration), and Pharmaceuticals (ANDA filings, USFDA inspections, Form 483 resolutions).`,
    coreConcepts: [
      {
        title: 'Sector-Specific Operational KPIs',
        detail: 'Each industry has unique metrics: Banks trade on NIM and asset quality; IT companies trade on deal TCV and realization billing rates; Auto companies trade on monthly volume dispatches.'
      },
      {
        title: 'Banking Net Interest Margin (NIM) Engine',
        detail: 'The spread between interest earned on customer loans and interest paid on customer deposits, divided by total earning assets, reveals true banking pricing power.'
      },
      {
        title: 'Cyclical vs Defensive Sectors',
        detail: 'Defensive sectors (FMCG, Pharma) maintain stable cashflows during recessions; Cyclical sectors (Metals, Real Estate, Auto) surge during economic expansions and suffer in contractions.'
      },
      {
        title: 'Regulatory & Pricing Headwinds',
        detail: 'Government policy shifts, interest rate rate-hiking cycles, and USFDA regulatory scrutiny can alter industry profitability overnight.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Banking Deep Dive on ICICI Bank vs Peer',
      narrative: `An equity research team analyzes ICICI Bank's quarterly earnings release. The bank reports Quarterly Total Interest Income from loans of ₹28,500 Crore and Interest Expended on customer deposits of ₹16,200 Crore. Total Average Earning Assets stand at ₹11,20,000 Crore. Operating Expenses (staff, technology, branches) were ₹5,100 Crore against Other Non-Interest Income (fees, forex, commissions) of ₹4,800 Crore. The analyst computes the Net Interest Margin (NIM) and Cost-to-Income Ratio to compare against industry benchmarks.`
    },
    calculationHighlight: {
      topic: 'Net Interest Margin (NIM) & Cost-to-Income Ratio in Banking Analysis',
      formula: `Net Interest Income (NII) = Interest Income Earned - Interest Expended\nAnnualized NIM (%) = [ (NII × 4) / Average Earning Assets ] × 100\nCost-to-Income Ratio (%) = [ Operating Expenses / (NII + Non-Interest Income) ] × 100`,
      explanation: 'NIM measures the core operational profitability of a bank\'s balance sheet, while Cost-to-Income measures operational efficiency.',
      workedExample: {
        inputs: [
          { label: 'Total Quarterly Interest Earned', value: '₹28,500 Crore' },
          { label: 'Total Quarterly Interest Expended', value: '₹16,200 Crore' },
          { label: 'Average Interest-Earning Assets', value: '₹11,20,000 Crore' },
          { label: 'Quarterly Operating Expenses', value: '₹5,100 Crore' },
          { label: 'Quarterly Non-Interest Fee Income', value: '₹4,800 Crore' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate Net Interest Income (NII)',
            math: '₹28,500 Cr - ₹16,200 Cr',
            result: '₹12,300 Crore Net Interest Income (NII)'
          },
          {
            stepNumber: 2,
            title: 'Calculate Annualized Net Interest Margin (NIM)',
            math: '[ (₹12,300 Cr × 4) / ₹11,20,000 Cr ] × 100 = [ ₹49,200 Cr / ₹11,20,000 Cr ] × 100',
            result: '4.39% Annualized NIM (Industry-leading margin)'
          },
          {
            stepNumber: 3,
            title: 'Calculate Total Operating Income',
            math: '₹12,300 Cr (NII) + ₹4,800 Cr (Fee Income)',
            result: '₹17,100 Crore Total Net Revenue'
          },
          {
            stepNumber: 4,
            title: 'Compute Cost-to-Income Ratio',
            math: '[ ₹5,100 Cr / ₹17,100 Cr ] × 100',
            result: '29.82% Cost-to-Income (Exceptional operational efficiency)'
          }
        ],
        conclusion: 'A 4.39% NIM coupled with a sub-30% Cost-to-Income ratio confirms that the bank possesses immense competitive pricing power, justifying a premium Price-to-Book multiple.'
      },
      calculatorId: 'profit-margin-calculator',
      calculatorName: 'Open Profit Margin Calculator'
    },
    chaptersList: [
      { number: 1, title: 'The Framework of Sectoral Equity Research' },
      { number: 2, title: 'Banking & NBFCs: Net Interest Margin & CASA Ratio' },
      { number: 3, title: 'Asset Quality in Banking: GNPA, NNPA & PCR Coverage' },
      { number: 4, title: 'Information Technology: Constant Currency & Deal TCV' },
      { number: 5, title: 'IT Operating Levers: Utilization, Pyramiding & Attrition' },
      { number: 6, title: 'Automobile Sector: Dispatches, Inventory & ARPV Metrics' },
      { number: 7, title: 'FMCG: Volume Growth, Pricing Power & Distribution Reach' },
      { number: 8, title: 'Pharmaceuticals: ANDA Pipeline, Form 483 & Domestic Formulations' },
      { number: 9, title: 'Healthcare & Hospitals: ARPOB & Occupancy Rates' },
      { number: 10, title: 'Metals & Mining: Global Commodity Cycles & LME Linkages' },
      { number: 11, title: 'Oil & Gas: Gross Refining Margins (GRM) & Under-Recoveries' },
      { number: 12, title: 'Real Estate: Pre-Sales, Collections & Debt-to-Equity' },
      { number: 13, title: 'Power & Infrastructure: Plant Load Factor (PLF) & Order Books' },
      { number: 14, title: 'Telecom: ARPU, Data Consumption & Spectrum Costs' },
      { number: 15, title: 'Chemicals: Specialty vs Commodity & Chinese Competition' },
      { number: 16, title: 'Evaluating Sector Rotation in Bull and Bear Markets' },
      { number: 17, title: 'Constructing a Sector-Diversified Equity Watchlist' }
    ]
  },
  {
    id: 'social-stock-exchanges-sses',
    moduleNumber: 16,
    title: 'Social Stock Exchanges (SSEs)',
    category: 'Modern Markets & ESG',
    chaptersCount: 4,
    level: 'Beginner - Intermediate',
    accentColor: '#10b981',
    badgeClass: 'badge-emerald',
    shortDesc: 'Understand SEBI’s pioneering Social Stock Exchange: Zero Coupon Zero Principal (ZCZP) instruments, eligibility for Non-Profits (NPOs), Social Audit standards, and SROI metrics.',
    readingTime: '30 mins',
    calculators: [
      { id: 'roi-calculator', name: 'ROI Calculator' },
      { id: 'percentage-calculator', name: 'Percentage Calculator' }
    ],
    fullOverview: `The Social Stock Exchange (SSE) is an innovative regulatory segment established on the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) under SEBI guidelines to channel philanthropic capital and impact investments to legitimate Non-Profit Organizations (NPOs) and For-Profit Social Enterprises (FPEs). Traditionally, donors had limited visibility into NGO fund utilization. The SSE establishes institutional transparency through mandatory registration, minimum operational track records, and independent annual Social Audits. In this module, you will learn the mechanics of Zero Coupon Zero Principal (ZCZP) instruments (which pay neither interest nor return of principal, functioning as transparent donations), reduced retail application thresholds (lowered to ₹10,000), Social Audit Framework standards, and calculating Social Return on Investment (SROI) to quantify societal value.`,
    coreConcepts: [
      {
        title: 'Zero Coupon Zero Principal (ZCZP) Instruments',
        detail: 'Securities issued by registered NPOs that pay zero coupon (interest) and zero principal repayment, acting as formal electronic donation receipts on stock exchanges.'
      },
      {
        title: 'Institutional Social Audits',
        detail: 'Certified Social Auditors examine whether capital raised was deployed strictly for the intended social causes and verify measurable outcome metrics.'
      },
      {
        title: 'Eligibility & Transparency Thresholds',
        detail: 'NPOs must be registered under 12A/80G, possess a 3-year track record, spend at least ₹50 Lakhs annually, and receive minimum ₹10 Lakhs in annual funding.'
      },
      {
        title: 'Social Return on Investment (SROI)',
        detail: 'A quantifiable cost-benefit methodology that translates societal outcomes (education, healthcare, clean water) into monetary equivalents relative to capital invested.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: NGO Issues ZCZP Bonds on NSE Social Stock Exchange',
      narrative: `A registered Section 8 non-profit foundation in Pune focuses on digital skill training for rural youth. To construct 50 solar-powered computer centers across rural Maharashtra, the NGO issues Zero Coupon Zero Principal (ZCZP) bonds on the NSE SSE segment, raising ₹1,00,0000 (10,000 units @ ₹1,000 each). Both retail donors (subscribing ₹10,000 each) and corporate CSR foundations participate. The NGO trains 1,200 underprivileged youth, resulting in 900 candidates securing verified formal employment.`
    },
    calculationHighlight: {
      topic: 'Social Return on Investment (SROI) Quantitative Ratio',
      formula: `SROI Ratio = Net Present Value of Quantifiable Social Benefits (₹) / Total Financial Capital Invested (₹)`,
      explanation: 'SROI allows donors and CSR committees to quantify the exact tangible economic value generated in society for every rupee contributed.',
      workedExample: {
        inputs: [
          { label: 'Total Capital Raised via ZCZP', value: '₹1,00,00,000 (₹1.00 Crore)' },
          { label: 'Total Candidates Trained', value: '1,200 Rural Youth' },
          { label: 'Candidates Placed in Formal Jobs', value: '900 candidates (75% placement rate)' },
          { label: 'Average Wage Increase per Candidate', value: '₹12,000 per month = ₹1,44,000 per year' },
          { label: 'Present Value of 3-Year Incremental Wages', value: '₹3,60,00,000 (₹3.60 Crore)' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Determine Total Capital Outlay',
            math: 'ZCZP Issue Size',
            result: '₹1,00,00,000 Invested Capital'
          },
          {
            stepNumber: 2,
            title: 'Quantify Total Net Present Value of Social Outcomes',
            math: '900 employed youth × 3-year cumulative wage boost',
            result: '₹3,60,00,000 Economic Value Created'
          },
          {
            stepNumber: 3,
            title: 'Calculate Social Return on Investment (SROI)',
            math: '₹3,60,00,000 / ₹1,00,00,000',
            result: '3.60 : 1 SROI Ratio'
          }
        ],
        conclusion: 'For every ₹1.00 contributed by donors through ZCZP bonds, the project generated ₹3.60 in direct, quantifiable wage earnings for rural families.'
      },
      calculatorId: 'roi-calculator',
      calculatorName: 'Open ROI Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Genesis & Regulatory Architecture of Indian SSEs' },
      { number: 2, title: 'Non-Profits (NPOs) vs For-Profit Social Enterprises (FPEs)' },
      { number: 3, title: 'Zero Coupon Zero Principal (ZCZP) Instrument Mechanics' },
      { number: 4, title: 'Social Audits, Reporting Standards & SROI Evaluation' }
    ]
  },
  {
    id: 'national-pension-scheme',
    moduleNumber: 17,
    title: 'NPS: National Pension System',
    category: 'Retirement & Wealth',
    chaptersCount: 9,
    level: 'Beginner - Intermediate',
    accentColor: '#6366f1',
    badgeClass: 'badge-indigo',
    shortDesc: 'Retirement engineering with India’s lowest-cost pension vehicle: Tier 1 vs Tier 2, Active vs Auto choice, Section 80CCD(1B) ₹50,000 tax deduction, 60% tax-free lump sum exit, and annuity.',
    readingTime: '45 mins',
    calculators: [
      { id: 'sip-calculator', name: 'SIP Calculator' },
      { id: 'compound-interest-calculator', name: 'Compound Interest Calculator' }
    ],
    fullOverview: `The National Pension System (NPS), administered by the Pension Fund Regulatory and Development Authority (PFRDA), is India's premier voluntary, long-term retirement savings instrument. Characterized by the lowest fund management charges in the global asset management industry (capped below 0.09% p.a.), NPS allows citizens to build a dedicated pension corpus across equities, corporate debt, and sovereign government bonds. In this module, you will master Tier 1 (Mandatory Retirement Account with strict withdrawal restrictions and maximum tax deductions) vs Tier 2 (Voluntary liquid investment account), explore Asset Classes (E for Equity up to 75%, C for Corporate Debt, G for Government Bonds, A for Alternative Assets), evaluate Active Choice vs Auto Choice (Lifecycle Funds), understand tax deductions under Section 80CCD(1), 80CCD(1B) extra ₹50,000 deduction, and 80CCD(2) employer contributions, and master the retirement exit framework (60% tax-free lump sum withdrawal and 40% mandatory annuity purchase at age 60).`,
    coreConcepts: [
      {
        title: 'Tier 1 vs Tier 2 Account Architecture',
        detail: 'Tier 1 is locked until age 60 to ensure disciplined retirement compounding, unlocking exclusive tax benefits. Tier 2 offers complete liquidity without tax concessions.'
      },
      {
        title: 'Exclusive Section 80CCD(1B) Tax Deduction',
        detail: 'Allows an additional tax deduction of up to ₹50,000 over and above the Section 80C ₹1.5 Lakh ceiling, generating immediate annual tax savings of up to ₹15,600.'
      },
      {
        title: 'Active Choice vs Auto Choice Lifecycle Funds',
        detail: 'Active choice lets you allocate up to 75% in Equity (Class E); Auto choice automatically rebalances from equity to fixed income as you age (Aggressive LC-75, Moderate LC-50, Conservative LC-25).'
      },
      {
        title: 'Superlative Low-Cost Advantage',
        detail: 'Fund management fees are capped at just ~0.03%–0.09%, leaving significantly more capital compounding in your account compared to mutual funds.'
      }
    ],
    marketExample: {
      headline: 'Real-World Indian Market Scenario: Ankit Builds a Retirement Corpus from Age 28',
      narrative: `Ankit is a 28-year-old software engineer in Pune in the 30% income tax bracket. He opens an NPS Tier 1 account to take advantage of the exclusive ₹50,000 deduction under Section 80CCD(1B), saving ₹15,600 in taxes each year. Ankit deposits ₹5,000 per month (₹60,000/year). He selects Active Choice with 75% in Asset Class E (Equity) and 25% in Asset Class C (Corporate Bonds). Over the next 32 years until retirement at age 60, his blended portfolio achieves an estimated average compounding return of 11.0% per annum.`
    },
    calculationHighlight: {
      topic: 'NPS Retirement Corpus, 60% Tax-Free Lump Sum, 40% Annuity & Lifetime Tax Savings',
      formula: `Annual Tax Saved = Min[Contribution, ₹50,000] × Tax Slab Rate × 1.04\nTotal Corpus = Compound Growth of Monthly SIP over Tenure\nTax-Free Lump Sum (60%) = Total Corpus × 0.60\nMandatory Annuity Purchase (40%) = Total Corpus × 0.40\nMonthly Guaranteed Pension = (Annuity Corpus × Annuity Yield %) / 12`,
      explanation: 'NPS enables double compounding: immediate tax savings reinvested into equities, culminating in a 60% completely tax-free lump sum exit and a guaranteed lifetime monthly pension.',
      workedExample: {
        inputs: [
          { label: 'Monthly Contribution', value: '₹5,000 per month (₹60,000 annually)' },
          { label: 'Current Age / Retirement Age', value: 'Age 28 to 60 (32 Years / 384 months tenure)' },
          { label: 'Total Principal Invested', value: '₹5,000 × 384 months = ₹19,20,000' },
          { label: 'Expected Blended Annual Return', value: '11.0% per annum (75% Equity + 25% Debt)' },
          { label: 'Assumed Annuity Yield at Age 60', value: '6.5% per annum lifelong' },
          { label: 'Investor Tax Bracket', value: '30% + 4% cess = 31.2%' }
        ],
        steps: [
          {
            stepNumber: 1,
            title: 'Calculate 32-Year Cumulative Tax Savings',
            math: '₹50,000 × 31.2% = ₹15,600 saved/yr. Over 32 years: ₹15,600 × 32',
            result: '₹4,99,200 Direct Income Tax Saved'
          },
          {
            stepNumber: 2,
            title: 'Calculate Total Accumulated Corpus at Age 60',
            math: 'Future Value of ₹5,000 monthly SIP @ 11.0% p.a. for 384 months',
            result: '₹1,74,20,000 Total Accumulated Retirement Corpus'
          },
          {
            stepNumber: 3,
            title: 'Calculate 60% Tax-Free Lump Sum Payout',
            math: '₹1,74,20,000 × 60%',
            result: '₹1,04,52,000 (100% Completely Tax-Free Cash to Investor)'
          },
          {
            stepNumber: 4,
            title: 'Calculate 40% Mandatory Annuity & Monthly Pension',
            math: 'Annuity Corpus = ₹1,74,20,000 × 40% = ₹69,68,000. Annual Pension @ 6.5% = ₹4,52,920',
            result: '₹37,743 Guaranteed Monthly Pension for Life'
          }
        ],
        conclusion: 'For a total out-of-pocket investment of ₹19.20 Lakh (which also saved ₹4.99 Lakh in income tax), Ankit receives over ₹1.04 Crore in tax-free cash plus ₹37,743 per month in guaranteed lifelong pension.'
      },
      calculatorId: 'sip-calculator',
      calculatorName: 'Open SIP Calculator'
    },
    chaptersList: [
      { number: 1, title: 'Introduction to National Pension System (NPS) Architecture' },
      { number: 2, title: 'Tier 1 (Retirement) vs Tier 2 (Liquid) Accounts' },
      { number: 3, title: 'Asset Classes: Equity (E), Corporate (C), G-Sec (G), Alt (A)' },
      { number: 4, title: 'Active Choice vs Auto Choice (Lifecycle Funds: LC-75, 50, 25)' },
      { number: 5, title: 'Pension Fund Managers (PFMs) & Ultra-Low Expense Ratios' },
      { number: 6, title: 'Triple Tax Advantage: Section 80CCD(1), 80CCD(1B) & 80CCD(2)' },
      { number: 7, title: 'Partial Withdrawal Rules Before Age 60' },
      { number: 8, title: 'Retirement Exit: 60% Tax-Free Lump Sum & 40% Annuity' },
      { number: 9, title: 'Benchmarking NPS vs EPF, PPF and Mutual Funds' }
    ]
  }
];

// Helper to get module by ID (supports slug, module number, 'module-N', 'mod-N')
function getLearningModuleById(id) {
  if (!id) return null;
  const raw = String(id).trim().toLowerCase();
  const cleanNum = raw.replace(/^(module|mod)-?/, '');
  const list = (typeof window !== 'undefined' && window.LEARNING_MODULES_DATA) ? window.LEARNING_MODULES_DATA : LEARNING_MODULES_DATA;
  return list.find(m => {
    const mId = String(m.id).toLowerCase();
    const mNum = String(m.moduleNumber);
    return mId === raw ||
           mNum === raw ||
           mNum === cleanNum ||
           `module-${mNum}` === raw ||
           `mod-${mNum}` === raw;
  }) || null;
}

// Global attachment
if (typeof window !== 'undefined') {
  window.LEARNING_MODULES_DATA = LEARNING_MODULES_DATA;
  window.getLearningModuleById = getLearningModuleById;
}
if (typeof global !== 'undefined') {
  global.LEARNING_MODULES_DATA = LEARNING_MODULES_DATA;
  global.getLearningModuleById = getLearningModuleById;
}
