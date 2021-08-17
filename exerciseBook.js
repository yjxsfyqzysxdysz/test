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
 *
 */
function fun2(params) {}
console.log(fun2(params))

/**
 * 二叉树
 */
function fun3(params) {}
console.log(fun3(params))
