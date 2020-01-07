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
      redirect: '/index',
      component: Home,
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
      component: notFinde,
      meta: {
        skipAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {  //如果未匹配到路由
    from.name ? next({ name: from.name }) : next({ path: '/notFinde' })   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next() //如果匹配到正确跳转
  }
})

export default router