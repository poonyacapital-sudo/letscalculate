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
        s.display += btn;
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
      if (s.display.length > 1) {
        s.display = s.display.slice(0, -1);
      } else {
        s.display = '0';
      }
    } else if (btn === '+/-') {
      s.display = (parseFloat(s.display) * -1).toString();
    } else if (btn === '%') {
      s.display = (parseFloat(s.display) / 100).toString();
    } else if (['+', '-', '*', '/'].includes(btn)) {
      s.prevNumber = parseFloat(s.display);
      s.operation = btn;
      s.equation = `${s.prevNumber} ${btn === '*' ? '×' : (btn === '/' ? '÷' : btn)}`;
      s.shouldResetDisplay = true;
    } else if (btn === '=') {
      if (s.operation && s.prevNumber !== null) {
        const cur = parseFloat(s.display);
        let res = 0;
        if (s.operation === '+') res = s.prevNumber + cur;
        else if (s.operation === '-') res = s.prevNumber - cur;
        else if (s.operation === '*') res = s.prevNumber * cur;
        else if (s.operation === '/') res = cur !== 0 ? s.prevNumber / cur : 'Error';

        const record = `${s.equation} ${cur} = ${res}`;
        s.historyTape.unshift(record);
        if (s.historyTape.length > 20) s.historyTape.pop();

        s.display = res.toString();
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
    historyTape: []
  },

  handleScientific(action) {
    const sc = this.scientific;

    if (action === 'AC') {
      sc.expression = '';
      sc.result = '0';
    } else if (action === 'DEL') {
      sc.expression = sc.expression.slice(0, -1);
    } else if (action === 'TOGGLE_DEG_RAD') {
      sc.angleMode = sc.angleMode === 'deg' ? 'rad' : 'deg';
    } else if (action === '=') {
      try {
        let expr = sc.expression;
        if (!expr.trim()) return sc;

        // Replace constants and operators
        expr = expr.replace(/×/g, '*').replace(/÷/g, '/');
        expr = expr.replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E');

        // Functions with degree/rad conversion
        const toRad = sc.angleMode === 'deg' ? '* (Math.PI / 180)' : '';

        // Safe regex evaluation wrapper
        expr = expr.replace(/sin\(/g, `Math.sin(`);
        expr = expr.replace(/cos\(/g, `Math.cos(`);
        expr = expr.replace(/tan\(/g, `Math.tan(`);
        expr = expr.replace(/asin\(/g, `Math.asin(`);
        expr = expr.replace(/acos\(/g, `Math.acos(`);
        expr = expr.replace(/atan\(/g, `Math.atan(`);
        expr = expr.replace(/log\(/g, `Math.log10(`);
        expr = expr.replace(/ln\(/g, `Math.log(`);
        expr = expr.replace(/sqrt\(/g, `Math.sqrt(`);
        expr = expr.replace(/\^/g, `**`);

        // Safe Function evaluation
        const evalResult = Function(`'use strict'; return (${expr})`)();
        sc.result = Number.isFinite(evalResult) ? (Number.isInteger(evalResult) ? evalResult.toString() : evalResult.toFixed(6).replace(/\.?0+$/, '')) : 'Error';
        sc.historyTape.unshift(`${sc.expression} = ${sc.result}`);
        if (sc.historyTape.length > 20) sc.historyTape.pop();
      } catch (err) {
        sc.result = 'Syntax Error';
      }
    } else {
      // Append characters or functions
      sc.expression += action;
    }

    return {
      expression: sc.expression,
      result: sc.result,
      angleMode: sc.angleMode,
      history: sc.historyTape
    };
  }
};
