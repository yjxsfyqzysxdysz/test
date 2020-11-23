/**
 * 排序链表
 *
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 进阶：
 * 你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 *
 * 示例 1：
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 *
 * 示例 2：
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 *
 * 示例 3：
 * 输入：head = []
 * 输出：[]
 *
 * 提示：
 * 链表中节点的数目在范围 [0, 5 * 104] 内
 * -105 <= Node.val <= 105
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function ListNode(val = 0, next = null) {
  this.val = val
  this.next = next
}

// var sortList = function (head) {
//   if (!head || !head.next) return head
//   let item, current, node
//   JSON.stringify(head)
//     .match(/-?\d+/g)
//     .sort((a, b) => a - b)
//     .forEach(e => {
//       node = new ListNode(+e)
//       if (!item) {
//         item = node
//         current = item
//       } else {
//         current.next = node
//         current = current.next
//       }
//       node = null
//     })
//   current = null
//   return item
// }

function line(arr) {
  let tmp, item
  arr.forEach(e => {
    if (!item) {
      item = new ListNode(e)
      tmp = item
    } else {
      tmp.next = new ListNode(e)
      tmp = tmp.next
    }
  })
  tmp = null
  return item
}

/**
 * 方法一：自顶向下归并排序
 * 对链表自顶向下归并排序的过程如下。
 * 找到链表的中点，以中点为分界，将链表拆分成两个子链表。寻找链表的中点可以使用快慢指针的做法，快指针每次移动 2 步，慢指针每次移动 1 步，当快指针到达链表末尾时，慢指针指向的链表节点即为链表的中点。
 * 对两个子链表分别排序。
 * 将两个排序后的子链表合并，得到完整的排序后的链表。可以使用「21. 合并两个有序链表」的做法，将两个有序的子链表进行合并。
 * 上述过程可以通过递归实现。递归的终止条件是链表的节点个数小于或等于 1，即当链表为空或者链表只包含 1 个节点时，不需要对链表进行拆分和排序。
 *
 * 复杂度分析
 * 时间复杂度：O(nlogn)，其中 n 是链表的长度。
 * 空间复杂度：O(logn)，其中 n 是链表的长度。空间复杂度主要取决于递归调用的栈空间。
 */

// const merge = (head1, head2) => {
//   const dummyHead = new ListNode(0)
//   let temp = dummyHead,
//     temp1 = head1,
//     temp2 = head2
//   // 升序排序
//   while (temp1 !== null && temp2 !== null) {
//     if (temp1.val <= temp2.val) {
//       temp.next = temp1
//       temp1 = temp1.next
//     } else {
//       temp.next = temp2
//       temp2 = temp2.next
//     }
//     temp = temp.next
//   }
//   if (temp1 !== null) {
//     temp.next = temp1
//   } else if (temp2 !== null) {
//     temp.next = temp2
//   }
//   return dummyHead.next
// }

// const toSortList = (head, tail) => {
//   if (head === null) {
//     return head
//   }
//   if (head.next === tail) {
//     head.next = null
//     return head
//   }
//   // 为了找到中点
//   let slow = head, // 1
//     fast = head // 1
//   while (fast !== tail) {
//     slow = slow.next // 2 3 4 5
//     fast = fast.next // 2 4 6 8 10
//     if (fast !== tail) {
//       fast = fast.next // 3 5 7 9
//     }
//   }
//   const mid = slow
//   return merge(toSortList(head, mid), toSortList(mid, tail))
// }

// var sortList = function (head) {
//   return toSortList(head, null)
// }

/**
 * 方法二：自底向上归并排序
 * 使用自底向上的方法实现归并排序，则可以达到 O(1) 的空间复杂度。
 * 首先求得链表的长度 length，然后将链表拆分成子链表进行合并。
 * 具体做法如下。
 *
 * 用 subLength 表示每次需要排序的子链表的长度，初始时 subLength=1。
 * 每次将链表拆分成若干个长度为 subLength 的子链表（最后一个子链表的长度可以小于 subLength），按照每两个子链表一组进行合并，合并后即可得到若干个长度为 subLength×2 的有序子链表（最后一个子链表的长度可以小于 subLength×2）。合并两个子链表仍然使用「21. 合并两个有序链表」的做法。
 * 将 subLength 的值加倍，重复第 2 步，对更长的有序子链表进行合并操作，直到有序子链表的长度大于或等于 length，整个链表排序完毕。
 * 如何保证每次合并之后得到的子链表都是有序的呢？可以通过数学归纳法证明。
 * 初始时 subLength=1，每个长度为 1 的子链表都是有序的。
 * 如果每个长度为 subLength 的子链表已经有序，合并两个长度为 subLength 的有序子链表，得到长度为 subLength×2 的子链表，一定也是有序的。
 * 当最后一个子链表的长度小于 subLength 时，该子链表也是有序的，合并两个有序子链表之后得到的子链表一定也是有序的。
 * 因此可以保证最后得到的链表是有序的。
 *
 * 复杂度分析
 * 时间复杂度：O(nlogn)，其中 n 是链表的长度。
 * 空间复杂度：O(1)。
 */

