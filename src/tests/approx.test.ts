import assert from 'node:assert';
import { describe, it } from 'node:test';

import { approxEqual, roundEqual } from '#src/approx.js';

describe('approxEqual function', () => {
  it('approximates value with given delta', () => {
    assert.strictEqual(approxEqual(0.34, 0.45, 0.1), false);
    assert.strictEqual(approxEqual(0.34, 0.44, 0.1), true);
    assert.strictEqual(approxEqual(0.4, 0.3, 0.1), true);
    assert.strictEqual(approxEqual(0.1 + 0.2, 0.3, 0.1), true);
  });

  it('works correctly if no delta provided assuming delta is 0', () => {
    assert.strictEqual(approxEqual(35.5, 35.55), false);
    assert.strictEqual(approxEqual(36.6, 36.6), true);
  });
});

describe('roundEqual function', () => {
  it('approximates values with given precision', () => {
    assert.strictEqual(roundEqual(0.34, 0.35, 1), false);
    assert.strictEqual(roundEqual(0.34, 0.25, 1), true);
    assert.strictEqual(roundEqual(0.4123, 0.4122, 3), true);
    assert.strictEqual(roundEqual(0.4123, 0.4122, 4), false);
  });

  it('works correctly if no precision provided assuming precision is 100', () => {
    assert.strictEqual(roundEqual(35.5, 35.55), false);
    assert.strictEqual(roundEqual(36.6, 36.6), true);
  });
});
