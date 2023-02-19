"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvlTree = void 0;
var node_1 = require("./node");
;
var AvlTree = /** @class */ (function () {
    function AvlTree(compare) {
        this._root = null;
        this._size = 0;
        this._compare = compare ? compare : this._defaultCompare;
    }
    AvlTree.prototype._defaultCompare = function (a, b) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    };
    AvlTree.prototype.insert = function (key, value) {
        this._root = this._insert(key, value, this._root);
        this._size++;
    };
    AvlTree.prototype._insert = function (key, value, root) {
        if (root === null) {
            return new node_1.Node(key, value);
        }
        if (this._compare(key, root.key) < 0) {
            root.left = this._insert(key, value, root.left);
        }
        else if (this._compare(key, root.key) > 0) {
            root.right = this._insert(key, value, root.right);
        }
        else {
            // Duplicate value
            this._size--;
            return root;
        }
        root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
        var balanceState = this._getBalanceState(root);
        if (balanceState === 4 /* BalanceState.UNBALANCED_LEFT */) {
            if (this._compare(key, root.left.key) < 0) {
                // Left left case
                root = root.rotateRight();
            }
            else {
                // Left right case
                root.left = root.left.rotateLeft();
                return root.rotateRight();
            }
        }
        if (balanceState === 0 /* BalanceState.UNBALANCED_RIGHT */) {
            if (this._compare(key, root.right.key) > 0) {
                // Right right case
                root = root.rotateLeft();
            }
            else {
                // Right left case
                root.right = root.right.rotateRight();
                return root.rotateLeft();
            }
        }
        return root;
    };
    AvlTree.prototype.delete = function (key) {
        this._root = this._delete(key, this._root);
        this._size--;
    };
    AvlTree.prototype._delete = function (key, root) {
        if (root === null) {
            this._size++;
            return root;
        }
        if (this._compare(key, root.key) < 0) {
            root.left = this._delete(key, root.left);
        }
        else if (this._compare(key, root.key) > 0) {
            root.right = this._delete(key, root.right);
        }
        else {
            // root need to be deleted
            if (!root.left && !root.right) {
                root = null;
            }
            else if (!root.left && root.right) {
                // root has only right childs
                root = root.right;
            }
            else if (root.left && !root.right) {
                // root has only left childs
                root = root.left;
            }
            else {
                // root has both left & right childs
                var inOrderSuccessor = this._minValueNode(root.right);
                root.key = inOrderSuccessor.key;
                root.value = inOrderSuccessor.value;
                root.right = this._delete(inOrderSuccessor.key, root.right);
            }
        }
        if (root === null) {
            return root;
        }
        root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
        var balanceState = this._getBalanceState(root);
        if (balanceState === 4 /* BalanceState.UNBALANCED_LEFT */) {
            if (this._getBalanceState(root.left) === 2 /* BalanceState.BALANCED */ ||
                this._getBalanceState(root.right) === 3 /* BalanceState.SLIGHTLY_UNBALANCED_LEFT */) {
                // Left left case
                return root.rotateRight();
            }
            // Left right case
            // this._getBalanceState((<Node<K, V>>root.left)) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT
            root.left = root.left.rotateLeft();
            return root.rotateRight();
        }
        if (balanceState === 0 /* BalanceState.UNBALANCED_RIGHT */) {
            if (this._getBalanceState(root.right) === 2 /* BalanceState.BALANCED */ ||
                this._getBalanceState(root.right) === 1 /* BalanceState.SLIGHTLY_UNBALANCED_RIGHT */) {
                // Right right case
                return root.rotateLeft();
            }
            // Right left case
            // this._getBalanceState((<Node<K, V>>root.right)) === BalanceState.SLIGHTLY_UNBALANCED_LEFT
            root.right = root.right.rotateRight();
            return root.rotateLeft();
        }
        return root;
    };
    AvlTree.prototype.get = function (key) {
        if (this._root === null)
            return null;
        var result = this._get(key, this._root);
        if (result === null)
            return null;
        return result.value;
    };
    AvlTree.prototype._get = function (key, root) {
        var compareResult = this._compare(key, root.key);
        if (compareResult === 0)
            return root;
        if (compareResult < 0) {
            if (!root.left)
                return null;
            return this._get(key, root.left);
        }
        if (!root.right)
            return null;
        return this._get(key, root.right);
    };
    AvlTree.prototype.contains = function (key) {
        if (this._root === null)
            return false;
        return !!this._get(key, this._root);
    };
    AvlTree.prototype.findMinimum = function () {
        if (this._root === null)
            return null;
        return this._minValueNode(this._root).key;
    };
    AvlTree.prototype.findMaximum = function () {
        if (this._root === null)
            return null;
        return this._maxValueNode(this._root).key;
    };
    Object.defineProperty(AvlTree.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AvlTree.prototype, "isEmpty", {
        get: function () {
            return this._size === 0;
        },
        enumerable: false,
        configurable: true
    });
    AvlTree.prototype._minValueNode = function (root) {
        var current = root;
        while (current.left)
            current = current.left;
        return current;
    };
    AvlTree.prototype._maxValueNode = function (root) {
        var current = root;
        while (current.right)
            current = current.right;
        return current;
    };
    AvlTree.prototype._getBalanceState = function (node) {
        var heightDiff = node.leftHeight - node.rightHeight;
        switch (heightDiff) {
            case -2: return 0 /* BalanceState.UNBALANCED_RIGHT */;
            case -1: return 1 /* BalanceState.SLIGHTLY_UNBALANCED_RIGHT */;
            case 1: return 3 /* BalanceState.SLIGHTLY_UNBALANCED_LEFT */;
            case 2: return 4 /* BalanceState.UNBALANCED_LEFT */;
            default: return 2 /* BalanceState.BALANCED */;
        }
    };
    return AvlTree;
}());
exports.AvlTree = AvlTree;
//# sourceMappingURL=index.js.map