const _ = require('lodash')
const moment = require('moment')

/**
 * 对文件大小进行转换
 * @param {String | Number} value 传入参数
 * @param {String} type 单位
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
      if (!decimals) {
        // 不带小数
        res = parseInt(res)
      }
      if (unit) {
        // 带单位
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

// 过滤的Mac地址
const filterMacFun = val => {
  let data = val
  let tmp = data.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、g-z\s]/gi, '').toUpperCase()
  let arr = []
  if (tmp.length > 12) {
    tmp = tmp.slice(0, 12)
  }
  for (let i = 0; i < Math.ceil(tmp.length / 2); i++) {
    arr.push(tmp.slice(0 + 2 * i, 2 + 2 * i))
    if (i + 1 !== Math.ceil(tmp.length / 2) && ((tmp.length % 2 && tmp.length !== 1) || !(tmp.length % 2))) {
      arr.push(':')
    }
  }
  tmp = arr.toString()
  return tmp.replace(/[,]/gi, '')
}

const filterIpFun = val => {
  // let data = val
  // let tmp = data.replace(/[]/gi, '')
}

// 校验MAC地址
const judgeMacFun = val => {
  let reg = /([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}/
  return reg.test(val)
}

// 校验密码强度
const judgePwdPower = val => {
  let password = val
  let n = 0
  let reg1 = /[0-9]/g // 判断数字
  let reg2 = /[a-z]/g // 判定小写
  let reg3 = /[A-Z]/g // 判定大写
  // eslint-disable-next-line no-useless-escape
  let reg4 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\s]/g // 判定特殊字符
  if (reg1.test(password)) {
    n = n + 1
  }
  if (reg2.test(password)) {
    n = n + 1
  }
  if (reg3.test(password)) {
    n = n + 1
  }
  if (reg4.test(password)) {
    n = n + 1
  }
  return n
}

// IPV4/IPV6校验
const judgeIPAdd = val => {
  let ipv4 = /^((\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.){4}$/
  let ipv6 = /^(([\da-fA-F]{1,4}):){8}$/
  return ipv4.test(val + '.') ? 'IPv4' : ipv6.test(val + ':') ? 'IPv6' : 'Neither'
}

// IP转成整型
const ip2int = ip => {
  var num = 0
  ip = ip.split('.')
  num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3])
  num = num >>> 0
  return num
}

// 整型解析为IP地址
const int2iP = num => {
  var str
  var tt = []
  tt[0] = (num >>> 24) >>> 0
  tt[1] = ((num << 8) >>> 24) >>> 0
  tt[2] = (num << 16) >>> 24
  tt[3] = (num << 24) >>> 24
  str = String(tt[0]) + '.' + String(tt[1]) + '.' + String(tt[2]) + '.' + String(tt[3])
  return str
}

// 大数相加
// 数字类型采用64位浮点格式表示，我们可以利用Number对象的属性Number.MAX_VALUE , Number.MIN_VALUE来查看；
// JavaScript中Number范围为正负2的53次方，也即从最小值-9007199254740992到最大值+9007199254740992之间的范围。
// const bigInt = require('big-integer') // js2020版可用
// const add = (num1, num2) => {
//   return bigInt(num1).add(num2).value.toString()
// }

const addBigNum = (a, b) => {
  let res = ''
  // 保存两位相加的结果 和 进位值
  let c = 0
  // 字符串转数组
  a = a.split('')
  b = b.split('')
  while (a.length || b.length || c) {
    // ~~ 用来把String类型 转为 Number类型
    // 把两位相加的结果 和 进位值相加
    c += ~~a.pop() + ~~b.pop()
    // 取余，把余数拼接到最终结果中
    res = (c % 10) + res
    // 保存进位，true 或者 false
    c = c > 9
  }
  return res
}
/**
 * 1、~ 是JavaScript中的操作符，按位非，~~ 经常用来进行取整和类型转换，他和显示的用Number进行类型转换还是有区别的，比如处理 undefined 的时候。
 * 而在两个大整数，长度不一样的时候，其中一个数 已经 pop 了所有数组中的元素之后，还要pop的话，就会返回 undefined ，所以如果用 Number 显示的转化，起码要写成这样。
 * 2、在保存进位值的时候，用的并不是 1 和 0 ，而是true 和 false，这是因为隐式类型转换的时候，true会转为1，false会转为0。
 */
// console.log(add('1000000000000000000000000000001', '1'))

/**
 * 防抖
 * 将多次高频操作优化为只在最后一次执行
 * @param {Function} fn 函数方法
 * @param {Number | String} wait 等待时间
 * @param {Boolean} immediate 是否立即执行
 */
const debounce = (fn, wait, immediate = false) => {
  let timer = null
  function clearTimer() {
    clearTimeout(timer)
    timer = null
  }
  return function () {
    let that = this
    let params = arguments
    if (immediate && !timer) {
      fn.apply(that, params)
    }
    if (timer) {
      clearTimer()
    }
    timer = setTimeout(() => {
      fn.apply(that, params)
      clearTimer()
    }, +wait)
  }
}

/**
 * 节流
 * 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作
 * 当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
 * @param {Function} fn 函数方法
 * @param {Number | String} wait 等待时间
 * @param {Boolean} immediate 是否立即执行
 */
const throttle = (fn, wait, immediate = false) => {
  let timer = null
  let now = immediate
  function clearTimer() {
    clearTimeout(timer)
    timer = null
  }
  return function () {
    let that = this
    let params = arguments
    if (now) {
      fn.apply(that, params)
      now = !now
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(that, params)
        clearTimer()
        now = immediate
      }, +wait)
    }
  }
}

Function.prototype.mybind = function (context, ...args) {
  return (...newArgs) => {
    return this.call(context, ...args, ...newArgs)
  }
}

Function.prototype.mycall = function (context, ...args) {
  context = Object(context) || window
  let fn = Symbol(1)
  context[fn] = this
  let result = context[fn](...args)
  delete context[fn]
  return result
}

module.exports = {
  filterSize,
  filterMacFun,
  filterIpFun,
  judgeMacFun,
  judgePwdPower,
  judgeIPAdd,
  addBigNum,
  ip2int,
  int2iP,
}
