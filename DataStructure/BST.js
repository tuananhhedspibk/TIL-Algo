class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insertData(data) {
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
    } else if (rootNode.data > newNode.data) {
      if (!rootNode.left) {
        rootNode.left = newNode;
      } else {
        this.insertNode(rootNode.left, newNode);
      }
    } else {
      console.log('This value can be inserted once time only to BST');
    }
  }

  findMinNode(root) {
    if (!root.left) {
      return root;
    }
    return this.findMinNode(root.left);
  }

  removeData(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, data) {
    if (node.data < data) {
      if (node.right) {
        node.right = this.removeNode(node.right, data);
      } else {
        console.log(`BST does not have ${data}`);
      }
    } else if (node.data > data) {
      if (node.left) {
        node.left = this.removeNode(node.left, data);
      } else {
        console.log(`BST does not have ${data}`);
      }
    } else {
      if (node.left && !node.right) {
        node = node.left;
      } else if (node.right && !node.left) {
        node = node.right;
      } else if (node.right && node.left) {
        const rightSubTreeMinNode = this.findMinNode(node.right);

        node.data = rightSubTreeMinNode.data;
        node.right = this.removeNode(node.right, rightSubTreeMinNode.data);
      } else {
        node = null;
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

  inOrderTraverseByStack() {
    if (!this.root) {
      console.log('Empty BST');
      return;
    }

    const nodesStack = [];
    let tempNode = this.root;

    while(nodesStack.length > 0 || tempNode) {
      while (tempNode) {
        nodesStack.push(tempNode);
        tempNode = tempNode.left;
      }

      tempNode = nodesStack.pop();

      process.stdout.write(`${tempNode.data} `);

      tempNode = tempNode.right;
    }
  }

  preOrderTraverseByStack() {
    if (!this.root) {
      console.log('Empty BST');
      return;
    }

    let tempNode = this.root;
    let stack = [];

    while (stack.length > 0 || tempNode) {
      while(tempNode) {
        process.stdout.write(`${tempNode.data} `);

        stack.push(tempNode);
        tempNode = tempNode.left;
      }

      tempNode = stack.pop();
      tempNode = tempNode.right;
    }
  }

  postOrderTraverseByStack()
}

const bst = new BST();

bst.insertData(9);

bst.insertData(12);
bst.insertData(5);

bst.insertData(3);
bst.insertData(14);
bst.insertData(10);
bst.insertData(7);

bst.insertData(8);
bst.insertData(6);
bst.insertData(11);
bst.insertData(4);
bst.insertData(1);
bst.insertData(13);

bst.preOrderTraverseByStack();
console.log();

// bst.preOrderTraverse(bst.root);
// console.log();

// bst.inOrderTraverse(bst.root);
// console.log();

// bst.postOrderTraverse(bst.root);
// console.log();

// bst.removeData(1);
// bst.inOrderTraverse(bst.root);
// console.log();

// bst.removeData(4);
// bst.inOrderTraverse(bst.root);
// console.log();

// bst.removeData(14);
// bst.inOrderTraverse(bst.root);
// console.log();

// bst.removeData(10);
// bst.inOrderTraverse(bst.root);
// console.log();

// bst.removeData(5);
// bst.inOrderTraverse(bst.root);
// console.log();
