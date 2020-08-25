function selectionSort(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    let minimumValue = 9999;
    let minimumElementIdx = -1;

    for (let j = i; j < inputs.length; j++) {
      if (inputs[j] < minimumValue) {
        minimumElementIdx = j;
        minimumValue = inputs[j];
      }
    }

    if (minimumElementIdx !== -1) {
      let temp;

      temp = inputs[i];
      inputs[i] = minimumValue;
      inputs[minimumElementIdx] = temp;
    }
  }

  console.log(inputs);
}

selectionSort([ 6, 5, 3, 4, 2, 1 ]);
