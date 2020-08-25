function bubbleSort(inputs) {
  let temp = 0;

  for (let i = 1; i < inputs.length; i++) {
    for (let j = inputs.length - 1; j >= i; j--) {
      if (inputs[j] < inputs[j - 1]) {
        temp = inputs[j];
        inputs[j] = inputs[j - 1];
        inputs[j - 1] = temp;
      }
    }
  }

  console.log(inputs);
}

bubbleSort([6, 5, 3, 4, 2, 1]);
