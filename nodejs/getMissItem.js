// 引入文件系统模块
const fs = require('fs')

// 需要修改的文件路径
const ROOT_PATH = 'F:/Downloads/360Downloads/ing/'
const SUFFIX_PATH = ' _ 新時代的我們 _ 草榴社區 _ t66y.com'
const INDEX = 0
const html = `
`
const LIST = []

// 获取详细文件名，回调返回文件名及路径
function walk(path, callback1, callback2) {
  path = path.replace(/[-]/g, '_')
  // 同步读取文件
  const add = `${ROOT_PATH}${path}${SUFFIX_PATH}`
  if (!fs.existsSync(add)) {
    // fs.mkdirSync(add)
    return
  }
  const files = fs.readdirSync(add)
  files.forEach(function (file) {
    const node = fs.statSync(add + '/' + file)
    if (node.isFile()) {
      callback1 && callback1(add, file)
    } else if (node.isDirectory()) {
      callback2 && callback2(add, file)
    }
  })
}
function log(data) {
  console.log(JSON.stringify(data, null, 1), data.length)
}
const arr = []
// 运行
walk(LIST[INDEX].path, (path, fileName) => {
  arr.push(fileName)
})
// log(arr)

const reg1 = /https:\/\/s\d+\.gifyu\.com\/images\/(\w)+\.jpg/g
const reg2 = /http(s)?:\/\/[\d\w/.-]+\.(jpg|png|jpeg)/g
const res = []
if (LIST[INDEX].list.length) {
  res.push(...LIST[INDEX].list)
} else {
  res.push(...new Set(html.replace(/http(s)?:\/\/a.d\/adblo_ck\.jpg/g, '').match(reg2)))
}
// log(res)

const rrr = res.filter(e => {
  const [a] = /[\da-z_.]+\.(jpg|png|jpeg)/i.exec(e.replace(/-/g, '_'))
  return !(arr.includes(a) || arr.includes(a.replace(/_/g, '-')))
})
log(rrr)
