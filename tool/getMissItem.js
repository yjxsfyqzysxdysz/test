const fs = require('fs')
const { ROOT_PATH, SUFFIX_PATH, REGEXP_RULER, LOCAL_TMP_DATA_PATH } = require('./config')
const { FSRead } = require('./utils')
const html = FSRead(LOCAL_TMP_DATA_PATH)

// 获取详细文件名，回调返回文件名及路径
function walk(path) {
  path = path.replace(REGEXP_RULER.regDash, '_')
  // 同步读取文件
  const add = `${ROOT_PATH}/${path}${SUFFIX_PATH}`
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
  const { regImageFileUrl } = REGEXP_RULER
  if (list.length) {
    res.push(...new Set(list))
  } else {
    res.push(...new Set(html.match(regImageFileUrl)))
    // res.push(
    //   ...new Set(
    //     html
    //       .replace(REGEXP_RULER.regDash, '&')
    //       .replace(/\(&quot;([a-z0-9/:.&;=?_-]+)&quot;\)/gi, '')
    //       .replace(/(name=)[a-z0-9]*/gi, '$1large')
    //       .match(/http(s)?:\/{2}pbs\.twimg\.com\/media\/[a-z0-9?=_&*-]+/gi)
    //   )
    // )
  }
  // return res
  return res.filter(e => {
    // return !arr.includes(e.match(/\/([a-z0-9_-]+)\?/i)[1] + '.jpg')
    const [a] = REGEXP_RULER.regImageFile1.exec(e.replace(REGEXP_RULER.regDash, '_'))
    return !(arr.includes(a) || arr.includes(a.replace(REGEXP_RULER.regUnderline, '-')))
  })
}

module.exports = { log, walk, filterList }
