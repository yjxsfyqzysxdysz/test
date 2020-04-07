export const name = 'li'
export const age = 20
export const info = {
  name: 'li',
  age: 55
}

// 一般写法
// import func from './b'
// export default func
// 简便写法
// export { default as func } from './b'
// 使用这种写法，在引入模块时必须使用真实名引入

// export default function  func () {} // 相当于将func赋值给default中
// export default '也可以直接传字面量' // 也可以直接传字面量
const sex = 'man'
export default sex

document.title = 'li'