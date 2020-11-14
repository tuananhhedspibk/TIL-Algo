function last(char, pattern) {
  let idx = -1;

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === char) {
      idx = i;
    }
  }

  return idx;
}

function boyerMoore(text, pattern) {
  let count = 0;
  let s = 0;

  while (s <= text.length - pattern.length) {
    j = pattern.length - 1;

    while(j >= 0 && text[s + j] === pattern[j]) {
      j--;
    }

    if (j === -1) {
      count++;
      
      console.log(`Matching index: ${s}`);
      s++;
    } else {
      const badCharLastIdxInPattern = last(text[j + s], pattern);

      if (badCharLastIdxInPattern === -1) {
        s += j;
      } else {
        s += Math.max(1, j - badCharLastIdxInPattern);
      }
    }
  }

  if (count === 0) {
    console.log('Doesn\'t match');
  }
}

boyerMoore('aabacabaccaacabac', 'acabac');
