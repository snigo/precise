import { round } from './round.js';

/**
 * Generates random number within range with certain precision
 * @example
 * ```
 * random() // => 0.1234567890123457
 * random(1, 10, 2) // => 7.12
 * ```
 * @param min - The minimum value of the range. Defaults to 0.
 * @param max - The maximum value of the range. Defaults to 1.
 * @param precision - The number of decimal places to keep. Defaults to 16.
 * @returns The random number.
 */
export function random(min = 0, max = 1, precision = 16): number {
  return round(min + Math.random() * (max - min), precision);
}
