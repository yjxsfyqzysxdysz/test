/**
 * 两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 */

/**
 * 示例:
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

// var twoSum = function (nums, target) {
//   let mapRes = new Map()
//   for (let key in nums) {
//     mapRes.set(nums[key], key)
//   }
//   for (let i = 0; i < nums.length; i++) {
//     if (mapRes.has(target - nums[i]) && mapRes.get(target - nums[i]) - i) {
//       return [i, parseInt(mapRes.get(target - nums[i]))]
//     }
//   }
// }

// var twoSum = function (nums, target) {
//   let mapRes = {}
//   for (let key in nums) {
//     mapRes[nums[key]] = key
//   }
//   for (let i = 0; i < nums.length; i++) {
//     if (mapRes.hasOwnProperty(target - nums[i]) && mapRes[target - nums[i]] - i) {
//       return [i, parseInt(mapRes[target - nums[i]])]
//     }
//   }
// }


let a = twoSum([2, 7, 11, 15], 9)
console.log(a)
