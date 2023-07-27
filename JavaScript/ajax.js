import { assign } from 'lodash'

const getCookieCSRFToken = () => {}

const axios = require('./axios').axios

/**
 * 前置标识
 */
const api = ''

/**
 * 全局异常处理
 * @param { Obejct } response 结果
 */
const globalResponse = response => {
  global.app && global.app.$emit('ajaxSuccess', response)
  return response
}

/**
 * 全局异常处理
 * @param { Object } error 异常
 */
const globalError = (error = {}) => {
  if (error.response) {
    global.app &&
      global.app.$emit('ajaxError', {
        status: error.response.status,
        url: error.response.config.url
      })
  } else {
    error.response = {}
  }
  switch (error.response.status) {
    case 401:
    case 402:
      return Promise.resolve()
    default:
      return Promise.reject(error)
  }
}

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api'
axios.interceptors.response.use(globalResponse, globalError)
axios.interceptors.request.use(
  config => {
    config.headers['CSRFToken'] = getCookieCSRFToken('CSRFToken')
    return config
  },
  () => {}
)

/**
 * ajax
 */
export const $http = {
  /**
   * 本地数据获取
   * @param { String } url 地址
   */
  json: url => axios.get(url),
  /**
   * 静态数据获取
   * @param { String } url 地址
   * @param { Object } data 传值
   * @param { Object } config 配置
   */
  get: (url, data, config = {}) => axios.get(api + url, config),
  /**
   * 动态数据获取
   * @param { String } url 地址
   * @param { Object } data 传值
   * @param { Object } config 配置
   */
  post: (url, data = {}, config = {}) => {
    const { headers = {} } = config
    return axios.post(api + url, data, {
      headers: Object.assign(
        {
          'Content-Type': 'application/json;charset=utf-8',
          CSRFToken: getCookieCSRFToken('CSRFToken')
        },
        headers
      )
    })
  },
  /**
   * 创建新请求
   * @param { Object } config 配置
   */
  create: (config = {}) => {
    const source = axios.CancelToken.source()
    const instance = axios.create({ ...config, cancelToken: source.token })
    instance.interceptors.request.use(
      config => {
        config.headers['CSRFToken'] = getCookieCSRFToken('CSRFToken')
        return config
      },
      () => {}
    )
    // 拦截器
    instance.interceptors.response.use(globalResponse, globalError)
    return { source, instance }
  },
  download: (url, data, { headers = {} } = {}) => {
    return axios.post(url, data, {
      responseType: 'blob',
      headers
    })
  },
  getCancel: () => axios.CancelToken.source(),
  createCollection: (config = {}) => {
    const source = axios.CancelToken.source()
    const instance = axios.create({ ...config, cancelToken: source.token })
    instance.interceptors.request.use(
      config => {
        config.headers['CSRFToken'] = getCookieCSRFToken('CSRFToken')
        return config
      },
      () => {}
    )
    return { source, instance }
  },
  /**
   * 地址解析
   */
  resolve: ({ url, params }) => {
    url = axios.defaults.baseURL + url
    let array = []
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        array.push(`${key}=${encodeURIComponent(params[key])}`)
      }
    }
    if (array.length) {
      return url + url.indexOf('?') > -1 ? '&' : '?' + array.join('&')
    } else {
      return url
    }
  },
  setDefaultHeaders(name, value) {
    if (!name) return
    axios.defaults.headers.common[name] = value
    axios.defaults.headers.post[name] = value
    axios.defaults.headers.get[name] = value
    axios.defaults.headers.put[name] = value
  }
}

// 设置默认头信息
$http.setDefaultHeaders('Content-Type', 'application/json;charset=utf-8')

// 挂载
global.axios = axios
global.prefix = api

const install = Vue => {
  Vue.prototype.$http = $http
}
export default install
