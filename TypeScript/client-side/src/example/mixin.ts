// 混入
// 对象的混入
// interface ObjectA {
//   a: string
// }
// interface ObjectB {
//   b: string
// }
// let A: ObjectA = {
//   a: 'a'
// }
// let B: ObjectB = {
//   b: 'b'
// }
// let AB: ObjectA & ObjectB = Object.assign(A, B)
// console.log(AB)

// 类的混入
// class ClassA {
//   public isA: boolean
//   public funcA() {}
// }
// class ClassB {
//   public isB: boolean
//   public funcB() {}
// }
// class ClassAB implements ClassA, ClassB {
//   public isA: boolean = false
//   public isB: boolean = false
//   public funcA: () => void
//   public funcB: () => void
//   constructor() { }
// }
// function mixins(base: any, from: any[]) {
//   from.forEach(item => {
//     Object.getOwnPropertyNames(item.prototype).forEach(key => {
//       console.log('key', key)
//       base.prototype[key] = item.prototype[key]
//     })
//   })
// }
// mixins(ClassAB, [ClassA, ClassB])
// const ab = new ClassAB()
// console.log('ab', ab)
