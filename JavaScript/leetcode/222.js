/**
 * 完全二叉树的节点个数
 *
 * 给出一个完全二叉树，求出该树的节点个数。
 * 说明：
 * 完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。
 * 示例:
 * 输入:
 *     1
 *    / \
 *   2   3
 *  / \  /
 * 4  5 6
 * 输出: 6
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 其用例就不是一个 1~infinity, 而是无需且无序的
// var countNodes = function (root) {
//   if (root === null) {
//     return 0
//   }
//   let level = 0
//   let node = root
//   // 深度优先，获取深度层级
//   while (node.left !== null) {
//     level++
//     node = node.left
//   }
//   console.log('root', root)
//   let low = 1 << level,
//     high = (1 << (level + 1)) - 1,
//     mid
//   while (low < high) {
//     node = root
//     mid = Math.floor((high - low + 1) / 2) + low
//     console.log(low, mid, high, mid.toString(2).slice(1))
//     for (const e of mid.toString(2).slice(1)) {
//       node = +e ? node.right : node.left
//     }
//     console.log('node', node)
//     if (node && node.val && node.val > low) {
//       low = mid
//     } else {
//       high = mid - 1
//     }
//     console.log(low)
//   }
//   return low
// }

var countNodes = function (root) {
  if (root === null) {
    return 0
  }
  return JSON.stringify(root).match(/-?\d+/g).length
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

const exists = (root, level, k) => {
  let bits = 1 << (level - 1)
  let node = root
  while (node !== null && bits > 0) {
    if (!(bits & k)) {
      node = node.left
    } else {
      node = node.right
    }
    bits >>= 1
  }
  return node !== null
}

var countNodess = function (root) {
  if (root === null) {
    return 0
  }
  let level = 0
  let node = root
  // 深度优先，获取深度层级
  while (node.left !== null) {
    level++
    node = node.left
  }
  // 最深一级的节点为2^n~2^(n+1) - 1
  let low = 1 << level,
    high = (1 << (level + 1)) - 1
  // 二分查找法
  while (low < high) {
    const mid = Math.floor((high - low + 1) / 2) + low
    if (exists(root, level, mid)) {
      low = mid
    } else {
      high = mid - 1
    }
  }
  return low
}

function Tree() {
  let root = null
  this.insert = function (val) {
    if (!root) {
      root = new TreeNode(val)
    } else {
      insertNode(new TreeNode(val))
    }
  }
  const insertNode = function (node) {
    let stack = []
    let current = root
    let val = node.val
    while (val - 1) {
      stack.push(val % 2)
      val = Math.floor(val / 2)
    }
    stack.reverse()
    stack.forEach((e, i) => {
      if (i + 1 !== stack.length) {
        current = e ? current.right : current.left
      } else {
        current[e ? 'right' : 'left'] = node
        current = null
      }
    })
  }
  this.get = function () {
    return root
  }
}
let node = new Tree()
for (let i = 1; i < 4; i++) {
  node.insert(i)
}
// console.log(JSON.stringify(node.get(), null, 2))
console.log(countNodes(node.get()))
