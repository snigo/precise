import assert from 'node:assert';
import { describe, it } from 'node:test';

import { getScale, getUnit } from '#src/scale.js';

describe('getScale function', () => {
  it('calculates scale of a number', () => {
    assert.strictEqual(getScale(0.001), 3);
    assert.strictEqual(getScale(1000), -3);
    assert.strictEqual(getScale(0), 0);
    assert.strictEqual(getScale(2024), 0);
  });

  it('accounts for NaN and infinite values', () => {
    assert.strictEqual(getScale(NaN), NaN);
    assert.strictEqual(getScale(-Infinity), NaN);
    assert.strictEqual(getScale(Infinity), NaN);
  });
});

describe('getUnit function', () => {
  it('calculates the unit of a number', () => {
    assert.strictEqual(getUnit(12.347), 0.001);
    assert.strictEqual(getUnit(2000), 1000);
    assert.strictEqual(getUnit(0), 1);
    assert.strictEqual(getUnit(2024), 1);
  });

  it('accounts for NaN and infinite values', () => {
    assert.strictEqual(getUnit(NaN), NaN);
    assert.strictEqual(getUnit(-Infinity), NaN);
    assert.strictEqual(getUnit(Infinity), NaN);
  });
});
