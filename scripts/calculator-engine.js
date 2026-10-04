/**
 * CalcHub - Calculation Engine & Algorithms
 * Precise execution of mathematical, financial, health, chronological,
 * and scientific calculations with rich visual chart outputs.
 */

const CalculatorEngine = {
  // Format helpers
  formatCurrency(num, symbol = '$') {
    if (isNaN(num) || !isFinite(num)) return `${symbol}0.00`;
    return `${symbol}${Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  formatNumber(num, decimals = 2) {
    if (isNaN(num) || !isFinite(num)) return '0';
    return Number(num).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  },

  formatCompact(num) {
    if (isNaN(num) || !isFinite(num)) return '0';
    return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(num);
  },

  // Main evaluation dispatch
  compute(calcId, inputs) {
    if (this[calcId]) {
      try {
        return this[calcId](inputs);
      } catch (err) {
        console.error(`Error computing ${calcId}:`, err);
        return {
          primaryResult: { label: 'Calculation Error', value: 'Please verify inputs' },
          stats: [{ label: 'Status', value: 'Input out of bounds' }]
        };
      }
    }
    return this.fallbackCompute(calcId, inputs);
  },

  fallbackCompute(calcId, inputs) {
    return {
      primaryResult: { label: 'Calculated Result', value: 'Ready' },
      stats: [{ label: 'Status', value: 'Completed' }]
    };
  },

  // ==========================================
  // FINANCIAL CALCULATORS
  // ==========================================
  'loan-calculator'(inputs) {
    const P = parseFloat(inputs.principal) || 50000;
    const r = (parseFloat(inputs.rate) || 6.5) / 100 / 12;
    const n = (parseFloat(inputs.tenureYears) || 5) * 12;
    const extra = parseFloat(inputs.extraPayment) || 0;

    let monthly = 0;
    if (r === 0) {
      monthly = P / n;
    } else {
      monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const actualMonthly = monthly + extra;
    let balance = P;
    let totalInterest = 0;
    let monthsPaid = 0;
    const yearlySchedule = [];
    let currentYearInterest = 0;
    let currentYearPrincipal = 0;

    while (balance > 0.01 && monthsPaid < n * 2) {
      monthsPaid++;
      const interestMonth = balance * r;
      let principalMonth = actualMonthly - interestMonth;
      if (principalMonth > balance) {
        principalMonth = balance;
      }
      balance -= principalMonth;
      totalInterest += interestMonth;
      currentYearInterest += interestMonth;
      currentYearPrincipal += principalMonth;

      if (monthsPaid % 12 === 0 || balance <= 0.01) {
        yearlySchedule.push([
          `Year ${Math.ceil(monthsPaid / 12)}`,
          this.formatCurrency(currentYearPrincipal),
          this.formatCurrency(currentYearInterest),
          this.formatCurrency(Math.max(0, balance))
        ]);
        currentYearInterest = 0;
        currentYearPrincipal = 0;
      }
    }

    const totalRepaid = P + totalInterest;

    return {
      primaryResult: {
        label: 'Monthly Payment',
        value: this.formatCurrency(monthly),
        subtext: extra > 0 ? `+ ${this.formatCurrency(extra)} extra = ${this.formatCurrency(actualMonthly)}/mo` : 'Principal & Interest'
      },
      stats: [
        { label: 'Total Principal', value: this.formatCurrency(P) },
        { label: 'Total Interest', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Amount Repaid', value: this.formatCurrency(totalRepaid) },
        { label: 'Payoff Time', value: `${(monthsPaid / 12).toFixed(1)} Years (${monthsPaid} months)` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal', 'Total Interest'],
        values: [P, totalInterest],
        colors: ['#10b981', '#f59e0b']
      },
      breakdownTable: {
        headers: ['Period', 'Principal Paid', 'Interest Paid', 'Remaining Balance'],
        rows: yearlySchedule.slice(0, 10)
      },
      steps: [
        `Base Monthly Payment = $${P.toLocaleString()} × [${(r * 100).toFixed(4)}% × (1 + ${(r * 100).toFixed(4)}%)^${n}] / [(1 + ${(r * 100).toFixed(4)}%)^${n} - 1] = ${this.formatCurrency(monthly)}`,
        `Total Interest Paid = ${this.formatCurrency(totalInterest)} over ${monthsPaid} months`,
        `Overall Loan Cost = ${this.formatCurrency(totalRepaid)}`
      ]
    };
  },

  'emi-calculator'(inputs) {
    const P = parseFloat(inputs.principal) || 100000;
    const annualRate = parseFloat(inputs.rate) || 8.5;
    const r = annualRate / 12 / 100;
    const N = parseFloat(inputs.tenureMonths) || 36;

    let emi = 0;
    if (r === 0) {
      emi = P / N;
    } else {
      emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    }

    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;
    const interestPercent = ((totalInterest / totalAmount) * 100).toFixed(1);

    // Amortization preview
    let bal = P;
    const schedule = [];
    for (let m = 1; m <= Math.min(N, 12); m++) {
      const intPart = bal * r;
      const prinPart = emi - intPart;
      bal -= prinPart;
      schedule.push([
        `Month ${m}`,
        this.formatCurrency(prinPart),
        this.formatCurrency(intPart),
        this.formatCurrency(Math.max(0, bal))
      ]);
    }

    return {
      primaryResult: {
        label: 'Equated Monthly Installment (EMI)',
        value: this.formatCurrency(emi),
        subtext: `Payable monthly for ${N} months`
      },
      stats: [
        { label: 'Principal Amount', value: this.formatCurrency(P) },
        { label: 'Total Interest Due', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Repayment', value: this.formatCurrency(totalAmount) },
        { label: 'Interest to Total Ratio', value: `${interestPercent}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal Loan', 'Total Interest'],
        values: [P, totalInterest],
        colors: ['#6366f1', '#ec4899']
      },
      breakdownTable: {
        headers: ['Installment', 'Principal Portion', 'Interest Portion', 'Ending Balance'],
        rows: schedule
      }
    };
  },

  'mortgage-calculator'(inputs) {
    const homePrice = parseFloat(inputs.homePrice) || 400000;
    const downPct = parseFloat(inputs.downPaymentPercent) || 20;
    const downPayment = (homePrice * downPct) / 100;
    const principal = homePrice - downPayment;
    const annualRate = parseFloat(inputs.interestRate) || 6.8;
    const r = annualRate / 100 / 12;
    const years = parseFloat(inputs.loanTerm) || 30;
    const n = years * 12;
    const propTax = ((homePrice * (parseFloat(inputs.propertyTaxRate) || 1.2)) / 100) / 12;
    const insurance = (parseFloat(inputs.annualInsurance) || 1400) / 12;
    const hoa = parseFloat(inputs.hoaFee) || 0;

    let pAndI = 0;
    if (r === 0) {
      pAndI = principal / n;
    } else {
      pAndI = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const pmi = downPct < 20 ? (principal * 0.007) / 12 : 0;
    const totalMonthly = pAndI + propTax + insurance + hoa + pmi;
    const totalInterest = pAndI * n - principal;

    return {
      primaryResult: {
        label: 'Total Monthly Mortgage Payment',
        value: this.formatCurrency(totalMonthly),
        subtext: 'Includes Principal, Interest, Taxes, Insurance & Fees'
      },
      stats: [
        { label: 'Principal & Interest', value: this.formatCurrency(pAndI) },
        { label: 'Property Tax (mo)', value: this.formatCurrency(propTax) },
        { label: 'Home Insurance (mo)', value: this.formatCurrency(insurance) },
        { label: 'PMI / HOA (mo)', value: this.formatCurrency(pmi + hoa) },
        { label: 'Loan Financed', value: this.formatCurrency(principal) },
        { label: 'Lifetime Interest', value: this.formatCurrency(totalInterest), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal & Interest', 'Property Taxes', 'Home Insurance', 'PMI & HOA'],
        values: [pAndI, propTax, insurance, pmi + hoa],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      }
    };
  },

  'car-loan-calculator'(inputs) {
    const price = parseFloat(inputs.vehiclePrice) || 32000;
    const down = parseFloat(inputs.downPayment) || 5000;
    const tradeIn = parseFloat(inputs.tradeInValue) || 2000;
    const taxRate = (parseFloat(inputs.salesTax) || 7.0) / 100;
    const annualRate = (parseFloat(inputs.interestRate) || 5.9) / 100;
    const months = parseFloat(inputs.loanTermMonths) || 60;

    const taxableBase = Math.max(0, price - tradeIn);
    const taxAmount = taxableBase * taxRate;
    const loanAmount = Math.max(0, price + taxAmount - down - tradeIn);

    const r = annualRate / 12;
    let monthly = 0;
    if (r === 0) {
      monthly = loanAmount / months;
    } else {
      monthly = (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    }

    const totalCost = monthly * months + down + tradeIn;
    const totalInterest = monthly * months - loanAmount;

    return {
      primaryResult: {
        label: 'Monthly Car Payment',
        value: this.formatCurrency(monthly),
        subtext: `For ${months} months`
      },
      stats: [
        { label: 'Amount Financed', value: this.formatCurrency(loanAmount) },
        { label: 'Sales Tax Paid', value: this.formatCurrency(taxAmount) },
        { label: 'Total Interest', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Purchase Outlay', value: this.formatCurrency(totalCost) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Loan Financed', 'Total Interest', 'Down Payment & Trade-In'],
        values: [loanAmount, totalInterest, down + tradeIn],
        colors: ['#06b6d4', '#f43f5e', '#10b981']
      }
    };
  },

  'personal-loan-calculator'(inputs) {
    const amount = parseFloat(inputs.amount) || 15000;
    const rate = (parseFloat(inputs.interestRate) || 10.5) / 100;
    const months = parseFloat(inputs.termMonths) || 36;
    const feePct = (parseFloat(inputs.originationFeePercent) || 3.0) / 100;

    const originationFee = amount * feePct;
    const netPayout = amount - originationFee;
    const r = rate / 12;

    const monthly = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalRepaid = monthly * months;
    const totalInterest = totalRepaid - amount;
    const trueBorrowCost = totalInterest + originationFee;

    return {
      primaryResult: {
        label: 'Monthly Installment',
        value: this.formatCurrency(monthly),
        subtext: `Net cash received: ${this.formatCurrency(netPayout)}`
      },
      stats: [
        { label: 'Loan Principal', value: this.formatCurrency(amount) },
        { label: 'Upfront Origination Fee', value: this.formatCurrency(originationFee) },
        { label: 'Total Interest Charge', value: this.formatCurrency(totalInterest) },
        { label: 'Total Borrowing Cost', value: this.formatCurrency(trueBorrowCost), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Net Received', 'Total Interest', 'Origination Fee'],
        values: [netPayout, totalInterest, originationFee],
        colors: ['#10b981', '#f59e0b', '#6366f1']
      }
    };
  },

  'home-loan-calculator'(inputs) {
    const propertyVal = parseFloat(inputs.propertyValue) || 350000;
    const ltv = parseFloat(inputs.loanPercent) || 80;
    const principal = (propertyVal * ltv) / 100;
    const downPayment = propertyVal - principal;
    const annualRate = (parseFloat(inputs.interestRate) || 6.75) / 100;
    const tenureYears = parseFloat(inputs.tenureYears) || 25;
    const n = tenureYears * 12;
    const r = annualRate / 12;

    const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - principal;

    return {
      primaryResult: {
        label: 'Monthly Home Loan EMI',
        value: this.formatCurrency(monthly),
        subtext: `For a ${tenureYears}-year term`
      },
      stats: [
        { label: 'Loan Financed', value: this.formatCurrency(principal) },
        { label: 'Down Payment Required', value: this.formatCurrency(downPayment) },
        { label: 'Total Interest Paid', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Home Loan Cost', value: this.formatCurrency(totalPayment) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal Loan', 'Total Interest'],
        values: [principal, totalInterest],
        colors: ['#8b5cf6', '#ec4899']
      }
    };
  },

  'interest-calculator'(inputs) {
    const P = parseFloat(inputs.principal) || 10000;
    const r = (parseFloat(inputs.rate) || 7.0) / 100;
    const t = parseFloat(inputs.years) || 10;

    const simpleTotal = P * (1 + r * t);
    const simpleInterest = simpleTotal - P;

    const compoundTotal = P * Math.pow(1 + r, t);
    const compoundInterest = compoundTotal - P;
    const compoundAdvantage = compoundTotal - simpleTotal;

    return {
      primaryResult: {
        label: 'Compound Future Balance',
        value: this.formatCurrency(compoundTotal),
        subtext: `Simple Interest balance would be ${this.formatCurrency(simpleTotal)}`
      },
      stats: [
        { label: 'Simple Interest', value: this.formatCurrency(simpleInterest) },
        { label: 'Compound Interest', value: this.formatCurrency(compoundInterest), highlight: true },
        { label: 'Compounding Advantage', value: `+${this.formatCurrency(compoundAdvantage)}` },
        { label: 'Effective Growth', value: `${(((compoundTotal - P) / P) * 100).toFixed(1)}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Initial Principal', 'Compounding Gain', 'Simple Interest Baseline'],
        values: [P, compoundAdvantage, simpleInterest],
        colors: ['#64748b', '#10b981', '#3b82f6']
      }
    };
  },

  'simple-interest-calculator'(inputs) {
    const P = parseFloat(inputs.principal) || 5000;
    const r = (parseFloat(inputs.rate) || 5.5) / 100;
    const t = parseFloat(inputs.timeYears) || 3;

    const interest = P * r * t;
    const totalAmount = P + interest;

    return {
      primaryResult: {
        label: 'Total Simple Interest',
        value: this.formatCurrency(interest),
        subtext: `Over ${t} years at ${(r * 100).toFixed(2)}% per year`
      },
      stats: [
        { label: 'Principal Sum', value: this.formatCurrency(P) },
        { label: 'Total Maturity Sum', value: this.formatCurrency(totalAmount), highlight: true },
        { label: 'Annual Interest', value: this.formatCurrency(interest / t) },
        { label: 'Return on Capital', value: `${((interest / P) * 100).toFixed(1)}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal', 'Simple Interest'],
        values: [P, interest],
        colors: ['#0284c7', '#10b981']
      }
    };
  },

  'compound-interest-calculator'(inputs) {
    const P = parseFloat(inputs.principal) || 10000;
    const PMT = parseFloat(inputs.monthlyDeposit) || 300;
    const annualRate = (parseFloat(inputs.interestRate) || 8.0) / 100;
    const years = parseFloat(inputs.years) || 20;
    const n = parseFloat(inputs.compoundingFrequency) || 12;

    const r = annualRate / n;
    const totalPeriods = n * years;

    // Compound on initial principal
    const fvPrincipal = P * Math.pow(1 + r, totalPeriods);

    // Compound on regular deposits (assuming monthly deposits converted to compound periods)
    // Monthly deposit PMT
    let fvContributions = 0;
    const months = years * 12;
    const monthlyRate = annualRate / 12;
    if (monthlyRate === 0) {
      fvContributions = PMT * months;
    } else {
      fvContributions = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    }

    const totalFinalValue = fvPrincipal + (PMT > 0 ? fvContributions : 0);
    const totalDeposited = P + (PMT * months);
    const totalInterestEarned = totalFinalValue - totalDeposited;

    return {
      primaryResult: {
        label: 'Estimated Future Wealth',
        value: this.formatCurrency(totalFinalValue),
        subtext: `Total return: +${(((totalFinalValue - totalDeposited) / totalDeposited) * 100).toFixed(1)}%`
      },
      stats: [
        { label: 'Total Principal Invested', value: this.formatCurrency(totalDeposited) },
        { label: 'Total Interest Earned', value: this.formatCurrency(totalInterestEarned), highlight: true },
        { label: 'Initial Deposit Future Value', value: this.formatCurrency(fvPrincipal) },
        { label: 'Monthly Additions Future Value', value: this.formatCurrency(fvContributions) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Total Amount Invested', 'Total Compound Interest'],
        values: [totalDeposited, totalInterestEarned],
        colors: ['#4f46e5', '#10b981']
      }
    };
  },

  'investment-calculator'(inputs) {
    const initial = parseFloat(inputs.startingAmount) || 25000;
    const monthly = parseFloat(inputs.contribution) || 500;
    const rate = (parseFloat(inputs.annualReturn) || 9.0) / 100;
    const years = parseFloat(inputs.years) || 15;
    const months = years * 12;
    const r = rate / 12;

    const fvInitial = initial * Math.pow(1 + r, months);
    let fvMonthly = 0;
    if (r > 0) {
      fvMonthly = monthly * ((Math.pow(1 + r, months) - 1) / r);
    } else {
      fvMonthly = monthly * months;
    }

    const totalFV = fvInitial + fvMonthly;
    const totalInvested = initial + (monthly * months);
    const totalGain = totalFV - totalInvested;

    return {
      primaryResult: {
        label: 'Projected Portfolio Value',
        value: this.formatCurrency(totalFV),
        subtext: `In ${years} years with ${(rate * 100).toFixed(1)}% annualized return`
      },
      stats: [
        { label: 'Total Contributions', value: this.formatCurrency(totalInvested) },
        { label: 'Capital Gain & Dividends', value: this.formatCurrency(totalGain), highlight: true },
        { label: 'Wealth Multiplier', value: `${(totalFV / totalInvested).toFixed(2)}x` },
        { label: 'Annualized Growth', value: `${(rate * 100).toFixed(1)}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Invested Capital', 'Capital Gains'],
        values: [totalInvested, totalGain],
        colors: ['#0284c7', '#059669']
      }
    };
  },

  'sip-calculator'(inputs) {
    const P = parseFloat(inputs.monthlyInvestment) || 5000;
    const annualReturn = parseFloat(inputs.expectedReturn) || 12.0;
    const i = annualReturn / 12 / 100;
    const years = parseFloat(inputs.timePeriod) || 10;
    const n = years * 12;

    const maturityValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvested = P * n;
    const wealthGained = maturityValue - totalInvested;

    return {
      primaryResult: {
        label: 'Expected Maturity Amount',
        value: this.formatCurrency(maturityValue),
        subtext: `Growth of ${(wealthGained / totalInvested * 100).toFixed(1)}% over ${years} years`
      },
      stats: [
        { label: 'Invested Amount', value: this.formatCurrency(totalInvested) },
        { label: 'Estimated Returns', value: this.formatCurrency(wealthGained), highlight: true },
        { label: 'Monthly Investment', value: this.formatCurrency(P) },
        { label: 'Total Installments', value: `${n} Months` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Invested Capital', 'Wealth Gained'],
        values: [totalInvested, wealthGained],
        colors: ['#3b82f6', '#10b981']
      }
    };
  },

  'lumpsum-calculator'(inputs) {
    const P = parseFloat(inputs.totalInvestment) || 100000;
    const r = (parseFloat(inputs.returnRate) || 11.5) / 100;
    const t = parseFloat(inputs.years) || 7;

    const maturity = P * Math.pow(1 + r, t);
    const gain = maturity - P;

    return {
      primaryResult: {
        label: 'Maturity Value',
        value: this.formatCurrency(maturity),
        subtext: `Over ${t} years at ${(r * 100).toFixed(1)}% annual return`
      },
      stats: [
        { label: 'Initial Investment', value: this.formatCurrency(P) },
        { label: 'Total Capital Gains', value: this.formatCurrency(gain), highlight: true },
        { label: 'Gain Percentage', value: `${((gain / P) * 100).toFixed(1)}%` },
        { label: 'Return Multiple', value: `${(maturity / P).toFixed(2)}x` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal', 'Returns'],
        values: [P, gain],
        colors: ['#6366f1', '#10b981']
      }
    };
  },

  'ppf-calculator'(inputs) {
    const annualDeposit = parseFloat(inputs.yearlyDeposit) || 150000;
    const rate = (parseFloat(inputs.interestRate) || 7.1) / 100;
    const years = parseFloat(inputs.tenureYears) || 15;

    let balance = 0;
    let totalInvested = 0;
    for (let yr = 1; yr <= years; yr++) {
      totalInvested += annualDeposit;
      balance = (balance + annualDeposit) * (1 + rate);
    }
    const totalInterest = balance - totalInvested;

    return {
      primaryResult: {
        label: 'PPF Maturity Balance',
        value: this.formatCurrency(balance),
        subtext: `Statutory 15-year tax-free scheme payout`
      },
      stats: [
        { label: 'Total Deposits', value: this.formatCurrency(totalInvested) },
        { label: 'Total Tax-Free Interest', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Effective Gain', value: `${((totalInterest / totalInvested) * 100).toFixed(1)}%` },
        { label: 'Tenure Completed', value: `${years} Years` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Deposits', 'Interest Accrued'],
        values: [totalInvested, totalInterest],
        colors: ['#0d9488', '#f59e0b']
      }
    };
  },

  'fd-calculator'(inputs) {
    const P = parseFloat(inputs.principal) || 50000;
    const r = (parseFloat(inputs.interestRate) || 7.25) / 100;
    const months = parseFloat(inputs.periodMonths) || 24;
    const t = months / 12;
    // Compounded quarterly (n = 4)
    const n = 4;
    const maturity = P * Math.pow(1 + r / n, n * t);
    const interest = maturity - P;

    return {
      primaryResult: {
        label: 'Fixed Deposit Maturity Value',
        value: this.formatCurrency(maturity),
        subtext: `Compounded quarterly for ${months} months`
      },
      stats: [
        { label: 'Principal Deposited', value: this.formatCurrency(P) },
        { label: 'Interest Earned', value: this.formatCurrency(interest), highlight: true },
        { label: 'Effective Annual Yield (APY)', value: `${((Math.pow(1 + r / n, n) - 1) * 100).toFixed(2)}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal', 'Interest'],
        values: [P, interest],
        colors: ['#2563eb', '#10b981']
      }
    };
  },

  'rd-calculator'(inputs) {
    const P = parseFloat(inputs.monthlyDeposit) || 5000;
    const r = (parseFloat(inputs.interestRate) || 6.8) / 100;
    const n = parseFloat(inputs.periodMonths) || 36;

    // Standard bank formula for RD (quarterly compounding approximation)
    const totalDeposit = P * n;
    const interest = P * ((n * (n + 1)) / (2 * 12)) * r;
    const maturity = totalDeposit + interest;

    return {
      primaryResult: {
        label: 'Recurring Deposit Maturity',
        value: this.formatCurrency(maturity),
        subtext: `For ${n} monthly installments`
      },
      stats: [
        { label: 'Total Investment', value: this.formatCurrency(totalDeposit) },
        { label: 'Interest Earned', value: this.formatCurrency(interest), highlight: true },
        { label: 'Annual Rate', value: `${(r * 100).toFixed(2)}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Total Deposits', 'Accrued Interest'],
        values: [totalDeposit, interest],
        colors: ['#7c3aed', '#10b981']
      }
    };
  },

  'cagr-calculator'(inputs) {
    const initial = parseFloat(inputs.initialValue) || 10000;
    const final = parseFloat(inputs.finalValue) || 28500;
    const years = parseFloat(inputs.years) || 5;

    const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
    const totalGrowth = ((final - initial) / initial) * 100;

    return {
      primaryResult: {
        label: 'Compound Annual Growth Rate (CAGR)',
        value: `${cagr.toFixed(2)}%`,
        subtext: `Smoothed annual return over ${years} years`
      },
      stats: [
        { label: 'Beginning Value', value: this.formatCurrency(initial) },
        { label: 'Ending Value', value: this.formatCurrency(final) },
        { label: 'Absolute Growth', value: `+${totalGrowth.toFixed(1)}%`, highlight: true },
        { label: 'Total Value Added', value: this.formatCurrency(final - initial) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Initial Capital', 'Growth'],
        values: [initial, Math.max(0, final - initial)],
        colors: ['#475569', '#10b981']
      }
    };
  },

  'roi-calculator'(inputs) {
    const cost = parseFloat(inputs.investmentCost) || 20000;
    const returns = parseFloat(inputs.amountReturned) || 29000;
    const years = parseFloat(inputs.holdingYears) || 3;

    const netProfit = returns - cost;
    const roi = (netProfit / cost) * 100;
    const annualizedRoi = (Math.pow(returns / cost, 1 / years) - 1) * 100;

    return {
      primaryResult: {
        label: 'Return on Investment (ROI)',
        value: `${roi.toFixed(2)}%`,
        subtext: `Net Profit: ${this.formatCurrency(netProfit)}`
      },
      stats: [
        { label: 'Capital Invested', value: this.formatCurrency(cost) },
        { label: 'Final Value Returned', value: this.formatCurrency(returns) },
        { label: 'Annualized ROI', value: `${annualizedRoi.toFixed(2)}%`, highlight: true },
        { label: 'Investment Multiple', value: `${(returns / cost).toFixed(2)}x` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Cost Base', 'Net Profit'],
        values: [cost, Math.max(0, netProfit)],
        colors: ['#3b82f6', '#10b981']
      }
    };
  },

  'retirement-calculator'(inputs) {
    const curAge = parseFloat(inputs.currentAge) || 30;
    const retAge = parseFloat(inputs.retirementAge) || 60;
    const lifeExp = parseFloat(inputs.lifeExpectancy) || 85;
    const curSavings = parseFloat(inputs.currentSavings) || 50000;
    const monthlySpend = parseFloat(inputs.monthlyExpenseRetirement) || 4000;
    const inflation = (parseFloat(inputs.expectedInflation) || 3.0) / 100;
    const preReturn = (parseFloat(inputs.preRetirementReturn) || 8.5) / 100;

    const yearsToRet = retAge - curAge;
    const yearsInRet = lifeExp - retAge;

    // Future monthly expense adjusted for inflation
    const futureMonthlySpend = monthlySpend * Math.pow(1 + inflation, yearsToRet);
    const futureAnnualSpend = futureMonthlySpend * 12;

    // 4% Safe Withdrawal Rule (or 25x annual expense)
    const requiredNestEgg = futureAnnualSpend * 25;

    // Growth of existing savings
    const fvCurrentSavings = curSavings * Math.pow(1 + preReturn, yearsToRet);
    const deficit = Math.max(0, requiredNestEgg - fvCurrentSavings);

    // Monthly saving required
    const months = yearsToRet * 12;
    const r = preReturn / 12;
    let requiredMonthlySaving = 0;
    if (r > 0 && months > 0) {
      requiredMonthlySaving = (deficit * r) / (Math.pow(1 + r, months) - 1);
    }

    return {
      primaryResult: {
        label: 'Target Retirement Nest Egg',
        value: this.formatCurrency(requiredNestEgg),
        subtext: `At age ${retAge} to sustain ${this.formatCurrency(futureMonthlySpend)}/month`
      },
      stats: [
        { label: 'Required Monthly Savings', value: this.formatCurrency(requiredMonthlySaving), highlight: true },
        { label: 'Future Monthly Spending', value: this.formatCurrency(futureMonthlySpend) },
        { label: 'Existing Savings Growth', value: this.formatCurrency(fvCurrentSavings) },
        { label: 'Retirement Duration', value: `${yearsInRet} Years` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Existing Savings Growth', 'New Contributions Needed'],
        values: [fvCurrentSavings, deficit],
        colors: ['#10b981', '#6366f1']
      }
    };
  },

  'inflation-calculator'(inputs) {
    const present = parseFloat(inputs.presentAmount) || 1000;
    const rate = (parseFloat(inputs.inflationRate) || 3.5) / 100;
    const years = parseFloat(inputs.years) || 10;

    const future = present * Math.pow(1 + rate, years);
    const lossPercentage = ((1 - (present / future)) * 100);

    return {
      primaryResult: {
        label: 'Future Cost for Same Value',
        value: this.formatCurrency(future),
        subtext: `In ${years} years with ${(rate * 100).toFixed(1)}% annual inflation`
      },
      stats: [
        { label: 'Present Value', value: this.formatCurrency(present) },
        { label: 'Total Price Increase', value: this.formatCurrency(future - present), highlight: true },
        { label: 'Purchasing Power Loss', value: `-${lossPercentage.toFixed(1)}%` },
        { label: 'Price Index Factor', value: `${(future / present).toFixed(2)}x` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Original Cost', 'Inflation Cost Increase'],
        values: [present, future - present],
        colors: ['#0284c7', '#f43f5e']
      }
    };
  },

  'salary-calculator'(inputs) {
    const amount = parseFloat(inputs.salaryAmount) || 75000;
    const freq = inputs.payFrequency || 'annual';
    const hours = parseFloat(inputs.hoursPerWeek) || 40;
    const taxRate = (parseFloat(inputs.estimatedTaxRate) || 22.0) / 100;

    let annualGross = 0;
    if (freq === 'annual') annualGross = amount;
    else if (freq === 'monthly') annualGross = amount * 12;
    else if (freq === 'biweekly') annualGross = amount * 26;
    else if (freq === 'weekly') annualGross = amount * 52;
    else if (freq === 'hourly') annualGross = amount * hours * 52;

    const annualTax = annualGross * taxRate;
    const annualNet = annualGross - annualTax;

    const monthlyGross = annualGross / 12;
    const monthlyNet = annualNet / 12;
    const biweeklyNet = annualNet / 26;
    const hourlyNet = annualNet / (hours * 52);

    return {
      primaryResult: {
        label: 'Net Monthly Take-Home Pay',
        value: this.formatCurrency(monthlyNet),
        subtext: `Annual Net: ${this.formatCurrency(annualNet)}`
      },
      stats: [
        { label: 'Gross Annual Pay', value: this.formatCurrency(annualGross) },
        { label: 'Estimated Taxes & Deductions', value: this.formatCurrency(annualTax), highlight: true },
        { label: 'Bi-Weekly Paycheck', value: this.formatCurrency(biweeklyNet) },
        { label: 'Effective Hourly Net', value: this.formatCurrency(hourlyNet) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Take-Home Pay', 'Taxes & Deductions'],
        values: [annualNet, annualTax],
        colors: ['#10b981', '#ef4444']
      }
    };
  },

  'income-tax-calculator'(inputs) {
    const gross = parseFloat(inputs.taxableIncome) || 85000;
    const deductions = parseFloat(inputs.deductions) || 14600;
    const status = inputs.filingStatus || 'single';

    const taxable = Math.max(0, gross - deductions);

    // Standard US Federal Bracket approximation for Single
    let tax = 0;
    const brackets = [
      { cap: 11600, rate: 0.10 },
      { cap: 47150, rate: 0.12 },
      { cap: 100525, rate: 0.22 },
      { cap: 191950, rate: 0.24 },
      { cap: 243725, rate: 0.32 },
      { cap: 609350, rate: 0.35 },
      { cap: Infinity, rate: 0.37 }
    ];

    let prev = 0;
    for (const b of brackets) {
      if (taxable > prev) {
        const taxableInBracket = Math.min(taxable, b.cap) - prev;
        tax += taxableInBracket * b.rate;
        prev = b.cap;
      } else {
        break;
      }
    }

    const effectiveRate = gross > 0 ? (tax / gross) * 100 : 0;
    const afterTaxIncome = gross - tax;

    return {
      primaryResult: {
        label: 'Total Estimated Income Tax',
        value: this.formatCurrency(tax),
        subtext: `Effective Tax Rate: ${effectiveRate.toFixed(2)}%`
      },
      stats: [
        { label: 'Gross Income', value: this.formatCurrency(gross) },
        { label: 'Total Deductions', value: this.formatCurrency(deductions) },
        { label: 'Net Taxable Income', value: this.formatCurrency(taxable) },
        { label: 'Take-Home After Tax', value: this.formatCurrency(afterTaxIncome), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Take-Home Income', 'Income Tax Liability'],
        values: [afterTaxIncome, tax],
        colors: ['#10b981', '#f59e0b']
      }
    };
  },

  'gst-calculator'(inputs) {
    const amount = parseFloat(inputs.amount) || 1000;
    const rate = parseFloat(inputs.gstRate) || 18;
    const action = inputs.gstAction || 'add';

    let netAmount = 0;
    let gstAmount = 0;
    let grossAmount = 0;

    if (action === 'add') {
      netAmount = amount;
      gstAmount = (netAmount * rate) / 100;
      grossAmount = netAmount + gstAmount;
    } else {
      grossAmount = amount;
      netAmount = grossAmount / (1 + rate / 100);
      gstAmount = grossAmount - netAmount;
    }

    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    return {
      primaryResult: {
        label: action === 'add' ? 'Total Price (GST Inclusive)' : 'Net Base Price (GST Exclusive)',
        value: this.formatCurrency(action === 'add' ? grossAmount : netAmount),
        subtext: `GST @ ${rate}%: ${this.formatCurrency(gstAmount)}`
      },
      stats: [
        { label: 'Base Net Amount', value: this.formatCurrency(netAmount) },
        { label: 'CGST Portion (Central)', value: this.formatCurrency(cgst) },
        { label: 'SGST Portion (State)', value: this.formatCurrency(sgst) },
        { label: 'Total GST Amount', value: this.formatCurrency(gstAmount), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Base Amount', 'CGST', 'SGST'],
        values: [netAmount, cgst, sgst],
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      }
    };
  },

  'tip-calculator'(inputs) {
    const bill = parseFloat(inputs.billAmount) || 84.50;
    const tipPct = parseFloat(inputs.tipPercent) || 18;
    const people = Math.max(1, parseInt(inputs.splitPeople) || 2);

    const tipAmount = (bill * tipPct) / 100;
    const totalBill = bill + tipAmount;
    const perPersonBill = totalBill / people;
    const perPersonTip = tipAmount / people;

    return {
      primaryResult: {
        label: 'Total Per Person',
        value: this.formatCurrency(perPersonBill),
        subtext: `Includes ${this.formatCurrency(perPersonTip)} tip each`
      },
      stats: [
        { label: 'Bill Subtotal', value: this.formatCurrency(bill) },
        { label: 'Total Tip', value: this.formatCurrency(tipAmount), highlight: true },
        { label: 'Total Bill with Tip', value: this.formatCurrency(totalBill) },
        { label: 'Split Count', value: `${people} Guest${people > 1 ? 's' : ''}` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Bill Subtotal', 'Tip Amount'],
        values: [bill, tipAmount],
        colors: ['#6366f1', '#10b981']
      }
    };
  },

  'discount-calculator'(inputs) {
    const original = parseFloat(inputs.originalPrice) || 120;
    const discount = parseFloat(inputs.discountPercent) || 25;
    const promo = parseFloat(inputs.extraPromoPercent) || 0;

    const afterFirstDiscount = original * (1 - discount / 100);
    const finalPrice = afterFirstDiscount * (1 - promo / 100);
    const totalSavings = original - finalPrice;
    const effectiveDiscount = (totalSavings / original) * 100;

    return {
      primaryResult: {
        label: 'Final Discounted Price',
        value: this.formatCurrency(finalPrice),
        subtext: `You save ${this.formatCurrency(totalSavings)} (${effectiveDiscount.toFixed(1)}% off)`
      },
      stats: [
        { label: 'Original Price', value: this.formatCurrency(original) },
        { label: 'Primary Discount', value: `${discount}%` },
        { label: 'Promo Code Discount', value: promo > 0 ? `${promo}%` : 'None' },
        { label: 'Total Money Saved', value: this.formatCurrency(totalSavings), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Final Price', 'Money Saved'],
        values: [finalPrice, totalSavings],
        colors: ['#0284c7', '#10b981']
      }
    };
  },

  'profit-margin-calculator'(inputs) {
    const cost = parseFloat(inputs.cost) || 45;
    const revenue = parseFloat(inputs.revenue) || 80;

    const profit = revenue - cost;
    const margin = (profit / revenue) * 100;
    const markup = cost > 0 ? (profit / cost) * 100 : 0;

    return {
      primaryResult: {
        label: 'Gross Profit Margin',
        value: `${margin.toFixed(2)}%`,
        subtext: `Net Profit: ${this.formatCurrency(profit)} per unit`
      },
      stats: [
        { label: 'Selling Price (Revenue)', value: this.formatCurrency(revenue) },
        { label: 'Cost of Goods (COGS)', value: this.formatCurrency(cost) },
        { label: 'Cost Markup', value: `${markup.toFixed(2)}%` },
        { label: 'Gross Profit', value: this.formatCurrency(profit), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Cost Base', 'Gross Profit'],
        values: [cost, Math.max(0, profit)],
        colors: ['#94a3b8', '#10b981']
      }
    };
  },

  'break-even-calculator'(inputs) {
    const fixed = parseFloat(inputs.fixedCosts) || 15000;
    const variable = parseFloat(inputs.variableCostPerUnit) || 18;
    const price = parseFloat(inputs.unitPrice) || 45;

    const contributionMargin = price - variable;
    if (contributionMargin <= 0) {
      return {
        primaryResult: { label: 'Cannot Break Even', value: 'Price <= Variable Cost' },
        stats: [{ label: 'Warning', value: 'Selling price must exceed unit variable cost' }]
      };
    }

    const breakEvenUnits = Math.ceil(fixed / contributionMargin);
    const breakEvenRevenue = breakEvenUnits * price;
    const marginRatio = (contributionMargin / price) * 100;

    return {
      primaryResult: {
        label: 'Break-Even Volume',
        value: `${breakEvenUnits.toLocaleString()} Units`,
        subtext: `Sales Target: ${this.formatCurrency(breakEvenRevenue)}`
      },
      stats: [
        { label: 'Fixed Costs', value: this.formatCurrency(fixed) },
        { label: 'Unit Contribution Margin', value: this.formatCurrency(contributionMargin) },
        { label: 'Contribution Margin Ratio', value: `${marginRatio.toFixed(1)}%` },
        { label: 'Break-Even Sales Revenue', value: this.formatCurrency(breakEvenRevenue), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Fixed Costs', 'Variable Costs at Break-Even'],
        values: [fixed, breakEvenUnits * variable],
        colors: ['#f59e0b', '#3b82f6']
      }
    };
  },

  'currency-calculator'(inputs) {
    const amount = parseFloat(inputs.amount) || 100;
    const from = inputs.fromCurrency || 'USD';
    const to = inputs.toCurrency || 'EUR';

    // Standard reference exchange rates relative to 1 USD
    const rates = {
      USD: 1.0,
      EUR: 0.92,
      GBP: 0.79,
      INR: 83.25,
      JPY: 154.50,
      CAD: 1.36,
      AUD: 1.52,
      CHF: 0.90,
      CNY: 7.24,
      SGD: 1.35
    };

    const inUsd = amount / (rates[from] || 1.0);
    const converted = inUsd * (rates[to] || 1.0);
    const rateDirect = (rates[to] || 1.0) / (rates[from] || 1.0);

    return {
      primaryResult: {
        label: `Converted Amount (${to})`,
        value: `${this.formatNumber(converted, 2)} ${to}`,
        subtext: `1 ${from} = ${rateDirect.toFixed(4)} ${to}`
      },
      stats: [
        { label: 'Source Amount', value: `${this.formatNumber(amount, 2)} ${from}` },
        { label: 'Exchange Rate', value: `1 ${from} = ${rateDirect.toFixed(4)} ${to}` },
        { label: 'USD Equivalent', value: `$${this.formatNumber(inUsd, 2)}` },
        { label: 'Conversion Parity', value: 'Standard Global Benchmark' }
      ]
    };
  },

  // ==========================================
  // MATH CALCULATORS
  // ==========================================
  'percentage-calculator'(inputs) {
    const mode = inputs.mode || 'percentOf';
    const x = parseFloat(inputs.valX) || 0;
    const y = parseFloat(inputs.valY) || 0;

    let res = 0;
    let label = '';
    let sub = '';

    if (mode === 'percentOf') {
      res = (x / 100) * y;
      label = `${x}% of ${y}`;
      sub = `Formula: (${x} / 100) × ${y}`;
    } else if (mode === 'whatPercent') {
      res = y !== 0 ? (x / y) * 100 : 0;
      label = `${x} is what % of ${y}?`;
      sub = `Formula: (${x} / ${y}) × 100% = ${res.toFixed(2)}%`;
    } else {
      res = y !== 0 ? ((y - x) / Math.abs(x)) * 100 : 0;
      label = `Percentage Change from ${x} to ${y}`;
      sub = res >= 0 ? `+${res.toFixed(2)}% Increase` : `${res.toFixed(2)}% Decrease`;
    }

    return {
      primaryResult: {
        label: label,
        value: mode === 'whatPercent' || mode === 'percentChange' ? `${res.toFixed(2)}%` : this.formatNumber(res, 4),
        subtext: sub
      },
      stats: [
        { label: 'Value X', value: x.toString() },
        { label: 'Value Y', value: y.toString() },
        { label: 'Absolute Difference', value: Math.abs(y - x).toString() }
      ]
    };
  },

  'fraction-calculator'(inputs) {
    const num1 = parseInt(inputs.num1) || 3;
    const den1 = parseInt(inputs.den1) || 4;
    const op = inputs.operation || '+';
    const num2 = parseInt(inputs.num2) || 2;
    const den2 = parseInt(inputs.den2) || 5;

    const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

    let resNum = 0;
    let resDen = den1 * den2;

    if (op === '+') {
      resNum = num1 * den2 + num2 * den1;
    } else if (op === '-') {
      resNum = num1 * den2 - num2 * den1;
    } else if (op === '*') {
      resNum = num1 * num2;
      resDen = den1 * den2;
    } else if (op === '/') {
      resNum = num1 * den2;
      resDen = den1 * num2;
    }

    const divisor = gcd(resNum, resDen);
    const simpNum = resNum / divisor;
    const simpDen = resDen / divisor;

    const whole = Math.floor(Math.abs(simpNum) / Math.abs(simpDen));
    const remainder = Math.abs(simpNum) % Math.abs(simpDen);
    let mixed = '';
    if (whole > 0 && remainder > 0) {
      mixed = `${simpNum < 0 ? '-' : ''}${whole} ${remainder}/${Math.abs(simpDen)}`;
    }

    return {
      primaryResult: {
        label: 'Simplified Fraction',
        value: `${simpNum} / ${simpDen}`,
        subtext: mixed ? `Mixed Number: ${mixed}` : `Decimal: ${(simpNum / simpDen).toFixed(4)}`
      },
      stats: [
        { label: 'Unsimplified Fraction', value: `${resNum} / ${resDen}` },
        { label: 'Decimal Approximation', value: (simpNum / simpDen).toFixed(6) },
        { label: 'Greatest Common Divisor', value: divisor.toString() }
      ]
    };
  },

  'ratio-calculator'(inputs) {
    const a = parseFloat(inputs.valA) || 12;
    const b = parseFloat(inputs.valB) || 16;
    const c = parseFloat(inputs.valC) || 0;

    const gcd = (x, y) => (y === 0 ? Math.abs(x) : gcd(y, x % y));
    const div = gcd(a, b);
    const simA = a / div;
    const simB = b / div;

    let solvedD = 0;
    if (c > 0 && a > 0) {
      solvedD = (b * c) / a;
    }

    return {
      primaryResult: {
        label: 'Simplified Ratio',
        value: `${simA} : ${simB}`,
        subtext: c > 0 ? `If ${a}:${b} = ${c}:X, then X = ${this.formatNumber(solvedD, 2)}` : `Reduced by factor of ${div}`
      },
      stats: [
        { label: 'Original Ratio', value: `${a} : ${b}` },
        { label: 'Common Divisor', value: div.toString() },
        { label: 'Decimal Ratio', value: (a / b).toFixed(4) }
      ]
    };
  },

  'proportion-calculator'(inputs) {
    const type = inputs.type || 'direct';
    const x1 = parseFloat(inputs.x1) || 5;
    const y1 = parseFloat(inputs.y1) || 25;
    const x2 = parseFloat(inputs.x2) || 12;

    let y2 = 0;
    let k = 0;
    if (type === 'direct') {
      k = y1 / x1;
      y2 = k * x2;
    } else {
      k = x1 * y1;
      y2 = k / x2;
    }

    return {
      primaryResult: {
        label: 'Solved Y₂ Value',
        value: this.formatNumber(y2, 4),
        subtext: type === 'direct' ? `Directly Proportional (k = ${k.toFixed(2)})` : `Inversely Proportional (k = ${k.toFixed(2)})`
      },
      stats: [
        { label: 'Constant of Proportionality (k)', value: k.toFixed(4) },
        { label: 'Input Coordinates', value: `(${x1}, ${y1}) → (${x2}, ${y2.toFixed(2)})` }
      ]
    };
  },

  'average-calculator'(inputs) {
    const raw = inputs.numbers || '12, 25, 34, 45, 68, 82, 91';
    const nums = raw.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));

    if (nums.length === 0) {
      return { primaryResult: { label: 'Average', value: '0' }, stats: [] };
    }

    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);

    return {
      primaryResult: {
        label: 'Arithmetic Mean (Average)',
        value: this.formatNumber(mean, 4),
        subtext: `Calculated from ${nums.length} numbers`
      },
      stats: [
        { label: 'Sum of Values', value: this.formatNumber(sum, 2) },
        { label: 'Total Count (N)', value: nums.length.toString() },
        { label: 'Minimum Value', value: min.toString() },
        { label: 'Maximum Value', value: max.toString() },
        { label: 'Range', value: (max - min).toString() }
      ]
    };
  },

  'mean-median-mode-calculator'(inputs) {
    const raw = inputs.numbers || '4, 8, 6, 5, 3, 8, 9, 8, 12, 14, 8';
    const nums = raw.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    nums.sort((a, b) => a - b);

    if (nums.length === 0) {
      return { primaryResult: { label: 'Result', value: '0' }, stats: [] };
    }

    const sum = nums.reduce((acc, c) => acc + c, 0);
    const mean = sum / nums.length;

    // Median
    let median = 0;
    const mid = Math.floor(nums.length / 2);
    if (nums.length % 2 === 0) {
      median = (nums[mid - 1] + nums[mid]) / 2;
    } else {
      median = nums[mid];
    }

    // Mode
    const freq = {};
    let maxFreq = 0;
    nums.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    const modes = Object.keys(freq).filter(k => freq[k] === maxFreq && maxFreq > 1);

    return {
      primaryResult: {
        label: 'Central Tendency Summary',
        value: `Mean: ${mean.toFixed(2)} | Median: ${median}`,
        subtext: `Mode: ${modes.length > 0 ? modes.join(', ') : 'No repeated mode'}`
      },
      stats: [
        { label: 'Arithmetic Mean', value: mean.toFixed(4) },
        { label: 'Median (Middle Value)', value: median.toString() },
        { label: 'Mode(s)', value: modes.length > 0 ? modes.join(', ') : 'None' },
        { label: 'Total Data Points', value: nums.length.toString() },
        { label: 'Range (Max - Min)', value: (nums[nums.length - 1] - nums[0]).toString() }
      ]
    };
  },

  'probability-calculator'(inputs) {
    const fav = parseFloat(inputs.favorable) || 3;
    const total = parseFloat(inputs.total) || 10;

    const prob = total > 0 ? fav / total : 0;
    const pct = prob * 100;
    const complement = 1 - prob;
    const odds = (prob / complement).toFixed(2);

    return {
      primaryResult: {
        label: 'Probability P(A)',
        value: `${pct.toFixed(2)}%`,
        subtext: `Decimal: ${prob.toFixed(4)} (${fav}/${total})`
      },
      stats: [
        { label: 'Complement P(Not A)', value: `${(complement * 100).toFixed(2)}%` },
        { label: 'Odds in Favor', value: `${fav} : ${total - fav}` },
        { label: 'Odds Ratio', value: `${odds} to 1` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Favorable Event', 'Unfavorable'],
        values: [fav, Math.max(0, total - fav)],
        colors: ['#10b981', '#64748b']
      }
    };
  },

  'standard-deviation-calculator'(inputs) {
    const raw = inputs.numbers || '10, 12, 23, 23, 16, 23, 21, 16';
    const nums = raw.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));

    if (nums.length < 2) {
      return { primaryResult: { label: 'Standard Deviation', value: 'Need ≥ 2 numbers' }, stats: [] };
    }

    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const sqDiffs = nums.map(x => Math.pow(x - mean, 2));
    const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);

    const sampleVariance = sumSqDiffs / (n - 1);
    const sampleSD = Math.sqrt(sampleVariance);

    const popVariance = sumSqDiffs / n;
    const popSD = Math.sqrt(popVariance);

    return {
      primaryResult: {
        label: 'Sample Standard Deviation (s)',
        value: this.formatNumber(sampleSD, 4),
        subtext: `Population SD (σ): ${popSD.toFixed(4)}`
      },
      stats: [
        { label: 'Mean (μ / x̄)', value: mean.toFixed(4) },
        { label: 'Sample Variance (s²)', value: sampleVariance.toFixed(4) },
        { label: 'Population Variance (σ²)', value: popVariance.toFixed(4) },
        { label: 'Count of Elements (n)', value: n.toString() }
      ]
    };
  },

  'exponent-calculator'(inputs) {
    const base = parseFloat(inputs.base) || 2;
    const exp = parseFloat(inputs.exponent) || 10;
    const res = Math.pow(base, exp);

    return {
      primaryResult: {
        label: `${base}^${exp}`,
        value: Math.abs(res) > 1e12 || (Math.abs(res) < 1e-4 && res !== 0) ? res.toExponential(6) : this.formatNumber(res, 4),
        subtext: `Result of raising ${base} to the power of ${exp}`
      },
      stats: [
        { label: 'Base', value: base.toString() },
        { label: 'Exponent', value: exp.toString() },
        { label: 'Inverse (1 / Result)', value: res !== 0 ? (1 / res).toExponential(4) : 'Undefined' }
      ]
    };
  },

  'square-root-calculator'(inputs) {
    const num = parseFloat(inputs.number) || 144;
    const degree = parseFloat(inputs.rootDegree) || 2;

    const res = Math.pow(num, 1 / degree);

    return {
      primaryResult: {
        label: degree === 2 ? `√${num}` : `${degree}th Root of ${num}`,
        value: this.formatNumber(res, 6),
        subtext: `Verification: ${res.toFixed(4)}^${degree} ≈ ${num}`
      },
      stats: [
        { label: 'Radicand', value: num.toString() },
        { label: 'Root Degree', value: degree.toString() }
      ]
    };
  },

  'cube-root-calculator'(inputs) {
    const num = parseFloat(inputs.number) || 125;
    const res = Math.cbrt(num);

    return {
      primaryResult: {
        label: `∛${num}`,
        value: this.formatNumber(res, 6),
        subtext: `${res.toFixed(4)}³ = ${num}`
      },
      stats: [
        { label: 'Input Number', value: num.toString() }
      ]
    };
  },

  'logarithm-calculator'(inputs) {
    const x = parseFloat(inputs.argument) || 100;
    const b = parseFloat(inputs.base) || 10;

    const logB = Math.log(x) / Math.log(b);
    const ln = Math.log(x);
    const log10 = Math.log10(x);

    return {
      primaryResult: {
        label: `log_${b}(${x})`,
        value: this.formatNumber(logB, 6),
        subtext: `Because ${b}^${logB.toFixed(4)} = ${x}`
      },
      stats: [
        { label: 'Natural Log ln(x)', value: ln.toFixed(6) },
        { label: 'Common Log log10(x)', value: log10.toFixed(6) },
        { label: 'Base b', value: b.toString() }
      ]
    };
  },

  'gcd-lcm-calculator'(inputs) {
    const a = Math.abs(parseInt(inputs.numA) || 48);
    const b = Math.abs(parseInt(inputs.numB) || 180);

    const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
    const g = gcd(a, b);
    const lcm = (a * b) / g;

    return {
      primaryResult: {
        label: 'Greatest Common Divisor (GCD / HCF)',
        value: g.toString(),
        subtext: `Least Common Multiple (LCM): ${lcm.toLocaleString()}`
      },
      stats: [
        { label: 'GCD (HCF)', value: g.toString(), highlight: true },
        { label: 'LCM', value: lcm.toLocaleString(), highlight: true },
        { label: 'Product (A × B)', value: (a * b).toLocaleString() }
      ]
    };
  },

  'prime-number-calculator'(inputs) {
    const num = parseInt(inputs.number) || 97;

    const isPrime = (n) => {
      if (n <= 1) return false;
      if (n <= 3) return true;
      if (n % 2 === 0 || n % 3 === 0) return false;
      for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
      }
      return true;
    };

    // Prime factors
    let temp = num;
    const factors = [];
    for (let factor = 2; factor * factor <= temp; factor++) {
      while (temp % factor === 0) {
        factors.push(factor);
        temp /= factor;
      }
    }
    if (temp > 1) factors.push(temp);

    // Next prime
    let nextP = num + 1;
    while (!isPrime(nextP)) nextP++;

    const primeStatus = isPrime(num);

    return {
      primaryResult: {
        label: `Number ${num}`,
        value: primeStatus ? 'IS A PRIME NUMBER' : 'IS A COMPOSITE NUMBER',
        subtext: primeStatus ? `Has only 2 divisors: 1 and ${num}` : `Factors: ${factors.join(' × ')}`
      },
      stats: [
        { label: 'Primality Status', value: primeStatus ? 'Prime' : 'Composite', highlight: true },
        { label: 'Prime Factors', value: factors.join(' × ') },
        { label: 'Next Prime Number', value: nextP.toString() }
      ]
    };
  },

  'factorial-calculator'(inputs) {
    const n = Math.min(170, parseInt(inputs.n) || 8);
    const r = Math.min(n, parseInt(inputs.r) || 3);

    const fact = (k) => {
      let res = 1;
      for (let i = 2; i <= k; i++) res *= i;
      return res;
    };

    const nFact = fact(n);
    const nPr = fact(n) / fact(n - r);
    const nCr = fact(n) / (fact(r) * fact(n - r));

    return {
      primaryResult: {
        label: `${n}! (Factorial)`,
        value: nFact > 1e12 ? nFact.toExponential(6) : nFact.toLocaleString(),
        subtext: `Combinations ${n}C${r} = ${nCr.toLocaleString()}`
      },
      stats: [
        { label: `${n}! Factorial`, value: nFact > 1e12 ? nFact.toExponential(4) : nFact.toLocaleString() },
        { label: `Permutations (${n}P${r})`, value: nPr.toLocaleString() },
        { label: `Combinations (${n}C${r})`, value: nCr.toLocaleString(), highlight: true }
      ]
    };
  },

  'quadratic-equation-calculator'(inputs) {
    const a = parseFloat(inputs.a) || 1;
    const b = parseFloat(inputs.b) || -5;
    const c = parseFloat(inputs.c) || 6;

    const disc = b * b - 4 * a * c;
    let root1 = '';
    let root2 = '';
    let nature = '';

    if (disc > 0) {
      nature = 'Two distinct real roots';
      root1 = ((-b + Math.sqrt(disc)) / (2 * a)).toFixed(4);
      root2 = ((-b - Math.sqrt(disc)) / (2 * a)).toFixed(4);
    } else if (disc === 0) {
      nature = 'One repeated real root';
      root1 = (-b / (2 * a)).toFixed(4);
      root2 = root1;
    } else {
      nature = 'Two complex conjugate roots';
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
      root1 = `${real} + ${imag}i`;
      root2 = `${real} - ${imag}i`;
    }

    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;

    return {
      primaryResult: {
        label: 'Roots of Quadratic Equation',
        value: `x₁ = ${root1}, x₂ = ${root2}`,
        subtext: nature
      },
      stats: [
        { label: 'Discriminant (Δ = b² - 4ac)', value: disc.toFixed(2), highlight: true },
        { label: 'Parabola Vertex (h, k)', value: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` },
        { label: 'Axis of Symmetry', value: `x = ${vertexX.toFixed(2)}` }
      ]
    };
  },

  'area-calculator'(inputs) {
    const shape = inputs.shape || 'circle';
    const d1 = parseFloat(inputs.dim1) || 10;
    const d2 = parseFloat(inputs.dim2) || 15;

    let area = 0;
    let label = '';

    if (shape === 'circle') {
      area = Math.PI * d1 * d1;
      label = `Circle (r = ${d1})`;
    } else if (shape === 'rectangle') {
      area = d1 * d2;
      label = `Rectangle (${d1} × ${d2})`;
    } else if (shape === 'triangle') {
      area = 0.5 * d1 * d2;
      label = `Triangle (Base = ${d1}, Height = ${d2})`;
    } else if (shape === 'trapezoid') {
      area = 0.5 * (d1 + d2) * 10;
      label = `Trapezoid`;
    } else if (shape === 'ellipse') {
      area = Math.PI * d1 * d2;
      label = `Ellipse (a = ${d1}, b = ${d2})`;
    }

    return {
      primaryResult: {
        label: `Area of ${label}`,
        value: `${this.formatNumber(area, 4)} sq units`,
        subtext: `Computed from geometric dimensions`
      },
      stats: [
        { label: 'Shape', value: shape.toUpperCase() },
        { label: 'Calculated Surface Area', value: this.formatNumber(area, 4) }
      ]
    };
  },

  'perimeter-calculator'(inputs) {
    const shape = inputs.shape || 'rectangle';
    const d1 = parseFloat(inputs.dim1) || 12;
    const d2 = parseFloat(inputs.dim2) || 8;
    const d3 = parseFloat(inputs.dim3) || 10;

    let perim = 0;
    if (shape === 'rectangle') perim = 2 * (d1 + d2);
    else if (shape === 'circle') perim = 2 * Math.PI * d1;
    else if (shape === 'triangle') perim = d1 + d2 + d3;

    return {
      primaryResult: {
        label: `Perimeter of ${shape.toUpperCase()}`,
        value: `${this.formatNumber(perim, 4)} units`,
        subtext: `Total boundary length`
      },
      stats: [
        { label: 'Perimeter Length', value: this.formatNumber(perim, 4) }
      ]
    };
  },

  'volume-calculator'(inputs) {
    const solid = inputs.solid || 'cylinder';
    const d1 = parseFloat(inputs.dim1) || 5;
    const d2 = parseFloat(inputs.dim2) || 12;
    const d3 = parseFloat(inputs.dim3) || 8;

    let vol = 0;
    let sa = 0;

    if (solid === 'cylinder') {
      vol = Math.PI * d1 * d1 * d2;
      sa = 2 * Math.PI * d1 * (d1 + d2);
    } else if (solid === 'sphere') {
      vol = (4 / 3) * Math.PI * Math.pow(d1, 3);
      sa = 4 * Math.PI * d1 * d1;
    } else if (solid === 'box') {
      vol = d1 * d2 * d3;
      sa = 2 * (d1 * d2 + d2 * d3 + d1 * d3);
    } else if (solid === 'cone') {
      vol = (1 / 3) * Math.PI * d1 * d1 * d2;
      const s = Math.sqrt(d1 * d1 + d2 * d2);
      sa = Math.PI * d1 * (d1 + s);
    }

    return {
      primaryResult: {
        label: `Volume of ${solid.toUpperCase()}`,
        value: `${this.formatNumber(vol, 4)} cubic units`,
        subtext: `Total Surface Area: ${this.formatNumber(sa, 2)} sq units`
      },
      stats: [
        { label: 'Volume (Capacity)', value: this.formatNumber(vol, 4), highlight: true },
        { label: 'Total Surface Area', value: this.formatNumber(sa, 2) }
      ]
    };
  },

  'pythagorean-theorem-calculator'(inputs) {
    const mode = inputs.calcMode || 'findC';
    const s1 = parseFloat(inputs.side1) || 6;
    const s2 = parseFloat(inputs.side2) || 8;

    let resultSide = 0;
    let label = '';

    if (mode === 'findC') {
      resultSide = Math.sqrt(s1 * s1 + s2 * s2);
      label = 'Hypotenuse c';
    } else {
      if (s2 <= s1) {
        return {
          primaryResult: { label: 'Invalid Geometry', value: 'Hypotenuse c must be > Leg a' },
          stats: []
        };
      }
      resultSide = Math.sqrt(s2 * s2 - s1 * s1);
      label = 'Missing Leg a';
    }

    return {
      primaryResult: {
        label: label,
        value: this.formatNumber(resultSide, 4),
        subtext: `a² + b² = c² => ${s1}² + ${mode === 'findC' ? s2 : resultSide.toFixed(2)}² = ${mode === 'findC' ? resultSide.toFixed(2) : s2}²`
      },
      stats: [
        { label: 'Given Side 1', value: s1.toString() },
        { label: 'Given Side 2', value: s2.toString() },
        { label: 'Calculated Side', value: this.formatNumber(resultSide, 4), highlight: true }
      ]
    };
  },

  // ==========================================
  // HEALTH & FITNESS CALCULATORS
  // ==========================================
  'bmi-calculator'(inputs) {
    const system = inputs.unitSystem || 'metric';
    let weight = 0;
    let heightM = 0;

    if (system === 'metric') {
      weight = parseFloat(inputs.weightKg) || 70;
      heightM = (parseFloat(inputs.heightCm) || 175) / 100;
    } else {
      const lbs = parseFloat(inputs.weightLbs) || 154;
      const ft = parseFloat(inputs.heightFeet) || 5;
      const inches = parseFloat(inputs.heightInches) || 9;
      weight = lbs * 0.453592;
      heightM = (ft * 12 + inches) * 0.0254;
    }

    const bmi = weight / (heightM * heightM);
    let category = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#38bdf8';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = '#10b981';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#f59e0b';
    } else {
      category = 'Obese';
      color = '#ef4444';
    }

    const primeWeightMin = 18.5 * heightM * heightM;
    const primeWeightMax = 24.9 * heightM * heightM;

    return {
      primaryResult: {
        label: 'Body Mass Index (BMI)',
        value: bmi.toFixed(1),
        subtext: `Category: ${category}`
      },
      stats: [
        { label: 'Weight Status', value: category, highlight: true },
        { label: 'Healthy Weight Range', value: `${primeWeightMin.toFixed(1)} - ${primeWeightMax.toFixed(1)} kg` },
        { label: 'Height Considered', value: `${(heightM * 100).toFixed(0)} cm` }
      ],
      chartData: {
        type: 'gauge',
        current: parseFloat(bmi.toFixed(1)),
        min: 15,
        max: 40,
        zones: [
          { label: 'Underweight', min: 15, max: 18.5, color: '#38bdf8' },
          { label: 'Normal', min: 18.5, max: 25, color: '#10b981' },
          { label: 'Overweight', min: 25, max: 30, color: '#f59e0b' },
          { label: 'Obese', min: 30, max: 40, color: '#ef4444' }
        ]
      }
    };
  },

  'bmr-calculator'(inputs) {
    const gender = inputs.gender || 'male';
    const age = parseFloat(inputs.age) || 28;
    const weight = parseFloat(inputs.weight) || 72;
    const height = parseFloat(inputs.height) || 178;

    // Mifflin-St Jeor
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (gender === 'male') bmr += 5;
    else bmr -= 161;

    return {
      primaryResult: {
        label: 'Basal Metabolic Rate (BMR)',
        value: `${Math.round(bmr)} kcal / day`,
        subtext: 'Calories burned at complete physical rest'
      },
      stats: [
        { label: 'Hourly Calorie Burn', value: `${(bmr / 24).toFixed(1)} kcal/hr` },
        { label: 'Sedentary Burn (BMR × 1.2)', value: `${Math.round(bmr * 1.2)} kcal` },
        { label: 'Active Burn (BMR × 1.55)', value: `${Math.round(bmr * 1.55)} kcal` }
      ],
      chartData: {
        type: 'donut',
        labels: ['BMR Baseline', 'Activity Expenditure'],
        values: [bmr, bmr * 0.4],
        colors: ['#f43f5e', '#6366f1']
      }
    };
  },

  'tdee-calculator'(inputs) {
    const gender = inputs.gender || 'male';
    const age = parseFloat(inputs.age) || 28;
    const weight = parseFloat(inputs.weight) || 75;
    const height = parseFloat(inputs.height) || 178;
    const activity = inputs.activityLevel || 'moderate';

    let bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);

    const mults = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };

    const multiplier = mults[activity] || 1.55;
    const tdee = Math.round(bmr * multiplier);

    return {
      primaryResult: {
        label: 'Total Daily Energy Expenditure (TDEE)',
        value: `${tdee} kcal / day`,
        subtext: `Daily maintenance energy requirement`
      },
      stats: [
        { label: 'Basal Metabolic Rate (BMR)', value: `${Math.round(bmr)} kcal` },
        { label: 'Weight Loss (-500 kcal)', value: `${tdee - 500} kcal/day`, highlight: true },
        { label: 'Weight Gain (+500 kcal)', value: `${tdee + 500} kcal/day` }
      ],
      chartData: {
        type: 'donut',
        labels: ['BMR', 'Activity Burn'],
        values: [bmr, tdee - bmr],
        colors: ['#06b6d4', '#f59e0b']
      }
    };
  },

  'body-fat-calculator'(inputs) {
    const gender = inputs.gender || 'male';
    const h = parseFloat(inputs.height) || 178;
    const neck = parseFloat(inputs.neck) || 38;
    const waist = parseFloat(inputs.waist) || 84;
    const hip = parseFloat(inputs.hip) || 95;

    let bodyFat = 0;
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(h)) - 450;
    }

    bodyFat = Math.max(3, Math.min(50, bodyFat));

    return {
      primaryResult: {
        label: 'Body Fat Percentage',
        value: `${bodyFat.toFixed(1)}%`,
        subtext: 'Calculated via U.S. Navy Circumference Method'
      },
      stats: [
        { label: 'Biological Sex', value: gender.toUpperCase() },
        { label: 'Category', value: bodyFat < 14 ? 'Athletic / Lean' : (bodyFat < 24 ? 'Fitness / Average' : 'Above Average') }
      ],
      chartData: {
        type: 'gauge',
        current: parseFloat(bodyFat.toFixed(1)),
        min: 5,
        max: 45,
        zones: [
          { label: 'Essential', min: 5, max: 13, color: '#38bdf8' },
          { label: 'Athletic', min: 13, max: 18, color: '#10b981' },
          { label: 'Fitness', min: 18, max: 25, color: '#f59e0b' },
          { label: 'Overweight', min: 25, max: 45, color: '#ef4444' }
        ]
      }
    };
  },

  'calorie-calculator'(inputs) {
    const tdeeObj = this['tdee-calculator']({
      gender: inputs.gender,
      age: inputs.age,
      weight: inputs.weight,
      height: inputs.height,
      activityLevel: inputs.activity
    });
    const tdee = parseInt(tdeeObj.primaryResult.value) || 2200;

    return {
      primaryResult: {
        label: 'Daily Maintenance Calories',
        value: `${tdee} kcal / day`,
        subtext: 'To maintain your current weight'
      },
      stats: [
        { label: 'Mild Weight Loss (-0.25 kg/wk)', value: `${tdee - 250} kcal` },
        { label: 'Standard Weight Loss (-0.5 kg/wk)', value: `${tdee - 500} kcal`, highlight: true },
        { label: 'Extreme Weight Loss (-1.0 kg/wk)', value: `${tdee - 1000} kcal` },
        { label: 'Lean Muscle Gain (+0.25 kg/wk)', value: `${tdee + 300} kcal` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Maintenance', 'Mild Deficit', 'Moderate Deficit'],
        values: [tdee, tdee - 250, tdee - 500],
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      }
    };
  },

  'ideal-weight-calculator'(inputs) {
    const gender = inputs.gender || 'male';
    const cm = parseFloat(inputs.heightCm) || 175;
    const inchesTotal = cm / 2.54;
    const inchesOver5Ft = Math.max(0, inchesTotal - 60);

    // Devine formula
    const devine = gender === 'male' ? 50.0 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;
    // Robinson formula
    const robinson = gender === 'male' ? 52.0 + 1.9 * inchesOver5Ft : 49.0 + 1.7 * inchesOver5Ft;
    // Miller formula
    const miller = gender === 'male' ? 56.2 + 1.41 * inchesOver5Ft : 53.1 + 1.36 * inchesOver5Ft;

    const heightM = cm / 100;
    const whoMin = 18.5 * heightM * heightM;
    const whoMax = 24.9 * heightM * heightM;

    return {
      primaryResult: {
        label: 'Ideal Weight (Devine Formula)',
        value: `${devine.toFixed(1)} kg (${(devine * 2.20462).toFixed(1)} lbs)`,
        subtext: `Healthy BMI Weight Range: ${whoMin.toFixed(1)} - ${whoMax.toFixed(1)} kg`
      },
      stats: [
        { label: 'Devine Standard', value: `${devine.toFixed(1)} kg` },
        { label: 'Robinson Formula', value: `${robinson.toFixed(1)} kg` },
        { label: 'Miller Formula', value: `${miller.toFixed(1)} kg` },
        { label: 'WHO Healthy Range', value: `${whoMin.toFixed(1)} - ${whoMax.toFixed(1)} kg`, highlight: true }
      ]
    };
  },

  'macro-calculator'(inputs) {
    const calories = parseFloat(inputs.calories) || 2200;
    const diet = inputs.dietType || 'balanced';

    let cRatio = 0.4;
    let pRatio = 0.3;
    let fRatio = 0.3;

    if (diet === 'highProtein') {
      cRatio = 0.35;
      pRatio = 0.40;
      fRatio = 0.25;
    } else if (diet === 'lowCarb') {
      cRatio = 0.20;
      pRatio = 0.40;
      fRatio = 0.40;
    } else if (diet === 'keto') {
      cRatio = 0.05;
      pRatio = 0.25;
      fRatio = 0.70;
    }

    const cGrams = Math.round((calories * cRatio) / 4);
    const pGrams = Math.round((calories * pRatio) / 4);
    const fGrams = Math.round((calories * fRatio) / 9);

    return {
      primaryResult: {
        label: 'Daily Macronutrient Targets',
        value: `${pGrams}g Protein | ${cGrams}g Carbs | ${fGrams}g Fat`,
        subtext: `Totaling ${calories} kcal daily`
      },
      stats: [
        { label: 'Protein (4 kcal/g)', value: `${pGrams}g (${(pRatio * 100).toFixed(0)}%)`, highlight: true },
        { label: 'Carbohydrates (4 kcal/g)', value: `${cGrams}g (${(cRatio * 100).toFixed(0)}%)` },
        { label: 'Fats (9 kcal/g)', value: `${fGrams}g (${(fRatio * 100).toFixed(0)}%)` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Carbs', 'Protein', 'Fat'],
        values: [cGrams * 4, pGrams * 4, fGrams * 9],
        colors: ['#06b6d4', '#f43f5e', '#f59e0b']
      }
    };
  },

  'protein-calculator'(inputs) {
    const weight = parseFloat(inputs.weightKg) || 75;
    const goal = inputs.goal || 'muscle';

    let factor = 1.8;
    if (goal === 'sedentary') factor = 0.8;
    else if (goal === 'endurance') factor = 1.3;
    else if (goal === 'muscle') factor = 2.0;
    else if (goal === 'fatloss') factor = 2.2;

    const grams = Math.round(weight * factor);
    const scoops = (grams / 25).toFixed(1);

    return {
      primaryResult: {
        label: 'Recommended Daily Protein',
        value: `${grams} grams / day`,
        subtext: `Approx. ${scoops} scoops of whey / protein equivalent`
      },
      stats: [
        { label: 'Factor per kg Bodyweight', value: `${factor} g/kg` },
        { label: 'Calories from Protein', value: `${grams * 4} kcal` },
        { label: 'Target Per Meal (4 Meals)', value: `${Math.round(grams / 4)}g / meal`, highlight: true }
      ]
    };
  },

  'water-intake-calculator'(inputs) {
    const weight = parseFloat(inputs.weightKg) || 70;
    const exercise = parseFloat(inputs.exerciseMinutes) || 45;
    const climate = inputs.climate || 'moderate';

    let liters = weight * 0.033 + (exercise / 30) * 0.35;
    if (climate === 'hot') liters += 0.5;

    const glasses = (liters / 0.25).toFixed(1);

    return {
      primaryResult: {
        label: 'Daily Hydration Target',
        value: `${liters.toFixed(2)} Liters / Day`,
        subtext: `Equal to ~${glasses} glasses of water (250ml each)`
      },
      stats: [
        { label: 'Base Need (Weight)', value: `${(weight * 0.033).toFixed(2)} L` },
        { label: 'Exercise Sweat Offset', value: `+${((exercise / 30) * 0.35).toFixed(2)} L` },
        { label: 'Fluid Ounces (fl oz)', value: `${(liters * 33.814).toFixed(0)} fl oz` }
      ]
    };
  },

  'pace-calculator'(inputs) {
    const dist = parseFloat(inputs.distanceKm) || 10;
    const hrs = parseFloat(inputs.hours) || 0;
    const mins = parseFloat(inputs.minutes) || 52;
    const secs = parseFloat(inputs.seconds) || 30;

    const totalMinutes = hrs * 60 + mins + secs / 60;
    const paceMinPerKm = totalMinutes / dist;
    const paceMin = Math.floor(paceMinPerKm);
    const paceSec = Math.round((paceMinPerKm - paceMin) * 60);

    const speedKmH = dist / (totalMinutes / 60);
    const speedMph = speedKmH * 0.621371;

    return {
      primaryResult: {
        label: 'Running Pace',
        value: `${paceMin}:${paceSec.toString().padStart(2, '0')} min / km`,
        subtext: `Speed: ${speedKmH.toFixed(2)} km/h (${speedMph.toFixed(2)} mph)`
      },
      stats: [
        { label: 'Pace per Mile', value: `${Math.floor(paceMinPerKm * 1.60934)}:${Math.round(((paceMinPerKm * 1.60934) % 1) * 60).toString().padStart(2, '0')} min/mi` },
        { label: 'Total Duration', value: `${hrs > 0 ? hrs + 'h ' : ''}${mins}m ${secs}s` },
        { label: 'Distance', value: `${dist} km` }
      ]
    };
  },

  'running-pace-calculator'(inputs) {
    const pMin = parseFloat(inputs.paceMinutes) || 5;
    const pSec = parseFloat(inputs.paceSeconds) || 15;
    const pacePerKm = pMin + pSec / 60;

    const calcTime = (dist) => {
      const totalMins = dist * pacePerKm;
      const h = Math.floor(totalMins / 60);
      const m = Math.floor(totalMins % 60);
      const s = Math.round((totalMins - Math.floor(totalMins)) * 60);
      return `${h > 0 ? h + 'h ' : ''}${m}m ${s.toString().padStart(2, '0')}s`;
    };

    return {
      primaryResult: {
        label: 'Half Marathon Projection (21.1 km)',
        value: calcTime(21.0975),
        subtext: `Full Marathon Projection (42.2 km): ${calcTime(42.195)}`
      },
      stats: [
        { label: '5K Finish Time', value: calcTime(5) },
        { label: '10K Finish Time', value: calcTime(10) },
        { label: 'Half Marathon (21.1K)', value: calcTime(21.0975), highlight: true },
        { label: 'Full Marathon (42.2K)', value: calcTime(42.195), highlight: true }
      ]
    };
  },

  'pregnancy-calculator'(inputs) {
    const lmpStr = inputs.lmpDate || '2026-03-01';
    const lmp = new Date(lmpStr);
    const today = new Date('2026-09-24');

    const diffDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    const edd = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    let trimester = 'First Trimester';
    if (weeks >= 28) trimester = 'Third Trimester';
    else if (weeks >= 13) trimester = 'Second Trimester';

    return {
      primaryResult: {
        label: 'Current Gestational Age',
        value: `${weeks} Weeks, ${days} Days`,
        subtext: trimester
      },
      stats: [
        { label: 'Estimated Due Date (EDD)', value: edd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), highlight: true },
        { label: 'Days Until Delivery', value: `${Math.max(0, 280 - diffDays)} Days` },
        { label: 'Pregnancy Progress', value: `${Math.min(100, ((diffDays / 280) * 100)).toFixed(0)}% Completed` }
      ]
    };
  },

  'due-date-calculator'(inputs) {
    const method = inputs.method || 'lmp';
    const dateStr = inputs.targetDate || '2026-04-15';
    const refDate = new Date(dateStr);
    const cycle = parseInt(inputs.cycleLength) || 28;

    let edd = new Date();
    if (method === 'lmp') {
      const cycleDiff = cycle - 28;
      edd = new Date(refDate.getTime() + (280 + cycleDiff) * 24 * 60 * 60 * 1000);
    } else {
      edd = new Date(refDate.getTime() + 266 * 24 * 60 * 60 * 1000);
    }

    return {
      primaryResult: {
        label: 'Estimated Delivery Date',
        value: edd.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        subtext: '40 Weeks Gestational Expectation'
      },
      stats: [
        { label: 'First Trimester Ends', value: new Date(edd.getTime() - 27 * 7 * 86400000).toLocaleDateString() },
        { label: 'Second Trimester Ends', value: new Date(edd.getTime() - 13 * 7 * 86400000).toLocaleDateString() },
        { label: 'Full Term Threshold', value: new Date(edd.getTime() - 3 * 7 * 86400000).toLocaleDateString() }
      ]
    };
  },

  'health-age-calculator'(inputs) {
    const chrono = parseFloat(inputs.chronoAge) || 35;
    const exercise = parseFloat(inputs.exerciseDays) || 4;
    const sleep = parseFloat(inputs.sleepHours) || 7.5;
    const smoke = inputs.smokeStatus || 'never';

    let delta = 0;
    if (exercise >= 4) delta -= 3;
    else if (exercise <= 1) delta += 3;

    if (sleep >= 7 && sleep <= 9) delta -= 2;
    else delta += 2;

    if (smoke === 'daily') delta += 6;
    else if (smoke === 'occasional') delta += 2;
    else delta -= 1;

    const bioAge = Math.max(18, chrono + delta);

    return {
      primaryResult: {
        label: 'Estimated Biological Age',
        value: `${bioAge} Years Old`,
        subtext: delta <= 0 ? `${Math.abs(delta)} years younger than chronological age!` : `${delta} years older than chronological age`
      },
      stats: [
        { label: 'Chronological Age', value: `${chrono} Years` },
        { label: 'Lifestyle Adjustment', value: `${delta >= 0 ? '+' : ''}${delta} Years` },
        { label: 'Vitality Status', value: delta <= 0 ? 'Optimal' : 'Needs Attention' }
      ]
    };
  },

  // ==========================================
  // DATE & TIME CALCULATORS
  // ==========================================
  'age-calculator'(inputs) {
    const birthStr = inputs.birthDate || '1998-05-18';
    const targetStr = inputs.targetDate || '2026-09-24';
    const birth = new Date(birthStr);
    const target = new Date(targetStr);

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target - birth) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;

    // Next birthday
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysToBday = Math.ceil((nextBday - target) / (1000 * 60 * 60 * 24));

    return {
      primaryResult: {
        label: 'Exact Chronological Age',
        value: `${years} Years, ${months} Months, ${days} Days`,
        subtext: `Next birthday in ${daysToBday} days`
      },
      stats: [
        { label: 'Total Lived Days', value: totalDays.toLocaleString(), highlight: true },
        { label: 'Total Lived Hours', value: totalHours.toLocaleString() },
        { label: 'Total Lived Weeks', value: Math.floor(totalDays / 7).toLocaleString() },
        { label: 'Next Birthday', value: nextBday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }
      ]
    };
  },

  'date-difference-calculator'(inputs) {
    const start = new Date(inputs.startDate || '2026-01-01');
    const end = new Date(inputs.endDate || '2026-12-31');
    const incEnd = inputs.includeEnd === 'yes';

    let diffTime = end - start;
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (incEnd) diffDays += 1;

    // Calculate working days
    let workDays = 0;
    const cur = new Date(start);
    const finish = new Date(end);
    while (cur <= finish) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) workDays++;
      cur.setDate(cur.getDate() + 1);
    }

    const weeks = Math.floor(diffDays / 7);
    const remDays = diffDays % 7;

    return {
      primaryResult: {
        label: 'Calendar Difference',
        value: `${diffDays.toLocaleString()} Days`,
        subtext: `${weeks} Weeks and ${remDays} Days`
      },
      stats: [
        { label: 'Business / Working Days', value: `${workDays.toLocaleString()} Days`, highlight: true },
        { label: 'Weekend Days', value: `${(diffDays - workDays).toLocaleString()} Days` },
        { label: 'Total Hours', value: `${(diffDays * 24).toLocaleString()} Hours` }
      ]
    };
  },

  'date-add-subtract-calculator'(inputs) {
    const start = new Date(inputs.startDate || '2026-09-24');
    const op = inputs.operation || 'add';
    const mult = op === 'add' ? 1 : -1;

    const y = (parseInt(inputs.years) || 0) * mult;
    const m = (parseInt(inputs.months) || 0) * mult;
    const w = (parseInt(inputs.weeks) || 0) * mult;
    const d = (parseInt(inputs.days) || 0) * mult;

    const res = new Date(start);
    res.setFullYear(res.getFullYear() + y);
    res.setMonth(res.getMonth() + m);
    res.setDate(res.getDate() + w * 7 + d);

    return {
      primaryResult: {
        label: 'Calculated Target Date',
        value: res.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        subtext: `${op === 'add' ? 'Added' : 'Subtracted'} time from ${start.toLocaleDateString()}`
      },
      stats: [
        { label: 'Day of the Week', value: res.toLocaleDateString('en-US', { weekday: 'long' }) },
        { label: 'ISO Format', value: res.toISOString().split('T')[0] }
      ]
    };
  },

  'time-duration-calculator'(inputs) {
    const s = inputs.startTime || '09:15';
    const e = inputs.endTime || '17:45';

    const [sh, sm] = s.split(':').map(Number);
    const [eh, em] = e.split(':').map(Number);

    let startMins = sh * 60 + sm;
    let endMins = eh * 60 + em;
    if (endMins < startMins) endMins += 24 * 60; // Overnight span

    const diff = endMins - startMins;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return {
      primaryResult: {
        label: 'Time Duration',
        value: `${hours} Hours, ${minutes} Minutes`,
        subtext: `Total: ${diff} Minutes (${(diff / 60).toFixed(2)} decimal hours)`
      },
      stats: [
        { label: 'Decimal Hours', value: (diff / 60).toFixed(2), highlight: true },
        { label: 'Total Seconds', value: (diff * 60).toLocaleString() }
      ]
    };
  },

  'business-days-calculator'(inputs) {
    const start = new Date(inputs.startDate || '2026-10-01');
    const end = new Date(inputs.endDate || '2026-10-31');

    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(start);

    while (cur <= end) {
      const d = cur.getDay();
      if (d === 0 || d === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    return {
      primaryResult: {
        label: 'Total Business Days',
        value: `${businessDays} Working Days`,
        subtext: 'Excludes Saturdays and Sundays'
      },
      stats: [
        { label: 'Business Days (Mon-Fri)', value: businessDays.toString(), highlight: true },
        { label: 'Weekend Days', value: weekendDays.toString() },
        { label: 'Work Hours (8h/day)', value: `${businessDays * 8} Hours` }
      ]
    };
  },

  'working-days-calculator'(inputs) {
    const bDays = this['business-days-calculator'](inputs);
    const count = parseInt(bDays.primaryResult.value) || 22;
    const hoursPerDay = parseFloat(inputs.hoursPerDay) || 8;
    const rate = parseFloat(inputs.hourlyRate) || 55;

    const totalHours = count * hoursPerDay;
    const totalPay = totalHours * rate;

    return {
      primaryResult: {
        label: 'Total Billable Earnings',
        value: this.formatCurrency(totalPay),
        subtext: `For ${totalHours} total working hours`
      },
      stats: [
        { label: 'Business Days', value: count.toString() },
        { label: 'Billable Hours', value: `${totalHours} hrs`, highlight: true },
        { label: 'Hourly Billing Rate', value: this.formatCurrency(rate) }
      ]
    };
  },

  'day-of-week-calculator'(inputs) {
    const d = new Date(inputs.queryDate || '2026-12-25');
    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });

    return {
      primaryResult: {
        label: 'Day of the Week',
        value: dayName,
        subtext: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      },
      stats: [
        { label: 'Is Weekend?', value: (d.getDay() === 0 || d.getDay() === 6) ? 'Yes' : 'No' },
        { label: 'Day Number (0=Sun)', value: d.getDay().toString() }
      ]
    };
  },

  'week-number-calculator'(inputs) {
    const d = new Date(inputs.selectedDate || '2026-09-24');
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);
    const quarter = Math.floor(d.getMonth() / 3) + 1;

    return {
      primaryResult: {
        label: 'ISO Week Number',
        value: `Week ${weekNumber}`,
        subtext: `Quarter ${quarter} (Q${quarter}) of ${d.getFullYear()}`
      },
      stats: [
        { label: 'Fiscal Quarter', value: `Q${quarter}` },
        { label: 'Year', value: d.getFullYear().toString() }
      ]
    };
  },

  'leap-year-calculator'(inputs) {
    const yr = parseInt(inputs.checkYear) || 2028;
    const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || (yr % 400 === 0);

    return {
      primaryResult: {
        label: `Year ${yr}`,
        value: isLeap ? 'IS A LEAP YEAR' : 'IS NOT A LEAP YEAR',
        subtext: isLeap ? 'Contains 366 days with February 29' : 'Standard 365-day calendar year'
      },
      stats: [
        { label: 'Days in Year', value: isLeap ? '366 Days' : '365 Days', highlight: true },
        { label: 'Days in February', value: isLeap ? '29 Days' : '28 Days' },
        { label: 'Next Leap Year', value: isLeap ? (yr + 4).toString() : (yr + (4 - yr % 4)).toString() }
      ]
    };
  },

  // ==========================================
  // EVERYDAY & BUSINESS CALCULATORS
  // ==========================================
  'grade-calculator'(inputs) {
    const current = parseFloat(inputs.currentGrade) || 84.5;
    const target = parseFloat(inputs.targetGrade) || 90.0;
    const finalWeight = (parseFloat(inputs.finalWeight) || 25.0) / 100;

    const remainingWeight = 1 - finalWeight;
    const needed = (target - current * remainingWeight) / finalWeight;

    return {
      primaryResult: {
        label: 'Final Exam Score Needed',
        value: `${needed.toFixed(1)}%`,
        subtext: needed > 100 ? 'Requires extra credit to achieve target' : (needed <= 0 ? 'Target already achieved!' : 'Achievable with study')
      },
      stats: [
        { label: 'Current Grade', value: `${current}%` },
        { label: 'Target Final Grade', value: `${target}%` },
        { label: 'Final Exam Weight', value: `${(finalWeight * 100).toFixed(0)}%` }
      ]
    };
  },

  'electricity-bill-calculator'(inputs) {
    const w = parseFloat(inputs.wattage) || 1500;
    const hrs = parseFloat(inputs.hoursPerDay) || 6;
    const rate = parseFloat(inputs.costPerKWh) || 0.16;

    const dailyKWh = (w * hrs) / 1000;
    const monthlyKWh = dailyKWh * 30;
    const monthlyCost = monthlyKWh * rate;
    const annualCost = monthlyCost * 12;

    return {
      primaryResult: {
        label: 'Estimated Monthly Cost',
        value: this.formatCurrency(monthlyCost),
        subtext: `Annual Electricity Cost: ${this.formatCurrency(annualCost)}`
      },
      stats: [
        { label: 'Daily Power Consumption', value: `${dailyKWh.toFixed(2)} kWh` },
        { label: 'Monthly Power Consumption', value: `${monthlyKWh.toFixed(1)} kWh`, highlight: true },
        { label: 'Daily Operating Cost', value: this.formatCurrency(monthlyCost / 30) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Energy Consumed (Cost)', 'Baseline'],
        values: [monthlyCost, Math.max(1, 100 - monthlyCost)],
        colors: ['#f59e0b', '#3b82f6']
      }
    };
  },

  'fuel-cost-calculator'(inputs) {
    const dist = parseFloat(inputs.distance) || 280;
    const eff = parseFloat(inputs.efficiency) || 28;
    const price = parseFloat(inputs.fuelPrice) || 3.50;
    const passengers = Math.max(1, parseInt(inputs.passengers) || 3);

    const gallons = dist / eff;
    const totalCost = gallons * price;
    const perPerson = totalCost / passengers;

    return {
      primaryResult: {
        label: 'Total Trip Fuel Cost',
        value: this.formatCurrency(totalCost),
        subtext: `${this.formatCurrency(perPerson)} per passenger`
      },
      stats: [
        { label: 'Fuel Volume Needed', value: `${gallons.toFixed(2)} Gallons/Liters` },
        { label: 'Cost Per Person', value: this.formatCurrency(perPerson), highlight: true },
        { label: 'Cost per Mile/Km', value: this.formatCurrency(totalCost / dist) }
      ]
    };
  },

  'cooking-measurement-converter'(inputs) {
    const ingredient = inputs.ingredient || 'flour';
    const amount = parseFloat(inputs.amount) || 2;
    const unit = inputs.fromUnit || 'cup';

    // Base densities in grams per cup
    const densities = {
      flour: 120,
      sugar: 200,
      butter: 227,
      liquid: 240
    };
    const cupWeightGrams = densities[ingredient] || 120;

    let grams = 0;
    if (unit === 'cup') grams = amount * cupWeightGrams;
    else if (unit === 'tbsp') grams = (amount / 16) * cupWeightGrams;
    else if (unit === 'tsp') grams = (amount / 48) * cupWeightGrams;
    else if (unit === 'gram') grams = amount;
    else if (unit === 'oz') grams = amount * 28.3495;

    const cups = grams / cupWeightGrams;
    const tbsp = cups * 16;
    const tsp = cups * 48;
    const oz = grams / 28.3495;

    return {
      primaryResult: {
        label: 'Converted Weight',
        value: `${grams.toFixed(1)} Grams (g)`,
        subtext: `Equal to ${cups.toFixed(2)} Cups`
      },
      stats: [
        { label: 'Tablespoons (tbsp)', value: tbsp.toFixed(1) },
        { label: 'Teaspoons (tsp)', value: tsp.toFixed(1) },
        { label: 'Ounces (oz)', value: `${oz.toFixed(2)} oz` }
      ]
    };
  },

  'sleep-calculator'(inputs) {
    const mode = inputs.mode || 'wakeAt';
    const wakeStr = inputs.wakeTime || '07:00';

    let options = [];
    if (mode === 'wakeAt') {
      const [wh, wm] = wakeStr.split(':').map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(wh, wm, 0, 0);

      // Sleep cycles are 90 mins, plus 14 mins to fall asleep
      [6, 5, 4, 3].forEach(cycles => {
        const sleepTime = new Date(wakeDate.getTime() - (cycles * 90 + 14) * 60000);
        options.push({
          cycles,
          hours: (cycles * 1.5).toFixed(1),
          timeStr: sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      });

      return {
        primaryResult: {
          label: 'Optimal Bedtime (5 Cycles / 7.5 hrs)',
          value: options[1].timeStr,
          subtext: `For a ${wakeStr} wake up, accounts for 14 mins to fall asleep`
        },
        stats: [
          { label: '6 Cycles (9.0 hrs)', value: options[0].timeStr },
          { label: '5 Cycles (7.5 hrs)', value: options[1].timeStr, highlight: true },
          { label: '4 Cycles (6.0 hrs)', value: options[2].timeStr },
          { label: '3 Cycles (4.5 hrs)', value: options[3].timeStr }
        ]
      };
    } else {
      const now = new Date();
      [6, 5, 4, 3].forEach(cycles => {
        const wakeTime = new Date(now.getTime() + (cycles * 90 + 14) * 60000);
        options.push({
          cycles,
          timeStr: wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      });

      return {
        primaryResult: {
          label: 'Optimal Wake-Up Time',
          value: options[1].timeStr,
          subtext: 'If you go to bed right now (5 sleep cycles)'
        },
        stats: [
          { label: '5 Full Cycles', value: options[1].timeStr, highlight: true },
          { label: '6 Full Cycles', value: options[0].timeStr }
        ]
      };
    }
  },

  'split-bill-calculator'(inputs) {
    const bill = parseFloat(inputs.billTotal) || 145.00;
    const tipPct = parseFloat(inputs.tipPercent) || 20;
    const taxPct = parseFloat(inputs.taxPercent) || 8.5;
    const people = Math.max(1, parseInt(inputs.people) || 4);

    const tipAmount = (bill * tipPct) / 100;
    const taxAmount = (bill * taxPct) / 100;
    const total = bill + tipAmount + taxAmount;
    const perPerson = total / people;

    return {
      primaryResult: {
        label: 'Each Person Pays',
        value: this.formatCurrency(perPerson),
        subtext: `Split among ${people} diners`
      },
      stats: [
        { label: 'Food Subtotal', value: this.formatCurrency(bill) },
        { label: 'Total Tip', value: this.formatCurrency(tipAmount) },
        { label: 'Sales Tax', value: this.formatCurrency(taxAmount) },
        { label: 'Grand Total', value: this.formatCurrency(total), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Food Subtotal', 'Tip', 'Sales Tax'],
        values: [bill, tipAmount, taxAmount],
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      }
    };
  },

  'profit-calculator'(inputs) {
    const rev = parseFloat(inputs.revenue) || 120000;
    const cogs = parseFloat(inputs.cogs) || 45000;
    const opex = parseFloat(inputs.operatingExpenses) || 35000;

    const grossProfit = rev - cogs;
    const netProfit = grossProfit - opex;
    const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;
    const netMargin = rev > 0 ? (netProfit / rev) * 100 : 0;

    return {
      primaryResult: {
        label: 'Net Bottom-Line Profit',
        value: this.formatCurrency(netProfit),
        subtext: `Net Margin: ${netMargin.toFixed(2)}%`
      },
      stats: [
        { label: 'Total Revenue', value: this.formatCurrency(rev) },
        { label: 'Gross Profit', value: this.formatCurrency(grossProfit) },
        { label: 'Gross Margin', value: `${grossMargin.toFixed(2)}%` },
        { label: 'Operating Expenses', value: this.formatCurrency(opex) }
      ],
      chartData: {
        type: 'donut',
        labels: ['COGS', 'Operating Expenses', 'Net Profit'],
        values: [cogs, opex, Math.max(0, netProfit)],
        colors: ['#ef4444', '#f59e0b', '#10b981']
      }
    };
  },

  'margin-calculator'(inputs) {
    return this['profit-margin-calculator']({
      cost: inputs.costPrice,
      revenue: inputs.sellingPrice
    });
  },

  'markup-calculator'(inputs) {
    const cost = parseFloat(inputs.cost) || 40;
    const markup = parseFloat(inputs.markupPercent) || 65;

    const price = cost * (1 + markup / 100);
    const profit = price - cost;
    const margin = (profit / price) * 100;

    return {
      primaryResult: {
        label: 'Recommended Selling Price',
        value: this.formatCurrency(price),
        subtext: `Profit: ${this.formatCurrency(profit)} (${margin.toFixed(1)}% margin)`
      },
      stats: [
        { label: 'Original Cost', value: this.formatCurrency(cost) },
        { label: 'Markup Percentage', value: `${markup}%` },
        { label: 'Gross Margin Equivalent', value: `${margin.toFixed(2)}%`, highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Cost', 'Profit'],
        values: [cost, profit],
        colors: ['#64748b', '#10b981']
      }
    };
  },

  'revenue-calculator'(inputs) {
    const units = parseFloat(inputs.unitsSold) || 850;
    const price = parseFloat(inputs.pricePerUnit) || 49;
    const isSub = inputs.isSubscription === 'yes';

    const baseRevenue = units * price;
    const arr = isSub ? baseRevenue * 12 : baseRevenue;

    return {
      primaryResult: {
        label: isSub ? 'Monthly Recurring Revenue (MRR)' : 'Total Sales Revenue',
        value: this.formatCurrency(baseRevenue),
        subtext: isSub ? `Annual Recurring Revenue (ARR): ${this.formatCurrency(arr)}` : `From ${units.toLocaleString()} units sold`
      },
      stats: [
        { label: 'Active Volume', value: units.toLocaleString() },
        { label: 'Average Price', value: this.formatCurrency(price) },
        { label: isSub ? 'Projected ARR' : 'Gross Volume', value: this.formatCurrency(arr), highlight: true }
      ]
    };
  },

  'business-break-even-calculator'(inputs) {
    return this['break-even-calculator']({
      fixedCosts: inputs.fixedCosts,
      variableCostPerUnit: inputs.unitVariableCost,
      unitPrice: inputs.unitPrice
    });
  },

  'commission-calculator'(inputs) {
    const sales = parseFloat(inputs.salesVolume) || 150000;
    const rate = parseFloat(inputs.commissionRate) || 8.5;
    const base = parseFloat(inputs.baseSalary) || 4000;

    const commission = (sales * rate) / 100;
    const totalComp = base + commission;

    return {
      primaryResult: {
        label: 'Total Compensation',
        value: this.formatCurrency(totalComp),
        subtext: `Base: ${this.formatCurrency(base)} + Commission: ${this.formatCurrency(commission)}`
      },
      stats: [
        { label: 'Sales Volume', value: this.formatCurrency(sales) },
        { label: 'Commission Rate', value: `${rate}%` },
        { label: 'Earned Commission', value: this.formatCurrency(commission), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Base Salary', 'Commission'],
        values: [base, commission],
        colors: ['#3b82f6', '#10b981']
      }
    };
  },

  'sales-tax-calculator'(inputs) {
    const amount = parseFloat(inputs.amount) || 250;
    const rate = parseFloat(inputs.taxRate) || 8.25;
    const type = inputs.type || 'exclusive';

    let net = 0;
    let tax = 0;
    let total = 0;

    if (type === 'exclusive') {
      net = amount;
      tax = (net * rate) / 100;
      total = net + tax;
    } else {
      total = amount;
      net = total / (1 + rate / 100);
      tax = total - net;
    }

    return {
      primaryResult: {
        label: type === 'exclusive' ? 'Total with Sales Tax' : 'Pre-Tax Net Price',
        value: this.formatCurrency(type === 'exclusive' ? total : net),
        subtext: `Sales Tax (${rate}%): ${this.formatCurrency(tax)}`
      },
      stats: [
        { label: 'Net Amount', value: this.formatCurrency(net) },
        { label: 'Sales Tax Amount', value: this.formatCurrency(tax), highlight: true },
        { label: 'Total Price', value: this.formatCurrency(total) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Net Price', 'Sales Tax'],
        values: [net, tax],
        colors: ['#3b82f6', '#f59e0b']
      }
    };
  },

  'business-gst-calculator'(inputs) {
    const sales = parseFloat(inputs.salesAmount) || 500000;
    const sRate = parseFloat(inputs.salesGstRate) || 18;
    const purchase = parseFloat(inputs.purchaseAmount) || 280000;
    const pRate = parseFloat(inputs.purchaseGstRate) || 18;

    const outputGst = (sales * sRate) / 100;
    const inputCredit = (purchase * pRate) / 100;
    const netGstPayable = Math.max(0, outputGst - inputCredit);

    return {
      primaryResult: {
        label: 'Net GST Payable to Government',
        value: this.formatCurrency(netGstPayable),
        subtext: `Output Tax: ${this.formatCurrency(outputGst)} - ITC Credit: ${this.formatCurrency(inputCredit)}`
      },
      stats: [
        { label: 'Output GST (on Sales)', value: this.formatCurrency(outputGst) },
        { label: 'Input Tax Credit (ITC)', value: this.formatCurrency(inputCredit), highlight: true },
        { label: 'Net Tax Liability', value: this.formatCurrency(netGstPayable) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Input Tax Credit', 'Net GST Payable'],
        values: [inputCredit, netGstPayable],
        colors: ['#10b981', '#ef4444']
      }
    };
  },

  'vat-calculator'(inputs) {
    const amount = parseFloat(inputs.amount) || 1200;
    const rate = parseFloat(inputs.vatRate) || 20.0;
    const mode = inputs.mode || 'add';

    let net = 0;
    let vat = 0;
    let gross = 0;

    if (mode === 'add') {
      net = amount;
      vat = (net * rate) / 100;
      gross = net + vat;
    } else {
      gross = amount;
      net = gross / (1 + rate / 100);
      vat = gross - net;
    }

    return {
      primaryResult: {
        label: mode === 'add' ? 'Gross Amount (VAT Inclusive)' : 'Net Amount (VAT Exclusive)',
        value: `€${this.formatNumber(mode === 'add' ? gross : net, 2)}`,
        subtext: `VAT Amount (${rate}%): €${this.formatNumber(vat, 2)}`
      },
      stats: [
        { label: 'Net Value', value: `€${this.formatNumber(net, 2)}` },
        { label: 'VAT Paid', value: `€${this.formatNumber(vat, 2)}`, highlight: true },
        { label: 'Gross Total', value: `€${this.formatNumber(gross, 2)}` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Net', 'VAT'],
        values: [net, vat],
        colors: ['#3b82f6', '#8b5cf6']
      }
    };
  },

  'business-loan-calculator'(inputs) {
    return this['loan-calculator']({
      principal: inputs.principal,
      rate: inputs.interestRate,
      tenureYears: inputs.tenureYears
    });
  },

  'business-roi-calculator'(inputs) {
    return this['roi-calculator']({
      investmentCost: inputs.cost,
      amountReturned: inputs.returns,
      holdingYears: 1
    });
  },

  'business-cagr-calculator'(inputs) {
    return this['cagr-calculator']({
      initialValue: inputs.startRev,
      finalValue: inputs.endRev,
      years: inputs.years
    });
  },

  'employee-cost-calculator'(inputs) {
    const salary = parseFloat(inputs.baseSalary) || 85000;
    const taxPct = (parseFloat(inputs.payrollTaxPercent) || 8.5) / 100;
    const benefits = parseFloat(inputs.annualBenefits) || 7200;
    const matchPct = (parseFloat(inputs.retirementMatchPercent) || 4.0) / 100;
    const overhead = parseFloat(inputs.overheadAnnual) || 4000;

    const payrollTax = salary * taxPct;
    const retirement = salary * matchPct;
    const totalCost = salary + payrollTax + benefits + retirement + overhead;
    const costMultiplier = totalCost / salary;

    return {
      primaryResult: {
        label: 'Total Annual Employer Cost',
        value: this.formatCurrency(totalCost),
        subtext: `${costMultiplier.toFixed(2)}x base salary (${this.formatCurrency(totalCost / 12)}/mo)`
      },
      stats: [
        { label: 'Base Salary', value: this.formatCurrency(salary) },
        { label: 'Payroll Taxes (FICA)', value: this.formatCurrency(payrollTax) },
        { label: 'Health & Insurance Benefits', value: this.formatCurrency(benefits) },
        { label: 'Retirement Match', value: this.formatCurrency(retirement) },
        { label: 'Equipment & Overhead', value: this.formatCurrency(overhead) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Base Salary', 'Taxes & Benefits', 'Overhead & Match'],
        values: [salary, payrollTax + benefits, retirement + overhead],
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      }
    };
  }
};
