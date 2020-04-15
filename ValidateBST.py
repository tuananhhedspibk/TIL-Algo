class TreeNode:
  def __init__(self, x):
    self.val = x
    self.left = None
    self.right = None
  
class Solution:
  def isValidBST(self, root):
    def helper(node, lower, upper):
      if not node:
        return True

      val = node.val

      if val <= lower or val >= upper:
        return False
      if not helper(node.right, val, upper):
        return False
      if not helper(node.left, lower, val):
        return False
      return True
    return helper(node, float('-inf'), float('+inf'))

node = TreeNode(5)
node.left = TreeNode(1)
node.right = TreeNode(6)
print(Solution().isValidBST(node))
