import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import ModuleRouter from './module.js'
import store from '@/store/index'

Vue.use(Router)

let userRight = ''

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Home,
      children: [
        ...ModuleRouter
      ]
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue'),
      meta: {
        skipAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  userRight = JSON.parse(sessionStorage.getItem('userRight')) && JSON.parse(sessionStorage.getItem('userRight')).userRights.remote
  // 路由跳转前存储 hash
  if (to.fullPath !== '/info' && to.fullPath !== '/playback' && to.fullPath !== '/preview' && to.fullPath !== '/system/config') {
    store.commit('SET_HASH', to.fullPath)
  }
  store.dispatch('setPath', to.fullPath)
  if (!sessionStorage.getItem('USER')) { sessionStorage.removeItem('token') }
  if (!sessionStorage.getItem('token')) { sessionStorage.removeItem('USER') }
  if (to.matched.some(record => record.meta.skipAuth)) {
    if (!sessionStorage.getItem('USER') || !sessionStorage.getItem('token')) {
      // 如果为true的话，会重定向到指定页面去，否则的话会重定向到登录页面去
      next()
      sessionStorage.setItem('currentUrl', to.fullPath)
    } else {
      next({
        path: '/preview'
      })
    }
  } else {
    if (!sessionStorage.getItem('USER') || !sessionStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      if (to.name) {
        if (judgeJump(to.name)) {
          // 对存储管理特殊处理，判断重定向路径
          let flag = Boolean(userRight.harddiskMng)
          if (to.name === 'storeMng') {
            next({
              path: flag ? '/system/storage/partybuffalo' : '/system/storage/storageschema'
            })
          } else {
            next()
            sessionStorage.setItem('currentUrl', to.fullPath)
          }
        } else {
          next({
            path: sessionStorage.getItem('currentUrl') || '/login'
          })
        }
      } else {
        next()
        sessionStorage.setItem('currentUrl', to.fullPath)
      }
    }
  }
})

/** 判断用户权限，控制路由跳转 */
function judgeJump (pathName) {
  return userRight && Boolean(userRight[pathName])
}

export default router