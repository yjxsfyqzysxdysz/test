// 排序測試

/**
 * 比较类排序：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此也称为非线性时间比较类排序。
 * 非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。
 */

/**
 * 算法复杂度
 *
 * 排序方法  时间复杂度(平均)  时间复杂度(最坏)  时间复杂度(最好)  空间复杂度  稳定性
 * 插入排序  O(n^2)           O(n^2)           O(n)             O(1)       稳定
 * 希尔排序  O(n^1.3)         O(n^2)           O(n)             O(1)       不稳定
 * 选择排序  O(n^2)           O(n^2)           O(n^2)           O(1)       不稳定
 * 堆排序    O(nlogn)         O(nlogn)         O(nlogn)         O(1)       不稳定
 * 冒泡排序  O(n^2)           O(n^2)           O(n)             O(1)       稳定
 * 快速排序  O(nlogn)         O(n^2)           O(nlogn)         O(nlogn)   不稳定
 * 归并排序  O(nlogn)         O(nlogn)         O(nlogn)         O(n)       稳定
 *
 * 计数排序  O(n+k)           O(n+k)           O(n+k)           O(n+k)     稳定
 * 桶排序    O(n+k)           O(n^2)           O(n)             O(n+k)     稳定
 * 基数排序  O(n+k)           O(n+k)           O(n+k)           O(n+k)     稳定
 *
 *
 * 相关概念
 *
 * 稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。
 * 不稳定：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。
 * 时间复杂度：对排序数据的总的操作次数。反映当n变化时，操作次数呈现什么规律。
 * 空间复杂度：是指算法在计算机内执行时所需存储空间的度量，它也是数据规模n的函数。
 */

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 冒泡排序
/**
 * 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 * 针对所有的元素重复以上的步骤，除了最后一个；
 * 重复步骤1~3，直到排序完成。
 * @param {Number[]} arr
 */

function bubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 相邻元素两两对比
      if (arr[j] > arr[j + 1]) {
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}

// 选择排序
/**
 * n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：
 * 初始状态：无序区为R[1..n]，有序区为空；
 * 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
 * n-1趟结束，数组有序化了。
 * @param {Number[]} arr
 */

function selectionSort(arr) {
  const len = arr.length
  let minIndex
  let temp
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      // 寻找最小的数
      if (arr[j] < arr[minIndex]) {
        minIndex = j // 将最小数的索引保存
      }
    }
    swap(arr, i, minIndex)
  }
  return arr
}

// 插入排序
/**
 * 从第一个元素开始，该元素可以认为已经被排序；
 * 取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * 如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * 将新元素插入到该位置后；
 * 重复步骤2~5。
 *
 * @param {Number[]} arr
 */

function insertionSort(arr) {
  const len = arr.length
  let preIndex, current
  for (let i = 1; i < len; i++) {
    // 外循环从1开始，默认arr[0]是有序段
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

// 希尔排序
/**
 * 先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：
 * 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
 * 按增量序列个数k，对序列进行k 趟排序；
 * 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
 *
 * @param {Number[]} arr
 */

function shellSort(arr) {
  const len = arr.length
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
    for (let i = gap; i < len; i++) {
      // 若当前项比前一项小，则判断该按该分割是否为最小值，若不是则按跟分割重排
      let j = i
      let current = arr[i] // 中间量
      while (j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap]
        j = j - gap
      }
      arr[j] = current
    }
  }
  return arr
}

// 归并排序
/**
 * 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。
 * 把长度为n的输入序列分成两个长度为n/2的子序列；
 * 对这两个子序列分别采用归并排序；
 * 将两个排序好的子序列合并成一个最终的排序序列。
 *
 * 归并排序是一种稳定的排序方法。
 * 和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(nlogn）的时间复杂度。
 * 代价是需要额外的内存空间。
 *
 * @param {number[]} arr
 */

