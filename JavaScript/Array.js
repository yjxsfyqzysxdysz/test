const _ = require('lodash')
const _arr = require('./data_array.js')
const _obj = require('./data_object.js')
const _str = require('./data_string.js')
let res
let arr
// 使用Lodash，将对象的value放入数组中
res = _.toArray(_obj.obj1)
console.log('使用Lodash，将对象【a】的value放入数组【b】中')
console.log('obj1', JSON.stringify(_obj.obj1))
console.log('res', JSON.stringify(res))
console.log('----------------------------------------')

// 使用es6，数组过滤
res = [].filter(e => _arr.arr2.some(f => e.id === f.id))
console.log('使用es6，数组过滤,')
console.log('res', JSON.stringify(res))
console.log('----------------------------------------')

// 使用set()方法，简单数组去重
/**
 * Set 对象允许你存储任何类型的 唯一值 ，无论是原始值或者是对象引用。
 * Set对象是值的集合，你可以按照插入的顺序迭代它的元素。
 * Set中的元素只会出现一次，即 Set 中的元素是唯一的。
 */
console.log('使用es6【Set】，数组去重,')
console.log(Array.from(new Set(_arr.arr5)))
console.log([...new Set(_arr.arr6)])
console.log('----------------------------------------')

// 使用Array.from()方法
// Array.from() 方法从一个类似数组或可迭代的对象(包括 Array，Map，Set，String，TypedArray，arguments 对象等等) 中创建一个新的数组实例
console.log('使用se6【from】方法，生成数组')
console.log(Array.from(_arr.arr7))
console.log(Array.from(_arr.arr8))
console.log(Array.from(_str.str1))
console.log('----------------------------------------')

// 利用对象的属性不会重复这一特性，校验数组元素是否重复
// 超高效率
arr = _arr.arr4.concat(_arr.arr5)
res = []
var obj = {}
for (let i of arr) {
  if (!obj[i]) {
    res.push(i)
    obj[i] = 1
  }
}
console.log('res', res)
console.log('----------------------------------------')

// 复杂数组排序 / 去重
arr = _arr.arr2.concat(_arr.arr1) //合并成一个数组
obj = {} //用于id判断重复
res = [] //最后的新数组
//遍历c数组，将每个item.id在temp中是否存在值做判断，
arr.map(e => {
  if (!obj[e.id]) {
    res.push(e)
    obj[e.id] = true
  }
})
console.log(JSON.stringify(res))
res = [] //最后的新数组
//遍历c数组，将每个item.id在temp中是否存在值做判断，
_arr.arr9.map(e => {
  if (!obj[e.startTime]) {
    res.push(e)
    obj[e.startTime] = true
  }
})
console.log(JSON.stringify(res))
console.log('----------------------------------------')
//
arr = _.cloneDeep(_arr.arr1)
// let tmp1 = arr.splice(5, 1)
// let tmp2 = arr.splice(0, 1, tmp1)
// arr.splice(5, 0, tmp2)
arr.splice(5, 0, arr.splice(0, 1, arr.splice(5, 1)))
console.log(JSON.stringify(arr))
console.log('----------------------------------------')

// sort 自动排序
let a = []
let b = []
_arr.arr9.map(e => {
  a.push(e.startTime)
  b.push(e.endTime)
})
a.sort()
b.sort()
console.log(JSON.stringify(a))
console.log(JSON.stringify(b))

// 字符串转数组
res = _.words(_str.str2).map(e => parseInt(e))
console.log(res)
console.log('----------------------------------------')

res = _arr.arr5.filter(e => !_arr.arr4.includes(e))
console.log(res)

let aaa = { b: [] }
aaa.b.map(e => {
  console.log('map', e)
})
// console.log('aaa')

// arr = new Array(3).fill(1) // 索引数组
// arr = []
// arr['name'] = 21 // 关联数组
// arr['age'] = 20
arr = [3, 2, 'tom', 'vat']
res = arr.join()
// arr.sort(() => 0)
// arr.fill(4)
// console.log(arr, res, res.split(''))
// console.log(typeof(true))

// 数组扁平化的几种方法
/**
 * Array.prototype.flat()
 * flat()方法会按照一个可指定的深度depth递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。该方法不会改变原数组
 * ECMAScript 2019
 * 语法： let newArray = arr.flat(depth)
 * 描述： depth为指定要提取嵌套数组的结构深度，默认值为 1
 * flat() 方法会移除数组中的空项
 */

function Arrayflat(arr = [], num) {
  // console.log(arr.flat(num))
}
Arrayflat([1, 2, [3, 4]]) // [1, 2, 3, 4]
// 指定要提取嵌套数组的结构深度为1层
Arrayflat([1, 2, [3, 4, [5, 6]]], 1) // [1, 2, 3, 4, [5, 6]]
// 指定要提取嵌套数组的结构深度为2层
Arrayflat([1, 2, [3, 4, [5, 6]]], 2) // [1, 2, 3, 4, 5, 6]
// 使用 Infinity 作为深度，展开任意深度的嵌套数组
Arrayflat([1, 2, [3, 4, [5, 6]]], Infinity) // [1, 2, 3, 4, 5, 6]
// 移除数组中的空项
Arrayflat([1, 2, , 4, 5]) // [1, 2, 4, 5]

