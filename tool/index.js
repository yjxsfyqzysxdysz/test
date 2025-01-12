const _path = require('path')
const { LOCAL_DATA_PATH, PROXY_URL } = require('./config')
// const { filterList } = require('./getMissItem')
const {
  FSsearchDir,
  getTitleHTML2CL,
  getHTML2CL,
  getHTML2TW,
  getURL2MT,
  saveLocal,
  getLocal,
  filterURL,
  downloadHandler,
  downloadHandler2,
  downloadFunHandler,
  filterDataAndLocal,
  filterLocalData,
  setLogColor,
  specifyFilter,
  getFullResData,
} = require('./utils')
const { LIST, MT_LIST } = getLocal({ path: _path.resolve(LOCAL_DATA_PATH), defineData: { LIST: [], MT_LIST: [] }})

const arg = process.argv.slice(2)
if (!arg.length) {
  arg.push('save') // throw '没有入参'
}

const [event, ...param] = arg

let eventHandler = null
let INDEX = 0

console.clear()

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
    case 'savejpsft': // 将 jpsft 获取的 url 保存到本地文件
      eventHandler = (list, path, param) => {
        getFullResData(param)
      }
      break
    case 'filter': // 对 data.json 的数据进行 合并、去重、排序 处理
      eventHandler = (...param) => {
        filterLocalData(param[2][0])
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
    case 'filterlocalurl': // 过滤 url 未下载的项
      eventHandler = (list, path, param) => {
        list = filterDataAndLocal(list, path)
        switch (param[0]) {
          case '-F':
          case '--filter':
            if (LIST[INDEX].list.length !== list.length) {
              if (list.length) {
                console.log(setLogColor('magenta'), '[INFO]', `过滤已下载的 ${LIST[INDEX].list.length - list.length} , 还有 ${list.length}`)
                LIST[INDEX].list = list
              } else {
                const data = LIST.splice(INDEX, 1)
                console.log(setLogColor('magenta'), '[INFO]', `删除对应项 ${INDEX} , ${data.path}`)
              }
              specifyFilter(LIST)
            } else {
              console.log(setLogColor('cyan'), '[INFO]', '无变化')
            }
            break;
          default:
            if (!list.length) return console.log('is nothing')
            for (let i = 0, len = Math.min(10, list.length); i < len; i++) {
              console.log(list[i])
            }
            break;
        }
      }
      break
    case 'download': // 现在 data 中本地未下载的项
      eventHandler = (list, path) => {
        list = filterDataAndLocal(list, path)
        // console.log(`download ${path} total: ${list.length}`)
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
    case 'downloadLocal':
      eventHandler = () => {
        const URLList = getHTML2CL()
        const title = getTitleHTML2CL()
        if (!title) {
          return console.log(setLogColor('red'), '[ERROR] 没有 title')
        }
        if (!URLList.length) {
          return console.log(setLogColor('red'), '[ERROR] 列表为空')
        }
        console.log(setLogColor('magenta'), '[INFO]', `${title} total: ${URLList.length}`)
        downloadFunHandler(URLList, title).then(() => {
          console.log(setLogColor('green'), '[SUCCESS]', `${title} all finsh;`)
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
    case 'specifyFilter': // 过滤出指定项
      eventHandler = (...params) => {
        let [, , [name, key]] = params
        if (!name) {
          console.log(setLogColor('red'), '[ERROR] name 没有入参')
          return
        }
        const reg = new RegExp(name)
        const otherList = []
        const targetList = []
        LIST.forEach(item => {
          if (reg.test(item.path)) {
            targetList.push(item)
          } else {
            otherList.push(item)
          }
        })

        if (!targetList.length) {
          console.log(setLogColor('yellow'), '[WARN]', `未找到 path 中包含 ${setLogColor('magenta', name)} 的项`)
          return
        }
        console.log(`符合 ${setLogColor('magenta', name)} 项的数据 total: ${targetList.length}`)
        switch (key) {
          case 'del':
            specifyFilter(otherList)
            break;
          case 'clean':
          default:
            specifyFilter(targetList.concat(otherList))
            break;
        }
      }
      break
    case 'help':
    case '-h': {
      const msg = {
        save: '将 论坛 获取的 url 保存到本地文件',
        savemt: '将 mt 获取的 url 保存到本地文件',
        filter: `对 ${LOCAL_DATA_PATH} 的数据进行 合并、去重、排序 处理`,
        filterurl: '过滤 url 与 本地 url',
        filterurlmt: '过滤 论坛 与 本地 url',
        filterlocalurl: '过滤 url 为下载的项',
        specify: '指定项下载',
        specifyFilter: '过滤并保存指定项',
        download: '现在 data 中本地未下载的项',
        downloadurl: '下载 cl',
        downloadmt: '下载 mt',
        downloadproxy: '',
        downloadreproxy: '',
        downloadLocal: '下载当前解析项',
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
    INDEX = +index
  }
}

const { list = [], path = '' } = LIST[INDEX] || {}

if (eventHandler) {
  const res = eventHandler(list, path, param)
  res && console.log(res)
}
