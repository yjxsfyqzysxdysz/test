// 队列 FIFO

const x = Symbol('y')
class QueueFun {
  constructor(param = []) {
    this[x] = Array.isArray(param) ? param : []
  }
  // 入列
  enqueue(val) {
    if (Array.isArray(val)) {
      this[x].push(...val)
    } else if (val !== undefined && val !== null) {
      this[x].push(val)
    }
    return this[x]
  }
  // 出列
  dequeue() {
    if (this.size()) {
      return this[x].shift()
    }
    return null
  }
  // 查看列头
  front() {
    return this[x][0]
  }
  get() {
    return this[x]
  }
  size() {
    return this[x].length
  }
  isEmpty() {
    return !this.size()
  }
}

const t = new QueueFun()
console.log(t.size())
console.log(t.enqueue(1))
console.log(t.enqueue(2))
console.log(t.enqueue(3))
console.log(t.enqueue(4))
console.log(t.dequeue())
console.log(t.front())
console.log(t.get())