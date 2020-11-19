// 拷贝

// 深拷贝函数
/**
 * 通过prototype来区分下箭头函数和普通函数，箭头函数是没有prototype的。
 * 直接使用eval和函数字符串来重新生成一个箭头函数，注意这种方法是不适用于普通函数的。
 * 使用正则来处理普通函数：
 * 分别使用正则取出函数体和函数参数，然后使用new Function ([arg1[, arg2[, ...argN]],] functionBody)构造函数重新构造一个新的函数：
 */

//  正则表达式有问题 需要改------------------------------
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    console.log('普通函数')
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      console.log('匹配到函数体：', body[0])
      if (param) {
        const paramArr = param[0].split(',')
        console.log('匹配到参数：', paramArr)
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

// function a(val) {
let a = val => {
  let a = 'asd'
  return a + val
}
// console.log(a)
// let b = cloneFunction(a)
// console.log(b)

console.log(a.toString())
let c = a.toString()
let d = eval(c)
console.log(d)
