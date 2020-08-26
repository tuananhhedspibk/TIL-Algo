function insertionSort(inputs) {
  for (let i = 1; i < inputs.length; i++) {
    let tmp = inputs[i];
    let j = i - 1;

    while (j >= 0 && tmp < inputs[j]) {
      inputs[j + 1] = inputs[j];
      j--; 
    }
    inputs[j + 1] = tmp;
  }

  console.log(inputs);
}

insertionSort([ 6, 5, 3, 3, 2, 1 ]);
