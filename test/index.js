const test = require('tape');
const mod = require('../');

test('should perform scalar multiplication', (t) => {
  t.equals(typeof mod, 'object', 'exports is an object');
  t.equals(typeof mod.default, 'function', 'exports.default is a function');
  t.equals(
    typeof mod.scalarMultiply,
    'function',
    'exports.scalarMultiply is a function',
  );
  t.equals(mod.__esModule, true, 'exports.__esModule is true');
  t.end();
});
