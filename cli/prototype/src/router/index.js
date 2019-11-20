import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ModuleRouter from './module.js'
import find from '../views/baiSir/find.vue'
import fit from '../views/baiSir/fit.vue'
import myInfo from '../views/baiSir/myInfo.vue'
import logAndReg from '../views/baiSir/logAndReg.vue'
import login from '../views/baiSir/login.vue'
import register from '../views/baiSir/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      ...ModuleRouter
    ]
  },
  {
    path: '/baiHome',
    component: () => import('../views/baiSir/index.vue'),
    children: [{
        path: '/find',
        name: 'find',
        component: find
      },
      {
        path: '/fit',
        name: 'fit',
        component: fit
      },
      {
        path: '/myInfo',
        name: 'myInfo',
        component: myInfo
      },
      {
        path: '/logAndReg',
        name: 'logAndReg',
        component: logAndReg,
        children: [{
            path: '/login',
            name: 'login',
            component: login
          },
          {
            path: '/register',
            name: 'register',
            component: register
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router