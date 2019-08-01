var _ = require('lodash')
// 使用Lodash，将对象的value放入数组中
var a = {
  '1': {
    a: 1
  },
  '2': {
    a: 2
  },
  '3': {
    a: 3
  },
  '4': {
    a: 4
  }
}
var b = _.toArray(a)
console.log('使用Lodash，将对象【a】的value放入数组【b】中')
console.log('a', JSON.stringify(a))
console.log('b', JSON.stringify(b))
console.log('----------------------------------------')

// 使用es6，数组过滤
var a = [{
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  },
  {
    id: 8
  }
]
var b = [{
    id: 6
  },
  {
    id: 1
  },
  {
    id: 8
  }
]
var c = a.filter(e => {
  return b.some(f => e.id === f.id)
})
console.log('使用es6，数组过滤,')
console.log('c', JSON.stringify(c))
console.log('----------------------------------------')
