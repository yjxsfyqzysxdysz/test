var consoleValue: any
// 静态属性 静态方法 抽象类 多态

// function Person(this: any) {
//   this.runl = function () { }
// }
// Person.name = 'llll' // 静态属性
// Person.run2 = function() { // 静态方法
// }
// var p = new Person()
// Person.run2() // 静态方法的调用



// 静态方法
// jQuery的方式
// function $(ele: any) {
//   return new Base(ele)
// }
// $.get = function () {} // get相当于$的静态方法
// function Base(this: any, ele: string) {
//   this.ele = '获取dom节点'
//   // 实例方法
//   this.css = function (attr: string, value: string) {
//     this.ele.style.attr = value
//   }
// }
// $('.app').css('color', 'red')
// $.get()

class Person {
  public name: string
  // 静态属性
  static sex = 'any'
  constructor(name: string) {
    this.name = name
  }
  run() {
    return this.name + 'sport'
  }
  work() {
    return this.name + 'work'
  }
  static print() { // 加static 为静态方法
    // 静态方法无法直接调用类里面的属性
    return 'print_' + Person.sex
  }
}
// consoleValue = new Person('sun')
// console.log(consoleValue.run())
// consoleValue = Person.print()


// 多态:父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现 
// 多态属于继承

class Animals {
  name: string
  constructor(name: string) {
    this.name = name
  }
  eat() {
    //具体吃什么  不知道   ，  具体吃什么?继承它的子类去实现 ，每一个子类的表现不一样
    console.log('吃的方法')
  }
}

class Dogs extends Animals {
  constructor(name: string) {
    super(name)
  }
  eat() {
    return this.name + '狗粮'
  }
}
class Cats extends Animals {
  constructor(name: string) {
    super(name)
  }
  eat() {
    return this.name + '猫粮'
  }
}
// consoleValue = new Dogs('DogName')
// console.log(consoleValue.eat())


// typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。
// 用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法
// 标准:
abstract class Animal {
  public name: string
  constructor(name: string) {
    this.name = name
  }
  abstract eat(): any // 抽象方法不包含具体实现并且必须在派生类中实现。
  run() {
    console.log('其他方法可以不实现')
  }
}
// var a = new Animal() /* 错误的写法 不能直接被实例化 */

class Dog extends Animal {
  // 抽象类的子类必须实现抽象类里面的抽象方法
  constructor(name: any) {
    super(name)
  }
  eat() {
    console.log(this.name + '吃粮食')
  }
}

// consoleValue = new Dog('Dog')
// consoleValue.eat()
// consoleValue.run()

class Cat extends Animal {
  // 抽象类的子类必须实现抽象类里面的抽象方法
  constructor(name: any) {
    super(name)
  }
  run() {}
  eat() {
    console.log(this.name + '吃老鼠')
  }
}

// consoleValue = new Cat('Cat')
// consoleValue.eat()
// consoleValue.run()

console.log(consoleValue)