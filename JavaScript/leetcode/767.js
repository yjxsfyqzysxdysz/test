/**
 * 重构字符串
 *
 * 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。
 * 若可行，输出任意可行的结果。若不可行，返回空字符串。
 *
 * 示例 1:
 * 输入: S = "aab"
 * 输出: "aba"
 *
 * 示例 2:
 * 输入: S = "aaab"
 * 输出: ""
 *
 * 注意:
 * S 只包含小写字母并且长度在[1, 500]区间内。
 */

/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function (s) {
  const l = s.length
  if (l === 1) return s
  s = s.split('')
  for (let i = 0; i < l - 1; i++) {
    if (s[i] === s[i + 1]) {
      for (let j = i + 1; j < l; j++) {
        if (i !== j && s[i] !== s[j]) {
          s[i + 1] = s[j]
          s[j] = s[i]
          break
        }
      }
      if (s[i] === s[i + 1]) {
        for (let j = 0; j < i; j++) {
          if (s[j] !== s[i]) {
            if (s[j - 1] !== s[i]) {
              s.splice(j, 0, s[i])
              s.splice(i + 1, 1)
              break
            } else if (s[j + 1] !== s[i]) {
              s.splice(j + 1, 0, s[i])
              s.splice(i + 1, 1)
              break
            }
          }
        }
        if (s[i] === s[i + 1]) return ''
      }
    }
  }
  return s.join('')
}

/**
 * 方法一：基于最大堆的贪心算法
 * 维护最大堆存储字母，堆顶元素为出现次数最多的字母。首先统计每个字母的出现次数，然后将出现次数大于 0 的字母加入最大堆。
 * 当最大堆的元素个数大于 1 时，每次从最大堆取出两个字母，拼接到重构的字符串，然后将两个字母的出现次数分别减 1，并将剩余出现次数大于 0 的字母重新加入最大堆。由于最大堆中的元素都是不同的，因此取出的两个字母一定也是不同的，将两个不同的字母拼接到重构的字符串，可以确保相邻的字母都不相同。
 * 如果最大堆变成空，则已经完成字符串的重构。如果最大堆剩下 1 个元素，则取出最后一个字母，拼接到重构的字符串。
 * 对于长度为 n 的字符串，共有 n/2 次每次从最大堆取出两个字母的操作，当 n 是奇数时，还有一次从最大堆取出一个字母的操作，因此重构的字符串的长度一定是 n。
 * 当 n 是奇数时，是否可能出现重构的字符串的最后两个字母相同的情况？如果最后一个字母在整个字符串中至少出现了 2 次，则在最后一次从最大堆取出两个字母时，该字母会先被选出，因此不会成为重构的字符串的倒数第二个字母，也不可能出现重构的字符串最后两个字母相同的情况。
 * 因此，在重构字符串可行的情况下，基于最大堆的贪心算法可以确保得到正确答案。
 */

var reorganizeString1 = function (S) {
  const len = S.length
  if (len < 2) return S
  const aCode = (() => 'a'.charCodeAt())()
  const getIdx = c => c.charCodeAt() - aCode
  let counts = []
  for (let i = 0; i < len; i++) {
    const c = S.charAt(i)
    if (counts[getIdx(c)]) {
      counts[getIdx(c)].num++
    } else {
      counts[getIdx(c)] = {
        val: c,
        num: 1
      }
    }
  }
  counts = counts.filter(e => e)
  let res = ''
  while (counts.length) {
    if (counts.length >> 1) {
      // > 1
      counts = counts.sort((a, b) => b.num - a.num)
      if (!res && counts[0].num > Math.floor((len + 1) / 2)) return ''
      res += counts[0].val
      counts[0].num--
      res += counts[1].val
      counts[1].num--
    } else {
      // = 1
      res += counts[0].val
      counts[0].num--
      if (counts[0].num) return ''
    }
    counts = counts.filter(e => e.num)
  }
  return res
}

