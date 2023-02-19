import { TestAvlTree } from './utils';

describe('Insert function testing', () => {
  it('Should return the size of the tree', () => {
    const tree = new TestAvlTree();

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);

    expect(tree.size).toEqual(5);
  });

  it('Should ignore insert of duplicate key', () => {
    const tree = new TestAvlTree();

    tree.insert(1);
    tree.insert(1);

    expect(tree.size).toEqual(1);
  });

  /**
   *         3            2
   *        /           /  \
   *       2           1   3
   *      /     ->  
   *     1 
   */
  it('Should correctly balance the left left case', () => {
    const tree = new TestAvlTree();

    tree.insert(3);
    tree.insert(2);
    tree.insert(1);

    expect(tree.root).not.toBeNull();
    expect(tree.root?.key).toEqual(2);
  });

  /**
   *         3            2
   *        /           /  \
   *       1           1   3
   *        \    ->  
   *        2
   */
  it('Should correctly balance the left right case', () => {
    const tree = new TestAvlTree();

    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    expect(tree.root).not.toBeNull();
    expect(tree.root?.key).toEqual(2);
  });

  /**
   *         1                2
   *          \              / \
   *           2            1  3
   *            \    ->  
   *             3
   */
  it('Should correctly balance the right right case', () => {
    const tree = new TestAvlTree();

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    expect(tree.root).not.toBeNull();
    expect(tree.root?.key).toEqual(2);
  });

  /**
   *         1                2
   *          \              / \
   *           3            1  3
   *          /     ->  
   *         2   
   */
  it('Should correctly balance the right left case', () => {
    const tree = new TestAvlTree();

    tree.insert(1);
    tree.insert(3);
    tree.insert(2);

    expect(tree.root).not.toBeNull();
    expect(tree.root?.key).toEqual(2);
  });
});

