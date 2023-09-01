import mergeSortMain from "./mergeSort.js";
export { uniqueList, newList };

//! class Node
class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
}

//!Lists
let sortedList = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let sortedList = [72, 18, 89, 47, 36, 63, 81, 5, 94, 12, 55, 30, 76, 60, 99, 22, 44, 7, 70, 3];
// let sortedList = [
//   257, 92, 421, 146, 368, 44, 482, 191, 329, 75, 203, 417, 89, 294, 56, 398, 127, 358, 14, 263, 33, 488, 68, 236, 109,
// ];
let newList = [...mergeSortMain(sortedList)];

// Index 0 - 10
// Remove duplicates
let uniqueList = [];
newList.forEach((num) => {
  if (!uniqueList.includes(num)) {
    uniqueList.push(num);
  }
});

console.log(uniqueList);
class Tree {
  constructor(_arr, _beginIndex, _lastIndex) {
    this.root = buildTree(_arr, _beginIndex, _lastIndex);
  }
  static findspot(data, _node, next) {
    if (next === null || next.data === data) {
      return;
    }
    if (data > next.data) {
      if (next.rightNode === null) {
        return (next.rightNode = _node);
      }
      this.findspot(data, _node, next.rightNode);
    } else if (data < next.data) {
      if (next.leftNode === null) {
        return (next.leftNode = _node);
      }
      this.findspot(data, _node, next.leftNode);
    }
  }
  //! Find Value
  static findTheValue(data, current) {
    if (current === null) {
      return null;
    }
    if (current.data === data) {
      return current;
    } else if (current.data > data) {
      current = current.leftNode;
      return this.findTheValue(data, current);
    } else {
      current = current.rightNode;
      return this.findTheValue(data, current);
    }
  }
  static getInOrder(item, arr) {
    if (item === null) {
      return;
    } else {
      this.getInOrder(item.leftNode, arr);
      arr.push(item.data);
      this.getInOrder(item.rightNode, arr);
      return arr;
    }
  }
  static getPreOrder(item, arr) {
    if (item === null) {
      return;
    } else {
      arr.push(item.data);
      this.getPreOrder(item.leftNode, arr);
      this.getPreOrder(item.rightNode, arr);
      return arr;
    }
  }
  static getPostOrder(item, arr) {
    if (item === null) {
      return;
    } else {
      this.getPostOrder(item.leftNode, arr);
      this.getPostOrder(item.rightNode, arr);
      arr.push(item.data);
      return arr;
    }
  }
  static getHeight(item) {
    if (item === null) {
      return -1;
    }
    return Math.max(this.getHeight(item.leftNode), this.getHeight(item.rightNode)) + 1;
  }
  static getDepth(data, item, plus) {
    if (item === null) {
      return null;
    }
    if (item.data === data) {
      return plus++;
    } else if (item.data > data) {
      item = item.leftNode;
      plus++;
      return this.getDepth(data, item, plus);
    } else {
      item = item.rightNode;
      plus++;
      return this.getDepth(data, item, plus);
    }
  }
  insert(data) {
    let node = new Node(data);
    let current = this.root;
    Tree.findspot(data, node, current);
  }
  delete(data) {
    let temp = null;
    let current = this.root;
    deleteSpot(data, temp, current);
  }
  find(data) {
    let current = this.root;
    return Tree.findTheValue(data, current);
  }
  levelOrder() {
    let current = this.root;
    let traversal = [];
    let queueArrays = [];
    enQueue(current, queueArrays, traversal);
    return traversal;
  }
  inOrder() {
    let current = this.root;
    let traversal = [];
    return Tree.getInOrder(current, traversal);
  }
  preOrder() {
    let current = this.root;
    let traversal = [];
    return Tree.getPreOrder(current, traversal);
  }
  postOrder() {
    let current = this.root;
    let traversal = [];
    return Tree.getPostOrder(current, traversal);
  }
  height(data) {
    let current = this.root;
    return Tree.getHeight(Tree.findTheValue(data, current));
  }
  depth(data) {
    let current = this.root;
    let count = 0;
    return Tree.getDepth(data, current, count);
  }
  isBalanced(data, data2) {
    if (this.height(data) - this.depth(data2) < 2) {
      return "Balanced";
    } else {
      return "Unbalanced";
    }
  }
}

