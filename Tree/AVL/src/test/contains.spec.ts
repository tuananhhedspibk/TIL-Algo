import { TestAvlTree } from './utils';

describe('Contains func testing', () => {
  it('Should return false if the tree is empty', () => {
    const tree = new TestAvlTree();
    expect(tree.contains(1)).toEqual(false);
  });

  it('Should return whether the tree contains a node', () => {
    const tree = new TestAvlTree();

    expect(tree.contains(1)).toEqual(false);
    expect(tree.contains(2)).toEqual(false);
    expect(tree.contains(3)).toEqual(false);

    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    expect(tree.contains(1)).toEqual(true);
    expect(tree.contains(2)).toEqual(true);
    expect(tree.contains(3)).toEqual(true);
  });

  it('Should return false when the expected parent has no child', () => {
    const tree = new TestAvlTree();

    tree.insert(1);

    expect(tree.contains(1)).toEqual(true);
    expect(tree.contains(2)).toEqual(false);
    expect(tree.contains(3)).toEqual(false);
  });
});