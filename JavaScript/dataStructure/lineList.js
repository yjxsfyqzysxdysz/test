// 链表

// 辅助类
// const Node = function (element) {
//   this.element = element
//   this.next = null
//   this.parent = null
// }

class Node {
  constructor(element) {
    this.element = element
    this.root = false
    this.next = null
    this.parent = null
  }
}

// 单向链表
const LineList = function () {
  let item = null // 链头
  let length = 0 // 长度
  // 链表尾添加元素
  this.append = function (element) {
    let node = new Node(element)
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
    length++
  }
  // 链表任意位置添加元素
  this.inster = function (element, index) {
    if (index < length && index >= 0) {
      let node = new Node(element)
      let current = item
      if (!index) {
        item = node
        item.next = current
      } else {
        let i = 0
        let previous = null
        while (i < index) {
          previous = current
          current = current.next
          i++
        }
        previous.next = node
        node.next = current
        previous = null
      }
      current = null
      node = null
      length++
    }
  }
  // 删除任意位置节点
  this.removeAt = function (index) {
    if (index >= 0 && index < length) {
      let current = item
      if (!index) {
        current = item.next
        item = current
      } else {
        let previous = null
        let i = 0
        while (i < index) {
          previous = current
          current = current.next
          i++
        }
        previous.next = current.next
        previous = null
      }
      length--
      return current
    }
    return null
  }
  // 删除任意元素
  this.remove = function (element) {
    return this.removeAt(this.indexOf(element))
  }
  this.indexOf = function (element) {
    let index = 0
    let current = item
    while (current) {
      if (current === element) {
        return index
      }
      index++
      current = current.next
    }
    current = null
    return -1
  }
  this.getHead = function () {
    return item
  }
  this.isEmpty = function () {
    return !this.size()
  }
  this.size = function () {
    return length
  }
}

// 双向链表
const DoubleLineList = function () {
  let item = null // 链头
  let length = 0 // 长度
  // 链表尾添加元素
  this.append = function (element) {
    let node = new Node(element)
    if (!item) {
      item = node
    } else {
      let current = item
      while (current.next) {
        current = current.next
      }
      current.next = node
      node.parent = current
      current = null
    }
    node = null
    length++
  }
  // 链表任意位置添加元素
  this.inster = function (element, index) {
    if (index < length && index >= 0) {
      let node = new Node(element)
      let current = item
      if (!index) {
        item = node
        item.next = current
        current.parent = item
      } else {
        let i = 0
        let previous = null
        while (i < index) {
          previous = current
          current = current.next
          i++
        }
        previous.next = node
        node.parent = previous
        node.next = current
        current.parent = node
        previous = null
      }
      current = null
      node = null
      length++
    }
  }
  // 删除任意位置节点
  this.removeAt = function (index) {
    if (index >= 0 && index < length) {
      let current = item
      if (!index) {
        current = item.next
        current.parent = null
        item = current
      } else {
        let previous = null
        let i = 0
        while (i < index) {
          previous = current
          current = current.next
          i++
        }
        previous.next = current.next
        previous.next.parent = previous
        previous = null
      }
      length--
      current.next = null
      current.parent = null
      return current
    }
    return null
  }
  // 删除任意元素
  this.remove = function (element) {
    return this.removeAt(this.indexOf(element))
  }
  this.indexOf = function (element) {
    let index = 0
    let current = item
    while (current) {
      if (current === element) {
        return index
      }
      index++
      current = current.next
    }
    current = null
    return -1
  }
  this.getHead = function () {
    return item
  }
  this.isEmpty = function () {
    return !this.size()
  }
  this.size = function () {
    return length
  }
}

// 环形链表
const RingLineList = function () {
  let item = null // 链头
  let length = 0 // 长度
  // 链表尾添加元素
  this.append = function (element) {
    let node = new Node(element)
    if (!item) {
      item = node
      item.root = true
      item.next = node
      item.parent = node
    } else {
      let current = item
      current.parent.next = null
      current.parent = null
      while (current.next) {
        current = current.next
      }
      current.next = node
      node.parent = current
      node.next = item
      item.parent = node
      current = null
    }
    node = null
    length++
  }
  // 链表任意位置添加元素
  this.inster = function (element, index) {
    if (index < length && index >= 0) {
      let node = new Node(element)
      let current = item
      if (!index) {
        item = node
        item.next = current
        item.parent = current.parent
        current.parent.next = item
        current.parent = item
      } else if (index === length - 1) {
        this.append(element)
      } else {
        let i = 0
        let previous = null
        while (i < index) {
          previous = current
          current = current.next
          i++
        }
        previous.next = node
        node.parent = previous
        node.next = current
        current.parent = node
        previous = null
      }
      current = null
      node = null
      length++
    }
  }
  // 删除任意位置节点
  this.removeAt = function (index) {
    if (index >= 0 && index < length) {
      let current = item
      if (!index) {
        current = item.next
        item.parent.next = current
        current.parent = item.parent
        item = current
      } else if (index === length - 1) {
        current = item.parent.parent
        current.next = item
        item.parent = current
      } else {
        let previous = null
        let i = 0
        while (i < index) {
          previous = current
          current = current.next
          i++
        }
        previous.next = current.next
        previous.next.parent = previous
        previous = null
      }
      length--
      current.next = null
      current.parent = null
      return current
    }
    return null
  }
  // 删除任意元素
  this.remove = function (element) {
    return this.removeAt(this.indexOf(element))
  }
  this.indexOf = function (element) {
    let index = 0
    let current = item
    while (current) {
      if (current === element) {
        current = null
        return index
      }
      index++
      current = current.next
      if (current.root && index) current = null
    }
    current = null
    return -1
  }
  this.getHead = function () {
    return item
  }
  this.isEmpty = function () {
    return !this.size()
  }
  this.size = function () {
    return length
  }
}

const t = new RingLineList()
t.append(1)
t.append(2)
t.append(3)
t.removeAt(0)
// t.append(4)
// t.inster(5, 2)
console.log(t.getHead())
