import Vue from 'vue'
import axios from 'axios'
import { read } from '../tools/storage'

const requestMap = {}

axios.interceptors.request.use(
  function(request) {
    let key
    request.headers.Authorization = read('TOKEN') || ''
    if (request.headers) {
      // 解决IE下请求缓存问题
      request.headers['Cache-Control'] = 'no-cache'
      request.headers['Pragma'] = 'no-cache'
    }
    // abort the same post request
    if (/POST|PUT|DELETE/.test(request.method)) {
      key = `${request.method}${request.url}${JSON.stringify(request.body)}`
      // abort the existed request
      if (key && requestMap[key]) {
        key = null
        setTimeout(() => {
          request.abort()
        })
      } else {
        requestMap[key] = request
      }
    }
    return request
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    // delete current request in the map
    const request = response.request
    let key
    if (/POST|PUT|DELETE/.test(request.method)) {
      key = `${request.method}${request.url}${JSON.stringify(request.body)}`
      delete requestMap[key]
    }
    return response
  },
  function(error) {
    // Do something with response error
    // 获取错误状态码
    switch (error.response.status) {
      case 500:
        Vue.errorMsg('500')
        break
    }
    return Promise.reject(error)
  }
)
