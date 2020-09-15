// 哈希

const hashFn = function () {
  let item = []
  // 散列函数
  function loseHashCode(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt()
    }
    return hash % 37
  }

  this.put = function (key, value) {
    const val = loseHashCode(key)
    item[val] = value
  }
  this.remove = function (key) {
    item[loseHashCode(key)] = undefined
  }
  this.get = function (key) {
    return item[loseHashCode(key)]
  }
  this.getItems = function () {
    return item
  }
}

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
  }
}

// 单向链表
const LineList = function () {
  let item = null // 链头
  let length = 0 // 长度
  // 链表尾添加元素
  this.append = function (key, value) {
    let node = new Node(key, value)
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
  this.inster = function (key, value, index) {
    if (index < length && index >= 0) {
      let node = new Node(key, value)
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
  this.remove = function (key, value) {
    return this.removeAt(this.indexOf(key, value))
  }
  this.indexOf = function (key, value) {
    let index = 0
    let current = item
    while (current) {
      if (current.key === key) {
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

// 哈希-链表
const hashLine = function () {
  let item = []
  function loseHashCode(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key[i].charCodeAt()
    }
    return hash % 37
  }
  this.put = function (key, value) {
    const num = loseHashCode(key)
    if (!item[num]) {
      item[num] = new LineList()
    }
    const index = item[num].indexOf(key)
    if (index !== -1) {
      item[num].removeAt(index)
    }
    item[num].append(key, value)
  }
  this.get = function (key) {
    const num = loseHashCode(key)
    if (item[num]) {
      let current = item[num].getHead()
      while (current) {
        if (current.key === key) return current.value
        current = current.next
      }
    }
    return undefined
  }
  this.remove = function (key, value) {
    const num = loseHashCode(key)
    if (item[num]) {
      let current = item[num].getHead()
      while (current) {
        if (current.key === key) {
          current = null
          if (item[num].remove(key, value) >= 0) {
            item[num].isEmpty() && (item[num] = undefined)
            return true
          }
        } else {
          current = current.next
        }
      }
    }
    return false
  }
  this.getItems = function () {
    return item
  }
}

const t = new hashLine()
t.put('Ana', 'gduiashdoa')
t.put('Ana', 'lll')
console.log(t.getItems())
console.log(t.getItems()[13].getHead())
// console.log(t.get('Ana'))
// console.log(t.remove('Ana', 'lll'))
// console.log(t.remove('Ana', 'gduiashdoa'))
// console.log(t.getItems()[13])
// console.log(t.getItems())
