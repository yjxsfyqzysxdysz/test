// 高级类型-1

// 交叉类型
// 取多个类型的并集 &
// const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
//   let res = <T & U>{}
//   res = Object.assign(arg1, arg2)
//   return res
// }
// mergeFunc({ a: 'a' }, { b: 'b' })

// 联合类型
// 多个类型取或集 |
// const getLengthFun = (content: string | number): number => {
//   if (typeof content === 'string') {
//     return content.length
//   } else {
//     return content.toString().length
//   }
// }
// console.log(getLengthFun('false'))

// 类型保护
// const valueList = [123, 'abc']
// const getRandomVal = () => {
//   const number = Math.random() * 10
//   if (number < 5) {
//     return valueList[0]
//   } else {
//     return valueList[1]
//   }
// }
// const item = getRandomVal()
// if (item.length) {
//   console.log(item.length)
// } else {
//   console.log(item.toFixed())
// }
// js书写无问题，ts书写会报错
// 解决方式：
// 1.使用类型断言
// if ((item as string).length) {
//   console.log((item as string).length)
// } else {
//   console.log((item as number).toFixed())
// }
// 2.使用类型保护
// 2.1复杂方式-封装函数
// function isString(value: number | string): value is string {
//   return typeof value === 'string'
// }
// if (isString(item)) {
//   console.log(item.length)
// } else {
//   console.log(item.toFixed())
// }
// 2.2简单方式-typeof
// if (typeof item === 'string') {
//   console.log(item.length)
// } else {
//   console.log(item.toFixed())
// }
// ts中会将 typeof 视为一个类型保护，但只能通过 === 或 !== 来定义
// typeof 比较的类型，只能是 string、number、boolean、symbol

// ts中会将 instanceof 视为一个类型保护
// class CreatedByClass1 {
//   public age = 18
//   constructor() { }
// }
// class CreatedByClass2 {
//   public name = 'li'
//   constructor() { }
// }
// function getRandomItem() {
//   return Math.random() < 0.5 ? new CreatedByClass1() : new CreatedByClass2()
// }
// const item = getRandomItem()
// if (item instanceof CreatedByClass1) {
//   console.log(item.age)
// } else {
//   console.log(item.name)
// }

// null和undefined
// 为任何类型的子类型
// let value = '123'
// value = undefined
// 在非严格模式下，不指定类型时，其类型为 value: string | undefined，对可选参数会自动加上undefined
// string | undefined / string | null / string | undefined | null 是3种不同的类型
// const sumFunc = (x: number, y?: number) => {
//   return x + (y || 0)
// }

// 类型保护和类型断言
// 当想要一个类型是 string | null 时，需要手动指定
// const getLengthFun = (value: string | null): number => {
//   // if (value === null) {
//   //   return 0
//   // } else {
//   //   return value.length
//   // }
//   return (value || '').length
// }
// 有些时候，编译器无法在变量声明前知道该类型是否为null的，需要用类型断言手动指定不是null
// function getSplicedStr(num: number | null): string {
//   function getRes(prefix: string) {
//     return prefix + num!.toFixed().toString()
//   }
//   num = num || 0.1
//   return getRes('li')
// }
// 加!进行类型断言。在定义函数时，并不清楚num是否为null，在后面对num赋值时，num则永不为null。所以，函数中的报错是有问题的，需要加类型断言
// console.log(getSplicedStr(2.1))

// 类型别名
// 关键字 type
// type TypeString = string
// let str2: TypeString
// type PositionType<T> = { x: T, y: T }
// const postion1: PositionType<number> = {
//   x: 1,
//   y: -1
// }
// const postion2: PositionType<string> = {
//   x: '1',
//   y: '-1'
// }
// 在属性中引用自己，嵌套用法（机构树）
// 只能在对象属性中引用类型自己
// type Childs<T> = {
//   current: T,
//   child?: Childs<T>
// }
// let ccc: Childs<string> = {
//   current: 'first',
//   child: {
//     current: 'second',
//     child: {
//       current: 'third'
//     }
//   }
// }
// type Childs = Childs[] // error
// 当对接口起别名时，不能使用 extends、implements
// 有时类型别名和接口是相同作用的
// type Alias = {
//   num: number
// }
// interface Interface {
//   num: number
// }
// let _alias: Alias = {
//   num: 123
// }
// let _interface: Interface = {
//   num: 321
// }
// _alias = _interface
// 何时启用
// 当定义的类型要用于拓展，要使用 extends、implements 修饰时使用接口
// 当无法通过接口，并要使用联合类型、元组类型时，用类型别名

// 字面量类型
// 字符串字面量、数字字面量
// 指定类型为具体的值
// 1.字符串字面量
// type Name = 'li'
// const names: Name = 'li' // 不赋值'li'则报错
// 使用联合类型赋值多个字符串
// type Direction = 'north' | 'east' | 'south' | 'west'
// function getDirectionFirstLetter(direction: Direction) {
//   return direction.substr(0, 1)
// }
// console.log(getDirectionFirstLetter('east')) // 会自动提示所选的参数

// 2.数字字面量
// type Age = 18
// interface InfoInterface {
//   name: string,
//   age: Age
// }
// const info: InfoInterface = {
//   name: 'li',
//   age: 18
// }

// 枚举成员类型
// 能做类型的枚举条件：
// 1、不带类型的初始成员
// 2、成员的值为字符串字面量
// 3、值为数值字面量或带负号的数值字面量
// 满足以上3条中任意一个，枚举值和枚举成员就可以作为类型使用

// 可辨识联合
// 单例类型、联合类型、类型保护、类型别名，这几种类型进行合并，创建一种“可辨识联合”的高级类型，也可称作“标签联合”或“代数数据类型”
// 要求要素：
// 1、要具有普通的单例类型属性（要作为辨识特征）
// 2、一个类型别名包含了哪些类型的联合（即将几个类型封装成联合类型，再起个别名）
// interface Square {
//   kind: 'square'
//   size: number
// }
// interface Rectangle {
//   kind: 'rectangle'
//   height: number
//   width: number
// }
// interface Circle {
//   kind: 'Circle'
//   radius: number
// }
// type Shape = Square | Rectangle | Circle
// function assertNever(value: never): never {
//   throw new Error('Unexpected object:' + value)
// }
// function getArea(s: Shape): number {
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size
//       break
//     case 'rectangle':
//       return s.width * s.height
//       break
//     case 'Circle':
//       return s.radius * s.radius * Math.PI
//       break
//     default:
//       return assertNever(s)
//       break
//   }
// }

// 完整性检查
// 1.使用 tslint 的 strictNullChecks，缺少会自动报错
// 2.使用 never 类型 见方法assertNever() 编译、运行时都会报错