/**
 * 方法二：基于计数的贪心算法
 * 首先统计每个字母的出现次数，然后根据每个字母的出现次数重构字符串。
 * 当 n 是奇数且出现最多的字母的出现次数是 (n+1)/2 时，出现次数最多的字母必须全部放置在偶数下标，否则一定会出现相邻的字母相同的情况。其余情况下，每个字母放置在偶数下标或者奇数下标都是可行的。
 * 维护偶数下标 evenIndex 和奇数下标 oddIndex，初始值分别为 0 和 1。遍历每个字母，根据每个字母的出现次数判断字母应该放置在偶数下标还是奇数下标。
 * 首先考虑是否可以放置在奇数下标。根据上述分析可知，只要字母的出现次数不超过字符串的长度的一半（即出现次数小于或等于 n/2），就可以放置在奇数下标，只有当字母的出现次数超过字符串的长度的一半时，才必须放置在偶数下标。字母的出现次数超过字符串的长度的一半只可能发生在 n 是奇数的情况下，且最多只有一个字母的出现次数会超过字符串的长度的一半。
 * 因此通过如下操作在重构的字符串中放置字母。
 * + 如果字母的出现次数大于 0 且小于或等于 n/2，且 oddIndex 没有超出数组下标范围，则将字母放置在 oddIndex，然后将 oddIndex 的值加 2。
 * + 如果字母的出现次数大于 n/2，或 oddIndex 超出数组下标范围，则将字母放置在 evenIndex，然后将 evenIndex 的值加 2。
 * 如果一个字母出现了多次，则重复上述操作，直到该字母全部放置完毕。
 * 那么上述做法是否可以确保相邻的字母都不相同？考虑以下三种情况。
 * + 如果 n 是奇数且存在一个字母的出现次数为 (n+1)/2，则该字母全部被放置在偶数下标，其余的 (n−1)/2 个字母都被放置在奇数下标，因此相邻的字母一定不相同。
 * + 如果同一个字母全部被放置在奇数下标或全部被放置在偶数下标，则该字母不可能在相邻的下标出现。
 * + 如果同一个字母先被放置在奇数下标直到奇数下标超出数组下标范围，然后被放置在偶数下标，由于该字母的出现次数不会超过 n/2，因此该字母的最小奇数下标与最大偶数下标之差不小于 3，不可能在相邻的下标出现。证明如下：
 * + + 当 n 是偶数时，如果该字母的出现次数为 n/2，包括 p 个奇数下标和 q 个偶数下标，满足 p+q=n/2，最小奇数下标是 n−2p+1，最大偶数下标是 2(q−1)，最小奇数下标与最大偶数下标之差为：
 *   (n-2p+1)-2(q-1)
 *   = n-2p+1-2q+2
 *   = n-2(p+q)+3
 *   = n-2*(n/2)+3
 *   = n-n+3
 *   = 3
 * + + 当 n 是奇数时，如果该字母的出现次数为 (n−1)/2，包括 p 个奇数下标和 q 个偶数下标，满足 p+q=(n−1)/2，最小奇数下标是 n−2p，最大偶数下标是 2(q−1)，最小奇数下标与最大偶数下标之差为：
 *   (n−2p)−2(q−1)
 *   = n−2p−2q+2
 *   = n−2(p+q)+2
 *   = n−2×(n−1)/2+2
 *   = n−(n−1)+2
 *   = 3
 * 因此，在重构字符串可行的情况下，基于计数的贪心算法可以确保相邻的字母都不相同，得到正确答案。
 */

var reorganizeString2 = function (S) {
  const len = S.length
  if (len < 2) return S
  const aCode = (() => 'a'.charCodeAt())()
  const getIdx = c => c.charCodeAt() - aCode
  const getAlpha = c => String.fromCharCode(aCode + c)
  const counts = new Array(26).fill(0)
  let maxCount = 0 // 同字母出现最多的次数
  for (let i = 0; i < len; i++) {
    const c = S.charAt(i)
    counts[getIdx(c)]++
    maxCount = Math.max(maxCount, counts[getIdx(c)])
  }
  // 如果某字母出现的次数大于最大间隔数 则返回空字符串
  if (maxCount > Math.floor((len + 1) / 2)) return ''
  // 操作数组
  const reorganizeArray = new Array(len)
  let evenIndex = 0, // 偶数下标
    oddIndex = 1 // 奇数下标
  const halfLength = Math.floor(len / 2) // 中数
  for (let i = 0; i < 26; i++) {
    const c = getAlpha(i)
    /**
     * 如果 (codeNums > 0 && codeNums <= n/2 && oddIndex < len, 则将字母放置在 oddIndex，然后将 oddIndex 的值加 2
     * 如果 (codeNums > n/2 || !oddIndex < len), 则将字母放置在 evenIndex，然后将 evenIndex 的值加 2
     */
    while (counts[i] && counts[i] <= halfLength && oddIndex < len) {
      reorganizeArray[oddIndex] = c
      counts[i]--
      oddIndex += 2
    }
    while (counts[i] > 0) {
      reorganizeArray[evenIndex] = c
      counts[i]--
      evenIndex += 2
    }
  }
  return reorganizeArray.join('')
}

console.log(reorganizeString1('abbabbaaab'))
