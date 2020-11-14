function handler(i, cache) {
  if (i < 2) {
      return 1;
  }
  if (cache[i]) {
      return cache[i];
  }
  const res = handler(i - 1, cache) + handler(i - 2, cache);
  
  cache[i] = res;
  
  return res;
}

var climbStairs = function(n) {
  const cache = {};
  
  return handler(n, cache);
};

console.log(climbStairs(45));
