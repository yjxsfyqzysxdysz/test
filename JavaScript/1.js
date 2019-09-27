let a = '222;'
let b = '333;'
let c = '44;'

let arr = []
arr = [].concat(a.split(';')[0], b.split(';')[0], c.split(';')[0] )
console.log(arr)
console.log(arr.join(''))

let str = a.slice(0,-1)  + b.slice(0,-1)  + c.slice(0,-1)
console.log(str)

