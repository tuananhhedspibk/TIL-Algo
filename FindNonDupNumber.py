class Solution(object):
  def singleNumber(self, nums):
    occurrences = {}

    for n in nums:
      occurrences[n] = occurrences.get(n, 0) + 1

    for key, value in occurrences.items():
      if value == 1:
        return key

  def singleNumber2(self, nums):
    unique = 0
    for n in nums:
      print(unique, n)
      unique ^= n
    return unique

print(Solution().singleNumber2([ 4, 3, 2, 1, 1, 3, 2 ]))
