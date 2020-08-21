// Create B-Tree in "Minimum degree t" convention

class BTree {
  constructor(t) {
    this.root = null;
    this.t = t;
  }

  traverse() {
    if (this.root) {
      this.root.traverse();
    }
    console.log();
  }

  search(k) {
    if (!this.root) {
      return null;
    }
    
    return this.root.search(k);
  }
}

class BTreeNode {
  constructor(t, leaf) {
    this.t = t; // minimum degree
    this.leaf = leaf; // is leaf boolean value
    this.keys = new Array(2 * t - 1);
    this.childs = new BTreeNode(2 * t);
    this.n = 0; // current number of keys
  }

  traverse() {
    let i = 0;

    for (i = 0; i < this.n; i++) {
      if (!this.leaf) {
        this.childs[i].traverse();
      }
      process.stdout.write(`${this.keys[i]} `);
    }

    if (!this.leaf) {
      childs[i].traverse();
    }
  }

  search(k) {
    let i = 0;

    while (i < this.n && this.keys[i] < k) {
      i++;
    }

    if (keys[i] === k) {
      return this;
    }

    if (this.leaf) {
      return null;
    }

    return this.childs[i].search(k);
  }
}
