const fs = require('fs')
const download = require('download')
const LIST = [
  {
    path: '',
    list: []
  }
]

const ROOT_PATH = 'F:/'
const SUFFIX_PATH = ''
const LOOP = 5
const INDEX = 0
const html = `
`
// 获取详细文件名，回调返回文件名及路径
function walk(path, callback1, callback2) {
  path = path.replace(/[-]/g, '_')
  // 同步读取文件
  const add = `${ROOT_PATH}${path}${SUFFIX_PATH}`
  if (!fs.existsSync(add)) {
    fs.mkdirSync(add)
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

const arr = []
// 运行
walk(LIST[INDEX].path, (path, fileName) => {
  arr.push(fileName)
})
// const reg1 = /https:\/\/s\d+\.gifyu\.com\/images\/(\w)+\.jpg/g
const reg2 = /http(s)?:\/\/[\d\w/.-]+\.jpg/g
const res = []
if (LIST[INDEX].list.length) {
  res.push(...LIST[INDEX].list)
} else {
  res.push(...new Set(html.replace(/http(s)?:\/\/a.d\/adblo_ck\.jpg/g, '').match(reg2)))
}

const downloadList = res.filter(e => {
  const [a] = /[\da-z_]+\.(jpg|png|jpeg)/i.exec(e.replace(/-/g, '_'))
  return !(arr.includes(a) || arr.includes(a.replace(/_/g, '-')))
})

const downloadHandler = (list, toast = 0) => {
  if (!list.length) return console.log('the list is empty')
  const path = `${ROOT_PATH}${LIST[INDEX].path}${SUFFIX_PATH}`
  const message = `No.${toast * LOOP + 1} to NO.${++toast * LOOP}`
  console.time(`to download ${message}`)
  return Promise.all(
    list.splice(0, LOOP).map((url, index) =>
      download(url, path).then(() => {
        console.log(`success No.${index + 1}`)
        return Promise.resolve()
      })
    )
  )
    .then(() => {
      console.log(`success ${message}`)
      if (!list.length) {
        console.log('all finsh')
        return
      }
      downloadHandler(list, toast)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      console.timeEnd(`to download ${message}`)
    })
}

console.log(`download total: ${downloadList.length}`)
downloadHandler(downloadList)
