/**
 * 拼接最大数
 *
 * 给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n) 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。
 * 求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。
 * 说明: 请尽可能地优化你算法的时间和空间复杂度。
 *
 * 示例 1:
 * 输入:
 * nums1 = [3, 4, 6, 5]
 * nums2 = [9, 1, 2, 5, 8, 3]
 * k = 5
 * 输出:
 * [9, 8, 6, 5, 3]
 *
 * 示例 2:
 * 输入:
 * nums1 = [6, 7]
 * nums2 = [6, 0, 4]
 * k = 5
 * 输出:
 * [6, 7, 6, 0, 4]
 *
 * 示例 3:
 * 输入:
 * nums1 = [3, 9]
 * nums2 = [8, 9]
 * k = 3
 * 输出:
 * [9, 8, 9]
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
var maxNumber = function (nums1, nums2, k) {
  const m = nums1.length,
    n = nums2.length
  const maxSubsequence = new Array(k).fill(0)
  // 使 nums1 最少提供参数数量, 使 nums2 最多提供参数数量
  let start = Math.max(0, k - n), // n 中有多少可剩余的
    end = Math.min(k, m) // m 中能拿出多少
  // 分别从两个数组中得到指定长度的最大子序列
  for (let i = start; i <= end; i++) {
    const subsequence1 = new MaxSubsequence(nums1, i)
    const subsequence2 = new MaxSubsequence(nums2, k - i)
    const curMaxSubsequence = merge(subsequence1, subsequence2)
    if (compare(curMaxSubsequence, 0, maxSubsequence, 0) > 0) {
      maxSubsequence.splice(0, k, ...curMaxSubsequence)
    }
  }
  return maxSubsequence
}

// 获得最大子序列
var MaxSubsequence = function (nums, k) {
  const length = nums.length
  const stack = new Array(k).fill(0)
  let top = -1
  let remain = length - k
  for (let i = 0; i < length; i++) {
    const num = nums[i]
    while (top >= 0 && stack[top] < num && remain > 0) {
      top--
      remain--
    }
    if (top < k - 1) {
      stack[++top] = num
    } else {
      remain--
    }
  }
  return stack
}

// 将两个最大子序列合并
const merge = (subsequence1, subsequence2) => {
  const x = subsequence1.length,
    y = subsequence2.length
  if (x === 0) {
    return subsequence2
  }
  if (y === 0) {
    return subsequence1
  }
  const mergeLength = x + y
  const merged = new Array(mergeLength).fill(0)
  let index1 = 0,
    index2 = 0
  for (let i = 0; i < mergeLength; i++) {
    if (compare(subsequence1, index1, subsequence2, index2) > 0) {
      merged[i] = subsequence1[index1++]
    } else {
      merged[i] = subsequence2[index2++]
    }
  }
  return merged
}

// 比较 大小
const compare = (subsequence1, index1, subsequence2, index2) => {
  const x = subsequence1.length,
    y = subsequence2.length
  while (index1 < x && index2 < y) {
    const difference = subsequence1[index1] - subsequence2[index2]
    if (difference !== 0) {
      return difference
    }
    index1++
    index2++
  }
  return x - index1 - (y - index2)
}

// 自己写的和官方相比，性能差10倍
var maxNumber1 = function (nums1, nums2, k) {
  const len1 = nums1.length,
    len2 = nums2.length,
    // 限定 nums1 和 nums2 能提供参数数量的极值
    start = Math.max(0, k - len2),
    end = Math.min(k, len1)
  // 获取自大子序列
  const maxSubline = function (nums, k) {
    const len = nums.length
    let stack = [],
      resLen = len - k, // 剩余长度
      maxIndex // 指针
    // 遍历每一个参数
    for (let i = 0; i < len; i++) {
      if (stack.length === k) break
      // 当没有 自由空间 后，剩余参数全部加入
      if (!resLen) {
        stack.push(...nums.slice(i))
        break
      }
      maxIndex = i
      for (let j = 1; j <= resLen; j++) {
        if (nums[maxIndex] < nums[j + i]) {
          maxIndex = j + i
        }
      }
      stack.push(nums[maxIndex])
      resLen += i - maxIndex
      i = maxIndex
    }
    return stack
  }
  // 拼接出最大子序列
  const merge = function (nums1, nums2) {
    const len1 = nums1.length,
      len2 = nums2.length,
      maxLen = len1 + len2 // 最大长度
    if (!len1 || !len2) return [].concat(nums1, nums2)
    let stack = []
    let index1 = 0,
      index2 = 0
    for (let i = 0; i < maxLen; i++) {
      if (compare(nums1, nums2, index1, index2)) {
        stack.push(nums2[index2++])
      } else {
        stack.push(nums1[index1++])
      }
    }
    return stack
  }
  // 校验 子序列 与 原序列 大小
  const compare = function (nums1, nums2, index1 = 0, index2 = 0) {
    return nums1.slice(index1).join('') < nums2.slice(index2).join('')
  }

  let res = new Array(k).fill(0),
    curMaxSubline
  console.log('nums1', nums1)
  console.log('nums2', nums2)
  for (let i = start; i <= end; i++) {
    let tmp1 = maxSubline(nums1, i),
      tmp2 = maxSubline(nums2, k - i)
    curMaxSubline = merge(tmp1, tmp2)
    console.log('tmp1', i, tmp1)
    console.log('tmp2', k - i, tmp2)
    console.log('curMaxSubline', curMaxSubline)
    // 校验
    if (compare(res, curMaxSubline)) {
      res = curMaxSubline
    }
  }
  return res
}

let nums1 = [4, 9, 5],
  nums2 = [8, 7, 4],
  k = 3
console.log(maxNumber1(nums1, nums2, k))
