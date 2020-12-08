/**
 * 将数组拆分成斐波那契序列
 *
 * 给定一个数字字符串 S，比如 S = "123456579"，我们可以将它分成斐波那契式的序列 [123, 456, 579]。
 * 形式上，斐波那契式序列是一个非负整数列表 F，且满足：
 * + 0 <= F[i] <= 2^31 - 1，（也就是说，每个整数都符合 32 位有符号整数类型）；
 * + F.length >= 3；
 * + 对于所有的0 <= i < F.length - 2，都有 F[i] + F[i+1] = F[i+2] 成立。
 * 另外，请注意，将字符串拆分成小块时，每个块的数字一定不要以零开头，除非这个块是数字 0 本身。
 * 返回从 S 拆分出来的任意一组斐波那契式的序列块，如果不能拆分则返回 []。
 *
 * 示例 1：
 * 输入："123456579"
 * 输出：[123,456,579]
 *
 * 示例 2：
 * 输入: "11235813"
 * 输出: [1,1,2,3,5,8,13]
 *
 * 示例 3：
 * 输入: "112358130"
 * 输出: []
 * 解释: 这项任务无法完成。
 *
 * 示例 4：
 * 输入："0123"
 * 输出：[]
 * 解释：每个块的数字不能以零开头，因此 "01"，"2"，"3" 不是有效答案。
 *
 * 示例 5：
 * 输入: "1101111"
 * 输出: [110, 1, 111]
 * 解释: 输出 [11,0,11,11] 也同样被接受。
 *
 * 提示：
 * 1 <= S.length <= 200
 * 字符串 S 中只含有数字。
 */

/**
 * @param {string} S
 * @return {number[]}
 */
// 回溯 + 剪枝
var splitIntoFibonacci = function (S) {
  const list = new Array().fill(0)
  backtrack(list, S, S.length, 0, 0, 0)
  return list
}

/**
 * @param {number[]} list 结果
 * @param {string} S 原始数据
 * @param {string} length 原始数据长度
 * @param {string} index 当前下标
 * @param {string} sum 综合
 * @param {string} prev 上一个
 */
const backtrack = (list, S, length, index, sum, prev) => {
  // 校验，下标 === 长度
  if (index === length) return list.length >= 3
  let currLong = 0 // 当前
  // 遍历 length
  // 遍历的顺序为, 哪一组有问题, 则 前一组 + 1位 再进行校验
  for (let i = index; i < length; i++) {
    // 当非第一位是 0 时, 停止循环
    if (i > index && S[index] === '0') break
    // 保存当前长度
    currLong = currLong * 10 + +S[i]
    // 若超过最大限值，则停止循环
    if (currLong > Math.pow(2, 31) - 1) break
    let curr = currLong
    // sum 为 前2个值的和
    // 判定当前项值是否符合
    // 若 < , 则 continue , 进一位继续
    // 若 > , 则 brake , 表明当前项方式不符合 退出当前筛选模式
    if (list.length >= 2) {
      if (curr < sum) {
        continue
      } else if (curr > sum) {
        break
      }
    }
    // 通过校验的加入 list 数组中
    list.push(curr)
    // 校验 判定当前项是否符合
    // 如果符合 则 停止
    // 如果不符合 就 删除该项
    if (backtrack(list, S, length, i + 1, prev + curr, curr)) { // 递归调用
      return true
    } else {
      list.splice(list.length - 1, 1)
    }
  }
  return false
}

console.log(splitIntoFibonacci('123456579'))
