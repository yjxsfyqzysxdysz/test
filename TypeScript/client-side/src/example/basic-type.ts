// 布尔类型
// let bool: boolean
// bool  = false

// 数值类型
// let num: number
// num = 123 // 十进制
// num = 0b101010101010 // 二进制
// num = 0o173 // 八进制
// num = 0x7b // 十六进制

// 字符串类型
// let str: string
// str = 'abc'
// str = `number is ${num}`

// 数组类型
// 写法1
// let arr1: number[]
// arr1 = [5]
// 写法2
// let arr2: Array<number> // arr2为array，参数为number
// let arr3: (string | number)[]
// arr3 = [1, 'a']

// 元组类型
// let tuple: [string, number, boolean] // 规定长度、规定类型(v2.6之后对长度有限制，之前无长度限制，超出元素只要类型符合即可)
// tuple = ['a', 1, true]

// 枚举类型
// enum Roles {
//   SUPER_ADMIN,
//   ADMIN = 4,
//   USER
// }
// 默认为自然数顺序
// 可手动修改，之后的自动递增

// any类型
// let value: any
// value = '123'
// value = false
// value = 123

// void类型
// 不是任何类型，通常是函数不返回值时使用
// const consoleText = (text: string): void => {
//   console.log(text)
// }
// consoleText('text')
// let v: void
// v = undefined
// // v = null

// null 和 undefined
// let u: undefined
// u = undefined
// let n: null
// n = null

// never类型
// 返回为Error、死循环、函数自调用
// const errorFunc = (message: string): never => {
//   throw new Error(message)
// }
// const infiniteFunc = (): never => {
//   while(true) {}
// }
// let neverVariable = (() => {
//   while (true) {}
// })()

// objevt类型
// let obj = {
//   name: 'a'
// }
// let obj2 = obj
// obj2.name = 'A'

// function getObject(obj: Object): void {
//   console.log('obj', obj)
// }
// getObject(obj2)

// 类型断言
// 类型断言的2种写法
// <>、as
// *.jsx中不能使用<>的形式
// const getLength = (target: string | number) => {
//   if ((<string>target).length || (target as string).length === 0) {
//     return (<string>target).length
//   } else {
//     return target.toString().length
//   }
// }
// getLength(5)
