// ES6和NODE.js的模块
// ES6的模块
// export
// 见a.js
// import
// import { time } from './b'
// setInterval(() => {
//   console.log(time)
// }, 1000)

// import { name as nameProp, age, info } from './c'
// console.log(nameProp, age, info)
// 引用的内容是只读的
// 如果是一个对象则可以修改其属性，一般不建议修改
// import 引入的路径可以使相对路径，也可以是绝对路径
// 引入一个全局的方法
// import './d'
// 引入的模块都会被执行，起作用
// import 有提升效果，会提升到头部首先执行,一般建议在最上面写import
// console.log(getName())
// import { getName } from './e'
// 需要引入的不能动态获取 或 使用模板字符串拼成一个变量名
// 因为在编译的时候就要确定引入的是什么东西
 
// 在同一个模块多次引入时，会自动合成一个import

// export default
// 见 vuecli 的 module
// 一个模块中只能使用一次 export default
// 使用 export default 导出的名称和引入的名称可以不相同，由于 export default 只能导出1个，所以其默认为该项
// 其实际为用变量接收
// 为了不引起歧义，建议还是使用原模块名或相近的模块名

// 本质上 export default 就是 export 输出了一个叫 default 的方法
// 导出 export { func as default }
// 引入 import { default as funcname} from './b'

// export default 后可以直接接一个值，export 不可以

// 如果既有 export default 也有 export 则可以一起引入
// import sex, { name, age } from './a'

// import 和 export 的复合写法
// 复合写法
// export { name, age } from './a'
// 分开写法
// import { name, age } from './a'
// export { name, age }
// 需要强调的是，合并写法是将引入的东西直接导出了，在下面是不能使用这块引入的东西的

// import() // 按需加载
// 非正式方法，webpack中已加入，异步加载，返回一个promise

// const status = 1
// if (status) {
//   import('./a')
// } else {
//   import('./b')
// }

// Node.js的模块
// vuecli\src\module a.node.js 和 b.node.js
// exports
/**
 * exports 和 export 很像
 * 最后引入的模块都是一个对象
 * 导出的接口都是对象的属性
 * */

// module.exports
// 效果和 export default 相似





