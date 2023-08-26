const _path = require('path')
const { LOCAL_DATA_PATH, PROXY_URL } = require('./config')
const { LIST, MT_LIST } = require(_path.resolve(LOCAL_DATA_PATH))
// const { filterList } = require('./getMissItem')
const {
  FSsearchDir,
  getTitleHTML2CL,
  getHTML2CL,
  getHTML2TW,
  getURL2MT,
  saveLocal,
  filterURL,
  downloadHandler,
  downloadHandler2,
  filterDataAndLocal,
  filterLocalData,
  setLogColor
} = require('./utils')

const arg = process.argv.slice(2)
const [event, ...param] = arg

let eventHandler = null
let INDEX = 0

// console.clear()

if (!arg.length) {
  throw '没有入参'
}

if (!isFinite(event)) {
  // 传参任务
  switch (event) {
    case 'save': // 将 论坛 获取的 url 保存到本地文件
      eventHandler = (list, path) => {
        const URLList = getHTML2CL()
        const title = getTitleHTML2CL()
        if (!title) {
          console.log(setLogColor('red'), '[ERROR] 没有 title')
          return
        }
        URLList.length && saveLocal({ path: title || path, list: URLList, index: INDEX })
      }
      break
    case 'savemt': // 将 mt 获取的 url 保存到本地文件
      eventHandler = () => {
        const { fileName, lastPath, num } = MT_LIST[INDEX]
        const list = getURL2MT({ fileName, lastPath, num })
        list.length && saveLocal({ path: fileName, list, index: INDEX })
        return list
      }
      break
    case 'filter': // 对 data.json 的数据进行 合并、去重、排序 处理
      eventHandler = () => {
        filterLocalData()
      }
      break
    case 'filterurl': // 过滤 url 与 本地 url
      eventHandler = (list, path) => {
        const URLList = getHTML2CL()
        if (!URLList.length) return
        const localList = FSsearchDir(path, true)
        return filterURL({ list: URLList, localList })
      }
      break
    case 'filterurlmt': // 过滤 论坛 与 本地 url
      eventHandler = () => {
        const { fileName, lastPath, num } = MT_LIST[INDEX]
        const list = getURL2MT({ fileName, lastPath, num })
        if (!list.length) return
        const localList = FSsearchDir(fileName, true)
        return filterURL({ list, localList })
      }
      break
    case 'filterlocalurl': // 过滤 url 为下载的项
      eventHandler = (list, path) => {
        list = filterDataAndLocal(list, path)
        console.log(`download ${path} total: ${list.length}`)
        list.forEach(e => console.log(e))
      }
      break
    case 'download': // 现在 data 中本地未下载的项
      eventHandler = (list, path) => {
        list = filterDataAndLocal(list, path)
        console.log(`download ${path} total: ${list.length}`)
        downloadHandler({ list, path, index: INDEX })
      }
      break
    case 'downloadurl': // 下载 cl
      eventHandler = (list, path) => {
        const URLList = getHTML2CL()
        const localList = FSsearchDir(path)
        list = filterURL({ list: URLList, localList })
        console.log(`download ${path} total: ${list.length}`)
        downloadHandler({ list, path, index: INDEX })
      }
      break
    case 'downloadmt': // 下载 mt
      eventHandler = () => {
        const { fileName, lastPath, num } = MT_LIST[INDEX]
        const list = getURL2MT({ fileName, lastPath, num })
        const localList = FSsearchDir(fileName)
        const downloadList = filterURL({ list, localList })
        console.log(`download ${fileName} total: ${downloadList.length}`)
        downloadHandler({ list: downloadList, path })
      }
      break
    case 'downloadproxy':
      eventHandler = (list, path) => {
        list = filterDataAndLocal(list, path).map(e => `${PROXY_URL}?url=${encodeURIComponent(e)}`)
        console.log(`download ${path} total: ${list.length}`)
        downloadHandler({ list, path, index: INDEX })
      }
      break
    case 'downloadreproxy':
      eventHandler = (list, path) => {
        list = filterDataAndLocal(list, path)
        console.log(`download ${path} total: ${list.length}`)
        downloadHandler({
          list: list.map(e => decodeURIComponent((e.match(/url=(.+)$/) || ['', ''])[1])),
          path,
          index: INDEX
        })
      }
      break
    case 'geturlmt': // 获取 mt url
      eventHandler = () => getURL2MT(MT_LIST[INDEX])
      break
    case 'geturl': // 获取 论坛 url
      eventHandler = () => getHTML2CL()
      break
    case 'geturltw': // 获取 mt url
      eventHandler = (list, path) => getHTML2TW(list, path)
      break
    case 'specify': // 指定项
      eventHandler = (...params) => {
        let [, , [keyword, index]] = params
        if (!keyword) {
          console.log(setLogColor('red'), '[ERROR] 没有入参')
          return
        }
        const reg = new RegExp(keyword)
        const list = LIST.filter(({ path }) => reg.test(path))
        const listLen = list.length

        if (!listLen) {
          console.log(setLogColor('yellow'), '[WARN]', `未找到 path 中包含 ${setLogColor('magenta', keyword)} 的项`)
          return
        }
        if (index >= listLen) {
          index = listLen - 1
        }
        console.log(`download 符合 ${setLogColor('magenta', keyword)} 项的数据 total: ${list.length}`)
        downloadHandler2(list, index)
      }
      break
    case 'help':
    case '-h': {
      const msg = {
        save: '将 论坛 获取的 url 保存到本地文件',
        savemt: '将 mt 获取的 url 保存到本地文件',
        filterurl: '过滤 url 与 本地 url',
        filterurlmt: '过滤 论坛 与 本地 url',
        filterlocalurl: '过滤 url 为下载的项',
        download: '现在 data 中本地未下载的项',
        downloadurl: '下载 cl',
        downloadmt: '下载 mt',
        downloadproxy: '',
        downloadreproxy: '',
        geturlmt: '获取 mt url',
        geturl: '获取 论坛 url',
        geturltw: '获取 mt url'
      }
      console.log(
        Object.entries(msg)
          .map(([key, val]) => `${key} --- ${val}`)
          .join('\n')
      )
      break
    }
    default:
      console.log(`无法识别指令: ${event}, 输入指令 'help' or '-h' 可获取帮助`)
      break
  }
}

if (isFinite(param[0])) {
  const index = param[0]
  // 传参下标
  const len = LIST.length
  if (index >= len || index < 0) {
    INDEX = len - 1
    console.log(`LIST 总共有 ${len} 项, 仅支持 0 - ${len - 1} 之间的自然数`)
  } else {
    INDEX = index
  }
}

const { list = [], path = '' } = LIST[INDEX] || {}

if (eventHandler) {
  const res = eventHandler(list, path, param)
  res && console.log(res)
}
