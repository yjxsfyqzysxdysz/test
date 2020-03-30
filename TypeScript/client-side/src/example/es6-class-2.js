// 继承
// es5
// function Food () {
//   this.type = 'food'
// }
// Food.prototype.getType = function () {
//   return this.type
// }
// function Vegetable(name) {
//   this.name = name
// }
// Vegetable.prototype = new Food ()

// const tomato = new Vegetable('tomato')
// console.log(tomato.getType())

// es6
// class Parent {
//   constructor(name) {
//     this.name = name
//   }
//   getName () {
//     return this.name
//   }
//   static getNames () {
//     return this.name
//   }
// }
// class Child extends Parent {
//   constructor(name, age) {
//     super(name)
//     this.age
//   }
// }

// const c = new Child('li', 18)
// console.log(c)
// console.log(c.getName())
// 只有调用了 super() 后，才可以在子类中使用this
// console.log(c instanceof Child) // true
// console.log(c instanceof Parent) // true
// 继承了父类的子类创建的实例即是父类的实例也是子类的实例
// 子类会将父类的静态方法都继承过来
// console.log(Child.getNames()) // Child
// getNames 指向子类。那么就是构造函数的名字，也是子类的名字
// console.log(Object.getPrototypeOf(Child) === Parent) // 该方法可以获得构造函数他的原型对象

// super
// 可作为函数使用也可作为对象使用
// 作为对象在不同的类型方法中使用含义不同

// 作为 函数
// 代表父类的构造函数 constructor
// super 传进的参数和父类的 constructor 传进的参数是一样的
// es6 要求，子类构造函数中必须调用一次 super 函数
// 只有调用 super 之后，才能在 constructor 中使用 this
// 且 super 方法只能在 constructor 中调用，在其他地方就会报错
// 父类 constructor 中 this 指向子类的实例（父类 constructor 中 this 上添加的任何东西都会添加到 child 创建的的实例上

// 作为 对象
// 在普通方法中,指向的是父类的原型对象
// 在静态方法中,指向的是父类
// class Parent {
//   constructor() {
//     this.type = 'parent'
//   }
//   getName () {
//     return this.type
//   }
// }
// Parent.getType = () => {
//   return 'is parent'
// }
// class Child extends Parent {
//   constructor() {
//     super()
//     console.log('constructor:' + this.super.getName()) // 在普通方法中,指向的是父类的原型对象
//   }
//   getParentName () {
//     console.log('getParentName:' + super.getName()) // 在普通方法中,指向的是父类的原型对象
//   }
//   // getParentType () {
//   //   console.log('getParentType:' + super.getType()) // 在普通方法中,指向的是父类的原型对象
//   // }
//   static getParentType () {
//     console.log('getParentType:' + super.getType()) // 在普通方法中,指向的是父类的原型对象
//   }
// }
// const c = new Child() // constructor:parent
// c.getParentName() // getParentName:parent
// // c.getParentType() // error
// Child.getParentType() // getParentType: is parent


// class Parent {
//   constructor() {
//     this.type = 'parent'
//   }
//   print () {
//     consle.log(this.name)
//   }
// }
// class Child extends Parent {
//   constructor() {
//     super()
//     this.name = 'child'
//   }
//   childPrint () {
//     super.print()
//   }
// }
// const c = new Child()
// c.childPrint()

// prototype
// __protp__
// var objs = new Object()
// console.log(objs.__proto__) === Object.prototype // true

// 子类的 __proto__ 指向父类本身
// 子类的 prototype 属性的 __proto__ 指向父类的 prototype 属性
// 实例的 __proto__ 属性的 __proto__ 指向父类实例的 __proto__ 属性

// 继承
// class CustomArray extends Array {
//   constructor(...args) {
//     super(...args)
//   }
// }
// const arr = CustomArray(3) // 长度为3的空数组
// console.log(arr)

// es5的类 和 es6的构造函数 的机制上差异
// es5 先创造子构造函数的实例 this，然后再将父构造函数的方法、属性添加到这个 this 上
// es6 先从父类取到实例 this，然后调用 super 之后，将子类的属性和方法加到 this 上 


