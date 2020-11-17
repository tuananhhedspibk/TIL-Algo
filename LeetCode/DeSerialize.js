/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  if (!root) return '';

  const queue = [];
  const res = [];
  
  let tempNode;
  
  queue.push(root);
  
  while (queue.length > 0) {
    tempNode = queue.shift();

    if (tempNode) {
      res.push(tempNode.val);
      queue.push(tempNode.left);
      queue.push(tempNode.right);
    } else {
      res.push('null');
    }
  }
  
  return res.toString();
};

/**
* Decodes your encoded data to tree.
*
* @param {string} data
* @return {TreeNode}
*/
var deserialize = function(data) {
  if (data === '') {
    return null;
  }
  
  const dataAsArray = data.split(',');
  const numberNodes = dataAsArray.length;
  
  const queue = [];
  const root = new TreeNode(parseInt(dataAsArray[0]));
  
  let parent, tempNode;
  
  queue.push(root);
  
  for (let i = 1; i < numberNodes; i++) {
    parent = queue.shift();
      
    if (dataAsArray[i] !== 'null') {
      tempNode = new TreeNode(parseInt(dataAsArray[i]));
      parent.left = tempNode;
      queue.push(tempNode);
    }
      
    i++;
      
    if (i < numberNodes && dataAsArray[i] !== 'null') {
      tempNode = new TreeNode(parseInt(dataAsArray[i]));
      parent.right = tempNode;
      queue.push(tempNode);
    }
  }

  return root;
};

/**
* Your functions will be called as such:
* deserialize(serialize(root));
*/
