// 装饰器

/**
 * tsconfig.json
 * 打开 "experimentalDecorators": true
 */
// 目前属于实验性质

/**
 * 基础
 *  装饰器定义
 *  装饰器工厂
 *  装饰器组合
 *  装饰器求值
 * 类装饰器
 * 方法装饰器
 * 访问装饰器
 * 属性装饰器
 * 参数装饰器
 */

/**
 * 基础
 * 装饰器定义
 * 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上
 * 装饰器使用 @expression这种形式，expression必须是一个函数或求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入
 *
 * 要注意装饰器要紧挨着要声明的前面
 * 所有的装饰器不能用在声明文件(.d.ts为后缀的文件中)，和任何外部上下文中
 */

//  1、一般用法
// function setProp(target) {
//   // ...
// }
// @setProp
// 2、装饰器工厂
/**
 * 如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数
 * 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用
 */
// function setProp() { // 装饰器工厂
//   return function (target) { // 装饰器
//     // ...
//   }
// }
// @setProp()

/**
 * 可以使用多个装饰器作用于一个参数上
 * 当有装饰器工厂时，先对装饰器工厂从上往下先作用获得装饰器，再从下往上挨个调用
 * 当仅有实际装饰器时，作用顺序为从下往上
 */

// function setName() {
//   console.log('get setName')
//   return (target) => {
//     console.log('setName')
//   }
// }
// function setAge() {
//   console.log('get setAge')
//   return (target) => {
//     console.log('setAge')
//   }
// }
// function setProp(target) {
//   console.log('get setProp')
// }
// @setProp
// @setName()
// @setAge()
// class ClassDec { }

// 装饰器求值
/**
 * 装饰器的顺序
 * 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员
 * 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员
 * 参数装饰器应用到构造函数
 * 类装饰器应用到类
 */

/**
 * 类装饰器
 * 类装饰器在类声明之前被声明（紧靠着类声明）
 * 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义
 * 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）
 * 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数
 * 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明
 *
 * 注意
 * 如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些
 */

// let sign
// function setName(name: string) {
//   return (target: new() => any) => {
//     sign = target
//     console.log(target.name)
//   }
// }
// @setName('li')
// class ClassDec {
//   constructor() { }
// }
// console.log(sign)
// console.log(sign === ClassDec)
// console.log(sign === ClassDec.prototype.constructor)

// function addName(val: new() => any) {
//   val.prototype.name = 'li'
// }
// @addName
// class ClassD {
//   constructor() { }
// }
// interface ClassD { // 进行声明合并
//   name: string
// }
// const d = new ClassD()
// console.log(d)
// console.log(d.name) // name在原型上

// 情况一
// function classDec<T extends new (...arg: any[]) => {}>(target: T) {
//   return class extends target {
//     public newProperty = 'new property'
//     public hello = 'override'
//   }
// }

// @classDec
// class Greeter {
//   public property = 'property'
//   public hello: string
//   constructor(m: string) {
//     this.hello = m
//   }
// }
// console.log(new Greeter('world'))
/**
 * 创建的实例
 * 不仅包含原来的实例属性，还包含装饰器中定义的实例属性
 * 由于装饰器会返回一个类
 * 这个类会继承原来的类
 * 所以会将2个类中的属性进行合并，相同属性的子类会覆盖父类
 */

//  情况一变更
// function classDec(target: any): any {
//   return class {
//     public newProperty = 'new property'
//     public hello = 'override'
//   }
// }

// @classDec
// class Greeter {
//   public property = 'property'
//   public hello: string
//   constructor(m: string) {
//     this.hello = m
//   }
// }
// console.log(new Greeter('world'))
/**
 * 不进行继承
 * 会用装饰器中的类替换掉原来的类
 */


//  方法装饰器
/**
 * 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）
 * 它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义
 * 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中
 *
 * 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
 * * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * * 成员的名字
 * * 成员的属性描述符
 *
 * 注意
 * 如果代码输出目标版本小于ES5，属性描述符将会是undefined
 * 如果方法装饰器返回一个值，它会被用作方法的属性描述符
 *
 * 注意
 * 如果代码输出目标版本小于ES5返回值会被忽略
 */

