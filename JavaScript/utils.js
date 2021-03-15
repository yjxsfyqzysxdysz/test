// 获取单个cookie
export const getCookie = key => {
  key += '='
  const cookie = document.cookie.split(';')
  for (let e of cookie) {
    while (e.charAt(0) === ' ') e = e.slice(1)
    if (e.includes(key)) return e.slice(key.length)
  }
}

// 获取全部cookies
export const getAllCookie = () => {}

// 设置cookie
export const setCookie = (name, value, days) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  } else {
    expires = ''
    document.cookie = name + '=' + value + expires + ';'
  }
}

// 清除cookie
export const clearCookie = () => {}

// 确认浏览器 不考虑对 IE9 以下
export const browserType = () => {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  let browser = 'unknown'
  if (userAgent.indexOf('IE') != -1) {
    browser = 'IE'
  } else if (userAgent.indexOf('Firefox') != -1) {
    browser = 'Firefox'
  } else if (userAgent.indexOf('OPR') != -1) {
    browser = 'Opera'
  } else if (userAgent.indexOf('Chrome') != -1) {
    browser = 'Chrome'
  } else if (userAgent.indexOf('Safari') != -1) {
    browser = 'Safari'
  } else if (userAgent.indexOf('Trident') != -1) {
    browser = 'IE 11'
  }
  return browser
}

// 获取IE版本
export const IEVersion = () => {
  // 取得浏览器的userAgent字符串
  var userAgent = navigator.userAgent
  // 判断是否为小于IE11的浏览器
  var isLessIE11 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  // 判断是否为IE的Edge浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11
  // 判断是否为IE11浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isLessIE11) {
    var IEReg = new RegExp('MSIE (\\d+\\.\\d+);')
    // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
    IEReg.test(userAgent)
    // 取正则表达式中第一个小括号里匹配到的值
    var IEVersionNum = parseFloat(RegExp['$1'])
    if (IEVersionNum === 7) {
      // IE7
      return 7
    } else if (IEVersionNum === 8) {
      // IE8
      return 8
    } else if (IEVersionNum === 9) {
      // IE9
      return 9
    } else if (IEVersionNum === 10) {
      // IE10
      return 10
    } else {
      // IE版本<7
      return 6
    }
  } else if (isEdge) {
    // edge
    return 'edge'
  } else if (isIE11) {
    // IE11
    return 11
  } else {
    // 不是ie浏览器
    return -1
  }
}

// 计算空间大小
export const getSize = (size, { space = true, unit = true, place = true } = {}) => {
  const enumUnit = ['B', 'KB', 'MB', 'GB', 'TB']
  let count = 0
  size = parseFloat(size)
  while (size > 1024 && count < 4) {
    size = size / 1024
    count++
  }
  size = size.toFixed(place)
  space && (size += ' ')
  unit && (size += enumUnit[count])
  return size
}

// Map 按 key 升序/降序 排列
export const sortMap = (map, { sort = true } = {}) => {
  const arr = [...map.keys()]
  if (sort) {
    arr.sort((a, b) => a - b)
  } else {
    arr.sort((a, b) => b - a)
  }

  let newMap = new Map()
  for (const key of arr) {
    newMap.set(key, map.get(key))
  }
  return newMap
}

// Set 升序/降序排列
export const sortSet = (data, { sort = true } = {}) => {
  const arr = [...data]
  if (sort) {
    arr.sort((a, b) => a - b)
  } else {
    arr.sort((a, b) => b - a)
  }
  return new Set(arr)
}

// 获取地址栏
export const getUrl = type => {
  switch (type) {
    case 'host': // 设置或获取 location 或 URL 的 hostname 和 port 号码
    case 'port': // 设置或获取与 URL 关联的端口号码
    case 'hostname': // 设置或获取 location 或 URL 的主机名称部分
    case 'hash': // 设置或获取 href 属性中在井号“#”后面的分段
    case 'href': // 设置或获取整个 URL 为字符串
    case 'protocol': // 设置或获取 URL 的协议部分
      return window.location[type]
    case 'search': // 设置或获取 href 属性中跟在问号后面的部分
      let url = window.location.search
      let obj = {}
      if (url.includes('?')) {
        url = url.substr(1).split('&')
        for (const s of url) {
          let o = s.split('=')
          obj[o[0]] = o[1]
        }
      }
      return obj
    default:
      break
  }
}

export const getUrlParams = param => {
  const reg = new RegExp(`${param}=([^&]*)`)
  const [, res] = window.location.href.match(reg) || []
  return res
}

// 判断是否有emoji表情
export const hasEmoji = (data, { match = true } = {}) => {
  const status = data.match(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g)
  if (match) {
    return status
  }
  if (status) {
    return data.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
  }
  return data
}

