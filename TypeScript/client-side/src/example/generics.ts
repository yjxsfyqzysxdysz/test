// 泛型
// T为泛型变量，理论上可以使用任何字母，习惯上为大写字母，一般用 T
// const getArray = <T>(value: T, times: number = 5): T[] => {
//   return new Array(times).fill(value)
// }
// getArray<number>(123, 4)

// 2个泛型变量
// const getArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
// const getArray = <T, U>(param1: T, param2: U, times: number): Array<[T, U]> => {
//   return new Array(times).fill([param1, param2])
// }
// 使用泛型时，可以不明确定义参数类型，ts会自动根据参数的类型进行判断
// getArray(1, 'a', 3)

// 泛型的使用
// let getArray: <T>(arg: T, times: number) => T[]
// getArray = (arg: any, times: number) => {
//   return new Array(times).fill(arg)
// }
// getArray(123, 3)

// 类型别名
// type GetArry = <T>(arg: T, times: number) => T[]
// let getArray: GetArry = (arg: any, times: number) => {
//   return new Array(times).fill(arg)
// }

// 接口的形式 类型别名
// interface GetArray {
//   <T>(arg: any, times: number): T[]
// }
// 泛型变量可以提升至最外层，内部都可以使用这个泛型变量
// interface GetArray<T> {
//   (arg: any, times: number): T[],
//   array: T[]
// }

// 泛型约束
// 定义一个对象，想要对只能存在的施行
// interface ValueWithLength {
//   length: number
// }
// const getArray = <T extends ValueWithLength>(arg: T, times: T): T[] => {
//   return new Array(times).fill(arg)
// }
// getArray([1, 2], 3)
// // getArray(1, 2)
// getArray({ length: 2 }, 3)

// 编译阶段就提醒
// const getProps = <T, K extends keyof T>(object: T, propName: K) => {
//   return object[propName]
// }
// const objs = { a: 'a', b: 'b' }
// getProps(objs, 'a')
// getProps(obj, 'c') // 无c这个参数
