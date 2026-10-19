/**
 * CalcHub - Unit Conversion Matrices & Interactive Specialized Widgets
 * Powers matrix unit converters, scientific calculator keypad, basic keypad,
 * live countdown timer, GPA dynamic table, and time zone engine.
 */

const UnitMatrices = {
  length: {
    base: 'meter',
    units: {
      meter: { name: 'Meters (m)', factor: 1 },
      kilometer: { name: 'Kilometers (km)', factor: 1000 },
      centimeter: { name: 'Centimeters (cm)', factor: 0.01 },
      millimeter: { name: 'Millimeters (mm)', factor: 0.001 },
      mile: { name: 'Miles (mi)', factor: 1609.344 },
      yard: { name: 'Yards (yd)', factor: 0.9144 },
      foot: { name: 'Feet (ft)', factor: 0.3048 },
      inch: { name: 'Inches (in)', factor: 0.0254 },
      nauticalMile: { name: 'Nautical Miles (NM)', factor: 1852 }
    }
  },
  weight: {
    base: 'kilogram',
    units: {
      kilogram: { name: 'Kilograms (kg)', factor: 1 },
      gram: { name: 'Grams (g)', factor: 0.001 },
      milligram: { name: 'Milligrams (mg)', factor: 0.000001 },
      metricTon: { name: 'Metric Tons (t)', factor: 1000 },
      pound: { name: 'Pounds (lbs)', factor: 0.45359237 },
      ounce: { name: 'Ounces (oz)', factor: 0.028349523 },
      stone: { name: 'Stones (st)', factor: 6.35029 },
      carat: { name: 'Carats (ct)', factor: 0.0002 }
    }
  },
  temperature: {
    // Custom formulas for temperature
    custom: true,
    units: {
      celsius: { name: 'Celsius (°C)' },
      fahrenheit: { name: 'Fahrenheit (°F)' },
      kelvin: { name: 'Kelvin (K)' }
    },
    convert(val, from, to) {
      let c = 0;
      if (from === 'celsius') c = val;
      else if (from === 'fahrenheit') c = (val - 32) * (5 / 9);
      else if (from === 'kelvin') c = val - 273.15;

      if (to === 'celsius') return c;
      if (to === 'fahrenheit') return (c * 9) / 5 + 32;
      if (to === 'kelvin') return c + 273.15;
      return c;
    }
  },
  area: {
    base: 'sqMeter',
    units: {
      sqMeter: { name: 'Square Meters (m²)', factor: 1 },
      sqKilometer: { name: 'Square Kilometers (km²)', factor: 1000000 },
      sqFoot: { name: 'Square Feet (ft²)', factor: 0.092903 },
      sqYard: { name: 'Square Yards (yd²)', factor: 0.836127 },
      acre: { name: 'Acres (ac)', factor: 4046.856422 },
      hectare: { name: 'Hectares (ha)', factor: 10000 },
      sqMile: { name: 'Square Miles (mi²)', factor: 2589988.11 }
    }
  },
  volume: {
    base: 'liter',
    units: {
      liter: { name: 'Liters (L)', factor: 1 },
      milliliter: { name: 'Milliliters (mL)', factor: 0.001 },
      cubicMeter: { name: 'Cubic Meters (m³)', factor: 1000 },
      gallonUS: { name: 'Gallons (US gal)', factor: 3.78541 },
      quartUS: { name: 'Quarts (US qt)', factor: 0.946353 },
      pintUS: { name: 'Pints (US pt)', factor: 0.473176 },
      cupUS: { name: 'Cups (US cup)', factor: 0.24 },
      fluidOunceUS: { name: 'Fluid Ounces (fl oz)', factor: 0.0295735 },
      cubicFoot: { name: 'Cubic Feet (ft³)', factor: 28.3168 }
    }
  },
  speed: {
    base: 'meterPerSec',
    units: {
      meterPerSec: { name: 'Meters / Sec (m/s)', factor: 1 },
      kmPerHour: { name: 'Kilometers / Hour (km/h)', factor: 0.277778 },
      milePerHour: { name: 'Miles / Hour (mph)', factor: 0.44704 },
      knot: { name: 'Knots (kn)', factor: 0.514444 },
      footPerSec: { name: 'Feet / Sec (ft/s)', factor: 0.3048 }
    }
  },
  time: {
    base: 'second',
    units: {
      second: { name: 'Seconds (s)', factor: 1 },
      minute: { name: 'Minutes (min)', factor: 60 },
      hour: { name: 'Hours (h)', factor: 3600 },
      day: { name: 'Days (d)', factor: 86400 },
      week: { name: 'Weeks (wk)', factor: 604800 },
      month: { name: 'Months (avg 30.4d)', factor: 2629746 },
      year: { name: 'Years (365d)', factor: 31536000 }
    }
  },
  data: {
    base: 'byte',
    units: {
      byte: { name: 'Bytes (B)', factor: 1 },
      kilobyte: { name: 'Kilobytes (KB - 1024)', factor: 1024 },
      megabyte: { name: 'Megabytes (MB - 1024)', factor: 1048576 },
      gigabyte: { name: 'Gigabytes (GB - 1024)', factor: 1073741824 },
      terabyte: { name: 'Terabytes (TB - 1024)', factor: 1099511627776 },
      petabyte: { name: 'Petabytes (PB - 1024)', factor: 1125899906842624 },
      kilobyteDec: { name: 'Kilobytes (KB - 1000)', factor: 1000 },
      megabyteDec: { name: 'Megabytes (MB - 1000)', factor: 1000000 },
      gigabyteDec: { name: 'Gigabytes (GB - 1000)', factor: 1000000000 },
      terabyteDec: { name: 'Terabytes (TB - 1000)', factor: 1000000000000 }
    }
  },
  energy: {
    base: 'joule',
    units: {
      joule: { name: 'Joules (J)', factor: 1 },
      kilojoule: { name: 'Kilojoules (kJ)', factor: 1000 },
      calorie: { name: 'Calories (cal)', factor: 4.184 },
      kilocalorie: { name: 'Food Calories (kcal)', factor: 4184 },
      wattHour: { name: 'Watt-Hours (Wh)', factor: 3600 },
      kwh: { name: 'Kilowatt-Hours (kWh)', factor: 3600000 },
      btu: { name: 'British Thermal Units (BTU)', factor: 1055.06 },
      footPound: { name: 'Foot-Pounds (ft-lbf)', factor: 1.35582 }
    }
  },
  pressure: {
    base: 'pascal',
    units: {
      pascal: { name: 'Pascals (Pa)', factor: 1 },
      kilopascal: { name: 'Kilopascals (kPa)', factor: 1000 },
      bar: { name: 'Bar (bar)', factor: 100000 },
      psi: { name: 'Pounds per Sq Inch (psi)', factor: 6894.76 },
      atmosphere: { name: 'Standard Atmospheres (atm)', factor: 101325 },
      torr: { name: 'Torr / mmHg', factor: 133.322 }
    }
  },
  power: {
    base: 'watt',
    units: {
      watt: { name: 'Watts (W)', factor: 1 },
      kilowatt: { name: 'Kilowatts (kW)', factor: 1000 },
      megawatt: { name: 'Megawatts (MW)', factor: 1000000 },
      horsepower: { name: 'Horsepower (Mechanical hp)', factor: 745.699872 },
      btuPerHour: { name: 'BTU / Hour', factor: 0.293071 }
    }
  },
  frequency: {
    base: 'hertz',
    units: {
      hertz: { name: 'Hertz (Hz)', factor: 1 },
      kilohertz: { name: 'Kilohertz (kHz)', factor: 1000 },
      megahertz: { name: 'Megahertz (MHz)', factor: 1000000 },
      gigahertz: { name: 'Gigahertz (GHz)', factor: 1000000000 },
      rpm: { name: 'Revolutions / Min (RPM)', factor: 0.0166667 }
    }
  },
  angle: {
    base: 'degree',
    units: {
      degree: { name: 'Degrees (°)', factor: 1 },
      radian: { name: 'Radians (rad)', factor: 57.2957795 },
      gradian: { name: 'Gradians (grad)', factor: 0.9 },
      arcminute: { name: 'Arcminutes (MOA)', factor: 0.0166667 },
      arcsecond: { name: 'Arcseconds', factor: 0.000277778 }
    }
  },
  fueleconomy: {
    custom: true,
    units: {
      mpgUS: { name: 'Miles per Gallon (US MPG)' },
      mpgUK: { name: 'Miles per Gallon (UK MPG)' },
      l100km: { name: 'Liters per 100km (L/100km)' },
      kmL: { name: 'Kilometers per Liter (km/L)' }
    },
    convert(val, from, to) {
      if (val <= 0) return 0;
      // Convert everything to km/L first
      let kmPerL = 0;
      if (from === 'mpgUS') kmPerL = val * 0.425144;
      else if (from === 'mpgUK') kmPerL = val * 0.354006;
      else if (from === 'l100km') kmPerL = 100 / val;
      else if (from === 'kmL') kmPerL = val;

      if (to === 'kmL') return kmPerL;
      if (to === 'mpgUS') return kmPerL / 0.425144;
      if (to === 'mpgUK') return kmPerL / 0.354006;
      if (to === 'l100km') return 100 / kmPerL;
      return kmPerL;
    }
  }
};

