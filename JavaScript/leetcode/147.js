/**
 * 对链表进行插入排序
 *
 * 插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
 * 每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。
 *
 * 插入排序算法：
 * 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
 * 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
 * 重复直到所有输入数据插入完为止。
 *
 * 示例 1：
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 *
 * 示例 2：
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
class ListNode {
  constructor(element) {
    this.val = element
    this.next = null
  }
}
const LineList = function () {
  let item = null
  this.append = function (e) {
    let node = new ListNode(e)
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
}

var insertionSortList = function (head) {
  if (!head || !head.next) return head
  let item, current, node
  JSON.stringify(head)
    .match(/-?\d+/g)
    .sort((a, b) => a - b)
    .forEach(e => {
      node = new ListNode(+e)
      if (!item) {
        item = node
        current = item
      } else {
        current.next = node
        current = current.next
      }
      node = null
    })
  current = null
  return item
}

let l = new LineList()
;[1,5,2,3,4].forEach(e => {
   l.append(e)
 })
console.log(insertionSortList(l.getHead()))
