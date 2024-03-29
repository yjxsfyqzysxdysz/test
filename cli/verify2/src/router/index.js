import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'
import notFinde from '../views/notFinde.vue'
import ModuleRouter from './module.js'

import { getSessionStorage, setSessionStorage } from '@/tools/storage'
import { STORE_KEY_USERNAME, STORE_KEY_TOKEN, STORE_KEY_CURRENT_URL } from '@/config/userInfo'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/login', // 重定向
      children: [...ModuleRouter]
    },
    {
      path: '/login',
      component: index,
      meta: {
        skipAuth: true // 判断是否需要登录权限
      }
    },
    {
      path: '/notFinde',
      component: notFinde
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!getSessionStorage(STORE_KEY_USERNAME)) {
    setSessionStorage(STORE_KEY_USERNAME)
  }
  if (!getSessionStorage(STORE_KEY_TOKEN)) {
    setSessionStorage(STORE_KEY_TOKEN)
  }
  setSessionStorage(STORE_KEY_CURRENT_URL, to.fullPath)

  if (!to.meta.skipAuth) {
    if (getSessionStorage(STORE_KEY_USERNAME) && getSessionStorage(STORE_KEY_TOKEN)) {
      if (to.path === '/') {
        next({ path: getSessionStorage(STORE_KEY_CURRENT_URL) })
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
  } else {
    if (to.path === '/login' && getSessionStorage(STORE_KEY_USERNAME) && getSessionStorage(STORE_KEY_TOKEN)) {
      next({ path: '/navigation' })
    } else {
      next()
    }
  }

  /**
   * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
   * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
   * 当前的导航被中断，然后进行一个新的导航。
   * 你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
   */
})

export default router
