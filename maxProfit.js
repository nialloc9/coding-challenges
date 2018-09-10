// task: create a function that gets the max profit possible from an array of stock prices listed in order of time.

const stocks = [5, 11, 6, 1, 8];

/**
 * @description First attempt is the brute force attempt looping through each stock price and comparing it against the the others.
 * complexity: time On^2 space O(8)
 * @param {[{int}]} stockPrices
 */
function maximiseProfitsv1(stockPrices) {
  let maxProfit = 0;

  // loop over stocks
  for (let i = 0; i < stockPrices.length; i++) {
    // compare current against all other stocks

    for (let j = 0; j < stockPrices.length; j++) {
      // get the lower and larger time between the 2
      const early = Math.min(i, j);
      const later = Math.max(i, j);

      // get the lower and larger stock prices between the 2
      const earlyPrice = stockPrices[early];
      const laterPrice = stockPrices[later];

      // get the differance between the 2
      const profit = laterPrice - earlyPrice;

      // get the larger of the 2 and mark it as max profit
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}

const v1Result = maximiseProfitsv1(stocks);

// console.log(v1Result); --> 7

/**
 * @description We can clean up the code by remembering we only need what omes after the early stock price as selling comes after buying. It also reduces the space complexity
 * complexity: time O(n^2) and space O(6)
 * @param {[{int}]} stockPrices
 */
function maximiseProfitsv2(stockPrices) {
  let maxProfit = 0;

  // loop over stocks
  for (let i = 0; i < stockPrices.length; i++) {
    // compare current against all other stocks

    // we know we have to buy before selling so we can set this as the earlier price always
    const earlyPrice = stockPrices[i];

    // we only need to loop through later prices
    for (let j = earlyPrice + 1; j < stockPrices.length; j++) {
      // buying has to come after selling
      const laterPrice = stockPrices[j];

      // get the differance between the 2
      const profit = laterPrice - earlyPrice;

      // get the larger of the 2 and mark it as max profit
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}

// console.log(maximiseProfitsv2(stocks)); --> 7

/**
 * @description We can reduce the complexity of the code by saving the min price seen previously
 * complexity: time O(n) and space O(4)
 * @param {[{int}]} stockPrices
 */
function maximiseProfitsv3(stockPrices) {
  let maxProfit = 0;

  // first stock is the minmum price seen
  let minPrice = stockPrices[0];

  // loop over stocks
  for (let i = 0; i < stockPrices.length; i++) {
    const current = stockPrices[i];

    // get the min price between current and minimum stock seen so far
    minPrice = Math.min(minPrice, current);

    // maxProfit is the larger of previous maxProfit vs current maxProfit
    maxProfit = Math.max(maxProfit, current - minPrice);
  }

  return maxProfit;
}

// console.log(maximiseProfitsv2(stocks)); --> 7

/**
 * @description We can reduce the complexity of the code by saving the min price seen previously
 * complexity: time O(n) and space O(3)
 * @param {[{int}]} stockPrices
 */
function maximiseProfitsv4(stockPrices) {
  if (stockPrices.length < 2) {
    throw new Error("Minimum of 2 stocks required");
  }

  let maxProfit = stockPrices[1] - stockPrices[0];

  // first stock is the minmum price seen
  let minPrice = stockPrices[0];

  // loop over stocks. we have to buy before we sell so start at 1 as 0 is already used.
  for (let i = 1; i < stockPrices.length; i++) {
    const current = stockPrices[i];

    // maxProfit is the larger of previous maxProfit vs current maxProfit
    maxProfit = Math.max(maxProfit, current - minPrice);

    // get the min price between current and minimum stock seen so far
    minPrice = Math.min(minPrice, current);
  }

  return maxProfit;
}

// console.log(maximiseProfitsv4([8, 4, 3, 2])); --> -1
