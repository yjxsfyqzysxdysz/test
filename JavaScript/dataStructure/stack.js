// 栈 FILO

const x = Symbol('y')
class Stackfn {
  constructor(param = []) {
    // this.param = Array.isArray(param) ? param : []
    // const params = Array.isArray(param) ? param : []
    this[x] = Array.isArray(param) ? param : []
  }
  get() {
    // return this.param
    return this[x]
  }
  size() {
    // return this.param.length
    return this[x].length
  }
  clear() {
    // this.param = []
    this[x] = []
    return 0
  }
  push(val) {
    if (Array.isArray(val)) {
      // this.param.push(...val)
      this[x].push(...val)
    } else if (val !== undefined && val !== null) {
      // this.param.push(val)
      this[x].push(val)
    }
    // return this.param
    return this[x]
  }
  pop() {
    // return this.param.pop()
    return this[x].pop()
  }
  peek() {
    if (this.size()) {
      // return this.param[this.size() - 1]
      return this[x][this.size() - 1]
    }
    return null
  }
  isEmpty() {
    return !this.size()
  }
}

// const Stackfn = function() {
//   this.arr = []
//   this.get = function() {
//     return this.arr
//   }
//   this.size = function() {
//     return this.arr.length
//   }
//   this.clear = function() {
//     this.arr = []
//     return this.size()
//   }
//   this.push = function(val) {
//     if (Array.isArray(val)) {
//       this.arr.push(...val)
//     } else if (val !== undefined && val !== null) {
//       this.arr.push(val)
//     }
//     return this.arr
//   }
//   this.pop = function() {
//     return this.arr.pop()
//   }
//   this.peek = function() {
//     if (!this.size()) return
//     return this.arr[this.size() - 1]
//   }
//   this.isEmpty = function() {
//     return !this.size()
//   }
// }

const t = new Stackfn()
console.log(t.size())
console.log(t.push())
console.log(t)
