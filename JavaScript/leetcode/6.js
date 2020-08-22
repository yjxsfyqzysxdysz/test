/**
 * Z 字形变换
 * 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。
 * 比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：
 * L   C   I   R
 * E T O E S I I G
 * E   D   H   N
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。
 * 请你实现这个将字符串进行指定行数变换的函数：
 * string convert(string s, int numRows);
 */

 /**
  * 示例 1:
  * 输入: s = "LEETCODEISHIRING", numRows = 3
  * 输出: "LCIRETOESIIGEDHN"
  * 
  * 示例 2:
  * 输入: s = "LEETCODEISHIRING", numRows = 4
  * 输出: "LDREOEIIECIHNTSG"
  * 解释:
  * L     D     R
  * E   O E   I I
  * E C   I H   N
  * T     S     G
  */

  /**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
// var convert = function(s, numRows) {
//   if (numRows === 1) return s
//   let arr = JSON.parse(JSON.stringify(Array(numRows).fill(new Array())))
//   const n = 2 * numRows - 2
//   for (let i = 0; i < s.length; i++) {
//     const index = i % n
//     arr[Math.min(index, n - index)].push(s[i])
//   }
//   return JSON.stringify(arr)
//     .replace(/(\],\[)|(",")|[\[\]\"]/g, '')
// };
var convert = function (s, numRows) {
  if (numRows === 1) return s
  const rows = new Array(numRows).fill('')
  const n = 2 * numRows - 2
  for (let i = 0; i < s.length; i++) {
    const index = i % n
    rows[Math.min(index, n - index)] += s[i]
  }
  return rows.join('')
}

console.log(convert('PAYPALISHIR,ING', 3))