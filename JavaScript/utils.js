import md5 from './md5'
import CryptoJS from 'CryptoJS'
import offset from './offset'

// 获取单个cookie
export const getCookie = key => {
  key += '='
  const cookie = document.cookie.split(';')
  for (let e of cookie) {
    while (e.charAt(0) === ' ') e = e.slice(1)
    if (e.includes(key)) return e.slice(key.length)
  }
}

// 获取cookie
export const getCookieCSRFToken = key => {
  let name = key + '='
  let ca = document.cookie.split(';')
  let ToTalCookie = ''
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i]
    while (c.charAt(0) === '') c = c.substring(1)
    if (c.indexOf(name) !== -1) {
      ToTalCookie += ',' + c.substring(name.length, c.length)
    }
  }
  ToTalCookie = ToTalCookie.substr(1)
  return ToTalCookie
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
  }
  document.cookie = name + '=' + value + expires + ';'
}

// 清除cookie
export const clearCookie = key => {
  setCookie(key, '' , -1)
}

// 获取浏览器类型
export const browserType = () => {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  let browser = 'unknown'
  if (userAgent.includes('IE')) {
    browser = 'IE'
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox'
  } else if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
    browser = 'Opera'
  } else if (userAgent.includes('Chrome') && !/Edge\/(\d+)/.exec(userAgent)) {
    browser = 'Chrome'
  } else if (userAgent.includes('Safari')) {
    browser = 'Safari'
  } else if (/MSIE \d/.test(userAgent) || /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent)) {
    browser = 'IE'
  } else if (/Edge\/(\d+)/.exec(userAgent)) {
    browser = 'Edge'
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

// 校验当前是否为 win 环境
export const isWin = (() => ['Win32', 'Win64'].includes(window.navigator.platform))()

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

// 打开新页面
export const toOtherPage = (url, { type, blank } = {}) => {
  switch (type) {
    case 1:
      window.parent.location.href = url
      break
    case 2:
      window.top.location.href = url
      break
    case 3:
      window.open(url, blank)
      break
    case 4:
      window.location.replace(url)
      break
    default:
      window.location.href = url
      break
  }
}

// 获取查询字符串
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
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)||(?:Adr)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  // const isChrome = /(?:Chrome|CriOS)/.test(ua)
  const isPad = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
  const isPhone = /(?:iPhone)/.test(ua) && !isPad
  const isPc = !isPhone && !isAndroid && !isSymbian
  const isWeChat = ''

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

