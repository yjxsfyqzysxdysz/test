import { read } from './storage'
import { STORE_KEY_CONFIG_LANG, STORE_KEY_CONFIG_PAGE_LIMIT } from './constants'
export const lang = read(STORE_KEY_CONFIG_LANG) || navigator.language || 'zh-CN'
export const pageLimit = +read(STORE_KEY_CONFIG_PAGE_LIMIT) || 20