function mergeSort(arr) {
  const len = arr.length
  if (len < 2) return arr
  const middle = Math.floor(len / 2)
  let left = arr.slice(0, middle),
    right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  while (left.length * right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  // left.length && result.push(...left)
  // right.length && result.push(...right)
  while (left.length) result.push(left.shift())
  while (right.length) result.push(right.shift())
  return result
}

// 快速排序
/**
 * 快速排序的基本思想：
 * 通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
 *
 * 快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：
 * 从数列中挑出一个元素，称为 “基准”（pivot）；
 * 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
 * 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
 */
/*
function quickSort(arr = [], left = 0, right = arr.length - 1) {
  let partitionIndex
  if (left < right) {
    partitionIndex = partition(arr, left, right)
    quickSort(arr, left, partitionIndex - 1)
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}

// 分区操作
function partition(arr, left, right) {
  let pivot = left, // 设定基准值（pivot）
    index = pivot + 1
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      i !== index && swap(arr, i, index)
      index !== right && index++
    }
  }
  swap(arr, pivot, index)
  return index
}
*/
function quickSort(arr = []) {
  const len = arr.length
  if (len < 2) return arr
  let partition = arr.splice(Math.floor(len / 2), 1)[0]
  let left = [],
    right = []
  for (let i = 0; i < len; i++) {
    if (partition > arr[i]) {
      right.push(arr[i])
    } else if (partition < arr[i]) {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat([partition], quickSort(right))
}

// 堆排序
/**
 * 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
 * 将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
 * 将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
 * 由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
 *
 * @param {Number[]} arr
 */

// 建立大顶堆
function buildMaxHeap(arr) {
  for (let i = Math.floor(this.len / 2); i >= 0; i--) {
    heapify(arr, i)
  }
}

// 堆调整
function heapify(arr, i) {
  let left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i
  if (left < this.len && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < this.len && arr[right] > arr[largest]) {
    largest = right
  }
  if (largest != i) {
    swap(arr, i, largest)
    heapify(arr, largest)
  }
}

function heapSort(arr) {
  this.len = arr.length // 因为声明的多个函数都需要数据长度，所以把len设置到原型链中
  buildMaxHeap(arr)
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i)
    this.len--
    heapify(arr, 0)
  }
  return arr
}

// 计数排序
/**
 * 计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
 *
 * 出待排序的数组中最大和最小的元素；
 * 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
 * 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
 * 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。
 *
 * 计数排序是一个稳定的排序算法。
 * 当输入的元素是 n 个 0到 k 之间的整数时，时间复杂度是O(n+k)，空间复杂度也是O(n+k)，其排序速度快于任何比较排序算法。
 * 当k不是很大并且序列比较集中时，计数排序是一个很有效的排序算法。
 *
 * @param {Number[]} arr
 * @param {Number} maxValue
 */

function countingSort(arr, maxValue) {
  let bucket = new Array(maxValue + 1),
    sortedIndex = 0
  for (let i = 0; i < arr.length; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0
    }
    bucket[arr[i]]++
  }
  for (let j = 0; j < maxValue + 1; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j
      bucket[j]--
    }
  }
  return arr
}

// 桶排序
/**
 * 桶排序是计数排序的升级版。
 * 它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
 * 桶排序 (Bucket sort)的工作的原理：
 * 假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）
 *
 * 设置一个定量的数组当作空桶；
 * 遍历输入数据，并且把数据一个一个放到对应的桶里去；
 * 对每个不是空的桶进行排序；
 * 从不是空的桶里把排好序的数据拼接起来
 *
 * 桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为O(n)。
 * 很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。
 * 但相应的空间消耗就会增大。
 *
 * @param {Number[]} arr
 * @param {Number} bucketSize 数量
 */

function bucketSort(arr, bucketSize) {
  if (!arr.length) return arr

  let i
  let minValue = arr[0]
  let maxValue = arr[0]
  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i] // 输入数据的最小值
    } else if (arr[i] > maxValue) {
      maxValue = arr[i] // 输入数据的最大值
    }
  }

  // 桶的初始化
  let DEFAULT_BUCKET_SIZE = 5 // 设置桶的默认数量为5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  let buckets = new Array(bucketCount)
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = []
  }

  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i])
  }

  arr.length = 0
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]) // 对每个桶进行排序，这里使用了插入排序
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j])
    }
  }

  return arr
}

// 基数排序
/**
 * 基数排序是按照
 * 低位先排序，然后收集；
 * 再按照高位排序，然后再收集；
 * 依次类推，直到最高位。
 * 有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
 * 最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。
 *
 * 取得数组中的最大数，并取得位数
 * arr为原始数组，从最低位开始取每个位组成radix数组
 * 对radix进行计数排序（利用计数排序适用于小范围数的特点）
 *
 * 基数排序基于分别排序，分别收集，所以是稳定的。
 * 但基数排序的性能比桶排序要略差，每一次关键字的桶分配都需要O(n)的时间复杂度，而且分配之后得到新的关键字序列又需要O(n)的时间复杂度。
 * 假如待排数据可以分为d个关键字，则基数排序的时间复杂度将是O(d*2n) ，当然d要远远小于n，因此基本上还是线性级别的。
 * 基数排序的空间复杂度为O(n+k)，其中k为桶的数量。
 * 一般来说n>>k，因此额外空间需要大概n个左右。
 *
 * @param {Number[]} arr
 * @param {Number} maxDigit 最大位数
 */

function radixSort(arr, maxDigit) {
  let counter = [],
    mod = 10,
    dev = 1,
    bucket,
    pos,
    value
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      bucket = parseInt((arr[j] % mod) / dev)
      if (counter[bucket] == null) {
        counter[bucket] = []
      }
      counter[bucket].push(arr[j])
    }
    pos = 0
    for (let j = 0; j < counter.length; j++) {
      value = null
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value
        }
      }
    }
  }
  return arr
}

// 数组的扁平化
function flatDeep(arr) {
  return arr.reduce((total, item) => {
    if (Array.isArray(item)) {
      return [].concat(total, ...flatDeep(item))
    } else {
      return [].concat(total, item)
    }
  })
}

// console.log(flatDeep([1,2,3, [4,5,6, [7,8,9]]]))
// console.log([1, 2, 3, [4, 5, 6, [7, 8, 9]]].toString().split(',').map(e => +e))