// 判定当前设备类型（pad，phone，pc）
export const deviceType = () => {
  const ua = window.navigator.userAgent
  let isWindowsPhone = /(?:Windows Phone)/.test(ua)
  let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  let isAndroid = /(?:Android)/.test(ua)
  let isFireFox = /(?:Firefox)/.test(ua)
  // let isChrome = /(?:Chrome|CriOS)/.test(ua)
  let isPad = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  let isPhone = /(?:iPhone)/.test(ua) && !isPad
  let isPc = !isPhone && !isAndroid && !isSymbian

  return { isPad, isPhone, isPc }
}

// 获取随机id（10位，雪花算法）
export const getId = () => {
  return (Math.random() * 1e8).toString(16).substr(0, 4) + '-' + new Date().getTime() + '-' + Math.random().toString().substr(2, 5)
}

// Dom 事件监听 添加
export const setEvents = (event, fun, dom = document) => {
  if (dom.attachEvent) {
    dom.attachEvent('on' + event, fun, false)
  } else {
    dom.addEventListener(event, fun, false)
  }
}

// Dom 事件监听 取消
export const removeEvents = (event, fun, dom = document) => {
  if (dom.detachEvent) {
    dom.detachEvent('on' + event, fun, false)
  } else {
    dom.removeEventListener(event, fun, false)
  }
}

// 获取 LocalStorage
export const getLocalStorage = key => {
  return localStorage.getItem(key)
}

// 设置/删除 LocalStorage
export const setLocalStorage = (key, value) => {
  if (value + '') {
    localStorage.setItem(key, value)
  } else {
    localStorage.removeItem('key')
  }
}

// 清空 LocalStorage
export const clearLocalStorage = () => {
  localStorage.clear()
}

// 获取 SessionStorage
export const getSessionStorage = key => {
  return sessionStorage.getItem(key)
}

// 设置/删除 SessionStorage
export const setSessionStorage = (key, value) => {
  if (value + '') {
    sessionStorage.setItem(key, value)
  } else {
    sessionStorage.removeItem('key')
  }
}

// 清空 SessionStorage
export const clearSessionStorage = () => {
  sessionStorage.clear()
}

// 去除字符串两侧空格
export const strTrim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 清空数组（不改变指针）
export const clearArr = arr => {
  if (arr.length) return arr.splice(0)
}

// 数组去重
export const filterArr = arr => {
  return [...new Set(arr)]
}

// 检测数据类型
export const getDataType = data => {
  return Object.prototype.toString.call(data).slice(8, -1)
  // const str = Object.prototype.toString
  // const enumType = {
  //   '[object String]': 'string',
  //   '[object Number]': 'number',
  //   '[object Boolean]': 'boolean',
  //   '[object Object]': 'object',
  //   '[object Array]': 'array',
  //   '[object Function]': 'function',
  //   '[object Undefined]': 'underfined',
  //   '[object Null]': 'null',
  //   '[object Symbol]': 'symbol',
  //   '[object RegExp]': 'regexp',
  //   '[object Date]': 'date',
  //   '[object Bigint]': 'bigint'
  // }
  // if (data instanceof Element) return 'element'
  // return enumType[str.call(data)]
}

// 正则 phone，mail，password，passwordNumber
// mail ^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
// phone /^[\d+*#]{1,20}$/
// phone /^1\d{10}$/
// password /^(?=.*[A-Za-z])[\s\S]{4,16}$/
// passwordNumber /^\d{4,16}$/
// 18位身份证号：^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$

