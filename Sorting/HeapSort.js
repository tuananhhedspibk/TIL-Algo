function adjust(inputs, rootNode, endNode) {
  const rootValue = inputs[rootNode];

  while (2 * rootNode + 1 <= endNode) {
    let c = rootNode * 2 + 1;
    if (c < endNode && inputs[c] < inputs[c + 1]) {
      c++;
    }
    if (inputs[c] <= rootValue) {
      break;
    }
    inputs[rootNode] = inputs[c];
    rootNode = c;
  }
  inputs[rootNode] = rootValue;
}

function heapSort(inputs) {
  const n = inputs.length - 1;

  for (let i = Math.floor(n / 2); i >= 0; i--) {
    adjust(inputs, i, n);
  }

  for (let i = n; i >= 1; i--) {
    let temp = inputs[0];
    inputs[0] = inputs[i];
    inputs[i] = temp;

    adjust(inputs, 0, i - 1);
  }

  console.log(inputs);
}

heapSort([6, 5, 3, 4, 2, 1]);
