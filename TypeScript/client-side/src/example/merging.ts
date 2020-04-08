// 声明合并
// 补充知识
// 见声明合并.png

// 合并接口
/**
 * 多个同名接口定义的非函数成员，命名应该是不重复的
 * 若重复，其类型应该是相同的，否则会报错
 * 函数成员，每个同名的函数成员都会被当成函数的重载
 * 合并后，后面的接口拥有更高的优先级
 */
// interface InfoInter {
//   name: string
//   getRes(input: string): number
// }
// interface InfoInter {
//   age: number
//   getRes(input: number): string
// }
// let infoInter: InfoInter
// infoInter = {
//   name: 'li',
//   age: 20,
//   getRes(text: any): any {
//     if (typeof text === 'string') {
//       return text.length
//     } else {
//       return String(text)
//     }
//   }
// }
// console.log(typeof infoInter.getRes(123))

// 合并命名空间
// 同名的命名空间，会将多个命名空间导出的内容进行合并
// namespace Validations {
//   const numberReg = /^[0-9]+$/
//   export const checkNumber = () => { }
// }
// namespace Validations {
//  //   console.log(numberReg)
//   export const checkString = () => { }
// }
// 若没有使用export修饰，则在另一个命名空间中无法访问

// 不同类型的合并
/**
 * 同名的类和命名空间在定义的时候
 * 类的定义必须在命名空间的前面
 * 最后合并的结果
 * 一个包含以命名空间导出内容为静态属性的类
 */
// class Validations {
//   constructor() { }
//   public checkType() { }
// }
// namespace Validations {
//   export const numberReg = /^[0-9]+$/
// }
// console.log(Validations)
// console.log(Validations.numberReg)

// 命名空间和函数
// 函数的定义要放在同名的命名空间前面
// function countUp() {
//   countUp.count++
// }
// namespace countUp {
//   export let count = 0
// }
// console.log(countUp.count)
// countUp()
// console.log(countUp.count)
// countUp()
// console.log(countUp.count)
// countUp()

// 命名空间和枚举
// enum Clors {
//   red,
//   green,
//   blue
// }
// namespace Clors {
//   export const yellow = 3
// }
// console.log(Clors)
// 只有yellow = 3，没有 3 = yellow
