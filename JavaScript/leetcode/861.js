/**
 * 翻转矩阵后的得分
 *
 * 有一个二维矩阵 A 其中每个元素的值为 0 或 1 。
 * 移动是指选择任一行或列，并转换该行或列中的每一个值：将所有 0 都更改为 1，将所有 1 都更改为 0。
 * 在做出任意次数的移动后，将该矩阵的每一行都按照二进制数来解释，矩阵的得分就是这些数字的总和。
 * 返回尽可能高的分数。
 *
 * 示例：
 * 输入：[[0,0,1,1],[1,0,1,0],[1,1,0,0]]
 * 输出：39
 * 解释：
 * 转换为 [[1,1,1,1],[1,0,0,1],[1,1,1,1]]
 * 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39
 *
 * 提示：
 * 1 <= A.length <= 20
 * 1 <= A[0].length <= 20
 * A[i][j] 是 0 或 1
 */

/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function (A) {
  let map = new Map()
  const row = A.length
  const cow = A[0].length
  const rowMid = Math.ceil(row / 2)
  // 按行循环
  for (let i = 0; i < row; i++) {
    // 案列循环
    for (let j = 0; j < cow; j++) {
      let count = map.get(j) || 0
      // 如果一行的第一列为 0, 则取反
      if (!j && !A[i][j]) {
        A[i] = A[i].map(e => !e)
      }
      map.set(j, count + A[i][j])
    }
  }
  map.forEach((v, k, m) => {
    if (v < rowMid) {
      m.set(k, row - v)
    }
  })
  return Array.from(map.values()).reduce((t, v, i) => (t += Math.pow(2, cow - i - 1) * v), 0)
}

// 贪心算法
var matrixScore2 = function (A) {
  const m = A.length, // 行数
    n = A[0].length // 列数
  let ret = m * (1 << (n - 1)) // 每一列第1项为1的值
  for (let j = 1; j < n; j++) { // 从第2列开始
    let nOnes = 0 // 记录当前行的值
    for (let i = 0; i < m; i++) {
      // 当 第一位 为 0 时, 则取反
      if (A[i][0] === 1) {
        nOnes += A[i][j]
      } else {
        nOnes += 1 - A[i][j] // 如果这一行进行了行反转，则该元素的实际取值为 1 - A[i][j]
      }
    }
    const k = Math.max(nOnes, m - nOnes) // 视为 nOnes 为不反转， m - nOnes 为反转, 哪个大用哪个
    ret += k * (1 << (n - j - 1)) // 当前列的基数 与当前列的数相乘
  }
  return ret
}

let a = [
  [0, 0, 1, 1],
  [1, 0, 1, 0],
  [1, 1, 0, 0]
]
console.log(matrixScore2(a))
