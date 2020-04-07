// 一个模块中只能使用一次 export default
function func () {
    console.log('func')
}
// export default func
// export default function func () {
//   console.log('func')
// }

export { func as default }

document.title = 'b.js'
