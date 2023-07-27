import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api'
import lodash from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
import echarts from 'echarts'
import './config/iview'
import './config/element'
import EventBus from './components/untils/EventBus'
import Notice from './components/untils/notice'
import { toRawType, isObject } from './tools/utils'
import hover from './directives/hover'

Vue.config.productionTip = false
Vue.prototype.$lodash = Vue.lodash = lodash
Vue.prototype.$moment = Vue.moment = moment
Vue.prototype.$echarts = echarts
Vue.prototype.$Notice = Vue.$Notice = Notice
Vue.prototype.errorMsg = msg => Notice.error({ title: '错误', desc: msg })
Vue.prototype.warningMsg = msg => Notice.warning({ title: '警告', desc: msg })
Vue.prototype.successMsg = msg => Notice.success({ title: '成功', desc: msg, duration: 2 })
Vue.prototype.toRawType = toRawType // 数据类型判断

Object.isObject = isObject

Vue.directive('hover', hover)

global.app = EventBus // 顶级事件监听

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
