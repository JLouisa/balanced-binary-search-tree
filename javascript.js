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
console.log(binaryTree);
console.log(binaryTree.root);
console.log("Insert: ");
console.log(binaryTree.insert(90));
console.log(binaryTree.delete());

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
  } else if (data === next.data && next.rightNode === null && next.leftNode === null) {
    console.log("Here on true");
    _node.rightNode = null;
    _node.leftNode = null;
    return;
  } else if (data === next.data && next.data > _node.data && next.rightNode !== null) {
    deleteInnerRight(_node, next);
  } else if (data === next.data && next.data < _node.data && next.leftNode !== null) {
    deleteInnerLeft(_node, next);
  } else {
    if (data > next.data) {
      _node = next;
      deleteSpot(data, _node, next.rightNode);
    } else if (data < next.data) {
      _node = next;
      deleteSpot(data, _node, next.leftNode);
    }
  }
}

function deleteInnerRight(_node, next) {
  _node.rightNode = next.leftNode;
  if (next.rightNode !== null) {
    let rightSpot = next.leftNode.rightNode;
    while (rightSpot.rightNode !== null) {
      rightSpot = rightSpot.rightNode;
    }
    console.log(next.rightNode);
    console.log(rightSpot);
    console.log(rightSpot.rightNode);
    rightSpot.rightNode = next.rightNode;
  }
}

function deleteInnerLeft(_node, next) {
  console.log(`Head Node: ${_node.data}`);
  _node.leftNode = next.leftNode;
  if (next.rightNode !== null) {
    let rightSpot = next.leftNode.rightNode;
    while (rightSpot.rightNode !== null) {
      rightSpot = rightSpot.rightNode;
    }
    rightSpot.rightNode = next.rightNode;
  }
}
