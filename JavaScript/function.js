const _ = require('lodash')
const moment = require('moment')

/**
 * 对文件大小进行转换
 * @param {string} type 单位
 * @param {string || Number} value 传入参数
 * @param {Boolean} unit 返回结果是否带单位
 * @param {Boolean} decimals 返回结果是否带小数
 */
const filterSize = (value, type = 'B', unit = false, decimals = false) => {
  // 过滤传入参数，过滤掉可能存在的单位
  let _value = parseFloat(0 + value)
  // 过滤传入单位，对传入的参数进行单位统一，为：B
  let _type = type.toUpperCase()
  if (_type.indexOf('B') === -1) {
    _type += 'B'
  }
  switch (_type) {
    case 'KB':
      _value = _value * Math.pow(1024, 1)
      break
    case 'MB':
      _value = _value * Math.pow(1024, 2)
      break
    case 'GB':
      _value = _value * Math.pow(1024, 3)
      break
    default:
      break
  }
  // 将传入参数以最大的单位返回
  let res
  for (let i = 3; i >= 0; i--) {
    res = (_value / Math.pow(1024, i)).toFixed(2)
    if (res >= 1 || i === 0) {
      if (!decimals) { // 不带小数
        res = parseInt(res)
      }
      if (unit) { // 带单位
        switch (i) {
          case 3:
            res += 'GB'
            break
          case 2:
            res += 'MB'
            break
          case 1:
            res += 'KB'
            break
          default:
            res += 'B'
            break
        }
      }
      break
    }
  }
  return res
}

module.exports = {
  filterSize
}