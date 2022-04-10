const fs = require('fs')
const _path = require('path')
const download = require('download')
const jsonData = require(_path.resolve('./data.json'))

const { ROOT_PATH, SUFFIX_PATH, LOOP_NUM, MEITU_PATH, MEITU_MIDPATH } = require('./config')
const { html } = require('./data')
const { LIST } = jsonData

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
  path = path
    .replace(/[-–]/g, '_')
    .replace(/[（（]/g, '(')
    .replace(/[））]/g, ')')
    .replace(/[】］]/g, ']')
    .replace(/[［【]/g, '[')
    .replace(/[，,。“”？！～]+/g, ' ')
    .trim()
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
 * 返回 论坛 图片地址
 * @returns {Array} 带有 url 的 array
 */
function getHTML2CL() {
  const filterURLs = html.match(/ess-data="([0-9a-z:?=/._\-%]+)"/gi)
  if (!filterURLs) {
    console.log('没有过滤出 URL')
    return []
  }
  return [...new Set(filterURLs.map(e => e.replace(/^ess-data="|"$/g, '')))]
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
    return []
  }
  if (jsonData.LIST[index].path === path) {
    jsonData.LIST[index] = {
      path: path
        .replace(/[-–]/g, '_')
        .replace(/[（（]/g, '(')
        .replace(/[））]/g, ')')
        .replace(/[】］]/g, ']')
        .replace(/[［【]/g, '[')
        .replace(/[，,。“”？！～]+/g, ' ')
        .trim(),
      list
    }
    jsonData.LIST.unshift({ path: '[寫真] ' })
  } else if ((jsonData.LIST.slice(-1)[0] || {}).path !== path) {
    jsonData.LIST.push({ path, list }, { path: '[寫真] ' })
  } else {
    jsonData.LIST.splice(-1, 1, { path, list }, { path: '[寫真] ' })
  }
  fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), err => {
    if (err) {
      console.log('保存到本地文件失败', err)
    } else {
      console.log(`${path} 保存到本地文件成功 ${list.length}`)
    }
  })
  // const res = fs.writeFileSync('./data.json', JSON.stringify(data))
  // console.log(res);
  return []
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
  return list.filter(e => !localList.some(f => e.includes(f) || e.includes(f.replace(/-/g, '_'))))
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
  if (!list.length) return console.log('the list is empty')
  const filePath = `${ROOT_PATH}${path.replace(/-/g, '_')}${SUFFIX_PATH}`
  const message = `No.${toast * LOOP_NUM + 1} to NO.${(toast + 1) * LOOP_NUM}`
  console.time(`to download ${message}`)
  return Promise.all(
    list.splice(0, LOOP_NUM).map((url, i) => {
      let filename = undefined
      if (/^https:\/\/imageproxy/.test(url)) {
        filename = url.match(/(%2f|\/)([0-9a-z-.]+\.[a-z]+)$/i)[2]
      }
      return download(url, filePath, {
        rejectUnauthorized: false,
        filename
      }).then(() => {
        console.log(`success No.${toast * LOOP_NUM + 1 + i}`)
      })
    })
  )
    .then(() => {
      if (!list.length) {
        console.log('all finsh')
        let newData = LIST[++index]
        if (newData && newData.list.length) {
          const downloadList = filterDataAndLocal(index)
          console.log(`download ${newData.path} total: ${downloadList.length}`)
          downloadHandler({ list: downloadList, path: newData.path, index })
        }
        return
      }
      downloadHandler({ list, path, toast: ++toast, index })
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      console.timeEnd(`to download ${message}`)
    })
}

module.exports = {
  log,
  searchDir,
  getHTML2CL,
  getHTML2TW,
  getURL2MT,
  saveLocal,
  filterURL,
  downloadHandler,
  filterDataAndLocal
}
