import assert from 'node:assert';
import { describe, it } from 'node:test';

import {
  add,
  ArithmeticError,
  avg,
  divide,
  mod,
  multiply,
  subtract,
  sum,
} from '#src/op.js';

describe('add function', () => {
  it('adds numbers', () => {
    assert.strictEqual(add(0.1, 0.2), 0.3);
    assert.strictEqual(add(2, 2), 4);
  });

  it('adds bigint numbers', () => {
    assert.strictEqual(add(256n, 256n), 512);
    assert.strictEqual(add(256n, -256n), 0);
  });

  it('adds string numbers', () => {
    assert.strictEqual(add('0.1', '0.2'), 0.3);
    assert.strictEqual(add('.1', '.20'), 0.3);
    assert.strictEqual(add('2', '2'), 4);
    assert.strictEqual(add('3.45e-34', '45.542e32'), 4.5542e33);
    assert.strictEqual(add('  2  ', '  22  '), 24);
  });

  it('adds mixed type numbers', () => {
    assert.strictEqual(add('0.1', 0.2), 0.3);
    assert.strictEqual(add(0.1, '.20'), 0.3);
    assert.strictEqual(add('2', 2n), 4);
    assert.strictEqual(add('3.45e-34', 45.542e32), 4.5542e33);
    assert.strictEqual(add(2, 22n), 24);
  });

  it('supports percentage notation', () => {
    assert.strictEqual(add('100%', 1), 2);
    assert.strictEqual(add(4, '50%'), 6);
  });
});

describe('avg operator', () => {
  it('gets average of provided numbers', () => {
    assert.strictEqual(avg([11, 13, -2, 0]), 5.5);
    assert.strictEqual(avg([-1]), -1);
    assert.strictEqual(avg([]), 0);
  });

  it('supports mixed types', () => {
    assert.strictEqual(avg(['12', 3, 15n]), 10);
    assert.strictEqual(avg(['12', NaN, 15n]), NaN);
    assert.strictEqual(avg(['12', Infinity, 15n]), Infinity);
  });
});

describe('divide operator', () => {
  it('divides numbers', () => {
    assert.strictEqual(divide(4, 2), 2);
    assert.strictEqual(divide(4, 0.2), 20);
  });

  it('allows to pass precision of digits after floating point', () => {
    assert.strictEqual(divide(1, 3), 0.3333333333333333);
    assert.strictEqual(divide(1, 3, 4), 0.3333);
    assert.strictEqual(divide(1, 3, 1), 0.3);
    assert.strictEqual(divide(1000, 3, -1), 330);
  });

  it('divides bigint numbers', () => {
    assert.strictEqual(divide(256n, 2n), 128);
    assert.strictEqual(divide(256n, -2n), -128);
  });

  it('divides string numbers', () => {
    assert.strictEqual(divide('4', '2'), 2);
    assert.strictEqual(divide('4', '.20'), 20);
    assert.strictEqual(divide('2', '2'), 1);
    assert.strictEqual(divide('3.45e34', '45.542e32', 4), 7.5754);
    assert.strictEqual(divide('  2  ', '  22  ', 2), 0.09);
  });

  it('divides mixed type numbers', () => {
    assert.strictEqual(divide('4', 0.2), 20);
    assert.strictEqual(divide(5.2, '.20'), 26);
    assert.strictEqual(divide('2', 2n), 1);
    assert.strictEqual(divide('3.45e34', 45.542e32, 4), 7.5754);
    assert.strictEqual(divide(2, 22n, 1), 0.1);
  });

  it('supports percentage notation', () => {
    assert.strictEqual(divide('44%', '4%'), 11);
    assert.strictEqual(divide(44, '44%'), 100);
    assert.strictEqual(divide('44%', 4n), 0.11);
  });

  it('allows to divide by 0 if non strict flag is passed', () => {
    assert.strictEqual(divide(1, 0, 0, false), Infinity);
  });

  it('throws an error by default when divided by 0', () => {
    assert.throws(() => divide(1, 0), ArithmeticError);
  });
});

