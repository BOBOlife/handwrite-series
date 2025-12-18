function Node (value) {
    this.value = value;
    this.next = null;
    this.prev = null;
}

const node1 = new Node(1)
const node2 = new Node(2)
const node3 = new Node(3)
const node4 = new Node(4)
const node5 = new Node(5)

node1.next = node2
node2.prev = node1
node2.next = node3
node3.prev = node2
node3.next = node4
node4.prev = node3
node4.next = node5
node5.prev = node4

// 双向链表的优点，无论给出的哪个优点，都能对整个链表进行遍历
// 双向链表的缺点，比较耗费空间，而且构建双向链表比较复杂
