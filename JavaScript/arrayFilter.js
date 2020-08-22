// 冒泡排序: 两两比较
function bubleSort(arr) {
  for (let i = arr.length; i >= 2; i--) {
    for (let j = 0; j <= i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

// 选择排序: 遍历自身以后的元素，最小的元素跟自己调换位置
function selectSort(arr) {
  var len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[i]) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
  return arr
}

// 插入排序: 即将元素插入到已排序好的数组中
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    // 外循环从1开始，默认arr[0]是有序段
    for (let j = i; j > 0; j--) {
      // j = i,将arr[j]依次插入有序段中
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
    }
  }
  return arr
}

// 快速排序
/**
 * 选择基准值(base)，原数组长度减一(基准值)，使用 splice
 * 循环原数组，小的放左边(left数组)，大的放右边(right数组)
 * concat(left, base, right)
 * 递归继续排序 left 与 right
 */
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr // 递归出口
  }
  let left = [],
    right = [],
    current = arr.splice(0, 1)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < current) {
      left.push(arr[i]) // 放在左边
    } else {
      right.push(arr[i]) // 放在右边
    }
  }
  // eslint-disable-next-line no-unused-vars
  return quickSort(left).concat(current, quickSort(right))
}

// ['a,b', 'b,c', 'a,d', 'e,f', 'c,g']
// ['a,b', 'c', 'd', 'e,f', 'g']

function filter(arr) {
  let tmp = []
  return arr.map(e => {
    return e
      .split(',')
      .map(f => {
        if (!tmp.includes(f)) {
          tmp.push(f)
          return f
        }
      })
      .filter(f => f)
      .join()
  })
}

// console.log(filter(['a,b', 'b,c', 'a,d', 'e,f', 'c,g']))

function unique(array) {
  return Array.from(new Set(array));
}
unique([1, 1, 2, 3, 3]) // [1, 2, 3]