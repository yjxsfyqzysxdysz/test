// 类
var consoleValue:any

// es5中的类
// 1、最简单的类
function Fun1(this: any): void {
  this.name = 'Wang'
  this.age = 20
}
var class1 = new Fun1()
// consoleValue = class1.name

// 2、构造函数和原型链里面增加的方法
Fun2.prototype.sex = 'Man'
Fun2.prototype.work = function (): string {
  return this.name + ' - work'
}
function Fun2(this: any): void {
  this.name = 'Wang'
  this.age = 20
  this.run = function (): string {
    return this.name + ' - run'
  }
}

var class2 = new Fun2()
// consoleValue = class2.run()
// consoleValue = class2.sex
// consoleValue = class2.work()
// 原型链上的属性实例会被多个构造函数所共享，构造函数不会

// 3、类中的静态方法
function Fun3(this: any) {
  this.name = 'Wang'
  this.age = 20
  this.run = function (): string { // 实例方法
    return this.name + ' - run'
  }
}
// 静态方法不需要实例化
Fun3.getInfo = function():string {
  return '静态方法'
}
// consoleValue = Fun3.getInfo()

// 4、es5中的继承 对象冒充实现继承
// Fun4类继承Fun3类 原型链 + 对象冒充的组合模式
function Fun4(this: any) {
  Fun2.call(this) // 对象冒充实现继承
}
var class3 = new Fun4()
// consoleValue = class3.run() // 对象冒充可以继承构造函数里面的属性和方法
// consoleValue = class3.work() // 无法继承原型链上面的属性和方法

// 5、es5中的继承 原型链实现继承
function Fun5(this: any): void {
  this.name = 'Wang'
  this.age = 20
  this.run = function (): string {
    return this.name + ' - run'
  }
}
Fun5.prototype.sex = 'Man'
Fun5.prototype.work = function (): string {
  return this.name + ' - work'
}
// Fun6类 继承 Fun5类 原型链 + 对象冒充的组合继承模式
function Fun6(): void { }
Fun6.prototype = new Fun5() // 原型链实现继承
var class4 = new Fun6()
// consoleValue = class4.work()
// 原型链实现继承：可以继承构造函数里的属性和方法 也可以继承原型链上的属性和方法

// 6、原型链实现继承 的问题
function Fun7(this: any, name: string, age: number): void {
  this.name = name
  this.age = age
  this.run = function (): string {
    return this.name + ' - run'
  }
}
Fun7.prototype.sex = 'Man'
Fun7.prototype.work = function (): string {
  return this.name + ' - work'
}
function Fun8(name: string, age: number): void {}
Fun8.prototype = new Fun7() // 原型链实现继承
var class5 = new Fun8('B', 20)
// consoleValue = class5.run() // 实例化子类时，无法给父类传参
// consoleValue = class5.work()

// 7、原型链+构造函数的组合继承模式
function Fun9(this: any, name: string, age: number): void {
  this.name = name
  this.age = age
  this.run = function (): string {
    return this.name + ' - run'
  }
}
Fun9.prototype.sex = 'Man'
Fun9.prototype.work = function (): string {
  return this.name + ' - work'
}
function Fun10(this: any, name: string, age: number): void {
  Fun9.call(this, name, age) // 对象冒充继承 实例化子类可以给父类传参
}
Fun10.prototype = new Fun9() // 原型链实现继承
var class6 = new Fun10('B', 20)
// consoleValue = class6.run() // 实例化子类时，无法给父类传参
// consoleValue = class6.work()

// 8、原型链+对象冒充继承的另一种方式
function Fun11(this: any, name: string, age: number): void {
  this.name = name
  this.age = age
  this.run = function (): string {
    return this.name + ' - run'
  }
}
Fun11.prototype.sex = 'Man'
Fun11.prototype.work = function (): string {
  return this.name + ' - work'
}
function Fun12(this: any, name: string, age: number): void {
  Fun11.call(this, name, age) //对象冒充继承  可以继承构造函数里面的属性和方法、实例化子类可以给父类传参
}
Fun12.prototype = Fun11.prototype // 原型链实现继承
var class7 = new Fun12('B', 20)
// consoleValue = class7.run() // 实例化子类时，无法给父类传参
// consoleValue = class7.work()

console.log(consoleValue)
