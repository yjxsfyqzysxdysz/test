export default [
  {
    path: '/navigation',
    component: resolve => require(['../views/navigation/navigation.vue'], resolve)
  },
  {
    path: '/project1',
    component: resolve => require(['../views/project1/index.vue'], resolve),
    redirect: '/project1/index',
    children: [
      // 本地配置
      {
        path: '/project1/index',
        component: resolve => require(['../views/project1/main.vue'], resolve)
      }
    ]
  }
]
