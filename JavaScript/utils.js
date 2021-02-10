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

// 确认浏览器
// 计算空间大小
export const getSize = (size,{space=true,unit=true,place=true}={}) => {
const enumUnit=['B','KB','MB','GB','TB']
let count =0
size=parseFloat(size)
while(size>1024&&count<4){
size=size/1024
count++
}
size=size.toFixed(place)
space&&(size+=' ')
unit&&(size+=enumUnit[count])
  return size
}
// Map 按 key 升序排列
// Set 升序排列
// 获取地址栏
// 正则 phone，mail，password，passwordNumber
// 检验特殊字符 .,:+_*-=/&^;()\<|[{'`＂}]>$%#
// 转换特殊字符
// 判断是否有emoji表情
// 时间转换
// 获取随机颜色
// 判定当前设备类型（pad，phone，pc）
export const deviceType = () => {

}
// 字符串隔8位匿名化
// 对象比较
// 对象深拷贝
// 获取随机id（10位，雪花算法）
export const getId = num => {
  return (Math.random()*1e8).toString(16).substr(0,4)+'-'+new Date().getTime()+'-'+Math.random().toString().substr(2,5)
}
// 将图片转成base64
// 将图片的base64转成Blob形式
// 生成缩略图（canvas）
// Dom 事件监听 添加/修改
export const setEvents = event => {
  if () {

  } else {

  }
}
// Dom 事件监听 取消/清空
export const removeEvents = event => {
  if () {

  } else {
    
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
  return str.replace(/(^\s*)|(\s*$)/g,'')
}

// 清空数组（不改变指针）
export const clearArr = arr => {
  if (arr.length)return arr.splice(0)
}

// 数组去重
export const filterArr = arr => {
  return [...new Set(arr)]
}

// 检测数据类型
export const getDataType = data => {
const str=Object.prototype.string
const enumType={
'[object String]':'string',
'[object Number]':'number',
'[object Object]':'object',
'[object Boolean]':'boolean',
'[object Underfunded]':'underfun',
'[object ]':'',
'[object ]':'',
'[object ]':'',
'[object ]':'',
'[object ]':'',
'[object ]':''
}
if(data instanceof Element){return 'element'}
return enumType[str.call(data)]
}
// 字符补0
// 获取字符长度（Unicode 128-1 ff-2 fff-3 4）
// 使用Object.defineProperty 添加es6方法
// 汉字-Unicode
// Unicode-汉字
// 获取月份
// Vue.extend创建toast
// 根据滚动计算可视区域数据
// 双击？
// axios 全局异常处理
