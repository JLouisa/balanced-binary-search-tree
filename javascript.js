// import mergeSortMain from "./mergeSort";
export { sortedList, newList };
import mergeSortMain from "./mergeSort.js";

class Node {
  constructor(data) {
    this.data = data;
    this.leftNode = null;
    this.rightNode = null;
  }
}
//?+++++++++++++++++++++++++++++
const first = new Node(1);
const second = new Node(2);
const third = new Node(3);
const fourth = new Node(4);
const fifth = new Node(5);
second.leftNode = first;
second.rightNode = third;
console.log(first);
console.log(second);
console.log(third);
console.log(fourth);
console.log(fifth);
//?+++++++++++++++++++++++++++++

//Index 0 -13
let sortedList = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let newList = [...mergeSortMain(sortedList)];
console.log(newList);
class Tree {
  constructor(arr) {
    this.arr = arr;
  }
  root = buildTree();
}

function buildTree(arr) {}
