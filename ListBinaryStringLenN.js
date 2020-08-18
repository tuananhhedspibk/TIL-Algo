// Use back-tracking

function listToString(list) {
  return list.reduce((prevValue, currValue) => {
    return `${prevValue}${currValue.toString()}`;
  }, '');
}

function handler(str, m) {
  for (let i = 0; i < 2; i++) {
    str[m - 1] = i;
    if (m === str.length) {
      console.log(listToString(str));
    } else {
      handler(str, m + 1);
    }
  }
}

function listedBinaryString(n) {
  const str = new Array(n);

  handler(str, 1);
}

listedBinaryString(3);
