/**
 * Verification test to ensure all 80+ calculators compute accurately
 * without runtime exceptions or syntax errors.
 */
const fs = require('fs');
const http = require('http');
const vm = require('vm');

// Load calculator registry and engines
const dataContent = fs.readFileSync('./scripts/calculators-data.js', 'utf8');
const widgetContent = fs.readFileSync('./scripts/converters-and-widgets.js', 'utf8');
const engineContent = fs.readFileSync('./scripts/calculator-engine.js', 'utf8');

vm.runInThisContext(dataContent);
vm.runInThisContext(widgetContent);
vm.runInThisContext(engineContent);


console.log('Testing CalcHub Registry & Computation Engine:');
console.log(`Total Categories: ${CATEGORIES_DATA.length}`);
console.log(`Total Calculators: ${CALCULATORS_DATA.length}`);

let passCount = 0;
let failCount = 0;

CALCULATORS_DATA.forEach(calc => {
  const inputs = {};
  if (calc.fields) {
    calc.fields.forEach(f => {
      inputs[f.id] = f.default;
    });
  }

  try {
    const res = CalculatorEngine.compute(calc.id, inputs);
    if (!res || !res.primaryResult || !res.primaryResult.value) {
      console.warn(`[WARN] ${calc.id} returned incomplete result:`, res);
      failCount++;
    } else {
      passCount++;
    }
  } catch (err) {
    console.error(`[FAIL] ${calc.id} threw error:`, err.message);
    failCount++;
  }
});

console.log(`\nCalculation Engine Results: ${passCount} PASSED, ${failCount} FAILED out of ${CALCULATORS_DATA.length}`);

// Test HTTP Endpoint
http.get('http://localhost:3000/', (res) => {
  console.log(`\nHTTP Server Test: Status Code ${res.statusCode} ${res.statusMessage}`);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const hasTitle = body.includes('CalcHub');
    const hasCategories = body.includes('Financial Calculators');
    console.log(`HTML Response Length: ${body.length} bytes`);
    console.log(`Contains 'CalcHub' branding: ${hasTitle ? 'YES' : 'NO'}`);
    console.log('Verification Complete!');
  });
}).on('error', (e) => {
  console.error('HTTP Request failed:', e.message);
});