// 属性装饰符
/**
 * 对象可以设置属性
 * 如果属性值是函数，则这个函数称为方法
 * 每一个属性和方法定义的时候，都伴随3个属性描述符
 * configurable // 可配置
 * writable // 可写
 * enumerable // 可遍历
 */
// interface ObjWithAnyKeys {
//   [key:string]: any
// }
// let obj: ObjWithAnyKeys = {}
// Object.defineProperty(obj, 'name', {
//   value: 'li',
//   writable: false,
//   configurable: true,
//   enumerable: true
// })
// console.log(obj.name)

// 情况一
// function enumerable(bool: boolean) {
//   return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//     // 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
//     console.log(target, propertyName)
//     descriptor.enumerable = bool
//   }
// }
// class ClassF {
//   constructor(public age: number) { }
//   // @enumerable(true)
//   @enumerable(false)
//   public getAge() {
//     return this.age
//   }
// }
// const classF = new ClassF(18)
// console.log(classF)
// for (const key in classF) {
//   console.log(key)
// }

// 情况一变更
// function enumerable(bool: boolean): any {
//   return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//     return {
//       value() {
//         return 'not age'
//       },
//       enumerable: bool
//     }
//   }
// }
// class ClassF {
//   constructor(public age: number) { }
//   @enumerable(false)
//   public getAge() {
//     return this.age
//   }
// }
// const classF = new ClassF(18)
// console.log(classF)
// console.log(classF.getAge())
// 方法装饰器返回的值作为属性描述对象进行替换

// 访问器装饰器
/**
 * 访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）
 * 访问器装饰器应用于访问器的 属性描述符并且可以用来监视，修改或替换一个访问器的定义
 * 访问器装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里
 *
 * 注意
 * TypeScript不允许同时装饰一个成员的get和set访问器
 * 取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上
 * 这是因为，在装饰器应用于一个属性描述符时，它联合了get和set访问器，而不是分开声明的
 */
// function enumerable(bool: boolean) {
//   return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//     descriptor.enumerable = bool
//   }
// }
// class ClassG {
//   private _name: string
//   constructor(name: string) {
//     this._name = name
//   }
//   @enumerable(false)
//   get name() {
//     return this._name
//   }
//   set name(name) {
//     this._name = name
//   }
// }
// const classG = new ClassG('li')
// for (const key in classG) {
//   console.log(key)
// }

// 属性装饰器
/**
 * 属性装饰器声明在一个属性声明之前（紧靠着属性声明）
 * 属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里
 * 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
 * * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * * 成员的名字
 *
 * 注意
 * 属性描述符不会做为参数传入属性装饰器，这与TypeScript是如何初始化属性装饰器的有关
 * 因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没办法监视或修改一个属性的初始化方法
 * 返回值也会被忽略
 * 因此，属性描述符只能用来监视类中是否声明了某个名字的属性
 */
// function printPropertyName(target: any, propertyName: string) {
//   console.log(propertyName)
// }
// class ClassH {
//   @printPropertyName
//   public name: string
// }

// 参数装饰器
/**
 * 参数装饰器声明在一个参数声明之前（紧靠着参数声明）
 * 参数装饰器应用于类构造函数或方法声明
 * 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如 declare的类）里
 * 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
 * * 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * * 成员的名字
 * * 参数在函数参数列表中的索引
 *
 * 注意
 * 参数装饰器只能用来监视一个方法的参数是否被传入
 * 参数装饰器的返回值会被忽略
 */
// function required(target: any, propertyName: string, index: number) {
//   console.log('propertyName', propertyName, 'index', index)
// }
// class ClassI {
//   public name: string = 'li'
//   public age: number = 18
//   public getInfo(@required prefix: string, @required infoType: string): any {
//     return prefix + ' ' + this[infoType]
//   }
// }
// interface ClassI {
//   [key: string]: string | number | Function
// }
// const classI = new ClassI()
// classI.getInfo('hi', 'age')
