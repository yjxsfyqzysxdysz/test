import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash'
import moment from 'moment'
// import echarts from 'echarts'
import 'moment/locale/zh-cn'
import './common/iview'
import './common/element'

Vue.config.productionTip = false
Vue.prototype.$lodash = Vue.lodash = lodash
Vue.prototype.$moment = Vue.moment = moment
// Vue.prototype.$echarts = echarts

Object.isObject = function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
