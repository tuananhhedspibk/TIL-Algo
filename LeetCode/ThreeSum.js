/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let i, j, k, sum;
  const results = [];

  nums = nums.sort((a, b) => a - b);

  for (i = 0; i < nums.length - 2; i++) {
    while (nums[i] === nums[i - 1]) i++;
    
    j = i + 1;
    k = nums.length - 1;
    
    while (j < k) {
      sum = nums[i] + nums[j] + nums[k];
      if (sum === 0) {
        results.push([nums[i], nums[j], nums[k]]);
        while (nums[j] === nums[j + 1]) j++;
        j++;
      }
      if (sum > 0) k--;
      if (sum < 0) j++;
    }
  }
    
  return results;
};
