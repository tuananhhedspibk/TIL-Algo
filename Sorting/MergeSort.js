function merge(inputs, firstIdx, midIdx, lastIdx) {
  const leftPart = [];
  const rightPart = [];

  for (let i = firstIdx; i <= midIdx; i++) {
    leftPart.push(inputs[i]);
  }
  for (let i = midIdx + 1; i <= lastIdx; i++) {
    rightPart.push(inputs[i]);
  }

  leftPart.push(99999999);
  rightPart.push(99999999);

  let i = 0;
  let j = 0;

  for (let k = firstIdx; k <= lastIdx; k++) {
    if (leftPart[i] <= rightPart[j]) {
      inputs[k] = leftPart[i];
      i++;
    } else {
      inputs[k] = rightPart[j];
      j++;
    }
  }
}

function mergeSort(inputs, firstIdx, lastIdx) {
  if (firstIdx === lastIdx) {
    return;
  }

  const midIdx = Math.floor((firstIdx + lastIdx) / 2);

  mergeSort(inputs, firstIdx, midIdx);
  mergeSort(inputs, midIdx + 1, lastIdx);
  merge(inputs, firstIdx, midIdx, lastIdx);
}

const inputs = [ 6, 5, 3, 3, 4, 1 ];

mergeSort(inputs, 0, inputs.length - 1);

console.log(inputs);
