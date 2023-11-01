/**
 * 树形结构 - 有向无环图
 * 树是图的一种
 *
 * 树形结构有一个根节点
 * 树形结构没有回路
 * 叶子节点：下面没有其它节点
 * 节点：既不是根节点，又不是叶子节点的普通节点
 * 树的度：这棵树最多叉的节点有多少个叉，这棵树的度就是多少个
 * 树的深度：树最多有几层，树的深度就为几
 *
 *
 * */

// 二维拓扑  图的节点
function Node0(value) {
    this.value = value
    this.neighbors = [] // 放其它节点的地址
}

// 传递二叉树要传递根节点
// 二叉树的节点
function Node1(value) {
    this.value = value
    this.left = null
    this.right = null
}

const a = new Node1('a')
const b = new Node1('b')
const c = new Node1('c')
const d = new Node1('d')
const e = new Node1('e')
const f = new Node1('f')
const g = new Node1('g')

a.left = c
a.right = b
c.left = f
c.right = g
b.left = d
b.right = e

// 前序遍历  先打印当前的 再打印左边的 再打印右边的
function preOrder(root) {
    if (!root) return
    console.log(root.value)
    preOrder(root.left)
    preOrder(root.right)
}

preOrder(a)

// 中序遍历 先打印左边的 再打印当前的 再打印右边的
function middleOrder(root) {
    if (!root) return
    middleOrder(root.left)
    console.log(root.value)
    middleOrder(root.right)
}

// 后续遍历 先打印左边的 再打印右边的 再打印当前的
function postOrder(root) {
    if (!root) return
    postOrder(root.left)
    postOrder(root.right)
    console.log(root.value)
}

/**
 * 1、给出二叉树，写出前序中序后续遍历
 * 2、写出前序中序后序遍历的代码
 * 3、给出前序中序还原出二叉树，要求写出后序遍历
 * 4、给出后序中序还原二叉树，要求写出前序遍历
 * 5、如何用代码来还原二叉树
 *
 * tip：必须有中序才能还原出二叉树，只有前序和后序还原不了
 * */

//前序中序 还原
const pre = ['a', 'c', 'f', 'g', 'b', 'd', 'e']
const mid = ['f', 'c', 'g', 'a', 'd', 'b', 'e']


function Node2(value) {
    this.value = value
    this.left = null
    this.right = null
}

function f1(pre, mid) {
    if (pre === null || mid === null || pre.length === 0 || mid.length === 0) return null
    const root = new Node2(pre[0])
    const index = mid.indexOf(root.value) // 找到根节点在中序遍历中的位置
    const preLeft = pre.slice(1, 1 + index) // 前序遍历的的左子树
    const preRight = pre.slice(1 + index, pre.length) // 前序遍历的右子树
    const midLeft = mid.slice(0, index) // 中序遍历左子树
    const midRight = mid.slice(index + 1, mid.length) // 中序遍历右子树
    root.left = f1(preLeft, midLeft) //根据左子树的前序和中序还原左子树并赋值给root.left
    root.right = f1(preRight, midRight)
    return root

}

console.log('前中还原>>>',f1(pre, mid));

//后序中序 还原

const post = ['f', 'g', 'c', 'd', 'e', 'b', 'a']

function f2(mid, post) {
    if (mid === null || post === null || mid.length === 0 || post.length === 0) return null
    const root = new Node2(post[post.length - 1])
    const index = mid.indexOf(root.value) // 找到根节点在中序遍历中的位置
    const midLeft = mid.slice(0, index) // 中序遍历左子树
    const midRight = mid.slice(index + 1, mid.length) // 中序遍历右子树
    const postLeft = post.slice(0, index) // 后序遍历左子树
    const postRight = post.slice(index, post.length - 1) // 后序遍历右子树
    root.left = f2(midLeft, postLeft)
    root.right = f2(midRight, postRight)
    return root
}

console.log('中后还原>>>',f2(mid, post));
