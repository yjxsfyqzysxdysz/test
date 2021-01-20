// 继承
function Animal() {
  this.species = '动物'
}

function Cat(name, color) {
  this.name = name
  this.color = color
}
let cat

// 构造函数实现"继承"------------------------------------------------

// 1. 构造函数绑定
// 使用call或apply方法，将父对象的构造函数绑定在子对象上
// function Cat1(name, color) {
//   Animal.apply(this, arguments)
//   this.name = name
//   this.color = color
// }
// cat = new Cat1('大毛', '黄色')
// console.log(cat.species)

// 2.prototype模式
// 删除prototype对象原先的值，然后赋予一个新值
// Cat.prototype = new Animal()
// 每个prototype都有一个constructor属性，指向其构造函数
// 由于上式的prototype赋值，将其constructor指向Animal
// 需将其改回Cat的构造函数
// Cat.prototype.constructor = Cat
// 每一个实例上也有一个constructor，默认调用prototype.constructor
// cat = new Cat('大毛', '黄色')
// cat.constructor === Cat.prototype.constructor // true
// console.log(cat.species)

// 如果替换了prototype对象
// 那下一步必然是为新的prototype对象加上constructor属性
// 并将这个属性指回原来的构造函数

// 3.直接继承prototype
// 为上一个方法的改进
// function Animal1() {}
// Animal1.prototype.species = '动物'
// Cat.prototype = Animal1.prototype
// Cat.prototype.constructor = Cat
// cat = new Cat('大毛', '黄色')
// 对比
// 有点：效率高，不用创建实例，比较省内存
// 缺点：Cat.prototype和Animal1.prototype指向同一个对象，对Cat.prototype的任何修改都会反映到Animal1.prototype中
// 所以，由于 Cat.prototype.constructor = Cat
// 导致 Animal1.prototype.constructor = Cat

// 4.利用空对象作为中介
// 第3种方法升级
function Animal1() {}
Animal1.prototype.species = '动物'
// const F = function () {}
// F.prototype = Animal1.prototype
// Cat.prototype = new F()
// Cat.prototype.constructor = Cat
// cat = new Cat('大毛', '黄色')
// console.log(cat.species)
// F为空对象，几乎不占用内存
// 修改Cat的prototype对象，就不会影响到Animal.prototype

// 封装继承方法 / 圣杯模式
function extend(Child, Parent) {
  const F = function () {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  // 属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）
  // 这等于在子对象上打开一条通道，可以直接调用父对象的方法。
  // 这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
  Child.prototype.uber = Parent.prototype
}
extend(Cat, Animal1)
cat = new Cat('大毛', '黄色')
console.log(cat)

// 5.拷贝继承
// 采用“拷贝”的方式实现继承
// 若将父对象的所有属性和方法，拷贝进了子对象，也可以实现继承
// function Animal1() {}
// Animal1.prototype.species = '动物'
// function extend2(Child, Parent) {
//   let p = Parent.prototype
//   let c = Child.prototype
//   for (const k in p) {
//     c[k] = p[k]
//   }
//   c.uber = p
// }

// extend2(Cat, Animal1)
// cat = new Cat('大毛', '黄色')
// console.log(cat.species)

// 非构造函数实现"继承"------------------------------------------------

const Chinese = {
  nation: '中国',
  birthPlaces: ['北京', '上海', '香港']
}

const Doctor = {
  career: '医生'
}

// 普通对象间的继承

// 1.object()方法
// function object(o) {
//   function F() {}
//   F.prototype = o
//   return new F()
// }
// 将子对象的prototype属性，指向父对象，从而使得子对象与父对象连在一起。
// cat = object(Chinese)
// cat.career = '医生'
// console.log(cat)

// 2.浅拷贝方式
// 将父对象的属性全部拷贝给子对象，实现继承
// function extendCopy(p) {
//   let c = {}
//   for (let k in p) {
//     c[k] = p[k]
//   }
//   c.uber = p
//   return c
// }
// cat = extendCopy(Chinese)
// cat.career = 'doctor'
// console.log(cat)

// 3.深拷贝
// function deepCopy(p, c = {}) {
//   // var c = c || {}
//   for (const k in p) {
//     if (typeof p[k] === 'object') {
//       c[k] = p[k].constructor === Array ? [] : {}
//       deepCopy(p[k], c[k])
//     } else {
//       c[k] = p[k]
//     }
//   }
//   return c
// }
// cat = deepCopy(Chinese)
// Chinese.birthPlaces = ['北京', '上海', '香港']
// cat.birthPlaces.push('xiamen')

function callback(qdx) {
  console.log('callback')
  qdx()
}
var user = {
    name:"笛巴哥",
    callback:callback,
    callback1(){
      console.log('callback1')
      callback(()=>{console.log(this)});
    }
}
user.callback(()=>{console.log(this)});  // still window
// user.callback1(()=>{console.log(this)}); // user