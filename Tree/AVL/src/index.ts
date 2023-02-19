import { Node } from './node';
import { AvlTree as AvlTreeApi, CompareFunction } from '@tyriar/avl-tree';

const enum BalanceState {
  UNBALANCED_RIGHT,           // right child's height is 2+ greater than left child's height
  SLIGHTLY_UNBALANCED_RIGHT,  // right child's height is 1 greater than left child's height
  BALANCED,                   // left & right child have the same height
  SLIGHTLY_UNBALANCED_LEFT,   // left child's height is 1 greater than right child's height
  UNBALANCED_LEFT,            // left child's height is 2+ greater than right child's height
};

export class AvlTree<K, V> implements AvlTreeApi<K, V> {
  protected _root: Node<K, V> | null = null;
  private _size: number = 0;
  private _compare: CompareFunction<K>;

  constructor(compare?: CompareFunction<K>) {
    this._compare = compare ? compare : this._defaultCompare;
  }

  private _defaultCompare(a: K, b: K): number {
    if (a > b) return 1;
    if (a < b) return -1;

    return 0;
  }

  public insert(key: K, value?: V): void {
    this._root = this._insert(key, value, this._root);
    this._size++;
  }

  private _insert(key: K, value: V | undefined, root: Node<K, V> | null): Node<K, V> {
    if (root === null) {
      return new Node(key, value);
    }

    if (this._compare(key, root.key) < 0) {
      root.left = this._insert(key, value, root.left);
    } else if (this._compare(key, root.key) > 0) {
      root.right = this._insert(key, value, root.right);
    } else {
      // Duplicate value

      this._size--;
      return root;
    }

    root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
    const balanceState = this._getBalanceState(root);

    if (balanceState === BalanceState.UNBALANCED_LEFT) {
      if (this._compare(key, (<Node<K, V>>root.left).key) < 0) {
        // Left left case
        root = root.rotateRight();
      } else {
        // Left right case
        root.left = (<Node<K, V>>root.left).rotateLeft();
        return root.rotateRight();
      }
    }

    if (balanceState === BalanceState.UNBALANCED_RIGHT) {
      if (this._compare(key, (<Node<K, V>>root.right).key) > 0) {
        // Right right case
        root = root.rotateLeft();
      } else {
        // Right left case

        root.right = (<Node<K, V>>root.right).rotateRight();
        return root.rotateLeft();
      }
    }

    return root;
  }

  public delete(key: K): void {
    this._root = this._delete(key, this._root);
    this._size--;
  }

  private _delete(key: K, root: Node<K, V> | null): Node<K, V> | null {
    if (root === null) {
      this._size++;
      return root;
    }

    if (this._compare(key, root.key) < 0) {
      root.left = this._delete(key, root.left);
    } else if (this._compare(key, root.key) > 0) {
      root.right = this._delete(key, root.right);
    } else {
      // root need to be deleted
      if (!root.left && !root.right) {
        root = null;
      } else if (!root.left && root.right) {
        // root has only right childs
        root = root.right;
      } else if (root.left && !root.right) {
        // root has only left childs
        root = root.left;
      } else {
        // root has both left & right childs
        const inOrderSuccessor = this._minValueNode(<Node<K, V>>root.right);
        root.key = inOrderSuccessor.key;
        root.value = inOrderSuccessor.value;
        root.right = this._delete(inOrderSuccessor.key, root.right);
      }
    }

    if (root === null) {
      return root;
    }

    root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
    const balanceState = this._getBalanceState(root);

    if (balanceState === BalanceState.UNBALANCED_LEFT) {
      if (this._getBalanceState((<Node<K, V>>root.left)) === BalanceState.BALANCED ||
          this._getBalanceState((<Node<K, V>>root.right)) === BalanceState.SLIGHTLY_UNBALANCED_LEFT) {
        // Left left case
        
        return root.rotateRight();
      }

      // Left right case
      // this._getBalanceState((<Node<K, V>>root.left)) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT
      root.left = (<Node<K, V>>root.left).rotateLeft();
      return root.rotateRight();
    }

    if (balanceState === BalanceState.UNBALANCED_RIGHT) {
      if (this._getBalanceState((<Node<K, V>>root.right)) === BalanceState.BALANCED ||
          this._getBalanceState((<Node<K, V>>root.right)) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT) {
      // Right right case

      return root.rotateLeft();
      }

      // Right left case
      // this._getBalanceState((<Node<K, V>>root.right)) === BalanceState.SLIGHTLY_UNBALANCED_LEFT
      root.right = (<Node<K, V>>root.right).rotateRight();
      return root.rotateLeft();
    }

    return root;
  }

  public get(key: K): V | undefined | null {
    if (this._root === null) return null;

    const result = this._get(key, this._root);

    if (result === null) return null;

    return result.value;
  }

  private _get(key: K, root: Node<K, V>): Node<K, V> | null {
    const compareResult = this._compare(key, root.key);

    if (compareResult === 0) return root;

    if (compareResult < 0) {
      if (!root.left) return null;
      return this._get(key, root.left);
    }

    if (!root.right) return null;
    return this._get(key, root.right);
  }

  public contains(key: K): boolean {
    if (this._root === null) return false;

    return !!this._get(key, this._root);
  }

  public findMinimum(): K | null {
    if (this._root === null) return null;

    return this._minValueNode(this._root).key;
  }

  public findMaximum(): K | null {
    if (this._root === null) return null;

    return this._maxValueNode(this._root).key;
  }

  public get size(): number {
    return this._size;
  }

  public get isEmpty(): boolean {
    return this._size === 0;
  }

  private _minValueNode(root: Node<K, V>): Node<K, V> {
    let current = root;

    while (current.left) current = current.left;

    return current;
  }

  private _maxValueNode(root: Node<K, V>): Node<K, V> {
    let current = root;

    while (current.right) current = current.right;

    return current;
  }

  private _getBalanceState(node: Node<K, V>): BalanceState {
    const heightDiff = node.leftHeight - node.rightHeight;

    switch (heightDiff) {
      case -2: return BalanceState.UNBALANCED_RIGHT;
      case -1: return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
      case 1: return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
      case 2: return BalanceState.UNBALANCED_LEFT;
      default: return BalanceState.BALANCED;
    }
  }
}
