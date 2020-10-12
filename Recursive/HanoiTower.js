function handler(i, start, end, temp) {
  if (i === 1) {
    console.log(`Move disk from ${start} to ${end}`);
    return;
  }

  handler(i - 1, start, temp, end);
  handler(1, start, end, temp);
  handler(i - 1, temp, end, start);
}

handler(3, 1, 3, 2);
