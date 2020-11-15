/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  const tempSumSquares = [];
  
  let tempNumber = n;
  let sumSquare;
  
  while(1) {
    sumSquare = 0;
    while (tempNumber !== 0) {
      sumSquare += Math.floor(Math.pow(tempNumber % 10, 2));
      tempNumber = Math.floor(tempNumber / 10);
    }
      
    if (sumSquare === 1) {
      return true;
    }
      
    if (tempSumSquares.indexOf(sumSquare) > -1) {
      return false;
    } else {
      tempSumSquares.push(sumSquare);
    }
      
    tempNumber = sumSquare;
  }
};