// 去除字符串两侧空格
export const strTrim = str => {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 清空数组（不改变指针）
export const clearArray = arr => {
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
  if (!data.length) return data
  const enumCode = {
    '`': '&#x60;',
    "'": '&#x27;',
    '"': '&#x22;',
    ':': '&#x3a;',
    '<': '&#x3c;',
    '>': '&#x3e;',
    '{': '&#x7b;',
    '}': '&#x7d;',
    '[': '&#x5b;',
    ']': '&#x5d;',
    '(': '&#x28;',
    ')': '&#x29;',
    '+': '&#x2b;',
    '-': '&#x2d;',
    '*': '&#x2a;',
    '/': '&#x2f;',
    '\\': '&#x5c;',
    '%': '&#x25;',
    '|': '&#x7c;',
    ',': '&#x2c;',
    ';': '&#x3b;',
    '&': '&#x26;',
    '^': '&#x5e;',
    '$': '&#x24;',
    '#': '&#x23;',
    '@': '&#x40;',
    '=': '&#x3d;'
  }
  return data.replace(/[`@#$%^&*()-+={}\[\]|\\:;"',<>\/]/g, v => enumCode[v])
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
export const deepClone = data => {
  const type = getDataType(data)
  let obj
  if (type === 'Array') {
    obj = []
    for (let i = 0; i < data.length; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'Object') {
    obj = {}
    for (const key in data) {
      obj[key] = deepClone(data[key])
    }
  } else {
    obj = data
  }
  return obj
}

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

// 查看 dom 元素是否是某个 class 样式下的元素
export const isChildByClassName = (className, dom) => {
  if (!dom) return false
  const currentClass = dom.className
  const classType = getDataType(currentClass)
  if (classType === 'SVGAnimatedString') {
    if (classType.baseVal === className) {
      return true
    }
    return isChildByClassName(className, dom.parentNode)
  } else if (classType !== 'String') {
    return false
  } else if (currentClass.includes(className)) {
    return true
  }
  return isChildByClassName(className, dom.parentNode)
}

// 使用Object.defineProperty 添加es6方法


// Vue.extend创建toast


// 根据滚动计算可视区域数据


// 双击
let debounceTime = 0
let timer = null
export const debounceClick = (interval, fn) => {
  const currentTime = new Date().getTime()
  if(!debounceTime) {
    debounceTime = currentTime
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn()
      debounceTime = 0
    }, interval)
  } else if (debounceTime - currentTime <= interval) {
    debounceTime = 0
    clearTimeout(timer)
    timer = null
  }
}

// axios 全局异常处理

// 获取图片信息
export const getImageInfo = file => {
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
          data: EXIF.readFormBinaryFile(res.currentTarget.result)
        })
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

// 获取缩略图
const getThumbSteps = (image, canvas, ctx) => {
  const { width = 0, height = 0 } = image // 原图宽高
  const maxWidth = 350, maxHeight = 350 // 图片宽高
  let [sx, sy] = [0, 0] // 坐标位置
  let [swidth, sheight] = [width, height] // 被剪切图像的宽高
  let [iwidth, iheight] = [width, height] // 输出图像的宽高
  const extraSize = Math.abs(width - height) // 宽高差
  
  if (width > maxWidth && height > maxHeight) {
    let ratio
    if (width > height) {
      ratio = height / maxHeight
      sx = extraSize / 2
      swidth = maxWidth * ratio
      iwidth = width / ratio
      iheight = maxHeight
    } else {
      ratio = width / maxWidth
      sy = extraSize / 2
      sheight = maxHeight * ratio
      iwidth = maxWidth
      iheight = height / ratio
    }
  } else if (width > maxWidth && height <= maxHeight) {
    sx = extraSize / 2
    swidth = maxWidth
    iwidth = maxWidth
    iheight = height
  } else if (width <= maxWidth&& height > maxHeight) {
    sy = extraSize / 2
    sheight = maxHeight
    iwidth = width
    iheight = maxHeight
  }
  canvas.width = Math.min(maxWidth, iwidth)
  canvas.height = Math.min(maxHeight, iheight)
  ctx.drawImage(image, sx, sy, swidth, sheight, 0, 0, iwidth, iheight)
  return canvas.toDataURL('image/jpeg', 0.9)
}

// 获取密文的缩略图
const getCryptThumbSteps = (image, canvas, ctx) => {
  const maxWidth = 350
  const maxHeight = 350

  const width = image.width || image.videoWidth
  const height = image.height || image.videoHeight

  let sx = 0 // 开始剪切的 x 坐标位置
  let sy = 0 // 开始剪切的 y 坐标位置
  let iwidth = width // 输出图像的宽
  let iheight = height // 输出图像的高

  // 如果宽度或高度超出，进行压缩
  if (width > maxWidth || height > maxHeight) {
    // 横向长方形
    if (width > height) {
      iwidth = maxWidth
      iheight = (iwidth / width) * height
    }
    // 纵向长方形
    if (width <= height) {
      iheight = maxHeight
      iwidth = (iheight / height) * width
    }
  }

  canvas.width = iwidth
  canvas.height = iheight
  ctx.drawImage(image, sx, sy, iwidth, iheight)

  return canvas.toDataURL('image/jpeg', 0.9)
}

// 获取LCD图
const getLcdSteps = (image, canvas, ctx) => {
  const maxWidth = 1920
  const maxHeight = 1920

  const width = image.width || image.videoWidth
  const height = image.height || image.videoHeight

  let sx = 0 // 开始剪切的 x 坐标位置
  let sy = 0 // 开始剪切的 y 坐标位置
  let iwidth = width // 输出图像的宽
  let iheight = height // 输出图像的高

    // 如果宽度或高度超出，进行压缩
  if (width > maxWidth || height > maxHeight) {
    // 横向长方形
    if (width > height) {
      iwidth = maxWidth
      iheight = (iwidth / width) * height
    }
    // 纵向长方形
    if (width <= height) {
      iheight = maxHeight
      iwidth = (iheight / height) * width
    }
  }

  canvas.width = iwidth
  canvas.height = iheight
  ctx.drawImage(image, sx, sy, iwidth, iheight)

  return canvas.toDataURL('image/jpeg', 0.9)
}

// 生成缩略图（canvas）
const getThumb = (url, callback1, callback2) => {
  const canvas = document.createElement('CANVAS')
  canvas.style.display = 'none'
  const ctx = canvas.getContext('2d')
  document.body.appendChild(canvas)

  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = url
  image.onload = () => {
    if (callback1 && getDataType(callback1) === 'Function') {
      const dataURL = getThumbSteps(image, canvas, ctx)
      callback1(dataURL)
    }
    document.body.removeChild(canvas)
  }
  image.onerror = error => {
    if (callback2 && getDataType(callback2) === 'Function') {
      callback2(error)
    }
    document.body.removeChild(canvas)
  }
}

// 绘制缩略图和LCD图，用于加密上传
export const getThumbAndLCD = (url, callback1, callback2) => {
  const canvas = document.createElement('CANVAS')
  canvas.style.display = 'none'
  const ctx = canvas.getContext('2d')
  document.body.appendChild(canvas)

  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = url
  image.onload = () => {
    if (callback1 && getDataType(callback1) === 'Function') {
      const dataURL = getThumbSteps(image, canvas, ctx)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const lcdDataURL = getLcdSteps(image, canvas, ctx)
      callback1({ dataURL, lcdDataURL })
    }
    document.body.removeChild(canvas)
  }
  image.onerror = error => {
    if (callback2 && getDataType(callback2) === 'Function') {
      callback2(error)
    }
    document.body.removeChild(canvas)
  }
}

// 根据视频第 1s 生成缩略图
export const getThumbByVideo = (video, callback) => {
  const canvas = document.createElement('CANVAS')
  canvas.style.display = 'none'
  const ctx = canvas.getContext('2d')
  document.body.appendChild(canvas)

  if (callback && getDataType(callback) === 'Function') {
    const dataURL = getThumbSteps(video, canvas, ctx)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const lcdDataURL = getLcdSteps(video, canvas, ctx)
    callback({ dataURL, lcdDataURL })
  }
  document.body.removeChild(canvas)
}

// 获取用于上传的缩略图和LCD图
export const getThumbToUpload = url => {
  return new Promise((resolve, reject) => {
    getThumbAndLCD(url, ({ dataURL = '', lcdDataURL = '' }) => {
      resolve({
        code: 0,
        data: {
          thumbBlob: dataURLtoBlob(dataURL),
          lcdBlob: dataURLtoBlob(lcdDataURL),
          thumbUrl: window.URL.createObjectURL(dataURLtoBlob(dataURL))
        }
      }),
      error => { reject(error) }
    })
  })
}

// 获取用于上传的视频第 1s 生成缩略图
export const getThumbToUploadByVideo = url => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('VIDEO')
    if (browserType() === 'FireFox') {
      video.currentTime = 1
    }
    video.src = url
    video.crossOrigin = 'Anonymous'
    video.addEventListener('canplay', () => {
      getThumbByVideo(video, ({ dataURL = '', lcdDataURL = '' }) => {
        resolve({
          code: 0,
          data: {
            thumbBlob: dataURLtoBlob(dataURL),
            lcdBlob: dataURLtoBlob(lcdDataURL),
            thumbUrl: window.URL.createObjectURL(dataURLtoBlob(dataURL))
          }
        })
      },
      error => { reject(error) })
    }, false)
  })
}

// 使用 canvas 绘制缩略图
export const getThumbByCanvas = (url, callback) => {
  getThumb(url, dataURL => {
    if (callback && getDataType(callback) === 'Function') {
      callback(window.URL.createObjectURL(dataURLtoBlob(dataURL)))
    }
  })
}

// 将图片转成base64
export const imageToBase64 = image => {
  const canvas = document.createElement('CANVAS')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, image.width, image.height)
  return canvas.toDataURL('image/png', 0.9)
}

// 将图片的base64转成Blob形式
export const dataURLtoBlob = dataurl => {
  // let byteString
  // if (dataurl.split(',')[0].indexOf('base64') >= 0) {
  //   // atob 用于解码使用 base-64 编码的字符串
  //   byteString = atob(dataurl.split(',')[1])
  // } else {
  //   byteString = unescape(dataurl.split(',')[1])
  // }
  // const mime = dataurl.split(',')[0].split(':')[1].split(';')[0]
  // let u8 = new Uint8Array(byteString.length)
  // for (let i = 0; i < byteString.length; i++) {
  //   u8[i] = byteString.charCodeAt(i)
  // }
  // return new Blob([u8], { type: mime })

  const arr = dataurl.split(',')
  const [, mime] = arr[0].match(/:(.*?);/)
  const bstr = arr[0].includes('base64') ? atob(arr[1]) : unescape(arr[1])
  let n = bstr.length
  const u8 = new Uint8Array(n)
  while(n--) {
    u8[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8], { type: mime })
}

// 获取校验分段 MD5
export const getSpecificMD5 = (rangArr, file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let index = 0
    const blob = file
    const md5Arr = []
    reader.onload = evt => {
      if (reader.readyState === 2) {
        index++
        md5Arr.push(md5.hex(evt.target.result))
        if (angArr[index]) {
          reader.readAsArrayBuffer(blob.slice(rangArr[index][0], rangArr[index][1] + 1))
        } else {
          resolve({ code: 0, data: md5Arr })
        }
      } else {
        throw reader.readyState
      }
    }
    reader.onabort = reader.onerror = error => {
      reject({ msg: 'getMD5 Fail', inof: error })
    }
    reader.readAsArrayBuffer(blob.slice(rangArr[0][0], rangArr[0][1] + 1))
  })
}

// 获取校验参数
export const getMD5 = (file, key) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let md5Obj = md5.create()
    reader.onload = evt => {
      const sha256 = key ? CryptoJS.HmacSHA256(CryptoJS.lib.WordArry.create(reader.result), CryptoJS.enc.Hex.parse(key)).toString() : CryptoJS.SHA256(CryptoJS.lib.WordArry.create(reader.result)).toString()
      // base64 MD5
      md5Obj = md5Obj.update(evt.target.result)
      const originMd5 = md5Obj.hex()
      const base64Md5 = md5Obj.base64()
      // offset
      const offsetArr = offset(originMd5, file.size)
      getSpecificMD5(offsetArr, file)
        .then(({ data }) => {
          resolve({
            code: 0,
            data: {
              md5Arr: data,
              originMd5,
              base64Md5,
              offsetArr,
              sha256
            }
          })
        })
        .catch(err => {
          reject(err)
        })
    }
    reader.onsnort = reader.onerror = () => {
      reject({ msg: 'getMD5 Fail' })
    }
    reader.readAsArrayBuffer(file)
  })
}

// 获取云盘备忘录校验参数
export const getMD5Block = (file, key, type, index) => {
  return new Promise((resolve, reject) => {
    const segSize = 3 * 1024 * 1024
    let startFlag
    const reader = new FileReader()
    let md5Obj = md5.create()
    let sha256 = key ? CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, CryptoJS.enc.Hex.parse(key)).toString() : type === '6' ? '' : CryptoJS.algo.SHA256.create()
    reader.onload = evt => {
      if (window._upload_ && window._upload_.vm.fileInf && window._upload_.vm.fileInf[index]) {
        window._upload_.vm.fileInf[index].statusMsg = `${(Math.random() * 100).toFixed(1)}KB/s(0.1%)`
      }
      if (((window._upload_ && window._upload_.vm.fileInf && window._upload_.vm.fileInf[index] && window._upload_.vm.fileInf[index].isStopped) || !window._upload_) && type === '6') {
        reader.abort()
      } else if (reader.readyState === 2) {
        md5Obj = md5Obj.update(evt.target.result)
        sha256 = !key && type === '6' ? '' : sha256.update(CryptoJS.lib.WordArry.create(reader.result))
        if (startFlag >= file.size) {
          sha256 = !key && type === '6' ? '' : sha256.finalize().toString()
          const originMd5 = md5Obj.hex()
          const base64Md5 = md5Obj.base64()
          // offset
          const offsetArr = offset(originMd5, file.size)
          let dataObj = {}
          getSpecificMD5(offsetArr, file)
            .then(res => {
              dataObj = {
                md5Arr: res.data,
                originMd5,
                base64Md5,
                offsetArr,
                sha256
              }
              resolve({
                code: '0',
                data: dataObj
              })
            })
            .catch(err => {
              reject(err)
            })
        } else {
          const stopFlag = startFlag + segSize >= file.size ? file.size : startFlag + segSize
          readBlob(startFlag, stopFlag)
        }
      } else {
        reject({ msg: 'readFile Fail' })
      }
    }
    reader.onabort = reader.onerror = () => {
      reject({ msg: 'readFile Fail' })
    }
    reader.abort = () => {
      reject({ msg: 'user Cancel' })
    }
    const readBlob = (start, stop) => {
      startFlag = stopPropagation();
      const Blob = file.hasOwnProperty('webkitSlice') ? 
        file.webkitSlice(start, stop) :
        file.hasOwnProperty('mozSlice') ?
        file.mozSlice(start, stop) : file.slice(start, stop)
      try {
        reader.readAsArrayBuffer(Blob)
      } catch (err) {
        resolve({ msg: 'readFile Fail', err })
      }
    }
    readBlob(0, segSize)
  })
}

// 判断用户是否进行了 ctrl 和 shift 提示
// 若没有则进行存储和提示
// callback 若没有存储时，进行处理
export const setBalloTips = (callback, userId) => {
  const uid = userId
  let ballonTips = getSessionStorage('ballonTips') ? JSON.parse(getSessionStorage('ballonTips')) : {}
  if (getDataType(ballonTips) !== 'Object') {
    ballonTips = {}
  }
  if (!ballonTips[uid]) {
    callback()
    ballonTips[uid] = true
    setSessionStorage('ballonTips', JSON.stringify(ballonTips))
  }
}

// 文件下载
export const downloadFile = url => {
  if (!url || browserType() === 'Opera') {
  } else if (browserType === 'Chrome') {
    const node = document.createElement('a')
    node.setAttribute('href', url)
    node.setAttribute('download', '')
    if (document.createEvent) {
      const event = document.createEvent('iframe')
      event.initEvent('click', true, true)
      node.dispatchEvent(event)
    }
  } else if (browserType === 'FireFox') {
    const node = document.createElement('iframe')
    node.style.display = 'none'
    node.src = url
    document.body.appendChild(node)
    node.click()
  } else {
    window.open(url, 'self')
  }
}

// 生成缩略图的背景图，进行平铺展示
export const getDefaultThumbTag = ({ width, height, marginT, marginR, marginB, marginL, borderWidth }) => {
  const canvas = document.createElement('CANVAS')
  canvas.style.display = 'none'
  const ctx = canvas.getContext('2d')
  document.body.appendChild(canvas)
  const [cWidth, cHeight] = [width + borderWidth * 2 + marginR + marginL, height + borderWidth * 2 + marginT + marginB]
  canvas.width = cWidth
  canvas.height = cHeight
  ctx.fillStyle = '#FAFAFA'
  ctx.fillRect(0, 0, cWidth, cHeight)
  ctx.fillStyle = '#F2F2F2'
  ctx.fillRect(borderWidth + marginL, borderWidth + marginT, width, height)
  const dataURL = canvas.toDataURL('image/jpeg')
  document.body.removeChild(canvas)
  return window.URL.createObjectURL(dataURLtoBlob(dataURL))
}

// 生成缩略图的背景图，进行平铺展示
export const getDefaultAlbumThumbTag = ({ width, height, marginT, marginR, marginB, marginL, borderWidth }) => {
  const canvas = document.createElement('CANVAS')
  canvas.style.display = 'none'
  const ctx = canvas.getContext('2d')
  document.body.appendChild(canvas)
  const [cWidth, cHeight] = [width + borderWidth * 2 + marginR + marginL, height + borderWidth * 2 + marginT + marginB]
  canvas.width = cWidth
  canvas.height = cHeight
  ctx.fillStyle = '#FAFAFA'
  ctx.fillRect(0, 0, cWidth, cHeight)
  ctx.fillStyle = '#F2F2F2'
  ctx.fillRect(borderWidth + marginL + 1, borderWidth + marginT + 1, width - 2, height - 2)
  const dataURL = canvas.toDataURL('image/jpeg')
  document.body.removeChild(canvas)
  return window.URL.createObjectURL(dataURLtoBlob(dataURL))
}

// export const hasEmoji = (str = '') => {
//   let regRule = ''
//   const regEmoji = new RegExp(regRule, 'gi')
//   return Array.from(str).some(item => {
//     return regEmoji.test(item)
//   })
// }
