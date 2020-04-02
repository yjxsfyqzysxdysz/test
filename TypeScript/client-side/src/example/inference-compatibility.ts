// 兼容性和类型推论

// 类型推论
// let names = 'li'
// names = 123 // 当未指定类型时，会根据第一次赋值的类型进行设置

// 多类型联合
// let arrs = [1, 'a'] // ts会默认为 let arrs: Array<number | string> = [1, 'a]

// 上下文类型，根据等号左边来确定类型
// window.onmousedown = (mouseEvent: any) => {
//   console.log(mouseEvent)
// }


// 类型兼容性
// interface Info {
//   name: string
// }
// let infos: Info
// const infos1 = { name: 'li' }
// const infos2 = { age: 18 }
// const infos3 = { age: 18, name: 'li' }
// infos = infos1
// // infos = infos2
// infos = infos3 // 递归检测，必须包含类型的声明，多了可以不能少了

// 函数兼容性
// 参数个数
// let x = (a: number) => 0
// let y = (b: number, c: string) => 0
// y = x
// // x = y // 关于参数赋值，要求右侧的参数必须小于等于左侧的参数个数
// 参数类型
// let x = (a: number) => 0
// let y = (b: string) => 0
// // x = y // 类型必须对应
// 可选参数和剩余参数
// const getSum = (arr: number[], callback: (...args: number[]) => number): number => {
//   return callback(...arr)
// }
// const res = getSum([1, 2, 3], (...args: number[]): number => args.reduce((a, b) => a + b, 0)) // args的reduce方法
// const res = getSum([1, 2, 3], (arg1: number, arg2: number, arg3: number):number => arg1 + arg2 + arg3)
// console.log(res)

// 函数参数双向协变
// let funcA = (arg: number | string): void => { }
// let funcB = (arg: number): void => { }
// // funcA = funcB // 可通过严格检测配置来检测是否可以
// funcB = funcA

// 返回值类型
// let x = ():string | number => 0
// let y = ():string => 'a'
// x = y
// // y = x // 返回值类型不兼容

// 函数重载
// function merge(arg1: number, arg2: number): number
// function merge(arg1: string, arg2: string): string
// function merge(arg1: any, arg2: any): any { // 该行不再是函数重载的一部分而是函数实体
//   return arg1 + arg2
// }
// console.log(merge(1, 2))
// console.log(merge('a', 'b'))
// function sum(arg1: number, arg2: number): number
// function sum(arg1: any, arg2: any): any {
//   return arg1 + arg2
// }
// let func = merge
// func = sum // 函数的兼容性，merge有2种重载情况，sum只有1种，所以不兼容

// 枚举
// 数字枚举类型和数字类型
// enum Status {
//   On,
//   Off
// }
// enum Animal {
//   Dog,
//   Cat
// }
// let s = Status.On
// s = 1
// s = Animal.Dog // 数字枚举类型仅与数字兼容，在不同枚举值之间是不兼容的

// 类的兼容性
// 仅比较类的实例成员，对类的静态成员和构造函数不进行比较
// class Animal {
//   public static age: number
//   constructor(public name: string) {}
// }
// class People {
//   public static age: string
//   constructor(public name: string) {}
// }
// class Food {
//   constructor(public name: number) {}
// }
// let animal: Animal
// let people: People
// let food: Food
// animal = people
// animal = food // 检测实例上的成员

// private // 私有
// protected // 受保护
// 用以上2个修饰符修饰的成员会对兼容性造成影响
// 当检查类的实例的兼容性时，如果目标类型（被赋值的类型）即创建实例的类的类，包含一个私有成员
// 源类型（用来赋值的值）必须包含同一个私有成员
// class Parent {
//   private age: number
//   constructor() { }
// }
// class Child extends Parent {
//   constructor() {
//     super()
//   }
// }
// class Other {
//   private age: number
//   constructor() { }
// }
// const children: Parent = new Child() // 子类是可以赋值给父类类型的值的
// const other: Parent = new Other()
// 不能将一个类的受保护或私有成员赋值给另一个类，如果是父-子类成继承是可以的

// 泛型的兼容性
// 泛型包含类型参数，这个类型参数可以是任意类型
// 使用时，类型参数会被指定为一个特定的类型，而这个类型只能影响使用了这个类型的参数的部分
// interface Data1<T> {}
// let data11: Data1<number>
// let data12: Data1<string>
// data11 = data12 // 若接口中什么都没有，则对于类型的声明是没有影响的
// interface Data2<T> {
//   data: T
// }
// let data21: Data2<number>
// let data22: Data2<string>
// data21 = data22 // 若接口中指定了实际的东西，则有了具体的属性要求
