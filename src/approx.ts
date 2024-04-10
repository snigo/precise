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
