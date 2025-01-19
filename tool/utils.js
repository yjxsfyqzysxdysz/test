const fs = require('fs')
const _path = require('path')
const download = require('download')
const axios = require('axios')

const {
  ROOT_PATH, PREFIX_PATH, SUFFIX_PATH,
  LOCAL_DATA_PATH, LOCAL_TMP_DATA_PATH,
  LOOP_NUM, LIMIT_NUM,
  MEITU_PATH, MEITU_MIDPATH,
  IS_ONLEY_ONE, IS_ERROR_FINASH, IS_GIF, IS_EMPTY_FINASH,
  REGEXP_RULER, IGNORE_URL,
  LOG_COLOR
} = require('./config')
const configBrand = require('./configBrand')
const configPersion = require('./configPersion')
const configIngore = require('./configIngore')

const configPersionMap = new Map()

configPersion.forEach(e => {
  if (Array.isArray(e)) {
    e.forEach(f => {
      configPersionMap.set(f, e[0])
    })
  } else {
    configPersionMap.set(e, e)
  }
})

const jsonData = getLocal({
  path: LOCAL_DATA_PATH,
  defineData: {
    LIST: [],
    MT_LIST: []
  }
})
const { LIST } = jsonData
const logName = `LOG_${+new Date()}.log`

let isStop = false // stop tag
const isStopList = []
let noFindNum = 0 // 404 file count

function downloadFun(url, filePath, option) {
  const options = {
    rejectUnauthorized: false,
    // filename
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.47',
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      dnt: 1,
      'sec-ch-ua': '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': 'Windows',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': 1
    },
    ...option
  }
  return download(url, filePath, options)
}

