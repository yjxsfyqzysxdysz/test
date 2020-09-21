import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'
import notFinde from '../views/notFinde.vue'
import ModuleRouter from './module.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/navigation', // 重定向
      children: [
        ...ModuleRouter
      ]
    },
    {
      path: '/index',
      component: index,
      meta: {
        skipAuth: true
      }
    },
    {
      path: '/notFinde',
      component: notFinde
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { // 如果未匹配到路由
    from.name ? next({ name: from.name }) : next({ path: '/notFinde' }) // 如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    if (to.path === '/index') {
      next()
    } else
    if (sessionStorage.getItem('login')) {
      next()
    } else {
      next({ path: '/index' }) // 如果匹配到正确跳转
    }
    // if (to.path) {
    //   next()
    // } else if (sessionStorage.getItem('login')) {
    //   next() //如果匹配到正确跳转
    // } else {
    //   next({ path: '/index' }) //如果匹配到正确跳转
    // }
    /**
     * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
     * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
     * 当前的导航被中断，然后进行一个新的导航。
     * 你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
     */
  }
})

export default router
