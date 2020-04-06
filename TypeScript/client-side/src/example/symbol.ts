// 基本数据类型
// 独一无二的值
// es6语法

// const s1 = Symbol()
// const s2 = Symbol()
// const s3 = Symbol('li')
// const s4 = Symbol(5)
// const s5 = Symbol({ val: 1 })
// Symbol会将传入值转换成字符串，TS仅允许传入 number | string

// console.log(s4.toString())
// console.log(Boolean(s4))
// console.log(!s4)

// let prop = 'name'
// const info = {
//   // name: 'li'
//   [prop]: 'li ',
//   [`my${prop}is`]: 'li'
// }
// es6中可以直接将一根变量或者表达式作为属性名
// console.log(info)
// Symbol只能通过该方法书写属性名

// const s6 = Symbol('name')
// const info2 = {
//   [s6]: 'li',
//   age: 18,
//   sex: 'mail'
// }
// console.log(info2)
// 由于symbol是独一无二的，所以作为属性名不会被覆盖
// info2[s6] = 'haha'
// console.log(info2)
// info2.s5 = 'a'
// Symbol作为属性名时，只能通过[]方式访问，不能打点访问

// 无法遍历出symbol的方法
// for-in
// for (const key in info2) {
//   console.log(key)
// }
// keys()
// console.log(Object.keys(info2))
// getOwnPropertyNames()
// console.log(Object.getOwnPropertyNames(info2))
// JSON.stringify()
// console.log(JSON.stringify(info2))

// 获取symbol的方法
// 返回所有symbol的属性名
// console.log(Object.getOwnPropertySymbols(info2))
// 返回所有属性名
// console.log(Reflect.ownKeys(info2))

// const s7 = Symbol('li')
// const s8 = Symbol('li')
// 该方式创造的Symbol不相同

// const s9 = Symbol.for('li')
// const s10 = Symbol.for('li')
// console.log(s9 === s10)
// 该方法会先在全局对symbol进行检索，如果有符合的就直接返回，如果没有就创建新的

// 返回Symbol.for注册的标识，使用symbol注册的则没有
// console.log(Symbol.keyFor(s9)) // li
// console.log(Symbol.keyFor(s8)) // underfined

// 11个内置的symbol值
// Symbol.hasInstance
// 当使用instanceof判断是否为实例时可用
// const symbol1 = {
//   [Symbol.hasInstance] (val: any) {
//     console.log(val)
//   }
// }
// console.log({ a: 'a' } instanceof <any>symbol1) // false

// Symbol.isConcatSpreadable
// isConcatSpreadable为true/undefined时，可以拆开扁平化
// let arr: Array<number> = [1, 2]
// console.log([].concat(arr, [3, 4]))
// arr[Symbol.isConcatSpreadable] = false
// console.log([].concat(arr, [3, 4]))


// Symbol.species
// 创建衍生对象的构造函数
// class C extends Array {
//   constructor(...args: any[]) {
//     super(...args)
//   }
//   static get [Symbol.species]() {
//     return Array
//   }
//   getName() {
//     return 'li'
//   }
// }
// const c = new C(1, 2, 3)
// const a = c.map(e => e + 1)
// console.log(a)
// console.log(a instanceof C) // true / false
// console.log(a instanceof Array)

// Symbol.match
// 指向一个内部方法，字符串上调用match方法时，会调用
// 指定了匹配的是正则表达式而不是字符串
// let symbol2 = {
//   [Symbol.match](string: string) {
//     console.log(string.length)
//   },
//   [Symbol.split](string: string) {
//     console.log('split', string.length)
//   }
// }
// 'abcde'.match(<RegExp>symbol2)

// 类似的方法有
// Symbol.replace
// Symbol.search
// Symbol.split
// 'abcde'.split(<any>symbol2)

// Symbol.iterator
// 数组的该属性指向该数组的默认遍历器方法
// const arrs3 = [1, 2, 3]
// const iterator = arr[Symbol.iterator]()
// console.log(Symbol.iterator)
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// 返回对象，value为元素，done为是否遍历完

// Symbol.toPrimitive
// 对象的属性指向一个方法，当对象转为原始类型值时会调用这个方法
// let symbol3: unknown = {
//   [Symbol.toPrimitive](type: number) {
//     console.log(type)
//   }
// }
// const res = (symbol3 as number)++
// const res = `abc${symbol3}` // ts - fined / js - string

// Symbol.toStringTag
// 当在对象上调用toString方法时，会调用该方法
// let symbol4 = {
//   // [Symbol.toStringTag]: 'li'
//   get [Symbol.toStringTag]() {
//     return 'li'
//   }
// }
// console.log(symbol4.toString()) // 返回相同

// Symbol.unscopables
// let symbol5 = {
//   a: 'a',
//   b: 'b'
// }
// 新的ts规则将with方法废弃了