function downloadFunHandler(list, { path, toast = 0 }) {
  // 如果根文件夹不存在则创建
  if (!FSExistsSync(ROOT_PATH)) {
    FSMkdirSync(ROOT_PATH)
  }
  const filePath = `${ROOT_PATH}/${filterPath(path + SUFFIX_PATH)}`.trim()
  return Promise.allSettled(
    list.splice(0, LOOP_NUM).map((url, i) => {
      let filename = undefined
      // if (regImageproxyUrl.test(url)) {
      //   filename = decodeURIComponent(url.match(regFileNameEn)[2])
      // } else if (regFileNameCh.test(url)) {
      //   filename = decodeURIComponent(url.match(REGEXP_RULER.regFileNameCh)[2])
      if (decodeURIComponent((url.match(REGEXP_RULER.regFileNameCh)||[])[2]) === '0.jpg') {
        const nameList = url.replace(/^https?:\/\//, '').split('/')
        filename = nameList.at(-2) + nameList.at(-1)
      }
      // }
      return downloadFun(url, filePath, { filename }).then(() => {
          console.log(setLogColor('green'), '[ERROR]', `No.${toast * LOOP_NUM + 1 + i}`)
        })
        .catch(err => {
        if ([404].includes(err.statusCode)) {
          noFindNum++
        } else {
          console.log(setLogColor('red'), '[ERROR]', `No.${toast * LOOP_NUM + 1 + i}`)
          if (IS_ERROR_FINASH) {
            isStop = true
            isStopList.push([`No.${toast * LOOP_NUM + 1 + i}`, err.statusCode || err.code || err, url])
          }
        }
      })
    })
  ).then(() => {
    const param = {
      len: list.length, // 当前项剩余数
      isErrorFinash: IS_ERROR_FINASH && isStop, // 失败停止
      noFindNum: noFindNum, // 404文件数
      isOnleyOne: IS_ONLEY_ONE, // 只下载1个
    }
    if (param.len && (toast * (LOOP_NUM + 1) < LIMIT_NUM)) {
      return downloadFunHandler(list, { path, toast: ++toast })
    }
    return param
  })
}

function checkDir(dirName) {
  if (!dirName) return
  if (!fs.existsSync(`${__dirname}\\${dirName}}`)) {
    fs.mkdirSync(`${__dirname}\\${dirName}`, { recursive: true })
  }
}

/**
 * 过滤 path
 * @param {String} path
 */
const filterPath = path => {
  return ` ${path} `
    .replace(/[a-z]+(\.[ a-z]+)+/ig, '')
    .replace(REGEXP_RULER.regLeftRoundBrackets, '(')
    .replace(REGEXP_RULER.regRightRoundBrackets, ')')
    .replace(REGEXP_RULER.regRightSquareBrackets, ']')
    .replace(REGEXP_RULER.regLeftSquareBrackets, '[')
    .replace(REGEXP_RULER.regSymbol, ' ')
    .replace(REGEXP_RULER.regEmoji, '')
    // .replace(REGEXP_RULER.regNumber, '')
    .replace(/(\.|\s){2,}/g, '$1')
    .trim()
}

const filterPath2 = path => {
  let title = '' // tag
  let number = '' // 编号
  let persion = new Set() // 人员
  let time = '' // 日期
  let lvpai = '' // 旅拍
  let theme = '' // 主题
  let mode = '' // 角色
  let uniform = '' // 制服/服饰
  let color = '' // 颜色

  let str = ` ${path} `
    .replace(/(\.?[a-z0-9]+)+\.(com|cn)/ig, '')
    .replace(REGEXP_RULER.regSymbol, ' ')
    .replace(REGEXP_RULER.regRoundBrackets, ' ')
    .replace(REGEXP_RULER.regSquareBrackets, ' ')
    .replace(REGEXP_RULER.regEmoji, '')
    .replace(/(p|v|gif)\.?\d+|\d+(p|v|gif)|第\s?\d+\s?页/ig, '')

    .replace(/玩拍/g, '旅拍')
    .replace(/(主题|旅拍)/g, '$1 ')

    .replace(/第(\d+)期|第(\d+)|(\d+)期|vol\.?(\d+)|no\.?(\d+)/gi, (...ret) => ` No.${(ret[1] || ret[2] || ret[3] || ret[4] || ret[5]).padStart(3, '0')} `)

    .replace(/y?(\d{2,4})[ .](\d{1,2})[ .](\d{1,2})/ig, (...ret) => {
      const [_, y,m,d] = ret
      return ` ${y.padStart(4, '20')}.${m.padStart(2, '0')}.${d.padStart(2, '0')} `
    })

  str = str
    .replace(new RegExp(`(${[...configPersionMap.keys()].join('|')})`, 'ig'), ret => {
      return configPersionMap.get(ret) || ret
    })
    .replace(/No\.\d+/ig, val => {
      number = val
      return ''
    })
    .replace(/\d{4}(\.\d{2}){2}/, val => {
      time = val
      return ''
    })
    .replace(new RegExp([...new Set([...configPersionMap.values()])].join('|'), 'gi'), val => {
      persion.add(val)
      return ''
    })
    .replace(/[\u4e00-\u9fffa-z]+(主题|场景|情景)/gi, val => {
      theme = val
      return ' '
    })
    .replace(/[\u4e00-\u9fff]+旅拍/g, val => {
      lvpai = val
      return ' '
    })
    .replace(/[a-z\u4e00-\u9fff]+(角色|扮演)/ig, val => {
      if (val !== '角色扮演') {
        val = val.replace(/(扮演)+/, '角色').replace(/(角色)+/, '角色')
      }
      mode = val
      return ' '
    })
    .replace(/[a-z\u4e00-\u9fff]+色\s|[a-z\u4e00-\u9fff]+色$/ig, val => {
      if (/桃色/.test(val)) return val
      color = val.replace(/魅魔|魅力|性感|妩媚|露|诱人/g, '').trim()
      return ' '
    })
    .replace(/[a-z\u4e00-\u9fff]+(制服|服饰)\s|[a-z\u4e00-\u9fff]+(制服|服饰)$/ig, val => {
      uniform = val.trim()
      return ' '
    })

  configIngore.forEach(e => {
    str = str.replace(new RegExp(e, 'ig'), ' ')
  })

  configBrand.forEach(({ reg, res }) => {
    str = str.replace(reg, () => {
      title = res
      return ' '
    })
  })

  str = [...new Set(str.replace(/\s+/g, ' ').trim().split(' '))].join(' ')
  const res = []
  if (title) res.push(`[${title}]`)
  if (number) res.push(number)
  if (persion.size) res.push(...persion)
  if (time) res.push(time)
  if (lvpai) res.push(lvpai)
  if (theme) res.push(theme)
  if (mode) res.push(mode)
  if (uniform) res.push(uniform)
  if (color) res.push(color)
  if (str) res.push(str)

  return res.join(' ')
}

/**
 * 设置 log 颜色
 * @param {String} color 参见LOG_COLOR keys
 * @param {String} text 需要变色的词条 %s - log 第二个入参值
 * @param {Boolean} isEnd 是否结束,若不结束 后续结尾次颜色
 */
function setLogColor(color, text = '%s', isEnd = true) {
  return `${LOG_COLOR[color]}${text}${isEnd ? LOG_COLOR.end : ''}`
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
 * 校验 emoji
 * @param {String} val
 * @description
 * emoji表情用到的字符是4字节的UTF-16编码（utf-16有2字节和4字节两种编码）
 * moji表情在js中被自动拆分成两个ucs-2的2字节字符
 * 4字节utf-16在js中被用两个字符来表示，高位范围为0xD800 - 0xDBFF，低位范围为0xDC00 - 0xDFFF
 */
function isEmoji(val = '') {
  return REGEXP_RULER.regEmoji.test(val)
}

function FSRead(path = LOCAL_TMP_DATA_PATH) {
  const res = fs.readFileSync(path, 'utf8')
  return res || ''
}

/**
 * 同步创建文件夹
 * @param {String} path
 * @description recursive: true 递归添加
 */
function FSMkdirSync(path) {
  fs.mkdirSync(path, { recursive: true })
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
function FSsearchDir(path, status = false) {
  if (!path) {
    console.log('path is empty')
    return []
  }
  path = filterPath(path)
  // 同步读取文件
  let add = `${ROOT_PATH}/${path}${SUFFIX_PATH}`
  if (!FSExistsSync(add)) {
    add = `${ROOT_PATH}/${path}`.trim()
    if (!FSExistsSync(add)) {
      if (status) {
        return []
      }
      FSMkdirSync(add)
    }
  }
  const files = fs.readdirSync(add)

  return files.filter(file => fs.statSync(add + '/' + file).isFile())
}

/**
 * 数据保存到本地
 * @returns Promise
 */
function FSsave(data = jsonData, path = LOCAL_DATA_PATH) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data, null, 2), err => {
      if (err) {
        console.log(setLogColor('red'), '[ERROR]', '保存到本地文件失败', err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function saveHandler(list) {
  if (list && Array.isArray(list)) {
    jsonData.LIST = list
  }
  return FSsave(jsonData)
}

function FSExistsSync(path) {
  if (!path) throw('path is temp')
  return fs.existsSync(path)
}

/**
 * 返回 论坛 页面 title
 */
function getTitleHTML2CL() {
  const html = FSRead()
  let [, res = ''] = html.match(REGEXP_RULER.regCLTitle) || []
  if (res) {
    res = filterPath(res)
  }
  return res
}

/**
 * 返回 论坛 图片地址
 * @returns {Array} 带有 url 的 array
 */
function getHTML2CL() {
  const html = FSRead()
  const filterURLs = html.match(/ess-data="([\u4e00-\u9fff0-9a-z:;?=/._\-–\\%~&\s!]+)"/gi)
  let message = '没有过滤出 URL'
  if (filterURLs) {
    const list = [
      ...new Set(
        // filterURLs.map(e => e.replace(/^ess-data="|\s|"$/g, '').replace(REGEXP_RULER.regANDSymbol, '&')).filter(e => !/\.gif$/i.test(e))
        filterURLs
          .map(e =>
            e
              .replace(/^ess-data="|"$/g, '')
              .replace(REGEXP_RULER.regANDSymbol, '&')
              .replace(REGEXP_RULER.regSpaces, '%20')
          )
          .filter(e => (IS_GIF ? true : !/\.gif$/i.test(e)) && !IGNORE_URL.includes(e))
      )
    ]
    if (list.length) {
      return list
    }
    message = '没有滤出有效的 URL(如非 gif)'
  }
  console.log(message)
  return []
}

/**
 * 返回 tw 图片地址
 * @returns {Array} 带有 url 的 array
 */
function getHTML2TW() {
  const html = FSRead()
  const filterURLs = html
    .replace(REGEXP_RULER.regANDSymbol, '&')
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
 * 保存到本地
 */
function saveLocal({ path = '', list = [], index = 0 }) {
  if (!list.length || !path) {
    console.log('saveLocal path or list is empty')
    return
  }
  const { path: everyPath } = LIST[index]
  path = filterPath(path)
  const isSameIndex = LIST.findIndex(({ path: curPath }) => curPath === path)
  // 查重 & 任意项
  if (isSameIndex !== -1) {
    const tmp = list.filter(e => !LIST[isSameIndex].list.includes(e))
    if (tmp.length) {
      LIST[isSameIndex].list.push(...tmp)
      // LIST.splice(index, 1, { path, list: [...new Set([...everyList, ...list])] })
    } else {
      console.log(
        setLogColor('red'),
        '[ERROR]',
        `path 在第 ${setLogColor('yellow', isSameIndex + 1)} 项已重复且无新增项\n${path}`
      )
      return
    }
  }
  // 首项
  else if (index === 0) {
    LIST.splice(index, 0, { path, list })
  }
  // 末项
  else if (index === LIST.length - 1 || everyPath === PREFIX_PATH) {
    LIST.splice(-1, 0, { path, list })
  }
  // 异常
  else {
    console.log(setLogColor('red'), '[ERROR]', `path 异常\n${index} 项 path 为 ${everyPath}\n解析 path 为 ${path}`)
    return
  }
  saveHandler().then(() => {
    console.log(setLogColor('green'), '[SUCCESS]', `${LIST.length} ${list.length} ${path} 保存到本地文件成功`)
  })
}

function getLocal({ path = LOCAL_DATA_PATH, defineData = '' }) {
  if (!path) throw('path is temp')
  if (!FSExistsSync(path)) {
    const type = typeof defineData
    const data = type === 'string' ? defineData : JSON.stringify(defineData, null, 2)
    fs.writeFileSync(path, data)
    return defineData
  } else {
    return require(_path.resolve(path))
  }
}

/**
 * 过滤出本地没有的 url
 * @param {Array} list 需要校验的 list
 * @param {Array} localList 本地文件夹中的 list
 * @returns {Array} 去重后的 array
 */
function filterURL({ list = [], localList = [] }) {
  if (!localList.length) {
    return [...list]
  }
  return [...list.filter(e => {
    return !localList.some(f => {
      // return e.includes('/' + f) || e.includes('/' + f.replace(REGEXP_RULER.regDash, '_'))
      return new RegExp(`/${f}(.[a-z]+)?$`, 'i').test(e) || e.replace(/\/([a-z0-9.\-_]+)$/i, '$1').endsWith(f)
    })
  })]
}

/**
 * 整理本地数据
 * @description 去重，合并，补充 fileName
 */
function filterLocalData(type) {
  const tmp = new Map()
  let count = [0, 0] // 去重前, 去重后
  let emptyFileNameCount = 0 // 空文件名
  LIST.forEach(({ path, list }) => {
    // 补充 fileName
    path = type ? filterPath2(path) : filterPath(path)
    if (!path) {
      path = '新建文件夹' + Date.now() + Math.trunc(Math.random() * 1e3)
      emptyFileNameCount++
    }
    if (!tmp.has(path)) {
      tmp.set(path, { path, list: [] })
    }
    // 去重
    const tmpData = tmp.get(path)
    const oldList = tmpData.list
    const newList = [...new Set([...oldList, ...list])]
    tmpData.list = newList
    // log
    count[0] += list.length
    count[1] += newList.length - oldList.length
    // 合并
    tmp.set(path, tmpData)
  })
  console.log(count)
  // return
  // 排序
  const oldList = Array.from(tmp.values())
  const newList = Array.from(tmp.values()).sort((a, b) => (a.path > b.path ? 1 : -1))
  newList.forEach(e => e.list.sort())
  const isSame =
    oldList.reduce((res, { path }) => res + path[0], '') === newList.reduce((res, { path }) => res + path[0], '')
  if (LIST.length == tmp.size && count[0] == count[1] && !emptyFileNameCount && isSame) {
    console.log(setLogColor('yellow'), '[WARN]', '没有可以 去重、合并、补充fileName、排序 的项')
    // return
  }
  saveHandler(newList).then(() => {
    let message = '保存到本地文件成功'
    !isSame && (message += '\n已重新排序')
    LIST.length != tmp.size && (message += `\n合并文件夹 ${LIST.length - tmp.size} 个`)
    count[0] != count[1] && (message += `\n删除重复文件 ${count[0] - count[1]} 个`)
    emptyFileNameCount && (message += `\n补充 fileName ${emptyFileNameCount} 个`)
    message += '\n总计'
    message += `\n  现有文件夹 : ${tmp.size}`
    message += `\n  现有文件   : ${count[1]}`
    console.log(setLogColor('green'), '[SUCCESS]', message)
  })
}

/**
 * 将指定项提前到最前
 */
function specifyFilter(list) {
  saveHandler(list).then(() => {
    console.log(setLogColor('green'), '[SUCCESS]', '保存到本地文件成功')
  })
}

/**
 * 过滤本地未下载的项
 * @param {Number} index LIST 的下标
 */
function filterDataAndLocal(list = [], path = '') {
  const localList = FSsearchDir(path)
  return filterURL({ list, localList })
}

// 下载
function downloadHandler({ list, path, index = 0 }) {
  const leng = list.length
  if (!leng) {
    // 如果是空的则停止
    console.log(setLogColor('magenta'), '[INFO]', `${index + 1} / ${LIST.length} ${path} total: ${leng}`)
    if (IS_EMPTY_FINASH) return console.log(setLogColor('yellow'), '[WARN]', 'the list is empty')
    // 跳过空项继续下载
    const newData = LIST[++index]
    if (!newData) return console.log(setLogColor('green'), '[SUCCESS]', `${path} all finsh${noFindNum ? ` 404 file total: ${noFindNum}` : ''}`)
    const downloadList = filterDataAndLocal(newData.list, newData.path)
    console.log(`download ${index + 1} / ${LIST.length} ${newData.path} total: ${downloadList.length}`)
    return downloadHandler({ list: downloadList, path: newData.path, index })
  }
  return downloadFunHandler(list, { path })
    .then(({ len, isErrorFinash, noFindNum, isOnleyOne }) => {
      console.log(setLogColor('green'), '[SUCCESS]', `${path} all finsh`)
      if (noFindNum) {
        console.log(setLogColor('yellow'), `404 file count: ${noFindNum} / ${leng}`)
      }
      if (isErrorFinash) {
        isStopList.forEach(e => {
          console.log(setLogColor('red'), '[ERROR]', ...e)
        })
        let message = `${index + 1} / ${LIST.length} 有未完成项`
        if (noFindNum) {
          message += `\n404 file total: ${noFindNum} / ${leng}`
        }
        if (isErrorFinash) {
          message += `\nerror file total: ${isStopList.length} / ${leng}`
        }
        message += `\n${path} finsh`
        return console.log(setLogColor('cyan'), '[INFO]', message)
      }
      if (isOnleyOne) return
      if (!len) {
        let newData = LIST[++index]
        if (newData && newData.list && newData.list.length) {
          noFindNum = 0
          const downloadList = filterDataAndLocal(newData.list, newData.path)
          console.log(`download ${index + 1} / ${LIST.length} ${newData.path} total: ${downloadList.length}`)
          downloadHandler({ list: downloadList, path: newData.path, index })
        } else {
          console.log(setLogColor('magenta'), '[ERROR]', 'all clear')
        }
      }
    })
    .catch(() => {
      console.log(setLogColor('red'), '[ERROR]', index + 1, ' / ', LIST.length, path)
    })
}

// 下载 定制版
function downloadHandler2(data, index = 0) {
  const { list: listItem, path: pathItem } = data[index]
  LIST.splice(0, Number.MAX_SAFE_INTEGER, ...data)
  const list = filterDataAndLocal(listItem, pathItem)
  console.log(`download ${index + 1} / ${data.length} ${pathItem} total: ${list.length}`)
  downloadHandler({ list, path: pathItem, index })
}

/**
 * 根据 url 自动解析当前系列 页面的 图片
 * @param {Array} data
 * @param {String} data[0] URL
 * @param {Boolean} options.isDeep 自动获取下一页数据
 * @param {Boolean} options.isFilter 自动检测是否加载
 * TODO 暂时仅支持 http://www.jpsft.com
 */
async function getFullResData(data, options = {}) {
  const { isDeep = true, isFilter = false } = options
  // 支持从 data.js 获取 url list
  if (Array.isArray(data) && !data.length) {
    const localData = FSRead('./data.js').replace(/(\n|\r)+/, '\n').split('\n')
    console.log('localData', localData.length)
    for (const url of localData) {
      if (url && !(/^[\/]{2}/.test(url))) {
        console.log(setLogColor('yellow'), `url ${url}`)
        await getFullResData([url], { isDeep: false })
      }
    }
    return
  }

  checkDir('LOG')

  let [url] = data
  url = url.replace(/\s?/g, '')
  if (!(/^https?:[/]{2}/.test(url))) return console.log(setLogColor('red'), '[ERROR] 不是 http 开头')
  const index = url.lastIndexOf('/')
  if (!~index) return console.log(setLogColor('red'), '[ERROR] 查找从右往左第一个\'/\'异常, 请检视code')
  const baseURL = url.slice(0, index + 1)
  const originURL = new URL(url).origin
  const htmlURL = url.slice(index + 1)
  const LOG_LIMIT = `// ${'='.repeat(100)}\n`
  let resData = ''
  let cookieNum = 0
  let isList = true
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      'Accept-Encoding': 'gzip, deflate, br',
      Pragma: 'no-cache',
      'upgrade-insecure-requests': 1
    },
    responseType: 'arraybuffer',
    responseEcoding: 'utf',
    timeout: 30 * 1e3,
  })
  const utf8decoder = new TextDecoder('GBK') // html 默认为 gbk 格式,若直接使用utf8解析会有乱码
  // 请求当前页面
  return instance
    .get(htmlURL, { headers: { cookie: `visits=${++cookieNum}; totalpv=${cookieNum}` } })
    .then(async res => {
      const html = utf8decoder.decode(res.data)
      resData += html
      // 判断当前是 列表 还是 内容
      isList = /option/.test(html)
      // 解析后续页面
      let tmp = []
      if (isList) {
        // 列表
        tmp.push(...html.matchAll(/<option value="(\d+\.html)">第\d+页<\/option>/ig))
      } else {
        // 内容
        tmp.push(...(html.match(/<div class=["']pagelist["']>[\w\u4e00-\u9fff<>= '"\/&;,.!#]+/g) || [''])[0].matchAll(/href='([\d_\.html]+)'/g))
        if (isFilter) {
          const path = filterPath2(resData.match(/<title>([\s0-9a-z\u4e00-\u9fff《》【】·.\[\]\-—_()（）&＆#~@%\\/｜|+;]+)<\/title>/i)?.[1] || '')
          console.log({ path })
          const isSameIndex = LIST.findIndex(({ path: curPath }) => curPath === path)
          if (isSameIndex !== -1) {
            return Promise.reject(`[WARNING] 当前项已在第 ${isSameIndex + 1} 项重复\n${path} `)
          }
        }
      }
      const pathList = (isDeep || !isList) ? [...new Set(tmp.map(item => item[1]))] : []
      const reqList = []
      if (isList) {
        console.log('pathList', `${htmlURL} 共 ${pathList.length} 页`)
        fs.appendFileSync(`./LOG/${logName}`, pathList.reduce((res, cur) => res + cur + '\n', ''))
      }

      // 请求过快会触发服务器保护
      for (const path of pathList) {
        if (path === htmlURL) continue
        await new Promise(resolve => setTimeout(resolve, 100))
        reqList.push(instance
            .get(path, { headers: { cookie: `visits=${++cookieNum}; totalpv=${cookieNum}` } })
            .catch(err => {console.log(path, err.code)}))
      }
      return Promise.all(reqList)
    })
    .then(list => {
      list.forEach(res => {
        if (!res) return
        const html = utf8decoder.decode(res.data)
        resData += html
      })
    })
    .then(async () => {
      if (!resData) return console.log(setLogColor('red'), '[ERROR] resData 没有暂存到 html 数据')
      if (isList) {
        const tmp = [...(resData.match(/<div class="title">([a-z0-9\u4e00-\u9fff\s`~!@#$%^&*()+-=\[\]\\;',./{}|:"<>?·~！@#￥%……&（）—【】、；‘’，。、：“”《》？ ]+)<\/div>/ig))]
        for (let i = 0, len = tmp.length; i < len; i++) {
          const data = tmp[i]
          const title = data.match(/>([\s0-9a-z\u4e00-\u9fff《》【】·.\[\]\-—_()（）&#~@%\\/｜|+;]+)<\/a>/i)
          const list = data.match(/href=['"]([\\/a-z0-9\.]+)['"]/i)
          const url = `${originURL}${list[1]}`
          fs.appendFileSync(`./LOG/${logName}`, `${('-').repeat(60)}\nNo: ${i + 1} / (${len})\n${title[1]}\n${url}\n`)
          console.log(`${i + 1} / ${len}`)
          // 获取详情页
          await getFullResData([url])
        }
      } else {
        const list = [...(resData.matchAll(/<img src=["']([a-z0-9:\/\._-]+)["']/g) || [])].map(path => path[1])
        let path = resData.match(/<title>([\s0-9a-z\u4e00-\u9fff《》【】·.\[\]\-—_()（）&＆#~@%\\/｜|+;]+)<\/title>/i)?.[1] || ''
        fs.appendFileSync(`./LOG/${logName}`, `title: ${path}\n`)
        path = filterPath2(path)
        fs.appendFileSync(`./LOG/${logName}`, `path: ${path}\n`)
        if (!list.length || !path) {
          fs.appendFileSync(`./LOG/${logName}`, `url: ${htmlURL}\n${LOG_LIMIT}\n`)
          return console.log(setLogColor('red'), `[ERROR] 没有 ${!list.length ? 'list' : 'title'}`)
        } else {
          fs.appendFileSync(`./LOG/${logName}`, `list: ${list.length}\n${LOG_LIMIT}\n`)
        }
        console.log({ path, len: list.length })
        saveLocal({ path, list })
      }
    })
    .catch(error => {
      console.log('error', error)
    })
}

module.exports = {
  log,
  FSMkdirSync,
  FSsearchDir,
  FSRead,
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
  downloadFun,
  getFullResData,
  filterPath,
  filterPath2,
  checkDir,
  logName,
}
