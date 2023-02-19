"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = null;
    }
    Node.prototype.rotateRight = function () {
        //     b                           a
        //    / \                         / \
        //   a   e -> b.rotateRight() -> c   b
        //  / \                             / \
        // c   d                           d   e
        var other = this.left;
        this.left = other.right;
        other.right = this;
        this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
        other.height = Math.max(other.leftHeight, this.height) + 1;
        return other;
    };
    Node.prototype.rotateLeft = function () {
        //   a                              b
        //  / \                            / \
        // c   b   -> a.rotateLeft() ->   a   e
        //    / \                        / \
        //   d   e                      c   d
        var other = this.right;
        this.right = other.left;
        other.left = this;
        this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
        other.height = Math.max(this.height, other.rightHeight) + 1;
        return other;
    };
    Object.defineProperty(Node.prototype, "leftHeight", {
        get: function () {
            if (this.left === null) {
                return -1;
            }
            return this.left.height || 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "rightHeight", {
        get: function () {
            if (this.right === null) {
                return -1;
            }
            return this.right.height || 0;
        },
        enumerable: false,
        configurable: true
    });
    return Node;
}());
exports.Node = Node;
//# sourceMappingURL=node.js.map