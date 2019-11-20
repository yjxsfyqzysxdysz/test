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
