import { parseNumber } from './parse.js';
import { round } from './round.js';
import { getScale } from './scale.js';
import type { ParseableNumber } from './types.js';

/**
 * An error class for arithmetic errors.
 */
export class ArithmeticError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArithmeticError';
  }
}

/**
 * Multiplies two parseable numbers.
 * @example
 * ```
 * 0.2 * 0.2 // => 0.04000000000000001
 * multiply(0.2, 0.2) // => 0.04
 * ```
 * @param a - The first parseable number.
 * @param b - The second parseable number.
 * @returns The product of the two numbers.
 */
export function multiply(a: ParseableNumber, b: ParseableNumber): number {
  const o1 = parseNumber(a);
  if (Number.isNaN(o1) || !Number.isFinite(o1)) return o1;
  const o2 = parseNumber(b);
  if (Number.isNaN(o2) || !Number.isFinite(o2)) return o2;
  const p = Math.min(Math.max(-100, getScale(o1) + getScale(o2)), 100);
  return round(o1 * o2, p);
}

function _parseRelativeOperands(
  a: ParseableNumber,
  b: ParseableNumber,
): [number, number] {
  const o1 = parseNumber(a);
  const c = typeof b === 'string' && b.trim().endsWith('%');
  const o2 = parseNumber(b);
  return [o1, c ? multiply(o1, o2) : o2];
}

/**
 * Adds provided parseable numbers
 * If second operand is percentage, the function
 * will apply this percentage to the first operand:
 * @example
 * ```
 * 0.1 + 0.2 // => 0.30000000000000004
 * add(0.1, 0.2) // => 0.3
 * add(10, '20%') // => 12
 * add('20%', 10) // => 10.2
 * ```
 * @param a - The first parseable number.
 * @param b - The second parseable number.
 * @returns The sum of the two numbers.
 */
export function add(a: ParseableNumber, b: ParseableNumber) {
  const [o1, o2] = _parseRelativeOperands(a, b);
  const p = Math.min(Math.max(-100, getScale(o1), getScale(o2)), 100);
  return round(o1 + o2, p);
}

/**
 * Calculates the sum of array or iterable of parseable numbers
 * @note Returns 0 if array is empty
 * @example
 * ```
 * const numbers = new Set([0.1, 0.2, 0.3]);
 * sum(numbers) // => 0.6
 * sum([]) // => 0
 * ```
 * @param nums - An array or iterable of parseable numbers.
 * @returns The sum of the numbers.
 */
export function sum(nums: Iterable<ParseableNumber>): number {
  return Array.from(nums).reduce<number>(add, 0);
}

/**
 * Subtracts the second parseable number from the first one.
 * If second operand is percentage, the function
 * will apply this percentage to the first operand
 * @example
 * ```
 * 0.3 - 0.2 // => 0.09999999999999998
 * subtract(0.3, 0.2) // => 0.1
 * subtract(10, '20%') // => 8
 * ```
 * @param a - The first parseable number.
 * @param b - The second parseable number.
 * @returns The difference between the two numbers.
 */
export function subtract(a: ParseableNumber, b: ParseableNumber) {
  const [o1, o2] = _parseRelativeOperands(a, b);
  return add(o1, -o2);
}

/**
 * Divides first parseable number by the second one
 * with provided precision and configuration
 * allowing or disallowing division by zero
 * @note Any number divided by Infinity or -Infinity returns unsigned 0
 * @example
 * ```
 * divide(4, 2) // => 2
 * divide(10, 3, 4) // => 3.3333
 * divide(10, 0, 16, false) // => Infinity
 * divide(10, 0) // => SyntaxError
 * divide(10, -Infinity) // => 0
 * ```
 * @param a - The first parseable number.
 * @param b - The second parseable number.
 * @param precision - The number of decimal places to round to. Defaults to 16.
 * @param strict - If true, throws an error when dividing by zero. Defaults to true.
 * @returns The result of the division.
 */
export function divide(
  a: ParseableNumber,
  b: ParseableNumber,
  precision = 16,
  strict = true,
) {
  const o1 = parseNumber(a);
  if (Number.isNaN(o1)) return o1;
  const o2 = parseNumber(b);
  if (Number.isNaN(o2)) return o2;
  if (o2 === 0 && !strict) return o1 / o2;
  if (o2 === 0) {
    throw new ArithmeticError('Division by zero');
  }
  return round(o1 / o2, precision);
}

/**
 * Calculates the average/mean of array or iterable of parseable numbers
 * @note Returns 0 if array is empty
 * @example
 * ```
 * const numbers = new Set([0.1, 0.3]);
 * avg(numbers) // => 0.2
 * avg([]) // => 0
 * ```
 * @param nums - An array or iterable of parseable numbers.
 * @param precision - The number of decimal places to round to. Defaults to 16.
 * @returns The average of the numbers.
 */
export function avg(nums: Iterable<ParseableNumber>, precision = 16) {
  const array = Array.from(nums);
  return array.length
    ? divide(sum(array), array.length, precision)
    : array.length;
}

/**
 * Calculates modulo of provided parseable numbers
 * @note Works differently from JavaScript's remainder % operator
 * @example
 * ```
 * 5 % 3 // => 2
 * mod(5, 3) // => 2
 * -5 % 3 // => -2
 * mod(-5, 3) // => 1
 * 5 % -3 // => 2
 * mod(5, -3) // => -1
 * ```
 * @param a - The first parseable number.
 * @param b - The second parseable number.
 * @returns The modulo of the two numbers.
 */
export function mod(a: ParseableNumber, b: ParseableNumber): number {
  const o1 = parseNumber(a);
  if (Number.isNaN(o1) || !Number.isFinite(o1)) return NaN;
  const o2 = parseNumber(b);
  if (Number.isNaN(o2) || !Number.isFinite(o2)) return NaN;
  return add(o1 % o2, o2) % o2;
}