/**
 * Universal Unit Conversion Helper
 */
function convertUnit(value, category, fromUnit, toUnit) {
  const cat = UnitMatrices[category];
  if (!cat) return value;

  if (cat.custom) {
    return cat.convert(value, fromUnit, toUnit);
  }

  const fromFactor = cat.units[fromUnit]?.factor || 1;
  const toFactor = cat.units[toUnit]?.factor || 1;
  const baseValue = value * fromFactor;
  return baseValue / toFactor;
}

/**
 * Interactive Keypad Controllers
 */
const KeypadController = {
  // Basic Calculator State
  basic: {
    display: '0',
    equation: '',
    memory: 0,
    prevNumber: null,
    operation: null,
    shouldResetDisplay: false,
    historyTape: []
  },

  handleBasic(btn) {
    const s = this.basic;

    if (btn >= '0' && btn <= '9') {
      if (s.display === '0' || s.shouldResetDisplay) {
        s.display = btn;
        s.shouldResetDisplay = false;
      } else {
        if (s.display.replace('-', '').replace('.', '').length < 16) {
          s.display += btn;
        }
      }
    } else if (btn === '.') {
      if (s.shouldResetDisplay) {
        s.display = '0.';
        s.shouldResetDisplay = false;
      } else if (!s.display.includes('.')) {
        s.display += '.';
      }
    } else if (btn === 'C') {
      s.display = '0';
      s.equation = '';
      s.prevNumber = null;
      s.operation = null;
      s.shouldResetDisplay = false;
    } else if (btn === 'CE') {
      s.display = '0';
      s.shouldResetDisplay = false;
    } else if (btn === 'backspace') {
      if (s.shouldResetDisplay) {
        // Keep display after equals/operator
      } else if (s.display.length > 1 && !(s.display.length === 2 && s.display.startsWith('-'))) {
        s.display = s.display.slice(0, -1);
      } else {
        s.display = '0';
      }
    } else if (btn === '+/-') {
      if (s.display !== '0' && s.display !== 'Error') {
        if (s.display.startsWith('-')) {
          s.display = s.display.slice(1);
        } else {
          s.display = '-' + s.display;
        }
      }
    } else if (btn === '%') {
      if (s.display !== 'Error') {
        const val = parseFloat(s.display) / 100;
        s.display = String(Number(val.toFixed(10)));
      }
    } else if (['+', '-', '*', '/'].includes(btn)) {
      const symbol = btn === '*' ? '×' : (btn === '/' ? '÷' : btn);
      if (s.operation && s.prevNumber !== null && !s.shouldResetDisplay) {
        const cur = parseFloat(s.display);
        let res = 0;
        if (s.operation === '+') res = s.prevNumber + cur;
        else if (s.operation === '-') res = s.prevNumber - cur;
        else if (s.operation === '*') res = s.prevNumber * cur;
        else if (s.operation === '/') res = cur !== 0 ? s.prevNumber / cur : 'Error';

        if (res === 'Error') {
          s.display = 'Error';
          s.equation = '';
          s.prevNumber = null;
          s.operation = null;
          s.shouldResetDisplay = true;
          return { display: s.display, equation: s.equation, history: s.historyTape };
        } else {
          const cleanNum = Number(parseFloat(res).toFixed(10));
          s.display = String(cleanNum);
          s.prevNumber = cleanNum;
        }
      } else {
        s.prevNumber = parseFloat(s.display);
      }
      s.operation = btn;
      s.equation = `${s.display} ${symbol}`;
      s.shouldResetDisplay = true;
    } else if (btn === '=') {
      if (s.operation && s.prevNumber !== null) {
        const cur = parseFloat(s.display);
        let res = 0;
        if (s.operation === '+') res = s.prevNumber + cur;
        else if (s.operation === '-') res = s.prevNumber - cur;
        else if (s.operation === '*') res = s.prevNumber * cur;
        else if (s.operation === '/') res = cur !== 0 ? s.prevNumber / cur : 'Error';

        let formattedRes = res === 'Error' ? 'Error' : String(Number(parseFloat(res).toFixed(10)));
        const record = `${s.equation} ${cur} = ${formattedRes}`;
        s.historyTape.unshift(record);
        if (s.historyTape.length > 20) s.historyTape.pop();

        s.display = formattedRes;
        s.equation = '';
        s.prevNumber = null;
        s.operation = null;
        s.shouldResetDisplay = true;
      }
    }

    return {
      display: s.display,
      equation: s.equation,
      history: s.historyTape
    };
  },

  // Scientific Calculator State
  scientific: {
    expression: '',
    result: '0',
    angleMode: 'deg', // or 'rad'
    historyTape: [],
    shouldResetOnNextDigit: false
  },

  evaluateScientificExpression(rawExpr, angleMode = 'deg') {
    if (!rawExpr || !rawExpr.trim()) return '0';

    // 1. Sanitize & Normalize tokens
    let str = rawExpr.trim()
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    // Handle postfix percentage (e.g. 50% -> (50/100)), while preserving binary modulo (e.g. 10 % 3)
    str = str.replace(/(\d+(?:\.\d+)?)%(?=\s*(?:[+\-*\/^)]|$))/g, '($1/100)');

    // Auto close unclosed parentheses
    let openParen = 0;
    for (const ch of str) {
      if (ch === '(') openParen++;
      if (ch === ')') openParen--;
    }
    while (openParen > 0) {
      str += ')';
      openParen--;
    }

    // 2. Tokenize
    const tokens = [];
    let i = 0;
    while (i < str.length) {
      const ch = str[i];
      if (/\s/.test(ch)) { i++; continue; }

      // Numbers (including decimals)
      if (/\d/.test(ch) || (ch === '.' && /\d/.test(str[i + 1] || ''))) {
        let numStr = '';
        while (i < str.length && (/\d|\./.test(str[i]))) {
          numStr += str[i++];
        }
        tokens.push({ type: 'NUM', val: parseFloat(numStr) });
        continue;
      }

      // Identifiers (functions and constants: sin, cos, tan, asin, acos, atan, log, ln, sqrt, pi, e)
      if (/[a-zA-Zπ]/.test(ch)) {
        let idStr = '';
        while (i < str.length && /[a-zA-Zπ]/.test(str[i])) {
          idStr += str[i++];
        }
        if (idStr === 'π' || idStr.toLowerCase() === 'pi') {
          tokens.push({ type: 'NUM', val: Math.PI });
        } else if (idStr === 'e') {
          tokens.push({ type: 'NUM', val: Math.E });
        } else {
          tokens.push({ type: 'FN', val: idStr.toLowerCase() });
        }
        continue;
      }

      // Operators and delimiters
      if ('+-*/%^()'.includes(ch)) {
        tokens.push({ type: ch, val: ch });
        i++;
        continue;
      }

      throw new Error(`Unexpected character: ${ch}`);
    }

    // 3. Insert implicit multiplication
    // e.g., NUM '(' -> NUM * '(', NUM FN -> NUM * FN, ')' '(' -> ')' * '(', ')' FN -> ')' * FN, ')' NUM -> ')' * NUM
    const normalizedTokens = [];
    for (let k = 0; k < tokens.length; k++) {
      const cur = tokens[k];
      const prev = k > 0 ? tokens[k - 1] : null;

      if (prev) {
        const prevCanMultiply = prev.type === 'NUM' || prev.type === ')';
        const curCanBeMultiplied = cur.type === 'NUM' || cur.type === 'FN' || cur.type === '(';
        if (prevCanMultiply && curCanBeMultiplied) {
          normalizedTokens.push({ type: '*', val: '*' });
        }
      }
      normalizedTokens.push(cur);
    }

    // 4. Recursive descent parser
    let pos = 0;
    const peek = () => normalizedTokens[pos] || { type: 'EOF' };
    const consume = (expectedType) => {
      const t = peek();
      if (expectedType && t.type !== expectedType) {
        throw new Error(`Expected ${expectedType} but found ${t.type}`);
      }
      pos++;
      return t;
    };

    // Expression = Term ( ('+' | '-') Term )*
    function parseExpression() {
      let left = parseTerm();
      while (peek().type === '+' || peek().type === '-') {
        const op = consume().type;
        const right = parseTerm();
        if (op === '+') left += right;
        else left -= right;
      }
      return left;
    }

    // Term = Power ( ('*' | '/' | '%') Power )*
    function parseTerm() {
      let left = parsePower();
      while (peek().type === '*' || peek().type === '/' || peek().type === '%') {
        const op = consume().type;
        const right = parsePower();
        if (op === '*') left *= right;
        else if (op === '/') {
          if (right === 0) throw new Error('Cannot divide by zero');
          left /= right;
        } else if (op === '%') {
          left = left % right;
        }
      }
      return left;
    }

    // Power = Factor ( '^' Power )?   (Right associative)
    function parsePower() {
      let left = parseFactor();
      if (peek().type === '^') {
        consume('^');
        const right = parsePower();
        left = Math.pow(left, right);
      }
      return left;
    }

    // Factor = ('+' | '-')* ( NUM | '(' Expression ')' | FN '(' Expression ')' | FN Factor )
    function parseFactor() {
      // Unary plus/minus
      if (peek().type === '+') {
        consume('+');
        return parseFactor();
      }
      if (peek().type === '-') {
        consume('-');
        return -parseFactor();
      }

      const t = peek();
      if (t.type === 'NUM') {
        consume('NUM');
        return t.val;
      }

      if (t.type === '(') {
        consume('(');
        const val = parseExpression();
        if (peek().type === ')') consume(')');
        return val;
      }

      if (t.type === 'FN') {
        const fnName = consume('FN').val;
        let arg;
        if (peek().type === '(') {
          consume('(');
          arg = parseExpression();
          if (peek().type === ')') consume(')');
        } else {
          arg = parseFactor();
        }

        const trigArg = (angleMode === 'deg') ? (arg * (Math.PI / 180)) : arg;

        switch (fnName) {
          case 'sin': {
            if (angleMode === 'deg') {
              const normalized = ((arg % 360) + 360) % 360;
              if (normalized === 0 || normalized === 180) return 0;
              if (normalized === 30 || normalized === 150) return 0.5;
              if (normalized === 210 || normalized === 330) return -0.5;
              if (normalized === 90) return 1;
              if (normalized === 270) return -1;
            }
            return Math.sin(trigArg);
          }
          case 'cos': {
            if (angleMode === 'deg') {
              const normalized = ((arg % 360) + 360) % 360;
              if (normalized === 90 || normalized === 270) return 0;
              if (normalized === 60 || normalized === 300) return 0.5;
              if (normalized === 120 || normalized === 240) return -0.5;
              if (normalized === 0) return 1;
              if (normalized === 180) return -1;
            }
            return Math.cos(trigArg);
          }
          case 'tan': {
            if (angleMode === 'deg') {
              const normalized = ((arg % 360) + 360) % 360;
              if (normalized === 90 || normalized === 270) throw new Error('Tangent undefined');
              if (normalized === 0 || normalized === 180) return 0;
              if (normalized === 45 || normalized === 225) return 1;
              if (normalized === 135 || normalized === 315) return -1;
            }
            return Math.tan(trigArg);
          }
          case 'asin': {
            if (arg < -1 || arg > 1) throw new Error('Domain error');
            const r = Math.asin(arg);
            return angleMode === 'deg' ? r * (180 / Math.PI) : r;
          }
          case 'acos': {
            if (arg < -1 || arg > 1) throw new Error('Domain error');
            const r = Math.acos(arg);
            return angleMode === 'deg' ? r * (180 / Math.PI) : r;
          }
          case 'atan': {
            const r = Math.atan(arg);
            return angleMode === 'deg' ? r * (180 / Math.PI) : r;
          }
          case 'log': {
            if (arg <= 0) throw new Error('Log undefined for <= 0');
            return Math.log10(arg);
          }
          case 'ln': {
            if (arg <= 0) throw new Error('Ln undefined for <= 0');
            return Math.log(arg);
          }
          case 'sqrt': {
            if (arg < 0) throw new Error('Cannot take square root of negative');
            return Math.sqrt(arg);
          }
          default:
            throw new Error(`Unknown function: ${fnName}`);
        }
      }

      throw new Error(`Unexpected token: ${t.type} (${t.val || ''})`);
    }

    const result = parseExpression();
    if (pos < normalizedTokens.length) {
      throw new Error(`Unexpected token at end: ${normalizedTokens[pos].type}`);
    }

    if (!Number.isFinite(result) || Number.isNaN(result)) {
      throw new Error('Calculation error');
    }

    if (Number.isInteger(result)) {
      return result.toString();
    }
    return parseFloat(result.toFixed(10)).toString();
  },

  handleScientific(action) {
    const sc = this.scientific;

    if (action === 'AC') {
      sc.expression = '';
      sc.result = '0';
      sc.shouldResetOnNextDigit = false;
    } else if (action === 'DEL') {
      if (sc.shouldResetOnNextDigit) {
        sc.expression = '';
        sc.result = '0';
        sc.shouldResetOnNextDigit = false;
      } else {
        const fnMatch = sc.expression.match(/(asin|acos|atan|sqrt|sin|cos|tan|log|ln)\($/);
        if (fnMatch) {
          sc.expression = sc.expression.slice(0, -fnMatch[0].length);
        } else {
          sc.expression = sc.expression.slice(0, -1);
        }
        if (!sc.expression) sc.result = '0';
      }
    } else if (action === 'TOGGLE_DEG_RAD') {
      sc.angleMode = sc.angleMode === 'deg' ? 'rad' : 'deg';
    } else if (action === '=') {
      if (!sc.expression.trim()) return sc;
      try {
        const evalResult = this.evaluateScientificExpression(sc.expression, sc.angleMode);
        sc.result = evalResult;
        sc.historyTape.unshift(`${sc.expression} = ${sc.result}`);
        if (sc.historyTape.length > 20) sc.historyTape.pop();
        sc.shouldResetOnNextDigit = true;
      } catch (err) {
        const msg = err.message || 'Syntax Error';
        if (msg.includes('divide by zero')) sc.result = 'Cannot divide by 0';
        else if (msg.includes('negative') || msg.includes('Domain') || msg.includes('undefined')) sc.result = msg;
        else sc.result = 'Syntax Error';
        sc.shouldResetOnNextDigit = true;
      }
    } else if (['+', '-', '*', '/', '^', '%'].includes(action)) {
      if (sc.shouldResetOnNextDigit) {
        if (sc.result !== 'Syntax Error' && !sc.result.includes('Cannot') && !sc.result.includes('Error')) {
          sc.expression = sc.result + action;
        } else {
          sc.expression = action;
        }
        sc.result = '0';
        sc.shouldResetOnNextDigit = false;
      } else {
        sc.expression += action;
      }
    } else {
      if (sc.shouldResetOnNextDigit) {
        sc.expression = action;
        sc.result = '0';
        sc.shouldResetOnNextDigit = false;
      } else {
        sc.expression += action;
      }
    }

    return {
      expression: sc.expression,
      result: sc.result,
      angleMode: sc.angleMode,
      history: sc.historyTape,
      isEvaluated: sc.shouldResetOnNextDigit && action === '='
    };
  }
};
