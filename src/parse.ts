import { round } from './round.js';
import { getScale } from './scale.js';
import type { ParseableNumber, RoundingFn } from './types.js';

/**
 * Parses a number-like value into a number
 * with given precision and rounding mode.
 * @note Will not coerce values to a number.
 * @example
 * ```
 * parseNumber('0.1') // => 0.1
 * parseNumber('1.5%', 2) // => 0.02
 * parseNumber('1.5%', 2, 'floor') // => 0.01
 * parseNumber(false) // => NaN
 * parseNumber(null) // => NaN
 * ```
 * @param numberLike - The number-like value to parse.
 * @param precision - The number of decimal places to keep.
 * @param mode - The rounding mode to use. Defaults to 'round'.
 * @returns The parsed number.
 */
export function parseNumber(
  numberLike: ParseableNumber,
  precision?: number,
  mode: RoundingFn = 'round',
): number {
  if (typeof numberLike === 'number') {
    return precision != null ? round(numberLike, precision, mode) : numberLike;
  }
  if (typeof numberLike === 'bigint') {
    const int = Number(numberLike);
    return precision != null ? round(int, precision, mode) : int;
  }
  if (typeof numberLike !== 'string') {
    return NaN;
  }
  const s = String(numberLike).trim();
  const c = s.endsWith('%');
  const n = Number(c ? s.slice(0, -1) : s);
  const p = precision ?? getScale(n) + (c ? 2 : 0);
  return round(c ? n / 100 : n, p, mode);
}
