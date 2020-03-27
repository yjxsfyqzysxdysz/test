// class
// es5中写法
// function Point (x, y) {
//   this.x = x
//   this.y = y
// }
// Point.prototype.getPostion = function () {
//   return '{' + this.x + ',' + this.y + '}'
// }
// var p1 = new Point(2, 3)
// console.log(p1)
// console.log(p1.getPostion())
// var p2 = new Point(4, 5)
// console.log(p2.getPostion())

// es6中写法
// 类中可以用分号隔开也可不用分号隔开，使用逗号隔开会报错
// class Point {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
//   getPostion () {
//     return `{${this.x}, ${this.y}}`
//   }
// }
// const p1 = new Point(1, 2)
// console.log(p1)
// console.log(p1.hasOwnProperty('x'))
// console.log(p1.hasOwnProperty('getPostion'))
// console.log(p1.__proto__.hasOwnProperty('getPostion')) // 为p1继承来的，是定义在原型对象上的

// set/get
// es5中写法
// var info = {
//   _age: 18,
//   set age (newValue) {
//     if (newValue > 18) {
//       console.log('old')
//     } else {
//       console.log('young')
//     }
//   },
//   get age () {
//     console.log('what')
//     return this._age
//   }
// }
// console.log(info.age)
// info.age = 17
// info.age = 19

// es6中写法
// class info {
//   constructor(age) {
//     this._age = age
//   }
//   set age (newValue) {
//     console.log('newValue', newValue)
//     this._age = newValue
//   }
//   get age () {
//     return this._age
//   }
// }
// const infos = new info (18)
// infos.age = 17
// console.log(infos.age)

// 函数的定义
// const func = function () { }
// function func () { }

// class的定义
// class info {
//   constructor() { }
// }
// 类名为info而不是c
// const info = class c {
//   constructor() { }
// }
// const info = class {
//   constructor() { }
// }

// 静态方法
// class Point {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
//   getPosition () {
//     return `{${this.x}, ${this.y}}`
//   }
//   static getClassName () {
//     return Point.name
//   }
// }
// const p = new Point(1, 2)
// console.log(p.getPosition())
// console.log(p.getClassName()) // 类的静态方法实例是继承不了的
// console.log(Point.getClassName()) // 静态方法类的自身才能调用

// 实例属性的其他写法
// class Point {
//   z = 0
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }
//   getPosition () {
//     return `{${this.x}, ${this.y}}`
//   }
//   static getClassName () {
//     return Point.name
//   }
// }
// const p = new Point(1, 2)

// 静态属性
// es6明确规定，类只有静态方法没有静态属性
// 添加静态属性
// class Point {
//   constructor() {
//     this.x = 0
//   }
// }
// Point.y = 2
// const p = new Point()
// console.log(p.x) // 0
// console.log(p.y) // undefined
// console.log(Point.y) // 2

// 私有
// 目前es6不支持私有方法和私有属性
// 1、通常带 下划线的为私有方法，通过命名区分
// class Point {
//   func1 () {
//   }
//   _func2 () {
//   }
// }

// 2、通过call的形式，若封装为模块，不导出的方法是无法调用的
// const _func2 = () => { }
// class Point {
//   func1 () {
//     _func2.call(this)
//   }
// }
// const p = new Point()
// p._func2()

// 3、通过symbol作为方法名
// a.js
// const func1 = Symbol('func1')
// export default class Point {
//   static [func1] () { }
// }
// // b.js
// import Point from 'a.js'
// const p = new Point()
// console.log(p)

// 私有属性
// 在属性前加#来定义私有属性(该方法还仅是提案)
// class Point {
//   #ownProp = 12
// }

// new.target
// 一般在构造函数中，它返回new命令作用于构造函数
// function Point() {
//   console.log(new.target)
// }
// const p = new Point()
// const p2 = Point()

// class Point {
//   constructor() {
//     console.log(new.target)
//   }
// }
// const p3 = new Point() // new Point 会返回子类而不是父类

// const p3 = new Point()
// class Parent {
//   constructor() {
//     console.log(new.targegt)
//     if (new.target === Parent) {
//       throw new Erroe('不能实例化')
//     }
//   }
// }
// class Child extends Parent {
//   constructor() {
//     super ()
//   }
// }
// // const c = new Parent() // throw
// const c = new Child()





