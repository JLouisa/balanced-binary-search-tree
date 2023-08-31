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

class Tree {
  constructor(arr) {
    this.arr = arr;
    // this.root = buildTree();
  }
  root = buildTree();
}
