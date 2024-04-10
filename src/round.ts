import type { RoundingFn } from './types.js';

function _assertPrecision(precision: number) {
  if (precision < -100 || precision > 100) {
    throw RangeError('Precision value should be in -100..100 range.');
  }
}

function _unsignZero(num: number): number {
  return num === 0 ? 0 : num;
}

function _shiftExp(num: number, shift: number) {
  const parts: (string | number)[] = num.toExponential().split('e');
  parts[1] = Number(parts[1]) + shift;
  return Number(parts.join('e'));
}

/**
 * Rounds number to a certain precision
 * @note Negative precision will work as well
 * @example
 * ```
 * round(1.234, 2) // => 1.23
 * round(1.234, 2, 'ceil') // => 1.24
 * round(1234, -2) // => 1200
 * ```
 * @param num - The number to round.
 * @param precision - The number of decimal places to keep. Defaults to 0.
 * @param mode - The rounding mode to use. Defaults to 'round'.
 * @returns The rounded number.
 */
export function round(
  num: number,
  precision = 0,
  mode: RoundingFn = 'round',
): number {
  _assertPrecision(precision);
  const fn = Math[mode];
  if (!precision) {
    return _unsignZero(fn(num));
  }
  const p = Math.floor(precision);
  const w = fn(_shiftExp(num, p));
  return _unsignZero(_shiftExp(w, -p));
}

/**
 * Rounds number to a certain precision towards Infinity
 * @note Negative precision will work as well
 * @example
 * ```
 * ceil(1.234, 2) // => 1.24
 * ceil(1234, -2) => 1300
 * ```
 * @param num - The number to round.
 * @param precision - The number of decimal places to keep. Defaults to 0.
 * @returns The rounded number.
 */
export function ceil(num: number, precision = 0): number {
  return round(num, precision, 'ceil');
}

/**
 * Rounds number to a certain precision towards -Infinity
 * @note Negative precision will work as well
 * @example
 * ```
 * floor(1.234, 2) // => 1.23
 * floor(1234, -2) => 1200
 * ```
 * @param num - The number to round.
 * @param precision - The number of decimal places to keep. Defaults to 0.
 * @returns The rounded number.
 */
export function floor(num: number, precision = 0): number {
  return round(num, precision, 'floor');
}
