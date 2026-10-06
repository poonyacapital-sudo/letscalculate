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

const CALCULATORS_DATA = [
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
        "default": 400000,
        "min": 20000,
        "max": 10000000,
        "step": 5000,
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
    "title": "Car Loan Calculator",
    "badge": "Popular",
    "icon": "car",
    "summary": "Calculate auto loan payments including vehicle price, down payment, trade-in, and sales tax.",
    "description": "Determine your monthly auto loan payment before heading to the dealership. Account for trade-in value, sales taxes, fees, and interest rates.",
    "formula": "Financed Amount = (Price - Down Payment - Trade In) * (1 + Tax Rate) + Fees",
    "formulaDesc": "Then standard amortized payment formula applies.",
    "fields": [
      {
        "id": "vehiclePrice",
        "label": "Vehicle Purchase Price",
        "type": "number",
        "default": 32000,
        "min": 1000,
        "max": 500000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "downPayment",
        "label": "Down Payment",
        "type": "number",
        "default": 5000,
        "min": 0,
        "max": 500000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "tradeInValue",
        "label": "Trade-in Value",
        "type": "number",
        "default": 2000,
        "min": 0,
        "max": 200000,
        "step": 250,
        "prefix": "₹"
      },
      {
        "id": "salesTax",
        "label": "Sales Tax Rate",
        "type": "number",
        "default": 7,
        "min": 0,
        "max": 20,
        "step": 0.1,
        "suffix": "%"
      },
      {
        "id": "interestRate",
        "label": "Interest Rate (APR)",
        "type": "number",
        "default": 5.9,
        "min": 0,
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
    "summary": "Analyze personal loan installments, upfront origination fees, and true APR.",
    "description": "Compute your monthly payments and evaluate the true borrowing cost for unsecured personal loans, debt consolidations, or major personal projects.",
    "formula": "Net Payout = Loan Amount - Origination Fee",
    "formulaDesc": "Shows actual funds received vs total amount repaid over time.",
    "fields": [
      {
        "id": "amount",
        "label": "Requested Amount",
        "type": "number",
        "default": 15000,
        "min": 500,
        "max": 100000,
        "step": 500,
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
        "id": "originationFeePercent",
        "label": "Origination Fee (%)",
        "type": "number",
        "default": 3,
        "min": 0,
        "max": 10,
        "step": 0.5,
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
    "formulaDesc": "Standard fixed-rate home mortgage amortization calculation.",
    "fields": [
      {
        "id": "propertyValue",
        "label": "Property Value",
        "type": "number",
        "default": 350000,
        "min": 10000,
        "max": 10000000,
        "step": 10000,
        "prefix": "₹"
      },
      {
        "id": "loanPercent",
        "label": "Financing Percentage (LTV)",
        "type": "number",
        "default": 80,
        "min": 10,
        "max": 100,
        "step": 5,
        "suffix": "%"
      },
      {
        "id": "interestRate",
        "label": "Annual Interest Rate",
        "type": "number",
        "default": 6.75,
        "min": 0.5,
        "max": 20,
        "step": 0.05,
        "suffix": "%"
      },
      {
        "id": "tenureYears",
        "label": "Tenure (Years)",
        "type": "number",
        "default": 25,
        "min": 5,
        "max": 30,
        "step": 1,
        "suffix": "Years"
      }
    ],
    "chartType": "amortization"
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
    "title": "Income Tax Calculator",
    "badge": "Finance",
    "icon": "file-text",
    "summary": "Estimate effective tax brackets and federal/state tax liability.",
    "description": "Quickly estimate your progressive income tax liability, effective tax rate, and marginal tax bracket.",
    "formula": "Tax = Sum(Income in Bracket * Bracket Rate)",
    "formulaDesc": "Progressive marginal tax bracket model.",
    "fields": [
      {
        "id": "taxableIncome",
        "label": "Annual Gross Income",
        "type": "number",
        "default": 85000,
        "min": 0,
        "max": 10000000,
        "step": 1000,
        "prefix": "₹"
      },
      {
        "id": "deductions",
        "label": "Deductions (Standard/Itemized)",
        "type": "number",
        "default": 14600,
        "min": 0,
        "max": 500000,
        "step": 500,
        "prefix": "₹"
      },
      {
        "id": "filingStatus",
        "label": "Filing Status",
        "type": "select",
        "default": "single",
        "options": [
          {
            "label": "Single",
            "value": "single"
          },
          {
            "label": "Married Filing Jointly",
            "value": "married"
          },
          {
            "label": "Head of Household",
            "value": "head"
          }
        ]
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
        "min": 20,
        "max": 300,
        "step": 0.5,
        "suffix": "kg"
      },
      {
        "id": "heightCm",
        "label": "Height (cm)",
        "type": "number",
        "default": 175,
        "min": 50,
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
        "default": 2200,
        "min": 1000,
        "max": 6000,
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

  return CALCULATORS_DATA.filter(c => {
    const title = (c.title || '').toLowerCase();
    const summary = (c.summary || '').toLowerCase();
    const description = (c.description || '').toLowerCase();
    const category = (c.category || '').toLowerCase();
    const badge = (c.badge || '').toLowerCase();
    const formula = (c.formula || '').toLowerCase();

    let catKeywords = '';
    if (category === 'financial') {
      catKeywords = 'finance financial money investment loan emi tax interest banking wealth stock';
    } else if (category === 'health') {
      catKeywords = 'health fitness medical diet body weight calories workout';
    } else if (category === 'math') {
      catKeywords = 'math mathematics numbers algebra geometry percentage equation';
    }

    const fullText = `${title} ${summary} ${description} ${category} ${catKeywords} ${badge} ${formula}`;

    if (fullText.includes(q)) return true;
    return qWords.every(w => fullText.includes(w));
  });
}

// Global attachment
if (typeof window !== 'undefined') {
  window.CATEGORIES_DATA = CATEGORIES_DATA;
  window.CALCULATORS_DATA = CALCULATORS_DATA;
  window.getCategoryById = getCategoryById;
  window.getCalculatorById = getCalculatorById;
  window.getCalculatorsByCategory = getCalculatorsByCategory;
  window.searchCalculators = searchCalculators;
}
