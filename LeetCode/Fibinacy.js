// Fibonacy - save memory version

cache = {};

var fib = function(N) {
  if (N === 0 || N === 1) {
    return N;
  }
    
  if (!cache[N - 2]) {
    cache[N - 2] = fib(N - 2);  
  }
    
  if (!cache[N - 1]) {
    cache[N - 1] = fib(N - 1);
  }
    
  return cache[N - 1] + cache[N - 2];
};

console.log(fib(3));
console.log(cache);
