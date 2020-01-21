let num: number

// 匿名函数
function run() {
  console.log('asdas')
}

function run1(): void { // 没有返回值的方法
  console.log('void')
}

function run2(): number {
  console.log('number')
  return 465
}

function run3(): number | null {
  console.log('number | null')
  // return null
  return 566
}

// 定义方法传参
// ?可选参数
let a = function(num: string | void, age?: number | void) { // age可传可不传
  return num + '----' + age
}
a('sd', 85)
a()


/**
 * 默认参数
 */
function getInfo(name: string, age: number=20):string {
  if (age) {
    return `${name} --- ${age}`
  } else {
    return name + '----asafas'
  }
}
getInfo('sdad', 5)

/**
 * 剩余参数
 */
function sum(...result:number[]):number {
// function sum(a: number, b: number, ...result: number[]): number {
  // 将第一个数赋值给a
  // 将第二个数赋值给b
  // 将剩余的数赋值给result
  let sum = 0
  result.map(e => {
    sum += e
  })
  return sum
}

sum(1, 5, 6, 5, 6, 5, 6, 6)


// 函数重载
// 同名函数被替换
// 根据传入的参数类型不同选用不同的函数
function getinfo(num: number): string
function getinfo(num: string): string
function getinfo(num: any): any
function getinfo(num: any): any {
  return num + '--' + typeof num
}
console.log(getinfo(true))
let b: string
b = 'ad'


let decimal: number = 6
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744

let color: string = "blue"
color = 'red'

let fullName: string = `Bob Bobbington`
let age: number = 37
let sentence1: string = `Hello, my name is ${ fullName }. I'll be ${ age + 1 } years old next month.`
// 和上文效果类似
let sentence2: string = "Hello, my name is " + name + ".\n\n" + "I'll be " + (age +  1 ) +  " years old next month."


// let sym1 = Symbol()
// let sym2 = Symbol("key") 
// // 可选的字符串key
// // Symbols是不可改变且唯一的。

// let sym3 = Symbol("key")
// let sym4 = Symbol("key")
// sym3 === sym4
// // false, symbols是唯一的

// // 像字符串一样， symbols也可以被用做对象属性的键。
// let sym = Symbol()
// let obj = {[sym]: "value"}
// console.log(obj[sym]) // "value"

// const getClassNameSymbol = Symbol()
// class C {
//   [getClassNameSymbol](){
//     return "C"
//   }
// }
// let c = new C()
// let className = c[getClassNameSymbol]() // "C"

let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// Declare a tuple type
let x: [string, number]
// Initialize it
x = ["hello", 10] // OK
// Initialize it incorrectly
x = [10, "hello"] // Error

console.log(x[0].substring(1)) // OK
console.log(x[1].substring(1)) // Error, 'number' does not have 'substring'

x[3] = "world" // Error, Property '3' does not exist on type '[string, number]'.
console.log(x[5].toString()) // Error, Property '5' does not exist on type '[string, number]'.



enum Color{ Red, Green, Blue }
let c: Color= Color.Green // 1

enum Color{ Red = 1, Green, Blue }
let c: Color = Color.Green // 2

