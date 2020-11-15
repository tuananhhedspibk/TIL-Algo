/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

function quickSortByFreq(uniqueElements, elementsFreq, lowIdx, highIdx) {
  if (lowIdx >= highIdx) {
    return;
  }

  let p = lowIdx;
  let q = highIdx;
  let tmp;

  const pivot = elementsFreq[uniqueElements[Math.floor((lowIdx + highIdx) / 2)]];

  while (p <= q) {
    while (elementsFreq[uniqueElements[p]] < pivot) p++;
    while (elementsFreq[uniqueElements[q]] > pivot) q--;

    if (p > q) {
      break;
    }

    tmp = uniqueElements[p];
    uniqueElements[p] = uniqueElements[q];
    uniqueElements[q] = tmp;

    p++
    q--;
  }

  quickSortByFreq(uniqueElements, elementsFreq, lowIdx, q);
  quickSortByFreq(uniqueElements, elementsFreq, p, highIdx);  
}

var topKFrequent = function(nums, k) {
  const res = [];
  const elementsFreq = {};
  const uniqueElements = [];

  let i;

  for (i = 0; i < nums.length; i++) {
    elementsFreq[nums[i]] = 0;
  }

  for (let i = 0; i < nums.length; i++) {
    elementsFreq[nums[i]]++;
    if (uniqueElements.indexOf(nums[i]) === -1) {
      uniqueElements.push(nums[i]);
    }
  }

  quickSortByFreq(uniqueElements, elementsFreq, 0, uniqueElements.length - 1);

  for (i = uniqueElements.length - 1; i >= 0; i--) {
    if (res.length < k){
      res.push(uniqueElements[i]);
    } else {
      break;
    }
  }

  return res;
};
