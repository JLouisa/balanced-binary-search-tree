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

  insert(data) {
    let node = new Node(data);
    let current = this.root;
    findspot(data, node, current);
  }
  delete(data) {}
}

// let count = 0;
//! Build BST
function buildTree(arr, beginIndex, lastIndex) {
  //   if (count === 20) {
  //     return;
  //   }
  //   console.log(`Begin Index: ${beginIndex}`);
  //   console.log(`Last Index: ${lastIndex}`);

  if (beginIndex > lastIndex) {
    return null;
  } else {
    const mid = Number(Math.floor((beginIndex + lastIndex) / 2));
    // const mid = (beginIndex + lastIndex) / 2;
    // console.log(`Mid: ${mid}`);
    const node = new Node(arr[mid]);
    // count++;
    node.leftNode = buildTree(arr, beginIndex, mid - 1);
    node.rightNode = buildTree(arr, mid + 1, lastIndex);
    return node;
  }
}

function findspot(data, _node, next) {
  if (next === null || next.data === data) {
    return;
  }
  if (data > next.data) {
    if (next.rightNode === null) {
      return (next.rightNode = _node);
    }
    findspot(data, _node, next.rightNode);
  } else if (data < next.data) {
    if (next.leftNode === null) {
      return (next.leftNode = _node);
    }
    findspot(data, _node, next.leftNode);
  }
}

const binaryTree = new Tree(uniqueList, 0, uniqueList.length - 1);
console.log(binaryTree);
console.log(binaryTree.root);
console.log("Insert: ");
console.log(binaryTree.insert(2));

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
