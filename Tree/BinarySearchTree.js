class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  // Usually called BST

  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new TreeNode(data);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(rootNode, newNode) {
    if (rootNode.data < newNode.data) {
      if (!rootNode.right) {
        rootNode.right = newNode;
      } else {
        this.insertNode(rootNode.right, newNode);
      }
    } else {
      if (!rootNode.left) {
        rootNode.left = newNode;
      } else {
        this.insertNode(rootNode.left, newNode);
      }
    }
  }

  findMinNode(node) {
    if (!node.left) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  removeData(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, data) {
    if (node) {
      if (data < node.data) {
        node.left = this.removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = this.removeNode(node.right, data);
      } else {
        if (!node.left && !node.right) {
          node = null;
        } else if (node.left && !node.right) {
          node = node.left;
        } else if (!node.left && node.right) {
          node = node.right;
        } else {
          const rightSubTreeMinNode = this.findMinNode(node.right);
          node.data = rightSubTreeMinNode.data;

          node.right = this.removeNode(node.right, rightSubTreeMinNode.data);
        }
      }
    }

    return node;
  }

  preOrderTraverse(node) {
    process.stdout.write(`${node.data} `);
    if (node.left) {
      this.preOrderTraverse(node.left);
    }
    if (node.right) {
      this.preOrderTraverse(node.right);
    }
  }

  inOrderTraverse(node) {
    if (node.left) {
      this.inOrderTraverse(node.left);
    }
    process.stdout.write(`${node.data} `);
    if (node.right) {
      this.inOrderTraverse(node.right);
    }
  }

  postOrderTraverse(node) {
    if (node.left) {
      this.postOrderTraverse(node.left);
    }
    if (node.right) {
      this.postOrderTraverse(node.right);
    }
    process.stdout.write(`${node.data} `);
  }
}

const bst = new BinarySearchTree();

bst.insert(9);

bst.insert(12);
bst.insert(5);

bst.insert(3);
bst.insert(14);
bst.insert(10);
bst.insert(7);

bst.insert(8);
bst.insert(6);
bst.insert(11);
bst.insert(4);
bst.insert(1);
bst.insert(13);

bst.preOrderTraverse(bst.root);
console.log();

bst.inOrderTraverse(bst.root);
console.log();

bst.postOrderTraverse(bst.root);
console.log();

bst.removeData(1);
bst.inOrderTraverse(bst.root);
console.log();

bst.removeData(4);
bst.inOrderTraverse(bst.root);
console.log();

bst.removeData(14);
bst.inOrderTraverse(bst.root);
console.log();

bst.removeData(10);
bst.inOrderTraverse(bst.root);
console.log();

bst.removeData(5);
bst.inOrderTraverse(bst.root);
console.log();
