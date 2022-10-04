const fs = require('fs')
const _path = require('path')
const download = require('download')
const jsonData = require(_path.resolve('./data.json'))

const { ROOT_PATH, PREFIX_PATH, SUFFIX_PATH, LOOP_NUM, MEITU_PATH, MEITU_MIDPATH } = require('./config')
const { html } = require('./data')
const { LIST } = jsonData

/**
 * 过滤 path
 * @param {String} path
 */
const filterPath = path => {
  return path
    .replace(/[-–]/g, '-')
    .replace(/[/\\]/g, '_')
    .replace(/[（（]/g, '(')
    .replace(/[））]/g, ')')
    .replace(/[】］]/g, ']')
    .replace(/[［【]/g, '[')
    .replace(/[，，,。“”'"？?!！～：:、]+/g, ' ')
    .replace(/\.{2,}/g, '.')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * log
 * @param {JSON} data
 * @description 返回 String 的 data 及 length
 */
function log(data) {
  console.log(JSON.stringify(data, null, 1), data.length)
}

/**
 * 获取详细文件名,回调返回文件名及路径
 * @param {String} path 路径
 * @param {Boolean} status 是否创建文件夹
 * @returns {Array} 从文件夹中查找的项
 * @description
 * 过滤不符合要求的文件夹名称,
 * 默认不加后缀查找，若不存在则添加后缀
 *
 * 默认如果不存在就新建
 */
function searchDir(path, status = false) {
  if (!path) {
    console.log('path is empty')
    return []
  }
  path = filterPath(path)
  // 同步读取文件
  let add = `${ROOT_PATH}${path}${SUFFIX_PATH}`
  if (!fs.existsSync(add)) {
    add = `${ROOT_PATH}${path}`
    if (!fs.existsSync(add)) {
      if (status) {
        return []
      }
      fs.mkdirSync(add)
    }
  }
  const files = fs.readdirSync(add)

  return files.filter(file => fs.statSync(add + '/' + file).isFile())
}

/**
 * 返回 论坛 页面 title
 */
function getTitleHTML2CL() {
  let [, res = ''] = html.match(/<h4 class="f16">(.+)<\/h4>/) || []
  if (res) {
    res = res.replace(/&nbsp;/g, ' ').replace(/\s{2,}/g, ' ')
  }
  return res
}

/**
 * 返回 论坛 图片地址
 * @returns {Array} 带有 url 的 array
 */
function getHTML2CL() {
  const filterURLs = html.match(/ess-data="([0-9a-z:?=/._\-%]+)"/gi)
  if (!filterURLs) {
    console.log('没有过滤出 URL')
    return []
  }
  return [...new Set(filterURLs.map(e => e.replace(/^ess-data="|"$/g, '')).filter(e => !/\.gif$/i.test(e)))]
}

/**
 * 返回 tw 图片地址
 * @returns {Array} 带有 url 的 array
 */
function getHTML2TW() {
  const filterURLs = html
    .replace(/&amp;/g, '&')
    .replace(/\(&quot;([a-z0-9/:.&;=?_-]+)&quot;\)/gi, '')
    .replace(/(name=)[a-z0-9]*/gi, '$1large')
    .match(/http(s)?:\/{2}pbs\.twimg\.com\/media\/[a-z0-9?=_&*-]+/gi)
  if (!filterURLs) {
    console.log('没有过滤出 URL')
    return []
  }
  return filterURLs
}

/**
 * 创建 mt 图片地址
 * @param {String} fileName 文件名
 * @param {String} lastPath 本次画册key
 * @param {Number} num 该相册数量 从0开始计数
 * @returns {Array} 带有 url 的 array
 */
function getURL2MT({ fileName, lastPath, num }) {
  let midPath = ''
  for (const key in MEITU_MIDPATH) {
    if (fileName.includes(key)) {
      midPath = MEITU_MIDPATH[key]
      break
    }
  }
  if (!midPath) {
    console.log(`请在 config.js 的 MEITU_MIDPATH 中添加关键字 关于 ${fileName}`)
    return []
  }
  const PATH = `${MEITU_PATH}/${midPath}/${lastPath}/`
  const list = ['0.jpg']
  for (let i = 1; i <= num; i++) {
    list.push(`${PATH}${i.toString().padStart(3, '0')}.jpg`)
  }
  return list
}

/**
 * 读本地文件
 */
function readLocal() {
  const res = fs.readFileSync('./data.json', 'utf-8')
  console.log(res)
}

/**
 * 保存到本地
 */
function saveLocal({ path = '', list = [], index = 0 }) {
  if (!list.length || !path) {
    console.log('saveLocal path or list is empty')
    return
  }
  const { path: everyPath, list: everyList = [] } = LIST[index]
  path = filterPath(path)
  // 首项
  if (index === 0) {
    LIST.splice(0, 1, { path: PREFIX_PATH }, { path, list })
  }
  // 末项
  else if (index === LIST.length - 1 && everyPath === PREFIX_PATH) {
    LIST.splice(-1, 0, { path, list })
  }
  // 任意项
  else if (path === everyPath) {
    LIST.splice(index, 1, { path, list: [...new Set([...everyList, ...list])] })
  }
  // 异常
  else {
    console.log('\x1B[31m%s\x1B[0m', '[ERROR]', `path 异常\n${index} 项 path 为 ${everyPath}\n解析 path 为 ${path}`)
    return
  }
  fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), err => {
    if (err) {
      console.log('\x1B[31m%s\x1B[0m', '[ERROR]', '保存到本地文件失败', err)
    } else {
      console.log('\x1B[32m%s\x1B[0m', '[SUCCESS]', `${path} 保存到本地文件成功 ${list.length}`)
    }
  })
}

/**
 * 过滤出本地没有的 url
 * @param {Array} list 需要校验的 list
 * @param {Array} localList 本地文件夹中的 list
 * @returns {Array} 去重后的 array
 */
function filterURL({ list = [], localList = [] }) {
  if (!localList.length) {
    return list
  }
  return list.filter(e => {
    e = e.toLowerCase()
    return !localList.some(f => {
      f = f.toLowerCase()
      return e.includes(f) || e.includes(f.replace(/-/g, '_'))
    })
  })
}

/**
 * 过滤本地未下载的项
 * @param {Number} index LIST 的下标
 */
function filterDataAndLocal(index) {
  const { list, path } = LIST[index]
  const localList = searchDir(path)
  return filterURL({ list, localList })
}

// 下载
function downloadHandler({ list, path, toast = 0, index = 0 }) {
  if (!list.length) return console.log('\x1B[33m%s\x1B[0m', '[WARN]', 'the list is empty')
  const filePath = `${ROOT_PATH}${filterPath(path + SUFFIX_PATH)}`.trim()
  const message = `No.${toast * LOOP_NUM + 1} to NO.${(toast + 1) * LOOP_NUM}`
  console.time(`to download ${message}`)
  return Promise.all(
    list.splice(0, LOOP_NUM).map((url, i) => {
      let filename = undefined
      if (/^http(s)?:\/\/imageproxy/.test(url)) {
        filename = decodeURIComponent(url.match(/(%2f|\/)([0-9a-z-.%]+\.[a-z]+)$/i)[2])
      }
      return download(url, filePath, {
        rejectUnauthorized: false,
        filename
      })
        .then(() => {
          console.log(`SUCCESS No.${toast * LOOP_NUM + 1 + i}`)
        })
        .catch(err => {
          console.log('\x1B[31m%s\x1B[0m', '[ERROR]', err.statusCode, url)
          return Promise.reject(err)
        })
    })
  )
    .then(() => {
      console.timeEnd(`to download ${message}`)
      if (!list.length) {
        console.log('\x1B[32m%s\x1B[0m', '[SUCCESS]', `${path} all finsh`)
        // return
        let newData = LIST[++index]
        if (newData && newData.list && newData.list.length) {
          const downloadList = filterDataAndLocal(index)
          console.log(`download ${newData.path} total: ${downloadList.length}`)
          downloadHandler({ list: downloadList, path: newData.path, index })
        } else {
          console.log('\x1B[35m%s\x1B[0m', '[ERROR]', 'all clear')
        }
        return
      }
      downloadHandler({ list, path, toast: ++toast, index })
    })
    .catch(() => {
      console.timeEnd(`to download ${message}`)
      // console.log('\x1B[31m%s\x1B[0m', '[ERROR]')
    })
}

module.exports = {
  log,
  searchDir,
  getTitleHTML2CL,
  getHTML2CL,
  getHTML2TW,
  getURL2MT,
  saveLocal,
  filterURL,
  downloadHandler,
  filterDataAndLocal
}
