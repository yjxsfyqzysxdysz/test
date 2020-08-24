/**
 * 重复的子字符串
 * 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
 *
 * 示例 1:
 * 输入: "abab"
 * 输出: True
 * 解释: 可由子字符串 "ab" 重复两次构成。
 *
 * 示例 2:
 * 输入: "aba"
 * 输出: False
 *
 * 示例 3:
 * 输入: "abcabcabcabc"
 * 输出: True
 * 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
// var repeatedSubstringPattern = function(s) {
//     // return (s + s).slice(1, -1).indexOf(s) != -1
//     // return /^(\w+)\1+$/.test(s)
// };
// 递归枚举
// var repeatedSubstringPattern = function (s) {
//   const len = s.length
//   for (let i = 0; i <= len / 2; i++) {
//     if (!(len % i)) {
//       let match = true
//       for (let j = i; j < len; ++j) {
//         if (s[j] != s[j - i]) {
//           match = false
//           break
//         }
//       }
//       if (match) {
//         return true
//       }
//     }
//   }
//   return false
// }

/**
 * KMP 算法
 * @param {String} query 最终要查询的
 * @param {String} pattern 匹配项
 */
function kmp(query, pattern) {
  const n = query.length
  const m = pattern.length
  // 创建 prefix 数组
  let fail = new Array(m).fill(-1)
  for (let i = 1; i < m; i++) {
    let j = fail[i - 1]
    while (j !== -1 && pattern[j + 1] !== pattern[i]) {
      j = fail[j]
    }
    if (pattern[j + 1] === pattern[i]) {
      fail[i] = j + 1
    }
  }
  let match = -1
  for (let i = 1; i < n - 1; i++) {
    while (match !== -1 && pattern[match + 1] !== query[i]) {
      match = fail[match]
    }
    if (pattern[match + 1] === query[i]) {
      match++
      // 当校验的长度为匹配项长度时,且其最长公共前缀等于其最长公共后缀时
      if (match === m - 1) {
        return true
      }
    }
  }
  return false
}
var repeatedSubstringPattern = function (s) {
  return kmp(s + s, s)
}
console.log(repeatedSubstringPattern('abcabc'))
