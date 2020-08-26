function quickSort(inputs, lowIdx, highIdx) {
  if (lowIdx >= highIdx) {
    return;
  }

  let i = lowIdx;
  let j = highIdx;
  
  const pivot = inputs[Math.floor((highIdx + lowIdx) / 2)];

  while (i <= j) {
    while (inputs[i] < pivot) i++;
    while(inputs[j] > pivot) j--;

    if (i > j) {
      break;
    }

    let tmp = inputs[i];
    inputs[i] = inputs[j];
    inputs[j] = tmp;

    i++;
    j--;
  }

  quickSort(inputs, lowIdx, j);
  quickSort(inputs, i, highIdx);
}

const inputs = [ 6, 5, 3, 4, 2, 1 ];

quickSort(inputs, 0, inputs.length - 1);

console.log(inputs);
