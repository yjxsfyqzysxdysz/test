// 斐波那契数
/**
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 * F(0) = 0, F(1) = 1
 * F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 * 给定 N，计算 F(N)。
 *
 * 示例 1：
 * 输入：2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1.
 *
 * 示例 2：
 * 输入：3
 * 输出：2
 * 解释：F(3) = F(2) + F(1) = 1 + 1 = 2.
 *
 * 示例 3：
 * 输入：4
 * 输出：3
 * 解释：F(4) = F(3) + F(2) = 2 + 1 = 3.
 *
 * 提示：0 ≤ N ≤ 30
 */

/**
 * @param {number} N
 * @return {number}
 */
// var fib = function(N) {
    // if (N <= 1) return N;
    // let f = 0
    // let s = 1
    // for (let i = 0; i < N - 1; i++) {
    //   let sum = f + s
    //   f = s
    //   s = sum
    // }
    // return s
// };

var fib = function (N) {
  let map = {
    0: 0,
    1: 1,
  }
  function fn(n) {
    if (map.hasOwnProperty(n) && map[n] >= 0) {
      return map[n]
    }
    map[n] = map[n - 1] + map[n - 2]
    return fn(n - 1) + fn(n - 2)
  }
  map[N] = fn(N)
  return map[N]
}
console.log(fib(10))
