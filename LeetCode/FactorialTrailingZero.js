/**
 * @param {number} n
 * @return {number}
 */

var trailingZeroes = function(n) {
  let zeroTrailingCounter = 0;

  while (1) {
    if (Math.floor(n / 5) > 0) {
      zeroTrailingCounter += Math.floor(n / 5);
      n = Math.floor(n / 5);
    } else {
      break;
    }
  }
  
  return zeroTrailingCounter;
};
