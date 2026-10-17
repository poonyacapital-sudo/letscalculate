/**
 * CalcHub - Calculation Engine & Algorithms
 * Precise execution of mathematical, financial, health, chronological,
 * and scientific calculations with rich visual chart outputs.
 */

const CalculatorEngine = {
  // Format helpers
  formatCurrency(num, symbol = null) {
    const sym = (symbol !== null && symbol !== undefined)
      ? symbol
      : (typeof AppState !== 'undefined' && AppState.getCurrencySymbol
          ? AppState.getCurrencySymbol()
          : (typeof window !== 'undefined' && window.AppState && window.AppState.getCurrencySymbol
              ? window.AppState.getCurrencySymbol()
              : (typeof localStorage !== 'undefined' ? (localStorage.getItem('letscalculate_currency_symbol') || '₹') : '₹')));
    if (isNaN(num) || !isFinite(num)) return `${sym}0.00`;
    const loc = (typeof AppState !== 'undefined' && AppState.getLocale
      ? AppState.getLocale()
      : (typeof window !== 'undefined' && window.AppState && window.AppState.getLocale
          ? window.AppState.getLocale()
          : 'en-IN'));
    return `${sym}${Number(num).toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  formatNumber(num, decimals = 2) {
    if (isNaN(num) || !isFinite(num)) return '0';
    const loc = (typeof AppState !== 'undefined' && AppState.getLocale
      ? AppState.getLocale()
      : (typeof window !== 'undefined' && window.AppState && window.AppState.getLocale
          ? window.AppState.getLocale()
          : 'en-IN'));
    return Number(num).toLocaleString(loc, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  },

  formatCompact(num) {
    if (isNaN(num) || !isFinite(num)) return '0';
    return new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(num);
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
  
  // ==========================================
  // EMI CALCULATOR SUITE ENGINES (PHASE 1)
  // ==========================================
  'emi-advance-calculator'(inputs) {
    const P = parseFloat(inputs.principal) || 2500000;
    const rate = parseFloat(inputs.rate) || 8.5;
    const r = rate / 12 / 100;
    const tenureYears = parseFloat(inputs.tenureYears) || 20;
    const n = tenureYears * 12;
    const moratorium = parseFloat(inputs.moratoriumMonths) || 0;
    const prepayMonthly = parseFloat(inputs.prepaymentMonthly) || 0;
    const prepayLump = parseFloat(inputs.prepaymentLumpSum) || 0;
    const prepayMonth = parseFloat(inputs.prepaymentMonth) || 12;

    // Normal baseline EMI
    const baseEmi = r > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
    const baseTotalInterest = (baseEmi * n) - P;

    // Simulation with moratorium & prepayments
    let bal = P;
    let totalInterest = 0;
    let monthsPaid = 0;
    const yearlySchedule = [];
    let yearPrin = 0;
    let yearInt = 0;

    // 1. Moratorium Period
    for (let m = 1; m <= moratorium; m++) {
      monthsPaid++;
      const intAccrued = bal * r;
      totalInterest += intAccrued;
      bal += intAccrued; // Capitalized moratorium interest
      yearInt += intAccrued;
      if (monthsPaid % 12 === 0) {
        yearlySchedule.push([`Year ${Math.ceil(monthsPaid / 12)} (Moratorium)`, this.formatCurrency(0), this.formatCurrency(yearInt), this.formatCurrency(bal)]);
        yearInt = 0;
      }
    }

    // Recalculate EMI post-moratorium on revised balance
    const remTenure = Math.max(1, n - moratorium);
    const postMoraEmi = r > 0 ? (bal * r * Math.pow(1 + r, remTenure)) / (Math.pow(1 + r, remTenure) - 1) : bal / remTenure;
    const activeMonthlyPay = postMoraEmi + prepayMonthly;

    while (bal > 0.01 && monthsPaid < n * 2) {
      monthsPaid++;
      const intMonth = bal * r;
      let prinMonth = activeMonthlyPay - intMonth;
      if (monthsPaid === prepayMonth && prepayLump > 0) {
        prinMonth += prepayLump;
      }
      if (prinMonth > bal) {
        prinMonth = bal;
      }
      bal -= prinMonth;
      totalInterest += intMonth;
      yearPrin += prinMonth;
      yearInt += intMonth;

      if (monthsPaid % 12 === 0 || bal <= 0.01) {
        yearlySchedule.push([
          `Year ${Math.ceil(monthsPaid / 12)}`,
          this.formatCurrency(yearPrin),
          this.formatCurrency(yearInt),
          this.formatCurrency(Math.max(0, bal))
        ]);
        yearPrin = 0;
        yearInt = 0;
      }
    }

    const interestSaved = Math.max(0, baseTotalInterest - totalInterest);
    const monthsSaved = Math.max(0, n - monthsPaid);

    return {
      primaryResult: {
        label: 'Monthly Payment (EMI)',
        value: this.formatCurrency(postMoraEmi),
        subtext: (prepayMonthly > 0 ? `+ ${this.formatCurrency(prepayMonthly)} extra/mo` : '') + (moratorium > 0 ? ` • ${moratorium} Mos Moratorium Included` : ' • Standard Amortization')
      },
      stats: [
        { label: 'Base Principal', value: this.formatCurrency(P) },
        { label: 'Total Interest Payable', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Amount Payable', value: this.formatCurrency(P + totalInterest) },
        { label: 'Interest Saved', value: this.formatCurrency(interestSaved), highlight: interestSaved > 0 },
        { label: 'Payoff Tenure', value: `${(monthsPaid / 12).toFixed(1)} Years (${monthsPaid} mos)` },
        { label: 'Time Saved', value: monthsSaved > 0 ? `${monthsSaved} Months Early!` : 'Standard Term' }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal Loan', 'Total Interest Paid', 'Interest Saved via Prepayment'],
        values: [P, totalInterest, Math.max(0, interestSaved)],
        colors: ['#6366f1', '#f59e0b', '#10b981']
      },
      breakdownTable: {
        headers: ['Period', 'Principal Paid', 'Interest Paid', 'Remaining Balance'],
        rows: yearlySchedule.slice(0, 15)
      }
    };
  },

  'emi-table-generator'(inputs) {
    const P = parseFloat(inputs.principal) || 1000000;
    const rate = parseFloat(inputs.rate) || 8.5;
    const r = rate / 12 / 100;
    const years = parseFloat(inputs.tenureYears) || 5;
    const N = years * 12;
    const emi = r > 0 ? (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1) : P / N;

    let bal = P;
    const schedule = [];
    let yearPrin = 0;
    let yearInt = 0;

    for (let m = 1; m <= N; m++) {
      const intMonth = bal * r;
      let prinMonth = emi - intMonth;
      if (prinMonth > bal) prinMonth = bal;
      bal -= prinMonth;
      yearPrin += prinMonth;
      yearInt += intMonth;

      if (inputs.scheduleView === 'monthly') {
        schedule.push([
          `Month ${m}`,
          this.formatCurrency(emi),
          this.formatCurrency(prinMonth),
          this.formatCurrency(intMonth),
          this.formatCurrency(Math.max(0, bal))
        ]);
      } else if (m % 12 === 0 || m === N) {
        schedule.push([
          `Year ${Math.ceil(m / 12)}`,
          this.formatCurrency(yearPrin + yearInt),
          this.formatCurrency(yearPrin),
          this.formatCurrency(yearInt),
          this.formatCurrency(Math.max(0, bal))
        ]);
        yearPrin = 0;
        yearInt = 0;
      }
    }

    const totalInterest = emi * N - P;

    return {
      primaryResult: {
        label: 'Monthly EMI Schedule',
        value: this.formatCurrency(emi),
        subtext: `For ${this.formatCurrency(P)} @ ${rate}% over ${years} Years (${N} Months)`
      },
      stats: [
        { label: 'Principal', value: this.formatCurrency(P) },
        { label: 'Total Interest', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Payment', value: this.formatCurrency(P + totalInterest) },
        { label: 'Effective APR', value: `${rate.toFixed(2)}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal Loan', 'Total Interest'],
        values: [P, totalInterest],
        colors: ['#3b82f6', '#ec4899']
      },
      breakdownTable: {
        headers: inputs.scheduleView === 'monthly'
          ? ['Installment', 'EMI Paid', 'Principal Portion', 'Interest Portion', 'Ending Balance']
          : ['Year', 'Annual Total Paid', 'Annual Principal', 'Annual Interest', 'Closing Balance'],
        rows: schedule
      }
    };
  },

  'compare-loan-calculator'(inputs) {
    const P_A = parseFloat(inputs.loanAmountA) || 2000000;
    const rateA = parseFloat(inputs.interestRateA) || 8.5;
    const rA = rateA / 12 / 100;
    const tenureA = (parseFloat(inputs.tenureYearsA) || 15) * 12;
    const feePctA = parseFloat(inputs.feeA) !== undefined && !isNaN(parseFloat(inputs.feeA)) ? parseFloat(inputs.feeA) : 0.5;
    const feeA = (P_A * feePctA) / 100;
    const emiA = rA > 0 ? (P_A * rA * Math.pow(1 + rA, tenureA)) / (Math.pow(1 + rA, tenureA) - 1) : P_A / tenureA;
    const totalIntA = (emiA * tenureA) - P_A;
    const totalPaymentA = emiA * tenureA;
    const totalCostA = totalPaymentA + feeA;

    const P_B = parseFloat(inputs.loanAmountB) || 2000000;
    const rateB = parseFloat(inputs.interestRateB) || 8.75;
    const rB = rateB / 12 / 100;
    const tenureB = (parseFloat(inputs.tenureYearsB) || 15) * 12;
    const feePctB = parseFloat(inputs.feeB) !== undefined && !isNaN(parseFloat(inputs.feeB)) ? parseFloat(inputs.feeB) : 0.25;
    const feeB = (P_B * feePctB) / 100;
    const emiB = rB > 0 ? (P_B * rB * Math.pow(1 + rB, tenureB)) / (Math.pow(1 + rB, tenureB) - 1) : P_B / tenureB;
    const totalIntB = (emiB * tenureB) - P_B;
    const totalPaymentB = emiB * tenureB;
    const totalCostB = totalPaymentB + feeB;

    const netDiff = totalCostB - totalCostA;
    const emiDiff = emiB - emiA;
    const intDiff = totalIntB - totalIntA;
    const paymentDiff = totalPaymentB - totalPaymentA;
    const betterLoan = netDiff >= 0 ? 'Loan A' : 'Loan B';
    const absDiff = Math.abs(netDiff);
    const absEmiDiff = Math.abs(emiDiff);
    const absIntDiff = Math.abs(intDiff);
    const absPaymentDiff = Math.abs(paymentDiff);

    return {
      primaryResult: {
        label: `Recommended Choice: ${betterLoan}`,
        value: `Saves ${this.formatCurrency(absDiff)}`,
        subtext: `Loan A EMI: ${this.formatCurrency(emiA)}/mo vs Loan B EMI: ${this.formatCurrency(emiB)}/mo`
      },
      loanA: {
        amount: P_A,
        rate: rateA,
        tenureYears: tenureA / 12,
        feePercent: feePctA,
        feeAmount: feeA,
        emi: emiA,
        totalInterest: totalIntA,
        totalPayment: totalPaymentA,
        totalCost: totalCostA,
        formatted: {
          amount: this.formatCurrency(P_A),
          emi: this.formatCurrency(emiA),
          totalInterest: this.formatCurrency(totalIntA),
          totalPayment: this.formatCurrency(totalPaymentA),
          fee: this.formatCurrency(feeA),
          totalCost: this.formatCurrency(totalCostA)
        }
      },
      loanB: {
        amount: P_B,
        rate: rateB,
        tenureYears: tenureB / 12,
        feePercent: feePctB,
        feeAmount: feeB,
        emi: emiB,
        totalInterest: totalIntB,
        totalPayment: totalPaymentB,
        totalCost: totalCostB,
        formatted: {
          amount: this.formatCurrency(P_B),
          emi: this.formatCurrency(emiB),
          totalInterest: this.formatCurrency(totalIntB),
          totalPayment: this.formatCurrency(totalPaymentB),
          fee: this.formatCurrency(feeB),
          totalCost: this.formatCurrency(totalCostB)
        }
      },
      comparison: {
        betterLoan,
        savings: absDiff,
        formattedSavings: this.formatCurrency(absDiff),
        emiDiff: absEmiDiff,
        formattedEmiDiff: this.formatCurrency(absEmiDiff),
        interestDiff: absIntDiff,
        formattedInterestDiff: this.formatCurrency(absIntDiff),
        paymentDiff: absPaymentDiff,
        formattedPaymentDiff: this.formatCurrency(absPaymentDiff),
        lowerEmiLoan: emiA <= emiB ? 'Loan A' : 'Loan B',
        lowerInterestLoan: totalIntA <= totalIntB ? 'Loan A' : 'Loan B',
        lowerPaymentLoan: totalPaymentA <= totalPaymentB ? 'Loan A' : 'Loan B'
      },
      stats: [
        { label: 'Loan A EMI', value: this.formatCurrency(emiA) },
        { label: 'Loan B EMI', value: this.formatCurrency(emiB) },
        { label: 'Monthly EMI Difference', value: `${emiDiff > 0 ? '+' : ''}${this.formatCurrency(emiDiff)}` },
        { label: 'Loan A Total Interest', value: this.formatCurrency(totalIntA) },
        { label: 'Loan B Total Interest', value: this.formatCurrency(totalIntB) },
        { label: 'Lifetime Cost Difference', value: this.formatCurrency(absDiff), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Loan A Total Outlay', 'Loan B Total Outlay'],
        values: [totalCostA, totalCostB],
        colors: ['#00bfff', '#10b981']
      }
    };
  },

  'loan-affordability-calculator'(inputs) {
    const income = parseFloat(inputs.monthlyIncome) || 80000;
    const existingEmis = parseFloat(inputs.existingEmis) || 10000;
    const foirPct = parseFloat(inputs.maxFoirPct) || 50;
    const maxAllowedEmiTotal = income * (foirPct / 100);
    const availableEmi = Math.max(0, maxAllowedEmiTotal - existingEmis);

    const rate = parseFloat(inputs.interestRate) || 8.5;
    const r = rate / 12 / 100;
    const years = parseFloat(inputs.tenureYears) || 20;
    const n = years * 12;

    // Maximum loan principal that availableEmi can service
    let maxPrincipal = 0;
    if (r === 0) {
      maxPrincipal = availableEmi * n;
    } else {
      maxPrincipal = (availableEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    }

    const totalRepay = availableEmi * n;
    const totalInt = totalRepay - maxPrincipal;

    return {
      primaryResult: {
        label: 'Maximum Loan Eligibility',
        value: this.formatCurrency(Math.round(maxPrincipal)),
        subtext: `Based on ${this.formatCurrency(availableEmi)}/mo spare EMI capacity (${foirPct}% FOIR)`
      },
      stats: [
        { label: 'Net Monthly Income', value: this.formatCurrency(income) },
        { label: 'Bank FOIR Cap', value: `${foirPct}%` },
        { label: 'Max Allowable EMI Capacity', value: this.formatCurrency(availableEmi), highlight: true },
        { label: 'Total Interest over Tenure', value: this.formatCurrency(Math.round(totalInt)) },
        { label: 'Total Repayment', value: this.formatCurrency(Math.round(totalRepay)) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Existing EMIs', 'New Loan EMI Capacity', 'Unencumbered Surplus Income'],
        values: [existingEmis, availableEmi, Math.max(0, income - existingEmis - availableEmi)],
        colors: ['#ef4444', '#10b981', '#6366f1']
      },
      breakdownTable: {
        headers: ['Financial Capacity Metric', 'Evaluated Value', 'Standard Banking Guideline'],
        rows: [
          ['Gross Monthly Inflow', this.formatCurrency(income), 'Verified salary / ITR'],
          ['Existing EMI Burden', this.formatCurrency(existingEmis), 'CIBIL / Experian Obligations'],
          ['FOIR Cap Allowed (50%)', this.formatCurrency(maxAllowedEmiTotal), 'Maximum safe debt commitment'],
          ['Net Available Loan EMI', this.formatCurrency(availableEmi), 'Disposable budget for new loan'],
          ['Sanctionable Loan Limit', this.formatCurrency(Math.round(maxPrincipal)), `At ${rate}% over ${years} Years`]
        ]
      }
    };
  },

  'loan-reverse-calculator'(inputs) {
    const mode = inputs.calcMode || 'period'; // 'period' or 'interest'
    const P = parseFloat(inputs.principal) || 1000000;
    const emi = parseFloat(inputs.monthlyEmi) || 20517;

    // -------------------------------------------------------------------------
    // MODE 2: CALCULATE INTEREST RATE (ROI %) GIVEN LOAN AMOUNT, EMI & TENURE
    // -------------------------------------------------------------------------
    if (mode === 'interest') {
      const months = Math.max(1, parseInt(inputs.tenureMonths, 10) || 60);
      const totalRepay = emi * months;
      const totalInt = totalRepay - P;

      // Validation: Total repayment must be at least principal
      if (totalRepay < P) {
        return {
          isValid: false,
          error: 'Please enter valid Loan Amount, EMI, and Period.',
          mode: 'interest',
          primaryResult: {
            label: 'Invalid Inputs',
            value: 'Total EMI < Principal',
            subtext: `Total payment (${this.formatCurrency(totalRepay)}) is less than loan amount (${this.formatCurrency(P)}). EMI × Period must be at least ${this.formatCurrency(P)}.`
          },
          stats: [
            { label: 'Loan Principal', value: this.formatCurrency(P) },
            { label: 'Total Repayment', value: this.formatCurrency(totalRepay) },
            { label: 'Tenure', value: `${months} Months` }
          ]
        };
      }

      if (totalRepay === P) {
        return {
          isValid: true,
          mode: 'interest',
          annualRate: 0,
          totalRepay: totalRepay,
          totalInt: 0,
          primaryResult: {
            label: 'Calculated Interest Rate (ROI)',
            value: '0.00% p.a.',
            subtext: `0% Interest Loan for ${this.formatCurrency(P)} over ${months} Months`
          },
          stats: [
            { label: 'Loan Principal', value: this.formatCurrency(P) },
            { label: 'Monthly Payment (EMI)', value: this.formatCurrency(emi) },
            { label: 'Loan Tenure', value: `${months} Months (${(months / 12).toFixed(1)} Yrs)` },
            { label: 'Calculated Interest Rate (ROI)', value: '0.00% p.a.', highlight: true },
            { label: 'Total Interest Due', value: this.formatCurrency(0) },
            { label: 'Total Payment', value: this.formatCurrency(totalRepay) }
          ],
          chartData: {
            type: 'donut',
            labels: ['Loan Principal', 'Total Interest'],
            values: [P, 0],
            colors: ['#06b6d4', '#f59e0b']
          }
        };
      }

      // Numerical bisection root-finding for monthly rate r:
      // emi = P * [r * (1 + r)^months] / [(1 + r)^months - 1]
      let low = 0.0000001;
      let high = 10.0; // monthly rate up to 1000%
      for (let i = 0; i < 60; i++) {
        const mid = (low + high) / 2;
        const powVal = Math.pow(1 + mid, months);
        const emiCalc = (P * mid * powVal) / (powVal - 1);
        if (emiCalc > emi) {
          high = mid;
        } else {
          low = mid;
        }
      }
      const monthlyRate = (low + high) / 2;
      const annualRate = monthlyRate * 12 * 100;

      return {
        isValid: true,
        mode: 'interest',
        annualRate: annualRate,
        totalRepay: totalRepay,
        totalInt: totalInt,
        primaryResult: {
          label: 'Calculated Interest Rate (ROI)',
          value: `${annualRate.toFixed(2)}% p.a.`,
          subtext: `For ${this.formatCurrency(P)} repaid at ${this.formatCurrency(emi)}/mo over ${months} Months`
        },
        stats: [
          { label: 'Loan Principal', value: this.formatCurrency(P) },
          { label: 'Monthly Payment (EMI)', value: this.formatCurrency(emi) },
          { label: 'Loan Tenure', value: `${months} Months (${(months / 12).toFixed(1)} Yrs)` },
          { label: 'Calculated Interest Rate (ROI)', value: `${annualRate.toFixed(2)}% p.a.`, highlight: true },
          { label: 'Total Interest Due', value: this.formatCurrency(totalInt) },
          { label: 'Total Payment', value: this.formatCurrency(totalRepay) }
        ],
        chartData: {
          type: 'donut',
          labels: ['Loan Principal', 'Total Interest'],
          values: [P, Math.max(0, totalInt)],
          colors: ['#06b6d4', '#f59e0b']
        }
      };
    }

    // -------------------------------------------------------------------------
    // MODE 1: CALCULATE PERIOD (TENURE) GIVEN LOAN AMOUNT, EMI & INTEREST RATE
    // -------------------------------------------------------------------------
    const annualRate = parseFloat(inputs.interestRate) || 8.5;
    const r = annualRate / 12 / 100;
    const minInterest = P * r;

    // Edge Case 4: Invalid Case (EMI <= P * r)
    // Ensure EMI > Loan Amount * Monthly Rate
    if (emi <= minInterest) {
      return {
        isValid: false,
        error: 'Please enter valid Loan Amount, EMI, and ROI.',
        mode: 'period',
        minInterestThreshold: minInterest,
        primaryResult: {
          label: 'EMI Insufficient',
          value: 'Increase Monthly EMI',
          subtext: `Monthly interest on ${this.formatCurrency(P)} at ${annualRate}% is ${this.formatCurrency(minInterest)}. Monthly EMI must exceed this threshold.`
        },
        stats: [
          { label: 'Loan Principal', value: this.formatCurrency(P) },
          { label: 'Entered EMI', value: this.formatCurrency(emi) },
          { label: 'Annual Interest Rate (ROI)', value: `${annualRate}%` },
          { label: 'Monthly Interest Threshold', value: this.formatCurrency(minInterest), highlight: true }
        ]
      };
    }

    // Solve for tenure n: n = [ln(emi) - ln(emi - P*r)] / ln(1 + r)
    const n = (Math.log(emi) - Math.log(emi - P * r)) / Math.log(1 + r);
    const months = Math.ceil(n);
    const years = (months / 12).toFixed(1);
    const totalRepay = emi * months;
    const totalInt = totalRepay - P;

    return {
      isValid: true,
      mode: 'period',
      exactMonths: n,
      months: months,
      years: years,
      totalRepay: totalRepay,
      totalInt: totalInt,
      primaryResult: {
        label: 'Required Loan Tenure',
        value: `${months} Months (${years} Years)`,
        subtext: `To fully clear ${this.formatCurrency(P)} at ${this.formatCurrency(emi)}/month (${annualRate}% p.a.)`
      },
      stats: [
        { label: 'Loan Principal', value: this.formatCurrency(P) },
        { label: 'Monthly Payment (EMI)', value: this.formatCurrency(emi) },
        { label: 'Annual Interest Rate (ROI)', value: `${annualRate}%` },
        { label: 'Calculated Tenure', value: `${months} Months (${years} Yrs)`, highlight: true },
        { label: 'Total Interest Due', value: this.formatCurrency(totalInt) },
        { label: 'Total Payment', value: this.formatCurrency(totalRepay) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Loan Principal', 'Total Interest'],
        values: [P, Math.max(0, totalInt)],
        colors: ['#06b6d4', '#f59e0b']
      }
    };
  },

  'loan-prepayment-calculator'(inputs) {
    const P = parseFloat(inputs.originalPrincipal) || 3000000;
    const rate = parseFloat(inputs.interestRate) || 8.5;
    const r = rate / 12 / 100;
    const origYears = parseFloat(inputs.originalTenureYears) || 20;
    const origN = origYears * 12;
    const monthsPaid = parseFloat(inputs.monthsPaid) || 24;
    const prepay = parseFloat(inputs.prepaymentAmount) || 300000;
    const option = inputs.prepaymentOption || 'reduce-tenure';

    const baseEmi = (P * r * Math.pow(1 + r, origN)) / (Math.pow(1 + r, origN) - 1);
    const baseTotalInterest = (baseEmi * origN) - P;

    // Amortize up to monthsPaid
    let bal = P;
    let intPaidSoFar = 0;
    for (let m = 1; m <= monthsPaid; m++) {
      const intM = bal * r;
      const prinM = baseEmi - intM;
      bal -= prinM;
      intPaidSoFar += intM;
    }

    const balBeforePrepay = bal;
    bal = Math.max(0, bal - prepay);

    let newEmi = baseEmi;
    let newMonthsTotal = origN;
    let interestSaved = 0;
    let monthsSaved = 0;

    if (option === 'reduce-tenure') {
      if (bal > 0 && r > 0) {
        const remN = Math.ceil((Math.log(baseEmi) - Math.log(baseEmi - bal * r)) / Math.log(1 + r));
        newMonthsTotal = monthsPaid + remN;
        monthsSaved = Math.max(0, origN - newMonthsTotal);
        // Calculate new remaining interest
        let tempBal = bal;
        let remInt = 0;
        for (let m = 1; m <= remN; m++) {
          const intM = tempBal * r;
          const prinM = Math.min(tempBal, baseEmi - intM);
          tempBal -= prinM;
          remInt += intM;
          if (tempBal <= 0) break;
        }
        interestSaved = Math.max(0, baseTotalInterest - (intPaidSoFar + remInt));
      }
    } else {
      // Reduce EMI
      const remMonths = Math.max(1, origN - monthsPaid);
      newEmi = r > 0 ? (bal * r * Math.pow(1 + r, remMonths)) / (Math.pow(1 + r, remMonths) - 1) : bal / remMonths;
      const newTotalInterest = intPaidSoFar + ((newEmi * remMonths) - bal);
      interestSaved = Math.max(0, baseTotalInterest - newTotalInterest);
    }

    return {
      primaryResult: {
        label: option === 'reduce-tenure' ? 'Total Interest Saved' : 'New Reduced Monthly EMI',
        value: option === 'reduce-tenure' ? this.formatCurrency(interestSaved) : this.formatCurrency(newEmi),
        subtext: option === 'reduce-tenure'
          ? `Loan tenure reduced by ${monthsSaved} Months (${(monthsSaved / 12).toFixed(1)} Years)!`
          : `Monthly EMI reduced from ${this.formatCurrency(baseEmi)} to ${this.formatCurrency(newEmi)} (Save ${this.formatCurrency(baseEmi - newEmi)}/mo)`
      },
      stats: [
        { label: 'Original Loan Amount', value: this.formatCurrency(P) },
        { label: 'Balance Before Prepayment', value: this.formatCurrency(balBeforePrepay) },
        { label: 'Balance After Prepayment', value: this.formatCurrency(bal) },
        { label: 'Total Interest Saved', value: this.formatCurrency(interestSaved), highlight: true },
        { label: option === 'reduce-tenure' ? 'Tenure Eliminated' : 'Monthly Cash Saved', value: option === 'reduce-tenure' ? `${monthsSaved} Months` : this.formatCurrency(baseEmi - newEmi), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Remaining Principal', 'Prepayment Paid', 'Interest Saved'],
        values: [bal, prepay, Math.max(0, interestSaved)],
        colors: ['#3b82f6', '#10b981', '#eab308']
      },
      breakdownTable: {
        headers: ['Loan Parameter', 'Without Prepayment', 'With Prepayment', 'Net Financial Gain'],
        rows: [
          ['Monthly EMI', this.formatCurrency(baseEmi), this.formatCurrency(newEmi), option === 'reduce-emi' ? `Save ${this.formatCurrency(baseEmi - newEmi)}/mo` : 'Maintained'],
          ['Total Repayment Period', `${origYears} Years (${origN} mos)`, `${(newMonthsTotal / 12).toFixed(1)} Years (${newMonthsTotal} mos)`, `${monthsSaved} Months Ahead of Schedule`],
          ['Lifetime Interest Paid', this.formatCurrency(baseTotalInterest), this.formatCurrency(baseTotalInterest - interestSaved), `Save ${this.formatCurrency(interestSaved)}`]
        ]
      }
    };
  },

  'education-loan-calculator'(inputs) {
    const P = parseFloat(inputs.loanAmount) || 2000000;
    const rate = parseFloat(inputs.interestRate) || 9.5;
    const r = rate / 12 / 100;
    const courseYrs = parseFloat(inputs.courseDurationYears) || 2;
    const graceMos = parseFloat(inputs.gracePeriodMonths) || 12;
    const repayYrs = parseFloat(inputs.repaymentTenureYears) || 7;
    const repayN = repayYrs * 12;

    // Simple interest accrued during study moratorium
    const totalMoratoriumMonths = (courseYrs * 12) + graceMos;
    const moratoriumInterest = P * (rate / 100) * (totalMoratoriumMonths / 12);
    const capitalizedPrincipal = P + moratoriumInterest;

    const emi = r > 0 ? (capitalizedPrincipal * r * Math.pow(1 + r, repayN)) / (Math.pow(1 + r, repayN) - 1) : capitalizedPrincipal / repayN;
    const repayInterest = (emi * repayN) - capitalizedPrincipal;
    const totalLifetimeInterest = moratoriumInterest + repayInterest;

    return {
      primaryResult: {
        label: 'Post-Moratorium EMI',
        value: this.formatCurrency(emi),
        subtext: `Starts ${totalMoratoriumMonths} months after admission (incl. ${graceMos} mos grace period)`
      },
      stats: [
        { label: 'Course Disbursal', value: this.formatCurrency(P) },
        { label: 'Moratorium Interest Accrued', value: this.formatCurrency(moratoriumInterest) },
        { label: 'Capitalized Repayment Principal', value: this.formatCurrency(capitalizedPrincipal) },
        { label: 'Total Repayment Interest', value: this.formatCurrency(repayInterest) },
        { label: 'Sec 80E Tax Deduction Eligible', value: '100% of Interest Paid', highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Original Tuition Loan', 'Moratorium Accrual', 'Repayment Interest'],
        values: [P, moratoriumInterest, repayInterest],
        colors: ['#0284c7', '#f59e0b', '#ec4899']
      }
    };
  },

  'mortgage-loan-calculator'(inputs) {
    const propVal = parseFloat(inputs.propertyValue) || 8000000;
    const P = parseFloat(inputs.loanAmount) || 5000000;
    const rate = parseFloat(inputs.interestRate) || 9.25;
    const r = rate / 12 / 100;
    const years = parseFloat(inputs.tenureYears) || 15;
    const n = years * 12;
    const ltv = ((P / propVal) * 100).toFixed(1);

    const emi = r > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    return {
      primaryResult: {
        label: 'Mortgage / LAP Monthly EMI',
        value: this.formatCurrency(emi),
        subtext: `LTV: ${ltv}% of ${this.formatCurrency(propVal)} property value`
      },
      stats: [
        { label: 'Loan Financed', value: this.formatCurrency(P) },
        { label: 'Property Valuation', value: this.formatCurrency(propVal) },
        { label: 'Loan-to-Value (LTV)', value: `${ltv}%`, highlight: ltv <= 65 },
        { label: 'Total Interest Due', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Repayment', value: this.formatCurrency(totalAmount) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal Loan', 'Total Interest'],
        values: [P, totalInterest],
        colors: ['#10b981', '#f59e0b']
      }
    };
  },

  'loan-amortization-calculator'(inputs) {
    return this['emi-table-generator'](inputs);
  },

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
        `Base Monthly Payment = ₹${P.toLocaleString('en-IN')} × [${(r * 100).toFixed(4)}% × (1 + ${(r * 100).toFixed(4)}%)^${n}] / [(1 + ${(r * 100).toFixed(4)}%)^${n} - 1] = ${this.formatCurrency(monthly)}`,
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
    const price = parseFloat(inputs.vehiclePrice) || 800000;
    const down = parseFloat(inputs.downPayment) !== undefined && !isNaN(parseFloat(inputs.downPayment)) ? parseFloat(inputs.downPayment) : 80000;
    const applyExchange = inputs.applyExchange === true || inputs.applyExchange === 'true' || inputs.applyExchange === '1' || inputs.applyExchange === 1;
    const exchangeVal = applyExchange ? (parseFloat(inputs.exchangeValue) || 0) : 0;
    const gstRate = (parseFloat(inputs.gstRate) !== undefined && !isNaN(parseFloat(inputs.gstRate))) ? parseFloat(inputs.gstRate) : (parseFloat(inputs.salesTax) || 18.0);
    const annualRate = (parseFloat(inputs.interestRate) !== undefined && !isNaN(parseFloat(inputs.interestRate))) ? parseFloat(inputs.interestRate) : 9.5;
    const months = parseInt(inputs.loanTermMonths, 10) || 60;

    // 1. Effective Price = Vehicle Purchase Price - Exchange Value (if checkbox selected)
    const effectivePrice = Math.max(0, price - exchangeVal);

    // 2. GST Amount = Effective Price * (GST Rate / 100)
    const gstAmount = effectivePrice * (gstRate / 100);

    // 3. On-Road Price = Effective Price + GST Amount
    const onRoadPrice = effectivePrice + gstAmount;

    // 4. Loan Amount = On-Road Price - Down Payment
    const loanAmount = Math.max(0, onRoadPrice - down);

    // 5. EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const r = (annualRate / 100) / 12;
    let emi = 0;
    if (loanAmount > 0) {
      if (r === 0) {
        emi = loanAmount / months;
      } else {
        emi = (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      }
    }

    // 6. Total Payment = EMI * n
    const totalPayment = emi * months;

    // 7. Total Interest = Total Payment - Loan Amount
    const totalInterest = Math.max(0, totalPayment - loanAmount);
    const totalVehicleCost = down + totalPayment + exchangeVal;

    return {
      primaryResult: {
        label: 'Monthly Car Loan EMI',
        value: this.formatCurrency(emi),
        subtext: `For ${months} Months (${(months / 12).toFixed(months % 12 === 0 ? 0 : 1)} Yrs) @ ${annualRate}% Interest Rate`
      },
      stats: [
        { label: 'On-Road Price', value: this.formatCurrency(onRoadPrice) },
        { label: 'Loan Amount (Principal)', value: this.formatCurrency(loanAmount) },
        { label: 'GST Amount (' + gstRate + '%)', value: this.formatCurrency(gstAmount) },
        { label: 'Exchange Value', value: applyExchange ? this.formatCurrency(exchangeVal) : '₹0.00 (Unchecked)' },
        { label: 'Down Payment', value: this.formatCurrency(down) },
        { label: 'Total Interest Payable', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Loan Payment', value: this.formatCurrency(totalPayment) },
        { label: 'Total Ownership Cost', value: this.formatCurrency(totalVehicleCost) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Loan Principal', 'Total Interest', 'Down Payment' + (applyExchange && exchangeVal > 0 ? ' & Exchange' : '')],
        values: [loanAmount, totalInterest, down + exchangeVal],
        colors: ['#06b6d4', '#f43f5e', '#10b981']
      }
    };
  },

  'personal-loan-calculator'(inputs) {
    const amount = (parseFloat(inputs.amount) !== undefined && !isNaN(parseFloat(inputs.amount))) ? parseFloat(inputs.amount) : 500000;
    const rate = (parseFloat(inputs.interestRate) || 10.5) / 100;
    const months = parseFloat(inputs.termMonths) || 36;
    const feePctRaw = (inputs.processingFee !== undefined && inputs.processingFee !== '' && !isNaN(parseFloat(inputs.processingFee)))
      ? parseFloat(inputs.processingFee)
      : 1.0;
    const feePct = feePctRaw / 100;

    // Processing Fee is charged on original loan amount (before deductions)
    const processingFeeAmount = amount * feePct;

    // Disbursed Amount is original loan amount minus processing fee amount
    const disbursedAmount = Math.max(0, amount - processingFeeAmount);

    // EMI and interest are based on original loan amount
    const r = rate / 12;
    let monthly = 0;
    if (r === 0) {
      monthly = amount / months;
    } else {
      monthly = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    }
    const totalRepaid = monthly * months;
    const totalInterest = Math.max(0, totalRepaid - amount);
    const trueBorrowCost = totalInterest + processingFeeAmount;

    return {
      primaryResult: {
        label: 'Monthly EMI',
        value: this.formatCurrency(monthly),
        subtext: `Net Disbursed: ${this.formatCurrency(disbursedAmount)} (after ${feePctRaw}% Processing Fee)`
      },
      stats: [
        { label: 'Sanctioned Loan Amount', value: this.formatCurrency(amount) },
        { label: 'Processing Fee (' + feePctRaw + '%)', value: this.formatCurrency(processingFeeAmount) },
        { label: 'Net Disbursed Amount', value: this.formatCurrency(disbursedAmount), highlight: true },
        { label: 'Total Interest Charge', value: this.formatCurrency(totalInterest) },
        { label: 'Total Repayment Amount', value: this.formatCurrency(totalRepaid) },
        { label: 'Total Cost of Borrowing', value: this.formatCurrency(trueBorrowCost) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Net Disbursed', 'Total Interest', 'Processing Fee'],
        values: [disbursedAmount, totalInterest, processingFeeAmount],
        colors: ['#10b981', '#f59e0b', '#6366f1']
      },
      processingFeeAmount,
      disbursedAmount
    };
  },

  'home-loan-calculator'(inputs) {
    const propertyVal = parseFloat(inputs.propertyValue) || 6250000;
    const ltv = Math.min(90, Math.max(50, parseFloat(inputs.loanPercent) || 80));
    const principal = (propertyVal * ltv) / 100;
    const downPayment = propertyVal - principal;
    const annualRate = (parseFloat(inputs.interestRate) || 8.5) / 100;
    const tenureYears = parseFloat(inputs.tenureYears) || 20;
    const n = tenureYears * 12;
    const r = annualRate / 12;

    const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - principal;

    return {
      primaryResult: {
        label: 'Monthly Home Loan EMI',
        value: this.formatCurrency(monthly),
        subtext: `At ${inputs.interestRate || 8.5}% over ${tenureYears} Years (${ltv}% LTV Financing)`
      },
      stats: [
        { label: 'Property Value', value: this.formatCurrency(propertyVal) },
        { label: 'Financing Ratio (LTV)', value: `${ltv}%` },
        { label: 'Loan Financed Amount', value: this.formatCurrency(principal), highlight: true },
        { label: 'Down Payment Required', value: `${this.formatCurrency(downPayment)} (${Math.round(100 - ltv)}%)` },
        { label: 'Total Interest Paid', value: this.formatCurrency(totalInterest) },
        { label: 'Total Home Loan Cost', value: this.formatCurrency(totalPayment) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Loan Financed', 'Down Payment', 'Total Interest'],
        values: [principal, downPayment, totalInterest],
        colors: ['#00bfff', '#10b981', '#f59e0b']
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

  'swp-calculator'(inputs) {
    const P = parseFloat(inputs.totalInvestment) || 1000000;
    const W = parseFloat(inputs.monthlyWithdrawal) || 8000;
    const annualReturn = parseFloat(inputs.expectedReturn) || 10.0;
    const years = parseFloat(inputs.timePeriod) || 10;

    const r = annualReturn / 100;
    const monthlyRate = r / 12;
    const totalMonths = Math.round(years * 12);

    let balance = P;
    let totalWithdrawn = 0;
    let totalInterestEarned = 0;
    let monthsLasted = 0;

    const yearlySchedule = [];
    let yearStartBalance = balance;
    let yearWithdrawn = 0;
    let yearInterest = 0;

    for (let m = 1; m <= totalMonths; m++) {
      if (balance <= 0) break;

      monthsLasted++;
      const interest = balance * monthlyRate;
      balance += interest;
      totalInterestEarned += interest;
      yearInterest += interest;

      const withdrawal = Math.min(balance, W);
      balance -= withdrawal;
      totalWithdrawn += withdrawal;
      yearWithdrawn += withdrawal;

      if (m % 12 === 0 || m === totalMonths || balance <= 0.01) {
        yearlySchedule.push([
          `Year ${Math.ceil(m / 12)}`,
          this.formatCurrency(yearStartBalance),
          this.formatCurrency(yearWithdrawn),
          this.formatCurrency(yearInterest),
          this.formatCurrency(Math.max(0, balance))
        ]);
        yearStartBalance = balance;
        yearWithdrawn = 0;
        yearInterest = 0;
      }
    }

    const finalBalance = Math.max(0, balance);
    const totalValue = totalWithdrawn + finalBalance;
    const netProfit = totalValue - P;
    const isExhausted = monthsLasted < totalMonths && balance <= 0.01;

    return {
      primaryResult: {
        label: isExhausted ? 'Corpus Exhausted' : 'Final Remaining Balance',
        value: this.formatCurrency(finalBalance),
        subtext: isExhausted
          ? `Corpus lasted ${monthsLasted} months (${(monthsLasted / 12).toFixed(1)} years). Total withdrawn: ${this.formatCurrency(totalWithdrawn)}`
          : `Total withdrawn: ${this.formatCurrency(totalWithdrawn)} across ${years} years`
      },
      stats: [
        { label: 'Initial Investment', value: this.formatCurrency(P) },
        { label: 'Total Withdrawn', value: this.formatCurrency(totalWithdrawn), highlight: true },
        { label: 'Final Portfolio Value', value: this.formatCurrency(finalBalance) },
        { label: 'Total Value Created', value: this.formatCurrency(totalValue) },
        { label: 'Net Profit / Growth', value: this.formatCurrency(netProfit), highlight: netProfit > 0 }
      ],
      chartData: {
        type: 'donut',
        labels: ['Total Amount Withdrawn', 'Remaining Balance'],
        values: [totalWithdrawn, finalBalance],
        colors: ['#3b82f6', '#10b981']
      },
      breakdownTable: {
        headers: ['Period', 'Beginning Value', 'Annual Withdrawn', 'Returns Earned', 'Ending Value'],
        rows: yearlySchedule.slice(0, 15)
      },
      steps: [
        `Initial Investment Corpus = ${this.formatCurrency(P)}`,
        `Monthly Systematic Withdrawal = ${this.formatCurrency(W)} at ${(annualReturn).toFixed(1)}% annual return`,
        `Total Withdrawn Over ${years} Years = ${this.formatCurrency(totalWithdrawn)}`,
        `Total Compounded Growth Earned = ${this.formatCurrency(totalInterestEarned)}`,
        `Final Remaining Corpus Value = ${this.formatCurrency(finalBalance)}`
      ]
    };
  },

  'jewellery-price-calculator'(inputs) {
    const p24 = parseFloat(inputs.goldPrice24k) || 7500;
    const carat = parseFloat(inputs.purityCarat) || 22;
    const weight = parseFloat(inputs.weightGrams) || 10;
    const makingPct = parseFloat(inputs.makingChargePercent) || 10;
    const gstPct = parseFloat(inputs.gstPercent) || 3;

    const caratRate = p24 * (carat / 24);
    const pureGoldCost = weight * caratRate;
    const makingCost = pureGoldCost * (makingPct / 100);
    const subtotal = pureGoldCost + makingCost;
    const gstAmount = subtotal * (gstPct / 100);
    const finalPrice = subtotal + gstAmount;
    const finalPricePerGram = weight > 0 ? finalPrice / weight : 0;

    return {
      primaryResult: {
        label: 'Final Jewellery Price',
        value: this.formatCurrency(finalPrice),
        subtext: `For ${weight}g (${carat}K) at ${this.formatCurrency(finalPricePerGram)}/g (incl. Making & GST)`
      },
      stats: [
        { label: `${carat}K Gold Rate`, value: `${this.formatCurrency(caratRate)}/g` },
        { label: 'Pure Gold Cost', value: this.formatCurrency(pureGoldCost) },
        { label: `Making Charges (${makingPct}%)`, value: this.formatCurrency(makingCost), highlight: true },
        { label: `GST (${gstPct}%)`, value: this.formatCurrency(gstAmount) },
        { label: 'Effective Price / Gram', value: `${this.formatCurrency(finalPricePerGram)}/g` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Pure Gold Value', 'Making Charges', 'GST'],
        values: [pureGoldCost, makingCost, gstAmount],
        colors: ['#eab308', '#3b82f6', '#ec4899']
      },
      breakdownTable: {
        headers: ['Component', 'Calculation Basis', 'Rate / %', 'Amount (₹)'],
        rows: [
          [`${carat}K Gold Cost`, `${weight} grams × ${this.formatCurrency(caratRate)}`, `${((carat / 24) * 100).toFixed(1)}% Purity`, this.formatCurrency(pureGoldCost)],
          ['Making Charges', `Craftsmanship on ${this.formatCurrency(pureGoldCost)}`, `${makingPct}%`, this.formatCurrency(makingCost)],
          ['Subtotal (Taxable)', 'Gold + Making Charges', 'Pre-Tax', this.formatCurrency(subtotal)],
          ['GST', `Applied on ${this.formatCurrency(subtotal)}`, `${gstPct}%`, this.formatCurrency(gstAmount)],
          ['Total Final Price', 'All Inclusive Total', '100%', this.formatCurrency(finalPrice)]
        ]
      },
      steps: [
        `24-Carat Base Rate = ${this.formatCurrency(p24)}/g`,
        `${carat}-Carat Derived Rate = ${this.formatCurrency(p24)} × (${carat} ÷ 24) = ${this.formatCurrency(caratRate)}/g`,
        `Base Gold Value = ${weight}g × ${this.formatCurrency(caratRate)} = ${this.formatCurrency(pureGoldCost)}`,
        `Making Charges (${makingPct}%) = ${this.formatCurrency(pureGoldCost)} × ${makingPct}% = ${this.formatCurrency(makingCost)}`,
        `GST (${gstPct}%) = (${this.formatCurrency(pureGoldCost)} + ${this.formatCurrency(makingCost)}) × ${gstPct}% = ${this.formatCurrency(gstAmount)}`,
        `Final Price = ${this.formatCurrency(subtotal)} + ${this.formatCurrency(gstAmount)} = ${this.formatCurrency(finalPrice)}`
      ]
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

  'nps-calculator'(inputs) {
    const monthlyDeposit = Math.max(500, parseFloat(inputs.monthlyInvestment) || 5000);
    const currentAge = Math.max(18, Math.min(65, parseFloat(inputs.currentAge) || 28));
    const retirementAge = Math.max(currentAge + 1, Math.min(75, parseFloat(inputs.retirementAge) || 60));
    const tenureYears = retirementAge - currentAge;
    const months = tenureYears * 12;
    const annualReturn = (parseFloat(inputs.expectedReturn) || 10) / 100;
    const monthlyRate = annualReturn / 12;
    const annuityPct = Math.max(40, Math.min(100, parseFloat(inputs.annuityPercent) || 40)) / 100;
    const annuityRate = (parseFloat(inputs.annuityRate) || 6.5) / 100;

    const totalInvested = monthlyDeposit * months;
    let totalCorpus = 0;
    if (monthlyRate === 0) {
      totalCorpus = totalInvested;
    } else {
      totalCorpus = monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    }

    const totalInterest = Math.max(0, totalCorpus - totalInvested);
    const annuityCorpus = totalCorpus * annuityPct;
    const lumpSumCorpus = totalCorpus * (1 - annuityPct);
    const monthlyPension = (annuityCorpus * annuityRate) / 12;

    // Tax saved under 80CCD(1B) up to ₹50,000 / year at 30% slab (+4% cess = 31.2%)
    const annualContrib = monthlyDeposit * 12;
    const eligible80CCD1B = Math.min(annualContrib, 50000);
    const annualTaxSaved = eligible80CCD1B * 0.312;
    const totalTaxSaved = annualTaxSaved * tenureYears;

    return {
      primaryResult: {
        label: 'Total Expected NPS Corpus',
        value: this.formatCurrency(totalCorpus),
        subtext: `At Age ${retirementAge} (${tenureYears} Years of Compounding)`
      },
      stats: [
        { label: 'Total Invested Principal', value: this.formatCurrency(totalInvested) },
        { label: 'Total Wealth Gain (Interest)', value: this.formatCurrency(totalInterest), highlight: true },
        { label: `Lump Sum Payout (${Math.round((1 - annuityPct) * 100)}% Tax-Free)`, value: this.formatCurrency(lumpSumCorpus), highlight: true },
        { label: `Annuity Reinvested (${Math.round(annuityPct * 100)}%)`, value: this.formatCurrency(annuityCorpus) },
        { label: 'Expected Monthly Pension', value: this.formatCurrency(monthlyPension), highlight: true },
        { label: 'Cumulative 80CCD(1B) Tax Saved', value: this.formatCurrency(totalTaxSaved) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Invested Principal', 'Wealth Gain'],
        values: [Math.round(totalInvested), Math.round(totalInterest)],
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
    const gross = Math.max(0, parseFloat(inputs.taxableIncome) || 1200000);
    const empType = inputs.employmentType || 'salaried';
    const isSalaried = empType === 'salaried';
    const ageGroup = inputs.ageGroup || 'regular'; // 'regular', 'senior', 'super-senior'

    // Deductions under Old Regime
    const oldStdDed = isSalaried ? 50000 : 0;
    const sec80c = Math.min(Math.max(0, parseFloat(inputs.sec80c) || 0), 150000);
    const sec80d = Math.min(Math.max(0, parseFloat(inputs.sec80d) || 0), 100000);
    const hraExemption = Math.max(0, parseFloat(inputs.hraExemption) || 0);
    const homeLoanInterest = Math.min(Math.max(0, parseFloat(inputs.homeLoanInterest) || 0), 200000);
    const npsAdditional = Math.min(Math.max(0, parseFloat(inputs.npsAdditional) || 0), 50000);
    const otherDeductions = Math.max(0, parseFloat(inputs.otherDeductions) || 0);

    const oldTotalDeductions = oldStdDed + sec80c + sec80d + hraExemption + homeLoanInterest + npsAdditional + otherDeductions;
    const oldItemizedDeductions = sec80c + sec80d + hraExemption + homeLoanInterest + npsAdditional + otherDeductions;
    const oldTaxable = Math.max(0, gross - oldTotalDeductions);

    // Deductions under New Regime (FY 2024-25 Budget revision: ₹75,000 for salaried)
    const newStdDed = isSalaried ? 75000 : 0;
    const newTotalDeductions = newStdDed;
    const newTaxable = Math.max(0, gross - newTotalDeductions);

    // Compute New Regime Tax (Section 115BAC - Budget 2024 Slabs)
    // Slabs: 0-3L: 0%, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, >15L: 30%
    const computeNewRegime = (taxable) => {
      if (taxable <= 0) return { taxableIncome: 0, baseTax: 0, rebate87A: 0, taxAfterRebate: 0, surcharge: 0, cess: 0, totalTax: 0 };
      let slabTax = 0;
      if (taxable <= 300000) {
        slabTax = 0;
      } else if (taxable <= 700000) {
        slabTax = (taxable - 300000) * 0.05;
      } else if (taxable <= 1000000) {
        slabTax = 20000 + (taxable - 700000) * 0.10;
      } else if (taxable <= 1200000) {
        slabTax = 20000 + 30000 + (taxable - 1000000) * 0.15;
      } else if (taxable <= 1500000) {
        slabTax = 20000 + 30000 + 30000 + (taxable - 1200000) * 0.20;
      } else {
        slabTax = 20000 + 30000 + 30000 + 60000 + (taxable - 1500000) * 0.30;
      }

      // Section 87A Rebate & Marginal Relief
      let rebate = 0;
      let taxAfterRebate = slabTax;
      if (taxable <= 700000) {
        rebate = slabTax;
        taxAfterRebate = 0;
      } else {
        // Marginal relief under Section 87A: tax payable cannot exceed excess of income over ₹7,00,000
        const excess = taxable - 700000;
        if (slabTax > excess) {
          rebate = slabTax - excess;
          taxAfterRebate = excess;
        }
      }

      // Surcharge (New Regime capped at 25%)
      let surchargeRate = 0;
      if (taxable > 20000000) surchargeRate = 0.25;
      else if (taxable > 10000000) surchargeRate = 0.15;
      else if (taxable > 5000000) surchargeRate = 0.10;
      const surcharge = taxAfterRebate * surchargeRate;

      // 4% Cess
      const cess = (taxAfterRebate + surcharge) * 0.04;
      const totalTax = Math.round(taxAfterRebate + surcharge + cess);

      return { taxableIncome: taxable, baseTax: slabTax, rebate87A: rebate, taxAfterRebate, surcharge, cess, totalTax };
    };

    // Compute Old Regime Tax
    const computeOldRegime = (taxable, age) => {
      if (taxable <= 0) return { taxableIncome: 0, baseTax: 0, rebate87A: 0, taxAfterRebate: 0, surcharge: 0, cess: 0, totalTax: 0 };
      let slabTax = 0;
      if (age === 'super-senior') {
        // 80+ years: 0-5L: 0%, 5-10L: 20%, >10L: 30%
        if (taxable <= 500000) {
          slabTax = 0;
        } else if (taxable <= 1000000) {
          slabTax = (taxable - 500000) * 0.20;
        } else {
          slabTax = 100000 + (taxable - 1000000) * 0.30;
        }
      } else if (age === 'senior') {
        // 60-79 years: 0-3L: 0%, 3-5L: 5%, 5-10L: 20%, >10L: 30%
        if (taxable <= 300000) {
          slabTax = 0;
        } else if (taxable <= 500000) {
          slabTax = (taxable - 300000) * 0.05;
        } else if (taxable <= 1000000) {
          slabTax = 10000 + (taxable - 500000) * 0.20;
        } else {
          slabTax = 10000 + 100000 + (taxable - 1000000) * 0.30;
        }
      } else {
        // General individual < 60: 0-2.5L: 0%, 2.5-5L: 5%, 5-10L: 20%, >10L: 30%
        if (taxable <= 250000) {
          slabTax = 0;
        } else if (taxable <= 500000) {
          slabTax = (taxable - 250000) * 0.05;
        } else if (taxable <= 1000000) {
          slabTax = 12500 + (taxable - 500000) * 0.20;
        } else {
          slabTax = 12500 + 100000 + (taxable - 1000000) * 0.30;
        }
      }

      // Section 87A rebate (taxable <= 5L, max 12500)
      let rebate = 0;
      let taxAfterRebate = slabTax;
      if (taxable <= 500000) {
        rebate = slabTax;
        taxAfterRebate = 0;
      }

      // Surcharge (Old Regime)
      let surchargeRate = 0;
      if (taxable > 50000000) surchargeRate = 0.37;
      else if (taxable > 20000000) surchargeRate = 0.25;
      else if (taxable > 10000000) surchargeRate = 0.15;
      else if (taxable > 5000000) surchargeRate = 0.10;
      const surcharge = taxAfterRebate * surchargeRate;

      // 4% Cess
      const cess = (taxAfterRebate + surcharge) * 0.04;
      const totalTax = Math.round(taxAfterRebate + surcharge + cess);

      return { taxableIncome: taxable, baseTax: slabTax, rebate87A: rebate, taxAfterRebate, surcharge, cess, totalTax };
    };

    const newRes = computeNewRegime(newTaxable);
    const oldRes = computeOldRegime(oldTaxable, ageGroup);

    const diff = newRes.totalTax - oldRes.totalTax;
    const absSavings = Math.abs(diff);

    // Breakeven deduction finder
    let breakevenTotal = 0;
    let breakevenItemized = 0;
    if (newRes.totalTax <= 0) {
      breakevenTotal = Math.max(0, gross - 500000);
      breakevenItemized = Math.max(0, breakevenTotal - oldStdDed);
    } else {
      let low = 0;
      let high = gross;
      let bestD = gross;
      for (let i = 0; i < 35; i++) {
        const mid = (low + high) / 2;
        const testTax = computeOldRegime(Math.max(0, gross - mid), ageGroup).totalTax;
        if (testTax <= newRes.totalTax) {
          bestD = mid;
          high = mid;
        } else {
          low = mid;
        }
      }
      breakevenTotal = Math.round(bestD);
      breakevenItemized = Math.max(0, breakevenTotal - oldStdDed);
    }

    let recommendation = '';
    let recEmoji = '';
    let primaryLabel = '';
    let primaryValue = '';
    let primarySub = '';
    let bestTax = 0;

    if (diff < -5) {
      // New Regime saves money
      recommendation = 'NEW REGIME';
      recEmoji = '⚡';
      primaryLabel = 'Recommended: NEW TAX REGIME';
      primaryValue = `Save ${this.formatCurrency(absSavings)}`;
      primarySub = `New Regime Tax: ${this.formatCurrency(newRes.totalTax)} vs Old Regime: ${this.formatCurrency(oldRes.totalTax)}`;
      bestTax = newRes.totalTax;
    } else if (diff > 5) {
      // Old Regime saves money
      recommendation = 'OLD REGIME';
      recEmoji = '🛡️';
      primaryLabel = 'Recommended: OLD TAX REGIME';
      primaryValue = `Save ${this.formatCurrency(absSavings)}`;
      primarySub = `Old Regime Tax: ${this.formatCurrency(oldRes.totalTax)} vs New Regime: ${this.formatCurrency(newRes.totalTax)}`;
      bestTax = oldRes.totalTax;
    } else {
      recommendation = 'EITHER';
      recEmoji = '⚖️';
      primaryLabel = 'Both Regimes Result in Identical Tax';
      primaryValue = this.formatCurrency(newRes.totalTax);
      primarySub = `Tax is identical under both regimes (${this.formatCurrency(newRes.totalTax)})`;
      bestTax = newRes.totalTax;
    }

    const newEffectiveRate = gross > 0 ? (newRes.totalTax / gross) * 100 : 0;
    const oldEffectiveRate = gross > 0 ? (oldRes.totalTax / gross) * 100 : 0;

    const newMonthlyInHand = Math.max(0, Math.round((gross - newRes.totalTax) / 12));
    const oldMonthlyInHand = Math.max(0, Math.round((gross - oldRes.totalTax) / 12));

    // Custom advice HTML
    let breakevenText = '';
    if (diff < -5) {
      const moreNeeded = Math.max(0, breakevenItemized - oldItemizedDeductions);
      breakevenText = `To match the New Regime's tax savings, you would need total Chapter VI-A deductions of at least <strong>${this.formatCurrency(breakevenTotal)}</strong> (an additional <strong>${this.formatCurrency(moreNeeded)}</strong> over your current claimed itemized deductions). Unless you have significant eligible rent (HRA) or home loan interest, the New Regime is more profitable.`;
    } else if (diff > 5) {
      breakevenText = `Your eligible deductions of <strong>${this.formatCurrency(oldTotalDeductions)}</strong> exceed the breakeven threshold of <strong>${this.formatCurrency(breakevenTotal)}</strong>, making the Old Regime more beneficial for you by <strong>${this.formatCurrency(absSavings)}</strong> annually.`;
    } else {
      breakevenText = `Your current total deductions (<strong>${this.formatCurrency(oldTotalDeductions)}</strong>) place you exactly at the financial breakeven point between both regimes.`;
    }

    const customAdviceHtml = `
      <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 1.25rem 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.6rem;">${recEmoji}</span>
            <div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">
                ${recommendation === 'NEW REGIME' ? 'Switch to / Stick with NEW TAX REGIME (Budget 2024 Revised)' : recommendation === 'OLD REGIME' ? 'Stick with OLD TAX REGIME' : 'Both Regimes Yield Identical Tax'}
              </div>
              <div style="font-size: 0.86rem; color: var(--text-secondary); margin-top: 0.2rem;">
                ${recommendation !== 'EITHER' ? `Net Tax Benefit: <strong style="color: var(--accent-emerald);">${this.formatCurrency(absSavings)}</strong> per year (<strong style="color: var(--accent-emerald);">${this.formatCurrency(Math.round(absSavings / 12))}</strong>/month)` : 'Zero difference in tax payable'}
              </div>
            </div>
          </div>
          <div style="background: var(--bg-surface-elevated); padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--border-card); text-align: right;">
            <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Breakeven Deduction Threshold</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: #10b981;">${this.formatCurrency(breakevenTotal)}</div>
          </div>
        </div>
        <div style="margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-subtle); font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
          ${breakevenText}
        </div>
      </div>
    `;

    return {
      primaryResult: {
        label: primaryLabel,
        value: primaryValue,
        subtext: primarySub
      },
      stats: [
        { label: 'New Regime Tax', value: this.formatCurrency(newRes.totalTax), highlight: diff < -5 },
        { label: 'Old Regime Tax', value: this.formatCurrency(oldRes.totalTax), highlight: diff > 5 },
        { label: 'Annual Tax Savings', value: this.formatCurrency(absSavings), highlight: true },
        { label: 'Total Deductions (Old)', value: this.formatCurrency(oldTotalDeductions) },
        { label: 'Monthly In-Hand (New)', value: this.formatCurrency(newMonthlyInHand), highlight: diff < -5 },
        { label: 'Monthly In-Hand (Old)', value: this.formatCurrency(oldMonthlyInHand), highlight: diff > 5 }
      ],
      chartData: {
        type: 'donut',
        labels: ['Take-Home Pay', 'Tax Payable (Best Regime)'],
        values: [Math.max(0, gross - bestTax), bestTax],
        colors: ['#10b981', '#f59e0b']
      },
      customHtml: customAdviceHtml,
      breakdownTable: {
        title: 'Old vs New Tax Regime - Head-to-Head Comparison',
        subtitle: 'Incorporating Union Budget 2024 revisions: ₹75,000 standard deduction, revised 115BAC slabs & Section 87A rebate',
        badge: recommendation === 'NEW REGIME' ? 'New Regime Saves More' : recommendation === 'OLD REGIME' ? 'Old Regime Saves More' : 'Identical Tax',
        headers: ['Tax Parameter / Deductions', 'New Regime (FY 2024-25 / AY 2025-26)', 'Old Regime', 'Difference / Variance'],
        rows: [
          ['Gross Total Income / Salary', this.formatCurrency(gross), this.formatCurrency(gross), '—'],
          ['Standard Deduction (Salaried)', this.formatCurrency(newStdDed), this.formatCurrency(oldStdDed), newStdDed >= oldStdDed ? `+${this.formatCurrency(newStdDed - oldStdDed)} (New)` : `-${this.formatCurrency(oldStdDed - newStdDed)}`],
          ['Section 80C (PPF, EPF, ELSS, LIC)', '₹0 (Not Allowed)', this.formatCurrency(sec80c), `-${this.formatCurrency(sec80c)}`],
          ['Section 80D (Mediclaim Health Ins)', '₹0 (Not Allowed)', this.formatCurrency(sec80d), `-${this.formatCurrency(sec80d)}`],
          ['HRA Exemption u/s 10(13A)', '₹0 (Not Allowed)', this.formatCurrency(hraExemption), `-${this.formatCurrency(hraExemption)}`],
          ['Sec 24(b) Home Loan Interest', '₹0 (Not Allowed)', this.formatCurrency(homeLoanInterest), `-${this.formatCurrency(homeLoanInterest)}`],
          ['Sec 80CCD(1B) Additional NPS', '₹0 (Not Allowed)', this.formatCurrency(npsAdditional), `-${this.formatCurrency(npsAdditional)}`],
          ['Other Deductions (80E, 80G, 80TTA)', '₹0 (Not Allowed)', this.formatCurrency(otherDeductions), `-${this.formatCurrency(otherDeductions)}`],
          ['Total Deductions & Exemptions', this.formatCurrency(newTotalDeductions), this.formatCurrency(oldTotalDeductions), oldTotalDeductions >= newTotalDeductions ? `+${this.formatCurrency(oldTotalDeductions - newTotalDeductions)} (Old)` : '—'],
          ['Net Taxable Income', this.formatCurrency(newRes.taxableIncome), this.formatCurrency(oldRes.taxableIncome), this.formatCurrency(Math.abs(newRes.taxableIncome - oldRes.taxableIncome))],
          ['Tax at Slab Rates (before Rebate)', this.formatCurrency(newRes.baseTax), this.formatCurrency(oldRes.baseTax), this.formatCurrency(Math.abs(newRes.baseTax - oldRes.baseTax))],
          ['Section 87A Tax Rebate', newRes.rebate87A > 0 ? `-${this.formatCurrency(newRes.rebate87A)}` : '₹0', oldRes.rebate87A > 0 ? `-${this.formatCurrency(oldRes.rebate87A)}` : '₹0', 'Full relief if eligible'],
          ['Surcharge (High Income)', this.formatCurrency(newRes.surcharge), this.formatCurrency(oldRes.surcharge), '—'],
          ['Health & Education Cess (4%)', this.formatCurrency(newRes.cess), this.formatCurrency(oldRes.cess), this.formatCurrency(Math.abs(newRes.cess - oldRes.cess))],
          {
            highlight: true,
            cells: [
              'TOTAL INCOME TAX PAYABLE',
              this.formatCurrency(newRes.totalTax),
              this.formatCurrency(oldRes.totalTax),
              diff < -5 ? `Save ${this.formatCurrency(absSavings)} in New` : diff > 5 ? `Save ${this.formatCurrency(absSavings)} in Old` : 'Identical'
            ]
          },
          ['Effective Tax Rate', `${newEffectiveRate.toFixed(2)}%`, `${oldEffectiveRate.toFixed(2)}%`, `${Math.abs(newEffectiveRate - oldEffectiveRate).toFixed(2)}%`],
          ['Annual Take-Home Income', this.formatCurrency(Math.max(0, gross - newRes.totalTax)), this.formatCurrency(Math.max(0, gross - oldRes.totalTax)), this.formatCurrency(absSavings)],
          ['Monthly In-Hand Salary', this.formatCurrency(newMonthlyInHand), this.formatCurrency(oldMonthlyInHand), this.formatCurrency(Math.round(absSavings / 12))]
        ],
        footerNote: '<strong>Statutory Note:</strong> Calculations reflect Indian Income Tax laws for FY 2024-25 / AY 2025-26 under the Finance (No. 2) Act 2024. For salaried taxpayers, the New Regime offers a ₹75,000 standard deduction and complete tax exemption up to ₹7,75,000 via Section 87A rebate. Slabs in New Regime: ₹0-3L: Nil, ₹3-7L: 5%, ₹7-10L: 10%, ₹10-12L: 15%, ₹12-15L: 20%, Above ₹15L: 30%. Surcharge and 4% Health & Education Cess apply as statutory.'
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
    const inInr = inUsd * (rates['INR'] || 83.5);

    return {
      primaryResult: {
        label: `Converted Amount (${to})`,
        value: `${this.formatNumber(converted, 2)} ${to}`,
        subtext: `1 ${from} = ${rateDirect.toFixed(4)} ${to}`
      },
      stats: [
        { label: 'Source Amount', value: `${this.formatNumber(amount, 2)} ${from}` },
        { label: 'Exchange Rate', value: `1 ${from} = ${rateDirect.toFixed(4)} ${to}` },
        { label: 'INR Equivalent', value: `₹${this.formatNumber(inInr, 2)}` },
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
    const raw = String(inputs.numbers !== undefined && inputs.numbers !== null ? inputs.numbers : '12, 25, 34, 45, 68, 82, 91');
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
    const raw = String(inputs.numbers !== undefined && inputs.numbers !== null ? inputs.numbers : '4, 8, 6, 5, 3, 8, 9, 8, 12, 14, 8');
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
    const raw = String(inputs.numbers !== undefined && inputs.numbers !== null ? inputs.numbers : '10, 12, 23, 23, 16, 23, 21, 16');
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
  },

  // ==========================================
  // ASSET-BASED LOAN ENGINES
  // ==========================================
  'gold-loan-calculator'(inputs) {
    const goldGrams = parseFloat(inputs.goldGrams) || 50;
    const goldPurity = parseFloat(inputs.goldPurity) || 22;
    const goldRatePerGram = parseFloat(inputs.goldRatePerGram) || 7200;
    const ltvPercent = Math.min(75, parseFloat(inputs.ltvPercent) || 75);
    const rate = parseFloat(inputs.interestRate) || 9.5;
    const tenureMonths = parseFloat(inputs.tenureMonths) || 12;
    const scheme = inputs.repaymentScheme || 'regular-emi';

    const purityFactor = goldPurity / 24;
    const grossGoldValue = goldGrams * goldRatePerGram * purityFactor;
    const loanAmount = grossGoldValue * (ltvPercent / 100);
    const r = rate / 12 / 100;

    let emi = 0;
    let totalInterest = 0;
    let totalRepayment = 0;

    if (scheme === 'regular-emi') {
      emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1) : loanAmount / tenureMonths;
      totalRepayment = emi * tenureMonths;
      totalInterest = totalRepayment - loanAmount;
    } else if (scheme === 'monthly-interest') {
      emi = loanAmount * r;
      totalInterest = emi * tenureMonths;
      totalRepayment = loanAmount + totalInterest;
    } else {
      totalInterest = loanAmount * (rate / 100) * (tenureMonths / 12);
      totalRepayment = loanAmount + totalInterest;
      emi = totalRepayment / tenureMonths;
    }

    return {
      primaryResult: {
        label: scheme === 'monthly-interest' ? 'Monthly Interest Outflow' : 'Monthly Loan Payment (EMI)',
        value: this.formatCurrency(emi),
        subtext: `Eligible Loan: ${this.formatCurrency(loanAmount)} (${ltvPercent}% LTV of ${goldGrams}g ${goldPurity}K gold)`
      },
      stats: [
        { label: 'Market Valuation of Gold', value: this.formatCurrency(grossGoldValue) },
        { label: 'Sanctioned Loan Amount', value: this.formatCurrency(loanAmount), highlight: true },
        { label: 'Total Interest Payable', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Lifetime Repayment', value: this.formatCurrency(totalRepayment) },
        { label: 'Collateral Safety Margin', value: this.formatCurrency(grossGoldValue - loanAmount) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Loan Principal Disbursed', 'Total Interest Cost', 'Owner Retained Gold Equity'],
        values: [loanAmount, totalInterest, grossGoldValue - loanAmount],
        colors: ['#eab308', '#f97316', '#10b981']
      },
      breakdownTable: {
        headers: ['Gold Purity & Metric', 'Evaluated Value', 'RBI Regulatory Standard'],
        rows: [
          ['Physical Gold Pledged', `${goldGrams} Grams`, 'Net ornament weight excluding stones'],
          ['Assayed Purity Level', `${goldPurity} Karat (${(purityFactor * 100).toFixed(1)}% pure)`, 'BIS Hallmarked standard'],
          ['Bullion Market Value', this.formatCurrency(grossGoldValue), 'Current benchmark gold rate'],
          ['Maximum Borrowing Limit', this.formatCurrency(loanAmount), 'Capped at RBI statutory 75% LTV'],
          ['Repayment Structure', scheme === 'regular-emi' ? 'Equated Monthly Installments' : (scheme === 'monthly-interest' ? 'Interest-only bullet' : 'End lump sum'), 'Borrower choice']
        ]
      }
    };
  },

  'two-wheeler-loan-calculator'(inputs) {
    const vehiclePrice = parseFloat(inputs.vehiclePrice) || 125000;
    const downPayment = parseFloat(inputs.downPayment) || 25000;
    const loanAmount = Math.max(0, vehiclePrice - downPayment);
    const rate = parseFloat(inputs.interestRate) || 11.5;
    const r = rate / 12 / 100;
    const months = parseFloat(inputs.tenureMonths) || 36;

    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : loanAmount / months;
    const totalRepayment = emi * months;
    const totalInterest = totalRepayment - loanAmount;

    return {
      primaryResult: {
        label: 'Monthly Bike EMI',
        value: this.formatCurrency(emi),
        subtext: `For ${this.formatCurrency(loanAmount)} financed over ${months} months`
      },
      stats: [
        { label: 'On-Road Two-Wheeler Price', value: this.formatCurrency(vehiclePrice) },
        { label: 'Down Payment Paid', value: this.formatCurrency(downPayment) },
        { label: 'Loan Financed', value: this.formatCurrency(loanAmount) },
        { label: 'Total Interest Charge', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Two-Wheeler Outlay', value: this.formatCurrency(downPayment + totalRepayment) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Down Payment Paid', 'Loan Principal', 'Total Interest'],
        values: [downPayment, loanAmount, totalInterest],
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      }
    };
  },

  'consumer-durable-loan-calculator'(inputs) {
    const productPrice = parseFloat(inputs.productPrice) || 65000;
    const downPayment = parseFloat(inputs.downPayment) || 10000;
    const loanAmount = Math.max(0, productPrice - downPayment);
    const rate = parseFloat(inputs.interestRate) || 0;
    const r = rate / 12 / 100;
    const months = parseFloat(inputs.tenureMonths) || 9;
    const fee = parseFloat(inputs.processingFee) || 499;

    let emi = 0;
    let interestPaid = 0;
    if (r === 0) {
      emi = loanAmount / months;
      interestPaid = 0;
    } else {
      emi = (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      interestPaid = (emi * months) - loanAmount;
    }
    const totalOutlay = downPayment + (emi * months) + fee;

    return {
      primaryResult: {
        label: 'Monthly Installment (EMI)',
        value: this.formatCurrency(emi),
        subtext: rate === 0 ? `No-Cost EMI Scheme (${months} Months)` : `${rate}% APR Scheme`
      },
      stats: [
        { label: 'Invoice Product Price', value: this.formatCurrency(productPrice) },
        { label: 'Upfront Down Payment', value: this.formatCurrency(downPayment) },
        { label: 'Net Financed Amount', value: this.formatCurrency(loanAmount) },
        { label: 'Total Interest Cost', value: this.formatCurrency(interestPaid) },
        { label: 'Processing Fee + Charges', value: this.formatCurrency(fee) },
        { label: 'Total Purchase Outlay', value: this.formatCurrency(totalOutlay), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Down Payment', 'Principal Financed', 'Financing Costs & Fees'],
        values: [downPayment, loanAmount, interestPaid + fee],
        colors: ['#10b981', '#6366f1', '#ec4899']
      }
    };
  },

  'fd-loan-calculator'(inputs) {
    const fdAmount = parseFloat(inputs.fdAmount) || 500000;
    const fdRate = parseFloat(inputs.fdInterestRate) || 7.25;
    const markupRate = parseFloat(inputs.bankMarkupRate) || 1.0;
    const loanRate = fdRate + markupRate;
    const loanAmount = parseFloat(inputs.loanAmount) || (fdAmount * 0.80);
    const months = parseFloat(inputs.tenureMonths) || 12;
    const r = loanRate / 12 / 100;

    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : loanAmount / months;
    const totalInterestPaid = (emi * months) - loanAmount;
    const fdInterestEarned = fdAmount * (fdRate / 100) * (months / 12);
    const netCost = totalInterestPaid - fdInterestEarned;

    return {
      primaryResult: {
        label: 'Monthly Loan EMI',
        value: this.formatCurrency(emi),
        subtext: `At ${loanRate.toFixed(2)}% ROI (${fdRate}% FD Rate + ${markupRate}% Spread)`
      },
      stats: [
        { label: 'Fixed Deposit Value', value: this.formatCurrency(fdAmount) },
        { label: 'Loan Financed (Lien)', value: this.formatCurrency(loanAmount) },
        { label: 'Total Loan Interest Paid', value: this.formatCurrency(totalInterestPaid) },
        { label: 'FD Interest Still Earned', value: this.formatCurrency(fdInterestEarned), highlight: true },
        { label: 'Net Interest Balance', value: netCost < 0 ? `Net Gain: ${this.formatCurrency(Math.abs(netCost))}` : `Net Outflow: ${this.formatCurrency(netCost)}` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Loan Principal', 'Loan Interest Paid', 'FD Growth Retained'],
        values: [loanAmount, totalInterestPaid, fdInterestEarned],
        colors: ['#3b82f6', '#f59e0b', '#10b981']
      }
    };
  },

  'top-up-loan-calculator'(inputs) {
    const existingBalance = parseFloat(inputs.existingLoanBalance) || 2500000;
    const propVal = parseFloat(inputs.propertyValue) || 6000000;
    const topUpAmount = parseFloat(inputs.topUpAmount) || 1000000;
    const topUpRate = parseFloat(inputs.topUpRate) || 9.0;
    const topUpYears = parseFloat(inputs.topUpTenureYears) || 15;
    const existingEmi = parseFloat(inputs.existingEmi) || 26000;

    const r = topUpRate / 12 / 100;
    const n = topUpYears * 12;
    const topUpEmi = r > 0 ? (topUpAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : topUpAmount / n;
    const combinedEmi = existingEmi + topUpEmi;
    const combinedLtv = ((existingBalance + topUpAmount) / propVal) * 100;
    const topUpTotalInterest = (topUpEmi * n) - topUpAmount;

    return {
      primaryResult: {
        label: 'New Top-Up Monthly EMI',
        value: this.formatCurrency(topUpEmi),
        subtext: `Total Monthly Outflow (Existing + Top-Up): ${this.formatCurrency(combinedEmi)}`
      },
      stats: [
        { label: 'Existing Loan Balance', value: this.formatCurrency(existingBalance) },
        { label: 'Top-Up Cash Sanctioned', value: this.formatCurrency(topUpAmount) },
        { label: 'Combined Total Exposure', value: this.formatCurrency(existingBalance + topUpAmount) },
        { label: 'Combined Loan-to-Value (LTV)', value: `${combinedLtv.toFixed(1)}%`, highlight: combinedLtv <= 75 },
        { label: 'Top-Up Total Interest', value: this.formatCurrency(topUpTotalInterest) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Existing Balance', 'Top-Up Cash', 'Top-Up Interest'],
        values: [existingBalance, topUpAmount, topUpTotalInterest],
        colors: ['#6366f1', '#10b981', '#f59e0b']
      }
    };
  },

  'balance-transfer-calculator'(inputs) {
    const balance = (inputs.currentOutstanding !== undefined && inputs.currentOutstanding !== '') 
      ? Math.max(0, parseFloat(inputs.currentOutstanding) || 0) 
      : 3500000;
    const currRate = (inputs.currentRate !== undefined && inputs.currentRate !== '') 
      ? parseFloat(inputs.currentRate) || 9.5 
      : 9.5;
    const newRate = (inputs.newBankRate !== undefined && inputs.newBankRate !== '') 
      ? parseFloat(inputs.newBankRate) || 8.4 
      : 8.4;
    const remMonths = (inputs.remainingTenureMonths !== undefined && inputs.remainingTenureMonths !== '') 
      ? parseFloat(inputs.remainingTenureMonths) || 180 
      : 180;
    const switchFeePct = (inputs.processingFeePct !== undefined && inputs.processingFeePct !== null && inputs.processingFeePct !== '') 
      ? Math.max(0, parseFloat(inputs.processingFeePct) || 0) 
      : 0.5;
    const preClosurePct = (inputs.preClosureFeePct !== undefined && inputs.preClosureFeePct !== null && inputs.preClosureFeePct !== '') 
      ? Math.max(0, parseFloat(inputs.preClosureFeePct) || 0) 
      : 2.0;

    const rOld = currRate / 12 / 100;
    const rNew = newRate / 12 / 100;

    const emiOld = (balance * rOld * Math.pow(1 + rOld, remMonths)) / (Math.pow(1 + rOld, remMonths) - 1);
    const emiNew = (balance * rNew * Math.pow(1 + rNew, remMonths)) / (Math.pow(1 + rNew, remMonths) - 1);

    const intOld = (emiOld * remMonths) - balance;
    const intNew = (emiNew * remMonths) - balance;

    // Calculation Logic:
    // Pre-Closure Charges = Outstanding Principal × (Pre-Closure % ÷ 100)
    // If Pre-Closure % = 0 → Charges = ₹0
    const preClosureCharges = preClosurePct > 0 ? (balance * (preClosurePct / 100)) : 0;
    const processingFee = switchFeePct > 0 ? (balance * (switchFeePct / 100)) : 0;
    // Total Cost of Balance Transfer = Pre-Closure Charges + Processing Fee
    const totalTransferCost = preClosureCharges + processingFee;
    // Interest Saved on New Loan = intOld - intNew
    const interestSaved = intOld - intNew;
    // Net Savings = (Interest Saved on New Loan) − (Total Cost of Balance Transfer)
    const netSavings = interestSaved - totalTransferCost;
    const monthlySaving = emiOld - emiNew;
    const breakEvenMonths = (monthlySaving > 0 && totalTransferCost > 0) 
      ? Math.ceil(totalTransferCost / monthlySaving) 
      : (totalTransferCost <= 0 ? 0 : 0);

    return {
      primaryResult: {
        label: 'Net Lifetime Savings',
        value: this.formatCurrency(netSavings),
        subtext: `Save ${this.formatCurrency(monthlySaving)} every month for ${remMonths} months`
      },
      stats: [
        { label: 'Current Bank EMI', value: this.formatCurrency(emiOld) },
        { label: 'New Lender EMI', value: this.formatCurrency(emiNew), highlight: true },
        { label: 'Monthly Cashflow Benefit', value: `+${this.formatCurrency(monthlySaving)}/mo`, highlight: true },
        { label: 'Gross Interest Saved', value: this.formatCurrency(interestSaved) },
        { label: 'Pre‑Closure Charges', value: this.formatCurrency(preClosureCharges) },
        { label: 'New Lender Processing Fee', value: this.formatCurrency(processingFee) },
        { label: 'Total Cost of Balance Transfer', value: this.formatCurrency(totalTransferCost), highlight: true },
        { label: 'Break-Even Payback Horizon', value: `${breakEvenMonths} Months`, highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Net Cash Saved', 'Total Transfer Cost', 'New Total Interest'],
        values: [Math.max(0, netSavings), totalTransferCost, intNew],
        colors: ['#00bfff', '#ef4444', '#3b82f6']
      },
      customHtml: `
        <div class="bt-summary-card bt-fade-in" id="bt-dynamic-summary-card">
          <div class="bt-summary-header">
            <div class="bt-summary-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00bfff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span>Balance Transfer Cost &amp; Savings Summary</span>
            </div>
            <span class="bt-summary-badge">Dynamic Comparison</span>
          </div>
          <div class="bt-summary-row summary-row" id="bt-summary-row">
            <div class="bt-summary-col">
              <span class="bt-summary-label">Pre‑Closure Charges (₹)</span>
              <span class="bt-summary-value" id="bt-summary-preclosure">${this.formatCurrency(preClosureCharges)}</span>
              <span class="bt-summary-subtext">${preClosurePct === 0 ? '₹0 (0% floating loan waiver)' : `${preClosurePct}% of ₹${balance.toLocaleString('en-IN')}`}</span>
            </div>
            <div class="bt-summary-col">
              <span class="bt-summary-label">Total Cost of Balance Transfer (₹)</span>
              <span class="bt-summary-value" id="bt-summary-totalcost">${this.formatCurrency(totalTransferCost)}</span>
              <span class="bt-summary-subtext">Pre‑Closure (${this.formatCurrency(preClosureCharges)}) + Fee (${this.formatCurrency(processingFee)})</span>
            </div>
            <div class="bt-summary-col bt-summary-col-highlight">
              <span class="bt-summary-label">Net Savings (₹)</span>
              <span class="bt-summary-value bt-net-savings-accent highlight-net-savings" id="bt-summary-netsavings">${this.formatCurrency(netSavings)}</span>
              <span class="bt-summary-subtext">Gross Saved (${this.formatCurrency(interestSaved)}) − Cost (${this.formatCurrency(totalTransferCost)})</span>
            </div>
          </div>
        </div>
      `,
      breakdownTable: {
        title: 'Balance Transfer Amortization & Switching Economics',
        subtitle: 'Comprehensive side-by-side audit of existing loan vs new refinancing terms',
        headers: ['Loan Metric', 'Existing Bank', 'New Transferred Bank', 'Your Financial Advantage'],
        rows: [
          ['Annual Interest Rate', `${currRate}%`, `${newRate}%`, `Save ${(currRate - newRate).toFixed(2)}% APR`],
          ['Monthly EMI Outflow', this.formatCurrency(emiOld), this.formatCurrency(emiNew), `Save ${this.formatCurrency(monthlySaving)}/month`],
          ['Total Residual Interest', this.formatCurrency(intOld), this.formatCurrency(intNew), `Gross Save: ${this.formatCurrency(interestSaved)}`],
          ['Pre‑Closure Charges', '₹0.00', this.formatCurrency(preClosureCharges), preClosurePct === 0 ? '0% Charges (₹0)' : `${preClosurePct}% of outstanding`],
          ['New Lender Processing Fee', '₹0.00', this.formatCurrency(processingFee), `${switchFeePct}% of outstanding`],
          ['Total Cost of Balance Transfer', '₹0.00', this.formatCurrency(totalTransferCost), 'Pre‑Closure + Processing Fee'],
          ['Net Savings After All Costs', '₹0.00', this.formatCurrency(netSavings), `Fully amortized in ${breakEvenMonths} mos`]
        ]
      }
    };
  },

  'overdraft-calculator'(inputs) {
    const limit = parseFloat(inputs.sanctionedLimit) || 1000000;
    const util = parseFloat(inputs.averageUtilization) || 350000;
    const rate = parseFloat(inputs.interestRate) || 10.5;
    const fee = parseFloat(inputs.annualRenewalFee) || 2500;

    const monthlyInterest = util * (rate / 12 / 100);
    const annualInterest = util * (rate / 100);
    const termLoanAnnualCost = limit * (rate / 100);
    const annualSavings = termLoanAnnualCost - (annualInterest + fee);

    return {
      primaryResult: {
        label: 'Monthly OD Interest Outflow',
        value: this.formatCurrency(monthlyInterest),
        subtext: `Pay only for ${this.formatCurrency(util)} utilized, not the full ${this.formatCurrency(limit)} limit!`
      },
      stats: [
        { label: 'Sanctioned Overdraft Limit', value: this.formatCurrency(limit) },
        { label: 'Average Utilized Balance', value: this.formatCurrency(util) },
        { label: 'Annual Interest Paid', value: this.formatCurrency(annualInterest) },
        { label: 'Term Loan Annual Interest', value: this.formatCurrency(termLoanAnnualCost) },
        { label: 'Annual Interest Saved vs Term Loan', value: this.formatCurrency(annualSavings), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Interest Paid on Utilization', 'Annual Savings vs Term Loan', 'Unused Limit Capacity'],
        values: [annualInterest, Math.max(0, annualSavings), limit - util],
        colors: ['#ef4444', '#10b981', '#6366f1']
      }
    };
  },

  // ==========================================
  // LIFESTYLE & EVENT LOAN ENGINES
  // ==========================================
  'credit-card-emi-calculator'(inputs) {
    const amount = parseFloat(inputs.transactionAmount) || 60000;
    const rate = parseFloat(inputs.cardInterestRate) || 15.0;
    const months = parseFloat(inputs.tenureMonths) || 6;
    const fee = parseFloat(inputs.processingFee) || 199;
    const gstPct = parseFloat(inputs.gstRate) || 18;

    const r = rate / 12 / 100;
    const emi = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    const totalInterest = (emi * months) - amount;
    const gstOnFee = fee * (gstPct / 100);
    const gstOnInterest = totalInterest * (gstPct / 100);
    const totalGst = gstOnFee + gstOnInterest;
    const totalPayable = amount + totalInterest + fee + totalGst;

    return {
      primaryResult: {
        label: 'Monthly Card EMI (Before GST)',
        value: this.formatCurrency(emi),
        subtext: `GST of ~${this.formatCurrency(gstOnInterest / months)}/mo added to monthly credit card bill`
      },
      stats: [
        { label: 'Principal Converted', value: this.formatCurrency(amount) },
        { label: 'Total Bank Interest', value: this.formatCurrency(totalInterest) },
        { label: 'Bank Processing Fee', value: this.formatCurrency(fee) },
        { label: 'Statutory 18% GST', value: this.formatCurrency(totalGst), highlight: true },
        { label: 'Total Net Outflow', value: this.formatCurrency(totalPayable) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Principal Converted', 'Bank Interest Cost', 'GST & Bank Fees'],
        values: [amount, totalInterest, fee + totalGst],
        colors: ['#3b82f6', '#f59e0b', '#ec4899']
      }
    };
  },

  'medical-loan-calculator'(inputs) {
    const estimate = parseFloat(inputs.treatmentEstimate) || 600000;
    const insurance = parseFloat(inputs.insuranceCover) || 250000;
    const loanAmount = Math.max(0, estimate - insurance);
    const rate = parseFloat(inputs.interestRate) || 11.0;
    const years = parseFloat(inputs.tenureYears) || 3;
    const n = years * 12;
    const r = rate / 12 / 100;

    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n;
    const totalInterest = (emi * n) - loanAmount;

    return {
      primaryResult: {
        label: 'Monthly Medical EMI',
        value: this.formatCurrency(emi),
        subtext: `For out-of-pocket hospital gap of ${this.formatCurrency(loanAmount)}`
      },
      stats: [
        { label: 'Hospital Treatment Estimate', value: this.formatCurrency(estimate) },
        { label: 'Covered by Insurance / TPA', value: this.formatCurrency(insurance) },
        { label: 'Net Medical Loan Disbursed', value: this.formatCurrency(loanAmount) },
        { label: 'Total Interest Over ${years} Yrs', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Medical Debt Outflow', value: this.formatCurrency(loanAmount + totalInterest) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Insurance Coverage', 'Medical Loan Financed', 'Loan Interest'],
        values: [insurance, loanAmount, totalInterest],
        colors: ['#10b981', '#0284c7', '#f43f5e']
      }
    };
  },

  'wedding-loan-calculator'(inputs) {
    const budget = parseFloat(inputs.weddingBudget) || 1500000;
    const savings = parseFloat(inputs.personalSavings) || 600000;
    const loanAmount = Math.max(0, budget - savings);
    const rate = parseFloat(inputs.interestRate) || 11.5;
    const years = parseFloat(inputs.tenureYears) || 4;
    const n = years * 12;
    const r = rate / 12 / 100;

    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n;
    const totalInterest = (emi * n) - loanAmount;

    return {
      primaryResult: {
        label: 'Monthly Wedding EMI',
        value: this.formatCurrency(emi),
        subtext: `Funding ${this.formatCurrency(loanAmount)} over ${years} Years (${n} Months)`
      },
      stats: [
        { label: 'Total Wedding Budget', value: this.formatCurrency(budget) },
        { label: 'Self-Funded From Savings', value: this.formatCurrency(savings) },
        { label: 'Marriage Loan Amount', value: this.formatCurrency(loanAmount) },
        { label: 'Total Interest Charge', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Overall Wedding Expenditure', value: this.formatCurrency(savings + loanAmount + totalInterest) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Personal Savings', 'Marriage Loan Principal', 'Borrowing Interest'],
        values: [savings, loanAmount, totalInterest],
        colors: ['#10b981', '#ec4899', '#f59e0b']
      }
    };
  },

  'travel-loan-calculator'(inputs) {
    const tripCost = parseFloat(inputs.tripCost) || 250000;
    const savings = parseFloat(inputs.upfrontSavings) || 50000;
    const loanAmount = Math.max(0, tripCost - savings);
    const rate = parseFloat(inputs.interestRate) || 12.5;
    const months = parseFloat(inputs.tenureMonths) || 18;
    const r = rate / 12 / 100;

    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1) : loanAmount / months;
    const totalInterest = (emi * months) - loanAmount;

    return {
      primaryResult: {
        label: 'Monthly Travel Installment',
        value: this.formatCurrency(emi),
        subtext: `For ${months} months to finance ${this.formatCurrency(loanAmount)} holiday budget`
      },
      stats: [
        { label: 'Total Holiday Cost', value: this.formatCurrency(tripCost) },
        { label: 'Upfront Cash Contributed', value: this.formatCurrency(savings) },
        { label: 'Vacation Loan Financed', value: this.formatCurrency(loanAmount) },
        { label: 'Total Interest Paid', value: this.formatCurrency(totalInterest), highlight: true },
        { label: 'Total Vacation Outflow', value: this.formatCurrency(tripCost + totalInterest) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Cash Savings', 'Vacation Loan', 'Interest Cost'],
        values: [savings, loanAmount, totalInterest],
        colors: ['#10b981', '#06b6d4', '#f59e0b']
      }
    };
  },

  // ==========================================
  // SPECIALIZED LOAN ENGINES
  // ==========================================
  'agriculture-loan-calculator'(inputs) {
    const loanAmount = parseFloat(inputs.loanAmount) || 300000;
    const baseRate = parseFloat(inputs.baseRate) || 7.0;
    const promptRepayment = inputs.promptRepayment !== 'no';
    const months = parseFloat(inputs.cropSeasonMonths) || 12;

    const effectiveRate = promptRepayment ? Math.max(0, baseRate - 3.0) : baseRate;
    const normalInterest = loanAmount * (baseRate / 100) * (months / 12);
    const actualInterest = loanAmount * (effectiveRate / 100) * (months / 12);
    const subsidySaved = normalInterest - actualInterest;
    const totalRepayable = loanAmount + actualInterest;

    return {
      primaryResult: {
        label: promptRepayment ? 'Effective Crop Interest (4% Subvention)' : 'Standard Crop Interest (7% Base)',
        value: this.formatCurrency(actualInterest),
        subtext: promptRepayment ? `Govt 3% Subvention Saves You ${this.formatCurrency(subsidySaved)}!` : 'Prompt repayment earns 3% subsidy'
      },
      stats: [
        { label: 'Sanctioned Crop / KCC Loan', value: this.formatCurrency(loanAmount) },
        { label: 'Applicable Interest Rate', value: `${effectiveRate.toFixed(2)}% p.a.`, highlight: promptRepayment },
        { label: 'Interest Subvention Benefit', value: this.formatCurrency(subsidySaved), highlight: subsidySaved > 0 },
        { label: 'Total Payable at Harvest', value: this.formatCurrency(totalRepayable) },
        { label: 'Effective Monthly Cost', value: this.formatCurrency(actualInterest / months) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Crop Principal Financed', 'Actual Net Interest Due', 'Govt Subvention Subsidy'],
        values: [loanAmount, actualInterest, Math.max(0, subsidySaved)],
        colors: ['#10b981', '#f59e0b', '#3b82f6']
      }
    };
  },

  'equipment-loan-calculator'(inputs) {
    const cost = parseFloat(inputs.machineryCost) || 2500000;
    const downPct = parseFloat(inputs.downPaymentPct) || 20;
    const downAmount = cost * (downPct / 100);
    const loanAmount = cost - downAmount;
    const rate = parseFloat(inputs.interestRate) || 10.5;
    const years = parseFloat(inputs.tenureYears) || 5;
    const n = years * 12;
    const r = rate / 12 / 100;
    const rev = parseFloat(inputs.expectedMonthlyRevenue) || 85000;

    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n;
    const totalInterest = (emi * n) - loanAmount;
    const netCashflowMonthly = rev - emi;
    const annualNet = netCashflowMonthly * 12;
    const paybackYears = annualNet > 0 ? (downAmount / annualNet).toFixed(1) : 'N/A';

    return {
      primaryResult: {
        label: 'Monthly Equipment EMI',
        value: this.formatCurrency(emi),
        subtext: `Net Monthly Cashflow: ${this.formatCurrency(netCashflowMonthly)} (Revenue - EMI)`
      },
      stats: [
        { label: 'Equipment Invoice Value', value: this.formatCurrency(cost) },
        { label: 'Margin Money Paid', value: this.formatCurrency(downAmount) },
        { label: 'Machinery Loan Amount', value: this.formatCurrency(loanAmount) },
        { label: 'Total Loan Interest', value: this.formatCurrency(totalInterest) },
        { label: 'Estimated Payback Period', value: `${paybackYears} Years`, highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Down Payment Paid', 'Loan Principal Financed', 'Total Interest Paid'],
        values: [downAmount, loanAmount, totalInterest],
        colors: ['#10b981', '#6366f1', '#f59e0b']
      }
    };
  },

  'reverse-mortgage-calculator'(inputs) {
    const propVal = parseFloat(inputs.propertyValue) || 10000000;
    const ltv = Math.min(80, parseFloat(inputs.ltvCap) || 60);
    const eligibleCorpus = propVal * (ltv / 100);
    const years = parseFloat(inputs.tenureYears) || 15;
    const n = years * 12;
    const rate = parseFloat(inputs.expectedRate) || 9.5;
    const r = rate / 12 / 100;

    const monthlyPayout = r > 0 ? (eligibleCorpus * r) / (Math.pow(1 + r, n) - 1) : eligibleCorpus / n;
    const totalSeniorReceived = monthlyPayout * n;
    const accumulatedInterest = eligibleCorpus - totalSeniorReceived;
    const residualEquity = propVal - eligibleCorpus;

    return {
      primaryResult: {
        label: 'Guaranteed Monthly Annuity Payout',
        value: this.formatCurrency(monthlyPayout),
        subtext: `Payable tax-free every month to senior citizen for ${years} Years`
      },
      stats: [
        { label: 'Residential Property Value', value: this.formatCurrency(propVal) },
        { label: 'Max Reverse Mortgage Corpus', value: this.formatCurrency(eligibleCorpus) },
        { label: 'Total Direct Cash Received', value: this.formatCurrency(totalSeniorReceived), highlight: true },
        { label: 'Accumulated Compounded Interest', value: this.formatCurrency(accumulatedInterest) },
        { label: 'Residual Home Equity for Heirs', value: this.formatCurrency(residualEquity), highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Direct Cash Paid to Senior', 'Compounded Interest Accrual', 'Protected Property Equity'],
        values: [totalSeniorReceived, accumulatedInterest, residualEquity],
        colors: ['#10b981', '#f59e0b', '#6366f1']
      }
    };
  },

  'education-abroad-loan-calculator'(inputs) {
    const foreignCost = parseFloat(inputs.tuitionForeignCost) || 50000;
    const fxRate = parseFloat(inputs.exchangeRate) || 84.0;
    const totalInr = foreignCost * fxRate;
    const selfFund = parseFloat(inputs.scholarshipSelfFunding) || 500000;
    const loanAmount = Math.max(0, totalInr - selfFund);
    const rate = parseFloat(inputs.interestRate) || 10.5;
    const r = rate / 12 / 100;
    const courseYrs = parseFloat(inputs.courseYears) || 2;
    const moraMonths = (courseYrs * 12) + 6;
    const repayYrs = parseFloat(inputs.repaymentTenureYears) || 10;
    const repayN = repayYrs * 12;

    const moraInterest = loanAmount * (rate / 100) * (moraMonths / 12);
    const capitalizedPrin = loanAmount + moraInterest;
    const emi = r > 0 ? (capitalizedPrin * r * Math.pow(1 + r, repayN)) / (Math.pow(1 + r, repayN) - 1) : capitalizedPrin / repayN;
    const repayInterest = (emi * repayN) - capitalizedPrin;
    const totalLifetimeInterest = moraInterest + repayInterest;

    return {
      primaryResult: {
        label: 'Post-Study Monthly EMI',
        value: this.formatCurrency(emi),
        subtext: `Starts ${moraMonths} months post-admission (Course + 6 Mos buffer)`
      },
      stats: [
        { label: 'Total Overseas Cost (INR)', value: this.formatCurrency(totalInr) },
        { label: 'Foreign University Disbursal', value: this.formatCurrency(loanAmount) },
        { label: 'Moratorium Interest Accrued', value: this.formatCurrency(moraInterest) },
        { label: 'Capitalized Repayment Principal', value: this.formatCurrency(capitalizedPrin) },
        { label: 'Total Repayment Interest', value: this.formatCurrency(repayInterest) },
        { label: 'Sec 80E Tax Deduction Eligible', value: '100% Unlimited Interest', highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Scholarship / Self-Funding', 'Tuition Loan Disbursed', 'Total Interest Commitments'],
        values: [selfFund, loanAmount, totalLifetimeInterest],
        colors: ['#10b981', '#0284c7', '#f43f5e']
      }
    };
  },


  calculateBrokerage(segment, buyPrice, sellPrice, qty) {
    const buyVal = (parseFloat(buyPrice) || 0) * (parseFloat(qty) || 0);
    const sellVal = (parseFloat(sellPrice) || 0) * (parseFloat(qty) || 0);
    const turnover = buyVal + sellVal;
    let brokerage = 0;
    let stt = 0;
    let exchTxn = 0;
    let sebi = turnover * 0.000001; // Rs 10 / cr
    let stampDuty = 0;

    if (segment === 'delivery') {
      brokerage = 0;
      stt = turnover * 0.001;
      exchTxn = turnover * 0.0000297;
      stampDuty = buyVal * 0.00015;
    } else if (segment === 'intraday') {
      brokerage = Math.min(20, buyVal * 0.0003) + Math.min(20, sellVal * 0.0003);
      stt = sellVal * 0.00025;
      exchTxn = turnover * 0.0000297;
      stampDuty = buyVal * 0.00003;
    } else if (segment === 'futures') {
      brokerage = Math.min(20, buyVal * 0.0003) + Math.min(20, sellVal * 0.0003);
      stt = sellVal * 0.000125;
      exchTxn = turnover * 0.0000173;
      stampDuty = buyVal * 0.00002;
    } else if (segment === 'options') {
      brokerage = 40;
      stt = sellVal * 0.000625;
      exchTxn = turnover * 0.0003503;
      stampDuty = buyVal * 0.00003;
    }

    const gst = 0.18 * (brokerage + exchTxn + sebi);
    const totalCharges = brokerage + stt + exchTxn + sebi + stampDuty + gst;
    const grossProfit = sellVal - buyVal;
    const netProfit = grossProfit - totalCharges;
    const breakeven = qty > 0 ? (totalCharges / qty) : 0;

    return {
      buyVal,
      sellVal,
      turnover,
      brokerage,
      stt,
      exchTxn,
      sebi,
      stampDuty,
      gst,
      totalCharges,
      grossProfit,
      netProfit,
      breakeven
    };
  },

  calculateBrokerSip(monthlyP, annualRoi, years) {
    const P = parseFloat(monthlyP) || 5000;
    const r = parseFloat(annualRoi) || 12;
    const y = parseFloat(years) || 10;
    const m = y * 12;
    const iDirect = (r / 100) / 12;
    const fvDirect = iDirect > 0 ? P * ((Math.pow(1 + iDirect, m) - 1) / iDirect) * (1 + iDirect) : P * m;
    const totalInvested = P * m;
    const netReturnsDirect = fvDirect - totalInvested;

    const iRegular = Math.max(0.0001, ((r - 1.2) / 100) / 12);
    const fvRegular = iRegular > 0 ? P * ((Math.pow(1 + iRegular, m) - 1) / iRegular) * (1 + iRegular) : P * m;
    const commissionSaved = Math.max(0, fvDirect - fvRegular);

    return {
      totalInvested,
      fvDirect,
      netReturnsDirect,
      fvRegular,
      commissionSaved
    };
  },

  calculateBrokerEtfReit(type, units, nav, growthRate, dividendYield, years) {
    const u = parseFloat(units) || 100;
    const p = parseFloat(nav) || 300;
    const g = parseFloat(growthRate) || 8;
    const d = parseFloat(dividendYield) || 6.5;
    const y = parseFloat(years) || 5;

    const capitalInvested = u * p;
    const projectedUnitNav = p * Math.pow(1 + g / 100, y);
    const futureCapitalVal = u * projectedUnitNav;
    const capitalGain = futureCapitalVal - capitalInvested;

    let cumulativeDividends = 0;
    let currVal = capitalInvested;
    for (let yr = 1; yr <= y; yr++) {
      const div = currVal * (d / 100);
      cumulativeDividends += div;
      currVal *= (1 + g / 100);
    }

    const totalValue = futureCapitalVal + cumulativeDividends;
    const totalGain = totalValue - capitalInvested;

    return {
      capitalInvested,
      futureCapitalVal,
      capitalGain,
      cumulativeDividends,
      totalValue,
      totalGain
    };
  },

  calculateDematSavings(annualTurnover, numTrades, traditionalRate) {
    const t = parseFloat(annualTurnover) || 500000;
    const n = parseFloat(numTrades) || 20;
    const rate = parseFloat(traditionalRate) || 0.4;

    const traditionalPaid = Math.max(n * 25, t * (rate / 100));
    const zerodhaPaid = 0;
    const annualSavings = traditionalPaid - zerodhaPaid;

    const r = 0.12;
    const tenYearCompounded = annualSavings * ((Math.pow(1 + r, 10) - 1) / r) * (1 + r);

    return {
      traditionalPaid,
      zerodhaPaid,
      annualSavings,
      tenYearCompounded
    };
  },



  // ==========================================
  // CALCULATOR HUB EXTENSIONS (22 SUITE TOOLS)
  // ==========================================
  // 1. Advanced SIP Calculator
  'advanced-sip-calculator'(inputs) {
    const P = parseFloat(inputs.monthlyInvestment) || 10000;
    const annualReturn = parseFloat(inputs.expectedReturn) || 12.0;
    const r = annualReturn / 12 / 100;
    const years = parseFloat(inputs.timePeriod) || 15;
    const n = years * 12;
    const inflation = parseFloat(inputs.inflationRate) || 6.0;
    const taxRate = parseFloat(inputs.taxRate) || 12.5;

    // Nominal maturity value
    const nominalFV = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const nominalGain = Math.max(0, nominalFV - totalInvested);

    // Capital gains tax (LTCG above ₹1.25L exemption, simplifying for model)
    const taxableGain = Math.max(0, nominalGain - 125000);
    const estTax = taxableGain * (taxRate / 100);
    const postTaxFV = nominalFV - estTax;

    // Real purchasing power after inflation
    const realFV = postTaxFV / Math.pow(1 + inflation / 100, years);
    const inflationLoss = Math.max(0, postTaxFV - realFV);

    return {
      primaryResult: {
        label: 'Inflation-Adjusted Purchasing Power',
        value: this.formatCurrency(realFV),
        subtext: `Nominal future value: ${this.formatCurrency(nominalFV)} (${years} years at ${annualReturn}% return)`
      },
      stats: [
        { label: 'Nominal Maturity Value', value: this.formatCurrency(nominalFV), highlight: true },
        { label: 'Total Invested Capital', value: this.formatCurrency(totalInvested) },
        { label: 'Estimated LTCG Tax', value: this.formatCurrency(estTax) },
        { label: 'Inflation Purchasing Loss', value: this.formatCurrency(inflationLoss) },
        { label: 'Net Post-Tax Corpus', value: this.formatCurrency(postTaxFV) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Real Purchasing Power', 'Inflation Erosion', 'LTCG Tax', 'Total Invested'],
        values: [Math.round(realFV), Math.round(inflationLoss), Math.round(estTax), Math.round(totalInvested)],
        colors: ['#10b981', '#f59e0b', '#ef4444', '#3b82f6']
      }
    };
  },

  // 2. SIP with Step-Up Calculator
  'sip-step-up-calculator'(inputs) {
    const P0 = parseFloat(inputs.monthlyInvestment) || 10000;
    const stepUpRate = (parseFloat(inputs.annualStepUp) || 10.0) / 100;
    const annualReturn = parseFloat(inputs.expectedReturn) || 12.0;
    const monthlyReturn = annualReturn / 12 / 100;
    const years = parseInt(inputs.timePeriod, 10) || 15;

    let totalInvested = 0;
    let stepUpCorpus = 0;
    let curMonthlyP = P0;

    // Flat SIP comparison
    const flatN = years * 12;
    const flatFV = P0 * ((Math.pow(1 + monthlyReturn, flatN) - 1) / monthlyReturn) * (1 + monthlyReturn);
    const flatInvested = P0 * flatN;

    // Month-by-month compounding with annual step-up
    for (let yr = 1; yr <= years; yr++) {
      for (let m = 1; m <= 12; m++) {
        totalInvested += curMonthlyP;
        stepUpCorpus = (stepUpCorpus + curMonthlyP) * (1 + monthlyReturn);
      }
      curMonthlyP = curMonthlyP * (1 + stepUpRate);
    }

    const stepUpGain = stepUpCorpus - totalInvested;
    const extraOverFlat = Math.max(0, stepUpCorpus - flatFV);
    const finalYearMonthly = curMonthlyP / (1 + stepUpRate);

    return {
      primaryResult: {
        label: 'Step-Up Maturity Value',
        value: this.formatCurrency(stepUpCorpus),
        subtext: `+${this.formatCurrency(extraOverFlat)} extra wealth (+${((extraOverFlat / flatFV) * 100).toFixed(1)}%) vs flat SIP`
      },
      stats: [
        { label: 'Total Invested Amount', value: this.formatCurrency(totalInvested) },
        { label: 'Total Wealth Gained', value: this.formatCurrency(stepUpGain), highlight: true },
        { label: 'Regular (Flat) SIP Value', value: this.formatCurrency(flatFV) },
        { label: 'Step-Up Wealth Bonus', value: this.formatCurrency(extraOverFlat) },
        { label: 'Final Year Monthly SIP', value: this.formatCurrency(finalYearMonthly) }
      ],
      chartData: {
        type: 'donut',
        labels: ['Invested Capital', 'Base SIP Gains', 'Step-Up Wealth Bonus'],
        values: [Math.round(totalInvested), Math.round(flatFV - flatInvested), Math.round(extraOverFlat)],
        colors: ['#3b82f6', '#10b981', '#8b5cf6']
      }
    };
  },

  // 3. SIP Goal Planner
  'sip-goal-planner'(inputs) {
    const targetCorpus = parseFloat(inputs.targetCorpus) || 10000000;
    const years = parseFloat(inputs.timePeriod) || 15;
    const annualReturn = parseFloat(inputs.expectedReturn) || 12.0;
    const lumpsum = parseFloat(inputs.existingSavings) || 0;

    const r = annualReturn / 12 / 100;
    const n = years * 12;

    // Future value of existing savings
    const lumpsumFV = lumpsum * Math.pow(1 + annualReturn / 100, years);
    const remainingTarget = Math.max(0, targetCorpus - lumpsumFV);

    // Required monthly SIP = RemTarget / [ ((1+r)^n - 1)/r * (1+r) ]
    const sipFactor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const reqMonthlySIP = remainingTarget > 0 ? remainingTarget / sipFactor : 0;
    const totalSipInvested = reqMonthlySIP * n;
    const totalSelfCapital = lumpsum + totalSipInvested;
    const totalGains = targetCorpus - totalSelfCapital;

    return {
      primaryResult: {
        label: 'Required Monthly SIP',
        value: this.formatCurrency(reqMonthlySIP),
        subtext: `To achieve your goal of ${this.formatCurrency(targetCorpus)} in ${years} years`
      },
      stats: [
        { label: 'Target Financial Goal', value: this.formatCurrency(targetCorpus) },
        { label: 'Existing Savings Growth', value: this.formatCurrency(lumpsumFV) },
        { label: 'Total SIP Contributions', value: this.formatCurrency(totalSipInvested) },
        { label: 'Wealth Multiplier (Returns)', value: this.formatCurrency(Math.max(0, totalGains)), highlight: true },
        { label: 'Total Months', value: `${n} Months` }
      ],
      chartData: {
        type: 'donut',
        labels: ['SIP Contributions', 'Compounded Returns', 'Lumpsum Growth'],
        values: [Math.round(totalSipInvested), Math.round(Math.max(0, totalGains)), Math.round(lumpsumFV)],
        colors: ['#3b82f6', '#10b981', '#6366f1']
      }
    };
  },

  // 4. Brokerage & Charges Calculator
  'brokerage-calculator'(inputs) {
    const segment = inputs.segment || 'equity_delivery';
    const buyPrice = parseFloat(inputs.buyPrice) || 1500;
    const sellPrice = parseFloat(inputs.sellPrice) || 1540;
    const qty = parseInt(inputs.quantity, 10) || 200;

    const buyTurnover = buyPrice * qty;
    const sellTurnover = sellPrice * qty;
    const totalTurnover = buyTurnover + sellTurnover;
    const grossPL = (sellPrice - buyPrice) * qty;

    let brokerage = 0;
    let stt = 0;
    let exchangeTurnover = 0;
    let sebiCharges = (totalTurnover * 0.000001); // ₹10 per crore = 0.0001%
    let stampDuty = 0;

    if (segment === 'equity_delivery') {
      brokerage = 0; // Discount brokers like Zerodha: ₹0 delivery
      stt = (totalTurnover * 0.001); // 0.1% on buy and sell
      exchangeTurnover = totalTurnover * 0.0000297; // NSE 0.00297%
      stampDuty = buyTurnover * 0.00015; // 0.015% on buy
    } else if (segment === 'equity_intraday') {
      brokerage = Math.min(20, buyTurnover * 0.0003) + Math.min(20, sellTurnover * 0.0003);
      stt = sellTurnover * 0.00025; // 0.025% on sell only
      exchangeTurnover = totalTurnover * 0.0000297;
      stampDuty = buyTurnover * 0.00003; // 0.003% on buy
    } else if (segment === 'futures') {
      brokerage = 40; // Flat ₹20 buy + ₹20 sell
      stt = sellTurnover * 0.0002; // 0.02% on sell
      exchangeTurnover = totalTurnover * 0.0000173;
      stampDuty = buyTurnover * 0.00002;
    } else { // options
      brokerage = 40; // Flat ₹20 buy + ₹20 sell
      stt = sellTurnover * 0.001; // 0.1% on premium sold
      exchangeTurnover = totalTurnover * 0.00035;
      stampDuty = buyTurnover * 0.00003;
    }

    const gst = (brokerage + exchangeTurnover + sebiCharges) * 0.18;
    const totalTaxes = brokerage + stt + exchangeTurnover + sebiCharges + stampDuty + gst;
    const netPL = grossPL - totalTaxes;
    const breakevenPts = totalTaxes / qty;

    return {
      primaryResult: {
        label: netPL >= 0 ? 'Net Realized Profit' : 'Net Realized Loss',
        value: this.formatCurrency(netPL),
        subtext: `Gross P&L: ${this.formatCurrency(grossPL)} • Total Charges: ${this.formatCurrency(totalTaxes)}`
      },
      stats: [
        { label: 'Turnover (Buy + Sell)', value: this.formatCurrency(totalTurnover) },
        { label: 'Brokerage', value: this.formatCurrency(brokerage) },
        { label: 'STT / CTT', value: this.formatCurrency(stt) },
        { label: 'Exchange Turnover Fee', value: this.formatCurrency(exchangeTurnover) },
        { label: 'GST (18%) & Stamp Duty', value: this.formatCurrency(gst + stampDuty) },
        { label: 'Breakeven Move Needed', value: `₹${breakevenPts.toFixed(2)} / share`, highlight: true }
      ],
      chartData: {
        type: 'donut',
        labels: ['Net P&L', 'STT / CTT', 'Brokerage', 'Exchange + GST + Stamp'],
        values: [Math.max(0, Math.round(netPL)), Math.round(stt), Math.round(brokerage), Math.round(exchangeTurnover + gst + stampDuty)],
        colors: [netPL >= 0 ? '#10b981' : '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6']
      }
    };
  },

  // 5. Margin Calculator
  'margin-calculator'(inputs) {
    const price = parseFloat(inputs.stockPrice) || 1200;
    const qty = parseInt(inputs.quantity, 10) || 250;
    const leverage = parseFloat(inputs.leverage) || 5;

    const totalPosition = price * qty;
    const requiredMargin = totalPosition / leverage;
    const brokerLoan = totalPosition - requiredMargin;
    const marginPercent = (100 / leverage);

    return {
      primaryResult: {
        label: 'Required Margin Capital',
        value: this.formatCurrency(requiredMargin),
        subtext: `For total position value of ${this.formatCurrency(totalPosition)} (${leverage}x leverage)`
      },
      stats: [
        { label: 'Total Position Value', value: this.formatCurrency(totalPosition), highlight: true },
        { label: 'Broker Exposure / Loan', value: this.formatCurrency(brokerLoan) },
        { label: 'Effective Margin %', value: `${marginPercent.toFixed(1)}%` },
        { label: 'Quantity Traded', value: `${qty} Shares` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Required Cash Margin', 'Broker Funding / Exposure'],
        values: [Math.round(requiredMargin), Math.round(brokerLoan)],
        colors: ['#10b981', '#3b82f6']
      }
    };
  },

  // 6. Options Profit Calculator
  'options-profit-calculator'(inputs) {
    const optionType = inputs.optionType || 'call';
    const position = inputs.position || 'buy';
    const strike = parseFloat(inputs.strikePrice) || 25000;
    const premium = parseFloat(inputs.premium) || 160;
    const lotSize = parseInt(inputs.lotSize, 10) || 50;
    const targetPrice = parseFloat(inputs.targetPrice) || 25400;

    let intrinsicValue = 0;
    if (optionType === 'call') {
      intrinsicValue = Math.max(0, targetPrice - strike);
    } else {
      intrinsicValue = Math.max(0, strike - targetPrice);
    }

    let pnlPerShare = 0;
    let breakeven = 0;
    let maxProfit = 'Unlimited';
    let maxRisk = 'Limited';

    if (position === 'buy') {
      pnlPerShare = intrinsicValue - premium;
      breakeven = optionType === 'call' ? strike + premium : strike - premium;
      maxRisk = this.formatCurrency(premium * lotSize);
      maxProfit = optionType === 'call' ? 'Unlimited Upside' : this.formatCurrency((strike - premium) * lotSize);
    } else { // sell
      pnlPerShare = premium - intrinsicValue;
      breakeven = optionType === 'call' ? strike + premium : strike - premium;
      maxProfit = this.formatCurrency(premium * lotSize);
      maxRisk = optionType === 'call' ? 'Unlimited Risk' : this.formatCurrency((strike - premium) * lotSize);
    }

    const totalPL = pnlPerShare * lotSize;

    return {
      primaryResult: {
        label: totalPL >= 0 ? 'Net Options Profit at Target' : 'Net Options Loss at Target',
        value: this.formatCurrency(totalPL),
        subtext: `Breakeven Spot Price at Expiry: ${this.formatCurrency(breakeven)}`
      },
      stats: [
        { label: 'Breakeven Price', value: this.formatCurrency(breakeven), highlight: true },
        { label: 'P&L per Share', value: this.formatCurrency(pnlPerShare) },
        { label: 'Total Premium', value: this.formatCurrency(premium * lotSize) },
        { label: 'Maximum Profit Potential', value: maxProfit },
        { label: 'Maximum Capital at Risk', value: maxRisk }
      ],
      chartData: {
        type: 'donut',
        labels: ['Target P&L', 'Total Premium Invested'],
        values: [Math.max(0, Math.round(totalPL)), Math.round(premium * lotSize)],
        colors: [totalPL >= 0 ? '#10b981' : '#ef4444', '#3b82f6']
      }
    };
  },

  // 7. Futures Calculator
  'futures-calculator'(inputs) {
    const entry = parseFloat(inputs.entryPrice) || 24800;
    const exit = parseFloat(inputs.exitPrice) || 25150;
    const lotSize = parseInt(inputs.lotSize, 10) || 25;
    const lots = parseInt(inputs.numberOfLots, 10) || 2;
    const marginPerLot = parseFloat(inputs.marginPerLot) || 125000;

    const totalQty = lotSize * lots;
    const pts = exit - entry;
    const grossPL = pts * totalQty;
    const totalMargin = marginPerLot * lots;
    const roc = (grossPL / totalMargin) * 100;
    const contractValue = exit * totalQty;

    return {
      primaryResult: {
        label: grossPL >= 0 ? 'Futures Profit' : 'Futures Loss',
        value: this.formatCurrency(grossPL),
        subtext: `${pts >= 0 ? '+' : ''}${pts.toFixed(1)} points (${roc.toFixed(1)}% Return on Capital)`
      },
      stats: [
        { label: 'Return on Margin (ROC)', value: `${roc.toFixed(2)}%`, highlight: true },
        { label: 'Points Captured', value: `${pts >= 0 ? '+' : ''}${pts.toFixed(1)} pts` },
        { label: 'Total Invested Margin', value: this.formatCurrency(totalMargin) },
        { label: 'Total Contract Value', value: this.formatCurrency(contractValue) },
        { label: 'Total Traded Quantity', value: `${totalQty} Units (${lots} Lots)` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Realized P&L', 'Margin Capital'],
        values: [Math.max(0, Math.round(grossPL)), Math.round(totalMargin)],
        colors: [grossPL >= 0 ? '#10b981' : '#ef4444', '#3b82f6']
      }
    };
  },

  // 8. Mutual Fund Returns Calculator
  'mutual-fund-returns-calculator'(inputs) {
    const P0 = parseFloat(inputs.initialAmount) || 100000;
    const Pn = parseFloat(inputs.finalAmount) || 225000;
    const years = parseFloat(inputs.holdingYears) || 5;

    const absReturn = ((Pn - P0) / P0) * 100;
    const cagr = (Math.pow(Pn / P0, 1 / years) - 1) * 100;
    const totalGain = Pn - P0;
    const multiplier = Pn / P0;

    return {
      primaryResult: {
        label: 'Annualized Return (CAGR)',
        value: `${cagr.toFixed(2)}% p.a.`,
        subtext: `Absolute growth of ${absReturn.toFixed(1)}% over ${years} years`
      },
      stats: [
        { label: 'Total Wealth Multiplier', value: `${multiplier.toFixed(2)}x`, highlight: true },
        { label: 'Net Capital Gains', value: this.formatCurrency(totalGain) },
        { label: 'Initial Investment', value: this.formatCurrency(P0) },
        { label: 'Final Maturity Value', value: this.formatCurrency(Pn) },
        { label: 'Absolute Return', value: `${absReturn.toFixed(2)}%` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Invested Principal', 'Net Capital Gains'],
        values: [Math.round(P0), Math.round(Math.max(0, totalGain))],
        colors: ['#3b82f6', '#10b981']
      }
    };
  },

  // 9. Addition Calculator
  'addition-calculator'(inputs) {
    const a = parseFloat(inputs.numberA) || 0;
    const b = parseFloat(inputs.numberB) || 0;
    const extrasStr = String(inputs.extraNumbers || '');
    const extras = extrasStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    const allNums = [a, b, ...extras];
    const sum = allNums.reduce((acc, v) => acc + v, 0);
    const avg = sum / allNums.length;

    return {
      primaryResult: {
        label: 'Total Sum',
        value: this.formatNumber(sum, 2),
        subtext: `Calculated from ${allNums.length} terms • Average: ${this.formatNumber(avg, 2)}`
      },
      stats: [
        { label: 'Number A', value: this.formatNumber(a, 2) },
        { label: 'Number B', value: this.formatNumber(b, 2) },
        { label: 'Additional Terms', value: `${extras.length} values` },
        { label: 'Arithmetic Mean (Avg)', value: this.formatNumber(avg, 2), highlight: true }
      ]
    };
  },

  // 10. Subtraction Calculator
  'subtraction-calculator'(inputs) {
    const a = parseFloat(inputs.minuend) || 0;
    const b = parseFloat(inputs.subtrahend) || 0;

    const diff = a - b;
    const absDiff = Math.abs(diff);
    const pctChange = a !== 0 ? ((diff - a) / Math.abs(a)) * 100 : 0;

    return {
      primaryResult: {
        label: 'Difference (A - B)',
        value: this.formatNumber(diff, 2),
        subtext: `Minuend: ${this.formatNumber(a, 2)} • Subtrahend: ${this.formatNumber(b, 2)}`
      },
      stats: [
        { label: 'Absolute Difference', value: this.formatNumber(absDiff, 2), highlight: true },
        { label: 'Relative Reduction', value: `${pctChange.toFixed(2)}%` },
        { label: 'Sign Analysis', value: diff >= 0 ? 'Positive result (A ≥ B)' : 'Negative result (A < B)' }
      ]
    };
  },

  // 11. Multiplication Calculator
  'multiplication-calculator'(inputs) {
    const a = parseFloat(inputs.multiplicand) || 0;
    const b = parseFloat(inputs.multiplier) || 0;

    const product = a * b;
    const sqrt = product >= 0 ? Math.sqrt(product) : NaN;

    return {
      primaryResult: {
        label: 'Product (A × B)',
        value: this.formatNumber(product, 2),
        subtext: `${a} × ${b} = ${product}`
      },
      stats: [
        { label: 'Square Root of Product', value: isNaN(sqrt) ? 'Imaginary' : this.formatNumber(sqrt, 2), highlight: true },
        { label: 'Scientific Notation', value: product.toExponential(4) },
        { label: 'Is Integer Result', value: Number.isInteger(product) ? 'Yes' : 'Decimal' }
      ]
    };
  },

  // 12. Division Calculator
  'division-calculator'(inputs) {
    const dividend = parseFloat(inputs.dividend) || 0;
    const divisor = parseFloat(inputs.divisor) || 1;

    if (divisor === 0) {
      return {
        primaryResult: { label: 'Division by Zero', value: 'Undefined' },
        stats: [{ label: 'Error', value: 'Cannot divide by zero' }]
      };
    }

    const decimalResult = dividend / divisor;
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;

    return {
      primaryResult: {
        label: 'Quotient with Remainder',
        value: `${quotient} R ${remainder}`,
        subtext: `Exact decimal: ${this.formatNumber(decimalResult, 4)}`
      },
      stats: [
        { label: 'Exact Decimal', value: this.formatNumber(decimalResult, 4), highlight: true },
        { label: 'Quotient (Whole)', value: `${quotient}` },
        { label: 'Remainder', value: `${remainder}` },
        { label: 'Mixed Fraction', value: remainder === 0 ? `${quotient}` : `${quotient} ${remainder}/${divisor}` }
      ]
    };
  },

  // 13. Algebra Solver
  'algebra-solver'(inputs) {
    const eqType = inputs.eqType || 'quadratic';
    const a = parseFloat(inputs.coefA) || 1;
    const b = parseFloat(inputs.coefB) || -7;
    const c = parseFloat(inputs.coefC) || 12;

    if (eqType === 'linear') {
      // ax + b = c => ax = c - b => x = (c - b) / a
      if (a === 0) {
        return {
          primaryResult: { label: 'Invalid Equation', value: 'a cannot be 0' },
          stats: [{ label: 'Status', value: 'Not a linear equation' }]
        };
      }
      const x = (c - b) / a;
      return {
        primaryResult: {
          label: 'Solution for x',
          value: `x = ${this.formatNumber(x, 4)}`,
          subtext: `Linear equation: ${a}x + (${b}) = ${c}`
        },
        stats: [
          { label: 'Single Root', value: `x = ${this.formatNumber(x, 4)}`, highlight: true },
          { label: 'Slope a', value: `${a}` },
          { label: 'Y-Intercept', value: `${b}` }
        ]
      };
    }

    // Quadratic ax^2 + bx + c = 0
    if (a === 0) {
      return {
        primaryResult: { label: 'Degenerate Quadratic', value: 'a cannot be 0' },
        stats: [{ label: 'Status', value: 'Linear when a = 0' }]
      };
    }

    const delta = b * b - 4 * a * c;
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;

    if (delta > 0) {
      const x1 = (-b + Math.sqrt(delta)) / (2 * a);
      const x2 = (-b - Math.sqrt(delta)) / (2 * a);
      return {
        primaryResult: {
          label: 'Two Distinct Real Roots',
          value: `x₁ = ${this.formatNumber(x1, 3)},  x₂ = ${this.formatNumber(x2, 3)}`,
          subtext: `Discriminant Δ = ${this.formatNumber(delta, 2)} (> 0)`
        },
        stats: [
          { label: 'Root x₁', value: this.formatNumber(x1, 4), highlight: true },
          { label: 'Root x₂', value: this.formatNumber(x2, 4), highlight: true },
          { label: 'Discriminant (Δ)', value: this.formatNumber(delta, 2) },
          { label: 'Parabola Vertex (h, k)', value: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` }
        ]
      };
    } else if (delta === 0) {
      const x = -b / (2 * a);
      return {
        primaryResult: {
          label: 'One Repeated Real Root',
          value: `x = ${this.formatNumber(x, 4)}`,
          subtext: `Discriminant Δ = 0 (Tangent to x-axis)`
        },
        stats: [
          { label: 'Repeated Root', value: this.formatNumber(x, 4), highlight: true },
          { label: 'Discriminant (Δ)', value: '0' },
          { label: 'Vertex', value: `(${vertexX.toFixed(2)}, 0)` }
        ]
      };
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-delta) / (2 * a);
      return {
        primaryResult: {
          label: 'Two Complex / Imaginary Roots',
          value: `${realPart.toFixed(3)} ± ${imagPart.toFixed(3)}i`,
          subtext: `Discriminant Δ = ${delta.toFixed(2)} (< 0)`
        },
        stats: [
          { label: 'Complex Roots', value: `${realPart.toFixed(3)} ± ${imagPart.toFixed(3)}i`, highlight: true },
          { label: 'Discriminant (Δ)', value: this.formatNumber(delta, 2) },
          { label: 'Parabola Vertex', value: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})` }
        ]
      };
    }
  },

  // 14. Trigonometry Calculator
  'trigonometry-calculator'(inputs) {
    const deg = parseFloat(inputs.angleDegrees) || 45;
    const opp = parseFloat(inputs.sideOpposite) || 3;
    const adj = parseFloat(inputs.sideAdjacent) || 4;

    const rad = (deg * Math.PI) / 180;
    const sinVal = Math.sin(rad);
    const cosVal = Math.cos(rad);
    const tanVal = Math.tan(rad);
    const hypotenuse = Math.sqrt(opp * opp + adj * adj);

    return {
      primaryResult: {
        label: `Trigonometric Values for ${deg}°`,
        value: `sin = ${sinVal.toFixed(4)},  cos = ${cosVal.toFixed(4)}`,
        subtext: `Angle in Radians: ${rad.toFixed(4)} rad`
      },
      stats: [
        { label: 'sin(θ)', value: sinVal.toFixed(4), highlight: true },
        { label: 'cos(θ)', value: cosVal.toFixed(4), highlight: true },
        { label: 'tan(θ)', value: Math.abs(cosVal) < 1e-9 ? 'Undefined' : tanVal.toFixed(4) },
        { label: 'Right Triangle Hypotenuse', value: hypotenuse.toFixed(3) },
        { label: 'Triangle Area (½ × a × b)', value: `${(0.5 * opp * adj).toFixed(2)}` }
      ]
    };
  },

  // 15. Matrix Operations
  'matrix-calculator'(inputs) {
    const op = inputs.operation || 'det';
    const r1 = (inputs.matrixA_row1 || '4, 7').split(',').map(n => parseFloat(n.trim()) || 0);
    const r2 = (inputs.matrixA_row2 || '2, 6').split(',').map(n => parseFloat(n.trim()) || 0);

    // 2x2 determinant
    const detA = (r1[0] * r2[1]) - (r1[1] * r2[0]);
    const traceA = r1[0] + r2[1];

    let resultMsg = `det(A) = ${detA.toFixed(2)}`;
    if (op === 'det') {
      resultMsg = `Determinant: ${detA.toFixed(2)}`;
    } else if (op === 'transpose') {
      resultMsg = `Aᵀ = [[${r1[0]}, ${r2[0]}], [${r1[1]}, ${r2[1]}]]`;
    }

    return {
      primaryResult: {
        label: op === 'det' ? 'Matrix A Determinant' : 'Matrix Result',
        value: resultMsg,
        subtext: `Matrix Trace: ${traceA.toFixed(2)} • Invertible: ${detA !== 0 ? 'Yes' : 'No (Singular)'}`
      },
      stats: [
        { label: 'Determinant det(A)', value: detA.toFixed(3), highlight: true },
        { label: 'Matrix Trace tr(A)', value: traceA.toFixed(3) },
        { label: 'Singular / Invertible', value: detA !== 0 ? 'Invertible' : 'Singular' },
        { label: 'Matrix A Layout', value: `[ [${r1.join(', ')}], [${r2.join(', ')}] ]` }
      ]
    };
  },

  // 16. Prime Factorization
  'prime-factorization-calculator'(inputs) {
    let n = parseInt(inputs.numberN, 10) || 360;
    n = Math.abs(n);
    if (n < 2) n = 2;

    const factors = {};
    let temp = n;

    for (let d = 2; d * d <= temp; d++) {
      while (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp /= d;
      }
    }
    if (temp > 1) {
      factors[temp] = (factors[temp] || 0) + 1;
    }

    const canonicalParts = Object.entries(factors).map(([p, exp]) => exp > 1 ? `${p}^${exp}` : `${p}`);
    const canonicalStr = canonicalParts.join(' × ');

    // Divisors count
    let divisorsCount = 1;
    for (const exp of Object.values(factors)) {
      divisorsCount *= (exp + 1);
    }

    const isPrime = Object.keys(factors).length === 1 && Object.values(factors)[0] === 1;

    return {
      primaryResult: {
        label: 'Canonical Prime Factorization',
        value: canonicalStr,
        subtext: isPrime ? `${n} is a Prime Number!` : `${n} has ${divisorsCount} total divisors`
      },
      stats: [
        { label: 'Prime Factor Form', value: canonicalStr, highlight: true },
        { label: 'Is Prime Number', value: isPrime ? 'Yes (Prime)' : 'No (Composite)' },
        { label: 'Distinct Prime Factors', value: Object.keys(factors).join(', ') },
        { label: 'Total Number of Divisors', value: `${divisorsCount}` }
      ]
    };
  },

  // 17. Age & Calendar Tools
  'age-calendar-calculator'(inputs) {
    const bDate = new Date(inputs.birthDate || '1995-08-15');
    const tDate = inputs.targetDate ? new Date(inputs.targetDate) : new Date();

    if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) {
      return {
        primaryResult: { label: 'Invalid Date', value: 'Please enter valid date YYYY-MM-DD' },
        stats: [{ label: 'Status', value: 'Format Error' }]
      };
    }

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = Math.max(0, tDate.getTime() - bDate.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornDay = weekdays[bDate.getDay()];

    // Next birthday countdown
    const nextBday = new Date(tDate.getFullYear(), bDate.getMonth(), bDate.getDate());
    if (nextBday < tDate) {
      nextBday.setFullYear(tDate.getFullYear() + 1);
    }
    const daysToNext = Math.ceil((nextBday - tDate) / (1000 * 60 * 60 * 24));

    return {
      primaryResult: {
        label: 'Exact Chronological Age',
        value: `${years} Years, ${months} Months, ${days} Days`,
        subtext: `Born on a ${bornDay} • Next birthday in ${daysToNext} days`
      },
      stats: [
        { label: 'Total Days Lived', value: `${totalDays.toLocaleString()} Days`, highlight: true },
        { label: 'Day of Week Born', value: bornDay },
        { label: 'Next Birthday In', value: `${daysToNext} Days` },
        { label: 'Total Months Lived', value: `${years * 12 + months} Months` }
      ]
    };
  },

  // 18. Apgar Score Calculator
  'apgar-score-calculator'(inputs) {
    const a = parseInt(inputs.appearance, 10) || 2;
    const p = parseInt(inputs.pulse, 10) || 2;
    const g = parseInt(inputs.grimace, 10) || 2;
    const act = parseInt(inputs.activity, 10) || 2;
    const r = parseInt(inputs.respiration, 10) || 2;

    const total = a + p + g + act + r;

    let interpretation = 'Normal / Reassuring (7-10)';
    let guidance = 'Routine post-delivery neonatal care. Continue skin-to-skin and observation.';
    let highlightColor = '#10b981';

    if (total <= 3) {
      interpretation = 'Critically Low / Severely Depressed (0-3)';
      guidance = 'Immediate emergency neonatal resuscitation and intensive support required.';
      highlightColor = '#ef4444';
    } else if (total <= 6) {
      interpretation = 'Moderately Abnormal (4-6)';
      guidance = 'Clear airway, provide tactile stimulation, supplemental oxygen / ventilation support.';
      highlightColor = '#f59e0b';
    }

    return {
      primaryResult: {
        label: 'Total Apgar Score',
        value: `${total} / 10`,
        subtext: interpretation
      },
      stats: [
        { label: 'Clinical Assessment', value: interpretation, highlight: true },
        { label: 'Clinical Guidance', value: guidance },
        { label: 'Appearance (Skin)', value: `${a} / 2` },
        { label: 'Pulse (Heart Rate)', value: `${p} / 2` },
        { label: 'Grimace (Reflex)', value: `${g} / 2` },
        { label: 'Activity (Tone)', value: `${act} / 2` },
        { label: 'Respiration', value: `${r} / 2` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Score Achieved', 'Points Deficit'],
        values: [total, 10 - total],
        colors: [highlightColor, '#334155']
      }
    };
  },

  // 19. Glasgow Coma Scale Calculator
  'glasgow-coma-scale-calculator'(inputs) {
    const e = parseInt(inputs.eye, 10) || 4;
    const v = parseInt(inputs.verbal, 10) || 5;
    const m = parseInt(inputs.motor, 10) || 6;

    const total = e + v + m;

    let severity = 'Mild Brain Injury / Alert (13-15)';
    let airway = 'Spontaneous protective reflexes intact';
    let highlightColor = '#10b981';

    if (total <= 8) {
      severity = 'Severe Brain Injury / Coma (3-8)';
      airway = 'High aspiration risk. Consider immediate definitive airway / endotracheal intubation.';
      highlightColor = '#ef4444';
    } else if (total <= 12) {
      severity = 'Moderate Brain Injury (9-12)';
      airway = 'Frequent neuro checks, close monitoring for intracranial decompensation.';
      highlightColor = '#f59e0b';
    }

    return {
      primaryResult: {
        label: 'Total GCS Score',
        value: `${total} / 15`,
        subtext: `Classification: ${severity}`
      },
      stats: [
        { label: 'Injury Severity', value: severity, highlight: true },
        { label: 'Airway / Clinical Action', value: airway },
        { label: 'Eye Response (E)', value: `${e} / 4` },
        { label: 'Verbal Response (V)', value: `${v} / 5` },
        { label: 'Motor Response (M)', value: `${m} / 6` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Eye (E)', 'Verbal (V)', 'Motor (M)', 'Deficit'],
        values: [e, v, m, Math.max(0, 15 - total)],
        colors: ['#3b82f6', '#10b981', '#8b5cf6', '#334155']
      }
    };
  },

  // 20. GFR Calculator (CKD-EPI 2021)
  'gfr-calculator'(inputs) {
    const scr = parseFloat(inputs.creatinine) || 1.0;
    const age = parseFloat(inputs.age) || 45;
    const gender = inputs.gender || 'male';

    const isFemale = gender === 'female';
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const genderMult = isFemale ? 1.012 : 1.0;

    const minRatio = Math.min(scr / kappa, 1);
    const maxRatio = Math.max(scr / kappa, 1);

    const egfr = 142 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.200) * Math.pow(0.9938, age) * genderMult;

    let stage = 'Stage 1 (Normal / High: ≥ 90 mL/min)';
    let note = 'Normal kidney function if no other signs of kidney damage.';
    let highlightColor = '#10b981';

    if (egfr < 15) {
      stage = 'Stage 5 (Kidney Failure: < 15 mL/min)';
      note = 'End-stage renal disease (ESRD). Dialysis or kidney transplant evaluation needed.';
      highlightColor = '#ef4444';
    } else if (egfr < 30) {
      stage = 'Stage 4 (Severe Decrease: 15-29 mL/min)';
      note = 'Severely decreased kidney function. Nephrology specialist care required.';
      highlightColor = '#ef4444';
    } else if (egfr < 60) {
      stage = 'Stage 3 (Moderate Decrease: 30-59 mL/min)';
      note = 'Moderately decreased kidney function. Monitor blood pressure and albuminuria.';
      highlightColor = '#f59e0b';
    } else if (egfr < 90) {
      stage = 'Stage 2 (Mild Decrease: 60-89 mL/min)';
      note = 'Mildly decreased kidney function. Routine follow-up recommended.';
      highlightColor = '#3b82f6';
    }

    return {
      primaryResult: {
        label: 'Estimated GFR (eGFR)',
        value: `${egfr.toFixed(1)} mL/min/1.73m²`,
        subtext: stage
      },
      stats: [
        { label: 'CKD Stage', value: stage, highlight: true },
        { label: 'Clinical Commentary', value: note },
        { label: 'Serum Creatinine', value: `${scr.toFixed(2)} mg/dL` },
        { label: 'Equation Used', value: '2021 CKD-EPI Creatinine Equation' }
      ]
    };
  },

  // 21. Burns Fluid Replacement (Parkland Formula)
  'burns-fluid-calculator'(inputs) {
    const weight = parseFloat(inputs.weightKg) || 70;
    const tbsa = parseFloat(inputs.tbsa) || 30;

    // Parkland Formula = 4 mL * Weight (kg) * % TBSA
    const total24h = 4 * weight * tbsa;
    const first8h = total24h / 2;
    const next16h = total24h / 2;

    const rateFirst8h = first8h / 8;
    const rateNext16h = next16h / 16;

    const targetUrine = `${(0.5 * weight).toFixed(0)} - ${(1.0 * weight).toFixed(0)} mL/hr`;

    return {
      primaryResult: {
        label: 'Total 24-Hour Parkland Fluid',
        value: `${this.formatNumber(total24h, 0)} mL`,
        subtext: `First 8 Hours: ${this.formatNumber(rateFirst8h, 0)} mL/hr • Next 16 Hours: ${this.formatNumber(rateNext16h, 0)} mL/hr`
      },
      stats: [
        { label: 'First 8 Hours Fluid (50%)', value: `${this.formatNumber(first8h, 0)} mL (${rateFirst8h.toFixed(0)} mL/hr)`, highlight: true },
        { label: 'Next 16 Hours Fluid (50%)', value: `${this.formatNumber(next16h, 0)} mL (${rateNext16h.toFixed(0)} mL/hr)` },
        { label: 'Fluid Type', value: "Lactated Ringer's (Crystalloid)" },
        { label: 'Urine Output Target', value: targetUrine }
      ],
      chartData: {
        type: 'donut',
        labels: ['First 8 Hours (50%)', 'Next 16 Hours (50%)'],
        values: [Math.round(first8h), Math.round(next16h)],
        colors: ['#3b82f6', '#10b981']
      }
    };
  },

  // 22. Nutrition & Macro Planner
  'nutrition-planner'(inputs) {
    const calories = parseFloat(inputs.dailyCalories) || 2200;
    const diet = inputs.dietType || 'balanced';
    const meals = parseInt(inputs.mealsCount, 10) || 3;

    let carbRatio = 0.50;
    let proteinRatio = 0.25;
    let fatRatio = 0.25;

    if (diet === 'high_protein') {
      carbRatio = 0.40; proteinRatio = 0.35; fatRatio = 0.25;
    } else if (diet === 'low_carb') {
      carbRatio = 0.25; proteinRatio = 0.35; fatRatio = 0.40;
    } else if (diet === 'keto') {
      carbRatio = 0.10; proteinRatio = 0.25; fatRatio = 0.65;
    }

    const carbCals = calories * carbRatio;
    const proteinCals = calories * proteinRatio;
    const fatCals = calories * fatRatio;

    const carbGrams = carbCals / 4;
    const proteinGrams = proteinCals / 4;
    const fatGrams = fatCals / 9;

    const perMealCals = calories / meals;
    const perMealProtein = proteinGrams / meals;
    const perMealCarbs = carbGrams / meals;
    const perMealFat = fatGrams / meals;

    return {
      primaryResult: {
        label: 'Daily Macronutrient Goal',
        value: `${proteinGrams.toFixed(0)}g Protein • ${carbGrams.toFixed(0)}g Carbs • ${fatGrams.toFixed(0)}g Fats`,
        subtext: `Total Energy: ${calories.toLocaleString()} kcal across ${meals} meals/day`
      },
      stats: [
        { label: 'Daily Protein Target', value: `${proteinGrams.toFixed(0)}g (${proteinCals.toFixed(0)} kcal)`, highlight: true },
        { label: 'Daily Carbohydrates', value: `${carbGrams.toFixed(0)}g (${carbCals.toFixed(0)} kcal)` },
        { label: 'Daily Healthy Fats', value: `${fatGrams.toFixed(0)}g (${fatCals.toFixed(0)} kcal)` },
        { label: 'Per Meal Target', value: `~${perMealCals.toFixed(0)} kcal (${perMealProtein.toFixed(0)}g P / ${perMealCarbs.toFixed(0)}g C / ${perMealFat.toFixed(0)}g F)` }
      ],
      chartData: {
        type: 'donut',
        labels: ['Carbohydrates', 'Protein', 'Healthy Fats'],
        values: [Math.round(carbCals), Math.round(proteinCals), Math.round(fatCals)],
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      }
    };
  },
};
