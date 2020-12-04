/**
 * 分割数组为连续子序列
 *
 * 给你一个按升序排序的整数数组 num（可能包含重复数字）,请你将它们分割成一个或多个子序列,其中每个子序列都由连续整数组成且长度至少为 3 。
 * 如果可以完成上述分割,则返回 true ；否则,返回 false 。
 *
 * 示例 1：
 * 输入: [1,2,3,3,4,5]
 * 输出: True
 * 解释:
 * 你可以分割出这样两个连续子序列 :
 * 1, 2, 3
 * 3, 4, 5
 *
 * 示例 2：
 * 输入: [1,2,3,3,4,4,5,5]
 * 输出: True
 * 解释:
 * 你可以分割出这样两个连续子序列 :
 * 1, 2, 3, 4, 5
 * 3, 4, 5
 *
 * 示例 3：
 * 输入: [1,2,3,4,4,5]
 * 输出: False
 *
 * 提示：
 * 输入的数组长度范围为 [1, 10000]
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */

//  哈希表 + 最小堆
// var isPossible = function (nums) {
//   const map = new Map()
//   for (let x of nums) {
//     if (!map.has(x)) {
//       map.set(x, new MinPriorityQueue()) // 最小堆算法？
//     }
//     if (map.has(x - 1)) {
//       const prevLength = map.get(x - 1).dequeue()['priority']
//       if (map.get(x - 1).isEmpty()) {
//         map.delete(x - 1)
//       }
//       map.get(x).enqueue(x, prevLength + 1)
//     } else {
//       map.get(x).enqueue(x, 1)
//     }
//   }
//   for (let [key, value] of map.entries()) {
//     if (value.front()['priority'] < 3) {
//       return false
//     }
//   }
//   return true
// }

/**
 * 贪心算法
 * 
 * 对于数组中的元素 x,如果存在一个子序列以 x-1 结尾,则可以将 x 加入该子序列中。将 x 加入已有的子序列总是比新建一个只包含 x 的子序列更优,因为前者可以将一个已有的子序列的长度增加 1,而后者新建一个长度为 1 的子序列,而题目要求分割成的子序列的长度都不小于 3,因此应该尽量避免新建短的子序列。
 * 基于此,可以通过贪心的方法判断是否可以完成分割。
 * 使用两个哈希表,第一个哈希表存储数组中的每个数字的剩余次数,第二个哈希表存储数组中的每个数字作为结尾的子序列的数量。
 * 初始时,每个数字的剩余次数即为每个数字在数组中出现的次数,因此遍历数组,初始化第一个哈希表。
 * 在初始化第一个哈希表之后,遍历数组,更新两个哈希表。只有当一个数字的剩余次数大于 0 时,才需要考虑这个数字是否属于某个子序列。假设当前元素是 x,进行如下操作。
 *  + 首先判断是否存在以 x-1 结尾的子序列,即根据第二个哈希表判断 x−1 作为结尾的子序列的数量是否大于 0,如果大于 0,则将元素 x 加入该子序列中。由于 x 被使用了一次,因此需要在第一个哈希表中将 x 的剩余次数减 1。又由于该子序列的最后一个数字从 x-1 变成了 x,因此需要在第二个哈希表中将 x-1 作为结尾的子序列的数量减 1,以及将 x 作为结尾的子序列的数量加 1。
 *  + 否则,x 为一个子序列的第一个数,为了得到长度至少为 3 的子序列,x+1 和 x+2 必须在子序列中,因此需要判断在第一个哈希表中 x+1 和 x+2 的剩余次数是否都大于 0。
 *  + + 当 x+1 和 x+2 的剩余次数都大于 0 时,可以新建一个长度为 3 的子序列 [x,x+1,x+2]。由于这三个数都被使用了一次,因此需要在第一个哈希表中将这三个数的剩余次数分别减 1。又由于该子序列的最后一个数字是 x+2,因此需要在第二个哈希表中将 x+2 作为结尾的子序列的数量加 1。
 *  + + 否则,无法得到长度为 3 的子序列 [x,x+1,x+2],因此无法完成分割,返回 false。
 * 如果整个数组遍历结束时,没有遇到无法完成分割的情况,则可以完成分割,返回 true。
 */
