/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
  let i, j;
  let cellRowZeroMarked = false;
  let cellColumnZeroMarked = false;
    
  for (i = 0; i < matrix.length; i++) {
    for (j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        if (i === 0 && j === 0) {
          cellRowZeroMarked = true;
          cellColumnZeroMarked = true;
        } else {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
            
          if (i === 0 && !cellRowZeroMarked) cellRowZeroMarked = true;
          if (j === 0 && !cellColumnZeroMarked) cellColumnZeroMarked = true;
        }
      }
    }
  }
    
  for (i = 1; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      for (j = 1; j < matrix[0].length; j++) {
        if (matrix[i][j] !== 0) matrix[i][j] = 0;
      }
    }
  }
    
 for (j = 1; j < matrix[0].length; j++) {
    if (matrix[0][j] === 0) {
      for (i = 0; i < matrix.length; i++) {
        if (matrix[i][j] !== 0) matrix[i][j] = 0;
      }
    }
 }

    
  if (matrix[0][0] === 0) {
    if (cellColumnZeroMarked) {
      for (i = 1; i < matrix.length; i++) {
        if (matrix[i][0] !== 0) matrix[i][0] = 0;
      }
    }
    if (cellRowZeroMarked) {
      for (j = 1; j < matrix[0].length; j++) {
        if (matrix[0][j] !== 0) matrix[0][j] = 0;
      }
    }
  }
};
