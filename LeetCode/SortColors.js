/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  let i;
  let j = 0;
  const colorsFreq = { 0: 0, 1: 0, 2: 0 };
  
  for (i = 0; i < nums.length; i++) {
    colorsFreq[nums[i]]++;
  }
  
  for (i = 0; i < 3; i++) {
    while (colorsFreq[i] > 0) {
      nums[j] = i;
      j++;
      colorsFreq[i]--;
    }
  }
};
