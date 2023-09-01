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

//!List
//Index 0 - 13
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
// console.log(binaryTree);
// console.log(binaryTree.root);
// console.log("Insert: ");
// console.log(binaryTree.insert(90));
// console.log(binaryTree.insert(6));
// console.log(binaryTree.insert(10));
// console.log(binaryTree.delete());
// console.log(binaryTree.delete(4));
// console.log(binaryTree.find(67));

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

//* Case 1: Delete leaf Nodes
// No problem deleting node. Parent will reference to null

//* Case 2: Delete Node with one child
// Parent node needs to point to grandchild node

//* Case 3: Delete Node with two child
// Parent node needs to point to the most left grandchild node

// //! Pseudo Code
// previous --> target.rightNode.mostLeftNode
// target.rightNode.mostLeftNode --> target.leftNode
// target.rightNode --> target.rightNode.leftNode.mostRightNode
