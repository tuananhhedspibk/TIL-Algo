function listToString(list, upperIndex) {
  let res = '';

  for (let i = 1; i <= upperIndex; i++) {
    res += `${list[i].toString()}`;
    if (i < upperIndex) {
      res += ' + ';
    }
  }

  return res;
}

function handler(i, factors, tempSums, n) {
  for (let j = factors[i - 1]; j <= ((n - tempSums[i - 1]) / 2); j++) {
    tempSums[i] = tempSums[i - 1] + j;
    factors[i] = j;
    handler(i + 1, factors, tempSums, n);
  }
  factors[i] = n - tempSums[i - 1];
  console.log(listToString(factors, i));
}

function numberAnalyze(n) {
  const factors = new Array(n + 1);
  const tempSums = new Array(n + 1);

  factors[0] = 1;
  tempSums[0] = 0;

  handler(1, factors, tempSums, n);
}

numberAnalyze(6);
