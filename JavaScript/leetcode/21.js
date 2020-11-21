/**
 * 合并两个有序链表
 *
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 示例：
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val = 0, next = null) {
  this.val = val
  this.next = next
}

// var mergeTwoLists = function (l1, l2) {
//   let l3 = new ListNode()
//   let current = l3
//   function test(current, val) {
//     current.next = new ListNode(val)
//     return current.next
//   }
//   while (l1 || l2) {
//     let val1 = l1 ? l1.val : Number.MAX_VALUE
//     let val2 = l2 ? l2.val : Number.MAX_VALUE
//       if (val1 > val2) {
//         current = test(current, val2)
//         if (l2) l2 = l2.next
//       } else if (val1 < val2) {
//         current = test(current, val1)
//         if (l1) l1 = l1.next
//       } else if (val1 === val2) {
//         current = test(current, val1)
//         current = test(current, val2)
//         if (l1) l1 = l1.next
//         if (l2) l2 = l2.next
//       }
//   }
//   current = null
//   return l3.next
// }

var mergeTwoLists = function (l1, l2) {
  let l3 = new ListNode()
  let current = l3
  while (l1 && l2) {
    if (l1.val > l2.val) {
      current.next = l2
      l2 = l2.next
    } else {
      current.next = l1
      l1 = l1.next
    }
    current = current.next
  }
  // 当一方完成时，将另一方剩下的全部加进去
  current.next = l1 ? l1 : l2
  current= null
  return l3.next
}

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
let l1 = line([1, 2, 4,5,6])
let l2 = line([1, 1, 2])
console.log(JSON.stringify(mergeTwoLists(l1, l2), null, 2))
