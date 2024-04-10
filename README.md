# @gigwork/precise

Precision based math operations, suitable for simple financial calculations.

## Installation

```bash
# npm
npm install @gigwork/precise

# yarn
yarn add @gigwork/precise

# pnpm
pnpm add @gigwork/precise
```

## Basic usage

```javascript
// Calculate the price with tax
import { add, getScale, round } from '@gigwork/precise';

const cent = 0.01;
const price = 9.99;
const tax = '8.875%';

const precisePrice = add(price, tax); // => 10.8766125
round(precisePrice, getScale(cent)); // => 10.88

// Carousel
import { mod } from '@gigwork/precise';

const carousel = ['A', 'B', 'C', 'D', 'E'];
const initialIndex = 0;
const steps = -42;
carousel[mod(initialIndex + steps, carousel.length)]; // => 'D'

// Random numbers
import { random } from '@gigwork/precise';

const randomPrice = random(0, 100, 2); // => 33.76
const randomHue = random(0, 359, -1); // => 230
const headsOrTails = random(0, 1, 0); // => 1

// Average and sum
import { avg, sum, random } from '@gigwork/precise';

const prices = Array.from({ length: 10000 }, () => random(0, 100, 2));
avg(prices, 2); // => 50.01
sum(prices); // => 500998.81
```

## Functions A-Z

### `add`

Adds provided parseable numbers. If second operand is percentage, the function will apply this percentage to the first operand

#### Parameters

- `a` (number | string | bigint): The first parseable number.
- `b` (number | string | bigint): The second parseable number.

#### Returns

(number): The sum of the two numbers.

#### Example

```javascript
import { add } from '@gigwork/precise';

0.1 + 0.2; // => 0.30000000000000004
add(0.1, 0.2); // => 0.3
add(10, '20%'); // => 12
add('20%', '10'); // => 10.2
```

#### Note

This function will not coerce provided values to numbers:

```javascript
add(0.1, true); // => NaN
add(null, 100); // => NaN
add([1], 2); // => NaN
```

---

### `approxEqual`

Checks if two numbers are approximately equal within a given delta.

#### Parameters

- `a` (number): The first number to compare.
- `b` (number): The second number to compare.
- `delta` (number): The maximum difference between `a` and `b`. Default is `0`.

#### Returns

(boolean): Returns `true` if the two numbers are approximately equal, otherwise `false`.

#### Example

```javascript
import { approxEqual } from '@gigwork/precise';

const threshold = 0.0001;
const interest = (1 + 1 / 25000) ** 25000;
approxEqual(interest, Math.E, threshold); // => true
```

---

### `avg`

Calculates the average of array or iterable of parseable numbers. Returns `0` if array is empty.

#### Parameters

- `nums` (Iterable<number | string | bigint>): An array or iterable of parseable numbers.
- `precision` (number): The number of decimal places to round the result to. Default is `16`.

#### Returns

(number): The average of the numbers.

#### Example

```javascript
import { avg } from '@gigwork/precise';

const numbers = [6.123, 4.2345, 0.354, 1.2345];
avg(numbers); // => 2.9865
avg(numbers, 2); // => 2.99
avg([]); // => 0
avg(); // => TypeError
```

#### Note

Strings are iterable, which may cause a confusion:

```javascript
avg('123456789'); // => 5
```

---

### `ceil`

Rounds number to a certain precision towards -Infinity. This function is a shorthand for `round(number, precision, 'ceil')`.

#### Parameters

- `number` (number): The number to round.
- `precision` (number): The number of decimal places to round the result to. Default is `0`.

#### Returns

(number): The rounded number.

#### Example

```javascript
import { ceil } from '@gigwork/precise';

ceil(1.234, 2); // => 1.24
ceil(1234, -2); // => 1300
```

---

### `divide`

Divides the first parseable number by the second one with provided precision and configuration allowing or disallowing division by zero.

#### Parameters

- `a` (number | string | bigint): The first parseable number.
- `b` (number | string | bigint): The second parseable number.
- `precision` (number): The number of decimal places to round the result to. Default is `16`.
- `strict` (boolean): If `true`, throws an error when dividing by zero. Defaults to `true`.

#### Returns

(number): The result of the division.

#### Example

```javascript
import { divide } from '@gigwork/precise';

divide(4, 2); // => 2
divide('100%', 3, 4); // => 0.3333
divide(10, 0, 16, false); // => Infinity
divide(10, 0); // => ArithmeticError
divide(10, -Infinity); // => 0
```

#### Notes

- Any finite number divided by Infinity or -Infinity returns _unsigned_ 0, which is inconsistent with the built-in division operator and IEEE 754 standard:

  ```javascript
  10 / -Infinity; // => -0
  divide(10, -Infinity); // => 0
  ```

- This function will not coerce provided values to numbers:

  ```javascript
  divide(0.1, true); // => NaN
  divide(null, 100); // => NaN
  divide([1], 2); // => NaN
  ```

---

### `floor`

Rounds number to a certain precision towards Infinity. This function is a shorthand for `round(number, precision, 'floor')`.

#### Parameters

- `number` (number): The number to round.
- `precision` (number): The number of decimal places to round the result to. Default is `0`.

#### Returns

(number): The rounded number.

#### Example

```javascript
import { floor } from '@gigwork/precise';

floor(1.234, 2); // => 1.23

// Same as round(1.234, -2, 'floor');
floor(1234, -2); // => 1200
```

---

