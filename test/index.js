const test = require('tape');
const mod = require('../');

test('should have the correct module shape', (t) => {
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

test('should perform scalar multiplication', (t) => {
  const point = new Uint8Array([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xde, 0xad, 0xbe, 0xef,
    0xde, 0xad, 0xbe, 0xef, 0xde, 0xad, 0xbe, 0xef,
  ]);

  const scalar = new Uint8Array([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x8a, 0x91, 0x57, 0xcc, 0x50, 0x12, 0xde, 0x59, 0x15, 0x68, 0x08,
    0x0f, 0xf8, 0x10, 0x81, 0x02, 0xdd, 0xef, 0xa9,
  ]);

  const expected = new Uint8Array([
    0xdb, 0x93, 0xe6, 0x8c, 0x1b, 0xa1, 0x21, 0x28, 0x8d, 0x9a, 0xe8, 0x6d,
    0x10, 0x3f, 0x8a, 0xb3, 0xa1, 0x54, 0x52, 0x1f, 0x8c, 0xe9, 0xdd, 0x34,
    0xc5, 0x02, 0xfc, 0x00, 0x15, 0xf9, 0x0f, 0xa2,
  ]);

  const actual = mod.scalarMultiply(point, scalar);
  t.deepEquals(actual, expected, 'should return the correct result');

  t.end();
});
