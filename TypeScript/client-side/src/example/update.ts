// 其他重要更新
// 基于ts3.3版本

/**
 * async函数以及Promise
 * tsconfig.json支持注释
 * 动态导入表达式
 * 弱类型探测
 * ...操作符
 */

// async函数以及Promise

// Promise
// setTimeout(() => {
//   console.log('setTimeout')
// }, 1e3)
// console.log('1')

// function getIndex(bool) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(1)
//       if (bool) {
//         resolve('a')
//       } else {
//         reject('Error')
//       }
//     }, 1e3)
//   })
// }
// getIndex(true)
//   .then(res => {
//     console.log(res)
//   })

// async函数
// async function asyncFunction() {
//   try {
//     const res = await getIndex(true)
//     console.log(res)
//   } catch (error) {
//     console.log(error)
//   }
// }
// asyncFunction()

// interface Res {
//   data: {
//     [key: string]: any
//   }
// }
// namespace axios {
//   export function post(url: string, config: object): Promise<Res> {
//     return new Promise((resolve, refect) => {
//       setTimeout(() => {
//         const res: Res = { data: {} }
//         if (url === '/login') {
//           res.data.user_id = 111
//         } else {
//           res.data.role = 'admin'
//         }
//         console.log(2)
//         resolve(res)
//       }, 1e3)
//     })
//   }
// }
// interface Info {
//   user_name: string
//   password: string
// }
// async function loginReq({ user_name, password }: Info) {
//   try {
//     console.log(1)
//     const res = await axios.post('/login', {
//       data: {
//         user_name,
//         password
//       }
//     })
//     console.log(3)
//     return res
//   } catch (error) {
//     throw new Error(error)
//   }
// }
// async function getRoleReq(user_id: number) {
//   try {
//     const res = await axios.post('/user_roles', {
//       data: {
//         user_id
//       }
//     })
//     return res
//   } catch (err) {
//     throw new Error(err)
//   }

// }
// loginReq({ user_name: 'li', password: '123456' })
//   .then(res => {
//     const { data: { user_id } } = res
//     getRoleReq(user_id)
//       .then(res => {
//         const { data: { role } } = res
//         console.log('role', role)
//       })
//   })
//   .catch(err => {
//     console.log(err)
//   })


// tsconfig.json支持注释


// 动态导入表达式
// async function getTime(format: string) {
//   const moment = await import('moment')
//   return moment.default().format(format)
// }
// getTime('L')
//   .then(res => {
//     console.log(res)
//   })


// 弱类型探测
// ts2.4,任何包含可选属性的类型，视为弱类型
// interface ObjIn {
//   name?: string
//   age?: number
// }
// let objIn = {
//   sex: 'max'
// }
// function printInfo(info: ObjIn) {
//   console.log(info)
// }

// ...操作符
// function mergeOptions(op1: object, op2: object) {
//   return { ...op1, ...op2 }
// }

// ts3.2版本做了优化，可以在泛型中使用拓展运算符
// function mergeOptions<T, U extends string>(op1: T, op2: U) {
//   return { ...op1, op2 }
// }
// console.log(mergeOptions({a:'a'}, 'name'))

// function getExcludeProp<T extends { props: string }>(obj: T) {
//   const { props, ...rest } = obj // rest 为剩余属性
//   return rest
// }
// const obj = {
//   props: 'some',
//   name: 'li',
//   age: 20
// }
// console.log(getExcludeProp(obj))