// const merge = (head1, head2) => {
//   const dummyHead = new ListNode(0)
//   let temp = dummyHead,
//     temp1 = head1,
//     temp2 = head2
//   // 升序排序
//   while (temp1 !== null && temp2 !== null) {
//     if (temp1.val <= temp2.val) {
//       temp.next = temp1
//       temp1 = temp1.next
//     } else {
//       temp.next = temp2
//       temp2 = temp2.next
//     }
//     temp = temp.next
//   }
//   if (temp1 !== null) {
//     temp.next = temp1
//   } else if (temp2 !== null) {
//     temp.next = temp2
//   }
//   return dummyHead.next
// }

// var sortList = function (head) {
//   if (head === null) {
//     return head
//   }
//   let length = 0
//   let node = head
//   // 获取深度
//   while (node !== null) {
//     length++
//     node = node.next
//   }
//   const dummyHead = new ListNode(0, head)
//   // 以 2的指数 个数项 分组 进行排序， 2 - 4 - 6 - 8 ... 直至 分组大于总长度 时结束
//   /**
//    * 1,3,5,6,8,9,10,2,4,7,12
//    *
//    * 1,3 5,6 8,9 10,2 4,7 12
//    * 1,3 5,6 8,9 2,10 4,7 12
//    *
//    * 1,3,5,6 8,9,2,10 4,7,12
//    * 1,3,5,6 2,8,9,10 4,7,12
//    *
//    * 1,3,5,6,2,8,9,10 4,7,12
//    * 1,2,3,5,6,8,9,10 4,7,12
//    */
//   for (let subLength = 1; subLength < length; subLength <<= 1) {
//     // <<= 左移赋值运算符使变量向左移动指定位数的比特位，然后把结果赋给该变量 左移1位; 以2的指数增长
//     // subLength 2 的指数项
//     let prev = dummyHead,
//       curr = dummyHead.next
//     while (curr !== null) {
//       let head1 = curr
//       // 获得 最后一项 或 2的指数项 的索引
//       for (let i = 1; i < subLength && curr.next !== null; i++) {
//         curr = curr.next
//       }
//       // 进行切割 获取2的指数项 的下一项
//       let head2 = curr.next
//       curr.next = null
//       curr = head2
//       // 获得 最后一项 或 2的指数项 的索引
//       for (let i = 1; i < subLength && curr != null && curr.next !== null; i++) {
//         curr = curr.next
//       }
//       let next = null
//       if (curr !== null) {
//         next = curr.next
//         curr.next = null
//       }
//       // 排序
//       const merged = merge(head1, head2)
//       prev.next = merged
//       // 将指针指向最后项
//       while (prev.next !== null) {
//         prev = prev.next
//       }
//       curr = next
//     }
//   }
//   return dummyHead.next
// }

// 根据归并排序 思想 写
var sortList = function (head) {
  if (!head || !head.next) return head
  let leftLine = head, // 左侧链表
    rightLine = head, // 右侧链表
    mid = leftLine, // 中点
    current = head // 当前项
  while (current.next) {
    current = current.next
    if (current.next) {
      mid = mid.next
      current = current.next
    }
  }
  rightLine = mid.next
  mid.next = null
  mid = null
  current = null
  return merge(sortList(leftLine), sortList(rightLine))
}

function merge(leftLine, rightLine) {
  let item = new ListNode(0),
    current = item,
    left = leftLine,
    right = rightLine
  // 排序
  while (left && right) {
    if (left.val < right.val) {
      current.next = left
      left = left.next
    } else {
      current.next = right
      right = right.next
    }
    current = current.next
  }
  if (left) current.next = left
  if (right) current.next = right
  return item.next
}

let l1 = line([5, 3, 1, 2, 9, 6])
console.log(JSON.stringify(sortList(l1), null, 4))
