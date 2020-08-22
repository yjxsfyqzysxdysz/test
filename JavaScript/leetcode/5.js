/**
 * 最长回文子串
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000
 * 回文字-> 上海自来水来自海上 这种
 */

/**
 * 示例 1：
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 *
 * 示例 2：
 * 输入: "cbbd"
 * 输出: "bb"
 */

/**
 * @param {string} s
 * @return {string}
 */
// var longestPalindrome = function (s) {
//   if (!s || s.length < 2) return s
//   let start = 0
//   let end = 0
//   const expandCenter = function (s, l, r) {
//     while (l >= 0 && r < s.length && s[l] === s[r]) {
//       l--
//       r++
//     }
//     return r - l - 1
//   }

//   for (let i = 0; i < s.length; i++) {
//     let len = Math.max(expandCenter(s, i, i), expandCenter(s, i, i + 1)) // 中心点位奇数 比如: aabaa 中心在偶数 比如: aabbcc
//     if (len > end - start) {
//       start = i - Math.floor((len - 1) / 2)
//       end = i + Math.floor(len / 2)
//     }
//   }
//   return s.substring(start, end + 1)
// }

// 中心扩展法
function longestPalindrome(s) {
  if (s.length <= 1) return s
  let res = []
  for (let i = 1; i < 2 * (s.length - 1); i++) {
    let start, end
    if (i % 2) {
      start = i / 2 - 0.5
      end = i / 2 + 0.5
    } else {
      start = i / 2 - 1
      end = i / 2 + 1
    }
    // 先判断在执行
    while (start >= 0 && end < s.length && s[start] === s[end]) {
      start--
      end++
    }
    ++start
    if (start <= end - 1 && (!res.length || res[1] - res[0] < end - start)) {
      res = [start, end]
    }
  }
  return res.length ? s.slice(...res) : s[0]
}

const a = longestPalindrome('abba')
console.log(a)
