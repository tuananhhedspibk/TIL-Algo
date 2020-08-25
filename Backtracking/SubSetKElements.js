function listToString(list) {
  return list.reduce((prevValue, currValue) => {
    return `${prevValue}${currValue.toString()}`;
  }, '').substring(1, list.length);
}

function handler(i, subset, k, n) {
  // x[k] <= n
  // x[k - (k - i)] <= n - (k - i)
  // x[i] <= n - k + i

  for (let j = subset[i - 1] + 1; j <= n - k + i; j++) {
    subset[i] = j;

    if (i === subset.length - 1) {
      console.log(listToString(subset));
    } else {
      handler(i + 1, subset, k, n);
    }
  }
}

function genSubSets(k, n) {
  const dataSet = [];
  const subset = new Array(k + 1);

  subset[0] = 0;

  for (let i = 1; i <= n; i++) {
    dataSet.push(i);
  }

  handler(1, subset, k, n);
}

genSubSets(3, 6);
