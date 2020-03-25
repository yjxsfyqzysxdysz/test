import Vue from 'vue'
import axios from 'axios'
// import store from '../store'

const requestMap = {}

// response interceptor
axios.interceptors.request.use(request => {
  let key
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
  // if (store.getters.loggedIn) {
  //   // if logged in, add the token to the header
  //   request.headers.common.Authorization = `Bearer ${store.getters.accessToken}`
  // }
  return request
})

axios.interceptors.response.use(
  response => {
    // delete current request in the map
    const request = response.request
    let key
    if (/POST|PUT|DELETE/.test(request.method)) {
      key = `${request.method}${request.url}${JSON.stringify(request.body)}`
      delete requestMap[key]
    }
    return response
  },
  error => {
    switch (error.response.status) {
      case 500:
        Vue.errorMsg('500')
        break
    }
    return Promise.reject(error)
  }
)
