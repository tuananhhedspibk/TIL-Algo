import { TestAvlTree } from './utils';

describe('Delete function testing', () => {
  it('Should not change the size of a tree with no root', () => {
    const tree = new TestAvlTree();
    tree.delete(1);

    expect(tree.size).toEqual(0);
  });

  it('Should delete a single key', () => {
    const tree = new TestAvlTree();

    tree.insert(1);
    tree.delete(1);

    expect(tree.isEmpty).toEqual(true);
  });

  /**
   *       _4_                       _2_
   *      /   \                     /   \
   *     2     6  -> delete(6) ->  1     4
   *    / \                             /
   *   1   3                           3
   */
  it('Should correctly balance the left left case', () => {
    const tree = new TestAvlTree();

    tree.insert(4, 4);
    tree.insert(2, 2);
    tree.insert(6, 6);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.insert(1, 1);
    tree.insert(7, 7);

    tree.delete(7);
    tree.delete(5);
    tree.delete(6);

    expect(tree.root).not.toBeNull();

    expect(tree.root?.key).toEqual(2);
    expect(tree.root?.value).toEqual(2);

    expect(tree.root?.left).not.toBeNull();
    expect(tree.root?.left?.key).toBe(1);
    expect(tree.root?.left?.value).toBe(1);

    expect(tree.root?.right).not.toBeNull();
    expect(tree.root?.right?.key).toEqual(4);
    expect(tree.root?.right?.value).toEqual(4);

    expect(tree.root?.right?.left).not.toBeNull();
    expect(tree.root?.right?.left?.key).toEqual(3);
    expect(tree.root?.right?.left?.value).toEqual(3);
  });

  /**
   *       _4_                       _6_
   *      /   \                     /   \
   *     2     6  -> delete(2) ->  4     7
   *          / \                   \
   *         5   7                  5
   */
  it('Should correctly balance the right right case', () => {
    const tree = new TestAvlTree();

    tree.insert(4, 4);
    tree.insert(2, 2);
    tree.insert(6, 6);
    tree.insert(3, 3);
    tree.insert(5, 5);
    tree.insert(1, 1);
    tree.insert(7, 7);

    tree.delete(1);
    tree.delete(3);
    tree.delete(2);

    expect(tree.root).not.toBeNull();
    expect(tree.root?.key).toEqual(6);
    expect(tree.root?.value).toEqual(6);

    expect(tree.root?.left).not.toBeNull();
    expect(tree.root?.left?.key).toEqual(4);
    expect(tree.root?.left?.value).toEqual(4);

    expect(tree.root?.right).not.toBeNull();
    expect(tree.root?.right?.key).toBe(7);
    expect(tree.root?.right?.value).toBe(7);

    expect(tree.root?.left?.right).not.toBeNull();
    expect(tree.root?.left?.right?.key).toEqual(5);
    expect(tree.root?.left?.right?.value).toEqual(5);
  });

  /**
   *       _6_                       _4_
   *      /   \                     /   \
   *     2     7  -> delete(8) ->  2     6
   *    / \     \                 / \   / \
   *   1   4     8               1   3 5   7
   *      / \
   *     3   5
   */
  it('Should correctly balance the left right case', () => {
    const tree = new TestAvlTree();

    tree.insert(6, 6);
    tree.insert(2, 2);
    tree.insert(7, 7);
    tree.insert(1, 1);
    tree.insert(8, 8);
    tree.insert(4, 4);
    tree.insert(3, 3);
    tree.insert(5, 5);

    tree.delete(8);

    expect(tree.root).not.toBeNull();
    expect(tree.root?.key).toEqual(4);
    expect(tree.root?.value).toEqual(4);

    expect(tree.root?.left).not.toBeNull();
    expect(tree.root?.left?.key).toEqual(2);
    expect(tree.root?.left?.value).toEqual(2);

    expect(tree.root?.right).not.toBeNull();
    expect(tree.root?.right?.key).toEqual(6);
    expect(tree.root?.right?.value).toEqual(6);

    expect(tree.root?.left?.left).not.toBeNull();
    expect(tree.root?.left?.left?.key).toEqual(1);
    expect(tree.root?.left?.left?.value).toEqual(1);

    expect(tree.root?.left?.right).not.toBeNull();
    expect(tree.root?.left?.right?.key).toEqual(3);
    expect(tree.root?.left?.right?.value).toEqual(3);

    expect(tree.root?.right?.left).not.toBeNull();
    expect(tree.root?.right?.left?.key).toEqual(5);
    expect(tree.root?.right?.left?.value).toEqual(5);

    expect(tree.root?.right?.right).not.toBeNull();
    expect(tree.root?.right?.right?.key).toEqual(7);
    expect(tree.root?.right?.right?.value).toEqual(7);
  });

  /**
   *       _3_                       _5_
   *      /   \                     /   \
   *     2     7  -> delete(1) ->  3     7
   *    /     / \                 / \   / \
   *   1     5   8               2   4 6   8
   *        / \
   *       4   6
   */
  it('Should correctly balance the right left case', () => {
    const tree = new TestAvlTree();

    tree.insert(3, 3);
    tree.insert(2, 2);
    tree.insert(7, 7);
    tree.insert(1, 1);
    tree.insert(8, 8);
    tree.insert(5, 5);
    tree.insert(4, 4);
    tree.insert(6, 6);

    tree.delete(1);

    expect(tree.root).not.toBeNull();
    expect(tree.root?.key).toEqual(5);
    expect(tree.root?.value).toEqual(5);

    expect(tree.root?.left).not.toBeNull();
    expect(tree.root?.left?.key).toEqual(3);
    expect(tree.root?.left?.value).toEqual(3);

    expect(tree.root?.right).not.toBeNull();
    expect(tree.root?.right?.key).toEqual(7);
    expect(tree.root?.right?.value).toEqual(7);

    expect(tree.root?.left?.left).not.toBeNull();
    expect(tree.root?.left?.left?.key).toEqual(2);
    expect(tree.root?.left?.left?.value).toEqual(2);

    expect(tree.root?.left?.right).not.toBeNull();
    expect(tree.root?.left?.right?.key).toEqual(4);
    expect(tree.root?.left?.right?.value).toEqual(4);

    expect(tree.root?.right?.left).not.toBeNull();
    expect(tree.root?.right?.left?.key).toEqual(6);
    expect(tree.root?.right?.left?.value).toEqual(6);

    expect(tree.root?.right?.right).not.toBeNull();
    expect(tree.root?.right?.right?.key).toEqual(8);
    expect(tree.root?.right?.right?.value).toEqual(8);
  });
});
