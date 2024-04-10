import { round } from './round.js';

/**
 * Calculates scale of number, the number of digits
 * to the right of the decimal point
 * @example
 * ```
 * getScale(0.001) // => 3
 * getScale(1000) // => -3
 * getScale(0) // => 0
 * ```
 * @param num - The number to calculate the scale of.
 * @returns The scale of the number.
 */
export function getScale(num: number): number {
  const parts = num.toExponential().split('e');
  return Number(parts[0]?.split('.')[1]?.length ?? 0) - Number(parts[1]);
}

/**
 * Calculates the unit of the number, i.e. the smallest number
 * that can be represented by the number within it's precision.
 * @example
 * ```
 * getUnit(12.347) // => 0.001
 * getUnit(2000) // => 1000
 * getUnit(2024) // => 1
 * ```
 * @param num - The number to calculate the unit of.
 * @returns The unit of the number.
 */
export function getUnit(num: number): number {
  const scale = getScale(num);
  return round(10 ** -scale, scale);
}
