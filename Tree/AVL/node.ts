export class Node<K, V> {
  public left: Node<K, V> | null = null;
  public right: Node<K, V> | null = null;
  public height: number | null = null;

  constructor(
    public key: K,
    public value: V | undefined
  ) {}

  public rotateRight(): Node<K, V> {
    //     b                           a
    //    / \                         / \
    //   a   e -> b.rotateRight() -> c   b
    //  / \                             / \
    // c   d                           d   e

    const other = <Node<K, V>>this.left;
    this.left = other.right;
    other.right = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    other.height = Math.max(other.leftHeight, this.height) + 1;

    return other;
  }

  public rotateLeft(): Node<K, V> {
    //   a                              b
    //  / \                            / \
    // c   b   -> a.rotateLeft() ->   a   e
    //    / \                        / \
    //   d   e                      c   d

    const other = <Node<K, V>>this.right;
    this.right = other.left;
    other.left = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    other.height = Math.max(this.height, other.rightHeight) + 1;

    return other;
  }

  public get leftHeight(): number {
    if (this.left === null) {
      return -1;
    }

    return this.left.height || 0;
  }

  public get rightHeight(): number {
    if (this.right === null) {
      return -1;
    }

    return this.right.height || 0;
  }
}
