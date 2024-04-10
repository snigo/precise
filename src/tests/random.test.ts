import assert from 'node:assert';
import { describe, it } from 'node:test';

import { random } from '#src/random.js';

describe('random function', () => {
  it('generates random number within a range', () => {
    const randomInt = random(80, 100, 0);
    const randomDecimal = random(0, 10, 2);
    assert.strictEqual(randomInt >= 80, true);
    assert.strictEqual(randomInt < 100, true);
    assert.strictEqual(randomInt % 1, 0);
    assert.strictEqual(randomDecimal >= 0, true);
    assert.strictEqual(randomDecimal < 10, true);
  });

  it('works with default values', () => {
    const randomNumber = random();
    assert.strictEqual(randomNumber >= 0, true);
    assert.strictEqual(randomNumber < 1, true);
  });
});
