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