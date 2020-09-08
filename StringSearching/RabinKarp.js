function rabinKarp(text, pattern) {
  const q = 13;

  let count = 0;

  let i;
  let p = 0;
  let offset = 1;
  let t = new Array(text.length - pattern.length + 1);

  t = t.fill(0);

  for (i = 0; i < pattern.length; i++) {
    p = (10 * p + parseInt(pattern[i]));
  }

  for (i = 0; i < pattern.length - 1; i++) {
    offset = (10 * offset);
  }

  for (i = 0; i < pattern.length; i++) {
    t[0] = (t[0] * 10 + parseInt(text[i]));
  }

  for (i = 1; i <= text.length - pattern.length; i++) {
    t[i] = (10 * (t[i - 1] - offset * parseInt(text[i - 1])) + parseInt(text[i + pattern.length - 1]));
  }

  for (i = 0; i < t.length; i++) {
    if (t[i] === p) {
      count = 0;
      for (let j = 0; j < pattern.length; j++) {
        if (text[i + j] === pattern[j]) {
          count++;
        }
      }
      if (count === pattern.length) {
        console.log(`Matching index: ${i}`);
      }
    }
  }
}

rabinKarp('23141526739921', '31415');
