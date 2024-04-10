import assert from 'node:assert';
import { describe, it } from 'node:test';

import { approxEqual } from '#src/approx.js';

describe('approxEqual function', () => {
  it('approximates value with given delta', () => {
    assert.strictEqual(approxEqual(0.34, 0.45, 0.1), false);
    assert.strictEqual(approxEqual(0.34, 0.44, 0.1), true);
    assert.strictEqual(approxEqual(0.4, 0.3, 0.1), true);
  });

  it('works correctly if no delta provided assuming delta is 0', () => {
    assert.strictEqual(approxEqual(35.5, 35.55), false);
    assert.strictEqual(approxEqual(36.6, 36.6), true);
  });
});
