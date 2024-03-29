// 工具
import _ from 'lodash'

// 16进制颜色 转 GRB
export const HEX2RGB = function (val) {
  let str = val.replace(/^#/g, '')
  return [_.parseInt(str.slice(0, 2), 16), _.parseInt(str.slice(2, 4), 16), _.parseInt(str.slice(4), 16)]
}

// TODO GRB 转 CMYK
export const GRB2CMYK = function (val) {}

// CMYK 转 GRB
export const CMYK2GRB = function (val) {
  const C = val[0]
  const M = val[1]
  const Y = val[2]
  const K = val[3]
  const R = 255 * (1 - C) * (1 - K)
  const G = 255 * (1 - M) * (1 - K)
  const B = 255 * (1 - Y) * (1 - K)
  return [R, G, B]
}

// 数据类型判断
export const toRawType = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

// 判断是否为 Object
export const isObject = function isObject(val) {
  return toRawType(val) === 'Object'
}

/**
 * 自动从前补全参数
 * @param {string | number} index 数值
 * @param {number} num 位数
 * @returns {string} 返回值
 */
export const padStartNum = function (index, num = 3) {
  return _.padStart(index + '', num, '0')
}