var isPossible = function (nums) {
  // 创建 2 Hash Map
  const countMap = new Map() // 存储数组中的每个数字的剩余次数
  const endMap = new Map() // 存储数组中的每个数字作为结尾的子序列的数量
  // 遍历数组 记录每个数字的出现次数
  for (const x of nums) {
    const count = (countMap.get(x) || 0) + 1
    countMap.set(x, count)
  }
  for (const x of nums) {
    // 获取当前项 剩余次数
    const count = countMap.get(x) || 0
    if (count > 0) {
      // 其 x - 1 的值,在记录结尾出现次数中是否存在
      // 若存在 则添加,若不存在 则创建
      const prevEndCount = endMap.get(x - 1) || 0
      /**
       * x 的前一项作为结尾的子序列
       * 若 大于 0 则添加
       * 否则创建新的子序列, 为了获得长度为 3 的子序列, 需要判断 x + 1, x + 2 是否都在该子序列
       */
      if (prevEndCount > 0) {
        countMap.set(x, count - 1)
        endMap.set(x - 1, prevEndCount - 1)
        endMap.set(x, (endMap.get(x) || 0) + 1)
      } else {
        /**
         * 创建新子序列
         * 判断 x + 1 和 x + 2 是否有剩余次数
         * 如果有 则创建
         * 如果没有 则返回 false, 结束
         */
        const count1 = countMap.get(x + 1, 0)
        const count2 = countMap.get(x + 2, 0)
        if (count1 > 0 && count2 > 0) {
          // 若 x + 1 和 x + 2 都有剩余次数
          // 则, 对 x, x + 1, x + 2 的剩余次数 均减一
          countMap.set(x, count - 1)
          countMap.set(x + 1, count1 - 1)
          countMap.set(x + 2, count2 - 1)
          // 在另一个 HashMap 中记录该结尾数字结尾的子序列的数量
          endMap.set(x + 2, (endMap.get(x + 2) || 0) + 1)
        } else {
          return false
        }
      }
    }
  }
  return true
}

var isPossible2 = function (nums) {
  // 创建 HashMap
  const retMap = new Map() // 剩余参数次数
  const endMap = new Map() // 结尾参数次数
  // 遍历数组, 配置 retMap
  for (const e of nums) {
    let v = retMap.get(e) || 0
    retMap.set(e, ++v)
  }
  for (const e of nums) {
    // 获取当前项剩余次数
    const currentNum = retMap.get(e)
    if (!currentNum) continue
    // 获取前项为结尾的次数
    const preValNum = endMap.get(e - 1) || 0
    if (preValNum) {
      // 有就添加
      retMap.set(e, currentNum - 1) // 剩余次数 -1
      endMap.set(e - 1, preValNum - 1) // 前值结尾次数 -1
      endMap.set(e, (endMap.get(e) || 0) + 1) // 该值结尾次数 +1
    } else {
      // 没有就创建
      // 为了满足最小序列长度(3个)条件
      // 校验 x + 1, x + 2 的剩余次数
      // 若均有剩余次数, 则创建新的子序列;
      // 否则, 返回 false
      const nextValNum1 = retMap.get(e + 1)
      const nextValNum2 = retMap.get(e + 2)
      if (nextValNum1 && nextValNum2) {
        retMap.set(e, currentNum - 1)
        retMap.set(e + 1, nextValNum1 - 1)
        retMap.set(e + 2, nextValNum2 - 1)
        endMap.set(e + 2, (endMap.get(e + 2) || 0) + 1)
      } else {
        return false
      }
    }
  }
  return true
}

let nums = [1, 2, 3, 3, 4, 4, 5, 5]
console.log(isPossible2(nums))
