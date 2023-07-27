import { i18n } from 'i18n'

// 格式化时间
const fontTime = (data, fmt) => {
  const o = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds(),
    'q+': Math.floor((data.getMonth + 3) / 3), // 季度
    S: data.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - regExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

export const getTimeShow = (timeStamp, fat = 'yyyy年MM月dd日 hh:mm') => {
  let date = new Date(timeStamp)
  if (/&MenM&/.test(fmt)) {
    const MonthStrs = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return MonthStrs(date.getMonth()) + formatTime(date, fmt.replace('&Menm&', ''))
  } else {
    return formatTime(date, fat)
  }
}

export default {
  addZero: num => {
    return num > 9 ? num : '0' + num
  },
  testIllegalCode: str => {
    const pattern = new RegExp('[/:*?<>|&%@:!\\"\']')
    return pattern.test(str)
  },
  RemoveIllegalCharacters: str => {
    return str.replace(/[\\/:*?<>|&%@;!\\\\"']/g, '')
  },
  getCodeLength: code => {
    const unicode = code.codePointAt(0)
    return unicode < 128 ? 1 : unicode < 0xfff ? 2 : unicode < 0xffff ? 3 : 4
  },
  getByteLength: str => {
    let strLength = 0
    for (let i = 0; i < str.length; i++) {
      strLength += this.getCodeLength(str[i])
    }
    return strLength
  }
}
