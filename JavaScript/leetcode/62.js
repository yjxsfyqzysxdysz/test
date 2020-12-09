/**
 * 不同路径
 *
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 问总共有多少条不同的路径？
 *
 * 示例 1:
 * 输入: m = 3, n = 2
 * 输出: 3
 * 解释:
 * 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向右 -> 向下
 * 2. 向右 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向右
 *
 * 示例 2:
 * 输入: m = 7, n = 3
 * 输出: 28
 *
 * 提示：
 * 1 <= m, n <= 100
 * 题目数据保证答案小于等于 2 * 10 ^ 9
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

/**
 * 数学法
 * 从左上角到右下角的过程中，我们需要移动 m+n-2 次，其中有 m-1 次向下移动，n-1 次向右移动。因此路径的总数，就等于从 m+n-2 次移动中选择 m-1 次向下移动的方案数，即组合数：
 * C(m - 1, m + n - 2) = (m + n - 2)! / ((m - 1)! * (n - 1)!)
 */
var uniquePaths = function (m, n) {
  let ans = 1
  for (let x = n, y = 1; y < m; x++, y++) {
    ans = Math.floor((ans * x) / y)
  }
  return ans
}

var uniquePaths2 = function (m, n) {
  const f = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 每一列的第一项 即 第一行的所有项 均为1
  for (let i = 0; i < m; i++) {
    f[i][0] = 1
  }
  // 第一例的每一项 均为1
  for (let j = 0; j < n; j++) {
    f[0][j] = 1
  }
  // f[i][j] = f[i - 1][j] + f[i][j - 1]
  // 表示f[0][0]到f[i][j]的可能性
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[i][j] = f[i - 1][j] + f[i][j - 1]
    }
  }
  return f[m - 1][n - 1]
  // 0: [1, 1, 1]
  // 1: [1, 2, 3]
  // 2: [1, 3, 6]
  // 3: [1, 4, 10]
  // 4: [1, 5, 15]
  // 5: [1, 6, 21]
  // 6: [1, 7, 28]
}

let m = 7,
  n = 3
console.log(uniquePaths2(m, n))
