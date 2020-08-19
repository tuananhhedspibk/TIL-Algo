function listToString(list) {
  return list.reduce((prevValue, currValue) => {
    return `${prevValue}${currValue.toString()}`;
  }, '').substring(1, list.length);
}

function handler(i, permutation, n, elementFreeStatuses) {
  for (let j = 1; j <= n; j++) {
    if (elementFreeStatuses[j]) {
      permutation[i] = j;

      if (i === permutation.length - 1) {
        console.log(listToString(permutation));
      } else {
        elementFreeStatuses[j] = false;
        handler(i + 1, permutation, n, elementFreeStatuses);
        elementFreeStatuses[j] = true;
      }
    }
  }
}

function listedPermutationsKN(k, n) {
  const elementFreeStatuses = new Array(n + 1);
  const permutation = new Array(k + 1);

  permutation[0] = 0;

  for (let i = 0; i < n + 1; i++) {
    elementFreeStatuses[i] = true;
  }

  handler(1, permutation, n, elementFreeStatuses);
}

listedPermutationsKN(3, 5);
