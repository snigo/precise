import assert from 'node:assert';
import { describe, it } from 'node:test';

import { parseNumber } from '#src/parse.js';

describe('parseNumber function', () => {
  it('correctly parses provided number to a certain precision', () => {
    assert.strictEqual(parseNumber('3.45e2'), 345);
    assert.strictEqual(parseNumber('3.45e2', -1), 350);
    assert.strictEqual(parseNumber(0.2 + 0.1, 1), 0.3);
    assert.strictEqual(parseNumber('13.359%', 4), 0.1336);
    assert.strictEqual(
      parseNumber(100000000000000000000 * 100000000000000000000),
      1e40,
    );
  });

  it('parses only parseable numbers', () => {
    // @ts-expect-error ts(2345)
    assert.strictEqual(parseNumber(undefined), NaN);
    // @ts-expect-error ts(2345)
    assert.strictEqual(parseNumber(null), NaN);
    // @ts-expect-error ts(2345)
    assert.strictEqual(parseNumber(false), NaN);
    // @ts-expect-error ts(2345)
    assert.strictEqual(parseNumber(true), NaN);
    // @ts-expect-error ts(2345)
    assert.strictEqual(parseNumber([1]), NaN);
  });

  it('handles bigints', () => {
    assert.strictEqual(parseNumber(333335n, -1), 333340);
    assert.strictEqual(parseNumber(-333335n, -1), -333330);
  });
});