/**
 * 归并方法 reduce()
 * 我们用reduce函数进行遍历，把prev的初值赋值为[]，如果当前的值是数组的话，那么我们就递归遍历它的孩子，如果当前的值不是数组，那么我们就把它拼接进数组里。
 */

arr = [
  [1, 2, [3, 4], 5],
  [6, 7, 8],
  [[9, 10], 11]
]
function flat1(arr) {
  return arr.reduce(function (prev, cur) {
    return prev.concat(Array.isArray(cur) ? flat1(cur) : cur)
  }, [])
}
// console.log(flat1(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

/**
 * toString()
 * 方法有很大局限性，只适用于数组元素全部为数字的情况下
 *
 */

// toString && Json.parase
function flat2(arr) {
  var str = arr.toString()
  return JSON.parse('[' + str + ']')
}
// console.log(flat2(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// toString && split
function flat3(arr) {
  return arr
    .toString()
    .split(',')
    .map(item => {
      return Number(item)
    })
}
// console.log(flat3(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// join && split
function flat4(arr) {
  return arr
    .join(',')
    .split(',')
    .map(item => {
      return Number(item)
    })
}
// console.log(flat4(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

/**
 * 循环+递归
 * 递归的遍历每一项，若为数组则继续遍历，否则concat
 */
function flat5(arr) {
  let result = []
  arr.map(item => {
    if (Array.isArray(item)) {
      result = result.concat(flat5(item))
    } else {
      result.push(item)
    }
  })
  return result
}
// console.log(flat5(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

/**
 * 扩展运算符. . .
 * 用于取出参数对象的所有可遍历属性，拷贝到当前对象中
 */
function flat6(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
// console.log(flat6(arr)) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

function flat7(arr) {
  function isFlattenable(value) {
    const spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined
    return Array.isArray(value) || !!(spreadableSymbol && value && value[spreadableSymbol])
  }
  function flatten(arr, depth, res = []) {
    let index = -1,
      len = arr.length
    while (++index < len) {
      let value = arr[index]
      // 校验能否展开
      // 是否为数组，是否有值，能否展开
      if (isFlattenable(value)) {
        if (depth > 1) {
          flatten(value, depth - 1, res)
        } else {
          res = res.concat(value)
        }
      } else {
        res[res.length] = value
      }
    }
    return res
  }
  return Array.isArray(arr) && arr.length ? flatten(arr, 1 / 0) : []
}

const tree = {
  name: 'root',
  children: [
    {
      name: 'c1',
      children: [
        { name: 'c11', children: [] },
        { name: 'c12', children: [] }
      ]
    },
    {
      name: 'c2',
      children: [
        { name: 'c21', children: [] },
        { name: 'c22', children: [] }
      ]
    }
  ]
}

const Stackfn = function () {
  this.arr = []
  this.size = function () {
    return this.arr.length
  }
  this.get = function () {
    return this.arr
  }
  this.push = function (val) {
    if (Array.isArray(val)) {
      this.arr.push(...val)
    } else if (val || (!val && isFinite(val))) {
      this.arr.push(val)
    }
    return this.size()
  }
  this.pop = function () {
    return this.arr.pop()
  }
  this.clear = function () {
    this.arr = []
    return this.size()
  }
}

function deep(data) {
  const stack = new Stackfn()
  let res = []
  if (!data) return []
  stack.push(data)
  while (stack.size()) {
    let node = stack.pop()
    if (!node) continue
    res.push(node.name)
    stack.push(node.children.reverse())
  }
  return res
}

// console.log(deep(tree))

// 链表的相加问题
// 1-2-3 --- 321
// 4-5-6 --- 654
// 1-2-3 + 4-5-6 = 5-7-9
const Node = function (e) {
  this.ele = e
  this.next = null
}
const LineList = function () {
  let item = null
  let len = 0
  this.append = function (val) {
    let node = new Node(val)
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
    len++
  }
  this.get = function () {
    return item
  }
}
function addline(l1, l2) {
  console.log(l1, l2)
  let l3 = new LineList(),
    val = 0
  while (l1 || l2) {
    let l1val = l1 ? l1.ele : 0
    let l2val = l2 ? l2.ele : 0
    let sum = l1val + l2val + val
    l3.append(sum % 10)
    val = Math.floor(sum / 10)
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  if (val) {
    l3.append(val)
  }
  let l3val = l3.get()
  return l3val
}
const l1 = new LineList()
const l2 = new LineList()
;(321 + '').split('').forEach(e => l1.append(+e))
;(654 + '').split('').forEach(e => l2.append(+e))
// console.log(addline(l1.get(), l2.get()))