describe('mod operator', () => {
  it('calculates modulo value for positive and negative numbers', () => {
    assert.strictEqual(mod(11, 3), 2);
    assert.strictEqual(mod(-1, 3), 2);
    assert.strictEqual(mod(1, -45), -44);
  });

  it('returns NaN if arguments are invalid', () => {
    assert.strictEqual(mod(1, 0), NaN);
    assert.strictEqual(mod(1, Infinity), NaN);
    assert.strictEqual(mod(1, NaN), NaN);
  });
});

describe('multiply operator', () => {
  it('multiplies numbers', () => {
    assert.strictEqual(multiply(0.2, 0.2), 0.04);
    assert.strictEqual(multiply(2, 2), 4);
  });

  it('multiplies bigint numbers', () => {
    assert.strictEqual(multiply(256n, 256n), 65536);
    assert.strictEqual(multiply(256n, -256n), -65536);
  });

  it('multiplies string numbers', () => {
    assert.strictEqual(multiply('0.2', '0.2'), 0.04);
    assert.strictEqual(multiply('.2', '.20'), 0.04);
    assert.strictEqual(multiply('2', '2'), 4);
    assert.strictEqual(multiply('3.45e-34', '45.542e32'), 1.571199);
    assert.strictEqual(multiply('  2  ', '  22  '), 44);
  });

  it('multiplies mixed type numbers', () => {
    assert.strictEqual(multiply('0.2', 0.2), 0.04);
    assert.strictEqual(multiply(0.2, '.20'), 0.04);
    assert.strictEqual(multiply('2', 2n), 4);
    assert.strictEqual(multiply('3.45e-34', 45.542e32), 1.571199);
    assert.strictEqual(multiply(2, 22n), 44);
  });

  it('supports percentage notation', () => {
    assert.strictEqual(multiply('4%', '44%'), 0.0176);
    assert.strictEqual(multiply(4, '44%'), 1.76);
  });
});

describe('subtract operator', () => {
  it('subtracts numbers', () => {
    assert.strictEqual(subtract(0.3, 0.2), 0.1);
    assert.strictEqual(subtract(4, 2), 2);
  });

  it('subtracts bigint numbers', () => {
    assert.strictEqual(subtract(256n, 128n), 128);
    assert.strictEqual(subtract(256n, -256n), 512);
  });

  it('subtracts string numbers', () => {
    assert.strictEqual(subtract('0.3', '0.2'), 0.1);
    assert.strictEqual(subtract('.3', '.20'), 0.1);
    assert.strictEqual(subtract('4', '2'), 2);
    assert.strictEqual(subtract('3.45e34', '45.542e32'), 2.99458e34);
    assert.strictEqual(subtract('  2  ', '  22  '), -20);
  });

  it('subtracts mixed type numbers', () => {
    assert.strictEqual(subtract('0.3', 0.2), 0.1);
    assert.strictEqual(subtract(0.3, '.20'), 0.1);
    assert.strictEqual(subtract('4', 2n), 2);
    assert.strictEqual(subtract('3.45e34', 45.542e32), 2.99458e34);
    assert.strictEqual(subtract(2, 22n), -20);
  });

  it('supports percentage notation', () => {
    assert.strictEqual(subtract('200%', 1), 1);
    assert.strictEqual(subtract(4, '50%'), 2);
  });
});

describe('sum operator', () => {
  it('gets sum of provided numbers', () => {
    assert.strictEqual(sum([11, 13, -2, 0]), 22);
    assert.strictEqual(sum([-1]), -1);
    assert.strictEqual(sum([]), 0);
  });

  it('supports mixed types', () => {
    assert.strictEqual(sum(['12', 3, 15n]), 30);
    assert.strictEqual(sum(['12', NaN, 15n]), NaN);
    assert.strictEqual(sum(['12', Infinity, 15n]), Infinity);
  });
});
