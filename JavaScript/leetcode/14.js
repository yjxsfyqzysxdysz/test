/**
 * 最长公共前缀
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1:
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 *
 * 示例 2:
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 * 说明:
 *
 * 所有输入只包含小写字母 a-z 。
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
// var longestCommonPrefix = function (strs) {
//   /**
//    * 外层循环 循环字母
//    * 内层循环 循环每一项
//    */
//   const len = strs.length
//   if (!len) {
//     return ''
//   } else if (!(len >> 1)) {
//     return strs[0]
//   }
//   let index = 0
//   while (index >= 0) {
//     if (!strs[0][index]) return strs[0].slice(0, index)
//     for (let i = 0; i < len; i++) {
//       if (!strs[i] || strs[i][index] !== strs[0][index]) {
//         return strs[i].slice(0, index) || ''
//       }
//     }
//     index++
//   }
// }

var longestCommonPrefix = function (strs) {
  let len = strs.length
  if (!len) return ''
  let s1 = strs[0]
  for (let i = 0; i < s1.length; i++) {
    let temp = s1[i]
    for (let j = 0; j < len; j++) {
      if (temp !== strs[j][i]) {
        return s1.substring(0, i)
      }
    }
  }
  return s1
}

const res = longestCommonPrefix(['flower', 'flow', 'flight'])
console.log(res)
