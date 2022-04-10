/**
 * length 1 - 1000
 * 每个id 至少 5组值
 * 求每个 id 的最大的5组平均值
 * 入参 []
 * 出参 [[1, ], [2, ]]
 */
const params = []
function fun1(params) {
  const obj = {}
  params.forEach(([id, value]) => {
    if (!obj.hasOwnProperty(id)) {
      obj[id] = [value]
    } else {
      obj[id].push(value)
    }
  })
  let res = []
  for (const key in obj) {
    res.push([
      +key,
      Math.floor(
        obj[key]
          .sort((a, b) => b - a)
          .slice(0, 5)
          .reduce((acc, cur) => acc + cur) / 5
      )
    ])
  }
  return res
}

console.log(fun1(params))

/**
 * 获取非重复项的最大值
 * 否则 返回 -1
 */
function fun2(params) {
  let len = params.sort((a, b) => a - b).length - 1
  while (len) {
    if (params[len] !== params[len - 1]) {
      return params[len]
    }
    len -= 2
  }
  return -1
}
console.log(fun2([5, 4, 6, 5, 7, 1, 8, 2]))

/**
 * 二叉树
 * target 为浮点数
 * 获取 最接近该 target 的 n 个值
 * n <= 二叉树节点数
 */
const tree = {
  value: 4,
  left: {
    value: 2,
    left: {
      value: 1,
      left: null,
      right: null
    },
    right: {
      value: 3,
      left: null,
      right: null
    }
  },
  right: {
    value: 5,
    left: null,
    right: null
  }
}
function fun3(tree, target, n) {
  function searchTree(tree) {
    res.push(tree.value)
    if (tree.left) searchTree(tree.left)
    if (tree.right) searchTree(tree.right)
  }
  let res = []
  searchTree(tree)
  return res.sort((a, b) => Math.abs(a - target) - Math.abs(b - target)).slice(0, n)
}
console.log(fun3(tree, 3.746546, 2))
