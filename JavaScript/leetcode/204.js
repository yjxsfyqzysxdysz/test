/**
 * 计数质数
 *
 * 统计所有小于非负数 n 的质数的数量
 *
 * 示例 1：
 * 输入：n = 10
 * 输出：4
 * 解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
 *
 * 示例 2：
 * 输入：n = 0
 * 输出：0
 *
 * 示例 3：
 * 输入：n = 1
 * 输出：0
 *
 * 提示：
 * 0 <= n <= 5 * 106
 */

/**
 * @param {number} n
 * @return {number}
 */
// 枚举
var countPrimes = function (n) {
  let num = 0
  const isPrime = x => {
    for (let j = 2; j ** 2 <= x; j++) {
      if (!(x % j)) return false
    }
    return true
  }
  for (let i = 2; i < n; i++) {
    // 仅能被被 1 和 自身 整除的参数
    if (isPrime(i)) num++
  }
  return num
}

// 埃氏筛
// 存在, 2 -> 12,已被标记过，3 -> 再被触发情况
var countPrimes2 = function (n) {
  let res = 0
  let stack = new Array(n).fill(1)
  for (let i = 2; i < n; i++) {
    if (stack[i]) {
      res++
      // i^2 的原因是，在比它小的数 已经将该值修改过了
      for (let j = i ** 2; j < n; j += i) {
        stack[j] ? stack[j]-- : ''
      }
    }
  }
  return res
}

// 线性筛
var countPrimes3 = function (n) {
  const isPrime = new Array(n).fill(1)
  const primes = [] // 质数集合
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      primes.push(i) // 记录质数
    }
    // 不在标记 x 的阶乘数
    // 而是,只标记质数集合中的数与 x 相乘的数
    for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
      isPrime[i * primes[j]] = 0
      if (i % primes[j] === 0) {
        break
      }
    }
  }
  return primes.length
}

let n = 13
console.log(countPrimes3(n))
