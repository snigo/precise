import assert from 'node:assert';
import { describe, it } from 'node:test';

import { round, floor, ceil } from '#src/round.js';

describe('round function', () => {
  it('correctly rounds provided number', () => {
    assert.strictEqual(round(0.45876453, 4), 0.4588);
    assert.strictEqual(round(12.45, 1), 12.5);
    assert.strictEqual(round(1250, -2), 1300);
    assert.strictEqual(round(-1250, -2), -1200);
    assert.strictEqual(round(45, -1), 50);
  });

  it('defauls precision to zero', () => {
    assert.strictEqual(round(0.45876453), 0);
    assert.strictEqual(round(12.45), 12);
    assert.strictEqual(round(-1250), -1250);
    assert.strictEqual(round(0.645), 1);
  });

  it('works with large numbers', () => {
    assert.strictEqual(round(Number.MAX_SAFE_INTEGER, -10), 9007200000000000);
    assert.strictEqual(round(Number.MIN_SAFE_INTEGER, -3), -9007199254741000);
  });

  it('correctly deals with decimal parts ending on 5', () => {
    assert.strictEqual(round(0.455555, 4), 0.4556);
    assert.strictEqual(round(12.4595, 3), 12.46);
    assert.strictEqual(round(1255, -1), 1260);
  });

  it('always returns unsigned zero', () => {
    assert.strictEqual(Object.is(round(-0.45, 0), -0), false);
    assert.strictEqual(Object.is(round(-0, 0), -0), false);
  });
});

describe('floor function', () => {
  it('correctly rounds provided number', () => {
    assert.strictEqual(floor(0.45876453, 4), 0.4587);
    assert.strictEqual(floor(12.45, 1), 12.4);
    assert.strictEqual(floor(1250, -2), 1200);
    assert.strictEqual(floor(-1250, -2), -1300);
    assert.strictEqual(floor(45, -1), 40);
  });

  it('defauls precision to zero', () => {
    assert.strictEqual(floor(0.45876453), 0);
    assert.strictEqual(floor(12.95), 12);
    assert.strictEqual(floor(-1250), -1250);
    assert.strictEqual(floor(0.645), 0);
  });

  it('works with large numbers', () => {
    assert.strictEqual(floor(Number.MAX_SAFE_INTEGER, -10), 9007190000000000);
    assert.strictEqual(floor(Number.MIN_SAFE_INTEGER, -3), -9007199254741000);
  });

  it('correctly deals with decimal parts ending on 5', () => {
    assert.strictEqual(floor(0.455555, 4), 0.4555);
    assert.strictEqual(floor(12.4595, 3), 12.459);
    assert.strictEqual(floor(1255, -1), 1250);
  });

  it('always returns unsigned zero', () => {
    assert.strictEqual(Object.is(floor(-0.45, 0), -0), false);
    assert.strictEqual(Object.is(floor(-0, 0), -0), false);
  });
});

describe('ceil function', () => {
  it('correctly rounds provided number', () => {
    assert.strictEqual(ceil(0.45876453, 4), 0.4588);
    assert.strictEqual(ceil(12.45, 1), 12.5);
    assert.strictEqual(ceil(1250, -2), 1300);
    assert.strictEqual(ceil(-1250, -2), -1200);
    assert.strictEqual(ceil(45, -1), 50);
  });

  it('defauls precision to zero', () => {
    assert.strictEqual(ceil(0.45876453), 1);
    assert.strictEqual(ceil(12.95), 13);
    assert.strictEqual(ceil(-1250), -1250);
    assert.strictEqual(ceil(0.645), 1);
  });

  it('works with large numbers', () => {
    assert.strictEqual(ceil(Number.MAX_SAFE_INTEGER, -10), 9007200000000000);
    assert.strictEqual(ceil(Number.MIN_SAFE_INTEGER, -3), -9007199254740000);
  });

  it('correctly deals with decimal parts ending on 5', () => {
    assert.strictEqual(ceil(0.455555, 4), 0.4556);
    assert.strictEqual(ceil(12.4595, 3), 12.46);
    assert.strictEqual(ceil(1255, -1), 1260);
  });

  it('always returns unsigned zero', () => {
    assert.strictEqual(Object.is(ceil(-0.45, 0), -0), false);
    assert.strictEqual(Object.is(ceil(-0, 0), -0), false);
  });
});
