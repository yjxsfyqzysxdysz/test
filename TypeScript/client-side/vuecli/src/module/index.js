// import * as info from './a'
// console.log(info)
// console.log(info.name)
// console.log(info.age)

// import funcname from './b'
// import { default as funcname} from './b'
// funcname()

// import str from './a'
// console.log(str)

// 如果既有 export default 也有 export 则可以一起引入
// import sex, { name, age } from './a'
// console.log(sex, name, age)


// 复合写法
// export { name, age } from './a'
// 分开写法
// import { name, age } from './a'
// export { name, age }

// export { name as nameProp } from './a'
// export * from './a'

// export { name as default } from './a'
// import { name } from './a'
// export default name

// export { default as Info } from './a'


// import() // 按需加载
// 非正式方法，webpack中已加入，异步加载，返回一个promise

const status = 1
if (status) {
  import('./a')
} else {
  import('./b')
}