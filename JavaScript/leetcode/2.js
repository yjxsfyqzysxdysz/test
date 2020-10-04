/**
 * 两数相加
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */

/**
 * 示例：
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val, next = null) {
  this.val = val
  this.next = next
}
const LineList = function () {
  let item = null
  this.append = function (el) {
    let node = new ListNode(el)
    if (!item) {
      item = node
    } else {
      let current = item
      while (current.next) {
        current = current.next
      }
      current.next = node
      current = null
    }
    node = null
  }
  this.getHead = function () {
    return item
  }
}

// var addTwoNumbers = function (l1, l2) {
//   const getVal = val => {
//     if (val.next) {
//       return getVal(val.next) + '' + val.val
//     }
//     return val.val + ''
//   }
//   function ListNode(val, next = null) {
//     this.val = val
//     this.next = next
//   }
//   function add(a, b) {
//     let res = ''
//     let c = 0
//     a = a.split('')
//     b = b.split('')
//     while (a.length || b.length || c) {
//       c += ~~a.pop() + ~~b.pop()
//       res = (c % 10) + res
//       c = c > 9
//     }
//     return res
//   }
//   const setVal = (val, node = null) => {
//     if (val.length) {
//       return setVal(val.slice(1), new ListNode(val.slice(0, 1), node))
//     }
//     return node
//   }
//   return setVal(add(getVal(l1), getVal(l2)))
// }


// var addTwoNumbers = function (l1, l2) {
//    let l3 = new ListNode(0)
//    let l4 = l3
//    let carry = 0
//    while (l1 || l2) {
//      let l1val = l1 ? parseInt(l1.val) : 0
//      let l2val = l2 ? parseInt(l2.val) : 0
//      let sum = l1val + l2val + carry
//      l4.next = new ListNode(sum % 10)
//      carry = Math.floor(sum / 10)
//      if (l1) l1 = l1.next
//      if (l2) l2 = l2.next
//      l4 = l4.next
//    }
//    if (carry > 0) {
//      l4.next = new ListNode(carry)
//    }
//    return l3.next
// }

var addTwoNumbers = function (l1, l2) {
  let node = new ListNode(0),
    carry = 0,
    current = node
  while (l1 || l2) {
    let l1Val = l1 ? +l1.val : 0
    let l2Val = l2 ? +l2.val : 0
    let sum = l1Val + l2Val + carry
    current.next = new ListNode(sum % 10)
    current = current.next
    carry = Math.floor(sum / 10)
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  if (carry) {
    current.next = new ListNode(carry)
  }
  return node.next
}
const a = new LineList()
const b = new LineList()
;[9, 9, 9, 9, 9, 9, 9].forEach(e => {
  a.append(e)
})
;[9, 9, 9, 9].forEach(e => {
  b.append(e)
})
let res = addTwoNumbers(a.getHead(), b.getHead())
console.log(res)
