const fs = require('fs')
const { ROOT_PATH, SUFFIX_PATH, REGEXP_RUL } = require('./config')
const { html } = require('./data')

// 获取详细文件名，回调返回文件名及路径
function walk(path) {
  path = path.replace(/[-]/g, '_')
  // 同步读取文件
  const add = `${ROOT_PATH}${path}${SUFFIX_PATH}`
  if (!fs.existsSync(add)) {
    fs.mkdirSync(add)
  }
  const files = fs.readdirSync(add)
  return files.filter(file => fs.statSync(add + '/' + file).isFile())
}

function log(data) {
  console.log(JSON.stringify(data, null, 1), data.length)
}

const filterList = (list, path) => {
  const arr = walk(path)
  const res = []
  if (list.length) {
    res.push(...list)
  } else {
    res.push(...new Set(html.replace(/http(s)?:\/\/a.d\/adblo_ck\.jpg/g, '').match(REGEXP_RUL[1])))
  }

  return res.filter(e => {
    const [a] = /[\da-z_]+\.(jpg|png|jpeg)/i.exec(e.replace(/-/g, '_'))
    return !(arr.includes(a) || arr.includes(a.replace(/_/g, '-')))
  })
}

module.exports = { log, walk, filterList }
