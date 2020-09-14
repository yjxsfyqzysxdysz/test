// tree_binaryTree.js
// 二叉树

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

const Stackfn = function () {
  this.arr = []
  this.get = function () {
    return this.arr
  }
  this.size = function () {
    return this.arr.length
  }
  this.clear = function () {
    this.arr = []
    return this.size()
  }
  this.push = function (val) {
    if (Array.isArray(val)) {
      this.arr.push(...val)
    } else if (val !== undefined && val !== null) {
      this.arr.push(val)
    }
    return this.arr
  }
  this.pop = function () {
    return this.arr.pop()
  }
  this.peek = function () {
    if (!this.size()) return
    return this.arr[this.size() - 1]
  }
  this.isEmpty = function () {
    return !this.size()
  }
}

const Tree = function () {
  let root = null
  // 插入
  const insertNode = function (node, newNode) {
    if (newNode.value > node.value) {
      // 往右走
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    } else if (newNode.value < node.value) {
      // 往左走
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    }
  }
  this.insert = function (value) {
    let newNode = new Node(value)
    if (!root) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
    newNode = null
  }
  // 搜索
  this.search = function (callback) {
    let stack = new Stackfn()
    let res, current
    function traverse(node) {
      if (!node) return
      stack.push(node)
      if (node.left !== null) {
        traverse(node.left)
      }
      if (node.right !== null) {
        traverse(node.right)
      }
      if (callback(node.value)) {
        for (let i = 0; i < stack.size(); i++) {
          if (!res) {
            res = new Node(stack.get()[i].value)
          }
          if (!i) {
            current = res
          } else if (i) {
            const status = stack.get()[i - 1].left.value === stack.get()[i].value ? 'left' : 'right'
            if (!current[status]) {
              if (i === stack.size() - 1) {
                current[status] = stack.get()[i]
              } else {
                current[status] = new Node(stack.get()[i].value)
              }
            }
            current = current[status]
          }
        }
        // 查到就不再往下查找了
        // stack.pop()
        // return
      }
      stack.pop()
    }
    traverse(root)
    stack = null
    current = null
    return res
  }
  // 删除
  const removeNode = function (node, key) {
    if (!node) return null
    if (node.value < key) {
      node.right = removeNode(node.right, key)
      return node
    } else if (node.value > key) {
      node.left = removeNode(node.left, key)
      return node
    } else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      } else if (node.left === null) {
        node = node.left
        return node
      } else if (node.right === null) {
        node = node.right
        return node
      }
      let aux = extremum(node.right, 'left')
      node.value = aux.value
      node.right = removeNode(node.right, aux.value)
      aux = null
      return node
    }
  }
  this.remove = function (value) {
    root = removeNode(root, value)
  }
  // 遍历节点
  const traverse = function (node, callback) {
    if (!node) return
    // callback(node.left) // 前序遍历
    traverse(node.left, callback)
    // callback(node.left) // 中序遍历
    traverse(node.right, callback)
    callback(node.left) // 后序遍历
  }
  this.traverse = function (callback) {
    traverse(root, callback)
  }
  // 极值
  const extremum = function (node, state, isNode = true) {
    if (!node) return
    while (node && node[state]) {
      node = node[state]
    }
    return isNode ? node : node.value
  }
  // 最小值
  this.min = function () {
    return extremum(root, 'left', false)
  }
  // 最大值
  this.max = function () {
    return extremum(root, 'right', false)
  }
  this.getRoot = function () {
    return root
  }
}

const t = new Tree()
;[8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15].forEach(e => {
  t.insert(e)
})
// console.log(t.getRoot())
console.log(
  t.search(e => {
    return e < 9
  })
)