### `getScale`

Calculates the scale of a number, i.e. the number of decimal places.

#### Parameters

- `number` (number): The number to calculate the scale of.

#### Returns

(number): The scale of the number.

#### Example

```javascript
import { getScale } from '@gigwork/precise';

getScale(0.001); // => 3
getScale(1000); // => -3
getScale(0); // => 0
```

#### Note

Note that the scale is the _opposite_ of the exponent in scientific notation:

```javascript
getScale(1e-3); // => 3
getScale(1e3); // => -3
```

---

### `getUnit`

Calculates the unit of the number, i.e. the smallest number that can be represented by the number within it's precision.

#### Parameters

- `number` (number): The number to calculate the unit of.

#### Returns

(number): The unit of the number.

#### Example

```javascript
getUnit(12.347); // => 0.001
getUnit(2000); // => 1000
getUnit(2024); // => 1
```

---

### `mod`

Calculates modulo of provided parseable numbers. Keep in mind that modulo is not the same as remainder, you can read about it here: [Mod and Remainder are not the Same](https://bigmachine.io/theory/mod-and-remainder-are-not-the-same/).

#### Parameters

- `a` (number | string | bigint): The dividend.
- `b` (number | string | bigint): The divisor.

#### Returns

(number): The result of the modulo operation.

#### Example

```javascript
import { mod } from '@gigwork/precise';

5 % 3; // => 2
mod(5, 3); // => 2

-5 % 3; // => -2
mod(-5, 3); // => 1

5 % -3; // => 2
mod(5, -3); // => -1
```

---

### `multiply`

Multiplies two parseable numbers.

#### Parameters

- `a` (number | string | bigint): The first parseable number.
- `b` (number | string | bigint): The second parseable number.

#### Returns

(number): The product of the two numbers.

#### Example

```javascript
import { multiply } from '@gigwork/precise';

0.2 * 0.2; // => 0.04000000000000001
multiply(0.2, 0.2); // => 0.04
multiply(0.33, '3.3e-1'); // => 0.1089
multiply('33', '24%'); // => 7.92
```

#### Note

This function will not coerce provided values to numbers:

```javascript
multiply(0.1, true); // => NaN
multiply(null, 100); // => NaN
multiply([1], 2); // => NaN
```

---

### `parseNumber`

Parses a number-like value into a number with given precision and rounding mode.

#### Parameters

- `numberLike` (number | string | bigint): The value to parse.
- `precision` (number): The number of decimal places to round the result to.
- `mode` ('round' | 'floor' | 'ceil'): The rounding mode to use. Default is `round`.

#### Returns

(number): The parsed number.

#### Example

```javascript
import { parseNumber } from '@gigwork/precise';

parseNumber('0.1'); // => 0.1
parseNumber('1.5%', 2); // => 0.02
parseNumber('1.5%', 2, 'floor'); // => 0.01
```

#### Note

This function will not coerce provided values to numbers:

```javascript
parseNumber(false); // => NaN
parseNumber(null); // => NaN
parseNumber([1]); // => NaN
```

---

### `random`

Generates a random number within a given range with provided precision.

#### Parameters

- `min` (number): The lower bound of the range. Default is `0`.
- `max` (number): The upper bound of the range. Default is `1`.
- `precision` (number): The number of decimal places to round the result to. Default is `16`.

#### Returns

(number): The random number.

#### Example

```javascript
import { random } from '@gigwork/precise';

random(); // => 0.1234567890123457
random(5, 10, 2); // => 7.12
random(-1, 1, 4); // => -0.3701
```

---

### `round`

Rounds a number to a given precision and rounding mode.

#### Parameters

- `number` (number): The number to round.
- `precision` (number): The number of decimal places to round the result to. Default is `0`.
- `mode` ('round' | 'floor' | 'ceil'): The rounding mode to use. Default is `round`.

#### Returns

(number): The rounded number.

#### Example

```javascript
import { round } from '@gigwork/precise';

round(1.234); // => 1
round(1.234, 2); // => 1.23
round(1.234, 2, 'ceil'); // => 1.24
round(7654, -2); // => 7700
round(7654, -2, 'floor'); // => 7600
```

---

### `subtract`

Subtracts the second parseable number from the first one. If second operand is percentage, the function will apply this percentage to the first operand.

#### Parameters

- `a` (number | string | bigint): The first parseable number.
- `b` (number | string | bigint): The second parseable number.

#### Returns

(number): The difference between the two numbers.

#### Example

```javascript
import { subtract } from '@gigwork/precise';

0.3 - 0.2; // => 0.09999999999999998
subtract(0.3, 0.2); // => 0.1
subtract(10, '20%'); // => 8
```

#### Note

This function will not coerce provided values to numbers:

```javascript
subtract(0.1, true); // => NaN
subtract(null, 100); // => NaN
subtract([1], 2); // => NaN
```

---

### `sum`

Calculates the sum of array or iterable of parseable numbers. Returns `0` if array is empty.

#### Parameters

- `nums` (Iterable<number | string | bigint>): An array or iterable of parseable numbers.

#### Returns

(number): The sum of the numbers.

#### Example

```javascript
import { sum } from '@gigwork/precise';

const numbers = new Set([0.1, 0.2, 0.3]);
sum(numbers); // => 0.6
sum([]); // => 0
sum(); // => TypeError
```

#### Note

Strings are iterable, which may cause a confusion:

```javascript
sum('123456789'); // => 45
```

---
