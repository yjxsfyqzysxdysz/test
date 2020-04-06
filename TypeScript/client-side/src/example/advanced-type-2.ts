// 高级类型-2

// this类型
// 在每个方法中return this，可以实现链式调用的效果
// class Counter {
//   constructor(public count: number = 0) { }
//   public add(value: number) {
//     this.count += value
//     return this
//   }
//   public subtract(value: number) {
//     this.count -= value
//     return this
//   }
// }
// let counter = new Counter(10)
// console.log(counter)
// console.log(counter.add(3).subtract(5))

// class PowCounter extends Counter {
//   constructor(public count: number = 0) {
//     super(count)
//   }
//   public pow(value: number) {
//     this.count = this.count ** value // ** es7的幂运算符
//     return this
//   }
// }
// let powCounter = new PowCounter(2)
// console.log(powCounter.pow(3).add(5).subtract(9))

// 索引类型
// 索引类型查询操作符、索引访问操作符
// 索引类型查询操作符
// keyof
// 连接一个类型，返回一个由这个类型所有属性名组成的联合类型
// interface Info {
//   name: string
//   age: number
// }
// let infoProp: keyof Info
// infoProp = 'name'
// infoProp = 'age'
// infoProp = 'sex'
// 相当于接口类型为其属性字段名字符串组成的联合类型
// 通过和泛型联合使用，ts就可以检查使用了动态属性名的代码

// function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
//   return names.map(n => obj[n])
// }
// const infoObj = {
//   name: 'li',
//   age: 18
// }
// let values: Array<string | number> = getValue(infoObj, ['name', 'age'])
// console.log(values) // 返回属性值所组成的数组

// 索引访问操作符
// []
// interface Info {
//   name: string
//   age: number
// }
// type NameTypes = Info['name'] // string类型

// function getProperty<T, K extends keyof T>(o: T, number: K): T[K]{
//   return o[name]
// }

// interface Objs<T> {
//   [key: string]: T // 索引类型为 number 则索引值必须是 number；索引类型为 string，则索引值可以为 number | string
// }
// let keys: keyof Objs<number> // number
// const objs1: Objs<number> = {
//   age: 18
// }
// let keys: Objs<number>['name'] // number

// interface Type {
//   a: never
//   b: never
//   c: string
//   d: number
//   e: undefined
//   f: null
//   g: object
// }
// type Test = Type[keyof Type] // 非 never、null、undefined 组成的联合类型

// 映射类型
// 基础、由映射类型进行推断、增加或移除特定修饰符、keyof和映射类型在2.9的升级、元组和数组上的映射类型
// ts提供了借助久类型创建新类型的方式——映射类型
// 以相同的形式去转换旧类型中每一个属性

// 基础
// interface  Info {
//   age: number
//   name: string
//   sex: string
// }
// interface ReadonlyType {
//   readonly age: number
// }
// type ReadonlyType<T> = {
//   readonly [P in keyof T]?: T[P]
//   // in代表for-in循环
//   // keyof T 代表所有属性名
//   // P in 属性名 就代表对所有属性名的遍历
//   // T[P] 可以理解为这个对象。该属性对应的属性值
//   // ? 所有都是可选属性
// }
// type readonlyInfo1 = ReadonlyType<Info> // 十分像一个函数
// let info1: readonlyInfo1 = {
//   age: 18,
//   name: 'li',
//   sex: 'man'
// }
// info1.age = 20

// ts内置了每一个字段都是只读的(Readonly)、可选的(Partial)、取消可选(Required)、(Pick)、(Record)映射类型
// type readonlyInfo2 = Partial<Info>

// Pick 传入一个对象、一个属性列表，返回部分这个对象中部分的属性值
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
// eg:
// interface Info2 {
//   name: string
//   age: number
//   address: string
// }
// const info2: Info2 = {
//   name: 'li',
//   age: 18,
//   address: 'a'
// }
// function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
//   const res: any = {}
//   keys.map(key => {
//     res[key] = obj[key]
//   })
//   return res
// }
// const nameAndAddress = pick(info2, ['address', 'age'])
// console.log(nameAndAddress) // { age: 18, address: 'a' }

