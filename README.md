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