// 检验特殊字符 .,:+_*-=/&^;()\<|[{'`＂}]>$%#
export const checkStr = data => {
  const reg = /.,:\+_\*-=\/&\^;()\\<\|\[{'`＂}\]>\$%#/g
  return data.test(reg)
}

// 转换特殊字符
export const transferredMeaning = data => {
  const enumCode = {
    '`': '',
    "'": '',
    '"': '',
    '<': '',
    '>': '',
    '{': '',
    '}': '',
    '[': '',
    ']': '',
    '(': '',
    ')': '',
    '+': '',
    '-': '',
    '*': '',
    '/': '',
    '\\': '',
    '%': '',
    '|': '',
    '.': '',
    ',': '',
    ';': '',
    '&': '',
    '^': '',
    '$': '',
    '#': '',
    '!': '',
    '~': '',
    '@': ''
  }

  return
}

// 时间转换
export const  = => {
  
}

// 获取随机颜色
export const  = => {
  
}

// 字符串隔8位匿名化
export const anonymizedString = (str, { limit = 8, first = true, fill = true } = {}) => {
  str = String(str)
  const len = str.length
  for (let i = 0; i * limit <= len; i++) {
    if (first) {
      str = str.substring(0, i * limit) + '*' + str.substring(8 * limit + 1)
    } else if ((i + 1) * limit <= len) {
      str = str.substring(0, (i + 1) * limit - 1) + '*' + str.substring((i + 1) * limit)
    }
  }
  if (fill) {
    str = str.slice(0, -1)
  }
  return str
}

// 对象比较
export const isObjectEqual = (obj1, obj2) => {
  if (arguments.length < 2) throw 'Incorrect number of parameters'
  let obj1Type = getDataType(obj1)
  if (obj1Type !== getDataType(obj2)) return false
  // Not objects and arrays
  if (obj1Type !== 'Array' && obj1Type !== 'Object' && obj1Type !== 'Set' && obj1Type !== 'Map') {
    if (obj1Type === 'Number' && obj1.toString() === 'NaN') {
      return obj2.toString() === 'NaN'
    }
    if (obj1Type === 'Date' || obj1Type === 'RegExp') {
      return obj1.toString() === obj2.toString()
    }
    return obj1 === obj2
  } else if (obj1Type === 'Array') {
    if (obj1.length !== obj2.length) return false
    if (obj1.length === 0) return true
    for (let i = 0; i < obj1.length; i++) {
      if (!isObjectEqual(obj1[i], obj2[i])) return false
    }
  } else if (obj1Type === 'Object') {
    let objKeyList = Reflect.ownKeys(obj1)
    let obj2KeyList = Reflect.ownKeys(obj2)
    let key
    if (objKeyList.length !== obj2KeyList.length) return false
    for (let i = 0; i < objKeyList.length; i++) {
      key = objKeyList[i]
      if (key !== obj2KeyList[i]) return false
      if (!isObjectEqual(obj1[key], obj2[key])) return false
    }
  } else if (obj1Type === 'Set' || obj1Type === 'Map') {
    // 把 Set Map 转为 Array
    if (!isObjectEqual(Array.from(obj1), Array.from(obj2))) return false
  }
  return true
}

export const isObjectEqual2 = (obj1, obj2) => {
  if (!obj1 instanceof Object || !obj2 instanceof Object) return obj1 === obj2
  if (Object.keys(obj1).length - Object.keys(obj2).length) return false
  for (let k in obj1) {
    if (k !== 'createTime') {
      if (obj1[k] instanceof Object && obj2[k] instanceof Object) {
        if (isObjectEqual2(obj1[k], obj2[k])) {
          continue
        } else {
          return false
        }
      } else if (typeof obj1[k] === 'number' && typeof obj2[k] === 'number') {
        // 若为小数
        if (obj1[k].toString().indexOf('.') > -1) {
          obj1[k] = parseFloat(obj1[k].toFixed(10))
        }
        if (obj2[k].toString().indexOf('.') > -1) {
          obj2[k] = parseFloat(obj2[k].toFixed(10))
        }
        if (obj1[k] !== obj2[k]) return false
      } else if (k === 'executeTime' || k === 'time') {
        if (obj1[k] !== obj2[k]) return false
      }
    }
  }
  return true
}

// 对象深拷贝

// 将图片转成base64
function image2Base64(img) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  return canvas.toDataURL('image/png')
}

// 将图片的base64转成Blob形式
function dataURItoBlob(base64Data) {
  let byteString
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    // atob 用于解码使用 base-64 编码的字符串
    byteString = atob(base64Data.split(',')[1])
  } else {
    byteString = unescape(base64Data.split(',')[1])
  }
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
  let u8 = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    u8[i] = byteString.charCodeAt(i)
  }
  return new Blob([u8], { type: mimeString })
}

// 生成缩略图（canvas）

// 字符补0
export const pad = (num, length) => {
  return (Array(length).join('0') + num).slice(-length)
}

// 获取字符长度（Unicode 128-1 ff-2 fff-3 4）
export const getCodeLength = str => {
  const len = str.charCodeAt()
  if (len <= 128) {
    return 1
  } else if (len <= 0xff) {
    return 2
  } else if (len <= 0xfff) {
    return 3
  } else {
    return 4
  }
}

export const getCodesLength = str => {
  str = String(str)
  let len = 0
  for (const s of str) {
    len += getCodeLength(s)
  }
  return len
}

// 汉字-Unicode
export const chinese2Unicode = str => {
  let newStr = ''
  for (const s of str + '') {
    newStr += /[\u4e00-\u9fa5]/.test(s) ? '\\u' + parseInt(s.charCodeAt(0), 10).toString(16) : s
  }
  return newStr
}

// Unicode-汉字
export const unicode2Chinese = str => {
  // return str.split('\\u').join('')
  return unescape(str.replace(/\\u/g, '%u'))
}

// 使用Object.defineProperty 添加es6方法


// 获取月份
export const  = => {

}

// Vue.extend创建toast


// 根据滚动计算可视区域数据


// 双击？


// axios 全局异常处理

// 获取图片信息
export const getImageInfo = (_file, _render) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reader.onabort = e => {
      reject(e)
    }
    reader.onload = res => {
      if (!res.total) {
        reject('File size is 0')
      } else {
        resolve({
          data: EXIF.readFormBinaryFile(res.currentTarget(_render))
        })
      }
    }
    reader.readAsArrayBuffer(_file)
  })
}