// Record 构造一组属性为K，类型为T所组成的类型 将一个对象的属性返回为其他值时
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// }
// eg:
// function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
//   const res: any = {}
//   for (const key in obj) {
//     res[key] = f(obj[key])
//   }
//   return res
// }
// const names = { 0: 'hello', 1: 'world', 2: 'bye' }
// const lengths = mapObject(names, s => s.length)
// console.log(lengths)

// 同态： 两个相同类型的代数结构之间的结构保持映射

// 由映射类型进行推断
// 拆包
// 1.封包
// type Proxy<T> = {
//   get(): T
//   set(value: T): void
// }
// type Proxify<T> = {
//   [P in keyof T]: Proxy<T[P]>
// }
// function proxify<T>(obj: T): Proxify<T> {
//   const res = {} as Proxify<T>
//   for (const key in obj) {
//     res[key] = {
//       get: () => obj[key],
//       set:(value) => obj[key] = value
//     }
//   }
//   return res
// }
// let props = {
//   name: 'li',
//   age: 18
// }
// let proxyProps = proxify(props)
// console.log(proxyProps) // 每个属性都含有get、set方法
// 2.拆包
// function unproxify<T>(t: Proxify<T>): T {
//   const res = {} as T
//   for (const k in t) {
//     res[k] = t[k].get()
//   }
//   return res
// }
// let originalProps = unproxify(proxyProps)
// console.log(originalProps) // 根据如何封装来写一个逆向的拆包函数，由映射类型进行推断，推断出原始类型

// 增加或移除特定修饰符
// + -
// interface  Info {
//   readonly age?: number
//   readonly name?: string
//   readonly sex?: string
// }
// type RemoveReadonluType<T> = {
//   -readonly [P in keyof T]-?: T[P]
// }
// type readonlyInfo1 = RemoveReadonluType<Info> // 十分像一个函数

// keyof和映射类型在2.9的升级
// 支持用number和symbol命名的属性
// const stringIndex = 'a'
// const numberIndex = 1
// const symbolIndex = Symbol()
// type Objs = {
//   [stringIndex]: string
//   [numberIndex]: number
//   [symbolIndex]: symbol
// }
// type keysType = keyof Objs
// type ReadonlyType<T> = {
//   readonly [P in keyof T]: T[P]
// }
// let objs: ReadonlyType<Objs> = {
//   a: 'aa',
//   1: 1,
//   [symbolIndex]: Symbol()
// }
// objs.a = 'bb' // error

// 元组和数组上的映射类型
// ts3.1版本，在元组和数组上的映射类型会生成新的元组和数组，并不会创建一个新的类型
// 这个类型上会有push、pull等数组方法和数组属性
// type MapToPromise<T> = {
//   [K in keyof T]: Promise<T[K]>
// }
// type Tuple = [number, string, boolean]
// type PromiseTuple = MapToPromise<Tuple>
// let tuple: PromiseTuple = [
//   new Promise((resolve, reject) => resolve(1)),
//   new Promise((resolve, reject) => resolve('a')),
//   new Promise((resolve, reject) => resolve(false))
// ]

// unknow
// ts3.0中添加的顶级类型
// 相当于any是安全的
// 1.任何类型都可以赋值给unknown类型
// let val1: unknown
// val1 = 'a'
// val1 = 1

// 2.如果没有类型断言或基于控制流的类型细化时，unknown不可以赋值给其他类型，此时它只能赋值给unknown和any类型
// let val2: unknown
// let val3: string = val2 // 不能将类型“unknown”分配给类型“string”
// val1 = val2

// 3.如果没有类型断言或基于控制流的类型细化时不能在它上面进行任何操作
// let val4: unknown
// val4 += 1

// 4.unknown与任何其他类型组成的交叉类型，最后都等于其他类型
// type type1 = string & unknown
// type type2 = number & unknown
// type type3 = unknown & unknown
// type type4 = unknown & string[]