//! Build BST
function buildTree(arr, beginIndex, lastIndex) {
  if (beginIndex > lastIndex) {
    return null;
  } else {
    const mid = Number(Math.floor((beginIndex + lastIndex) / 2));
    const node = new Node(arr[mid]);
    node.leftNode = buildTree(arr, beginIndex, mid - 1);
    node.rightNode = buildTree(arr, mid + 1, lastIndex);
    return node;
  }
}

const binaryTree = new Tree(uniqueList, 0, uniqueList.length - 1);

//! Visualize the tree in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(binaryTree.root);

function deleteSpot(data, _node, next) {
  if (next === null) {
    return console.log("not found");
  } //* Case 1: Delete leaf Nodes
  else if (data === next.data && next.rightNode === null && next.leftNode === null) {
    _node.rightNode = null;
    _node.leftNode = null;
    return;
  }
  //* Case 2: Delete Node with one child
  else if (data === next.data && next.rightNode !== null && next.leftNode === null) {
    deleteOneChild(_node, next, next.rightNode);
  } else if (data === next.data && next.leftNode !== null && next.rightNode === null) {
    deleteOneChild(_node, next, next.leftNode);
  }
  //* Case 3: Delete Node with two child
  else if (data === next.data && next.leftNode !== null && next.rightNode !== null) {
    deleteTwoChild(_node, next, next.leftNode, next.rightNode);
  }
  //* Recurse for to find data
  else {
    if (data > next.data) {
      _node = next;
      deleteSpot(data, _node, next.rightNode);
    } else if (data < next.data) {
      _node = next;
      deleteSpot(data, _node, next.leftNode);
    }
  }
}
// if (data === next.data && next.data > _node.data && next.rightNode !== null)
function deleteOneChild(_node, next, child) {
  if (next.data > _node.data) {
    _node.rightNode = child;
    next.leftNode = null;
    next.right = null;
    return;
  } else {
    _node.leftNode = child;
    next.leftNode = null;
    next.right = null;
    return;
  }
}

// if (data === next.data && next.leftNode !== null && next.rightNode !== null)
function deleteTwoChild(_node, _target, _childLeft, _childRight) {
  if (_target.data > _node.data) {
    _node.rightNode = null;
    _node.rightNode = _childRight;
    _childRight.leftNode = _childLeft;
    _target.leftNode = null;
    _target.rightNode = null;
    return;
  } else if (_target.data < _node.data) {
    nodeParent = _node.leftNode;
    _node.leftNode = null;
    _node.leftNode = _childRight;
    _childRight.leftNode = _childLeft;
    _target.leftNode = null;
    _target.rightNode = null;
    return;
  } else {
    let currentChildLeft = _childRight;
    console.log("Right Child: ");
    console.log(_childRight);
    console.log(_childRight.leftNode);
    console.log(_childRight.leftNode.leftNode);
    if (_childRight.leftNode === null) {
      nodeParent = _childRight;
      console.log("here");
    } else {
      while (currentChildLeft.leftNode !== null) {
        currentChildLeft = currentChildLeft.leftNode;
      }
      nodeParent = currentChildLeft;
      currentChildLeft.leftNode = _childLeft;
    }
    // ^^Works^^
    let currentChildRight = currentChildLeft;
    while (currentChildRight.rightNode !== null) {
      currentChildRight = currentChildRight.rightNode;
    }
    currentChildLeft.rightNode = _childRight;
    _childRight.leftNode = null;
    return;
  }
}

function enQueue(item, arr, dPArr) {
  dPArr.push(item.data);
  if (item.leftNode === null) {
    //Do nothing
  } else {
    arr.push(item.leftNode);
  }
  if (item.rightNode === null) {
    //Do nothing
  } else {
    arr.push(item.rightNode);
  }
  console.log(arr);
  deQueue(arr, dPArr);
  return arr;
}

function deQueue(queueArray, displayArray) {
  while (queueArray.length > 0) {
    enQueue(queueArray.shift(), queueArray, displayArray);
  }
  return displayArray;
}

// console.log(binaryTree.levelOrder());

console.log(binaryTree.inOrder());
console.log(binaryTree.postOrder());
console.log(binaryTree.preOrder());
console.log(binaryTree.find(67));
console.log(binaryTree.height(8));
console.log(binaryTree.depth(8));
console.log(binaryTree.isBalanced(8, 3));

//! Create new Balanced tree
function reBalance(newTree) {
  let nwArray = binaryTree.inOrder();
  newTree = new Tree(nwArray, 0, nwArray.length - 1);
  return newTree;
}

prettyPrint(reBalance("theTree").root);
