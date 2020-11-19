/**
 * 有效的括号
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 有效字符串需满足：
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 *
 * 示例 1:
 * 输入: "()"
 * 输出: true
 *
 * 示例 2:
 * 输入: "()[]{}"
 * 输出: true
 *
 * 示例 3:
 * 输入: "(]"
 * 输出: false
 *
 * 示例 4:
 * 输入: "([)]"
 * 输出: false
 *
 * 示例 5:
 * 输入: "{[]}"
 * 输出: true
 */

/**
 * @param {string} s
 * @return {boolean}
 */
// var isValid = function (s) {
//   let stack = []
//   for (let i = 0; i < s.length; i++) {
//     if ([']', ')', '}'].includes(s[i])) {
//       if (!stack.length) {
//         stack.push(s[i])
//         break
//       } else {
//         if ([1, 2].includes(s[i].charCodeAt() - stack[stack.length - 1].charCodeAt())) {
//           stack.pop()
//         } else {
//           break
//         }
//       }
//     } else if (['[', '(', '{'].includes(s[i])) {
//       stack.push(s[i])
//     }
//   }
//   return !stack.length
// }

var isValid = function (s) {
  const m = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  const stack = []
  for (const k of s) {
    if (m[k]) {
      stack.push(k)
    } else {
      if (k !== m[stack.pop()]) return false
    }
  }
  return !stack.length
}
const a = isValid('}')
console.log(a)

/**
 * unicode 编码
 * ( - 40
 * ) - 41
 * [ - 91
 * ] - 93
 * { - 123
 * } - 125
 */