// 函数类型

// function add(arg1: number, arg2: number): number {
//   return arg1 + arg2
// }
// es6写法
// const add = (arg1: number, arg2: number) => arg1 + arg2

// let add: (x: number, y: number) => number
// add = (arg1: number, arg2: number): number => arg1 + arg2
// let arg3 = 3
// add = (arg1: number, arg2: number) => arg1 + arg2 + arg3 // 这种情况 arg3 是不用定义到类型里的

// 类型别名定义函数类型
// type Add = (x:number, y:number) =>number
// let addFunc: Add
// let addFunc
// addFunc = (arg1: number, arg2: number) => arg1 + arg2

// 可选参数
// addFunc = (arg1, arg2, arg3) => arg1 + arg2 + (arg3 ? arg3 : 0)
// ts中可选参数必须在必选参数之后
// type AddFunction = (arg1: number, arg2: number, arg3: number) => number
// let addFunction: AddFunction
// addFunction = (x: number, y: number) => x + y
// addFunction = (x: number, y: number, z: number) => x + y + z

// 可选参数默认值
// 可写类型也可以不写类型，ts会根据默认值的类型进行
// const addFunctions = (x: number, y = 3) => x + y
// console.log(addFunctions(1 + 2))

// 打散操作
// es5
// function handlerarr() {
//   return Array.prototype.slice.apply(arguments).join('_')
// }
// handlerarr(1)
// handlerarr(1, 2)
// handlerarr(1, 2, 3)
// es6
// let arr1 = [1, 2, 3]
// let arr2 = [...arr1]

// const handleData = (arg1: number, ...args: number[]) => {
//   // ...
// }

// 函数重载
// 函数重载只能用function来定义
// function handleData(x: string): string []
// function handleData(x: number): number[]
// // 函数实体
// function handleData(x: any): any {
//   if (typeof x === 'string') {
//     return x.split('')
//   } else {
//     return x.toString().split('').map(item => Number(item))
//   }
// }
// handleData('abc')
// handleData(123)
