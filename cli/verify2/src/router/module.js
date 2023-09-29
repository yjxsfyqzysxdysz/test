export default [
  {
    path: '/navigation',
    component: resolve => require(['@/views/navigation/navigation.vue'], resolve),
    meta: {
      keepAlive: true
    }
  },
  // 项目1
  {
    path: '/project1',
    component: resolve => require(['@/views/project1/index.vue'], resolve),
    redirect: '/project1/index',
    children: [
      {
        path: '/project1/index',
        component: resolve => require(['@/views/project1/main.vue'], resolve)
      }
    ]
  },
  // 项目2-日本传统色
  {
    path: '/japanColor',
    component: resolve => require(['@/views/japanColor/index.vue'], resolve),
    meta: {
      // keepAlive: true
    }
  },
  // 项目3-slot 插槽demo
  {
    path: '/slot',
    component: resolve => require(['@/views/slot/child.vue'], resolve)
  },
  // 项目4-烟花
  {
    path: '/fireworks',
    component: resolve => require(['@/views/fireworks/index'], resolve)
  },
  // 项目5-loading
  {
    path: '/loading',
    component: resolve => require(['@/views/loading/index'], resolve)
  },
  // 项目6-Flip
  {
    path: '/flip',
    component: resolve => require(['@/views/Flip'], resolve)
  }
]
