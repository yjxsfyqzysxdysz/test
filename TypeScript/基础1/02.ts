// typeScript中的函数

// 函数的定义
// 可选参数
// 默认参数
// 剩余参数
// 函数重载
// 箭头函数  es6
var consoleValue:any
// 1.函数的定义
// 函数声明
function fun1() {
  return 'fun1'
}
// consoleValue = fun1()
// 匿名函数
var fun2 = function () {
  return 'fun2'
}
// consoleValue = fun2()
// ts中的方法
// 函数声明
function fun3(): string {
  return 'fun3'
}
// consoleValue = fun3()
// 匿名函数
function fun4(): number {
  return 85
}
// consoleValue = fun4()

// ts定义方法传参
function fun5(name: string, age: number): string {
  return `${name} --- ${age}`
}
// consoleValue = fun5('aa', 55)
var fun6 = function (name: string, age: number): string {
  return `${name} --- ${age}`
}
// consoleValue = fun6('aa', 66)

// 没有返回值的方法
function fun7(): void{
  console.log('fun7')
}
// fun7()

// 2.方法可选参数
// es5方法的实参和形参可不一样，
// ts中若不一样，必须配置可选参数
function fun8(name: string, age?: number): string{
  if (age) {
    return `${name} ---- ${age}`
  } else {
    return `${name} ---- 年龄未知`
  }
}
// consoleValue = fun8('a', 5)
// consoleValue = fun8('b')
// 注意：可选参数必须配置到参数的最后面

// 3.默认参数
// es5中无法设置默认参数，ts和es6中都可以设置默认参数
function fun9(name: string, age: number = 20): string{
  return `${name} ---- ${age}`
}
// consoleValue = fun9('b')
// consoleValue = fun9('c', 55)

// 4.剩余参数
function fun10(a: number, b: number, c: number, d: number): number {
  return a + b + c + d
}
function fun11(...res: number[]): number {
  var _a = 0
  for (var i = 0; i < res.length; i++) {
    _a += res[i]
  }
  return _a
}
function fun12(a:number, ...res: number[]): number {
  var _a = a
  for (var i = 0; i < res.length; i++) {
    _a += res[i]
  }
  return _a
}
// consoleValue = fun10(1, 2, 3, 4)
// consoleValue = fun11(1, 2, 3, 4)
// consoleValue = fun12(1, 2, 3, 4)

// 5.ts函数重载
// java中方法的重载：重载指的是两个或者两个以上同名函数，但它们的参数不一样，这时会出现函数重载的情况。
// typescript中的重载：通过为同一个函数提供多个函数类型定义来试下多种功能的目的。
// ts为了兼容es5 以及 es6 重载的写法和java中有区别。

// es5中出现同名方法，下面的会替换上面的方法
// function fun13(config) {}
// function fun13(config, value) {}

// ts函数重载
function fun13(name: string): string
function fun13(num: number): number
function fun13(str: any): any{
  if (typeof str === 'string') {
    return 'any -- ' + str
  }
  return 'number || string -- ' + str
}
// consoleValue = fun13('st')
// consoleValue = fun13(10)
// consoleValue = fun13(false) // 错误写法

function fun14(name: string): string
function fun14(name: string, age: number): string
function fun14(name: any, age?: any): any{
  if (age) {
    return `my name is ${name}, i am ${age} years old`
  } else {
    return `my name is ${name}`
  }
}
// consoleValue = fun14('A')
// consoleValue = fun14('A', 10)

// 6.箭头函数  es6
// this指向的问题    箭头函数里面的this指向上下文
var fun15 = () => {}
fun15 = function () { }

console.log(consoleValue)