// 5.unknow与任何其他类型(除了any)组成的联合类型，都等于unknown类型
// type type5 = unknown | string
// type type6 = unknown | any
// type type7 = unknown | number[]

// 6.never类型是unknown的子类型
// type type8 = never extends unknown ? true : false // true

// 7.keyof unknown 等于类型never
// type type9 = keyof unknown

// 8.只能对unknown进行等或不等操作，不能进行其他操作
// val1 === val2 // tslint报错
// val1 !== val2 // tslint报错
// val1 += val2 // ts报错

// 9.unknown不能访问其属性，作为函数调用和作为类创建实例
// 即不能作为对象去掉用、函数去使用、类去创建实例
// let val10: unknown
// val10.age // error
// val10() // error
// new val10() // error

// 10.使用映射类型时，如果遍历的是unknown类型，则不会映射任何属性
// type Types<T> = {
//   [P in keyof T]: number
// }
// type types1 = Types<any>
// type types2 = Types<unknown>

// 条件类型
// ts2.8引入
// 基础、分布式条件类型、条件类型的类型推断-infer、TS预定义条件类型

// 基础
// T extends U ? X : Y
// type Type<T> = T extends string ? string : number
// let index: Type<'a'>

// 分布式条件类型
// 当待检测的类型是联合类型时，该条件类型就被称为分布式条件类型
// 在实例化时，ts会自动的分化成联合类型
// type TypeName<T> = T extends any ? T : never
// type Type = TypeName<string | number>

// type TypeName<T> =
//   T extends string ? string :
//   T extends number ? number :
//   T extends boolean ? boolean :
//   T extends undefined ? undefined :
//   T extends () => void ? () => void :
//   object
// type Type1 = TypeName<() => void>
// type Type2 = TypeName<string[]>
// type Type3 = TypeName<(() => void) | string[]>

// type Diff<T, U> = T extends U ? never : T
// type Test = Diff<string | number | boolean, undefined | number>
// 会判断前边的是否是后边的子类型，string不是返回string、number是返回never、number不是返回number
// 该方法ts已经内置 Exclude

// type Type4<T> = {
//   [K in keyof T]: T[K] extends Function ? K : never
// }[keyof T]
// /**
//  * T[K] extends Function ? K : never
//  * 判断每一项是否为function，若是继承属性名，若不是继承never
//  *
//  * [keyof T]
//  * 返回每个所有不为never的属性名
//  */
// interface Part {
//   id: number
//   name: string
//   subparts: Part[]
//   undatePart(newName: string): void
// }
// type Test1 = Type4<Part>

// 条件类型的类型推断 - infer
type Type1<T> = T extends any[] ? T[number] : T
// 判断是否为数组，返回值，否则返回自身
type Test1 = Type1<string[]>
type Test2 = Type1<string>

type Type2<T> = T extends Array<infer U> ? U : T
// 判断是否为数组，返回元素的类型，否则返回自身
type Test3 = Type2<string[]>
type Test4 = Type2<string>

// TS预定义条件类型
// ts2.8

// // Exclude<T, U> 选取T中不能赋值给U的
// type Type3 = Exclude<'a' | 'b' | 'c', 'a'>

// // Extract<T, U> 选取T中可以赋值给U的
// type Type4 = Extract<'a' | 'b' | 'c', 'a'>

// // NonNullable<T> 从T中去掉null和undefined
// type Type5 = NonNullable<string | number | null | undefined>

// // ReturnType<T> 获取函数类型返回值类型
// type Type6 = ReturnType<() => string>
// type Type7 = ReturnType<() => void>

// // InstanceType<T> 获取构造函数类型的实例类型
// // type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
// class AClass {
//   constructor() { }
// }
// type T1 = InstanceType<typeof AClass>
// type T2 = InstanceType<any> // any是任何类型的子类型
// type T3 = InstanceType<never> // never是任何类型的子类型
// // type T4 = InstanceType<string> // error 不满足构造函数类型
