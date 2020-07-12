//  ts中的类
// 类
// class Point {
//   public x: number
//   public y: number
//   constructor(x: number, y: number) {
//     this.x = x
//     this.y = y
//   }
//   public getPosition() {
//     return `(${this.x}, ${this.y})`
//   }
// }
// const point = new Point(1, 2)
// console.log(point)

// 继承
// class Parent {
//   public name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }
// class Child extends Parent {
//   constructor(name: string) {
//     super(name)
//   }
// }

// 修饰符
// public 公共

// private 私有的
// 私有的只能在该类的内部进行调用，外部调用时报错
// 通过super关键字只能访问基类的公共方法和受保护方法
// class Parent {
//   private age: number
//   constructor(age: number) {
//     this.age = age
//   }
// }
// const p = new Parent(18)
// console.log(p.age)
// console.log(Parent.age)

// class Child extends Parent {
//   constructor(age: number) {
//     super(age)
//     // console.log(super.age) // 属性“age”为私有属性，只能在类“Parent”中访问
//   }
// }

// protected 受保护
// 可在子类中访问基类的属性和方法
// 外部不行
// 可修饰 constructor 构造函数，被此修饰的类无法再创建实例，只能被子类继承
// class Parent {
//   protected age: number
//   constructor(age: number) {
//   // protected constructor(age: number) {
//     this.age = age
//   }
//   protected getAge() {
//     return this.age
//   }
// }
// // const p = new Parent(15)
// class Child extends Parent {
//   constructor(age: number) {
//     super(age)
//     console.log(super.age, age)
//     console.log(super.getAge())
//   }
// }
// const p = new Child(15)
// console.log(p)
// console.log(p.age)
// console.log(p.getAge())
// console.log(Parent.age)
// console.log(Child.age)

// readonly 只读
// 使用readonly属性，仍必须用public、protected、private去定义属性
// 实例只能读取该属性，不能再修改
// class UserInfo {
//   public readonly name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }
// const userInfo = new UserInfo('li')
// console.log(userInfo)
// userInfo.name = 'lin' // Cannot assign to 'name' because it is a read-only property

// 参数属性
// 在constructor的传参前添加修饰符，会自定一定参数属性并添加到this中
// 每个参数前都要加
// class A {
//   constructor(public readonly name: string, private age: number, protected sex: boolean) { }
// }
// const a1 = new A('', 1, true)
// console.log(a1)

// 静态属性
// 实例不会添加静态属性，也不会继承静态属性和方法
// 可以使用修饰符和三点关键字指定一个属性或方法
// class Parent {
//   public static age: number = 18
//   public static getAge() {
//     return Parent.age
//   }
//   constructor() { }
// }
// const p = new Parent()
// console.log(p.age) // 静态属性在实例上是拿不到的
// console.log(Parent.age) // age是类的一个静态属性，只有类本身可以使用

// 可选类属性
// ts在2.0中是支持可选类的属性的
// class Info {
//   public name: string
//   public age?: number
//   constructor(name: string, age?: number, public readonly sex?: string) {
//     this.name = name
//     this.age = age
//   }
// }
// const info1 = new Info('li', 18, 'man')
// const info3 = new Info('li', 18)
// const info4 = new Info('li')
// console.log(info1, info3, info4)

// 存取器
// 用法与写法同es6无区别
// class T {
//   public name: string
//   private infoStrVal: string | undefined
//     constructor(name: string) {
//       this.name = name
//     }
//   get infoStr() {
//     return this.infoStrVal
//     // return `name: ${this.name}`
//   }
//   set infoStr(val) {
//     console.log(`set: ${val}`)
//     this.infoStrVal = val
//   }
// }
// const t = new T('name-456')
// t.infoStr = 'li'
// console.log(t.infoStr)

// 抽象类
// 一般用于被其他类继承而不用于创建实例
// 抽象类和内部定义的抽象方法都使用 abstract 关键字
// ts2.0开始 abstract 关键字不仅可以标记类和类里面的方法，还可以标记类中定义的属性和存取器
// abstract class T {
//   constructor(public name: string) { }
//   public abstract printName(): void
// }
// class U extends T{
//   constructor(name: string) {
//     super(name)
//     this.name = name
//   }
//   public printName() { // 非抽象类是不会实现继承抽象类中的方法的 要继承必须要先实现一下
//     console.log(this.name)
//   }
// }
// const t = new U('li')
// t.printName()

// 标记属性和存取器
// abstract class People {
//   public abstract _name: string
//   abstract get insideName(): string
//   abstract set insideName(value: string) // 存值器函数是不能标记返回值类型的
// }
// class P extends People {
//   public _name!: string
//   public insideName!: string
// }

// 实例属性
// 定义一个类，并创建实例后，这个实例的类型，它就是创建它的类
// 这个类既一个是值也是一个类型
// class People {
//   constructor(public name: string) { }
// }
// let p = new People('la')
// // const p: People = new People('la')
// class Animal {
//   constructor(public name: string) { }
// }
// p = new Animal('la')

// 类类型接口
// interface FoodInterface {
//   type: string
// }
// class FoodClass implements FoodInterface {
//   public type: string
//   // public abstract type: string
//   // 接口检测的是该接口所定义的类创建的实例
//   // 若使用abstract，type则作为类的静态属性，就只能通过类本身访问，而不能通过实例访问
//   // 实例上就不会有这个type属性，若实例上没有这个type属性则会报错
//   // 所以必须保证类创建完的实例符合这个接口
// }

// 接口继承类
// 当接口继承这个类之后，会继承这个类的成员，但是不包括其实现
// 即仅继承其成员及成员类型；
// 接口还会继承protected、private所修饰的成员，
// 当接口继承的类中包含这两个修饰符修饰的成员时，接口只可被这个类或这个类的子类实现
// class A {
//   protected name: string
// }
// interface I extends A { }
// // class B implements I {
// //   public name: string
// // }
// class B extends A implements I {
//   public name: string
// }
// 类型A中的属性name只能被其子类所继承
// 而类型B在实现接口I时，无法对接口I所继承的类型A中的属性进行声明
// 所以可以这样写 class B extends A implements I

// 泛型中使用类类型
// 创建一个create函数，传入的参数是类
const create = <T>(c: new () => T): T => {
  // 传入的是一个类，返回的是一个类创建的实例
  // 参数c是
  // new () 是调用这个类的构造函数 他的类型及创建实例后的实例类型
  return new c()
  // 返回传进来参数的实例
}
// 使用一个类创建一个实例，这个实例的类型也就是这个类
class Infos {
  public age: number | undefined
}
console.log(create<Infos>(Infos))