enum Color{ Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green // 2

enum Color{ Red = 1, Green, Blue }
let colorName: string= Color[2]
console.log(colorName) // 显示'Green'因为上面代码里它的值是2

const { log } = console
enum Color{ Red = 'rRed', Green = 'rGreen', Blue = 'rBlue' }
const c: Color = Color.Red // 1
log(c) // rRed
log(Color.Green) // rGreen
log(Color.Blue) // rBlue

// Enum member must have initializer.
enum Color{ Red = 'rRed', Green, Blue }

// fine
enum Color{ Red = 0, Green = 'rGreen', Blue = 'rBlue' }
// Computed values are not permitted in an enum with string valued members.
enum Color{ Red = true, Green = 'rGreen', Blue = 'rBlue' }

// Type 'true' is not assignable to type 'Color'
// Type 'false' is not assignable to type 'Color'
enum Color{ Red = 0, Green = true, Blue = false }

// Type 'null' is not assignable to type 'Color'
// Type 'undefined' is not assignable to type 'Color'
enum Color{ Red = 0, Green = null, Blue = undefined }

// Type 'never[]' is not assignable to type 'Color'
// Type '{}' is not assignable to type 'Color'
enum Color{ Red = 0, Green = [], Blue = {} }

const sys = Symbol()
// Type 'unique symbol' is not assignable to type 'Color'.
// Type '{}' is not assignable to type 'Color'
enum Color{ Red = 0, Green = sys, Blue }

let notSure: any = 4
notSure = "maybe a string instead"
notSure = false
// okay, definitely a boolean

let notSure: any = 4
notSure.ifItExists() //  TSLint will not throw Error, okay, ifItExists might exist at runtime
notSure.toFixed() // TSLint will not throw Error, okay, toFixed exists (but the compiler doesn't check)
let prettySure: Object = 4
prettySure.toFixed() // TSLint will throw Error: Property 'toFixed' does not exist on type 'Object'.

let list: any[] = [1, true, "free"]
list[1] = 100


function warnUser(): void{
  console.log("This is my warning message")
}

let unusable: void = undefined


// fine
function testBreak(): void{
  while (true) {
    break
  }
}
// fine
function testIf(): void{
  if (true) {
  }
}
// fine
function testDoWhile(x: number): void{
  do {
  } while (x > 3)
}
// fine
function testAny(test: any): void{
  return test // fine
}
const { log } = console
log(testAny(1)) // 1

function testString(test: string): void{
  return test // Type 'string' is not assignable to type 'void'.
}
function testNumber(test: number): void{
  return test // Type 'number' is not assignable to type 'void'.
}
function testBoolean(test: boolean): void{
  return test // Type 'boolean' is not assignable to type 'void'.
}
function testUndefined(test: undefined): void{
  return test // Type 'undefined' is not assignable to type 'void'.
}
function testNull(test: null): void{
  return test // Type 'null' is not assignable to type 'void'.
}

// Not much else we can assign to these variables!
let u: undefined = undefined
let n: null = null

// null
const x1: string =  null // Type 'null' is not assignable to type 'string'.
const x2: number = null // Type 'null' is not assignable to type 'number'.
const x3: boolean =  null // Type 'null' is not assignable to type 'boolean'.
const x4: undefined =  null // Type 'null' is not assignable to type 'undefined'.
const x5: never = null // Type 'null' is not assignable to type 'never'.
const x6: any = null
const x7: null =  null
// undefined
const x1: string =  undefined // Type 'undefined' is not assignable to type 'string'.
const x2: number = undefined // Type 'undefined' is not assignable to type 'number'.
const x3: boolean =  undefined // Type 'undefined' is not assignable to type 'boolean'.
const x4: null =  undefined // Type 'undefined' is not assignable to type 'null'.
const x5: never = undefined // Type 'undefined' is not assignable to type 'never'.
const x6: any = undefined
const x7: undefined =  undefined


function testNever(test: never): never{
  return test
}
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) { }
}
function testDoWhile(): never {
  do { } while (true)
}

const x1: string = never // 'never' only refers to a type, but is being used as a value here.
const x2: number = never // 'never' only refers to a type, but is being used as a value here.
const x3: boolean = never // 'never' only refers to a type, but is being used as a value here.
const x4: null = never // 'never' only refers to a type, but is being used as a value here.
const x5: never = never // 'never' only refers to a type, but is being used as a value here.
const x6: any = never // 'never' only refers to a type, but is being used as a value here.
const x7: undefine = never // 'never' only refers to a type, but is being used as a value here.

// A function returning 'never' cannot have a reachable end point.
function testBreak(): never { 
  while (true) { break }
}
// A function returning 'never' cannot have a reachable end point.
function testIf(): never {
  if (true) { }
}
// A function returning 'never' cannot have a reachable end point.
function testDoWhile(x:number): never {
  do { } while (x > 3)
}
function testString(test: string): never{
  return test // Type 'string' is not assignable to type 'never'.
}
function testNumber(test: number): never{
  return test // Type 'number' is not assignable to type 'never'.
}
function testBoolean(test: boolean): never{
  return test // Type 'boolean' is not assignable to type 'never'.
}
function testUndefined(test: undefined): never{
  return test // Type 'undefined' is not assignable to type 'never'.
}
function testNull(test:null):never{
  return test // Type 'null' is not assignable to type 'never'.
}
function testAny(test:any):never{
  return test // Type 'any' is not assignable to type 'never'.
}

declare function create(o: object | null): void
create({ prop: 0 }) // OK
create(null) // OK
create(42) // Error
create("string") // Error
create(false) // Error
create(undefined) // Error

let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length
// 当然直接写也是可以的。
let strLength2: number = someValue.length // 16
let someValue: any = "this is a string"
let strLength: number = (someValue as string).length









