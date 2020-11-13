class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }

  concat(nextNode) {
    this.next = nextNode;
  }
}

class LinkedList {
  constructor(values) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (values.length === 0) {
      return;
    }
    const nodes = values.map(val => new Node(val));

    this.head = nodes[0];
    this.tail = nodes[nodes.length - 1];
    this.length = nodes.length;

    for (let i = 0; i < nodes.length; i++) {
      if (i < nodes.length - 1) {
        nodes[i].next = nodes[i + 1];
      }
    }
  }

  traverse() {
    let iterator = this.head;

    if (!iterator) {
      console.log('Empty list');
    } else {
      while(iterator) {
        if (iterator.next) {
          process.stdout.write(`${iterator.val} -> `);
        } else {
          console.log(`${iterator.val}`);
        }

        iterator = iterator.next;
      }
    }
  }

  insertNode(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    this.tail.next = newNode;
    this.tail = newNode;
  }

  removeNodeByIndex(idx) {
    if (idx > this.length) {
      console.log('Index greater than list length');
      return;
    } else if (!this.head) {
      console.log('Empty list, can not remove anything in it');
      return;
    }

    let iterator = this.head;
    let prevIterator = null;
    let i = 0;

    while(iterator) {
      if (i === idx) {
        if (iterator === this.head) {
          this.head = iterator.next;
          iterator.next = null;
          iterator = null;
        } else if (iterator === this.tail) {
          prevIterator.next = null;
          iterator = null;
        } else {
          prevIterator.next = iterator.next;
          iterator.next = null;
          iterator = null;
        }
        return;
      }
      prevIterator = iterator;
      iterator = iterator.next;
      i++;
    }
  }
}

// Test case 1

// const linkedList = new LinkedList([3, 1, 2, 5, 0, 9, 6]);

// linkedList.traverse();
// linkedList.insertNode(10);
// linkedList.traverse();
// linkedList.removeNodeByIndex(3);
// linkedList.traverse();

// Test case 2

// const linkedList = new LinkedList([]);

// linkedList.removeNodeByIndex(2);
// linkedList.removeNodeByIndex(0);

// linkedList.insertNode(3);
// linkedList.insertNode(2);
// linkedList.traverse();
