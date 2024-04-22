import { round } from './round.js';
import { getScale } from './scale.js';

/**
 * Checks if two numbers are approximately equal within a given delta.
 * @example
 * ```
 * 0.1 + 0.2 === 0.3 // => false
 * approxEqual(0.1 + 0.2, 0.3, 0.1) // => true
 * ```
 * @param a - The first number.
 * @param b - The second number.
 * @param delta - The maximum difference allowed between the two numbers. Defaults to 0.
 * @returns True if the two numbers are approximately equal, false otherwise.
 */
export function approxEqual(a: number, b: number, delta = 0): boolean {
  const p = Math.min(
    Math.max(-100, getScale(a), getScale(b), getScale(delta)),
    100,
  );
  return round(Math.abs(a - b), p) <= delta;
}

/**
 * Checks if two numbers are equal when rounded to a given precision
 * @note Round-half-up is used
 * @example
 * ```
 * 0.1 + 0.2 === 0.3 // => false
 * roundEqual(0.1 + 0.2, 0.3, 1) // => true
 * roundEqual(0.15, 0.14, 1) // => false
 * ```
 * @param a - The first number.
 * @param b - The second number.
 * @param precision - The precision the numbers will be rounded to before the comparison. Defaults to 100.
 * @returns True if the two numbers are equal after rounding, false otherwise.
 */
export function roundEqual(a: number, b: number, precision = 100): boolean {
  return round(a, precision) === round(b, precision);
}
