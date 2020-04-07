// 模块导出 变量、常量
// export const name = 'li'
// export const age = 18
// export const address = 'beijing'

const name = 'li'
const age = 18
const address = 'beijing'
export { name, age, address }

// 模块导出 函数
export function func () {}
// 模块导出 类
export class A { }

function func1 () { }
class B { }
const b = ''

export {
  func1 as Function1,
  B as ClassB,
  b as StringB,
  b as String
}
// export 命令导出的是一个接口而不是一个具体的值
// 外部通过接口获取值，而不是引入了一个值
// export 导出的接口与其对应的值是动态绑定的

// export 命令可以出现在模块中处于模块顶层的任何位置
// 指 export 语句不能出现在块级作用域中
// es6中模块的设计是静态编译





















