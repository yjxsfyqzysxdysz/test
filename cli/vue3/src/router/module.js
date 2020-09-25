export default [
  {
    path: '/navigation',
    component: resolve => require(['../views/navigation/navigation.vue'], resolve)
  },
  // 项目1
  {
    path: '/project1',
    component: resolve => require(['../views/project1/index.vue'], resolve),
    redirect: '/project1/index',
    children: [
      {
        path: '/project1/index',
        component: resolve => require(['../views/project1/main.vue'], resolve)
      }
    ]
  },
  // 项目2-日本传统色
  {
    path: '/japanColor',
    component: resolve => require(['../views/project2/index.vue'], resolve)
  }
]
