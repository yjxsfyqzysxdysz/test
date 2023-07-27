const SESSION = sessionStorage || window.sessionStorage
const LOACAL = localStorage || window.localStorage
import { STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN } from '../config/userInfo'
import { isObject } from './utils'

/**
 * 获取 localStorage 数据
 * @param { String } key key
 */
export const getLocalStorage = key => {
  return LOACAL.getItem(key)
}

/**
 * 设置/删除 LocalStorage
 * @param { String } key key
 * @param { String } value value
 */
export const setLocalStorage = (key, value = '') => {
  if (value + '') {
    LOACAL.setItem(key, value)
  } else {
    LOACAL.removeItem(key)
  }
}

/**
 * 清空 LocalStorage
 */
export const clearLocalStorage = () => {
  LOACAL.clear()
}

/**
 * 获取 SessionStorage
 * @param { String } key
 */
export const getSessionStorage = key => {
  return SESSION.getItem(key)
}

/**
 * 设置/删除 SessionStorage
 * @param { String } key
 * @param { String } val
 */
export const setSessionStorage = (key, val) => {
  if (val) {
    SESSION.setItem(key, val)
  } else {
    SESSION.removeItem(key)
  }
}

/**
 * 清空 SessionStorage
 */
export const clearSessionStorage = () => {
  SESSION.clear()
}

export function readObject(keys) {
  let obj = {}
  keys.map(key => {
    const rk = key.slice(key.indexOf('.') + 1)
    obj[rk] = getSessionStorage(key)
  })
  return obj
}

export function saveObject(obj) {
  if (!isObject(obj)) return
  for (const key in obj) {
    setSessionStorage(key, obj[key])
  }
}

export function saveMulti(datas) {
  datas.forEach(data => setSessionStorage(data.key, data.value))
}

export function readMulti(keys) {
  return keys.map(key => getSessionStorage(key))
}

export function clearMulti(keys) {
  console.log('clearMulti')
  keys.forEach(key => setSessionStorage(key))
}

export function read() {
  return readObject([STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN])
}

export function save(user) {
  return saveObject(user, [STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN])
}

export function clear() {
  return clearMulti([STORE_KEY_USERNAME, STORE_KEY_SESSION, STORE_KEY_TOKEN])
}
