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
