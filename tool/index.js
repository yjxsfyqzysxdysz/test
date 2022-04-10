const _path = require('path')
const { LIST, MT_LIST } = require(_path.resolve('./data.json'))
const { filterList } = require('./getMissItem')
const {
  log,
  searchDir,
  getHTML2CL,
  getHTML2TW,
  getURL2MT,
  saveLocal,
  filterURL,
  downloadHandler,
  filterDataAndLocal
} = require('./utils')
const arg = process.argv.slice(2, 4)

let eventHandler = null
let INDEX = 0

if (arg.length) {
  arg.forEach(e => {
    // 传参下标
    if (isFinite(e)) {
      const len = LIST.length
      if (e >= len || e < 0) {
        INDEX = len - 1
        console.log(`LIST 总共有 ${len} 项, 仅支持 0 - ${len - 1} 之间的自然数`)
      } else {
        INDEX = e
      }
    } else {
      // 传参任务
      switch (e) {
        case 'search': // 查找文件夹中的项
          eventHandler = (list, path) => searchDir(path, true)
          break
        case 'save': // 将 论坛 获取的 url 保存到本地文件
          // INDEX = LIST.length - 1
          eventHandler = (list, path) => {
            const URLList = getHTML2CL()
            URLList.length && saveLocal({ path, list: URLList })
            return []
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
        case 'filterurl': // 过滤 url 与 本地 url
          eventHandler = (list, path) => {
            const URLList = getHTML2CL()
            if (!URLList.length) {
              return []
            }
            const localList = searchDir(path, true)
            return filterURL({ list: URLList, localList })
          }
          break
        case 'filterurlmt': // 过滤 论坛 与 本地 url
          eventHandler = () => {
            const { fileName, lastPath, num } = MT_LIST[INDEX]
            const list = getURL2MT({ fileName, lastPath, num })
            if (!list.length) {
              return []
            }
            const localList = searchDir(fileName, true)
            return filterURL({ list, localList })
          }
          break
        case 'download': // 现在 data 中本地未下载的项
          eventHandler = (list, path) => {
            list = filterDataAndLocal(INDEX)
            console.log(`download ${path} total: ${list.length}`)
            downloadHandler({ list, path, index: INDEX })
            return []
          }
          break
        case 'downloadurl': // 下载 cl
          eventHandler = (list, path) => {
            const URLList = getHTML2CL()
            const localList = searchDir(path)
            list = filterURL({ list: URLList, localList })
            console.log(`download ${path} total: ${list.length}`)
            downloadHandler({ list, path, index: INDEX })
            return []
          }
          break
        case 'downloadmt': // 下载 mt
          eventHandler = () => {
            const { fileName, lastPath, num } = MT_LIST[INDEX]
            const list = getURL2MT({ fileName, lastPath, num })
            const localList = searchDir(fileName)
            const downloadList = filterURL({ list, localList })
            console.log(`download ${fileName} total: ${downloadList.length}`)
            downloadHandler({ list: downloadList, path })
            return []
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
        default:
          console.log(`无法识别指令: ${e}`)
          break
      }
    }
  })
} else {
  eventHandler = filterList
}

const { list = [], path = '' } = LIST[INDEX] || {}

eventHandler(list, path)
