const func = () => {
  console.log('func')
  console.log('func', func)
  // console.log('test', test)
  console.log('this', this)
  // console.log('arguments', arguments)
}

// func()
let o = {
  m: function () {
    let self = this
    console.log(this === o)
    f()
    function f() {
      console.log(this === o)
      // console.log(this)
      console.log(self === o)
      console.log(self.m)
    }
  },
}
// o.m()

function fun(b = 5) {
  let a = 'aaaaa'
  console.log('fun', arguments)
}
// fun(6,7)

// uniqueInteger.aaa = 0
// function uniqueInteger() {
//   return uniqueInteger.aaa++
// }
// console.log(uniqueInteger)
// console.log(uniqueInteger.aaa)

// var uniqueInteger = (function() {
//   var count = 0;
//   return function() { return count++ }
// }())

// function check(args) {
//   let argslen = args.length
//   let expected = args.callee.length
//   console.log(args, argslen, expected)
// }
// function f(x,y,z){
//   check(arguments)
//   return x+y+z
// }
// f()

// var scope = 'global';
// function constructFunction() {
//   var scope = 'local';
//   console.log(scope)
//   return new Function('return "scope"');
// }
// console.log(scope)
// console.log(constructFunction()())

// function outer () {
//   var scope = 1
//   return function() {
//     console.log(scope++)
//   }
// }
// let getNum = outer()
// getNum()
// getNum()
// getNum()
// getNum()

function outer() {
  var scope = 0
  return {
    add: function () {
      console.log(scope++)
    },
    res: function () {
      console.log((scope = 0))
    },
  }
}
let getNum = outer()
getNum.add()
getNum.add()
getNum.res()

